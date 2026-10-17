// Walking controller: WASD / arrows (Shift runs, Space jumps) or a touch / mouse drag acting as a floating joystick, with smoothed
// acceleration, circle-vs-box/circle collisions that slide along walls, and climbable props (step up onto low ones, jump onto taller ones).
// Screen up is world -z (the camera never turns).
import * as THREE from 'three';

/**
 * `wall` marks boxes a player can press their back against (building walls, fences, the danfo's flank), as opposed to furniture.
 * `climb` marks props the player can stand on: they are solid only while the player's feet are more than STEP_UP below `top`.
 */
export type Collider =
  | { kind: 'box'; minX: number; maxX: number; minZ: number; maxZ: number; wall: boolean; top: number; climb: boolean }
  | { kind: 'circle'; x: number; z: number; r: number; top: number; climb: boolean };

export const box = (x0: number, z0: number, x1: number, z1: number, wall = false, top = Infinity, climb = false): Collider => ({
  kind: 'box',
  minX: Math.min(x0, x1),
  maxX: Math.max(x0, x1),
  minZ: Math.min(z0, z1),
  maxZ: Math.max(z0, z1),
  wall,
  top,
  climb,
});
export const circle = (x: number, z: number, r: number, top = Infinity, climb = false): Collider => ({ kind: 'circle', x, z, r, top, climb });

export const WALK_SPEED = 2.8;
export const RUN_SPEED = 4.8;
export const PLAYER_RADIUS = 0.3;
/** Highest ledge the player walks up onto without jumping (m). */
export const STEP_UP = 0.55;
const GRAVITY = 22;
const JUMP_VELOCITY = 7; // apex about 1.1 m, so with STEP_UP a jump reaches ledges up to about 1.6 m
const COYOTE = 0.1; // s after walking off a ledge in which a jump still works
const JUMP_BUFFER = 0.12; // s before landing in which a jump press is remembered
const ACCEL = 13; // 1/s: how quickly velocity follows the input on the ground
const BRAKE = 16;
const AIR_CONTROL = 3.5;
/** Tallest prop the player climbs by walking into it (m above the feet). Taller ones need a running jump from another prop. */
export const AUTO_CLIMB_MAX = 1.5;
const AUTO_CLIMB_HOLD = 0.1; // s of pushing into a prop before the climb starts, so brushing past one doesn't hop

/** Whether a collider blocks a player whose feet are at height `y`. */
const solid = (c: Collider, y: number) => !c.climb || y + STEP_UP < c.top;

/** The climbable prop directly ahead of the feet that is too tall to step onto but within auto-climb reach: its top height, or null. */
export function climbableAhead(x: number, z: number, dx: number, dz: number, y: number, radius: number, colliders: readonly Collider[]): number | null {
  const px = x + dx * (radius + 0.12);
  const pz = z + dz * (radius + 0.12);
  let best: number | null = null;
  for (const c of colliders) {
    if (!c.climb || y + STEP_UP >= c.top || c.top - y > AUTO_CLIMB_MAX) continue;
    const inside = c.kind === 'box' ? px >= c.minX && px <= c.maxX && pz >= c.minZ && pz <= c.maxZ : Math.hypot(px - c.x, pz - c.z) <= c.r;
    if (inside && (best === null || c.top < best)) best = c.top; // the lowest ledge in the way is the one to climb first
  }
  return best;
}

/** Height of the highest climbable prop under a point that the player can stand on from height `y` (0 = the floor). */
export function groundAt(x: number, z: number, y: number, colliders: readonly Collider[]): number {
  let best = 0;
  const m = 0.12; // a prop still holds you when your centre is just past its edge
  for (const c of colliders) {
    if (!c.climb || c.top > y + STEP_UP + 1e-3 || c.top <= best) continue;
    const inside = c.kind === 'box' ? x >= c.minX - m && x <= c.maxX + m && z >= c.minZ - m && z <= c.maxZ + m : Math.hypot(x - c.x, z - c.z) <= c.r + m;
    if (inside) best = c.top;
  }
  return best;
}

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

/** Push a circle at (p.x, p.z) out of every collider it overlaps. Returns true if it moved. */
export function resolveCollisions(p: { x: number; z: number }, radius: number, colliders: readonly Collider[], y = 0): boolean {
  let moved = false;
  for (let pass = 0; pass < 3; pass++) {
    let any = false;
    for (const c of colliders) {
      if (!solid(c, y)) continue;
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
  /** True on the frame a jump was pressed. */
  jump?: boolean;
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
  private jumpQueued = false;
  /** Press jump from a UI button. */
  queueJump(): void {
    this.jumpQueued = true;
  }
  static readonly STICK_RADIUS = 64;

  constructor(readonly el: HTMLElement) {
    addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (!e.repeat) this.jumpQueued = true;
      }
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
    const m = this.readMove();
    if (this.jumpQueued) {
      this.jumpQueued = false;
      m.jump = true;
    }
    return m;
  }

  private readMove(): MoveInput {
    if (this.override) return { ...this.override };
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
      if (len > 8) {
        // dead zone, then a gentle response curve so small drags walk slowly and a full drag runs
        const raw = Math.min(1, (len - 8) / (Input.STICK_RADIUS - 8));
        const m = raw ** 1.25;
        run = raw > 0.85;
        return { x: (dx / len) * m, y: (dy / len) * m, run };
      }
    }
    return { x: 0, y: 0, run: false };
  }
}


export interface StepResult {
  /** Planar speed (m/s). */
  speed: number;
  /** Direction the player is steering (yaw, forward = +z), or null when idle. */
  heading: number | null;
  grounded: boolean;
  /** Vertical velocity (m/s). */
  vy: number;
}

/** The player's physical body: position, smoothed velocity, jumping and climbing. */
export class PlayerBody {
  readonly pos: THREE.Vector3;
  vx = 0;
  vz = 0;
  vy = 0;
  grounded = true;
  /** Collision radius; the viewer shrinks it while the player is pressed flat against a wall. */
  radius = PLAYER_RADIUS;
  private coyote = COYOTE;
  private jumpBuffer = 0;
  private pushT = 0;
  /** True while an automatic climb is carrying the player up (for the viewer to show the jump pose). */
  climbing = false;

  constructor(pos: THREE.Vector3) {
    this.pos = pos;
  }

  get speed(): number {
    return Math.hypot(this.vx, this.vz);
  }

  /** Advance one frame. Velocity eases towards the input (no instant starts or stops); collisions slide along walls. */
  update(input: MoveInput, dt: number, colliders: readonly Collider[], bounds: { minX: number; maxX: number; minZ: number; maxZ: number }): StepResult {
    const len = Math.hypot(input.x, input.y);
    const mag = Math.min(1, len);
    const steering = mag > 0.01;
    let tx = 0;
    let tz = 0;
    if (steering) {
      const target = input.run ? RUN_SPEED : WALK_SPEED * Math.max(0.5, mag);
      tx = (input.x / len) * target;
      tz = (input.y / len) * target;
    }
    const k = this.grounded ? (steering ? ACCEL : BRAKE) : AIR_CONTROL;
    const f = 1 - Math.exp(-k * dt);
    this.vx += (tx - this.vx) * f;
    this.vz += (tz - this.vz) * f;
    if (!steering && Math.hypot(this.vx, this.vz) < 0.12) this.vx = this.vz = 0;

    // auto-climb: keep walking into a climbable prop that is too tall to step on and the player hops up onto it
    if (steering && this.grounded && !input.jump) {
      const top = climbableAhead(this.pos.x, this.pos.z, input.x / len, input.y / len, this.pos.y, this.radius, colliders);
      this.pushT = top !== null ? this.pushT + dt : 0;
      if (top !== null && this.pushT >= AUTO_CLIMB_HOLD) {
        this.vy = Math.sqrt(2 * GRAVITY * (top - this.pos.y + 0.14)); // just enough to clear the ledge
        this.pos.y += 0.01;
        this.grounded = false;
        this.coyote = 0;
        this.pushT = 0;
        this.climbing = true;
      }
    } else if (!steering) this.pushT = 0;
    if (this.grounded) this.climbing = false;

    // horizontal move, sub-stepped so a fast frame can't tunnel through a thin wall
    const x0 = this.pos.x;
    const z0 = this.pos.z;
    const p = { x: x0, z: z0 };
    const steps = Math.max(1, Math.ceil((this.speed * dt) / 0.12));
    for (let i = 0; i < steps; i++) {
      p.x += (this.vx * dt) / steps;
      p.z += (this.vz * dt) / steps;
      resolveCollisions(p, this.radius, colliders, this.pos.y);
      p.x = Math.min(bounds.maxX, Math.max(bounds.minX, p.x));
      p.z = Math.min(bounds.maxZ, Math.max(bounds.minZ, p.z));
    }
    if (dt > 1e-4) {
      // keep only the velocity that actually happened, so pushing into a wall doesn't build up a store of speed
      this.vx = (p.x - x0) / dt;
      this.vz = (p.z - z0) / dt;
    }
    this.pos.x = p.x;
    this.pos.z = p.z;

    // vertical: walk up onto low props, fall with gravity, jump (with a little coyote time and input buffering)
    const ground = groundAt(p.x, p.z, this.pos.y, colliders);
    if (this.pos.y < ground) {
      this.pos.y = Math.min(ground, this.pos.y + Math.max(0.2, ground - this.pos.y) * Math.min(1, dt * 14));
      if (ground - this.pos.y < 0.005) this.pos.y = ground;
      this.vy = 0;
      this.grounded = true;
    } else if (this.pos.y > ground + 1e-4) {
      this.vy -= GRAVITY * dt;
      this.pos.y += this.vy * dt;
      this.grounded = false;
      if (this.pos.y <= ground) {
        this.pos.y = ground;
        this.vy = 0;
        this.grounded = true;
      }
    } else {
      this.grounded = true;
      this.vy = 0;
    }
    this.coyote = this.grounded ? COYOTE : Math.max(0, this.coyote - dt);
    this.jumpBuffer = input.jump ? JUMP_BUFFER : Math.max(0, this.jumpBuffer - dt);
    if (this.jumpBuffer > 0 && this.coyote > 0) {
      this.vy = JUMP_VELOCITY;
      this.pos.y += 0.01;
      this.grounded = false;
      this.coyote = 0;
      this.jumpBuffer = 0;
    }

    const heading = steering ? Math.atan2(input.x, input.y) : this.speed > 0.6 ? Math.atan2(this.vx, this.vz) : null;
    return { speed: this.speed, heading, grounded: this.grounded, vy: this.vy };
  }
}
