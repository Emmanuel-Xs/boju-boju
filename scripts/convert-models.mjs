// GLB (raw-assets/models) -> glTF JSON with base64-embedded buffers (public/models/<name>.json).
// start.ng does not serve .glb/.gltf/.bin, so geometry travels inside a .json file.
// Textures are resized to <=512px webp and stay as separate files in public/textures/<name>/.
import { readdir, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, textureCompress } from '@gltf-transform/functions';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'raw-assets/models');
const outModels = path.join(root, 'public/models');
const outTextures = path.join(root, 'public/textures');
const MAX_TEX = 512;

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function convert(file) {
  // raw-assets/models/<pack>/<name>.glb -> output name "<pack>_<name>"
  const name = file.slice(0, -path.extname(file).length).split(path.sep).join('_');
  const doc = await io.read(path.join(srcDir, file));

  await doc.transform(
    prune(),
    dedup(),
    textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [MAX_TEX, MAX_TEX], quality: 80 }),
  );

  // Give each texture a unique, stable file name before serialising.
  doc.getRoot().listTextures().forEach((tex, i) => tex.setURI(`${name}_${i}.webp`));

  const { json, resources } = await io.writeJSON(doc, { basename: name });

  // Embed every buffer as base64.
  for (const buf of json.buffers ?? []) {
    const bytes = resources[buf.uri];
    buf.uri = `data:application/octet-stream;base64,${Buffer.from(bytes).toString('base64')}`;
  }

  // Textures: separate files, referenced relative to public/models/.
  const texDir = path.join(outTextures, name);
  await rm(texDir, { recursive: true, force: true });
  let texCount = 0;
  for (const img of json.images ?? []) {
    await mkdir(texDir, { recursive: true });
    await writeFile(path.join(texDir, img.uri), resources[img.uri]);
    img.uri = `../textures/${name}/${img.uri}`;
    texCount++;
  }

  await mkdir(outModels, { recursive: true });
  const out = path.join(outModels, `${name}.json`);
  await writeFile(out, JSON.stringify(json));
  const before = (await stat(path.join(srcDir, file))).size;
  const after = (await stat(out)).size;
  console.log(`${file} -> public/models/${name}.json  (${kb(before)} -> ${kb(after)}, ${texCount} texture(s))`);
}

const files = (await readdir(srcDir, { recursive: true }).catch(() => [])).filter((f) => f.toLowerCase().endsWith('.glb'));
if (!files.length) {
  console.log('No .glb files in raw-assets/models/, nothing to convert.');
}
for (const f of files) await convert(f);
