import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 130;
const FADE = 0.87;
const RISE = 0.2;
// Arctic Frost — cyan #38bdf8
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
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setSize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
              : bright[idx] * FADE;
          const b = bright[idx];
          if (b < 0.004) continue;
          const x = c * CELL,
            y = r * CELL;
          const alpha = b * 0.75;
          ctx.strokeStyle = `rgba(${BLUE_R},${BLUE_G},${BLUE_B},${alpha})`;
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
      {/* Blob cyan top-left */}
      <div
        className="blob w-96 h-96 rounded-full top-[-10%] left-[-10%]"
        style={{ background: "#38bdf8" }}
      />
      {/* Blob indigo bottom-right */}
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
