"use client";

import React, { useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { easings } from "@/lib/motion-variants";
import { cn } from "@/lib/utils/utils";
import type { SkillIcon, SkillTier } from "@/types/HeroSection";

const icons: Record<SkillIcon, React.ReactNode> = {
    Server: <Server size={18} />,
    Laptop: <Laptop size={18} />,
    Brain: <Brain size={18} />,
    Code: <Code size={18} />,
    Cloud: <Cloud size={18} />,
    Database: <Database size={18} />,
    Wrench: <Wrench size={18} />,
    TestTube: <TestTube size={18} />,
};

const tierConfig: Record<SkillTier, { icon: React.ReactNode; level: number; className: string }> = {
    Expert: {
        icon: <Sparkles size={12} />,
        level: 3,
        className: "text-[var(--color-accent)] bg-[var(--color-accent-glow)] border-[var(--color-border-accent)]",
    },
    Proficient: {
        icon: <CheckCircle2 size={12} />,
        level: 2,
        className: "text-[var(--color-text-secondary)] bg-bg-surface border-[var(--color-border)]",
    },
    Familiar: {
        icon: <Circle size={12} />,
        level: 1,
        className: "text-[var(--color-text-muted)] bg-bg-surface/60 border-[var(--color-border-subtle)]",
    },
};

const categories = skillCategories.filter((cat) => detailedSkills.some((s) => s.category === cat.icon));

export default function SkillSection2() {
    const [active, setActive] = useState<SkillIcon>(categories[0].icon);
    const skills = detailedSkills.filter((s) => s.category === active);

    return (
        <section className="w-full flex flex-col gap-8">
            <div
                role="tablist"
                aria-label="Skill categories"
                className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            >
                {categories.map((cat) => {
                    const isActive = cat.icon === active;
                    return (
                        <button
                            key={cat.icon}
                            role="tab"
                            type="button"
                            aria-selected={isActive}
                            onClick={() => setActive(cat.icon)}
                            className={cn(
                                "relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                                isActive
                                    ? "text-[#0f0c09]"
                                    : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-accent)] hover:text-white",
                            )}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="skillTab"
                                    className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10">{icons[cat.icon]}</span>
                            <span className="relative z-10 whitespace-nowrap">{cat.title}</span>
                        </button>
                    );
                })}
            </div>

            <div role="tabpanel" className="border-gradient glass rounded-3xl p-5 sm:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: easings.smooth }}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {skills.map((skill, i) => {
                            const tier = tierConfig[skill.tier];
                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.3 }}
                                    whileHover={{ y: -3 }}
                                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-bg-elevated/50 p-4 transition-colors duration-300 hover:border-[var(--color-border-accent)]"
                                >
                                    <div className="flex min-w-0 flex-col gap-2">
                                        <span className="truncate text-sm font-semibold text-white">{skill.name}</span>
                                        <span className="flex gap-1" aria-hidden="true">
                                            {[1, 2, 3].map((n) => (
                                                <span
                                                    key={n}
                                                    className={cn(
                                                        "h-1 w-6 rounded-full",
                                                        n <= tier.level ? "bg-[var(--color-accent)]" : "bg-white/10",
                                                    )}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                    <span
                                        className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tier.className}`}
                                    >
                                        {tier.icon}
                                        {skill.tier}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
