import SkillSection1 from "@/components/sections/skills/SkillSection1";
import SkillSection2 from "@/components/sections/skills/SkillSection2";
const Skills = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/hero/bg.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="rela h-auto w-full px-4  relative z-0
          flex items-start justify-center 
          "
    >
      <div
        className="absolute  inset-0 bg-cover bg-center bg-fixed
             filter  top-0 bottom-0 h-full"
        style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
      ></div>

      <div
        className="absolute -inset-0 bg-black/85 top-0
           bottom-0 h-full "
      ></div>
      <div
        className="w-full relative z-10 text-white
           flex items-center justify-center"
      >
        <div
          className="h-auto flex 
      flex-col items-center 
      justify-center
     gap-5 md:w-[90%] w-full py-12"
        >
          <SkillSection1 />
          <SkillSection2 />
        </div>
      </div>
    </div>
  );
};

export default Skills;
