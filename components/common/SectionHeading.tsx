"use client";
import { SectionHeadingProps } from "@/types/HeroSection";
import { usePathname } from "next/navigation";
import DownArrow from "./DownArrow";

const SectionHeading = ({
  heading,
  paragraph,
  isShow,
}: SectionHeadingProps) => {
  const pathname = usePathname();
  return (
    <div className="h-auto w-full flex flex-col items-center gap-6 justify-center">
      <div className="h-auto w-full flex items-center justify-center">
        {pathname === "/" && (
          <div
            className={`w-[30%] flex items-center justify-center opacity-60 ${
              isShow ? "ml-[10%]" : "ml-[0%]"
            }`}
          >
            <DownArrow />
          </div>
        )}
        {isShow && (
          <div className="w-auto h-auto">
            <h1 className="text-5xl font-black flex items-center justify-center text-[var(--color-accent)] select-none">
              <span>&lt;</span>
              <span
                className="text-6xl inline-block"
                style={{ transform: "scaleY(1.3)" }}
              >
                /
              </span>
              <span>&gt;</span>
            </h1>
          </div>
        )}
      </div>
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          {heading}
        </h2>

        {pathname === "/" && (
          <div className="flex items-center justify-center gap-2 max-w-[200px] mx-auto mt-2">
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></span>
            <span className="flex-1 h-0.5 bg-[var(--color-accent-dark)] rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></span>
          </div>
        )}

        <p className="font-sans text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed px-6 sm:px-0">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SectionHeading;
