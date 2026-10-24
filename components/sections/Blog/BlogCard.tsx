import { Blog as BlogTypes } from "@/lib/types/blogs";
import { ArrowUpRight, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  data: BlogTypes;
}

// strip html tags and markdown syntax for the plain-text excerpt
const excerpt = (text: string) =>
  text
    .replace(/<[^>]*>/g, "")
    .replace(/[#*_`>~-]+/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

const BlogCard = ({ data }: BlogCardProps) => (
  <Link
    href={`/blog/${data.slug ?? data._id}`}
    className="border-gradient group flex h-full flex-col overflow-hidden rounded-3xl bg-bg-elevated/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(94,234,212,0.3)]"
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-surface">
      {data.image && (
        <Image
          src={data.image}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#0f0c09]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
        {new Date(data.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-6">
      <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[var(--color-accent)]">
        {data.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{excerpt(data.description)}…</p>

      <div className="mt-auto flex items-center justify-between pt-3 text-xs text-[var(--color-text-faint)]">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Clock size={13} /> {data.readTime} min read</span>
          <span className="flex items-center gap-1"><Eye size={13} /> {data.views}</span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-[var(--color-accent)]">
          Read <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  </Link>
);

export default BlogCard;
