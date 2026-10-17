// Generates public/debug/contact-sheet.html (+ a small three.js vendor bundle) listing every converted asset.
// Review it with `npm run dev` -> /debug/contact-sheet.html. scripts/strip-debug.mjs keeps it out of dist/.
import { readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const outDir = path.join(pub, 'debug');
await mkdir(outDir, { recursive: true });

// 1. tiny vendor bundle: only what the sheet uses, so the debug folder stays small
const entry = path.join(root, 'scripts/_debug-vendor-entry.js');
await writeFile(
  entry,
  `export { WebGLRenderer, Scene, PerspectiveCamera, Box3, Vector3, HemisphereLight, DirectionalLight, Color, SRGBColorSpace, ACESFilmicToneMapping, Mesh } from 'three';
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';\n`,
);
await build({
  root,
  configFile: false,
  publicDir: false, // otherwise vite copies public/ into public/debug
  logLevel: 'warn',
  build: {
    lib: { entry, formats: ['es'], fileName: () => 'vendor.js' },
    outDir,
    emptyOutDir: false,
    minify: true,
  },
});
await (await import('node:fs/promises')).rm(entry);

// 2. asset lists
const list = async (dir, ext) => {
  const full = path.join(pub, dir);
  const names = (await readdir(full).catch(() => [])).filter((f) => f.endsWith(ext)).sort();
  return Promise.all(names.map(async (f) => ({ file: f, kb: Math.round((await stat(path.join(full, f))).size / 102.4) / 10 })));
};
const data = {
  models: await list('models', '.json'),
  audio: await list('audio', '.ogg'),
  surfaces: await list('textures/surfaces', '.webp'),
};

// 3. page
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Boju Boju asset contact sheet</title>
<style>
  :root{color-scheme:dark light;--bg:#14161a;--fg:#e8e8ea;--card:#1f2228;--mut:#9aa0a8;--acc:#ffb400}
  @media (prefers-color-scheme:light){:root{--bg:#f4f4f6;--fg:#1b1d21;--card:#fff;--mut:#666c75}}
  body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:14px/1.4 system-ui,sans-serif}
  h1{font-size:20px;margin:0 0 4px} h2{font-size:16px;margin:28px 0 8px} p{color:var(--mut);margin:0 0 8px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
  .card{background:var(--card);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:4px;min-width:0}
  .card img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:6px;background:#8fc7e8}
  .name{font-weight:600;word-break:break-all} .meta{color:var(--mut);font-size:12px}
  label{display:flex;gap:6px;align-items:center;cursor:pointer;font-size:12px;color:var(--mut)}
  .audio{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:6px}
  .arow{background:var(--card);border-radius:8px;padding:6px 8px;display:flex;gap:8px;align-items:center}
  .arow button{font:inherit;padding:4px 10px;cursor:pointer}
  .arow .name{flex:1;font-weight:500}
  textarea{width:100%;min-height:120px;background:var(--card);color:var(--fg);border:1px solid #0003;border-radius:8px;padding:8px;font:12px monospace;box-sizing:border-box}
  button.copy{font:inherit;padding:6px 12px;margin:6px 0;cursor:pointer}
</style></head><body>
<h1>Boju Boju asset contact sheet</h1>
<p>Tick anything that doesn't fit; the list at the bottom is a ready-to-run delete command.</p>

<h2 id="hm">Models (${data.models.length})</h2><div class="grid" id="models"></div>
<h2>Surface textures (${data.surfaces.length})</h2><div class="grid" id="surfaces"></div>
<h2>Audio (${data.audio.length}) <span id="atotal" style="color:var(--mut);font-weight:400"></span></h2><div class="audio" id="audio"></div>

<h2>Remove list</h2>
<textarea id="rm" readonly placeholder="Tick items above"></textarea>
<button class="copy" id="copy">Copy</button>

<script type="module">
import { WebGLRenderer, Scene, PerspectiveCamera, Box3, Vector3, HemisphereLight, DirectionalLight, Color, SRGBColorSpace, GLTFLoader, Mesh } from './vendor.js';
const DATA = ${JSON.stringify(data)};
const picked = new Set();
const rm = document.getElementById('rm');
function tick(path, on) {
  on ? picked.add(path) : picked.delete(path);
  rm.value = picked.size ? 'rm -rf \\\\\\n  ' + [...picked].map((p) => '"' + p + '"').join(' \\\\\\n  ') : '';
}
const check = (paths) => {
  const l = document.createElement('label');
  const c = document.createElement('input'); c.type = 'checkbox';
  c.onchange = () => paths.forEach((p) => tick(p, c.checked));
  l.append(c, 'remove');
  return l;
};
const card = (img, name, meta, paths) => {
  const d = document.createElement('div'); d.className = 'card';
  const n = document.createElement('div'); n.className = 'name'; n.textContent = name;
  const m = document.createElement('div'); m.className = 'meta'; m.textContent = meta;
  d.append(img, n, m, check(paths));
  return d;
};

// surfaces
for (const s of DATA.surfaces) {
  const img = new Image(); img.src = '../textures/surfaces/' + s.file; img.loading = 'lazy';
  document.getElementById('surfaces').append(card(img, s.file.replace('.webp', ''), s.kb + ' KB', ['public/textures/surfaces/' + s.file]));
}

// audio
let abytes = 0;
let current = null;
for (const a of DATA.audio) {
  abytes += a.kb;
  const row = document.createElement('div'); row.className = 'arow';
  const b = document.createElement('button'); b.textContent = '\\u25B6';
  const audio = new Audio('../audio/' + a.file); audio.preload = 'metadata';
  const dur = document.createElement('span'); dur.className = 'meta'; dur.textContent = a.kb + ' KB';
  audio.onloadedmetadata = () => (dur.textContent = audio.duration.toFixed(2) + 's, ' + a.kb + ' KB');
  audio.onerror = () => (dur.textContent = 'failed to load');
  audio.onended = () => (b.textContent = '\\u25B6');
  b.onclick = () => {
    if (current && current !== audio) { current.pause(); current.currentTime = 0; }
    if (audio.paused) { audio.currentTime = 0; audio.play(); b.textContent = '\\u25A0'; current = audio; } else { audio.pause(); b.textContent = '\\u25B6'; }
  };
  const n = document.createElement('span'); n.className = 'name'; n.textContent = a.file.replace('.ogg', '');
  row.append(b, n, dur, check(['public/audio/' + a.file]));
  document.getElementById('audio').append(row);
}
document.getElementById('atotal').textContent = '\\u2014 ' + (abytes / 1024).toFixed(2) + ' MB total';

// models: render each into one offscreen renderer and keep the picture
const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(360, 360, false);
renderer.outputColorSpace = SRGBColorSpace;
const scene = new Scene(); scene.background = new Color('#8fc7e8');
scene.add(new HemisphereLight(0xffffff, 0x8a7a66, 1.6));
const sun = new DirectionalLight(0xffffff, 2.2); sun.position.set(3, 5, 4); scene.add(sun);
const camera = new PerspectiveCamera(35, 1, 0.01, 1000);
const loader = new GLTFLoader();
const host = document.getElementById('models');
for (const m of DATA.models) {
  const name = m.file.replace('.json', '');
  const img = new Image();
  const c = card(img, name, 'loading\\u2026', ['public/models/' + m.file, 'public/textures/' + name]);
  host.append(c);
  const meta = c.querySelector('.meta');
  try {
    const gltf = await loader.loadAsync('../models/' + m.file);
    let tris = 0;
    gltf.scene.traverse((o) => { if (o instanceof Mesh) tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3; });
    scene.add(gltf.scene);
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3()); const center = box.getCenter(new Vector3());
    const r = Math.max(size.x, size.y, size.z) * 0.5 || 1;
    const dist = (r / Math.sin((camera.fov * Math.PI) / 360)) * 1.05;
    camera.position.copy(center).add(new Vector3(0.8, 0.6, 1).normalize().multiplyScalar(dist));
    camera.lookAt(center); camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL('image/png');
    scene.remove(gltf.scene);
    meta.textContent = Math.round(tris) + ' tris, ' + size.x.toFixed(1) + ' x ' + size.y.toFixed(1) + ' x ' + size.z.toFixed(1) + ', ' + m.kb + ' KB';
  } catch (e) {
    meta.textContent = 'FAILED: ' + e;
  }
}
document.getElementById('hm').append(' \\u2014 all rendered');
document.getElementById('copy').onclick = () => navigator.clipboard?.writeText(rm.value);
</script></body></html>
`;
await writeFile(path.join(outDir, 'contact-sheet.html'), html);
console.log(`wrote public/debug/contact-sheet.html (${data.models.length} models, ${data.surfaces.length} surfaces, ${data.audio.length} audio)`);
