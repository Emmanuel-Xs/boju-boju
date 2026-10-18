// Who is playing: the signed-in start.ng player, start.ng's guest, or (when start.ng does not answer) a local guest.
// The game never blocks on start.ng: `localGuest()` is always available.
import type { StartNgStyle } from './character';
import { DEFAULT_STYLE, resolveStyle } from './character';

export interface Identity {
  /** start.ng player id, or null for guests. */
  id: number | null;
  /** The character's name. */
  name: string;
  /** Account name for a small @handle (signed-in players only). */
  account: string | null;
  style: StartNgStyle;
  /** Picture of the character's face (a PNG data URL). */
  face: string;
  signedIn: boolean;
  /** Where the identity came from. */
  source: 'start.ng' | 'start.ng guest' | 'local guest';
}

/** A little face picture drawn from a style, for when start.ng gives none. */
export function drawFace(style: StartNgStyle, size = 96): string {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (!g) return '';
  g.fillStyle = '#d8fd71';
  g.fillRect(0, 0, size, size);
  const s = size / 96;
  g.fillStyle = style.hairColor;
  if (style.hair === 'afro') g.beginPath(), g.arc(48 * s, 40 * s, 36 * s, 0, 7), g.fill();
  else if (style.hair !== 'bald') g.beginPath(), g.ellipse(48 * s, 42 * s, 30 * s, 32 * s, 0, 0, 7), g.fill();
  g.fillStyle = style.skinColor;
  g.beginPath();
  g.ellipse(48 * s, 52 * s, 24 * s, 28 * s, 0, 0, 7);
  g.fill();
  g.fillStyle = '#17120f';
  for (const x of [38, 58]) {
    g.beginPath();
    g.arc(x * s, 50 * s, 3.2 * s, 0, 7);
    g.fill();
  }
  g.strokeStyle = '#17120f';
  g.lineWidth = 2.4 * s;
  g.beginPath();
  g.arc(48 * s, 62 * s, 8 * s, 0.2, Math.PI - 0.2);
  g.stroke();
  return c.toDataURL('image/png');
}

/** Default look for a player we know nothing about: the same every time. */
export const LOCAL_STYLE: StartNgStyle = { ...DEFAULT_STYLE, body: 'female', primaryColor: '#f4a300', secondaryColor: '#2b4c9b', skinColor: '#8d5524', hairColor: '#1b1b1b', hair: 'braids', hat: 'crown', accessory: 'earrings' };

export function localGuest(): Identity {
  const style = resolveStyle(LOCAL_STYLE as unknown as Record<string, unknown>);
  return { id: null, name: 'Guest', account: null, style, face: drawFace(style), signedIn: false, source: 'local guest' };
}
