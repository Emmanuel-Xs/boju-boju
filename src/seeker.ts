// The masquerade seeker: patrols (see patrol.ts: it walks to wherever it has not looked for longest), hears footsteps, sees through a cone with raycast
// line of sight, follows fresh footprints, and every so often does a spin sweep that sees all the way round.
//   Senses:     vision cone with raycast line of sight (walls and big props block it), hearing (running 6 m, walking 2 m), footprints.
//   Suspicion:  0..1. Rises while the player is in the cone and visible, at a rate set by (100 - camo score) and distance. 0.5: stop and lean in.
//   Catching:   by sight. At 1.0, with the player visible within catchRange, it lunges (no touching needed); further away it closes in first.
//   Body:       a small capsule (radius 0.6 m) on a 0.5 m walkable grid; A* paths are string-pulled and rounded. The cloth panels never collide.
// Every number lives in SEEKER_CONFIG.
import * as THREE from 'three';
import { audio } from './audio';
import type { Fx, SuspicionIndicator, VisionCone } from './fx';
import { createMasquerade, type Masquerade, type MasqueradeState } from './masquerade';
import { resolveCollisions, type Collider } from './levels/controller';
import type { Nav } from './nav';
import { Coverage, COVERAGE_CONFIG } from './levels/coverage';
import { Patrol, type Stop } from './patrol';

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
  /** A glimpse this suspicious sends it to take a closer look at where it saw something, before it leans in. */
  curiousAt: 0.2,
  curiousCooldown: 4, // s between such trips
  leanAt: 0.5, // stop and lean in
  leanExit: 0.35, // stop leaning once suspicion falls below this
  catchAt: 1,

  // --- movement (a walking player does 2.8 m/s, a running one 4.8)
  patrolSpeed: 3.4,
  investigateSpeed: 3.8,
  checkSpeed: 3.6,
  turnRate: 6, // 1/s, how quickly the body turns to face where it is going
  arriveRadius: 0.5,
  /** The physics body is a small capsule this wide (m). The cloth panels are only drawn, they never collide with anything. */
  radius: 0.6,
  /** Cells of the walkable grid baked from the level colliders (m). */
  navCell: 0.5,
  /** Corners of a path are cut by up to this much (m), so it walks curves and not zig-zags. */
  pathRound: 0.9,
  lookTime: [2.5, 4] as [number, number], // pause at each patrol point
  investigateLookTime: [2.5, 3.5] as [number, number],
  lookSweepAngle: 0.9, // rad: how far the body swings left and right while looking around
  checkStandOff: 2, // m from a hiding spot the seeker stands at when checking it (on the open side)
  /** A catch is by sight: suspicion full, the player in view and this close (m). No touching needed. */
  catchRange: 6,
  /** The lunge toward the player: how long it takes (s) and how far the masquerade steps in (m). */
  catchLungeSeconds: 0.5,
  catchLungeDistance: 1.6,
  /** Suspicion is full but the player is further than catchRange: the masquerade closes in at this speed (m/s), re-aiming this often (s). */
  chaseSpeed: 4.6,
  chaseRetarget: 0.35,
  caughtTime: 2.8, // s of victory dance before the round resets

  // --- the spin sweep: every so often it twirls, and for a moment sees all the way round
  /** Seconds between sweeps (a random time in this range after each one). */
  spinInterval: [18, 25] as [number, number],
  /** The warning before it (s): a drum roll, the panels lift and it stands trembling. */
  spinTelegraph: 1,
  spinSeconds: 1.5,
  /** During the spin it sees every direction inside this distance (m). */
  spinRadius: 5,

  // --- footprints and the trail
  /** A print older than this (s) is too faded to notice; one further away than printRange (m) is not seen. */
  printNoticeAge: 8,
  printRange: 9,
  /** The next print on a trail is within this distance of the last (m). */
  printStep: 3.5,
  /** Speed on a trail (m/s). */
  trailSpeed: 4.2,

  // --- scoring hook
  /** The player counts as having a near miss inside the cone and visible, at most this far away (m). */
  nearMissRange: 8,

  // --- cheating
  cheatInterval: 15, // s
  cheatCandidates: 3, // the nearest spots to the player's actual position; one of them is checked
};

export type SeekerState = 'spin_wind' | 'spin' | 'patrol_walk' | 'patrol_look' | 'investigate_walk' | 'investigate_look' | 'check_walk' | 'check_look' | 'suspicious' | 'catch' | 'caught';

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
  /** Footprints on the floor, oldest first. */
  prints?: { list(): readonly { id: number; x: number; z: number; age: number }[] };
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
  /** The warning before a spin sweep starts / the sweep starts / it ends. */
  onSpinTelegraph: (() => void) | null = null;
  onSpinStart: (() => void) | null = null;
  onSpinEnd: (() => void) | null = null;
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
  private stuckFails = 0;
  private stuckFrom = new THREE.Vector2();
  private lookT = 0;
  private lookDur = 3;
  private lookBase = 0;
  private lookAt: THREE.Vector3 | null = null;
  /** How long baking the grid and the patrol stops took (ms). */
  readonly buildMs: number;
  readonly cov: Coverage;
  readonly patrol: Patrol;
  private curStop: Stop | null = null;
  private sweeping = false;
  private chasing = false;
  private spinIn = 20;
  private spinT = 0;
  private ring: THREE.Mesh;
  private trailId: number | null = null;
  private trailSeen = 0;
  private printT = 0;
  private curiousT = 0;
  private chaseT = 0;
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
  private sense = { inCone: false, rate: 0, exposure: 0, distFactor: 0, dist: 0, heard: '', canCatch: false };
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
    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(cfg.spinRadius - 0.45, cfg.spinRadius, 56).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
    );
    this.ring.position.y = 0.06;
    this.ring.visible = false;
    this.group.add(this.ring);
    scene.add(this.group, this.debugGroup);
    const t0 = performance.now();
    this.cov = new Coverage(host.colliders, host.bounds, { ...COVERAGE_CONFIG, cell: cfg.navCell, seekerRadius: cfg.radius + 0.05 });
    this.nav = this.cov.seeker;
    this.patrol = new Patrol(this.cov, host.spots, (s) => this.standPoint(s));
    this.buildMs = Math.round(performance.now() - t0);
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
    this.endSpin(false);
    this.spinIn = rand(...this.cfg.spinInterval);
    this.trailId = null;
    this.trailSeen = 0;
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

  // --- goals -------------------------------------------------------------------------------------------------------------

  private goTo(x: number, z: number, label: string): boolean {
    const p = this.nav.path(this.pos, { x, z }, this.cfg.pathRound);
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
    this.chasing = false;
    const tried = new Set<Stop>();
    for (let tries = 0; tries < 5; tries++) {
      const stop = this.patrol.next(this.pos.x, this.pos.z, tried);
      tried.add(stop);
      if (this.goTo(stop.x, stop.z, `patrol: ${stop.id}`)) {
        this.curStop = stop;
        this.lookAt = stop.lookAt ? new THREE.Vector3(stop.lookAt.x, 0, stop.lookAt.z) : null;
        return;
      }
    }
    this.curStop = null;
    this.startLook('patrol_look');
  }

  private startLook(kind: 'patrol_look' | 'investigate_look' | 'check_look'): void {
    this.state = kind;
    this.lookT = 0;
    this.lookDur = rand(...(kind === 'investigate_look' ? this.cfg.investigateLookTime : this.cfg.lookTime));
    this.lookBase = this.lookAt ? Math.atan2(this.lookAt.x - this.pos.x, this.lookAt.z - this.pos.z) : this.yaw;
    this.path = [];
    // a corner or coverage stop is looked at all the way round; a hiding spot with a sweep either side of it
    this.sweeping = kind === 'patrol_look' && !!this.curStop && this.curStop.kind !== 'spot';
    if (this.sweeping) this.lookDur = this.patrol.cfg.sweepSeconds;
    if ((kind === 'patrol_look' || kind === 'check_look') && this.curStop) this.patrol.visited(this.curStop);
  }

  private startInvestigate(x: number, z: number, label: string, trail: number | null = null): void {
    this.curStop = null;
    this.trailId = trail;
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
    // the patrol stop for a spot is a place the body can really get to, even when the spot itself is tucked in a pocket
    const stop = this.patrol.stops.find((st) => st.id === `spot ${spot.id}`);
    const sp = stop ?? this.standPoint(spot);
    if (this.goTo(sp.x, sp.z, `check: ${spot.id}`)) {
      this.curStop = stop ?? null;
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
    this.patrol.tick(dt);
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

    this.tickSpin(dt);
    this.scanPrints(dt);

    // suspicion thresholds
    if (this.state !== 'catch') {
      if (this.suspicion >= cfg.catchAt) {
        if (this.sense.canCatch) {
          this.endSpin(false);
          this.state = 'catch';
          this.catchT = 0;
          this.path = [];
          this.chasing = false;
          this.onCatchStart?.();
        } else this.chase(dt, p); // sure it saw someone, but too far for the lunge: close in
      } else {
        this.chasing = false;
        this.curiousT -= dt;
        const calm = this.state === 'patrol_walk' || this.state === 'patrol_look' || this.state === 'check_walk' || this.state === 'check_look' || this.state === 'investigate_look';
        if (this.suspicion >= cfg.curiousAt && this.suspicion < cfg.leanAt && calm && this.curiousT <= 0 && this.lastSeen) {
          this.curiousT = cfg.curiousCooldown;
          this.startInvestigate(this.lastSeen.x, this.lastSeen.z, 'curious: something moved');
        } else if (this.suspicion >= cfg.leanAt && this.state !== 'suspicious') {
          this.endSpin(false);
          this.state = 'suspicious';
          this.path = [];
        } else if (this.state === 'suspicious' && this.suspicion < cfg.leanExit) {
          if (this.lastSeen) this.startInvestigate(this.lastSeen.x, this.lastSeen.z, 'investigate: last seen');
          else this.startPatrol();
        }
      }
    }

    switch (this.state) {
      case 'patrol_walk':
      case 'investigate_walk':
      case 'check_walk': {
        this.anim = 'search_walk';
        const speed = this.state === 'patrol_walk' ? cfg.patrolSpeed : this.state === 'investigate_walk' ? (this.chasing ? cfg.chaseSpeed : this.trailId !== null ? cfg.trailSpeed : cfg.investigateSpeed) : cfg.checkSpeed;
        if (this.follow(dt, speed)) {
          if (this.state === 'investigate_walk' && this.trailId !== null && this.nextOnTrail()) break;
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
        const sweep = this.sweeping ? (this.lookT / this.lookDur) * Math.PI * 2 : Math.sin(this.lookT * 1.1) * cfg.lookSweepAngle * Math.min(1, this.lookT / 0.6);
        this.yaw += wrap(this.lookBase + sweep - this.yaw) * Math.min(1, dt * (this.sweeping ? 8 : 5));
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
      case 'spin_wind': {
        this.anim = 'spin_wind';
        this.speed += (0 - this.speed) * Math.min(1, dt * 10);
        this.spinT += dt;
        const k = Math.min(1, this.spinT / cfg.spinTelegraph);
        this.masq.lift = k;
        this.ringMaterial.opacity = 0.3 + 0.4 * k * (0.5 + 0.5 * Math.sin(this.spinT * 20));
        if (this.spinT >= cfg.spinTelegraph) {
          this.state = 'spin';
          this.spinT = 0;
          this.onSpinStart?.();
        }
        break;
      }
      case 'spin': {
        this.anim = 'spin_sweep';
        this.speed += (0 - this.speed) * Math.min(1, dt * 10);
        this.spinT += dt;
        this.yaw += ((Math.PI * 2) / cfg.spinSeconds) * dt;
        this.masq.lift = 1;
        this.ringMaterial.opacity = 0.75;
        if (this.spinT >= cfg.spinSeconds) {
          this.endSpin(true);
          this.startPatrol();
        }
        break;
      }
      case 'catch': {
        // the lunge: turn to the player and step in. It does not have to touch; being seen this close is the catch.
        this.anim = 'catch_lunge';
        this.catchT += dt;
        const dx = p.position.x - this.pos.x;
        const dz = p.position.z - this.pos.z;
        const d = Math.hypot(dx, dz);
        this.yaw += wrap(Math.atan2(dx, dz) - this.yaw) * Math.min(1, dt * 14);
        if (this.catchT < cfg.catchLungeSeconds && d > 1) {
          const step = Math.min((cfg.catchLungeDistance / cfg.catchLungeSeconds) * dt, d - 1);
          const to = { x: this.pos.x + (dx / d) * step, z: this.pos.z + (dz / d) * step };
          resolveCollisions(to, cfg.radius - 0.05, this.host.colliders, -5);
          this.pos.x = to.x;
          this.pos.z = to.z;
          this.speed = cfg.catchLungeDistance / cfg.catchLungeSeconds;
        } else this.speed = 0;
        if (this.catchT >= cfg.catchLungeSeconds) {
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

  private get ringMaterial(): THREE.MeshBasicMaterial {
    return this.ring.material as THREE.MeshBasicMaterial;
  }

  /** Counts down to the next spin sweep while it is calmly walking or looking; starts the warning when due. */
  private tickSpin(dt: number): void {
    if (this.state === 'spin_wind' || this.state === 'spin') return;
    const calm = this.state === 'patrol_walk' || this.state === 'patrol_look' || this.state === 'investigate_walk' || this.state === 'investigate_look' || this.state === 'check_walk' || this.state === 'check_look';
    if (!calm || this.suspicion >= this.cfg.leanAt) return;
    this.spinIn -= dt;
    if (this.spinIn > 0) return;
    this.state = 'spin_wind';
    this.spinT = 0;
    this.path = [];
    this.chasing = false;
    this.ring.visible = true;
    this.onSpinTelegraph?.();
  }

  /** Back to normal after a sweep (or when something interrupts it). */
  private endSpin(notify: boolean): void {
    const was = this.state === 'spin_wind' || this.state === 'spin';
    this.masq.lift = 0;
    this.ring.visible = false;
    this.ringMaterial.opacity = 0;
    this.spinT = 0;
    this.spinIn = rand(...this.cfg.spinInterval);
    if (was && notify) this.onSpinEnd?.();
  }

  /** Whether the masquerade is mid-sweep, for the HUD. */
  get spinning(): boolean {
    return this.state === 'spin';
  }
  get spinWarning(): boolean {
    return this.state === 'spin_wind';
  }

  /** The player is inside the cone, visible, and close, but not caught: a near miss (scores points). */
  get nearMiss(): boolean {
    return !this.blind && !this.frustrated && this.state !== 'catch' && this.state !== 'caught' && this.sense.inCone && this.visFrac > 0 && this.sense.dist <= this.cfg.nearMissRange;
  }

  /** Looks for fresh footprints in the cone and heads for the newest one it can see. */
  private scanPrints(dt: number): void {
    const cfg = this.cfg;
    this.printT -= dt;
    if (this.printT > 0) return;
    this.printT = 0.25;
    const prints = this.host.prints?.list();
    if (!prints || !prints.length) return;
    const free = this.state === 'patrol_walk' || this.state === 'patrol_look' || this.state === 'investigate_look' || this.state === 'check_walk' || this.state === 'check_look' || (this.state === 'investigate_walk' && this.trailId === null && !this.chasing);
    if (!free || this.suspicion >= cfg.leanAt) return;
    const half = Math.cos(THREE.MathUtils.degToRad(cfg.visionFovDeg / 2));
    let best: { id: number; x: number; z: number } | null = null;
    for (const pr of prints) {
      if (pr.age > cfg.printNoticeAge || pr.id <= this.trailSeen) continue;
      const dx = pr.x - this.pos.x;
      const dz = pr.z - this.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > cfg.printRange || (d > 0.3 && (Math.sin(this.yaw) * dx + Math.cos(this.yaw) * dz) / d < half)) continue;
      if (this.host.blocked(this.eye, this.tmp.set(pr.x, 0.05, pr.z))) continue;
      if (!best || pr.id > best.id) best = pr;
    }
    if (!best) return;
    this.trailSeen = best.id;
    this.startInvestigate(best.x, best.z, 'footprint', best.id);
  }

  /** At the end of a path on a trail: the next print along it, if there is one close by. Returns true when it set off after it. */
  private nextOnTrail(): boolean {
    const prints = this.host.prints?.list();
    const from = this.trailId ?? 0;
    const next = prints?.find((pr) => pr.id > from && pr.age <= this.cfg.printNoticeAge + 2 && Math.hypot(pr.x - this.pos.x, pr.z - this.pos.z) <= this.cfg.printStep);
    if (!next) {
      this.trailId = null;
      return false;
    }
    this.trailSeen = Math.max(this.trailSeen, next.id);
    this.startInvestigate(next.x, next.z, 'footprint trail', next.id);
    return true;
  }

  /** Suspicion is full but the player is beyond lunge range: run at where they are (or were last seen) until close enough. */
  private chase(dt: number, p: PlayerSense): void {
    this.chasing = true;
    this.chaseT -= dt;
    if (this.state === 'investigate_walk' && this.chaseT > 0) return;
    this.chaseT = this.cfg.chaseRetarget;
    const t = this.visFrac > 0 ? p.position : (this.lastSeen ?? p.position);
    this.startInvestigate(t.x, t.z, 'chase');
  }

  /** Whether a standing player at this point is in the cone and in clear sight right now (no suspicion side effects; for tests and the overlay). */
  canSee(x: number, z: number, maxDistance = this.cfg.visionRange): boolean {
    const dx = x - this.pos.x;
    const dz = z - this.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > maxDistance) return false;
    if (d > 0.2 && (Math.sin(this.yaw) * dx + Math.cos(this.yaw) * dz) / d < Math.cos(THREE.MathUtils.degToRad(this.cfg.visionFovDeg / 2))) return false;
    return this.cfg.sampleHeights.stand.some((h) => !this.host.blocked(this.eye, this.tmp.set(x, h, z)));
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
    const inCone = this.state === 'spin' ? d <= cfg.spinRadius : d <= cfg.visionRange && (d < 0.2 || (Math.sin(this.yaw) * dx + Math.cos(this.yaw) * dz) / d >= Math.cos(THREE.MathUtils.degToRad(cfg.visionFovDeg / 2)));

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
    this.sense = { ...this.sense, inCone, rate, exposure, distFactor, dist: d, canCatch: visible && d <= cfg.catchRange };

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

    // stuck? re-plan; stuck again, or no way there at all: give the goal up and snooze that stop so it is not picked again straight away
    this.stuckT += dt;
    if (this.stuckT > 1.5) {
      if (Math.hypot(this.pos.x - this.stuckFrom.x, this.pos.z - this.stuckFrom.y) < 0.4) {
        this.stuckFails++;
        const t = this.targetPoint;
        if (this.stuckFails >= 2 || !t || !this.goTo(t.x, t.z, this.targetLabel)) {
          this.stuckFails = 0;
          if (this.curStop) this.patrol.snooze(this.curStop);
          if (this.state === 'patrol_walk' || this.state === 'check_walk') this.startPatrol();
          return this.state !== 'patrol_walk' && this.state !== 'check_walk';
        }
      } else this.stuckFails = 0;
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
