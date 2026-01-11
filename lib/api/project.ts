import { apiWrapper } from "@/helper/apiWrapper";
import { Project } from "../types/projects";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiWrapper<{ url: string }>({
    endpoint: "/api/upload",
    method: "POST",
    payload: formData,
    isFormData: true,
  });
};
export const createProject = async (payload) => {
  return apiWrapper({
    endpoint: "/api/projects",
    method: "POST",
    payload,
    isPublic: false,
  });
};
export const getProjects = async (): Promise<Project[]> => {
  return apiWrapper({
    endpoint: "/api/projects",
    method: "GET",
  });
};
export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  return apiWrapper({
    endpoint: `/api/projects/${slug}`,
    method: "GET",
    isPublic: true,
  });
};

export const deleteProjectById = async (id: string) => {
  return apiWrapper({
    endpoint: `/api/projects/${id}`,
    method: "DELETE",
    isPublic: false,
  });
};
