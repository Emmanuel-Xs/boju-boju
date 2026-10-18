// The levels you can play, and which one is chosen. Each level lives in its own file and is loaded on demand, so a player only downloads
// the one they play. Choosing another level in the lobby stores the choice and reloads the page.
import type { Compound } from './compound';

export interface LevelInfo {
  id: string;
  name: string;
  blurb: string;
}

export const LEVELS: readonly LevelInfo[] = [
  { id: 'compound', name: 'The Compound', blurb: 'A Lagos yard: rooms, a danfo, drums and a zinc fence.' },
  { id: 'market', name: 'The Market', blurb: 'Stalls hung with ankara cloth, produce crates and a keke. Busier backgrounds.' },
];

const KEY = 'boju.level';

export function selectedLevel(): string {
  let id: string | null = null;
  try {
    id = (import.meta.env.DEV && new URLSearchParams(location.search).get('level')) || localStorage.getItem(KEY);
  } catch {
    /* storage blocked: the compound */
  }
  return LEVELS.some((l) => l.id === id) ? id! : LEVELS[0].id;
}

export function chooseLevel(id: string): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* private mode: the choice just will not stick */
  }
}

/** Files the chosen level fetches while building, for the loading bar. */
export const assetCountOf = (id: string): number => (id === 'market' ? 7 + 7 : 7 + 10);

export async function createLevel(id: string, onAsset?: () => void): Promise<Compound> {
  if (id === 'market') return (await import('./market')).createMarket(onAsset);
  return (await import('./compound')).createCompound(onAsset);
}
