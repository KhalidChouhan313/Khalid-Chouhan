import type { Metadata } from "next";
import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import BlogSchema from "@/models/BlogSchema";
import { SITE_URL } from "@/lib/seo";

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
      openGraph: { title: blog.title, description, images: [blog.image], type: "article", url: `/blog/${slug}` },
      twitter: { card: "summary_large_image", title: blog.title, description, images: [blog.image] },
    };
  } catch (error) {
    console.error("Blog metadata error:", error);
    return { title: "Blog" };
  }
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article: Record<string, unknown> | null = null;
  if (mongoose.Types.ObjectId.isValid(slug)) {
    try {
      await connectDB();
      const blog = await BlogSchema.findById(slug)
        .select("title description image createdAt updatedAt")
        .lean<{ title: string; description: string; image: string; createdAt: Date; updatedAt?: Date }>();
      if (blog) {
        article = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blog/${slug}#article`,
          headline: blog.title,
          description: blog.description.replace(/[#*_`>\[\]()!-]/g, "").slice(0, 160),
          image: [blog.image],
          datePublished: blog.createdAt.toISOString(),
          dateModified: (blog.updatedAt ?? blog.createdAt).toISOString(),
          author: { "@id": `${SITE_URL}/#person` },
          publisher: { "@id": `${SITE_URL}/#person` },
          mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en",
        };
      }
    } catch (error) {
      console.error("Blog schema error:", error);
    }
  }

  return (
    <>
      {article && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      )}
      {children}
    </>
  );
}
