import { Project } from "../types/Projet";

export const PROJECTS: Project[] = [
  {
    title: "Speech to Text Malagasy",
    category: "IA",
    description:
      "Projet de reconnaissance vocale pour la langue malgache, entraîné avec PyTorch et une étape de prétraitement audio pour le nettoyage, la normalisation et l'extraction des caractéristiques.",
    techs: ["PyTorch", "Python", "Audio Preprocessing"],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "https://github.com/lubain/speech_to_text",
  },
  {
    title: "SolfaML",
    category: "App Web",
    description:
      "Éditeur de partitions musicales conçu pour la composition et l'édition fluide, avec React et Tailwind pour l'interface, Zustand pour la gestion d'état et Rust pour la logique de compilation.",
    techs: ["React", "Tailwind CSS", "Zustand", "Rust"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "https://github.com/solfaml/solfaml-front",
  },
  {
    title: "CoreGateway Microservices",
    category: "Backend & API",
    description:
      "Architecture orientée microservices gérant l'authentification OAuth2, le rate-limiting et le routage des requêtes haute performance.",
    techs: ["NestJS", "GraphQL", "Redis", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "https://github.com/lubain/CoreGateway-Microservices",
  },
  {
    title: "Chat-app",
    category: "App Web",
    description:
      "Système de messagerie instantané développé avec React et Tailwind pour l'interface, Node.js pour le backend et Socket pour la communication en temps réel.",
    techs: ["React", "Node.js", "Express", "Socket.io"],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "https://github.com/k-hubs-k/Chat-App",
  },
  {
    title: "Gestion Petite Entreprise",
    category: "App Web",
    description:
      "Application de gestion pour petites entreprises permettant la facturation, le suivi de stock, la gestion des clients, la notation des dépenses et un tableau de bord simple pour piloter l'activité au quotidien.",
    techs: ["React", "TypeScript", "MUI", "Tailwind", "Supabase"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=800",
    link: "https://gestion-entreprises-two.vercel.app/",
    github: "https://github.com/lubain/gestion-entreprises",
  },
  {
    title: "Arcade IA Strategique",
    category: "Jeux Vidéo",
    description:
      "Développement d'une plateforme de jeux de stratégie (Tic-Tac-Toe, Fanorona Telo, Puissance 4) intégrant un moteur d'intelligence artificielle optimisé par l'algorithme d'élagage Alpha-Beta.",
    techs: ["TypeScript", "Tailwind", "Zustand", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    link: "https://arcare-ia-strategique.netlify.app/",
    github: "https://github.com/lubain/Arcade-IA-Strategique",
  },
];
