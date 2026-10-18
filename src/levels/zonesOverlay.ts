// DEV only: a heat map of how well the masquerade can see the yard, drawn on the floor.
//   red     no walkable cell can see this spot: a hider here could never be found (a dead zone)
//   orange  seen from only a few places
//   green   seen from many (fainter the more places see it)
//   blue    a corner of the floor     white  a patrol stop
// Everything is listed in a panel too. A dead zone is either fixed by moving a prop or tagged as a deliberate "golden spot" (at most two per level).
import * as THREE from 'three';
import type { Seeker } from '../seeker';
import type { Compound } from './compound';

/** Deliberate golden spots: places a hider can in theory reach but the masquerade may never see. At most two per level, each with the reason. */
export const GOLDEN_SPOTS: { x: number; z: number; why: string }[] = [
  { x: 10.7, z: 6, why: 'The slot between the danfo and the hollow-block steps (hiding spot block_steps): open at the west end only, 1.5 m wide, so the masquerade sees into it from one narrow angle.' },
  { x: 13.1, z: 7.4, why: 'The pocket behind the water tank (hiding spots water_tank and zinc_fence): reached through the 1.5 m lane beside the steps, and the tank covers its east side.' },
];

export function showZonesOverlay(scene: THREE.Scene, level: Compound, seeker: Seeker, stride = 2): { dead: number; thin: number; text: string } {
  const cov = seeker.cov;
  const counts = cov.viewCounts(stride);
  const dead = cov.deadZones(counts);
  const thin = cov.thinZones(counts);
  const corners = cov.corners();
  const b = level.bounds;
  const px = 8; // pixels per cell
  const cell = cov.cfg.cell;
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil((b.maxX - b.minX) / cell) * px;
  canvas.height = Math.ceil((b.maxZ - b.minZ) / cell) * px;
  const g = canvas.getContext('2d')!;
  const at = (x: number, z: number) => [((x - b.minX) / cell) * px, ((z - b.minZ) / cell) * px] as const;
  const maxCount = Math.max(1, ...counts);
  cov.cells.forEach((c, i) => {
    const n = counts[i];
    g.fillStyle = n === 0 ? 'rgba(255,40,40,0.9)' : n <= cov.cfg.thin ? 'rgba(255,150,30,0.85)' : `rgba(60,220,110,${0.12 + 0.3 * Math.min(1, n / maxCount)})`;
    const [x, y] = at(c.x - cell / 2, c.z - cell / 2);
    g.fillRect(x, y, px, px);
  });
  g.fillStyle = 'rgba(70,140,255,0.95)';
  for (const c of corners) {
    const [x, y] = at(c.x, c.z);
    g.beginPath();
    g.arc(x, y, px * 0.45, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#fff';
  for (const st of seeker.patrol.stops) {
    const [x, y] = at(st.x, st.z);
    g.fillRect(x - 2, y - 2, 4, 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(b.maxX - b.minX, b.maxZ - b.minZ).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }),
  );
  plane.position.set((b.minX + b.maxX) / 2, 0.09, (b.minZ + b.maxZ) / 2);
  plane.renderOrder = 20;
  scene.add(plane);

  const f = (z: { cx: number; cz: number; area: number }) => `(${z.cx.toFixed(1)}, ${z.cz.toFixed(1)}) ${z.area.toFixed(2)} m²`;
  const text = [
    `Seen from ${cov.viewpoints.length} walkable cells (every ${stride}. one used), ${cov.cells.length} floor cells, ${seeker.patrol.stops.length} patrol stops, ${corners.length} corners.`,
    `DEAD ZONES: ${dead.length ? dead.map(f).join('; ') : 'none'}`,
    `Seen from ${cov.cfg.thin} cells or fewer: ${thin.length ? thin.slice(0, 10).map(f).join('; ') : 'none'}`,
    `Golden spots tagged: ${GOLDEN_SPOTS.length} (max 2)`,
    seeker.patrol.blind.length ? `Spots no reachable cell can see: ${seeker.patrol.blind.join(', ')}` : 'Every hiding spot can be seen from a reachable cell.',
  ].join('\n');
  const panel = document.createElement('pre');
  panel.style.cssText = 'position:fixed;left:8px;bottom:8px;max-width:520px;z-index:50;margin:0;padding:8px 10px;background:#000c;color:#fff;font:11px/1.45 monospace;white-space:pre-wrap;border-radius:6px;pointer-events:none';
  panel.textContent = text;
  document.body.appendChild(panel);
  return { dead: dead.length, thin: thin.length, text };
}
