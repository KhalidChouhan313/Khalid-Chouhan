"use client";

const BlogSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-bg-elevated/40">
        <div className="skeleton aspect-[16/9] w-full rounded-none" />
        <div className="flex flex-col gap-3 p-6">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-4/5" />
          <div className="skeleton mt-3 h-4 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default BlogSkeleton;
