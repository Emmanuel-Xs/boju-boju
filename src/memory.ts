// The masquerade's memory: a heat map of the floor where it caught or suspected someone, kept in localStorage between runs and visits.
// The patrol adds the heat to how stale a cell is, so the places it has found people before are checked first.
// Storage may be blocked (private mode), so every read and write is in try/catch and the game works without it.
import type { Coverage } from './levels/coverage';

export const MEMORY_CONFIG = {
  storageKey: 'boju.seekerMemory.v1',
  /** Heat added where it suspected someone (it leaned in) and where it caught someone. */
  suspectedHeat: 0.6,
  caughtHeat: 1.5,
  /** The heat spreads to cells this close (m), fading with distance. */
  spread: 1.8,
  /** The most heat a cell can hold. */
  maxHeat: 3,
  /** Every new round all heat is multiplied by this, so old habits fade. */
  roundDecay: 0.93,
  /** Heat below this is forgotten (and not stored). */
  forget: 0.04,
  /** Seconds of "staleness" one unit of heat is worth when the patrol picks its next stop. */
  weightSeconds: 150,
  /** At the start of a round, if some floor is hotter than this, it heads there first this often (0..1). */
  hotFirst: 1,
  firstChance: 0.6,
};

interface Saved {
  /** The grid this was saved for: if the level changes, the memory is dropped. */
  sig: string;
  cells: [number, number, number][];
}

export class SeekerMemory {
  readonly heat: Float32Array;
  private sig: string;

  constructor(
    private cov: Coverage,
    private cfg = MEMORY_CONFIG,
  ) {
    this.heat = new Float32Array(cov.cells.length);
    this.sig = `${cov.cells.length}:${cov.player.w}x${cov.player.h}`;
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(this.cfg.storageKey);
      if (!raw) return;
      const s = JSON.parse(raw) as Saved;
      if (s.sig !== this.sig || !Array.isArray(s.cells)) return;
      const w = this.cov.player.w;
      for (const [ix, iz, h] of s.cells) {
        const k = this.cov.cellIndex(this.cov.player.centre(ix, iz).x, this.cov.player.centre(ix, iz).z);
        if (k >= 0 && ix < w && Number.isFinite(h)) this.heat[k] = Math.min(this.cfg.maxHeat, Math.max(0, h));
      }
    } catch {
      /* storage blocked or corrupt: start with a clean memory */
    }
  }

  save(): void {
    try {
      const cells: [number, number, number][] = [];
      this.cov.cells.forEach((c, i) => {
        if (this.heat[i] >= this.cfg.forget) cells.push([c.ix, c.iz, +this.heat[i].toFixed(2)]);
      });
      localStorage.setItem(this.cfg.storageKey, JSON.stringify({ sig: this.sig, cells } satisfies Saved));
    } catch {
      /* private mode: it just will not remember next time */
    }
  }

  /** Remember a place: `amount` of heat at (x, z), spread over the cells around it. */
  note(x: number, z: number, amount: number): void {
    const c = this.cfg;
    for (let i = 0; i < this.cov.cells.length; i++) {
      const cell = this.cov.cells[i];
      const d = Math.hypot(cell.x - x, cell.z - z);
      if (d > c.spread) continue;
      this.heat[i] = Math.min(c.maxHeat, this.heat[i] + amount * (1 - d / c.spread));
    }
  }

  /** A round passed: old heat fades. */
  decay(): void {
    for (let i = 0; i < this.heat.length; i++) {
      this.heat[i] *= this.cfg.roundDecay;
      if (this.heat[i] < this.cfg.forget) this.heat[i] = 0;
    }
  }

  clear(): void {
    this.heat.fill(0);
    this.save();
  }

  /** Total heat, for tests and the debug panel. */
  total(): number {
    let t = 0;
    for (const h of this.heat) t += h;
    return t;
  }
}
