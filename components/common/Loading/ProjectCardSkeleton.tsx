"use client";

export default function ProjectCardSkeleton() {
  return (
    <div className="relative p-6 rounded-2xl bg-bg-elevated/40 glass border border-[var(--color-border)] shadow-md flex flex-col justify-between h-[380px]">
      <div>
        {/* Image */}
        <div className="h-48 w-full skeleton rounded-xl mb-5" />

        {/* Title */}
        <div className="h-6 skeleton w-2/3 rounded-md mb-3" />

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-4 skeleton w-full rounded-md" />
          <div className="h-4 skeleton w-4/5 rounded-md" />
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-7 skeleton w-16 rounded-full" />
        ))}
      </div>

      {/* Icon skeleton */}
      <div className="absolute top-6 right-6">
        <div className="h-8 skeleton w-8 rounded-full" />
      </div>
    </div>
  );
}