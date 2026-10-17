// Playful masquerade seeker: a cone of swaying fabric strips under a carved, grinning mask. Forward is +z.
import * as THREE from 'three';
import { toon, facet } from './toon';
import { Animator, type Clip, type Pose } from './animator';
import { bakeSkinned } from './bake';

export const MASQUERADE_STATES = [
  'sing_eyes_covered',
  'search_walk',
  'look_around',
  'suspicious_lean',
  'catch_lunge',
  'victory_dance',
] as const;
export type MasqueradeState = (typeof MASQUERADE_STATES)[number];

const TAU = Math.PI * 2;
const ease = (x: number) => 1 - (1 - Math.min(1, Math.max(0, x))) ** 3;

const CLIPS: Record<MasqueradeState, Clip<MasqueradeState>> = {
  // Counting with eyes covered: hands over the mask, swaying side to side.
  sing_eyes_covered: (t) => {
    const sw = Math.sin(t * 2.2);
    return {
      body: { rz: sw * 0.07, rx: 0.03 },
      head: { rz: -sw * 0.14, ry: Math.sin(t * 1.1) * 0.12, py: Math.abs(Math.sin(t * 4.4)) * 0.015 },
      shoulderL: { rx: -2.0, rz: 0.62 },
      shoulderR: { rx: -2.0, rz: -0.62 },
      elbowL: { rx: -1.4 },
      elbowR: { rx: -1.4 },
      footL: { py: Math.max(0, sw) * 0.03 },
      footR: { py: Math.max(0, -sw) * 0.03 },
    };
  },
  search_walk: (t) => {
    const ph = t * TAU * 1.1;
    const s = Math.sin(ph);
    return {
      root: { py: Math.abs(Math.cos(ph)) * 0.025 },
      body: { rx: 0.08, rz: s * 0.04 },
      head: { ry: Math.sin(t * 0.9) * 0.75, rx: 0.06 },
      shoulderL: { rx: s * 0.45, rz: -0.35 },
      shoulderR: { rx: -s * 0.45, rz: 0.35 },
      elbowL: { rx: -0.35 },
      elbowR: { rx: -0.35 },
      footL: { pz: s * 0.16, py: Math.max(0, Math.cos(ph)) * 0.07 },
      footR: { pz: -s * 0.16, py: Math.max(0, -Math.cos(ph)) * 0.07 },
    };
  },
  // Standing still, scanning, one hand shading the brow, one on the hip.
  look_around: (t) => {
    const a = Math.sin(t * 1.3);
    return {
      body: { ry: Math.sin(t * 1.3 - 0.7) * 0.28, rx: 0.05 },
      head: { ry: a * 1.0, rx: 0.04, rz: Math.sin(t * 2.6) * 0.04 },
      shoulderR: { rx: -2.1, rz: -0.2 },
      elbowR: { rx: -1.5 },
      shoulderL: { rx: 0.0, rz: -0.55 },
      elbowL: { rx: -0.9 },
    };
  },
  // "Hmm... somebody is a suspiciously good lamp." Hand on chin, leaning in.
  suspicious_lean: (t) => ({
    body: { rx: 0.32, rz: 0.05 + Math.sin(t * 1.4) * 0.02 },
    head: { rx: 0.15, rz: 0.3, ry: Math.sin(t * 0.8) * 0.2 },
    shoulderL: { rx: -1.55, rz: 0.4 },
    elbowL: { rx: -2.0 },
    shoulderR: { rx: 0.5, rz: -0.25 },
    elbowR: { rx: -0.4 },
    footL: { pz: 0.12 },
    footR: { pz: -0.06 },
  }),
  // Gotcha! Big grabby lunge, arms wide.
  catch_lunge: (t) => {
    const k = ease(t / 0.2);
    const w = Math.sin(t * 18) * 0.05 * k;
    return {
      root: { py: 0.04 * k },
      body: { rx: 0.7 * k },
      head: { rx: -0.35 * k },
      shoulderL: { rx: -1.5 * k + w, rz: -0.4 * k },
      shoulderR: { rx: -1.5 * k - w, rz: 0.4 * k },
      elbowL: { rx: -0.25 * k },
      elbowR: { rx: -0.25 * k },
      footL: { pz: 0.3 * k },
      footR: { pz: -0.22 * k },
    };
  },
  victory_dance: (t) => {
    const ph = t * TAU * 1.6;
    const s = Math.sin(ph);
    return {
      root: { py: Math.abs(s) * 0.14, ry: t * 3 },
      body: { rz: s * 0.15 },
      head: { rz: -s * 0.2, rx: -0.15 },
      shoulderL: { rx: -2.8, rz: -0.5 + s * 0.35 },
      shoulderR: { rx: -2.8, rz: 0.5 - s * 0.35 },
      elbowL: { rx: -0.3 },
      elbowR: { rx: -0.3 },
      footL: { py: Math.max(0, s) * 0.1 },
      footR: { py: Math.max(0, -s) * 0.1 },
    };
  },
};

// --- fabric strips -----------------------------------------------------------

export const MASQUERADE_COLORS = ['#ff3d6e', '#ffb400', '#22c1c3', '#7bd236', '#ff7a00', '#b04cff', '#2f80ff', '#ff5ea8'];

const HEM_Y = 0.18; // world height of the hem; the body pivot sits here
const CONE_H = 1.3;
const R_BOTTOM = 0.7;
const R_TOP = 0.22;
const radiusAt = (y: number) => R_BOTTOM + (R_TOP - R_BOTTOM) * (y / CONE_H);
const SLOPE = Math.atan((R_BOTTOM - R_TOP) / CONE_H);

function stripGeo(len: number, width: number, taperEnd: number) {
  const g = new THREE.BoxGeometry(width, len, 0.012).translate(0, -len / 2, 0);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const f = Math.min(1, Math.max(0, -pos.getY(i) / len));
    pos.setX(i, pos.getX(i) * (1 + (taperEnd - 1) * f));
  }
  g.computeVertexNormals();
  return g;
}

interface Seg {
  pivot: THREE.Object3D; // transform-only (not in the scene); rendered through the instanced meshes
  ax: number;
  az: number;
  vx: number;
  vz: number;
}
interface Strip {
  theta: number;
  phase: number;
  anchor: THREE.Matrix4;
  width: number;
  segs: [Seg, Seg];
}

export interface Masquerade {
  readonly group: THREE.Group;
  readonly animator: Animator<MasqueradeState>;
  play(state: MasqueradeState, blendTime?: number): void;
  /** Call every frame. Strips react to how the group moves and turns, so move `group` and they trail. */
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

  const body = joint('body', rig, 0, HEM_Y, 0);
  const head = joint('head', body, 0, CONE_H + 0.04, 0);
  const shoulderL = joint('shoulderL', body, -0.27, 1.16);
  const shoulderR = joint('shoulderR', body, 0.27, 1.16);
  const elbowL = joint('elbowL', shoulderL, 0, -0.36);
  const elbowR = joint('elbowR', shoulderR, 0, -0.36);
  const footL = joint('footL', rig, -0.18, 0.07, 0.04);
  const footR = joint('footR', rig, 0.18, 0.07, 0.04);

  // cone cloth
  const cloth = mat('#3b2a7a', { side: THREE.DoubleSide });
  body.add(mesh(facet(new THREE.CylinderGeometry(R_TOP, R_BOTTOM, CONE_H, 10, 1, true)), cloth, 0, CONE_H / 2, 0));
  body.add(mesh(facet(new THREE.CylinderGeometry(R_TOP + 0.02, R_TOP + 0.05, 0.08, 10)), mat('#ffd23f'), 0, CONE_H, 0));

  // shoes
  const shoe = mat('#ffd23f');
  for (const f of [footL, footR]) f.add(mesh(facet(new THREE.SphereGeometry(0.1, 6, 5)), shoe)).scale.set(1, 0.7, 1.7);

  // sleeves and mittens
  const sleeve = mat('#ff8a00');
  const cream = mat('#fff1d0');
  for (const [sh, el] of [[shoulderL, elbowL], [shoulderR, elbowR]] as const) {
    sh.add(mesh(facet(new THREE.SphereGeometry(0.085, 6, 5)), sleeve));
    sh.add(mesh(facet(new THREE.CylinderGeometry(0.075, 0.062, 0.36, 6).translate(0, -0.18, 0)), sleeve));
    el.add(mesh(facet(new THREE.CylinderGeometry(0.062, 0.075, 0.32, 6).translate(0, -0.16, 0)), sleeve));
    el.add(mesh(facet(new THREE.SphereGeometry(0.075, 6, 5)), cream, 0, -0.35, 0));
  }

  // carved mask
  const wood = mat('#b5733a');
  const darkWood = mat('#7a4520');
  const black = mat('#1a1010');
  const maskCenterY = 0.24;
  const mask = mesh(facet(new THREE.SphereGeometry(0.21, 10, 8)), wood, 0, maskCenterY, 0.02);
  mask.scale.set(0.95, 1.28, 0.88);
  head.add(mask);
  head.add(mesh(facet(new THREE.CylinderGeometry(0.1, 0.13, 0.1, 6)), darkWood, 0, 0.0, 0)); // neck ruff
  for (const sx of [-1, 1]) {
    const brow = mesh(new THREE.BoxGeometry(0.13, 0.03, 0.05), darkWood, sx * 0.095, maskCenterY + 0.1, 0.17);
    brow.rotation.z = sx * -0.28;
    head.add(brow);
    const eye = mesh(facet(new THREE.SphereGeometry(0.05, 6, 5)), black, sx * 0.095, maskCenterY + 0.04, 0.17);
    eye.scale.set(1, 0.55, 0.4);
    head.add(eye);
    const glint = mesh(new THREE.SphereGeometry(0.01, 4, 3), cream, sx * 0.105, maskCenterY + 0.05, 0.19);
    head.add(glint);
    const cheek = mesh(facet(new THREE.SphereGeometry(0.05, 6, 4)), mat('#ff6b8b'), sx * 0.14, maskCenterY - 0.07, 0.14);
    cheek.scale.set(1, 0.8, 0.35);
    head.add(cheek);
  }
  const nose = mesh(facet(new THREE.ConeGeometry(0.04, 0.12, 4)), darkWood, 0, maskCenterY - 0.02, 0.2);
  nose.rotation.x = Math.PI / 2;
  head.add(nose);
  const smile = mesh(facet(new THREE.TorusGeometry(0.09, 0.016, 4, 9, Math.PI)), mat('#8c1d2f'), 0, maskCenterY - 0.1, 0.16);
  smile.rotation.z = Math.PI;
  head.add(smile);
  [['#ffd23f', 0.38], ['#2ec4b6', 0.32], ['#ff3d6e', 0.26]].forEach(([c, y], i) => {
    const mark = mesh(facet(new THREE.ConeGeometry(0.03 - i * 0.004, 0.06, 3)), mat(c as string), 0, maskCenterY + (y as number) - 0.2, 0.17);
    mark.rotation.z = Math.PI;
    head.add(mark);
  });
  // feather crest
  for (let i = 0; i < 5; i++) {
    const a = (i - 2) * 0.42;
    const f = mesh(facet(new THREE.ConeGeometry(0.06, 0.42, 4).translate(0, 0.21, 0)), mat(MASQUERADE_COLORS[(i * 3) % MASQUERADE_COLORS.length]), 0, maskCenterY + 0.24, -0.02);
    f.scale.z = 0.35;
    f.rotation.z = -a;
    f.rotation.x = -0.15;
    head.add(f);
  }

  // strips: five staggered rings, two hinged segments each. The hinges are plain Object3Ds used for
  // their matrices; all 60 upper segments are one InstancedMesh and all 60 lower segments another.
  const strips: Strip[] = [];
  const rings = [
    { y: 1.2, n: 8 },
    { y: 0.95, n: 10 },
    { y: 0.7, n: 12 },
    { y: 0.45, n: 14 },
    { y: 0.2, n: 16 },
  ];
  const segLen = 0.3;
  const total = rings.reduce((a, r) => a + r.n, 0);
  const stripMat = mat('#ffffff'); // tinted per instance
  const upperGeo = stripGeo(segLen, 1, 0.95);
  const lowerGeo = stripGeo(segLen, 1, 0.25);
  const upper = new THREE.InstancedMesh(upperGeo, stripMat, total);
  const lower = new THREE.InstancedMesh(lowerGeo, stripMat, total);
  for (const im of [upper, lower]) {
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    im.frustumCulled = false;
    body.add(im);
  }
  const tint = new THREE.Color();
  let idx = 0;
  rings.forEach((ring, ri) => {
    const width = 0.2 - ri * 0.012;
    for (let i = 0; i < ring.n; i++) {
      const theta = ((i + (ri % 2) * 0.5) / ring.n) * TAU;
      const r = radiusAt(ring.y) + 0.018 + ri * 0.004;
      const anchor = new THREE.Object3D();
      anchor.position.set(Math.sin(theta) * r, ring.y, Math.cos(theta) * r);
      anchor.rotation.y = theta; // local +z points outward
      anchor.updateMatrix();
      upper.setColorAt(idx, tint.set(MASQUERADE_COLORS[(i + ri * 3) % MASQUERADE_COLORS.length]));
      lower.setColorAt(idx, tint.set(MASQUERADE_COLORS[(i + ri * 3 + 3) % MASQUERADE_COLORS.length]));
      idx++;
      const p1 = new THREE.Object3D();
      const p2 = new THREE.Object3D();
      p2.position.y = -segLen;
      p2.updateMatrix();
      strips.push({
        theta,
        phase: Math.random() * TAU,
        anchor: anchor.matrix.clone(),
        width,
        segs: [
          { pivot: p1, ax: -SLOPE, az: 0, vx: 0, vz: 0 },
          { pivot: p2, ax: 0, az: 0, vx: 0, vz: 0 },
        ],
      });
    }
  });
  const m1 = new THREE.Matrix4();
  const m2 = new THREE.Matrix4();
  const out = new THREE.Matrix4();
  const scaleM = new THREE.Matrix4();
  const lift = new THREE.Matrix4().makeTranslation(0, 0, 0.004); // keeps the lower segment off the upper one's face
  function writeStrips() {
    strips.forEach((s, i) => {
      const [a, b] = s.segs;
      a.pivot.rotation.set(a.ax, 0, a.az);
      a.pivot.updateMatrix();
      b.pivot.rotation.set(b.ax, 0, b.az);
      b.pivot.updateMatrix();
      m1.copy(s.anchor).multiply(a.pivot.matrix);
      upper.setMatrixAt(i, out.copy(m1).multiply(scaleM.makeScale(s.width, 1, 1)));
      m2.copy(m1).multiply(b.pivot.matrix).multiply(lift);
      lower.setMatrixAt(i, out.copy(m2).multiply(scaleM.makeScale(s.width * 0.95, 1, 1)));
    });
    upper.instanceMatrix.needsUpdate = true;
    lower.instanceMatrix.needsUpdate = true;
  }

  // Merge the static parts (cone cloth, sleeves, shoes, mask, crest) into two skinned meshes; strips are already instanced.
  const partsMat = toon('#ffffff', { vertexColors: true });
  owned.push(partsMat);
  const clothParts: THREE.Mesh[] = [];
  const otherParts: THREE.Mesh[] = [];
  rig.traverse((o) => {
    if (!(o instanceof THREE.Mesh) || (o as THREE.InstancedMesh).isInstancedMesh) return;
    (o.material === cloth ? clothParts : otherParts).push(o);
  });
  const baked = bakeSkinned(rig, bones, [
    { meshes: clothParts, material: cloth, vertexColors: false },
    { meshes: otherParts, material: partsMat, vertexColors: true },
  ]);

  const animator = new Animator<MasqueradeState>(J, CLIPS, 'search_walk', 0.25);
  writeStrips();

  // movement tracking for the cloth
  const prevPos = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const vel = new THREE.Vector3(); // local-frame velocity, smoothed
  let prevYaw = 0;
  let yawRate = 0;
  let clock = 0;
  let primed = false;

  const yawOf = () => {
    const e = new THREE.Euler().setFromQuaternion(rig.getWorldQuaternion(quat), 'YXZ');
    return e.y;
  };

  function update(dt: number) {
    animator.update(dt);
    dt = Math.min(dt, 1 / 30);
    if (dt <= 0) return;
    clock += dt;

    group.getWorldPosition(tmp);
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

    // into the (un-spun) body frame
    group.getWorldQuaternion(quat).invert();
    world.applyQuaternion(quat);
    vel.lerp(world, 0.3);

    const K = 70;
    const D = 6;
    const spin = Math.min(0.9, Math.abs(yawRate) * 0.07);
    for (const s of strips) {
      const ox = Math.sin(s.theta);
      const oz = Math.cos(s.theta);
      const outward = vel.x * ox + vel.z * oz;
      const tangent = vel.x * oz - vel.z * ox;
      s.segs.forEach((seg, k) => {
        const gain = k === 0 ? 0.2 : 0.34;
        const sway = Math.sin(clock * 2.3 + s.phase + k * 0.9) * (0.05 + 0.04 * k);
        const base = k === 0 ? -SLOPE : 0;
        const tx = clampAngle(base + gain * outward - spin * (k + 1) * 0.6 + sway);
        const tz = clampAngle(gain * tangent + Math.cos(clock * 1.9 + s.phase) * 0.03 * (k + 1));
        seg.vx += ((tx - seg.ax) * K - seg.vx * D) * dt;
        seg.vz += ((tz - seg.az) * K - seg.vz * D) * dt;
        seg.ax += seg.vx * dt;
        seg.az += seg.vz * dt;
      });
    }
    writeStrips();
  }

  return {
    group,
    animator,
    play: (state, blendTime) => animator.play(state, blendTime),
    update,
    dispose() {
      baked.forEach((m) => m.geometry.dispose());
      upperGeo.dispose();
      lowerGeo.dispose();
      upper.dispose();
      lower.dispose();
      owned.forEach((m) => m.dispose());
    },
  };
}

const clampAngle = (a: number) => Math.max(-1.1, Math.min(1.1, a));
export type { Pose };
