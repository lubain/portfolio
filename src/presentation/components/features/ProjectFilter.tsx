import { motion } from "framer-motion";
import {
  Globe,
  Database,
  Layers,
  Filter,
  Gamepad2,
  DatabaseBackup,
} from "lucide-react";
import { JSX } from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Category } from "@/presentation/shared/types/Category";

interface ProjectFilterProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  projectCount: number;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  projectCount,
}) => {
  const categoryIcons: Record<Category, JSX.Element> = {
    tous: <Layers className="w-4 h-4" />,
    web: <Globe className="w-4 h-4" />,
    backend: <Database className="w-4 h-4" />,
    jeux: <Gamepad2 className="w-4 h-4" />,
    ia: <DatabaseBackup className="w-4 h-4" />,
  };

  const categoryLabels: Record<Category, string> = {
    tous: "Tous les projets",
    web: "Applications Web",
    backend: "Backend & API",
    jeux: "Jeux Vidéo",
    ia: "IA",
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Filtrer par catégorie</h3>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {projectCount} projet{projectCount > 1 ? "s" : ""}
        </Badge>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category, index) => {
          const isActive = activeCategory === category;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={`
                  group relative overflow-hidden transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "hover:border-primary/50 hover:text-primary"
                  }
                `}
              >
                {/* Background Animation */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative flex items-center space-x-2">
                  <motion.div
                    animate={{
                      rotate: isActive ? [0, 360] : 0,
                      scale: isActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: isActive ? 0.6 : 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {categoryIcons[category]}
                  </motion.div>
                  <span className="text-sm font-medium">
                    {categoryLabels[category]}
                  </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filter Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>
          Affichage de {projectCount} projet{projectCount > 1 ? "s" : ""}
          {activeCategory !== "tous" && (
            <span className="text-primary font-medium">
              {" "}
              dans "{categoryLabels[activeCategory]}"
            </span>
          )}
        </span>

        {activeCategory !== "tous" && (
          <motion.button
            onClick={() => onCategoryChange("tous")}
            className="text-primary hover:text-primary/80 transition-colors underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réinitialiser les filtres
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectFilter;
