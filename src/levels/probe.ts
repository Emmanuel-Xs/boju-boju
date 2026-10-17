// Ray and proximity queries against the level, shared by the eyedropper and the camo meter.
// Colours always come from registered base colours (userData.baseColor), never from rendered pixels.
import * as THREE from 'three';
import type { CamoProbe, NearSurface } from '../camo';
import type { Compound } from './compound';
import { nearestWall, type Collider } from './controller';

export interface Reading {
  color: THREE.Color;
  /** Registry id, or the mesh name when the surface isn't registered (e.g. a palm tree). */
  id: string;
  label: string;
  point: THREE.Vector3;
  distance: number;
}

export class LevelProbe implements CamoProbe {
  private ray = new THREE.Raycaster();
  private targets: THREE.Mesh[] = [];
  /** What blocks a line of sight: walls and props, but not floors, painted decals or the see-through umbrella. */
  private blockers: THREE.Mesh[] = [];
  private v = new THREE.Vector3();

  constructor(
    private level: Compound,
    private colliders: readonly Collider[],
  ) {
    const walk = (o: THREE.Object3D) => {
      if (o.name === 'hiding-markers' || o.name === 'surfaces') return;
      if (o instanceof THREE.Mesh) {
        this.targets.push(o);
        if (!['ground', 'dirt', 'veranda-tiles', 'umbrella'].includes(o.name) && !o.userData.decal) this.blockers.push(o);
      }
      o.children.forEach(walk);
    };
    walk(level.group);
  }

  /** The base colour for a ray hit: the nearest registered surface, else the mesh's own base colour. */
  private read(hit: THREE.Intersection): Reading | null {
    const s = this.level.surfaces.nearest(hit.point, 0.35);
    if (s) return { color: s.baseColor.clone(), id: s.id, label: s.label, point: hit.point.clone(), distance: hit.distance };
    const c = hit.object.userData.baseColor as THREE.Color | undefined;
    if (c) return { color: c.clone(), id: hit.object.name || 'mesh', label: hit.object.name || 'surface', point: hit.point.clone(), distance: hit.distance };
    return null;
  }

  /** What the eyedropper sees under a screen point: the first surface that is actually visible (see-through faded walls are skipped). */
  pick(camera: THREE.Camera, ndc: THREE.Vector2): Reading | null {
    this.ray.setFromCamera(ndc, camera);
    this.ray.far = 120;
    for (const h of this.ray.intersectObjects(this.targets, false)) {
      const m = (h.object as THREE.Mesh).material as THREE.Material;
      if (m.opacity < 0.5) continue;
      return this.read(h);
    }
    return null;
  }

  behind(eye: THREE.Vector3, through: THREE.Vector3): { color: THREE.Color; id: string; label: string } | null {
    const dir = this.v.copy(through).sub(eye);
    const dPlayer = dir.length();
    this.ray.set(eye, dir.normalize());
    this.ray.far = 120;
    for (const h of this.ray.intersectObjects(this.targets, false)) {
      if (h.distance <= dPlayer + 0.05) continue; // in front of the player (an eave, a faded wall): not "behind"
      const r = this.read(h);
      if (r) return r;
    }
    return null;
  }

  /** True when a wall or prop sits between the two points (the last `margin` metres before `to` are ignored, so the surface behind a hider doesn't count). */
  blocked(from: THREE.Vector3, to: THREE.Vector3, margin = 0.3): boolean {
    const dir = this.v.copy(to).sub(from);
    const d = dir.length();
    if (d < margin) return false;
    this.ray.set(from, dir.normalize());
    this.ray.far = d - margin;
    return this.ray.intersectObjects(this.blockers, false).length > 0;
  }

  near(point: THREE.Vector3, radius: number): NearSurface[] {
    const out: NearSurface[] = [];
    for (const s of this.level.surfaces.list) {
      const b = s.bounds;
      const dx = Math.max(b.min.x - point.x, 0, point.x - b.max.x);
      const dz = Math.max(b.min.z - point.z, 0, point.z - b.max.z);
      const d = Math.hypot(dx, dz);
      if (d > radius) continue;
      const cx = (b.min.x + b.max.x) / 2 - point.x;
      const cz = (b.min.z + b.max.z) / 2 - point.z;
      const cl = Math.hypot(cx, cz) || 1;
      out.push({ id: s.id, kind: s.kind, distance: d, maxY: b.max.y, dir: { x: cx / cl, z: cz / cl } });
    }
    return out;
  }

  wall(point: THREE.Vector3, maxDistance: number) {
    return nearestWall(point, maxDistance, this.colliders);
  }
}
