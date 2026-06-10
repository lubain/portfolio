import { useEffect, useRef } from "react";

// ─── Paramètres de la grille ───────────────────────────────────────────────
const CELL = 44;
const RADIUS = 160;
const RISE = 0.18;
const FADE = 0.88;
const IDLE_FADE = 0.95;
const IDLE_DELAY = 1800;
const IDLE_SPD = 0.01;

// ─── Paramètres de la vague 3D ────────────────────────────────────────────
const MAX_Z = 36;
const Z_RISE = 0.22;
const Z_FADE = 0.91;
const WAVE_SPEED = 0.28;
const WAVE_RADIUS = 4.5;
const WAVE_FADE = 0.93;

const FOV = 520;

const BR = 56,
  BG = 189,
  BB = 248;

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

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL) + 2;
      rows = Math.ceil(canvas.height / CELL) + 2;
      bright = new Float32Array(cols * rows);
      zElev = new Float32Array(cols * rows);
    };
    setSize();

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

    // Vague déclenchée uniquement par le bouton switch mode — toujours depuis le centre
    const onCenterWave = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      isIdle = false;
      lastMove = performance.now();
      waves.push({ x, y, t: 0, alive: true });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setSize);
    window.addEventListener("center-wave", onCenterWave);

    const loop = () => {
      const now = performance.now();

      if (!isIdle && now - lastMove > IDLE_DELAY) isIdle = true;
      gAlpha = isIdle
        ? Math.max(0, gAlpha - IDLE_SPD)
        : Math.min(1, gAlpha + 0.09);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves = waves.filter((w) => w.alive);
      waves.forEach((w) => {
        w.t += WAVE_SPEED;
        if (w.t > WAVE_RADIUS + cols + rows) w.alive = false;
      });

      const fade = isIdle ? IDLE_FADE : FADE;

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

      const cells: Cell[] = [];
      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows; row++)
          cells.push({
            col,
            row,
            idx: col * rows + row,
            z: zElev[col * rows + row],
          });
      cells.sort((a, b) => a.z - b.z);

      for (const { col, row, idx, z } of cells) {
        const cx = col * CELL + CELL * 0.5;
        const cy = row * CELL + CELL * 0.5;
        const b = bright[idx] * gAlpha;
        const hasZ = z > 0.3;
        if (b < 0.004 && !hasZ) continue;

        const x0 = col * CELL,
          y0 = row * CELL;
        const x1 = x0 + CELL,
          y1 = y0 + CELL;

        if (!hasZ) {
          ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(b * 0.75 * gAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.8 + b * 0.9;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y0);
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0, y1);
          ctx.stroke();
        } else {
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

          ctx.fillStyle = `rgba(${BR},${BG},${BB},${(lift * 0.13).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[1].px, pts[1].py);
          ctx.lineTo(pts[2].px, pts[2].py);
          ctx.lineTo(pts[3].px, pts[3].py);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(a * 0.85).toFixed(3)})`;
          ctx.lineWidth = 0.8 + lift * 1.8;
          ctx.beginPath();
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[1].px, pts[1].py);
          ctx.moveTo(pts[0].px, pts[0].py);
          ctx.lineTo(pts[3].px, pts[3].py);
          ctx.stroke();

          ([0, 1, 2, 3] as const).forEach((i) => {
            ctx.strokeStyle = `rgba(${BR},${BG},${BB},${(lift * 0.35).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].px, pts[i].py);
            ctx.lineTo(pts0[i].px, pts0[i].py);
            ctx.stroke();
          });

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
      window.removeEventListener("center-wave", onCenterWave);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="blob w-96 h-96 rounded-full top-[-10%] left-[-10%]"
        style={{ background: "#38bdf8" }}
      />
      <div
        className="blob w-96 h-96 rounded-full bottom-[-10%] right-[-10%]"
        style={{ background: "#818cf8", animationDelay: "-5s" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Background;
