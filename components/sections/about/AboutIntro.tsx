"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion-variants";
import { Sparkles, Target, Layers } from "lucide-react";

interface Highlight {
  icon: React.ReactNode;
  text: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <Layers size={14} />,
    text: "Shipped a fintech app (InstaPay) with multilingual support & 25% faster API load",
  },
  {
    icon: <Target size={14} />,
    text: "Frontend-first, full-stack capable — comfortable owning a feature end to end",
  },
  {
    icon: <Sparkles size={14} />,
    text: "Built Asani Bond, a real OCR-powered prize bond checker, solo",
  },
];

const AboutIntro = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative w-full bg-bg-elevated/40 glass rounded-2xl p-8 border border-[var(--color-border)] shadow-lg overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 bg-[var(--color-accent)]/10 blur-3xl rounded-full"
      />

      <motion.h3
        variants={fadeUp}
        className="relative text-[var(--color-accent)] font-black text-3xl tracking-tight flex items-center gap-2"
      >
        Hello, I&apos;m Khalid{" "}
        <motion.span
          animate={{ rotate: [0, 14, -8, 14, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
          className="inline-block origin-[70%_70%]"
        >
          👋
        </motion.span>
      </motion.h3>

      <motion.p
        variants={fadeUp}
        className="relative mt-6 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        I&apos;m a Full Stack Developer based in Karachi, currently building
        features for a fintech product at{" "}
        <span className="text-white font-semibold">Tech Onventeurs</span>.
        My core strength is frontend — turning interfaces into something that
        feels fast, deliberate, and easy to use — but I&apos;m equally
        comfortable working through the backend logic that makes a feature
        actually work.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="relative mt-4 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        I started in Mansehra, finished my intermediate studies in Karachi,
        and I&apos;m currently completing my BSCS at Virtual University while
        working full-time — which has taught me to be deliberate with my
        time and ruthless about what actually moves a project forward.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="relative mt-4 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        Outside of client work, I build my own products end-to-end — partly
        to learn, partly because I like seeing an idea become something
        people actually use. If you value clear communication and steady
        execution over noise, I&apos;m always open to a good collaboration.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="relative mt-6 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col gap-2.5"
      >
        {HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
            className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
          >
            <span className="mt-0.5 shrink-0 text-[var(--color-accent)]">
              {item.icon}
            </span>
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro;