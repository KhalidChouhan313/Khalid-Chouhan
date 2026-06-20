"use client";

import Pagination from "@/components/layout/Pagination/pagination";
import HomeHomeContent from "../components/sections/hero/Home/page";
import About from "./about/page";
import Skills from "./skills/page";
import Blog from "./blog/page";
import Contact from "./contact/page";
import Projects from "./projects/page";
import ChatsIcon from "@/components/common/Chat/ChatsIcon";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

export default function Home() {
  return (
    <div className="h-full w-full flex justify-center items-center relative bg-bg-base">
      <Pagination />
      <ChatsIcon />

      <main className="w-full flex flex-col items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          id="home"
          className="lg:h-screen h-auto bg-transparent w-full flex items-center justify-center"
        >
          <HomeHomeContent />
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          id="about"
          className="h-auto w-full px-4 relative z-0 flex items-start justify-center"
        >
          <About />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          id="skills"
          className="h-auto w-full px-4 relative z-0 flex items-start justify-center"
        >
          <Skills />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          id="projects"
          className="h-auto bg-transparent w-full flex items-center justify-center"
        >
          <Projects />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          id="blog"
          className="h-auto bg-transparent w-full flex items-center justify-center"
        >
          <Blog />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          id="contact"
          className="h-auto bg-transparent w-full flex items-center justify-center"
        >
          <Contact />
        </motion.section>
      </main>
    </div>
  );
}
