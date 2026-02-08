import React from "react";
import DownArrow from "./DownArrow";
import { SectionHeadingProps } from "@/types/HeroSection";

const SectionHeading = ({
  heading,
  paragraph,
  isShow,
}: SectionHeadingProps) => {
  return (
    <div className="h-auto w-full flex flex-col items-center gap-8 justify-center ">
      <div className="h-auto w-full flex  items-center justify-center ">
        <div
          className={`w-[30%] flex items-center justify-center ${
            isShow ? "ml-[10%]" : "ml-[0%]"
          }`}
        >
          <DownArrow />
        </div>
        {isShow && (
          <div className="w-auto h-auto ">
            <h1 className="text-[5rem] font-black flex items-center justify-center ">
              <span className=" text-teal">
                &lt;
                <span
                  className="text-[6rem] inline-block"
                  style={{ transform: "scaleY(1.3)" }}
                >
                  /
                </span>
                &gt;
              </span>
            </h1>
          </div>
        )}
      </div>
      <div className="h-auto w-full flex  flex-col items-center justify-center ">
        <div className="h-auto w-full flex flex-col items-center justify-center">
          <div className="inline-block text-center">
            <h1 className="scroll-m-20 tracking-tight text-5xl text-teal font-mono">
              {heading}
            </h1>

            <div className="w-full flex flex-row items-center justify-center">
              <span className="w-3 h-3 bg-teal rounded-full"></span>
              <span className="flex-1 h-1 bg-teal rounded-full"></span>
              <span className="w-3 h-3 bg-teal rounded-full"></span>
            </div>
          </div>

          <p className="font-mono mt-10 font-semibold text-lg px-10 lg:px-0">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
