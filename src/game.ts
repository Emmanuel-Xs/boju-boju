// Boju Boju: lobby, then a run of rounds in the compound. This file wires the level, the player, the seeker, the HUD and the flow together.
//   Flow: lobby -> prep (the masquerade counts, eyes covered) -> hunt -> cleared (next round, sharper masquerade) or caught (results). Esc pauses.
// DEV-only URL knobs (dev server only): &prep=SECONDS &hunt_s=SECONDS &markers=1 &ai=1 &stats=1 &seeker=0 &at=x,z &view=overview|top &camPos=x,y,z&camLook=x,y,z
import * as THREE from 'three';
import { audio, HEN_CLIPS, HORN_CLIPS, LAND_CLIPS, STEP_NAMES, UI_CLIPS, WORLD_CLIPS } from './audio';
import { Stepper } from './footsteps';
import { Coverage, COVERAGE_CONFIG } from './levels/coverage';
import { Nav } from './nav';
import { Footprints } from './levels/footprints';
import { createGateMarker } from './levels/gate';
import { onDirt } from './levels/ground';
import { mountAudioDebug } from './audioDebug';
import { createCharacter, type Character, type PlayerState } from './character';
import { Fx, applyPixelRatio } from './fx';
import type { Identity } from './identity';
import { addCompoundLighting } from './levels/compound';
import { assetCountOf, chooseLevel, createLevel, LEVELS, selectedLevel } from './levels/registry';
import { setGround } from './levels/ground';
import { CHICKEN_CONFIG, Chickens } from './levels/chickens';
import { Input, PLAYER_RADIUS, PlayerBody, RUN_SPEED, WALK_SPEED, type MoveInput } from './levels/controller';
import { HidingController } from './levels/hiding';
import { createLyrics } from './levels/lyrics';
import { createRoundHud } from './levels/roundHud';
import { TopDownCamera } from './levels/topdown';
import { difficultyFor, award, newStats, RUN_CONFIG, verdictFor, type RunStats } from './run';
import { CamoHold } from './camoHold';
import { Seeker, SEEKER_CONFIG, type SeekerHost } from './seeker';
import { Rain } from './levels/rain';
import { TWIST_CONFIG, twistsFor, type Twists } from './twists';
import { canTalkToStartNg, localNet, type BestRun, type Net } from './startng';
import { AutoQuality, TIER_NAMES } from './quality';
import { Screens, type BoardEntry } from './ui';

const DEV = import.meta.env.DEV;

/** Everything about how the game is staged lives here; the numbers for the run itself are in RUN_CONFIG (run.ts). */
export const GAME_CONFIG = {
  lobbyTurnRate: 0.55, // rad/s
  /** Lobby camera offset from the turntable (m) and where it looks, so the character sits right of the menu. */
  lobbyCamera: { x: 1.3, y: 1.5, z: 4.8, lookX: -0.9, lookY: 1.0 },
  celebrateColors: ['#f4a300', '#2fa59b', '#d13b2e', '#2a5db0', '#e8dcb8'],
  /** Seconds between hops while celebrating a cleared round. */
  hopInterval: 0.7,
};

type Mode = 'lobby' | 'prep' | 'hunt' | 'cleared' | 'dying' | 'results';

function overlay(css: string): HTMLDivElement {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;z-index:6;font:13px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;${css}`;
  document.body.appendChild(d);
  return d;
}

export async function startGame(net: Net = localNet()): Promise<void> {
  const q = new URLSearchParams(location.search);
  const dev = (name: string) => DEV && q.has(name);
  const coarse = matchMedia('(pointer: coarse)').matches;
  document.body.style.cssText = 'margin:0;overflow:hidden;background:#d9b88f;overscroll-behavior:none';

  const renderer = new THREE.WebGLRenderer({ antialias: !coarse, powerPreference: 'high-performance' });
  applyPixelRatio(renderer);
  if (coarse) renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild(renderer.domElement);

  // loading screen with a progress bar: the compound's textures and models, then the sounds
  const loading = overlay('inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:30;background:radial-gradient(circle at 50% 40%,#e7c79c,#b98e5e)');
  const loadTitle = document.createElement('div');
  loadTitle.style.cssText = 'font:800 clamp(38px,9vw,64px) system-ui,sans-serif;letter-spacing:1px;text-shadow:0 4px 18px #0006';
  loadTitle.textContent = 'Boju Boju';
  const loadBar = document.createElement('div');
  loadBar.style.cssText = 'width:min(300px,70vw);height:12px;border-radius:6px;background:#00000033;overflow:hidden';
  const loadFill = document.createElement('div');
  loadFill.style.cssText = 'height:100%;width:0;background:#d8fd71;border-radius:6px;transition:width .15s';
  loadBar.append(loadFill);
  const loadText = document.createElement('div');
  loadText.style.cssText = 'font:600 14px system-ui,sans-serif;opacity:.9';
  loadText.textContent = 'Loading the compound…';
  loading.append(loadTitle, loadBar, loadText);
  const LOAD_CLIPS = ['amb_market', 'amb_generator', 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught', 'chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt', 'caught', 'amb_rain', ...STEP_NAMES, ...UI_CLIPS, ...LAND_CLIPS, ...HORN_CLIPS, ...HEN_CLIPS, ...WORLD_CLIPS] as const;
  let loaded = 0;
  const levelId = selectedLevel();
  const levelAssets = assetCountOf(levelId);
  const loadTotal = levelAssets + LOAD_CLIPS.length;
  const tickLoad = () => {
    loaded++;
    loadFill.style.width = `${Math.round((loaded / loadTotal) * 100)}%`;
    loadText.textContent = loaded < levelAssets ? `Loading ${LEVELS.find((l) => l.id === levelId)?.name.toLowerCase() ?? 'the level'}…` : 'Warming up the drums…';
  };

  const scene = new THREE.Scene();
  const [level, identityFirst] = await Promise.all([createLevel(levelId, tickLoad), net.identity(), audio.prefetch(LOAD_CLIPS, tickLoad)]).then(([l, i]) => [l, i] as const);
  let identity: Identity = identityFirst;
  scene.add(level.group);
  const lights = addCompoundLighting(scene, coarse ? 1024 : 2048);

  setGround(level.ground);
  const G = { ...GAME_CONFIG, seekerStart: level.seekerStart, lobbyPos: level.lobbyPos };
  const spawn = level.spawn;
  const lobbyPos = new THREE.Vector3(G.lobbyPos.x, 0.1, G.lobbyPos.z);

  // the player: their full start.ng look; hunt mode hides hair, hat and accessory
  const buildPlayer = (id: Identity): Character => {
    const c = createCharacter(id.style as unknown as Record<string, unknown>);
    c.group.traverse((o) => {
      if (o instanceof THREE.Mesh) o.castShadow = true;
    });
    return c;
  };
  let player = buildPlayer(identity);
  scene.add(player.group);
  const pos = spawn.clone();
  const at = DEV ? q.get('at')?.split(',').map(Number) : null;
  if (at && at.length === 2 && at.every(Number.isFinite)) pos.set(at[0], 0, at[1]);

  const turntable = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.1, 28), new THREE.MeshToonMaterial({ color: '#4a2f1d' }));
  turntable.position.set(lobbyPos.x, 0.05, lobbyPos.z);
  turntable.receiveShadow = true;
  turntable.castShadow = true;
  scene.add(turntable);

  const rig = new TopDownCamera(innerWidth / innerHeight);
  rig.snapTo(pos);
  const camPos = DEV ? q.get('camPos')?.split(',').map(Number) : null;
  const camLook = (DEV ? q.get('camLook')?.split(',').map(Number) : null) ?? [0, 0, 0];
  const view = DEV ? q.get('view') : null;
  const debugCam = view === 'overview' || view === 'top' || (camPos?.length === 3 && camPos.every(Number.isFinite));
  if (view === 'overview' || view === 'top') {
    rig.camera.fov = 40;
    rig.camera.position.set(0, view === 'top' ? 52 : 46, view === 'top' ? 0.01 : 34);
    rig.camera.lookAt(0, 0, 0);
    rig.camera.updateProjectionMatrix();
  } else if (camPos?.length === 3 && camPos.every(Number.isFinite)) {
    rig.camera.fov = 40;
    rig.camera.position.set(camPos[0], camPos[1], camPos[2]);
    rig.camera.lookAt(camLook[0], camLook[1], camLook[2]);
    rig.camera.updateProjectionMatrix();
  }

  const input = new Input(renderer.domElement);
  const fx = new Fx(scene);
  // auto quality: measured over the first seconds of a hunt (see quality.ts)
  const quality = new AutoQuality((tier) => {
    if (tier >= 1) lights.setShadowSize(512);
    if (tier >= 2) renderer.setPixelRatio(1);
    if (tier >= 3) fx.dust.pool.points.visible = false;
  });
  const chickens = new Chickens(level.colliders, 5, { ...CHICKEN_CONFIG, area: level.chickenArea, count: level.chickenCount });
  const prints = new Footprints(scene);
  const gateMarker = createGateMarker(level.gate);
  scene.add(gateMarker.group);
  scene.add(chickens.group);
  let seeker: Seeker | null = null;
  const touchUi = coarse || dev('buttons');
  const hiding = new HidingController({ level, player, fx, camera: rig.camera, scene, input, pos, touch: touchUi, hunt: false, eye: () => seeker?.eye ?? null });
  const seekerHost: SeekerHost = { colliders: level.colliders, bounds: level.bounds, spots: level.hidingSpots.map((s) => ({ id: s.id, position: s.position, facing: s.facing })), blocked: (a, b) => hiding.probe.blocked(a, b), prints };
  let seeker2: Seeker | null = null;
  if (!DEV || q.get('seeker') !== '0') {
    seeker = new Seeker(seekerHost, fx, scene);
    seeker.blind = true;
    seeker.reset(G.seekerStart);
    if (dev('ai')) seeker.setDebug(true);
  }
  hiding.show(false);

  // --- dev-only overlays
  const stats = overlay('left:8px;bottom:8px;font:11px monospace;background:#0008;padding:4px 6px;border-radius:4px;display:none;pointer-events:none');
  const aiText = overlay('left:74px;top:214px;font:11px/1.45 monospace;background:#000b;padding:6px 8px;border-radius:6px;display:none;pointer-events:none;white-space:pre');
  const spotList = overlay('left:8px;top:250px;max-width:340px;max-height:calc(100% - 300px);overflow:auto;background:#000b;padding:8px 10px;border-radius:6px;font:11px/1.5 monospace;display:none');
  if (DEV) {
    spotList.innerHTML =
      '<b>Hiding spots (base colour read from userData.baseColor)</b><br>' +
      level.hidingSpots.map((s) => `<span style="display:inline-block;width:11px;height:11px;background:#${s.baseColor.getHexString()};border:1px solid #fff8;vertical-align:-1px"></span> #${s.baseColor.getHexString()} ${s.label} <span style="opacity:.6">(${s.shape})</span>`).join('<br>');
    let markers = q.has('markers');
    const applyMarkers = () => {
      level.setMarkersVisible(markers);
      spotList.style.display = markers ? 'block' : 'none';
    };
    applyMarkers();
    addEventListener('keydown', (e) => {
      if (e.code === 'KeyM') {
        markers = !markers;
        applyMarkers();
      }
      if (e.code === 'KeyJ' && seeker) {
        seeker.setDebug(!seeker.debug);
        hiding.toast(seeker.debug ? 'AI debug on' : 'AI debug off');
      }
    });
  }
  if (DEV) mountAudioDebug();
  const showStats = dev('stats') || q.get('perf') === '1';
  if (showStats) stats.style.display = 'block';

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    rig.setAspect(innerWidth / innerHeight);
    if (mode === 'lobby') showLobby();
  });

  // --- the run
  const roundHud = createRoundHud();
  const lyrics = createLyrics();
  let lastGasp = -9;
  const gaspFor = (sk: Seeker) => () => {
    if (performance.now() - lastGasp < 3000) return;
    lastGasp = performance.now();
    const at = sk.position;
    void audio.playOnce('sfx_spotted_01', { volume: 1, rate: sk.scale < 1 ? 1.1 : 0.85, spatial: { position: { x: at.x, y: 1.6 * sk.scale, z: at.z }, refDistance: 3, maxDistance: 26, rolloff: 1.2 } });
  };
  if (seeker) {
    // it gasps when it first suspects something
    seeker.onSpotted = gaspFor(seeker);
    // the spin sweep is announced a second early: a drum roll, the panels lifting, and a warning on screen
    seeker.onSpinTelegraph = () => {
      audio.drumRoll(SEEKER_CONFIG.spinTelegraph);
      roundHud.popup('SPIN SWEEP! Get out of the ring!', '#ffb347', 1.6);
    };
  }
  const cfg = { ...RUN_CONFIG, prepSeconds: DEV ? Number(q.get('prep') ?? RUN_CONFIG.prepSeconds) : RUN_CONFIG.prepSeconds, huntSeconds: DEV ? Number(q.get('hunt_s') ?? RUN_CONFIG.huntSeconds) : RUN_CONFIG.huntSeconds };
  let mode: Mode = 'lobby';
  let paused = false;
  let round = 1;
  let twist: Twists = twistsFor(1);
  const rain = new Rain(scene);
  let darkNow = 0;
  let darkTarget = 0;
  let rainNow = 0;
  let rainTarget = 0;
  let rainVoice: Awaited<ReturnType<typeof audio.loop>> = null;
  let rainFade = 0;
  let thunderLeft = 0;
  let bannerLeft = 0;
  let weatherT = 0;
  const allSeekers = (): Seeker[] => (seeker ? (seeker2 && seeker2.group.visible ? [seeker, seeker2] : [seeker]) : []);
  let runStats: RunStats = newStats();
  /** The camo stat: the best score held for CAMO_HOLD_SECONDS in a row in any hunt of this run. */
  const camoHold = new CamoHold(cfg.camoHoldSeconds);
  let prepLeft = 0;
  let huntLeft = 0;
  let clearedLeft = 0;
  let dyingLeft = 0;
  let timeScale = 1;
  let readyWatch = -1; // seconds until we start the hunt ourselves if the chant doesn't get there
  let caughtDone = false;
  let hopT = 0;
  let lobbyYaw = 0;
  let lobbyT = 0;
  let board: BoardEntry[] | null = null;
  let best: BestRun | null = null;
  let lastScore = '';
  /** Saves queue up one after another so a slow reply can't land after a newer one. */
  let saveChain: Promise<unknown> = Promise.resolve();
  let savedBest = false;
  const sense = { position: pos, speed: 0, landed: false, camo: 0, pose: null as string | null };

  const refreshBoard = async () => {
    board = await net.board();
    best = await net.best(); // after the board: a signed-in player's best run is read from their own row
  };

  const screens = new Screens({
    play: () => void startRun(),
    again: () => void startRun(),
    lobby: () => enterLobby(),
    resume: () => setPaused(false),
    quit: () => {
      setPaused(false);
      endRun();
    },
    signIn: () => {
      const url = net.signInUrl();
      if (url) location.href = url;
    },
  });

  // menu buttons click (lobby, results, pause); in the hunt the HUD buttons stay silent
  document.addEventListener('click', (e) => {
    const b = (e.target as Element | null)?.closest('button');
    if (!b || !(mode === 'lobby' || mode === 'results' || paused)) return;
    const label = b.textContent?.trim().toLowerCase() ?? '';
    const clip = /^(play|again|play again)/.test(label) ? 'sfx_ui_confirm_01' : /^(quit|back|lobby|resume)/.test(label) ? 'sfx_ui_back_01' : 'sfx_ui_click_01';
    void audio.unlock().then(() => audio.playOnce(clip, { volume: 0.5 }));
  });

  screens.setLevels(LEVELS, levelId, (id) => {
    chooseLevel(id);
    location.reload();
  });

  function showLobby() {
    screens.showLobby(identity, best, board, net.signInUrl() !== null && !q.has('guest')); // ?guest means the player already chose to play as a guest
  }

  function restoreLook() {
    player.setHuntMode(false);
    hiding.resetPaint(identity.style.primaryColor, identity.style.secondaryColor);
    hiding.setPaletteTop(8);
  }

  function enterLobby() {
    mode = 'lobby';
    paused = false;
    audio.cancelChant();
    audio.setSuspicion(0);
    lyrics.hide();
    roundHud.show(false);
    roundHud.banner(null);
    hiding.show(false);
    screens.setCard(null);
    restoreLook();
    prints.clear();
    audio.cancelDrumRoll();
    body.vx = body.vz = body.vy = 0;
    pos.copy(spawn);
    setTwists(twistsFor(1));
    if (seeker) {
      seeker.blind = true;
      seeker.frustrated = false;
      seeker.applyDifficulty(difficultyFor(1));
      seeker.reset(G.seekerStart);
    }
    turntable.visible = true;
    lobbyYaw = 0;
    void refreshBoard().then(() => mode === 'lobby' && showLobby());
    showLobby();
  }

  let ambienceOn = false;
  function startAmbience() {
    if (ambienceOn) return;
    ambienceOn = true;
    void audio.preload(['amb_market', 'amb_generator', 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught', ...STEP_NAMES, ...UI_CLIPS, ...LAND_CLIPS, ...HORN_CLIPS, ...HEN_CLIPS, ...WORLD_CLIPS]).then(() => {
      void audio.loop('amb_market', { volume: 0.28 * level.ambience.chatter });
      const g = level.generator;
      if (g && level.ambience.generator) void audio.loop('amb_generator', { volume: 0.55, spatial: { position: { x: g.x, y: g.y, z: g.z }, refDistance: 2.5, maxDistance: 32, rolloff: 1.7 } });
      const rooster = () => {
        void audio.playOnce('sfx_rooster_01', { volume: 0.3, distant: { gain: 0.6 } });
        window.setTimeout(rooster, 12000 + Math.random() * 18000);
      };
      window.setTimeout(rooster, 5000 + Math.random() * 6000);
      const horn = () => {
        void audio.playOnce(HORN_CLIPS[Math.floor(Math.random() * HORN_CLIPS.length)], { volume: 0.5 }); // distant by default
        window.setTimeout(horn, 18000 + Math.random() * 30000);
      };
      window.setTimeout(horn, 9000 + Math.random() * 9000);
      // an idle cluck from a random hen, placed where she is
      const cluck = () => {
        if (mode === 'prep' || mode === 'hunt') {
          const hens = chickens.positions();
          const h = hens[Math.floor(Math.random() * hens.length)];
          if (h) void audio.playOnce('sfx_hen_cluck_01', { volume: 0.35, rate: 0.9 + Math.random() * 0.25, spatial: { position: { x: h.x, y: 0.3, z: h.z }, refDistance: 2.5, maxDistance: 22, rolloff: 1.4 } });
        }
        window.setTimeout(cluck, 7000 + Math.random() * 9000);
      };
      window.setTimeout(cluck, 4000 + Math.random() * 4000);
    });
  }

  async function startRun() {
    await audio.unlock(); // the Play button is the gesture that lets sound start
    startAmbience();
    round = DEV ? Number(q.get('round') ?? 1) : 1;
    runStats = newStats();
    camoHold.reset();
    lastScore = '';
    savedBest = false;
    seeker?.patrol.reset();
    screens.hideAll();
    startRound();
  }

  function startRound() {
    mode = 'prep';
    turntable.visible = false;
    prepLeft = cfg.prepSeconds;
    readyWatch = -1;
    caughtDone = false;
    timeScale = 1;
    roundHud.banner(null);
    lyrics.hide();
    // a fresh round: the player's own start.ng clothes at the start, the masquerade with its eyes covered at the gate
    body.vx = body.vz = body.vy = 0;
    pos.copy(spawn);
    yaw = 0;
    restoreLook();
    // the controls card is for the teaching round; after that it gets out of the way (K brings it back)
    hiding.setLegend(round <= cfg.teaching.rounds);
    if (round === cfg.teaching.rounds + 1) hiding.toast('Controls card hidden. K shows it again.');
    teach.t = 0;
    teach.paint = { at: -99, n: 0 };
    teach.pose = { at: -99, n: 0 };
    teach.paintedAt = -1;
    teach.gate = false;
    setTwists(twistsFor(round));
    if (seeker) {
      seeker.memory.decay(); // old habits fade a little every round
      seeker.memory.stampRegulars(); // ...except the places you keep winning from
      seeker.memory.save();
      seeker.applyDifficulty(roundNumbers(round, false));
      seeker.frustrated = false;
      seeker.blind = true;
      seeker.reset(G.seekerStart);
      if (seeker2 && twist.second) {
        seeker2.applyDifficulty(roundNumbers(round, true));
        seeker2.frustrated = false;
        seeker2.blind = true;
        seeker2.reset({ x: G.seekerStart.x, z: G.seekerStart.z + TWIST_CONFIG.second.startOffsetZ, yaw: G.seekerStart.yaw });
      }
    }
    screens.setCard(null);
    roundHud.show(true);
    hiding.show(true);
    rig.snapTo(pos);
    if (twist.title) {
      roundHud.banner(twist.title, twist.nepa ? '#05081acc' : '#1d3a5acc');
      bannerLeft = 3.2;
      roundHud.popup(twist.tagline, '#ffd68a', 5);
    }
    // the chant plays through prep; when the hider is ready (button or timer) it opens, and its last line starts the hunt
    void audio
      .startChant({
        timeoutMs: (cfg.prepSeconds + 6) * 1000,
        onLine: (name, sec) => lyrics.sing(name, sec),
        onPhase: (p) => {
          if (p === 'hunt' && mode === 'prep') beginHunt();
        },
      })
      .then((r) => {
        if (r === 'cancelled' || mode !== 'prep') return;
        if (readyWatch < 0) readyWatch = 0; // the chant ended without reaching the hunt: start it
      });
  }

  /** The hider is ready: the chant opens and the hunt follows. `early` earns the bonus. */
  function requestReady(early: boolean) {
    if (mode !== 'prep' || readyWatch >= 0) return;
    if (early) {
      const bonus = Math.floor(prepLeft) * cfg.readyBonusPerSecond;
      award(runStats, 'ready', bonus);
      if (bonus > 0) roundHud.popup(`+${bonus} Ready early`, '#d8fd71');
    }
    readyWatch = cfg.chantTimeoutSeconds;
    if (audio.unlocked && audio.chantState !== 'idle') audio.chantReady();
    else readyWatch = 0.5;
  }

  function beginHunt() {
    if (mode !== 'prep') return;
    mode = 'hunt';
    quality.begin();
    huntLeft = cfg.huntSeconds;
    readyWatch = -1;
    roundCamoSum = roundCamoTime = 0;
    camoHold.beginHunt();
    still.x = pos.x;
    still.z = pos.z;
    still.t = 0;
    pending.survival = pending.nearMiss = since.survival = since.nearMiss = 0;
    runHomeWasOpen = false;
    player.setHuntMode(true);
    screens.setCard(identity);
    hiding.setPaletteTop(72);
    for (const sk of allSeekers()) {
      sk.blind = false;
      sk.reset();
    }
    rainFade = 0;
  }

  // score popups: per-second points are grouped so the screen is not a blur of numbers
  const pending = { survival: 0, nearMiss: 0 };
  const since = { survival: 0, nearMiss: 0 };
  let roundCamoSum = 0;
  let roundCamoTime = 0;
  function flushPopups(all = false) {
    const every = cfg.score.popupEvery;
    if (pending.survival >= 1 && (all || since.survival >= every.survival)) {
      roundHud.popup(`+${Math.round(pending.survival)} Survival`, '#d8fd71');
      pending.survival = since.survival = 0;
    }
    if (pending.nearMiss >= 1 && (all || since.nearMiss >= every.nearMiss || !allSeekers().some((s) => s.nearMiss))) {
      roundHud.popup(`+${Math.round(pending.nearMiss)} NEAR MISS!`, '#ffb347');
      pending.nearMiss = since.nearMiss = 0;
    }
  }

  function clearRound(ranHome = false) {
    mode = 'cleared';
    quality.stop();
    clearedLeft = cfg.clearedSeconds;
    hopT = 0;
    runStats.rounds++;
    const avgCamo = roundCamoTime > 0 ? roundCamoSum / roundCamoTime : 0;
    const camoBonus = Math.round(avgCamo * cfg.score.camoBonusPerPoint);
    award(runStats, 'camo', camoBonus);
    flushPopups(true);
    if (camoBonus > 0) roundHud.popup(`+${camoBonus} Camo bonus (${Math.round(avgCamo)}% average)`, '#7fd6ff', 2.4);
    // won from a spot: the masquerade remembers it (the third time, it goes there first)
    if (!ranHome && seeker && still.t >= cfg.regulars.stillSeconds && seeker.memory.won(still.x, still.z)) {
      roundHud.popup('The masquerade has learned this hiding place', '#ff9d6d', 4.5);
    }
    saveProgress(); // a cleared round counts even if the player never gets caught or closes the tab
    seeker?.memory.save();
    roundHud.banner(ranHome ? 'YOU MADE IT HOME!' : `ROUND ${round} CLEARED!`, '#1c7a3a55');
    fx.caughtBurst(new THREE.Vector3(pos.x, pos.y + 1.4, pos.z), G.celebrateColors, 90);
    void audio.playOnce('jingle_win', { volume: 0.5 });
    audio.setSuspicion(0);
    audio.cancelDrumRoll();
    for (const sk of allSeekers()) sk.frustrated = true;
    hiding.clearPose();
  }

  /** The gate is a choice: once the masquerade is far from it, touching it ends the round with a big bonus. */
  function runHome() {
    if (mode !== 'hunt') return;
    const bonus = cfg.score.runHomeBonus + Math.floor(huntLeft) * cfg.score.runHomeBonusPerSecondLeft;
    award(runStats, 'runHome', bonus);
    runStats.ranHome++;
    roundHud.popup(`RUN HOME!  +${bonus}`, '#6dff9a', 2.8);
    clearRound(true);
  }

  /** Sends the run so far. The board keeps each player's best run, so saving after every cleared round is safe. */
  function saveProgress(): Promise<Awaited<ReturnType<typeof net.submit>> | null> {
    const snapshot = { ...runStats };
    const next = saveChain.then(async () => {
      const res = await net.submit(snapshot);
      if (res.improved) savedBest = true;
      return res;
    }).catch(() => null);
    saveChain = next;
    return next;
  }

  function startCatch() {
    if (mode !== 'hunt') return;
    mode = 'dying';
    quality.stop();
    audio.cancelDrumRoll();
    dyingLeft = cfg.slowMoSeconds;
    timeScale = cfg.slowMoScale;
    caughtDone = false;
    void audio.unlock().then(async () => {
      const v = await audio.playOnce('caught', { volume: 1 });
      lyrics.sing('caught', v?.duration ?? 0.9);
    });
  }

  function endRun() {
    if (mode === 'results') return;
    mode = 'results';
    timeScale = 1;
    paused = false;
    audio.cancelChant();
    audio.setSuspicion(0);
    lyrics.hide();
    quality.stop();
    roundHud.show(false);
    roundHud.banner(null);
    hiding.show(false);
    screens.setCard(null);
    restoreLook(); // the full look comes back
    runStats.hiddenSeconds = Math.round(runStats.hiddenSeconds);
    runStats.bestCamo = Math.round(runStats.bestCamo);
    for (const k of Object.keys(runStats.parts) as (keyof typeof runStats.parts)[]) runStats.parts[k] = Math.round(runStats.parts[k]);
    runStats.score = Object.values(runStats.parts).reduce((a, b) => a + b, 0);
    audio.cancelDrumRoll();
    const verdict = verdictFor(runStats);
    void audio.playOnce('jingle_caught', { volume: 0.75 });
    void (async () => {
      const res = await saveProgress();
      await refreshBoard();
      lastScore = res ? (res.saved && !res.improved && savedBest ? res.message.replace(/^Not your best this time\./, 'Saved.') : res.message) : '';
      if (mode === 'results') screens.showResults(runStats, verdict, lastScore, board, identity.id, !identity.signedIn && net.signInUrl() !== null);
    })();
    screens.showResults(runStats, verdict, '', board, identity.id, !identity.signedIn && net.signInUrl() !== null);
  }

  function setPaused(p: boolean) {
    if (p === paused) return;
    if (p && (mode === 'lobby' || mode === 'results')) return;
    paused = p;
    if (p) quality.stop();
    else if (mode === 'hunt') quality.begin();
    screens.showPause(p);
    if (p) {
      audio.setSuspicion(0);
      void audio.suspend();
    } else void audio.resume();
  }

  // identity can change while the game is open (signed in or out on start.ng)
  async function refreshIdentity() {
    const next = await net.refresh();
    if (!next) return;
    const changed = JSON.stringify(next.style) !== JSON.stringify(identity.style) || next.id !== identity.id || next.name !== identity.name || next.signedIn !== identity.signedIn || next.face !== identity.face;
    identity = next;
    if (!changed) return;
    scene.remove(player.group);
    player.dispose();
    player = buildPlayer(identity);
    scene.add(player.group);
    hiding.setPlayer(player);
    player.play('idle', 0.01);
    state = 'idle';
    if (mode === 'lobby') {
      void refreshBoard().then(() => mode === 'lobby' && showLobby());
      showLobby();
    } else if (mode === 'prep' || mode === 'hunt') {
      restoreLook();
      if (mode === 'hunt') {
        player.setHuntMode(true);
        screens.setCard(identity);
      }
    }
  }
  addEventListener('focus', () => void refreshIdentity());

  // --- input: Enter = Ready, Esc = pause (unless it just stopped the eyedropper)
  addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && mode === 'prep' && !paused) requestReady(true);
    if (e.code === 'Escape') {
      if (hiding.escUsed) {
        hiding.escUsed = false;
        return;
      }
      if (mode === 'prep' || mode === 'hunt' || mode === 'cleared' || mode === 'dying') setPaused(!paused);
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) setPaused(true);
    else void refreshIdentity();
  });
  roundHud.onReady = () => requestReady(true);

  if (DEV && q.has('autowalk')) {
    const route: [number, number][] = [[-9, -4.5], [9, -4.5], [9, 3], [-9, 3]];
    let leg = 0;
    input.override = { x: 0, y: 0, run: false } as MoveInput;
    setInterval(() => {
      const [tx, tz] = route[leg % route.length];
      const dx = tx - pos.x;
      const dz = tz - pos.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.4) leg++;
      input.override = { x: dx / d, y: dz / d, run: true };
    }, 50);
  }

  // --- the simulation step (no drawing): the animation loop calls it once a frame; tests call it in fixed steps
  const body = new PlayerBody(pos);
  let state: PlayerState = 'idle';
  player.play('idle', 0.01);
  let yaw = 0;
  let wasGrounded = true;
  /** Tests can pin the camo score the masquerade sees (null = the real one). */
  let debugCamo: number | null = null;
  let runHomeWasOpen = false;
  /** Where the hider has been staying this hunt: the anchor, and how long they have been within stillRadius of it. */
  const still = { x: 0, z: 0, t: 0 };
  /** The teaching round's hints: when each was last shown (s into prep) and how many times. */
  const teach = { t: 0, paint: { at: -99, n: 0 }, pose: { at: -99, n: 0 }, paintedAt: -1, gate: false };
  /** Shows a hint until the hider has done what it says, at most `hintMax` times, `hintRepeat` seconds apart. */
  function teachHint(h: { at: number; n: number }, done: boolean, since: number, text: string) {
    const t = cfg.teaching;
    if (done || h.n >= t.hintMax || teach.t < since + t.hintDelay || teach.t - h.at < t.hintRepeat) return;
    h.at = teach.t;
    h.n++;
    roundHud.popup(text, '#ffd68a', 6);
  }
  let hintSeen = (() => {
    try {
      return localStorage.getItem('boju.runHomeHint') === '1';
    } catch {
      return false;
    }
  })();
  // running on bare dirt leaves prints (walking leaves none); the masquerade can follow them
  const playerSteps = new Stepper('player', (x, z, run) => {
    if (run && onDirt(x, z)) prints.add(x, z, yaw);
  });
  const seekerSteps = new Stepper('seeker');

  let seekerLastX = 0;
  let seekerLastZ = 0;

  const wireCatch = (sk: Seeker) => {
    sk.onCatchStart = startCatch;
    sk.onCaught = () => {
      fx.caughtBurst(new THREE.Vector3(pos.x, pos.y + 1.2, pos.z));
      caughtDone = true;
    };
  };
  if (seeker) wireCatch(seeker);
  const seekerSteps2 = new Stepper('seeker', undefined, 1.25);
  let seeker2LastX = 0;
  let seeker2LastZ = 0;


  /** The seeker numbers for a round, with what the round's twist does to them. */
  function roundNumbers(r: number, small: boolean) {
    const n = { ...difficultyFor(r, cfg) };
    const tc = TWIST_CONFIG;
    const lt = level.seekerTuning;
    n.patrolSpeed *= lt.speed;
    n.investigateSpeed *= lt.speed;
    n.checkSpeed *= lt.speed;
    n.visionFovDeg *= lt.fov;
    n.visionRange *= lt.range;
    if (twist.nepa) {
      n.visionFovDeg = Math.min(n.visionFovDeg, tc.nepa.visionFovDeg);
      n.visionRange = Math.min(n.visionRange, tc.nepa.visionRange);
    }
    if (small) {
      n.patrolSpeed *= tc.second.speedMul;
      n.investigateSpeed *= tc.second.speedMul;
      n.checkSpeed *= tc.second.speedMul;
      n.visionFovDeg *= tc.second.fovMul;
    }
    // the teaching round: slower, slower to suspect, no spin sweep (round 2 onward gets the plain ramp back)
    const teach = r <= cfg.teaching.rounds && !small ? cfg.teaching : null;
    if (teach) {
      n.patrolSpeed *= teach.speedMul;
      n.investigateSpeed *= teach.speedMul;
      n.checkSpeed *= teach.speedMul;
      n.rateMax *= teach.rateMul;
    }
    // the closing-in and trail-following speeds are not part of the round ramp, but follow the same level, size and teaching tuning
    const speed = lt.speed * (small ? tc.second.speedMul : 1) * (teach?.speedMul ?? 1);
    // only the first masquerade does spin sweeps, and not in the teaching round (applyDifficulty keeps what it is given, so always say)
    const spinInterval: [number, number] = small || (teach && !teach.spin) ? [1e9, 1e9] : SEEKER_CONFIG.spinInterval;
    return { ...n, chaseSpeed: SEEKER_CONFIG.chaseSpeed * speed, trailSpeed: SEEKER_CONFIG.trailSpeed * speed, spinInterval };
  }

  /** The second, smaller masquerade is built the first time a round needs it (it shares the first one's patrol, so they split the yard). */
  function ensureSecond() {
    if (seeker2 || !seeker) return;
    const tc = TWIST_CONFIG.second;
    seeker2 = new Seeker(seekerHost, fx, scene, { ...SEEKER_CONFIG, radius: tc.radius, spinInterval: [1e9, 1e9] }, { share: seeker, scale: tc.scale, quiet: true });
    seeker2.onSpotted = gaspFor(seeker2);
    wireCatch(seeker2);
    seeker2.blind = true;
    seeker2.reset({ x: G.seekerStart.x, z: G.seekerStart.z + tc.startOffsetZ, yaw: G.seekerStart.yaw });
  }

  /** Switch the round's twists on or off (everything eases in over a second or two). */
  function setTwists(t: Twists) {
    const wasNepa = twist.nepa;
    twist = t;
    if (t.second) {
      ensureSecond();
      seeker2?.setPresent(true);
    } else seeker2?.setPresent(false);
    if (seeker) {
      seeker.setLantern(t.nepa);
      seeker.closeSense = t.nepa ? TWIST_CONFIG.nepa.senseRadius : 0;
    }
    darkTarget = t.nepa ? 1 : 0;
    rainTarget = t.rain ? 1 : 0;
    thunderLeft = TWIST_CONFIG.rain.thunder[0] + Math.random() * (TWIST_CONFIG.rain.thunder[1] - TWIST_CONFIG.rain.thunder[0]);
    if (t.nepa && !wasNepa) void audio.unlock().then(() => audio.playOnce('sfx_power_cut', { volume: 0.8 }));
    if (t.rain && !rainVoice) {
      rainVoice = undefined as never;
      void audio.unlock().then(() => audio.loop('amb_rain', { volume: 0.55, fadeIn: 2.5 })).then((v) => (rainVoice = v));
    } else if (!t.rain && rainVoice) {
      rainVoice.stop(2);
      rainVoice = null;
    }
  }

  /** Light, rain, the banner and the paint that washes out, each frame. */
  let moodDark = -1;
  let moodRain = -1;
  function weather(dt: number) {
    darkNow += (darkTarget - darkNow) * Math.min(1, dt * 2.2);
    rainNow += (rainTarget - rainNow) * Math.min(1, dt * 1.2);
    if (Math.abs(darkNow - moodDark) > 0.003 || Math.abs(rainNow - moodRain) > 0.003) {
      moodDark = darkNow;
      moodRain = rainNow;
      lights.setMood(darkNow, rainNow);
    }
    rain.enabled = rainNow > 0.02;
    weatherT += dt;
    rain.update(dt, pos, weatherT);
    if (bannerLeft > 0) {
      bannerLeft -= dt;
      if (bannerLeft <= 0 && mode !== 'cleared') roundHud.banner(null);
    }
    if (mode === 'hunt' && twist.rain) {
      hiding.fadePaint(identity.style.primaryColor, identity.style.secondaryColor, 1 - Math.exp(-dt / TWIST_CONFIG.rain.fadeTau), TWIST_CONFIG.rain.refresh);
      thunderLeft -= dt;
      if (thunderLeft <= 0) {
        thunderLeft = TWIST_CONFIG.rain.thunder[0] + Math.random() * (TWIST_CONFIG.rain.thunder[1] - TWIST_CONFIG.rain.thunder[0]);
        void audio.playOnce('sfx_thunder_01', { volume: 0.5 });
      }
    }
  }

  const labelFor = () => (mode === 'prep' ? 'HIDE! THE MASQUERADE IS COUNTING' : mode === 'hunt' ? `THE HUNT IS ON${twist.title ? ` · ${twist.title}` : ''}` : mode === 'cleared' ? 'ROUND CLEARED' : mode === 'dying' ? 'CAUGHT' : '');

  function simulate(dt: number): { speed: number } {
    // lobby / results: the world idles (chickens, the masquerade at the gate), the player turns on the turntable
    if (mode === 'lobby' || mode === 'results') {
      if (mode === 'lobby') {
        lobbyYaw += dt * G.lobbyTurnRate;
        lobbyT += dt;
        player.group.position.copy(lobbyPos);
        player.group.rotation.y = lobbyYaw;
        player.play('idle', 0.3);
        player.update(dt);
      } else {
        player.group.position.copy(pos);
        player.group.rotation.y = yaw;
        player.update(dt);
      }
      for (const sk of allSeekers()) sk.update(dt, { ...sense, camo: 100, speed: 0 });
      chickens.update(dt, []);
      return { speed: 0 };
    }

    const frozen = mode === 'dying' || mode === 'cleared';
    let raw: MoveInput = frozen ? { x: 0, y: 0, run: false } : input.read();
    if (mode === 'cleared') {
      hopT += dt;
      if (hopT >= G.hopInterval) {
        hopT = 0;
        raw = { ...raw, jump: true };
      }
    }
    body.radius = hiding.pose === 'wall_flat' ? 0.2 : PLAYER_RADIUS; // pressed flat, you can stand right up against the wall
    const res = body.update(raw, dt, level.colliders, level.bounds);
    const turn = 1 - Math.exp(-dt * 16);
    if (res.heading !== null) yaw += Math.atan2(Math.sin(res.heading - yaw), Math.cos(res.heading - yaw)) * turn;
    playerSteps.advance(dt, pos.x, pos.z, res.speed, res.grounded);
    const airborne = !res.grounded;
    const landed = res.grounded && !wasGrounded;
    wasGrounded = res.grounded;
    if (landed && mode !== 'cleared') void audio.playOnce(LAND_CLIPS[Math.floor(Math.random() * LAND_CLIPS.length)], { volume: 0.35 });
    const moving = res.speed > 0.35 || airborne;
    const held = hiding.update(dt, { speed: moving ? Math.max(res.speed, airborne ? WALK_SPEED : 0) : 0, yaw });
    if (held.yaw !== null) yaw += Math.atan2(Math.sin(held.yaw - yaw), Math.cos(held.yaw - yaw)) * turn;
    const next: PlayerState = airborne ? 'jump' : res.speed > 0.35 ? (res.speed > 3.6 ? 'run' : 'walk') : held.state;
    if (next !== state) {
      state = next;
      player.play(state, state === 'jump' ? 0.08 : 0.2);
    }
    // keep the stride matched to the ground speed so feet don't skate
    player.animator.speed = state === 'walk' ? Math.min(1.35, Math.max(0.5, res.speed / WALK_SPEED)) : state === 'run' ? Math.min(1.25, res.speed / RUN_SPEED) : 1;
    player.group.position.copy(pos);
    player.group.rotation.y = yaw;
    player.update(dt);

    if (seeker) {
      sense.speed = moving ? res.speed : 0;
      sense.landed = landed;
      sense.camo = DEV && debugCamo !== null ? debugCamo : hiding.camo.breakdown.total;
      sense.pose = hiding.pose;
      seeker.update(dt, sense);
      if (dt > 0) seekerSteps.advance(dt, seeker.position.x, seeker.position.z, Math.hypot(seeker.position.x - seekerLastX, seeker.position.z - seekerLastZ) / dt);
      seekerLastX = seeker.position.x;
      seekerLastZ = seeker.position.z;
      if (seeker2 && seeker2.group.visible) {
        seeker2.update(dt, sense);
        if (dt > 0) seekerSteps2.advance(dt, seeker2.position.x, seeker2.position.z, Math.hypot(seeker2.position.x - seeker2LastX, seeker2.position.z - seeker2LastZ) / dt);
        seeker2LastX = seeker2.position.x;
        seeker2LastZ = seeker2.position.z;
        if (seeker2.suspicion > seeker.suspicion) audio.setSuspicion(seeker2.suspicion);
      }
    }
    const squawks = chickens.update(dt, [{ x: pos.x, z: pos.z, running: res.speed > 3.6 }, ...(seeker ? [{ x: seeker.position.x, z: seeker.position.z, running: false }] : [])], {
      active: mode === 'hunt' && !!seeker && !seeker.blind && !seeker.frustrated,
      player: pos,
    });
    for (const sq of squawks) {
      void audio.squawk(sq.x, sq.z);
      if (sq.first) {
        const near = allSeekers().find((s) => Math.hypot(s.position.x - sq.x, s.position.z - sq.z) <= CHICKEN_CONFIG.hearRange && s.glance(sq.x, sq.z));
        if (near) roundHud.popup('A chicken is giving you away!', '#ffb347', 2);
      }
    }
    prints.update(dt);

    // flow
    if (mode === 'prep') {
      prepLeft -= dt;
      if (round <= cfg.teaching.rounds && readyWatch < 0) {
        teach.t += dt;
        const painted = hiding.painted.top || hiding.painted.bottom;
        if (painted && teach.paintedAt < 0) teach.paintedAt = teach.t;
        teachHint(teach.paint, painted, 0, touchUi ? 'Tap Eyedropper, then tap the wall behind you to paint your clothes like it' : 'Press E, aim at the wall behind you and click: your clothes take its colour');
        teachHint(teach.pose, !painted || hiding.pose === 'wall_flat', teach.paintedAt, touchUi ? 'Now tap the Wall pose, with your back to the wall' : 'Now press 3 (wall_flat), with your back to the wall');
      }
      if (prepLeft <= 0) requestReady(false);
      if (readyWatch > 0) {
        readyWatch -= dt;
        if (readyWatch <= 0) {
          audio.cancelChant();
          beginHunt();
        }
      } else if (readyWatch === 0) {
        audio.cancelChant();
        beginHunt();
      }
    } else if (mode === 'hunt') {
      huntLeft -= dt;
      runStats.hiddenSeconds += dt;
      const camoNow = DEV && debugCamo !== null ? debugCamo : hiding.camo.breakdown.total;
      if (Math.hypot(pos.x - still.x, pos.z - still.z) > cfg.regulars.stillRadius) {
        still.x = pos.x;
        still.z = pos.z;
        still.t = 0;
      } else still.t += dt;
      camoHold.add(camoNow, dt);
      runStats.bestCamo = camoHold.best; // copied every frame, so a catch or a paint reset can't take it away
      roundCamoSum += camoNow * dt;
      roundCamoTime += dt;
      const sc = cfg.score;
      award(runStats, 'survival', dt * sc.survivalPerSecond);
      pending.survival += dt * sc.survivalPerSecond;
      since.survival += dt;
      if (allSeekers().some((s) => s.nearMiss)) {
        award(runStats, 'nearMiss', dt * sc.nearMissPerSecond);
        pending.nearMiss += dt * sc.nearMissPerSecond;
        since.nearMiss += dt;
      }
      flushPopups();
      // the way home
      const open = !!seeker && !seeker.blind && allSeekers().every((s) => Math.hypot(s.position.x - level.gate.x, s.position.z - level.gate.z) > cfg.runHome.seekerDistance);
      const teaching = round <= cfg.teaching.rounds;
      if (open && !runHomeWasOpen && (!hintSeen || (teaching && !teach.gate))) {
        hintSeen = true;
        teach.gate = true;
        try {
          localStorage.setItem('boju.runHomeHint', '1');
        } catch {
          /* private mode: it just shows again next time */
        }
        roundHud.popup(teaching ? 'The gate glows: run home!' : 'Run home! The gate is open: touch it now to end the round.', '#6dff9a', 5);
      }
      runHomeWasOpen = open;
      if (open && pos.x >= cfg.runHome.reachX && Math.abs(pos.z - level.gate.z) <= level.gate.halfWidth) runHome();
      else if (huntLeft <= 0) clearRound();
    } else if (mode === 'cleared') {
      clearedLeft -= dt;
      if (clearedLeft <= 0) {
        round++;
        startRound();
      }
    }
    return res;
  }

  /** One whole-game step: real time `rawDt` in, the world advanced by the (possibly slowed) game time. */
  let gateTime = 0;
  function tick(rawDt: number) {
    if (paused) return;
    const dt = Math.min(0.05, rawDt);
    if (mode === 'dying') {
      dyingLeft -= dt; // slow motion is counted in real seconds
      if (dyingLeft <= 0) timeScale = 1;
      if (dyingLeft <= 0 && caughtDone) {
        endRun();
        return;
      }
      if (dyingLeft < -3) {
        endRun(); // never hang on a slow lunge
        return;
      }
    }
    simulate(dt * timeScale);
    weather(dt);
    gateTime += dt;
    gateMarker.update(gateTime, runHomeWasOpen && mode === 'hunt', mode === 'prep' || mode === 'hunt');
    if (mode !== 'lobby' && mode !== 'results') {
      roundHud.update({
        label: labelFor(),
        seconds: mode === 'prep' ? prepLeft : mode === 'hunt' ? huntLeft : 0,
        round,
        ready: mode === 'prep' && readyWatch < 0 ? { bonus: Math.floor(prepLeft) * cfg.readyBonusPerSecond } : null,
        hiders: 1,
        caught: mode === 'dying' ? 1 : 0,
        points: Math.round(runStats.score),
      });
    }
  }

  // DEV only: ?zones draws the dead-zone heat map over the floor
  if (DEV && q.has('zones') && seeker) void import('./levels/zonesOverlay').then((m) => m.showZonesOverlay(scene, level, seeker!));

  // --- start in the lobby (the board loads in the background: the game never waits for start.ng)
  loading.remove();
  enterLobby();
  // start.ng may answer late (a slow connect page): ask again shortly after, then rely on focus / visibility
  if (identity.source === 'local guest' && canTalkToStartNg()) {
    window.setTimeout(() => void refreshIdentity(), 3000);
    window.setTimeout(() => void refreshIdentity(), 8000);
  }

  // --- frame loop
  let last = performance.now();
  let frames = 0;
  let acc = 0;
  let fps = 0;
  renderer.setAnimationLoop((now) => {
    const rawDt = Math.max(0, (now - last) / 1000); // the first rAF timestamp can precede `last`: never run time backwards
    last = now;
    tick(rawDt);
    if (mode === 'hunt' && !paused) quality.frame(rawDt);
    const dt = paused ? 0 : Math.min(0.05, rawDt);

    if (seeker?.debug) aiText.textContent = seeker.describe(sense as never);
    aiText.style.display = seeker?.debug ? 'block' : 'none';
    fx.update(dt * timeScale, rig.camera, renderer);

    if (mode === 'lobby') {
      const c = G.lobbyCamera;
      const portrait = innerWidth < innerHeight; // phones: the menu stacks under the turntable, so frame him in the top part of the screen
      rig.camera.position.set(lobbyPos.x + (portrait ? 0.4 : c.x) + Math.sin(lobbyT * 0.25) * 0.25, portrait ? 1.4 : c.y, lobbyPos.z + (portrait ? 5.4 : c.z));
      rig.camera.lookAt(lobbyPos.x + (portrait ? 0 : c.lookX), portrait ? -0.05 : c.lookY, lobbyPos.z);
      lights.follow(lobbyPos);
    } else if (mode === 'results') {
      const sp = seeker?.position ?? pos;
      rig.camera.position.set(sp.x - 3.2, 3.4, sp.z + 6.4);
      rig.camera.lookAt(sp.x, 1.4, sp.z);
      lights.follow(sp);
    } else {
      if (!debugCam) rig.update(dt, pos, body.vx, body.vz);
      rig.fade(level.fadeGroups, pos, dt);
      lights.follow(pos);
      audio.setListener(pos.x, 1.2, pos.z, 0, 0, -1);
    }
    renderer.render(scene, rig.camera);

    frames++;
    acc += rawDt; // real time, so a slow device reports its true fps even though the simulation step is clamped
    if (acc >= 0.5) {
      fps = frames / acc;
      frames = acc = 0;
      if (showStats) stats.textContent = `${fps.toFixed(0)} fps · ${renderer.info.render.calls} draw calls (incl. shadow pass) · ${(renderer.info.render.triangles / 1000).toFixed(0)}k tris · quality tier ${quality.tier} (${TIER_NAMES[quality.tier]})${quality.lastFps ? ` · last window ${quality.lastFps.toFixed(0)} fps` : ''}`;
    }
  });

  if (DEV) {
    (window as unknown as { __boju: unknown }).__boju = {
      renderer,
      scene,
      camera: rig.camera,
      audio,
      input,
      body,
      seeker,
      get seeker2() {
        return seeker2;
      },
      get twist() {
        return twist;
      },
      rain,
      lights,
      chickens,
      hiding,
      level,
      fx,
      lyrics,
      prints,
      gateMarker,
      get player() {
        return player;
      },
      get mode() {
        return mode;
      },
      get round() {
        return round;
      },
      get runStats() {
        return runStats;
      },
      get prepLeft() {
        return prepLeft;
      },
      get huntLeft() {
        return huntLeft;
      },
      get paused() {
        return paused;
      },
      get fps() {
        return fps;
      },
      pos,
      screens,
      setCamo(v: number | null) {
        debugCamo = v;
      },
      /** The walkable floor as text: # blocked for everyone, p only the player fits, . both fit. */
      ascii() {
        const cov = new Coverage(level.colliders, level.bounds);
        const rows: string[] = [];
        for (let iz = 0; iz < cov.player.h; iz++) {
          let row = `${(level.bounds.minZ + (iz + 0.5) * 0.5).toFixed(1).padStart(6)} `;
          for (let ix = 0; ix < cov.player.w; ix++) row += cov.player.isBlockedCell(ix, iz) ? '#' : cov.seeker.isBlockedCell(ix, iz) ? 'p' : '.';
          rows.push(row);
        }
        return rows.join('\n');
      },
      /** Where the masquerade can and cannot see (see levels/coverage.ts). */
      coverage(cell?: number) {
        const t0 = performance.now();
        const cov = new Coverage(level.colliders, level.bounds, cell ? { ...COVERAGE_CONFIG, cell } : undefined);
        const counts = cov.viewCounts();
        const r = (z: { cx: number; cz: number; area: number; minX: number; maxX: number; minZ: number; maxZ: number }) => ({ at: [+z.cx.toFixed(1), +z.cz.toFixed(1)], area: z.area, x: [z.minX, z.maxX], z: [z.minZ, z.maxZ] });
        return {
          ms: Math.round(performance.now() - t0),
          cells: cov.cells.length,
          viewpoints: cov.viewpoints.length,
          dead: cov.deadZones(counts).map(r),
          thin: cov.thinZones(counts).slice(0, 25).map(r),
          corners: cov.corners().map((c) => [c.x, c.z, counts[c.cell]]),
        };
      },
      /**
       * Places the player's real body fits (0.1 m grid) that the 0.5 m patrol grid has no cell for, further than `far` m from any cell:
       * the patrol cannot see these as stale floor, so nobody ever looks into them. Returns the pockets as boxes.
       */
      gridGaps(far = 0.6) {
        const cov = new Coverage(level.colliders, level.bounds);
        const fine = new Nav(level.colliders, level.bounds, COVERAGE_CONFIG.playerRadius, 0.1);
        const main = fine.mainArea();
        const flagged: { x: number; z: number; k: number }[] = [];
        for (let iz = 0; iz < fine.h; iz++)
          for (let ix = 0; ix < fine.w; ix++) {
            if (!main[iz * fine.w + ix]) continue;
            const c = fine.centre(ix, iz);
            if (cov.cellIndex(c.x, c.z) >= 0) continue;
            let near = Infinity;
            for (const cell of cov.cells) near = Math.min(near, Math.hypot(cell.x - c.x, cell.z - c.z));
            if (near > far) flagged.push({ x: c.x, z: c.z, k: iz * fine.w + ix });
          }
        // group the flagged cells into pockets (8 neighbours)
        const byK = new Map(flagged.map((f) => [f.k, f]));
        const seen = new Set<number>();
        const pockets: { at: number[]; x: number[]; z: number[]; area: number }[] = [];
        for (const f of flagged) {
          if (seen.has(f.k)) continue;
          const stack = [f.k];
          const cells: { x: number; z: number }[] = [];
          seen.add(f.k);
          while (stack.length) {
            const k = stack.pop() as number;
            cells.push(byK.get(k) as { x: number; z: number });
            const ix = k % fine.w;
            const iz = Math.floor(k / fine.w);
            for (let dz = -1; dz <= 1; dz++)
              for (let dx = -1; dx <= 1; dx++) {
                const nk = (iz + dz) * fine.w + ix + dx;
                if (byK.has(nk) && !seen.has(nk)) {
                  seen.add(nk);
                  stack.push(nk);
                }
              }
          }
          const xs = cells.map((c) => c.x);
          const zs = cells.map((c) => c.z);
          pockets.push({ at: [+(xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2), +(zs.reduce((a, b) => a + b, 0) / zs.length).toFixed(2)], x: [Math.min(...xs), Math.max(...xs)], z: [Math.min(...zs), Math.max(...zs)], area: +(cells.length * 0.01).toFixed(2) });
        }
        return pockets;
      },
      /** Runs the whole game logic (flow, player, camo, seeker, chickens) in fixed steps, ignoring the frame rate. Returns the seconds it ran. */
      sim(seconds: number, until?: () => boolean) {
        let t = 0;
        for (; t < seconds; t += 1 / 30) {
          tick(1 / 30);
          if (until?.()) break;
        }
        return +t.toFixed(2);
      },
      requestReady: () => requestReady(true),
      setPaused,
      enterLobby,
      refreshIdentity,
      snapCamera() {
        rig.snapTo(pos);
        rig.camera.updateMatrixWorld(true);
      },
      screenOf(x: number, y: number, z: number) {
        const v = new THREE.Vector3(x, y, z).project(rig.camera);
        return { x: ((v.x + 1) / 2) * innerWidth, y: ((1 - v.y) / 2) * innerHeight };
      },
      walk(x: number, y: number, seconds: number, run = false) {
        for (let i = 0; i < seconds * 30; i++) body.update({ x, y, run }, 1 / 30, level.colliders, level.bounds);
        return { x: +pos.x.toFixed(2), y: +pos.y.toFixed(2), z: +pos.z.toFixed(2) };
      },
      jump(x: number, y: number, seconds: number, run = false) {
        let peak = pos.y;
        for (let i = 0; i < seconds * 30; i++) {
          body.update({ x, y, run, jump: i === 0 }, 1 / 30, level.colliders, level.bounds);
          peak = Math.max(peak, pos.y);
        }
        return { x: +pos.x.toFixed(2), y: +pos.y.toFixed(2), z: +pos.z.toFixed(2), peak: +peak.toFixed(2) };
      },
    };
  }
}
