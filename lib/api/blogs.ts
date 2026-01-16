import { apiWrapper } from "@/helper/apiWrapper";
import { BlogPayload } from "../types/blogs";

export const PostBlog = async (payload:BlogPayload) => {
  return apiWrapper({
    endpoint: "/api/blog",
    method: "POST",
    payload,
    isPublic: false,
  });
};
