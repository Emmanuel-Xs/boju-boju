// Where the yard floor is bare dirt (the compound draws patches there, footsteps sound like sand there, and running leaves prints).
export interface DirtPatch {
  x: number;
  z: number;
  /** Half-width and half-depth of the ellipse that covers the patch (m). */
  rx: number;
  rz: number;
}

/** The same four patches the compound draws. */
export const DIRT_PATCHES: readonly DirtPatch[] = [
  { x: 12.2, z: 0, rx: 3.2, rz: 4.2 },
  { x: -11, z: 1.8, rx: 2.2, rz: 1.6 },
  { x: 2, z: -5.6, rx: 1.6, rz: 1.3 },
  { x: -3, z: 5.4, rx: 1.8, rz: 1.2 },
];

export const YARD = { halfX: 15, halfZ: 9 };

export function onDirt(x: number, z: number): boolean {
  if (Math.abs(x) > YARD.halfX || Math.abs(z) > YARD.halfZ) return true;
  return DIRT_PATCHES.some((p) => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 <= 1);
}
