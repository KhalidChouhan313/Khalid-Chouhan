import { apiWrapper } from "@/helper/apiWrapper";
import {
  CreateProjectPayload,
  Project,
  ProjectMutationResponse,
  UpdateProjectPayload,
} from "../types/projects";
import { ApiSuccessResponse, UploadResponse } from "../types/Admin";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiWrapper<UploadResponse>({
    endpoint: "/api/upload",
    method: "POST",
    payload: formData,
    isFormData: true,
  });
};

export const createProject = async (payload: CreateProjectPayload) => {
  return apiWrapper<ProjectMutationResponse>({
    endpoint: "/api/projects",
    method: "POST",
    payload,
  });
};

export const updateProject = async (id: string, payload: UpdateProjectPayload) => {
  return apiWrapper<ProjectMutationResponse>({
    endpoint: `/api/projects/${id}`,
    method: "PUT",
    payload,
  });
};

export const getProjects = async (): Promise<Project[]> => {
  return apiWrapper<Project[]>({
    endpoint: "/api/projects",
    method: "GET",
  });
};


export const deleteProjectById = async (id: string) => {
  return apiWrapper<ApiSuccessResponse>({
    endpoint: `/api/projects/${id}`,
    method: "DELETE",
  });
};
