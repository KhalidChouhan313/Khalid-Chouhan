"use client";

import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  return (
    <section className="w-full bg-bg-base py-20 px-6 relative z-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <SectionHeading
          isShow={false}
          heading="Works"
          paragraph="I had the pleasure of building these modern web applications and solutions"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full max-w-5xl bg-bg-elevated/30 glass border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-2xl p-6 lg:p-12 flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="w-full lg:w-3/5 relative aspect-video lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-bg-surface group">
            <div className="hidden md:block absolute inset-0">
              <div className="absolute top-[10%] left-[5%] w-[80%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/projects/Dual-screen.png"
                  fill
                  alt="Desktop mockup"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-[25%] right-[5%] w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-1">
                <Image
                  src="/images/projects/Web2.jpg"
                  fill
                  alt="Web interface preview"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-[8%] left-[12%] w-[30%] aspect-[9/16] h-[180px] rounded-lg overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 group-hover:translate-y-1">
                <Image
                  src="/images/projects/image.jpg"
                  fill
                  alt="Mobile app layout"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:hidden absolute inset-0">
              <Image
                src="/images/projects/Dual-screen.png"
                fill
                alt="Projects Showcase"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/70 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="w-full lg:w-2/5 flex flex-col items-start text-left gap-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)] bg-[var(--color-accent-glow)] px-3 py-1 rounded-full border border-[var(--color-border-accent)]">
              Featured Works
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Interactive Web & Full-Stack Apps
            </h3>
            <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed font-sans">
              Discover a curated gallery of web applications, custom API solutions, and interface design works engineered with Next.js, Node.js, and modern databases.
            </p>
            
            <Link href="/projects/seeMore" className="group flex items-center gap-2.5 text-base font-bold text-[var(--color-accent)] hover:text-white transition-colors duration-300">
              <span className="relative py-1">
                Explore All Projects
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
