import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import { findBlog } from "@/lib/content";
import { FULL_NAME, SITE_URL } from "@/lib/seo";
import { introProfile } from "@/Utils/BaseUrl";
import ViewTracker from "@/components/sections/Blog/ViewTracker";

type Params = { params: Promise<{ slug: string }> };

const plain = (md: string) =>
  md.replace(/[#*_`>\[\]()!-]/g, "").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = await findBlog(slug).catch(() => null);
  if (!blog) return { title: "Blog not found", robots: { index: false } };
  const description = plain(blog.description).slice(0, 160);
  const url = `/blog/${blog.slug ?? blog._id}`;
  return {
    title: blog.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description,
      url,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: (blog.updatedAt ?? blog.createdAt).toISOString(),
      authors: [SITE_URL],
      images: [{ url: blog.image, alt: blog.title }],
    },
    twitter: { card: "summary_large_image", title: blog.title, description, images: [blog.image] },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const blog = await findBlog(slug);
  if (!blog) notFound();
  // old /blog/<id> links keep working but Google is told the keyword URL is the real one
  if (blog.slug && slug !== blog.slug) permanentRedirect(`/blog/${blog.slug}`);

  const url = `${SITE_URL}/blog/${blog.slug ?? blog._id}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: blog.title,
        description: plain(blog.description).slice(0, 160),
        image: [blog.image],
        datePublished: blog.createdAt.toISOString(),
        dateModified: (blog.updatedAt ?? blog.createdAt).toISOString(),
        wordCount: plain(blog.description).split(" ").length,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        mainEntityOfPage: url,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: blog.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen px-6 py-16 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ViewTracker id={String(blog._id)} />

      <article className="mx-auto flex max-w-3xl flex-col gap-8">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
          <Link href="/blog" className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All articles
          </Link>
        </nav>

        <header className="flex flex-col gap-5">
          <h1 className="text-3xl md:text-5xl font-bold leading-[1.1]">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/about" className="flex items-center gap-2 hover:text-[var(--color-accent)]">
              <span className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-[var(--color-border-accent)]">
                <Image src={introProfile} alt="" fill sizes="32px" className="object-cover" />
              </span>
              <span className="font-semibold text-white">{FULL_NAME}</span>
            </Link>
            <time dateTime={blog.createdAt.toISOString()} className="flex items-center gap-1.5">
              <Calendar size={14} />
              {blog.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime} min read</span>
            <span className="flex items-center gap-1.5"><Eye size={14} /> {blog.views} views</span>
          </div>
        </header>

        <div className="border-gradient relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-bg-surface">
          <Image src={blog.image} alt={blog.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--color-accent)] prose-code:text-[var(--color-accent)] prose-pre:bg-bg-elevated prose-pre:border prose-pre:border-[var(--color-border)] prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.description}</ReactMarkdown>
        </div>

        <footer className="border-gradient glass flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-border-accent)]">
            <Image src={introProfile} alt={FULL_NAME} fill sizes="56px" className="object-cover" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-white">Written by {FULL_NAME}</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Full Stack Developer &amp; Team Lead building fintech apps with React, Next.js and Node.js.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-[#0f0c09] transition-colors hover:bg-white"
          >
            Work with me
          </Link>
        </footer>
      </article>
    </main>
  );
}
