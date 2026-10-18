// Round HUD in the style of Meccha Chameleon: an hourglass timer at the top with the round number, one icon per hider, a Ready button during prep,
// and a "hiders left" count bottom right.

export interface RoundHudState {
  label: string;
  seconds: number;
  round: number;
  /** Show the Ready button, with the points ending prep now would earn. */
  ready: { bonus: number } | null;
  hiders: number;
  caught: number;
  points: number;
}

export interface RoundHud {
  update(s: RoundHudState): void;
  show(visible: boolean): void;
  banner(text: string | null, color?: string): void;
  /** A short message that floats up and fades: score awards, the run-home hint, the spin warning. */
  popup(text: string, color?: string, seconds?: number): void;
  onReady: (() => void) | null;
}

const css = (el: HTMLElement, text: string) => (el.style.cssText = text);

export function createRoundHud(): RoundHud {
  const root = document.createElement('div');
  css(root, 'position:fixed;inset:0;pointer-events:none;z-index:6;font-family:system-ui,sans-serif;color:#fff;text-shadow:0 2px 6px #000;display:none');
  document.body.appendChild(root);

  const top = document.createElement('div');
  css(top, 'position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px');
  const time = document.createElement('div');
  css(time, 'display:flex;align-items:center;gap:8px;font:800 26px system-ui;letter-spacing:1px');
  const glass = document.createElement('span');
  css(glass, 'display:inline-block;width:20px;height:28px');
  glass.innerHTML =
    '<svg viewBox="0 0 20 28" width="20" height="28"><path d="M2 1h16M2 27h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M4 1c0 8 6 9 6 13s-6 5-6 13M16 1c0 8-6 9-6 13s6 5 6 13" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M6 24h8c-1-3-3-4-4-4s-3 1-4 4z" fill="#f1c232"/></svg>';
  const clock = document.createElement('span');
  const round = document.createElement('span');
  css(round, 'font:700 13px system-ui;opacity:.85;margin-left:6px;letter-spacing:2px');
  time.append(glass, clock, round);
  const label = document.createElement('div');
  css(label, 'font:700 12px system-ui;letter-spacing:2px;opacity:.9;text-align:center');
  const icons = document.createElement('div');
  css(icons, 'display:flex;gap:6px');
  const ready = document.createElement('button');
  css(ready, 'pointer-events:auto;display:none;margin-top:4px;min-height:44px;padding:0 20px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;font:800 15px system-ui;color:#1f2118;background:#d8fd71;text-shadow:none');
  top.append(time, label, icons, ready);
  root.appendChild(top);

  const narrow = () => innerWidth < 600;
  const layout = () => {
    // phones: the round bar sits top right (the profile card takes the top left) and the separate hiders counter goes away (the icons say it)
    top.style.cssText = narrow()
      ? 'position:absolute;right:8px;top:8px;display:flex;flex-direction:column;align-items:center;gap:3px;background:#000a;border-radius:12px;padding:5px 10px 7px;width:196px;box-sizing:border-box'
      : 'position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px';
    left.style.display = narrow() ? 'none' : 'flex';
  };
  const left = document.createElement('div');
  css(left, 'position:absolute;right:12px;bottom:12px;display:flex;align-items:baseline;gap:8px;background:#000a;border-radius:12px;padding:6px 14px');
  const count = document.createElement('span');
  css(count, 'font:800 34px system-ui;line-height:1');
  const countLabel = Object.assign(document.createElement('span'), { textContent: 'hiders left' });
  css(countLabel, 'font:600 12px system-ui;opacity:.85');
  left.append(count, countLabel);
  root.appendChild(left);
  layout();
  addEventListener('resize', layout);

  const pops = document.createElement('div');
  root.appendChild(pops);
  const placePops = () =>
    css(pops, narrow() ? 'position:absolute;right:8px;top:118px;width:196px;display:flex;flex-direction:column;align-items:flex-end;gap:4px' : 'position:absolute;left:50%;top:112px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px');
  placePops();
  addEventListener('resize', placePops);

  const banner = document.createElement('div');
  css(banner, 'position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:800 clamp(34px,8vw,64px) system-ui;letter-spacing:4px;text-shadow:0 4px 18px #000;text-align:center;padding:0 12px');
  root.appendChild(banner);

  const handle: RoundHud = {
    onReady: null,
    show(v) {
      root.style.display = v ? 'block' : 'none';
    },
    banner(text, color = '#8e1b1b66') {
      banner.style.display = text ? 'flex' : 'none';
      banner.style.background = color;
      banner.textContent = text ?? '';
    },
    popup(text, color = '#d8fd71', seconds = 1.8) {
      while (pops.children.length >= 5) pops.firstElementChild?.remove();
      const el = document.createElement('div');
      css(el, `font:800 ${narrow() ? 15 : 18}px system-ui;color:${color};text-shadow:0 2px 6px #000;background:#000a;border-radius:999px;padding:3px 12px;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis`);
      el.textContent = text;
      pops.appendChild(el);
      const a = el.animate([{ opacity: 0, transform: 'translateY(8px) scale(.9)' }, { opacity: 1, transform: 'translateY(0) scale(1)', offset: 0.12 }, { opacity: 1, offset: 0.75 }, { opacity: 0, transform: 'translateY(-14px)' }], { duration: seconds * 1000, easing: 'ease-out' });
      a.onfinish = () => el.remove();
    },
    update(s) {
      const sec = Math.max(0, Math.ceil(s.seconds));
      clock.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
      round.textContent = `ROUND ${s.round}`;
      label.textContent = s.label;
      const icon = (caught: boolean) =>
        `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${caught ? '#d33' : '#48c26a'};border:2px solid #fff;text-align:center;font:800 13px/18px system-ui">${caught ? '✕' : '●'}</span>`;
      icons.innerHTML = Array.from({ length: s.hiders }, (_, i) => icon(i < s.caught)).join('');
      count.textContent = String(Math.max(0, s.hiders - s.caught));
      if (s.ready) {
        ready.style.display = 'block';
        ready.textContent = `Ready!  (Enter)  +${s.ready.bonus}`;
      } else ready.style.display = 'none';
    },
  };
  ready.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    handle.onReady?.();
  });
  return handle;
}
