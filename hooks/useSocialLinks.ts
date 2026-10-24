"use client";
import { useQuery } from "@tanstack/react-query";
import { getSocialLinks } from "@/lib/api/social";
import { DEFAULT_SOCIAL_LINKS, SocialLinks } from "@/lib/social";

export const useSocialLinks = () =>
  useQuery<SocialLinks>({
    queryKey: ["social"],
    queryFn: async () => (await getSocialLinks()).data,
    placeholderData: DEFAULT_SOCIAL_LINKS,
    staleTime: 5 * 60_000,
  });
