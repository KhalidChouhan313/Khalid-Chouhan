import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Skills — React, Next.js, Node.js, MongoDB, Azure, Docker" },
  description: "Khalid Chouhan's full stack skills: React, Next.js, TypeScript, Angular, Node.js, Express, MongoDB, Socket.IO, Docker, Microsoft Azure, AWS and more.",
  alternates: { canonical: "/skills" },
  openGraph: { title: "Skills — React, Next.js, Node.js, MongoDB, Azure, Docker", description: "Khalid Chouhan's full stack skills: React, Next.js, TypeScript, Angular, Node.js, Express, MongoDB, Socket.IO, Docker, Microsoft Azure, AWS and more.", url: "/skills" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
