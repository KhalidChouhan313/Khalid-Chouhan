export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Project {
  id: number;
  images: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
  github?: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  date: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}