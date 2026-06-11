import { ProjectCategory } from "@/presentation/shared/types/ProjectCategory";
import { FadeIn } from "../ui/FadeIn";
import { useState } from "react";
import { PROJECTS } from "@/presentation/shared/constantes/projets";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import {
  projectCategoryLabels,
  projectsSectionTranslations,
  projectTranslations,
} from "@/presentation/shared/constantes/translations";
import { ProjectCard } from "./ProjectCard";

const categories: ProjectCategory[] = [
  "Tous",
  "App Web",
  "Backend & API",
  "IA",
  "Jeux Vidéo",
];

const ProjectsSection = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = projectsSectionTranslations[language];
  const localizedProjects = PROJECTS.map((project) => ({
    ...project,
    ...projectTranslations[language][
      project.id as keyof (typeof projectTranslations)[typeof language]
    ],
  }));

  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("Tous");
  const filteredProjects = localizedProjects.filter(
    (project) => activeFilter === "Tous" || project.category === activeFilter,
  );

  return (
    <section id="projets" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <span
              className="w-12 h-[2px] bg-sky-400 inline-block align-middle mr-4"
              aria-hidden="true"
            />
            {copy.title}
          </h2>
        </FadeIn>

        {/* aria-pressed + role="group" pour les filtres */}
        <FadeIn delay={100}>
          <div
            role="group"
            aria-label={copy.filterAria}
            className="flex flex-wrap gap-2 mb-12 overflow-x-auto hide-scrollbar pb-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                aria-pressed={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-sky-100 dark:bg-sky-900/20 text-slate-600 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-800/30 border border-sky-200 dark:border-sky-700/40"
                }`}
              >
                {projectCategoryLabels[category][language]}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={`${project.id}-${idx}`} delay={idx * 100}>
              <ProjectCard project={project} language={language} copy={copy} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
