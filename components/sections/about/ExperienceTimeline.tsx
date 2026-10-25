"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { viewportOnce } from "@/lib/motion-variants";

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "TechOn Ventures",
    period: "Jan 2025 — Present",
    current: true,
    points: [
      "Build InstaPay, a global fintech platform covering international transfers, virtual cards, QR payments, invoicing and multi-channel withdrawals.",
      "Work on the InstaPay Agency Panel across frontend and backend.",
      "Develop REST APIs and authentication flows; improved API response times to under 300ms on key endpoints.",
      "Own the admin panel: new features, integrations and production issue resolution.",
    ],
  },
  {
    role: "Frontend Development Intern",
    company: "Devsinz · Remote",
    period: "Aug 2024 — Dec 2024",
    points: [
      "Built pixel-perfect, responsive React + Tailwind components; +15% user engagement.",
      "Worked in Agile sprints on debugging and cross-browser compatibility.",
    ],
  },
];

const ExperienceTimeline = () => (
  <div className="flex flex-col gap-8">
    <h3 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
      <Briefcase size={24} className="text-[var(--color-accent)]" /> Experience
    </h3>

    <ol className="relative flex flex-col gap-6 border-l border-[var(--color-border)] pl-8">
      {EXPERIENCE.map((job, i) => (
        <motion.li
          key={job.role}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative"
        >
          <span
            aria-hidden="true"
            className={`absolute -left-[41px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
              job.current
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_16px_var(--color-accent)]"
                : "border-[var(--color-border-strong)] bg-bg-base"
            }`}
          />
          <div className="border-gradient glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">{job.role}</h4>
                <p className="text-sm font-medium text-[var(--color-accent)]">{job.company}</p>
              </div>
              <span className="w-fit rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-[var(--color-text-muted)]">
                {job.period}
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {job.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  </div>
);

export default ExperienceTimeline;
