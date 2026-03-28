import { lazy, Suspense } from "react";
import Footer from "./components/ui/Footer";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";
import Navbar from "./components/features/Navbar";
import { useNavbar } from "./hooks/useNavbar";
import DeferredSection from "./components/ui/DeferredSection";

const AboutSection = lazy(
  () => import("./components/sections/AboutSection")
);
const SkillsSection = lazy(
  () => import("./components/sections/SkillsSection")
);
const ProjectsSection = lazy(
  () => import("./components/sections/ProjectsSection")
);
const ContactSection = lazy(
  () => import("./components/sections/ContactSection")
);

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

          <DeferredSection>
            <Suspense fallback={<div className="py-24 px-6" />}>
              <AboutSection />
            </Suspense>
          </DeferredSection>

          <DeferredSection>
            <Suspense fallback={<div className="py-24 px-6" />}>
              <SkillsSection />
            </Suspense>
          </DeferredSection>

          <DeferredSection>
            <Suspense fallback={<div className="py-24 px-6" />}>
              <ProjectsSection />
            </Suspense>
          </DeferredSection>

          <DeferredSection>
            <Suspense fallback={<div className="py-24 px-6" />}>
              <ContactSection />
            </Suspense>
          </DeferredSection>
        </main>

        <Footer />
      </div>
    </div>
  );
}
