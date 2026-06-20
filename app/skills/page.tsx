import SkillSection1 from "@/components/sections/skills/SkillSection1";
import SkillSection2 from "@/components/sections/skills/SkillSection2";

const Skills = () => {
  return (
    <section className="w-full bg-bg-base py-20 px-6 relative z-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-12">
        <SkillSection1 />
        <SkillSection2 />
      </div>
    </section>
  );
};

export default Skills;
