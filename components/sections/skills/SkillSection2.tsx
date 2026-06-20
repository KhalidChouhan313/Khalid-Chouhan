"use client";

import React from "react";
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
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const icons: Record<string, React.ReactNode> = {
    Server: <Server size={30} />,
    Laptop: <Laptop size={30} />,
    Brain: <Brain size={30} />,
    Code: <Code size={30} />,
    Cloud: <Cloud size={30} />,
    Database: <Database size={30} />,
    Wrench: <Wrench size={30} />,
    TestTube: <TestTube size={30} />,
};

export default function SkillSection2() {
    return (
        <section className="w-full mt-16 space-y-12">
            <div className="relative w-full">
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full"
                >
                    <CarouselContent className="flex gap-4 ml-0">
                        {skillCategories.map((skill, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-0"
                            >
                                <div className="group p-6 bg-bg-elevated/40 glass border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                                >
                                    <div className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
                                        {icons[skill.icon]}
                                    </div>
                                    <h3 className="text-sm md:text-base font-semibold tracking-wide text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition">
                                        {skill.title}
                                    </h3>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="hidden md:flex bg-bg-surface border-[var(--color-border)] text-white hover:bg-bg-overlay" />
                    <CarouselNext className="hidden md:flex bg-bg-surface border-[var(--color-border)] text-white hover:bg-bg-overlay" />
                </Carousel>
            </div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar"
            >
                {detailedSkills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="p-6 bg-bg-elevated/40 glass border border-[var(--color-border)] hover:border-[var(--color-accent-glow)] rounded-2xl shadow-md transition-all duration-300"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)]">
                                {skill.name}
                            </h3>
                            <span className="text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent-glow)] px-2.5 py-1 rounded-md border border-[var(--color-border-accent)]">
                                {skill.percentage}%
                            </span>
                        </div>

                        <div className="w-full h-2.5 bg-bg-surface border border-[var(--color-border-subtle)] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[var(--color-accent-dark)] to-[var(--color-accent)] rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}