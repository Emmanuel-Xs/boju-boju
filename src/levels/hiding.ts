// Hiding and painting for the player: eyedropper, paint, held poses, and the live camo meter with its debug overlay.
//   Hold E (or tap the Eyedropper button) and aim at a surface within 4 m; click / tap reads its userData.baseColor into the selected zone.
//   Q switches zone. 1-4: stand_stiff, crouch, wall_flat, curl_ball. Moving breaks a pose. H toggles hunt mode, C the camo debug text.
import * as THREE from 'three';
import { audio } from '../audio';
import { CamoMeter, describeBreakdown } from '../camo';
import type { Character, PaintZone, PlayerState } from '../character';
import type { Fx } from '../fx';
import type { Compound } from './compound';
import { nearestWall, resolveCollisions, type Input } from './controller';
import { createHud } from './hud';
import { LevelProbe, type Reading } from './probe';

export const REACH = 4; // m from the player's torso to the surface the eyedropper may read
export const PAINT_COOLDOWN = 0.4; // s between paints
export const WALL_SNAP_RANGE = 1; // m: wall_flat looks for a wall this close
const WALL_STAND = 0.24; // m from the wall face to the player's centre when flat against it
export const POSES: PlayerState[] = ['stand_stiff', 'crouch', 'wall_flat', 'curl_ball'];
/** Heights of the splash origin per pose: [top, bottom]. */
const SPLASH_Y: Record<string, [number, number]> = { crouch: [0.85, 0.4], curl_ball: [0.5, 0.3] };

export interface HidingOptions {
  level: Compound;
  player: Character;
  fx: Fx;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  input: Input;
  /** Player position (mutated when wall_flat snaps you to a wall). */
  pos: THREE.Vector3;
  touch: boolean;
  /** Start in hunt mode (hat, hair and accessory hidden), as in the real game. */
  hunt: boolean;
}

export interface FrameInfo {
  /** Walking or running speed this frame, 0 when still. */
  speed: number;
  yaw: number;
}

export class HidingController {
  readonly probe: LevelProbe;
  readonly camo: CamoMeter;
  zone: PaintZone = 'top';
  readonly painted: Record<PaintZone, boolean> = { top: false, bottom: false };
  pose: PlayerState | null = null;
  private holdAim = false;
  private stickyAim = false;
  private cooldownUntil = 0; // wall-clock ms, so the 0.4 s cooldown doesn't stretch on a slow frame rate
  private snap: { from: THREE.Vector3; to: THREE.Vector3; t: number } | null = null;
  private poseYaw: number | null = null;
  private pointer = new THREE.Vector2(innerWidth / 2, innerHeight / 2);
  private reachRing: THREE.Mesh;
  private hud;
  private hover: Reading | null = null;
  private sinceHover = 1;
  private debugOn = true;
  private torso = new THREE.Vector3();

  constructor(private o: HidingOptions) {
    this.probe = new LevelProbe(o.level, o.level.colliders);
    this.camo = new CamoMeter(this.probe);
    o.player.setHuntMode(o.hunt);

    this.hud = createHud(o.touch, {
      eyedropper: () => this.toggleStickyAim(),
      zone: () => this.toggleZone(),
      pose: (i) => this.setPose(POSES[i]),
    });
    this.hud.setPose(null);
    this.hud.setDebugVisible(this.debugOn);

    this.reachRing = new THREE.Mesh(
      new THREE.RingGeometry(REACH - 0.05, REACH, 72).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.4, depthWrite: false }),
    );
    this.reachRing.visible = false;
    this.reachRing.renderOrder = 5;
    o.scene.add(this.reachRing);

    o.input.blocked = () => this.aiming;
    addEventListener('keydown', (e) => this.onKey(e, true));
    addEventListener('keyup', (e) => this.onKey(e, false));
    addEventListener('blur', () => (this.holdAim = false));
    addEventListener('pointermove', (e) => this.pointer.set(e.clientX, e.clientY));
    o.input.el.addEventListener('pointerdown', (e) => {
      this.pointer.set(e.clientX, e.clientY);
      if (this.aiming) this.pickAndPaint();
    });
  }

  private get cooling(): boolean {
    return performance.now() < this.cooldownUntil;
  }

  get aiming(): boolean {
    return this.holdAim || this.stickyAim;
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    if (e.code === 'KeyE') {
      this.holdAim = down;
      if (down && !e.repeat) this.sinceHover = 1;
      return;
    }
    if (!down || e.repeat) return;
    if (e.code === 'KeyQ') this.toggleZone();
    else if (e.code === 'KeyH') {
      this.o.player.setHuntMode(!this.o.player.huntMode);
      this.camo.invalidate();
      this.hud.toast(this.o.player.huntMode ? 'Hunt mode: hair, hat and accessory hidden' : 'Hunt mode off: hair, hat and accessory visible (exposure penalty)');
    } else if (e.code === 'KeyC') {
      this.debugOn = !this.debugOn;
      this.hud.setDebugVisible(this.debugOn);
    } else if (e.code === 'Escape') this.stickyAim = false;
    else {
      const m = /^(?:Digit|Numpad)([1-4])$/.exec(e.code);
      if (m) this.setPose(POSES[Number(m[1]) - 1]);
    }
  }

  private toggleStickyAim(): void {
    this.stickyAim = !this.stickyAim;
    if (this.stickyAim) this.pointer.set(innerWidth / 2, innerHeight / 2);
    this.sinceHover = 1;
  }

  private toggleZone(): void {
    this.zone = this.zone === 'top' ? 'bottom' : 'top';
    this.hud.toast(`Painting the ${this.zone}`);
  }

  setPose(p: PlayerState): void {
    if (this.pose === p) {
      this.pose = null;
      this.snap = null;
      this.poseYaw = null;
      return;
    }
    if (p === 'wall_flat') {
      const w = nearestWall(this.o.pos, WALL_SNAP_RANGE, this.o.level.colliders);
      if (!w) {
        this.hud.toast('No wall within 1 m');
        return;
      }
      const to = new THREE.Vector3(w.point.x + w.normal.x * WALL_STAND, this.o.pos.y, w.point.z + w.normal.z * WALL_STAND);
      const c = { x: to.x, z: to.z };
      resolveCollisions(c, 0.18, this.o.level.colliders);
      to.set(c.x, to.y, c.z);
      this.snap = { from: this.o.pos.clone(), to, t: 0 };
      this.poseYaw = Math.atan2(w.normal.x, w.normal.z); // back to the wall, facing out
    } else {
      this.poseYaw = null;
      this.snap = null;
    }
    this.pose = p;
  }

  private ndc(): THREE.Vector2 {
    return new THREE.Vector2((this.pointer.x / innerWidth) * 2 - 1, -(this.pointer.y / innerHeight) * 2 + 1);
  }

  private pickAndPaint(): void {
    const r = this.probe.pick(this.o.camera, this.ndc());
    if (!r) return this.hud.toast('Nothing to read there');
    this.torso.copy(this.o.pos);
    this.torso.y += 1;
    const d = this.torso.distanceTo(r.point);
    if (d > REACH) return this.hud.toast(`Too far: ${d.toFixed(1)} m (reach ${REACH} m)`);
    if (this.cooling) return;
    this.paint(r);
    this.stickyAim = false;
  }

  private paint(r: Reading): void {
    this.cooldownUntil = performance.now() + PAINT_COOLDOWN * 1000;
    const { player, fx, pos } = this.o;
    player.setZoneColor(this.zone, r.color);
    this.painted[this.zone] = true;
    this.camo.invalidate();
    const y = (SPLASH_Y[this.pose ?? ''] ?? [1.25, 0.6])[this.zone === 'top' ? 0 : 1];
    fx.paintSplash(this.torso.set(pos.x, pos.y + y, pos.z), r.color);
    void audio.unlock().then(() => audio.playOnce('sfx_paint', { volume: 0.9 }));
    this.hud.toast(`${this.zone} painted ${r.label} #${r.color.getHexString()}`);
  }

  /** Call every frame after the player has moved. Returns the pose to play while standing still, and a yaw override for wall_flat. */
  update(dt: number, f: FrameInfo): { state: PlayerState; yaw: number | null } {
    const { pos, player, camera } = this.o;
    if (f.speed > 0) {
      this.pose = null;
      this.snap = null;
      this.poseYaw = null;
    }
    if (this.snap) {
      this.snap.t = Math.min(1, this.snap.t + dt / 0.18);
      const e = 1 - (1 - this.snap.t) ** 3;
      pos.lerpVectors(this.snap.from, this.snap.to, e);
      if (this.snap.t >= 1) this.snap = null;
    }

    // eyedropper preview
    const aiming = this.aiming;
    this.o.input.el.style.cursor = aiming ? 'crosshair' : '';
    this.reachRing.visible = aiming;
    if (aiming) {
      this.reachRing.position.set(pos.x, 0.06, pos.z);
      this.sinceHover += dt;
      if (this.sinceHover > 1 / 30) {
        this.sinceHover = 0;
        this.hover = this.probe.pick(camera, this.ndc());
      }
      let valid = false;
      if (this.hover) {
        this.torso.copy(pos);
        this.torso.y += 1;
        valid = this.torso.distanceTo(this.hover.point) <= REACH;
      }
      this.hud.crosshair(true, this.pointer.x, this.pointer.y, valid, this.hover ? { color: this.hover.color, label: this.hover.label } : null, this.cooling);
    } else {
      this.hud.crosshair(false);
      this.hover = null;
    }
    this.hud.setAiming(this.stickyAim);

    // camo
    const style = player.style;
    const hunt = player.huntMode;
    const b = this.camo.update(dt, {
      zones: { top: player.getZoneColor('top'), bottom: player.getZoneColor('bottom') },
      painted: this.painted,
      pose: this.pose,
      speed: f.speed,
      running: f.speed > 3.5,
      yaw: this.poseYaw ?? f.yaw,
      position: pos,
      eye: camera.position,
      hairVisible: !hunt && style.hair !== 'bald',
      hatVisible: !hunt && style.hat !== 'none',
      accessoryVisible: !hunt && style.accessory !== 'none',
    });
    this.hud.setScore(this.camo.display);
    this.hud.setZones(player.getZoneColor('top'), player.getZoneColor('bottom'), this.zone, this.painted);
    this.hud.setPose(this.pose);
    if (this.debugOn) this.hud.setDebug(`${describeBreakdown(b)}\nhunt mode: ${hunt ? 'on' : 'off'}   viewer: camera (no seeker yet)`);

    return { state: this.pose ?? 'idle', yaw: this.poseYaw };
  }
}
