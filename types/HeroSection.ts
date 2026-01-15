export interface SectionHeadingProps {
  heading: string;
  paragraph?: string;
  isShow?: boolean;
}
export interface DetailedSkill {
  name: string;
  percentage: number;
}
export type SkillIcon = "Server" | "Laptop" | "Brain" | "Code";

export interface SkillCategory {
  title: string;
  icon: SkillIcon;
}
