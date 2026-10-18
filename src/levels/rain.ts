// Rain: streaks falling in a box that follows the player. One LineSegments object, positions moved on the CPU (a few hundred points).
import * as THREE from 'three';

export const RAIN_CONFIG = {
  drops: 750,
  /** Half-width of the box around the player (m) and its height. */
  half: 18,
  height: 13,
  fallSpeed: 15,
  length: 0.55,
  /** Sideways lean of the falling streaks. */
  slant: 0.12,
  color: '#d4e4ff',
  opacity: 0.45,
};

export class Rain {
  readonly object: THREE.LineSegments;
  private pos: Float32Array;
  private seed: Float32Array;
  private on = false;

  constructor(
    scene: THREE.Scene,
    private cfg = RAIN_CONFIG,
  ) {
    const n = cfg.drops;
    this.pos = new Float32Array(n * 6);
    this.seed = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) this.seed.set([Math.random(), Math.random(), Math.random()], i * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.object = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity, depthWrite: false, fog: false }));
    this.object.frustumCulled = false;
    this.object.visible = false;
    scene.add(this.object);
  }

  set enabled(v: boolean) {
    this.on = v;
    this.object.visible = v;
  }

  update(dt: number, centre: THREE.Vector3, time: number): void {
    if (!this.on) return;
    const c = this.cfg;
    const span = c.half * 2;
    for (let i = 0; i < c.drops; i++) {
      const [a, b, d] = [this.seed[i * 3], this.seed[i * 3 + 1], this.seed[i * 3 + 2]];
      // each drop is a fixed point in a repeating box, falling at its own speed and wrapped round the player
      const y = (((b * c.height - time * c.fallSpeed * (0.8 + 0.4 * d)) % c.height) + c.height) % c.height;
      const wrap = (v: number, centreV: number) => ((((v * span - centreV) % span) + span) % span) - c.half + centreV;
      const x = wrap(a + y * c.slant * 0.02, centre.x);
      const z = wrap(d, centre.z);
      this.pos.set([x, y, z, x + c.slant, y + c.length, z], i * 6);
    }
    this.object.geometry.attributes.position.needsUpdate = true;
  }
}
