// Camo score, 0 to 100: how well hidden the player is right now.
//   score = colour match + shape match - exposure - movement, clamped to 0..100.
// Colours are compared in Lab space between the zone colour and the *base colour* of the surface behind the player
// (userData.baseColor, never a lit pixel). The meter knows nothing about the level: it asks a CamoProbe.
import * as THREE from 'three';
import type { PaintZone, PlayerState } from './character';

/** Every tuning knob for the score lives here. Points are on the final 0..100 scale. */
export const CAMO_CONFIG = {
  // --- colour match: the main term
  /** Points for a perfect match on every zone. */
  colorMaxPoints: 75,
  /** Share of the colour points each zone is worth (should sum to 1). */
  zoneWeight: { top: 0.55, bottom: 0.45 } as Record<PaintZone, number>,
  /** Lab distance at or below which a zone counts as a perfect match. */
  labPerfect: 8,
  /** Lab distance at or above which it counts as no match. Between the two the credit falls off linearly. */
  labWorst: 60,
  /** Exponent on the 0..1 credit: above 1 punishes near misses harder. */
  colorCurve: 1.4,
  /** Credit (0..1) for a zone that has never been painted. Unpainted zones can't be camouflaged by luck. */
  unpaintedCredit: 0,
  /** Heights (m above the feet) of the rays through the top and bottom zones, per pose. */
  zoneHeights: {
    default: { top: 1.15, bottom: 0.5 },
    crouch: { top: 0.78, bottom: 0.36 },
    curl_ball: { top: 0.5, bottom: 0.3 },
  } as Record<string, { top: number; bottom: number }>,

  // --- shape match: a bonus when the pose suits the spot
  shapeMaxPoints: 25,
  pose: {
    /** Back against a wall box, facing out. */
    wall_flat: { maxWallDistance: 0.45, backToWallDot: 0.7 },
    /** Next to drums or sacks (crates stand in for sacks until we have a model). */
    curl_ball: { radius: 1.1, kinds: ['drums', 'crates', 'chairs'] },
    /** Behind a low prop, with the prop between the viewer and the player. */
    crouch: { radius: 1.2, maxHeight: 1.3, kinds: ['bench', 'table', 'crates', 'chairs', 'generator', 'drums'], viewerSideDot: 0.3 },
    /** Standing like part of the scenery: beside poles, foliage or a chair stack. */
    stand_stiff: { radius: 0.9, kinds: ['cloth', 'foliage', 'chairs'] },
  },
  /** Shape credit (0..1) for a pose that suits nothing nearby. */
  mismatchCredit: 0,

  // --- exposure: things that give a hider away
  /** Skin can't be painted, so a little is always showing. */
  skinPenalty: 6,
  /** Multiplier on the skin penalty per pose (curling up hides more skin). */
  skinPoseFactor: { curl_ball: 0.4, crouch: 0.75, wall_flat: 0.85 } as Record<string, number>,
  /** Penalties for each unhidden extra. In hunt mode all three are hidden, so they only matter if we allow them later. */
  hairPenalty: 9,
  hatPenalty: 12,
  accessoryPenalty: 8,

  // --- movement
  movePenaltyWalk: 55,
  movePenaltyRun: 80,
  /** After stopping, the movement penalty fades to zero over this many seconds. */
  moveRecoverSeconds: 1,

  // --- meter behaviour
  /** How fast the displayed number follows the real score (per second). */
  meterSmoothing: 10,
  /** The expensive terms (raycasts) are re-evaluated this many times a second. */
  evalHz: 12,
};
export type CamoConfig = typeof CAMO_CONFIG;

// --- colour maths -----------------------------------------------------------------------------

/** CIE Lab (D65) from a linear-sRGB THREE.Color. */
export function toLab(c: THREE.Color): [number, number, number] {
  const x = (0.4124564 * c.r + 0.3575761 * c.g + 0.1804375 * c.b) / 0.95047;
  const y = 0.2126729 * c.r + 0.7151522 * c.g + 0.072175 * c.b;
  const z = (0.0193339 * c.r + 0.119192 * c.g + 0.9503041 * c.b) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/** Euclidean distance in Lab (CIE76): about 2.3 is a just-noticeable difference. */
export function labDistance(a: THREE.Color, b: THREE.Color): number {
  const [l1, a1, b1] = toLab(a);
  const [l2, a2, b2] = toLab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}

// --- what the meter needs to know -------------------------------------------------------------

export interface NearSurface {
  id: string;
  kind: string;
  /** Distance on the ground plane from the point to the surface's footprint (0 = touching). */
  distance: number;
  /** Top of the surface (m). */
  maxY: number;
  /** Unit direction on the ground plane from the point towards the surface. */
  dir: { x: number; z: number };
}

export interface CamoProbe {
  /** The surface behind `through` as seen from `eye`: its base colour, or null if the ray leaves the world. */
  behind(eye: THREE.Vector3, through: THREE.Vector3): { color: THREE.Color; id: string; label: string } | null;
  near(point: THREE.Vector3, radius: number): NearSurface[];
  wall(point: THREE.Vector3, maxDistance: number): { distance: number; normal: { x: number; z: number } } | null;
}

export interface CamoState {
  zones: Record<PaintZone, THREE.Color>;
  painted: Record<PaintZone, boolean>;
  /** The held pose, or null when just standing or walking. */
  pose: PlayerState | null;
  /** 0 when still; otherwise the walking or running speed (m/s). */
  speed: number;
  running: boolean;
  /** Player yaw: forward is (sin, cos). */
  yaw: number;
  position: THREE.Vector3;
  /** Whoever is looking: the seeker's eye, or the camera while there is no seeker. */
  eye: THREE.Vector3;
  hairVisible: boolean;
  hatVisible: boolean;
  accessoryVisible: boolean;
}

export interface ZoneTerm {
  zone: PaintZone;
  painted: boolean;
  /** Label and hex of the surface behind this zone, if any. */
  behind: string;
  deltaE: number | null;
  credit: number;
  points: number;
}

export interface CamoBreakdown {
  total: number;
  zones: ZoneTerm[];
  colorPoints: number;
  shape: { pose: string; credit: number; points: number; reason: string };
  exposure: { skin: number; hair: number; hat: number; accessory: number; total: number };
  movement: { penalty: number; moving: boolean };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export class CamoMeter {
  /** The latest full breakdown (exposure and movement are live; the raycast terms refresh at `evalHz`). */
  breakdown: CamoBreakdown;
  /** What the HUD shows: eases towards `breakdown.total`. */
  display = 0;
  private slow: { zones: ZoneTerm[]; shape: CamoBreakdown['shape'] } | null = null;
  private sinceEval = Infinity;
  private moveLevel = 0; // current movement penalty, in points
  private moveAtStop = 0;
  private tmp = new THREE.Vector3();

  constructor(
    private probe: CamoProbe,
    readonly config: CamoConfig = CAMO_CONFIG,
  ) {
    this.breakdown = { total: 0, zones: [], colorPoints: 0, shape: { pose: 'none', credit: 0, points: 0, reason: '' }, exposure: { skin: 0, hair: 0, hat: 0, accessory: 0, total: 0 }, movement: { penalty: 0, moving: false } };
  }

  /** Force the next update to redo the raycast terms (e.g. right after painting). */
  invalidate(): void {
    this.sinceEval = Infinity;
  }

  update(dt: number, s: CamoState): CamoBreakdown {
    const cfg = this.config;

    // movement: jumps to full penalty the moment you move, then fades out after you stop
    const moving = s.speed > 0.05;
    if (moving) {
      this.moveLevel = s.running ? cfg.movePenaltyRun : cfg.movePenaltyWalk;
      this.moveAtStop = this.moveLevel;
    } else if (this.moveLevel > 0) {
      this.moveLevel = Math.max(0, this.moveLevel - (this.moveAtStop / cfg.moveRecoverSeconds) * dt);
    }

    this.sinceEval += dt;
    if (!this.slow || this.sinceEval >= 1 / cfg.evalHz) {
      this.sinceEval = 0;
      this.slow = { zones: this.colorTerms(s), shape: this.shapeTerm(s) };
    }

    const colorPoints = this.slow.zones.reduce((a, z) => a + z.points, 0);
    const skin = cfg.skinPenalty * (s.pose ? (cfg.skinPoseFactor[s.pose] ?? 1) : 1);
    const hair = s.hairVisible ? cfg.hairPenalty : 0;
    const hat = s.hatVisible ? cfg.hatPenalty : 0;
    const accessory = s.accessoryVisible ? cfg.accessoryPenalty : 0;
    const exposure = skin + hair + hat + accessory;
    const total = Math.min(100, Math.max(0, colorPoints + this.slow.shape.points - exposure - this.moveLevel));

    this.breakdown = { total, zones: this.slow.zones, colorPoints, shape: this.slow.shape, exposure: { skin, hair, hat, accessory, total: exposure }, movement: { penalty: this.moveLevel, moving } };
    this.display += (total - this.display) * Math.min(1, dt * cfg.meterSmoothing);
    return this.breakdown;
  }

  private colorTerms(s: CamoState): ZoneTerm[] {
    const cfg = this.config;
    const heights = (s.pose && cfg.zoneHeights[s.pose]) || cfg.zoneHeights.default;
    const out: ZoneTerm[] = [];
    for (const zone of ['top', 'bottom'] as const) {
      const through = this.tmp.copy(s.position);
      through.y += heights[zone];
      const hit = this.probe.behind(s.eye, through);
      let credit = 0;
      let deltaE: number | null = null;
      if (!s.painted[zone]) credit = cfg.unpaintedCredit;
      else if (hit) {
        deltaE = labDistance(s.zones[zone], hit.color);
        credit = clamp01(1 - (deltaE - cfg.labPerfect) / (cfg.labWorst - cfg.labPerfect)) ** cfg.colorCurve;
      }
      out.push({
        zone,
        painted: s.painted[zone],
        behind: hit ? `${hit.label} #${hit.color.getHexString()}` : 'nothing',
        deltaE,
        credit,
        points: cfg.colorMaxPoints * cfg.zoneWeight[zone] * credit,
      });
    }
    return out;
  }

  private shapeTerm(s: CamoState): CamoBreakdown['shape'] {
    const cfg = this.config;
    const make = (credit: number, reason: string) => ({ pose: s.pose ?? 'none', credit, points: cfg.shapeMaxPoints * credit, reason });
    if (!s.pose || s.pose === 'idle' || s.pose === 'walk' || s.pose === 'run') return make(0, 'no pose held');
    const miss = (why: string) => make(cfg.mismatchCredit, why);
    const fx = Math.sin(s.yaw);
    const fz = Math.cos(s.yaw);

    if (s.pose === 'wall_flat') {
      const r = cfg.pose.wall_flat;
      const w = this.probe.wall(s.position, r.maxWallDistance);
      if (!w) return miss(`no wall within ${r.maxWallDistance} m`);
      const facingOut = fx * w.normal.x + fz * w.normal.z;
      if (facingOut < r.backToWallDot) return miss(`wall ${w.distance.toFixed(2)} m away but not facing out (${facingOut.toFixed(2)})`);
      return make(1, `back to a wall, ${w.distance.toFixed(2)} m away`);
    }

    const rule = cfg.pose[s.pose as 'curl_ball' | 'crouch' | 'stand_stiff'];
    const near = this.probe.near(s.position, rule.radius).filter((n) => (rule.kinds as readonly string[]).includes(n.kind));
    if (s.pose === 'crouch') {
      const c = cfg.pose.crouch;
      const toEye = this.tmp.copy(s.eye).sub(s.position);
      const len = Math.hypot(toEye.x, toEye.z) || 1;
      const low = near.filter((n) => n.maxY <= c.maxHeight && (n.dir.x * toEye.x + n.dir.z * toEye.z) / len >= c.viewerSideDot);
      if (!low.length) return miss(near.length ? 'low prop is not between you and the viewer' : `no low prop within ${c.radius} m`);
      const best = low.reduce((a, b) => (a.distance < b.distance ? a : b));
      return make(clamp01((c.radius - best.distance) / (c.radius * 0.4)), `hiding behind ${best.kind} (${best.id}), ${best.distance.toFixed(2)} m`);
    }
    if (!near.length) return miss(`no ${rule.kinds.join('/')} within ${rule.radius} m`);
    const best = near.reduce((a, b) => (a.distance < b.distance ? a : b));
    return make(clamp01((rule.radius - best.distance) / (rule.radius * 0.4)), `next to ${best.kind} (${best.id}), ${best.distance.toFixed(2)} m`);
  }
}

/** Plain-text table of every term, for the debug overlay. */
export function describeBreakdown(b: CamoBreakdown, cfg: CamoConfig = CAMO_CONFIG): string {
  const f = (n: number) => n.toFixed(1).padStart(5);
  const lines: string[] = [];
  for (const z of b.zones) {
    lines.push(
      z.painted
        ? `colour ${z.zone.padEnd(6)} ${f(z.points)}  dE ${z.deltaE === null ? ' n/a' : z.deltaE.toFixed(1).padStart(4)} -> ${(z.credit * 100).toFixed(0).padStart(3)}%  behind: ${z.behind}`
        : `colour ${z.zone.padEnd(6)} ${f(z.points)}  not painted yet (credit ${(cfg.unpaintedCredit * 100).toFixed(0)}%)  behind: ${z.behind}`,
    );
  }
  lines.push(`shape  ${b.shape.pose.padEnd(11)} ${f(b.shape.points)}  ${b.shape.reason}`);
  lines.push(`skin                ${f(-b.exposure.skin)}`);
  lines.push(`hair/hat/accessory  ${f(-(b.exposure.hair + b.exposure.hat + b.exposure.accessory))}  (${b.exposure.hair.toFixed(0)}/${b.exposure.hat.toFixed(0)}/${b.exposure.accessory.toFixed(0)})`);
  lines.push(`movement            ${f(-b.movement.penalty)}  ${b.movement.moving ? 'moving' : b.movement.penalty > 0 ? 'recovering' : 'still'}`);
  lines.push(`TOTAL               ${f(b.total)}  (colour ${b.colorPoints.toFixed(1)} + shape ${b.shape.points.toFixed(1)} - ${b.exposure.total.toFixed(1)} - ${b.movement.penalty.toFixed(1)})`);
  return lines.join('\n');
}
