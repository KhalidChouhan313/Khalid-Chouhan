export interface ProjectLinks {
  live: string;
  github: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  links: ProjectLinks;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProjectPayload = Omit<Project, "_id" | "createdAt" | "updatedAt">;
export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export interface ProjectMutationResponse {
  success: boolean;
  message?: string;
  data: Project;
}
