"use client";

import { useEffect, useState } from "react";
import { Code, EditIcon, Folder, LayoutGrid, Mail, User } from "lucide-react";

interface Section {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const Pagination = () => {
  const [active, setActive] = useState<string>("home");

  const sections: Section[] = [
    { id: "home", name: "Home", icon: <LayoutGrid size={18} /> },
    { id: "about", name: "About", icon: <User size={18} /> },
    { id: "skills", name: "Skills", icon: <Code size={18} /> },
    { id: "projects", name: "Projects", icon: <Folder size={18} /> },
    { id: "blog", name: "Blog", icon: <EditIcon size={18} /> },
    { id: "contact", name: "Contact", icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -40% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="lg:block hidden fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <ul
        className="glass p-2 flex flex-col items-center gap-3 rounded-full border border-[var(--color-border)] shadow-lg"
      >
        {sections.map((sec) => {
          const isActive = active === sec.id;
          return (
            <li
              key={sec.id}
              onClick={() =>
                document.getElementById(sec.id)?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="group relative cursor-pointer"
            >
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-[#0f0c09] scale-110 shadow-[0_0_12px_var(--color-accent-glow)]"
                    : "text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-surface)] hover:scale-105"
                }`}
                aria-label={`Scroll to ${sec.name}`}
              >
                {sec.icon}
              </button>

              {/* Tooltip */}
              <span
                className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 shadow-md whitespace-nowrap"
              >
                {sec.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
