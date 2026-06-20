"use client";

import { useRef } from "react";
import ProjectCardSkeleton from "@/components/common/Loading/ProjectCardSkeleton";
import { useProjects } from "@/hooks/project";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

function ProjectCard({ project }: { project: any }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link
      ref={cardRef}
      onMouseMove={handleMouseMove}
      href={`/projects/${project?._id}`}
      className="card-spotlight group relative p-6 rounded-2xl bg-bg-elevated/40 glass border border-[var(--color-border)] hover:border-[var(--color-border-accent)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden rounded-xl mb-5 border border-[var(--color-border-subtle)] bg-bg-surface">
          <Image
            src={project.images?.[0]}
            alt={project?.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors">
          {project?.title}
        </h3>
        <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed font-sans">
          {project?.description.slice(0, 150)}...
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies?.map((item: string, index: number) => (
          <span
            key={index}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-bg-surface border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]"
          >
            {item}
          </span>
        ))}
      </div>
      <span className="absolute top-6 right-6 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition-colors">
        <ChevronRight size={24} className="stroke-[2.5]" />
      </span>
    </Link>
  );
}

export default function SeeMoreProjects() {
  const { data, isLoading, isError } = useProjects();

  return (
    <main className="min-h-screen px-6 py-24 bg-bg-base text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            All Projects
          </h1>
          <div className="w-16 h-1 bg-[var(--color-accent)] rounded-full mt-1" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
