// The game's link to start.ng, through its hidden connect page (postMessage), exactly as the docs describe:
//   whoami on load and again when the tab comes back, the leaderboard, and saving a run.
// The game never blocks on start.ng: `localNet()` is the same interface with a local guest, and `startNgNet()` falls back to it
// for anything start.ng does not answer (local dev, start.ng down, a slow connect page).
import { resolveStyle } from './character';
import { drawFace, localGuest, type Identity } from './identity';
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
  /** A line for the results screen. */
  message: string;
}

export interface Net {
  identity(): Promise<Identity>;
  /** Top of the leaderboard (up to 50 rows), or null when there is none to show. */
  board(): Promise<BoardEntry[] | null>;
  /** Your best saved run, if known. */
  best(): Promise<BestRun | null>;
  submit(stats: RunStats): Promise<ScoreResult>;
  /** Where "Sign in" sends the player, or null when sign-in isn't possible here. */
  signInUrl(): string | null;
  /** Called when the tab comes back: the current identity, or null if start.ng didn't answer. */
  refresh(): Promise<Identity | null>;
}

export const NET_CONFIG = {
  /** How long the first whoami may take before the game starts as a local guest (it keeps listening; a later refresh picks the answer up). */
  whoamiTimeoutMs: 2500,
  /** Other requests (board, score). */
  requestTimeoutMs: 5000,
  /** Rows asked for from the board: the lobby shows 10, the rest finds your own best. */
  boardLimit: 50,
  maxNameLength: 40,
};

const REAL_START_NG = 'https://start.ng';
/** Dev servers can point at a mock connect page with ?startng=http://localhost:5174 (compiled out of production builds). */
const START_NG = (import.meta.env.DEV && new URLSearchParams(location.search).get('startng')) || REAL_START_NG;

// --- the connect-page helper from the docs ---------------------------------------------------------------------------

let frame: Promise<HTMLIFrameElement> | undefined;

function connectFrame(): Promise<HTMLIFrameElement> {
  frame ??= new Promise((resolve, reject) => {
    const el = document.createElement('iframe');
    el.src = `${START_NG}/connect`;
    el.hidden = true;
    el.onload = () => resolve(el);
    el.onerror = reject;
    document.body.append(el);
  });
  return frame;
}

/** Sends a message and resolves to start.ng's reply, or null if it didn't answer. */
async function askStartNg<T = Record<string, unknown>>(message: Record<string, unknown>, replyType: string, timeoutMs = NET_CONFIG.requestTimeoutMs): Promise<(T & { type: string; requestId: string }) | null> {
  let el: HTMLIFrameElement;
  try {
    el = await connectFrame();
  } catch {
    return null;
  }
  return new Promise((resolve) => {
    const requestId = Math.random().toString(36).slice(2);
    const done = (reply: (T & { type: string; requestId: string }) | null) => {
      clearTimeout(timer);
      removeEventListener('message', onMessage);
      resolve(reply);
    };
    const timer = setTimeout(() => done(null), timeoutMs);
    function onMessage(e: MessageEvent) {
      if (e.origin !== START_NG || e.source !== el.contentWindow) return;
      if (e.data?.type === replyType && e.data.requestId === requestId) done(e.data);
    }
    addEventListener('message', onMessage);
    el.contentWindow?.postMessage({ ...message, requestId }, START_NG);
  });
}

// --- turning replies into things the game can trust ----------------------------------------------------------------------

interface WhoamiUser {
  id?: unknown;
  name?: unknown;
  account?: unknown;
  style?: unknown;
  face?: unknown;
}

const text = (v: unknown, fallback: string) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, NET_CONFIG.maxNameLength) : fallback);

function identityFrom(u: WhoamiUser | null | undefined, signedIn: boolean): Identity {
  const style = resolveStyle((u?.style ?? null) as Record<string, unknown> | null);
  const face = typeof u?.face === 'string' && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(u.face) ? u.face : drawFace(style);
  const id = signedIn && typeof u?.id === 'number' && Number.isFinite(u.id) ? u.id : null;
  return {
    id,
    name: text(u?.name, signedIn ? 'Player' : 'Guest'),
    account: signedIn && typeof u?.account === 'string' && u.account ? u.account.slice(0, NET_CONFIG.maxNameLength) : null,
    style,
    face,
    signedIn: signedIn && id !== null,
    source: signedIn ? 'start.ng' : 'start.ng guest',
  };
}

const whole = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.min(1_000_000_000, Math.round(v))) : 0);

function boardFrom(entries: unknown): BoardEntry[] | null {
  if (!Array.isArray(entries)) return null;
  const out: BoardEntry[] = [];
  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;
    const r = e as Record<string, unknown>;
    const stats = (r.stats && typeof r.stats === 'object' ? r.stats : {}) as Record<string, unknown>;
    out.push({
      rank: whole(r.rank),
      player_id: typeof r.player_id === 'number' ? r.player_id : -1,
      name: text(r.name, 'Player'),
      score: whole(r.score),
      stats: { rounds: whole(stats.rounds ?? r.score), hidden: whole(stats.hidden), camo: whole(stats.camo) },
    });
  }
  return out;
}

// --- personal best on this device (guests, and a fallback while the board is loading) -------------------------------------------

const BEST_KEY = 'boju.best';

export function readLocalBest(who: number | null = null): BestRun | null {
  try {
    const v = JSON.parse(localStorage.getItem(`${BEST_KEY}${who === null ? '' : `.${who}`}`) ?? 'null');
    return v && typeof v.rounds === 'number' ? v : null;
  } catch {
    return null;
  }
}

function writeLocalBest(run: BestRun, who: number | null = null): void {
  try {
    localStorage.setItem(`${BEST_KEY}${who === null ? '' : `.${who}`}`, JSON.stringify(run));
  } catch {
    /* private mode: nothing to keep */
  }
}

const isBetter = (run: BestRun, prev: BestRun | null) => !prev || run.rounds > prev.rounds || (run.rounds === prev.rounds && run.hidden > prev.hidden) || (run.rounds === prev.rounds && run.hidden === prev.hidden && run.camo > prev.camo);

/** The three numbers the leaderboard takes (see startng.json): whole numbers, in this order of importance. */
export function statsFor(s: RunStats): { rounds: number; hidden: number; camo: number } {
  return { rounds: whole(s.rounds), hidden: whole(s.hiddenSeconds), camo: whole(s.bestCamo) };
}

// --- the nets ------------------------------------------------------------------------------------------------------------------

export function localNet(): Net {
  return {
    identity: async () => localGuest(),
    board: async () => null,
    best: async () => readLocalBest(),
    async submit(stats) {
      const run = statsFor(stats);
      const better = isBetter(run, readLocalBest());
      if (better) writeLocalBest(run);
      return { saved: false, improved: better, rank: null, message: better ? 'New personal best on this device.' : '' };
    },
    signInUrl: () => null,
    refresh: async () => null,
  };
}

/** True when the connect page can answer: the game is served from a *.start.ng address (or a dev mock is configured). */
export const canTalkToStartNg = () => START_NG !== REAL_START_NG || location.hostname === 'start.ng' || location.hostname.endsWith('.start.ng');

export function startNgNet(): Net {
  if (!canTalkToStartNg()) return localNet();
  const local = localNet();
  let me: Identity | null = null;
  let cachedBoard: BoardEntry[] | null = null;

  const whoami = async (timeoutMs: number): Promise<Identity | null> => {
    const reply = await askStartNg<{ user?: WhoamiUser | null; guest?: WhoamiUser | null }>({ type: 'startng:whoami' }, 'startng:user', timeoutMs);
    if (!reply) return null;
    if (reply.user) return identityFrom(reply.user, true);
    if (reply.guest) return identityFrom(reply.guest, false);
    return null;
  };

  // a #startng_session=... in the address is for the HTTP API; the connect page needs none of it, so tidy the address
  if (location.hash.includes('startng_session')) history.replaceState(null, '', location.pathname + location.search);

  return {
    async identity() {
      me = (await whoami(NET_CONFIG.whoamiTimeoutMs)) ?? (await local.identity());
      return me;
    },
    async refresh() {
      const next = await whoami(NET_CONFIG.requestTimeoutMs);
      if (next) me = next;
      return next;
    },
    async board() {
      const reply = await askStartNg<{ ok?: boolean; entries?: unknown }>({ type: 'startng:leaderboard', limit: NET_CONFIG.boardLimit }, 'startng:leaderboardData');
      const b = reply?.ok ? boardFrom(reply.entries) : null;
      if (b) cachedBoard = b;
      return b ?? cachedBoard;
    },
    async best() {
      if (me?.signedIn && me.id !== null) {
        const row = cachedBoard?.find((e) => e.player_id === me!.id);
        if (row) return { rounds: row.stats.rounds, hidden: row.stats.hidden, camo: row.stats.camo };
        return readLocalBest(me.id);
      }
      return readLocalBest();
    },
    async submit(stats) {
      const run = statsFor(stats);
      if (!me?.signedIn || me.id === null) {
        const better = isBetter(run, readLocalBest());
        if (better) writeLocalBest(run);
        return { saved: false, improved: better, rank: null, message: 'Sign in with start.ng to save your score and join the board.' };
      }
      const reply = await askStartNg<{ ok?: boolean; error?: string; result?: { best?: number; improved?: boolean; rank?: number; stats?: Record<string, unknown> } }>({ type: 'startng:score', stats: run }, 'startng:scoreSaved');
      if (!reply) return { saved: false, improved: false, rank: null, message: "start.ng didn't answer, so this run wasn't saved." };
      if (!reply.ok || !reply.result) return { saved: false, improved: false, rank: null, message: reply.error ? `Not saved: ${String(reply.error).slice(0, 80)}` : 'Not saved.' };
      const r = reply.result;
      const best = r.stats ? { rounds: whole(r.stats.rounds), hidden: whole(r.stats.hidden), camo: whole(r.stats.camo) } : run;
      writeLocalBest(best, me.id);
      const rank = typeof r.rank === 'number' ? r.rank : null;
      return {
        saved: true,
        improved: !!r.improved,
        rank,
        message: r.improved ? `New best! You are #${rank ?? '?'} on the board.` : `Not your best this time. You are #${rank ?? '?'} with ${best.rounds} round${best.rounds === 1 ? '' : 's'}.`,
      };
    },
    signInUrl: () => `${REAL_START_NG}/?return_to=${encodeURIComponent(location.origin + location.pathname)}`,
  };
}
