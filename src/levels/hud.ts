// DOM HUD for hiding and painting: zone swatches, camo meter, debug text, crosshair, toast, and touch buttons.
import type * as THREE from 'three';
import type { PaintZone } from '../character';

const css = (el: HTMLElement, text: string) => (el.style.cssText = text);
const hex = (c: THREE.Color) => `#${c.getHexString()}`;

export interface Hud {
  setZones(top: THREE.Color, bottom: THREE.Color, selected: PaintZone, painted: Record<PaintZone, boolean>): void;
  setScore(score: number): void;
  setDebug(text: string): void;
  setDebugVisible(v: boolean): void;
  toast(msg: string): void;
  crosshair(show: boolean, x?: number, y?: number, valid?: boolean, swatch?: { color: THREE.Color; label: string } | null, dim?: boolean): void;
  setAiming(on: boolean): void;
  setPose(pose: string | null): void;
}

export interface HudHandlers {
  eyedropper(): void;
  zone(): void;
  pose(index: number): void;
}

const POSE_LABELS = ['1 Stiff', '2 Crouch', '3 Wall', '4 Ball'];
const POSE_NAMES = ['stand_stiff', 'crouch', 'wall_flat', 'curl_ball'];

export function createHud(touch: boolean, h: HudHandlers): Hud {
  const root = document.createElement('div');
  css(root, 'position:fixed;inset:0;pointer-events:none;z-index:6;font:12px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000');
  document.body.appendChild(root);

  // top-right panel: meter, swatches, debug text
  const panel = document.createElement('div');
  css(panel, 'position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch');
  root.appendChild(panel);

  const meterBox = document.createElement('div');
  css(meterBox, 'background:#000a;border-radius:6px;padding:6px 8px');
  const meterTop = document.createElement('div');
  css(meterTop, 'display:flex;justify-content:space-between;font-weight:600');
  const meterNum = Object.assign(document.createElement('span'), { textContent: '0' });
  meterTop.append(Object.assign(document.createElement('span'), { textContent: 'CAMO' }), meterNum);
  const bar = document.createElement('div');
  css(bar, 'height:10px;border-radius:5px;background:#fff3;margin-top:4px;overflow:hidden');
  const fill = document.createElement('div');
  css(fill, 'height:100%;width:0;border-radius:5px;background:#e33');
  bar.appendChild(fill);
  const poseLine = document.createElement('div');
  css(poseLine, 'margin-top:4px;opacity:.8;font-size:11px');
  meterBox.append(meterTop, bar, poseLine);

  const zoneBox = document.createElement('div');
  css(zoneBox, 'display:flex;gap:8px;background:#000a;border-radius:6px;padding:6px 8px;align-items:center');
  const swatches = {} as Record<PaintZone, { wrap: HTMLElement; chip: HTMLElement; note: HTMLElement }>;
  for (const zone of ['top', 'bottom'] as const) {
    const wrap = document.createElement('div');
    css(wrap, 'display:flex;align-items:center;gap:6px;padding:3px 6px;border-radius:5px;border:2px solid transparent');
    const sw = document.createElement('div');
    css(sw, 'width:26px;height:26px;border-radius:4px;border:1px solid #fff9');
    const text = document.createElement('div');
    const note = document.createElement('div');
    css(note, 'font-size:10px;opacity:.75');
    text.append(Object.assign(document.createElement('div'), { textContent: zone }), note);
    wrap.append(sw, text);
    zoneBox.appendChild(wrap);
    swatches[zone] = { wrap, chip: sw, note };
  }
  panel.append(meterBox, zoneBox);

  const debug = document.createElement('pre');
  css(debug, 'margin:0;background:#000b;border-radius:6px;padding:6px 8px;font:10px/1.45 monospace;white-space:pre-wrap;word-break:break-word');
  panel.appendChild(debug);

  // toast
  const toastEl = document.createElement('div');
  css(toastEl, 'position:absolute;left:50%;top:14%;transform:translateX(-50%);background:#000a;padding:6px 12px;border-radius:14px;opacity:0;transition:opacity .25s;font-size:13px;white-space:nowrap');
  root.appendChild(toastEl);
  let toastTimer = 0;

  // crosshair with a colour preview chip
  const cross = document.createElement('div');
  css(cross, 'position:absolute;left:0;top:0;width:0;height:0;display:none');
  const ring = document.createElement('div');
  css(ring, 'position:absolute;left:-18px;top:-18px;width:32px;height:32px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #000a');
  const dot = document.createElement('div');
  css(dot, 'position:absolute;left:-4px;top:-4px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px #000a');
  const previewBox = document.createElement('div');
  css(previewBox, 'position:absolute;left:24px;top:14px;display:flex;align-items:center;gap:6px;background:#000c;padding:3px 7px;border-radius:5px;white-space:nowrap');
  const previewColor = document.createElement('span');
  css(previewColor, 'width:16px;height:16px;border-radius:3px;border:1px solid #fff9;display:inline-block');
  const previewText = document.createElement('span');
  previewBox.append(previewColor, previewText);
  cross.append(ring, dot, previewBox);
  root.appendChild(cross);

  // touch buttons
  let eyeBtn: HTMLButtonElement | null = null;
  let poseBtns: HTMLButtonElement[] = [];
  if (touch) {
    const mk = (text: string, on: () => void, style: string) => {
      const b = document.createElement('button');
      b.textContent = text;
      css(b, `pointer-events:auto;touch-action:manipulation;position:absolute;font:600 12px system-ui;color:#fff;background:#000a;border:2px solid #fff8;border-radius:26px;${style}`);
      b.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        on();
      });
      root.appendChild(b);
      return b;
    };
    eyeBtn = mk('Eyedropper', h.eyedropper, 'right:12px;bottom:84px;width:92px;height:48px');
    mk('Zone', h.zone, 'right:12px;bottom:28px;width:92px;height:44px');
    poseBtns = POSE_LABELS.map((l, i) => mk(l, () => h.pose(i), `left:${12 + i * 70}px;bottom:28px;width:64px;height:44px;border-radius:12px`));
  }

  return {
    setZones(top, bottom, selected, painted) {
      for (const [zone, c] of [['top', top], ['bottom', bottom]] as const) {
        const s = swatches[zone];
        s.chip.style.background = hex(c);
        s.wrap.style.borderColor = zone === selected ? '#fff' : 'transparent';
        s.note.textContent = `${hex(c)}${painted[zone] ? '' : ' (unpainted)'}`;
      }
    },
    setScore(score) {
      meterNum.textContent = score.toFixed(0);
      fill.style.width = `${Math.min(100, Math.max(0, score))}%`;
      fill.style.background = score < 35 ? '#e5533d' : score < 65 ? '#e8b33a' : '#58c26a';
    },
    setDebug(text) {
      if (debug.textContent !== text) debug.textContent = text;
    },
    setDebugVisible(v) {
      debug.style.display = v ? 'block' : 'none';
    },
    toast(msg) {
      toastEl.textContent = msg;
      toastEl.style.opacity = '1';
      clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => (toastEl.style.opacity = '0'), 1600);
    },
    crosshair(show, x = 0, y = 0, valid = true, swatch = null, dim = false) {
      cross.style.display = show ? 'block' : 'none';
      if (!show) return;
      cross.style.transform = `translate(${x}px,${y}px)`;
      cross.style.opacity = dim ? '0.45' : '1';
      const col = valid ? '#fff' : '#ff5a4a';
      ring.style.borderColor = col;
      dot.style.background = col;
      previewBox.style.display = swatch ? 'flex' : 'none';
      if (swatch) {
        previewColor.style.background = hex(swatch.color);
        previewText.textContent = `${swatch.label} ${hex(swatch.color)}${valid ? '' : ' (too far)'}`;
      }
    },
    setAiming(on) {
      if (eyeBtn) eyeBtn.style.background = on ? '#2a7fffcc' : '#000a';
    },
    setPose(pose) {
      poseLine.textContent = pose ? `pose: ${pose}` : 'pose: none (moving breaks a pose)';
      const idx = POSE_NAMES.indexOf(pose ?? '');
      poseBtns.forEach((b, i) => (b.style.background = i === idx ? '#2a7fffcc' : '#000a'));
    },
  };
}
