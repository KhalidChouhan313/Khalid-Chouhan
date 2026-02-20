"use client";

import { Skeleton } from "@mui/material";

export default function BlogDetailSkeleton() {
  return (
      <div className="w-[90%] mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <Skeleton
            variant="text"
            width={160}
            height={30}
            sx={{ bgcolor: "grey.800" }}
          />
        </div>

        {/* Title */}
        <Skeleton
          variant="text"
          width="80%"
          height={60}
          sx={{ bgcolor: "grey.800" }}
          className="mb-6"
        />

        {/* Image Skeleton */}
        <div className="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-lg mb-10 border border-gray-700">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: "grey.800" }}
          />
        </div>

        {/* Description */}
        <div className="mb-12 space-y-4">
          <Skeleton
            variant="text"
            width="100%"
            height={30}
            sx={{ bgcolor: "grey.800" }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={30}
            sx={{ bgcolor: "grey.800" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={30}
            sx={{ bgcolor: "grey.800" }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Skeleton
            variant="rounded"
            width={130}
            height={36}
            sx={{ bgcolor: "grey.800", borderRadius: "999px" }}
          />
          <Skeleton
            variant="rounded"
            width={100}
            height={36}
            sx={{ bgcolor: "grey.800", borderRadius: "999px" }}
          />
          <Skeleton
            variant="rounded"
            width={160}
            height={36}
            sx={{ bgcolor: "grey.800", borderRadius: "999px" }}
          />
          <Skeleton
            variant="rounded"
            width={120}
            height={36}
            sx={{ bgcolor: "grey.800", borderRadius: "999px" }}
          />
        </div>
      </div>
  );
}