import type { MetadataRoute } from "next";
import { connectDB } from "@/config/db";
import BlogSchema from "@/models/BlogSchema";
import { SchemaProject } from "@/models/Projects";
import { ensureSlugs } from "@/lib/content";

const BASE = "https://khalid-chouhan.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const today = new Date();
    const pages: MetadataRoute.Sitemap = [
        "", "/about", "/skills", "/projects", "/projects/seeMore", "/blog", "/contact",
    ].map((path) => ({
        url: `${BASE}${path}`,
        lastModified: today,
        changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
    }));

    try {
        await connectDB();
        await Promise.all([ensureSlugs(BlogSchema), ensureSlugs(SchemaProject)]);
        type Doc = { _id: string; slug?: string; updatedAt?: Date };
        const [blogs, projects] = await Promise.all([
            BlogSchema.find().select("_id slug updatedAt").lean<Doc[]>(),
            SchemaProject.find().select("_id slug updatedAt").lean<Doc[]>(),
        ]);
        return [
            ...pages,
            ...blogs.map((b) => ({ url: `${BASE}/blog/${b.slug ?? b._id}`, lastModified: b.updatedAt ?? today, changeFrequency: "monthly" as const, priority: 0.7 })),
            ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug ?? p._id}`, lastModified: p.updatedAt ?? today, changeFrequency: "monthly" as const, priority: 0.6 })),
        ];
    } catch (error) {
        // DB unreachable (e.g. at build time): still serve the static pages
        console.error("Sitemap DB error:", error);
        return pages;
    }
}
