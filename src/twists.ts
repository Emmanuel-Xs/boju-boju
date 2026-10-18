// Round twists: from round 3 something changes the hunt. Every number is here.
//   round 3  NEPA took the light: night, and the masquerade carries a lantern: a narrow beam is all it sees by
//   round 4  rain: it slowly washes your paint back to your start.ng clothes
//   round 5  a second, smaller masquerade joins the first
//   later    the second masquerade stays, and rounds alternate between a blackout and the rain
export interface Twists {
  nepa: boolean;
  rain: boolean;
  second: boolean;
  /** A line for the banner and the HUD, or '' in the first two rounds. */
  title: string;
  tagline: string;
}

export const TWIST_CONFIG = {
  /** The round each twist first appears. */
  nepaRound: 3,
  rainRound: 4,
  secondRound: 5,
  nepa: {
    /** What the masquerade sees by in the dark: a narrow cone, and short. (It is never wider or longer than the round's own numbers.) */
    visionFovDeg: 34,
    visionRange: 9,
    /** Within this distance it still notices you however dark it is (m). */
    senseRadius: 1.8,
  },
  rain: {
    /** Seconds for 63% of the paint to wash out (the colour moves towards your clothes by 1 - e^(-t/tau)). */
    fadeTau: 38,
    /** How often (s) the camo score is recomputed while the paint fades. */
    refresh: 0.6,
    /** A thunderclap now and then, between these many seconds. */
    thunder: [14, 28] as [number, number],
  },
  second: {
    /** The smaller masquerade: its size, its body radius (m), and how much faster and narrower than the first it is. */
    scale: 0.72,
    radius: 0.45,
    speedMul: 1.18,
    fovMul: 0.85,
    /** Where it starts: beside the first one, this far along z (m). */
    startOffsetZ: -2.4,
  },
};

export function twistsFor(round: number, cfg = TWIST_CONFIG): Twists {
  const secondOn = round >= cfg.secondRound;
  let nepa = round === cfg.nepaRound;
  let rain = round === cfg.rainRound;
  if (round > cfg.secondRound) {
    // after round 5 the rounds alternate: blackout on odd rounds, rain on even ones
    nepa = round % 2 === 1;
    rain = !nepa;
  }
  const parts: string[] = [];
  if (nepa) parts.push('NEPA TOOK THE LIGHT');
  if (rain) parts.push('RAIN');
  if (secondOn) parts.push('A SECOND MASQUERADE');
  const taglines: string[] = [];
  if (nepa) taglines.push('It sees only by its lantern. Stay out of the beam.');
  if (rain) taglines.push('The rain is washing your paint away.');
  if (secondOn) taglines.push('A smaller, faster egungun joins the hunt.');
  return { nepa, rain, second: secondOn, title: parts.join(' · '), tagline: taglines.join(' ') };
}
