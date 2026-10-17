// Pooled, mobile-friendly effects. Everything is preallocated; each effect type is one draw call
// (Points or InstancedMesh), nothing allocates per spawn, and there is no postprocessing.
import * as THREE from 'three';
import { toon } from './toon';
import { MASQUERADE_COLORS } from './masquerade';

export const MAX_PIXEL_RATIO = 2;

/** Cap the device pixel ratio at 2 (3x phone screens cost 2.25x the fill for little visible gain). */
export function applyPixelRatio(renderer: THREE.WebGLRenderer): void {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
}

const TAU = Math.PI * 2;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// --- shared soft-dot point material -----------------------------------------

function pointMaterial(additive: boolean): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 500 } },
    vertexShader: /* glsl */ `
      uniform float uScale;
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = aColor;
        vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uScale / max(0.1, -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5 || vAlpha <= 0.002) discard;
        gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.3, d));
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
}

class PointPool {
  readonly points: THREE.Points;
  readonly material: THREE.ShaderMaterial;
  private pos: Float32Array;
  private col: Float32Array;
  private size: Float32Array;
  private alpha: Float32Array;
  private geo = new THREE.BufferGeometry();

  constructor(readonly capacity: number, additive: boolean) {
    this.pos = new Float32Array(capacity * 3);
    this.col = new Float32Array(capacity * 3);
    this.size = new Float32Array(capacity);
    this.alpha = new Float32Array(capacity);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.material = pointMaterial(additive);
    this.points = new THREE.Points(this.geo, this.material);
    this.points.frustumCulled = false; // particles move; a stale bounding sphere would cull them
  }

  set(i: number, x: number, y: number, z: number, r: number, g: number, b: number, size: number, alpha: number) {
    const p = i * 3;
    this.pos[p] = x;
    this.pos[p + 1] = y;
    this.pos[p + 2] = z;
    this.col[p] = r;
    this.col[p + 1] = g;
    this.col[p + 2] = b;
    this.size[i] = size;
    this.alpha[i] = alpha;
  }

  setMotion(i: number, x: number, y: number, z: number, size: number, alpha: number) {
    const p = i * 3;
    this.pos[p] = x;
    this.pos[p + 1] = y;
    this.pos[p + 2] = z;
    this.size[i] = size;
    this.alpha[i] = alpha;
  }

  hide(i: number) {
    this.size[i] = 0;
    this.alpha[i] = 0;
  }

  flush(withColors = true) {
    const a = this.geo.attributes;
    a.position.needsUpdate = true;
    a.aSize.needsUpdate = true;
    a.aAlpha.needsUpdate = true;
    if (withColors) a.aColor.needsUpdate = true;
  }

  dispose() {
    this.geo.dispose();
    this.material.dispose();
  }
}

// --- paint splash ------------------------------------------------------------

const SPLASH_CAP = 320;
const GRAVITY = 9;

class PaintSplash {
  readonly pool = new PointPool(SPLASH_CAP, false);
  private vel = new Float32Array(SPLASH_CAP * 3);
  private px = new Float32Array(SPLASH_CAP * 3);
  private life = new Float32Array(SPLASH_CAP); // seconds left
  private maxLife = new Float32Array(SPLASH_CAP);
  private size0 = new Float32Array(SPLASH_CAP);
  private cursor = 0;
  private active = 0;
  private dirtyColors = false;
  private c = new THREE.Color();

  constructor() {
    for (let i = 0; i < SPLASH_CAP; i++) this.pool.hide(i);
    this.pool.flush();
  }

  emit(origin: THREE.Vector3, color: THREE.ColorRepresentation, count: number) {
    this.c.set(color);
    for (let n = 0; n < count; n++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % SPLASH_CAP;
      const a = rand(0, TAU);
      const up = rand(0.2, 1);
      const speed = rand(1.2, 3.4);
      const v = i * 3;
      this.vel[v] = Math.cos(a) * speed * (1 - up * 0.5);
      this.vel[v + 1] = up * speed * 1.4 + 0.8;
      this.vel[v + 2] = Math.sin(a) * speed * (1 - up * 0.5);
      this.px[v] = origin.x + rand(-0.04, 0.04);
      this.px[v + 1] = origin.y + rand(-0.04, 0.04);
      this.px[v + 2] = origin.z + rand(-0.04, 0.04);
      const shade = rand(0.85, 1.15); // slight per-drop variation, same hue
      this.maxLife[i] = this.life[i] = rand(0.5, 0.9);
      this.size0[i] = rand(0.05, 0.11);
      this.pool.set(i, this.px[v], this.px[v + 1], this.px[v + 2], Math.min(1, this.c.r * shade), Math.min(1, this.c.g * shade), Math.min(1, this.c.b * shade), this.size0[i], 1);
    }
    this.dirtyColors = true;
    this.active = SPLASH_CAP;
  }

  update(dt: number) {
    if (!this.active) return;
    let alive = 0;
    for (let i = 0; i < SPLASH_CAP; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.pool.hide(i);
        continue;
      }
      alive++;
      const v = i * 3;
      this.vel[v + 1] -= GRAVITY * dt;
      this.px[v] += this.vel[v] * dt;
      this.px[v + 1] += this.vel[v + 1] * dt;
      this.px[v + 2] += this.vel[v + 2] * dt;
      if (this.px[v + 1] < 0.02) {
        this.px[v + 1] = 0.02;
        this.vel[v] *= 0.4;
        this.vel[v + 1] = 0;
        this.vel[v + 2] *= 0.4;
      }
      const k = this.life[i] / this.maxLife[i];
      this.pool.setMotion(i, this.px[v], this.px[v + 1], this.px[v + 2], this.size0[i] * (0.4 + 0.6 * k), Math.min(1, k * 2));
    }
    this.pool.flush(this.dirtyColors);
    this.dirtyColors = false;
    this.active = alive;
  }
}

// --- confetti (one InstancedMesh) --------------------------------------------

const CONFETTI_CAP = 160;

class Confetti {
  readonly mesh: THREE.InstancedMesh;
  private geo = new THREE.PlaneGeometry(0.07, 0.24);
  private mat = toon('#ffffff', { side: THREE.DoubleSide });
  private pos = new Float32Array(CONFETTI_CAP * 3);
  private vel = new Float32Array(CONFETTI_CAP * 3);
  private rot = new Float32Array(CONFETTI_CAP * 3);
  private spin = new Float32Array(CONFETTI_CAP * 3);
  private life = new Float32Array(CONFETTI_CAP);
  private cursor = 0;
  private active = 0;
  private dummy = new THREE.Object3D();
  private c = new THREE.Color();
  private t = 0;

  constructor() {
    this.mesh = new THREE.InstancedMesh(this.geo, this.mat, CONFETTI_CAP);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.dummy.scale.setScalar(0);
    this.dummy.updateMatrix();
    for (let i = 0; i < CONFETTI_CAP; i++) {
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, this.c.set('#ffffff'));
    }
  }

  burst(origin: THREE.Vector3, colors: readonly string[], count: number) {
    for (let n = 0; n < count; n++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % CONFETTI_CAP;
      const a = rand(0, TAU);
      const out = rand(0.8, 3.2);
      const v = i * 3;
      this.pos[v] = origin.x;
      this.pos[v + 1] = origin.y;
      this.pos[v + 2] = origin.z;
      this.vel[v] = Math.cos(a) * out;
      this.vel[v + 1] = rand(3.5, 7);
      this.vel[v + 2] = Math.sin(a) * out;
      for (let k = 0; k < 3; k++) {
        this.rot[v + k] = rand(0, TAU);
        this.spin[v + k] = rand(-9, 9);
      }
      this.life[i] = rand(2.2, 3.2);
      this.mesh.setColorAt(i, this.c.set(colors[(Math.random() * colors.length) | 0]));
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.active = CONFETTI_CAP;
  }

  update(dt: number) {
    if (!this.active) return;
    this.t += dt;
    let alive = 0;
    const d = this.dummy;
    for (let i = 0; i < CONFETTI_CAP; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const v = i * 3;
      if (this.life[i] <= 0) {
        d.scale.setScalar(0);
        d.updateMatrix();
        this.mesh.setMatrixAt(i, d.matrix);
        continue;
      }
      alive++;
      const grounded = this.pos[v + 1] <= 0.015;
      if (!grounded) {
        // light paper: strong air drag, slow fall, a little flutter
        this.vel[v + 1] = Math.max(this.vel[v + 1] - 9 * dt, -1.1);
        const drag = Math.exp(-2.2 * dt);
        this.vel[v] = this.vel[v] * drag + Math.sin(this.t * 5 + i) * 0.5 * dt;
        this.vel[v + 2] = this.vel[v + 2] * drag + Math.cos(this.t * 4 + i) * 0.5 * dt;
        this.pos[v] += this.vel[v] * dt;
        this.pos[v + 1] = Math.max(0.015, this.pos[v + 1] + this.vel[v + 1] * dt);
        this.pos[v + 2] += this.vel[v + 2] * dt;
        this.rot[v] += this.spin[v] * dt;
        this.rot[v + 1] += this.spin[v + 1] * dt;
        this.rot[v + 2] += this.spin[v + 2] * dt;
      } else {
        this.rot[v] += (-Math.PI / 2 - this.rot[v]) * Math.min(1, dt * 10); // lie flat
      }
      d.position.set(this.pos[v], this.pos[v + 1], this.pos[v + 2]);
      d.rotation.set(this.rot[v], this.rot[v + 1], this.rot[v + 2]);
      d.scale.setScalar(Math.min(1, this.life[i] / 0.5));
      d.updateMatrix();
      this.mesh.setMatrixAt(i, d.matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.active = alive;
  }

  dispose() {
    this.geo.dispose();
    this.mat.dispose();
    this.mesh.dispose();
  }
}

// --- ambient dust motes ------------------------------------------------------

const DUST_CAP = 140;

class Dust {
  readonly pool = new PointPool(DUST_CAP, true);
  private base = new Float32Array(DUST_CAP * 3);
  private phase = new Float32Array(DUST_CAP * 3);
  private beam = new Float32Array(DUST_CAP);
  private t = 0;
  private center = new THREE.Vector3(0, 1.6, 0);
  private size = new THREE.Vector3(14, 3.2, 8);
  private lightDir = new THREE.Vector3(-0.5, -1, -0.6).normalize();

  constructor() {
    this.scatter();
  }

  /** Place the dust volume. Motes brighten near a shaft of sunlight running along `lightDir` through the centre. */
  setArea(center: THREE.Vector3, size: THREE.Vector3, lightDir?: THREE.Vector3) {
    this.center.copy(center);
    this.size.copy(size);
    if (lightDir) this.lightDir.copy(lightDir).normalize();
    this.scatter();
  }

  private scatter() {
    const p = new THREE.Vector3();
    const toP = new THREE.Vector3();
    const warm = new THREE.Color('#ffe9b0');
    for (let i = 0; i < DUST_CAP; i++) {
      const v = i * 3;
      this.base[v] = this.center.x + rand(-0.5, 0.5) * this.size.x;
      this.base[v + 1] = this.center.y + rand(-0.5, 0.5) * this.size.y;
      this.base[v + 2] = this.center.z + rand(-0.5, 0.5) * this.size.z;
      for (let k = 0; k < 3; k++) this.phase[v + k] = rand(0, TAU);
      p.set(this.base[v], this.base[v + 1], this.base[v + 2]);
      toP.copy(p).sub(this.center);
      const along = toP.dot(this.lightDir);
      const perp = toP.addScaledVector(this.lightDir, -along).length();
      this.beam[i] = 0.3 + 0.7 * Math.exp(-(perp * perp) / 5);
      this.pool.set(i, p.x, p.y, p.z, warm.r, warm.g, warm.b, rand(0.025, 0.06), 0);
    }
    this.pool.flush();
  }

  update(dt: number) {
    this.t += dt;
    const t = this.t;
    for (let i = 0; i < DUST_CAP; i++) {
      const v = i * 3;
      const ph = this.phase;
      const x = this.base[v] + Math.sin(t * 0.21 + ph[v]) * 0.5 + t * 0.03 * Math.sin(ph[v + 1]);
      const y = this.base[v + 1] + Math.sin(t * 0.33 + ph[v + 1]) * 0.25;
      const z = this.base[v + 2] + Math.sin(t * 0.17 + ph[v + 2]) * 0.5;
      const twinkle = 0.5 + 0.5 * Math.sin(t * 0.9 + ph[v + 2] * 3);
      this.pool.setMotion(i, x, y, z, 0.02 + 0.025 * ((i % 5) / 4), this.beam[i] * (0.15 + 0.45 * twinkle));
    }
    this.pool.flush(false);
  }
}

// --- masquerade vision cone --------------------------------------------------

export interface VisionCone {
  readonly mesh: THREE.Mesh;
  /** 0 = calm yellow, 1 = alarmed red (also brighter, and pulses when high). */
  setSuspicion(value: number): void;
  dispose(): void;
}

const YELLOW = new THREE.Color('#ffd84a');
const RED = new THREE.Color('#ff2a1c');

function createVisionCone(range: number, fovDeg: number, segments = 28): VisionCone & { tick(dt: number): void } {
  const half = THREE.MathUtils.degToRad(fovDeg) / 2;
  const positions: number[] = [0, 0, 0];
  const index: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = -half + (2 * half * i) / segments;
    positions.push(Math.sin(a) * range, 0, Math.cos(a) * range);
    if (i > 0) index.push(0, i + 1, i); // CCW seen from above (+y)
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(index);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: YELLOW.clone() },
      uRange: { value: range },
      uHalf: { value: half },
      uAlpha: { value: 0.4 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vP;
      void main() {
        vP = position.xz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uRange, uHalf, uAlpha;
      varying vec2 vP;
      void main() {
        float dist = length(vP) / uRange;
        float ang = abs(atan(vP.x, vP.y)) / uHalf;
        float radial = pow(1.0 - smoothstep(0.0, 1.0, dist), 0.8);
        float edge = 1.0 - smoothstep(0.7, 1.0, ang);
        float a = uAlpha * radial * edge * (0.6 + 0.4 * (1.0 - dist));
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  const mesh = new THREE.Mesh(geo, material);
  mesh.position.y = 0.03;
  mesh.renderOrder = 1;
  mesh.frustumCulled = false;

  let s = 0;
  let t = 0;
  const apply = () => {
    material.uniforms.uColor.value.copy(YELLOW).lerp(RED, s);
    const pulse = s > 0.75 ? 0.1 * Math.sin(t * 14) * (s - 0.75) * 4 : 0;
    material.uniforms.uAlpha.value = 0.34 + 0.34 * s + pulse;
  };
  apply();

  return {
    mesh,
    setSuspicion(v) {
      s = Math.min(1, Math.max(0, v));
      apply();
    },
    tick(dt) {
      t += dt;
      if (s > 0.75) apply();
    },
    dispose() {
      geo.dispose();
      material.dispose();
    },
  };
}

// --- "!" suspicion indicator --------------------------------------------------

export interface SuspicionIndicator {
  readonly mesh: THREE.Mesh;
  /** Fills the "!" from bottom to top; hidden at 0. */
  set(value: number): void;
  dispose(): void;
}

function exclamationTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  const bar = () => {
    g.beginPath();
    g.moveTo(w * 0.28, h * 0.1);
    g.quadraticCurveTo(w * 0.5, h * 0.04, w * 0.72, h * 0.1);
    g.lineTo(w * 0.58, h * 0.66);
    g.lineTo(w * 0.42, h * 0.66);
    g.closePath();
  };
  const dot = () => {
    g.beginPath();
    g.arc(w * 0.5, h * 0.82, w * 0.115, 0, TAU);
  };
  g.lineJoin = 'round';
  g.strokeStyle = '#000';
  g.lineWidth = 18;
  bar();
  g.stroke();
  dot();
  g.stroke();
  g.fillStyle = '#fff';
  bar();
  g.fill();
  dot();
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

function createIndicator(): SuspicionIndicator & { tick(dt: number, camera: THREE.Camera): void } {
  const tex = exclamationTexture();
  const material = new THREE.ShaderMaterial({
    uniforms: { uMap: { value: tex }, uFill: { value: 0 }, uLow: { value: YELLOW.clone() }, uHigh: { value: RED.clone() } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform float uFill;
      uniform vec3 uLow, uHigh;
      varying vec2 vUv;
      void main() {
        vec4 t = texture2D(uMap, vUv);
        if (t.a < 0.05) discard;
        float f = mix(0.1, 0.9, uFill);
        float on = step(vUv.y, f);
        vec3 fillCol = mix(uLow, uHigh, uFill);
        vec3 inner = mix(vec3(0.22), fillCol, on);
        gl_FragColor = vec4(mix(vec3(0.0), inner, t.r), t.a);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    depthTest: false, // always readable, even behind walls
  });
  const geo = new THREE.PlaneGeometry(0.5, 1);
  const mesh = new THREE.Mesh(geo, material);
  mesh.renderOrder = 10;
  mesh.visible = false;
  mesh.frustumCulled = false;

  let v = 0;
  let t = 0;
  const q = new THREE.Quaternion();
  return {
    mesh,
    set(value) {
      v = Math.min(1, Math.max(0, value));
      material.uniforms.uFill.value = v;
      mesh.visible = v > 0.01;
    },
    tick(dt, camera) {
      if (!mesh.visible) return;
      t += dt;
      // billboard: face the camera regardless of the parent's rotation
      if (mesh.parent) {
        mesh.parent.getWorldQuaternion(q).invert();
        mesh.quaternion.copy(q).multiply(camera.quaternion);
      } else {
        mesh.quaternion.copy(camera.quaternion);
      }
      const pop = v > 0.92 ? 1 + 0.12 * Math.sin(t * 16) : 1;
      mesh.scale.setScalar(pop);
    },
    dispose() {
      geo.dispose();
      material.dispose();
      tex.dispose();
    },
  };
}

// --- facade ------------------------------------------------------------------

export class Fx {
  private splash = new PaintSplash();
  private confetti = new Confetti();
  readonly dust = new Dust();
  private cones: ReturnType<typeof createVisionCone>[] = [];
  private indicators: ReturnType<typeof createIndicator>[] = [];
  /** Draw calls this class adds when everything is on screen: splash + confetti + dust, plus 1 per cone and indicator. */
  readonly baseDrawCalls = 3;

  constructor(scene: THREE.Scene) {
    scene.add(this.splash.pool.points, this.confetti.mesh, this.dust.pool.points);
  }

  /** Paint splash in the picked colour, at a world position (e.g. the player's torso). */
  paintSplash(position: THREE.Vector3, color: THREE.ColorRepresentation, count = 28): void {
    this.splash.emit(position, color, count);
  }

  /** Fabric strip confetti in the masquerade's colours. */
  caughtBurst(position: THREE.Vector3, colors: readonly string[] = MASQUERADE_COLORS, count = 70): void {
    this.confetti.burst(position, colors, count);
  }

  /** Ground cone in front of `parent` (+z). Parent it to the masquerade group so it turns with it. */
  addVisionCone(parent: THREE.Object3D, range = 5, fovDeg = 70): VisionCone {
    const cone = createVisionCone(range, fovDeg);
    parent.add(cone.mesh);
    this.cones.push(cone);
    return cone;
  }

  addSuspicionIndicator(parent: THREE.Object3D, height = 2.85): SuspicionIndicator {
    const ind = createIndicator();
    ind.mesh.position.y = height;
    parent.add(ind.mesh);
    this.indicators.push(ind);
    return ind;
  }

  /** Call once per frame. Needs the camera for billboards and point sizes. */
  update(dt: number, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
    const heightPx = renderer.domElement.height;
    const scale = heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    this.splash.pool.material.uniforms.uScale.value = scale;
    this.dust.pool.material.uniforms.uScale.value = scale;

    this.splash.update(dt);
    this.confetti.update(dt);
    this.dust.update(dt);
    for (const c of this.cones) c.tick(dt);
    for (const i of this.indicators) i.tick(dt, camera);
  }

  dispose(): void {
    this.splash.pool.dispose();
    this.confetti.dispose();
    this.dust.pool.dispose();
    this.cones.forEach((c) => c.dispose());
    this.indicators.forEach((i) => i.dispose());
  }
}
