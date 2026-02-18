import { apiWrapper } from "@/helper/apiWrapper";
import { subscriber } from "../types/subscribers";

export const CreateSubscriber = async (payload: subscriber) => {
  return apiWrapper({
    endpoint: "/api/subscriber",
    method: "POST",
    payload,
    isPublic: false,
  });
};