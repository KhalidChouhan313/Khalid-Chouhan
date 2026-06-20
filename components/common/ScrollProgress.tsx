"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById("scroll-progress");
      if (!progressBar) return;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        progressBar.style.transform = "scaleX(0)";
        return;
      }

      const progress = window.scrollY / totalHeight;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
