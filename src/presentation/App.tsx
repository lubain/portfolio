import { lazy, Suspense } from "react";
import Footer from "./components/ui/Footer";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";
import Navbar from "./components/features/Navbar";
import { useNavbar } from "./hooks/useNavbar";
import DeferredSection from "./components/ui/DeferredSection";

const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const SkillsSection = lazy(() => import("./components/sections/SkillsSection"));
const ProjectsSection = lazy(
  () => import("./components/sections/ProjectsSection"),
);
const ContactSection = lazy(
  () => import("./components/sections/ContactSection"),
);

export default function App() {
  const { isDarkMode } = useNavbar();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div
        className="min-h-screen text-slate-800 dark:text-[#e0f2fe] font-sans
                   selection:bg-sky-400/30 selection:text-sky-900 dark:selection:text-sky-200
                   transition-colors duration-300"
        style={{ backgroundColor: isDarkMode ? "#05111f" : "#f0f9ff" }}
      >
        <Background />
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
