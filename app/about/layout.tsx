import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Muhammad Khalid Chouhan — Full Stack Developer" },
  description: "Muhammad Khalid Chouhan is a Full Stack Developer at TechOn Ventures, Pakistan, working on InstaPay, a global fintech platform. Experience, story and background.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Muhammad Khalid Chouhan — Full Stack Developer", description: "Muhammad Khalid Chouhan is a Full Stack Developer at TechOn Ventures, Pakistan, working on InstaPay, a global fintech platform. Experience, story and background.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
