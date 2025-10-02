import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Projet } from "@/presentation/shared/types/Projet";

interface ProjectGridProps {
  projets: Projet[];
  activeCategory: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projets,
  activeCategory,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="wait">
        {projets.map((projet, index) => (
          <motion.div
            key={`${projet.id}-${activeCategory}`}
            variants={itemVariants}
            layout
            layoutId={`project-${projet.id}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
          >
            <ProjectCard projet={projet} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGrid;
