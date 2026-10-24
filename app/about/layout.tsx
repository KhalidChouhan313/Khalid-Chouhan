import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Muhammad Khalid Chouhan — Full Stack Developer & Team Lead" },
  description: "Who is Khalid Chouhan (Khalid Chouhan Gujjar)? Full Stack Developer & Team Lead at TechOn Ventures, Pakistan — building InstaPay, a global fintech platform. Experience, story and background.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Muhammad Khalid Chouhan — Full Stack Developer & Team Lead", description: "Who is Khalid Chouhan (Khalid Chouhan Gujjar)? Full Stack Developer & Team Lead at TechOn Ventures, Pakistan — building InstaPay, a global fintech platform. Experience, story and background.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
