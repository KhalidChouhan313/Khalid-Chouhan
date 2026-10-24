"use client";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/api/settings";
import { DEFAULT_SITE_SETTINGS, SiteSettings } from "@/lib/settings";

export const useSiteSettings = () =>
  useQuery<SiteSettings>({
    queryKey: ["settings"],
    queryFn: async () => (await getSiteSettings()).data,
    placeholderData: DEFAULT_SITE_SETTINGS,
    staleTime: 5 * 60_000,
  });
