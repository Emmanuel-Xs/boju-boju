// Egungun-style masquerade seeker: a fully cloth-covered figure, a dark net panel framed and veiled with cowries, a carved wooden crest with a small figure,
// and long heavy appliqué panels (black sequin fields, zig-zag trim, fringe) hanging in three tiers from a yoke ring just under the head (so the net panel stays visible).
// White gloves and decorated boots show below the calf-length hem. Forward is +z. About 1.5x the player's height.
import * as THREE from 'three';
import { toon, toonGradient, facet } from './toon';
import { Animator, type Clip, type Pose } from './animator';
import { bakeSkinned } from './bake';

export const MASQUERADE_STATES = [
  'sing_eyes_covered',
  'search_walk',
  'look_around',
  'suspicious_lean',
  'catch_lunge',
  'victory_dance',
  'spin_wind',
  'spin_sweep',
] as const;
export type MasqueradeState = (typeof MASQUERADE_STATES)[number];

const TAU = Math.PI * 2;
const ease = (x: number) => 1 - (1 - Math.min(1, Math.max(0, x))) ** 3;

const CLIPS: Record<MasqueradeState, Clip<MasqueradeState>> = {
  // Counting with eyes covered: both hands over the net panel, swaying slowly side to side.
  sing_eyes_covered: (t) => {
    const sw = Math.sin(t * 1.8);
    return {
      body: { rz: sw * 0.035, rx: 0.02 },
      head: { rz: -sw * 0.1, ry: Math.sin(t * 0.9) * 0.1, py: Math.abs(Math.sin(t * 3.6)) * 0.012 },
      shoulderL: { rx: -1.9, rz: 0.62 },
      shoulderR: { rx: -1.9, rz: -0.62 },
      elbowL: { rx: -1.5 },
      elbowR: { rx: -1.5 },
      footL: { py: Math.max(0, sw) * 0.03 },
      footR: { py: Math.max(0, -sw) * 0.03 },
    };
  },
  search_walk: (t) => {
    const ph = t * TAU * 0.9;
    const s = Math.sin(ph);
    return {
      root: { py: Math.abs(Math.cos(ph)) * 0.02 },
      body: { rx: 0.05, rz: s * 0.03 },
      head: { ry: Math.sin(t * 0.8) * 0.75, rx: 0.05 },
      shoulderL: { rx: s * 0.4, rz: -0.3 },
      shoulderR: { rx: -s * 0.4, rz: 0.3 },
      elbowL: { rx: -0.35 },
      elbowR: { rx: -0.35 },
      footL: { pz: s * 0.18, py: Math.max(0, Math.cos(ph)) * 0.07 },
      footR: { pz: -s * 0.18, py: Math.max(0, -Math.cos(ph)) * 0.07 },
    };
  },
  // Standing still, scanning slowly, one hand shading the brow, one on the hip.
  look_around: (t) => {
    const a = Math.sin(t * 1.1);
    return {
      body: { ry: Math.sin(t * 1.1 - 0.7) * 0.25, rx: 0.03 },
      head: { ry: a * 1.0, rx: 0.04, rz: Math.sin(t * 2.2) * 0.04 },
      shoulderR: { rx: -2.3, rz: -0.25 },
      elbowR: { rx: -1.5 },
      shoulderL: { rx: 0.0, rz: -0.5 },
      elbowL: { rx: -0.9 },
    };
  },
  // Leaning in, hand at the chin, head tilted: "somebody is a suspiciously good lamp".
  suspicious_lean: (t) => ({
    body: { rx: 0.3, rz: 0.03 + Math.sin(t * 1.3) * 0.015 },
    head: { rx: 0.15, rz: 0.25, ry: Math.sin(t * 0.8) * 0.2 },
    shoulderL: { rx: -1.7, rz: 0.4 },
    elbowL: { rx: -2.1 },
    shoulderR: { rx: 0.4, rz: -0.25 },
    elbowR: { rx: -0.4 },
    footL: { pz: 0.12 },
    footR: { pz: -0.06 },
  }),
  // Gotcha: a deep ceremonial bow forward with one arm reaching out to touch the hider, the other held back. Weighty, not a pounce.
  catch_lunge: (t) => {
    const k = ease(t / 0.3);
    return {
      root: { py: 0.01 * k },
      body: { rx: 0.4 * k },
      head: { rx: -0.2 * k, ry: Math.sin(t * 6) * 0.03 * k },
      shoulderR: { rx: -1.75 * k, rz: 0.12 * k },
      elbowR: { rx: -0.15 * k },
      shoulderL: { rx: 0.35 * k, rz: -0.5 * k },
      elbowL: { rx: -0.4 * k },
      footL: { pz: 0.26 * k },
      footR: { pz: -0.2 * k },
    };
  },
  // The warning before a spin sweep: crouching, arms drawing up and out, the whole figure trembling.
  spin_wind: (t) => {
    const k = ease(t / 0.6);
    const sh = Math.sin(t * 38) * 0.012 * k;
    return {
      root: { py: -0.05 * k + sh },
      body: { rx: -0.08 * k, rz: Math.sin(t * 22) * 0.02 * k },
      head: { rx: -0.2 * k },
      shoulderL: { rx: -1.2 * k, rz: -1.15 * k },
      shoulderR: { rx: -1.2 * k, rz: 1.15 * k },
      elbowL: { rx: -0.25 * k },
      elbowR: { rx: -0.25 * k },
      footL: { pz: 0.1 * k },
      footR: { pz: -0.1 * k },
    };
  },
  // The sweep itself: arms straight out, on tiptoe. The turning is done by the whole figure, which is what flings the panels out.
  spin_sweep: (t) => {
    const s = Math.sin(t * 18);
    return {
      root: { py: 0.05 },
      body: { rz: s * 0.02 },
      head: { rx: -0.15 },
      shoulderL: { rx: -1.57, rz: -1.57 },
      shoulderR: { rx: -1.57, rz: 1.57 },
      elbowL: { rx: -0.05 },
      elbowR: { rx: -0.05 },
      footL: { py: 0.05 },
      footR: { py: 0.05 },
    };
  },
  // Spinning with arms up: the panels fly out.
  victory_dance: (t) => {
    const ph = t * TAU * 1.4;
    const s = Math.sin(ph);
    return {
      root: { py: Math.abs(s) * 0.1, ry: t * 4.5 },
      body: { rz: s * 0.06 },
      head: { rz: -s * 0.12, rx: -0.1 },
      shoulderL: { rx: -2.7, rz: -0.55 + s * 0.3 },
      shoulderR: { rx: -2.7, rz: 0.55 - s * 0.3 },
      elbowL: { rx: -0.3 },
      elbowR: { rx: -0.3 },
      footL: { py: Math.max(0, s) * 0.08 },
      footR: { py: Math.max(0, -s) * 0.08 },
    };
  },
};

// --- palette -------------------------------------------------------------------

const RED = '#8e1b1b';
const INDIGO = '#2a2f72';
const GOLD = '#d4a017';
const WHITE = '#efe6d2';
const BLACK = '#15151a';
const ROYAL = '#1f4fb0';
const WOOD = '#4a2a14';
/** Deep red, indigo, royal blue, gold, off-white and black: also the caught-burst confetti colours. */
export const MASQUERADE_COLORS = [RED, INDIGO, GOLD, WHITE, BLACK, ROYAL];

// --- layout (body-local metres; the body pivot sits on the ground) --------------

const HEAD_Y = 1.72; // neck joint
const SHOULDER_Y = 1.5;
const SHOULDER_X = 0.36;
const HOOD_Y = 0.18; // hood centre above the neck joint

interface Tier {
  n: number;
  r0: number; // radius of the ring the panels hang from, at the crown
  R: number; // radius they reach at the ground
  y: number; // crown ring height
  base: string[]; // panel colours, repeated around the ring
  hem: string; // colour of the bottom band
  decor: boolean; // cowries and sequins
  clearance: number; // gap between the hem and the ground; the outer tier ends at calf height so the boots show, inner tiers stop a little higher
  fields: number[]; // segments that carry a black (or contrasting) sequin field with a diamond motif
  bar: boolean; // gold yoke bar across the top segment
  fringe: boolean; // gold fringe hanging below the hem
  trim: [string, string] | null; // zig-zag diamonds along the hem band
}
// inner tier closest to the body, outer tier on top of the others
const TIERS: Tier[] = [
  { n: 12, r0: 0.26, R: 0.42, y: 1.74, base: [ROYAL, WHITE], hem: GOLD, decor: false, clearance: 0.47, fields: [], bar: false, fringe: false, trim: [WHITE, ROYAL] },
  { n: 16, r0: 0.29, R: 0.66, y: 1.72, base: [RED, BLACK], hem: WHITE, decor: false, clearance: 0.4, fields: [1], bar: false, fringe: false, trim: [ROYAL, RED] },
  { n: 22, r0: 0.32, R: 0.95, y: 1.7, base: [RED, ROYAL, RED, INDIGO], hem: GOLD, decor: true, clearance: 0.32, fields: [1, 2], bar: true, fringe: true, trim: [ROYAL, RED] },
];
// Appliqué colours per base cloth: the sequin field, then two motif colours that alternate between segments.
const APPLIQUE: Record<string, [string, string, string]> = {
  [RED]: [BLACK, GOLD, WHITE],
  [ROYAL]: [BLACK, RED, GOLD],
  [INDIGO]: [BLACK, GOLD, RED],
  [BLACK]: [RED, GOLD, BLACK],
  [WHITE]: [ROYAL, RED, GOLD],
};
const SEG_FRACTIONS = [0.3, 0.3, 0.28, 0.12]; // upper segments, then a hem band
const SEGS = SEG_FRACTIONS.length;
const THICKNESS = 0.022;

interface Panel {
  anchor: THREE.Matrix4;
  slope: number;
  tier: number;
  base: number; // first instance index
  lens: number[]; // segment lengths
  top: number[]; // top width of each segment
  bottom: number[]; // bottom width of each segment
  ax: number[];
  az: number[];
  vx: number[];
  vz: number[];
  phase: number;
  out: [number, number]; // unit vector pointing out of the body (x, z)
  tiles: number[]; // indices into the tile / decor lists that ride on this panel
  decors: number[];
}
/** Flat appliqué piece (box) pinned to a panel segment; rot is about the panel's outward axis. */
interface Tile {
  panel: number;
  seg: number;
  x: number; // -0.5..0.5 across the segment width
  y: number; // 0..1 down the segment (can run past 1 for fringe)
  w: number;
  h: number;
  rot: number;
  layer: number; // -1 = same plane as the panel (fringe), 0 = on the cloth, 1+ = stacked on top
  color: string;
}
interface Decor {
  panel: number;
  seg: number;
  x: number; // -0.5..0.5 across the segment width
  y: number; // 0..1 down the segment
  size: [number, number, number];
}

export interface Masquerade {
  readonly group: THREE.Group;
  readonly animator: Animator<MasqueradeState>;
  play(state: MasqueradeState, blendTime?: number): void;
  /** 0..1: the panels lift away from the body even when standing still (the warning before a spin sweep). */
  lift: number;
  /** Call every frame. Panels swing with weight as `group` moves and flare out when it spins. */
  update(dt: number): void;
  dispose(): void;
}

export function createMasquerade(): Masquerade {
  const group = new THREE.Group();
  const rig = new THREE.Group();
  group.add(rig);
  const J: Record<string, THREE.Object3D> = { root: rig };
  const bones: THREE.Bone[] = [];
  const joint = (name: string, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
    const o = new THREE.Bone();
    bones.push(o);
    o.position.set(x, y, z);
    parent.add(o);
    J[name] = o;
    return o;
  };
  const owned: THREE.Material[] = [];
  const mat = (c: THREE.ColorRepresentation, p?: THREE.MeshToonMaterialParameters) => {
    const m = toon(c, p);
    owned.push(m);
    return m;
  };
  const mesh = (geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    return o;
  };

  const body = joint('body', rig, 0, 0, 0);
  const head = joint('head', body, 0, HEAD_Y, 0);
  const shoulderL = joint('shoulderL', body, -SHOULDER_X, SHOULDER_Y);
  const shoulderR = joint('shoulderR', body, SHOULDER_X, SHOULDER_Y);
  const elbowL = joint('elbowL', shoulderL, 0, -0.42);
  const elbowR = joint('elbowR', shoulderR, 0, -0.42);
  const footL = joint('footL', rig, -0.16, 0.07, 0.04);
  const footR = joint('footR', rig, 0.16, 0.07, 0.04);

  // dark cloth core so the gaps between panels never show daylight
  const gold = mat(GOLD);
  const core = mat('#14122a', { side: THREE.DoubleSide });
  body.add(mesh(facet(new THREE.CylinderGeometry(0.2, 0.455, 1.7, 12, 1, true)), core, 0, 1.15, 0));

  // decorated boots, calf height: black leather with a gold top band, a red stripe and a white toe cap; they step below the hem
  const black = mat(BLACK);
  const white = mat(WHITE);
  const red = mat(RED);
  for (const f of [footL, footR]) {
    f.add(mesh(facet(new THREE.CylinderGeometry(0.075, 0.088, 0.3, 7)), black, 0, 0.08, 0));
    f.add(mesh(facet(new THREE.CylinderGeometry(0.082, 0.082, 0.04, 7)), gold, 0, 0.2, 0));
    f.add(mesh(facet(new THREE.CylinderGeometry(0.081, 0.085, 0.025, 7)), red, 0, 0.12, 0));
    const toe = mesh(facet(new THREE.SphereGeometry(0.09, 6, 5)), black, 0, -0.02, 0.06);
    toe.scale.set(1, 0.6, 1.5);
    const cap = mesh(facet(new THREE.SphereGeometry(0.055, 6, 4)), white, 0, -0.02, 0.15);
    cap.scale.set(1, 0.7, 0.9);
    f.add(toe, cap);
  }

  // sleeves: deep red with a gold cuff and a black cloth mitt, so no skin shows
  const sleeve = mat(RED);
  const wood = mat(WOOD);
  for (const [sh, el] of [[shoulderL, elbowL], [shoulderR, elbowR]] as const) {
    sh.add(mesh(facet(new THREE.SphereGeometry(0.09, 6, 5)), sleeve));
    sh.add(mesh(facet(new THREE.CylinderGeometry(0.085, 0.07, 0.42, 6).translate(0, -0.21, 0)), sleeve));
    el.add(mesh(facet(new THREE.CylinderGeometry(0.07, 0.095, 0.36, 6).translate(0, -0.18, 0)), sleeve));
    el.add(mesh(facet(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8)), gold, 0, -0.34, 0));
    const glove = mesh(facet(new THREE.SphereGeometry(0.075, 6, 5)), white, 0, -0.41, 0); // white gloves
    glove.scale.set(1, 1.5, 0.85);
    el.add(glove);
  }

  // head: hood of cloth, a dark net panel, a carved wooden crest
  const hoodMat = mat(RED);
  const hood = mesh(facet(new THREE.SphereGeometry(0.22, 12, 9)), hoodMat, 0, HOOD_Y, 0);
  hood.scale.set(1, 1.2, 1.1);
  head.add(hood);
  head.add(mesh(facet(new THREE.CylinderGeometry(0.15, 0.19, 0.08, 10)), gold, 0, 0.0, 0)); // collar
  head.add(mesh(facet(new THREE.TorusGeometry(0.2, 0.022, 5, 14)).rotateX(Math.PI / 2), gold, 0, HOOD_Y + 0.13, 0)); // brow band

  // net panel: a dark curved patch with a lighter grid, where a face would be
  const netY = HOOD_Y - 0.02;
  const netR = 0.245;
  const netLine = mat('#4a4a58');
  const panelArc = 1.05;
  const net = mesh(facet(new THREE.CylinderGeometry(netR, netR, 0.2, 12, 1, true, -panelArc / 2, panelArc)), mat('#0b0b10', { side: THREE.DoubleSide }), 0, netY, 0);
  net.scale.z = 1.1;
  head.add(net);
  const lineR = netR + 0.004;
  for (let i = 0; i <= 8; i++) {
    const a = -panelArc / 2 + (panelArc * i) / 8;
    const v = mesh(new THREE.BoxGeometry(0.006, 0.2, 0.006), netLine, Math.sin(a) * lineR, netY, Math.cos(a) * lineR * 1.1);
    v.rotation.y = a;
    head.add(v);
  }
  for (let j = 0; j <= 4; j++) {
    const y = netY - 0.1 + 0.05 * j;
    for (let i = 0; i < 8; i++) {
      const a0 = -panelArc / 2 + (panelArc * i) / 8;
      const a1 = -panelArc / 2 + (panelArc * (i + 1)) / 8;
      const mid = (a0 + a1) / 2;
      const chord = 2 * lineR * Math.sin((a1 - a0) / 2);
      const h = mesh(new THREE.BoxGeometry(chord, 0.006, 0.006), netLine, Math.sin(mid) * lineR, y, Math.cos(mid) * lineR * 1.1);
      h.rotation.y = mid;
      head.add(h);
    }
  }

  // cowrie veil: a brow row of cowries framing the net, and strings of cowries hanging across it
  const cowrie = mat(WHITE);
  const cowrieGeo = facet(new THREE.SphereGeometry(0.02, 6, 4));
  const addCowrie = (a: number, y: number, r: number, s = 1) => {
    const c = mesh(cowrieGeo, cowrie, Math.sin(a) * r, y, Math.cos(a) * r * 1.1);
    c.rotation.y = a;
    c.scale.set(0.85 * s, 1.25 * s, 0.7 * s);
    head.add(c);
  };
  for (let i = 0; i < 9; i++) addCowrie(-panelArc / 2 + (panelArc * i) / 8, netY + 0.115, lineR + 0.012, 1.1);
  for (let i = 0; i < 6; i++) {
    const a = -panelArc / 2 + 0.08 + ((panelArc - 0.16) * i) / 5;
    for (let j = 0; j < 4; j++) addCowrie(a, netY + 0.07 - j * 0.045, lineR + 0.016);
  }

  // carved crest: tapered pillar, gold rings, a wide flat wooden tray, a carved standing disc with a gold rim, and a small carved figure on top
  const crestBase = HOOD_Y + 0.24;
  head.add(mesh(facet(new THREE.CylinderGeometry(0.045, 0.07, 0.16, 6)), wood, 0, crestBase + 0.07, 0));
  for (const dy of [0.0, 0.07, 0.14]) head.add(mesh(facet(new THREE.TorusGeometry(0.062 - dy * 0.15, 0.011, 4, 10)).rotateX(Math.PI / 2), gold, 0, crestBase + dy, 0));
  const disc = mesh(facet(new THREE.CylinderGeometry(0.12, 0.12, 0.035, 12)), wood, 0, crestBase + 0.27, 0);
  disc.rotation.x = Math.PI / 2;
  head.add(disc);
  head.add(mesh(facet(new THREE.TorusGeometry(0.12, 0.012, 4, 14)), gold, 0, crestBase + 0.27, 0.022));
  head.add(mesh(facet(new THREE.TorusGeometry(0.07, 0.01, 4, 12)), gold, 0, crestBase + 0.27, 0.022));
  head.add(mesh(facet(new THREE.SphereGeometry(0.03, 6, 4)), mat(RED), 0, crestBase + 0.27, 0.03));
  head.add(mesh(facet(new THREE.CylinderGeometry(0.19, 0.17, 0.025, 12)), wood, 0, crestBase + 0.145, 0)); // flat headpiece tray
  head.add(mesh(facet(new THREE.TorusGeometry(0.185, 0.012, 4, 14)).rotateX(Math.PI / 2), gold, 0, crestBase + 0.16, 0));
  const figY = crestBase + 0.39;
  head.add(mesh(facet(new THREE.ConeGeometry(0.04, 0.1, 6)), wood, 0, figY + 0.05, 0)); // robed body
  head.add(mesh(facet(new THREE.SphereGeometry(0.03, 6, 5)), wood, 0, figY + 0.13, 0)); // head
  head.add(mesh(facet(new THREE.ConeGeometry(0.03, 0.05, 5)), gold, 0, figY + 0.185, 0)); // crown
  for (const sx of [-1, 1]) {
    const arm = mesh(new THREE.BoxGeometry(0.075, 0.014, 0.014), wood, sx * 0.05, figY + 0.1, 0); // arms raised
    arm.rotation.z = sx * 0.6;
    head.add(arm);
  }

  // --- hanging panels: one instanced mesh for every segment, one more for the cowrie / sequin details -------------
  const panels: Panel[] = [];
  const decors: Decor[] = [];
  const tiles: Tile[] = [];
  const segColors: string[] = [];
  let instance = 0;
  TIERS.forEach((tier, ti) => {
    const H = tier.y - tier.clearance;
    const slope = Math.atan((tier.R - tier.r0) / H);
    const length = Math.hypot(H, tier.R - tier.r0);
    const topW = ((TAU * tier.r0) / tier.n) * 0.95;
    const botW = ((TAU * tier.R) / tier.n) * 1.22; // overlap so no daylight shows between panels
    for (let i = 0; i < tier.n; i++) {
      const theta = ((i + (ti % 2) * 0.5) / tier.n) * TAU;
      const anchor = new THREE.Matrix4()
        .makeRotationY(theta)
        .setPosition(Math.sin(theta) * tier.r0, tier.y, Math.cos(theta) * tier.r0);
      let d = 0;
      const lens: number[] = [];
      const top: number[] = [];
      const bottom: number[] = [];
      SEG_FRACTIONS.forEach((f) => {
        const len = length * f;
        lens.push(len);
        top.push(topW + (botW - topW) * (d / length));
        d += len;
        bottom.push(topW + (botW - topW) * (d / length));
      });
      const panel: Panel = {
        anchor,
        slope,
        tier: ti,
        base: instance,
        lens,
        top,
        bottom,
        ax: [-slope, 0, 0, 0],
        az: [0, 0, 0, 0],
        vx: [0, 0, 0, 0],
        vz: [0, 0, 0, 0],
        phase: Math.random() * TAU,
        out: [Math.sin(theta), Math.cos(theta)],
        tiles: [],
        decors: [],
      };
      const color = tier.base[i % tier.base.length];
      for (let k = 0; k < SEGS; k++) segColors.push(k === SEGS - 1 ? tier.hem : color);
      instance += SEGS;
      const pi = panels.length;
      panels.push(panel);
      // appliqué: a sequin field with a nested diamond motif on each chosen segment, a gold yoke bar, zig-zag trim on the hem band, fringe below it
      const avg = (k: number) => (top[k] + bottom[k]) / 2;
      const [field, motif, motif2] = APPLIQUE[color];
      if (tier.bar) tiles.push({ panel: pi, seg: 0, x: 0, y: 0.1, w: avg(0) * 0.7, h: lens[0] * 0.12, rot: 0, layer: 0, color: GOLD });
      tier.fields.forEach((k, fi) => {
        const w = avg(k) * 0.76;
        const d = Math.min(w * 0.62, lens[k] * 0.3);
        tiles.push({ panel: pi, seg: k, x: 0, y: 0.5, w, h: lens[k] * 0.84, rot: 0, layer: 0, color: field });
        tiles.push({ panel: pi, seg: k, x: 0, y: 0.5, w: d, h: d, rot: Math.PI / 4, layer: 1, color: fi % 2 ? motif2 : motif });
        tiles.push({ panel: pi, seg: k, x: 0, y: 0.5, w: d * 0.45, h: d * 0.45, rot: Math.PI / 4, layer: 2, color: field });
      });
      const hk = SEGS - 1;
      if (tier.trim) {
        const n = 5;
        const d = avg(hk) / n / Math.SQRT2;
        for (let j = 0; j < n; j++) tiles.push({ panel: pi, seg: hk, x: (j + 0.5) / n - 0.5, y: 0.5, w: d, h: d, rot: Math.PI / 4, layer: 0, color: tier.trim[j % 2] });
      }
      if (tier.fringe) {
        const n = 6;
        const fh = 0.075;
        for (let j = 0; j < n; j++) tiles.push({ panel: pi, seg: hk, x: (j + 0.5) / n - 0.5, y: 1 + (fh / 2 - 0.01) / lens[hk], w: (avg(hk) / n) * 0.4, h: fh, rot: 0, layer: -1, color: tier.hem });
      }
      if (tier.decor) {
        const cow: [number, number, number] = [0.04, 0.055, 0.02];
        const seq: [number, number, number] = [0.026, 0.026, 0.008];
        decors.push(
          { panel: pi, seg: 0, x: -0.2, y: 0.45, size: cow }, // cowries on the plain cloth above the fields
          { panel: pi, seg: 0, x: 0.2, y: 0.75, size: cow },
        );
        for (const k of tier.fields) for (const sx of [-0.3, 0.3]) for (const sy of [0.12, 0.88]) decors.push({ panel: pi, seg: k, x: sx, y: sy, size: seq }); // gold sequins at the field corners
      }
    }
  });
  tiles.forEach((t, i) => panels[t.panel].tiles.push(i));
  decors.forEach((d, i) => panels[d.panel].decors.push(i));
  const segCount = instance;

  // Box centred on x, hanging down from y = 0, with the top width set per instance (aTaper) so adjacent segments join up.
  const panelGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, -0.5, 0);
  const panelMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: toonGradient() });
  owned.push(panelMat);
  const taper = new Float32Array(segCount);
  panels.forEach((p) => {
    for (let k = 0; k < SEGS; k++) taper[p.base + k] = p.top[k] / p.bottom[k];
  });
  panelGeo.setAttribute('aTaper', new THREE.InstancedBufferAttribute(taper, 1));
  panelMat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aTaper;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.x *= mix(aTaper, 1.0, clamp(-position.y, 0.0, 1.0));');
  };
  panelMat.customProgramCacheKey = () => 'egungun-panel-taper';
  const panelMesh = new THREE.InstancedMesh(panelGeo, panelMat, segCount);
  const tint = new THREE.Color();
  segColors.forEach((c, i) => panelMesh.setColorAt(i, tint.set(c)));
  const tileGeo = new THREE.BoxGeometry(1, 1, 1);
  const tileMesh = new THREE.InstancedMesh(tileGeo, mat('#ffffff'), Math.max(1, tiles.length));
  tiles.forEach((t, i) => tileMesh.setColorAt(i, tint.set(t.color)));
  const decorGeo = facet(new THREE.SphereGeometry(1, 6, 4));
  const decorMesh = new THREE.InstancedMesh(decorGeo, mat('#ffffff'), Math.max(1, decors.length));
  decors.forEach((d, i) => decorMesh.setColorAt(i, tint.set(d.size[2] > 0.01 ? WHITE : GOLD)));
  for (const im of [panelMesh, tileMesh, decorMesh]) {
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    im.frustumCulled = false;
    body.add(im);
  }

  const chain: THREE.Matrix4[] = Array.from({ length: SEGS }, () => new THREE.Matrix4());
  const m = new THREE.Matrix4();
  const out = new THREE.Matrix4();
  const euler = new THREE.Euler();
  function writePanels() {
    for (const p of panels) {
      m.copy(p.anchor);
      for (let k = 0; k < SEGS; k++) {
        out.makeRotationFromEuler(euler.set(p.ax[k], 0, p.az[k]));
        if (k > 0) out.setPosition(0, -p.lens[k - 1], 0);
        m.multiply(out);
        chain[k].copy(m);
        panelMesh.setMatrixAt(p.base + k, out.copy(m).multiply(scratch.makeScale(p.bottom[k], p.lens[k], THICKNESS)));
      }
      for (const i of p.tiles) {
        const t = tiles[i];
        const w = (p.top[t.seg] + p.bottom[t.seg]) / 2;
        const z = t.layer < 0 ? 0 : THICKNESS / 2 + 0.003 + t.layer * 0.004;
        out.copy(chain[t.seg]).multiply(scratch.makeTranslation(t.x * w, -t.y * p.lens[t.seg], z));
        out.multiply(tileRot.makeRotationZ(t.rot));
        tileMesh.setMatrixAt(i, out.multiply(scratch.makeScale(t.w, t.h, t.layer < 0 ? THICKNESS : 0.006)));
      }
      for (const i of p.decors) {
        const d = decors[i];
        const w = (p.top[d.seg] + p.bottom[d.seg]) / 2;
        out.copy(chain[d.seg]).multiply(scratch.makeTranslation(d.x * w, -d.y * p.lens[d.seg], THICKNESS / 2 + 0.012 + d.size[2] * 0.5));
        decorMesh.setMatrixAt(i, out.multiply(scratch.makeScale(d.size[0], d.size[1], d.size[2])));
      }
    }
    panelMesh.instanceMatrix.needsUpdate = true;
    tileMesh.instanceMatrix.needsUpdate = true;
    decorMesh.instanceMatrix.needsUpdate = true;
  }
  const scratch = new THREE.Matrix4();
  const tileRot = new THREE.Matrix4();

  // Merge the static parts (core, sleeves, hood, net, crest) into two skinned meshes.
  const partsMat = toon('#ffffff', { vertexColors: true });
  owned.push(partsMat);
  const coreParts: THREE.Mesh[] = [];
  const otherParts: THREE.Mesh[] = [];
  rig.traverse((o) => {
    if (!(o instanceof THREE.Mesh) || (o as THREE.InstancedMesh).isInstancedMesh) return;
    (o.material === core ? coreParts : otherParts).push(o);
  });
  const baked = bakeSkinned(rig, bones, [
    { meshes: coreParts, material: core, vertexColors: false },
    { meshes: otherParts, material: partsMat, vertexColors: true },
  ]);

  const animator = new Animator<MasqueradeState>(J, CLIPS, 'search_walk', 0.25);
  writePanels();

  // movement tracking for the cloth
  const prevPos = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const vel = new THREE.Vector3(); // crown velocity in the body frame, smoothed
  const prevVel = new THREE.Vector3();
  const acc = new THREE.Vector3();
  let prevYaw = 0;
  let yawRate = 0;
  let clock = 0;
  let primed = false;
  const crown = new THREE.Vector3(0, 1.72, 0);

  const yawOf = () => new THREE.Euler().setFromQuaternion(rig.getWorldQuaternion(quat), 'YXZ').y;

  // heavy cloth: soft, fairly damped springs; every segment lags a little more than the one above
  const K = 40;
  const D = 6.2;
  const DRAG = [0.05, 0.07, 0.09, 0.11]; // swing per m/s of crown velocity
  const INERTIA = [0.006, 0.01, 0.014, 0.018]; // swing per m/s^2 of crown acceleration (the weighty part)
  const FLARE = [0.5, 1, 1, 1];
  const LIMIT = 0.5;
  const clamp = (a: number) => Math.max(-LIMIT, Math.min(LIMIT, a));

  function update(dt: number) {
    animator.update(dt);
    dt = Math.min(dt, 1 / 30);
    if (dt <= 0) return;
    clock += dt;

    body.localToWorld(tmp.copy(crown));
    const yaw = yawOf();
    if (!primed) {
      prevPos.copy(tmp);
      prevYaw = yaw;
      primed = true;
    }
    const world = tmp.clone().sub(prevPos).divideScalar(dt);
    prevPos.copy(tmp);
    let dyaw = yaw - prevYaw;
    dyaw = Math.atan2(Math.sin(dyaw), Math.cos(dyaw));
    prevYaw = yaw;
    yawRate += (dyaw / dt - yawRate) * 0.25;

    group.getWorldQuaternion(quat).invert();
    world.applyQuaternion(quat);
    prevVel.copy(vel);
    vel.lerp(world, 0.3);
    acc.copy(vel).sub(prevVel).divideScalar(dt);
    const accLimit = 30;
    acc.clampLength(0, accLimit);

    const flare = Math.min(0.33, Math.max(Math.abs(yawRate) * 0.07, api.lift * 0.28)); // 0.33 per segment bends the panels out to a nearly flat disc
    for (const p of panels) {
      const [ox, oz] = p.out;
      const outward = vel.x * ox + vel.z * oz;
      const tangent = vel.x * oz - vel.z * ox;
      const outAcc = acc.x * ox + acc.z * oz;
      const tanAcc = acc.x * oz - acc.z * ox;
      for (let k = 0; k < SEGS; k++) {
        const sway = Math.sin(clock * 1.7 + p.phase + k * 0.7) * (0.012 + 0.012 * k);
        const base = k === 0 ? -p.slope : 0;
        const tx = clamp(base + DRAG[k] * outward + INERTIA[k] * outAcc - flare * FLARE[k] + sway);
        const tz = clamp(DRAG[k] * tangent + INERTIA[k] * tanAcc + Math.cos(clock * 1.3 + p.phase) * 0.008 * (k + 1));
        p.vx[k] += ((tx - p.ax[k]) * K - p.vx[k] * D) * dt;
        p.vz[k] += ((tz - p.az[k]) * K - p.vz[k] * D) * dt;
        p.ax[k] += p.vx[k] * dt;
        p.az[k] += p.vz[k] * dt;
      }
    }
    writePanels();
  }

  const api: Masquerade = {
    group,
    animator,
    lift: 0,
    play: (state, blendTime) => animator.play(state, blendTime),
    update,
    dispose() {
      baked.forEach((b) => b.geometry.dispose());
      panelGeo.dispose();
      decorGeo.dispose();
      tileGeo.dispose();
      panelMesh.dispose();
      tileMesh.dispose();
      decorMesh.dispose();
      owned.forEach((mt) => mt.dispose());
    },
  };
  return api;
}

export type { Pose };
