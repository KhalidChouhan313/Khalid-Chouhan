import SkillSection1 from "@/components/sections/skills/SkillSection1";
import SkillSection2 from "@/components/sections/skills/SkillSection2";

const Skills = () => {
  return (
    <section className="w-full  py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-10">
        <SkillSection1 />
        <SkillSection2 />
      </div>
    </section>
  );
};

export default Skills;
