// ambientCG 1K colour maps (raw-assets/textures/<id>/<id>_1K-JPG_Color.jpg) -> public/textures/surfaces/<name>.webp, max 512px.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'raw-assets/textures');
const OUT = path.join(root, 'public/textures/surfaces');

// output name -> ambientCG asset id (all CC0, see CREDITS.md)
const SURFACES = {
  plaster_wall: 'Plaster002',
  painted_concrete: 'PaintedPlaster006',
  corrugated_metal: 'CorrugatedSteel005',
  rusty_metal: 'Metal021',
  dirt_ground: 'Ground109',
  sand: 'Ground080',
  old_wood: 'Wood035',
  cracked_tiles: 'Tiles133C',
};

await mkdir(OUT, { recursive: true });
for (const [name, id] of Object.entries(SURFACES)) {
  const src = path.join(SRC, id, `${id}_1K-JPG_Color.jpg`);
  const buf = await readFile(src).catch(() => null);
  if (!buf) {
    console.warn(`skip ${name}: ${path.relative(root, src)} not found`);
    continue;
  }
  const out = await sharp(buf).resize(512, 512, { fit: 'inside' }).webp({ quality: 80 }).toBuffer();
  await writeFile(path.join(OUT, `${name}.webp`), out);
  console.log(`${id} -> public/textures/surfaces/${name}.webp (${(out.length / 1024).toFixed(0)} KB)`);
}
