// What the masquerade can and cannot see. The level's colliders are baked into a height field and a walkable grid, and a line of sight is
// walked from every place the masquerade can stand to every place a player can stand. That gives three things:
//   - dead zones: points no walkable cell can see (a hider there could never be found),
//   - corners: concave corners of the walkable floor, the first places a hider runs to,
//   - visibleFrom(): the cells one standing point can see, which the patrol uses to decide where to look next.
// The numbers mirror what the game really does (eye height, range, the 0.3 m ignored in front of a target), but this is a flat approximation
// of the raycasts in LevelProbe, so use it to find problems, not to prove there are none.
import { Nav, type Bounds } from '../nav';
import type { Collider } from './controller';

export const COVERAGE_CONFIG = {
  /** Cell size of the walkable grids (m). */
  cell: 0.5,
  /** Body radii: a player can stand closer to a wall than the masquerade can. */
  playerRadius: 0.3,
  seekerRadius: 0.65,
  eyeHeight: 1.9,
  /** Heights above the feet that count as visible when the ray reaches them (a standing player, then low). */
  targetHeights: [1.1, 0.35],
  /** The same 0.3 m in front of a target that the game's own raycast ignores, so the wall behind a hider does not hide them. */
  endMargin: 0.3,
  /** Furthest the masquerade sees (m). */
  range: 12,
  /** Step along a sight line (m) and the resolution of the height field (m). */
  losStep: 0.2,
  heightCell: 0.25,
  /** A cell seen from this many viewpoints or fewer is "thin": barely ever in view. */
  thin: 3,
  /** `seesFirmly` also needs the view from this far to each side (m). */
  firmMargin: 0.3,
  /** Corner cells closer than this to each other are one corner (cells). */
  cornerMerge: 1,
};

export interface Zone {
  cells: number[];
  /** Area in m². */
  area: number;
  cx: number;
  cz: number;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface PlayerCell {
  x: number;
  z: number;
  ix: number;
  iz: number;
}

export class Coverage {
  readonly player: Nav;
  readonly seeker: Nav;
  readonly cells: PlayerCell[] = [];
  /** Walkable-grid index -> index in `cells`, or -1. */
  private cellAt: Int32Array;
  readonly viewpoints: { x: number; z: number }[] = [];
  /** Seeker-grid cells the masquerade can reach (1) or not (0). */
  reach: Uint8Array;
  private tops: Float32Array;
  private tw: number;
  private th: number;

  constructor(
    colliders: readonly Collider[],
    readonly bounds: Bounds,
    readonly cfg = COVERAGE_CONFIG,
  ) {
    this.player = new Nav(colliders, bounds, cfg.playerRadius, cfg.cell);
    this.seeker = new Nav(colliders, bounds, cfg.seekerRadius, cfg.cell);
    this.reach = new Uint8Array(0);
    this.cellAt = new Int32Array(this.player.w * this.player.h).fill(-1);
    for (let iz = 0; iz < this.player.h; iz++) {
      for (let ix = 0; ix < this.player.w; ix++) {
        if (this.player.isBlockedCell(ix, iz)) continue;
        const c = this.player.centre(ix, iz);
        this.cellAt[iz * this.player.w + ix] = this.cells.length;
        this.cells.push({ ...c, ix, iz });
      }
    }
    // viewpoints: only where the masquerade can actually walk to (one cell may fit in a pocket nothing can path into)
    const main = this.seeker.mainArea();
    for (let iz = 0; iz < this.seeker.h; iz++) for (let ix = 0; ix < this.seeker.w; ix++) if (main[iz * this.seeker.w + ix]) this.viewpoints.push(this.seeker.centre(ix, iz));
    this.reach = main;

    // height field: how tall the tallest thing at each point is
    const hc = cfg.heightCell;
    this.tw = Math.ceil((bounds.maxX - bounds.minX) / hc);
    this.th = Math.ceil((bounds.maxZ - bounds.minZ) / hc);
    this.tops = new Float32Array(this.tw * this.th);
    for (const c of colliders) {
      const [x0, x1, z0, z1] = c.kind === 'box' ? [c.minX, c.maxX, c.minZ, c.maxZ] : [c.x - c.r, c.x + c.r, c.z - c.r, c.z + c.r];
      const ix0 = Math.max(0, Math.floor((x0 - bounds.minX) / hc));
      const ix1 = Math.min(this.tw - 1, Math.floor((x1 - bounds.minX) / hc));
      const iz0 = Math.max(0, Math.floor((z0 - bounds.minZ) / hc));
      const iz1 = Math.min(this.th - 1, Math.floor((z1 - bounds.minZ) / hc));
      for (let iz = iz0; iz <= iz1; iz++) {
        for (let ix = ix0; ix <= ix1; ix++) {
          if (c.kind === 'circle' && Math.hypot(bounds.minX + (ix + 0.5) * hc - c.x, bounds.minZ + (iz + 0.5) * hc - c.z) > c.r) continue;
          const k = iz * this.tw + ix;
          if (c.top > this.tops[k]) this.tops[k] = c.top;
        }
      }
    }
  }

  private topAt(x: number, z: number): number {
    const ix = Math.floor((x - this.bounds.minX) / this.cfg.heightCell);
    const iz = Math.floor((z - this.bounds.minZ) / this.cfg.heightCell);
    if (ix < 0 || iz < 0 || ix >= this.tw || iz >= this.th) return 0;
    return this.tops[iz * this.tw + ix];
  }

  /** True when a standing masquerade at (sx, sz) sees a player standing at (px, pz) on the ground. */
  sees(sx: number, sz: number, px: number, pz: number): boolean {
    const cfg = this.cfg;
    const dx = px - sx;
    const dz = pz - sz;
    const d = Math.hypot(dx, dz);
    if (d > cfg.range) return false;
    const run = d - cfg.endMargin;
    const n = Math.max(1, Math.ceil(Math.max(0, run) / cfg.losStep));
    for (const h of cfg.targetHeights) {
      let clear = true;
      for (let i = 1; i <= n; i++) {
        const t = (Math.min(run, (i * run) / n) / d) || 0;
        if (this.topAt(sx + dx * t, sz + dz * t) > cfg.eyeHeight + (h - cfg.eyeHeight) * t) {
          clear = false;
          break;
        }
      }
      if (clear) return true;
    }
    return false;
  }

  /** True when the masquerade can walk to the cell under (x, z). */
  reachable(x: number, z: number): boolean {
    const ix = this.seeker.ix(x);
    const iz = this.seeker.iz(z);
    return ix >= 0 && iz >= 0 && ix < this.seeker.w && iz < this.seeker.h && this.reach[iz * this.seeker.w + ix] === 1;
  }

  /** Like `sees`, but also from a little to each side, so the masquerade does not have to stand on exactly the right spot (its eye sits ahead of its feet, and it stops near a goal, not on it). */
  seesFirmly(sx: number, sz: number, px: number, pz: number, margin = this.cfg.firmMargin): boolean {
    if (!this.sees(sx, sz, px, pz)) return false;
    let ok = 0;
    for (const [dx, dz] of [[margin, 0], [-margin, 0], [0, margin], [0, -margin]]) if (this.sees(sx + dx, sz + dz, px, pz)) ok++;
    return ok >= 3;
  }

  cellIndex(x: number, z: number): number {
    const ix = this.player.ix(x);
    const iz = this.player.iz(z);
    if (ix < 0 || iz < 0 || ix >= this.player.w || iz >= this.player.h) return -1;
    return this.cellAt[iz * this.player.w + ix];
  }

  /** Indices of the cells seen from a standing point, optionally only inside an arc (facing `yaw`, half-angle `half`, radians). */
  visibleFrom(x: number, z: number, range = this.cfg.range, yaw?: number, half?: number, firm = false): number[] {
    const out: number[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      const c = this.cells[i];
      const d = Math.hypot(c.x - x, c.z - z);
      if (d > range) continue;
      if (yaw !== undefined && half !== undefined && d > 0.6) {
        const a = Math.atan2(c.x - x, c.z - z) - yaw;
        if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) > half) continue;
      }
      if (firm ? this.seesFirmly(x, z, c.x, c.z) : this.sees(x, z, c.x, c.z)) out.push(i);
    }
    return out;
  }

  /** For every player cell, how many viewpoints see it. 0 means a dead zone. */
  viewCounts(stride = 1): Uint16Array {
    const counts = new Uint16Array(this.cells.length);
    const r2 = this.cfg.range ** 2;
    for (let n = 0; n < this.viewpoints.length; n += stride) {
      const v = this.viewpoints[n];
      for (let i = 0; i < this.cells.length; i++) {
        const c = this.cells[i];
        if ((c.x - v.x) ** 2 + (c.z - v.z) ** 2 > r2) continue;
        if (this.sees(v.x, v.z, c.x, c.z)) counts[i]++;
      }
    }
    return counts;
  }

  /** Connected groups (8 neighbours) of the cells for which `pick` is true. */
  private clusters(pick: (i: number) => boolean, merge = 1): Zone[] {
    const seen = new Uint8Array(this.cells.length);
    const zones: Zone[] = [];
    const w = this.player.w;
    for (let i = 0; i < this.cells.length; i++) {
      if (seen[i] || !pick(i)) continue;
      const stack = [i];
      seen[i] = 1;
      const cells: number[] = [];
      while (stack.length) {
        const k = stack.pop()!;
        cells.push(k);
        const c = this.cells[k];
        for (let dz = -merge; dz <= merge; dz++) {
          for (let dx = -merge; dx <= merge; dx++) {
            const nx = c.ix + dx;
            const nz = c.iz + dz;
            if (nx < 0 || nz < 0 || nx >= w || nz >= this.player.h) continue;
            const j = this.cellAt[nz * w + nx];
            if (j < 0 || seen[j] || !pick(j)) continue;
            seen[j] = 1;
            stack.push(j);
          }
        }
      }
      const xs = cells.map((k) => this.cells[k].x);
      const zs = cells.map((k) => this.cells[k].z);
      zones.push({
        cells,
        area: cells.length * this.cfg.cell ** 2,
        cx: xs.reduce((a, b) => a + b, 0) / cells.length,
        cz: zs.reduce((a, b) => a + b, 0) / cells.length,
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minZ: Math.min(...zs),
        maxZ: Math.max(...zs),
      });
    }
    return zones;
  }

  deadZones(counts: Uint16Array): Zone[] {
    return this.clusters((i) => counts[i] === 0).sort((a, b) => b.area - a.area);
  }

  thinZones(counts: Uint16Array): Zone[] {
    return this.clusters((i) => counts[i] > 0 && counts[i] <= this.cfg.thin).sort((a, b) => b.area - a.area);
  }

  /** Concave corners of the walkable floor: cells with a wall or prop right beside them on both axes. */
  corners(): { x: number; z: number; cell: number }[] {
    const blocked = (ix: number, iz: number) => this.player.isBlockedCell(ix, iz);
    const isCorner = (i: number) => {
      const { ix, iz } = this.cells[i];
      return (blocked(ix - 1, iz) || blocked(ix + 1, iz)) && (blocked(ix, iz - 1) || blocked(ix, iz + 1));
    };
    return this.clusters(isCorner, this.cfg.cornerMerge).map((z) => {
      // the cell of the cluster nearest its middle
      let best = z.cells[0];
      let bd = Infinity;
      for (const k of z.cells) {
        const d = (this.cells[k].x - z.cx) ** 2 + (this.cells[k].z - z.cz) ** 2;
        if (d < bd) {
          bd = d;
          best = k;
        }
      }
      return { x: this.cells[best].x, z: this.cells[best].z, cell: best };
    });
  }
}
