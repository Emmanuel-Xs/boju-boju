// Level 1: a Lagos "face me I face you" compound, about 30 x 30 m. Two rows of rooms (doors, recesses, zinc eaves) face a shared yard;
// the west wall carries painted signs, the east side is a zinc fence with a gate and a parked danfo.
// All static scenery is merged into a few batches or instanced (see kit.ts). Every surface a player can hide against is registered with
// a base colour (texture average x tint) in userData.baseColor; the eyedropper and the seeker read that, never the lit pixel colour.
import * as THREE from 'three';
import { toon } from '../toon';
import { COMPOUND_DIRT, type Ground } from './ground';
import { box, circle, type Collider, resolveCollisions, PLAYER_RADIUS } from './controller';
import {
  FadeGroup,
  StaticBatch,
  SurfaceRegistry,
  loadModelParts,
  loadSurfaceTextures,
  instanceParts,
  propBaseColor,
  place,
  corrugatedSheet,
  type ModelPart,
  type Placement,
} from './kit';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const TEXTURES = ['plaster_wall', 'painted_concrete', 'corrugated_metal', 'rusty_metal', 'dirt_ground', 'old_wood', 'cracked_tiles'] as const;
const MODELS = ['car_van', 'car_cone', 'surv_bucket', 'surv_box', 'surv_box-large', 'surv_metal-panel', 'nat_plant_bushLarge', 'nat_plant_bush', 'nat_tree_palm', 'nat_tree_palmShort'] as const;

// --- layout (metres; x east, z south, y up; the yard is the middle band between the two room blocks) ---
const H = 3.2; // room block height
const BLOCK_DEPTH = 6;
const RECESS = 0.85; // depth of a doorway recess
const VERANDA = 2.2;
const ROOM_W = 5;
const DOOR_W = 1.4;
const HALF = 15;

export interface HidingSpot {
  id: string;
  label: string;
  /** What kind of silhouette it gives a hider. */
  shape: string;
  /** Where the player stands (y = 0). */
  position: THREE.Vector3;
  /** Unit vector from the player towards the surface they blend into. */
  facing: THREE.Vector3;
  /** Base colour of that surface (linear), read from the registry. */
  baseColor: THREE.Color;
  surfaceId: string;
}

export interface Compound {
  id: string;
  name: string;
  /** Files fetched while building (for the loading bar). */
  assetCount: number;
  /** Where the masquerade stands at the start of every round, and the turntable the lobby shows the player on. */
  seekerStart: { x: number; z: number; yaw: number };
  lobbyPos: { x: number; z: number };
  /** How many chickens wander the level, and the ambience: how loud the crowd chatter is (1 = normal) and whether a generator hums. */
  chickenCount: number;
  ambience: { chatter: number; generator: boolean };
  /** Where the chickens may roam. */
  chickenArea: { minX: number; maxX: number; minZ: number; maxZ: number };
  ground: Ground;
  group: THREE.Group;
  colliders: Collider[];
  surfaces: SurfaceRegistry;
  hidingSpots: HidingSpot[];
  fadeGroups: FadeGroup[];
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  spawn: THREE.Vector3;
  /** Where the generator hums from, or null when there is none. */
  generator: THREE.Vector3 | null;
  /** The gate in the east fence: the way home. Its middle at floor level, and half the width of the opening. */
  gate: { x: number; z: number; halfWidth: number };
  baseColorAt(point: THREE.Vector3): THREE.Color | null;
  setMarkersVisible(visible: boolean): void;
}

// --- painted signs (canvas text) -----------------------------------------------------------------------------------

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Rough brush capitals: every letter gets its own wobble, a thick stroke and the odd drip. */
function paintedLine(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, size: number, color: string, rand: () => number): void {
  ctx.font = `900 ${size}px "Arial Black", Impact, "DejaVu Sans", sans-serif`;
  const widths = [...text].map((ch) => ctx.measureText(ch).width * 0.96);
  let x = cx - widths.reduce((a, b) => a + b, 0) / 2;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.06;
  [...text].forEach((ch, i) => {
    ctx.save();
    ctx.translate(x + widths[i] / 2, y + (rand() - 0.5) * size * 0.07);
    ctx.rotate((rand() - 0.5) * 0.09);
    ctx.globalAlpha = 0.86 + rand() * 0.14;
    ctx.textAlign = 'center';
    ctx.fillText(ch, 0, 0);
    ctx.strokeText(ch, 0, 0);
    if (ch !== ' ' && rand() < 0.16) ctx.fillRect(-size * 0.02 + (rand() - 0.5) * size * 0.3, size * 0.02, size * 0.045, size * (0.08 + rand() * 0.2));
    ctx.restore();
    x += widths[i];
  });
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

// --- the danfo -----------------------------------------------------------------------------------------------------

const DANFO_YELLOW = '#e8bf1a';

/** Yellow body (the model's blue paint is recoloured by texel), thin black waist stripes, diagonal black slashes on the rear. */
function danfoMaterial(map: THREE.Texture | null): THREE.MeshToonMaterial {
  const m = toon('#ffffff', { map });
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vObj;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvObj = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vObj;').replace(
      '#include <color_fragment>',
      /* glsl */ `#include <color_fragment>
      {
        vec3 c = diffuseColor.rgb;
        float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
        float body = step(0.22, c.b - c.r) * step(lum, 0.55);
        vec3 yellow = vec3(0.807, 0.521, 0.010) * clamp(lum / 0.19, 0.75, 1.15);
        diffuseColor.rgb = mix(c, yellow, body);
        float stripe = step(0.30, vObj.y) * step(vObj.y, 0.35) + step(0.38, vObj.y) * step(vObj.y, 0.395);
        float slash = step(vObj.z, -1.38) * (step(abs(vObj.x * 0.9 + vObj.y - 0.50), 0.04) + step(abs(vObj.x * 0.9 + vObj.y - 0.80), 0.04));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.012), clamp(stripe + slash, 0.0, 1.0) * body);
      }`,
    );
  };
  m.customProgramCacheKey = () => 'danfo-yellow-v1';
  return m;
}

// --- the level -----------------------------------------------------------------------------------------------------

/** Number of files createCompound fetches, so a loading bar can show real progress. */
export const COMPOUND_ASSET_COUNT = TEXTURES.length + MODELS.length;

export async function createCompound(onAsset?: () => void): Promise<Compound> {
  const [tx, ...partLists] = await Promise.all([loadSurfaceTextures(TEXTURES, onAsset), ...MODELS.map((m) => loadModelParts(m).then((p) => (onAsset?.(), p)))]);
  const models = Object.fromEntries(MODELS.map((m, i) => [m, partLists[i]])) as Record<(typeof MODELS)[number], ModelPart[]>;
  const T = tx as Record<(typeof TEXTURES)[number], NonNullable<(typeof tx)[string]>>;

  const group = new THREE.Group();
  group.name = 'compound';
  const surfaces = new SurfaceRegistry();
  group.add(surfaces.group);
  const colliders: Collider[] = [];
  const fadeGroups: FadeGroup[] = [];
  const addMesh = (m: THREE.Object3D | null) => m && group.add(m);
  const surf = (id: string, label: string, kind: string, c: [number, number, number], s: [number, number, number], n: [number, number, number], base: THREE.Color) => surfaces.add(id, label, kind, c, s, n, base);

  // ---------------------------------------------------------------- ground
  // (the pack's "corrugated_metal" colour map is plain grey concrete, which is what the yard floor wants)
  const ground = new StaticBatch('ground', T.corrugated_metal, { texel: 3, cast: false });
  ground.span(-HALF, -0.05, -9, HALF, 0, 9, '#b3a995');
  const dirt = new StaticBatch('dirt', T.dirt_ground, { texel: 4, cast: false });
  dirt.span(-90, -0.12, -90, 90, -0.02, 90, '#7d6f52');
  // bare-dirt patches: a few overlapping flattened discs each, so the edges aren't square
  const patch = (cx: number, cz: number, rx: number, rz: number, n: number, seed: number) => {
    const r = rng(seed);
    for (let i = 0; i < n; i++) {
      const g = new THREE.CylinderGeometry(1, 1, 0.012, 9);
      g.scale(rx * (0.45 + r() * 0.4), 1, rz * (0.45 + r() * 0.4));
      dirt.add(g, place(cx + (r() - 0.5) * rx, 0.006, cz + (r() - 0.5) * rz, r() * 3), '#6f6044');
    }
  };
  patch(12.2, 0, 2.6, 3.5, 6, 11);
  patch(-11, 1.8, 1.8, 1.2, 4, 12);
  patch(2, -5.6, 1.2, 0.9, 3, 13);
  patch(-3, 5.4, 1.4, 0.8, 3, 14);
  const tiles = new StaticBatch('veranda-tiles', T.cracked_tiles, { texel: 1.6, cast: false });
  surf('yard_concrete', 'Yard concrete', 'floor', [0, 0, 0], [30, 0.1, 18], [0, 1, 0], ground.baseOf('#b3a995'));
  surf('dirt', 'Bare dirt', 'floor', [12.2, 0, 0], [5, 0.1, 7], [0, 1, 0], dirt.baseOf('#6f6044'));
  addMesh(ground.build());
  addMesh(dirt.build());

  // ---------------------------------------------------------------- the two room blocks
  const doorColors = ['#2f7d3a', '#2a5db0', '#a8322d', '#7a4a2a', '#e0b030', '#4a4a8a'];
  const eaveColors = ['#8d8f91', '#7b5a42', '#a9abae', '#6f7173', '#8a6a50', '#b8b9bb'];
  const buildBlock = (f: 1 | -1, id: string, label: string, lower: string, upper: string, doors: string[], sections: number) => {
    const frontZ = -9 * f; // the facade plane
    const zAt = (d: number) => frontZ - f * d; // depth d into the building (negative = out onto the veranda)
    const rooms = 6 / sections;
    for (let s = 0; s < sections; s++) {
      const fade = new FadeGroup(`${id}-${s}`);
      fadeGroups.push(fade);
      const pl = new StaticBatch(`${id}-plaster-${s}`, T.plaster_wall, { texel: 2.5, fade });
      const ea = new StaticBatch(`${id}-eave-${s}`, T.rusty_metal, { texel: 1.5, fade, doubleSide: true });
      for (let r = 0; r < rooms; r++) {
        const i = s * rooms + r;
        const x0 = -HALF + i * ROOM_W;
        const dx = x0 + ROOM_W / 2;
        const jl = dx - DOOR_W / 2;
        const jr = dx + DOOR_W / 2;
        pl.span(x0, 0, zAt(RECESS - 0.02), x0 + ROOM_W, H, zAt(BLOCK_DEPTH), upper); // the mass behind the recess
        for (const [a, b] of [[x0, jl], [jr, x0 + ROOM_W]] as const) {
          pl.span(a, 0, zAt(0), b, 1.1, zAt(RECESS), lower);
          pl.span(a, 1.1, zAt(0), b, H, zAt(RECESS), upper);
          colliders.push(box(a, zAt(0), b, zAt(RECESS), true));
        }
        pl.span(jl, 2.2, zAt(0), jr, H, zAt(RECESS), upper); // lintel
        pl.box(dx, 1.08, zAt(RECESS - 0.05), DOOR_W - 0.04, 2.16, 0.06, doors[i]); // door leaf
        pl.box(dx + 0.5, 1.0, zAt(RECESS - 0.1), 0.05, 0.05, 0.1, '#d9b34a'); // handle
        pl.box(x0 + 0.9, 1.5, frontZ + f * 0.03, 0.9, 0.9, 0.06, '#252b33'); // louvre window
        for (let k = 0; k < 3; k++) pl.box(x0 + 0.9, 1.25 + k * 0.25, frontZ + f * 0.07, 0.9, 0.04, 0.03, '#4b5661');
        surf(`${id}_door_${i}`, `${label} door ${i + 1}`, 'door', [dx, 1.08, zAt(RECESS - 0.05)], [DOOR_W, 2.16, 0.2], [0, 0, f], pl.baseOf(doors[i]));
        // zinc eave over the veranda: slopes from the wall top down to the posts
        const dz = VERANDA + 0.15;
        const dy = H + 0.05 - 2.62;
        const len = Math.hypot(dz, dy);
        ea.add(corrugatedSheet(ROOM_W - 0.04, len, 16), place(dx, (H + 0.05 + 2.62) / 2, zAt(-dz / 2 + 0.05), 0, f * Math.atan2(dy, dz)).multiply(place(0, 0, 0, 0, -Math.PI / 2)), eaveColors[(i + (f > 0 ? 0 : 3)) % eaveColors.length]);
      }
      // posts along the veranda edge and a concrete cap on top of the block
      const pStart = s * rooms * ROOM_W - HALF;
      for (let k = 0; k <= rooms; k++) {
        const x = pStart + k * ROOM_W;
        pl.add(new THREE.CylinderGeometry(0.09, 0.09, 2.66, 8), place(x, 1.33, zAt(-VERANDA)), '#3a3a38');
        colliders.push(circle(x, zAt(-VERANDA), 0.13));
      }
      pl.span(pStart, H, zAt(0), pStart + rooms * ROOM_W, H + 0.12, zAt(BLOCK_DEPTH), '#6d6b66');
      addMesh(pl.build());
      addMesh(ea.build());
      surf(`${id}_eave_${s}`, `${label} zinc eave ${s + 1}`, 'roof edge', [pStart + (rooms * ROOM_W) / 2, 2.95, zAt(-1.1)], [rooms * ROOM_W, 0.6, 2.3], [0, -1, f], ea.baseOf(eaveColors[0]));
    }
    colliders.push(box(-HALF, zAt(RECESS), HALF, zAt(BLOCK_DEPTH), true));
    const pl = new StaticBatch('probe', T.plaster_wall);
    surf(`${id}_lower`, `${label}, lower band`, 'wall', [0, 0.55, zAt(0.1)], [30, 1.1, 0.4], [0, 0, f], pl.baseOf(lower));
    surf(`${id}_upper`, `${label}, upper wall`, 'wall', [0, 2.15, zAt(0.1)], [30, 2.1, 0.4], [0, 0, f], pl.baseOf(upper));
    // veranda floor
    tiles.span(-HALF, 0, frontZ, HALF, 0.015, zAt(-VERANDA), '#b49a82');
    surf(`${id}_veranda`, `${label} veranda tiles`, 'floor', [0, 0, zAt(-VERANDA / 2)], [30, 0.1, VERANDA], [0, 1, 0], tiles.baseOf('#b49a82'));
  };
  buildBlock(1, 'north', 'North block', '#2b958f', '#e8dcb8', doorColors, 3);
  buildBlock(-1, 'south', 'South block', '#b0603c', '#ead9a2', [...doorColors].reverse(), 3);
  addMesh(tiles.build());

  // ---------------------------------------------------------------- west wall with the painted signs, east zinc fence and gate
  const walls = new StaticBatch('walls', T.painted_concrete, { texel: 3 });
  const WALL_TURQ = '#2fa59b';
  walls.span(-HALF, 0, -9, -14.7, 2.6, 9, WALL_TURQ);
  walls.span(-HALF - 0.05, 2.6, -9, -14.65, 2.72, 9, '#d6cdb0');
  colliders.push(box(-HALF - 0.4, -9, -14.7, 9, true));
  surf('west_wall', 'West wall (turquoise)', 'wall', [-14.7, 1.3, 0], [0.3, 2.6, 18], [1, 0, 0], walls.baseOf(WALL_TURQ));

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
    zinc.span(14.84, 2.2, Math.min(side * 2.6, side * 9), 14.98, 2.28, Math.max(side * 2.6, side * 9), '#4b4038'); // top rail
    colliders.push(box(14.8, Math.min(side * 2.6, side * 9), 15.0, Math.max(side * 2.6, side * 9), true));
    for (let k = 0; k <= 6; k++) walls.add(new THREE.CylinderGeometry(0.06, 0.06, 2.3, 6), place(14.8, 1.15, side * (2.6 + sheetW * k)), '#5a4332');
  }
  for (const side of [-1, 1]) {
    const z0 = side * 2.6;
    const z1 = side * 3.1;
    walls.span(14.5, 0, Math.min(z0, z1), 15.1, 2.9, Math.max(z0, z1), '#e8dcb8');
    walls.span(14.45, 2.9, Math.min(z0, z1) - 0.05, 15.15, 3.05, Math.max(z0, z1) + 0.05, '#2b958f');
    colliders.push(box(14.5, Math.min(z0, z1), 15.1, Math.max(z0, z1), true));
    surf(`gate_pillar_${side > 0 ? 's' : 'n'}`, 'Gate pillar', 'wall', [14.5, 1.45, (z0 + z1) / 2], [0.1, 2.9, 0.5], [-1, 0, 0], walls.baseOf('#e8dcb8'));
  }
  addMesh(zinc.build());

  // the signs: letters are canvas text on transparent decals, the "POST NO BILL" patch is its own cream-painted surface
  const rand = rng(419);
  const signA = canvasTexture(1024, 400, (ctx) => {
    paintedLine(ctx, 'THIS HOUSE IS', 512, 120, 118, '#0d0d0d', rand);
    paintedLine(ctx, 'NOT FOR SALE', 512, 250, 118, '#0d0d0d', rand);
    paintedLine(ctx, 'BEWARE OF 419', 512, 370, 78, '#b3261e', rand);
  });
  const CREAM_PATCH = '#e9dfc0';
  const signB = canvasTexture(768, 320, (ctx) => {
    ctx.fillStyle = CREAM_PATCH;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const edge = (u: number, v: number) => ctx.lineTo(u + (rand() - 0.5) * 7, v + (rand() - 0.5) * 7);
      edge(14 + t * 740, 14);
    }
    for (let i = 0; i <= 14; i++) ctx.lineTo(754 + (rand() - 0.5) * 7, 14 + (i / 14) * 292);
    for (let i = 0; i <= 40; i++) ctx.lineTo(754 - (i / 40) * 740 + (rand() - 0.5) * 7, 306 + (rand() - 0.5) * 7);
    for (let i = 0; i <= 14; i++) ctx.lineTo(14 + (rand() - 0.5) * 7, 306 - (i / 14) * 292);
    ctx.closePath();
    ctx.fill();
    paintedLine(ctx, 'POST NO BILL', 384, 205, 112, '#6e1f1a', rand);
  });
  // the camera looks north, so the signs go on walls that face south: a partition wall in the west yard, and the north facade
  const signFade = new FadeGroup('sign-wall');
  fadeGroups.push(signFade);
  const signWall = new StaticBatch('sign-wall', T.painted_concrete, { texel: 3, fade: signFade });
  signWall.span(-14.7, 0, -1.6, -8.5, 2.4, -1.3, WALL_TURQ);
  signWall.span(-14.75, 2.4, -1.65, -8.45, 2.5, -1.25, '#d6cdb0');
  addMesh(signWall.build());
  colliders.push(box(-14.7, -1.65, -8.45, -1.25, true));
  surf('sign_wall', 'Painted partition wall (THIS HOUSE IS NOT FOR SALE)', 'wall', [-11.6, 1.2, -1.3], [6.2, 2.4, 0.3], [0, 0, 1], signWall.baseOf(WALL_TURQ));
  addMesh(decal(signA, 4.3, 1.75, -11.6, 1.38, -1.285, 0));
  addMesh(decal(signB, 1.6, 0.67, -10.9, 1.55, -8.988, 0));
  surf('post_no_bill', '"POST NO BILL" cream patch', 'wall', [-10.9, 1.55, -8.99], [1.6, 0.67, 0.1], [0, 0, 1], new THREE.Color(CREAM_PATCH));

  // ---------------------------------------------------------------- procedural props: all in one untextured batch
  const props = new StaticBatch('props', null);
  const wood = new StaticBatch('wood-props', T.old_wood, { texel: 1.2 });
  const bx = (b: StaticBatch, base: THREE.Matrix4, ox: number, oy: number, oz: number, w: number, h: number, d: number, color: string, rx = 0, rz = 0) => b.add(new THREE.BoxGeometry(w, h, d), base.clone().multiply(place(ox, oy, oz, 0, rx, rz)), color);
  const cy = (b: StaticBatch, base: THREE.Matrix4, ox: number, oy: number, oz: number, rb: number, rt: number, h: number, color: string, segs = 10) => b.add(new THREE.CylinderGeometry(rt, rb, h, segs), base.clone().multiply(place(ox, oy + h / 2, oz)), color);

  // blue water drums
  const DRUM = '#1e56b8';
  const drum = (x: number, z: number, color = DRUM) => {
    const m = place(x, 0, z);
    cy(props, m, 0, 0, 0, 0.3, 0.3, 0.95, color, 12);
    for (const y of [0.28, 0.62]) cy(props, m, 0, y, 0, 0.318, 0.318, 0.05, '#163f8a', 12);
    cy(props, m, 0, 0.95, 0, 0.26, 0.26, 0.04, '#3a76d6', 12);
    cy(props, m, 0.11, 0.99, 0.05, 0.04, 0.04, 0.05, '#f0f0ea', 6);
    colliders.push(circle(x, z, 0.32, 0.95, true)); // stand on top of a drum
  };
  const drumCluster = (id: string, label: string, cx: number, cz: number, offsets: [number, number][]) => {
    offsets.forEach(([ox, oz], i) => drum(cx + ox, cz + oz, i === 1 ? '#1a4aa0' : DRUM));
    const mx = offsets.reduce((a, o) => a + o[0], 0) / offsets.length + cx;
    const mz = offsets.reduce((a, o) => a + o[1], 0) / offsets.length + cz;
    surf(id, label, 'drums', [mx, 0.5, mz], [1.5 + Math.abs(offsets[1][0]), 1, 1.5], [0, 0, 1], props.baseOf(DRUM));
  };
  drumCluster('drums_a', 'Blue drum cluster (north veranda)', -10.5, -5.8, [[0, 0], [0.66, 0.12], [0.28, 0.64], [-0.45, 0.5]]);
  drumCluster('drums_b', 'Blue drum cluster (south veranda)', 4.6, 5.7, [[0, 0], [0.64, 0.05], [0.3, -0.55]]);
  drumCluster('drums_c', 'Blue drums by the signs', -14.0, -7.0, [[0, 0], [0.1, 0.65]]);

  // basins
  for (const [x, z, c] of [[-7.0, -7.4, '#e07b2a'], [8.6, -7.5, '#2e8b57'], [7.3, 7.7, '#d9577a'], [-1.5, 6.1, '#e8c23a']] as const) {
    const m = place(x, 0, z);
    cy(props, m, 0, 0, 0, 0.3, 0.4, 0.17, c, 14);
    cy(props, m, 0, 0.15, 0, 0.34, 0.34, 0.03, '#2b2b2b', 14);
    colliders.push(circle(x, z, 0.38, 0.17, true));
  }

  // white plastic chairs
  const chair = (x: number, y: number, z: number, ry: number, color = '#f2f2ee') => {
    const m = place(x, y, z, ry);
    bx(props, m, 0, 0.45, 0, 0.46, 0.05, 0.44, color);
    bx(props, m, 0, 0.74, -0.2, 0.46, 0.5, 0.04, color, -0.1);
    for (const [lx, lz] of [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]] as const) cy(props, m, lx, 0, lz, 0.022, 0.022, 0.45, '#dcdcd6', 6);
  };
  for (const [x, z, ry] of [[-4.3, -8.2, 0], [-3.65, -8.0, 0.25], [4.6, -7.1, Math.PI], [5.4, -7.15, Math.PI - 0.2], [-9.0, 8.15, Math.PI], [-8.15, 8.25, Math.PI + 0.3]] as const) {
    chair(x, 0, z, ry);
    colliders.push(circle(x, z, 0.27));
  }
  // (stacked by the south wall, not in the middle of the lane: out in the lane they plugged the way into the slot beside the steps)
  for (let i = 0; i < 5; i++) chair(9.3 + (i % 2) * 0.02, i * 0.13, 8.4, 0.4 + i * 0.05);
  colliders.push(circle(9.3, 8.4, 0.34));
  surf('chairs_stack', 'Stacked white plastic chairs', 'chairs', [9.3, 0.6, 8.4], [0.7, 1.2, 0.7], [0, 0, 1], props.baseOf('#f2f2ee'));
  surf('chairs_north', 'White plastic chairs', 'chairs', [-3.97, 0.5, -8.1], [1.2, 1, 0.6], [0, 0, 1], props.baseOf('#f2f2ee'));

  // generator on a concrete plinth, red with a darker tank
  const genM = place(-13.2, 0, 4.6);
  bx(wood, genM, 0, 0.06, 0, 1.3, 0.12, 0.95, '#8c8574');
  bx(props, genM, 0, 0.43, 0, 1.0, 0.62, 0.7, '#d2492e');
  bx(props, genM, 0, 0.84, 0, 0.88, 0.22, 0.4, '#a52d1a');
  bx(props, genM, 0.51, 0.45, 0, 0.05, 0.32, 0.42, '#1f1f22');
  bx(props, genM, 0.53, 0.52, 0.1, 0.03, 0.08, 0.08, '#7bd36b');
  cy(props, genM, -0.35, 0.74, -0.36, 0.04, 0.04, 0.6, '#2b2b2d', 6);
  for (const [gx, gz] of [[-0.5, -0.36], [0.5, -0.36], [-0.5, 0.36], [0.5, 0.36]] as const) cy(props, genM, gx, 0.12, gz, 0.02, 0.02, 0.9, '#3a3a3c', 5);
  colliders.push(box(-13.85, 4.1, -12.55, 5.1, false, 1.05, true));
  surf('generator', 'Diesel generator', 'generator', [-13.2, 0.5, 4.6], [1.3, 1.1, 0.95], [1, 0, 0], props.baseOf('#d2492e'));
  const generatorPos = new THREE.Vector3(-13.2, 0.6, 4.6);

  // clothes line with ankara-coloured cloths
  const lineProps = place(-7.5, 0, 0);
  for (const z of [-3.6, 3.6]) {
    cy(props, lineProps, 0, 0, z, 0.06, 0.05, 2.6, '#4a3a2c', 6);
    colliders.push(circle(-7.5, z, 0.1));
  }
  bx(props, lineProps, 0, 2.43, 0, 0.012, 0.012, 7.2, '#2a2a2a');
  const clothColors = ['#d9382c', '#f2f0e6', '#2a5db0', '#f2c230', '#2f9d57', '#e2762c', '#7b3fa0', '#f4a8c0', '#1d1d1f'];
  clothColors.forEach((c, k) => {
    const h = 0.95 + (k % 3) * 0.12;
    const w = 0.5 + (k % 2) * 0.12;
    const z = -3.1 + k * 0.78;
    const m = place(-7.5 + ((k * 7) % 5) * 0.012, 0, z, ((k % 3) - 1) * 0.15);
    bx(props, m, 0, 2.4 - h / 2, 0, 0.025, h, w, c);
    surf(`cloth_${k}`, 'Cloth on the line', 'cloth', [-7.5, 2.4 - h / 2, z], [0.3, h, w], [1, 0, 0], props.baseOf(c));
  });

  // wooden bench and table
  const benchM = place(-4.5, 0, 8.35);
  bx(wood, benchM, 0, 0.45, 0, 2.2, 0.06, 0.45, '#8a5a32');
  for (const lx of [-0.95, 0.95]) bx(wood, benchM, lx, 0.22, 0, 0.08, 0.44, 0.38, '#6e4526');
  colliders.push(box(-5.6, 8.1, -3.4, 8.6, false, 0.5, true));
  surf('bench', 'Wooden bench', 'bench', [-4.5, 0.3, 8.35], [2.2, 0.6, 0.45], [0, 0, 1], wood.baseOf('#8a5a32'));
  const tableM = place(5.0, 0, -8.0);
  bx(wood, tableM, 0, 0.74, 0, 1.4, 0.06, 0.8, '#7d5030');
  for (const [lx, lz] of [[-0.62, -0.33], [0.62, -0.33], [-0.62, 0.33], [0.62, 0.33]] as const) bx(wood, tableM, lx, 0.37, lz, 0.07, 0.74, 0.07, '#5f3b20');
  colliders.push(box(4.3, -8.4, 5.7, -7.6, false, 0.77, true));
  surf('table', 'Wooden table', 'table', [5.0, 0.4, -8.0], [1.4, 0.8, 0.8], [0, 0, 1], wood.baseOf('#7d5030'));

  // ---------------------------------------------------------------- more things to hide on (each registers a surface and a collider; climbable ones have a top height)
  const TAU = Math.PI * 2;
  const rnd = rng(77);
  // sacks piled against the north facade
  const SACK = '#d6c7a0';
  const sack = (x: number, y: number, z: number, ry: number, color = SACK) => {
    const g = new THREE.SphereGeometry(0.5, 8, 6);
    g.scale(0.72, 0.3, 0.5);
    props.add(g, place(x, y, z, ry), color);
  };
  for (const [x, y, z, ry, c] of [[-0.55, 0.15, -8.1, 0.1, SACK], [0.02, 0.15, -8.06, -0.15, '#a8402f'], [0.57, 0.15, -8.12, 0.2, SACK], [-0.27, 0.42, -8.08, 0.05, '#4b7a45'], [0.28, 0.42, -8.1, -0.1, SACK], [0, 0.69, -8.09, 0.2, SACK]] as const) sack(x, y, z, ry, c);
  colliders.push(box(-0.95, -8.45, 0.95, -7.75, false, 0.82, true));
  surf('sacks', 'Pile of sacks', 'sacks', [0, 0.45, -8.1], [1.9, 0.9, 0.7], [0, 0, 1], props.baseOf(SACK));

  // stacked tyres by the gate
  const TYRE = '#1d1d20';
  for (let i = 0; i < 4; i++) props.add(new THREE.TorusGeometry(0.26, 0.09, 6, 12), place(12.9, 0.09 + i * 0.18, -3.5, i * 0.5, Math.PI / 2), TYRE);
  props.add(new THREE.TorusGeometry(0.26, 0.09, 6, 12), place(12.2, 0.09, -3.95, 0.3, Math.PI / 2), TYRE);
  colliders.push(circle(12.9, -3.5, 0.38, 0.76, true), circle(12.2, -3.95, 0.36, 0.18, true));
  surf('tyres', 'Stack of tyres', 'tyres', [12.9, 0.4, -3.5], [0.8, 0.8, 0.8], [-1, 0, 0], props.baseOf(TYRE));

  // gas cylinders against the south wall
  const gas = (x: number, z: number, color: string) => {
    props.add(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 10), place(x, 0.025, z), '#2b2b2b');
    props.add(new THREE.CylinderGeometry(0.16, 0.16, 0.46, 10), place(x, 0.28, z), color);
    props.add(new THREE.SphereGeometry(0.16, 10, 5, 0, TAU, 0, Math.PI / 2), place(x, 0.51, z), color);
    props.add(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 6), place(x, 0.7, z), '#d9b34a');
  };
  for (const [x, z, c] of [[-13.6, 8.2, '#c0291f'], [-13.05, 8.35, '#2f7d3a'], [-13.3, 7.8, '#c0291f']] as const) gas(x, z, c);
  colliders.push(box(-13.9, 7.5, -12.75, 8.6, false, 0.66, true));
  surf('gas', 'Gas cylinders', 'gas', [-13.3, 0.35, 8.1], [1.2, 0.7, 1.1], [0, 0, -1], props.baseOf('#c0291f'));

  // market stall: table with ankara bolts, and a striped umbrella that fades when it is between the camera and you
  const stall = place(3.4, 0, -3.4);
  bx(wood, stall, 0, 0.76, 0, 1.7, 0.06, 0.8, '#8a5a32');
  for (const [lx, lz] of [[-0.78, -0.33], [0.78, -0.33], [-0.78, 0.33], [0.78, 0.33]] as const) bx(wood, stall, lx, 0.38, lz, 0.06, 0.76, 0.06, '#5f3b20');
  const bolts = ['#d13b2e', '#f1c232', '#2a5db0', '#2f9d57', '#e2762c', '#7b3fa0', '#f4a8c0', '#17a2a8'];
  bolts.forEach((c, i) => bx(props, stall, -0.62 + (i % 4) * 0.42, 0.86 + Math.floor(i / 4) * 0.15, (i % 2) * 0.1 - 0.05, 0.38, 0.14, 0.3, c));
  props.add(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6), place(3.4, 1.15, -3.4), '#3a3a38');
  colliders.push(box(2.55, -3.8, 4.25, -3.0, false, 0.8, true));
  surf('stall_fabric', 'Market stall (ankara bolts)', 'fabric', [3.4, 0.95, -3.4], [1.7, 0.5, 0.8], [0, 0, 1], props.baseOf('#d13b2e'));
  const umbrellaFade = new FadeGroup('umbrella');
  fadeGroups.push(umbrellaFade);
  const umbrella = new StaticBatch('umbrella', null, { fade: umbrellaFade, doubleSide: true });
  const wedgeColors = ['#d13b2e', '#f1c232'];
  for (let i = 0; i < 8; i++) umbrella.add(new THREE.CylinderGeometry(0.03, 1.4, 0.45, 3, 1, true, (i * TAU) / 8, TAU / 8), place(3.4, 2.3, -3.4), wedgeColors[i % 2]);
  addMesh(umbrella.build());
  surf('umbrella', 'Market umbrella', 'canopy', [3.4, 2.3, -3.4], [2.8, 0.5, 2.8], [0, -1, 0], umbrella.baseOf('#d13b2e'));

  // hollow-block steps against the south veranda wall: 0.4, 0.8 and 1.2 m, each a walkable step up from the last
  const BLOCK = '#9b9a93';
  for (const [z0, z1, h] of [[6.95, 7.4, 0.4], [7.4, 7.85, 0.8], [7.85, 8.3, 1.2]] as const) {
    props.span(10.0, 0, z0, 11.4, h, z1, BLOCK);
    colliders.push(box(10.0, z0, 11.4, z1, false, h, true));
  }
  surf('block_steps', 'Hollow-block steps', 'blocks', [10.7, 0.6, 7.6], [1.4, 1.2, 1.35], [0, 0, -1], props.baseOf(BLOCK));

  // water tank on a steel stand
  const tankM = place(14.0, 0, 7.4);
  for (const [lx, lz] of [[-0.42, -0.42], [0.42, -0.42], [-0.42, 0.42], [0.42, 0.42]] as const) cy(props, tankM, lx, 0, lz, 0.045, 0.045, 1.32, '#4a4d52', 6);
  bx(props, tankM, 0, 1.36, 0, 1.0, 0.08, 1.0, '#4a4d52');
  cy(props, tankM, 0, 1.4, 0, 0.5, 0.48, 0.95, '#25282b', 14);
  props.add(new THREE.SphereGeometry(0.48, 14, 5, 0, TAU, 0, Math.PI / 2), tankM.clone().multiply(place(0, 2.35, 0)), '#2f3235');
  colliders.push(circle(14.0, 7.4, 0.6));
  surf('water_tank', 'Black water tank on a stand', 'tank', [14.0, 1.4, 7.4], [1.1, 2.8, 1.1], [-1, 0, 0], props.baseOf('#25282b'));

  // firewood stacked against the west wall, north of the sign wall
  const WOOD1 = '#6a4a2c';
  const WOOD2 = '#7d5a36';
  [[-14.38, 0.1, 0], [-14.14, 0.1, 0], [-13.9, 0.1, 0], [-14.26, 0.29, 0], [-14.02, 0.29, 0], [-14.14, 0.48, 0]].forEach(([x, y], i) => {
    for (let k = 0; k < 2; k++) props.add(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 7), place(x, y, -4.45 + k * 0.52 + (rnd() - 0.5) * 0.04, 0, Math.PI / 2), (i + k) % 2 ? WOOD1 : WOOD2);
  });
  colliders.push(box(-14.65, -4.75, -13.75, -3.9, false, 0.62, true));
  surf('firewood', 'Firewood stack', 'firewood', [-14.2, 0.3, -4.2], [0.9, 0.65, 1.0], [1, 0, 0], props.baseOf(WOOD1));

  // an okada (motorbike) parked in the open yard
  const OKADA = '#b8321f';
  const bike = place(-1.5, 0, -3.3);
  for (const wx of [-0.7, 0.7]) {
    props.add(new THREE.TorusGeometry(0.26, 0.07, 6, 14), bike.clone().multiply(place(wx, 0.33, 0)), '#1d1d20');
    cy(props, bike, wx, 0.28, -0.05, 0.07, 0.07, 0.1, '#9a9a9a', 8);
  }
  bx(props, bike, 0.0, 0.42, 0, 1.0, 0.07, 0.1, '#7d2417');
  bx(props, bike, 0.2, 0.64, 0, 0.42, 0.2, 0.3, OKADA);
  bx(props, bike, -0.32, 0.66, 0, 0.62, 0.1, 0.28, '#1f1f22');
  bx(props, bike, 0.05, 0.3, 0, 0.3, 0.24, 0.22, '#6b6b6b');
  bx(props, bike, 0.62, 0.58, 0, 0.05, 0.62, 0.08, '#4a4a4a', 0, -0.32);
  bx(props, bike, 0.54, 0.88, 0, 0.06, 0.05, 0.55, '#2a2a2a');
  props.add(new THREE.SphereGeometry(0.09, 8, 6), bike.clone().multiply(place(0.7, 0.8, 0)), '#f3e7a3');
  cy(props, bike, -0.4, 0.24, 0.16, 0.035, 0.03, 0.55, '#555', 6);
  colliders.push(box(-2.45, -3.55, -0.55, -3.05, false, 0.95, true));
  surf('okada', 'Okada (red motorbike)', 'bike', [-1.5, 0.5, -3.3], [1.9, 1.0, 0.45], [0, 0, 1], props.baseOf(OKADA));


  // ---------------------------------------------------------------- a container shop you can walk into and hide inside
  const CONT = '#2e7d5b';
  const contFade = new FadeGroup('container');
  fadeGroups.push(contFade);
  const cont = new StaticBatch('container', T.rusty_metal, { texel: 1.5, fade: contFade, doubleSide: true });
  cont.add(corrugatedSheet(3.2, 2.4, 14), place(7.2, 1.25, -1.0, Math.PI), CONT); // north wall (outside faces -z)
  cont.add(corrugatedSheet(3.2, 2.4, 14), place(7.2, 1.25, 1.4, 0), CONT); // south wall
  cont.add(corrugatedSheet(2.4, 2.4, 10), place(8.8, 1.25, 0.2, Math.PI / 2), CONT); // closed east end
  cont.add(corrugatedSheet(3.4, 2.6, 15), place(7.2, 2.5, 0.2, 0, -Math.PI / 2), '#2a6a4d'); // roof
  cont.add(corrugatedSheet(1.2, 2.3, 6), place(5.0, 1.2, -1.07, Math.PI), '#2a5db0'); // the two doors, swung open against the sides
  cont.add(corrugatedSheet(1.2, 2.3, 6), place(5.0, 1.2, 1.47, 0), '#2a5db0');
  cont.add(new THREE.BoxGeometry(0.12, 2.5, 0.12), place(5.6, 1.25, -0.98), '#23272b'); // door frame posts and lintel
  cont.add(new THREE.BoxGeometry(0.12, 2.5, 0.12), place(5.6, 1.25, 1.38), '#23272b');
  cont.add(new THREE.BoxGeometry(0.14, 0.14, 2.5), place(5.6, 2.45, 0.2), '#23272b');
  addMesh(cont.build());
  bx(wood, place(7.2, 0, 0.2), 0, 0.05, 0, 3.0, 0.1, 2.3, '#7a5a38'); // raised plank floor: a 10 cm step
  colliders.push(box(5.5, -1.1, 8.9, -0.97, true), box(5.5, 1.34, 8.9, 1.47, true), box(8.77, -1.1, 8.9, 1.47, true), box(4.4, -1.15, 5.6, -0.99, true), box(4.4, 1.38, 5.6, 1.52, true), box(5.7, -0.9, 8.7, 1.3, false, 0.1, true));
  // inside: a bottle-crate stack and two sacks in the back corner to tuck in behind
  for (const [cx, cz, h, c] of [[8.35, -0.55, 0.3, '#e8b520'], [8.35, -0.55, 0.6, '#c0291f']] as const) props.span(cx - 0.3, 0.1 + (h - 0.3), cz - 0.22, cx + 0.3, 0.1 + h, cz + 0.22, c);
  sack(8.3, 0.25, 0.85, 0.3);
  sack(8.28, 0.5, 0.82, -0.2, '#a8402f');
  colliders.push(box(8.03, -0.77, 8.67, -0.33, false, 0.7, true), circle(8.3, 0.85, 0.34, 0.65, true));
  surf('container_north', 'Container shop, outer wall', 'container', [7.2, 1.25, -1.0], [3.2, 2.4, 0.2], [0, 0, -1], cont.baseOf(CONT));
  surf('container_south', 'Container shop, outer wall', 'container', [7.2, 1.25, 1.4], [3.2, 2.4, 0.2], [0, 0, 1], cont.baseOf(CONT));
  surf('container_inside', 'Container shop, inner back wall', 'container', [8.7, 1.25, 0.2], [0.2, 2.4, 2.3], [-1, 0, 0], cont.baseOf(CONT));
  surf('container_doors', 'Container doors (blue)', 'container', [5.0, 1.2, -1.07], [1.2, 2.3, 0.2], [0, 0, -1], cont.baseOf('#2a5db0'));

  // more things to climb: bottle-crate stairs, a concrete planter, and cement bags on a pallet
  for (const [i, h, c] of [[0, 0.3, '#e8b520'], [1, 0.6, '#c0291f'], [2, 0.9, '#e8b520']] as const) {
    const x0 = -5.6 + i * 0.55;
    props.span(x0, 0, 3.2, x0 + 0.55, h, 3.75, c);
    props.span(x0 + 0.05, h, 3.25, x0 + 0.5, h + 0.015, 3.7, '#6f5410');
    colliders.push(box(x0, 3.2, x0 + 0.55, 3.75, false, h, true));
  }
  surf('crate_stairs', 'Crate stairs', 'crates', [-4.8, 0.45, 3.5], [1.65, 0.9, 0.55], [0, 0, 1], props.baseOf('#e8b520'));
  props.span(-9.8, 0, 5.9, -6.8, 0.85, 6.5, '#a9a79f');
  props.span(-9.7, 0.85, 5.95, -6.9, 0.92, 6.45, '#4e6b34');
  colliders.push(box(-9.8, 5.9, -6.8, 6.5, false, 0.85, true));
  surf('planter', 'Concrete planter', 'planter', [-8.3, 0.45, 6.2], [3.0, 0.9, 0.6], [0, 0, -1], props.baseOf('#a9a79f'));
  bx(wood, place(-10.0, 0, 3.4), 0, 0.075, 0, 1.2, 0.15, 1.0, '#8a6a42');
  for (let l = 0; l < 4; l++) for (const [ox, oz] of [[-0.28, -0.2], [0.28, -0.2], [-0.28, 0.2], [0.28, 0.2]] as const) bx(props, place(-10.0 + (l % 2) * 0.03, 0, 3.4, l * 0.5), ox, 0.21 + l * 0.12, oz, 0.5, 0.12, 0.33, l % 2 ? '#b8b2a4' : '#a39d90');
  colliders.push(box(-10.6, 2.9, -9.4, 3.9, false, 0.66, true));
  surf('cement_bags', 'Cement bags on a pallet', 'sacks', [-10.0, 0.4, 3.4], [1.2, 0.8, 1.0], [0, 0, -1], props.baseOf('#b8b2a4'));

  addMesh(props.build());
  addMesh(wood.build());

  // ---------------------------------------------------------------- Kenney props (instanced)
  // hand-picked foliage greens (the pack's own greens read as mint under the warm sun + blue sky light)
  const LEAF = '#5a8a38';
  const foliage = { grass: toon(LEAF), leafsGreen: toon('#4f8a3a'), woodBark: toon('#8a6a46') };
  const instanced = (name: (typeof MODELS)[number], placements: Placement[], opts: Parameters<typeof instanceParts>[2] = {}) => {
    for (const im of instanceParts(models[name], placements, opts)) group.add(im);
  };

  // leaning zinc sheets on the south veranda
  const sheetP: Placement[] = [
    { x: -0.95, z: 8.55, rx: 0.2, s: [4.2, 3.4, 4.2], tint: '#d49a6a' },
    { x: 0.0, z: 8.55, rx: 0.22, ry: 0.06, s: [4.2, 3.4, 4.2], tint: '#b9bec3' },
    { x: 0.95, z: 8.55, rx: 0.2, ry: -0.05, s: [4.2, 3.4, 4.2], tint: '#e0b896' },
  ];
  instanced('surv_metal-panel', sheetP);
  colliders.push(box(-1.6, 8.3, 1.6, 8.9));
  sheetP.forEach((p, k) => surf(`sheet_${k}`, 'Leaning zinc sheet', 'sheets', [p.x, 0.9, 8.6], [2.0, 1.8, 0.4], [0, 0, 1], propBaseColor(models['surv_metal-panel'][0], p.tint)));

  // crates in the north-east corner
  const crateP: Placement[] = [
    { x: 12.4, z: -8.0, s: 3.4 },
    { x: 13.4, z: -8.05, ry: 0.15, s: 3.4 },
    { x: 12.9, y: 0.86, z: -8.0, ry: 0.4, s: 3.4 },
  ];
  instanced('surv_box', crateP);
  instanced('surv_box-large', [{ x: 14.1, z: -6.9, ry: 1.2, s: 3.4 }]);
  // two crates on the floor (climbable, 0.85 m) with a third stacked on top (1.71 m: jump from the first level)
  colliders.push(box(11.95, -8.45, 12.85, -7.55, false, 0.85, true), box(12.95, -8.5, 13.85, -7.6, false, 0.85, true), box(12.45, -8.45, 13.35, -7.55, false, 1.71, true), circle(14.1, -6.9, 0.6, 0.85, true));
  surf('crates', 'Stacked crates', 'crates', [13.0, 0.6, -7.9], [2.4, 1.3, 1.1], [0, 0, 1], propBaseColor(models['surv_box'][0]));

  // buckets, traffic cones
  const bucketP: Placement[] = [
    { x: 1.55, z: -8.3, s: 2.3, tint: '#e0503c' },
    { x: -7.2, z: -8.0, s: 2.3, tint: '#2a6fd0' },
    { x: -12.0, z: 8.05, s: 2.3, tint: '#f0c030' },
    { x: 12.5, z: 7.9, s: 2.3, tint: '#3da35a' },
  ];
  instanced('surv_bucket', bucketP);
  bucketP.forEach((p) => colliders.push(circle(p.x, p.z, 0.2, 0.44, true)));
  const coneP: Placement[] = [{ x: 8.0, z: 3.1 }, { x: 8.3, z: 6.0 }, { x: 13.7, z: -3.4 }];
  instanced('car_cone', coneP);
  coneP.forEach((p) => colliders.push(circle(p.x, p.z, 0.22)));

  // bushes and palms: two bushes inside the compound, the rest outside the walls
  const bushP: Placement[] = [
    { x: 13.9, z: -5.4, s: 5.2, ry: 0.4 },
    { x: -13.7, z: 2.0, s: 5.0, ry: 2.0 },
    { x: -17.5, z: -11, s: 5.5 },
    { x: -18.5, z: 6, s: 6 },
    { x: 18, z: -12.5, s: 5.5, ry: 1 },
    { x: 19, z: 8.5, s: 5.2 },
    { x: -4, z: -17.5, s: 5.5 },
    { x: 6, z: 18, s: 5.2 },
  ];
  instanced('nat_plant_bushLarge', bushP, { materials: foliage });
  colliders.push(circle(13.9, -5.4, 0.85), circle(-13.7, 2.0, 0.8));
  surf('bush_east', 'Bush against the east fence', 'foliage', [13.9, 0.6, -5.4], [2, 1.2, 2], [1, 0, 0], new THREE.Color(LEAF));
  surf('bush_west', 'Bush by the west wall', 'foliage', [-13.7, 0.6, 2.0], [2, 1.2, 2], [-1, 0, 0], new THREE.Color(LEAF));
  instanced('nat_plant_bush', [{ x: -6, z: -17, s: 5 }, { x: 10, z: -18, s: 5, ry: 2 }, { x: 22, z: 2, s: 5 }, { x: -21, z: -3, s: 5 }], { materials: foliage });
  instanced('nat_tree_palm', [{ x: -19, z: -4, s: 4.5 }, { x: -20, z: 12, s: 4.2, ry: 1 }, { x: 20, z: -9, s: 4.4 }, { x: 21, z: 12, s: 4.6, ry: 2 }, { x: -9, z: -19, s: 4.4 }, { x: 11, z: 20, s: 4.3 }], { materials: foliage });
  instanced('nat_tree_palmShort', [{ x: 18, z: 0, s: 4 }, { x: 4, z: -20, s: 4, ry: 1 }, { x: -22, z: 7, s: 4, ry: 2 }], { materials: foliage });

  // ---------------------------------------------------------------- the danfo, parked beside the gate
  const van = models['car_van'];
  const body = van.find((p) => p.name === 'body')!;
  const wheels = van.filter((p) => p.name.startsWith('wheel'));
  const danfoGroup = new THREE.Group();
  // parked 0.55 m further west than it looks natural, so the lane between its east end and the fence is wide enough for the masquerade to walk through
  // (otherwise the alley behind it was a dead end the seeker could only look into from one side)
  danfoGroup.position.set(10.65, 0, 4.4);
  danfoGroup.rotation.y = Math.PI / 2;
  danfoGroup.scale.set(1.35, 1.7, 1.7);
  const bodyMesh = new THREE.Mesh(body.geometry, danfoMaterial(body.material.map));
  bodyMesh.applyMatrix4(body.local);
  bodyMesh.castShadow = bodyMesh.receiveShadow = true;
  bodyMesh.name = 'danfo-body';
  bodyMesh.userData.baseColor = new THREE.Color(DANFO_YELLOW);
  const wheelGeos = wheels.map((w) => w.geometry.clone().applyMatrix4(w.local));
  const wheelMesh = new THREE.Mesh(mergeGeometries(wheelGeos, false), wheels[0].material);
  wheelMesh.castShadow = true;
  wheelMesh.name = 'danfo-wheels';
  wheelMesh.userData.baseColor = wheels[0].baseColor.clone();
  danfoGroup.add(bodyMesh, wheelMesh);
  group.add(danfoGroup);
  colliders.push(box(8.3, 3.35, 13.0, 5.45, true));
  surf('danfo', 'Danfo (yellow, black stripes)', 'vehicle', [10.65, 1.0, 4.4], [4.7, 2.1, 2.0], [0, 0, -1], new THREE.Color(DANFO_YELLOW));

  // ---------------------------------------------------------------- hiding spots (every one reads its colour from the registry)
  const V = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const dir = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const spotDefs: { id: string; label: string; shape: string; at: THREE.Vector3; facing: THREE.Vector3; reach?: number; probeY?: number }[] = [
    { id: 'sign_wall', label: 'Painted turquoise wall (THIS HOUSE IS NOT FOR SALE)', shape: 'flat wall', at: V(-11.6, -0.9), facing: dir(0, -1) },
    { id: 'post_no_bill', label: 'POST NO BILL cream patch', shape: 'flat wall, small patch', at: V(-10.9, -8.45), facing: dir(0, -1), probeY: 1.55 },
    { id: 'drums_a', label: 'Blue drum cluster', shape: 'round cluster', at: V(-10.2, -4.5), facing: dir(0, -1) },
    { id: 'drums_b', label: 'Blue drums by the south veranda', shape: 'round cluster', at: V(4.9, 4.55), facing: dir(0, 1) },
    { id: 'doorway_north', label: 'Red doorway recess (north row)', shape: 'recess', at: V(-2.5, zAtNorth(0.45)), facing: dir(0, -1), reach: 0.4 },
    { id: 'doorway_south', label: 'Yellow doorway recess (south row)', shape: 'recess', at: V(-7.5, 9 + 0.45), facing: dir(0, 1), reach: 0.4 },
    { id: 'clothesline', label: 'Under the clothes line', shape: 'hanging cloth, multicolour', at: V(-7.5, 0.35), facing: dir(0, 1) },
    { id: 'danfo', label: 'Beside the danfo', shape: 'long vehicle', at: V(10.65, 2.95), facing: dir(0, 1) },
    { id: 'zinc_fence', label: 'Against the zinc fence', shape: 'corrugated fence', at: V(14.3, 6.2), facing: dir(1, 0) },
    { id: 'generator', label: 'Behind the generator', shape: 'box block', at: V(-14.2, 4.6), facing: dir(1, 0) },
    { id: 'chairs_stack', label: 'Stacked white chairs', shape: 'tall stack', at: V(9.3, 7.65), facing: dir(0, 1) },
    { id: 'bush_east', label: 'Bush in the east corner', shape: 'foliage', at: V(12.75, -5.4), facing: dir(1, 0) },
    { id: 'bench', label: 'Wooden bench on the south veranda', shape: 'low bench', at: V(-4.5, 7.6), facing: dir(0, 1) },
    { id: 'sheets', label: 'Rusty zinc sheets leaning on the wall', shape: 'leaning slabs', at: V(0, 7.9), facing: dir(0, 1) },
    { id: 'crates', label: 'Stacked crates', shape: 'stepped boxes', at: V(12.9, -6.9), facing: dir(0, -1) },
    { id: 'container', label: 'Inside the container shop', shape: 'enclosed box, one open side', at: V(8.3, 0.2), facing: dir(1, 0), probeY: 1.0 },
    { id: 'crate_stairs', label: 'Bottle-crate stairs (climbable)', shape: 'stepped crates', at: V(-4.8, 2.55), facing: dir(0, 1), probeY: 0.4 },
    { id: 'planter', label: 'Concrete planter (climbable)', shape: 'long low wall', at: V(-8.3, 5.2), facing: dir(0, 1), probeY: 0.5 },
    { id: 'cement_bags', label: 'Cement bags on a pallet (climbable)', shape: 'grey pile', at: V(-10.0, 2.5), facing: dir(0, 1), probeY: 0.4 },
    { id: 'sacks', label: 'Pile of sacks', shape: 'soft pile', at: V(0, -7.25), facing: dir(0, -1) },
    { id: 'tyres', label: 'Stack of tyres', shape: 'black stack', at: V(11.85, -3.4), facing: dir(1, 0) },
    { id: 'gas', label: 'Gas cylinders', shape: 'round cluster, low', at: V(-13.3, 7.0), facing: dir(0, 1) },
    { id: 'stall_fabric', label: 'Market stall with ankara bolts', shape: 'multicolour table', at: V(3.4, -2.6), facing: dir(0, -1), probeY: 0.9 },
    { id: 'block_steps', label: 'Hollow-block steps (climbable)', shape: 'stepped blocks', at: V(10.7, 6.45), facing: dir(0, 1), probeY: 0.4 },
    { id: 'water_tank', label: 'Water tank on a stand', shape: 'tall cylinder', at: V(13.1, 7.4), facing: dir(1, 0), probeY: 1.6 },
    { id: 'firewood', label: 'Firewood stack', shape: 'low log pile', at: V(-13.1, -4.2), facing: dir(-1, 0), probeY: 0.4 },
    { id: 'okada', label: 'Okada (motorbike)', shape: 'low vehicle', at: V(-1.5, -2.45), facing: dir(0, -1), probeY: 0.5 },
    { id: 'north_wall', label: 'Turquoise band under the north veranda', shape: 'flat wall band', at: V(-12.5, -8.5), facing: dir(0, -1) },
  ];
  function zAtNorth(d: number) {
    return -9 - d;
  }
  const hidingSpots: HidingSpot[] = spotDefs.map((d) => {
    const probe = d.at.clone().addScaledVector(d.facing, d.reach ?? 0.55);
    probe.y = d.probeY ?? 0.9;
    const near = { s: surfaces.nearest(probe, 1.5)! };
    const p = { x: d.at.x, z: d.at.z };
    if (resolveCollisions(p, PLAYER_RADIUS - 0.02, colliders)) console.warn(`[compound] hiding spot ${d.id} overlaps a collider (would move to ${p.x.toFixed(2)}, ${p.z.toFixed(2)})`);
    return { id: d.id, label: d.label, shape: d.shape, position: d.at, facing: d.facing.normalize(), baseColor: near.s.baseColor.clone(), surfaceId: near.s.id };
  });

  // debug markers: a floating diamond above each spot and a ring on the floor, two instanced draws, hidden unless asked for
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
    group,
    colliders,
    surfaces,
    hidingSpots,
    fadeGroups,
    bounds: { minX: -HALF + 0.3, maxX: 14.75, minZ: -9.6, maxZ: 9.6 }, // the yard only: the gate is the way home, not a way out
    id: 'compound',
    name: 'The Compound',
    assetCount: COMPOUND_ASSET_COUNT,
    chickenCount: 7,
    ambience: { chatter: 1, generator: true },
    seekerStart: { x: 13.2, z: 0, yaw: -Math.PI / 2 },
    lobbyPos: { x: 0.5, z: 0.5 },
    chickenArea: { minX: -14.2, maxX: 14.2, minZ: -8.7, maxZ: 8.7 },
    ground: { halfX: 15, halfZ: 9, patches: COMPOUND_DIRT },
    spawn: new THREE.Vector3(0.5, 0, 0.5),
    generator: generatorPos,
    gate: { x: 14.6, z: 0, halfWidth: 2.6 },
    baseColorAt: (p) => surfaces.baseColorAt(p),
    setMarkersVisible: (v) => (markers.visible = v),
  };
}

// --- late-afternoon light (palette from the Lagos reference pull: #479fe0 sky, #ccccc2 haze, #d88b47 sun, #514d48 shadow) -----------

export function addCompoundLighting(scene: THREE.Scene, shadowMapSize: number) {
  scene.background = new THREE.Color('#d9b88f');
  scene.fog = new THREE.Fog('#d9b48b', 42, 105);
  const hemi = new THREE.HemisphereLight('#b4c8e4', '#80603f', 1.3);
  const sun = new THREE.DirectionalLight('#ffcf9a', 3.0);
  sun.castShadow = true;
  let mapSize = shadowMapSize;
  sun.shadow.mapSize.set(mapSize, mapSize);
  const cam = sun.shadow.camera;
  cam.left = cam.bottom = -17;
  cam.right = cam.top = 17;
  cam.near = 1;
  cam.far = 110;
  sun.shadow.radius = 2.5;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  scene.add(sun, sun.target, hemi);
  const toSun = new THREE.Vector3(-0.72, 0.5, 0.42).normalize();
  // the mood: late afternoon by default; a blackout (NEPA took the light) or rain pull everything towards night or a grey sky
  const day = { bg: new THREE.Color('#d9b88f'), fog: new THREE.Color('#d9b48b'), near: 42, far: 105, hemi: 1.3, sun: 3.0, hemiSky: new THREE.Color('#b4c8e4'), hemiGround: new THREE.Color('#80603f') };
  const night = { bg: new THREE.Color('#0b1124'), near: 7, far: 48, hemi: 0.42, sun: 0.28, hemiSky: new THREE.Color('#5b72b8'), hemiGround: new THREE.Color('#2b2a3a') };
  const grey = { bg: new THREE.Color('#a9b0b8'), near: 22, far: 70, hemi: 1.05, sun: 1.5 };
  return {
    sun,
    /** dark 0..1 (a blackout) and rain 0..1 (a grey, dimmer afternoon). */
    setMood(dark: number, rain: number) {
      const d = Math.min(1, Math.max(0, dark));
      const r = Math.min(1, Math.max(0, rain)) * (1 - d);
      const bg = day.bg.clone().lerp(grey.bg, r).lerp(night.bg, d);
      (scene.background as THREE.Color).copy(bg);
      const fog = scene.fog as THREE.Fog;
      fog.color.copy(bg);
      fog.near = day.near + (grey.near - day.near) * r + (night.near - day.near) * d;
      fog.far = day.far + (grey.far - day.far) * r + (night.far - day.far) * d;
      hemi.intensity = day.hemi + (grey.hemi - day.hemi) * r + (night.hemi - day.hemi) * d;
      sun.intensity = day.sun + (grey.sun - day.sun) * r + (night.sun - day.sun) * d;
      hemi.color.copy(day.hemiSky).lerp(night.hemiSky, d);
      hemi.groundColor.copy(day.hemiGround).lerp(night.hemiGround, d);
    },
    /** Lower the shadow resolution while playing (auto quality). */
    setShadowSize(n: number) {
      if (n === mapSize) return;
      mapSize = n;
      sun.shadow.mapSize.set(n, n);
      sun.shadow.map?.dispose();
      sun.shadow.map = null;
    },
    /** Keep the shadow box centred on the player (snapped so shadow edges don't shimmer). */
    follow(p: THREE.Vector3) {
      // snap the shadow box to whole shadow-map texels in light space, so shadow edges don't swim as the player walks
      const texel = 34 / mapSize;
      const right = new THREE.Vector3(0, 1, 0).cross(toSun).normalize();
      const up = new THREE.Vector3().crossVectors(toSun, right);
      const sx = Math.round((p.x * right.x + p.z * right.z) / texel) * texel;
      const sy = Math.round((p.x * up.x + p.y * up.y + p.z * up.z) / texel) * texel;
      const depth = p.x * toSun.x + p.y * toSun.y + p.z * toSun.z;
      sun.target.position.copy(right).multiplyScalar(sx).addScaledVector(up, sy).addScaledVector(toSun, depth);
      sun.position.copy(sun.target.position).addScaledVector(toSun, 60);
    },
  };
}
