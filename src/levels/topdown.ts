// Angled top-down follow camera. The camera never turns; walls (FadeGroups) that come between it and the player fade out.
import * as THREE from 'three';
import type { FadeGroup } from './kit';

/** Critically damped follow (the same easing Unity's SmoothDamp uses): no overshoot, no jitter, independent of the frame rate. */
function smoothDamp(current: number, target: number, vel: { v: number }, smoothTime: number, dt: number): number {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (vel.v + omega * change) * dt;
  vel.v = (vel.v - omega * temp) * e;
  return target + (change + temp) * e;
}

export class TopDownCamera {
  readonly camera: THREE.PerspectiveCamera;
  private focus = new THREE.Vector3();
  private vx = { v: 0 };
  private vy = { v: 0 };
  private vz = { v: 0 };
  private samples = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];

  constructor(
    aspect: number,
    /** Camera position relative to the player: up and back (+z), looking at them. */
    readonly offset = new THREE.Vector3(0, 10.5, 7.8),
  ) {
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 160);
    this.setAspect(aspect);
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.fov = aspect < 1 ? 52 : 38; // portrait phones need a wider lens to keep the surroundings in view
    this.camera.updateProjectionMatrix();
  }

  snapTo(p: THREE.Vector3): void {
    this.focus.copy(p);
    this.vx.v = this.vy.v = this.vz.v = 0;
    this.apply();
  }

  /** `vx`, `vz`: the player's ground velocity, so the camera leads a little in the direction of travel. */
  update(dt: number, p: THREE.Vector3, vx = 0, vz = 0): void {
    const lead = 0.16;
    this.focus.x = smoothDamp(this.focus.x, p.x + vx * lead, this.vx, 0.16, dt);
    this.focus.z = smoothDamp(this.focus.z, p.z + vz * lead, this.vz, 0.16, dt);
    this.focus.y = smoothDamp(this.focus.y, p.y, this.vy, 0.32, dt); // jumps and climbs shouldn't bounce the view
    this.apply();
  }

  private apply(): void {
    this.camera.position.copy(this.focus).add(this.offset);
    this.camera.lookAt(this.focus.x, this.focus.y + 0.9, this.focus.z);
  }

  /** Ease every group that blocks the line from the camera to the player's feet, chest or head towards see-through. */
  fade(groups: readonly FadeGroup[], p: THREE.Vector3, dt: number): void {
    this.samples[0].set(p.x, p.y + 0.15, p.z);
    this.samples[1].set(p.x, p.y + 0.9, p.z);
    this.samples[2].set(p.x, p.y + 1.6, p.z);
    for (const g of groups) {
      g.target = this.samples.some((s) => g.blocks(this.camera.position, s, 0.08)) ? 0.18 : 1;
      g.update(dt);
    }
  }
}
