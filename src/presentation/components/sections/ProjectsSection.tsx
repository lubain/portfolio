import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import ProjectGrid from "../ui/ProjectGrid";
import { Projet } from "@/presentation/shared/types/Projet";
import { Category } from "@/presentation/shared/types/Category";
import ProjectFilter from "../features/ProjectFilter";
import { categories } from "@/presentation/shared/constantes/categories";
import Button from "../ui/Button";

interface ProjectsSectionProps {
  projets: Projet[];
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projets,
  activeCategory,
  setActiveCategory,
}) => {
  const filteredProjets =
    activeCategory === "tous"
      ? projets
      : projets.filter((p) => p.categorie === activeCategory);

  return (
    <section id="projets" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes projets</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez une sélection de mes réalisations récentes, alliant
            innovation technique et design moderne.
          </p>
        </AnimatedSection>

        {/* Project Filter */}
        <AnimatedSection className="mb-12" delay={0.2}>
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            projectCount={filteredProjets.length}
          />
        </AnimatedSection>

        {/* Projects Grid */}
        <AnimatedSection delay={0.4}>
          <ProjectGrid
            projets={filteredProjets}
            activeCategory={activeCategory}
          />
        </AnimatedSection>

        {/* Empty State */}
        {filteredProjets.length === 0 && (
          <AnimatedSection className="text-center py-16" delay={0.6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Aucun projet trouvé</h3>
              <p className="text-muted-foreground">
                Aucun projet ne correspond à cette catégorie pour le moment.
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveCategory("tous")}
                className="mt-4"
              >
                Voir tous les projets
              </Button>
            </motion.div>
          </AnimatedSection>
        )}

        {/* Call to Action */}
        {filteredProjets.length > 0 && (
          <AnimatedSection className="text-center mt-16" delay={0.6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="group">
                Voir tous mes projets sur GitHub
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ExternalLink className="ml-2 w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
