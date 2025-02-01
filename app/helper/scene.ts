import * as THREE from "three";
export default function startScene(
  setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>
) {
  const newScene = new THREE.Scene();
  setScene(newScene)
  return newScene;
}