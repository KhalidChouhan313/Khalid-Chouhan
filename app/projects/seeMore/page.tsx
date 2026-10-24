"use client";

import ProjectCardSkeleton from "@/components/common/Loading/ProjectCardSkeleton";
import { useProjects } from "@/hooks/project";
import ProjectCard from "@/components/sections/projects/ProjectCard";

export default function SeeMoreProjects() {
  const { data, isLoading, isError } = useProjects();

  return (
    <main className="min-h-screen px-6 py-20 bg-transparent text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="max-w-xl text-sm md:text-base text-[var(--color-text-muted)]">
            Everything I&apos;ve built — client work, products and open source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}

          {!isLoading &&
            data?.map((project) => (
              <ProjectCard key={project?._id} project={project} />
            ))}
        </div>

        {isError && (
          <div className="flex justify-center mt-12">
            <p className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
              Failed to load projects. Please try reloading the page.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
