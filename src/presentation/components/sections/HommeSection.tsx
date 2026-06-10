import { Github, ChevronRight, MapPin, Download } from "lucide-react";
import TypewriterEffect from "@/presentation/components/features/TypewriterEffect";
import { FadeIn } from "../ui/FadeIn";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { homeSectionTranslations } from "@/presentation/shared/constantes/translations";

const HommeSection = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = homeSectionTranslations[language];

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* ── Texte ── */}
          <div className="flex-1 text-center md:text-left">
            <FadeIn delay={150}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
                {copy.titlePrefix}
                <br />
                <span>
                  <TypewriterEffect
                    texts={copy.roles}
                    speed={150}
                    deleteSpeed={100}
                    pauseDuration={2000}
                    className="text-gradient"
                  />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-sky-200 mb-3 max-w-xl leading-relaxed">
                {copy.description}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-slate-500 dark:text-sky-300 mb-8">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Antananarivo, Madagascar · Remote</span>
              </div>
            </FadeIn>

            <FadeIn delay={450}>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a
                  href="#projets"
                  className="px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2 shadow-[0_0_30px_-5px_rgba(56,189,248,0.5)]"
                >
                  {copy.projectsCta}{" "}
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/lubain"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Profil GitHub de Lubain Fadhel (nouvel onglet)"
                  className="px-8 py-4 rounded-full bg-sky-100 dark:bg-sky-900/20 hover:bg-sky-200 dark:hover:bg-sky-800/30 border border-sky-300 dark:border-sky-700/40 text-slate-900 dark:text-sky-100 font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />{" "}
                  {copy.githubCta}
                </a>
                <a
                  href="/cv-lubain-fadhel.pdf"
                  download
                  aria-label={`${copy.cvCta} (téléchargement PDF)`}
                  className="px-8 py-4 rounded-full border border-indigo-400 dark:border-indigo-500/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />{" "}
                  {copy.cvCta}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* ── Photo ── */}
          <FadeIn delay={200}>
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-sky-300 to-indigo-400 animate-spin [animation-duration:8s] p-[3px]"
                aria-hidden="true"
              />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-sky-400 to-indigo-400">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#05111f]">
                  <img
                    src="/profile.jpg"
                    alt="Photo de profil de Lubain Fadhel"
                    width={288}
                    height={288}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#0a1f35] border border-sky-200 dark:border-sky-800/50 shadow-md dark:shadow-none text-xs font-semibold text-slate-700 dark:text-sky-200 whitespace-nowrap"
                aria-label={
                  language === "fr"
                    ? "Statut : disponible"
                    : "Status: available"
                }
              >
                <span
                  className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                  aria-hidden="true"
                />
                {language === "fr" ? "Disponible" : "Available"}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HommeSection;
