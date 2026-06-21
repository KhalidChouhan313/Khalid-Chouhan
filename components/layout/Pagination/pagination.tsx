"use client";

import { useEffect, useRef, useState } from "react";
import { Code, EditIcon, Folder, LayoutGrid, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

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

const Pagination = () => {
  const [active, setActive] = useState<string>("home");
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = active;
        let bestRatio = 0;
        ratiosRef.current.forEach((ratio, id) => {
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

    return () => {
      observer.disconnect();
      ratiosRef.current.clear();
    };
  }, []);

  return (
    <div className="lg:block hidden fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <motion.ul
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative p-2 flex flex-col items-center gap-3 rounded-full border border-[var(--color-border)] shadow-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {sections.map((sec) => {
          const isActive = active === sec.id;
          return (
            <li key={sec.id} className="group relative cursor-pointer list-none">
              <motion.button
                onClick={() =>
                  document.getElementById(sec.id)?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                whileHover={{ scale: 1.12, rotateY: 12 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive
                    ? "0 0 16px var(--color-accent-glow), 0 4px 12px rgba(0,0,0,0.4)"
                    : "0 0 0px rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-[#0f0c09]"
                    : "text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-surface)]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
                aria-label={`Scroll to ${sec.name}`}
                aria-current={isActive ? "true" : undefined}
              >
                {sec.icon}

                {isActive && (
                  <motion.span
                    layoutId="activePulse"
                    className="absolute inset-0 rounded-full border border-[var(--color-accent)]"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.button>

              <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 shadow-md whitespace-nowrap">
                {sec.name}
              </span>
            </li>
          );
        })}

        <div
          className="absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-[var(--color-border)] -z-10"
          aria-hidden="true"
        />
      </motion.ul>
    </div>
  );
};

export default Pagination;