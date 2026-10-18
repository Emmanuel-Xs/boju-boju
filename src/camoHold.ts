// The camo stat sent to start.ng: the best camo score the hider *held* for a stretch of continuous seconds, never a one-frame spike.
// Fed once per frame during a hunt. A new hunt starts a new window, so a hold never straddles two rounds.
// No imports, so tests can load it alone.

export class CamoHold {
  /** Best score held for `holdSeconds` in a row, as a whole number 0..100, across every hunt since the last `reset`. */
  best = 0;
  private t = 0;
  /** Monotonic queue of [time, score] with scores falling, so the front is the lowest score in the last `holdSeconds`. */
  private q: [number, number][] = [];

  private holdSeconds: number;

  constructor(holdSeconds = 3) {
    this.holdSeconds = holdSeconds;
  }

  /** A hunt begins: forget the window (the best so far is kept). */
  beginHunt(): void {
    this.t = 0;
    this.q = [];
  }

  /** The whole run starts again. */
  reset(): void {
    this.best = 0;
    this.beginHunt();
  }

  /** One frame of a hunt: `camo` is the score the masquerade is seeing right now. */
  add(camo: number, dt: number): void {
    const v = Math.min(100, Math.max(0, Number.isFinite(camo) ? camo : 0));
    this.t += dt;
    while (this.q.length && this.q[this.q.length - 1][1] >= v) this.q.pop();
    this.q.push([this.t, v]);
    const from = this.t - this.holdSeconds;
    while (this.q[0][0] <= from) this.q.shift();
    // a full window needs `holdSeconds` of hunt behind it; the queue front is then the lowest score in that window
    if (this.t + 1e-9 >= this.holdSeconds) this.best = Math.max(this.best, Math.floor(this.q[0][1] + 1e-9));
  }
}
