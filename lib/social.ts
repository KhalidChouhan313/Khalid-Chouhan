export const SOCIAL_KEYS = ["github", "linkedin", "twitter", "discord", "instagram"] as const;

export type SocialKey = (typeof SOCIAL_KEYS)[number];

export type SocialLinks = Record<SocialKey, string>;

export interface SocialLinksResponse {
  success: boolean;
  message?: string;
  data: SocialLinks;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  github: "https://github.com/KhalidChouhan313",
  linkedin: "https://www.linkedin.com/in/muhammad-khalid-chouhan-68b24738b",
  twitter: "https://x.com/Mkhalidcho8520M",
  discord: "https://discord.com/users/khalidchouhan._71684",
  instagram: "",
};

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X (formerly Twitter)",
  discord: "Discord",
  instagram: "Instagram",
};
