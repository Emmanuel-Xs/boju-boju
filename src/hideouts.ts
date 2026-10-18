// Where the hider has won before. A spot you win from again and again becomes a "regular": the masquerade goes there first.
// No imports, so tests can load it alone.

export const HIDEOUT_CONFIG = {
  /** Wins within this distance (m) of each other count as the same hiding place. */
  radius: 1.6,
  /** Wins at one place before the masquerade makes it its first stop. */
  winsToHunt: 3,
  /** A win somewhere else takes this much off every other place's count (so a spot you stopped using is forgotten). */
  forget: 0.34,
  /** Most places remembered (the weakest are dropped first). */
  max: 24,
};

export interface Hideout {
  x: number;
  z: number;
  /** Wins here (can be fractional after forgetting). */
  wins: number;
}

export class Hideouts {
  list: Hideout[] = [];
  private cfg: typeof HIDEOUT_CONFIG;

  constructor(cfg: typeof HIDEOUT_CONFIG = HIDEOUT_CONFIG) {
    this.cfg = cfg;
  }

  /** The hider won a round from (x, z). Returns the wins at that place now. */
  won(x: number, z: number): number {
    const c = this.cfg;
    let here: Hideout | null = null;
    let best = c.radius;
    for (const h of this.list) {
      const d = Math.hypot(h.x - x, h.z - z);
      if (d <= best) {
        best = d;
        here = h;
      }
    }
    for (const h of this.list) if (h !== here) h.wins -= c.forget;
    if (here) {
      // the place drifts towards where the wins really are
      here.x += (x - here.x) / (here.wins + 1);
      here.z += (z - here.z) / (here.wins + 1);
      here.wins += 1;
    } else {
      here = { x, z, wins: 1 };
      this.list.push(here);
    }
    this.list = this.list.filter((h) => h.wins > 0);
    if (this.list.length > c.max) {
      this.list.sort((a, b) => b.wins - a.wins);
      this.list.length = c.max;
    }
    return here.wins;
  }

  /** The places the masquerade now goes to first. */
  regulars(): Hideout[] {
    return this.list.filter((h) => h.wins >= this.cfg.winsToHunt - 1e-9);
  }

  /** For storage: only whole, finite numbers worth keeping. */
  toJSON(): [number, number, number][] {
    return this.list.map((h) => [+h.x.toFixed(2), +h.z.toFixed(2), +h.wins.toFixed(2)]);
  }

  /** Reads what `toJSON` wrote, ignoring anything that is not three finite numbers. */
  load(raw: unknown): void {
    this.list = [];
    if (!Array.isArray(raw)) return;
    for (const r of raw) {
      if (!Array.isArray(r) || r.length !== 3 || !r.every((n) => typeof n === 'number' && Number.isFinite(n)) || r[2] <= 0) continue;
      this.list.push({ x: r[0], z: r[1], wins: Math.min(99, r[2]) });
    }
    this.list.length = Math.min(this.list.length, this.cfg.max);
  }
}
