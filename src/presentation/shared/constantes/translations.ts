import { ProjectTranslation } from "../types/Projet";
import { ProjectCategory } from "../types/ProjectCategory";

export type Language = "fr" | "en";

export const homeSectionTranslations = {
  fr: {
    badge: "Disponible pour de nouvelles opportunites",
    titlePrefix: "Developpeur",
    roles: ["Frontend", "Backend", "Fullstack"],
    description:
      "Je cree des experiences numeriques modernes et performantes qui transforment vos idees en solutions innovantes.",
    projectsCta: "Voir mes projets",
    githubCta: "Mon GitHub",
    cvCta: "TÃ©lÃ©charger mon CV",
  },
  en: {
    badge: "Available for new opportunities",
    titlePrefix: "Developer",
    roles: ["Frontend", "Backend", "Fullstack"],
    description:
      "I build modern, high-performance digital experiences that turn your ideas into innovative solutions.",
    projectsCta: "View my projects",
    githubCta: "My GitHub",
    cvCta: "Download my CV",
  },
} as const;

export const aboutSectionTranslations = {
  fr: {
    title: "A propos de moi",
    paragraphOne:
      "Passionne par code depuis mon plus jeune age, j'ai transforme cette passion en expertise au fil des",
    highlight: "4 dernieres annees",
    paragraphOneEnd:
      ". Je concois des architectures logicielles robustes et des interfaces utilisateur pixel-perfect.",
    paragraphTwo: "Ma philosophie de developpement repose sur trois piliers :",
    performance: "Performance",
    maintainability: "Maintenabilite",
    userExperience: "Experience Utilisateur",
    paragraphTwoEnd:
      ". Je ne me contente pas de coder des fonctionnalites, je resous des problemes complexes.",
    journeyTitle: "Mon parcours",
  },
  en: {
    title: "About me",
    paragraphOne:
      "Passionate about code from a young age, I have turned that passion into expertise over the last",
    highlight: "4 years",
    paragraphOneEnd:
      ". I design robust software architectures and pixel-perfect user interfaces.",
    paragraphTwo: "My development philosophy is built on three pillars:",
    performance: "Performance",
    maintainability: "Maintainability",
    userExperience: "User Experience",
    paragraphTwoEnd:
      ". I do more than ship features, I solve complex problems.",
    journeyTitle: "My journey",
  },
} as const;

export const timelineTranslations = {
  fr: [
    {
      date: "Depuis 2021",
      title: "Informatique de Gestion",
      description:
        "Institut Superieur Politechnique De Madagascar | 3HM8+CQH, Antananarivo",
    },
    {
      date: "2020 - 2021",
      title: "Baccalaureat Serie C",
      description: "Lycee Privee Andrianina | Antananarivo Ambolokandrina",
    },
  ],
  en: [
    {
      date: "Since 2021",
      title: "Management Information Systems",
      description:
        "Institut Superieur Politechnique De Madagascar | 3HM8+CQH, Antananarivo",
    },
    {
      date: "2020 - 2021",
      title: "Baccalaureate Series C",
      description: "Lycee Privee Andrianina | Antananarivo Ambolokandrina",
    },
  ],
} as const;

export const skillsSectionTranslations = {
  fr: {
    title: "Arsenal Technologique",
    description:
      "Une maitrise complete de l'ecosysteme JavaScript/TypeScript, du navigateur jusqu'a l'infrastructure cloud.",
    categories: ["Frontend", "Backend", "Base de donnees", "DevOps & Outils"],
  },
  en: {
    title: "Tech Stack",
    description:
      "Strong command of the JavaScript/TypeScript ecosystem, from the browser to cloud infrastructure.",
    categories: ["Frontend", "Backend", "Databases", "DevOps & Tooling"],
  },
} as const;

export const projectCategoryLabels: Record<
  ProjectCategory,
  { fr: string; en: string }
> = {
  Tous: { fr: "Tous", en: "All" },
  "App Web": { fr: "App Web", en: "Web App" },
  "Backend & API": { fr: "Backend & API", en: "Backend & API" },
  IA: { fr: "IA", en: "AI" },
  "Jeux Vidéo": { fr: "Jeux Video", en: "Video Games" },
};

export const projectsSectionTranslations = {
  fr: {
    title: "Travaux Recents",
    codeLabel: "Code",
    liveDemoLabel: "Demo Live",
    filterAria: "Filtrer par categorie",
  },
  en: {
    title: "Recent Work",
    codeLabel: "Code",
    liveDemoLabel: "Live Demo",
    filterAria: "Filter by category",
  },
} as const;

export const projectTranslations = {
  fr: {
    "gestion-petite-entreprise": {
      title: "Gestion Petite Entreprise",
      description:
        "Application de gestion pour petites entreprises permettant la facturation, le suivi de stock, la gestion des clients, la notation des depenses et un tableau de bord simple pour piloter l'activite au quotidien.",
    },
    "arcade-ia-strategique": {
      title: "Arcade IA Strategique",
      description:
        "Developpement d'une plateforme de jeux de strategie integrant un moteur d'intelligence artificielle optimise par l'algorithme d'elagage Alpha-Beta.",
    },
    solfaml: {
      title: "SolfaML",
      description:
        "Editeur de partitions musicales concu pour la composition et l'edition fluide, avec React et Tailwind pour l'interface, Zustand pour la gestion d'etat et Rust pour la logique de compilation.",
    },
    "coregateway-microservices": {
      title: "CoreGateway Microservices",
      description:
        "Architecture orientee microservices gerant l'authentification OAuth2, le rate-limiting et le routage des requetes haute performance.",
    },
    "chat-app": {
      title: "Chat-app",
      description:
        "Systeme de messagerie instantane developpe avec React et Tailwind pour l'interface, Node.js pour le backend et Socket pour la communication en temps reel.",
    },
    "speech-to-text-malagasy": {
      title: "Speech to Text Malagasy",
      description:
        "Projet de reconnaissance vocale pour la langue malgache, entraine avec PyTorch et une etape de pretraitement audio pour le nettoyage, la normalisation et l'extraction des caracteristiques.",
    },
  },
  en: {
    "gestion-petite-entreprise": {
      title: "Small Business Manager",
      description:
        "A management app for small businesses covering invoicing, inventory tracking, client management, expense logging, and a simple dashboard for daily operations.",
    },
    "arcade-ia-strategique": {
      title: "Strategic AI Arcade",
      description:
        "A strategy game platform featuring Tic-Tac-Toe, Fanorona Telo, and Connect Four with an AI engine optimized through Alpha-Beta pruning.",
    },
    solfaml: {
      title: "SolfaML",
      description:
        "A music score editor built for fluid composition and editing, using React and Tailwind for the interface, Zustand for state management, and Rust for compilation logic.",
    },
    "coregateway-microservices": {
      title: "CoreGateway Microservices",
      description:
        "A microservices-oriented architecture handling OAuth2 authentication, rate limiting, and high-performance request routing.",
    },
    "chat-app": {
      title: "Chat App",
      description:
        "A real-time messaging system built with React and Tailwind for the interface, Node.js for the backend, and Socket for live communication.",
    },
    "speech-to-text-malagasy": {
      title: "Malagasy Speech to Text",
      description:
        "A speech recognition project for the Malagasy language, trained with PyTorch and supported by audio preprocessing for cleaning, normalization, and feature extraction.",
    },
  },
} as const satisfies Record<Language, Record<string, ProjectTranslation>>;

export const contactSectionTranslations = {
  fr: {
    title: "Pret a collaborer ?",
    description:
      "Que ce soit pour un projet freelance, une offre d'emploi ou simplement pour echanger sur la tech.",
    infoTitle: "Informations",
    networksTitle: "Reseaux",
    location: "Antananarivo (Remote)",
    successTitle: "Message envoye !",
    successDescription: "Merci, je vous repondrai dans les plus brefs delais.",
    sendAnother: "Envoyer un autre message",
    error: "Une erreur est survenue. Veuillez reessayer.",
    name: "Nom",
    namePlaceholder: "Nom Prenom",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Parlez-moi de votre idee...",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
  },
  en: {
    title: "Ready to collaborate?",
    description:
      "Whether it is for a freelance project, a job opportunity, or simply to talk about tech.",
    infoTitle: "Information",
    networksTitle: "Networks",
    location: "Antananarivo (Remote)",
    successTitle: "Message sent!",
    successDescription:
      "Thank you, I will get back to you as soon as possible.",
    sendAnother: "Send another message",
    error: "Something went wrong. Please try again.",
    name: "Name",
    namePlaceholder: "Full name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Tell me about your idea...",
    send: "Send message",
    sending: "Sending...",
  },
} as const;
