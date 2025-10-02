import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    date: "Depuis 2021",
    title: "Informatique de Gestion",
    description:
      "Institut Supérieur Politechnique De Madagascar | 3HM8+CQH, Antananarivo",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
  },
  {
    date: "2020 - 2021",
    title: "Baccalaureate Serie C",
    description: "Lycée Privée Andrianina | Antananarivo Ambolokandrina",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
  },
];

const AboutSection = () => {
  return (
    <section id="apropos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionné par le développement web et mobile, je combine créativité
            et expertise technique pour créer des solutions sur mesure.
          </p>
        </motion.div>

        {/* Section avec description et chronologie */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Texte descriptif */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Mon parcours</h3>
            <p className="text-muted-foreground mb-6">
              Avec plus de 3 ans d'expérience dans le développement web, j'ai eu
              l'opportunité de travailler sur des projets variés, allant des
              sites vitrines aux applications complexes.
            </p>
            <p className="text-muted-foreground">
              Je privilégie une approche centrée sur l'utilisateur, en
              m'assurant que chaque projet répond aux besoins spécifiques de mes
              clients tout en offrant une expérience utilisateur exceptionnelle.
            </p>
          </motion.div>

          {/* Chronologie */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Ligne verticale */}
            <div className="absolute left-4 top-0 h-full w-1 bg-primary/30 rounded-full" />

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
                  <div className="absolute -left-11.5 top-4 w-8 h-8 flex items-center justify-center bg-white border-2 border-primary rounded-full shadow-md">
                    {item.icon}
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:shadow-lg transition-all">
                    <span className="text-sm text-primary font-medium">
                      {item.date}
                    </span>
                    <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
