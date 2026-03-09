import { PostChat } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";

export const useChat = () => {
  return useMutation({
    mutationFn: (message: string) => PostChat({ message }),
  });
};