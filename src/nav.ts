// The seeker's walkable grid: baked from the level colliders at `cell` metres, obstacles grown by the body radius, A* over 8 neighbours,
// then the path is string-pulled and rounded so the masquerade does not walk in zig-zags.
import type { Collider } from './levels/controller';

export interface Bounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/** A walkable grid baked from the level colliders, with A* over it. Cells are `cell` metres wide; obstacles are grown by the body's radius. */
export class Nav {
  readonly w: number;
  readonly h: number;
  private blocked: Uint8Array;

  constructor(
    colliders: readonly Collider[],
    readonly bounds: Bounds,
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

  ix(x: number) {
    return Math.floor((x - this.bounds.minX) / this.cell);
  }
  iz(z: number) {
    return Math.floor((z - this.bounds.minZ) / this.cell);
  }
  isBlockedCell(ix: number, iz: number) {
    return ix < 0 || iz < 0 || ix >= this.w || iz >= this.h || this.blocked[iz * this.w + ix] === 1;
  }
  /** 1 for every free cell in the biggest connected area of the grid (where the body can actually walk to), 0 elsewhere. */
  mainArea(): Uint8Array {
    const label = new Int32Array(this.w * this.h).fill(-1);
    let best = -1;
    let bestSize = 0;
    let next = 0;
    for (let start = 0; start < label.length; start++) {
      if (label[start] !== -1 || this.blocked[start]) continue;
      const id = next++;
      let size = 0;
      const stack = [start];
      label[start] = id;
      while (stack.length) {
        const n = stack.pop()!;
        size++;
        const nx = n % this.w;
        const nz = Math.floor(n / this.w);
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dz) continue;
            const mx = nx + dx;
            const mz = nz + dz;
            if (this.isBlockedCell(mx, mz)) continue;
            if (dx && dz && (this.isBlockedCell(nx + dx, nz) || this.isBlockedCell(nx, nz + dz))) continue;
            const m = mz * this.w + mx;
            if (label[m] !== -1) continue;
            label[m] = id;
            stack.push(m);
          }
        }
      }
      if (size > bestSize) {
        bestSize = size;
        best = id;
      }
    }
    return Uint8Array.from(label, (l) => (l === best ? 1 : 0));
  }

  /** Centre of a cell in world metres. */
  centre(ix: number, iz: number): { x: number; z: number } {
    return { x: this.bounds.minX + (ix + 0.5) * this.cell, z: this.bounds.minZ + (iz + 0.5) * this.cell };
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
  path(from: { x: number; z: number }, to: { x: number; z: number }, round = 0): { x: number; z: number }[] | null {
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
    return round > 0 ? this.rounded([{ x: s.x, z: s.z }, ...out], round).slice(1) : out;
  }

  /** Cuts each corner of a path: the waypoint is replaced by two points `round` metres either side of it, when that stays clear of obstacles. */
  private rounded(pts: { x: number; z: number }[], round: number): { x: number; z: number }[] {
    if (pts.length < 3) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const c = pts[i + 1];
      const la = Math.hypot(a.x - b.x, a.z - b.z);
      const lc = Math.hypot(c.x - b.x, c.z - b.z);
      const r = Math.min(round, la / 2, lc / 2);
      if (r < 0.2) {
        out.push(b);
        continue;
      }
      const p = { x: b.x + ((a.x - b.x) / la) * r, z: b.z + ((a.z - b.z) / la) * r };
      const q = { x: b.x + ((c.x - b.x) / lc) * r, z: b.z + ((c.z - b.z) / lc) * r };
      if (this.free(p.x, p.z) && this.free(q.x, q.z) && this.lineClear(p, q)) out.push(p, q);
      else out.push(b);
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
}
