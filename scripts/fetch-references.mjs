// Downloads moodboard reference images listed in raw-assets/references/manifest.json into raw-assets/references/<topic>/.
// These are other people's photos: they stay in the gitignored raw-assets/ folder, are for private reference only,
// and must never go into public/, dist/ or any committed file. The source page URL of every image is saved to sources.json.
//
// manifest.json (a local `file` works too): [{ "topic": "danfo", "commons": "Danfo Bus.jpg" }, { "topic": "market", "url": "<image url>", "page": "<page url>", "credit": "..." }]
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'raw-assets/references');
const UA = 'BojuBojuReferenceBot/0.1 (private moodboard, not redistributed; GitHub Emmanuel-Xs)';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
const sourcesFile = path.join(dir, 'sources.json');
const sources = JSON.parse(await readFile(sourcesFile, 'utf8').catch(() => '{}')); // { topic: [{file, page, image, title, credit, license}] }

async function get(url, headers = {}, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers }, redirect: 'follow' });
    if (res.status === 429 || res.status === 503) {
      await wait(4000 * (i + 1));
      continue;
    }
    return res;
  }
  throw new Error(`gave up on ${url}`);
}

async function commonsInfo(title) {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1100&titles=' +
    encodeURIComponent('File:' + title);
  const r = await (await get(api)).json();
  const p = Object.values(r.query.pages)[0];
  const i = p.imageinfo?.[0];
  if (!i) throw new Error(`not found on Commons: ${title}`);
  const m = i.extmetadata ?? {};
  const strip = (s) => (s ?? '').replace(/<[^>]+>/g, '').trim();
  return {
    image: i.thumburl ?? i.url,
    page: i.descriptionurl,
    title: title,
    credit: strip(m.Artist?.value),
    license: strip(m.LicenseShortName?.value),
  };
}

let added = 0;
let failed = 0;
for (const item of manifest) {
  try {
  const list = (sources[item.topic] ??= []);
  const key = item.commons ?? item.url ?? item.file;
  if (list.some((e) => e.key === key)) continue;
  if (item.file) {
    // a local file someone supplied (no download); keep its recorded source note
    const n = String(list.length + 1).padStart(2, '0');
    const ext = path.extname(item.file).slice(1) || 'jpg';
    await mkdir(path.join(dir, item.topic), { recursive: true });
    await writeFile(path.join(dir, item.topic, `${n}.${ext}`), await readFile(item.file));
    list.push({ key, file: `${n}.${ext}`, image: '(local file)', page: item.page, title: '', credit: item.credit ?? '', license: 'unknown (reference only)', note: item.note ?? '' });
    await writeFile(sourcesFile, JSON.stringify(sources, null, 2));
    added++;
    continue;
  }
  const info = item.commons ? await commonsInfo(item.commons) : { image: item.url, page: item.page, title: item.title ?? '', credit: item.credit ?? '', license: item.license ?? 'unknown (reference only)' };
  const res = await get(info.image, { Referer: info.page ?? '' });
  if (!res.ok) {
    console.warn(`skip ${key}: HTTP ${res.status}`);
    continue;
  }
  const type = res.headers.get('content-type') ?? '';
  const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
  const n = String(list.length + 1).padStart(2, '0');
  const file = `${n}.${ext}`;
  await mkdir(path.join(dir, item.topic), { recursive: true });
  await writeFile(path.join(dir, item.topic, file), Buffer.from(await res.arrayBuffer()));
  list.push({ key, file, ...info, note: item.note ?? '' });
  added++;
  console.log(`${item.topic}/${file}  <- ${info.page}`);
  await writeFile(sourcesFile, JSON.stringify(sources, null, 2));
  await wait(1200);
  } catch (err) {
    failed++;
    console.warn(`failed ${item.commons ?? item.url ?? item.file}: ${err.cause?.code ?? err.message}`);
  }
}
console.log(`added ${added} images, ${failed} failed (re-run to retry)`);
