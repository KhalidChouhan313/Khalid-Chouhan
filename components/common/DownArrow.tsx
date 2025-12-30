import { Mouse } from "lucide-react";
import React from "react";

function DownArrow() {
  return (
    <div className="flex items-center justify-center gap-2 flex-col text-teal">
      <Mouse className="animate-bounce " size={30} />
      <span className="bg-white w-1 h-2 rounded-full animate-bounce"></span>
      <span className="bg-white w-1 h-2 rounded-full animate-bounce"></span>
      <span className="bg-white w-1 h-2 rounded-full animate-bounce"></span>
      <span className="bg-white w-4 h-4 block transform rotate-45 "></span>
    </div>
  );
}

export default DownArrow;
