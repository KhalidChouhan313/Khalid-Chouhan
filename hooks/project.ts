"use client"
import { getProjectBySlug, getProjects } from "@/lib/api/project";
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
export const UseProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug,
  });
};