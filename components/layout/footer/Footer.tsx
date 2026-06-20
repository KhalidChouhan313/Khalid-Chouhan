import { discordLogo, githuLogo, Linkedinlogo, Xlogo } from "@/Utils/BaseUrl";
import Image from "next/image";

interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/KhalidChouhan313",
      label: "GitHub",
      icon: githuLogo,
    },
    {
      href: "https://www.linkedin.com/in/muhammad-khalid-chouhan-68b24738b",
      label: "LinkedIn",
      icon: Linkedinlogo,
    },
    {
      href: "https://discord.com/users/khalidchouhan._71684",
      label: "Discord",
      icon: discordLogo,
    },
    {
      href: "https://x.com/Mkhalidcho8520M",
      label: "X (formerly Twitter)",
      icon: Xlogo,
    },
  ];

  return (
    <footer className="w-full bg-bg-base border-t border-[var(--color-border-subtle)] py-12 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[var(--color-text-muted)] text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-black text-[var(--color-accent)] italic ml-1 mr-1">
            MUHAMMAD KHALID CHOUHAN.
          </span>{" "}
          All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:scale-115 transition-all duration-200 p-1"
              aria-label={social.label}
            >
              <Image
                src={social.icon}
                alt={social.label}
                width={20}
                height={20}
                className="brightness-90 hover:brightness-100"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
