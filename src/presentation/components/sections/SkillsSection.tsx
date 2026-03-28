import { FadeIn } from "../ui/FadeIn";
import { SpotlightCard } from "../ui/SpotlightCard";
import { SKILLS } from "@/presentation/shared/constantes/skills";

const SkillsSection = () => {
  return (
    <section
      id="compétences"
      className="py-24 px-6 bg-slate-100/50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Arsenal Technologique
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Une maîtrise complète de l'écosystème JavaScript/TypeScript, du
              navigateur jusqu'à l'infrastructure cloud.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((category, idx) => (
            <FadeIn key={category.title} delay={idx * 150}>
              <SpotlightCard className="p-8 h-full">
                <div className="bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                    >
                      {skill.icon}
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
