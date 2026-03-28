import { motion } from "framer-motion";
import { FadeIn } from "../ui/FadeIn";
import { timeline } from "@/presentation/shared/constantes/timeline";

const AboutSection = () => {
  return (
    <section id="àpropos" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-purple-500"></span>À Propos de moi
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={150}>
            <p>
              Passionné par le code depuis mon plus jeune âge, j'ai transformé
              cette passion en expertise au fil des{" "}
              <span className="text-slate-900 dark:text-white font-semibold">
                5 dernières années
              </span>
              . Je conçoit des architectures logicielles robustes et des
              interfaces utilisateur pixel-perfect.
            </p>
            <p>
              Ma philosophie de développement repose sur trois piliers :{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Performance
              </span>
              ,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Maintenabilité
              </span>{" "}
              et{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Expérience Utilisateur
              </span>
              . Je ne me contente pas de coder des fonctionnalités, je résous
              des problèmes complexes.
            </p>
          </FadeIn>

          <FadeIn direction="right" delay={300}>
            {/* Section avec description et chronologie */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Mon parcours</h3>

              {/* Chronologie */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Ligne verticale */}
                <div className="absolute left-4 top-0 h-full w-1 bg-purple-600 rounded-full" />

                <div className="space-y-10 pl-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Point indicateur */}
                      <div className="absolute -left-11.5 top-4 w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-200 dark:border-white/10 rounded-full shadow-md">
                        {item.icon}
                      </div>

                      <div className="bg-card/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:shadow-lg transition-all">
                        <span className="text-sm text-purple-500 font-medium">
                          {item.date}
                        </span>
                        <h4 className="text-lg font-semibold mt-1">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-2">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
