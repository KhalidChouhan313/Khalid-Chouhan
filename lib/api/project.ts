import { apiWrapper } from "@/helper/apiWrapper";
import { CreateProjectPayload, Project } from "../types/projects";

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
export const createProject = async (payload: CreateProjectPayload) => {
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

const BASE_URL = "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL;

export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  try {
    const isServer = typeof window === "undefined";
    const url = isServer
      ? `${BASE_URL}/api/projects/${slug}`
      : `/api/projects/${slug}`;

    const project: Project = await apiWrapper<Project>({
      endpoint: url,
      method: "GET",
      isPublic: true,
    });

    return project;
  } catch (err) {
    console.error("getProjectBySlug error:", err);
    return null;
  }
};
export const deleteProjectById = async (id: string) => {
  return apiWrapper({
    endpoint: `/api/projects/${id}`,
    method: "DELETE",
    isPublic: false,
  });
};
