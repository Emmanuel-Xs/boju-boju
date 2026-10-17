// Pipeline smoke test only: loads a converted model by URL. No gameplay yet.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mountAudioDebug } from './audioDebug';


const params = new URLSearchParams(location.search);
if (params.has('debug')) {
  void import('./debugScene').then((m) => m.startDebugScene());
} else if (params.get('level') === 'compound') {
  void import('./levels/viewer').then((m) => m.startCompound());
} else {
  mountAudioDebug();
  pipelineSmokeTest();
}

function pipelineSmokeTest() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2));
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(2, 2, 3);
  camera.lookAt(0, 0.5, 0);

  // Relative URL: resolves next to index.html, works under any start.ng sub-path.
  const model = new URLSearchParams(location.search).get('model') ?? 'furn_chair';
  new GLTFLoader().load(
    `./models/${model}.json`,
    (gltf) => {
      scene.add(gltf.scene);
      document.title = `loaded:${model}:${gltf.scene.children.length}`;
    },
    undefined,
    (err) => {
      document.title = `error:${model}:${err}`;
    },
  );

  renderer.setAnimationLoop(() => renderer.render(scene, camera));
}
