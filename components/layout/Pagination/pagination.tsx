"use client";

import { useEffect, useRef, useState } from "react";
import { Code, EditIcon, Folder, LayoutGrid, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

interface Section {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: "home", name: "Home", icon: <LayoutGrid size={18} /> },
  { id: "about", name: "About", icon: <User size={18} /> },
  { id: "skills", name: "Skills", icon: <Code size={18} /> },
  { id: "projects", name: "Projects", icon: <Folder size={18} /> },
  { id: "blog", name: "Blog", icon: <EditIcon size={18} /> },
  { id: "contact", name: "Contact", icon: <Mail size={18} /> },
];

// shown from xl up only; app/page.tsx gives <main> an xl:px-24 gutter so content never sits under it
const Pagination = () => {
  const [active, setActive] = useState<string>("home");
  const [footerVisible, setFooterVisible] = useState(false);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const ratios = ratiosRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) {
          setActive(bestId);
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (footer) footerObserver.observe(footer);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      ratios.clear();
    };
  }, []);

  return (
    <div
      className="hidden xl:block fixed left-5 top-1/2 z-40 -translate-y-1/2"
      style={{ perspective: 900 }}
    >
      <motion.nav
        aria-label="Page sections"
        initial={{ opacity: 0, x: -24 }}
        animate={footerVisible ? { opacity: 0, x: -24, pointerEvents: "none" } : { opacity: 1, x: 0, pointerEvents: "auto" }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        style={{ transformStyle: "preserve-3d" }}
        className="border-gradient glass-strong relative flex flex-col items-center gap-1.5 rounded-full p-1.5
          shadow-[0_20px_50px_-18px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        {/* light sweep gives the pill a curved, glossy feel */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] via-transparent to-[var(--color-accent)]/[0.06]"
        />

        {sections.map((sec) => {
          const isActive = active === sec.id;
          return (
            <motion.button
              key={sec.id}
              type="button"
              onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.12, z: 24 }}
              whileTap={{ scale: 0.94 }}
              style={{ transformStyle: "preserve-3d" }}
              aria-label={`Scroll to ${sec.name}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-300",
                isActive ? "text-[#0f0c09]" : "text-[var(--color-text-muted)] hover:text-white",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sideNavActive"
                  className="absolute inset-0 rounded-full bg-[var(--color-accent)]
                    shadow-[0_0_22px_var(--color-accent-glow),0_6px_14px_-4px_rgba(0,0,0,0.6),inset_0_-2px_0_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.5)]"
                  style={{ transform: "translateZ(14px)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10" style={{ transform: "translateZ(18px)" }}>
                {sec.icon}
              </span>

              <span
                className="pointer-events-none absolute left-14 top-1/2 -translate-x-2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[var(--color-border)]
                  bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] opacity-0 shadow-lg
                  transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              >
                {sec.name}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default Pagination;
