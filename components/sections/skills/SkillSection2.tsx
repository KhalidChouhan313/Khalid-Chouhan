"use client";

import {
    Brain,
    Code,
    Laptop,
    Server,
    Cloud,
    Database,
    Wrench,
    TestTube,
} from "lucide-react";
import { detailedSkills, skillCategories } from "./data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const icons: Record<string, JSX.Element> = {
    Server: <Server size={36} />,
    Laptop: <Laptop size={36} />,
    Brain: <Brain size={36} />,
    Code: <Code size={36} />,
    Cloud: <Cloud size={36} />,
    Database: <Database size={36} />,
    Wrench: <Wrench size={36} />,
    TestTube: <TestTube size={36} />,
};

export default function SkillSection2() {
    return (
        <section className="w-full mt-16 space-y-12">
            <div className="relative w-full">
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full"
                >
                    <CarouselContent className="flex gap-6 items-center">
                        {skillCategories.map((skill, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/2 lg:basis-1/4"
                            >
                                <div className="group p-6 bg-linear-to-br from-[#1c252b] to-[#111827] 
                  border border-gray-700 hover:border-teal-400 
                  rounded-2xl flex flex-col items-center gap-4 
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="text-teal-400 group-hover:scale-110 transition-transform duration-300">
                                        {icons[skill.icon]}
                                    </div>
                                    <h3 className="text-sm lg:text-lg font-semibold tracking-wide text-gray-200 group-hover:text-teal-400 transition">
                                        {skill.title}
                                    </h3>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar">
                {detailedSkills.map((skill, index) => (
                    <div
                        key={index}
                        className="p-5 bg-linear-to-br from-[#1c252b] to-[#111827] 
              border border-gray-700 hover:border-teal-400 
              rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm lg:text-base font-medium text-gray-200">
                                {skill.name}
                            </h3>
                            <span className="text-xs text-teal-400 font-semibold">
                                {skill.percentage}%
                            </span>
                        </div>

                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-linear-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-700"
                                style={{ width: `${skill.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}