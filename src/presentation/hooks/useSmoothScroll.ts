import { useCallback, useEffect, useState } from "react";

export type SectionId =
  | "accueil"
  | "apropos"
  | "projets"
  | "competences"
  | "contact";

export const useSmoothScroll = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("accueil");

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Height of fixed header
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections: SectionId[] = [
      "accueil",
      "apropos",
      "projets",
      "competences",
      "contact",
    ];

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("accueil");
  }, []);

  // Get scroll progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return {
    activeSection,
    scrollToSection,
    scrollToTop,
    scrollProgress,
  };
};

export default useSmoothScroll;
