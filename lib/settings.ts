export interface SiteSettings {
  aboutImage: string;
}

export interface SiteSettingsResponse {
  success: boolean;
  message?: string;
  data: SiteSettings;
}

export const DEFAULT_ABOUT_IMAGE = "/images/hero/about-portrait.png";

export const DEFAULT_SITE_SETTINGS: SiteSettings = { aboutImage: "" };
