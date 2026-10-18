// Entry point. Dev-only pages (?debug) are compiled out of production builds.
import * as THREE from 'three';
void THREE;

const params = new URLSearchParams(location.search);
if (import.meta.env.DEV && params.has('debug')) {
  void import('./debugScene').then((m) => m.startDebugScene());
} else {
  void import('./game').then((m) => m.startGame());
}
