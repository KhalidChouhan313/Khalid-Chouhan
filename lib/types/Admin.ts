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

export interface ProjectFormValues {
  title: string;
  description: string;
  images: FileList;
  technologies: string;
  link?: string;
  github?: string;
}
export interface ProjectsUploadProps {
  setEditingProject: (project: Project | null) => void;
  setShowProjectForm: (val: boolean) => void;
  editingProject: Project | null;
  showProjectForm: boolean;
  projects: Project[];
}
export interface BlogFormValues {
  title: string;
  excerpt: string;
  content: string;
  category?: string;
}

export interface BlogsUploadProps {
  blogs: Blog[];
  editingBlog: Blog | null;
  showBlogForm: boolean;
  setEditingBlog: (blog: Blog | null) => void;
  setShowBlogForm: (val: boolean) => void;
  saveBlogs: (blogs: Blog[]) => Promise<void>;
}