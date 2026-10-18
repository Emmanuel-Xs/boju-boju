// Where the yard floor is bare dirt (the compound draws patches there, footsteps sound like sand there, and running leaves prints).
export interface DirtPatch {
  x: number;
  z: number;
  /** Half-width and half-depth of the ellipse that covers the patch (m). */
  rx: number;
  rz: number;
}

/** The compound's four patches. */
export const COMPOUND_DIRT: readonly DirtPatch[] = [
  { x: 12.2, z: 0, rx: 3.2, rz: 4.2 },
  { x: -11, z: 1.8, rx: 2.2, rz: 1.6 },
  { x: 2, z: -5.6, rx: 1.6, rz: 1.3 },
  { x: -3, z: 5.4, rx: 1.8, rz: 1.2 },
];

export interface Ground {
  /** Half-size of the paved play area (m); outside it, and on a patch, the floor is bare dirt. */
  halfX: number;
  halfZ: number;
  patches: readonly DirtPatch[];
}

/** The level being played: set once by the game when the level is built. */
let current: Ground = { halfX: 15, halfZ: 9, patches: COMPOUND_DIRT };
export const setGround = (g: Ground): void => {
  current = g;
};

export function onDirt(x: number, z: number): boolean {
  if (Math.abs(x) > current.halfX || Math.abs(z) > current.halfZ) return true;
  return current.patches.some((p) => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 <= 1);
}
