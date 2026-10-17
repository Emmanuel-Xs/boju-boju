// /?level=compound: the walkable compound. One player, no seeker, painting or game loop yet.
// Hold E to aim the eyedropper (click reads a surface's base colour), Q switches zone, 1-4 poses, H hunt mode, C camo debug text.
// URL knobs: &hunt=0 (start with hair/hat/accessory visible)  &buttons=1 (touch buttons on desktop)  &markers=1 (hiding-spot markers + list, also toggled with M)  &stats=1 (fps / draw calls)  &at=x,z (start position)
//            &view=overview|top or &camPos=x,y,z&camLook=x,y,z (fixed debug camera)  &autowalk=1 (walks a loop by itself, for measuring fps)
import * as THREE from 'three';
import { audio } from '../audio';
import { mountAudioDebug } from '../audioDebug';
import { createCharacter, type PlayerState } from '../character';
import { Fx, applyPixelRatio } from '../fx';
import { addCompoundLighting, createCompound } from './compound';
import { Input, PLAYER_RADIUS, PlayerBody, RUN_SPEED, WALK_SPEED, type MoveInput } from './controller';
import { Seeker } from '../seeker';
import { Chickens } from './chickens';
import { HidingController } from './hiding';
import { Round, ROUND_CONFIG } from './round';
import { createRoundHud } from './roundHud';
import { TopDownCamera } from './topdown';

const PLAYER_STYLE = { body: 'female', primaryColor: '#f4a300', secondaryColor: '#2b4c9b', skinColor: '#8d5524', hairColor: '#1b1b1b', hair: 'braids', hat: 'none', accessory: 'earrings' };

function overlay(css: string): HTMLDivElement {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;z-index:6;font:13px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;${css}`;
  document.body.appendChild(d);
  return d;
}

export async function startCompound(): Promise<void> {
  const q = new URLSearchParams(location.search);
  const coarse = matchMedia('(pointer: coarse)').matches;
  document.body.style.cssText = 'margin:0;overflow:hidden;background:#d9b88f;overscroll-behavior:none';

  const renderer = new THREE.WebGLRenderer({ antialias: !coarse, powerPreference: 'high-performance' });
  applyPixelRatio(renderer);
  if (coarse) renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild(renderer.domElement);

  const loading = overlay('inset:0;display:flex;align-items:center;justify-content:center;font-size:18px');
  loading.textContent = 'Loading the compound…';

  const scene = new THREE.Scene();
  const level = await createCompound();
  scene.add(level.group);
  const lights = addCompoundLighting(scene, coarse ? 1024 : 2048);

  const player = createCharacter(PLAYER_STYLE);
  player.group.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true;
  });
  scene.add(player.group);
  const pos = level.spawn.clone();
  const at = q.get('at')?.split(',').map(Number);
  if (at && at.length === 2 && at.every(Number.isFinite)) pos.set(at[0], 0, at[1]);
  player.group.position.copy(pos);

  const rig = new TopDownCamera(innerWidth / innerHeight);
  rig.snapTo(pos);
  const view = q.get('view');
  const camPos = q.get('camPos')?.split(',').map(Number);
  const camLook = q.get('camLook')?.split(',').map(Number) ?? [0, 0, 0];
  const debugCam = view === 'overview' || view === 'top' || (camPos?.length === 3 && camPos.every(Number.isFinite));
  if (view === 'overview') {
    rig.camera.fov = 40;
    rig.camera.position.set(0, 46, 34);
    rig.camera.lookAt(0, 0, 0);
    rig.camera.updateProjectionMatrix();
  } else if (view === 'top') {
    rig.camera.fov = 40;
    rig.camera.position.set(0, 52, 0.01);
    rig.camera.lookAt(0, 0, 0);
    rig.camera.updateProjectionMatrix();
  }

  if (camPos?.length === 3 && camPos.every(Number.isFinite)) {
    rig.camera.fov = 40;
    rig.camera.position.set(camPos[0], camPos[1], camPos[2]);
    rig.camera.lookAt(camLook[0], camLook[1], camLook[2]);
    rig.camera.updateProjectionMatrix();
  }

  const input = new Input(renderer.domElement);
  const fx = new Fx(scene);
  const chickens = new Chickens(level.colliders);
  scene.add(chickens.group);
  let seeker: Seeker | null = null;
  const hiding = new HidingController({ level, player, fx, camera: rig.camera, scene, input, pos, touch: coarse || q.has('buttons'), hunt: q.get('hunt') !== '0', eye: () => seeker?.eye ?? null });
  const SEEKER_START = { x: 11, z: -1, yaw: -Math.PI / 2 };
  if (q.get('seeker') !== '0') {
    seeker = new Seeker(
      { colliders: level.colliders, bounds: level.bounds, spots: level.hidingSpots.map((s) => ({ id: s.id, position: s.position, facing: s.facing })), blocked: (a, b) => hiding.probe.blocked(a, b) },
      fx,
      scene,
    );
    seeker.reset(SEEKER_START);
    if (q.has('ai')) seeker.setDebug(true);
  }
  if (q.has('autowalk')) {
    // loop around the yard: east along the north side, south, west, north
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

  // --- HUD
  const hint = overlay('left:50%;bottom:14px;transform:translateX(-50%);font-size:12px;opacity:.85;text-align:center;pointer-events:none');
  hint.textContent = coarse ? 'Drag to walk · tap Eyedropper, then a surface, to paint' : ''; // on desktop the keycap card in the HUD says it all
  const stats = overlay('left:8px;bottom:8px;font:11px monospace;background:#0008;padding:4px 6px;border-radius:4px;display:none;pointer-events:none');
  const spotList = overlay('left:8px;top:250px;max-width:340px;max-height:calc(100% - 300px);overflow:auto;background:#000b;padding:8px 10px;border-radius:6px;font:11px/1.5 monospace;display:none');
  spotList.innerHTML =
    '<b>Hiding spots (base colour read from userData.baseColor)</b><br>' +
    level.hidingSpots
      .map((s) => `<span style="display:inline-block;width:11px;height:11px;background:#${s.baseColor.getHexString()};border:1px solid #fff8;vertical-align:-1px"></span> #${s.baseColor.getHexString()} ${s.label} <span style="opacity:.6">(${s.shape})</span>`)
      .join('<br>');
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
  });
  const aiText = overlay('left:74px;top:214px;font:11px/1.45 monospace;background:#000b;padding:6px 8px;border-radius:6px;display:none;pointer-events:none;white-space:pre');
  addEventListener('keydown', (e) => {
    if (e.code === 'KeyJ' && seeker) {
      seeker.setDebug(!seeker.debug);
      hiding.toast(seeker.debug ? 'AI debug on' : 'AI debug off');
    }
  });
  const showStats = q.has('stats');
  if (showStats) stats.style.display = 'block';

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    rig.setAspect(innerWidth / innerHeight);
  });

  // --- sound: starts on the first gesture (browsers refuse earlier)
  mountAudioDebug();
  let soundOn = false;
  const startSound = () => {
    if (soundOn) return;
    soundOn = true;
    void audio.unlock().then(async () => {
      await audio.preload(['amb_market', 'amb_generator', 'sfx_rooster_01']);
      round?.startChant();
      void audio.loop('amb_market', { volume: 0.22 });
      const g = level.generator;
      void audio.loop('amb_generator', { volume: 1, spatial: { position: { x: g.x, y: g.y, z: g.z }, refDistance: 2.5, maxDistance: 32, rolloff: 1.7 } });
      const rooster = () => {
        void audio.playOnce('sfx_rooster_01', { volume: 0.7, distant: { gain: 0.6 } });
        window.setTimeout(rooster, 12000 + Math.random() * 18000);
      };
      window.setTimeout(rooster, 5000 + Math.random() * 6000);
    });
  };
  addEventListener('pointerdown', startSound, { once: true });
  addEventListener('keydown', startSound, { once: true });

  // --- loop
  const body = new PlayerBody(pos);
  let state: PlayerState = 'idle';
  player.play('idle', 0.01);
  let yaw = 0;
  let last = performance.now();
  let frames = 0;
  let acc = 0;
  let fps = 0;
  loading.remove();

  let wasGrounded = true;
  let firstRound = true;
  const roundHud = createRoundHud();
  const roundCfg = { ...ROUND_CONFIG, prepSeconds: Number(q.get('prep') ?? ROUND_CONFIG.prepSeconds), huntSeconds: Number(q.get('hunt_s') ?? ROUND_CONFIG.huntSeconds) };
  const round =
    q.get('round') === '0'
      ? null
      : new Round(
          {
            onPhase: (phase) => {
              if (phase === 'prep') {
                // a fresh round: back to the start (the first one starts where the URL says), the masquerade has its eyes covered
                if (!firstRound) pos.copy(level.spawn);
                firstRound = false;
                body.vx = body.vz = body.vy = 0;
                hiding.clearPose();
                if (seeker) {
                  seeker.blind = true;
                  seeker.reset(SEEKER_START);
                }
              } else if (phase === 'hunt' && seeker) {
                seeker.blind = false;
                seeker.reset();
              }
            },
          },
          roundCfg,
        );
  round?.start();
  const sense = { position: pos, speed: 0, landed: false, camo: 0, pose: null as string | null };

  /** Everything that moves, with no drawing: the animation loop calls this once a frame and the test helpers call it in fixed steps. */
  function simulate(dt: number, extra?: Partial<MoveInput>) {
    const frozen = round?.phase === 'lost';
    const raw = frozen ? { x: 0, y: 0, run: false } : { ...input.read(), ...extra };
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
    round?.update(dt);
    chickens.update(dt, [{ x: pos.x, z: pos.z, running: res.speed > 3.6 }, ...(seeker ? [{ x: seeker.position.x, z: seeker.position.z, running: false }] : [])]);
    return res;
  }

  if (seeker) {
    seeker.onCaught = () => {
      fx.caughtBurst(new THREE.Vector3(pos.x, pos.y + 1.2, pos.z));
      void audio.unlock().then(() => audio.playOnce('caught', { volume: 0.9 }));
      round?.caught();
    };
  }

  renderer.setAnimationLoop((now) => {
    const rawDt = Math.max(0, (now - last) / 1000); // the first rAF timestamp can precede `last`: never run time backwards
    const dt = Math.min(0.05, rawDt);
    last = now;

    const res = simulate(dt);
    if (round) roundHud.update(round.phase, round.left, 1, round.phase === 'lost' ? 1 : 0);
    if (seeker?.debug) aiText.textContent = seeker.describe(sense as never);
    aiText.style.display = seeker?.debug ? 'block' : 'none';
    fx.update(dt, rig.camera, renderer);

    if (!debugCam) rig.update(dt, pos, body.vx, body.vz);
    rig.fade(level.fadeGroups, pos, dt);
    lights.follow(pos);
    audio.setListener(pos.x, 1.2, pos.z, 0, 0, -1);

    renderer.render(scene, rig.camera);

    frames++;
    acc += rawDt; // real time, so a slow device reports its true fps even though the simulation step is clamped
    if (acc >= 0.5) {
      fps = frames / acc;
      frames = acc = 0;
      if (showStats) stats.textContent = `${fps.toFixed(0)} fps · ${renderer.info.render.calls} draw calls (incl. shadow pass) · ${(renderer.info.render.triangles / 1000).toFixed(0)}k tris`;
    }
  });

  if (showStats) {
    (window as unknown as { __boju: unknown }).__boju = {
      renderer,
      scene,
      camera: rig.camera,
      audio,
      input,
      body,
      seeker,
      round,
      sim(seconds: number, until?: () => boolean) {
        // runs the real per-frame logic (player, camo, seeker, chickens) in fixed 1/30 s steps; returns the seconds it ran
        let t = 0;
        for (; t < seconds; t += 1 / 30) {
          simulate(1 / 30);
          if (until?.()) break;
        }
        return +t.toFixed(2);
      },
      chickens,
      hiding,
      player,
      /** Test helper: put the follow camera on the player immediately. */
      snapCamera() {
        rig.snapTo(pos);
        rig.camera.updateMatrixWorld(true);
      },
      /** Test helper: where a world point lands on screen (client pixels). */
      screenOf(x: number, y: number, z: number) {
        const v = new THREE.Vector3(x, y, z).project(rig.camera);
        return { x: ((v.x + 1) / 2) * innerWidth, y: ((1 - v.y) / 2) * innerHeight };
      },
      /** Test helper: walks `seconds` of game time in direction (x, y on screen) at 30 steps per second, ignoring the frame rate. */
      walk(x: number, y: number, seconds: number, run = false) {
        for (let i = 0; i < seconds * 30; i++) body.update({ x, y, run }, 1 / 30, level.colliders, level.bounds);
        return { x: +pos.x.toFixed(2), y: +pos.y.toFixed(2), z: +pos.z.toFixed(2) };
      },
      /** Test helper: press jump, then run `seconds` of physics steps in direction (x, y). */
      jump(x: number, y: number, seconds: number, run = false) {
        let peak = pos.y;
        for (let i = 0; i < seconds * 30; i++) {
          body.update({ x, y, run, jump: i === 0 }, 1 / 30, level.colliders, level.bounds);
          peak = Math.max(peak, pos.y);
        }
        return { x: +pos.x.toFixed(2), y: +pos.y.toFixed(2), z: +pos.z.toFixed(2), peak: +peak.toFixed(2) };
      },
      level,
      get fps() {
        return fps;
      },
      pos,
    };
  }
}
