import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";

// ── Paramètres synchronisés avec Background.tsx ───────────────────────────
const WAVE_SPEED = 0.28; // cellules/frame
const CELL = 44; // px/cellule
const FPS = 60; // frames/sec assumées

export const useNavbar = () => {
  const isScrolled = useNavbarStore((state) => state.isScrolled);
  const mobileMenuOpen = useNavbarStore((state) => state.mobileMenuOpen);
  const isDarkMode = useNavbarStore((state) => state.isDarkMode);
  const activeSection = useNavbarStore((state) => state.activeSection);
  const language = useNavbarStore((state) => state.language);
  const setMobileMenuOpen = useNavbarStore((state) => state.setMobileMenuOpen);
  const setIsScrolled = useNavbarStore((state) => state.setIsScrolled);
  const setIsDarkMode = useNavbarStore((state) => state.setIsDarkMode);
  const setActiveSection = useNavbarStore((state) => state.setActiveSection);
  const setLanguage = useNavbarStore((state) => state.setLanguage);

  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const transitingRef = useRef(false);

  const toggleTheme = async () => {
    if (transitingRef.current) return;
    transitingRef.current = true;

    // 1. Déclencher la vague canvas immédiatement depuis le centre
    window.dispatchEvent(new CustomEvent("center-wave"));

    // 2. Calculer le délai = temps pour que le front atteigne le coin le plus éloigné
    //    Depuis le centre, distance max = demi-diagonale en cellules
    const halfDiagCells = Math.hypot(
      window.innerWidth / CELL / 2,
      window.innerHeight / CELL / 2,
    );
    // Délai (ms) = cellules / (cellules/frame) / fps * 1000
    const waveDelay = (halfDiagCells / WAVE_SPEED / FPS) * 1000;

    // Durée de la View Transition = même durée que la descente de la vague
    const transitionDuration = waveDelay * 0.9;

    // 3. Attendre que la vague soit au pic (a atteint le bord de l'écran)
    await new Promise<void>((resolve) => setTimeout(resolve, waveDelay));

    // Fallback sans View Transition API (Firefox, anciens navigateurs)
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      transitingRef.current = false;
      return;
    }

    // 4. Lancer la View Transition — le thème bascule de façon synchrone
    await document.startViewTransition(() => {
      flushSync(() => setIsDarkMode(!isDarkMode));
    }).ready;

    // 5. ClipPath part de 0 et s'étend — même rythme que la vague se referme
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: transitionDuration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );

    setTimeout(() => {
      transitingRef.current = false;
    }, transitionDuration + 50);
  };

  // ── Scroll & section observer ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    const observedIds = new Set<string>();
    const scanSections = () => {
      document.querySelectorAll<HTMLElement>("section[id]").forEach((el) => {
        if (!el.id || observedIds.has(el.id)) return;
        observedIds.add(el.id);
        observer.observe(el);
      });
    };
    scanSections();

    const mutation = new MutationObserver(scanSections);
    mutation.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    isDarkMode,
    isScrolled,
    activeSection,
    language,
    themeBtnRef,
    mobileMenuOpen,
    setMobileMenuOpen,
    setIsDarkMode,
    setLanguage,
    toggleTheme,
  };
};
