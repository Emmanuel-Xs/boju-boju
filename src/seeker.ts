// The masquerade seeker: patrols the hiding spots, hears footsteps, sees through a 70 degree cone, and grows suspicious of a badly camouflaged player.
//   Senses:     vision cone with raycast line of sight (walls and big props block it), hearing (running 6 m, walking 2 m).
//   Suspicion:  0..1. Rises while the player is in the cone and visible, at a rate set by (100 - camo score) and distance. 0.5: stop and lean in. 1.0: lunge, caught.
//   Behaviour:  patrol the spots in shuffled order with a look-around at each; investigate noises; every 15 s peek at one of the 3 spots nearest the player (a little cheating).
// Every number lives in SEEKER_CONFIG.
import * as THREE from 'three';
import { audio } from './audio';
import type { Fx, SuspicionIndicator, VisionCone } from './fx';
import { createMasquerade, type Masquerade, type MasqueradeState } from './masquerade';
import { resolveCollisions, type Collider } from './levels/controller';

export const SEEKER_CONFIG = {
  // --- senses
  visionFovDeg: 70,
  visionRange: 12,
  eyeHeight: 1.9,
  /** Heights (m above the player's feet) the line-of-sight rays aim at: head/chest, middle, low. Each unblocked ray counts a third. */
  sampleHeights: { stand: [1.45, 0.9, 0.35], crouch: [0.95, 0.6, 0.25], curl_ball: [0.5, 0.35, 0.2] } as Record<string, number[]>,
  /** How often the line-of-sight rays are re-cast (per second). */
  losHz: 15,
  hearRunRadius: 6, // running, and the thud of a landing jump
  hearWalkRadius: 2,
  /** Ignore noises that arrive again within this many seconds of the last one that was acted on. */
  noiseCooldown: 1.2,
  /** A fresh noise this far from the spot being checked re-targets the seeker. */
  noiseRetargetDistance: 2,

  // --- suspicion
  /** Suspicion per second for a fully visible, completely uncamouflaged player at point-blank range. */
  rateMax: 1,
  /** Exponent on (100 - camo) / 100. 2 makes a camo of 85 about 40 times less alarming than 0. */
  exposurePower: 2,
  /** Distance factor: 1 at the seeker's feet falling to `minDistanceFactor` at the edge of the cone... */
  minDistanceFactor: 0.15,
  /** ...and boosted this much inside `nearRadius`. */
  nearRadius: 3,
  nearBoost: 1.4,
  /** Suspicion lost per second while the player is in view (so a near-invisible player never accumulates anything)... */
  seenDecay: 0.02,
  /** ...and while out of sight (slow, so a seeker stays jumpy for a while). */
  lostDecay: 0.08,
  leanAt: 0.5, // stop and lean in
  leanExit: 0.35, // stop leaning once suspicion falls below this
  catchAt: 1,

  // --- movement (a walking player does 2.8 m/s, a running one 4.8)
  patrolSpeed: 3.4,
  investigateSpeed: 3.8,
  checkSpeed: 3.6,
  turnRate: 6, // 1/s, how quickly the body turns to face where it is going
  arriveRadius: 0.5,
  radius: 0.5, // body radius used for navigation and collisions
  navCell: 0.4,
  lookTime: [2.5, 4] as [number, number], // pause at each patrol point
  investigateLookTime: [2.5, 3.5] as [number, number],
  lookSweepAngle: 0.9, // rad: how far the body swings left and right while looking around
  checkStandOff: 2, // m from a hiding spot the seeker stands at when checking it (on the open side)
  catchDashSpeed: 8,
  catchReach: 1,
  catchDashMax: 0.5, // s
  caughtTime: 2.8, // s of victory dance before the round resets

  // --- cheating
  cheatInterval: 15, // s
  cheatCandidates: 3, // the nearest spots to the player's actual position; one of them is checked
};

export type SeekerState = 'patrol_walk' | 'patrol_look' | 'investigate_walk' | 'investigate_look' | 'check_walk' | 'check_look' | 'suspicious' | 'catch' | 'caught';

export interface SpotInfo {
  id: string;
  position: THREE.Vector3;
  /** Unit vector from the standing position towards the surface. */
  facing: THREE.Vector3;
}

/** What the seeker needs from the world. */
export interface SeekerHost {
  colliders: readonly Collider[];
  spots: readonly SpotInfo[];
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** True when something solid sits between the two points. */
  blocked(from: THREE.Vector3, to: THREE.Vector3): boolean;
}

export interface PlayerSense {
  position: THREE.Vector3;
  /** Ground speed (m/s). */
  speed: number;
  /** True on the frame the player landed from a jump. */
  landed: boolean;
  /** Camo score 0..100, as seen from the seeker. */
  camo: number;
  pose: string | null;
}

// --- navigation grid -------------------------------------------------------------------------------------------------------

class Nav {
  readonly w: number;
  readonly h: number;
  private blocked: Uint8Array;

  constructor(
    colliders: readonly Collider[],
    private bounds: SeekerHost['bounds'],
    radius: number,
    readonly cell: number,
  ) {
    this.w = Math.ceil((bounds.maxX - bounds.minX) / cell);
    this.h = Math.ceil((bounds.maxZ - bounds.minZ) / cell);
    this.blocked = new Uint8Array(this.w * this.h);
    for (let iz = 0; iz < this.h; iz++) {
      for (let ix = 0; ix < this.w; ix++) {
        const x = bounds.minX + (ix + 0.5) * cell;
        const z = bounds.minZ + (iz + 0.5) * cell;
        let b = false;
        for (const c of colliders) {
          if (c.climb && c.top <= 0.25) continue; // a low plank floor or kerb: walkable
          if (c.kind === 'box') {
            const dx = Math.max(c.minX - x, 0, x - c.maxX);
            const dz = Math.max(c.minZ - z, 0, z - c.maxZ);
            if (dx * dx + dz * dz < radius * radius) b = true;
          } else if ((x - c.x) ** 2 + (z - c.z) ** 2 < (radius + c.r) ** 2) b = true;
          if (b) break;
        }
        this.blocked[iz * this.w + ix] = b ? 1 : 0;
      }
    }
  }

  private ix(x: number) {
    return Math.floor((x - this.bounds.minX) / this.cell);
  }
  private iz(z: number) {
    return Math.floor((z - this.bounds.minZ) / this.cell);
  }
  private isBlockedCell(ix: number, iz: number) {
    return ix < 0 || iz < 0 || ix >= this.w || iz >= this.h || this.blocked[iz * this.w + ix] === 1;
  }
  free(x: number, z: number): boolean {
    return !this.isBlockedCell(this.ix(x), this.iz(z));
  }

  /** The closest walkable point to (x, z), searching outwards in rings. */
  nearestFree(x: number, z: number, maxRing = 12): { x: number; z: number } | null {
    const cx = this.ix(x);
    const cz = this.iz(z);
    if (!this.isBlockedCell(cx, cz)) return { x, z };
    let best: { x: number; z: number } | null = null;
    let bestD = Infinity;
    for (let r = 1; r <= maxRing; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r || this.isBlockedCell(cx + dx, cz + dz)) continue;
          const px = this.bounds.minX + (cx + dx + 0.5) * this.cell;
          const pz = this.bounds.minZ + (cz + dz + 0.5) * this.cell;
          const d = (px - x) ** 2 + (pz - z) ** 2;
          if (d < bestD) {
            bestD = d;
            best = { x: px, z: pz };
          }
        }
      }
      if (best) return best;
    }
    return null;
  }

  lineClear(a: { x: number; z: number }, b: { x: number; z: number }): boolean {
    const d = Math.hypot(b.x - a.x, b.z - a.z);
    const n = Math.max(1, Math.ceil(d / (this.cell * 0.5)));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      if (!this.free(a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t)) return false;
    }
    return true;
  }

  /** A* over the grid (8 neighbours), then string-pulled into a few waypoints. Null if there is no way. */
  path(from: { x: number; z: number }, to: { x: number; z: number }): { x: number; z: number }[] | null {
    const s = this.nearestFree(from.x, from.z, 4);
    const g = this.nearestFree(to.x, to.z, 12);
    if (!s || !g) return null;
    const w = this.w;
    const start = this.iz(s.z) * w + this.ix(s.x);
    const goal = this.iz(g.z) * w + this.ix(g.x);
    const gScore = new Float32Array(this.w * this.h).fill(Infinity);
    const prev = new Int32Array(this.w * this.h).fill(-1);
    const closed = new Uint8Array(this.w * this.h);
    const heap: [number, number][] = [[0, start]]; // [f, node]
    gScore[start] = 0;
    const push = (item: [number, number]) => {
      heap.push(item);
      let i = heap.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
      }
    };
    const pop = () => {
      const top = heap[0];
      const last = heap.pop()!;
      if (heap.length) {
        heap[0] = last;
        let i = 0;
        for (;;) {
          const l = i * 2 + 1;
          const r = l + 1;
          let m = i;
          if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
          if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
          if (m === i) break;
          [heap[m], heap[i]] = [heap[i], heap[m]];
          i = m;
        }
      }
      return top;
    };
    const gx = goal % w;
    const gz = Math.floor(goal / w);
    let found = false;
    while (heap.length) {
      const [, n] = pop();
      if (closed[n]) continue;
      closed[n] = 1;
      if (n === goal) {
        found = true;
        break;
      }
      const nx = n % w;
      const nz = Math.floor(n / w);
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dz) continue;
          const mx = nx + dx;
          const mz = nz + dz;
          if (this.isBlockedCell(mx, mz)) continue;
          if (dx && dz && (this.isBlockedCell(nx + dx, nz) || this.isBlockedCell(nx, nz + dz))) continue; // no cutting corners
          const m = mz * w + mx;
          if (closed[m]) continue;
          const step = gScore[n] + (dx && dz ? 1.414 : 1);
          if (step < gScore[m]) {
            gScore[m] = step;
            prev[m] = n;
            push([step + Math.hypot(gx - mx, gz - mz), m]);
          }
        }
      }
    }
    if (!found) return null;
    const cells: { x: number; z: number }[] = [];
    for (let n = goal; n !== -1; n = prev[n]) cells.push({ x: this.bounds.minX + ((n % w) + 0.5) * this.cell, z: this.bounds.minZ + (Math.floor(n / w) + 0.5) * this.cell });
    cells.reverse();
    // string pulling: keep only the corners that matter
    const out: { x: number; z: number }[] = [];
    let anchor = 0;
    while (anchor < cells.length - 1) {
      let far = cells.length - 1;
      while (far > anchor + 1 && !this.lineClear(cells[anchor], cells[far])) far--;
      out.push(cells[far]);
      anchor = far;
    }
    return out;
  }
}

// --- the seeker -------------------------------------------------------------------------------------------------------

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export class Seeker {
  readonly masq: Masquerade;
  readonly group: THREE.Group;
  readonly debugGroup = new THREE.Group();
  state: SeekerState = 'patrol_walk';
  suspicion = 0;
  /** Called once when the seeker catches the player. */
  onCaught: (() => void) | null = null;
  /** Called when the lunge starts (suspicion reached 1), a little before `onCaught`. */
  onCatchStart: (() => void) | null = null;
  /** Eyes covered (the prep phase): it stands still singing and notices nothing. */
  blind = false;
  /** Cleared round: it stands still, looking around in annoyance, and notices nothing. */
  frustrated = false;
  readonly eye = new THREE.Vector3();

  private nav: Nav;
  private cone: VisionCone;
  private indicator: SuspicionIndicator;
  private pos = new THREE.Vector3();
  private yaw = 0;
  private path: { x: number; z: number }[] = [];
  private pathIdx = 0;
  private stuckT = 0;
  private stuckFrom = new THREE.Vector2();
  private lookT = 0;
  private lookDur = 3;
  private lookBase = 0;
  private lookAt: THREE.Vector3 | null = null;
  private order: number[] = [];
  private orderIdx = 0;
  private cheatTimer = 0;
  private noiseTimer = 0;
  private lastSeen: THREE.Vector3 | null = null;
  private catchT = 0;
  private caughtT = 0;
  private losT = 0;
  private visFrac = 0;
  private speed = 0;
  private anim: MasqueradeState = 'search_walk';
  private targetLabel = 'none';
  private targetPoint: { x: number; z: number } | null = null;
  private debugOn = false;
  private line: THREE.Line;
  private tmp = new THREE.Vector3();
  private sense = { inCone: false, rate: 0, exposure: 0, distFactor: 0, dist: 0, heard: '' };
  private pathAge = 0;

  constructor(
    private host: SeekerHost,
    private fx: Fx,
    scene: THREE.Scene,
    /** A private copy, so a run can sharpen this seeker without touching SEEKER_CONFIG. */
    private cfg = { ...SEEKER_CONFIG },
  ) {
    this.masq = createMasquerade();
    this.group = this.masq.group;
    this.cone = fx.addVisionCone(this.group, cfg.visionRange, cfg.visionFovDeg);
    this.indicator = fx.addSuspicionIndicator(this.group);
    scene.add(this.group, this.debugGroup);
    this.nav = new Nav(host.colliders, host.bounds, cfg.radius + 0.05, cfg.navCell);
    this.group.traverse((o) => {
      if (o instanceof THREE.Mesh && !(o.material instanceof THREE.ShaderMaterial)) o.castShadow = true;
    });

    const geo = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 24 }, () => new THREE.Vector3()));
    this.line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#ff2fd0', depthTest: false }));
    this.line.renderOrder = 998;
    this.line.frustumCulled = false;
    this.debugGroup.add(this.line);
    this.debugGroup.visible = false;
    this.reset();
  }

  /** Change tuning numbers on the fly (a harder round). The cone on the ground is redrawn if its size changed. */
  applyDifficulty(patch: Partial<typeof SEEKER_CONFIG>): void {
    const resize = (patch.visionFovDeg !== undefined && patch.visionFovDeg !== this.cfg.visionFovDeg) || (patch.visionRange !== undefined && patch.visionRange !== this.cfg.visionRange);
    Object.assign(this.cfg, patch);
    if (resize) {
      this.fx.removeVisionCone(this.cone);
      this.cone = this.fx.addVisionCone(this.group, this.cfg.visionRange, this.cfg.visionFovDeg);
    }
  }

  setDebug(on: boolean): void {
    this.debugOn = on;
    this.debugGroup.visible = on;
  }
  get debug(): boolean {
    return this.debugOn;
  }
  get position(): THREE.Vector3 {
    return this.pos;
  }
  get heading(): number {
    return this.yaw;
  }

  /** Back to calm patrol, e.g. after a catch. */
  reset(at?: { x: number; z: number; yaw?: number }): void {
    this.suspicion = 0;
    this.lastSeen = null;
    this.catchT = this.caughtT = 0;
    this.cheatTimer = 0;
    this.noiseTimer = 0;
    this.speed = 0;
    this.shuffle();
    if (at) this.placeAt(at.x, at.z, at.yaw ?? this.yaw);
    this.startPatrol();
    this.applyFx();
  }

  placeAt(x: number, z: number, yaw: number): void {
    this.pos.set(x, 0, z);
    this.yaw = yaw;
    this.group.position.copy(this.pos);
    this.group.rotation.y = yaw;
    this.path = [];
  }

  private shuffle(): void {
    this.order = this.host.spots.map((_, i) => i);
    for (let i = this.order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    }
    this.orderIdx = 0;
  }

  // --- goals -------------------------------------------------------------------------------------------------------------

  private goTo(x: number, z: number, label: string): boolean {
    const p = this.nav.path(this.pos, { x, z });
    if (!p || !p.length) return false;
    this.path = p;
    this.pathIdx = 0;
    this.targetPoint = p[p.length - 1];
    this.targetLabel = label;
    this.stuckT = 0;
    this.stuckFrom.set(this.pos.x, this.pos.z);
    this.pathAge = 0;
    return true;
  }

  /** Where to stand to look at a spot: out on its open side, so the seeker sees the hider with the surface behind them. */
  private standPoint(spot: SpotInfo): { x: number; z: number } {
    return { x: spot.position.x - spot.facing.x * this.cfg.checkStandOff, z: spot.position.z - spot.facing.z * this.cfg.checkStandOff };
  }

  private startPatrol(): void {
    this.state = 'patrol_walk';
    for (let tries = 0; tries < this.host.spots.length; tries++) {
      if (this.orderIdx >= this.order.length) this.shuffle();
      const spot = this.host.spots[this.order[this.orderIdx++]];
      const sp = this.standPoint(spot);
      if (this.goTo(sp.x, sp.z, `patrol: ${spot.id}`)) {
        this.lookAt = spot.position.clone();
        return;
      }
    }
    this.startLook('patrol_look');
  }

  private startLook(kind: 'patrol_look' | 'investigate_look' | 'check_look'): void {
    this.state = kind;
    this.lookT = 0;
    this.lookDur = rand(...(kind === 'investigate_look' ? this.cfg.investigateLookTime : this.cfg.lookTime));
    this.lookBase = this.lookAt ? Math.atan2(this.lookAt.x - this.pos.x, this.lookAt.z - this.pos.z) : this.yaw;
    this.path = [];
  }

  private startInvestigate(x: number, z: number, label: string): void {
    if (this.goTo(x, z, label)) {
      this.state = 'investigate_walk';
      this.lookAt = new THREE.Vector3(x, 0, z);
    } else this.startPatrol();
  }

  /** The cheat: peek at one of the few spots nearest to where the player really is. */
  private startCheck(player: THREE.Vector3): void {
    const near = [...this.host.spots].sort((a, b) => (a.position.x - player.x) ** 2 + (a.position.z - player.z) ** 2 - ((b.position.x - player.x) ** 2 + (b.position.z - player.z) ** 2)).slice(0, this.cfg.cheatCandidates);
    const spot = near[Math.floor(Math.random() * near.length)];
    if (!spot) return;
    const sp = this.standPoint(spot);
    if (this.goTo(sp.x, sp.z, `check: ${spot.id}`)) {
      this.state = 'check_walk';
      this.lookAt = spot.position.clone();
    }
  }

  // --- per-frame ----------------------------------------------------------------------------------------------------------

  update(dt: number, p: PlayerSense): void {
    const cfg = this.cfg;
    dt = Math.min(dt, 0.05);
    this.noiseTimer = Math.max(0, this.noiseTimer - dt);
    this.cheatTimer += dt;
    this.eye.set(this.pos.x + Math.sin(this.yaw) * 0.12, cfg.eyeHeight, this.pos.z + Math.cos(this.yaw) * 0.12);

    if (this.state === 'caught') {
      this.caughtT += dt;
      this.anim = 'victory_dance';
      this.finish(dt);
      return;
    }

    if (this.blind || this.frustrated) {
      this.anim = this.blind ? 'sing_eyes_covered' : 'look_around';
      this.speed = 0;
      this.suspicion = 0;
      this.path = [];
      this.finish(dt);
      return;
    }
    this.sees(dt, p);
    this.hears(p);

    // suspicion thresholds
    if (this.state !== 'catch') {
      if (this.suspicion >= cfg.catchAt) {
        this.state = 'catch';
        this.catchT = 0;
        this.path = [];
        this.onCatchStart?.();
      } else if (this.suspicion >= cfg.leanAt && this.state !== 'suspicious') {
        this.state = 'suspicious';
        this.path = [];
      } else if (this.state === 'suspicious' && this.suspicion < cfg.leanExit) {
        if (this.lastSeen) this.startInvestigate(this.lastSeen.x, this.lastSeen.z, 'investigate: last seen');
        else this.startPatrol();
      }
    }

    switch (this.state) {
      case 'patrol_walk':
      case 'investigate_walk':
      case 'check_walk': {
        this.anim = 'search_walk';
        const speed = this.state === 'patrol_walk' ? cfg.patrolSpeed : this.state === 'investigate_walk' ? cfg.investigateSpeed : cfg.checkSpeed;
        if (this.follow(dt, speed)) {
          // arrived: turn to the thing we came to look at, then look around
          const kind = this.state === 'patrol_walk' ? 'patrol_look' : this.state === 'investigate_walk' ? 'investigate_look' : 'check_look';
          this.startLook(kind);
        }
        break;
      }
      case 'patrol_look':
      case 'investigate_look':
      case 'check_look': {
        this.anim = 'look_around';
        this.speed += (0 - this.speed) * Math.min(1, dt * 8);
        this.lookT += dt;
        const sweep = Math.sin(this.lookT * 1.1) * cfg.lookSweepAngle * Math.min(1, this.lookT / 0.6);
        this.yaw += wrap(this.lookBase + sweep - this.yaw) * Math.min(1, dt * 5);
        if (this.lookT >= this.lookDur) this.startPatrol();
        this.cheatTick(p);
        break;
      }
      case 'suspicious': {
        // stop and lean towards the player (or where they were last seen)
        this.anim = 'suspicious_lean';
        this.speed += (0 - this.speed) * Math.min(1, dt * 10);
        const t = this.lastSeen ?? p.position;
        this.yaw += wrap(Math.atan2(t.x - this.pos.x, t.z - this.pos.z) - this.yaw) * Math.min(1, dt * 8);
        break;
      }
      case 'catch': {
        this.anim = 'catch_lunge';
        this.catchT += dt;
        const dx = p.position.x - this.pos.x;
        const dz = p.position.z - this.pos.z;
        const d = Math.hypot(dx, dz);
        this.yaw += wrap(Math.atan2(dx, dz) - this.yaw) * Math.min(1, dt * 14);
        if (d > cfg.catchReach && this.catchT < cfg.catchDashMax) {
          const step = Math.min(cfg.catchDashSpeed * dt, d - cfg.catchReach * 0.8);
          this.pos.x += (dx / d) * step;
          this.pos.z += (dz / d) * step;
          this.speed = cfg.catchDashSpeed;
        } else {
          this.speed = 0;
        }
        if ((d <= cfg.catchReach || this.catchT >= cfg.catchDashMax) && this.catchT > 0.25) {
          this.state = 'caught';
          this.caughtT = 0;
          this.suspicion = 1;
          this.onCaught?.();
        }
        break;
      }
      default:
        break;
    }
    this.finish(dt);
  }

  private cheatTick(p: PlayerSense): void {
    if (this.cheatTimer >= this.cfg.cheatInterval && (this.state === 'patrol_look' || this.state === 'patrol_walk')) {
      this.cheatTimer = 0;
      this.startCheck(p.position);
    }
  }

  private finish(dt: number): void {
    // pose, position, cloth
    this.group.position.set(this.pos.x, 0, this.pos.z);
    this.group.rotation.y = this.yaw;
    this.masq.play(this.anim, 0.25);
    this.masq.animator.speed = this.anim === 'search_walk' ? Math.max(0.6, Math.min(1.5, this.speed / 2.4)) : 1;
    this.masq.update(dt);
    this.applyFx();
    if (this.debugOn) this.drawDebug();
  }

  private applyFx(): void {
    this.cone.mesh.visible = !this.blind && !this.frustrated && this.state !== 'caught';
    this.cone.setSuspicion(this.suspicion);
    this.indicator.set(this.suspicion);
    audio.setSuspicion(this.suspicion);
  }

  // --- senses ---------------------------------------------------------------------------------------------------------------

  private sees(dt: number, p: PlayerSense): void {
    const cfg = this.cfg;
    const dx = p.position.x - this.pos.x;
    const dz = p.position.z - this.pos.z;
    const d = Math.hypot(dx, dz);
    const inCone = d <= cfg.visionRange && (d < 0.2 || (Math.sin(this.yaw) * dx + Math.cos(this.yaw) * dz) / d >= Math.cos(THREE.MathUtils.degToRad(cfg.visionFovDeg / 2)));

    this.losT += dt;
    if (inCone) {
      if (this.losT >= 1 / cfg.losHz) {
        this.losT = 0;
        const heights = cfg.sampleHeights[p.pose && cfg.sampleHeights[p.pose] ? p.pose : 'stand'];
        let seen = 0;
        for (const h of heights) if (!this.host.blocked(this.eye, this.tmp.set(p.position.x, p.position.y + h, p.position.z))) seen++;
        this.visFrac = seen / heights.length;
      }
    } else this.visFrac = 0;

    const exposure = ((100 - Math.min(100, Math.max(0, p.camo))) / 100) ** cfg.exposurePower;
    let distFactor = Math.min(1, Math.max(cfg.minDistanceFactor, 1 - d / cfg.visionRange));
    if (d < cfg.nearRadius) distFactor *= cfg.nearBoost;
    const visible = inCone && this.visFrac > 0;
    const rate = visible ? cfg.rateMax * exposure * distFactor * this.visFrac : 0;
    this.sense = { ...this.sense, inCone, rate, exposure, distFactor, dist: d };

    if (visible) {
      this.lastSeen = (this.lastSeen ?? new THREE.Vector3()).copy(p.position);
      this.suspicion += (rate - cfg.seenDecay) * dt;
    } else this.suspicion -= cfg.lostDecay * dt;
    this.suspicion = Math.min(1, Math.max(0, this.suspicion));
  }

  private hears(p: PlayerSense): void {
    const cfg = this.cfg;
    const radius = p.landed || p.speed > 3.6 ? cfg.hearRunRadius : p.speed > 0.35 ? cfg.hearWalkRadius : 0;
    const d = Math.hypot(p.position.x - this.pos.x, p.position.z - this.pos.z);
    this.sense.heard = radius && d <= radius ? `${p.landed ? 'landing' : p.speed > 3.6 ? 'running' : 'walking'} at ${d.toFixed(1)} m` : '';
    if (!radius || d > radius || this.noiseTimer > 0) return;
    if (this.state === 'suspicious' || this.state === 'catch' || this.state === 'caught') return;
    const t = this.targetPoint;
    if ((this.state === 'investigate_walk' || this.state === 'investigate_look') && t && Math.hypot(t.x - p.position.x, t.z - p.position.z) < cfg.noiseRetargetDistance) return;
    this.noiseTimer = cfg.noiseCooldown;
    this.startInvestigate(p.position.x, p.position.z, `noise: ${this.sense.heard}`);
  }

  // --- movement -------------------------------------------------------------------------------------------------------------

  /** Walks the path. Returns true on arrival. */
  private follow(dt: number, speed: number): boolean {
    const cfg = this.cfg;
    if (!this.path.length || this.pathIdx >= this.path.length) return true;
    const wp = this.path[this.pathIdx];
    const dx = wp.x - this.pos.x;
    const dz = wp.z - this.pos.z;
    const d = Math.hypot(dx, dz);
    const last = this.pathIdx === this.path.length - 1;
    if (d < (last ? cfg.arriveRadius * 0.6 : cfg.arriveRadius)) {
      this.pathIdx++;
      return this.pathIdx >= this.path.length;
    }
    this.yaw += wrap(Math.atan2(dx, dz) - this.yaw) * (1 - Math.exp(-dt * cfg.turnRate));
    // slow down for sharp turns so it doesn't skate sideways
    const align = Math.max(0.25, Math.cos(wrap(Math.atan2(dx, dz) - this.yaw)));
    this.speed += (speed * align - this.speed) * Math.min(1, dt * 6);
    const p = { x: this.pos.x + Math.sin(this.yaw) * this.speed * dt, z: this.pos.z + Math.cos(this.yaw) * this.speed * dt };
    resolveCollisions(p, cfg.radius - 0.05, this.host.colliders, -5);
    this.pos.x = p.x;
    this.pos.z = p.z;

    // stuck? re-plan, and give up on the goal if that doesn't help
    this.stuckT += dt;
    if (this.stuckT > 1.5) {
      if (Math.hypot(this.pos.x - this.stuckFrom.x, this.pos.z - this.stuckFrom.y) < 0.4) {
        const t = this.targetPoint;
        if (!t || !this.goTo(t.x, t.z, this.targetLabel)) return true;
      }
      this.stuckT = 0;
      this.stuckFrom.set(this.pos.x, this.pos.z);
    }
    return false;
  }

  // --- debug ----------------------------------------------------------------------------------------------------------------

  describe(p?: PlayerSense): string {
    const s = this.sense;
    const t = this.targetPoint;
    const bar = '#'.repeat(Math.round(this.suspicion * 20)).padEnd(20, '.');
    const lines = [
      `AI state   ${this.state}`,
      `target     ${this.targetLabel}${t ? ` (${t.x.toFixed(1)}, ${t.z.toFixed(1)}) ${Math.hypot(t.x - this.pos.x, t.z - this.pos.z).toFixed(1)} m away` : ''}`,
      `suspicion  ${this.suspicion.toFixed(2)} [${bar}]  lean@${this.cfg.leanAt} catch@${this.cfg.catchAt}`,
      `sight      ${s.inCone ? 'in cone' : 'outside cone'}, d ${s.dist.toFixed(1)} m, line of sight ${(this.visFrac * 100).toFixed(0)}%`,
      `rate       ${s.rate.toFixed(3)}/s = max ${this.cfg.rateMax} x exposure ${s.exposure.toFixed(3)} (camo ${p ? p.camo.toFixed(0) : '?'}) x dist ${s.distFactor.toFixed(2)} x vis ${this.visFrac.toFixed(2)}`,
      `hearing    ${s.heard || 'nothing'}${this.noiseTimer > 0 ? ' (cooling down)' : ''}`,
      `cheat      next peek in ${Math.max(0, this.cfg.cheatInterval - this.cheatTimer).toFixed(1)} s`,
    ];
    return lines.join('\n');
  }

  private drawDebug(): void {
    const pts: THREE.Vector3[] = [new THREE.Vector3(this.pos.x, 0.2, this.pos.z)];
    for (let i = this.pathIdx; i < this.path.length && pts.length < 24; i++) pts.push(new THREE.Vector3(this.path[i].x, 0.2, this.path[i].z));
    while (pts.length < 24) pts.push(pts[pts.length - 1].clone());
    this.line.geometry.setFromPoints(pts);
  }
}
