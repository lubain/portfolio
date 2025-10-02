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

export const skills = [
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
