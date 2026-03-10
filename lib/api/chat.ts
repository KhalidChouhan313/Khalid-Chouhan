import { apiWrapper } from "@/helper/apiWrapper";
import { ChatResponse } from "../types/chat";

export const PostChat = async (payload: { message: string }) => {
  return apiWrapper<ChatResponse>({
    endpoint: "/api/chat",
    method: "POST",
    payload,
    isPublic: true,
  });
};