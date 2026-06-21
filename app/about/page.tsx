"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import AboutIntro from "@/components/sections/about/AboutIntro";
import Image from "next/image";

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

          <div className="w-full lg:w-[35%] flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[360px] lg:max-w-none rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl group">
              <Image
                src="/images/hero/portfolio.png"
                fill
                sizes="(max-w-1024px) 100vw, 350px"
                alt="Khalid Chouhan Portfolio Illustration"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/65 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
