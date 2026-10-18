// Sounds we make ourselves (so they are ours, no licence needed): the masquerade's raffia fringe and ankle bells, which no CC0 library had.
// Deterministic (seeded) 16-bit mono WAVs are written to raw-assets/audio/, where convert-audio.mjs picks them up. Part of `npm run convert`.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 44100;
const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../raw-assets/audio');
mkdirSync(out, { recursive: true });

const rng = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

function wav(name, samples) {
  let peak = 0;
  for (const v of samples) peak = Math.max(peak, Math.abs(v));
  const gain = peak > 0 ? 0.8 / peak : 1;
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(samples.length * 2, 40);
  samples.forEach((v, i) => buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v * gain)) * 32767), 44 + i * 2));
  writeFileSync(path.join(out, `${name}.wav`), buf);
}

/** Dry raffia: a swell of high, papery noise broken into many tiny random bursts. */
function raffia(seed, seconds) {
  const r = rng(seed);
  const n = Math.floor(SR * seconds);
  const env = new Float32Array(n);
  for (let b = 0; b < 26; b++) {
    const at = Math.floor(r() * n * 0.8);
    const len = Math.floor(SR * (0.004 + r() * 0.02));
    const amp = 0.3 + r() * 0.7;
    for (let i = 0; i < len && at + i < n; i++) env[at + i] += amp * (1 - i / len) ** 2;
  }
  const y = new Float32Array(n);
  let lp = 0;
  let hp = 0;
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const swell = Math.min(1, t / 0.05) * Math.exp(-t / (seconds * 0.45));
    const white = r() * 2 - 1;
    lp += (white - lp) * 0.55; // take the harshest top off
    hp = 0.92 * (hp + lp - prev); // and the rumble
    prev = lp;
    y[i] = hp * (0.25 + env[i]) * swell;
  }
  return y;
}

/** A cluster of small brass bells (ankle bells): inharmonic partials, staggered strikes, short decays. */
function bells(seed, seconds) {
  const r = rng(seed);
  const n = Math.floor(SR * seconds);
  const y = new Float32Array(n);
  const count = 6;
  for (let b = 0; b < count; b++) {
    const f0 = 2300 + r() * 2300;
    const start = Math.floor(SR * r() * 0.12);
    const decay = 0.07 + r() * 0.16;
    const amp = 0.45 + r() * 0.55;
    for (let i = start; i < n; i++) {
      const t = (i - start) / SR;
      const e = Math.exp(-t / decay);
      if (e < 0.002) break;
      y[i] += amp * e * (Math.sin(2 * Math.PI * f0 * t) + 0.45 * Math.sin(2 * Math.PI * f0 * 2.76 * t) + 0.2 * Math.sin(2 * Math.PI * f0 * 5.4 * t));
    }
  }
  return y;
}

wav('sfx_raffia_01', raffia(11, 0.5));
wav('sfx_raffia_02', raffia(23, 0.6));
wav('sfx_bells_01', bells(5, 0.7));
wav('sfx_bells_02', bells(9, 0.7));
console.log('made sfx_raffia_01/02 and sfx_bells_01/02 in raw-assets/audio/');
