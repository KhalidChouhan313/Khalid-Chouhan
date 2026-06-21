export interface SectionHeadingProps {
  heading: string;
  paragraph?: string;
  isShow?: boolean;
}
export interface DetailedSkill {
  name: string;
}
export type SkillIcon = "Server" | "Laptop" | "Brain" | "Code" | "Cloud" | "Database" | "Wrench" | "TestTube";
export type SkillTier = "Expert" | "Proficient" | "Familiar";

export interface SkillCategory {
  title: string;
  icon: SkillIcon;
}
export interface DetailedSkill {
  name: string;
  category: SkillIcon;
  tier: SkillTier;
}
export interface SkillCategory {
  title: string;
  icon: SkillIcon;
}