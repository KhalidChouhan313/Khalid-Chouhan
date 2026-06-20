"use client";

import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProfileImage } from "@/Utils/BaseUrl";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const IntroCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const techs = [
    "MongoDB",
    "Express",
    "React",
    "NodeJS",
    "TypeScript",
    "NextJS",
    "TailwindCSS",
    "GraphQL",
    "Docker",
    "AWS",
    "Git",
    "Figma",
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Muhammad_Khalid_Resume.pdf";
    link.download = "Muhammad_Khalid_Resume.pdf";
    link.click();
  };

  const linkCopy = () => {
    navigator.clipboard.writeText("https://khalid-chouhan.vercel.app");
    toast.success("Website link copied to clipboard!");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-spotlight relative w-full bg-bg-elevated/40 glass text-white p-8 rounded-2xl border border-[var(--color-border)] shadow-xl flex flex-col gap-6"
    >
      <div className="flex justify-center">
        <p className="hidden">
          Khalid Chouhan is a Full Stack Web Developer from Pakistan specializing in
          React, Next.js, Node.js, and modern web technologies.
        </p>
        <div className="w-28 h-28 rounded-full border border-[var(--color-border-strong)] p-1 bg-bg-surface/50 overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src={ProfileImage}
            alt="Khalid Chouhan Full Stack Developer"
            width={112}
            height={112}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
          Khalid Chouhan
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1.5 font-medium">
          Full-stack Developer
        </p>
      </div>

      <div className="space-y-3 text-sm text-[var(--color-text-secondary)] border-y border-[var(--color-border-subtle)] py-5">
        <Link
          href="mailto:khalidchuhan7886@gmail.com"
          className="flex items-center gap-2.5 hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          <span>📧</span> <span className="hover:underline">khalidchuhan7886@gmail.com</span>
        </Link>
        <p className="flex items-center gap-2.5">
          <span>📍</span> <span>Pakistan</span>
        </p>
        <p className="flex items-center gap-2.5">
          <span>💼</span> <span>Full-time / Freelancer</span>
        </p>
        <p
          onClick={linkCopy}
          className="flex items-center gap-2.5 cursor-pointer hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          <span>🌐</span> <span className="hover:underline">www.devkhalidchouhan.com</span>
        </p>
      </div>

      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent className="flex gap-2 ml-0">
            {techs.map((tech, index) => (
              <CarouselItem key={index} className="flex-none pl-0 cursor-pointer">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-bg-surface border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-border)] transition-all duration-200">
                  {tech}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex justify-center mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="bg-[var(--color-accent)] text-[#0f0c09] px-7 py-3 rounded-full flex items-center gap-2 font-bold shadow-md hover:bg-[var(--color-accent-dim)] cursor-pointer transition-colors duration-300"
        >
          <span>Download CV</span> <Download size={18} className="stroke-[2.5]" />
        </motion.button>
      </div>
    </div>
  );
};

export default IntroCard;
