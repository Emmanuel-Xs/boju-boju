// Auto quality: measure the frame rate over the first seconds of a hunt and, if the device cannot keep up, step the quality down one tier
// at a time (each step is measured again): low shadows, then pixel ratio 1, then no dust motes. The chosen tier is logged. It is measured fresh every session,
// so one slow moment never leaves a good device on low quality for good.
export const QUALITY_CONFIG = {
  /** Frames per second the game wants to hold. */
  targetFps: 45,
  /** Length of each measuring window (seconds of real, unpaused play). */
  windowSeconds: 5,
  /** A window with fewer frames than this is ignored (the tab was throttled). */
  minFrames: 3,
  /** Frames longer than this (a tab switch, a hiccup) do not count towards the window. */
  maxFrameSeconds: 2,
};

export const TIER_NAMES = ['full', 'low shadows', 'low shadows + pixel ratio 1', 'low shadows + pixel ratio 1 + no dust'] as const;
export type Tier = 0 | 1 | 2 | 3;

export class AutoQuality {
  tier: Tier = 0;
  /** Measured fps of the last window (for the ?perf=1 readout). */
  lastFps = 0;
  private time = 0;
  private frames = 0;
  private measuring = false;
  private settled = false;

  constructor(
    private apply: (tier: Tier) => void,
    private cfg = QUALITY_CONFIG,
  ) {
  }

  /** Start (or restart) measuring: call when a hunt begins. Does nothing once the tier has settled. */
  begin(): void {
    if (this.settled) return;
    this.measuring = true;
    this.time = 0;
    this.frames = 0;
  }

  /** Pause measuring (the game is paused or not in a hunt). */
  stop(): void {
    this.measuring = false;
  }

  /** Call every frame with the real frame time while a hunt is running. */
  frame(rawDt: number): void {
    if (!this.measuring) return;
    if (rawDt > this.cfg.maxFrameSeconds) return;
    this.time += rawDt;
    this.frames++;
    if (this.time < this.cfg.windowSeconds) return;
    const fps = this.frames / this.time;
    this.lastFps = fps;
    const ok = this.frames >= this.cfg.minFrames;
    this.time = 0;
    this.frames = 0;
    if (!ok) return;
    if (fps >= this.cfg.targetFps || this.tier >= 3) {
      this.settled = true;
      this.measuring = false;
      console.info(`[quality] ${fps.toFixed(1)} fps over ${this.cfg.windowSeconds} s: keeping tier ${this.tier} (${TIER_NAMES[this.tier]})`);
      return;
    }
    this.tier = (this.tier + 1) as Tier;
    console.info(`[quality] ${fps.toFixed(1)} fps is under ${this.cfg.targetFps}: dropping to tier ${this.tier} (${TIER_NAMES[this.tier]}), measuring again`);
    this.apply(this.tier);
  }
}
