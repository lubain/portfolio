import { Project } from "../types/Projet";

export const PROJECTS: Project[] = [
  {
    id: "chat-app",
    category: "App Web",
    techs: ["React", "NestJS", "Redis", "Socket.io", "Docker"],
    // URL app réelle — screenshot pris par useProjectScreenshot
    image: "https://chat-app-xi-teal.vercel.app",
    link: "https://chat-app-xi-teal.vercel.app",
    github: "https://github.com/lubain/chat-app",
  },
  {
    id: "gestion-petite-entreprise",
    category: "App Web",
    techs: ["React", "TypeScript", "Tailwind", "NestJS"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=800&fm=webp",
    link: "https://gestion-entreprises-one.vercel.app/",
    github: "https://github.com/lubain/gestion-entreprises",
  },
  {
    id: "strategy-ia-games",
    category: "Jeux Vidéo",
    techs: ["TypeScript", "Tailwind", "Zustand", "FastAPI"],
    // URL app réelle — screenshot pris par useProjectScreenshot
    image: "https://strategy-ia-games.netlify.app",
    link: "https://strategy-ia-games.netlify.app",
    github: "https://github.com/lubain/strategy-ai-games",
  },
  {
    id: "solfaml",
    category: "App Web",
    techs: ["React", "Tailwind CSS", "Zustand", "Rust"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800&fm=webp",
    link: "#",
    github: "https://github.com/solfaml/solfaml-front",
  },
  {
    id: "coregateway-microservices",
    category: "Backend & API",
    techs: ["NestJS", "GraphQL", "Redis", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800&fm=webp",
    link: "#",
    github: "https://github.com/lubain/CoreGateway-Microservices",
  },
  {
    id: "speech-to-text-malagasy",
    category: "IA",
    techs: ["PyTorch", "Python", "Audio Preprocessing"],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800&fm=webp",
    link: "#",
    github: "https://github.com/lubain/speech_to_text",
  },
];
