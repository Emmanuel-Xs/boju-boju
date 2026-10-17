// Raw CC0 audio (raw-assets/packs, raw-assets/audio) -> public/audio/*.ogg: mono, ~96 kbps Vorbis,
// silence trimmed to at most 0.5 s at each end, ambience loops (amb_*) made seamless with a tail/head crossfade.
// *_loop files are assumed to be bar-aligned already: they are only re-encoded, since trimming or crossfading would break the beat.
// Needs ffmpeg + ffprobe on PATH.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, existsSync, statSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKS = path.join(root, 'raw-assets/packs');
const EXTRA = path.join(root, 'raw-assets/audio'); // anything downloaded outside the Kenney packs (e.g. Freesound)
const OUT = path.join(root, 'public/audio');

const KENNEY = {
  imp: 'impact-sounds/Audio',
  ui: 'interface-sounds/Audio',
  rpg: 'rpg-audio/Audio',
  jin: 'music-jingles/Audio',
};

// output name -> [pack key, file in that pack's Audio folder]
const PICKS = {};
const add = (name, key, file) => (PICKS[name] = [key, file]);
for (let i = 0; i < 5; i++) {
  add(`sfx_step_concrete_0${i + 1}`, 'imp', `footstep_concrete_00${i}.ogg`);
  // Kenney has no sand footsteps; these soft leather-on-dirt steps are the closest stand-in
  add(`sfx_step_sand_0${i + 1}`, 'rpg', `footstep0${i}.ogg`);
}
for (let i = 0; i < 2; i++) {
  add(`sfx_hit_wood_0${i + 1}`, 'imp', `impactWood_medium_00${i}.ogg`);
  add(`sfx_hit_metal_0${i + 1}`, 'imp', `impactMetal_light_00${i}.ogg`);
  add(`sfx_hit_soft_0${i + 1}`, 'imp', `impactSoft_medium_00${i}.ogg`);
}
add('sfx_hit_tin_01', 'imp', 'impactTin_medium_000.ogg');
add('sfx_caught_thump', 'imp', 'impactPunch_heavy_000.ogg');
for (let i = 1; i <= 3; i++) add(`sfx_ui_click_0${i}`, 'ui', `click_00${i}.ogg`);
add('sfx_ui_back_01', 'ui', 'back_001.ogg');
add('sfx_ui_confirm_01', 'ui', 'confirmation_001.ogg');
add('sfx_ui_select_01', 'ui', 'select_001.ogg');
add('jingle_win', 'jin', 'Steel jingles/jingles_STEEL12.ogg');
add('jingle_caught', 'jin', 'Hit jingles/jingles_HIT15.ogg');

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });
const duration = (file) =>
  parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());

const TRIM = 'silenceremove=start_periods=1:start_silence=0.5:start_threshold=-50dB';
const TRIM_BOTH = `${TRIM},areverse,${TRIM},areverse`;
const isLoop = (name) => /^amb_/.test(name);
// Voice lines are levelled to one loudness (two-pass EBU R128) so they always sit above the ambience and music.
const isVoice = (name) => /^chant_|^caught$/.test(name);
const LOUD = 'I=-16:TP=-1.5:LRA=7';
function loudnormFilter(src, pre) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', src, '-af', `${pre},loudnorm=${LOUD}:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
  const m = r.stderr.match(/\{[^{}]*"input_i"[^{}]*\}/s);
  if (!m) return `loudnorm=${LOUD}`; // too short or silent to measure: single pass
  const j = JSON.parse(m[0]);
  return `loudnorm=${LOUD}:measured_I=${j.input_i}:measured_TP=${j.input_tp}:measured_LRA=${j.input_lra}:measured_thresh=${j.input_thresh}:offset=${j.target_offset}:linear=true`;
}
const isAligned = (name) => /_loop$/.test(name);
const ENC = ['-fflags', '+bitexact', '-flags:a', '+bitexact', '-ac', '1', '-ar', '44100', '-c:a', 'libvorbis', '-b:a', '96k'];

function convert(name, src, tmp) {
  const dest = path.join(OUT, `${name}.ogg`);
  if (isAligned(name)) {
    ff(['-i', src, ...ENC, dest]);
    return;
  }
  if (!isLoop(name)) {
    const chain = isVoice(name) ? `${TRIM_BOTH},${loudnormFilter(src, TRIM_BOTH)}` : TRIM_BOTH;
    ff(['-i', src, '-af', chain, ...ENC, dest]);
    return;
  }
  const wav = path.join(tmp, `${name}.wav`);
  ff(['-i', src, '-ac', '1', '-ar', '44100', '-af', TRIM_BOTH, wav]);
  const d = duration(wav);
  const x = Math.min(1, d / 4);
  // out = crossfade(tail -> head) then the middle: the file ends exactly where the tail began, so it loops without a seam
  const g =
    `[0:a]asplit=3[a][b][c];` +
    `[a]atrim=0:${x},asetpts=PTS-STARTPTS[head];` +
    `[b]atrim=${d - x}:${d},asetpts=PTS-STARTPTS[tail];` +
    `[c]atrim=${x}:${d - x},asetpts=PTS-STARTPTS[body];` +
    // equal-power crossfade done by hand (acrossfade returns nothing when the overlap equals the input length)
    `[tail]afade=t=out:d=${x}:curve=qsin[t2];[head]afade=t=in:d=${x}:curve=qsin[h2];` +
    `[t2][h2]amix=inputs=2:duration=longest:normalize=0[x];[x][body]concat=n=2:v=0:a=1[out]`;
  ff(['-i', wav, '-filter_complex', g, '-map', '[out]', ...ENC, dest]);
}

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), 'boju-audio-'));
let done = 0;
try {
  for (const [name, [key, file]] of Object.entries(PICKS)) {
    const src = path.join(PACKS, KENNEY[key], file);
    if (!existsSync(src)) throw new Error(`missing ${src}`);
    convert(name, src, tmp);
    done++;
  }
  // anything dropped into raw-assets/audio/<final_name>.{wav,mp3,ogg,flac} is converted under its own name
  if (existsSync(EXTRA)) {
    for (const f of readdirSync(EXTRA)) {
      if (!/\.(wav|mp3|ogg|flac)$/i.test(f)) continue;
      convert(path.basename(f, path.extname(f)), path.join(EXTRA, f), tmp);
      done++;
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

let bytes = 0;
for (const f of readdirSync(OUT)) if (f.endsWith('.ogg')) bytes += statSync(path.join(OUT, f)).size;
console.log(`converted ${done} clips -> public/audio/ (${(bytes / 1024).toFixed(0)} KB total)`);
