import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blog — Web Development & Fintech Engineering by Khalid Chouhan" },
  description: "Articles by Khalid Chouhan on React, Next.js, Node.js, TanStack Query, API security and building fintech products.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog — Web Development & Fintech Engineering by Khalid Chouhan", description: "Articles by Khalid Chouhan on React, Next.js, Node.js, TanStack Query, API security and building fintech products.", url: "/blog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
