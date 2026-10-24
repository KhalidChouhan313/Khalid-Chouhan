"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { fadeDown } from "@/lib/motion-variants";
import { introProfile } from "@/Utils/BaseUrl";
import { cn } from "@/lib/utils/utils";

interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // close the mobile menu on navigation (render-time reset avoids an extra effect pass)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 pl-3 sm:px-4 transition-all duration-500",
          scrolled
            ? "glass-strong border-[var(--color-border-strong)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
            : "border-[var(--color-border-subtle)] bg-[#0f0c09]/40 backdrop-blur-xl",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Khalid Chouhan — home">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-border-accent)] transition-all duration-300 group-hover:ring-[var(--color-accent)]">
            <Image src={introProfile} alt="" fill sizes="40px" className="object-cover" priority />
          </span>
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Khalid<span className="text-[var(--color-accent)]">.</span>dev
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHovered(link.name)}
                className="relative rounded-full px-3.5 lg:px-4 py-2 text-sm font-medium"
              >
                {hovered === link.name && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-white",
                  )}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeHeaderNav"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-[#0f0c09] transition-colors duration-300 hover:bg-white"
          >
            Hire me
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden absolute top-full left-0 right-0 mt-2 p-3 glass-strong rounded-3xl shadow-xl flex flex-col gap-1 z-50"
            >
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "w-full block font-semibold px-4 py-3 rounded-2xl transition-all duration-200",
                        isActive
                          ? "bg-[var(--color-accent-glow)] text-[var(--color-accent)]"
                          : "text-[var(--color-text-secondary)] hover:bg-white/[0.05] hover:text-white",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-accent)] px-4 py-3 text-sm font-bold text-[#0f0c09] sm:hidden"
              >
                Hire me <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
