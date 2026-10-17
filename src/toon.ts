// One shared toon look for characters, walls and props, so a painted colour reads the same everywhere.
import * as THREE from 'three';

let gradient: THREE.DataTexture | null = null;

/** Three hard light steps (shadow, mid, lit). Nearest filtering keeps the bands crisp. */
export function toonGradient(): THREE.DataTexture {
  if (!gradient) {
    gradient = new THREE.DataTexture(new Uint8Array([95, 175, 255]), 3, 1, THREE.RedFormat);
    gradient.minFilter = THREE.NearestFilter;
    gradient.magFilter = THREE.NearestFilter;
    gradient.generateMipmaps = false;
    gradient.needsUpdate = true;
  }
  return gradient;
}

export function toon(color: THREE.ColorRepresentation, params: THREE.MeshToonMaterialParameters = {}): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, gradientMap: toonGradient(), ...params });
}

/** Faceted low-poly look: split vertices and recompute per-face normals. */
export function facet<T extends THREE.BufferGeometry>(geo: T): THREE.BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  g.computeVertexNormals();
  return g;
}
