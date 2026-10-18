// A run is a survival streak: round 1 is easy, and every cleared round sharpens the masquerade, within limits. Getting caught ends the run.
// Every tunable number for the run lives in RUN_CONFIG.
import type { SEEKER_CONFIG } from './seeker';

type SeekerNumbers = Pick<typeof SEEKER_CONFIG, 'visionFovDeg' | 'visionRange' | 'rateMax' | 'cheatInterval' | 'cheatCandidates' | 'patrolSpeed' | 'investigateSpeed' | 'checkSpeed' | 'lostDecay'>;

/** How a seeker number grows with the round: `start` in round 1, `perRound` added after each cleared round, never past `limit`. */
interface Ramp {
  start: number;
  perRound: number;
  limit: number;
}

export const RUN_CONFIG = {
  /** Seconds of prep: the masquerade has its eyes covered while the children's chant plays. */
  prepSeconds: 25,
  /** Seconds the hider must survive to clear a round. */
  huntSeconds: 90,
  /**
   * The masquerade remembers where you win. A round counts as won "from a spot" if you stayed within `stillRadius` m of it for the last
   * `stillSeconds` before the round ended (running home does not count). The third win at one place makes it a regular (see hideouts.ts).
   */
  regulars: { stillSeconds: 12, stillRadius: 2.5 },
  /** The camo stat only counts a score the hider kept for this many seconds without dropping below it. */
  camoHoldSeconds: 3,
  /** After the seeker is told "ready" (button or timer), the chant needs this long at most to reach the hunt before we start it anyway. */
  chantTimeoutSeconds: 8,
  /** The celebration after a cleared round, before the next prep. */
  clearedSeconds: 3.4,
  /** Slow motion when caught: how long (real seconds) and how slow. */
  slowMoSeconds: 1,
  slowMoScale: 0.25,
  /** Ending the prep early with Ready is worth this many points per second left. */
  readyBonusPerSecond: 2,
  /**
   * Score = survival + near misses + the Ready bonus (above) + run home + camo. Points per second are for time spent in the hunt.
   * A popup shows each one as it happens; the ones that tick every frame are grouped into a popup every `popupEvery` seconds.
   */
  score: {
    survivalPerSecond: 2,
    /** Inside the cone, visible, and not caught (see SEEKER_CONFIG.nearMissRange). */
    nearMissPerSecond: 8,
    /** Touching the gate when the masquerade is far away ends the round early. */
    runHomeBonus: 250,
    runHomeBonusPerSecondLeft: 2,
    /** At the end of a cleared round: the round's average camo (0..100) times this. */
    camoBonusPerPoint: 2,
    popupEvery: { survival: 5, nearMiss: 1 },
  },
  runHome: {
    /** The gate works once the masquerade is further than this from it (m). */
    seekerDistance: 12,
    /** The player touches the gate by getting past this x, inside the opening. */
    reachX: 13.9,
  },
  /**
   * Round 1 teaches. New players were being caught before they learned to paint, so for rounds up to `rounds` the masquerade is gentler
   * and short hints say what to do. Round 2 onward is the plain ramp below.
   */
  teaching: {
    rounds: 1,
    /** Multiplier on every speed (walking, investigating, checking, closing in, following prints). */
    speedMul: 0.75,
    /** Multiplier on how fast suspicion rises. */
    rateMul: 0.85,
    /** No spin sweep while teaching. */
    spin: false,
    /** Seconds into prep before the first hint, and between repeats while the hider still has not done it. */
    hintDelay: 1.5,
    hintRepeat: 12,
    /** Most times one hint is shown in a round. */
    hintMax: 3,
  },
  /** How the masquerade sharpens (wider cone, faster suspicion, more peeks), round by round. All stay below what a running player can beat. */
  ramps: {
    visionFovDeg: { start: 52, perRound: 4, limit: 90 },
    visionRange: { start: 9, perRound: 0.6, limit: 13 },
    rateMax: { start: 0.65, perRound: 0.12, limit: 1.5 },
    cheatInterval: { start: 24, perRound: -2.5, limit: 9 },
    cheatCandidates: { start: 2, perRound: 0.5, limit: 4 },
    patrolSpeed: { start: 3, perRound: 0.1, limit: 4 },
    investigateSpeed: { start: 3.4, perRound: 0.1, limit: 4.3 },
    checkSpeed: { start: 3.2, perRound: 0.1, limit: 4.1 },
    lostDecay: { start: 0.1, perRound: -0.01, limit: 0.04 },
  } as Record<keyof SeekerNumbers, Ramp>,
};

/** The seeker numbers for a round (1 = easiest). */
export function difficultyFor(round: number, cfg = RUN_CONFIG): SeekerNumbers {
  const out = {} as Record<string, number>;
  for (const [key, r] of Object.entries(cfg.ramps)) {
    const v = r.start + r.perRound * (round - 1);
    out[key] = r.perRound >= 0 ? Math.min(r.limit, v) : Math.max(r.limit, v);
  }
  out.cheatCandidates = Math.floor(out.cheatCandidates);
  return out as unknown as SeekerNumbers;
}

export interface ScoreParts {
  survival: number;
  nearMiss: number;
  ready: number;
  runHome: number;
  camo: number;
}

export interface RunStats {
  /** Rounds cleared. */
  rounds: number;
  /** Seconds spent in hunts (shown on the results screen; not sent to start.ng). */
  hiddenSeconds: number;
  /** Best camo score held for `camoHoldSeconds` in a row during any hunt of the run: a whole number, 0 to 100. */
  bestCamo: number;
  /** The ranked number: the sum of `parts`. */
  score: number;
  parts: ScoreParts;
  /** Rounds ended by running home. */
  ranHome: number;
}

export const newStats = (): RunStats => ({ rounds: 0, hiddenSeconds: 0, bestCamo: 0, score: 0, parts: { survival: 0, nearMiss: 0, ready: 0, runHome: 0, camo: 0 }, ranHome: 0 });

/** Adds points to one part of the score and to the total. */
export function award(s: RunStats, part: keyof ScoreParts, points: number): void {
  s.parts[part] += points;
  s.score += points;
}

/** Playful, respectful one-liners for the results screen. The first whose test passes is used. */
export const VERDICTS: { when: (s: RunStats) => boolean; line: string }[] = [
  { when: (s) => s.rounds === 0 && s.hiddenSeconds < 8, line: 'Chai! Caught before the chant finished its second line. The masquerade did not even have to look twice.' },
  { when: (s) => s.rounds === 0 && s.bestCamo < 25, line: 'You hid like someone waiting for a danfo: very visible, and loud about it. Match the wall, not your mood.' },
  { when: (s) => s.rounds === 0, line: 'So close! You almost had the masquerade walking past. Hold the pose a little longer next time.' },
  { when: (s) => s.bestCamo >= 92 && s.rounds >= 3, line: 'You and that wall are now family. The masquerade passed by like you were a water drum.' },
  { when: (s) => s.ranHome >= 2, line: 'You left the masquerade searching and went home through the front gate. Very bold, very Lagos.' },
  { when: (s) => s.rounds >= 6, line: 'The compound has a new legend. Even the generator hums your name.' },
  { when: (s) => s.rounds >= 4, line: 'Madam or Oga, respect! The masquerade looked straight at you and saw only plaster.' },
  { when: (s) => s.rounds >= 2 && s.bestCamo < 55, line: 'You survived on quick legs and luck. A closer colour match and you will not need the luck.' },
  { when: (s) => s.rounds >= 2, line: 'Two rounds under the egungun\'s nose. Not bad at all, not bad at all.' },
  { when: (s) => s.rounds >= 1 && s.bestCamo >= 80, line: 'Nicely blended. The masquerade is still wondering why the wall is breathing.' },
  { when: () => true, line: 'One round down. The yard remembers your footsteps, so tread softer next time.' },
];

export const verdictFor = (s: RunStats): string => (VERDICTS.find((v) => v.when(s)) ?? VERDICTS[VERDICTS.length - 1]).line;
