import { FadeIn } from "../ui/FadeIn";
import { SpotlightCard } from "../ui/SpotlightCard";
import { SKILLS } from "@/presentation/shared/constantes/skills";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { skillsSectionTranslations } from "@/presentation/shared/constantes/translations";

const SkillsSection = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = skillsSectionTranslations[language];

  return (
    <section
      id="compétences"
      className="py-24 px-6 bg-sky-50/50 dark:bg-sky-950/20 border-y border-sky-200 dark:border-sky-900/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {copy.title}
            </h2>
            <p className="text-slate-600 dark:text-sky-200 max-w-2xl mx-auto">
              {copy.description}
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((category, idx) => (
            <FadeIn key={category.title} delay={idx * 150}>
              <SpotlightCard className="p-8 h-full">
                <div className="bg-sky-100 dark:bg-sky-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-sky-200 dark:border-sky-700/40 shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {copy.categories[idx] ?? category.title}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 text-slate-600 dark:text-sky-200"
                    >
                      <span aria-hidden="true">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
