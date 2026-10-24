export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/adminKhalid", "/api/"],
    },
    sitemap: "https://khalid-chouhan.vercel.app/sitemap.xml",
  };
}
