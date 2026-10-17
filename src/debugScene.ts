// /?debug test scene: every pose and animation, three sample start.ng styles plus a fallback case, painting and hunt mode.
// URL knobs for screenshots: &p=<player state> &m=<masquerade state> &hunt=1 &cam=chars|masq|masqclose|masqtop|compare|side|masqside|top|topclose|face1|face2 &only=<char index> &susp=0..1 &burst=1 &splash=1 &masq=0 &yaw=<radians for the masquerade>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCharacter, PLAYER_STATES, type Character, type PlayerState } from './character';
import { createMasquerade, MASQUERADE_STATES, type MasqueradeState } from './masquerade';
import { toon } from './toon';
import { Fx, applyPixelRatio } from './fx';

const SAMPLE_STYLES: { label: string; style: Record<string, unknown> | null }[] = [
  {
    label: 'crown + braids',
    style: { body: 'female', primaryColor: '#f4a300', secondaryColor: '#2b4c9b', skinColor: '#8d5524', hairColor: '#1b1b1b', hair: 'braids', hat: 'crown', accessory: 'earrings' },
  },
  {
    label: 'afro + beard',
    style: { body: 'male', primaryColor: '#2fa84f', secondaryColor: '#e8d9b5', skinColor: '#c68642', hairColor: '#3b2314', hair: 'afro', hat: 'none', accessory: 'beard' },
  },
  {
    label: 'top hat + dreads + scarf',
    style: { body: 'male', primaryColor: '#d94f4f', secondaryColor: '#33384d', skinColor: '#f1c27d', hairColor: '#e0b040', hair: 'dreads', hat: 'tophat', accessory: 'scarf' },
  },
  {
    label: 'bun + beanie + glasses',
    style: { body: 'female', primaryColor: '#7b2cbf', secondaryColor: '#222831', skinColor: '#e0ac69', hairColor: '#5a3825', hair: 'bun', hat: 'beanie', accessory: 'glasses' },
  },
  { label: 'fallback (unknown values)', style: { body: 'robot', hair: 'mohawk', hat: 'wizard', primaryColor: 'blue', accessory: 5 } },
];

const WALL_COLOR = '#c98a4b';

export function startDebugScene(): void {
  const q = new URLSearchParams(location.search);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  applyPixelRatio(renderer);
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#8fc7e8');
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(3, 6, 4);
  scene.add(sun, new THREE.HemisphereLight(0xffffff, 0x8a7a66, 1.2));

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), toon('#7fb069'));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // wall in the same toon material as the characters' clothes: this is the "blend in" reference
  const wall = new THREE.Mesh(new THREE.BoxGeometry(11, 2.6, 0.25), toon(WALL_COLOR));
  wall.position.set(0, 1.3, -1.2);
  scene.add(wall);

  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
  // default view is shifted left so the side panel doesn't cover the first character
  const cams: Record<string, [number[], number[]]> = {
    default: [[-0.8, 2.4, 9.5], [-0.8, 1.0, 0]],
    chars: [[-1.5, 1.4, 7.4], [-1.5, 0.95, 0]],
    masq: [[3.9, 1.7, 7.6], [3.9, 1.3, 0]],
    masqclose: [[3.9, 1.95, 4.6], [3.9, 1.45, 0]],
    masqtop: [[3.9, 5.6, 2.8], [3.9, 0, 0]],
    compare: [[2.6, 1.5, 8.6], [2.6, 1.25, 0]],
    face1: [[-3.0, 1.74, 1.4], [-3.0, 1.68, 0]],
    face2: [[-1.5, 1.66, 1.6], [-1.5, 1.52, 0]],
    side: [[3.0, 1.0, 0], [-4.5, 0.8, 0]],
    top: [[-1.5, 5.0, 1.0], [-1.5, 0, 0]], // roughly what a top-down game camera sees
    topclose: [[-4.2, 2.6, 0.5], [-4.2, 0, 0]],
    masqside: [[9.5, 1.5, 0], [3.9, 1.3, 0]],
  };
  const [camPos, camTarget] = cams[q.get('cam') ?? 'default'] ?? cams.default;
  camera.position.set(...(camPos as [number, number, number]));
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...(camTarget as [number, number, number]));
  controls.update();

  // characters
  const chars: Character[] = SAMPLE_STYLES.map((s, i) => {
    const c = createCharacter(s.style);
    c.group.position.set(-4.5 + i * 1.5, 0, 0);
    scene.add(c.group);
    return c;
  });
  const masqYaw = Number(q.get('yaw') ?? -0.35);
  const masq = createMasquerade();
  masq.group.position.set(3.9, 0, 0);
  masq.group.rotation.y = masqYaw;
  scene.add(masq.group);

  if (q.get('masq') === '0') masq.group.visible = false;
  const only = q.get('only');
  if (only !== null) chars.forEach((c, i) => (c.group.visible = i === Number(only)));
  // effects
  const fx = new Fx(scene);
  fx.dust.setArea(new THREE.Vector3(-0.8, 1.6, 0.5), new THREE.Vector3(16, 3.2, 8), sun.position.clone().negate());
  const cone = fx.addVisionCone(masq.group, 5, 70);
  const bang = fx.addSuspicionIndicator(masq.group);
  let suspicion = Number(q.get('susp') ?? 0);
  const setSuspicion = (v: number) => {
    suspicion = v;
    cone.setSuspicion(v);
    bang.set(v);
  };
  setSuspicion(suspicion);
  const torso = new THREE.Vector3();
  const splashAt = (c: Character, zone: 'top' | 'bottom') => {
    c.group.getWorldPosition(torso);
    torso.y += zone === 'top' ? 1.25 : 0.6;
    fx.paintSplash(torso, c.getZoneColor(zone));
  };
  const burstAt = () => {
    masq.group.getWorldPosition(torso);
    torso.y += 1.5;
    fx.caughtBurst(torso);
  };

  const pState = q.get('p') as PlayerState | null;
  if (pState && PLAYER_STATES.includes(pState)) chars.forEach((c) => c.play(pState, 0.001));
  const mState = q.get('m') as MasqueradeState | null;
  if (mState && MASQUERADE_STATES.includes(mState)) masq.play(mState, 0.001);
  if (q.get('splash') === '1') setTimeout(() => chars.forEach((c) => splashAt(c, 'top')), 2150);
  if (q.get('burst') === '1') setTimeout(burstAt, 2150);
  if (q.get('hunt') === '1') chars.forEach((c) => c.setHuntMode(true));

  // UI
  const ui = document.createElement('div');
  ui.style.cssText =
    'position:fixed;top:8px;left:8px;width:250px;max-height:calc(100% - 16px);overflow:auto;padding:10px;background:#000b;' +
    'color:#fff;font:12px/1.4 system-ui,sans-serif;border-radius:8px;z-index:5';
  document.body.appendChild(ui);
  const section = (title: string) => {
    const h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-weight:700;margin:8px 0 4px';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px';
    ui.append(h, row);
    return row;
  };
  const btn = (row: HTMLElement, label: string, fn: () => void) => {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = 'font:inherit;padding:3px 7px;cursor:pointer';
    b.onclick = fn;
    row.appendChild(b);
    return b;
  };

  const head = document.createElement('div');
  head.textContent = 'Boju Boju: characters (drag to orbit)';
  head.style.fontWeight = '700';
  ui.appendChild(head);

  const pr = section('Player animation / pose');
  for (const s of PLAYER_STATES) btn(pr, s, () => chars.forEach((c) => c.play(s)));

  const mr = section('Masquerade');
  for (const s of MASQUERADE_STATES) btn(mr, s, () => masq.play(s));
  let orbit = false;
  btn(mr, 'toggle: walk in circle', () => (orbit = !orbit));

  const hr = section('Hunt mode (hides hair, hat, accessory)');
  let hunt = q.get('hunt') === '1';
  btn(hr, 'toggle hunt mode', () => {
    hunt = !hunt;
    chars.forEach((c) => c.setHuntMode(hunt));
  });

  const paint = section('Paint clothing (all players)');
  const picker = (label: string, zone: 'top' | 'bottom') => {
    const l = document.createElement('label');
    l.textContent = label + ' ';
    const i = document.createElement('input');
    i.type = 'color';
    i.value = '#c98a4b';
    i.oninput = () => chars.forEach((c) => c.setZoneColor(zone, i.value));
    i.onchange = () => chars.forEach((c) => splashAt(c, zone)); // picker closed: splash in the picked colour
    l.appendChild(i);
    paint.appendChild(l);
    return i;
  };
  const topPick = picker('top', 'top');
  const botPick = picker('bottom', 'bottom');
  btn(paint, 'match wall', () => {
    chars.forEach((c) => {
      c.setZoneColor('top', WALL_COLOR);
      c.setZoneColor('bottom', WALL_COLOR);
    });
    topPick.value = botPick.value = WALL_COLOR;
  });
  btn(paint, 'match wall + wall_flat', () => {
    chars.forEach((c) => {
      c.setZoneColor('top', WALL_COLOR);
      c.setZoneColor('bottom', WALL_COLOR);
      c.play('wall_flat');
    });
  });

  const fr = section('Effects');
  btn(fr, 'paint splash (top)', () => chars.forEach((c) => splashAt(c, 'top')));
  btn(fr, 'paint splash (bottom)', () => chars.forEach((c) => splashAt(c, 'bottom')));
  btn(fr, 'caught burst', burstAt);
  let dustOn = true;
  btn(fr, 'toggle dust', () => (fx.dust.pool.points.visible = dustOn = !dustOn));
  const sl = document.createElement('label');
  sl.style.cssText = 'display:flex;gap:6px;width:100%;align-items:center';
  const slInput = document.createElement('input');
  slInput.type = 'range';
  slInput.min = '0';
  slInput.max = '1';
  slInput.step = '0.01';
  slInput.value = String(suspicion);
  slInput.style.flex = '1';
  slInput.oninput = () => setSuspicion(Number(slInput.value));
  sl.append('suspicion', slInput);
  fr.appendChild(sl);
  const stats = document.createElement('div');
  stats.style.cssText = 'width:100%;opacity:.8';
  fr.appendChild(stats);

  const legend = section('Sample styles (left to right)');
  SAMPLE_STYLES.forEach((s, i) => {
    const d = document.createElement('div');
    d.textContent = `${i + 1}. ${s.label}`;
    d.style.width = '100%';
    legend.appendChild(d);
  });

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    applyPixelRatio(renderer);
    renderer.setSize(innerWidth, innerHeight);
  });

  const clock = new THREE.Clock();
  let ang = 0;
  let statTime = 0;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.1);
    chars.forEach((c) => c.update(dt));
    if (orbit) {
      ang += dt * 0.8;
      masq.group.position.set(Math.sin(ang) * 2.2 + 1.5, 0, Math.cos(ang) * 2.2 + 1);
      masq.group.rotation.y = ang + Math.PI / 2;
    } else {
      masq.group.position.set(3.9, 0, 0);
      masq.group.rotation.y = masqYaw;
    }
    masq.update(dt);
    fx.update(dt, camera, renderer);
    controls.update();
    renderer.render(scene, camera);
    statTime += dt;
    if (statTime > 0.5) {
      statTime = 0;
      stats.textContent = `draw calls ${renderer.info.render.calls}, tris ${renderer.info.render.triangles}, pixel ratio ${renderer.getPixelRatio()}`;
    }
    document.documentElement.dataset.frames = String(Number(document.documentElement.dataset.frames ?? 0) + 1);
  });
}
