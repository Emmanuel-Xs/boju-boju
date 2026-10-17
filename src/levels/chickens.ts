// A few chickens wandering the yard: pecking, strolling, and scattering when the player or the seeker comes close.
// Four instanced meshes (body, head, face, legs) draw every chicken, so the whole flock costs four draw calls (plus shadows).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { toon, facet } from '../toon';
import { resolveCollisions, type Collider } from './controller';

export const CHICKEN_CONFIG = {
  count: 7,
  radius: 0.14, // collision radius (m)
  walkSpeed: 0.7,
  fleeSpeed: 3.4,
  /** A chicken scatters when a threat is closer than this (a running threat counts for `runBoost` times more). */
  scareDistance: 2.0,
  runBoost: 1.5,
  fleeTime: [0.9, 1.6] as [number, number],
  idleTime: [1.5, 4] as [number, number],
  peckTime: [1.5, 3.5] as [number, number],
  wanderRange: [1, 4] as [number, number],
  /** Where they may roam (stay inside the yard: not through the gate, not onto the road). */
  area: { minX: -14.2, maxX: 14.2, minZ: -8.7, maxZ: 8.7 },
  plumage: ['#f2eee4', '#8a4b2a', '#2b2623', '#c8903f', '#a89a82', '#d9d2c0', '#6b3a22'],
};

type State = 'idle' | 'peck' | 'walk' | 'flee';
interface Hen {
  x: number;
  z: number;
  yaw: number;
  state: State;
  timer: number;
  tx: number;
  tz: number;
  phase: number;
  peckPhase: number;
  hop: number;
  hopV: number;
  lookYaw: number;
  lookTarget: number;
  speed: number;
}

const tmp = new THREE.Matrix4();
const q = new THREE.Quaternion();
const e = new THREE.Euler();
const m4 = (x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q.setFromEuler(e.set(rx, ry, rz, 'YXZ')), new THREE.Vector3(sx, sy, sz));

/** Faceted part with a vertex colour, transformed into the chicken's local frame. */
function part(geo: THREE.BufferGeometry, m: THREE.Matrix4, color: THREE.ColorRepresentation): THREE.BufferGeometry {
  const g = facet(geo.clone());
  for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
  g.applyMatrix4(m);
  const c = new THREE.Color(color);
  const col = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < g.attributes.position.count; i++) col.set([c.r, c.g, c.b], i * 3);
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

const rand = (r: () => number, [a, b]: [number, number]) => a + r() * (b - a);

export class Chickens {
  readonly group = new THREE.Group();
  private hens: Hen[] = [];
  private body: THREE.InstancedMesh;
  private head: THREE.InstancedMesh;
  private face: THREE.InstancedMesh;
  private legs: THREE.InstancedMesh;
  private r: () => number;

  constructor(
    private colliders: readonly Collider[],
    seed = 5,
    private cfg = CHICKEN_CONFIG,
  ) {
    let s = seed >>> 0;
    this.r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const white = '#ffffff';
    const sphere = new THREE.SphereGeometry(1, 8, 6);
    // body, neck, tail and wings: white vertex colour, tinted per chicken
    const bodyGeo = mergeGeometries([
      part(sphere, m4(0, 0, 0, 0, 0, 0, 0.15, 0.14, 0.22), white),
      part(sphere, m4(0, 0.1, 0.15, 0, 0, 0, 0.08, 0.1, 0.08), white),
      part(new THREE.ConeGeometry(0.08, 0.24, 5), m4(0, 0.1, -0.23, -2.2), white),
      part(sphere, m4(-0.13, 0.02, -0.02, 0, 0, 0.12, 0.04, 0.11, 0.17), white),
      part(sphere, m4(0.13, 0.02, -0.02, 0, 0, -0.12, 0.04, 0.11, 0.17), white),
    ])!;
    const headGeo = part(sphere, m4(0, 0, 0, 0, 0, 0, 0.062, 0.062, 0.07), white);
    // beak, comb, wattle and eyes keep their own colours (instance colour stays white)
    const faceGeo = mergeGeometries([
      part(new THREE.ConeGeometry(0.026, 0.075, 5), m4(0, -0.012, 0.09, Math.PI / 2), '#e8a020'),
      part(new THREE.BoxGeometry(0.02, 0.045, 0.075), m4(0, 0.07, 0.0), '#c4262e'),
      part(sphere, m4(0, -0.055, 0.055, 0, 0, 0, 0.016, 0.024, 0.016), '#c4262e'),
      part(sphere, m4(-0.052, 0.014, 0.04, 0, 0, 0, 0.011, 0.011, 0.011), '#111111'),
      part(sphere, m4(0.052, 0.014, 0.04, 0, 0, 0, 0.011, 0.011, 0.011), '#111111'),
    ])!;
    // a leg hangs from its hip joint (origin at the top) so it can swing
    const legGeo = mergeGeometries([part(new THREE.CylinderGeometry(0.011, 0.014, 0.14, 5), m4(0, -0.07, 0), '#d9a441'), part(new THREE.BoxGeometry(0.05, 0.012, 0.075), m4(0, -0.14, 0.02), '#d9a441')])!;

    const n = cfg.count;
    const plumageMat = toon('#ffffff', { vertexColors: true });
    const fixedMat = toon('#ffffff', { vertexColors: true });
    this.body = new THREE.InstancedMesh(bodyGeo, plumageMat, n);
    this.head = new THREE.InstancedMesh(headGeo, plumageMat, n);
    this.face = new THREE.InstancedMesh(faceGeo, fixedMat, n);
    this.legs = new THREE.InstancedMesh(legGeo, fixedMat, n * 2);
    const tint = new THREE.Color();
    for (let i = 0; i < n; i++) {
      tint.set(cfg.plumage[i % cfg.plumage.length]);
      this.body.setColorAt(i, tint);
      this.head.setColorAt(i, tint);
      this.face.setColorAt(i, tint.set('#ffffff'));
      this.legs.setColorAt(i * 2, tint);
      this.legs.setColorAt(i * 2 + 1, tint);
    }
    for (const m of [this.body, this.head, this.face, this.legs]) {
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.castShadow = true;
      m.receiveShadow = true;
      m.frustumCulled = false;
      this.group.add(m);
    }
    this.body.userData.baseColor = new THREE.Color(cfg.plumage[0]);
    this.group.name = 'chickens';

    const a = cfg.area;
    for (let i = 0; i < n; i++) {
      const hen: Hen = { x: 0, z: 0, yaw: this.r() * Math.PI * 2, state: 'idle', timer: rand(this.r, cfg.idleTime) * this.r(), tx: 0, tz: 0, phase: this.r() * 6, peckPhase: this.r() * 6, hop: 0, hopV: 0, lookYaw: 0, lookTarget: 0, speed: 0 };
      for (let tries = 0; tries < 40; tries++) {
        hen.x = a.minX + this.r() * (a.maxX - a.minX);
        hen.z = a.minZ + this.r() * (a.maxZ - a.minZ);
        if (this.free(hen.x, hen.z)) break;
      }
      this.hens.push(hen);
    }
    this.write();
  }

  /** True if a chicken could stand here without touching anything. */
  private free(x: number, z: number): boolean {
    const p = { x, z };
    return !resolveCollisions(p, this.cfg.radius + 0.15, this.colliders, -5);
  }

  private pickTarget(h: Hen): void {
    const a = this.cfg.area;
    for (let tries = 0; tries < 12; tries++) {
      const ang = this.r() * Math.PI * 2;
      const d = rand(this.r, this.cfg.wanderRange);
      const x = Math.min(a.maxX, Math.max(a.minX, h.x + Math.sin(ang) * d));
      const z = Math.min(a.maxZ, Math.max(a.minZ, h.z + Math.cos(ang) * d));
      if (this.free(x, z)) {
        h.tx = x;
        h.tz = z;
        return;
      }
    }
    h.tx = h.x;
    h.tz = h.z;
  }

  /** `threats`: ground positions to scatter from (the player, the seeker); a threat that is running scares from further away. */
  update(dt: number, threats: { x: number; z: number; running?: boolean }[]): void {
    const c = this.cfg;
    dt = Math.min(dt, 0.05);
    for (const h of this.hens) {
      // scared?
      let fx = 0;
      let fz = 0;
      let scared = false;
      for (const t of threats) {
        const dx = h.x - t.x;
        const dz = h.z - t.z;
        const d = Math.hypot(dx, dz);
        const limit = c.scareDistance * (t.running ? c.runBoost : 1);
        if (d < limit) {
          scared = true;
          fx += dx / (d || 1);
          fz += dz / (d || 1);
        }
      }
      if (scared && h.state !== 'flee') {
        h.state = 'flee';
        h.timer = rand(this.r, c.fleeTime);
        h.hopV = 1.6 + this.r() * 0.6; // a startled hop
      }
      if (h.state === 'flee' && scared) {
        h.tx = h.x + fx * 3;
        h.tz = h.z + fz * 3;
        h.timer = Math.max(h.timer, 0.35);
      }

      h.timer -= dt;
      if (h.state === 'idle' && h.timer <= 0) {
        if (this.r() < 0.55) {
          h.state = 'peck';
          h.timer = rand(this.r, c.peckTime);
        } else {
          h.state = 'walk';
          this.pickTarget(h);
          h.timer = 6;
        }
      } else if (h.state === 'peck' && h.timer <= 0) {
        h.state = 'idle';
        h.timer = rand(this.r, c.idleTime);
      } else if (h.state === 'flee' && h.timer <= 0) {
        h.state = 'idle';
        h.timer = rand(this.r, c.idleTime);
      }

      // walking / fleeing
      let target = 0;
      if (h.state === 'walk' || h.state === 'flee') {
        const dx = h.tx - h.x;
        const dz = h.tz - h.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.1 && h.state === 'walk') {
          h.state = 'idle';
          h.timer = rand(this.r, c.idleTime);
        } else {
          target = h.state === 'flee' ? c.fleeSpeed : c.walkSpeed;
          const want = Math.atan2(dx, dz);
          h.yaw += Math.atan2(Math.sin(want - h.yaw), Math.cos(want - h.yaw)) * Math.min(1, dt * (h.state === 'flee' ? 14 : 6));
        }
      }
      h.speed += (target - h.speed) * Math.min(1, dt * 9);
      if (h.speed > 0.02) {
        const p = { x: h.x + Math.sin(h.yaw) * h.speed * dt, z: h.z + Math.cos(h.yaw) * h.speed * dt };
        const before = { x: p.x, z: p.z };
        resolveCollisions(p, c.radius, this.colliders, -5);
        p.x = Math.min(c.area.maxX + 0.5, Math.max(c.area.minX - 0.5, p.x));
        p.z = Math.min(c.area.maxZ + 0.5, Math.max(c.area.minZ - 0.5, p.z));
        if (h.state === 'walk' && Math.hypot(p.x - before.x, p.z - before.z) > 0.01) this.pickTarget(h); // bumped into something: choose again
        h.x = p.x;
        h.z = p.z;
        h.phase += dt * (3 + h.speed * 5);
      }
      if (h.state === 'peck') h.peckPhase += dt * 7;
      if (h.state === 'idle' && this.r() < dt * 0.8) h.lookTarget = (this.r() - 0.5) * 1.6;
      h.lookYaw += (h.lookTarget - h.lookYaw) * Math.min(1, dt * 8);
      if (h.state !== 'idle') h.lookTarget = 0;
      // hop
      if (h.hopV !== 0 || h.hop > 0) {
        h.hopV -= 9 * dt;
        h.hop = Math.max(0, h.hop + h.hopV * dt);
        if (h.hop === 0 && h.hopV < 0) h.hopV = 0;
      }
    }
    this.write();
  }

  private write(): void {
    this.hens.forEach((h, i) => {
      const walking = h.speed > 0.05;
      const bob = walking ? Math.abs(Math.sin(h.phase)) * 0.012 : 0;
      const peck = h.state === 'peck' ? Math.max(0, Math.sin(h.peckPhase)) ** 2 : 0;
      const flee = h.state === 'flee' ? 1 : 0;
      const y = 0.22 + bob + h.hop;
      // body
      const root = m4(h.x, y, h.z, peck * 0.3 - flee * 0.12, h.yaw, 0);
      this.body.setMatrixAt(i, root);
      // head: bobs forward and back while walking, dips to the ground when pecking
      const fwd = walking ? Math.sin(h.phase * 2) * 0.03 : 0;
      const head = root.clone().multiply(m4(0, 0.2 - peck * 0.1, 0.2 + fwd + peck * 0.09, peck * 1.2, h.lookYaw, 0));
      this.head.setMatrixAt(i, head);
      this.face.setMatrixAt(i, head);
      // legs swing opposite each other about the hips
      const swing = walking ? Math.sin(h.phase) * Math.min(1, 0.4 + h.speed * 0.4) : 0;
      const hips = m4(h.x, y - 0.08 - bob * 0.2, h.z, 0, h.yaw, 0);
      this.legs.setMatrixAt(i * 2, tmp.copy(hips).multiply(m4(-0.06, 0.0, 0, swing, 0, 0)));
      this.legs.setMatrixAt(i * 2 + 1, tmp.copy(hips).multiply(m4(0.06, 0.0, 0, -swing, 0, 0)));
    });
    for (const m of [this.body, this.head, this.face, this.legs]) m.instanceMatrix.needsUpdate = true;
  }

  /** Where the chickens are (for the seeker to ignore, tests to inspect). */
  positions(): { x: number; z: number }[] {
    return this.hens.map((h) => ({ x: h.x, z: h.z }));
  }

  get states(): string[] {
    return this.hens.map((h) => h.state);
  }
}
