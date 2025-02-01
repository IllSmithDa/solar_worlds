import * as THREE from "three";
import { roughness } from "three/tsl";

const textureloader = new THREE.TextureLoader();


export default function createSimpleMat(textureUrl: string) {

  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,

  })

  return newTexture
}

export function createSunMat(textureUrl: string) {
  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    color: 0xffff99,
  })

  return newTexture
}

export function createRingMat(textureUrl: string) {
  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: .7,
    side: THREE.DoubleSide,
  })

  return newTexture;
}

export function createAsteroidMat() {
  const newTexture = new THREE.PointsMaterial({
    // transparent: true,
    opacity: .7,
    size: 0.002,
    side: THREE.DoubleSide,
  })

  return newTexture;
}