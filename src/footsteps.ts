// Footsteps for the player and the masquerade. A step sounds every `stride` metres walked, so fast feet make fast steps.
// The masquerade's steps are placed in the world and heavier; hearing them coming is part of the game.
import { audio, type ClipName } from './audio';
import { onDirt } from './levels/ground';

export const FOOTSTEP_CONFIG = {
  /** Metres between steps. */
  strideWalk: 0.85,
  strideRun: 1.25,
  /** Slower than this is standing still. */
  minSpeed: 0.5,
  player: { volume: 0.3, runVolume: 0.42, rateJitter: 0.08 },
  seeker: { volume: 0.75, rate: 0.78, rateJitter: 0.05, refDistance: 3, maxDistance: 26, rolloff: 1.4 },
  /** What the masquerade's costume adds to each step: cloth swish and raffia every step, ankle bells on most, a shekere rattle on some (volumes are per clip, they were recorded at very different levels). */
  costume: { swish: 1.2, raffia: 0.5, bells: 0.28, bellsChance: 0.8, rattleChance: 0.3, rattle: [0.2, 0.45] as [number, number] },
  /** How many recorded variations each surface has. */
  variations: 5,
};

const pad = (n: number) => String(n).padStart(2, '0');

const surfaceAt = (x: number, z: number): 'concrete' | 'sand' => (onDirt(x, z) ? 'sand' : 'concrete');

export class Stepper {
  private walked = 0;
  private last = -1;
  constructor(
    private who: 'player' | 'seeker',
    /** Called on every step the player takes (where, and whether running). */
    private onStep?: (x: number, z: number, run: boolean) => void,
    /** Pitch multiplier (a smaller figure steps higher). */
    private pitch = 1,
  ) {}

  /** Advance by `dt` seconds at `speed` m/s. */
  advance(dt: number, x: number, z: number, speed: number, grounded = true): void {
    const c = FOOTSTEP_CONFIG;
    if (speed < c.minSpeed || !grounded) {
      this.walked = 0;
      return;
    }
    const run = speed > 3.6;
    this.walked += speed * dt;
    if (this.walked < (run ? c.strideRun : c.strideWalk)) return;
    this.walked = 0;
    let n = Math.floor(Math.random() * c.variations);
    if (n === this.last) n = (n + 1) % c.variations; // never the same recording twice in a row
    this.last = n;
    const clip = `sfx_step_${surfaceAt(x, z)}_${pad(n + 1)}` as ClipName;
    this.onStep?.(x, z, run);
    if (this.who === 'player') {
      void audio.playOnce(clip, { volume: run ? c.player.runVolume : c.player.volume, rate: 1 + (Math.random() * 2 - 1) * c.player.rateJitter });
    } else {
      const s = c.seeker;
      const at = { position: { x, y: 1, z }, refDistance: s.refDistance, maxDistance: s.maxDistance, rolloff: s.rolloff };
      void audio.playOnce('sfx_cloth_swish_01', { volume: c.costume.swish, rate: 0.9 + Math.random() * 0.2, spatial: at });
      void audio.playOnce(Math.random() < 0.5 ? 'sfx_raffia_01' : 'sfx_raffia_02', { volume: c.costume.raffia, rate: 0.9 + Math.random() * 0.2, spatial: at });
      if (Math.random() < c.costume.bellsChance) void audio.playOnce(Math.random() < 0.5 ? 'sfx_bells_01' : 'sfx_bells_02', { volume: c.costume.bells, rate: 0.9 + Math.random() * 0.25, spatial: at });
      if (Math.random() < c.costume.rattleChance) {
        const which = Math.random() < 0.5 ? 0 : 1;
        void audio.playOnce(which === 0 ? 'sfx_egungun_rattle_01' : 'sfx_egungun_rattle_02', { volume: c.costume.rattle[which], rate: 0.95 + Math.random() * 0.1, spatial: at });
      }
      void audio.playOnce(clip, {
        volume: s.volume,
        rate: (s.rate + (Math.random() * 2 - 1) * s.rateJitter) * this.pitch,
        spatial: { position: { x, y: 0.1, z }, refDistance: s.refDistance, maxDistance: s.maxDistance, rolloff: s.rolloff },
      });
    }
  }
}
