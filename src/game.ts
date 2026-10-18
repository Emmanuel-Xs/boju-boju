// Boju Boju: lobby, then a run of rounds in the compound. This file wires the level, the player, the seeker, the HUD and the flow together.
//   Flow: lobby -> prep (the masquerade counts, eyes covered) -> hunt -> cleared (next round, sharper masquerade) or caught (results). Esc pauses.
// DEV-only URL knobs (dev server only): &prep=SECONDS &hunt_s=SECONDS &markers=1 &ai=1 &stats=1 &seeker=0 &at=x,z &view=overview|top &camPos=x,y,z&camLook=x,y,z
import * as THREE from 'three';
import { audio } from './audio';
import { mountAudioDebug } from './audioDebug';
import { createCharacter, type Character, type PlayerState } from './character';
import { Fx, applyPixelRatio } from './fx';
import type { Identity } from './identity';
import { addCompoundLighting, COMPOUND_ASSET_COUNT, createCompound } from './levels/compound';
import { Chickens } from './levels/chickens';
import { Input, PLAYER_RADIUS, PlayerBody, RUN_SPEED, WALK_SPEED, type MoveInput } from './levels/controller';
import { HidingController } from './levels/hiding';
import { createLyrics } from './levels/lyrics';
import { createRoundHud } from './levels/roundHud';
import { TopDownCamera } from './levels/topdown';
import { difficultyFor, newStats, RUN_CONFIG, verdictFor, type RunStats } from './run';
import { Seeker } from './seeker';
import { canTalkToStartNg, localNet, type BestRun, type Net } from './startng';
import { AutoQuality, TIER_NAMES } from './quality';
import { Screens, type BoardEntry } from './ui';

const DEV = import.meta.env.DEV;

/** Everything about how the game is staged lives here; the numbers for the run itself are in RUN_CONFIG (run.ts). */
export const GAME_CONFIG = {
  /** Where the masquerade stands at the start of every round: at the gate, facing into the yard. */
  seekerStart: { x: 13.2, z: 0, yaw: -Math.PI / 2 },
  /** The turntable the player's full look turns on in the lobby. */
  lobbyPos: { x: 0.5, z: 0.5 },
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
  const LOAD_CLIPS = ['amb_market', 'amb_generator', 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught', 'chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt', 'caught'] as const;
  let loaded = 0;
  const loadTotal = COMPOUND_ASSET_COUNT + LOAD_CLIPS.length;
  const tickLoad = () => {
    loaded++;
    loadFill.style.width = `${Math.round((loaded / loadTotal) * 100)}%`;
    loadText.textContent = loaded < COMPOUND_ASSET_COUNT ? 'Loading the compound…' : 'Warming up the drums…';
  };

  const scene = new THREE.Scene();
  const [level, identityFirst] = await Promise.all([createCompound(tickLoad), net.identity(), audio.prefetch(LOAD_CLIPS, tickLoad)]).then(([l, i]) => [l, i] as const);
  let identity: Identity = identityFirst;
  scene.add(level.group);
  const lights = addCompoundLighting(scene, coarse ? 1024 : 2048);

  const G = GAME_CONFIG;
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
  const chickens = new Chickens(level.colliders);
  scene.add(chickens.group);
  let seeker: Seeker | null = null;
  const hiding = new HidingController({ level, player, fx, camera: rig.camera, scene, input, pos, touch: coarse || dev('buttons'), hunt: false, eye: () => seeker?.eye ?? null });
  if (!DEV || q.get('seeker') !== '0') {
    seeker = new Seeker(
      { colliders: level.colliders, bounds: level.bounds, spots: level.hidingSpots.map((s) => ({ id: s.id, position: s.position, facing: s.facing })), blocked: (a, b) => hiding.probe.blocked(a, b) },
      fx,
      scene,
    );
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
  const cfg = { ...RUN_CONFIG, prepSeconds: DEV ? Number(q.get('prep') ?? RUN_CONFIG.prepSeconds) : RUN_CONFIG.prepSeconds, huntSeconds: DEV ? Number(q.get('hunt_s') ?? RUN_CONFIG.huntSeconds) : RUN_CONFIG.huntSeconds };
  let mode: Mode = 'lobby';
  let paused = false;
  let round = 1;
  let runStats: RunStats = newStats();
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
    body.vx = body.vz = body.vy = 0;
    pos.copy(spawn);
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
    void audio.preload(['amb_market', 'amb_generator', 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught']).then(() => {
      void audio.loop('amb_market', { volume: 0.22 });
      const g = level.generator;
      void audio.loop('amb_generator', { volume: 1, spatial: { position: { x: g.x, y: g.y, z: g.z }, refDistance: 2.5, maxDistance: 32, rolloff: 1.7 } });
      const rooster = () => {
        void audio.playOnce('sfx_rooster_01', { volume: 0.7, distant: { gain: 0.6 } });
        window.setTimeout(rooster, 12000 + Math.random() * 18000);
      };
      window.setTimeout(rooster, 5000 + Math.random() * 6000);
    });
  }

  async function startRun() {
    await audio.unlock(); // the Play button is the gesture that lets sound start
    startAmbience();
    round = 1;
    runStats = newStats();
    lastScore = '';
    savedBest = false;
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
    if (seeker) {
      seeker.applyDifficulty(difficultyFor(round, cfg));
      seeker.frustrated = false;
      seeker.blind = true;
      seeker.reset(G.seekerStart);
    }
    screens.setCard(null);
    roundHud.show(true);
    hiding.show(true);
    rig.snapTo(pos);
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
    if (early) runStats.points += Math.floor(prepLeft) * cfg.readyBonusPerSecond;
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
    player.setHuntMode(true);
    screens.setCard(identity);
    hiding.setPaletteTop(72);
    if (seeker) {
      seeker.blind = false;
      seeker.reset();
    }
  }

  function clearRound() {
    mode = 'cleared';
    quality.stop();
    clearedLeft = cfg.clearedSeconds;
    hopT = 0;
    runStats.rounds++;
    runStats.points += cfg.clearPoints;
    saveProgress(); // a cleared round counts even if the player never gets caught or closes the tab
    roundHud.banner(`ROUND ${round} CLEARED!`, '#1c7a3a55');
    fx.caughtBurst(new THREE.Vector3(pos.x, pos.y + 1.4, pos.z), G.celebrateColors, 90);
    void audio.playOnce('jingle_win', { volume: 0.8 });
    audio.setSuspicion(0);
    if (seeker) seeker.frustrated = true;
    hiding.clearPose();
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
    dyingLeft = cfg.slowMoSeconds;
    timeScale = cfg.slowMoScale;
    caughtDone = false;
    void audio.unlock().then(async () => {
      const v = await audio.playOnce('caught', { volume: 0.9 });
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
    runStats.points = Math.round(runStats.points);
    const verdict = verdictFor(runStats);
    void audio.playOnce('jingle_caught', { volume: 0.6 });
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

  if (seeker) {
    seeker.onCatchStart = startCatch;
    seeker.onCaught = () => {
      fx.caughtBurst(new THREE.Vector3(pos.x, pos.y + 1.2, pos.z));
      caughtDone = true;
    };
  }

  const labelFor = () => (mode === 'prep' ? 'HIDE! THE MASQUERADE IS COUNTING' : mode === 'hunt' ? 'THE HUNT IS ON' : mode === 'cleared' ? 'ROUND CLEARED' : mode === 'dying' ? 'CAUGHT' : '');

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
      if (seeker) seeker.update(dt, { ...sense, camo: 100, speed: 0 });
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
    const airborne = !res.grounded;
    const landed = res.grounded && !wasGrounded;
    wasGrounded = res.grounded;
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
      sense.camo = hiding.camo.breakdown.total;
      sense.pose = hiding.pose;
      seeker.update(dt, sense);
    }
    chickens.update(dt, [{ x: pos.x, z: pos.z, running: res.speed > 3.6 }, ...(seeker ? [{ x: seeker.position.x, z: seeker.position.z, running: false }] : [])]);

    // flow
    if (mode === 'prep') {
      prepLeft -= dt;
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
      runStats.points += dt * cfg.hiddenPointsPerSecond;
      runStats.bestCamo = Math.max(runStats.bestCamo, hiding.camo.breakdown.total);
      if (huntLeft <= 0) clearRound();
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
    if (mode !== 'lobby' && mode !== 'results') {
      roundHud.update({
        label: labelFor(),
        seconds: mode === 'prep' ? prepLeft : mode === 'hunt' ? huntLeft : 0,
        round,
        ready: mode === 'prep' && readyWatch < 0 ? { bonus: Math.floor(prepLeft) * cfg.readyBonusPerSecond } : null,
        hiders: 1,
        caught: mode === 'dying' ? 1 : 0,
        points: Math.round(runStats.points),
      });
    }
  }

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
      chickens,
      hiding,
      level,
      fx,
      lyrics,
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
