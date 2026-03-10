import { BotMessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Chat from "./Chat";
import { useState } from "react";

function ChatsIcon() {
  const [showtChat, setShowChat] = useState(false);
  return (
    <>
      {
        showtChat && <Chat />
      }
      <Tooltip title="Ask about me " arrow>

        <motion.div
          onClick={() => setShowChat(!showtChat)}
          className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center
          fixed bottom-[15%] right-[5%] cursor-pointer z-50 shadow-lg"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
            },
          }}
        >
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-teal-400 opacity-30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          ></motion.div>

          <BotMessageSquare size={28} strokeWidth={2} color="#fff" />
        </motion.div>
      </Tooltip></>
  );
}

export default ChatsIcon;