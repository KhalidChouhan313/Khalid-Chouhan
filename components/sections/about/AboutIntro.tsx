"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion-variants";

const AboutIntro = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-bg-elevated/40 glass rounded-2xl p-8 border border-[var(--color-border)] shadow-lg"
    >
      <motion.h3
        variants={fadeUp}
        className="text-[var(--color-accent)] font-black text-3xl tracking-tight flex items-center gap-2"
      >
        Hello <span className="inline-block animate-pulse">👋</span>
      </motion.h3>

      <motion.p
        variants={fadeUp}
        className="mt-6 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        I’m a dedicated developer who loves crafting smooth, intuitive, and
        performance-focused digital experiences. I work with a mindset of
        clean structure, solid logic, and long-term maintainability.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-4 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        Exploring new technologies, solving meaningful problems, and transforming
        ideas into functional products is what fuels my growth. Continuously
        learning and putting new knowledge into practice is an
        essential part of my daily routine.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-4 font-sans text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        If you’re searching for someone who values clarity, quality, and
        consistent improvement—I'm always open to great collaborations.
      </motion.p>
    </motion.div>
  );
};

export default AboutIntro;
