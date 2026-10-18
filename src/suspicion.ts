// How alarming a hider is at a given camo score: a piecewise-linear curve read from SEEKER_CONFIG.exposureCurve. No imports, so tests can load it alone.

/** Exposure (0..1) for a camo score (0..100), linear between the [camo, exposure] points, which must be sorted by camo. */
export function exposureFor(camo: number, curve: readonly (readonly [number, number])[]): number {
  const c = Math.min(100, Math.max(0, Number.isFinite(camo) ? camo : 0));
  if (c <= curve[0][0]) return curve[0][1];
  for (let i = 1; i < curve.length; i++) {
    const [x1, y1] = curve[i];
    if (c <= x1) {
      const [x0, y0] = curve[i - 1];
      return y0 + ((y1 - y0) * (c - x0)) / (x1 - x0);
    }
  }
  return curve[curve.length - 1][1];
}
