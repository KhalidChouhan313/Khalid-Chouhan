"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { easings } from "@/lib/motion-variants";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-[18%] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />,
});

const ROLES = ["Full-Stack Developer", "Team Lead", "Fintech Engineer"];

const STATS = [
  { value: "2+", label: "Years of experience" },
  { value: "<300ms", label: "API responses shipped" },
  { value: "Global", label: "Fintech product (InstaPay)" },
];

const TECHS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit",
  "Angular", "Socket.IO", "Docker", "Azure", "AWS", "Tailwind CSS", "GitHub Actions",
];

const FLOATING_CHIPS = [
  { label: "Next.js", className: "top-[12%] left-[4%]", delay: 0 },
  { label: "AWS", className: "top-[10%] right-[50%]", delay: 2.4 },

  { label: "Node.js", className: "top-[20%] right-[2%]", delay: 0.8 },
  { label: "Azure", className: "bottom-[22%] left-[0%]", delay: 1.6 },
  { label: "Docker", className: "bottom-[10%] right-[8%]", delay: 2.4 },
];

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: easings.smooth },
});

const HomeContent = () => {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-6xl px-6 pt-10 pb-12 md:pt-16 lg:py-10 flex flex-col gap-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-accent)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work · Remote worldwide
          </motion.span>

          <div className="flex flex-col gap-3">
            <motion.p {...reveal(0.1)} className="text-base md:text-lg font-medium text-[var(--color-text-muted)]">
              Hey there 👋 I&apos;m
            </motion.p>
            <motion.h1
              {...reveal(0.18)}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white"
            >
              Khalid <span className="text-gradient">Chouhan</span>
            </motion.h1>
            <motion.p {...reveal(0.22)} className="text-sm text-[var(--color-text-faint)]">
              Muhammad Khalid Chouhan · also known as <span className="text-[var(--color-text-muted)]">Khalid Chouhan Gujjar</span>
            </motion.p>

            <motion.div {...reveal(0.28)} className="h-9 md:h-10 overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={ROLES[role]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: easings.smooth }}
                  className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-accent)]"
                >
                  {ROLES[role]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.p
            {...reveal(0.36)}
            className="max-w-xl text-base md:text-lg leading-relaxed text-[var(--color-text-muted)]"
          >
            I build fast, secure, production-grade web apps — from database and REST APIs to polished
            interfaces. Currently Full Stack  <span className="text-white font-medium">Engineer</span> at
            TechOn Ventures, shipping fintech features used around the world.
          </motion.p>

          <motion.div {...reveal(0.44)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-bold text-[#0f0c09] shadow-[0_10px_30px_-10px_var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Let&apos;s work together
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="/Muhammad_Khalid_Resume.pdf"
              download="Muhammad_Khalid_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white/[0.03] px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <Download size={17} /> Download CV
            </a>
          </motion.div>

          <motion.p {...reveal(0.5)} className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
            <MapPin size={13} className="text-[var(--color-accent)]" /> Based in Pakistan · working with teams worldwide
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easings.smooth }}
          className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]"
        >
          <div className="absolute inset-[12%] rounded-full bg-[var(--color-accent)]/10 blur-3xl" aria-hidden="true" />
          <HeroScene />
          {FLOATING_CHIPS.map((chip) => (
            <motion.span
              key={chip.label}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
              className={`glass pointer-events-none absolute hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg ${chip.className}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {chip.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div {...reveal(0.6)} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="border-gradient glass flex items-center gap-4 rounded-2xl px-5 py-4"
          >
            <span className="font-display text-3xl font-bold text-white">{stat.value}</span>
            <span className="text-sm leading-snug text-[var(--color-text-muted)]">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div {...reveal(0.7)} className="marquee-mask overflow-hidden" aria-label="Technologies I use">
        <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {[...TECHS, ...TECHS].map((tech, i) => (
            <span
              key={i}
              aria-hidden={i >= TECHS.length}
              className="whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white/[0.02] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomeContent;
