import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 130; // rayon du glow en px
const RISE = 0.2; // vitesse de montée (souris active)
const FADE_ACTIVE = 0.87; // atténuation par frame quand souris bouge
const FADE_IDLE = 0.94; // atténuation plus lente pendant l'extinction progressive
const IDLE_DELAY = 1500; // ms sans mouvement avant de commencer à éteindre
const IDLE_SPEED = 0.012; // vitesse de réduction du multiplicateur global par frame

const BLUE_R = 56,
  BLUE_G = 189,
  BLUE_B = 248;

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0,
      rows = 0;
    let bright: Float32Array = new Float32Array(0);
    let raf = 0;
    let mx = -9999,
      my = -9999;

    // Idle tracking
    let lastMoveTime = performance.now();
    let isIdle = false;
    // Multiplicateur global d'opacité : 1 = plein, 0 = invisible
    let globalAlpha = 1;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL) + 1;
      rows = Math.ceil(canvas.height / CELL) + 1;
      bright = new Float32Array(cols * rows);
    };
    setSize();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMoveTime = performance.now();
      isIdle = false;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      // On considère la sortie de fenêtre comme idle immédiat
      lastMoveTime = performance.now() - IDLE_DELAY;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setSize);

    const loop = () => {
      const now = performance.now();

      // — Déterminer si on est en mode idle —
      const timeSinceMove = now - lastMoveTime;
      if (!isIdle && timeSinceMove > IDLE_DELAY) {
        isIdle = true;
      }

      // — Mise à jour du multiplicateur global —
      if (isIdle) {
        // Extinction progressive
        globalAlpha = Math.max(0, globalAlpha - IDLE_SPEED);
      } else {
        // Réapparition instantanée dès que la souris bouge
        globalAlpha = Math.min(1, globalAlpha + 0.08);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Si complètement invisible, pas besoin de dessiner
      if (globalAlpha < 0.005) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const fade = isIdle ? FADE_IDLE : FADE_ACTIVE;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cx = c * CELL + CELL * 0.5;
          const cy = r * CELL + CELL * 0.5;
          const dist = Math.hypot(cx - mx, cy - my);
          const target = dist < RADIUS ? (1 - dist / RADIUS) ** 2 : 0;

          const idx = c * rows + r;
          bright[idx] =
            target > bright[idx]
              ? bright[idx] + (target - bright[idx]) * RISE
              : bright[idx] * fade;

          const b = bright[idx] * globalAlpha;
          if (b < 0.004) continue;

          const x = c * CELL,
            y = r * CELL;
          ctx.strokeStyle = `rgba(${BLUE_R},${BLUE_G},${BLUE_B},${b * 0.75})`;
          ctx.lineWidth = 0.8 + b * 0.9;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + CELL, y);
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + CELL);
          ctx.stroke();
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
