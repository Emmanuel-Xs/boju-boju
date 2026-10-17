// Tiny pose-blending animation system. A clip is a function (time) => Pose; the animator
// cross-fades from a snapshot of the last applied pose into the new clip, so any transition blends.
import type * as THREE from 'three';

export type Channel = 'px' | 'py' | 'pz' | 'rx' | 'ry' | 'rz' | 'sx' | 'sy' | 'sz';
const CHANNELS: Channel[] = ['px', 'py', 'pz', 'rx', 'ry', 'rz', 'sx', 'sy', 'sz'];

/** Offsets from the joint's rest transform (radians for r*, units for p*, additive for s*). */
export type JointPose = Partial<Record<Channel, number>>;
export type Pose = Record<string, JointPose>;
export type Clip<S extends string> = (t: number, anim: Animator<S>) => Pose;

const smooth = (x: number) => x * x * (3 - 2 * x);

export class Animator<S extends string> {
  state: S;
  /** Seconds since the current state started (scaled by `speed`). */
  time = 0;
  /** Playback rate for cycles, e.g. tie walk speed to movement. */
  speed = 1;

  private blend = 1;
  private blendDur: number;
  private from: Pose = {};
  private applied: Pose = {};
  private rest = new Map<string, { pos: THREE.Vector3; scale: THREE.Vector3 }>();

  constructor(
    private joints: Record<string, THREE.Object3D>,
    private clips: Record<S, Clip<S>>,
    initial: S,
    public blendTime = 0.22,
  ) {
    this.state = initial;
    this.blendDur = blendTime;
    for (const [name, j] of Object.entries(joints)) {
      j.rotation.order = 'YXZ';
      this.rest.set(name, { pos: j.position.clone(), scale: j.scale.clone() });
    }
    this.update(0);
  }

  /** Switch state with a cross-fade from whatever is on screen right now. */
  play(state: S, blendTime = this.blendTime): void {
    if (state === this.state) return;
    this.from = structuredClone(this.applied);
    this.state = state;
    this.time = 0;
    this.blend = 0;
    this.blendDur = Math.max(blendTime, 1e-4);
  }

  update(dt: number): void {
    this.time += dt * this.speed;
    this.blend = Math.min(1, this.blend + dt / this.blendDur);
    const w = smooth(this.blend);
    const target = this.clips[this.state](this.time, this);

    for (const [name, joint] of Object.entries(this.joints)) {
      const a = this.from[name];
      const b = target[name];
      const out: JointPose = {};
      for (const c of CHANNELS) {
        const bv = b?.[c] ?? 0;
        const av = a?.[c] ?? 0;
        if (av === 0 && bv === 0) continue;
        out[c] = av + (bv - av) * w;
      }
      this.applied[name] = out;
      const rest = this.rest.get(name)!;
      joint.position.set(rest.pos.x + (out.px ?? 0), rest.pos.y + (out.py ?? 0), rest.pos.z + (out.pz ?? 0));
      joint.rotation.set(out.rx ?? 0, out.ry ?? 0, out.rz ?? 0);
      joint.scale.set(rest.scale.x + (out.sx ?? 0), rest.scale.y + (out.sy ?? 0), rest.scale.z + (out.sz ?? 0));
    }
  }
}
