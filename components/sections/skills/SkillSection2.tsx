"use client";

import { motion } from "framer-motion";
import { Layers, Wrench } from "lucide-react";
import { SKILL_GROUPS } from "./data";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

const ICONS = [<Layers key="primary" size={20} />, <Wrench key="also" size={20} />];

export default function SkillSection2() {
    return (
        <section className="grid w-full gap-6 lg:grid-cols-2">
            {SKILL_GROUPS.map((group, gi) => (
                <motion.div
                    key={group.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ delay: gi * 0.1 }}
                    className="border-gradient glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)]">
                            {ICONS[gi]}
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-white">{group.title}</h3>
                            <p className="text-sm text-[var(--color-text-muted)]">{group.description}</p>
                        </div>
                    </div>

                    <ul className="flex flex-wrap gap-2.5">
                        {group.skills.map((skill, i) => (
                            <motion.li
                                key={skill}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                                whileHover={{ y: -3 }}
                                className="rounded-full border border-[var(--color-border)] bg-bg-elevated/50 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                            >
                                {skill}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </section>
    );
}
