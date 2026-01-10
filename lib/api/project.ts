import { apiWrapper } from "@/helper/apiWrapper";

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
export const getProjects = async () => {
  return apiWrapper({
    endpoint: "/api/projects",
    method: "GET",
  });
};
export const deleteProjectById = async (id: string) => {
  return apiWrapper({
    endpoint: `/api/projects/${id}`,
    method: "DELETE",
    isPublic: false,
  });
};
