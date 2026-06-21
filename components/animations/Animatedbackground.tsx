"use client";

import { motion } from "framer-motion";


const AnimatedBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-bg-base pointer-events-none"
    >
      {/* Layer 1: Aurora glow orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px]
          rounded-full bg-[var(--color-accent)]/[0.07] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px]
          rounded-full bg-[var(--color-accent-dark,var(--color-accent))]/[0.06] blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[35%] left-[40%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-[var(--color-accent)]/[0.04] blur-[110px]"
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay">
        <filter id="noise-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-texture)" />
      </svg>

      {/* Bottom vignette so content near the footer doesn't float on raw glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-base to-transparent" />
    </div>
  );
};

export default AnimatedBackground;