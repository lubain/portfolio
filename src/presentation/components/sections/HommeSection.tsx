import { Github, ChevronRight, Sparkles } from "lucide-react";
import TypewriterEffect from "@/presentation/components/features/TypewriterEffect";
import { FadeIn } from "../ui/FadeIn";

const HommeSection = () => {
  return (
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
            Développeur <br className="hidden md:block" />
            <span>
              <TypewriterEffect
                texts={["Frontend", "Backend", "Fullstack"]}
                speed={150}
                deleteSpeed={100}
                pauseDuration={2000}
                className="text-gradient"
              />
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Je crée des expériences numériques modernes et performantes qui
            transforment vos idées en solutions innovantes.
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
              href="https://github.com/lubain"
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
  );
};

export default HommeSection;
