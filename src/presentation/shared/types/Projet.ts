import { ProjectCategory } from "./ProjectCategory";

export interface Project {
  id: string;
  category: ProjectCategory;
  techs: string[];
  image: string;
  link: string;
  github: string;
}

export interface ProjectTranslation {
  title: string;
  description: string;
}
