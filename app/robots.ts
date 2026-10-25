import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/adminKhalid", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
