import { FadeIn } from "../ui/FadeIn";
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
            <span className="w-12 h-[2px] bg-purple-500"></span>
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
              <span className="text-purple-600 dark:text-purple-400">
                {copy.performance}
              </span>
              ,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {copy.maintainability}
              </span>{" "}
              {language === "fr" ? "et" : "and"}{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {copy.userExperience}
              </span>
              {copy.paragraphTwoEnd}
            </p>
          </FadeIn>

          <FadeIn delay={300} direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-6">{copy.journeyTitle}</h3>

              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-1 bg-purple-600 rounded-full" />

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
                          <div className="absolute -left-11.5 top-4 w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-200 dark:border-white/10 rounded-full shadow-md">
                            {item.icon}
                          </div>

                          <div className="bg-card/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:shadow-lg transition-all">
                            <span className="text-sm text-purple-500 font-medium">
                              {localizedItem.date}
                            </span>
                            <h4 className="text-lg font-semibold mt-1">
                              {localizedItem.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-2">
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
