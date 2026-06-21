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
    Sparkles,
    CheckCircle2,
    Circle,
} from "lucide-react";
import { detailedSkills, skillCategories } from "./data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";
import type { DetailedSkill, SkillIcon, SkillTier } from "@/types/HeroSection";

const icons: Record<SkillIcon, React.ReactNode> = {
    Server: <Server size={30} />,
    Laptop: <Laptop size={30} />,
    Brain: <Brain size={30} />,
    Code: <Code size={30} />,
    Cloud: <Cloud size={30} />,
    Database: <Database size={30} />,
    Wrench: <Wrench size={30} />,
    TestTube: <TestTube size={30} />,
};

const tierConfig: Record<
    SkillTier,
    { label: string; icon: React.ReactNode; className: string }
> = {
    Expert: {
        label: "Expert",
        icon: <Sparkles size={12} />,
        className:
            "text-[var(--color-accent)] bg-[var(--color-accent-glow)] border-[var(--color-border-accent)]",
    },
    Proficient: {
        label: "Proficient",
        icon: <CheckCircle2 size={12} />,
        className:
            "text-[var(--color-text-secondary)] bg-bg-surface border-[var(--color-border)]",
    },
    Familiar: {
        label: "Familiar",
        icon: <Circle size={12} />,
        className:
            "text-[var(--color-text-muted)] bg-bg-surface/60 border-[var(--color-border-subtle)]",
    },
};

interface GroupedSkills {
    category: SkillIcon;
    title: string;
    skills: DetailedSkill[];
}

function groupSkillsByCategory(): GroupedSkills[] {
    return skillCategories.map((cat) => ({
        category: cat.icon,
        title: cat.title,
        skills: detailedSkills.filter((skill) => skill.category === cat.icon),
    }));
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export default function SkillSection2() {
    const grouped = groupSkillsByCategory();

    return (
        <section className="w-full mt-16 space-y-12">
            <div className="relative w-full">
                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="flex gap-4 ml-0">
                        {skillCategories.map((skill, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-0"
                            >
                                <motion.div
                                    whileHover={{
                                        y: -4,
                                        rotateX: 6,
                                        rotateY: -6,
                                    }}
                                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    className="group p-6 bg-bg-elevated/40 glass border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-2xl flex flex-col items-center gap-4 shadow-md hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
                                        {icons[skill.icon]}
                                    </div>
                                    <h3 className="text-sm md:text-base font-semibold tracking-wide text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition">
                                        {skill.title}
                                    </h3>
                                </motion.div>
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
                className="space-y-10 max-h-[65vh] overflow-y-auto pr-2 no-scrollbar"
            >
                {grouped.map((group) => {
                    if (group.skills.length === 0) return null;

                    return (
                        <motion.div key={group.category} variants={fadeUp}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[var(--color-accent)]">
                                    {icons[group.category]}
                                </span>
                                <h4 className="text-base md:text-lg font-bold text-white tracking-wide">
                                    {group.title}
                                </h4>
                                <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {group.skills.map((skill, i) => {
                                    const tier = tierConfig[skill.tier];
                                    return (
                                        <motion.div
                                            key={`${group.category}-${i}`}
                                            variants={cardVariants}
                                            whileHover={{
                                                y: -3,
                                                rotateX: 4,
                                                scale: 1.01,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 22,
                                            }}
                                            style={{ transformStyle: "preserve-3d" }}
                                            className="flex items-center justify-between gap-3 p-4 bg-bg-elevated/40 glass border border-[var(--color-border)] hover:border-[var(--color-accent-glow)] rounded-xl shadow-sm hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)]"
                                        >
                                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                                {skill.name}
                                            </span>
                                            <span
                                                className={`shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${tier.className}`}
                                            >
                                                {tier.icon}
                                                {tier.label}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}