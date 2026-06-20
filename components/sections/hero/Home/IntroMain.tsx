"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { staggerContainer, wordReveal } from "@/lib/motion-variants";

const IntroMain = () => {
  const headingText = "I'm Khalid Chouhan";
  const words = headingText.split(" ");

  return (
    <div className="w-full flex flex-col items-start text-left">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-muted)]"
      >
        Hey there
      </motion.span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1"
      >
        {words.map((word, idx) => (
          <motion.h2
            key={idx}
            variants={wordReveal}
            className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
          >
            {word}
          </motion.h2>
        ))}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-lg md:text-xl font-bold text-[var(--color-accent)] mt-2"
      >
        Full-Stack Developer
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-5 text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] font-normal font-sans"
      >
        I build high-performance, responsive web applications that convert ideas into seamless digital experiences. Specializing in frontend design systems, scalable backend architectures, and elegant user flows.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="w-full mt-6"
      >
        <Link href="/contact" className="block w-full">
          <button
            className="w-full border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0f0c09] text-[var(--color-accent)] font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer text-sm"
          >
            <span>Let's Talk</span>
            <Mail size={16} className="stroke-[2.5]" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default IntroMain;
