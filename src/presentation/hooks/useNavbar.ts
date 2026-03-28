import { useEffect, useRef } from "react";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";

export const useNavbar = () => {
  const isScrolled = useNavbarStore((state) => state.isScrolled);
  const mobileMenuOpen = useNavbarStore((state) => state.mobileMenuOpen);
  const isDarkMode = useNavbarStore((state) => state.isDarkMode);
  const activeSection = useNavbarStore((state) => state.activeSection);
  const setMobileMenuOpen = useNavbarStore((state) => state.setMobileMenuOpen);
  const setIsScrolled = useNavbarStore((state) => state.setIsScrolled);
  const setIsDarkMode = useNavbarStore((state) => state.setIsDarkMode);
  const setActiveSection = useNavbarStore((state) => state.setActiveSection);

  const themeBtnRef = useRef<HTMLButtonElement>(null);

  // Animation Kamui (Obito) - Déclenchée précisément au clic
  const toggleTheme = async () => {
    // Si le navigateur ne supporte pas l'API View Transitions, on switch classiquement
    if (!themeBtnRef.current || !document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    const rect = themeBtnRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Lorsqu'on passe au mode dark (!isDarkMode), on veut que l'ancienne page (claire)
    // soit au-dessus pour la voir être "aspirée" dans le bouton.
    if (!isDarkMode) {
      document.documentElement.classList.add("kamui-to-dark");
    }

    // Déclenchement de la transition
    const transition = document.startViewTransition(() => {
      setIsDarkMode(!isDarkMode);
    });

    // Synchronisation de l'animation avec le rendu de la nouvelle vue
    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const clipPathIn = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ];

      const clipPathOut = [
        `circle(${radius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
      ];

      // Expiration (vers Light) : tourne dans un sens / Aspiration (vers Dark) : tourne dans l'autre
      document.documentElement.animate(
        {
          clipPath: isDarkMode ? clipPathIn : clipPathOut,
          transform: isDarkMode
            ? [`rotate(720deg) scale(0)`, `rotate(0deg) scale(1)`] // Expiration
            : [`rotate(0deg) scale(1)`, `rotate(720deg) scale(0)`], // Aspiration
          opacity: isDarkMode ? [0, 1] : [1, 0],
        },
        {
          duration: isDarkMode ? 800 : 1200,
          easing: "cubic-bezier(0.645, 0.045, 0.355, 1)", // Courbe de tension pour un effet "snap"
          fill: "forwards",
          pseudoElement: isDarkMode
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("kamui-to-dark");
    });
  };

  // Gestion du scroll (navbar et détection de section)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Détecteur de section active
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Détecte quand la section est au centre
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sections = [
      "accueil",
      "àpropos",
      "compétences",
      "projets",
      "contact",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return {
    isDarkMode,
    isScrolled,
    activeSection,
    themeBtnRef,
    mobileMenuOpen,
    setMobileMenuOpen,
    setIsDarkMode,
    toggleTheme,
  };
};
