"use client";

import { useParams } from "next/navigation";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBlogById, useIncrementView } from "@/hooks/useBlog";
import { useEffect } from "react";
import BlogDetailsSkeleton from "@/components/common/Loading/BlogDetailsSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;
  const { mutate } = useIncrementView();
  const { data: blog, isLoading, isError } = useBlogById(slug);

  useEffect(() => {
    if (!blog?._id) return;

    const viewedBlogs = JSON.parse(
      localStorage.getItem("viewedBlogs") || "[]"
    );

    if (!viewedBlogs.includes(blog._id)) {
      mutate(blog._id);

      localStorage.setItem(
        "viewedBlogs",
        JSON.stringify([...viewedBlogs, blog._id])
      );
    }
  }, [blog, mutate]);


  if (isLoading) {
    return (
      <main className="min-h-screen px-6 py-16 bg-linear-to-b from-black to-gray-900
       text-white">
        <BlogDetailsSkeleton />      </main>
    );
  }
  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl font-medium">
        Blog not found
      </div>
    );
  }
  return (
    <main className="min-h-screen px-6 py-16 bg-linear-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors mb-6 font-medium"
        >
          <ChevronLeft /> Back to Blogs
        </Link>

        <h2 className="text-4xl! md:text-5xl font-extrabold mb-6 tracking-tight text-white">
          {blog?.title}
        </h2>

        <div className="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-lg mb-10 border border-gray-700">
          <Image
            src={blog?.image}
            alt={blog?.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.description}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base mb-12">
          <span className="bg-gray-800 px-3 py-1 rounded-full font-medium hover:bg-teal hover:text-black  transition-colors cursor-default">
            Web Developer
          </span>
          <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full font-medium hover:bg-teal hover:text-black transition-colors cursor-default">
            <Eye className="w-4 h-4" /> {blog?.views}
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full font-medium hover:bg-teal hover:text-black transition-colors cursor-default">
            Posted Date:{" "}
            {blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full font-medium hover:bg-teal hover:text-black transition-colors cursor-default">
            {blog?.readTime} min read
          </span>
        </div>

        {/* <div className="flex flex-wrap gap-4">
          {blog?.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-teal-700/30 text-teal-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-teal-700/50 transition"
            >
              #{tag}
            </span>
          ))}
        </div> */}
      </div>
    </main>
  );
}
