"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { introProfile } from "@/Utils/BaseUrl";
import Chat from "./Chat";

function ChatsIcon() {
  const [showtChat, setShowChat] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showtChat && <Chat setShowChat={setShowChat} showtChat={showtChat} />}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setShowChat((v) => !v)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label={showtChat ? "Close AI assistant" : "Ask my AI assistant"}
        aria-expanded={showtChat}
        className="group fixed bottom-6 right-6 z-[60] flex cursor-pointer items-center gap-2.5 rounded-full border border-[var(--color-border-accent)] bg-[#0f0c09]/85 p-1.5 pr-1.5 sm:pr-5 shadow-[0_12px_40px_-10px_rgba(94,234,212,0.45)] backdrop-blur-xl transition-colors hover:border-[var(--color-accent)]"
      >
        <span className="relative flex h-11 w-11 items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)]/25 [animation-duration:2.5s]" />
          <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[var(--color-accent)]">
            {showtChat ? (
              <span className="flex h-full w-full items-center justify-center bg-[var(--color-accent)] text-[#0f0c09]">
                <X size={20} />
              </span>
            ) : (
              <Image src={introProfile} alt="" fill sizes="44px" className="object-cover" />
            )}
          </span>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0f0c09] bg-emerald-400" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="flex items-center gap-1 text-sm font-bold text-white">
            Ask my AI <Sparkles size={13} className="text-[var(--color-accent)]" />
          </span>
          <span className="text-[11px] text-[var(--color-text-faint)]">Online · replies instantly</span>
        </span>
      </motion.button>
    </>
  );
}

export default ChatsIcon;
