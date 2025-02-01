import * as THREE from "three";

export default function buildCamera(
  setCammera:React.Dispatch<React.SetStateAction<THREE.PerspectiveCamera | undefined>>
) {
  const w = window.innerWidth;  
  const h = window.innerHeight;

  const fov = 85;
  const aspect = w / h;
  const near = 100;
  const far = 4000;
  const newCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  newCamera.position.z = 1000;

  setCammera(newCamera);

  return newCamera
}