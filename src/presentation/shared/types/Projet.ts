import { ProjectCategory } from "./ProjectCategory";

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  techs: string[];
  image: string;
  link: string;
  github: string;
}
