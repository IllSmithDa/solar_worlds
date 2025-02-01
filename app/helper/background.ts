import * as THREE from "three"

export default function generateCubeMap(
  scene: THREE.Scene,
  path: string,
) {
  scene.background = new THREE.CubeTextureLoader()
	.setPath(path)
	.load( [
				'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
			] );
}