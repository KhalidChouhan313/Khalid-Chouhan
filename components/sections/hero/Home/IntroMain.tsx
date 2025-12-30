import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const IntroMain = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold scroll-m-20 fade-up">
        <span className="text-sm text-[#12312d]">&lt;h1&gt;</span> <br />
        Hey <br />
        I’m <span className="text-teal">KHALID CHOUHAN</span> <br />
        <span className="text-3xl typewriter block">
          A Full-Stack Developer
        </span>
        <span className="text-sm text-[#12312d]">&lt;/h1&gt;</span>
      </h1>

      <p className="mt-4 pl-3 font-semibold fade-up-delay-1">
        <span className="text-[#12312d] font-bold"> &lt;p&gt;</span> <br />
        I help businesses grow by delivering high-impact, user-focused web
        experiences. If you’re looking for a developer who turns ideas into real
        results, I’m here to make it happen. <br />
        <span className="text-[#12312d] font-bold"> &lt;/p&gt;</span>
      </p>

      <Button className="hover:border border-teal py-6 cursor-pointer text-3xl text-teal fade-up-delay-2">
        Let's Talk{" "}
        <Link href={"/contact"} className="text-teal bg-[#353232] p-2 rounded-full">
          <Mail size={50} />
        </Link>
      </Button>
    </div>
  );
};

export default IntroMain;
