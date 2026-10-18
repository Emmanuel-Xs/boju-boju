// On-screen lyrics for the chant: each line appears as it is sung, with the words lighting up in time.
// The lines are the ones the placeholder voices say (see CREDITS.md); replace both together when you record the real ones.
import type { ClipName } from '../audio';

// `english` is a plain-language gloss shown underneath. These glosses are ours: have a Yoruba speaker check them along with the recordings.
export const CHANT_TEXT: Partial<Record<ClipName, { text: string; english: string; singer: string }>> = {
  chant_intro: { text: 'Bojú bojú o! Ẹ̀gúngún ń bọ̀! Ẹ sá pamọ́!', english: 'Eyes covered, eyes covered! The masquerade is coming! Go and hide!', singer: 'Egungun' },
  chant_ask: { text: 'Ṣé kí n ṣí i?', english: 'Shall I open it?', singer: 'Egungun' },
  chant_not_yet: { text: 'Má ṣí i!', english: "Don't open it!", singer: 'Children' },
  chant_open: { text: 'Ṣí i!', english: 'Open it!', singer: 'Children' },
  chant_hunt: { text: 'Ẹni tí mo bá rí, màá jẹ ẹ́!', english: "Whoever I spot, I'll gobble up!", singer: 'Egungun' },
  caught: { text: 'Mo rí ẹ!', english: 'I see you!', singer: 'Egungun' },
};

export interface Lyrics {
  /** Show a chant line, lighting its words up over `seconds`. */
  sing(name: ClipName, seconds: number): void;
  hide(): void;
}

export function createLyrics(): Lyrics {
  const box = document.createElement('div');
  box.style.cssText =
    'position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:7;pointer-events:none;text-align:center;opacity:0;transition:opacity .25s;max-width:min(90vw,900px)';
  const who = document.createElement('div');
  who.style.cssText = 'font:700 12px system-ui;letter-spacing:3px;text-transform:uppercase;color:#f1c232;text-shadow:0 2px 6px #000;margin-bottom:4px';
  const line = document.createElement('div');
  line.style.cssText = 'font:800 clamp(24px,5vw,40px)/1.2 system-ui,sans-serif;color:#fff;text-shadow:0 3px 10px #000,0 0 3px #000;letter-spacing:1px';
  const gloss = document.createElement('div');
  gloss.style.cssText = 'font:italic 600 17px/1.3 system-ui,sans-serif;color:#fff;opacity:.92;text-shadow:0 2px 8px #000,0 0 3px #000;margin-top:4px';
  box.append(who, line, gloss);
  document.body.appendChild(box);
  const place = () => (box.style.bottom = innerWidth < 600 ? '262px' : '150px'); // phones: above the thumb buttons
  place();
  addEventListener('resize', place);
  let timers: number[] = [];
  const clear = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  return {
    sing(name, seconds) {
      const entry = CHANT_TEXT[name];
      if (!entry) return;
      clear();
      who.textContent = entry.singer;
      gloss.textContent = entry.english;
      const words = entry.text.split(' ');
      line.replaceChildren(
        ...words.map((w) => {
          const span = document.createElement('span');
          span.textContent = w + ' ';
          span.style.cssText = 'color:#ffffffa0;transition:color .12s,transform .12s;display:inline-block;white-space:pre';
          return span;
        }),
      );
      box.style.opacity = '1';
      // each word lights up in proportion to its length, so the highlight follows the voice
      const total = words.reduce((a, w) => a + w.length + 1, 0);
      let at = 0;
      words.forEach((w, i) => {
        const span = line.children[i] as HTMLElement;
        timers.push(
          window.setTimeout(() => {
            span.style.color = '#f1c232';
            span.style.transform = 'scale(1.12)';
          }, at * seconds * 1000 * 0.92),
          window.setTimeout(() => {
            span.style.color = '#ffffff';
            span.style.transform = 'scale(1)';
          }, (at + (w.length + 1) / total) * seconds * 1000),
        );
        at += (w.length + 1) / total;
      });
      timers.push(window.setTimeout(() => (box.style.opacity = '0'), seconds * 1000 + 700));
    },
    hide() {
      clear();
      box.style.opacity = '0';
    },
  };
}
