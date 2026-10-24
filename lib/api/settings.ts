import { apiWrapper } from "@/helper/apiWrapper";
import { SiteSettings, SiteSettingsResponse } from "../settings";

export const getSiteSettings = async () =>
  apiWrapper<SiteSettingsResponse>({ endpoint: "/api/settings", method: "GET" });

export const updateSiteSettings = async (payload: SiteSettings) =>
  apiWrapper<SiteSettingsResponse>({ endpoint: "/api/settings", method: "PUT", payload });
