import { useState, useEffect, useRef } from "react";
import { Terminal, Menu, X, Sun, Moon } from "lucide-react";
import Footer from "./components/ui/Footer";
import ContactSection from "./components/sections/ContactSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import AboutSection from "./components/sections/AboutSection";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";

// --- Composant Principal App ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("accueil");
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

  const menuItems = [
    { name: "Accueil", id: "accueil" },
    { name: "À Propos", id: "àpropos" },
    { name: "Compétences", id: "compétences" },
    { name: "Projets", id: "projets" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-300 font-sans selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300">
        {/* Background */}
        <Background />

        {/* Navbar */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <a
              href="#"
              className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 relative z-10"
            >
              <Terminal className="w-6 h-6 text-purple-600 dark:text-purple-500" />
              <span>
                Lub
                <span className="text-purple-600 dark:text-purple-500">.</span>
                ain
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  {item.name}
                  {/* Effet de surligne intelligent (rétrécit/élargit depuis le centre) */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-purple-600 dark:bg-purple-500 transition-all duration-500 ease-in-out ${
                      activeSection === item.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  ></span>
                </a>
              ))}

              <button
                ref={themeBtnRef}
                onClick={toggleTheme}
                className="relative p-2.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:scale-110 active:scale-90 transition-all group overflow-hidden"
              >
                {/* Effet visuel discret de Sharingan au survol */}
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-300"></div>
                {isDarkMode ? (
                  <Sun className="relative w-5 h-5" />
                ) : (
                  <Moon className="relative w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4 relative z-10">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white transition-all"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                className="p-2 text-slate-900 dark:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-all duration-300 overflow-hidden ${
              mobileMenuOpen
                ? "max-h-96 py-4"
                : "max-h-0 py-0 border-transparent"
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-slate-800 dark:text-slate-300"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          <HommeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
