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
import { Input, stepPlayer, type MoveInput } from './controller';
import { HidingController } from './hiding';
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
  const hiding = new HidingController({ level, player, fx, camera: rig.camera, scene, input, pos, touch: coarse || q.has('buttons'), hunt: q.get('hunt') !== '0' });
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
  hint.textContent = coarse ? 'Drag to walk · Eyedropper then tap a surface to paint · tap for sound' : 'WASD walk, Shift run · hold E + click: eyedropper · Q zone · 1-4 poses · H hunt mode · C camo text · M spots';
  const stats = overlay('left:8px;bottom:8px;font:11px monospace;background:#0008;padding:4px 6px;border-radius:4px;display:none;pointer-events:none');
  const spotList = overlay('left:8px;top:8px;max-width:340px;max-height:calc(100% - 60px);overflow:auto;background:#000b;padding:8px 10px;border-radius:6px;font:11px/1.5 monospace;display:none');
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
  let state: PlayerState = 'idle';
  player.play('idle', 0.01);
  let yaw = 0;
  let last = performance.now();
  let frames = 0;
  let acc = 0;
  let fps = 0;
  loading.remove();

  renderer.setAnimationLoop((now) => {
    const rawDt = (now - last) / 1000;
    const dt = Math.min(0.05, rawDt);
    last = now;

    const move = stepPlayer(pos, input.read(), dt, level.colliders, level.bounds);
    if (move.heading !== null) {
      let d = move.heading - yaw;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      yaw += d * Math.min(1, dt * 14);
    }
    const held = hiding.update(dt, { speed: move.speed, yaw });
    if (held.yaw !== null) {
      const d = Math.atan2(Math.sin(held.yaw - yaw), Math.cos(held.yaw - yaw));
      yaw += d * Math.min(1, dt * 14);
    }
    const next: PlayerState = move.speed === 0 ? held.state : move.speed > 3.5 ? 'run' : 'walk';
    if (next !== state) {
      state = next;
      player.play(state, 0.2);
    }
    player.group.position.copy(pos);
    player.group.rotation.y = yaw;
    player.update(dt);
    fx.update(dt, rig.camera, renderer);

    if (!debugCam) rig.update(dt, pos);
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
        for (let i = 0; i < seconds * 30; i++) stepPlayer(pos, { x, y, run }, 1 / 30, level.colliders, level.bounds);
        return { x: +pos.x.toFixed(2), z: +pos.z.toFixed(2) };
      },
      level,
      get fps() {
        return fps;
      },
      pos,
    };
  }
}
