// The glowing marker on the gate, the way home. Dim and red while the masquerade is too close; bright green, pulsing, with "RUN HOME" when
// touching the gate would end the round.
import * as THREE from 'three';

export const GATE_MARKER_CONFIG = {
  openColor: '#6dff9a',
  lockedColor: '#d8503a',
  /** Brightness (0..1) when the gate is shut and when it is open (the open one pulses between pulseLow and 1). */
  lockedGlow: 0.1,
  pulseLow: 0.55,
  pulseHz: 1.6,
  /** How tall the glowing doorway is (m). */
  height: 3.1,
};

function labelTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.font = '900 78px "Arial Black", Impact, system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 12;
  g.strokeStyle = '#0a2a14';
  g.strokeText('RUN HOME', 256, 66);
  g.fillStyle = '#d8ffe3';
  g.fillText('RUN HOME', 256, 66);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export interface GateMarker {
  group: THREE.Group;
  /** `open`: the gate works now. `shown`: draw it at all (false in the lobby). */
  update(time: number, open: boolean, shown: boolean): void;
}

export function createGateMarker(gate: { x: number; z: number; halfWidth: number }, cfg = GATE_MARKER_CONFIG): GateMarker {
  const group = new THREE.Group();
  group.position.set(gate.x - 0.55, 0, gate.z);
  const mat = (opacity: number) => new THREE.MeshBasicMaterial({ color: cfg.lockedColor, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const w = gate.halfWidth * 2;
  const door = new THREE.Mesh(new THREE.PlaneGeometry(w, cfg.height).rotateY(Math.PI / 2).translate(0, cfg.height / 2, 0), mat(0.2));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(1.4, w).rotateX(-Math.PI / 2).translate(-0.5, 0.05, 0), mat(0.4));
  const posts = [-1, 1].map((s) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, cfg.height, 8, 1, true).translate(0, cfg.height / 2, s * gate.halfWidth), mat(0.6));
    return p;
  });
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(), transparent: true, depthWrite: false, depthTest: false }));
  label.scale.set(3.4, 0.85, 1);
  label.position.set(-0.3, cfg.height + 0.5, 0);
  label.renderOrder = 5;
  group.add(door, floor, ...posts, label);
  const color = new THREE.Color();
  return {
    group,
    update(time, open, shown) {
      group.visible = shown;
      if (!shown) return;
      const glow = open ? cfg.pulseLow + (1 - cfg.pulseLow) * (0.5 + 0.5 * Math.sin(time * Math.PI * 2 * cfg.pulseHz)) : cfg.lockedGlow;
      color.set(open ? cfg.openColor : cfg.lockedColor);
      (door.material as THREE.MeshBasicMaterial).color.copy(color);
      (floor.material as THREE.MeshBasicMaterial).color.copy(color);
      (door.material as THREE.MeshBasicMaterial).opacity = 0.32 * glow;
      (floor.material as THREE.MeshBasicMaterial).opacity = 0.7 * glow;
      for (const p of posts) {
        (p.material as THREE.MeshBasicMaterial).color.copy(color);
        (p.material as THREE.MeshBasicMaterial).opacity = glow;
      }
      label.visible = open;
      (label.material as THREE.SpriteMaterial).opacity = 0.75 + 0.25 * glow;
    },
  };
}
