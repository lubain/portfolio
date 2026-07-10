import { lazy, Suspense } from "react";
import Footer from "./components/ui/Footer";
import HommeSection from "./components/sections/HommeSection";
import Background from "./components/ui/Background";
import LoadingScreen from "./components/ui/LoadingScreen";
import Navbar from "./components/features/Navbar";
import DeferredSection from "./components/ui/DeferredSection";
import { useSceneLoadingStore } from "./store/useSceneLoadingStore";

const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const SkillsSection = lazy(() => import("./components/sections/SkillsSection"));
const ProjectsSection = lazy(
  () => import("./components/sections/ProjectsSection"),
);
const ContactSection = lazy(
  () => import("./components/sections/ContactSection"),
);

export default function App() {
  const isLoaded = useSceneLoadingStore((state) => state.isLoaded);

  return (
    <div className="dark">
      <div
        className="min-h-screen text-[#e0f2fe] font-sans
                   selection:bg-sky-400/30 selection:text-sky-200"
        style={{ backgroundColor: "#05111f" }}
      >
        {/* Monte immédiatement : la scène doit commencer à charger sans attendre. */}
        <Background />
        <LoadingScreen />

        {/* Le reste de la page ne s'affiche qu'une fois la scène 3D prête. */}
        {isLoaded && (
          <DeferredSection>
            <Suspense fallback={<div className="py-24 px-6" />}>
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
        )}
      </div>
    </div>
  );
}
