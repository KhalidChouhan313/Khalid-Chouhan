"use client";

import { useChat } from "@/hooks/useChat";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatBubble, scaleIn } from "@/lib/motion-variants";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

interface QuickPrompt {
  label: string;
  message: string;
}

interface ChatProps {
  setShowChat: (value: boolean) => void;
  showtChat: boolean;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  { label: "🛠 Technologies", message: "What technologies do you use?" },
  { label: "🚀 Best Project", message: "Show me your best project" },
  { label: "💼 Hire You", message: "How can I hire you?" },
  { label: "📚 Experience", message: "Tell me about your experience" },
];

const Chat = ({ setShowChat, showtChat }: ChatProps) => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync, isPending } = useChat();

  const sendMessage = useCallback(
    async (text?: string): Promise<void> => {
      const messageText = text ?? message;
      if (!messageText.trim()) return;

      const userMessage = messageText.trim();
      setChat((prev) => [...prev, { role: "user", text: userMessage }]);
      setMessage("");

      try {
        const data = await mutateAsync(userMessage);
        setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
      } catch {
        setChat((prev) => [
          ...prev,
          { role: "ai", text: "Something went wrong. Please try again." },
        ]);
      }
    },
    [message, mutateAsync]
  );

  const handleQuickPrompt = useCallback(
    (prompt: QuickPrompt): void => {
      setMessage(prompt.message);
      void sendMessage(prompt.message);
    },
    [sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void sendMessage();
      }
      if (e.key === "Escape") {
        setShowChat(false);
      }
    },
    [sendMessage, setShowChat]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isPending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="fixed z-50 flex flex-col overflow-hidden
          bottom-[20%] right-4
          w-[92%] h-[70vh]
          sm:w-[380px] sm:h-[520px] sm:bottom-24 sm:right-[13%]
          rounded-2xl
          border border-[var(--color-border-subtle)]
          shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]
          glass-strong"
        style={{ transformStyle: "preserve-3d" }}
        role="dialog"
        aria-label="AI Chat Assistant"
        aria-modal="false"
      >
        {/* subtle top accent glow line for depth */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent pointer-events-none" />

        <div
          className="relative flex items-center justify-between px-4 py-3
            border-b border-[var(--color-border-subtle)]
            bg-bg-elevated"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center">
              <Bot size={18} className="text-[var(--color-accent)]" />
              {/* live status dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-bg-elevated" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                Khalid&apos;s AI Assistant
              </p>
              <p className="text-[10px] text-[var(--color-text-faint)] leading-tight">
                Ask about skills, projects &amp; experience
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="p-1.5 rounded-lg hover:bg-bg-surface transition-colors
              text-[var(--color-text-faint)] hover:text-white"
            onClick={() => setShowChat(!showtChat)}
            aria-label="Close chat"
          >
            <X size={16} />
          </motion.button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-bg-base/50"
          role="log"
          aria-live="polite"
        >
          {chat.length === 0 && (
            <motion.div
              variants={chatBubble}
              initial="hidden"
              animate="visible"
              className="text-center py-6 space-y-4"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-accent-glow)]
                flex items-center justify-center"
              >
                <Sparkles size={24} className="text-[var(--color-accent)]" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">
                  Hi! I&apos;m Khalid&apos;s AI assistant
                </p>
                <p className="text-xs text-[var(--color-text-faint)] mt-1">
                  Ask me anything about his skills, projects, or experience
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={prompt.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-1.5 text-xs rounded-full
                      bg-bg-surface border border-[var(--color-border)]
                      text-[var(--color-text-muted)]
                      hover:border-[var(--color-border-accent)]
                      hover:text-[var(--color-accent)]
                      hover:shadow-[0_0_12px_var(--color-accent-glow)]
                      transition-colors duration-200"
                    type="button"
                  >
                    {prompt.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {chat.map((msg, i) => (
            <motion.div
              key={i}
              variants={chatBubble}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className={`max-w-[85%] ${
                msg.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--color-accent)] text-[#0f0c09] font-medium rounded-br-md shadow-[0_4px_14px_-4px_var(--color-accent-glow)]"
                    : "bg-bg-elevated border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] rounded-bl-md"
                }`}
              >
                {msg.role === "ai" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="px-1 py-0.5 bg-bg-surface rounded text-xs font-mono text-[var(--color-accent)]">
                            {children}
                          </code>
                        ) : (
                          <code className="block p-2 bg-bg-surface rounded-lg text-xs font-mono overflow-x-auto my-2">
                            {children}
                          </code>
                        );
                      },
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-dim)] transition-colors"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1 my-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1 my-1">
                          {children}
                        </ol>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}

          {isPending && (
            <motion.div
              variants={chatBubble}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl rounded-bl-md
                bg-bg-elevated border border-[var(--color-border-subtle)] w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:300ms]" />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {chat.length > 0 && chat.length < 4 && (
          <div
            className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar
            border-t border-[var(--color-border-subtle)]"
          >
            {QUICK_PROMPTS.slice(0, 2).map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-2.5 py-1 text-[10px] rounded-full whitespace-nowrap
                  bg-bg-surface border border-[var(--color-border)]
                  text-[var(--color-text-faint)]
                  hover:text-[var(--color-accent)]
                  hover:border-[var(--color-border-accent)]
                  transition-colors shrink-0"
                type="button"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        )}

        <div
          className="px-3 py-3 flex items-center gap-2
          border-t border-[var(--color-border-subtle)] bg-bg-elevated"
        >
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Khalid..."
            disabled={isPending}
            className="flex-1 px-3.5 py-2 text-sm rounded-xl
              bg-bg-surface text-white
              border border-[var(--color-border)]
              focus:border-[var(--color-border-accent)]
              focus:outline-none
              focus:ring-2 focus:ring-[var(--color-accent)]/15
              placeholder:text-[var(--color-text-faint)]
              disabled:opacity-50
              transition-all duration-200"
            aria-label="Type your message"
            maxLength={600}
          />
          <motion.button
            whileHover={{ scale: message.trim() ? 1.06 : 1 }}
            whileTap={{ scale: message.trim() ? 0.94 : 1 }}
            onClick={() => void sendMessage()}
            disabled={isPending || !message.trim()}
            className="p-2.5 rounded-xl
              bg-[var(--color-accent)] text-[#0f0c09]
              hover:bg-[var(--color-accent-dim)]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
            aria-label="Send message"
            type="button"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chat;