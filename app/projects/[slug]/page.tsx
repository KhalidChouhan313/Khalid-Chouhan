"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import BlogDetailSkeleton from "@/components/common/Loading/BlogDetailsSkeleton";
import { UseProjectBySlug } from "@/hooks/project";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: project, isLoading, isError } = UseProjectBySlug(slug);
  if (!project && isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl">Project not found.</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <BlogDetailSkeleton />
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-linear-to-b from-black to-gray-900 text-white">
      <div className="max-w-[90%] mx-auto">
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-teal mb-8 flex items-center"
        >
          <ChevronLeft /> Back to Projects
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {project?.title}
        </h1>
        <div className="relative w-full h-100 rounded-2xl overflow-hidden mb-10 border border-gray-700">
          <Image
            src={project?.images?.[0] ?? "/placeholder.png"}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {project?.description}
        </p>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project?.technologies.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm rounded-full bg-gray-800 border border-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href={project?.links?.live}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-teal text-black font-semibold hover:bg-teal-300 transition"
          >
            Live Preview
          </a>
          <a
            href={project?.links?.github}
            target="_blank"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:border-teal transition"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </main>
  );
}
export default Page;