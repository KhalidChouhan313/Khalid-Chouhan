import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Projects — Full Stack Web Apps by Khalid Chouhan" },
  description: "Selected projects by Khalid Chouhan: InstaPay fintech platform, Magic Translate (open-source NPM package), Asani Bond and more — built with Next.js, React and Node.js.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects — Full Stack Web Apps by Khalid Chouhan", description: "Selected projects by Khalid Chouhan: InstaPay fintech platform, Magic Translate (open-source NPM package), Asani Bond and more — built with Next.js, React and Node.js.", url: "/projects" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
