import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "./Details";

export default function SeeMoreProjects() {
  return (
    <main className="min-h-screen px-6 py-20 bg-linear-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-teal">
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {allProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative p-6 rounded-2xl bg-gray-800 border border-gray-700
            hover:border-teal hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition duration-500 rounded"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-teal">
              {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((item, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <span className="absolute top-6 right-4 text-sm text-gray-500 group-hover:text-teal">
              <ChevronRight size={40} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
