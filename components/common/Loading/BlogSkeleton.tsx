"use client";

const BlogSkeleton = () => {
  return (
    <div className="w-full md:w-[70%] w-[90%] space-y-8">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="bg-bg-elevated/40 glass p-6 rounded-2xl border border-[var(--color-border)] shadow-md flex flex-col md:flex-row gap-6"
        >
          {/* Image skeleton */}
          <div className="w-full md:w-64 h-44 skeleton rounded-xl shrink-0" />

          {/* Text content skeleton */}
          <div className="flex flex-col justify-between py-1 gap-4 flex-1">
            <div className="space-y-3">
              {/* Title */}
              <div className="h-6 skeleton w-3/4 rounded-md" />
              {/* Description lines */}
              <div className="h-4 skeleton w-full rounded-md" />
              <div className="h-4 skeleton w-[90%] rounded-md" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              {/* Read more link skeleton */}
              <div className="h-4 skeleton w-24 rounded-md" />

              {/* Metadata tags skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-6 skeleton w-28 rounded-full" />
                <div className="h-4 skeleton w-12 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;