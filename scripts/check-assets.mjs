// Fails if dist/ would be rejected or partially skipped by start.ng.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, process.argv[2] ?? 'dist');

const SERVED = new Set([
  'html', 'htm', 'css', 'js', 'mjs', 'json', 'map', 'txt', 'svg',
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico',
  'woff', 'woff2', 'ttf', 'otf',
  'mp3', 'ogg', 'wav', 'mp4', 'webm',
  'wasm',
]);
const MAX_FILE = 25 * 1024 * 1024;
const MAX_TOTAL = 100 * 1024 * 1024;
const MAX_FILES = 2000;

const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push({ p, size: (await stat(p)).size, link: e.isSymbolicLink() });
  }
}

try {
  await walk(dist);
} catch {
  console.error(`FAIL: ${path.relative(root, dist)}/ not found. Run the build first.`);
  process.exit(1);
}

const errors = [];
let total = 0;
for (const f of files) {
  const rel = path.relative(dist, f.p);
  const ext = path.extname(f.p).slice(1).toLowerCase();
  total += f.size;
  if (!SERVED.has(ext)) errors.push(`unserved extension ".${ext}": ${rel}`);
  if (f.size > MAX_FILE) errors.push(`over 25 MB (${(f.size / 1048576).toFixed(1)} MB): ${rel}`);
  if (f.link) errors.push(`symlink (start.ng skips links): ${rel}`);
  if (path.basename(f.p).startsWith('.')) errors.push(`hidden file (start.ng skips it): ${rel}`);
}
if (files.length > MAX_FILES) errors.push(`too many files: ${files.length} > ${MAX_FILES}`);
if (total > MAX_TOTAL) errors.push(`total ${(total / 1048576).toFixed(1)} MB > 100 MB`);
if (!files.some((f) => path.relative(dist, f.p) === 'index.html')) errors.push('dist/index.html missing');

console.log(`${files.length} files, ${(total / 1048576).toFixed(2)} MB in ${path.relative(root, dist)}/`);
if (errors.length) {
  console.error(errors.map((e) => `FAIL: ${e}`).join('\n'));
  process.exit(1);
}
console.log('OK: all files are servable and within limits.');
