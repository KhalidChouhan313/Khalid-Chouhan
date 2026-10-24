import type { Metadata } from "next";
import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import BlogSchema from "@/models/BlogSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!mongoose.Types.ObjectId.isValid(slug)) return { title: "Blog" };
  try {
    await connectDB();
    const blog = await BlogSchema.findById(slug).select("title description image").lean<{
      title: string;
      description: string;
      image: string;
    }>();
    if (!blog) return { title: "Blog not found" };
    const description = blog.description.replace(/[#*_`>\[\]()!-]/g, "").slice(0, 160);
    return {
      title: blog.title,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: { title: blog.title, description, images: [blog.image], type: "article" },
    };
  } catch (error) {
    console.error("Blog metadata error:", error);
    return { title: "Blog" };
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
