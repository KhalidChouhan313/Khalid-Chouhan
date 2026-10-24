import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "All Projects — Khalid Chouhan Portfolio" },
  description: "Every project built by Muhammad Khalid Chouhan: fintech dashboards, open-source tools, web apps and APIs.",
  alternates: { canonical: "/projects/seeMore" },
  openGraph: { title: "All Projects — Khalid Chouhan Portfolio", description: "Every project built by Muhammad Khalid Chouhan: fintech dashboards, open-source tools, web apps and APIs.", url: "/projects/seeMore" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
