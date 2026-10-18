// Procedural ankara cloth: six original repeating designs drawn on a canvas (nothing copied from any real print; the motifs are generic
// ones, fans, eyes, diamonds, waves, calabashes and chains, in our own colours). Each tiles seamlessly, and each knows its average colour,
// which is the base colour the eyedropper and the seeker read for any surface drawn in it.
import * as THREE from 'three';
import { PixelSampler, type TexInfo } from './kit';

export const ANKARA_KINDS = ['fans', 'eyes', 'diamonds', 'waves', 'calabash', 'chain'] as const;
export type AnkaraKind = (typeof ANKARA_KINDS)[number];

export const ANKARA_CONFIG = {
  /** Canvas size (px). The pattern repeats once per this many pixels. */
  size: 256,
};

type Ctx = CanvasRenderingContext2D;

/** Draws `fn` at the origin and at every wrap-around offset, so shapes that cross an edge continue on the other side. */
function tiled(ctx: Ctx, size: number, fn: (c: Ctx) => void): void {
  for (const dx of [-size, 0, size]) {
    for (const dy of [-size, 0, size]) {
      ctx.save();
      ctx.translate(dx, dy);
      fn(ctx);
      ctx.restore();
    }
  }
}

const disc = (c: Ctx, x: number, y: number, r: number, fill: string) => {
  c.fillStyle = fill;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
};

const DESIGNS: Record<AnkaraKind, (c: Ctx, s: number) => void> = {
  // overlapping scalloped fans, rows offset by half a fan
  fans(c, s) {
    c.fillStyle = '#1c2a6b';
    c.fillRect(0, 0, s, s);
    const n = 4;
    const step = s / n;
    const rings = [['#d8392b', 1], ['#f6efe0', 0.82], ['#f2b705', 0.64], ['#16a89a', 0.46], ['#1c2a6b', 0.28], ['#d8392b', 0.14]] as const;
    tiled(c, s, () => {
      for (let row = 0; row < n * 2; row++) {
        for (let col = 0; col < n + 1; col++) {
          const x = col * step + (row % 2 ? step / 2 : 0);
          const y = (row * step) / 2 + step / 2;
          for (const [color, k] of rings) {
            c.fillStyle = color;
            c.beginPath();
            c.arc(x, y, step * 0.5 * k, Math.PI, 0);
            c.closePath();
            c.fill();
          }
        }
      }
    });
  },
  // concentric "eyes" on a diagonal grid with dots between
  eyes(c, s) {
    c.fillStyle = '#f2a33a';
    c.fillRect(0, 0, s, s);
    const g = s / 4;
    tiled(c, s, () => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const x = i * g + g / 2 + (j % 2 ? g / 2 : 0);
          const y = j * g + g / 2;
          for (const [rx, ry, color] of [[g * 0.46, g * 0.3, '#17120f'], [g * 0.36, g * 0.22, '#f6efe0'], [g * 0.24, g * 0.15, '#0f8f86'], [g * 0.11, g * 0.11, '#17120f']] as const) {
            c.fillStyle = color;
            c.beginPath();
            c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
            c.fill();
          }
          disc(c, x, y + g / 2, 4, '#17120f');
          disc(c, x + g / 2, y, 4, '#b3261e');
        }
      }
    });
  },
  // nested diamonds with a dot in the middle
  diamonds(c, s) {
    c.fillStyle = '#146b4a';
    c.fillRect(0, 0, s, s);
    const g = s / 3;
    tiled(c, s, () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const x = i * g + g / 2;
          const y = j * g + g / 2;
          [['#f2b705', 0.5], ['#17120f', 0.4], ['#f6efe0', 0.3], ['#c2185b', 0.2]].forEach(([color, k]) => {
            const r = g * (k as number);
            c.fillStyle = color as string;
            c.beginPath();
            c.moveTo(x, y - r);
            c.lineTo(x + r, y);
            c.lineTo(x, y + r);
            c.lineTo(x - r, y);
            c.closePath();
            c.fill();
          });
          disc(c, x, y, 3.5, '#17120f');
          disc(c, x + g / 2, y + g / 2, 3, '#f6efe0');
        }
      }
    });
  },
  // horizontal wavy bands with dots between them
  waves(c, s) {
    c.fillStyle = '#0f4c9c';
    c.fillRect(0, 0, s, s);
    const bands = 8;
    const h = s / bands;
    tiled(c, s, () => {
      for (let b = 0; b < bands; b++) {
        const y0 = b * h + h / 2;
        c.lineWidth = h * 0.32;
        c.strokeStyle = b % 2 ? '#f6efe0' : '#f2c230';
        c.beginPath();
        for (let x = 0; x <= s; x += 4) {
          const y = y0 + Math.sin((x / s) * Math.PI * 4 + b) * h * 0.22;
          if (x === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        c.stroke();
        for (let x = 12; x < s; x += 32) disc(c, x + (b % 2) * 16, y0 + h * 0.46, 2.6, '#f6efe0');
      }
    });
  },
  // rows of calabash (pot) shapes alternating colours, with zigzag lines between rows
  calabash(c, s) {
    c.fillStyle = '#c2185b';
    c.fillRect(0, 0, s, s);
    const n = 4;
    const g = s / n;
    tiled(c, s, () => {
      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          const x = i * g + g / 2 + (j % 2 ? g / 2 : 0);
          const y = j * g + g * 0.58;
          const color = (i + j) % 2 ? '#f2c230' : '#17120f';
          disc(c, x, y, g * 0.26, color);
          c.fillStyle = color;
          c.fillRect(x - g * 0.07, y - g * 0.42, g * 0.14, g * 0.24);
          disc(c, x - g * 0.07, y - g * 0.04, g * 0.07, '#f6efe0');
        }
        c.strokeStyle = '#f6efe0';
        c.lineWidth = 3;
        c.beginPath();
        for (let x = 0; x <= s; x += g / 4) c.lineTo(x, j * g + (Math.round(x / (g / 4)) % 2 ? 8 : 0));
        c.stroke();
      }
    });
  },
  // an interlocking lattice of rings
  chain(c, s) {
    c.fillStyle = '#5b2a86';
    c.fillRect(0, 0, s, s);
    const n = 4;
    const g = s / n;
    tiled(c, s, () => {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const x = i * g + g / 2;
          const y = j * g + g / 2;
          c.lineWidth = g * 0.1;
          c.strokeStyle = (i + j) % 2 ? '#b5e61d' : '#f6efe0';
          c.beginPath();
          c.arc(x, y, g * 0.46, 0, Math.PI * 2);
          c.stroke();
          c.fillStyle = '#17120f';
          c.fillRect(x + g / 2 - 4, y + g / 2 - 4, 8, 8);
        }
      }
    });
  },
};

/** A repeating canvas texture for one design, with its average colour (linear). */
export function ankaraTexInfo(kind: AnkaraKind, size = ANKARA_CONFIG.size): TexInfo {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  DESIGNS[kind](ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return { name: `ankara_${kind}`, tex, avg: new PixelSampler(canvas, 32).average() };
}
