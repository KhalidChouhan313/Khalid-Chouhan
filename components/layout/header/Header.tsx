"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "projects", href: "/projects" },
    { name: "blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="max-w-full h-auto p-0 sticky top-0 
    flex items-center justify-center z-10 right-0 left-0 backdrop-blur-md">
      <div className="w-[90%] md:w-[80%] border-b border-gray-200 dark:border-gray-600 py-4 flex items-center justify-between">
        <h2 className="text-teal text-2xl font-black">
          <Link href="/" className="hover:underline">
            &lt;K/&gt; <span className="text-white">KHALID CHOUHAN</span>
          </Link>
        </h2>

        <div className="hidden md:flex items-center justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-bold hover:underline active:text-teal"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden mt-2 flex flex-col items-start
      gap-3 py-4 px-6 bg-gray-900/95
      rounded-xl shadow-lg transition-all duration-300
      absolute top-full right-8 w-auto"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="w-full text-white font-semibold px-2 py-2 rounded hover:bg-teatext-teal hover:text-black transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
