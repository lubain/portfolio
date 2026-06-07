import { ExternalLink, Github } from "lucide-react";
import { ProjectCategory } from "@/presentation/shared/types/ProjectCategory";
import { FadeIn } from "../ui/FadeIn";
import { SpotlightCard } from "../ui/SpotlightCard";
import { useState } from "react";
import { PROJECTS } from "@/presentation/shared/constantes/projets";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import {
  projectCategoryLabels,
  projectsSectionTranslations,
  projectTranslations,
} from "@/presentation/shared/constantes/translations";

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
            <span className="w-12 h-[2px] bg-sky-400 inline-block align-middle mr-4" />
            {copy.title}
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((category) => (
              <button
                aria-label={`${copy.filterAria}: ${projectCategoryLabels[category][language]}`}
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-sky-100 dark:bg-sky-900/20 text-slate-600 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-800/30 border border-sky-200 dark:border-sky-700/40"
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
              <SpotlightCard className="group h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-sky-900/10 dark:bg-sky-900/20 group-hover:bg-transparent transition duration-300 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-[#05111f]/70 backdrop-blur-md text-slate-900 dark:text-sky-100 rounded-full border border-sky-200 dark:border-sky-700/40 shadow-sm">
                      {projectCategoryLabels[project.category][language]}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-sky-200/60 mb-6 flex-grow text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/30 px-2.5 py-1 rounded-md border border-sky-200 dark:border-sky-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-sky-200 dark:border-sky-800/40">
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-sky-300/70 hover:text-slate-900 dark:hover:text-sky-200 transition-colors"
                    >
                      <Github className="w-4 h-4" /> {copy.codeLabel}
                    </a>
                    <a
                      href={project.link}
                      target={`${project.link !== "#" ? "_blank" : "_self"}`}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-sky-300/70 hover:text-slate-900 dark:hover:text-sky-200 transition-colors ml-auto"
                    >
                      {copy.liveDemoLabel} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
