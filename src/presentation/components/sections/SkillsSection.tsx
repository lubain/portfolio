import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiFramer,
  SiSupabase,
  SiRedux,
  SiPhp,
  SiMysql,
} from "react-icons/si";

const skills = [
  {
    category: "Frameworks & Bibliothèques",
    items: [
      {
        name: "React",
        icon: <FaReact className="text-sky-400 text-2xl" />,
        level: 95,
        color: "bg-sky-400",
      },
      {
        name: "Framer Motion",
        icon: <SiFramer className="text-pink-500 text-2xl" />,
        level: 80,
        color: "bg-pink-500",
      },
      {
        name: "Redux/Toolkit",
        icon: <SiRedux className="text-black-500 text-2xl" />,
        level: 90,
        color: "bg-sky-100",
      },
    ],
  },
  {
    category: "Langages",
    items: [
      {
        name: "TypeScript",
        icon: <SiTypescript className="text-blue-500 text-2xl" />,
        level: 85,
        color: "bg-blue-500",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400 text-2xl" />,
        level: 90,
        color: "bg-yellow-400",
      },
      {
        name: "PHP",
        icon: <SiPhp className="text-purple-600 text-2xl" />,
        level: 90,
        color: "bg-purple-600",
      },
    ],
  },
  {
    category: "Bases de données",
    items: [
      {
        name: "Supabase",
        icon: <SiSupabase className="text-yellow-500 text-2xl" />,
        level: 75,
        color: "bg-yellow-500",
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="text-sky-600 text-2xl" />,
        level: 80,
        color: "bg-sky-600",
      },
      {
        name: "MySQL",
        icon: <SiMysql className="text-sky-600 text-2xl" />,
        level: 85,
        color: "bg-sky-600",
      },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="competences" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Compétences</h2>
        <p className="text-gray-400 text-center mb-12">
          Mes domaines d'expertise et technologies maîtrisées
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((group, idx) => (
            <div
              key={idx}
              className="bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-6">{group.category}</h3>
              <div className="space-y-5">
                {group.items.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {skill.icon}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
