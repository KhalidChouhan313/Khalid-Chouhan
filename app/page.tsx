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

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };
  return (
    <div
      className=" h-full w-full flex justify-center
     items-center relative "
    >
      <Pagination />
      <ChatsIcon />

      <main className="w-full flex flex-col items-center ">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          viewport={{ once: false, amount: 0.2 }}
          id="home"
          className="lg:h-screen h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <HomeHomeContent />

        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          id="about"
          style={{
            backgroundImage: `url('/images/hero/aboutbg.avif')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="h-auto w-full px-4  relative z-0
          flex items-start justify-center
          "
        >
          <About />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          id="skills"
          style={{
            backgroundImage: `url('/images/hero/bg.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="rela h-auto w-full px-4  relative z-0
          flex items-start justify-center 
          "
        >
          <div
            className="absolute  inset-0 bg-cover bg-center bg-fixed
             filter  top-0 bottom-0 h-full"
            style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
          ></div>

          <div
            className="absolute inset-0 bg-black/85 top-0
           bottom-0 h-full "
          ></div>
          <div
            className="w-full relative z-10 text-white
           flex items-center justify-center"
          >
            <Skills />
          </div>
        </motion.section>
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          id="projects"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Projects />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          id="blog"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Blog />
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          id="contact"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Contact />
        </motion.section>
      </main>
    </div>
  );
}
