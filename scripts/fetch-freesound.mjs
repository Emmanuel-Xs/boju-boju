// Freesound CC0 fetcher. The key is read from the FREESOUND_API_KEY environment variable only; it is never written anywhere.
//   node scripts/fetch-freesound.mjs search "<query>" [minSec] [maxSec]   -> list CC0 candidates
//   node scripts/fetch-freesound.mjs get <out_name> <freesound_id>        -> download the preview-hq-ogg to raw-assets/audio/
// Previews need no OAuth. Provenance (id, author, URL, licence) is appended to raw-assets/audio/SOURCES.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const key = process.env.FREESOUND_API_KEY;
if (!key) {
  console.error('FREESOUND_API_KEY is not set; nothing to do.');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'raw-assets/audio');
const headers = { Authorization: `Token ${key}` };
const FIELDS = 'id,name,username,license,duration,previews,url,avg_rating,num_ratings,tags';

async function api(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Freesound ${res.status} ${res.statusText} for ${url.split('?')[0]}`);
  return res.json();
}

const [cmd, a, b, c] = process.argv.slice(2);
if (cmd === 'search') {
  const min = Number(b ?? 0.2);
  const max = Number(c ?? 30);
  const q = new URLSearchParams({
    query: a,
    filter: `license:"Creative Commons 0" duration:[${min} TO ${max}]`,
    fields: FIELDS,
    sort: 'rating_desc',
    page_size: '10',
  });
  const r = await api(`https://freesound.org/apiv2/search/text/?${q}`);
  console.log(`## ${a}  (${r.count} CC0 results)`);
  for (const s of r.results) {
    console.log(`${String(s.id).padEnd(9)} ${s.duration.toFixed(1).padStart(5)}s  ★${(s.avg_rating ?? 0).toFixed(1)}(${s.num_ratings})  ${s.name.slice(0, 48).padEnd(48)} ${s.username}  [${s.tags.slice(0, 5).join(',')}]`);
  }
} else if (cmd === 'get') {
  const s = await api(`https://freesound.org/apiv2/sounds/${encodeURIComponent(b)}/?fields=${FIELDS}`);
  if (!/publicdomain\/zero|Creative Commons 0/i.test(s.license)) throw new Error(`not CC0: ${s.license}`);
  const res = await fetch(s.previews['preview-hq-ogg']);
  if (!res.ok) throw new Error(`preview download failed: ${res.status}`);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${a}.ogg`), Buffer.from(await res.arrayBuffer()));
  const file = path.join(dir, 'SOURCES.json');
  const all = JSON.parse(await readFile(file, 'utf8').catch(() => '{}'));
  all[a] = { id: s.id, name: s.name, author: s.username, url: s.url, license: s.license, duration: s.duration };
  await writeFile(file, JSON.stringify(all, null, 2) + '\n');
  console.log(`${a}.ogg <- ${s.url} (${s.username}, ${s.duration.toFixed(1)}s)`);
} else {
  console.error('usage: search "<query>" [min] [max] | get <out_name> <id>');
  process.exit(1);
}
