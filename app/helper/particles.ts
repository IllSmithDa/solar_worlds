import * as THREE from "three";

export function createRingWithPoints(
  innerRadius: number, 
  outerRadius: number, 
  numPoints: number
) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const randomDist = Math.floor(Math.random() * (outerRadius - innerRadius + 1) + innerRadius);
    const angle = (Math.PI * 2 * i) / numPoints;
    const x = randomDist * Math.cos(angle);
    const y = randomDist * Math.sin(angle);
    let z = -Math.random() * 50;
    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}