// Level 2: the market. A walled plaza, 30 m by 18 m, with the gate on the east side like the compound.
//   north wall   four fabric stalls, each with an ankara cloth hung on the wall behind a table (hide in the gap between table and cloth)
//   middle       produce: tomato and pepper crates, a heap of yams, rice sacks, palm-oil drums, bottle-crate steps, a washing line of cloths
//   south        "Mama Put" canteen: a long table with benches, a parasol, a drinks fridge, a sign board, gas cylinders
//   west         a mural wall in ankara, a container shop, a generator; east: a keke, an okada, a bus shelter, a water tank, the zinc fence and gate
// Every hideable surface is in the surface registry with a base colour (a printed cloth's base colour is the average of its pattern).
import * as THREE from 'three';
import { toon } from '../toon';
import { box, circle, type Collider, resolveCollisions, PLAYER_RADIUS } from './controller';
import { ANKARA_KINDS, ankaraTexInfo, type AnkaraKind } from './ankara';
import { FadeGroup, StaticBatch, SurfaceRegistry, loadModelParts, loadSurfaceTextures, instanceParts, propBaseColor, place, corrugatedSheet, type ModelPart, type Placement } from './kit';
import type { Compound, HidingSpot } from './compound';
import type { DirtPatch } from './ground';

const TEXTURES = ['plaster_wall', 'painted_concrete', 'corrugated_metal', 'rusty_metal', 'dirt_ground', 'old_wood', 'cracked_tiles'] as const;
const MODELS = ['surv_barrel', 'surv_box', 'surv_box-large', 'surv_bucket', 'car_cone', 'nat_tree_palm', 'nat_plant_bush'] as const;
export const MARKET_ASSET_COUNT = TEXTURES.length + MODELS.length;

const HALF = 15;
const DIRT: readonly DirtPatch[] = [
  { x: -9, z: 5.9, rx: 2.4, rz: 1.5 },
  { x: 7, z: -4.4, rx: 2.8, rz: 1.8 },
  { x: 12.2, z: 0, rx: 3.2, rz: 4.2 },
];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function decal(tex: THREE.Texture, w: number, h: number, x: number, y: number, z: number, ry: number): THREE.Mesh {
  const mat = toon('#ffffff', { map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.receiveShadow = true;
  m.userData.decal = true;
  return m;
}

export async function createMarket(onAsset?: () => void): Promise<Compound> {
  const [tx, ...partLists] = await Promise.all([loadSurfaceTextures(TEXTURES, onAsset), ...MODELS.map((m) => loadModelParts(m).then((p) => (onAsset?.(), p)))]);
  const models = Object.fromEntries(MODELS.map((m, i) => [m, partLists[i]])) as Record<(typeof MODELS)[number], ModelPart[]>;
  const T = tx as Record<(typeof TEXTURES)[number], NonNullable<(typeof tx)[string]>>;
  const cloth = Object.fromEntries(ANKARA_KINDS.map((k) => [k, ankaraTexInfo(k)])) as Record<AnkaraKind, ReturnType<typeof ankaraTexInfo>>;

  const group = new THREE.Group();
  group.name = 'market';
  const surfaces = new SurfaceRegistry();
  group.add(surfaces.group);
  const colliders: Collider[] = [];
  const fadeGroups: FadeGroup[] = [];
  const addMesh = (m: THREE.Object3D | null) => m && group.add(m);
  const surf = (id: string, label: string, kind: string, c: [number, number, number], s: [number, number, number], n: [number, number, number], base: THREE.Color) => surfaces.add(id, label, kind, c, s, n, base);
  const instanced = (name: (typeof MODELS)[number], placements: Placement[], opts: Parameters<typeof instanceParts>[2] = {}) => {
    for (const im of instanceParts(models[name], placements, opts)) group.add(im);
  };

  // ---------------------------------------------------------------- ground
  const ground = new StaticBatch('ground', T.corrugated_metal, { texel: 3, cast: false });
  ground.span(-HALF, -0.05, -9, HALF, 0, 9, '#b9a98c');
  const dirt = new StaticBatch('dirt', T.dirt_ground, { texel: 4, cast: false });
  dirt.span(-90, -0.12, -90, 90, -0.02, 90, '#7d6f52');
  const rd = rng(41);
  for (const p of DIRT) {
    for (let i = 0; i < 5; i++) {
      const g = new THREE.CylinderGeometry(1, 1, 0.012, 9);
      g.scale(p.rx * (0.5 + rd() * 0.4) * 0.8, 1, p.rz * (0.5 + rd() * 0.4) * 0.8);
      dirt.add(g, place(p.x + (rd() - 0.5) * p.rx * 0.8, 0.006, p.z + (rd() - 0.5) * p.rz * 0.8, rd() * 3), '#6f6044');
    }
  }
  const tiles = new StaticBatch('tiles', T.cracked_tiles, { texel: 1.6, cast: false });
  tiles.span(-HALF, 0, -1.3, HALF, 0.012, 1.3, '#b49a82'); // the main lane
  surf('plaza', 'Plaza concrete', 'floor', [0, 0, 0], [30, 0.1, 18], [0, 1, 0], ground.baseOf('#b9a98c'));
  surf('dirt', 'Bare dirt', 'floor', [12.2, 0, 0], [5, 0.1, 7], [0, 1, 0], dirt.baseOf('#6f6044'));
  surf('lane_tiles', 'Lane tiles', 'floor', [0, 0, 0], [30, 0.1, 2.6], [0, 1, 0], tiles.baseOf('#b49a82'));
  addMesh(ground.build());
  addMesh(dirt.build());
  addMesh(tiles.build());

  // ---------------------------------------------------------------- walls: ochre north, teal south, orange west, a zinc fence and a gate east
  const walls = new StaticBatch('walls', T.painted_concrete, { texel: 3 });
  const OCHRE = '#dcae3c';
  const TEAL = '#2f9a98';
  const ORANGE = '#d9742e';
  walls.span(-HALF, 0, -9.7, HALF, 3.0, -9, OCHRE);
  walls.span(-HALF - 0.05, 3.0, -9.75, HALF + 0.05, 3.12, -8.95, '#6b3f23');
  walls.span(-HALF, 0, 9, HALF, 3.0, 9.7, TEAL);
  walls.span(-HALF - 0.05, 3.0, 8.95, HALF + 0.05, 3.12, 9.75, '#6b3f23');
  walls.span(-HALF, 0, -9, -14.7, 3.0, 9, ORANGE);
  walls.span(-HALF - 0.05, 3.0, -9, -14.65, 3.12, 9, '#6b3f23');
  colliders.push(box(-15.4, -9.8, 15.4, -9, true), box(-15.4, 9, 15.4, 9.8, true), box(-15.4, -9.8, -14.7, 9.8, true));
  surf('north_wall', 'Ochre wall', 'wall', [0, 1.5, -9], [30, 3, 0.3], [0, 0, 1], walls.baseOf(OCHRE));
  surf('south_wall', 'Teal wall', 'wall', [0, 1.5, 9], [30, 3, 0.3], [0, 0, -1], walls.baseOf(TEAL));
  surf('west_wall', 'Orange wall', 'wall', [-14.7, 1.5, 0], [0.3, 3, 18], [1, 0, 0], walls.baseOf(ORANGE));
  // east: zinc fence with a gate in the middle
  const zinc = new StaticBatch('zinc-fence', T.rusty_metal, { texel: 1.5, doubleSide: true });
  const fenceColors = ['#8d8f91', '#7b5a42', '#a7a9ac', '#6f7173', '#8a6a50', '#9a9c9f'];
  const sheetW = 6.4 / 6;
  for (const side of [-1, 1]) {
    for (let k = 0; k < 6; k++) {
      const z = side * (2.6 + sheetW * (k + 0.5));
      const color = fenceColors[(k * 2 + (side > 0 ? 1 : 0)) % fenceColors.length];
      zinc.add(corrugatedSheet(sheetW + 0.02, 2.2, 4), place(14.9, 1.1, z, -Math.PI / 2), color);
      surf(`zinc_${side > 0 ? 's' : 'n'}${k}`, 'Zinc fence sheet', 'fence', [14.9, 1.1, z], [0.1, 2.2, sheetW], [-1, 0, 0], zinc.baseOf(color));
    }
    colliders.push(box(14.8, Math.min(side * 2.6, side * 9), 15.0, Math.max(side * 2.6, side * 9), true));
    const z0 = side * 2.6;
    const z1 = side * 3.1;
    walls.span(14.5, 0, Math.min(z0, z1), 15.1, 2.9, Math.max(z0, z1), '#e8dcb8');
    colliders.push(box(14.5, Math.min(z0, z1), 15.1, Math.max(z0, z1), true));
    surf(`gate_pillar_${side > 0 ? 's' : 'n'}`, 'Gate pillar', 'wall', [14.5, 1.45, (z0 + z1) / 2], [0.1, 2.9, 0.5], [-1, 0, 0], walls.baseOf('#e8dcb8'));
  }
  addMesh(zinc.build());

  // ---------------------------------------------------------------- one batch per ankara design (each is one draw call)
  const clothBatch = Object.fromEntries(ANKARA_KINDS.map((k) => [k, new StaticBatch(`ankara-${k}`, cloth[k], { texel: 1.15, doubleSide: true }).raw()])) as Record<AnkaraKind, StaticBatch>;
  const hang = (kind: AnkaraKind, x: number, y: number, z: number, w: number, h: number, ry = 0) => clothBatch[kind].box(x, y, z, w, h, 0.05, '#ffffff', ry);

  // wood and tarp and plastic batches
  const wood = new StaticBatch('wood', T.old_wood, { texel: 1.5 });
  const props = new StaticBatch('props', T.plaster_wall, { texel: 2 });
  const metal = new StaticBatch('metal', T.rusty_metal, { texel: 1.5 });
  const TARPS = ['#2a6fd0', '#e0503c', '#f0b020', '#3da35a'];

  // ---------------------------------------------------------------- the four fabric stalls against the north wall
  const stallKinds: AnkaraKind[] = ['fans', 'eyes', 'diamonds', 'calabash'];
  const stallX = [-10.4, -3.6, 3.2, 10.0];
  stallX.forEach((x, i) => {
    const kind = stallKinds[i];
    hang(kind, x, 1.7, -8.93, 3.3, 1.9);
    surf(`cloth_${kind}`, `Ankara cloth (${kind})`, 'cloth', [x, 1.5, -8.9], [3.3, 1.8, 0.2], [0, 0, 1], cloth[kind].avg);
    wood.box(x, 0.45, -7.5, 3.0, 0.9, 0.8, '#8a5a33');
    colliders.push(box(x - 1.5, -7.9, x + 1.5, -7.1, false, 0.9, true));
    // folded bolts of cloth on the table, in the other designs
    ANKARA_KINDS.filter((k) => k !== kind).slice(0, 4).forEach((k, j) => clothBatch[k].box(x - 1.05 + j * 0.7, 1.06, -7.5, 0.6, 0.24, 0.55, '#ffffff'));
    // poles and a tarp roof
    for (const px of [x - 1.75, x + 1.75]) {
      for (const pz of [-8.75, -6.95]) {
        props.cyl(px, 0, pz, 0.05, 0.05, 2.7, '#5a4332', 6);
        colliders.push(circle(px, pz, 0.07));
      }
    }
    props.box(x, 2.78, -7.85, 3.9, 0.06, 2.1, TARPS[i], 0, 0.1);
  });

  // ---------------------------------------------------------------- the west wall mural (a big ankara panel) and the washing line of cloths
  hang('waves', -14.62, 1.55, 0, 7.0, 2.2, Math.PI / 2);
  surf('mural_wall', 'Ankara mural (waves)', 'cloth', [-14.6, 1.5, 0], [0.2, 2.2, 7], [1, 0, 0], cloth.waves.avg);
  const lineKinds: AnkaraKind[] = ['chain', 'fans', 'eyes', 'chain'];
  props.cyl(-3.3, 0, -4.5, 0.05, 0.05, 2.4, '#5a4332', 6);
  props.cyl(3.3, 0, -4.5, 0.05, 0.05, 2.4, '#5a4332', 6);
  props.box(0, 2.35, -4.5, 6.6, 0.03, 0.03, '#2a2420');
  colliders.push(circle(-3.3, -4.5, 0.07), circle(3.3, -4.5, 0.07));
  lineKinds.forEach((k, j) => clothBatch[k].box(-2.4 + j * 1.6, 1.62, -4.5, 1.3, 1.4, 0.04, '#ffffff'));
  surf('cloth_line', 'Washing line of cloths', 'cloth', [0, 1.6, -4.5], [6, 1.4, 0.3], [0, 0, -1], cloth.chain.avg);

  // ---------------------------------------------------------------- produce
  const tomato: Placement[] = [
    { x: -8.2, z: -1.9, s: 3.4, tint: '#d6332a' },
    { x: -7.3, z: -1.95, ry: 0.15, s: 3.4, tint: '#d6332a' },
    { x: -7.75, y: 0.86, z: -1.9, ry: 0.4, s: 3.4, tint: '#c92a22' },
  ];
  const pepper: Placement[] = [
    { x: -4.4, z: -1.95, s: 3.4, tint: '#e8741f' },
    { x: -3.5, z: -1.9, ry: -0.12, s: 3.4, tint: '#e8741f' },
  ];
  instanced('surv_box', [...tomato, ...pepper]);
  colliders.push(box(-8.65, -2.35, -6.85, -1.45, false, 0.85, true), box(-4.85, -2.35, -3.05, -1.45, false, 0.85, true));
  surf('tomato_crates', 'Tomato crates', 'crates', [-7.7, 0.6, -1.9], [1.8, 1.3, 0.9], [0, 0, -1], propBaseColor(models['surv_box'][0], '#d6332a'));
  surf('pepper_crates', 'Pepper crates', 'crates', [-4.0, 0.45, -1.9], [1.8, 0.9, 0.9], [0, 0, -1], propBaseColor(models['surv_box'][0], '#e8741f'));
  // a heap of yams, rice sacks
  props.cyl(5.6, 0, -2.2, 0.9, 0.35, 0.8, '#9a6b3c', 8);
  colliders.push(circle(5.6, -2.2, 0.85, 0.8, true));
  surf('yam_heap', 'Heap of yams', 'produce', [5.6, 0.4, -2.2], [1.8, 0.8, 1.8], [0, 0, -1], props.baseOf('#9a6b3c'));
  for (let i = 0; i < 6; i++) props.box(3.6 + (i % 3) * 0.55, 0.14 + Math.floor(i / 3) * 0.28, 3.2, 0.5, 0.26, 0.32, i % 2 ? '#e6dcc0' : '#d8cba8', (i % 3) * 0.1);
  colliders.push(box(3.3, 2.95, 5.3, 3.45, false, 0.56, true));
  surf('rice_sacks', 'Sacks of rice', 'sacks', [4.3, 0.3, 3.2], [2, 0.6, 0.6], [0, 0, 1], props.baseOf('#e0d4b4'));
  // palm-oil drums
  const drums: Placement[] = [{ x: 8.0, z: 3.4, s: 2.4, tint: '#d9621a' }, { x: 8.7, z: 3.0, s: 2.4, tint: '#c4561a' }, { x: 8.5, z: 3.9, s: 2.4, tint: '#d9621a' }];
  instanced('surv_barrel', drums);
  drums.forEach((d) => colliders.push(circle(d.x, d.z, 0.32)));
  surf('oil_drums', 'Palm-oil drums', 'drums', [8.4, 0.5, 3.4], [1.4, 1, 1.4], [-1, 0, 0], propBaseColor(models['surv_barrel'][0], '#d9621a'));
  // bottle-crate steps (climbable), plantain pile
  props.box(-0.6, 0.2, -6.0, 0.9, 0.4, 0.9, '#c9a227');
  props.box(0.4, 0.4, -6.0, 0.9, 0.8, 0.9, '#c9a227');
  props.box(1.4, 0.6, -6.0, 0.9, 1.2, 0.9, '#c9a227');
  colliders.push(box(-1.05, -6.45, -0.15, -5.55, false, 0.4, true), box(-0.05, -6.45, 0.85, -5.55, false, 0.8, true), box(0.95, -6.45, 1.85, -5.55, false, 1.2, true));
  surf('bottle_crates', 'Bottle-crate steps', 'crates', [0.4, 0.5, -6.0], [2.8, 1.2, 0.9], [0, 0, 1], props.baseOf('#c9a227'));
  for (let i = 0; i < 5; i++) props.cyl(-6.6 + (i % 3) * 0.3, 0.08 + Math.floor(i / 3) * 0.2, 6.0, 0.14, 0.12, 0.42, i % 2 ? '#9ab43a' : '#b4c848', 7);
  surf('plantain', 'Plantain bunches', 'produce', [-6.4, 0.3, 6.0], [1.2, 0.6, 0.6], [0, 0, -1], props.baseOf('#a8c040'));

  // ---------------------------------------------------------------- canteen (south): long table with an ankara cloth, benches, parasol, fridge, sign, cylinders
  clothBatch.waves.box(-6, 0.83, 6.4, 4.6, 0.04, 1.1, '#ffffff');
  wood.box(-6, 0.4, 6.4, 4.4, 0.8, 0.95, '#7a4e2c');
  colliders.push(box(-8.3, 5.9, -3.7, 6.9, false, 0.8, true));
  surf('table_cloth', 'Canteen table cloth (waves)', 'cloth', [-6, 0.82, 6.4], [4.6, 0.1, 1.1], [0, 1, 0], cloth.waves.avg);
  wood.box(-6, 0.25, 5.35, 4.2, 0.1, 0.35, '#8a5a33');
  wood.box(-6, 0.25, 7.45, 4.2, 0.1, 0.35, '#8a5a33');
  colliders.push(box(-8.1, 5.15, -3.9, 5.55, false, 0.3, true), box(-8.1, 7.25, -3.9, 7.65, false, 0.3, true));
  props.cyl(-0.8, 0, 6.6, 0.04, 0.04, 2.4, '#e8e2d0', 6);
  const parasol = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.5, 12, 1, true), toon('#f0c030', { side: THREE.DoubleSide }));
  parasol.position.set(-0.8, 2.55, 6.6);
  parasol.castShadow = true;
  parasol.userData.baseColor = new THREE.Color('#f0c030');
  group.add(parasol);
  colliders.push(circle(-0.8, 6.6, 0.07));
  metal.box(3.2, 0.95, 8.35, 1.0, 1.9, 0.8, '#c8372d');
  colliders.push(box(2.7, 7.95, 3.7, 8.75, true));
  surf('drinks_fridge', 'Drinks fridge', 'fridge', [3.2, 0.95, 8.3], [1, 1.9, 0.8], [0, 0, 1], metal.baseOf('#c8372d'));
  const signTex = canvasTexture(768, 256, (ctx) => {
    ctx.fillStyle = '#f6efe0';
    ctx.fillRect(0, 0, 768, 256);
    ctx.strokeStyle = '#b3261e';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 748, 236);
    ctx.fillStyle = '#b3261e';
    ctx.font = '900 118px "Arial Black", Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MAMA PUT', 384, 150);
    ctx.fillStyle = '#17120f';
    ctx.font = '700 42px sans-serif';
    ctx.fillText('RICE · BEANS · AMALA', 384, 212);
  });
  group.add(decal(signTex, 2.6, 0.87, 0.2, 2.1, 8.93, Math.PI));
  surf('sign_board', 'MAMA PUT sign', 'sign', [0.2, 2.1, 8.92], [2.6, 0.9, 0.2], [0, 0, -1], new THREE.Color('#e9e0cc').convertSRGBToLinear());
  for (let i = 0; i < 3; i++) props.cyl(-13.3 + i * 0.4, 0, 7.7, 0.16, 0.16, 0.7, i === 1 ? '#c8372d' : '#3da35a', 8);
  colliders.push(circle(-13.3, 7.7, 0.18), circle(-12.9, 7.7, 0.18), circle(-12.5, 7.7, 0.18));
  surf('gas_cylinders', 'Gas cylinders', 'cylinders', [-12.9, 0.35, 7.7], [1.2, 0.7, 0.4], [0, 0, 1], props.baseOf('#3da35a'));

  // ---------------------------------------------------------------- west: container shop, generator
  const cont = new StaticBatch('container', T.corrugated_metal, { texel: 2.4 });
  const BLUE = '#2a5db0';
  cont.span(-13.6, 0, -4.6, -9.2, 2.4, -4.5, BLUE); // north wall
  cont.span(-13.6, 0, -2.2, -9.2, 2.4, -2.1, BLUE); // south wall
  cont.span(-13.7, 0, -4.6, -13.6, 2.4, -2.1, BLUE); // west end
  // the container stands flush against the west wall: a 1 m slot behind it was somewhere to hide that the masquerade could never look into
  cont.span(-14.7, 0, -4.6, -13.7, 2.4, -2.1, BLUE);
  cont.span(-14.7, 2.4, -4.7, -9.1, 2.55, -2.0, '#2a6a4d'); // roof
  colliders.push(box(-13.6, -4.62, -9.2, -4.48, true), box(-13.6, -2.22, -9.2, -2.08, true), box(-14.7, -4.6, -13.58, -2.1, true));
  surf('container', 'Inside the container shop', 'container', [-13.55, 1.2, -3.3], [0.2, 2.4, 2.2], [-1, 0, 0], cont.baseOf(BLUE));
  surf('container_side', 'Container side', 'container', [-11.4, 1.2, -4.55], [4.4, 2.4, 0.2], [0, 0, 1], cont.baseOf(BLUE));
  addMesh(cont.build());
  metal.box(-14.1, 0.45, 5.0, 1.1, 0.9, 0.8, '#c8372d');
  metal.box(-14.1, 1.0, 4.4, 0.7, 0.3, 0.3, '#2a2a2e');
  colliders.push(box(-14.65, 4.55, -13.55, 5.45, true));
  surf('generator', 'Generator', 'box', [-14.1, 0.45, 5.0], [1.1, 0.9, 0.8], [1, 0, 0], metal.baseOf('#c8372d'));

  // ---------------------------------------------------------------- east: keke, okada, bus shelter, water tank
  const keke = new StaticBatch('keke', T.plaster_wall, { texel: 2 });
  keke.box(9.5, 0.75, 5.7, 1.3, 0.9, 2.2, '#e8bf1a');
  keke.box(9.5, 1.55, 5.55, 1.2, 0.08, 1.7, '#2d8f4e');
  keke.box(9.5, 0.28, 6.7, 0.55, 0.55, 0.3, '#17120f');
  keke.box(8.85, 0.25, 5.0, 0.2, 0.5, 0.5, '#17120f');
  keke.box(10.15, 0.25, 5.0, 0.2, 0.5, 0.5, '#17120f');
  for (const dx of [-0.58, 0.58]) keke.box(9.5 + dx, 0.85, 5.55, 0.04, 1.4, 0.04, '#2a2420');
  colliders.push(box(8.8, 4.55, 10.2, 6.9, false));
  surf('keke', 'Keke napep', 'vehicle', [9.5, 0.8, 5.7], [1.4, 1.5, 2.3], [0, 0, -1], keke.baseOf('#e8bf1a'));
  keke.box(5.6, 0.45, -3.6, 0.4, 0.5, 1.5, '#b3261e');
  keke.box(5.6, 0.72, -3.55, 0.4, 0.12, 0.7, '#17120f');
  keke.box(5.6, 0.2, -4.2, 0.12, 0.4, 0.4, '#17120f');
  keke.box(5.6, 0.2, -3.0, 0.12, 0.4, 0.4, '#17120f');
  colliders.push(box(5.35, -4.4, 5.85, -2.8, false, 0.8, true));
  surf('okada', 'Okada (motorbike)', 'vehicle', [5.6, 0.5, -3.6], [0.5, 1, 1.6], [-1, 0, 0], keke.baseOf('#b3261e'));
  addMesh(keke.build());
  const shelter = new StaticBatch('shelter', T.painted_concrete, { texel: 2.5 });
  shelter.box(12.6, 0.8, 8.8, 3.0, 1.6, 0.12, '#2a5db0');
  shelter.box(12.6, 2.1, 8.1, 3.2, 0.1, 1.9, '#2a5db0');
  for (const px of [11.1, 14.1]) shelter.box(px, 1.05, 7.3, 0.1, 2.1, 0.1, '#5a4332');
  colliders.push(box(11.0, 8.7, 14.2, 8.95, true), circle(11.1, 7.3, 0.08), circle(14.1, 7.3, 0.08));
  surf('shelter_panel', 'Bus shelter panel', 'wall', [12.6, 0.8, 8.8], [3, 1.6, 0.2], [0, 0, -1], shelter.baseOf('#2a5db0'));
  addMesh(shelter.build());
  // the tank stands well off the fence so the nook behind it (and the bush) can be seen into from the south
  props.cyl(12.5, 1.2, -6.6, 0.55, 0.55, 1.2, '#25282b', 12);
  for (const [dx, dz] of [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]]) props.box(12.5 + dx, 0.6, -6.6 + dz, 0.12, 1.2, 0.12, '#5a4332');
  colliders.push(circle(12.5, -6.6, 0.62));
  surf('water_tank', 'Black water tank', 'tank', [12.5, 1.8, -6.6], [1.1, 1.2, 1.1], [-1, 0, 0], props.baseOf('#25282b'));
  addMesh(props.build());
  addMesh(wood.build());
  addMesh(metal.build());

  // palms outside, a bush, cones, buckets
  instanced('nat_tree_palm', [{ x: 19, z: -3, s: 4 }, { x: 18.5, z: 8, s: 4, ry: 1 }, { x: -20, z: 2, s: 4, ry: 2 }]);
  instanced('nat_plant_bush', [{ x: 13.0, z: -8.0, s: 2.6 }]);
  colliders.push(circle(13.0, -8.0, 0.55));
  surf('bush', 'Bush by the wall', 'foliage', [13.0, 0.5, -8.0], [1.1, 1, 1.1], [-1, 0, 0], propBaseColor(models['nat_plant_bush'][0]));
  instanced('car_cone', [{ x: 8.2, z: 0.4 }, { x: 11.5, z: 2.6 }]);
  const buckets: Placement[] = [{ x: -1.8, z: 2.4, s: 2.3, tint: '#e0503c' }, { x: 1.2, z: 5.6, s: 2.3, tint: '#2a6fd0' }, { x: -11.2, z: 1.2, s: 2.3, tint: '#f0c030' }];
  instanced('surv_bucket', buckets);
  buckets.forEach((b) => colliders.push(circle(b.x, b.z, 0.2, 0.44, true)));

  // all printed cloths are built last (one draw call each)
  for (const k of ANKARA_KINDS) addMesh(clothBatch[k].build());

  // ---------------------------------------------------------------- hiding spots
  const V = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const dir = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const spotDefs: { id: string; label: string; shape: string; at: THREE.Vector3; facing: THREE.Vector3; reach?: number; probeY?: number }[] = [
    ...stallKinds.map((k, i) => ({ id: `stall_${k}`, label: `Behind the ${k} cloth stall`, shape: 'printed cloth behind a table', at: V(stallX[i], -8.45), facing: dir(0, -1), probeY: 1.4 })),
    { id: 'mural', label: 'Ankara mural on the west wall', shape: 'big printed wall', at: V(-13.9, 0), facing: dir(-1, 0), probeY: 1.4 },
    { id: 'ochre_wall', label: 'Ochre wall between the stalls', shape: 'flat wall', at: V(-7.0, -8.5), facing: dir(0, -1), probeY: 1.2 },
    { id: 'tomatoes', label: 'Tomato crates', shape: 'red stack', at: V(-7.7, -0.95), facing: dir(0, -1), probeY: 0.6 },
    { id: 'peppers', label: 'Pepper crates', shape: 'orange stack', at: V(-4.0, -0.95), facing: dir(0, -1), probeY: 0.45 },
    { id: 'yams', label: 'Heap of yams', shape: 'brown mound', at: V(5.6, -1.0), facing: dir(0, -1), probeY: 0.4 },
    { id: 'rice', label: 'Sacks of rice', shape: 'cream pile', at: V(4.3, 2.4), facing: dir(0, 1), probeY: 0.3 },
    { id: 'oil_drums', label: 'Palm-oil drums', shape: 'round cluster', at: V(7.4, 3.3), facing: dir(1, 0), probeY: 0.5 },
    { id: 'bottle_steps', label: 'Bottle-crate steps (climbable)', shape: 'stepped crates', at: V(0.4, -5.2), facing: dir(0, -1), probeY: 0.4 },
    { id: 'washing_line', label: 'Washing line of cloths', shape: 'hanging cloth', at: V(0, -3.9), facing: dir(0, -1), probeY: 1.4 },
    { id: 'canteen_table', label: 'Canteen table cloth', shape: 'long low table', at: V(-6, 7.9), facing: dir(0, -1), probeY: 0.5 },
    { id: 'fridge', label: 'Drinks fridge', shape: 'red box', at: V(3.2, 7.5), facing: dir(0, 1), probeY: 1.0 },
    { id: 'sign_board', label: 'MAMA PUT sign', shape: 'flat sign', at: V(0.2, 8.4), facing: dir(0, 1), probeY: 2.1 },
    { id: 'cylinders', label: 'Gas cylinders', shape: 'round cluster, low', at: V(-12.9, 7.0), facing: dir(0, 1), probeY: 0.4 },
    { id: 'plantain', label: 'Plantain bunches', shape: 'green pile', at: V(-6.4, 5.2), facing: dir(0, 1), probeY: 0.3 },
    { id: 'container', label: 'Inside the container shop', shape: 'enclosed box, one open side', at: V(-12.6, -3.3), facing: dir(-1, 0), probeY: 1.0 },
    { id: 'generator', label: 'Behind the generator', shape: 'box block', at: V(-13.25, 5.0), facing: dir(-1, 0), probeY: 0.5 },
    { id: 'keke', label: 'Beside the keke', shape: 'small vehicle', at: V(9.5, 4.2), facing: dir(0, 1), probeY: 0.8 },
    { id: 'okada', label: 'Okada (motorbike)', shape: 'low vehicle', at: V(4.7, -3.6), facing: dir(1, 0), probeY: 0.5 },
    { id: 'shelter', label: 'Bus shelter', shape: 'blue panel', at: V(12.6, 8.2), facing: dir(0, 1), probeY: 0.8 },
    { id: 'water_tank', label: 'Water tank on a stand', shape: 'tall cylinder', at: V(11.6, -6.6), facing: dir(1, 0), probeY: 1.6 },
    { id: 'bush', label: 'Bush by the north wall', shape: 'foliage', at: V(12.15, -8.0), facing: dir(1, 0), probeY: 0.5 },
    { id: 'zinc_fence', label: 'Against the zinc fence', shape: 'corrugated fence', at: V(14.3, 6.0), facing: dir(1, 0) },
  ];
  const hidingSpots: HidingSpot[] = spotDefs.map((d) => {
    const probe = d.at.clone().addScaledVector(d.facing, d.reach ?? 0.55);
    probe.y = d.probeY ?? 0.9;
    const near = surfaces.nearest(probe, 1.6);
    if (!near) throw new Error(`[market] hiding spot ${d.id} has no surface to blend into`);
    const p = { x: d.at.x, z: d.at.z };
    if (resolveCollisions(p, PLAYER_RADIUS - 0.02, colliders)) console.warn(`[market] hiding spot ${d.id} overlaps a collider (would move to ${p.x.toFixed(2)}, ${p.z.toFixed(2)})`);
    return { id: d.id, label: d.label, shape: d.shape, position: d.at, facing: d.facing.normalize(), baseColor: near.baseColor.clone(), surfaceId: near.id };
  });

  const markers = new THREE.Group();
  markers.visible = false;
  markers.name = 'hiding-markers';
  const mkMat = () => new THREE.MeshBasicMaterial({ color: '#ff2fd0', depthTest: false, transparent: true, opacity: 0.9 });
  const diamonds = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.14), mkMat(), hidingSpots.length);
  const rings = new THREE.InstancedMesh(new THREE.RingGeometry(0.28, 0.36, 20).rotateX(-Math.PI / 2), mkMat(), hidingSpots.length);
  hidingSpots.forEach((s, i) => {
    diamonds.setMatrixAt(i, place(s.position.x, 2.45, s.position.z));
    rings.setMatrixAt(i, place(s.position.x, 0.05, s.position.z));
  });
  for (const m of [diamonds, rings]) {
    m.renderOrder = 999;
    m.frustumCulled = false;
    markers.add(m);
  }
  group.add(markers);

  return {
    id: 'market',
    name: 'The Market',
    assetCount: MARKET_ASSET_COUNT,
    chickenCount: 7,
    seekerTuning: { speed: 1, fov: 1, range: 1 },
    ambience: { chatter: 1.5, generator: true },
    seekerStart: { x: 13.2, z: 0, yaw: -Math.PI / 2 },
    lobbyPos: { x: 0.5, z: 0.5 },
    chickenArea: { minX: -14.2, maxX: 14.2, minZ: -8.7, maxZ: 8.7 },
    ground: { halfX: 15, halfZ: 9, patches: DIRT },
    group,
    colliders,
    surfaces,
    hidingSpots,
    fadeGroups,
    bounds: { minX: -HALF + 0.3, maxX: 14.75, minZ: -9.6, maxZ: 9.6 },
    spawn: new THREE.Vector3(0.5, 0, 0.5),
    generator: new THREE.Vector3(-14.1, 0.5, 5.0),
    gate: { x: 14.6, z: 0, halfWidth: 2.6 },
    baseColorAt: (p) => surfaces.baseColorAt(p),
    setMarkersVisible: (v) => (markers.visible = v),
  };
}
