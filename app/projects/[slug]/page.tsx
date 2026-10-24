"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import BlogDetailSkeleton from "@/components/common/Loading/BlogDetailsSkeleton";
import { UseProjectBySlug } from "@/hooks/project";
import { useParams } from "next/navigation";
import { fadeUp } from "@/lib/motion-variants";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: project, isLoading, isError } = UseProjectBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <BlogDetailSkeleton />
      </div>
    );
  }
  if (!project || isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-xl font-semibold">Project not found.</p>
        <Link href="/projects/seeMore" className="text-sm text-[var(--color-accent)] hover:underline">
          Browse all projects
        </Link>
      </div>
    );
  }

  const [cover, ...gallery] = project.images ?? [];

  return (
    <motion.main variants={fadeUp} initial="hidden" animate="visible" className="min-h-screen px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <Link
          href="/projects/seeMore"
          className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All projects
        </Link>

        <div className="flex flex-col gap-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Case study
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">{project.title}</h1>
          <div className="flex flex-wrap gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-bold text-[#0f0c09] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Live preview <ArrowUpRight size={16} />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Github size={16} /> Source code
              </a>
            )}
          </div>
        </div>

        {cover && (
          <div className="border-gradient relative aspect-video w-full overflow-hidden rounded-3xl bg-bg-surface">
            <Image src={cover} alt={project.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed text-[var(--color-text-muted)]">
              {project.description}
            </p>
          </div>

          <aside className="border-gradient glass h-fit rounded-3xl p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--color-border)] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {gallery.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-bg-surface">
                <Image src={src} alt={`${project.title} screenshot ${i + 2}`} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.main>
  );
};
export default Page;
