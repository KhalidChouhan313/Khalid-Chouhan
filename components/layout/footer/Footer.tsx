"use client";

import { discordLogo, githubLogo, introProfile, Linkedinlogo, Xlogo } from "@/Utils/BaseUrl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { DEFAULT_SOCIAL_LINKS, SOCIAL_KEYS, SOCIAL_LABELS, SocialKey } from "@/lib/social";

const SOCIAL_ICONS: Partial<Record<SocialKey, string>> = {
  github: githubLogo,
  linkedin: Linkedinlogo,
  discord: discordLogo,
  twitter: Xlogo,
};

const NAV = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects/seeMore" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  const pathname = usePathname();
  const { data: links = DEFAULT_SOCIAL_LINKS } = useSocialLinks();
  if (pathname.startsWith("/admin")) return null;
  // home and /contact already end with the contact form, so skip the duplicate CTA there
  const showCta = pathname !== "/" && pathname !== "/contact";

  const socialLinks = SOCIAL_KEYS.filter((key) => links[key]).map((key) => ({
    key,
    href: links[key],
    label: SOCIAL_LABELS[key],
    icon: SOCIAL_ICONS[key],
  }));

  return (
    <footer className="w-full px-4 sm:px-6 pb-8 pt-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="border-gradient glass-strong relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />

        {showCta && (
        <div className="relative flex flex-col items-center gap-6 border-b border-[var(--color-border-subtle)] px-6 py-14 text-center">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            What&apos;s next?
          </span>
          <h2 className="max-w-2xl text-3xl sm:text-5xl font-bold leading-tight text-white">
            Let&apos;s build something <span className="text-gradient">great together</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-bold text-[#0f0c09] shadow-[0_10px_30px_-10px_var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Start a conversation
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        )}

        <div className="relative grid gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[var(--color-border-accent)]">
                <Image src={introProfile} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Khalid<span className="text-[var(--color-accent)]">.</span>dev
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              Full Stack Developer building fintech-grade web apps with React, Next.js and Node.js. Based in Pakistan, working worldwide.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:justify-start">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-2.5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-bg-surface/80 transition-colors duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_18px_var(--color-accent-glow)]"
                aria-label={social.label}
              >
                {social.icon ? (
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                ) : (
                  <Instagram size={18} className="text-white opacity-70 transition-all duration-300 group-hover:text-[var(--color-accent)] group-hover:opacity-100" />
                )}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] px-6 py-5 text-xs text-[var(--color-text-faint)] sm:flex-row sm:px-10">
          <p>&copy; {new Date().getFullYear()} Khalid Chouhan. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex cursor-pointer items-center gap-2 font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] transition-all group-hover:-translate-y-0.5 group-hover:border-[var(--color-accent)]">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
