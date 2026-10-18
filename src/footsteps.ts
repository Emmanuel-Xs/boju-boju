// Footsteps for the player and the masquerade. A step sounds every `stride` metres walked, so fast feet make fast steps.
// The masquerade's steps are placed in the world and heavier; hearing them coming is part of the game.
import { audio, type ClipName } from './audio';

export const FOOTSTEP_CONFIG = {
  /** Metres between steps. */
  strideWalk: 0.85,
  strideRun: 1.25,
  /** Slower than this is standing still. */
  minSpeed: 0.5,
  player: { volume: 0.3, runVolume: 0.42, rateJitter: 0.08 },
  seeker: { volume: 0.75, rate: 0.78, rateJitter: 0.05, refDistance: 3, maxDistance: 26, rolloff: 1.4 },
  /** The bare-dirt patch and everything outside the yard sounds like sand; the yard floor and verandas like concrete. */
  yard: { halfX: 15, halfZ: 9 },
  dirt: { x: 12.2, z: 0, halfX: 2.5, halfZ: 3.5 },
  /** How many recorded variations each surface has. */
  variations: 5,
};

const pad = (n: number) => String(n).padStart(2, '0');

function surfaceAt(x: number, z: number): 'concrete' | 'sand' {
  const c = FOOTSTEP_CONFIG;
  if (Math.abs(x) > c.yard.halfX || Math.abs(z) > c.yard.halfZ) return 'sand';
  if (Math.abs(x - c.dirt.x) < c.dirt.halfX && Math.abs(z - c.dirt.z) < c.dirt.halfZ) return 'sand';
  return 'concrete';
}

export class Stepper {
  private walked = 0;
  private last = -1;
  constructor(private who: 'player' | 'seeker') {}

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
    if (this.who === 'player') {
      void audio.playOnce(clip, { volume: run ? c.player.runVolume : c.player.volume, rate: 1 + (Math.random() * 2 - 1) * c.player.rateJitter });
    } else {
      const s = c.seeker;
      void audio.playOnce(clip, {
        volume: s.volume,
        rate: s.rate + (Math.random() * 2 - 1) * s.rateJitter,
        spatial: { position: { x, y: 0.1, z }, refDistance: s.refDistance, maxDistance: s.maxDistance, rolloff: s.rolloff },
      });
    }
  }
}
