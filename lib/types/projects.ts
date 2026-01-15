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
export interface CreateProjectPayload {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  images?: string;
}
