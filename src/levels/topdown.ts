// Angled top-down follow camera. The camera never turns; walls (FadeGroups) that come between it and the player fade out.
import * as THREE from 'three';
import type { FadeGroup } from './kit';

export class TopDownCamera {
  readonly camera: THREE.PerspectiveCamera;
  private focus = new THREE.Vector3();
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
    this.apply();
  }

  update(dt: number, p: THREE.Vector3): void {
    this.focus.lerp(p, 1 - Math.exp(-dt * 7));
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
