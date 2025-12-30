import DownArrow from "@/components/common/DownArrow";
import AboutIntro from "@/components/sections/about/AboutIntro";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div
      className="h-auto flex flex-col items-center justify-center
     gap-5 w-full py-12"
    >
      <div className="w-[90%]">
        <DownArrow />

        <div className="flex w-full items-end md:flex-row flex-col justify-between gap-10">
          <div className="md:w-[55%] w-[90%] md:h-[70vh] h-auto 
          flex flex-col justify-between items-start md:gap-0 gap-5 md:mt-0 mt-10 ">
            <div className="w-full flex items-start">
              <Button
                className="border border-teal bg-[#1e242b] px-6 py-3 
          rounded-tl-2xl rounded-br-2xl font-bold text-teal shadow-md
          hover:bg-teal hover:text-black transition-all duration-300"
              >
                About Me
              </Button>
            </div>
            <AboutIntro />
          </div>
          <Image
            src="/images/hero/portfolio.png"
            width={350}
            height={350}
            alt="Portfolio Illustration"
            className="md:w-[30%] w-[90%]  md:h-[70vh] h-[30vh] object-cover rounded-xl shadow-xl border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
