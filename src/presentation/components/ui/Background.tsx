import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSceneLoadingStore } from "@/presentation/store/useSceneLoadingStore";

// ─── Textures Terre (assets officiels du dépôt Three.js r160) ─────────────
const TEX_BASE =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/";

const EARTH_RADIUS = 70;
const Z_FAR = -440; // position lointaine (haut de page)
const Z_NEAR = 150; // position rapprochée (bas de page)

// Teinte de fond alignée sur la palette sombre déjà utilisée sur le site
const CLEAR_COLOR = 0x05111f;

// Filet de sécurité : si une texture ne charge jamais (réseau bloqué, CDN
// injoignable...), on débloque quand même l'affichage après ce délai.
const LOAD_SAFETY_TIMEOUT_MS = 15000;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const Background = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const setProgress = useSceneLoadingStore((state) => state.setProgress);
  const setLoaded = useSceneLoadingStore((state) => state.setLoaded);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      3000,
    );
    camera.position.set(0, 0, 260);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(CLEAR_COLOR, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    wrap.appendChild(renderer.domElement);

    // ── Étoiles ──────────────────────────────────────────────────────────
    function makeStarLayer(
      count: number,
      spread: number,
      size: number,
      color: number,
      opacity: number,
    ) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = spread * (0.3 + Math.random() * 0.7);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi);
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return pts;
    }

    const farStars = makeStarLayer(3200, 1400, 1.1, 0xffffff, 0.8);
    const nearStars = makeStarLayer(900, 600, 0.9, 0xcfe4ff, 0.5);

    // ── Lumières ─────────────────────────────────────────────────────────
    scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x0c0f1a, 0.3));
    scene.add(new THREE.AmbientLight(0x404860, 0.14));
    const sunDir = new THREE.DirectionalLight(0xfff2d6, 2.2);
    sunDir.position.set(90, 60, -650);
    scene.add(sunDir);

    // ── Terre (textures officielles Three.js, dérivées NASA Blue/Black Marble) ─
    // Le LoadingManager suit la progression des 4 textures et remonte un
    // pourcentage réel (itemsLoaded / itemsTotal) à l'écran de chargement.
    let safetyTimeout: number | undefined;
    const manager = new THREE.LoadingManager();
    manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      const percent =
        itemsTotal > 0 ? Math.round((itemsLoaded / itemsTotal) * 100) : 100;
      setProgress(percent);
    };
    manager.onLoad = () => {
      setProgress(100);
      setLoaded(true);
      if (safetyTimeout !== undefined) window.clearTimeout(safetyTimeout);
    };
    manager.onError = () => {
      // Une texture en échec ne doit pas bloquer indéfiniment l'affichage :
      // le rendu continue avec les textures disponibles.
    };
    // Filet de sécurité si onLoad ne se déclenche jamais (ex: CDN bloqué).
    safetyTimeout = window.setTimeout(() => {
      setProgress(100);
      setLoaded(true);
    }, LOAD_SAFETY_TIMEOUT_MS);

    const textureLoader = new THREE.TextureLoader(manager);
    const earthColorMap = textureLoader.load(TEX_BASE + "earth_atmos_2048.jpg");
    earthColorMap.colorSpace = THREE.SRGBColorSpace;
    const earthNormalMap = textureLoader.load(
      TEX_BASE + "earth_normal_2048.jpg",
    );
    const earthNightMap = textureLoader.load(
      TEX_BASE + "earth_lights_2048.png",
    );
    earthNightMap.colorSpace = THREE.SRGBColorSpace;
    const earthCloudsMap = textureLoader.load(
      TEX_BASE + "earth_clouds_1024.png",
    );

    const earthGroup = new THREE.Group();

    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthColorMap,
        normalMap: earthNormalMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        roughness: 0.85,
        metalness: 0.05,
        emissiveMap: earthNightMap,
        emissive: 0xffffff,
        emissiveIntensity: 1.4,
      }),
    );
    earthGroup.add(earthMesh);

    const cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.015, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthCloudsMap,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        roughness: 1,
      }),
    );
    earthGroup.add(cloudsMesh);

    const atmosMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.035, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x8ecbe8,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      }),
    );
    earthGroup.add(atmosMesh);

    earthGroup.position.set(0, 0, Z_FAR);
    scene.add(earthGroup);

    // ── Resize ───────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Progression du scroll sur toute la page ─────────────────────────
    function getScrollProgress() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const top = window.scrollY || doc.scrollTop;
      return Math.min(1, Math.max(0, top / max));
    }

    let progress = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      if (!prefersReducedMotion) {
        farStars.rotation.y += delta * 0.006;
        nearStars.rotation.y -= delta * 0.012;
        nearStars.rotation.x += delta * 0.003;

        earthMesh.rotation.y += delta * 0.045;
        cloudsMesh.rotation.y += delta * 0.02;
        atmosMesh.rotation.y += delta * 0.03;
      }

      // avance en douceur vers la progression réelle du scroll
      const target = getScrollProgress();
      progress += (target - progress) * 0.07;

      const zoomEase = easeInOutCubic(progress);
      earthGroup.position.z = THREE.MathUtils.lerp(Z_FAR, Z_NEAR, zoomEase);

      // décalage horizontal concentré en toute fin de scroll
      const shiftT = Math.pow(progress, 5);
      const distance = camera.position.z - earthGroup.position.z;
      const halfWidth =
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
        distance *
        camera.aspect;
      const xTarget = halfWidth * 0.62;
      earthGroup.position.x = THREE.MathUtils.lerp(0, xTarget, shiftT);

      renderer.render(scene, camera);
    };

    // Pause le rendu quand l'onglet est caché → économie CPU/GPU
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        clock.getDelta(); // évite un grand saut de temps au réveil
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (safetyTimeout !== undefined) window.clearTimeout(safetyTimeout);

      farStars.geometry.dispose();
      (farStars.material as THREE.Material).dispose();
      nearStars.geometry.dispose();
      (nearStars.material as THREE.Material).dispose();

      earthMesh.geometry.dispose();
      (earthMesh.material as THREE.Material).dispose();
      cloudsMesh.geometry.dispose();
      (cloudsMesh.material as THREE.Material).dispose();
      atmosMesh.geometry.dispose();
      (atmosMesh.material as THREE.Material).dispose();

      earthColorMap.dispose();
      earthNormalMap.dispose();
      earthNightMap.dispose();
      earthCloudsMap.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Vignette pour assurer la lisibilité du texte au-dessus */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
};

export default Background;
