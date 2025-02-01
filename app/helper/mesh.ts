import * as THREE from "three";
export default function createSimpleMesh(
  geo: THREE.SphereGeometry | THREE.RingGeometry,
  mat: THREE.MeshStandardMaterial | THREE.MeshBasicMaterial | THREE.MeshLambertMaterial | THREE.PointsMaterial,
  distance: number,
  scene: THREE.Scene
) {
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.x = distance;
  scene.add(mesh);

  return mesh
}

export function createRingMesh(
  geo: THREE.RingGeometry,
  mat: THREE.MeshStandardMaterial,
  parent: THREE.Mesh
) {
  const mesh = new THREE.Mesh(geo, mat)
  parent.add(mesh);
  return mesh
}

export function createMoonMesh(
  geo: THREE.SphereGeometry,
  mat: THREE.MeshStandardMaterial,
  parent: THREE.Mesh
) {
  const mesh = new THREE.Mesh(geo, mat)
  parent.add(mesh);
  return mesh
}
