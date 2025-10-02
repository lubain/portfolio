// App.tsx
import { useState, useMemo, JSX, useEffect } from "react";
import Header from "./components/ui/Header";
import HeroSection from "./components/ui/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import Footer from "./components/ui/Footer";
import ParticleBackground from "./components/ui/ParticleBackground";
import useSmoothScroll, { SectionId } from "./hooks/useSmoothScroll";
import SkillsSection from "./components/sections/SkillsSection";
import { projets } from "./shared/constantes/projets";
import ContactSection from "./components/sections/ContactSection";
import { Category } from "./shared/types/Category";

export interface Competence {
  nom: string;
  niveau: number;
  icone: JSX.Element;
}

export interface Temoignage {
  id: number;
  nom: string;
  poste: string;
  message: string;
  note: number;
}

const App = () => {
  const [activeSection, setActiveSection] = useState("accueil");
  const [activeCategory, setActiveCategory] = useState<Category>("tous");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const { scrollToSection, activeSection: currentSection } = useSmoothScroll();

  // Memoized filtered projects
  const filteredProjets = useMemo(() => {
    return activeCategory === "tous"
      ? projets
      : projets.filter((p) => p.categorie === activeCategory);
  }, [activeCategory, projets]);

  const handleScrollToSection = (sectionId: SectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  // Override activeSection with the one from useSmoothScroll
  useEffect(() => {
    setActiveSection(currentSection);
  }, [currentSection]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : ""
      } min-h-screen bg-background text-foreground`}
    >
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        activeSection={activeSection}
        setIsMenuOpen={setIsMenuOpen}
        toggleDarkMode={toggleDarkMode}
        handleScrollToSection={handleScrollToSection}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero */}
      <HeroSection handleScrollToSection={handleScrollToSection} />

      {/* About */}
      <AboutSection />

      {/* Projects */}
      <ProjectsSection
        projets={filteredProjets}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/*  */}
      <SkillsSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
