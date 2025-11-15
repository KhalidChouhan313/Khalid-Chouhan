"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="max-w-full h-auto p-0 sticky top-0 flex items-center justify-center z-10 right-0 left-0 bg-black/80 backdrop-blur-md">
      <div className="w-[90%] md:w-[80%] border-b border-gray-200 dark:border-gray-600 py-4 flex items-center justify-between">
        <h2 className="text-[#12f7d6] text-2xl font-black">
          <Link href="/" className="hover:underline">
            &lt;K/&gt; <span className="text-white">KHALID CHOUHAN</span>
          </Link>
        </h2>

        <div className="hidden md:flex items-center justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-bold hover:underline active:text-[#12f7d6]"
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
        <div className="md:hidden mt-4 flex flex-row items-end
         justify-end border-2 border-gray-400 px-8
         gap-4 py-4 bg-black/90 w-auto  absolute top-full
         rounded-2xl  ">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-bold border-r px-2 shadow-2xl text-white hover:text-[#12f7d6]"
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
