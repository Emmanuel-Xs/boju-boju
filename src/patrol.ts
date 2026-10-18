// Where the masquerade looks next. It keeps an "age" for every floor cell a player could stand on (seconds since it last looked there)
// and heads for whichever stop would refresh the most stale floor per second of walking. Corners and hiding spots are all stops, so
// nowhere stays safe: whatever it has not looked at for longest is what it walks to next.
import { Coverage } from './levels/coverage';
import type { SpotInfo } from './seeker';

export const PATROL_CONFIG = {
  /** How far a look reaches from a stop (m): the catch range, because a look from further away rarely finds a camouflaged player. */
  lookRange: 6,
  /** A look at a hiding spot covers this much each side of the spot's direction (rad). */
  spotArc: 1.5,
  /** Age (s) every cell starts a run with, and the most age that counts towards a stop's score. */
  startAge: 45,
  ageCap: 240,
  /** A cell counts as age^power, so a corner nobody has looked at for ages outweighs a big area that went a little stale. */
  agePower: 2,
  /** Random scaling of a stop's score, so the route is not the same twice (0.3 = plus or minus 30%). */
  jitter: 0.3,
  /** If any cell has gone this long (s) unlooked-at, the next stop is one that sees it, whatever the scores say. */
  forceAge: 80,
  /** Seconds a look at a stop is assumed to take, for scoring. */
  assumedLook: 2.5,
  /** Walking speed assumed for scoring (m/s). */
  assumedSpeed: 3.4,
  /** Where a hiding spot is looked at from when the usual place to stand is no good: as near this as it can (m). */
  spotStandOff: 2,
  /** A corner's viewing stop stands this far from it (m), nearest first. */
  cornerView: [2.5, 5] as [number, number],
  /** Corner stops closer than this to an existing stop are skipped (m). */
  mergeDistance: 2,
  /** Extra stops added until every walkable cell is seen from somewhere, at most. */
  coverRounds: 40,
  /** A look at a hiding spot does not count the floor this close to the masquerade (m). */
  pointBlank: 1.3,
  /** A stop the masquerade got stuck on is left alone this long (s). */
  snoozeSeconds: 45,
  /** Seconds of the 360 degree turn at a corner or coverage stop. */
  sweepSeconds: 2.4,
  /** A cell refreshed this recently needs no more attention; one looked at from afar counts for this share of a close look. */
  farShare: 0.6,
};

export interface Stop {
  id: string;
  kind: 'spot' | 'corner' | 'cover';
  x: number;
  z: number;
  /** What the seeker turns to face at a spot stop. */
  lookAt: { x: number; z: number } | null;
  /** Floor cells this stop refreshes. */
  cells: Int32Array;
}

export class Patrol {
  readonly stops: Stop[] = [];
  /** Seconds since each floor cell was last looked at. */
  readonly age: Float32Array;
  /** Added to a cell's age when scoring: places where the player was caught or suspected earlier (the seeker's memory). */
  readonly interest: Float32Array;
  private last: Stop | null = null;
  private clock = 0;
  /** Stops the masquerade could not get to just now, and the time they come back. */
  private snoozed = new Map<Stop, number>();

  constructor(
    readonly cov: Coverage,
    spots: readonly SpotInfo[],
    standPoint: (s: SpotInfo) => { x: number; z: number },
    readonly cfg = PATROL_CONFIG,
  ) {
    this.age = new Float32Array(cov.cells.length).fill(cfg.startAge);
    this.interest = new Float32Array(cov.cells.length);
    const nav = cov.seeker;

    for (const s of spots) {
      // where a hider would stand at this spot, and a place the masquerade can stand that really sees them there
      const hider = cov.player.nearestFree(s.position.x - s.facing.x * 0.45, s.position.z - s.facing.z * 0.45, 4) ?? { x: s.position.x, z: s.position.z };
      const want = standPoint(s);
      let sp = nav.nearestFree(want.x, want.z, 6);
      const good = (p: { x: number; z: number } | null) => !!p && cov.reachable(p.x, p.z) && Math.hypot(p.x - hider.x, p.z - hider.z) <= cfg.lookRange - 0.5 && cov.seesFirmly(p.x, p.z, hider.x, hider.z);
      if (!good(sp)) sp = this.viewing(hider.x, hider.z, [1.2, cfg.lookRange - 1], cfg.spotStandOff);
      if (!sp) {
        this.blind.push(s.id);
        continue;
      }
      const yaw = Math.atan2(hider.x - sp.x, hider.z - sp.z);
      this.add({ id: `spot ${s.id}`, kind: 'spot', x: sp.x, z: sp.z, lookAt: { x: s.position.x, z: s.position.z }, cells: Int32Array.from(cov.visibleFrom(sp.x, sp.z, cfg.lookRange, yaw, cfg.spotArc, true)) });
    }

    // a stop for every corner of the floor: somewhere 2.5 to 5 m away with a clear view into it
    for (const c of cov.corners()) {
      if (this.stops.some((st) => Math.hypot(st.x - c.x, st.z - c.z) < cfg.mergeDistance)) continue;
      const v = this.viewing(c.x, c.z);
      if (!v || this.stops.some((st) => Math.hypot(st.x - v.x, st.z - v.z) < cfg.mergeDistance)) continue;
      this.add({ id: `corner ${c.x.toFixed(1)},${c.z.toFixed(1)}`, kind: 'corner', x: v.x, z: v.z, lookAt: null, cells: Int32Array.from(cov.visibleFrom(v.x, v.z, cfg.lookRange, undefined, undefined, true)) });
    }

    // whatever still is not seen from any stop gets one more
    const skip = new Set<number>();
    for (let round = 0; round < cfg.coverRounds; round++) {
      const seen = new Uint8Array(cov.cells.length);
      for (const st of this.stops) for (const i of st.cells) seen[i] = 1;
      const missing = seen.findIndex((v, i) => !v && !skip.has(i));
      if (missing < 0) break;
      const m = cov.cells[missing];
      const v = this.viewing(m.x, m.z) ?? this.viewing(m.x, m.z, [1, cfg.lookRange - 0.5]);
      if (!v) {
        skip.add(missing); // nowhere to look at it from: a dead zone, reported by the coverage analysis
        this.unreachable.push(missing);
        continue;
      }
      this.add({ id: `cover ${v.x.toFixed(1)},${v.z.toFixed(1)}`, kind: 'cover', x: v.x, z: v.z, lookAt: null, cells: Int32Array.from(cov.visibleFrom(v.x, v.z, cfg.lookRange, undefined, undefined, true)) });
    }
  }

  /** Hiding spots no reachable cell can see (should be none). */
  readonly blind: string[] = [];

  /** Cells no stop can see (should be none). */
  readonly unreachable: number[] = [];

  private add(stop: Stop): void {
    if (stop.kind === 'spot') {
      // a look aimed at a spot does not see what is at the masquerade's own feet: those cells are left to the all-round looks
      const near = this.cfg.pointBlank ** 2;
      stop.cells = stop.cells.filter((i) => (this.cov.cells[i].x - stop.x) ** 2 + (this.cov.cells[i].z - stop.z) ** 2 >= near);
    }
    if (stop.cells.length > 0) this.stops.push(stop);
  }

  /** A walkable cell for the seeker with a clear view of (x, z), at a distance inside `range`, nearest to the middle of the range. */
  private viewing(x: number, z: number, range = this.cfg.cornerView, prefer = (range[0] + range[1]) / 2): { x: number; z: number } | null {
    let best: { x: number; z: number } | null = null;
    let bd = Infinity;
    const mid = prefer;
    for (const v of this.cov.viewpoints) {
      const d = Math.hypot(v.x - x, v.z - z);
      if (d < range[0] || d > range[1]) continue;
      const score = Math.abs(d - mid);
      if (score >= bd) continue;
      if (!this.cov.seesFirmly(v.x, v.z, x, z)) continue;
      bd = score;
      best = v;
    }
    return best;
  }

  /** Time passes: everything gets staler. */
  tick(dt: number): void {
    this.clock += dt;
    const cap = this.cfg.ageCap;
    for (let i = 0; i < this.age.length; i++) if (this.age[i] < cap) this.age[i] += dt;
  }

  /** The masquerade got stuck on the way to this stop: leave it alone for a while. */
  snooze(stop: Stop, seconds = this.cfg.snoozeSeconds): void {
    this.snoozed.set(stop, this.clock + seconds);
  }

  private isSnoozed(st: Stop): boolean {
    const until = this.snoozed.get(st);
    if (until === undefined) return false;
    if (this.clock >= until) {
      this.snoozed.delete(st);
      return false;
    }
    return true;
  }

  /** The seeker looked at a stop. */
  visited(stop: Stop): void {
    for (const i of stop.cells) this.age[i] = 0;
    this.last = stop;
  }

  /** The floor was looked at from somewhere that is not a stop (the cheat peek, a noise check). */
  looked(cells: ArrayLike<number>): void {
    for (let i = 0; i < cells.length; i++) this.age[cells[i]] = 0;
  }

  /** Forget everything (a new run): all of it is stale again. */
  reset(): void {
    this.snoozed.clear();
    this.age.fill(this.cfg.startAge);
    this.last = null;
  }

  /** The stop worth the most staleness per second of getting there, with a little randomness. */
  next(fromX: number, fromZ: number, avoid?: ReadonlySet<Stop>): Stop {
    const c = this.cfg;
    let best = this.stops[0];
    let bs = -Infinity;
    // something forgotten for too long beats any score: the nearest stop that sees the stalest cell
    let oldest = -1;
    let oldestAge = c.forceAge;
    for (let i = 0; i < this.age.length; i++) {
      if (this.age[i] > oldestAge) {
        oldestAge = this.age[i];
        oldest = i;
      }
    }
    if (oldest >= 0) {
      let nearest: Stop | null = null;
      let nd = Infinity;
      for (const st of this.stops) {
        if (avoid?.has(st) || this.isSnoozed(st) || !st.cells.includes(oldest)) continue;
        const d = Math.hypot(st.x - fromX, st.z - fromZ);
        if (d < nd) {
          nd = d;
          nearest = st;
        }
      }
      if (nearest) return nearest;
    }
    for (const st of this.stops) {
      if ((st === this.last && this.stops.length > 1) || avoid?.has(st) || this.isSnoozed(st)) continue;
      let gain = 0;
      for (const i of st.cells) gain += Math.min(c.ageCap, this.age[i] + this.interest[i]) ** c.agePower;
      const travel = Math.hypot(st.x - fromX, st.z - fromZ) / c.assumedSpeed + c.assumedLook;
      const score = (gain / travel) * (1 + (Math.random() * 2 - 1) * c.jitter);
      if (score > bs) {
        bs = score;
        best = st;
      }
    }
    return best;
  }

  /** Share of floor cells looked at within the last `seconds` (for tests and the debug overlay). */
  freshShare(seconds: number): number {
    let n = 0;
    for (const a of this.age) if (a <= seconds) n++;
    return n / this.age.length;
  }
}
