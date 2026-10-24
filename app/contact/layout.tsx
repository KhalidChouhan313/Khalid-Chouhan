import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact Khalid Chouhan — Hire a Full Stack Developer" },
  description: "Hire Khalid Chouhan (Muhammad Khalid Chouhan Gujjar) for full stack, React/Next.js and Node.js work. Remote worldwide, usually replies within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Khalid Chouhan — Hire a Full Stack Developer", description: "Hire Khalid Chouhan (Muhammad Khalid Chouhan Gujjar) for full stack, React/Next.js and Node.js work. Remote worldwide, usually replies within 24 hours.", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
