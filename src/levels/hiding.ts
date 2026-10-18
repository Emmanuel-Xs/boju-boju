// Hiding and painting for the player: eyedropper, paint, held poses, and the live camo meter with its debug overlay.
//   Press E (or tap the Eyedropper button) to switch the eyedropper on, aim at a surface within 4 m and click / tap: its userData.baseColor goes into the
//   selected zone. On desktop it stays on for more picks (E or Esc stops; holding E works as push-to-pick). Picked colours are kept as clickable chips.
//   Q or a click on a zone swatch switches zone. P shows the palette (swatch grid + brightness bar). 1-4: stand_stiff, crouch, wall_flat, curl_ball. Moving breaks a pose. H hunt mode, C camo text, K controls card.
import * as THREE from 'three';
import { audio } from '../audio';
import { CamoMeter, describeBreakdown } from '../camo';
import type { Character, PaintZone, PatternKind, PlayerState } from '../character';
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
  /** The viewer the camo score is measured against: the seeker's eye. Falls back to the camera while there is no seeker. */
  eye?: () => THREE.Vector3 | null;
}

export interface FrameInfo {
  /** Walking or running speed this frame, 0 when still. */
  speed: number;
  yaw: number;
}

/** The school uniform preset (Level 3 leans on it, but it works anywhere). */
export const UNIFORM = { top: '#f1eee2', bottom: '#1f3a78' };

export class HidingController {
  readonly probe: LevelProbe;
  readonly camo: CamoMeter;
  zone: PaintZone = 'top';
  readonly painted: Record<PaintZone, boolean> = { top: false, bottom: false };
  /** Pattern mode: the next pick paints stripes or dots of the new colour over the zone's last colour. */
  patternKind: PatternKind = 'solid';
  private lastPick: Partial<Record<PaintZone, THREE.Color>> = {};
  pose: PlayerState | null = null;
  private aimOn = false;
  private eDownAt = 0;
  private eSuppressRelease = false;
  private recent: { color: THREE.Color; label: string }[] = [];
  private hitMarker: THREE.Mesh;
  private cooldownUntil = 0; // wall-clock ms, so the 0.4 s cooldown doesn't stretch on a slow frame rate
  private snap: { from: THREE.Vector3; to: THREE.Vector3; t: number } | null = null;
  private poseYaw: number | null = null;
  private pointer = new THREE.Vector2(innerWidth / 2, innerHeight / 2);
  private reachRing: THREE.Mesh;
  private hud;
  private hover: Reading | null = null;
  private sinceHover = 1;
  private debugOn = false; // the per-term camo text is a dev aid: C turns it on
  private torso = new THREE.Vector3();

  constructor(private o: HidingOptions) {
    this.probe = new LevelProbe(o.level, o.level.colliders);
    this.camo = new CamoMeter(this.probe);
    o.player.setHuntMode(o.hunt);

    this.hud = createHud(o.touch, {
      eyedropper: () => this.toggleAim(),
      zone: () => this.toggleZone(),
      pattern: () => this.cyclePattern(),
      uniform: () => this.wearUniform(),
      selectZone: (z) => {
        this.zone = z;
      },
      recent: (i) => {
        const r = this.recent[i];
        if (r && !this.cooling) this.paint({ color: r.color, label: r.label });
      },
      pose: (i) => this.setPose(POSES[i]),
      jump: () => o.input.queueJump(),
      palette: (color, name) => {
        if (!this.cooling) this.paint({ color, label: name });
      },
    });
    this.hud.setPose(null);
    this.hud.setDebugVisible(this.debugOn);

    this.reachRing = new THREE.Mesh(
      new THREE.RingGeometry(REACH - 0.05, REACH, 72).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.4, depthWrite: false }),
    );
    this.reachRing.visible = false;
    this.reachRing.renderOrder = 5;
    this.hitMarker = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffffff', depthTest: false, transparent: true, opacity: 0.95 }));
    this.hitMarker.visible = false;
    this.hitMarker.renderOrder = 6;
    o.scene.add(this.reachRing, this.hitMarker);

    o.input.blocked = () => this.aiming;
    addEventListener('keydown', (e) => this.onKey(e, true));
    addEventListener('keyup', (e) => this.onKey(e, false));
    addEventListener('blur', () => {
      if (this.aimOn && performance.now() - this.eDownAt > 350) this.aimOn = false;
    });
    addEventListener('pointermove', (e) => this.pointer.set(e.clientX, e.clientY));
    o.input.el.addEventListener('pointerdown', (e) => {
      this.pointer.set(e.clientX, e.clientY);
      if (this.aiming) this.pickAndPaint();
    });
  }

  private get cooling(): boolean {
    return performance.now() < this.cooldownUntil;
  }

  /** The controls card at the bottom: shown for new players, tucked away once the teaching round is over. */
  setLegend(show: boolean): void {
    this.hud.setLegend(show);
  }

  toast(msg: string): void {
    this.hud.toast(msg);
  }

  setPaletteTop(px: number): void {
    this.hud.setPaletteTop(px);
  }

  /** Swap in a different character (the player signed in or out on start.ng). */
  setPlayer(player: Character): void {
    this.o.player = player;
    this.camo.invalidate();
  }

  /** Escape was used to stop the eyedropper this key press, so the game shouldn't also pause. */
  escUsed = false;

  show(visible: boolean): void {
    this.hud.show(visible);
    if (!visible) this.aimOn = false;
  }

  /** New round: back to the player's start.ng clothes, no pose, nothing painted, the recent colours forgotten. */
  resetPaint(top: THREE.ColorRepresentation, bottom: THREE.ColorRepresentation): void {
    this.o.player.setZoneColor('top', top);
    this.o.player.setZoneColor('bottom', bottom);
    this.painted.top = this.painted.bottom = false;
    this.patternKind = 'solid';
    this.hud.setPattern('solid');
    this.lastPick = {};
    this.recent = [];
    this.hud.setRecent([]);
    this.zone = 'top';
    this.aimOn = false;
    this.clearPose();
    this.camo.invalidate();
  }

  /** Rain: painted clothes drift back towards the start.ng colours. `k` is the share of the way to move this call; the camo score is refreshed every `refresh` seconds. */
  fadePaint(top: THREE.ColorRepresentation, bottom: THREE.ColorRepresentation, k: number, refresh: number): void {
    const target = { top: new THREE.Color(top), bottom: new THREE.Color(bottom) };
    let changed = false;
    for (const zone of ['top', 'bottom'] as const) {
      if (!this.painted[zone]) continue;
      if (this.o.player.getZonePattern(zone).kind !== 'solid') this.o.player.setZoneColor(zone, this.o.player.getZoneColor(zone)); // rain washes the pattern to its average first
      const c = this.o.player.getZoneColor(zone).clone().lerp(target[zone], k);
      this.o.player.setZoneColor(zone, c);
      if ((c.r - target[zone].r) ** 2 + (c.g - target[zone].g) ** 2 + (c.b - target[zone].b) ** 2 < 0.0008) this.painted[zone] = false; // washed right out
      changed = true;
    }
    if (changed && performance.now() >= this.fadeNext) {
      this.fadeNext = performance.now() + refresh * 1000;
      this.camo.invalidate();
    }
  }

  private fadeNext = 0;

  /** U: the school uniform, a one-press preset: a white shirt and navy shorts or skirt, painted like any other colours (it resets with every round). */
  wearUniform(): void {
    const { top, bottom } = UNIFORM;
    this.patternKind = 'solid';
    this.hud.setPattern('solid');
    this.o.player.setZoneColor('top', top);
    this.o.player.setZoneColor('bottom', bottom);
    this.lastPick = { top: new THREE.Color(top), bottom: new THREE.Color(bottom) };
    this.painted.top = this.painted.bottom = true;
    this.camo.invalidate();
    this.hud.toast('School uniform on: white shirt, navy bottoms');
    void audio.unlock().then(() => audio.playOnce('sfx_cloth_rustle_01', { volume: 2 }));
  }

  /** T: solid, then stripes, then dots. */
  cyclePattern(): void {
    this.patternKind = this.patternKind === 'solid' ? 'stripes' : this.patternKind === 'stripes' ? 'dots' : 'solid';
    this.hud.setPattern(this.patternKind);
    this.hud.toast(this.patternKind === 'solid' ? 'Pattern off: picks paint one solid colour' : `Pattern: ${this.patternKind}. Pick a colour and it goes over the zone's last colour in ${this.patternKind}.`);
  }

  /** Drop any held pose (e.g. after being caught). */
  clearPose(): void {
    this.pose = null;
    this.snap = null;
    this.poseYaw = null;
  }

  get aiming(): boolean {
    return this.aimOn;
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    if (e.code === 'KeyE') {
      if (e.repeat) return;
      if (down) {
        // a tap toggles; holding E and releasing after a moment is push-to-pick
        if (this.aimOn) {
          this.aimOn = false;
          this.eSuppressRelease = true;
        } else {
          this.aimOn = true;
          this.eDownAt = performance.now();
          this.sinceHover = 1;
        }
      } else {
        if (!this.eSuppressRelease && performance.now() - this.eDownAt > 350) this.aimOn = false;
        this.eSuppressRelease = false;
      }
      return;
    }
    if (!down || e.repeat) return;
    if (e.code === 'KeyQ') this.toggleZone();
    else if (e.code === 'KeyT') this.cyclePattern();
    else if (e.code === 'KeyU') this.wearUniform();
    else if (e.code === 'KeyH') {
      this.o.player.setHuntMode(!this.o.player.huntMode);
      this.camo.invalidate();
      this.hud.toast(this.o.player.huntMode ? 'Hunt mode: hair, hat and accessory hidden' : 'Hunt mode off: hair, hat and accessory visible (exposure penalty)');
    } else if (e.code === 'KeyC') {
      this.debugOn = !this.debugOn;
      this.hud.setDebugVisible(this.debugOn);
    } else if (e.code === 'KeyK') this.hud.toggleLegend();
    else if (e.code === 'KeyP') this.hud.togglePalette();
    else if (e.code === 'Escape' && this.aimOn) {
      this.aimOn = false;
      this.escUsed = true;
    }
    else {
      const m = /^(?:Digit|Numpad)([1-4])$/.exec(e.code);
      if (m) this.setPose(POSES[Number(m[1]) - 1]);
    }
  }

  private toggleAim(): void {
    this.aimOn = !this.aimOn;
    this.eDownAt = 0;
    if (this.aimOn) this.pointer.set(innerWidth / 2, innerHeight / 2);
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
    void audio.unlock().then(() => audio.playOnce('sfx_cloth_rustle_01', { volume: 2 }));
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
    if (this.o.touch) this.aimOn = false; // on touch you need your thumb back for walking; on desktop it stays on for the next pick
  }

  private paint(r: { color: THREE.Color; label: string }): void {
    this.cooldownUntil = performance.now() + PAINT_COOLDOWN * 1000;
    const { player, fx, pos } = this.o;
    if (this.patternKind === 'solid') player.setZoneColor(this.zone, r.color);
    else {
      // two picked colours: the new one in stripes or dots over the one the zone had (your own clothes if it was not painted yet)
      const under = this.lastPick[this.zone] ?? player.getZoneColor(this.zone);
      player.setZonePattern(this.zone, this.patternKind, r.color, under);
    }
    this.lastPick[this.zone] = r.color.clone();
    this.painted[this.zone] = true;
    const hexKey = r.color.getHexString();
    this.recent = [{ color: r.color.clone(), label: r.label }, ...this.recent.filter((c) => c.color.getHexString() !== hexKey)].slice(0, 8);
    this.hud.setRecent(this.recent);
    this.camo.invalidate();
    const y = (SPLASH_Y[this.pose ?? ''] ?? [1.25, 0.6])[this.zone === 'top' ? 0 : 1];
    fx.paintSplash(this.torso.set(pos.x, pos.y + y, pos.z), r.color);
    void audio.unlock().then(() => audio.playOnce('sfx_paint', { volume: 0.6 }));
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
    this.hitMarker.visible = false;
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
      if (this.hover) {
        this.hitMarker.position.copy(this.hover.point);
        this.hitMarker.visible = true;
        (this.hitMarker.material as THREE.MeshBasicMaterial).color.set(valid ? '#ffffff' : '#ff5a4a');
      }
      this.hud.crosshair(true, this.pointer.x, this.pointer.y, valid, this.hover ? { color: this.hover.color, label: this.hover.label } : null, this.cooling);
    } else {
      this.hud.crosshair(false);
      this.hover = null;
    }
    this.hud.setAiming(aiming);

    // camo
    const style = player.style;
    const hunt = player.huntMode;
    const b = this.camo.update(dt, {
      zones: { top: player.getZoneColor('top'), bottom: player.getZoneColor('bottom') },
      painted: this.painted,
      patterns: { top: player.getZonePattern('top').kind, bottom: player.getZonePattern('bottom').kind },
      pose: this.pose,
      speed: f.speed,
      running: f.speed > 3.5,
      yaw: this.poseYaw ?? f.yaw,
      position: pos,
      eye: this.o.eye?.() ?? camera.position,
      hairVisible: !hunt && style.hair !== 'bald',
      hatVisible: !hunt && style.hat !== 'none',
      accessoryVisible: !hunt && style.accessory !== 'none',
    });
    this.hud.setScore(this.camo.display);
    this.hud.setZones(player.getZoneColor('top'), player.getZoneColor('bottom'), this.zone, this.painted);
    this.hud.setPose(this.pose);
    if (this.debugOn) this.hud.setDebug(`${describeBreakdown(b)}\nhunt mode: ${hunt ? 'on' : 'off'}   viewer: ${this.o.eye?.() ? "seeker's eye" : 'camera (no seeker)'}`);

    return { state: this.pose ?? 'idle', yaw: this.poseYaw };
  }
}
