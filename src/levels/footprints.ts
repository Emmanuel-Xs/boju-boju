// Prints left in the dirt by a running player. One instanced mesh (a pool of FOOTPRINT_CONFIG.max prints, the oldest is reused), fading
// out over fadeSeconds. The masquerade reads `list()` to notice fresh ones and follow the trail.
import * as THREE from 'three';

export const FOOTPRINT_CONFIG = {
  /** Most prints alive at once. */
  max: 60,
  /** Seconds a print takes to fade away. */
  fadeSeconds: 10,
  /** Size of one print (m) and how far each foot sits from the line of travel. */
  width: 0.26,
  length: 0.5,
  footOffset: 0.16,
  /** Height above the floor (m), kept clear of z-fighting with the dirt. */
  lift: 0.03,
  /** Scuffed pale dust on the dark dirt: it reads from the high camera, where a darker print would vanish. */
  color: '#f2e4c0',
  /** Strongest the print gets (0..1). */
  opacity: 0.75,
};

export interface Print {
  id: number;
  x: number;
  z: number;
  /** Seconds since it was made. */
  age: number;
}

function soleTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff';
  g.beginPath();
  g.ellipse(32, 44, 22, 38, 0, 0, Math.PI * 2); // ball and arch
  g.fill();
  g.beginPath();
  g.ellipse(32, 104, 16, 18, 0, 0, Math.PI * 2); // heel
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Footprints {
  readonly mesh: THREE.InstancedMesh;
  private alpha: THREE.InstancedBufferAttribute;
  private prints: Print[] = [];
  private yaws: number[] = [];
  private slot = 0;
  private nextId = 1;
  private side = 1;
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private s = new THREE.Vector3(1, 1, 1);
  private p = new THREE.Vector3();

  constructor(
    scene: THREE.Scene,
    private cfg = FOOTPRINT_CONFIG,
  ) {
    const geo = new THREE.PlaneGeometry(cfg.width, cfg.length).rotateX(-Math.PI / 2);
    this.alpha = new THREE.InstancedBufferAttribute(new Float32Array(cfg.max), 1);
    geo.setAttribute('aAlpha', this.alpha);
    const mat = new THREE.MeshBasicMaterial({ color: cfg.color, map: soleTexture(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float aAlpha;\nvarying float vAlpha;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvAlpha = aAlpha;');
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vAlpha;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vAlpha;');
    };
    mat.customProgramCacheKey = () => 'footprint-fade';
    this.mesh = new THREE.InstancedMesh(geo, mat, cfg.max);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
    this.mesh.count = 0;
    scene.add(this.mesh);
  }

  /** A print at (x, z) for a player running along `yaw` (the +z-forward convention of the characters). */
  add(x: number, z: number, yaw: number): void {
    const c = this.cfg;
    this.side = -this.side;
    const px = x + Math.cos(yaw) * c.footOffset * this.side;
    const pz = z - Math.sin(yaw) * c.footOffset * this.side;
    const print: Print = { id: this.nextId++, x: px, z: pz, age: 0 };
    const i = this.slot;
    this.slot = (this.slot + 1) % c.max;
    this.prints[i] = print;
    this.yaws[i] = yaw;
    this.e.set(0, yaw, 0);
    this.q.setFromEuler(this.e);
    this.m.compose(this.p.set(px, c.lift, pz), this.q, this.s);
    this.mesh.setMatrixAt(i, this.m);
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.count = Math.max(this.mesh.count, i + 1);
    this.alpha.setX(i, c.opacity);
    this.alpha.needsUpdate = true;
  }

  update(dt: number): void {
    const c = this.cfg;
    let dirty = false;
    for (let i = 0; i < this.prints.length; i++) {
      const p = this.prints[i];
      if (!p || p.age >= c.fadeSeconds) continue;
      p.age += dt;
      this.alpha.setX(i, p.age >= c.fadeSeconds ? 0 : c.opacity * (1 - p.age / c.fadeSeconds));
      dirty = true;
    }
    if (dirty) this.alpha.needsUpdate = true;
  }

  /** The prints still on the ground, oldest first. */
  list(): Print[] {
    return this.prints.filter((p) => p && p.age < this.cfg.fadeSeconds).sort((a, b) => a.id - b.id);
  }

  clear(): void {
    for (let i = 0; i < this.prints.length; i++) this.alpha.setX(i, 0);
    this.prints = [];
    this.alpha.needsUpdate = true;
    this.slot = 0;
  }
}
