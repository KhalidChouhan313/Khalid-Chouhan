"use client";

import { useChat } from "@/hooks/useChat";
import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { mutateAsync, isPending } = useChat();
    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;

        setChat((prev) => [...prev, { role: "user", text: userMessage }]);
        setMessage("");

        try {
            const data = await mutateAsync(userMessage);

            setChat((prev) => [
                ...prev,
                { role: "ai", text: data.reply }
            ]);

        } catch (error) {
            console.error("CHAT ERROR:", error);

            setChat((prev) => [
                ...prev,
                { role: "ai", text: "Something went wrong. Please try again." }
            ]);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="
          fixed z-50 bg-black rounded-2xl shadow-2xl flex flex-col overflow-hidden
          md:bottom-[28%] bottom-[20%]  right-4 
          w-[92%] h-[70vh] 
          sm:w-95 sm:h-120 sm:bottom-20 sm:right-[15%]
        "
            >
                <div className="bg-teal text-white px-4 py-3 flex items-center gap-2 font-semibold">
                    <Bot size={20} />
                    AI Assistant
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#1E242B]">
                    {chat.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[85%] px-3 py-2 font-bold rounded-lg text-sm break-words ${msg.role === "user"
                                ? "ml-auto bg-teal text-white "
                                : "bg-gray-200 text-gray-800 "
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {isPending && (
                        <div className="max-w-[85%] px-3 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 flex items-center gap-2 w-fit">
                            <CircularProgress size={16} />
                            <span>assistant is typing...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-700 p-2 flex items-center gap-2">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask about Khalid..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg outline-none bg-black text-white border border-gray-600 focus:border-teal"
                    />

                    <button
                        onClick={sendMessage}
                        className="p-2 bg-teal text-white font-black cursor-pointer
                         rounded-lg hover:scale-105 transition"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Chat;