import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function buildRender(setRenderState) {
  const newCanvas = document.querySelector("canvas.three");
  let renderer = null;
  if (newCanvas) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: newCanvas });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setRenderState(renderer);
  }
  return renderer;
}
function buildCamera(setCammera) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const fov = 85;
  const aspect = w / h;
  const near = 100;
  const far = 4e3;
  const newCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  newCamera.position.z = 1e3;
  setCammera(newCamera);
  return newCamera;
}
function startScene(setScene) {
  const newScene = new THREE.Scene();
  setScene(newScene);
  return newScene;
}
function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(16777215, 1);
  const pointLight = new THREE.PointLight(16777215, 2e6);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;
  scene.add(ambientLight);
  scene.add(pointLight);
}
function createSimpleSphere(size) {
  const sphere = new THREE.SphereGeometry(size, 64, 64);
  return sphere;
}
function createRing(innerRadius, outerRadius) {
  const rignGeo = new THREE.RingGeometry(innerRadius, outerRadius, 30, 30);
  return rignGeo;
}
const textureloader = new THREE.TextureLoader();
function createSimpleMat(textureUrl) {
  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  return newTexture;
}
function createSunMat(textureUrl) {
  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    color: 16777113
  });
  return newTexture;
}
function createRingMat(textureUrl) {
  const texture = textureloader.load(textureUrl);
  const newTexture = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide
  });
  return newTexture;
}
function createSimpleMesh(geo, mat, distance, scene) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = distance;
  scene.add(mesh);
  return mesh;
}
function createRingMesh(geo, mat, parent) {
  const mesh = new THREE.Mesh(geo, mat);
  parent.add(mesh);
  return mesh;
}
function createMoonMesh(geo, mat, parent) {
  const mesh = new THREE.Mesh(geo, mat);
  parent.add(mesh);
  return mesh;
}
const sunImage = "/solar_worlds/assets/sun_texture-BfaUCBxs.jpg";
const mercuryImage = "/solar_worlds/assets/2k_mercury-lhhbYhEJ.jpg";
const venusImage = "/solar_worlds/assets/2k_venus-B7XKoL-0.jpg";
const earthImage = "/solar_worlds/assets/earth_texture-DKLT2WuX.jpg";
const marsImage = "/solar_worlds/assets/2k_mars-BX2JGd6W.jpg";
const jupiterImage = "/solar_worlds/assets/2k_jupiter-CEiO5JSj.jpg";
const saturnImage = "/solar_worlds/assets/2k_saturn-BOztX_Vf.jpg";
const uranusImage = "/solar_worlds/assets/2k_uranus-QU9XKwEw.jpg";
const neptuneImage = "/solar_worlds/assets/2k_neptune-CRPHsRry.jpg";
const saturnRingImage = "/solar_worlds/assets/2k_saturn_ring_alpha-Uee5GQV2.png";
const earthMoonImage = "/solar_worlds/assets/2k_moon-BMpRMzYO.jpg";
const solarData = [
  {
    name: "Sun",
    distance: 0,
    texture: sunImage,
    size: 120,
    speed: 0,
    rotateSpeed: 1e-3
  },
  {
    name: "Mercury",
    distance: 300,
    texture: mercuryImage,
    size: 11,
    speed: 1.1,
    rotateSpeed: 8e-3
  },
  {
    name: "Venus",
    distance: 450,
    texture: venusImage,
    size: 12,
    speed: 0.8,
    rotateSpeed: 7e-3
  },
  {
    name: "Earth",
    distance: 600,
    texture: earthImage,
    size: 13,
    speed: 0.7,
    rotateSpeed: 5e-3,
    moons: [
      {
        name: "Moon",
        distance: 50,
        speed: 0.8,
        rotateSpeed: 3e-3,
        size: 4,
        texture: earthMoonImage
      }
    ]
  },
  {
    name: "Mars",
    distance: 750,
    texture: marsImage,
    size: 14,
    speed: 0.6,
    rotateSpeed: 4e-3
  },
  {
    name: "Jupiter",
    distance: 1500,
    texture: jupiterImage,
    size: 32,
    speed: 0.3,
    rotateSpeed: 3e-3
  },
  {
    mame: "Saturn",
    distance: 1800,
    texture: saturnImage,
    size: 26,
    speed: 0.2,
    rotateSpeed: 3e-3,
    ring: {
      direction: "horizontal",
      texture: saturnRingImage,
      innerRadius: 40,
      outerRadius: 60
    }
  },
  {
    mame: "Uranus",
    distance: 2100,
    texture: uranusImage,
    size: 22,
    speed: 0.15,
    rotateSpeed: 3e-3
  },
  {
    mame: "Neptune",
    distance: 2400,
    texture: neptuneImage,
    size: 22,
    speed: 0.08,
    rotateSpeed: 3e-3
  }
];
const asteroidBelt = {
  inner: 900,
  outer: 1100
};
const asteroidBeltOuter = {
  inner: 3e3,
  outer: 3100
};
function generateCubeMap(scene, path) {
  scene.background = new THREE.CubeTextureLoader().setPath(path).load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png"
  ]);
}
function Navbar() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", { className: "flex gap-10 p-5", children: /* @__PURE__ */ jsx("li", { className: "cursor-pointer font-mono", children: "Our Solar System" }) }) });
}
function createRingWithPoints(innerRadius, outerRadius, numPoints) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const randomDist = Math.floor(Math.random() * (outerRadius - innerRadius + 1) + innerRadius);
    const angle = Math.PI * 2 * i / numPoints;
    const x = randomDist * Math.cos(angle);
    const y = randomDist * Math.sin(angle);
    let z = -Math.random() * 50;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}
const starpath = "app/assets/stars/galaxy/milky_way/cube_map/";
function meta({}) {
  return [{
    title: "Solar System"
  }, {
    name: "Home Page",
    content: "Welcome to our Solar System!"
  }];
}
const home = withComponentProps(function Home() {
  const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState();
  const [scene, setScene] = useState();
  useEffect(() => {
    const newRenderer = buildRender(setRenderer);
    const newCamera = buildCamera(setCamera);
    const newScene = startScene(setScene);
    generateCubeMap(newScene, starpath);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    const clock = new THREE.Clock();
    if (newRenderer && newCamera && newScene) {
      let animate = function() {
        requestAnimationFrame(animate);
        const curTime = clock.getElapsedTime();
        meshes.forEach((item, index) => {
          item.position.x = Math.sin(curTime * solarData[index].speed) * solarData[index].distance;
          item.position.z = Math.cos(curTime * solarData[index].speed) * solarData[index].distance;
          item.rotation.y += solarData[index].rotateSpeed;
        });
        newCamera.position.y = Math.sin(curTime * 0.02) * 1e3;
        newCamera.position.z = Math.sin(curTime * 0.02) * 1e3;
        newCamera.position.x = Math.cos(curTime * 0.02) * 1e3;
        newCamera.lookAt(cameraTarget);
        newRenderer == null ? void 0 : newRenderer.render(newScene, newCamera);
      };
      const meshes = solarData.map((item) => {
        var _a;
        const geo = createSimpleSphere(item.size);
        const mat = item.name === "Sun" ? createSunMat(item.texture) : createSimpleMat(item.texture);
        const mesh = createSimpleMesh(geo, mat, item.distance, newScene);
        if ((_a = item.moons) == null ? void 0 : _a.length) {
          item.moons.map((moon) => {
            const moonGeo = createSimpleSphere(moon.size);
            const moonMat = createSimpleMat(moon.texture);
            const moonMesh = createMoonMesh(moonGeo, moonMat, mesh);
            moonMesh.position.x = moon.distance;
            return moonMesh;
          });
        }
        if (item.ring) {
          const ringGeo = createRing(item.ring.innerRadius, item.ring.outerRadius);
          const ringMat2 = createRingMat(item.ring.texture);
          const ringMesh = createRingMesh(ringGeo, ringMat2, mesh);
          ringMesh.rotation.x = 45;
        }
        return mesh;
      });
      const asteroidPoints = createRingWithPoints(asteroidBelt.inner, asteroidBelt.outer, 2e3);
      const asteroidGeo = new THREE.BufferGeometry().setFromPoints(asteroidPoints);
      const ringMat = new THREE.PointsMaterial({
        color: 16777215,
        size: 0.2
      });
      const asteroidMesh = new THREE.Points(asteroidGeo, ringMat);
      asteroidMesh.rotation.x = Math.PI / 2;
      const asteroidOuterPoints = createRingWithPoints(asteroidBeltOuter.inner, asteroidBeltOuter.outer, 1e3);
      const asteroidOuterGeo = new THREE.BufferGeometry().setFromPoints(asteroidOuterPoints);
      const asteroidOuterMesh = new THREE.Points(asteroidOuterGeo, ringMat);
      asteroidOuterMesh.rotation.x = Math.PI / 2;
      const controls = new OrbitControls(newCamera, newRenderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.01;
      setupLighting(newScene);
      newScene.add(asteroidMesh);
      newScene.add(asteroidOuterMesh);
      animate();
    }
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [camera, renderer]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("canvas", {
      className: "three"
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/solar_worlds/assets/entry.client-DG4GZFT6.js", "imports": ["/solar_worlds/assets/chunk-W3FMU5Y5-DbWgRKTh.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/solar_worlds/assets/root-Bj_x2hmm.js", "imports": ["/solar_worlds/assets/chunk-W3FMU5Y5-DbWgRKTh.js", "/solar_worlds/assets/with-props-B3jp9oNr.js"], "css": ["/solar_worlds/assets/root-D0lL4rGi.css"] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/solar_worlds/assets/home-FFOZGDZb.js", "imports": ["/solar_worlds/assets/with-props-B3jp9oNr.js", "/solar_worlds/assets/chunk-W3FMU5Y5-DbWgRKTh.js"], "css": [] } }, "url": "/solar_worlds/assets/manifest-41b643fb.js", "version": "41b643fb" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/solar_worlds/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
