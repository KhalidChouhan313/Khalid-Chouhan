"use client";
import { Skeleton } from "@mui/material";
const ProjectCardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
      <Skeleton variant="rectangular" height={192} className="rounded mb-4" />
      <Skeleton variant="text" height={32} width="70%" />
      <Skeleton variant="text" height={20} />
      <Skeleton variant="text" height={20} width="80%" />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
        <Skeleton variant="rounded" width={70} height={24} />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
