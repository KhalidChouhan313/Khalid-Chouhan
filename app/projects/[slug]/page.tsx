import Image from "next/image";
import Link from "next/link";
import { allProjects } from "../seeMore/Details";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("URL slug:", slug);

  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-linear-to-b from-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-teal-400 mb-8 inline-block"
        >
          ← Back to Projects
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

        {/* Image */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-10 border border-gray-700">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm rounded-full bg-gray-800 border border-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <a
            href={project.live}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-300 transition"
          >
            Live Preview
          </a>
          <a
            href={project.github}
            target="_blank"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:border-teal-400 transition"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </main>
  );
}
