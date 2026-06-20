"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown } from "@/lib/motion-variants";

interface NavLink {
  name: string;
  href: string;
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-bg-base/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="text-[var(--color-accent)] font-extrabold transition-transform duration-300 group-hover:scale-110">&lt;K/&gt;</span>
            <span className="text-white group-hover:text-[var(--color-text-secondary)] transition-colors duration-300">KHALID CHOUHAN</span>
          </Link>
        </h2>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full right-6 left-6 mt-2 p-6 glass-strong rounded-2xl shadow-xl flex flex-col gap-4 z-50"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`w-full font-semibold px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-border-accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
