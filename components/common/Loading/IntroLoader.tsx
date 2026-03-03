"use client";

import { motion } from "framer-motion";

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const text = "KHALID CHOUHAN";

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const letter = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 1 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute w-125 h-125 bg-linear-to-r from-pink-500 via-teal to-blue-500 rounded-full blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center"
      >

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-[0.3em] bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          {text.split("").map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 text-sm md:text-lg tracking-widest text-gray-400"
        >
          FULL STACK DEVELOPER
        </motion.p>
      </motion.div>
    </motion.div>
  );
}