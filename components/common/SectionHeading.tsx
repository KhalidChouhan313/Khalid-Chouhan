"use client";
import { motion } from "framer-motion";
import { SectionHeadingProps } from "@/types/HeroSection";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

// eyebrow (heading) + big statement title + supporting paragraph
const SectionHeading = ({ heading, title, paragraph }: SectionHeadingProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className="w-full flex flex-col items-center gap-5 text-center"
  >
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      {heading}
    </span>
    <h2 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-white">
      {title ?? heading}
    </h2>
    {paragraph && (
      <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)]">
        {paragraph}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
