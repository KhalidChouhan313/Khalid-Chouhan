import { apiWrapper } from "@/helper/apiWrapper";
import { CheckSubscriberResponse, subscriber } from "../types/subscribers";
import { useQuery } from "@tanstack/react-query";

export const CreateSubscriber = async (payload: subscriber) => {
  return apiWrapper({
    endpoint: "/api/subscriber",
    method: "POST",
    payload,
  });
};
export const useCheckSubscriber = () => {
  return useQuery<CheckSubscriberResponse>({
    queryKey: ["checkSubscriber"],
    queryFn: async () => {
      return apiWrapper({
        endpoint: "/api/subscriber/check",
        method: "GET",
      });
    },
  });
};
