import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Button from "./Button";
import { Projet } from "@/presentation/shared/types/Projet";
import { Card, CardContent } from "./Card";
import Badge from "./Badge";

interface ProjectCardProps {
  projet: Projet;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projet, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500">
        {/* Image Container with Overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30"
            animate={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(112, 224, 224, 0.3), rgba(112, 224, 224, 0.1), rgba(112, 224, 224, 0.4))"
                : "linear-gradient(135deg, rgba(112, 224, 224, 0.2), rgba(112, 224, 224, 0.1), rgba(112, 224, 224, 0.3))",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Image du projet */}
          <motion.img
            src={projet.image}
            alt={projet.titre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="flex space-x-3"
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
              >
                <ExternalLink className="w-4 h-4 text-black" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
              >
                <Github className="w-4 h-4 text-black" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: "-100%",
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <motion.h3
            className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {projet.titre}
          </motion.h3>

          <motion.p
            className="text-muted-foreground mb-4 text-sm leading-relaxed"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {projet.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {projet.technologies.map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex space-x-2"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              size="sm"
              className="flex-1 group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Voir le projet
            </Button>
            <Button
              size="sm"
              variant="outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
