"use client";
import { Code, EditIcon, Folder, LayoutGrid, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

const Pagination = () => {
  const sections = ["home", "about", "skills", "projects", "blog", "contact"];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observe.observe(el);
    });
  }, []);
  return (
    <div className="fixed md:left-5 left-0 top-[50%] translate-y-[-50%] z-10">
      <ul
        className="w-auto h-full border-2 hover:border-teal px-0.5 py-4 
        flex flex-col items-center shadow-md hover:shadow-teal
      font-bold justify-center gap-2 rounded-full"
      >
        {sections.map((sec, index) => (
          <li
            key={index}
            onClick={() =>
              document.getElementById(sec)?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={`cursor-pointer p-1 flex items-center justify-center rounded-full 
              transition-all 
              ${active === sec ? "bg-white text-black shadow-md" : ""}
            `}
          >
            {index === 0 && <LayoutGrid size={20} />}
            {index === 1 && <User size={20} />}
            {index === 2 && <Code size={20} />}
            {index === 3 && <Folder size={20} />}
            {index === 4 && <EditIcon size={20} />}
            {index === 5 && <Mail size={20} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
