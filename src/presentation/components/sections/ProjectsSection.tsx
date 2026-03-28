import { ExternalLink } from "lucide-react";
import { ProjectCategory } from "@/presentation/shared/types/ProjectCategory";
import { FadeIn } from "../ui/FadeIn";
import { SpotlightCard } from "../ui/SpotlightCard";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/presentation/shared/constantes/projets";
import { useState } from "react";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("Tous");
  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "Tous" || p.category === activeFilter
  );
  const categories: ProjectCategory[] = [
    "Tous",
    "App Web",
    "Backend & API",
    "IA",
    "Jeux Vidéo",
  ];

  return (
    <section id="projets" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 flex items-center justify-between">
            <div>
              <span className="w-12 h-[2px] bg-blue-500 inline-block align-middle mr-4"></span>
              Travaux Récents
            </div>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.title} delay={idx * 100}>
              <SpotlightCard className="group h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/20 group-hover:bg-transparent transition duration-300 z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-black/50 backdrop-blur-md text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-white/20 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200 dark:border-white/10">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <FaGithub className="w-4 h-4" /> Code
                    </a>
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto"
                    >
                      Live Demo <ExternalLink className="w-4 h-4" />
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
