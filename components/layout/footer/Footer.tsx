"use client";

import { discordLogo, githubLogo, Linkedinlogo, Xlogo } from "@/Utils/BaseUrl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { DEFAULT_SOCIAL_LINKS, SOCIAL_KEYS, SOCIAL_LABELS, SocialKey } from "@/lib/social";

const SOCIAL_ICONS: Partial<Record<SocialKey, string>> = {
  github: githubLogo,
  linkedin: Linkedinlogo,
  discord: discordLogo,
  twitter: Xlogo,
};

const Footer = () => {
  const pathname = usePathname();
  const { data: links = DEFAULT_SOCIAL_LINKS } = useSocialLinks();
  if (pathname.startsWith("/admin")) return null;

  const socialLinks = SOCIAL_KEYS.filter((key) => links[key]).map((key) => ({
    key,
    href: links[key],
    label: SOCIAL_LABELS[key],
    icon: SOCIAL_ICONS[key],
  }));

  return (
    <footer className="w-full px-4 sm:px-6 py-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative max-w-5xl mx-auto rounded-full
          bg-bg-elevated/60 glass-strong
          border border-[var(--color-border-subtle)]
          shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]
          px-6 sm:px-10 py-5
          flex flex-col md:flex-row items-center justify-between gap-5
          overflow-hidden"
      >
        {/* soft ambient glow blob behind the capsule for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/4 w-64 h-64
            bg-[var(--color-accent)]/10 rounded-full blur-3xl"
        />
        {/* top hairline glow, echoes the header's accent line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-10 right-10 h-px
            bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent"
        />

        <p className="relative text-sm text-[var(--color-text-muted)] text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-black text-[var(--color-accent)] italic mx-1">
            MUHAMMAD KHALID CHOUHAN.
          </span>{" "}
          All rights reserved.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative flex items-center gap-3"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.key}
              variants={fadeUp}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -3,
                rotateY: 12,
                scale: 1.08,
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative w-10 h-10 flex items-center justify-center
                rounded-full border border-[var(--color-border)]
                bg-bg-surface/80
                hover:border-[var(--color-border-accent)]
                hover:shadow-[0_0_18px_var(--color-accent-glow)]
                transition-colors duration-300"
              aria-label={social.label}
            >
              {social.icon ? (
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={18}
                  height={18}
                  className="opacity-70 brightness-90 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-300"
                />
              ) : (
                <Instagram
                  size={18}
                  className="text-white opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-300"
                />
              )}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;