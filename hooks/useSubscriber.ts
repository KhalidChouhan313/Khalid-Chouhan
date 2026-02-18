"use client";

import { CreateSubscriber } from "@/lib/api/subscribe";
import { subscriber } from "@/lib/types/subscribers";
import { useMutation } from "@tanstack/react-query";

export const useCreateSubscriber = () => {
  return useMutation({
    mutationFn: (payload: subscriber) => CreateSubscriber(payload),
  });
};
