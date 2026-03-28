import React, { useState, useEffect, useRef } from "react";
import {
  Server,
  Database,
  Layout,
  Terminal,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Braces,
  Sun,
  Moon,
} from "lucide-react";
import profile from "@/assets/profile.jpg";

// --- Types ---
type ProjectCategory =
  | "Tous"
  | "App Web"
  | "Backend & API"
  | "IA"
  | "Jeux Vidéo";

interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  techs: string[];
  image: string;
  link: string;
  github: string;
}

// --- Données ---
const PROJECTS: Project[] = [
  {
    title: "NeuroSphere AI",
    category: "IA",
    description:
      "Plateforme d'analyse prédictive utilisant des modèles de Deep Learning NLP pour l'analyse de sentiment en temps réel.",
    techs: ["React", "TypeScript", "Node.js", "Python (API)"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
  {
    title: "OmniStore E-Commerce",
    category: "App Web",
    description:
      "Application e-commerce headless avec gestion d'état complexe, panier persistant et paiements intégrés via Stripe.",
    techs: ["Next.js", "Tailwind CSS", "Redux", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
  {
    title: "CoreGateway Microservices",
    category: "Backend & API",
    description:
      "Architecture orientée microservices gérant l'authentification OAuth2, le rate-limiting et le routage des requêtes haute performance.",
    techs: ["NestJS", "GraphQL", "Redis", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
  {
    title: "Neon Drift Racer",
    category: "Jeux Vidéo",
    description:
      "Jeu de course rétro-futuriste jouable sur navigateur, avec un moteur physique maison et multijoueur via WebSockets.",
    techs: ["Three.js", "Socket.io", "Express", "WebGL"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
  {
    title: "Nexus Dashboard",
    category: "App Web",
    description:
      "Interface d'administration B2B offrant des visualisations de données complexes et une gestion des rôles utilisateurs avancée.",
    techs: ["Vue.js", "Tailwind", "D3.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
  {
    title: "Sync AI Assistant",
    category: "IA",
    description:
      "Bot conversationnel intelligent intégré aux workflows Slack et Discord pour automatiser les tâches DevOps.",
    techs: ["TypeScript", "OpenAI API", "AWS Lambda"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#",
  },
];

// --- Composants UI Avancés ---

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return { ref, isVisible };
};

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) => {
  const { ref, isVisible } = useScrollReveal();

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-12";
      case "left":
        return "-translate-x-12";
      case "right":
        return "translate-x-12";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 dark:hover:border-white/20 shadow-sm dark:shadow-none ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- Composant Principal App ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("Tous");
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

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "Tous" || p.category === activeFilter
  );
  const categories: ProjectCategory[] = [
    "Tous",
    "App Web",
    "Backend & API",
    "IA",
    "Jeux Vidéo",
  ];

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
        {/* Styles Globaux */}
        <style>{`
          html { scroll-behavior: smooth; }
          /* Désactivation des animations par défaut du navigateur pour laisser place au Kamui */
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }

          /* Inverser l'ordre d'affichage pour l'aspiration (lorsqu'on passe au Dark mode) */
          .kamui-to-dark::view-transition-old(root) {
            z-index: 2;
          }
          .kamui-to-dark::view-transition-new(root) {
            z-index: 1;
          }
          .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(to right, #8b5cf6, #3b82f6, #10b981);
          }
          .blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.4;
            animation: float 10s infinite ease-in-out alternate;
          }
          @keyframes float {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(30px, -50px) scale(1.1); }
            100% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="blob bg-purple-600 w-96 h-96 rounded-full top-[-10%] left-[-10%]"></div>
          <div
            className="blob bg-blue-600 w-96 h-96 rounded-full bottom-[-10%] right-[-10%]"
            style={{ animationDelay: "-5s" }}
          ></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-20 mix-blend-overlay"></div>
        </div>

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
          <section
            id="accueil"
            className="min-h-screen flex items-center justify-center pt-20 px-6"
          >
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-sm shadow-sm dark:shadow-none">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Disponible pour de nouvelles opportunités
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                  Architecte du <br className="hidden md:block" />
                  <span className="text-gradient">Web Moderne.</span>
                </h1>
              </FadeIn>

              <FadeIn delay={300}>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Ingénieur Full-Stack JS spécialisé dans la création
                  d'applications web scalables, d'intelligences artificielles
                  intégrées et d'expériences interactives premium.
                </p>
              </FadeIn>

              <FadeIn delay={450}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#projets"
                    className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2 shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]"
                  >
                    Voir mes projets <ChevronRight className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2"
                  >
                    <Github className="w-5 h-5" /> Mon GitHub
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          <section id="àpropos" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-purple-500"></span>À Propos
                  de moi
                </h2>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeIn direction="left" delay={150}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900">
                      <img
                        src={profile}
                        alt="Développeur au travail"
                        className="w-full h-full object-cover opacity-90 dark:opacity-80 mix-blend-normal dark:mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#030712] via-transparent to-transparent"></div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction="right" delay={300}>
                  <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
                    <p>
                      Passionné par le code depuis mon plus jeune âge, j'ai
                      transformé cette passion en expertise au fil des{" "}
                      <span className="text-slate-900 dark:text-white font-semibold">
                        5 dernières années
                      </span>
                      . Je conçoit des architectures logicielles robustes et des
                      interfaces utilisateur pixel-perfect.
                    </p>
                    <p>
                      Ma philosophie de développement repose sur trois piliers :{" "}
                      <span className="text-purple-600 dark:text-purple-400">
                        Performance
                      </span>
                      ,{" "}
                      <span className="text-blue-600 dark:text-blue-400">
                        Maintenabilité
                      </span>{" "}
                      et{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Expérience Utilisateur
                      </span>
                      . Je ne me contente pas de coder des fonctionnalités, je
                      résous des problèmes complexes.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                          +50
                        </div>
                        <div className="text-sm">Projets délivrés</div>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                          5 ans
                        </div>
                        <div className="text-sm">D'expérience Full-Stack</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <section
            id="compétences"
            className="py-24 px-6 bg-slate-100/50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    Arsenal Technologique
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Une maîtrise complète de l'écosystème JavaScript/TypeScript,
                    du navigateur jusqu'à l'infrastructure cloud.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Frontend",
                    icon: (
                      <Layout className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                    ),
                    skills: [
                      "React",
                      "TypeScript",
                      "Tailwind CSS",
                      "Framer Motion",
                    ],
                  },
                  {
                    title: "Backend",
                    icon: (
                      <Server className="w-8 h-8 text-green-500 dark:text-green-400" />
                    ),
                    skills: ["Node.js", "Express", "WebSockets"],
                  },
                  {
                    title: "Base de données",
                    icon: (
                      <Database className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                    ),
                    skills: ["PostgreSQL", "MongoDB"],
                  },
                  {
                    title: "DevOps & Outils",
                    icon: (
                      <Terminal className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                    ),
                    skills: [
                      "Docker",
                      "AWS / Vercel",
                      "CI/CD (Actions)",
                      "Git / GitHub",
                    ],
                  },
                ].map((category, idx) => (
                  <FadeIn key={category.title} delay={idx * 150}>
                    <SpotlightCard className="p-8 h-full">
                      <div className="bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                          >
                            <Braces className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section id="projets" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 flex items-center justify-between">
                  <div>
                    <span className="w-12 h-[2px] bg-blue-500 inline-block align-middle mr-4"></span>
                    Travaux Récents
                  </div>
                </h2>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto hide-scrollbar pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        activeFilter === cat
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, idx) => (
                  <FadeIn key={project.title} delay={idx * 100}>
                    <SpotlightCard className="group h-full flex flex-col">
                      <div className="relative overflow-hidden aspect-video">
                        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/20 group-hover:bg-transparent transition duration-300 z-10"></div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-black/50 backdrop-blur-md text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-white/20 shadow-sm">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techs.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200 dark:border-white/10">
                          <a
                            href={project.github}
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" /> Code
                          </a>
                          <a
                            href={project.link}
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto"
                          >
                            Live Demo <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </SpotlightCard>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-100 dark:to-[#0a0f1d] transition-colors duration-300"
          >
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                  <div className="text-center mb-10 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                      Prêt à collaborer ?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Que ce soit pour un projet freelance, une offre d'emploi
                      ou simplement pour échanger sur la tech.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-5 gap-12 relative z-10">
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                          Informations
                        </h4>
                        <div className="space-y-4">
                          <a
                            href="mailto:hello@example.com"
                            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                              <Mail className="w-5 h-5" />
                            </div>
                            hello@dev-js.com
                          </a>
                          <a
                            href="#"
                            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                              <Globe className="w-5 h-5" />
                            </div>
                            Paris, France (Remote)
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                          Réseaux
                        </h4>
                        <div className="flex gap-4">
                          <a
                            href="#"
                            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                          <a
                            href="#"
                            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white hover:border-[#0077b5]/50 hover:text-[#0077b5] dark:hover:text-[#0077b5]"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <form
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                              Nom
                            </label>
                            <input
                              type="text"
                              className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                              Email
                            </label>
                            <input
                              type="email"
                              className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                            placeholder="Parlez-moi de votre idée..."
                          ></textarea>
                        </div>
                        <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] active:scale-[0.98]">
                          Envoyer le message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </main>

        <footer className="py-8 border-t border-slate-200 dark:border-white/5 text-center relative z-10 transition-colors duration-300">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Développé avec{" "}
            <span className="text-purple-600 dark:text-purple-500">React</span>{" "}
            & <span className="text-blue-600 dark:text-blue-500">Tailwind</span>
            . Tous droits réservés.
          </p>
        </footer>
      </div>
    </div>
  );
}
