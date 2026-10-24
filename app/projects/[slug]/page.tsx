import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { findProject } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug).catch(() => null);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const description = project.description.slice(0, 160);
  const url = `/projects/${project.slug ?? project._id}`;
  return {
    title: `${project.title} — Project by Khalid Chouhan`,
    description,
    keywords: [project.title, ...project.technologies, "Khalid Chouhan project"],
    alternates: { canonical: url },
    openGraph: { title: project.title, description, url, images: project.images.slice(0, 1) },
    twitter: { card: "summary_large_image", title: project.title, description, images: project.images.slice(0, 1) },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) notFound();
  if (project.slug && slug !== project.slug) permanentRedirect(`/projects/${project.slug}`);

  const url = `${SITE_URL}/projects/${project.slug ?? project._id}`;
  const [cover, ...gallery] = project.images ?? [];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#project`,
        name: project.title,
        description: project.description.slice(0, 300),
        url,
        image: project.images,
        codeRepository: project.links.github,
        programmingLanguage: project.technologies,
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        dateCreated: project.createdAt.toISOString(),
        dateModified: (project.updatedAt ?? project.createdAt).toISOString(),
        ...(project.links.live ? { sameAs: project.links.live } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects/seeMore` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen px-6 py-16 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <nav aria-label="Breadcrumb">
          <Link
            href="/projects/seeMore"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All projects
          </Link>
        </nav>

        <header className="flex flex-col gap-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Case study · by Khalid Chouhan
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
        </header>

        {cover && (
          <div className="border-gradient relative aspect-video w-full overflow-hidden rounded-3xl bg-bg-surface">
            <Image src={cover} alt={`${project.title} — screenshot`} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed text-[var(--color-text-muted)]">
              {project.description}
            </p>
          </section>

          <aside className="border-gradient glass h-fit rounded-3xl p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.technologies?.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--color-border)] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {gallery.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-bg-surface">
                <Image src={src} alt={`${project.title} screenshot ${i + 2}`} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
