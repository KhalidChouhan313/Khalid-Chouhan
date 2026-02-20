"use client";

import { Skeleton } from "@mui/material";

export default function ProjectCardSkeleton() {
  return (
    <div
      className="relative p-6 rounded-2xl bg-gray-800 border border-gray-700
      transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden mb-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: "grey.800" }}
          className="rounded"
        />
      </div>

      {/* Title */}
      <Skeleton
        variant="text"
        width="70%"
        height={40}
        sx={{ bgcolor: "grey.800" }}
        className="mb-3"
      />

      {/* Description */}
      <Skeleton
        variant="text"
        width="100%"
        height={25}
        sx={{ bgcolor: "grey.800" }}
      />
      <Skeleton
        variant="text"
        width="90%"
        height={25}
        sx={{ bgcolor: "grey.800" }}
        className="mb-4"
      />

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={70}
            height={28}
            sx={{ bgcolor: "grey.800", borderRadius: "999px" }}
          />
        ))}
      </div>

      {/* Arrow Icon */}
      <div className="absolute top-6 right-4">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
      </div>
    </div>
  );
}