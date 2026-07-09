import { lazy, Suspense } from "react";
import Footer from "./components/ui/Footer";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";
import Navbar from "./components/features/Navbar";
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
  return (
    <div className="dark">
      <div
        className="min-h-screen text-[#e0f2fe] font-sans
                   selection:bg-sky-400/30 selection:text-sky-200"
      >
        <DeferredSection>
          <Suspense fallback={<div className="py-24 px-6" />}>
            <Background />
            <Navbar />
            <main className="relative z-10">
              <HommeSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </main>
            <Footer />
          </Suspense>
        </DeferredSection>
      </div>
    </div>
  );
}
