"use client";
import { GetBlog, PatchBlog } from "@/lib/api/blogs";
import { BlogResponse } from "@/lib/types/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBlogs = () => {
  return useQuery<BlogResponse>({
    queryKey: ["blogs"],
    queryFn: GetBlog,
  });
};


export const useIncrementView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PatchBlog(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] });

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};