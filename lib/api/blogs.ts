import { apiWrapper } from "@/helper/apiWrapper";
import { Blog, BlogPayload, BlogResponse, SingleBlogResponse } from "../types/blogs";
import { ApiSuccessResponse } from "../types/Admin";

export const PostBlog = async (payload: BlogPayload) => {
  return apiWrapper<SingleBlogResponse>({
    endpoint: "/api/blog",
    method: "POST",
    payload,
  });
};

export const GetBlog = async (): Promise<BlogResponse> => {
  return apiWrapper<BlogResponse>({
    endpoint: "/api/blog",
    method: "GET",
  });
};

export const DeleteBlog = async (id: string) => {
  return apiWrapper<ApiSuccessResponse>({
    endpoint: `/api/blog?id=${id}`,
    method: "DELETE",
  });
};

export const EditBlog = async (id: string, payload: BlogPayload) => {
  return apiWrapper<SingleBlogResponse>({
    endpoint: `/api/blog?id=${id}`,
    method: "PUT",
    payload,
  });
};

export const PatchBlog = async (id: string) => {
  return apiWrapper<SingleBlogResponse>({
    endpoint: `/api/blog?id=${id}`,
    method: "PATCH",
  });
};

export const GetBlogById = async (id: string): Promise<Blog> => {
  return apiWrapper<Blog>({
    endpoint: `/api/blog/${id}`,
    method: "GET",
  });
};
