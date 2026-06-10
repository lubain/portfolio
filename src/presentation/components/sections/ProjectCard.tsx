import { ExternalLink, Github, Loader } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { useProjectScreenshot } from "../../hooks/useProjectScreenshot";
import { projectCategoryLabels } from "@/presentation/shared/constantes/translations";
import {
  Project,
  ProjectTranslation,
} from "@/presentation/shared/types/Projet";

interface ProjectCardProps {
  project: Project & ProjectTranslation;
  language: "fr" | "en";
  copy: {
    codeLabel: string;
    liveDemoLabel: string;
  };
}

export const ProjectCard = ({ project, language, copy }: ProjectCardProps) => {
  const { imageUrl, loading, error } = useProjectScreenshot(project.image);

  // Utiliser l'image du hook si disponible, sinon utiliser l'URL du projet (fallback pour les liens inactifs)
  const displayImageUrl = imageUrl || project.image;

  return (
    <SpotlightCard className="group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
        <div className="absolute inset-0 bg-sky-900/10 dark:bg-sky-900/20 group-hover:bg-transparent transition duration-300 z-10" />

        {/* Loading skeleton */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 animate-pulse">
            <Loader className="w-6 h-6 text-sky-500 animate-spin" />
          </div>
        )}

        {/* Image */}
        <img
          src={displayImageUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={800}
          height={450}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Error state */}
        {error && !imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs">
            {error}
          </div>
        )}

        {/* Category badge */}
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
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-sky-300/70 hover:text-slate-900 dark:hover:text-sky-200 transition-colors"
          >
            <Github className="w-4 h-4" /> {copy.codeLabel}
          </a>
          <a
            href={project.link}
            target={`${project.link !== "#" ? "_blank" : "_self"}`}
            rel={project.link !== "#" ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-sky-300/70 hover:text-slate-900 dark:hover:text-sky-200 transition-colors ml-auto"
          >
            {copy.liveDemoLabel} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
};
