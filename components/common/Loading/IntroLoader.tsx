"use client";

import { motion } from "framer-motion";
import { staggerContainer, letterReveal } from "@/lib/motion-variants";

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const text = "KHALID CHOUHAN";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[9999] bg-bg-base flex items-center justify-center overflow-hidden px-6 select-none"
    >
      {/* Subtle Teal Ambient Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.08 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] bg-[var(--color-accent)] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 text-center">
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] bg-gradient-to-r from-white via-[var(--color-text-secondary)] to-[var(--color-text-muted)] bg-clip-text text-transparent"
        >
          {text.split("").map((char, i) => (
            <motion.span key={i} variants={letterReveal} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Responsive Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          className="mt-5 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-text-faint)] font-bold font-sans uppercase"
        >
          Full Stack Developer
        </motion.p>
      </div>
    </motion.div>
  );
}