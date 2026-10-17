// Builds raw-assets/references/index.html, the private moodboard (one section per topic, thumbnails with source links,
// notes on what to copy and what to avoid). Reads sources.json (written by fetch-references.mjs) and notes.json.
// Output stays in the gitignored raw-assets/ folder.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'raw-assets/references');
const sources = JSON.parse(await readFile(path.join(dir, 'sources.json'), 'utf8'));
const notes = JSON.parse(await readFile(path.join(dir, 'notes.json'), 'utf8'));
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const figure = (topic, e) => {
  const meta = [e.credit && `by ${e.credit}`, e.license].filter(Boolean).join(' · ');
  const page = e.page && /^https?:/.test(e.page) ? `<a href="${esc(e.page)}" target="_blank" rel="noreferrer">source page</a>` : `<span>${esc(e.page)}</span>`;
  return `<figure><a href="${topic}/${e.file}" target="_blank"><img src="${topic}/${e.file}" alt=""></a>
    <figcaption>${page}<br><small>${esc(meta)}${e.note ? ` · ${esc(e.note)}` : ''}</small></figcaption></figure>`;
};

const sections = notes.topics.map((t) => {
  const imgs = (sources[t.id] ?? []).map((e) => figure(t.id, e)).join('\n');
  const swatches = t.palette
    ? `<div class="sw">${t.palette.map(([hex, name]) => `<div><i style="background:${hex}"></i><b>${hex}</b><small>${esc(name)}</small></div>`).join('')}</div>`
    : '';
  return `<section id="${t.id}"><h2>${esc(t.title)}</h2>${swatches}<div class="grid">${imgs}</div>
  <ul>${t.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></section>`;
}).join('\n');

const a = notes.audio;
const audio = `<section id="audio"><h2>${esc(a.title)}</h2><p>${esc(a.intro)}</p>
  <ul class="links">${a.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.title)}</a> <small>${esc(l.by)} · ${esc(l.length)}</small><br>${esc(l.note)}</li>`).join('')}</ul>
  <p><b>Rhythm suggestion:</b> ${esc(a.rhythm)}</p></section>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Boju Boju reference moodboard</title>
<style>
:root{color-scheme:dark light;--bg:#15171b;--fg:#ececee;--card:#20232a;--mut:#9aa0a8;--acc:#e7b313}
@media (prefers-color-scheme:light){:root{--bg:#f4f4f6;--fg:#1b1d21;--card:#fff;--mut:#666c75}}
body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif;max-width:1200px;margin-inline:auto}
h1{margin:0 0 4px}h2{margin:36px 0 10px;border-bottom:2px solid var(--acc);padding-bottom:4px}p{color:var(--mut)}
nav a{margin-right:10px;color:var(--acc)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
figure{margin:0;background:var(--card);border-radius:8px;overflow:hidden}figure img{width:100%;height:190px;object-fit:cover;display:block}
figcaption{padding:6px 8px;font-size:12px}figcaption small{color:var(--mut)}
a{color:var(--acc)}ul{padding-left:20px}li{margin:6px 0}
.sw{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:10px}.sw div{display:flex;flex-direction:column;width:110px;font-size:12px}.sw i{height:44px;border-radius:6px;border:1px solid #0003}.sw small{color:var(--mut)}
.links li{margin:10px 0}
</style></head><body>
<h1>Boju Boju reference moodboard</h1><p>${esc(notes.intro)}</p>
<nav>${notes.topics.map((t) => `<a href="#${t.id}">${esc(t.title.split('.')[0])}</a>`).join('')}<a href="#audio">9</a></nav>
${sections}
${audio}
</body></html>`;
await writeFile(path.join(dir, 'index.html'), html);
console.log('wrote raw-assets/references/index.html');
