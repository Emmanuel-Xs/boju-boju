// One round, as in Meccha Chameleon: a prep phase while the seeker has its eyes covered (hide and paint), then a timed hunt.
//   Survive until the hourglass runs out to win; get caught and the round restarts.
import { audio } from '../audio';

export const ROUND_CONFIG = {
  /** Seconds of prep: the masquerade sings with its eyes covered. */
  prepSeconds: 25,
  /** Seconds the hider has to survive once the hunt starts. */
  huntSeconds: 90,
  /** How long the win / caught banner stays before the next round starts. */
  bannerSeconds: 3,
};

export type Phase = 'prep' | 'hunt' | 'won' | 'lost';

export interface RoundHooks {
  onPhase(phase: Phase): void;
}

export class Round {
  phase: Phase = 'prep';
  /** Seconds left in the current phase. */
  left = ROUND_CONFIG.prepSeconds;
  private chanting = false;

  constructor(
    private hooks: RoundHooks,
    private cfg = ROUND_CONFIG,
  ) {}

  start(): void {
    this.set('prep', this.cfg.prepSeconds);
  }

  private set(phase: Phase, seconds: number): void {
    this.phase = phase;
    this.left = seconds;
    if (phase === 'prep') this.startChant();
    this.hooks.onPhase(phase);
  }

  /** The children's chant plays through prep (intro, then asking until the countdown ends), then the "open" call starts the hunt. */
  startChant(): void {
    if (this.chanting || this.phase !== 'prep' || !audio.unlocked) return;
    this.chanting = true;
    void audio.startChant({ timeoutMs: this.left * 1000 + 4000 }).finally(() => (this.chanting = false));
  }

  update(dt: number): void {
    if (this.phase === 'prep') {
      this.left -= dt;
      if (this.left <= 0) {
        if (audio.unlocked) audio.chantReady();
        this.set('hunt', this.cfg.huntSeconds);
      }
    } else if (this.phase === 'hunt') {
      this.left -= dt;
      if (this.left <= 0) this.set('won', this.cfg.bannerSeconds);
    } else {
      this.left -= dt;
      if (this.left <= 0) this.start();
    }
  }

  /** The seeker caught the hider. */
  caught(): void {
    if (this.phase === 'hunt') this.set('lost', this.cfg.bannerSeconds);
  }
}
