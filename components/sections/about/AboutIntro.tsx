import React from "react";

const AboutIntro = () => {
  return (
    <div className="w-full">
      <div className="bg-[#1e242b]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
        <h2 className="text-teal font-mono font-black text-4xl tracking-wide">
          Hello <span className="animate-bounce">👋</span>
        </h2>

        <p className="mt-4 font-mono text-[15px] leading-relaxed text-gray-300">
          I’m a dedicated developer who loves crafting smooth, intuitive, and
          performance-focused digital experiences. I work with a mindset of
          clean structure, solid logic, and long-term maintainability.
        </p>

        <p className="mt-3 font-mono text-[15px] leading-relaxed text-gray-300">
          Exploring new technologies, solving meaningful problems, and transforming
           ideas into functional products is what fuels my growth. Continuously
            learning and putting new knowledge into practice is an
             essential part of my daily routine.
        </p>

        <p className="mt-3 font-mono text-[15px] leading-relaxed text-gray-300">
          If you’re searching for someone who values clarity, quality, and
          consistent improvement—I'm always open to great collaborations.
        </p>
      </div>
    </div>
  );
};

export default AboutIntro;
