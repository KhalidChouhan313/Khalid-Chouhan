import { apiWrapper } from "@/helper/apiWrapper";
import { Blog, BlogPayload, BlogResponse, SingBlogResponse, } from "../types/blogs";

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
export const DeleteBlog = async (slug: string): Promise<BlogResponse> => {
  return apiWrapper({
    endpoint: `/api/blog?id=${slug}`,
    method: "DELETE",
  });
};

export const EditBlog = async (
  slug: string,
  payload: BlogPayload,
): Promise<BlogResponse> => {
  return apiWrapper({
    endpoint: `/api/blog?id=${slug}`,
    method: "PUT",
    payload,
  });
};
export const PatchBlog = async (
  slug: string,
): Promise<BlogResponse> => {
  return apiWrapper({
    endpoint: `/api/blog?id=${slug}`,
    method: "PATCH",
  });
};
export const GetBlogById = async (
  slug: string
): Promise<Blog> => {
  return apiWrapper({
    endpoint: `/api/blog/${slug}`,
    method: "GET",
  });
};
export const IncrementView = async (id: string) => {
  return apiWrapper({
    endpoint: `/api/blog?id=${id}`,
    method: "PATCH",
  });
};

