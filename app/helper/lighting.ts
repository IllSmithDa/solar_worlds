import * as THREE from "three";
export default function setupLighting(scene: THREE.Scene) {


  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  const pointLight = new THREE.PointLight(0xffffff, 2000000);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;

  scene.add(ambientLight);
  // scene.add(light)
  scene.add(pointLight);

}