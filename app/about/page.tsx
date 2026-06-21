"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerContainer } from "@/lib/motion-variants";
import AboutIntro from "@/components/sections/about/AboutIntro";
import Image from "next/image";

interface StatBadge {
  label: string;
  value: string;
}

const STAT_BADGES: StatBadge[] = [
  { label: "Experience", value: "1+ Yr" },
  { label: "Focus", value: "Full Stack" },
  { label: "Based in", value: "Karachi, PK" },
];

const About = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-12 w-full"
      >
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            My Story
          </h2>
          <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mt-1" />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12">
          <div className="w-full lg:w-[60%] flex flex-col justify-center">
            <AboutIntro />
          </div>

          <div className="w-full lg:w-[35%] flex flex-col items-center justify-center gap-5">
            <motion.div
              whileHover={{ rotateY: 6, rotateX: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full aspect-[4/5] max-w-[360px] lg:max-w-none rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] group"
            >
              <Image
                src="/images/hero/portfolio.png"
                fill
                sizes="(max-w-1024px) 100vw, 350px"
                alt="Khalid Chouhan Portfolio Illustration"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/70 via-bg-base/10 to-transparent pointer-events-none" />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--color-accent)]/20 blur-3xl rounded-full"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-3 gap-2 w-full max-w-[360px] lg:max-w-none"
            >
              {STAT_BADGES.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center justify-center gap-0.5 py-3 px-2
                    bg-bg-elevated/40 glass border border-[var(--color-border)]
                    rounded-xl text-center"
                >
                  <span className="text-sm font-bold text-[var(--color-accent)]">
                    {badge.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;