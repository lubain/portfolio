import { Category } from "./Category";

export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  image: string;
  lien: string;
  github: string;
  categorie: Category;
}
