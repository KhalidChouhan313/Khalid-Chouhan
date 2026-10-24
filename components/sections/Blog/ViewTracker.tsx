"use client";

import { useEffect } from "react";
import { useIncrementView } from "@/hooks/useBlog";

// counts one view per browser per post; the page itself is server-rendered
export default function ViewTracker({ id }: { id: string }) {
  const { mutate } = useIncrementView();

  useEffect(() => {
    try {
      const viewed: string[] = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");
      if (viewed.includes(id)) return;
      localStorage.setItem("viewedBlogs", JSON.stringify([...viewed, id]));
    } catch {
      // storage blocked: still count the view
    }
    mutate(id);
  }, [id, mutate]);

  return null;
}
