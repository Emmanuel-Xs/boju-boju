// Shared level-building tools: textures that know their average colour, static batches merged into one draw call each,
// instanced Kenney props, a registry of "surfaces" that carry userData.baseColor, and fade groups for walls in front of the camera.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { toon } from '../toon';

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

// --- textures ------------------------------------------------------------------------------------------------------

/** Reads pixels from an image at a fixed small size; colours come back in linear space, like the shader sees them. */
export class PixelSampler {
  private data: Uint8ClampedArray;
  constructor(private image: CanvasImageSource, readonly size = 128) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(image, 0, 0, size, size);
    this.data = ctx.getImageData(0, 0, size, size).data;
  }
  at(u: number, v: number, out = new THREE.Color()): THREE.Color {
    const x = Math.min(this.size - 1, Math.max(0, Math.floor((u - Math.floor(u)) * this.size)));
    const y = Math.min(this.size - 1, Math.max(0, Math.floor((v - Math.floor(v)) * this.size)));
    const o = (y * this.size + x) * 4;
    return out.setRGB(srgbToLinear(this.data[o] / 255), srgbToLinear(this.data[o + 1] / 255), srgbToLinear(this.data[o + 2] / 255), THREE.LinearSRGBColorSpace);
  }
  average(): THREE.Color {
    const sum = new THREE.Color(0, 0, 0);
    const c = new THREE.Color();
    const n = this.size * this.size;
    for (let i = 0; i < n; i++) {
      const o = i * 4;
      c.setRGB(srgbToLinear(this.data[o] / 255), srgbToLinear(this.data[o + 1] / 255), srgbToLinear(this.data[o + 2] / 255), THREE.LinearSRGBColorSpace);
      sum.r += c.r;
      sum.g += c.g;
      sum.b += c.b;
    }
    return sum.multiplyScalar(1 / n);
  }
}

export interface TexInfo {
  name: string;
  tex: THREE.Texture;
  /** Average colour of the texture (linear). A surface's base colour is this times its tint. */
  avg: THREE.Color;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${url}`));
    img.src = url;
  });
}

export async function loadSurfaceTextures(names: readonly string[], onEach?: () => void): Promise<Record<string, TexInfo>> {
  const out: Record<string, TexInfo> = {};
  await Promise.all(
    names.map(async (name) => {
      const img = await loadImage(`./textures/surfaces/${name}.webp`);
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
      tex.needsUpdate = true;
      out[name] = { name, tex, avg: new PixelSampler(img, 32).average() };
      onEach?.();
    }),
  );
  return out;
}

// --- static batches ------------------------------------------------------------------------------------------------

export class FadeGroup {
  readonly boxes: THREE.Box3[] = [];
  readonly materials: THREE.Material[] = [];
  opacity = 1;
  target = 1;
  constructor(readonly name: string) {}

  /** True when the segment a-b passes through any solid of this group (boxes are grown by `radius`). */
  blocks(a: THREE.Vector3, b: THREE.Vector3, radius: number): boolean {
    for (const box of this.boxes) {
      let t0 = 0;
      let t1 = 1;
      let hit = true;
      for (const axis of ['x', 'y', 'z'] as const) {
        const d = b[axis] - a[axis];
        const lo = box.min[axis] - radius;
        const hi = box.max[axis] + radius;
        if (Math.abs(d) < 1e-9) {
          if (a[axis] < lo || a[axis] > hi) {
            hit = false;
            break;
          }
        } else {
          let ta = (lo - a[axis]) / d;
          let tb = (hi - a[axis]) / d;
          if (ta > tb) [ta, tb] = [tb, ta];
          t0 = Math.max(t0, ta);
          t1 = Math.min(t1, tb);
          if (t0 > t1) {
            hit = false;
            break;
          }
        }
      }
      if (hit) return true;
    }
    return false;
  }

  /** Ease towards the target opacity. */
  update(dt: number): void {
    this.opacity += (this.target - this.opacity) * Math.min(1, dt * 9);
    if (Math.abs(this.opacity - this.target) < 0.01) this.opacity = this.target;
    for (const m of this.materials) m.opacity = this.opacity;
  }
}

export interface BatchOptions {
  /** Metres of world per texture repeat. */
  texel?: number;
  /** Render both faces (single-sheet geometry such as zinc). */
  doubleSide?: boolean;
  fade?: FadeGroup;
  cast?: boolean;
  receive?: boolean;
}

const tmpMat = new THREE.Matrix4();
const tmpQuat = new THREE.Quaternion();
const tmpEuler = new THREE.Euler();

/** Position + rotation (YXZ, radians) as a matrix. */
export function place(x: number, y: number, z: number, ry = 0, rx = 0, rz = 0, s = 1): THREE.Matrix4 {
  tmpQuat.setFromEuler(tmpEuler.set(rx, ry, rz, 'YXZ'));
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), tmpQuat, new THREE.Vector3(s, s, s));
}

/**
 * Collects primitives, merges them into one mesh (one draw call) with box-mapped texture coordinates and per-vertex tint.
 * Colours given to add/box are the wanted *base colour*; the vertex tint is that divided by the texture's average,
 * so what the eyedropper reads (`baseOf`) matches what the player sees on average.
 */
export class StaticBatch {
  private parts: THREE.BufferGeometry[] = [];
  private tints: THREE.Color[] = [];
  constructor(
    readonly name: string,
    readonly tex: TexInfo | null,
    private opts: BatchOptions = {},
  ) {}

  /** Tint that makes `target` the average on-screen colour, and the base colour that results from it. */
  private tintFor(target: THREE.ColorRepresentation): { tint: THREE.Color; base: THREE.Color } {
    const t = new THREE.Color(target);
    if (!this.tex) return { tint: t, base: t.clone() };
    const a = this.tex.avg;
    const tint = new THREE.Color(Math.min(4, t.r / Math.max(a.r, 0.02)), Math.min(4, t.g / Math.max(a.g, 0.02)), Math.min(4, t.b / Math.max(a.b, 0.02)));
    return { tint, base: tint.clone().multiply(a) };
  }

  /** The base colour a surface drawn in this batch gets for a wanted colour. */
  baseOf(target: THREE.ColorRepresentation): THREE.Color {
    return this.tintFor(target).base;
  }

  add(geo: THREE.BufferGeometry, matrix: THREE.Matrix4, color: THREE.ColorRepresentation): void {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
    g.applyMatrix4(matrix);
    const p = g.attributes.position;
    const n = g.attributes.normal;
    const texel = this.opts.texel ?? 2;
    const uv = new Float32Array(p.count * 2);
    const col = new Float32Array(p.count * 3);
    const { tint } = this.tintFor(color);
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const z = p.getZ(i);
      const ax = Math.abs(n.getX(i));
      const ay = Math.abs(n.getY(i));
      const az = Math.abs(n.getZ(i));
      let u: number;
      let v: number;
      if (ay >= ax && ay >= az) [u, v] = [x, z];
      else if (ax >= az) [u, v] = [z, y];
      else [u, v] = [x, y];
      uv[i * 2] = u / texel;
      uv[i * 2 + 1] = v / texel;
      col[i * 3] = tint.r;
      col[i * 3 + 1] = tint.g;
      col[i * 3 + 2] = tint.b;
    }
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeBoundingBox();
    this.opts.fade?.boxes.push(g.boundingBox!.clone());
    this.parts.push(g);
    this.tints.push(this.tintFor(color).base);
  }

  /** Box centred on (x, y, z). */
  box(x: number, y: number, z: number, w: number, h: number, d: number, color: THREE.ColorRepresentation, ry = 0, rx = 0, rz = 0): void {
    this.add(new THREE.BoxGeometry(w, h, d), place(x, y, z, ry, rx, rz), color);
  }

  /** Box from a min corner to a max corner. */
  span(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, color: THREE.ColorRepresentation): void {
    this.box((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), color);
  }

  /** Faceted cylinder standing on y = `y` (its base). */
  cyl(x: number, y: number, z: number, rBottom: number, rTop: number, h: number, color: THREE.ColorRepresentation, segs = 10): void {
    this.add(new THREE.CylinderGeometry(rTop, rBottom, h, segs), tmpMat.makeTranslation(x, y + h / 2, z).clone(), color);
  }

  get count(): number {
    return this.parts.length;
  }

  build(): THREE.Mesh | null {
    if (!this.parts.length) return null;
    const geo = mergeGeometries(this.parts, false);
    this.parts.forEach((p) => p.dispose());
    const mat = toon('#ffffff', { map: this.tex?.tex ?? null, vertexColors: true, transparent: !!this.opts.fade, side: this.opts.doubleSide ? THREE.DoubleSide : THREE.FrontSide });
    this.opts.fade?.materials.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = this.name;
    mesh.castShadow = this.opts.cast ?? true;
    mesh.receiveShadow = this.opts.receive ?? true;
    const mean = new THREE.Color(0, 0, 0);
    for (const t of this.tints) mean.add(t);
    mesh.userData.baseColor = mean.multiplyScalar(1 / this.tints.length); // fallback only; per-surface colours live in the registry
    mesh.userData.merged = true;
    return mesh;
  }
}

/** Corrugated sheet in the x-y plane: ribs run along y, the waves bulge towards +z. Faceted, so the toon light bands pick out each rib. */
export function corrugatedSheet(width: number, height: number, ribs: number, amp = 0.028, perRib = 4): THREE.BufferGeometry {
  const cols = ribs * perRib;
  const pos: number[] = [];
  const wave = (i: number) => Math.sin((i / perRib) * Math.PI * 2) * amp;
  for (let i = 0; i < cols; i++) {
    const x0 = -width / 2 + (i / cols) * width;
    const x1 = -width / 2 + ((i + 1) / cols) * width;
    const z0 = wave(i);
    const z1 = wave(i + 1);
    pos.push(x0, -height / 2, z0, x1, -height / 2, z1, x1, height / 2, z1, x0, -height / 2, z0, x1, height / 2, z1, x0, height / 2, z0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

// --- surfaces ------------------------------------------------------------------------------------------------------

export interface SurfaceInfo {
  id: string;
  label: string;
  kind: string;
  bounds: THREE.Box3;
  normal: THREE.Vector3;
  baseColor: THREE.Color;
}

/**
 * Every surface a player can hide against. Merged meshes can't carry one colour per face, so each surface also exists as an
 * invisible Object3D whose userData.baseColor is the colour the eyedropper and the seeker read (never the lit pixel colour).
 */
export class SurfaceRegistry {
  readonly group = new THREE.Group();
  readonly list: SurfaceInfo[] = [];
  private byId = new Map<string, THREE.Object3D>();

  constructor() {
    this.group.name = 'surfaces';
  }

  add(id: string, label: string, kind: string, center: [number, number, number], size: [number, number, number], normal: [number, number, number], baseColor: THREE.Color): THREE.Object3D {
    const o = new THREE.Object3D();
    o.name = `surface:${id}`;
    o.position.set(...center);
    const bounds = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(...center), new THREE.Vector3(...size));
    const info: SurfaceInfo = { id, label, kind, bounds, normal: new THREE.Vector3(...normal), baseColor: baseColor.clone() };
    o.userData = { baseColor: info.baseColor, baseColorHex: `#${info.baseColor.getHexString()}`, surfaceId: id, label, kind, normal: info.normal, bounds };
    this.group.add(o);
    this.list.push(info);
    this.byId.set(id, o);
    return o;
  }

  get(id: string): SurfaceInfo {
    const s = this.list.find((x) => x.id === id);
    if (!s) throw new Error(`unknown surface ${id}`);
    return s;
  }

  /** Base colour of whatever surface is nearest to a point (e.g. a raycast hit). */
  baseColorAt(point: THREE.Vector3, maxDistance = 0.6): THREE.Color | null {
    return this.nearest(point, maxDistance)?.baseColor.clone() ?? null;
  }

  /** Closest surface to a point; among near-ties the smallest one wins (a sign patch beats the wall it is painted on). */
  nearest(point: THREE.Vector3, maxDistance = 0.6): SurfaceInfo | null {
    const size = new THREE.Vector3();
    let best: SurfaceInfo | null = null;
    let bestD = Infinity;
    let bestVol = Infinity;
    for (const s of this.list) {
      const d = s.bounds.distanceToPoint(point);
      if (d > maxDistance) continue;
      s.bounds.getSize(size);
      const vol = Math.max(size.x, 0.05) * Math.max(size.y, 0.05) * Math.max(size.z, 0.05);
      if (d < bestD - 0.15 || (d <= bestD + 0.15 && vol < bestVol)) {
        best = s;
        bestVol = vol;
        bestD = Math.min(d, bestD);
      }
    }
    return best;
  }
}

// --- Kenney props --------------------------------------------------------------------------------------------------

export interface ModelPart {
  name: string;
  /** glTF material name (e.g. "leafsGreen"), used to swap in a hand-picked material. */
  materialName: string;
  geometry: THREE.BufferGeometry;
  material: THREE.MeshToonMaterial;
  /** Part transform inside the model. */
  local: THREE.Matrix4;
  /** Average colour of the texels this part's UVs land on (linear). */
  baseColor: THREE.Color;
}

const loader = new GLTFLoader();
const modelCache = new Map<string, Promise<ModelPart[]>>();

export function loadModelParts(name: string): Promise<ModelPart[]> {
  let p = modelCache.get(name);
  if (!p) {
    p = new Promise<ModelPart[]>((resolve, reject) => {
      loader.load(
        `./models/${name}.json`,
        (gltf) => {
          gltf.scene.updateMatrixWorld(true);
          const parts: ModelPart[] = [];
          gltf.scene.traverse((o) => {
            if (!(o instanceof THREE.Mesh)) return;
            const src = o.material as THREE.MeshStandardMaterial;
            const map = src.map ?? null;
            const material = toon(src.color ?? '#ffffff', { map });
            let baseColor = new THREE.Color(src.color ?? '#ffffff');
            const uv = o.geometry.attributes.uv;
            if (map?.image && uv) {
              const sampler = new PixelSampler(map.image as CanvasImageSource, 256);
              const sum = new THREE.Color(0, 0, 0);
              const c = new THREE.Color();
              for (let i = 0; i < uv.count; i++) {
                sampler.at(uv.getX(i), uv.getY(i), c);
                sum.add(c);
              }
              baseColor = sum.multiplyScalar(1 / uv.count).multiply(src.color ?? new THREE.Color(1, 1, 1));
            }
            parts.push({ name: o.name, materialName: src.name, geometry: o.geometry, material, local: o.matrixWorld.clone(), baseColor });
          });
          resolve(parts);
        },
        undefined,
        reject,
      );
    });
    modelCache.set(name, p);
  }
  return p;
}

export interface Placement {
  x: number;
  y?: number;
  z: number;
  ry?: number;
  rx?: number;
  s?: number | [number, number, number];
  tint?: THREE.ColorRepresentation;
}

export function placementMatrix(p: Placement): THREE.Matrix4 {
  const s = typeof p.s === 'number' ? ([p.s, p.s, p.s] as const) : (p.s ?? ([1, 1, 1] as const));
  tmpQuat.setFromEuler(tmpEuler.set(p.rx ?? 0, p.ry ?? 0, 0, 'YXZ'));
  return new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y ?? 0, p.z), tmpQuat, new THREE.Vector3(...s));
}

/** One InstancedMesh per part of the model (one draw call each). Parts with a custom material replace the default. */
export function instanceParts(parts: ModelPart[], placements: Placement[], opts: { cast?: boolean; receive?: boolean; materials?: Record<string, THREE.MeshToonMaterial> } = {}): THREE.InstancedMesh[] {
  return parts.map((part) => {
    const mat = opts.materials?.[part.materialName] ?? part.material;
    const im = new THREE.InstancedMesh(part.geometry, mat, placements.length);
    const tint = new THREE.Color();
    placements.forEach((pl, i) => {
      im.setMatrixAt(i, placementMatrix(pl).multiply(part.local));
      if (pl.tint !== undefined) im.setColorAt(i, tint.set(pl.tint));
    });
    im.instanceMatrix.needsUpdate = true;
    im.castShadow = opts.cast ?? true;
    im.receiveShadow = opts.receive ?? true;
    im.name = part.name;
    im.userData.baseColor = opts.materials?.[part.materialName]?.color.clone() ?? part.baseColor.clone();
    return im;
  });
}

/** Base colour of one placed prop: the part's colour times the instance tint. */
export function propBaseColor(part: ModelPart, tint?: THREE.ColorRepresentation): THREE.Color {
  const c = part.baseColor.clone();
  if (tint !== undefined) c.multiply(new THREE.Color(tint));
  return c;
}
