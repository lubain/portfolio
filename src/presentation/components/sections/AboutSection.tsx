import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { timeline } from "@/presentation/shared/constantes/timeline";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import {
  aboutSectionTranslations,
  timelineTranslations,
} from "@/presentation/shared/constantes/translations";

const AboutSection = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = aboutSectionTranslations[language];
  const localizedTimeline = timelineTranslations[language];

  return (
    <section id="a-propos" className="py-24 px-6 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-sky-400" />
            {copy.title}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={150} direction="left">
            <p>
              {copy.paragraphOne}{" "}
              <span className="text-slate-900 dark:text-white font-semibold">
                {copy.highlight}
              </span>
              {copy.paragraphOneEnd}
            </p>
            <p>
              {copy.paragraphTwo}{" "}
              <span className="text-sky-600 dark:text-sky-400">
                {copy.performance}
              </span>
              ,{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {copy.maintainability}
              </span>{" "}
              {language === "fr" ? "et" : "and"}{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                {copy.userExperience}
              </span>
              {copy.paragraphTwoEnd}
            </p>
          </FadeIn>

          <FadeIn delay={300} direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-6">{copy.journeyTitle}</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-1 bg-sky-500 rounded-full" />
                <div className="space-y-10 pl-12">
                  {timeline.map((item, index) => {
                    const localizedItem = localizedTimeline[index];
                    return (
                      <FadeIn
                        key={index}
                        delay={150 + index * 100}
                        direction="up"
                      >
                        <div className="relative">
                          <div className="absolute -left-11.5 top-4 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#0a1f35] border-2 border-sky-300 dark:border-sky-700 rounded-full shadow-md">
                            {item.icon}
                          </div>
                          <div className="bg-white/60 dark:bg-sky-950/30 backdrop-blur-sm border border-sky-200 dark:border-sky-800/40 rounded-xl p-5 hover:shadow-lg hover:shadow-sky-500/10 transition-all">
                            <span className="text-sm text-sky-500 dark:text-sky-400 font-medium">
                              {localizedItem.date}
                            </span>
                            <h4 className="text-lg font-semibold mt-1 dark:text-white">
                              {localizedItem.title}
                            </h4>
                            <p className="text-slate-500 dark:text-sky-200/60 text-sm mt-2">
                              {localizedItem.description}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
