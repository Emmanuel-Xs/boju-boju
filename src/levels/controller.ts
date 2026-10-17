// Walking controller: WASD / arrows (Shift runs) or a touch / mouse drag acting as a floating joystick,
// with circle-vs-box/circle collisions that slide along walls. Screen up is world -z (the camera never turns).
import * as THREE from 'three';

/** `wall` marks boxes a player can press their back against (building walls, fences, the danfo's flank), as opposed to furniture. */
export type Collider = { kind: 'box'; minX: number; maxX: number; minZ: number; maxZ: number; wall: boolean } | { kind: 'circle'; x: number; z: number; r: number };

export const box = (x0: number, z0: number, x1: number, z1: number, wall = false): Collider => ({ kind: 'box', minX: Math.min(x0, x1), maxX: Math.max(x0, x1), minZ: Math.min(z0, z1), maxZ: Math.max(z0, z1), wall });

/** Nearest wall box to a point on the ground plane: how far its face is and the unit normal pointing from the wall towards the point. */
export function nearestWall(p: { x: number; z: number }, maxDistance: number, colliders: readonly Collider[]): { distance: number; normal: { x: number; z: number }; point: { x: number; z: number } } | null {
  let best: { distance: number; normal: { x: number; z: number }; point: { x: number; z: number } } | null = null;
  for (const c of colliders) {
    if (c.kind !== 'box' || !c.wall) continue;
    const nx = Math.min(c.maxX, Math.max(c.minX, p.x));
    const nz = Math.min(c.maxZ, Math.max(c.minZ, p.z));
    const dx = p.x - nx;
    const dz = p.z - nz;
    const d = Math.hypot(dx, dz);
    if (d > maxDistance || (best && d >= best.distance)) continue;
    if (d < 1e-6) continue; // standing inside a wall box: not a usable face
    best = { distance: d, normal: { x: dx / d, z: dz / d }, point: { x: nx, z: nz } };
  }
  return best;
}
export const circle = (x: number, z: number, r: number): Collider => ({ kind: 'circle', x, z, r });

/** Push a circle at (p.x, p.z) out of every collider it overlaps. Returns true if it moved. */
export function resolveCollisions(p: { x: number; z: number }, radius: number, colliders: readonly Collider[]): boolean {
  let moved = false;
  for (let pass = 0; pass < 3; pass++) {
    let any = false;
    for (const c of colliders) {
      if (c.kind === 'box') {
        const nx = Math.min(c.maxX, Math.max(c.minX, p.x));
        const nz = Math.min(c.maxZ, Math.max(c.minZ, p.z));
        const dx = p.x - nx;
        const dz = p.z - nz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= radius * radius) continue;
        any = moved = true;
        if (d2 > 1e-10) {
          const d = Math.sqrt(d2);
          p.x = nx + (dx / d) * radius;
          p.z = nz + (dz / d) * radius;
        } else {
          // centre is inside the box: leave through the nearest face
          const l = p.x - c.minX;
          const r = c.maxX - p.x;
          const t = p.z - c.minZ;
          const b = c.maxZ - p.z;
          const m = Math.min(l, r, t, b);
          if (m === l) p.x = c.minX - radius;
          else if (m === r) p.x = c.maxX + radius;
          else if (m === t) p.z = c.minZ - radius;
          else p.z = c.maxZ + radius;
        }
      } else {
        const dx = p.x - c.x;
        const dz = p.z - c.z;
        const min = radius + c.r;
        const d2 = dx * dx + dz * dz;
        if (d2 >= min * min) continue;
        any = moved = true;
        const d = Math.sqrt(d2) || 1e-5;
        p.x = c.x + (dx / d) * min;
        p.z = c.z + (dz / d) * min;
      }
    }
    if (!any) break;
  }
  return moved;
}

export interface MoveInput {
  /** -1..1 on screen: x right, y down (so up = -1). */
  x: number;
  y: number;
  run: boolean;
}

/** Reads keyboard and pointer drags. Call `read()` once per frame. */
export class Input {
  private keys = new Set<string>();
  private pointer: { id: number; ox: number; oy: number; x: number; y: number } | null = null;
  private stick: HTMLDivElement;
  private knob: HTMLDivElement;
  /** Set by tests / demos to drive the player without a device. */
  override: MoveInput | null = null;
  /** While this returns true, pointer drags don't steer (e.g. the eyedropper is using the pointer). */
  blocked: (() => boolean) | null = null;
  static readonly STICK_RADIUS = 64;

  constructor(readonly el: HTMLElement) {
    addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement) return;
      this.keys.add(e.code);
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => {
      this.keys.clear();
      this.pointer = null;
      this.showStick(false);
    });
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', (e) => {
      if (this.pointer || this.blocked?.()) return;
      this.pointer = { id: e.pointerId, ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
      this.showStick(true);
    });
    el.addEventListener('pointermove', (e) => {
      if (this.pointer?.id === e.pointerId) {
        this.pointer.x = e.clientX;
        this.pointer.y = e.clientY;
        this.moveStick();
      }
    });
    const end = (e: PointerEvent) => {
      if (this.pointer?.id === e.pointerId) {
        this.pointer = null;
        this.showStick(false);
      }
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);

    this.stick = document.createElement('div');
    this.stick.style.cssText = 'position:fixed;width:128px;height:128px;margin:-64px 0 0 -64px;border-radius:50%;border:2px solid rgba(255,255,255,.55);background:rgba(255,255,255,.12);pointer-events:none;display:none;z-index:5';
    this.knob = document.createElement('div');
    this.knob.style.cssText = 'position:absolute;left:44px;top:44px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.7)';
    this.stick.appendChild(this.knob);
    document.body.appendChild(this.stick);
  }

  private showStick(on: boolean) {
    this.stick.style.display = on ? 'block' : 'none';
    if (on && this.pointer) {
      this.stick.style.left = `${this.pointer.ox}px`;
      this.stick.style.top = `${this.pointer.oy}px`;
      this.knob.style.transform = 'translate(0,0)';
    }
  }

  private moveStick() {
    const p = this.pointer;
    if (!p) return;
    let dx = p.x - p.ox;
    let dy = p.y - p.oy;
    const len = Math.hypot(dx, dy);
    if (len > Input.STICK_RADIUS) {
      dx = (dx / len) * Input.STICK_RADIUS;
      dy = (dy / len) * Input.STICK_RADIUS;
    }
    this.knob.style.transform = `translate(${dx}px,${dy}px)`;
  }

  read(): MoveInput {
    if (this.override) return this.override;
    let x = 0;
    let y = 0;
    const k = this.keys;
    if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) y -= 1;
    if (k.has('KeyS') || k.has('ArrowDown')) y += 1;
    let run = k.has('ShiftLeft') || k.has('ShiftRight');
    if (x || y) {
      const l = Math.hypot(x, y);
      return { x: x / l, y: y / l, run };
    }
    const p = this.pointer;
    if (p) {
      const dx = p.x - p.ox;
      const dy = p.y - p.oy;
      const len = Math.hypot(dx, dy);
      if (len > 10) {
        const m = Math.min(1, len / Input.STICK_RADIUS);
        run = m > 0.8;
        return { x: (dx / len) * m, y: (dy / len) * m, run };
      }
    }
    return { x: 0, y: 0, run: false };
  }
}

export const WALK_SPEED = 2.8;
export const RUN_SPEED = 4.8;
export const PLAYER_RADIUS = 0.3;

/** Moves `pos` by the input for one frame (sub-stepped so fast frames can't tunnel through thin walls). */
export function stepPlayer(pos: THREE.Vector3, input: MoveInput, dt: number, colliders: readonly Collider[], bounds: { minX: number; maxX: number; minZ: number; maxZ: number }): { speed: number; heading: number | null } {
  const mag = Math.min(1, Math.hypot(input.x, input.y));
  if (mag < 0.01) return { speed: 0, heading: null };
  const speed = (input.run ? RUN_SPEED : WALK_SPEED) * (input.run ? 1 : Math.max(0.5, mag));
  const dx = (input.x / Math.hypot(input.x, input.y)) * speed;
  const dz = (input.y / Math.hypot(input.x, input.y)) * speed;
  const steps = Math.max(1, Math.ceil((speed * dt) / 0.12));
  const p = { x: pos.x, z: pos.z };
  for (let i = 0; i < steps; i++) {
    p.x += (dx * dt) / steps;
    p.z += (dz * dt) / steps;
    resolveCollisions(p, PLAYER_RADIUS, colliders);
    p.x = Math.min(bounds.maxX, Math.max(bounds.minX, p.x));
    p.z = Math.min(bounds.maxZ, Math.max(bounds.minZ, p.z));
  }
  pos.x = p.x;
  pos.z = p.z;
  return { speed: input.run ? RUN_SPEED : speed, heading: Math.atan2(dx, dz) };
}
