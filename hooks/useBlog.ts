"use client";
import { GetBlog } from "@/lib/api/blogs";
import { BlogResponse } from "@/lib/types/blogs";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = () => {
  return useQuery<BlogResponse>({
    queryKey: ["blogs"],
    queryFn: GetBlog,
  });
};
