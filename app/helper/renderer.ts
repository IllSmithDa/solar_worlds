import * as THREE from "three";

export default function buildRender(
  setRenderState:React.Dispatch<React.SetStateAction<THREE.WebGLRenderer | undefined>>
) {
  const newCanvas = document.querySelector("canvas.three");
  let renderer: THREE.WebGLRenderer|null = null;
  if (newCanvas) {
    const w = window.innerWidth;  
    const h = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: newCanvas })
    renderer.setSize(w, h);
    // helps smooth out the rough edges 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    setRenderState(renderer)
  }

  return renderer;
}
