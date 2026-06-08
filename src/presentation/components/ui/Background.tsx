import { useEffect, useRef } from "react";

// ─── Paramètres de la grille ───────────────────────────────────────────────
const CELL = 44;
const RADIUS = 160; // rayon du glow souris (px)
const RISE = 0.18; // vitesse montée hover
const FADE = 0.88; // atténuation hover (souris active)
const IDLE_FADE = 0.95; // atténuation hover (idle)
const IDLE_DELAY = 1800; // ms avant extinction automatique
const IDLE_SPD = 0.01; // vitesse extinction globale par frame

// ─── Paramètres de la vague 3D ────────────────────────────────────────────
const MAX_Z = 36; // élévation max des carreaux (px caméra)
const Z_RISE = 0.22; // vitesse montée élévation
const Z_FADE = 0.91; // vitesse descente élévation
const WAVE_SPEED = 0.28; // vitesse de propagation du front (cellules/frame)
const WAVE_RADIUS = 4.5; // largeur du front de vague (cellules)
const WAVE_FADE = 0.93; // amortissement amplitude avec le temps

const FOV = 520; // distance focale pour la projection perspective

// ─── Couleur bleue ────────────────────────────────────────────────────────
const BR = 56,
  BG = 189,
  BB = 248;

// ─── Types ─────────────────────────────────────────────────────────────────
interface Wave {
  x: number;
  y: number;
  t: number;
  alive: boolean;
}

interface Cell {
  col: number;
  row: number;
  idx: number;
  z: number;
}

interface Projected {
  px: number;
  py: number;
  scale: number;
}

// ─── Projection perspective ───────────────────────────────────────────────
function project(
  cx: number,
  cy: number,
  z: number,
  w: number,
  h: number,
): Projected {
  const scale = FOV / (FOV + z);
  const px = (cx - w / 2) * scale + w / 2;
  const py = (cy - h / 2) * scale + h / 2;
  return { px, py, scale };
}

// ─── Composant ────────────────────────────────────────────────────────────
const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0,
      rows = 0;
    let bright = new Float32Array(0);
    let zElev = new Float32Array(0);
    let waves: Wave[] = [];
    let raf = 0;

    let mx = -9999,
      my = -9999;
    let lastMove = performance.now();
    let isIdle = false;
    let gAlpha = 1;

    // ── Redimensionnement ───────────────────────────────────────────────
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL) + 2;
      rows = Math.ceil(canvas.height / CELL) + 2;
      bright = new Float32Array(cols * rows);
      zElev = new Float32Array(cols * rows);
    };
    setSize();

    // ── Événements souris ───────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
      isIdle = false;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      lastMove = performance.now() - IDLE_DELAY;
    };

    // ── Événement clic → réveil idle + nouvelle vague ──────────────────
    const onClick = (e: MouseEvent) => {
      isIdle = false;
      lastMove = performance.now();
      waves.push({ x: e.clientX, y: e.clientY, t: 0, alive: true });
    };

    // ── Événement tactile → réveil idle + nouvelle vague ───────────────
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      isIdle = false;
      lastMove = performance.now();
      const touch = e.touches[0];
      waves.push({ x: touch.clientX, y: touch.clientY, t: 0, alive: true });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setSize);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch, { passive: false });

    // ── Boucle d'animation ──────────────────────────────────────────────
    const loop = () => {
      const now = performance.now();

      // Idle
      if (!isIdle && now - lastMove > IDLE_DELAY) isIdle = true;
      gAlpha = isIdle
        ? Math.max(0, gAlpha - IDLE_SPD)
        : Math.min(1, gAlpha + 0.09);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Avancer les vagues, éliminer les mortes
      waves = waves.filter((w) => w.alive);
      waves.forEach((w) => {
        w.t += WAVE_SPEED;
        if (w.t > WAVE_RADIUS + cols + rows) w.alive = false;
      });

      const fade = isIdle ? IDLE_FADE : FADE;

      // ── Mise à jour des états par cellule ────────────────────────────
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const cx = col * CELL + CELL * 0.5;
          const cy = row * CELL + CELL * 0.5;
          const dist = Math.hypot(cx - mx, cy - my);
          const hov = dist < RADIUS ? (1 - dist / RADIUS) ** 2 : 0;
          const idx = col * rows + row;

          bright[idx] =
            hov > bright[idx]
              ? bright[idx] + (hov - bright[idx]) * RISE
              : bright[idx] * fade;

          // Calcul de l'élévation cible (front de vague le plus fort)
          let zTarget = 0;
          waves.forEach((w) => {
            const wd = Math.hypot(cx - w.x, cy - w.y) / CELL;
            const diff = Math.abs(wd - w.t);
            if (diff < WAVE_RADIUS) {
              const power = (1 - diff / WAVE_RADIUS) ** 2;
              const waveFade = Math.pow(WAVE_FADE, w.t);
              zTarget = Math.max(zTarget, power * MAX_Z * waveFade);
            }
          });

          zElev[idx] =
            zTarget > zElev[idx]
              ? zElev[idx] + (zTarget - zElev[idx]) * Z_RISE
              : zElev[idx] * Z_FADE;
        }
      }

      // ── Tri z-order : dessiner les carreaux bas en premier ───────────
      const cells: Cell[] = [];
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          cells.push({
            col,
            row,
            idx: col * rows + row,
            z: zElev[col * rows + row],
          });
        }
      }
      cells.sort((a, b) => a.z - b.z);

      // ── Rendu ────────────────────────────────────────────────────────
      for (const { col, row, idx, z } of cells) {
        const b = bright[idx] * gAlpha;
        const hasZ = z > 0.3;

        if (b < 0.004 && !hasZ) continue;

        const x0 = col * CELL,
          y0 = row * CELL;
        const x1 = x0 + CELL,
          y1 = y0 + CELL;

        if (!hasZ) {
          // ── Carreau plat (pas de vague) ─────────────────────────────
          ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(b * 0.75 * gAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.8 + b * 0.9;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y0);
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0, y1);
          ctx.stroke();
        } else {
          // ── Carreau soulevé en 3D ───────────────────────────────────
          const W = canvas.width,
            H = canvas.height;

          const pts: Projected[] = [
            project(x0, y0, z, W, H),
            project(x1, y0, z, W, H),
            project(x1, y1, z, W, H),
            project(x0, y1, z, W, H),
          ];
          const pts0: Projected[] = [
            project(x0, y0, 0, W, H),
            project(x1, y0, 0, W, H),
            project(x1, y1, 0, W, H),
            project(x0, y1, 0, W, H),
          ];

          const lift = z / MAX_Z;
          const a = Math.min(1, 0.18 + lift * 0.82);

          // Face supérieure (remplie, légère)
          ctx.fillStyle = `rgba(${BR},${BG},${BB},${(lift * 0.13).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[1].px, pts[1].py);
          ctx.lineTo(pts[2].px, pts[2].py);
          ctx.lineTo(pts[3].px, pts[3].py);
          ctx.closePath();
          ctx.fill();

          // Bordures de la face supérieure
          ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(a * 0.85).toFixed(3)})`;
          ctx.lineWidth = 0.8 + lift * 1.8;
          ctx.beginPath();
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[1].px, pts[1].py);
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[3].px, pts[3].py);
          ctx.stroke();

          // Arêtes latérales (haut → sol)
          const edges: [number, number][] = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
          ];
          edges.forEach(([i]) => {
            ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(lift * 0.35).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].px, pts[i].py);
            ctx.lineTo(pts0[i].px, pts0[i].py);
            ctx.stroke();
          });

          // Projection au sol (ombre légère)
          if (b > 0.02) {
            ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(b * 0.4).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts0[0].px, pts0[0].py);
            ctx.lineTo(pts0[1].px, pts0[1].py);
            ctx.moveTo(pts0[0].px, pts0[0].py);
            ctx.lineTo(pts0[3].px, pts0[3].py);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Blob décoratif haut-gauche */}
      <div
        className="blob w-96 h-96 rounded-full top-[-10%] left-[-10%]"
        style={{ background: "#38bdf8" }}
      />
      {/* Blob décoratif bas-droite */}
      <div
        className="blob w-96 h-96 rounded-full bottom-[-10%] right-[-10%]"
        style={{ background: "#818cf8", animationDelay: "-5s" }}
      />
      {/* Canvas principal — pointer-events actifs pour capter clics/touch */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "auto",
          cursor: "crosshair",
        }}
      />
    </div>
  );
};

export default Background;
