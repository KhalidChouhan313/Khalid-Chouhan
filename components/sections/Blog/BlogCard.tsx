import { Blog as BlogTypes } from "@/lib/types/blogs";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  data: BlogTypes;
}

const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <div className="w-full flex lg:flex-row flex-col items-stretch justify-start border-b border-[var(--color-border-subtle)] py-8 gap-8 group">
      <div className="w-full lg:w-64 h-44 relative shrink-0 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-bg-surface">
        <Image
          src={data?.image}
          alt={data?.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between py-1 gap-4 flex-1">
        <div className="space-y-2">
          <Link href={`/blog/${data?._id}`}>
            <h3 className="text-white group-hover:text-[var(--color-accent)] text-xl font-black tracking-tight transition-colors duration-300">
              {data?.title}
            </h3>
          </Link>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-sans line-clamp-2">
            {data?.description.replace(/<[^>]*>/g, '').slice(0, 180)}...
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <Link
            href={`/blog/${data?._id}`}
            className="text-[var(--color-accent)] hover:text-white font-bold text-sm flex items-center gap-1 transition-colors duration-200"
          >
            <span>Read More</span>
            <ChevronsRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <div className="flex flex-wrap items-center gap-3.5 text-xs text-[var(--color-text-faint)] font-medium">
            <span className="bg-bg-surface border border-[var(--color-border-subtle)] px-2.5 py-1 rounded-full text-[var(--color-text-muted)] font-semibold">
              Web Development
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
            <span>{data?.views} views</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
            <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
            <span>{data?.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
