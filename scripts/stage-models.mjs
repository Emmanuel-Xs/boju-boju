// Copies the chosen GLBs out of the raw Kenney packs into raw-assets/models/ with a pack prefix,
// ready for convert-models.mjs. This list is the "what the three levels need" decision.
import { cp, copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKS = path.join(root, 'raw-assets/packs');
const OUT = path.join(root, 'raw-assets/models');

const PICKS = {
  sub: ['city-kit-suburban', ['building-type-a', 'building-type-d', 'building-type-h', 'fence', 'fence-low', 'fence-2x3', 'planter', 'tree-small']],
  car: ['car-kit', ['van', 'delivery', 'sedan', 'cone']],
  furn: ['furniture-kit', ['chair', 'chairRounded', 'chairDesk', 'table', 'tableRound', 'desk', 'bench', 'bookcaseClosed', 'bookcaseOpen', 'wall', 'wallWindow', 'wallDoorway', 'pottedPlant', 'radio']],
  surv: ['survival-kit', ['barrel', 'box', 'box-large', 'bucket', 'structure-canvas', 'metal-panel', 'structure-metal-roof', 'tent-canvas']],
  nat: ['nature-kit', ['plant_bush', 'plant_bushLarge', 'tree_palm', 'tree_palmShort', 'pot_large']],
};

async function find(dir, file) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      const hit = await find(p, file);
      if (hit) return hit;
    } else if (e.name === file) return p;
  }
  return null;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
let n = 0;
for (const [prefix, [pack, names]] of Object.entries(PICKS)) {
  for (const name of names) {
    const src = await find(path.join(PACKS, pack), `${name}.glb`);
    if (!src) throw new Error(`${pack}: ${name}.glb not found`);
    // one folder per pack: some GLBs point at a sibling Textures/colormap.png, and every pack has its own
    const dest = path.join(OUT, prefix);
    await mkdir(dest, { recursive: true });
    await copyFile(src, path.join(dest, `${name}.glb`));
    const tex = path.join(path.dirname(src), 'Textures');
    if (await stat(tex).then(() => true, () => false)) await cp(tex, path.join(dest, 'Textures'), { recursive: true });
    n++;
  }
}
console.log(`staged ${n} models`);
