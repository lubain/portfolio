import { useEffect, useState } from "react";
import { useSceneLoadingStore } from "@/presentation/store/useSceneLoadingStore";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { loadingScreenTranslations } from "@/presentation/shared/constantes/translations";

const FADE_OUT_MS = 500;

const LoadingScreen = () => {
  const progress = useSceneLoadingStore((state) => state.progress);
  const isLoaded = useSceneLoadingStore((state) => state.isLoaded);
  const language = useNavbarStore((state) => state.language);
  const copy = loadingScreenTranslations[language];

  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    const timeout = window.setTimeout(() => setMounted(false), FADE_OUT_MS);
    return () => window.clearTimeout(timeout);
  }, [isLoaded]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${copy.caption} : ${progress}%`}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#05111f] transition-opacity ease-out ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_OUT_MS}ms` }}
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
        <picture>
          <source srcSet="/lf.webp" type="image/webp" />
          <img
            src="/lf.jpg"
            alt="Logo de Lubain Fadhel"
            width={64}
            height={64}
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      <p
        className="text-4xl md:text-6xl font-bold text-white tabular-nums"
        aria-hidden="true"
      >
        {progress}%
      </p>

      <div className="w-48 md:w-56 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-sky-400 rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs tracking-wide text-sky-200/60" aria-hidden="true">
        {copy.caption}…
      </p>
    </div>
  );
};

export default LoadingScreen;
