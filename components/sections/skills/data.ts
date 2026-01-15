import { DetailedSkill, SkillCategory } from "@/types/HeroSection";

export const skillCategories: SkillCategory[] = [
  { title: "MERN Stack", icon: "Server" },
  { title: "Frontend", icon: "Laptop" },
  { title: "AI Engineering", icon: "Brain" },
  { title: "Backend", icon: "Code" },
];
export const detailedSkills: DetailedSkill[] = [
  { name: "JavaScript", percentage: 90 },
  { name: "React.js", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "Express.js", percentage: 75 },
  { name: "MongoDB", percentage: 70 },
  { name: "LangChain", percentage: 85 },
  { name: "Tailwind CSS", percentage: 85 },
  { name: "Next.js", percentage: 85 },
];
