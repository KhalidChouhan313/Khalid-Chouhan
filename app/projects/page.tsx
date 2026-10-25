import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import { listProjects } from "@/lib/content";

export const revalidate = 60;

export default async function Projects() {
  return <ProjectsSection projects={await listProjects()} />;
}
