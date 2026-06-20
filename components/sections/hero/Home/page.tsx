"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import IntroCard from "./IntroCard";
import IntroMain from "./IntroMain";

const HomeContent = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="h-auto w-full max-w-6xl px-6 flex items-center justify-center gap-8 flex-col py-12 md:py-20"
    >
      <div className="w-full flex items-center justify-center mb-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white select-none">
          Developer
        </h1>
      </div>
      <div className="w-full flex items-stretch justify-between gap-8 md:flex-row flex-col">
        {/* Profile Card Column */}
        <div className="md:w-[32%] w-full flex">
          <IntroCard />
        </div>

        {/* Intro/About Main Text Column */}
        <div className="md:w-[36%] w-full flex items-center">
          <IntroMain />
        </div>

        {/* Stats Column */}
        <div className="md:w-[32%] w-full flex">
          <div className="w-full bg-bg-elevated/40 glass rounded-2xl p-8 border border-[var(--color-border)] shadow-xl flex flex-col justify-around gap-6">
            <div className="flex items-center gap-6 py-4 border-b border-[var(--color-border-subtle)]">
              <span className="text-5xl md:text-6xl font-black text-white">10</span>
              <p className="text-sm font-medium text-[var(--color-text-muted)] leading-snug">
                Programming <br />
                <span className="text-[var(--color-text-secondary)] font-semibold">Languages</span>
              </p>
            </div>
            <div className="flex items-center gap-6 py-4 border-b border-[var(--color-border-subtle)]">
              <span className="text-5xl md:text-6xl font-black text-[var(--color-accent)]">6</span>
              <p className="text-sm font-medium text-[var(--color-text-muted)] leading-snug">
                Development <br />
                <span className="text-[var(--color-text-secondary)] font-semibold">Tools & Libs</span>
              </p>
            </div>
            <div className="flex items-center gap-6 py-4">
              <span className="text-5xl md:text-6xl font-black text-white">1</span>
              <p className="text-sm font-medium text-[var(--color-text-muted)] leading-snug">
                Year Of <br />
                <span className="text-[var(--color-text-secondary)] font-semibold">Experience</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeContent;
