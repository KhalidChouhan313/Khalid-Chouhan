export interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  links: {
    live: string;
    github: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
