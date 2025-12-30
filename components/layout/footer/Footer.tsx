import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 flex flex-col md:flex-row items-center justify-between px-6">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-black text-teal italic ml-2 mr-2">
          MUHAMMAD KHALID CHOUHAN.
        </span>{" "}
        All rights reserved.
      </p>

      <div className="flex gap-5 mt-4 md:mt-0">
        <a
          href="https://github.com/KhalidChouhan313"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal transition-colors"
        >
          <Github size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/muhammad-khalid-chouhan-68b24738b"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal transition-colors"
        >
          <Linkedin size={24} />
        </a>

        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal transition-colors"
        >
          <Twitter size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
