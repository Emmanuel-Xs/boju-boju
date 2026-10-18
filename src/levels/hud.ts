// DOM HUD for hiding and painting: zone swatches, camo meter, debug text, crosshair, toast, and touch buttons.
import * as THREE from 'three';
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
  /** Which paint pattern is on (the Pattern button shows it). */
  setPattern(kind: 'solid' | 'stripes' | 'dots'): void;
  /** Colours picked so far, newest first; clicking one paints the selected zone with it. */
  setRecent(items: { color: THREE.Color; label: string }[]): void;
  toggleLegend(): void;
  /** Show or hide the controls card (not on touch, where it never shows). */
  setLegend(show: boolean): void;
  togglePalette(): void;
  /** Hide or show the whole painting HUD (the lobby and the results screen have none). */
  show(visible: boolean): void;
  /** Move the palette down to make room for the profile card. */
  setPaletteTop(px: number): void;
}

export interface HudHandlers {
  eyedropper(): void;
  zone(): void;
  pattern(): void;
  uniform(): void;
  selectZone(zone: PaintZone): void;
  recent(index: number): void;
  pose(index: number): void;
  jump(): void;
  /** A swatch from the palette (already scaled by the brightness bar). */
  palette(color: THREE.Color, name: string): void;
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
  const narrow = () => innerWidth < 600;

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
  css(zoneBox, 'display:flex;flex-wrap:wrap;gap:4px 8px;background:#000a;border-radius:6px;padding:6px 8px;align-items:center');
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
  for (const zone of ['top', 'bottom'] as const) {
    const w = swatches[zone].wrap;
    css(w, w.style.cssText + ';pointer-events:auto;cursor:pointer');
    w.title = `Paint the ${zone} (Q switches)`;
    w.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      h.selectZone(zone);
    });
  }

  // eyedropper banner and the recently picked colours
  const banner = document.createElement('div');
  css(banner, 'display:none;background:#2a7fffd9;border-radius:6px;padding:6px 8px;font-weight:600;font-size:12px;line-height:1.35');
  const recentBox = document.createElement('div');
  css(recentBox, 'display:none;background:#000a;border-radius:6px;padding:6px 8px');
  const recentLabel = Object.assign(document.createElement('div'), { textContent: 'Recent colours (click to paint the selected zone)' });
  css(recentLabel, 'font-size:10px;opacity:.75;margin-bottom:4px');
  const recentRow = document.createElement('div');
  css(recentRow, 'display:flex;flex-wrap:wrap;gap:5px');
  recentBox.append(recentLabel, recentRow);
  panel.append(banner, meterBox, zoneBox, recentBox);

  const debug = document.createElement('pre');
  css(debug, 'margin:0;background:#000b;border-radius:6px;padding:6px 8px;font:10px/1.45 monospace;white-space:pre-wrap;word-break:break-word');
  panel.appendChild(debug);

  // controls legend: big keycaps on a dark card, bottom centre (hidden on touch, where the buttons say it all)
  const legend = document.createElement('div');
  css(legend, 'position:absolute;left:50%;bottom:12px;transform:translateX(-50%);display:' + (touch ? 'none' : 'flex') + ';gap:6px 18px;flex-wrap:wrap;justify-content:center;max-width:min(1100px,calc(100% - 24px));background:#000d;border:1px solid #fff3;border-radius:10px;padding:8px 14px;font:600 14px/1.2 system-ui,sans-serif;color:#fff;text-shadow:none');
  const kbd = (t: string) => `<kbd style="display:inline-block;min-width:22px;text-align:center;padding:3px 7px;margin:0 2px;border:1px solid #fffa;border-bottom-width:3px;border-radius:6px;background:#ffffff26;font:700 13px ui-monospace,monospace">${t}</kbd>`;
  const group = (label: string, body: string) => `<span style="display:inline-flex;align-items:center;gap:4px"><span style="opacity:.65;font-weight:500;margin-right:3px">${label}</span>${body}</span>`;
  legend.innerHTML = [
    group('Move', kbd('W') + kbd('A') + kbd('S') + kbd('D')),
    group('Run', kbd('Shift')),
    group('Jump / climb', kbd('Space')),
    group('Eyedropper', kbd('E') + ' then click'),
    group('Zone', kbd('Q')),
    group('Pattern', kbd('T')),
    group('Uniform', kbd('U')),
    group('Poses', kbd('1') + kbd('2') + kbd('3') + kbd('4')),
    group('Hunt mode', kbd('H')),
    group('Camo text', kbd('C')),
    group('Hiding spots', kbd('M')),
    group('Hide this', kbd('K')),
  ].join('');
  root.appendChild(legend);

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

  // palette in the style of Meccha Chameleon's painting UI: a swatch grid and a brightness bar, top left
  const PALETTE: [string, string][] = [
    ['#479fe0', 'Lagos sky'], ['#ccccc2', 'Harmattan haze'], ['#d88b47', 'Late sun'], ['#92572f', 'Red earth'],
    ['#514d48', 'Shadow'], ['#301e16', 'Dark wood'], ['#e8bf1a', 'Danfo yellow'], ['#2fa59b', 'Compound turquoise'],
    ['#e8dcb8', 'Cream plaster'], ['#a8322d', 'Door red'], ['#2a5db0', 'Drum blue'], ['#2f7d3a', 'Door green'],
  ];
  const palette = document.createElement('div');
  css(palette, `position:absolute;left:${touch ? 8 : 74}px;top:8px;background:#000b;border-radius:8px;padding:8px 10px;width:${touch ? 'fit-content' : '176px'};pointer-events:auto;display:${touch ? 'none' : 'block'}`);
  const palTitle = document.createElement('div');
  css(palTitle, 'font:700 12px system-ui;margin-bottom:6px;display:flex;justify-content:space-between');
  palTitle.innerHTML = '<span>Palette</span><span style="opacity:.6;font-weight:500">P</span>';
  const grid = document.createElement('div');
  css(grid, `display:grid;grid-template-columns:repeat(4,${touch ? '46px' : '1fr'});gap:6px`);
  const bright = document.createElement('input');
  bright.type = 'range';
  bright.min = '45';
  bright.max = '150';
  bright.value = '100';
  css(bright, `width:100%;margin:8px 0 0;accent-color:#f1c232;height:${touch ? 44 : 16}px;touch-action:none`);
  const brightLabel = Object.assign(document.createElement('div'), { textContent: 'Brightness' });
  css(brightLabel, 'font:11px system-ui;opacity:.75;margin-top:6px');
  const shown = (c: string) => {
    const col = new THREE.Color(c).multiplyScalar(Number(bright.value) / 100);
    return col;
  };
  const swatchButtons: [HTMLButtonElement, string][] = [];
  for (const [c, name] of PALETTE) {
    const b = document.createElement('button');
    css(b, `height:${touch ? 46 : 30}px;border-radius:6px;border:2px solid #fffb;cursor:pointer;padding:0`);
    b.title = `${name} ${c}`;
    b.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      h.palette(shown(c), name);
    });
    grid.appendChild(b);
    swatchButtons.push([b, c]);
  }
  const refreshSwatches = () => swatchButtons.forEach(([b, c]) => (b.style.background = hex(shown(c))));
  refreshSwatches();
  bright.addEventListener('input', refreshSwatches);
  bright.addEventListener('pointerdown', (e) => e.stopPropagation());
  palette.append(palTitle, grid, brightLabel, bright);
  root.appendChild(palette);

  // buttons: a vertical tool bar down the left edge on desktop (like the game's tool icons), thumb buttons on touch
  let eyeBtn: HTMLButtonElement | null = null;
  let patternBtn: HTMLButtonElement | null = null;
  let poseBtns: HTMLButtonElement[] = [];
  const tools = document.createElement('div');
  css(tools, 'position:absolute;left:8px;top:50%;transform:translateY(-50%);display:' + (touch ? 'none' : 'flex') + ';flex-direction:column;gap:6px');
  root.appendChild(tools);
  const mk = (text: string, on: () => void, style: string, parent: HTMLElement = root) => {
    const b = document.createElement('button');
    b.textContent = text;
    css(b, `pointer-events:auto;touch-action:manipulation;font:600 12px system-ui;color:#fff;background:#000a;border:2px solid #fff8;cursor:pointer;${style}`);
    b.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      on();
    });
    parent.appendChild(b);
    return b;
  };
  const togglePalette = () => {
    palette.style.display = palette.style.display === 'none' ? 'block' : 'none';
  };
  // phones: the meter and swatches sit under the profile card on the left, so the round bar has the top right to itself
  const layout = () => {
    if (narrow()) {
      panel.style.cssText = 'position:absolute;top:60px;left:8px;width:158px;display:flex;flex-direction:column;gap:6px;align-items:stretch';
      palette.style.left = '8px';
      palette.style.top = '300px';
    } else {
      panel.style.cssText = 'position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch';
      palette.style.left = touch ? '8px' : '74px';
      palette.style.top = '8px';
    }
  };
  layout();
  addEventListener('resize', layout);
  if (touch) {
    const abs = 'position:absolute;border-radius:26px;';
    const poseW = 58; // four pose buttons fit left of the thumb column on a 390 px phone
    eyeBtn = mk('Eyedropper', h.eyedropper, abs + 'right:12px;bottom:196px;width:100px;height:52px');
    mk('Palette', togglePalette, abs + 'right:12px;bottom:140px;width:100px;height:46px');
    mk('Zone', h.zone, abs + 'right:12px;bottom:84px;width:100px;height:46px');
    patternBtn = mk('Pattern: solid', h.pattern, abs + 'right:120px;bottom:84px;width:96px;height:46px;font-size:12px');
    mk('Uniform', h.uniform, abs + 'right:120px;bottom:136px;width:96px;height:46px;font-size:12px');
    mk('Jump', h.jump, abs + 'right:12px;bottom:20px;width:100px;height:54px;background:#1a8a3acc');
    poseBtns = POSE_LABELS.map((l, i) => mk(l, () => h.pose(i), `${abs}left:${10 + i * (poseW + 4)}px;bottom:28px;width:${poseW}px;height:46px;border-radius:12px;font-size:11px`));
  } else {
    const tool = 'width:56px;height:46px;border-radius:12px;line-height:1.15;';
    eyeBtn = mk('Pick\n(E)', h.eyedropper, tool, tools);
    mk('Zone\n(Q)', h.zone, tool, tools);
    patternBtn = mk('Solid\n(T)', h.pattern, tool, tools);
    mk('School\n(U)', h.uniform, tool, tools);
    mk('Palette\n(P)', togglePalette, tool, tools);
    poseBtns = ['Stiff\n(1)', 'Crouch\n(2)', 'Wall\n(3)', 'Ball\n(4)'].map((l, i) => mk(l, () => h.pose(i), tool, tools));
    for (const b of [eyeBtn, ...poseBtns]) b.style.whiteSpace = 'pre';
    for (const b of tools.querySelectorAll('button')) (b as HTMLElement).style.whiteSpace = 'pre';
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
      banner.style.display = on ? 'block' : 'none';
      banner.textContent = touch ? 'EYEDROPPER: tap a surface within 4 m' : 'EYEDROPPER ON: click a surface within 4 m. Q switches zone, E or Esc stops';
    },
    setRecent(items) {
      recentBox.style.display = items.length ? 'block' : 'none';
      recentRow.replaceChildren(
        ...items.map((it, i) => {
          const b = document.createElement('button');
          css(b, `pointer-events:auto;cursor:pointer;width:24px;height:24px;border-radius:5px;border:2px solid #fffb;padding:0;background:${hex(it.color)}`);
          b.title = `${it.label} ${hex(it.color)}`;
          b.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            h.recent(i);
          });
          return b;
        }),
      );
    },
    setLegend(show) {
      if (!touch) legend.style.display = show ? 'flex' : 'none';
    },
    toggleLegend() {
      legend.style.display = legend.style.display === 'none' ? 'flex' : 'none';
    },
    togglePalette,
    show(v) {
      root.style.display = v ? 'block' : 'none';
    },
    setPaletteTop(px) {
      if (!narrow()) palette.style.top = `${px}px`;
    },
    setPattern(kind) {
      if (!patternBtn) return;
      const name = kind === 'solid' ? 'Solid' : kind === 'stripes' ? 'Stripes' : 'Dots';
      patternBtn.textContent = touch ? `Pattern: ${name.toLowerCase()}` : `${name}\n(T)`;
      patternBtn.style.background = kind === 'solid' ? '#000a' : '#7a5ad0cc';
    },
    setPose(pose) {
      poseLine.textContent = pose ? `pose: ${pose}` : 'pose: none (moving breaks a pose)';
      const idx = POSE_NAMES.indexOf(pose ?? '');
      poseBtns.forEach((b, i) => (b.style.background = i === idx ? '#2a7fffcc' : '#000a'));
    },
  };
}
