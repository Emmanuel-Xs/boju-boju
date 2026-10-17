// Bakes many rigidly-attached meshes into a few SkinnedMeshes (one draw call each).
// Every part keeps following its bone (weight 1), so the existing joint animation drives the merged meshes unchanged.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface BakeGroup {
  meshes: THREE.Mesh[];
  material: THREE.Material;
  /** Write each part's material colour into a vertex colour attribute (for material.vertexColors = true). */
  vertexColors: boolean;
}

/**
 * `root` is the node the skinned meshes are added to; `bones` must all be descendants of it and
 * must still be in their rest pose. The source meshes are detached from the scene (geometry is cloned, not disposed).
 */
export function bakeSkinned(root: THREE.Object3D, bones: THREE.Bone[], groups: BakeGroup[]): THREE.SkinnedMesh[] {
  root.updateMatrixWorld(true);
  const rootInv = root.matrixWorld.clone().invert();
  const boneIndex = new Map<THREE.Object3D, number>(bones.map((b, i) => [b, i]));
  const skeleton = new THREE.Skeleton(bones); // inverses from the current (rest) world matrices
  const out: THREE.SkinnedMesh[] = [];
  const m = new THREE.Matrix4();

  for (const group of groups) {
    if (!group.meshes.length) continue;
    const geos = group.meshes.map((mesh) => {
      const g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
      for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
      g.applyMatrix4(m.multiplyMatrices(rootInv, mesh.matrixWorld));

      let bone: THREE.Object3D | null = mesh;
      while (bone && !boneIndex.has(bone)) bone = bone.parent;
      const idx = bone ? boneIndex.get(bone)! : 0;
      const n = g.attributes.position.count;
      const skinIndex = new Uint16Array(n * 4);
      const skinWeight = new Float32Array(n * 4);
      for (let i = 0; i < n; i++) {
        skinIndex[i * 4] = idx;
        skinWeight[i * 4] = 1;
      }
      g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndex, 4));
      g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeight, 4));

      if (group.vertexColors) {
        const c = (mesh.material as THREE.MeshToonMaterial).color;
        const col = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          col[i * 3] = c.r;
          col[i * 3 + 1] = c.g;
          col[i * 3 + 2] = c.b;
        }
        g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      }
      return g;
    });

    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    const skinned = new THREE.SkinnedMesh(merged, group.material);
    skinned.frustumCulled = false; // poses move parts far from the bind-pose bounds
    root.add(skinned);
    skinned.updateMatrixWorld(true);
    skinned.bind(skeleton, skinned.matrixWorld);
    out.push(skinned);
  }

  for (const group of groups) for (const mesh of group.meshes) mesh.removeFromParent();
  return out;
}
