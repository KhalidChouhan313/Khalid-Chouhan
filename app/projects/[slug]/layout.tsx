import type { Metadata } from "next";
import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import { SchemaProject } from "@/models/Projects";

// Server-side metadata so search engines / link previews see each project's title (page itself is client-rendered).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!mongoose.Types.ObjectId.isValid(slug)) return { title: "Project" };
  try {
    await connectDB();
    const project = await SchemaProject.findById(slug).select("title description images").lean<{
      title: string;
      description: string;
      images: string[];
    }>();
    if (!project) return { title: "Project not found" };
    const description = project.description.slice(0, 160);
    return {
      title: project.title,
      description,
      alternates: { canonical: `/projects/${slug}` },
      openGraph: { title: project.title, description, images: project.images.slice(0, 1) },
    };
  } catch (error) {
    console.error("Project metadata error:", error);
    return { title: "Project" };
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
