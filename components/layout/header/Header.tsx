"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { fadeDown } from "@/lib/motion-variants";

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
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      animate={{
        height: scrolled ? 64 : 80,
        boxShadow: scrolled
          ? "0 8px 32px -8px rgba(0,0,0,0.55)"
          : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 w-full z-50 bg-transparent backdrop-blur-2xl border-b border-[var(--color-border-subtle)] rounded-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ opacity: scrolled ? 0.5 : 0.15 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">
          <Link href="/" className="group flex items-center gap-1.5">
            <motion.span
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-[var(--color-accent)] font-extrabold inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              &lt;K/&gt;
            </motion.span>
            <span className="text-white group-hover:text-[var(--color-text-secondary)] transition-colors duration-300">
              KHALID CHOUHAN
            </span>
          </Link>
        </h2>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold rounded-lg group/navlink"
              >
                <motion.span
                  className="absolute inset-0 rounded-lg bg-[var(--color-accent-glow)] opacity-0 group-hover/navlink:opacity-100"
                  transition={{ duration: 0.25 }}
                />
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] group-hover/navlink:text-white"
                  }`}
                >
                  {link.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeHeaderNav"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
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
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full right-6 left-6 mt-2 p-6 glass-strong rounded-2xl shadow-xl flex flex-col gap-2 z-50"
          >
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className={`w-full block font-semibold px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-border-accent)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;