import type { Blog } from "./blogs";
import type { Project } from "./projects";

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

/** Each tab id doubles as its React Query key, so switching tabs refetches that data. */
export type AdminTab = "messages" | "projects" | "blogs" | "social" | "settings";

export interface AdminAuthResponse {
  admin: boolean;
}

export interface ApiSuccessResponse {
  success: boolean;
  message?: string;
}

export interface UploadResponse {
  success: boolean;
  url: string;
}

/** Text fields only; images are tracked separately as File[] / existing URLs. */
export interface ProjectFormValues {
  title: string;
  description: string;
  link: string;
  github: string;
}

export interface ProjectsUploadProps {
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  showProjectForm: boolean;
  setShowProjectForm: (val: boolean) => void;
}

export interface BlogsUploadProps {
  editingBlog: Blog | null;
  setEditingBlog: (blog: Blog | null) => void;
  showBlogForm: boolean;
  setShowBlogForm: (val: boolean) => void;
}
