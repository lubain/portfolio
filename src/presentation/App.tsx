import Footer from "./components/ui/Footer";
import ContactSection from "./components/sections/ContactSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import AboutSection from "./components/sections/AboutSection";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";
import Navbar from "./components/features/Navbar";
import { useNavbar } from "./hooks/useNavbar";

export default function App() {
  const { isDarkMode } = useNavbar();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-300 font-sans selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300">
        {/* Background */}
        <Background />

        {/* Navbar */}
        <Navbar />

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
