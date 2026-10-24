"use client";

import SectionHeading from "@/components/common/SectionHeading";
import ProjectCardSkeleton from "@/components/common/Loading/ProjectCardSkeleton";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import { ArrowRight } from "lucide-react";
import { useProjects } from "@/hooks/project";

const Projects = () => {
  const { data, isLoading, isError } = useProjects();
  const [featured, ...rest] = data ?? [];
  const side = rest.slice(0, 2);

  return (
    <section className="w-full py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <SectionHeading
          heading="Selected Work"
          title="Products I've designed, built and shipped"
          paragraph="From fintech dashboards to open-source tooling — real projects, real users."
        />

        {isLoading && (
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400">
            Failed to load projects. Please try reloading the page.
          </p>
        )}

        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid w-full gap-6 lg:grid-cols-3 lg:grid-rows-2"
          >
            <ProjectCard project={featured} featured className="lg:col-span-2 lg:row-span-2" />
            {side.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}

        {featured && (
          <Link
            href="/projects/seeMore"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Explore all {data?.length} projects
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Projects;
