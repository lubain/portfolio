import { useCallback, useMemo, useRef, useState } from "react";

const MAX_TILT_DEG = 8; // amplitude du basculement — reste discret, pas gadget
const PERSPECTIVE = 900;

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Carte "flottante" avec bascule 3D au survol (perspective + rotateX/rotateY)
 * et un reflet qui suit le curseur — cohérent avec la scène spatiale en fond.
 * Reprend les tokens visuels de SpotlightCard (bordure sky, fond translucide,
 * backdrop-blur) pour rester dans le même langage graphique.
 */
export const Card3D = ({ children, className = "" }: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const [transform, setTransform] = useState(
    `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`,
  );
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!prefersReducedMotion) {
          const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
          const rotateX = (0.5 - py) * MAX_TILT_DEG * 2;
          setTransform(
            `perspective(${PERSPECTIVE}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
          );
        }
        setGlow({ x: px * 100, y: py * 100, opacity: 1 });
      });
    },
    [prefersReducedMotion],
  );

  const resetCard = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setTransform(`perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`);
    setGlow((g) => ({ ...g, opacity: 0 }));
  }, []);

  const showGlow = useCallback(() => setGlow((g) => ({ ...g, opacity: 1 })), []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      onMouseEnter={showGlow}
      onFocus={showGlow}
      onBlur={resetCard}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: "transform 200ms ease-out, box-shadow 300ms ease-out",
      }}
      className={`relative overflow-hidden rounded-2xl border border-sky-200 dark:border-sky-800/40
                  bg-white/70 dark:bg-sky-950/30 backdrop-blur-sm will-change-transform
                  shadow-sm dark:shadow-[0_12px_30px_-15px_rgba(2,6,23,0.6)]
                  hover:border-sky-400/50 dark:hover:border-sky-500/40
                  hover:shadow-[0_25px_45px_-15px_rgba(56,189,248,0.25)]
                  dark:hover:shadow-[0_25px_45px_-15px_rgba(56,189,248,0.2)]
                  ${className}`}
    >
      {/* Reflet qui suit le curseur, comme une vitre éclairée par la scène 3D */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(500px circle at ${glow.x}% ${glow.y}%, rgba(56,189,248,0.14), transparent 45%)`,
        }}
      />
      {/* Liseré supérieur qui capte la lumière — accentue l'effet de profondeur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 dark:via-sky-400/40 to-transparent transition-opacity duration-300"
        style={{ opacity: glow.opacity }}
      />
      {children}
    </div>
  );
};
