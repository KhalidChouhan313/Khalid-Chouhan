import { apiWrapper } from "@/helper/apiWrapper";
import { BlogPayload, BlogResponse } from "../types/blogs";

export const PostBlog = async (payload: BlogPayload) => {
  return apiWrapper({
    endpoint: "/api/blog",
    method: "POST",
    payload,
    isPublic: false,
  });
};
export const GetBlog = async (): Promise<BlogResponse> => {
  return apiWrapper({
    endpoint: "/api/blog",
    method: "GET",
  });
};
