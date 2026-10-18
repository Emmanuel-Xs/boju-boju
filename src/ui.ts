// Screens around the game: lobby, results, pause and the hunt's profile card. Plain DOM, styled to sit on the golden-hour scene.
// Names, accounts and face pictures come from start.ng, so they only ever go in through textContent / img.src, never innerHTML.
import type { Identity } from './identity';
import type { RunStats } from './run';

export interface BoardEntry {
  rank: number;
  player_id: number;
  name: string;
  score: number;
  stats: Record<string, number>;
}

export interface ScreenHandlers {
  play(): void;
  again(): void;
  lobby(): void;
  resume(): void;
  quit(): void;
  signIn(): void;
}

const ACCENT = '#d8fd71';
const css = (el: HTMLElement, text: string) => (el.style.cssText = text);
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, style = '', text?: string): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  if (style) e.style.cssText = style;
  if (text !== undefined) e.textContent = text;
  return e;
};
export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds) % 60).padStart(2, '0')}`;

const BUTTON = `font:800 16px system-ui,sans-serif;min-height:48px;padding:0 22px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#1f2118;background:${ACCENT}`;
const GHOST = `font:700 14px system-ui,sans-serif;min-height:44px;padding:0 18px;border:2px solid #fff9;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#fff;background:#0006`;

export class Screens {
  private root = el('div', 'position:fixed;inset:0;z-index:20;pointer-events:none;font-family:system-ui,sans-serif;color:#fff');
  private lobby = el('div', 'position:absolute;inset:0;display:none;overflow:auto;pointer-events:none');
  private results = el('div', 'position:absolute;inset:0;display:none;background:#150c0acc;overflow:auto;pointer-events:auto');
  private pause = el('div', 'position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:#000a;pointer-events:auto');
  private card = el('div', `position:fixed;top:8px;left:8px;z-index:6;display:none;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:999px;background:#292a23e6;color:#fffefa;font-family:system-ui,sans-serif;pointer-events:none`);
  private cardFace = el('img', `width:44px;height:44px;border-radius:50%;background:${ACCENT};object-fit:cover`);
  private cardName = el('b', 'display:block;font-size:15px');
  private cardAccount = el('span', 'font-size:11px;opacity:.7');

  constructor(private h: ScreenHandlers) {
    this.root.append(this.lobby, this.results, this.pause);
    document.body.append(this.root);
    const who = el('div');
    who.append(this.cardName, this.cardAccount);
    this.card.append(this.cardFace, who);
    document.body.append(this.card);
    this.buildPause();
  }

  // --- profile card, shown during the hunt (the docs' pattern for when the character is not fully shown)
  setCard(id: Identity | null): void {
    if (!id) {
      this.card.style.display = 'none';
      return;
    }
    const narrow = innerWidth < 600;
    this.cardFace.style.width = this.cardFace.style.height = narrow ? '34px' : '44px';
    this.cardName.style.cssText = `display:block;font-size:${narrow ? 13 : 15}px;max-width:${narrow ? 84 : 180}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`;
    this.card.style.padding = narrow ? '4px 10px 4px 4px' : '6px 16px 6px 6px';
    this.card.style.maxWidth = narrow ? '160px' : '320px';
    this.cardFace.src = id.face;
    this.cardName.textContent = id.name;
    this.cardAccount.textContent = id.account ? `@${id.account}` : 'Not signed in';
    this.card.style.display = 'flex';
  }

  // --- lobby
  private levelSelect: { levels: readonly { id: string; name: string; blurb: string }[]; current: string; pick: (id: string) => void } | null = null;

  /** The levels shown in the lobby; picking another one calls `pick` (the game stores the choice and reloads). */
  setLevels(levels: readonly { id: string; name: string; blurb: string }[], current: string, pick: (id: string) => void): void {
    this.levelSelect = { levels, current, pick };
  }

  showLobby(id: Identity, best: { score: number; rounds: number; camo: number } | null, board: BoardEntry[] | null, canSignIn: boolean): void {
    this.hideAll();
    this.lobby.replaceChildren();
    // on a tall phone screen the menu stacks under the turntable
    const top = innerWidth < innerHeight ? '46vh' : '20px';
    css(this.lobby, `position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:16px;padding:${top} 20px 20px;overflow:auto;pointer-events:none`);
    const left = el('div', 'pointer-events:auto;width:min(380px,100%);display:flex;flex-direction:column;gap:12px');
    left.append(
      el('div', 'font:800 clamp(34px,6vw,52px)/1 system-ui;letter-spacing:1px;text-shadow:0 4px 18px #000', 'Boju Boju'),
      el('div', 'font:600 16px system-ui;opacity:.92;text-shadow:0 2px 8px #000;margin-top:-6px', 'Hide from the masquerade'),
    );
    const who = el('div', 'display:flex;align-items:center;gap:12px;padding:10px 14px;background:#150c0acc;border-radius:16px');
    const face = el('img', `width:64px;height:64px;border-radius:50%;background:${ACCENT};object-fit:cover`);
    face.src = id.face;
    face.alt = '';
    const names = el('div');
    names.append(el('div', 'font:800 22px system-ui', id.name), el('div', 'font:12px system-ui;opacity:.75', id.account ? `@${id.account}` : id.signedIn ? '' : 'Playing as a guest'));
    who.append(face, names);
    left.append(who);
    left.append(el('div', 'padding:8px 14px;background:#150c0acc;border-radius:12px;font:600 14px system-ui', best ? `Your best run: ${best.score} points · ${best.rounds} round${best.rounds === 1 ? '' : 's'} · ${best.camo}% camo` : id.signedIn ? 'No run saved yet. Go on, hide!' : 'Sign in to save your best run.'));
    if (this.levelSelect && this.levelSelect.levels.length > 1) {
      // one short row of level buttons (names only) and a line about the chosen one, so Play stays on screen even in a short window
      const { levels, current, pick } = this.levelSelect;
      const row = el('div', 'display:flex;gap:8px');
      for (const l of levels) {
        const on = l.id === current;
        const b = el('button', `flex:1 1 0;min-height:44px;padding:6px 8px;border-radius:14px;cursor:pointer;touch-action:manipulation;border:2px solid ${on ? ACCENT : '#fff3'};background:${on ? '#2a3a0acc' : '#150c0acc'};color:${on ? ACCENT : '#fff'};font:800 14px system-ui`, l.name.replace('The ', ''));
        b.title = l.blurb;
        b.setAttribute('aria-pressed', String(on));
        b.onclick = () => {
          if (!on) pick(l.id);
        };
        row.append(b);
      }
      left.append(row, el('div', 'font:600 12px/1.35 system-ui;opacity:.9;text-shadow:0 1px 6px #000;margin-top:-4px', levels.find((l) => l.id === current)?.blurb ?? ''));
    }
    const play = el('button', BUTTON + ';font-size:20px;min-height:56px', 'Play');
    play.onclick = () => this.h.play();
    left.append(play);
    if (canSignIn && !id.signedIn) {
      const si = el('button', GHOST, 'Sign in to save your score');
      si.onclick = () => this.h.signIn();
      left.append(si);
    }
    left.append(this.howToPlay());
    this.lobby.append(left);
    if (board?.length) this.lobby.append(this.boardPanel('Top hiders', board, id.id, 'pointer-events:auto;width:min(420px,100%);align-self:flex-start;margin-left:auto'));
    this.lobby.style.display = 'flex';
  }

  hideLobby(): void {
    this.lobby.style.display = 'none';
  }

  private howToPlay(): HTMLElement {
    const box = el('div', 'background:#150c0acc;border-radius:16px;padding:12px 14px;font:13px/1.55 system-ui');
    const touch = matchMedia('(pointer: coarse)').matches;
    box.append(el('div', 'font:800 15px system-ui;margin-bottom:6px', 'How to play'));
    const lines = touch
      ? [
          'The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (or let the timer run out).',
          'Drag anywhere to walk. Jump climbs low things; walking into a prop hops you up.',
          'Eyedropper: tap it, then tap a surface within 4 m to copy its colour onto your clothes.',
          'Zone switches between your top and your trousers. Palette picks a swatch.',
          'Stiff, Crouch, Wall and Ball are poses: Wall presses you flat to the nearest wall.',
          'Stay still and blended until the hourglass runs out. Moving breaks a pose and gives you away.',
        ]
      : [
          'The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (Enter) or let the timer run out.',
          'W A S D walk, Shift runs, Space jumps. Walking into a low prop hops you up onto it.',
          'E turns the eyedropper on: click a surface within 4 m to copy its colour onto your clothes. Q switches top or trousers, P opens the palette.',
          '1 Stiff, 2 Crouch, 3 Wall (presses you flat to the nearest wall), 4 Ball. Moving breaks a pose.',
          'Stay still and blended until the hourglass runs out. Esc pauses.',
        ];
    for (const l of lines) box.append(el('div', 'margin:3px 0', l));
    return box;
  }

  // --- leaderboard table
  boardPanel(title: string, board: BoardEntry[], myId: number | null, extra = ''): HTMLElement {
    const box = el('div', `background:#150c0acc;border-radius:16px;padding:12px 14px;${extra}`);
    box.append(el('div', 'font:800 15px system-ui;margin-bottom:6px', title));
    const t = el('table', 'width:100%;border-collapse:collapse;font:13px system-ui');
    const head = el('tr', 'opacity:.6;font-size:11px;text-align:right');
    for (const [i, h] of ['#', 'Hider', 'Score', 'Rounds', 'Camo'].entries()) head.append(el('td', `padding:2px 6px;${i < 2 ? 'text-align:left' : ''}`, h));
    t.append(head);
    for (const e of board.slice(0, 10)) {
      const mine = myId !== null && e.player_id === myId;
      const tr = el('tr', `text-align:right;${mine ? `background:${ACCENT};color:#1f2118;font-weight:800` : ''}`);
      const cells = [String(e.rank), e.name, String(e.stats.score ?? e.score), String(e.stats.rounds ?? 0), `${e.stats.camo ?? 0}%`];
      cells.forEach((c, i) => tr.append(el('td', `padding:3px 6px;${i < 2 ? 'text-align:left' : ''}${i === 1 ? ';max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap' : ''}`, c)));
      t.append(tr);
    }
    box.append(t);
    return box;
  }

  // --- results
  showResults(stats: RunStats, verdict: string, saveLine: string, board: BoardEntry[] | null, myId: number | null, signInButton: boolean): void {
    this.hideAll();
    this.results.replaceChildren();
    // margin:auto centres it when it fits and lets the page scroll from the top when it does not (align-items:center cut the top off)
    const wrap = el('div', 'display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start;padding:16px;box-sizing:border-box;width:100%;max-width:960px;margin:auto');
    const card = el('div', 'background:#291410f2;border:1px solid #fff3;border-radius:20px;padding:14px 20px 16px;width:min(420px,100%);box-sizing:border-box;display:flex;flex-direction:column;gap:6px');
    card.append(el('div', 'font:800 28px system-ui;letter-spacing:1px', 'Run over'));
    const total = el('div', 'display:flex;justify-content:space-between;align-items:baseline;font:800 26px system-ui;padding:2px 0 6px;border-bottom:2px solid #fff4');
    total.append(el('span', '', 'Score'), el('b', `color:${ACCENT}`, String(stats.score)));
    card.append(total);
    const rows: [string, string][] = [
      ['Survival', String(stats.parts.survival)],
      ['Near misses', String(stats.parts.nearMiss)],
      ['Ready early', String(stats.parts.ready)],
      ['Run home', String(stats.parts.runHome)],
      ['Camo bonus', String(stats.parts.camo)],
      ['Rounds survived', String(stats.rounds)],
      ['Time hidden', clock(stats.hiddenSeconds)],
      ['Best camo (held 3 s)', `${stats.bestCamo}%`],
    ];
    for (const [k, v] of rows) {
      const r = el('div', 'display:flex;justify-content:space-between;font:600 15px system-ui;padding:2px 0;border-bottom:1px solid #fff2');
      r.append(el('span', 'opacity:.8', k), el('b', '', v));
      card.append(r);
    }
    card.append(el('div', 'font:italic 600 14px/1.4 system-ui;margin:4px 0', `"${verdict}"`));
    if (saveLine) card.append(el('div', `font:700 13px system-ui;color:${ACCENT}`, saveLine));
    const buttons = el('div', 'display:flex;gap:10px;flex-wrap:wrap;margin-top:4px');
    const again = el('button', BUTTON, 'Play again');
    again.onclick = () => this.h.again();
    const lobby = el('button', GHOST, 'Back to lobby');
    lobby.onclick = () => this.h.lobby();
    buttons.append(again, lobby);
    if (signInButton) {
      const si = el('button', GHOST, 'Sign in to save');
      si.onclick = () => this.h.signIn();
      buttons.append(si);
    }
    card.append(buttons);
    wrap.append(card);
    if (board?.length) wrap.append(this.boardPanel('Top hiders', board, myId, 'width:min(440px,100%);box-sizing:border-box;align-self:flex-start'));
    this.results.append(wrap);
    this.results.style.display = 'flex';
  }

  // --- pause
  private buildPause(): void {
    const box = el('div', 'background:#291410f2;border-radius:20px;padding:22px 26px;display:flex;flex-direction:column;gap:12px;align-items:center;min-width:240px');
    box.append(el('div', 'font:800 32px system-ui;letter-spacing:2px', 'Paused'));
    const resume = el('button', BUTTON, 'Resume');
    resume.onclick = () => this.h.resume();
    const quit = el('button', GHOST, 'Quit run');
    quit.onclick = () => this.h.quit();
    box.append(resume, quit, el('div', 'font:12px system-ui;opacity:.7', 'Esc resumes'));
    this.pause.append(box);
  }

  showPause(v: boolean): void {
    this.pause.style.display = v ? 'flex' : 'none';
  }

  get pausedVisible(): boolean {
    return this.pause.style.display !== 'none';
  }

  hideAll(): void {
    this.lobby.style.display = 'none';
    this.results.style.display = 'none';
    this.pause.style.display = 'none';
  }
}
