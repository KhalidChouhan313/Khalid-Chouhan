import type { MetadataRoute } from "next";
import { connectDB } from "@/config/db";
import BlogSchema from "@/models/BlogSchema";
import { SchemaProject } from "@/models/Projects";

const BASE = "https://khalid-chouhan.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const today = new Date();
    const pages: MetadataRoute.Sitemap = ["", "/about", "/skills", "/projects", "/blog", "/contact"].map(
        (path) => ({ url: `${BASE}${path}`, lastModified: today }),
    );

    try {
        await connectDB();
        type Doc = { _id: string; updatedAt?: Date };
        const [blogs, projects] = await Promise.all([
            BlogSchema.find().select("_id updatedAt").lean<Doc[]>(),
            SchemaProject.find().select("_id updatedAt").lean<Doc[]>(),
        ]);
        return [
            ...pages,
            ...blogs.map((b) => ({ url: `${BASE}/blog/${b._id}`, lastModified: b.updatedAt ?? today })),
            ...projects.map((p) => ({ url: `${BASE}/projects/${p._id}`, lastModified: p.updatedAt ?? today })),
        ];
    } catch (error) {
        // DB unreachable (e.g. at build time): still serve the static pages
        console.error("Sitemap DB error:", error);
        return pages;
    }
}
