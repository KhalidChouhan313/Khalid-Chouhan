import ProjectCard from "@/components/sections/projects/ProjectCard";
import { listProjects } from "@/lib/content";

export const revalidate = 60;

export default async function SeeMoreProjects() {
  const projects = await listProjects();

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

        {projects.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-text-muted)]">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
