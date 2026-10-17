// Procedural low-poly player built from a start.ng character style. Forward is +z, feet at y = 0.
import * as THREE from 'three';
import { toon, facet } from './toon';
import { Animator, type Clip, type Pose } from './animator';
import { bakeSkinned } from './bake';

// --- start.ng style object ---------------------------------------------------

export const BODIES = ['female', 'male'] as const;
export const HAIRS = ['short', 'afro', 'braids', 'bun', 'ponytail', 'dreads', 'bald'] as const;
export const HATS = ['none', 'cap', 'beanie', 'tophat', 'crown'] as const;
export const ACCESSORIES = ['none', 'glasses', 'earrings', 'beard', 'scarf', 'backpack'] as const;

export interface StartNgStyle {
  body: (typeof BODIES)[number];
  primaryColor: string;
  secondaryColor: string;
  skinColor: string;
  hairColor: string;
  hair: (typeof HAIRS)[number];
  hat: (typeof HATS)[number];
  accessory: (typeof ACCESSORIES)[number];
}

export const DEFAULT_STYLE: StartNgStyle = {
  body: 'male',
  primaryColor: '#3b82f6',
  secondaryColor: '#374151',
  skinColor: '#c68642',
  hairColor: '#2b1b12',
  hair: 'short',
  hat: 'none',
  accessory: 'none',
};

const pick = <T extends string>(list: readonly T[], v: unknown, fallback: T): T =>
  typeof v === 'string' && (list as readonly string[]).includes(v) ? (v as T) : fallback;
const color = (v: unknown, fallback: string) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : fallback);

/** Accepts null, partial or future-extended style objects; anything unknown falls back to defaults. */
export function resolveStyle(input?: Record<string, unknown> | null): StartNgStyle {
  const s = input ?? {};
  const d = DEFAULT_STYLE;
  return {
    body: pick(BODIES, s.body, d.body),
    primaryColor: color(s.primaryColor, d.primaryColor),
    secondaryColor: color(s.secondaryColor, d.secondaryColor),
    skinColor: color(s.skinColor, d.skinColor),
    hairColor: color(s.hairColor, d.hairColor),
    hair: pick(HAIRS, s.hair, d.hair),
    hat: pick(HATS, s.hat, d.hat),
    accessory: pick(ACCESSORIES, s.accessory, d.accessory),
  };
}

/** Picks a scarf colour that stands out from the player's top and skin. */
const SCARF_CANDIDATES = ['#ffd23f', '#e63946', '#ffffff', '#1d3557', '#2a9d8f', '#f4a261', '#7b2cbf'];
function scarfColor(style: StartNgStyle): string {
  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const dist = (a: string, b: string) => {
    const [r1, g1, b1] = rgb(a);
    const [r2, g2, b2] = rgb(b);
    return Math.sqrt(2 * (r1 - r2) ** 2 + 4 * (g1 - g2) ** 2 + 3 * (b1 - b2) ** 2);
  };
  let best = SCARF_CANDIDATES[0];
  let bestScore = -1;
  for (const c of SCARF_CANDIDATES) {
    const score = dist(c, style.primaryColor) + 0.5 * dist(c, style.skinColor);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

// --- animation states --------------------------------------------------------

export const PLAYER_STATES = ['idle', 'walk', 'run', 'jump', 'stand_stiff', 'crouch', 'wall_flat', 'curl_ball'] as const;
export type PlayerState = (typeof PLAYER_STATES)[number];
export type PaintZone = 'top' | 'bottom';

const TAU = Math.PI * 2;

/** Shared walk/run cycle. Positive hip rx swings a leg backward (forward is +z). */
function locomotion(t: number, o: { freq: number; leg: number; knee: number; arm: number; elbow: number; bob: number; lean: number }): Pose {
  const ph = t * TAU * o.freq;
  const s = Math.sin(ph);
  const kneeL = Math.max(0, Math.cos(ph));
  const kneeR = Math.max(0, -Math.cos(ph));
  return {
    hips: { py: -o.bob * Math.abs(Math.cos(ph)) + o.bob * 0.5, ry: s * 0.08 },
    spine: { rx: o.lean, ry: -s * 0.12 },
    head: { rx: -o.lean * 0.7, ry: s * 0.04 },
    hipL: { rx: -o.leg * s },
    hipR: { rx: o.leg * s },
    kneeL: { rx: o.knee * kneeL },
    kneeR: { rx: o.knee * kneeR },
    shoulderL: { rx: o.arm * s, rz: -0.08 },
    shoulderR: { rx: -o.arm * s, rz: 0.08 },
    elbowL: { rx: -o.elbow },
    elbowR: { rx: -o.elbow },
  };
}

const PLAYER_CLIPS: Record<PlayerState, Clip<PlayerState>> = {
  idle: (t) => {
    const b = Math.sin(t * 2);
    return {
      hips: { py: b * 0.005 },
      spine: { rx: 0.02 + b * 0.012 },
      head: { ry: Math.sin(t * 0.7) * 0.18, rx: Math.sin(t * 1.1) * 0.04 },
      shoulderL: { rz: -0.07 - b * 0.01 },
      shoulderR: { rz: 0.07 + b * 0.01 },
      elbowL: { rx: -0.12 },
      elbowR: { rx: -0.12 },
    };
  },
  // In the air: arms up and out, one knee driven forward, the other trailing.
  jump: (t) => {
    const k = Math.min(1, t / 0.12);
    return {
      hips: { py: 0.03 * k },
      spine: { rx: 0.1 * k },
      head: { rx: -0.1 * k },
      hipL: { rx: -0.85 * k },
      kneeL: { rx: 1.2 * k },
      hipR: { rx: 0.35 * k },
      kneeR: { rx: 0.7 * k },
      shoulderL: { rx: -2.3 * k, rz: -0.45 * k },
      shoulderR: { rx: -2.3 * k, rz: 0.45 * k },
      elbowL: { rx: -0.35 * k },
      elbowR: { rx: -0.35 * k },
    };
  },
  walk: (t) => locomotion(t, { freq: 1.0, leg: 0.5, knee: 0.7, arm: 0.45, elbow: 0.25, bob: 0.025, lean: 0.04 }),
  run: (t) => locomotion(t, { freq: 1.6, leg: 0.95, knee: 1.5, arm: 0.95, elbow: 1.2, bob: 0.06, lean: 0.28 }),
  // Rigid, trying very hard to be a statue.
  stand_stiff: (t) => ({
    spine: { rx: -0.03 },
    head: { rx: 0.02, ry: Math.sin(t * 40) * 0.003 },
    shoulderL: { rz: -0.04, py: 0.02 },
    shoulderR: { rz: 0.04, py: 0.02 },
    hipL: { rz: -0.01 },
    hipR: { rz: 0.01 },
  }),
  crouch: (t) => {
    const b = Math.sin(t * 2.2) * 0.01;
    return {
      hips: { py: -0.45 + b, pz: -0.04 },
      spine: { rx: 0.55 },
      head: { rx: -0.4 },
      hipL: { rx: -1.25, rz: -0.08 },
      hipR: { rx: -1.25, rz: 0.08 },
      kneeL: { rx: 1.95 },
      kneeR: { rx: 1.95 },
      shoulderL: { rx: -0.75, rz: 0.1 },
      shoulderR: { rx: -0.75, rz: -0.1 },
      elbowL: { rx: -1.1 },
      elbowR: { rx: -1.1 },
    };
  },
  // Back against a wall: arms pressed out flat, head turned, body squashed front to back.
  wall_flat: (t) => ({
    root: { sz: -0.5 },
    spine: { rx: -0.05 },
    head: { ry: 1.0 + Math.sin(t * 1.5) * 0.04, rz: 0.05 },
    shoulderL: { rz: -0.42 },
    shoulderR: { rz: 0.42 },
    elbowL: { rx: -0.05 },
    elbowR: { rx: -0.05 },
    hipL: { rz: -0.08 },
    hipR: { rz: 0.08 },
  }),
  // A tight bundle: knees to chest, back rounded, head tucked between the shoulders, arms hugging the shins.
  // From above it should read as one rounded lump (a sack of rice), not a person kneeling.
  curl_ball: (t) => {
    const b = Math.sin(t * 2.4) * 0.008;
    return {
      root: { sx: 0.1, sy: -0.06, sz: 0.12 },
      hips: { py: -0.76 + b, pz: -0.12 },
      spine: { rx: 0.6 },
      head: { rx: 1.3, py: -0.3, pz: -0.1 },
      hipL: { rx: -2.35, rz: 0.06 },
      hipR: { rx: -2.35, rz: -0.06 },
      kneeL: { rx: 2.6 },
      kneeR: { rx: 2.6 },
      shoulderL: { rx: -0.85, rz: 0.5 },
      shoulderR: { rx: -0.85, rz: -0.5 },
      elbowL: { rx: -2.2 },
      elbowR: { rx: -2.2 },
    };
  },
};

// --- builder -----------------------------------------------------------------

const limb = (len: number, rTop: number, rBot: number, seg = 6) =>
  facet(new THREE.CylinderGeometry(rTop, rBot, len, seg).translate(0, -len / 2, 0));

const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
};

export interface Character {
  readonly group: THREE.Group;
  readonly style: StartNgStyle;
  readonly animator: Animator<PlayerState>;
  /** Recolour clothing at runtime (painting). Changes the shared material, so every part of the zone follows. */
  setZoneColor(zone: PaintZone, c: THREE.ColorRepresentation): void;
  getZoneColor(zone: PaintZone): THREE.Color;
  /** Hunt phase: hides hat, accessory and hair so the player is just a plain painted body. */
  setHuntMode(on: boolean): void;
  readonly huntMode: boolean;
  play(state: PlayerState, blendTime?: number): void;
  update(dt: number): void;
  dispose(): void;
}

export function createCharacter(input?: Record<string, unknown> | null): Character {
  const style = resolveStyle(input);
  const female = style.body === 'female';

  const topMat = toon(style.primaryColor);
  const bottomMat = toon(style.secondaryColor, female ? { side: THREE.DoubleSide } : {});
  const skinMat = toon(style.skinColor);
  const hairMat = toon(style.hairColor);
  const shoeMat = toon('#2a2320');
  const darkMat = toon('#1a1414');
  const goldMat = toon('#ffc400');
  const owned: THREE.Material[] = [topMat, bottomMat, skinMat, hairMat, shoeMat, darkMat, goldMat];
  const mat = (c: THREE.ColorRepresentation, p?: THREE.MeshToonMaterialParameters) => {
    const m = toon(c, p);
    owned.push(m);
    return m;
  };

  // `group` belongs to the game (position, facing); `rig` is the animated root inside it.
  const group = new THREE.Group();
  const rig = new THREE.Group();
  group.add(rig);
  const J: Record<string, THREE.Object3D> = { root: rig };
  const bones: THREE.Bone[] = [];
  const joint = (name: string, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
    const o = new THREE.Bone();
    bones.push(o);
    o.name = name;
    o.position.set(x, y, z);
    parent.add(o);
    J[name] = o;
    return o;
  };

  // skeleton
  const hips = joint('hips', rig, 0, 0.95, 0);
  const spine = joint('spine', hips, 0, 0.05, 0);
  const head = joint('head', spine, 0, 0.55, 0);
  const sw = female ? 0.22 : 0.27;
  const shoulderL = joint('shoulderL', spine, -sw, 0.44);
  const shoulderR = joint('shoulderR', spine, sw, 0.44);
  const elbowL = joint('elbowL', shoulderL, 0, -0.3);
  const elbowR = joint('elbowR', shoulderR, 0, -0.3);
  const hipL = joint('hipL', hips, -0.1, -0.05);
  const hipR = joint('hipR', hips, 0.1, -0.05);
  const kneeL = joint('kneeL', hipL, 0, -0.45);
  const kneeR = joint('kneeR', hipR, 0, -0.45);

  // torso, pelvis, neck, head
  const torso = facet(new THREE.CylinderGeometry(female ? 0.18 : 0.23, female ? 0.15 : 0.18, 0.5, 8));
  torso.scale(1, 1, 0.62);
  spine.add(mesh(torso, topMat, 0, 0.25));
  hips.add(mesh(facet(new THREE.CylinderGeometry(female ? 0.2 : 0.18, 0.19, 0.2, 8).scale(1, 1, 0.7)), bottomMat, 0, -0.02));
  spine.add(mesh(facet(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 6)), skinMat, 0, 0.55));
  const skull = mesh(facet(new THREE.SphereGeometry(0.17, 8, 6)), skinMat, 0, 0.15);
  head.add(skull);
  for (const sx of [-1, 1]) {
    skull.add(mesh(new THREE.SphereGeometry(0.022, 6, 4), darkMat, sx * 0.065, 0.015, 0.158));
    const ear = mesh(new THREE.SphereGeometry(0.035, 6, 4), skinMat, sx * 0.168, -0.005, 0);
    ear.scale.set(0.5, 1.2, 0.9);
    skull.add(ear);
  }
  skull.add(mesh(new THREE.BoxGeometry(0.06, 0.012, 0.01), darkMat, 0, -0.07, 0.165));
  skull.add(mesh(facet(new THREE.SphereGeometry(0.025, 5, 4)), skinMat, 0, -0.02, 0.18));

  // arms: sleeve (top colour) + forearm and hand (skin)
  for (const [sh, el] of [[shoulderL, elbowL], [shoulderR, elbowR]] as const) {
    sh.add(mesh(facet(new THREE.SphereGeometry(0.075, 6, 4)), topMat));
    sh.add(mesh(limb(0.3, 0.06, 0.052), topMat));
    el.add(mesh(limb(0.27, 0.048, 0.04), skinMat));
    el.add(mesh(facet(new THREE.SphereGeometry(0.055, 6, 4)), skinMat, 0, -0.29, 0));
  }

  // legs: trousers or skirt (bottom colour), shoes
  for (const [hp, kn] of [[hipL, kneeL], [hipR, kneeR]] as const) {
    hp.add(mesh(limb(0.45, 0.09, 0.075), bottomMat));
    kn.add(mesh(limb(0.45, 0.07, 0.05), female ? skinMat : bottomMat));
    kn.add(mesh(facet(new THREE.BoxGeometry(0.11, 0.07, 0.22)), shoeMat, 0, -0.43, 0.05));
  }
  if (female) {
    hips.add(mesh(facet(new THREE.CylinderGeometry(0.19, 0.31, 0.42, 8, 1, true)), bottomMat, 0, -0.17));
  }

  // --- hair, hats, accessories (kept in lists so hunt mode can hide them) ---
  const hair: THREE.Object3D[] = [];
  const hat: THREE.Object3D[] = [];
  const acc: THREE.Object3D[] = [];
  const onHead = (o: THREE.Object3D, list: THREE.Object3D[], parent: THREE.Object3D = skull) => {
    parent.add(o);
    list.push(o);
    return o;
  };

  const cap = () => {
    const c = mesh(facet(new THREE.SphereGeometry(0.182, 8, 6, 0, TAU, 0, Math.PI * 0.46)), hairMat, 0, 0.005, -0.012);
    c.rotation.x = -0.18;
    return c;
  };
  const bulky = style.hair === 'afro' || style.hair === 'dreads' || style.hair === 'bun';

  switch (style.hair) {
    case 'short':
      onHead(cap(), hair);
      break;
    case 'afro':
      onHead(mesh(facet(new THREE.SphereGeometry(0.245, 9, 7)), hairMat, 0, 0.1, -0.08), hair);
      break;
    case 'bun':
      onHead(cap(), hair);
      onHead(mesh(facet(new THREE.SphereGeometry(0.08, 6, 5)), hairMat, 0, 0.2, -0.07), hair);
      break;
    case 'ponytail': {
      onHead(cap(), hair);
      const tail = mesh(limb(0.34, 0.05, 0.02), hairMat, 0, 0.1, -0.17);
      tail.rotation.x = 0.35;
      onHead(tail, hair);
      break;
    }
    case 'braids':
      onHead(cap(), hair);
      for (const [x, z] of [[-0.16, 0.03], [0.16, 0.03], [-0.1, -0.13], [0.1, -0.13]]) {
        const braid = new THREE.Group();
        for (let i = 0; i < 7; i++) braid.add(mesh(facet(new THREE.SphereGeometry(0.036 - i * 0.002, 5, 4)), hairMat, 0, -i * 0.052, 0));
        braid.add(mesh(facet(new THREE.SphereGeometry(0.03, 5, 4)), goldMat, 0, -7 * 0.052, 0));
        braid.position.set(x, 0.0, z);
        onHead(braid, hair);
      }
      break;
    case 'dreads':
      onHead(cap(), hair);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU;
        if (Math.cos(a) > 0.75) continue; // keep the face clear
        const len = 0.28 + (i % 3) * 0.06;
        const d = mesh(limb(len, 0.026, 0.018, 5), hairMat, Math.sin(a) * 0.17, 0.06, -Math.cos(a) * 0.17 * 0.9);
        d.rotation.set(Math.cos(a) * 0.12, 0, -Math.sin(a) * 0.12);
        onHead(d, hair);
      }
      break;
    case 'bald':
      break;
  }

  const hatY = bulky ? 0.27 : 0.14;
  const hatScale = style.hair === 'afro' ? 1.18 : bulky ? 1.08 : 1;
  const hatRoot = new THREE.Group();
  hatRoot.position.set(0, hatY, style.hair === 'afro' ? -0.04 : 0);
  hatRoot.scale.setScalar(hatScale);
  switch (style.hat) {
    case 'cap': {
      const m = mat('#d1495b');
      hatRoot.add(mesh(facet(new THREE.SphereGeometry(0.19, 8, 6, 0, TAU, 0, Math.PI * 0.5)), m, 0, 0, 0));
      const brim = mesh(facet(new THREE.CylinderGeometry(0.19, 0.19, 0.016, 10, 1, false, -Math.PI / 2, Math.PI)), m, 0, 0.0, 0.12);
      brim.scale.set(1, 1, 0.9);
      hatRoot.add(brim);
      break;
    }
    case 'beanie': {
      const m = mat('#2a9d8f');
      hatRoot.add(mesh(facet(new THREE.SphereGeometry(0.2, 8, 6, 0, TAU, 0, Math.PI * 0.55)), m, 0, -0.01, 0));
      hatRoot.add(mesh(facet(new THREE.TorusGeometry(0.19, 0.03, 4, 10)).rotateX(Math.PI / 2), mat('#e9c46a'), 0, -0.07, 0));
      hatRoot.add(mesh(facet(new THREE.SphereGeometry(0.05, 6, 5)), mat('#e9c46a'), 0, 0.2, 0));
      break;
    }
    case 'tophat': {
      const m = mat('#1d1d24');
      hatRoot.add(mesh(facet(new THREE.CylinderGeometry(0.27, 0.27, 0.02, 12)), m, 0, 0, 0));
      hatRoot.add(mesh(facet(new THREE.CylinderGeometry(0.15, 0.16, 0.28, 10)), m, 0, 0.15, 0));
      hatRoot.add(mesh(facet(new THREE.CylinderGeometry(0.163, 0.168, 0.05, 10)), mat('#b3202a'), 0, 0.045, 0));
      break;
    }
    case 'crown': {
      const ring = facet(new THREE.CylinderGeometry(0.17, 0.16, 0.08, 10, 1, true));
      hatRoot.add(mesh(ring, mat('#ffc400', { side: THREE.DoubleSide }), 0, 0.04, 0));
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * TAU;
        const x = Math.sin(a) * 0.165;
        const z = Math.cos(a) * 0.165;
        hatRoot.add(mesh(facet(new THREE.ConeGeometry(0.04, 0.13, 4)), goldMat, x, 0.14, z));
        hatRoot.add(mesh(facet(new THREE.SphereGeometry(0.022, 5, 4)), mat(i % 2 ? '#e63946' : '#2ec4b6'), x, 0.22, z));
      }
      break;
    }
    case 'none':
      break;
  }
  if (style.hat !== 'none') onHead(hatRoot, hat);

  switch (style.accessory) {
    case 'glasses': {
      const g = new THREE.Group();
      for (const sx of [-1, 1]) g.add(mesh(facet(new THREE.TorusGeometry(0.045, 0.009, 4, 10)), darkMat, sx * 0.07, 0.02, 0.165));
      g.add(mesh(new THREE.BoxGeometry(0.05, 0.01, 0.01), darkMat, 0, 0.03, 0.165));
      for (const sx of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.008, 0.008, 0.17), darkMat, sx * 0.118, 0.03, 0.08));
      onHead(g, acc);
      break;
    }
    case 'earrings':
      for (const sx of [-1, 1]) {
        const e = new THREE.Group();
        e.add(mesh(facet(new THREE.SphereGeometry(0.02, 5, 4)), goldMat));
        e.add(mesh(facet(new THREE.SphereGeometry(0.03, 5, 4)), goldMat, 0, -0.045, 0));
        e.position.set(sx * 0.178, -0.04, 0.01);
        onHead(e, acc);
      }
      break;
    case 'beard': {
      // A cap of the skull sphere from the lip line down (polar angle 112..170 deg), front half only, so it can't reach the eyes
      // (eyes sit near 85 deg) or the ears.
      const beard = mesh(
        facet(new THREE.SphereGeometry(0.182, 10, 6, Math.PI / 2 - 1.1, 2.2, Math.PI * 0.62, Math.PI * 0.3)),
        hairMat,
        0,
        0,
        0.012,
      );
      beard.scale.set(1, 1, 1.08);
      onHead(beard, acc);
      onHead(mesh(facet(new THREE.SphereGeometry(0.045, 6, 4)), hairMat, 0, -0.145, 0.15), acc); // chin tuft
      break;
    }
    case 'scarf': {
      // two turns stacked around the neck, sitting on the shoulders and tucked under the chin, plus a tail down the chest
      const s = new THREE.Group();
      const sm = mat(scarfColor(style));
      const turn1 = mesh(facet(new THREE.TorusGeometry(0.125, 0.048, 6, 12)).rotateX(Math.PI / 2), sm, 0, 0.515, 0);
      turn1.scale.set(1, 1, 0.9);
      const turn2 = mesh(facet(new THREE.TorusGeometry(0.108, 0.04, 6, 12)).rotateX(Math.PI / 2), sm, 0, 0.555, 0);
      turn2.rotation.x = 0.12;
      s.add(turn1, turn2);
      const tail = mesh(facet(new THREE.BoxGeometry(0.1, 0.3, 0.03)), sm, 0.075, 0.33, 0.165);
      tail.rotation.z = 0.06;
      s.add(tail);
      for (let i = 0; i < 4; i++) s.add(mesh(new THREE.BoxGeometry(0.014, 0.05, 0.02), sm, 0.04 + i * 0.023, 0.165, 0.158)); // fringe
      spine.add(s);
      acc.push(s);
      break;
    }
    case 'backpack': {
      const bp = new THREE.Group();
      const m = mat('#b5651d');
      bp.add(mesh(facet(new THREE.BoxGeometry(0.3, 0.4, 0.16)), m, 0, 0, 0));
      bp.add(mesh(facet(new THREE.BoxGeometry(0.22, 0.14, 0.05)), mat('#8c4a12'), 0, -0.06, -0.1));
      for (const sx of [-1, 1]) bp.add(mesh(new THREE.BoxGeometry(0.04, 0.38, 0.02), darkMat, sx * 0.1, 0.02, 0.1));
      bp.position.set(0, 0.28, -0.2);
      spine.add(bp);
      acc.push(bp);
      break;
    }
    case 'none':
      break;
  }

  // Merge every static part into a handful of skinned meshes (one draw call each). Top and bottom stay on their own
  // paintable materials; everything else uses vertex colours. Hair, hat and accessory stay separate so hunt mode can hide them.
  const bodyMat = toon('#ffffff', { vertexColors: true });
  const layerMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide }); // crown ring is open
  owned.push(bodyMat, layerMat);
  const meshesOf = (list: THREE.Object3D[]) => {
    const set = new Set<THREE.Mesh>();
    list.forEach((o) => o.traverse((c) => c instanceof THREE.Mesh && set.add(c)));
    return set;
  };
  const hairSet = meshesOf(hair);
  const hatSet = meshesOf(hat);
  const accSet = meshesOf(acc);
  const parts = { top: [], bottom: [], body: [], hair: [], hat: [], acc: [] } as Record<string, THREE.Mesh[]>;
  rig.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    if (o.material === topMat) parts.top.push(o);
    else if (o.material === bottomMat) parts.bottom.push(o);
    else if (hairSet.has(o)) parts.hair.push(o);
    else if (hatSet.has(o)) parts.hat.push(o);
    else if (accSet.has(o)) parts.acc.push(o);
    else parts.body.push(o);
  });
  const baked = bakeSkinned(rig, bones, [
    { meshes: parts.top, material: topMat, vertexColors: false },
    { meshes: parts.bottom, material: bottomMat, vertexColors: false },
    { meshes: parts.body, material: bodyMat, vertexColors: true },
    { meshes: parts.hair, material: bodyMat, vertexColors: true },
    { meshes: parts.hat, material: layerMat, vertexColors: true },
    { meshes: parts.acc, material: bodyMat, vertexColors: true },
  ]);
  // baked meshes come back in group order, skipping empty groups
  const nonEmpty = ['top', 'bottom', 'body', 'hair', 'hat', 'acc'].filter((k) => parts[k].length);
  const layerMeshes: THREE.Object3D[] = baked.filter((_, i) => ['hair', 'hat', 'acc'].includes(nonEmpty[i]));

  let huntMode = false;
  const animator = new Animator<PlayerState>(J, PLAYER_CLIPS, 'idle');

  return {
    group,
    style,
    animator,
    get huntMode() {
      return huntMode;
    },
    setZoneColor(zone, c) {
      (zone === 'top' ? topMat : bottomMat).color.set(c);
    },
    getZoneColor(zone) {
      return (zone === 'top' ? topMat : bottomMat).color.clone();
    },
    setHuntMode(on) {
      huntMode = on;
      for (const o of layerMeshes) o.visible = !on;
    },
    play: (state, blendTime) => animator.play(state, blendTime),
    update: (dt) => animator.update(dt),
    dispose() {
      baked.forEach((m) => m.geometry.dispose());
      owned.forEach((m) => m.dispose());
    },
  };
}
