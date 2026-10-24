import { apiWrapper } from "@/helper/apiWrapper";
import { SocialLinks, SocialLinksResponse } from "../social";

export const getSocialLinks = async () =>
  apiWrapper<SocialLinksResponse>({ endpoint: "/api/social", method: "GET" });

export const updateSocialLinks = async (payload: SocialLinks) =>
  apiWrapper<SocialLinksResponse>({ endpoint: "/api/social", method: "PUT", payload });
