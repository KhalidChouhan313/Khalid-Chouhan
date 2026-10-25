import "server-only";
import { cache } from "react";
import mongoose, { Model } from "mongoose";
import { connectDB } from "@/config/db";
import BlogSchema from "@/models/BlogSchema";
import { SchemaProject } from "@/models/Projects";
import type { Project } from "@/lib/types/projects";

// keyword URLs for SEO: "/blog/how-i-secured-my-nextjs-api-routes" instead of "/blog/69f7..."
export const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "") || "post";

/** Slug from title, with a short suffix only when another doc already owns it. */
export const uniqueSlug = async (model: Model<unknown>, title: string, excludeId?: string) => {
  const base = slugify(title);
  const clash = await model.exists({ slug: base, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
  return clash ? `${base}-${Date.now().toString(36).slice(-4)}` : base;
};

/** Lazy migration: give slugs to docs created before the field existed. */
export const ensureSlugs = async (model: Model<unknown>) => {
  await connectDB();
  const missing = await model.find({ slug: { $in: [null, ""] } }).select("_id title");
  for (const doc of missing as unknown as { _id: string; title: string; slug?: string; save: () => Promise<unknown> }[]) {
    doc.slug = await uniqueSlug(model, doc.title, String(doc._id));
    await doc.save();
  }
};

const findByParam = async <T>(model: Model<unknown>, param: string): Promise<T | null> => {
  await connectDB();
  const query = mongoose.Types.ObjectId.isValid(param) ? { _id: param } : { slug: param };
  return model.findOne(query).lean<T>();
};

export interface BlogDoc {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  views: number;
  readTime: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProjectDoc {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  links: { live: string; github: string };
  createdAt: Date;
  updatedAt?: Date;
}

/** Newest first, serialised so client components can take it as a prop. */
export const listProjects = cache(async (): Promise<Project[]> => {
  await ensureSlugs(SchemaProject);
  const docs = await SchemaProject.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
});

// cache() dedupes the lookup between generateMetadata and the page in one request
export const findBlog = cache((param: string) => findByParam<BlogDoc>(BlogSchema, param));
export const findProject = cache((param: string) => findByParam<ProjectDoc>(SchemaProject, param));
