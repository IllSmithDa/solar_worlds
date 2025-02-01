import * as THREE from "three";
export default function createSimpleSphere(
  size: number
) {
  const sphere = new THREE.SphereGeometry(size, 64, 64);
  return sphere;
}

export function createRing(
  innerRadius: number,
  outerRadius: number
) {
  const rignGeo = new THREE.RingGeometry(innerRadius, outerRadius, 30, 30)
  return rignGeo;
}

export function createAsteroidGeo() {
  const rignGeo = new THREE.RingGeometry(.8, .5, 30, 30)
  return rignGeo;
}