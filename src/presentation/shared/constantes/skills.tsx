import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiGithubactions,
  SiGithub,
  SiMysql,
} from "react-icons/si";
import { Server, Database, Layout, Terminal } from "lucide-react";

export const SKILLS = [
  {
    title: "Frontend",
    icon: <Layout className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
    skills: [
      {
        name: "React",
        icon: <SiReact className="w-4 h-4 text-sky-500" />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="w-4 h-4 text-blue-500" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="w-4 h-4 text-cyan-500" />,
      },
      {
        name: "Framer Motion",
        icon: <SiFramer className="w-4 h-4 text-pink-500" />,
      },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-8 h-8 text-green-500 dark:text-green-400" />,
    skills: [
      {
        name: "Node.js",
        icon: <SiNodedotjs className="w-4 h-4 text-green-500" />,
      },
      {
        name: "Express",
        icon: <SiExpress className="w-4 h-4 text-slate-500" />,
      },
      {
        name: "WebSockets",
        icon: <SiSocketdotio className="w-4 h-4 text-slate-500" />,
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="w-4 h-4 text-slate-500" />,
      },
    ],
  },
  {
    title: "Base de données",
    icon: <Database className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="w-4 h-4 text-sky-600" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-4 h-4 text-emerald-500" />,
      },
      {
        name: "MySQL",
        icon: <SiMysql className="w-4 h-4 text-emerald-500" />,
      },
    ],
  },
  {
    title: "DevOps & Outils",
    icon: <Terminal className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
    skills: [
      {
        name: "Docker",
        icon: <SiDocker className="w-4 h-4 text-sky-500" />,
      },
      {
        name: "AWS / Vercel",
        icon: <SiVercel className="w-4 h-4 text-slate-500" />,
      },
      {
        name: "CI/CD (Actions)",
        icon: <SiGithubactions className="w-4 h-4 text-blue-500" />,
      },
      {
        name: "Git / GitHub",
        icon: <SiGithub className="w-4 h-4 text-slate-700" />,
      },
    ],
  },
];
