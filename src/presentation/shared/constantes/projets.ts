import { Projet } from "../types/Projet";
import PacmanImg from "@/assets/Pacman.PNG";
import asrImage from "@/assets/ASR.PNG";
import chatImage from "@/assets/chat.png";
import MadaocsImage from "@/assets/Madaocs.PNG";

export const projets: Projet[] = [
  {
    id: 3,
    titre: "Jeux Pacman",
    description: "Trouver l'unique sortie dans un labyrinthe...",
    technologies: ["JS", "HTML", "CSS"],
    image: PacmanImg,
    lien: "https://gravirygame.netlify.app/pacman/pacman",
    github: "https://github.com/lubain/GameJS",
    categorie: "jeux",
  },
  {
    id: 4,
    titre: "MADAOCS",
    description: "Site d'achat et vente de voiture d'occasion...",
    technologies: ["PHP", "Codeigniter", "MySQL", "CSS", "JS"],
    image: MadaocsImage,
    lien: "#",
    github: "https://github.com/lubain/Madaocs",
    categorie: "web",
  },
  {
    id: 5,
    titre: "Chat-App",
    description: "Système de messagerie instentané...",
    technologies: ["React.js", "Node.js", "Socket.io", "Sass"],
    image: chatImage,
    lien: "#",
    github: "#",
    categorie: "backend",
  },
  {
    id: 6,
    titre: "Reconaissance vocale",
    description: "Reconaissance de la langue malgache...",
    technologies: ["Python", "CTCDecode", "Pytorch", "React native", "FastAPI"],
    image: asrImage,
    lien: "#",
    github: "#",
    categorie: "ia",
  },
];
