import { useEffect } from "react";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";

export const useNavbar = () => {
  const isScrolled = useNavbarStore((state) => state.isScrolled);
  const mobileMenuOpen = useNavbarStore((state) => state.mobileMenuOpen);
  const activeSection = useNavbarStore((state) => state.activeSection);
  const language = useNavbarStore((state) => state.language);
  const setMobileMenuOpen = useNavbarStore((state) => state.setMobileMenuOpen);
  const setIsScrolled = useNavbarStore((state) => state.setIsScrolled);
  const setActiveSection = useNavbarStore((state) => state.setActiveSection);
  const setLanguage = useNavbarStore((state) => state.setLanguage);

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
    isScrolled,
    activeSection,
    language,
    mobileMenuOpen,
    setMobileMenuOpen,
    setLanguage,
  };
};
