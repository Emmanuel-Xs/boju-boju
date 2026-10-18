// Level 3: the classroom. One big schoolroom, 30 m by 18 m, with the door on the east side as the way home.
//   north   the chalkboard wall: a chalkboard, a cork notice board, the teacher's desk and a globe
//   middle  four rows of pupils' desks and chairs with a clear aisle down the middle to the door
//   south   a row of blue lockers, windows with blue wax-print curtains, a fire extinguisher, a pile of school bags
//   west    three bookcases, an alphabet poster, a reading corner with a rug and cushions
// Every hideable surface is in the surface registry with a base colour, as in the other levels. A couple of stray chickens have wandered in.
import * as THREE from 'three';
import { toon } from '../toon';
import { box, circle, type Collider, resolveCollisions, PLAYER_RADIUS } from './controller';
import { ankaraTexInfo } from './ankara';
import { StaticBatch, SurfaceRegistry, loadModelParts, loadSurfaceTextures, instanceParts, propBaseColor, place, type FadeGroup, type ModelPart, type Placement } from './kit';
import type { Compound, HidingSpot } from './compound';
import type { DirtPatch } from './ground';

const TEXTURES = ['plaster_wall', 'painted_concrete', 'corrugated_metal', 'old_wood', 'cracked_tiles', 'dirt_ground'] as const;
const MODELS = ['furn_desk', 'furn_chair', 'furn_bookcaseClosed', 'furn_bookcaseOpen', 'furn_pottedPlant', 'surv_bucket'] as const;
export const CLASSROOM_ASSET_COUNT = TEXTURES.length + MODELS.length;

const HALF = 15;
/** The yard outside the door is never reached (the play area is the room), so there is no bare dirt inside. */
const NO_DIRT: readonly DirtPatch[] = [];

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

export async function createClassroom(onAsset?: () => void): Promise<Compound> {
  const [tx, ...partLists] = await Promise.all([loadSurfaceTextures(TEXTURES, onAsset), ...MODELS.map((m) => loadModelParts(m).then((p) => (onAsset?.(), p)))]);
  const models = Object.fromEntries(MODELS.map((m, i) => [m, partLists[i]])) as Record<(typeof MODELS)[number], ModelPart[]>;
  const T = tx as Record<(typeof TEXTURES)[number], NonNullable<(typeof tx)[string]>>;
  const curtainTex = ankaraTexInfo('waves');

  const group = new THREE.Group();
  group.name = 'classroom';
  const surfaces = new SurfaceRegistry();
  group.add(surfaces.group);
  const colliders: Collider[] = [];
  const fadeGroups: FadeGroup[] = [];
  const addMesh = (m: THREE.Object3D | null) => m && group.add(m);
  const surf = (id: string, label: string, kind: string, c: [number, number, number], s: [number, number, number], n: [number, number, number], base: THREE.Color) => surfaces.add(id, label, kind, c, s, n, base);
  const instanced = (name: (typeof MODELS)[number], placements: Placement[], opts: Parameters<typeof instanceParts>[2] = {}) => {
    for (const im of instanceParts(models[name], placements, opts)) group.add(im);
  };

  // ---------------------------------------------------------------- floor
  const floor = new StaticBatch('floor', T.cracked_tiles, { texel: 1.8, cast: false });
  floor.span(-HALF, -0.05, -9, HALF, 0, 9, '#c4b394');
  const runner = new StaticBatch('runner', T.corrugated_metal, { texel: 3, cast: false });
  runner.span(-HALF, 0, -1.25, HALF, 0.012, 1.25, '#8e8a7c'); // the aisle down the middle
  const outside = new StaticBatch('outside', T.dirt_ground, { texel: 4, cast: false });
  outside.span(-90, -0.12, -90, 90, -0.02, 90, '#7d6f52');
  surf('floor', 'Classroom floor tiles', 'floor', [0, 0, 0], [30, 0.1, 18], [0, 1, 0], floor.baseOf('#c4b394'));
  surf('aisle', 'Aisle runner', 'floor', [0, 0, 0], [30, 0.1, 2.5], [0, 1, 0], runner.baseOf('#8e8a7c'));
  addMesh(floor.build());
  addMesh(runner.build());
  addMesh(outside.build());

  // ---------------------------------------------------------------- walls: cream above a green band, the door gap on the east
  const walls = new StaticBatch('walls', T.plaster_wall, { texel: 3 });
  const CREAM = '#eadfc2';
  const GREEN = '#6fae92';
  const wall = (x0: number, z0: number, x1: number, z1: number) => {
    walls.span(x0, 1.1, z0, x1, 3.0, z1, CREAM);
    walls.span(x0, 0, z0, x1, 1.1, z1, GREEN);
    walls.span(x0 - 0.04, 3.0, z0 - 0.04, x1 + 0.04, 3.12, z1 + 0.04, '#6b3f23');
  };
  wall(-HALF, -9.7, HALF, -9);
  wall(-HALF, 9, HALF, 9.7);
  wall(-15.4, -9, -14.7, 9);
  colliders.push(box(-15.4, -9.8, 15.4, -9, true), box(-15.4, 9, 15.4, 9.8, true), box(-15.4, -9.8, -14.7, 9.8, true));
  surf('north_wall', 'Cream wall (north)', 'wall', [-12, 2.0, -9], [8, 1.9, 0.3], [0, 0, 1], walls.baseOf(CREAM));
  surf('green_band', 'Green wall band', 'wall', [8, 0.55, -9], [14, 1.1, 0.3], [0, 0, 1], walls.baseOf(GREEN));
  surf('south_wall', 'Cream wall (south)', 'wall', [8, 2.0, 9], [10, 1.9, 0.3], [0, 0, -1], walls.baseOf(CREAM));
  surf('west_wall', 'Cream wall (west)', 'wall', [-14.7, 2.0, 6], [0.3, 1.9, 4], [1, 0, 0], walls.baseOf(CREAM));
  // east wall with the door: two wall runs and a frame around a 5.2 m opening
  for (const side of [-1, 1]) {
    const z0 = side * 2.6;
    const z1 = side * 9;
    walls.span(14.6, 1.1, Math.min(z0, z1), 15.1, 3.0, Math.max(z0, z1), CREAM);
    walls.span(14.6, 0, Math.min(z0, z1), 15.1, 1.1, Math.max(z0, z1), GREEN);
    colliders.push(box(14.6, Math.min(z0, z1), 15.1, Math.max(z0, z1), true));
    walls.span(14.5, 0, Math.min(z0, side * 3.1), 15.2, 3.0, Math.max(z0, side * 3.1), '#e8dcb8');
    surf(`door_post_${side > 0 ? 's' : 'n'}`, 'Door post', 'wall', [14.55, 1.5, side * 2.85], [0.1, 3, 0.5], [-1, 0, 0], walls.baseOf('#e8dcb8'));
  }
  walls.span(14.5, 2.5, -2.6, 15.2, 3.0, 2.6, '#8a5a33'); // lintel
  addMesh(walls.build());

  // ---------------------------------------------------------------- chalkboard, cork notice board, alphabet poster
  const boardTex = canvasTexture(1024, 400, (ctx) => {
    ctx.fillStyle = '#2f5d46';
    ctx.fillRect(0, 0, 1024, 400);
    ctx.strokeStyle = '#8a5a33';
    ctx.lineWidth = 22;
    ctx.strokeRect(11, 11, 1002, 378);
    ctx.fillStyle = '#f2efe4';
    ctx.font = '700 70px "Comic Sans MS", "Segoe Print", cursive, sans-serif';
    ctx.fillText('TODAY: HIDE AND SEEK', 70, 130);
    ctx.font = '600 52px "Comic Sans MS", cursive, sans-serif';
    ctx.fillText('2 + 2 = 4     Boju boju o!', 80, 240);
    ctx.strokeStyle = '#f2efe4';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(820, 300, 44, 0, Math.PI * 2);
    ctx.moveTo(800, 292);
    ctx.lineTo(808, 292);
    ctx.moveTo(832, 292);
    ctx.lineTo(840, 292);
    ctx.stroke();
    ctx.fillStyle = 'rgba(240,238,228,0.25)';
    ctx.fillRect(40, 320, 400, 14);
    ctx.fillRect(40, 350, 260, 14);
  });
  group.add(decal(boardTex, 9, 3.5, 0, 1.9, -8.93, 0));
  surf('chalkboard', 'Chalkboard', 'board', [0, 1.9, -8.9], [9, 3.4, 0.2], [0, 0, 1], new THREE.Color('#2f5d46').convertSRGBToLinear());
  const corkTex = canvasTexture(512, 320, (ctx) => {
    ctx.fillStyle = '#b98a58';
    ctx.fillRect(0, 0, 512, 320);
    const papers = ['#f6efe0', '#f2c230', '#9fd0e8', '#f0a0a0', '#cfe8b0'];
    papers.forEach((c, i) => {
      ctx.save();
      ctx.translate(60 + i * 90, 70 + (i % 2) * 110);
      ctx.rotate(((i * 37) % 11) / 40 - 0.12);
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 90, 110);
      ctx.fillStyle = '#17120f';
      ctx.fillRect(10, 18, 70, 5);
      ctx.fillRect(10, 36, 56, 5);
      ctx.fillRect(10, 54, 64, 5);
      ctx.fillStyle = '#b3261e';
      ctx.beginPath();
      ctx.arc(45, 8, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  });
  group.add(decal(corkTex, 3.0, 1.9, 8.0, 1.9, -8.93, 0));
  surf('notice_board', 'Cork notice board', 'board', [8, 1.9, -8.9], [3, 1.9, 0.2], [0, 0, 1], new THREE.Color('#b98a58').convertSRGBToLinear());
  const alphaTex = canvasTexture(512, 512, (ctx) => {
    ctx.fillStyle = '#fff6d8';
    ctx.fillRect(0, 0, 512, 512);
    const cols = ['#d8392b', '#2a6fd0', '#3da35a', '#f0a020', '#8a3ac0'];
    ctx.font = '900 84px "Arial Black", sans-serif';
    'ABCDEFGHIJKLMNOPQRST'.split('').forEach((ch, i) => {
      ctx.fillStyle = cols[i % cols.length];
      ctx.fillText(ch, 18 + (i % 5) * 98, 100 + Math.floor(i / 5) * 120);
    });
  });
  group.add(decal(alphaTex, 2.6, 2.6, -14.62, 1.8, -6.5, Math.PI / 2));
  surf('alphabet_poster', 'Alphabet poster', 'board', [-14.6, 1.8, -6.5], [0.2, 2.6, 2.6], [1, 0, 0], new THREE.Color('#fff6d8').convertSRGBToLinear());

  // ---------------------------------------------------------------- furniture: desks, chairs, the teacher's desk, bookcases
  const wood = new StaticBatch('wood', T.old_wood, { texel: 1.5 });
  const props = new StaticBatch('props', T.painted_concrete, { texel: 2 });
  const desks: Placement[] = [];
  const chairs: Placement[] = [];
  const rowsZ = [-4.4, -2.3, 2.3, 4.4];
  const colsX = [-10.5, -7, -3.5, 0, 3.5];
  rowsZ.forEach((z, r) => {
    colsX.forEach((x, c) => {
      desks.push({ x, z, ry: Math.PI, s: 2.1, tint: '#a7744a' });
      chairs.push({ x: x + 0.1, z: z + 0.95, ry: Math.PI + (((r * 5 + c) % 3) - 1) * 0.12, s: 2.1, tint: '#8a5a38' });
      colliders.push(box(x - 0.78, z - 0.42, x + 0.78, z + 0.42, false, 0.78, true), circle(x + 0.1, z + 0.95, 0.24, 0.5, true));
    });
  });
  instanced('furn_desk', desks);
  instanced('furn_chair', chairs);
  surf('desks_west', 'Pupils\' desks (west)', 'desks', [-8.5, 0.4, 3.4], [7.5, 0.8, 3.4], [0, 0, 1], propBaseColor(models['furn_desk'][0], '#a7744a'));
  surf('desks_east', 'Pupils\' desks (east)', 'desks', [0, 0.4, -3.4], [7.5, 0.8, 3.4], [0, 0, -1], propBaseColor(models['furn_desk'][0], '#a7744a'));
  // teacher's desk with a stack of exercise books and a globe
  wood.box(-3.2, 0.42, -6.9, 2.6, 0.84, 1.0, '#6e4528');
  colliders.push(box(-4.5, -7.4, -1.9, -6.4, false, 0.84, true));
  surf('teacher_desk', 'Teacher\'s desk', 'desk', [-3.2, 0.42, -6.9], [2.6, 0.84, 1.0], [0, 0, 1], wood.baseOf('#6e4528'));
  props.box(-2.4, 0.95, -6.9, 0.5, 0.2, 0.36, '#d8392b');
  props.box(-2.4, 1.13, -6.9, 0.46, 0.16, 0.34, '#2a6fd0');
  props.cyl(-4.0, 0.84, -6.9, 0.07, 0.07, 0.3, '#2a2420', 6);
  const globe = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), toon('#3b82c4'));
  globe.position.set(-4.0, 1.4, -6.9);
  globe.castShadow = true;
  globe.userData.baseColor = new THREE.Color('#3b82c4');
  group.add(globe);
  // bookcases on the west wall
  const cases: Placement[] = [-3.2, 0.2, 3.6].map((z, i) => ({ x: -14.4, z, ry: Math.PI / 2, s: [3.0, 2.4, 3.2] as [number, number, number], tint: i === 1 ? '#c8a878' : undefined }));
  instanced('furn_bookcaseClosed', [cases[0], cases[2]]);
  instanced('furn_bookcaseOpen', [cases[1]]);
  cases.forEach((c) => colliders.push(box(-14.7, c.z - 0.8, -13.6, c.z + 0.8, true)));
  surf('bookcases', 'Bookcases', 'bookcase', [-14.1, 1.0, 0.2], [1.1, 2.0, 7.2], [1, 0, 0], propBaseColor(models['furn_bookcaseClosed'][0]));
  // lockers along the south wall
  const lockers = new StaticBatch('lockers', T.corrugated_metal, { texel: 1.2 });
  for (let i = 0; i < 9; i++) lockers.box(-13.4 + i * 1.02, 0.95, 8.55, 0.96, 1.9, 0.6, i % 2 ? '#2a5db0' : '#2552a0');
  colliders.push(box(-13.95, 8.25, -4.7, 8.85, true));
  surf('lockers', 'Blue lockers', 'lockers', [-9.3, 0.95, 8.55], [9.2, 1.9, 0.6], [0, 0, -1], lockers.baseOf('#2a5db0'));
  addMesh(lockers.build());
  // windows with blue wax-print curtains, a fire extinguisher, school bags, a reading corner, a cupboard, a water pot and a bin
  const curtains = new StaticBatch('curtains', curtainTex, { texel: 1.15, doubleSide: true }).raw();
  const glass = new StaticBatch('glass', T.plaster_wall, { texel: 3 });
  for (const x of [-1.5, 2.2, 5.9]) {
    glass.box(x, 1.9, 8.97, 2.2, 1.5, 0.05, '#7fb8d8');
    curtains.box(x - 0.95, 1.9, 8.9, 0.7, 1.7, 0.05, '#ffffff');
    curtains.box(x + 0.95, 1.9, 8.9, 0.7, 1.7, 0.05, '#ffffff');
  }
  addMesh(glass.build());
  addMesh(curtains.build());
  surf('curtains', 'Blue wax-print curtains', 'cloth', [2.2, 1.9, 8.9], [8, 1.7, 0.2], [0, 0, -1], curtainTex.avg);
  props.box(9.3, 1.0, 8.9, 0.22, 0.5, 0.2, '#c8372d');
  surf('extinguisher', 'Fire extinguisher', 'tank', [9.3, 1.0, 8.9], [0.3, 0.6, 0.3], [0, 0, -1], props.baseOf('#c8372d'));
  const bagColors = ['#d8392b', '#2a6fd0', '#3da35a', '#f0b020', '#8a3ac0', '#17120f'];
  bagColors.forEach((c, i) => {
    props.box(10.2 + (i % 3) * 0.55, 0.22 + Math.floor(i / 3) * 0.42, 7.7 + (i % 2) * 0.1, 0.5, 0.42, 0.28, c, (i % 3) * 0.18);
  });
  colliders.push(box(9.9, 7.5, 11.9, 8.1, false, 0.9, true));
  surf('school_bags', 'Pile of school bags', 'sacks', [10.8, 0.4, 7.8], [1.8, 0.8, 0.6], [0, 0, -1], props.baseOf('#2a6fd0'));
  // reading corner: rug (flat) and cushions in the south-west... north-west corner
  props.box(-11.5, 0.015, -7.3, 3.4, 0.03, 2.0, '#c05a3c');
  const cushionColors = ['#f2c230', '#2fa59b', '#d8392b'];
  cushionColors.forEach((c, i) => props.box(-12.7 + i * 0.7, 0.2, -7.9, 0.6, 0.36, 0.6, c, i * 0.3));
  colliders.push(box(-13.2, -8.3, -11.0, -7.5, false, 0.4, true));
  surf('cushions', 'Cushions in the reading corner', 'cushions', [-12.0, 0.2, -7.9], [2.2, 0.4, 0.7], [0, 0, 1], props.baseOf('#2fa59b'));
  surf('rug', 'Reading rug', 'floor', [-11.5, 0.02, -7.3], [3.4, 0.05, 2.0], [0, 1, 0], props.baseOf('#c05a3c'));
  wood.box(13.0, 1.0, -8.55, 1.6, 2.0, 0.7, '#7a4e2c');
  colliders.push(box(12.2, -8.9, 13.8, -8.2, true));
  surf('cupboard', 'Tall cupboard', 'cupboard', [13.0, 1.0, -8.55], [1.6, 2.0, 0.7], [0, 0, 1], wood.baseOf('#7a4e2c'));
  props.cyl(13.6, 0, 6.2, 0.38, 0.32, 0.8, '#2a6fd0', 10);
  colliders.push(circle(13.6, 6.2, 0.4, 0.8, true));
  surf('water_pot', 'Blue water pot', 'drums', [13.6, 0.4, 6.2], [0.8, 0.8, 0.8], [-1, 0, 0], props.baseOf('#2a6fd0'));
  props.cyl(8.2, 0, -8.4, 0.28, 0.24, 0.6, '#5b6168', 8);
  colliders.push(circle(8.2, -8.4, 0.3, 0.6, true));
  surf('bin', 'Waste bin', 'drums', [8.2, 0.3, -8.4], [0.6, 0.6, 0.6], [0, 0, 1], props.baseOf('#5b6168'));
  addMesh(wood.build());
  addMesh(props.build());
  // potted plants in the corners
  const plants: Placement[] = [{ x: -13.9, z: 8.0, s: 2.6 }, { x: 14.0, z: -7.4, s: 2.6 }];
  instanced('furn_pottedPlant', plants);
  plants.forEach((p) => colliders.push(circle(p.x, p.z, 0.35)));
  surf('plant', 'Potted plant', 'foliage', [14.0, 0.8, -7.4], [0.7, 1.6, 0.7], [-1, 0, 0], propBaseColor(models['furn_pottedPlant'][2] ?? models['furn_pottedPlant'][0]));
  const buckets: Placement[] = [{ x: 12.6, z: 0.0, s: 2.3, tint: '#2a6fd0' }];
  instanced('surv_bucket', buckets);

  // ---------------------------------------------------------------- hiding spots
  const V = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const dir = (x: number, z: number) => new THREE.Vector3(x, 0, z);
  const spotDefs: { id: string; label: string; shape: string; at: THREE.Vector3; facing: THREE.Vector3; reach?: number; probeY?: number }[] = [
    { id: 'chalkboard', label: 'In front of the chalkboard', shape: 'big dark board', at: V(0, -8.3), facing: dir(0, -1), probeY: 1.6 },
    { id: 'notice_board', label: 'Cork notice board', shape: 'flat board', at: V(7.6, -8.1), facing: dir(0, -1), probeY: 1.7 },
    { id: 'cream_wall', label: 'Cream wall by the reading corner', shape: 'flat wall', at: V(-8.6, -8.4), facing: dir(0, -1), probeY: 1.9 },
    { id: 'green_band', label: 'Green band of the north wall', shape: 'flat wall band', at: V(4.4, -8.4), facing: dir(0, -1), probeY: 0.6 },
    { id: 'teacher_desk', label: 'Behind the teacher\'s desk', shape: 'big desk', at: V(-3.2, -8.0), facing: dir(0, 1), reach: 0.5, probeY: 0.5 },
    { id: 'cushions', label: 'Reading corner cushions', shape: 'soft pile', at: V(-12.0, -6.6), facing: dir(0, -1), probeY: 0.3 },
    { id: 'alphabet', label: 'Alphabet poster', shape: 'colourful poster', at: V(-13.7, -6.5), facing: dir(-1, 0), probeY: 1.8 },
    { id: 'bookcases', label: 'Bookcases', shape: 'tall shelves', at: V(-13.2, 0.3), facing: dir(-1, 0), probeY: 1.2 },
    { id: 'lockers', label: 'Row of lockers', shape: 'tall blue boxes', at: V(-9.3, 7.7), facing: dir(0, 1), probeY: 1.2 },
    { id: 'curtains', label: 'Wax-print curtains', shape: 'hanging cloth', at: V(2.2, 8.4), facing: dir(0, 1), probeY: 1.6 },
    { id: 'extinguisher', label: 'Fire extinguisher', shape: 'small red cylinder', at: V(9.3, 8.35), facing: dir(0, 1), probeY: 1.0 },
    { id: 'school_bags', label: 'Pile of school bags', shape: 'multicolour pile', at: V(10.8, 6.8), facing: dir(0, 1), probeY: 0.4 },
    { id: 'water_pot', label: 'Blue water pot', shape: 'round pot', at: V(12.7, 6.2), facing: dir(1, 0), probeY: 0.4 },
    { id: 'cupboard', label: 'Tall cupboard', shape: 'brown box', at: V(13.0, -7.6), facing: dir(0, -1), probeY: 1.0 },
    { id: 'plant', label: 'Potted plant', shape: 'foliage', at: V(13.3, -7.4), facing: dir(1, 0), probeY: 0.8 },
    { id: 'bin', label: 'Waste bin', shape: 'grey cylinder', at: V(8.2, -7.6), facing: dir(0, -1), probeY: 0.3 },
    { id: 'desks_west', label: 'Behind the back desks (west)', shape: 'low wooden rows', at: V(-8.5, 6.0), facing: dir(0, -1), probeY: 0.5 },
    { id: 'desks_east', label: 'Between the front desks (east)', shape: 'low wooden rows', at: V(-1.8, -5.5), facing: dir(0, 1), probeY: 0.5 },
    { id: 'door_post', label: 'By the door post', shape: 'cream post', at: V(14.0, 3.5), facing: dir(1, 0), probeY: 1.4 },
  ];
  const hidingSpots: HidingSpot[] = spotDefs.map((d) => {
    const probe = d.at.clone().addScaledVector(d.facing, d.reach ?? 0.55);
    probe.y = d.probeY ?? 0.9;
    const near = surfaces.nearest(probe, 1.6);
    if (!near) throw new Error(`[classroom] hiding spot ${d.id} has no surface to blend into`);
    const p = { x: d.at.x, z: d.at.z };
    if (resolveCollisions(p, PLAYER_RADIUS - 0.02, colliders)) console.warn(`[classroom] hiding spot ${d.id} overlaps a collider (would move to ${p.x.toFixed(2)}, ${p.z.toFixed(2)})`);
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
    id: 'classroom',
    name: 'The Classroom',
    assetCount: CLASSROOM_ASSET_COUNT,
    chickenCount: 3,
    ambience: { chatter: 0.3, generator: false },
    seekerStart: { x: 13.2, z: 0, yaw: -Math.PI / 2 },
    lobbyPos: { x: 0.5, z: 0.5 },
    chickenArea: { minX: -13.5, maxX: 13.5, minZ: -8.2, maxZ: 8.2 },
    ground: { halfX: 15, halfZ: 9, patches: NO_DIRT },
    group,
    colliders,
    surfaces,
    hidingSpots,
    fadeGroups,
    bounds: { minX: -HALF + 0.3, maxX: 14.75, minZ: -9.6, maxZ: 9.6 },
    spawn: new THREE.Vector3(0.5, 0, 0.5),
    generator: null,
    gate: { x: 14.6, z: 0, halfWidth: 2.6 },
    baseColorAt: (p) => surfaces.baseColorAt(p),
    setMarkersVisible: (v) => (markers.visible = v),
  };
}
