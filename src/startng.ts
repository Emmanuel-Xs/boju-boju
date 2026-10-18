// The game's link to start.ng. Phase 1 ships only the local fallback: a guest with a default look, no leaderboard, and a personal best kept in localStorage.
// The game never blocks on start.ng, so this local `Net` is always a valid answer.
import type { Identity } from './identity';
import { localGuest } from './identity';
import type { RunStats } from './run';
import type { BoardEntry } from './ui';

export interface BestRun {
  rounds: number;
  hidden: number;
  camo: number;
}

export interface ScoreResult {
  saved: boolean;
  improved: boolean;
  rank: number | null;
  message: string;
}

export interface Net {
  identity(): Promise<Identity>;
  board(): Promise<BoardEntry[] | null>;
  /** Your best saved run, if known. */
  best(): Promise<BestRun | null>;
  submit(stats: RunStats): Promise<ScoreResult>;
  /** Where "Sign in" sends the player, or null when sign-in isn't possible here. */
  signInUrl(): string | null;
  /** Called when the tab comes back: returns a new identity if it changed. */
  refresh(): Promise<Identity | null>;
}

const BEST_KEY = 'boju.best';

export function readLocalBest(): BestRun | null {
  try {
    const v = JSON.parse(localStorage.getItem(BEST_KEY) ?? 'null');
    return v && typeof v.rounds === 'number' ? v : null;
  } catch {
    return null;
  }
}

export function localNet(): Net {
  return {
    identity: async () => localGuest(),
    board: async () => null,
    best: async () => readLocalBest(),
    async submit(stats) {
      const prev = readLocalBest();
      const run = { rounds: stats.rounds, hidden: Math.round(stats.hiddenSeconds), camo: Math.round(stats.bestCamo) };
      const better = !prev || run.rounds > prev.rounds || (run.rounds === prev.rounds && run.hidden > prev.hidden);
      if (better) {
        try {
          localStorage.setItem(BEST_KEY, JSON.stringify(run));
        } catch {
          /* private mode: nothing to keep */
        }
      }
      return { saved: false, improved: better, rank: null, message: better ? 'New personal best on this device.' : '' };
    },
    signInUrl: () => null,
    refresh: async () => null,
  };
}
