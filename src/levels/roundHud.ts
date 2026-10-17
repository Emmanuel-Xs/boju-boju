// Round HUD in the style of Meccha Chameleon: an hourglass timer at the top with one icon per hider, and a "hiders left" count bottom right.
import type { Phase } from './round';

export interface RoundHud {
  update(phase: Phase, secondsLeft: number, hidersTotal: number, hidersCaught: number): void;
}

const css = (el: HTMLElement, text: string) => (el.style.cssText = text);

export function createRoundHud(): RoundHud {
  const root = document.createElement('div');
  css(root, 'position:fixed;inset:0;pointer-events:none;z-index:6;font-family:system-ui,sans-serif;color:#fff;text-shadow:0 2px 6px #000');
  document.body.appendChild(root);

  const top = document.createElement('div');
  css(top, 'position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:170px');
  const time = document.createElement('div');
  css(time, 'display:flex;align-items:center;gap:8px;font:800 26px system-ui;letter-spacing:1px');
  const glass = document.createElement('span');
  css(glass, 'display:inline-block;width:20px;height:28px');
  glass.innerHTML =
    '<svg viewBox="0 0 20 28" width="20" height="28"><path d="M2 1h16M2 27h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M4 1c0 8 6 9 6 13s-6 5-6 13M16 1c0 8-6 9-6 13s6 5 6 13" fill="none" stroke="#fff" stroke-width="1.6"/><path class="sand" d="M6 24h8c-1-3-3-4-4-4s-3 1-4 4z" fill="#f1c232"/></svg>';
  const clock = document.createElement('span');
  time.append(glass, clock);
  const label = document.createElement('div');
  css(label, 'font:700 12px system-ui;letter-spacing:2px;opacity:.9');
  const icons = document.createElement('div');
  css(icons, 'display:flex;gap:6px');
  top.append(time, label, icons);
  root.appendChild(top);

  const left = document.createElement('div');
  css(left, 'position:absolute;right:12px;bottom:12px;display:flex;align-items:baseline;gap:8px;background:#000a;border-radius:12px;padding:6px 14px');
  const count = document.createElement('span');
  css(count, 'font:800 34px system-ui;line-height:1');
  const countLabel = Object.assign(document.createElement('span'), { textContent: 'hiders left' });
  css(countLabel, 'font:600 12px system-ui;opacity:.85');
  left.append(count, countLabel);
  root.appendChild(left);

  const banner = document.createElement('div');
  css(banner, 'position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:800 64px system-ui;letter-spacing:4px;text-shadow:0 4px 18px #000');
  root.appendChild(banner);

  const icon = (state: 'hidden' | 'caught') =>
    `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${state === 'caught' ? '#d33' : '#48c26a'};border:2px solid #fff;text-align:center;font:800 13px/18px system-ui">${state === 'caught' ? '✕' : '●'}</span>`;

  return {
    update(phase, secondsLeft, total, caught) {
      const s = Math.max(0, Math.ceil(secondsLeft));
      clock.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      label.textContent = phase === 'prep' ? 'HIDE! THE MASQUERADE IS COUNTING' : phase === 'hunt' ? 'THE HUNT IS ON' : phase === 'won' ? 'YOU SURVIVED' : 'CAUGHT';
      const sand = glass.querySelector('.sand') as SVGElement | null;
      if (sand) sand.style.opacity = phase === 'hunt' || phase === 'prep' ? '1' : '0.3';
      icons.innerHTML = Array.from({ length: total }, (_, i) => icon(i < caught ? 'caught' : 'hidden')).join('');
      count.textContent = String(Math.max(0, total - caught));
      const over = phase === 'won' || phase === 'lost';
      banner.style.display = over ? 'flex' : 'none';
      banner.textContent = phase === 'won' ? 'YOU SURVIVED!' : 'CAUGHT!';
      banner.style.background = phase === 'won' ? '#1c7a3a66' : '#8e1b1b66';
    },
  };
}
