"use client";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const IntroCard = () => {
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
  const linkCopy = () => {
    navigator.clipboard.writeText("https://www.devkhalidchouhan.com");
    toast.success("Website link copied to clipboard!");
  };
  return (
    <div
      className="relative bg-[#1c252b] text-white p-6 rounded border-[3px]
    border-teal-400 shadow-xl 
    rounded-tl-[120px] rounded-br-[50px]"
    >
      <div className="flex justify-center mb-4">
        <div className="w-28 h-28 bg-white rounded-full p-1 shadow-md overflow-hidden flex items-center justify-center">
          <Image
            src="/images/hero/Gemini_Generated_Image_bk4elibk4elibk4e.png"
            alt="Developer"
            width={112}
            height={112}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold uppercase">
        Khalid Chouhan{" "}
      </h2>

      <p className="text-center text-gray-300 text-sm mb-4">
        Full-stack Developer
      </p>

      <div className="space-y-2 text-sm">
        <Link
          href="mailto:khalidchuhan7886@gmail.com"
          className="flex items-center gap-2"
        >
          📧 khalidchuhan7886@gmail.com
        </Link>

        <p className="flex items-center gap-2">📍 Pakistan</p>
        <p className="flex items-center gap-2">💼 Full-time / Freelancer</p>
        <p
          onClick={linkCopy}
          className="flex items-center gap-2 cursor-pointer"
        >
          🌐 www.devkhalidchouhan.com
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <Carousel className="w-full overflow-x-auto no-scrollbar">
          <CarouselContent className="flex -gap-4 w-max">
            {techs.map((tech, index) => (
              <CarouselItem key={index} className="flex-none cursor-pointer">
                <span
                  className={`px-3 py-1 rounded-full text-black text-xs ${
                    tech === "NodeJS" ? "bg-teal" : "bg-teal"
                  }`}
                >
                  {tech}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex justify-center mt-5">
        <Button className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 shadow-md hover:bg-gray-100 cursor-pointer">
          Download CV <Download size={20} className="font-black" />
        </Button>
      </div>
    </div>
  );
};

export default IntroCard;
