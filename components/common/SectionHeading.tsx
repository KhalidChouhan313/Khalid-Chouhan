"use client";
import { SectionHeadingProps } from "@/types/HeroSection";
import { usePathname, } from "next/navigation";
import DownArrow from "./DownArrow";
import path from "path";

const SectionHeading = ({
  heading,
  paragraph,
  isShow,
}: SectionHeadingProps) => {
  const pathname = usePathname();
  return (
    <div className="h-auto w-full flex flex-col items-center gap-8 justify-center ">
      <div className="h-auto w-full flex  items-center justify-center ">
        {
          pathname === "/" && (
            <div
              className={`w-[30%] flex items-center justify-center ${isShow ? "ml-[10%]" : "ml-[0%]"
                }`}
            >
              <DownArrow />
            </div>
          )
        }
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
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-teal tracking-tight">
          {heading}
        </h2>

        {pathname === "/" && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-3 h-3 bg-teal rounded-full animate-pulse"></span>
            <span className="flex-1 h-1 bg-teal rounded-full"></span>
            <span className="w-3 h-3 bg-teal rounded-full animate-pulse"></span>
          </div>
        )}

        <p
          className={`font-mono text-gray-300 text-base sm:text-lg md:text-xl font-medium px-6 sm:px-0`}
        >
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SectionHeading;
