import { Brain, Code, Laptop, Server } from "lucide-react";
import { detailedSkills, skillCategories } from "./data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const icons = {
    Server: <Server size={40} aria-hidden="true" />,
    Laptop: <Laptop size={40} aria-hidden="true" />,
    Brain: <Brain size={40} aria-hidden="true" />,
    Code: <Code size={40} aria-hidden="true" />,
};


export default function SkillSection2() {
    return (
        <div className="w-full mt-10">


            <div className="relative w-full">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mb-5"
                >
                    <CarouselContent className="flex gap-5 items-center ">
                        {skillCategories.map((skill, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/2 lg:basis-1/4 p-5 bg-[#1c252b] rounded-xl flex flex-col items-center gap-3 shadow-lg"
                            >
                                    {icons[skill.icon]}
                                    <h3 className="lg:text-lg text-xs lg:font-semibold font-normal">{skill.title}</h3>
                            </CarouselItem>

                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className=" no-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-6 h-[50vh] overflow-y-auto">
                {detailedSkills.map((skill, index) => (
                    <div key={index} className="p-4 bg-[#1c252b] rounded-xl shadow-lg">
                        <h3 className="mb-2">{skill.name}</h3>
                        <div className="w-full h-2 bg-gray-700 rounded-full">
                            <div
                                className="h-2 bg-teal-400 rounded-full"
                                style={{ width: `${skill.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
