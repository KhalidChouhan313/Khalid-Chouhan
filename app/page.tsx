import HomePage from "@/components/sections/HomePage";
import { listProjects } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  return <HomePage projects={await listProjects()} />;
}
