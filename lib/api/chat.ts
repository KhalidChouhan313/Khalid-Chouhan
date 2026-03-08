import { apiWrapper } from "@/helper/apiWrapper";

export const PostChat = async (payload: { message: string }) => {
  return apiWrapper({
    endpoint: "/api/chat",
    method: "POST",
    payload,
    isPublic: true,
  });
};