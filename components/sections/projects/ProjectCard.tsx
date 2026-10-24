"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types/projects";
import { cn } from "@/lib/utils/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({ project, featured, className }: ProjectCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(500px circle at ${gx} ${gy}, rgba(94,234,212,0.10), transparent 45%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const techs = project.technologies?.slice(0, featured ? 6 : 4) ?? [];

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={cn("group relative h-full", className)}
    >
      <Link
        href={`/projects/${project.slug ?? project._id}`}
        className="border-gradient relative flex h-full flex-col overflow-hidden rounded-3xl bg-bg-elevated/60 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(94,234,212,0.35)]"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <div
          className={cn(
            "relative w-full overflow-hidden bg-bg-surface",
            featured ? "aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[300px]" : "aspect-[16/10]",
          )}
        >
          {project.images?.[0] && (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 700px" : "(max-width: 1024px) 100vw, 400px"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c09] via-[#0f0c09]/20 to-transparent" />
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0f0c09]/60 text-white backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#0f0c09]">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="relative flex flex-col gap-3 p-6" style={{ transform: "translateZ(30px)" }}>
          <h3
            className={cn(
              "font-bold text-white transition-colors duration-300 group-hover:text-[var(--color-accent)] line-clamp-2",
              featured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {project.title}
          </h3>
          <p className={cn("text-sm leading-relaxed text-[var(--color-text-muted)]", featured ? "line-clamp-3" : "line-clamp-2")}>
            {project.description}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--color-border-subtle)] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
