"use client";

import { motion } from "framer-motion";
import ChatBubble from "@/components/ChatBubble";
import { formatDate } from "@/lib/slideData";

export default function Slide02() {
  return (
    <div className="relative w-full h-full px-6">
      {/* Headline */}
      <div className="absolute inset-x-0 top-[28%] flex justify-center">
        <motion.h2
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.6rem,4vw,2.5rem)] text-center text-balance"
          style={{ color: "#3D2B1F" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          It started here.
        </motion.h2>
      </div>

      {/* Chat container */}
      <div className="absolute inset-x-0 top-[40%] flex justify-center">
        <div className="w-full max-w-md flex flex-col gap-5">
          <ChatBubble
            sender="princess"
            content={"huh\nmay message ka ba"}
            platform="discord"
            date={formatDate("2025-07-07T12:51:41.532Z")}
            delay={0.3}
          />
          <ChatBubble
            sender="vince"
            content="DI NAGANA MIC MO"
            date={formatDate("2025-07-08T09:24:53.052Z")}
            delay={0.6}
          />
          <ChatBubble
            sender="princess"
            content={"AY\nRTC CONNECTNG TANGINA"}
            platform="discord"
            date={formatDate("2025-07-08T09:24:59.875Z")}
            delay={0.9}
          />
        </div>
      </div>

      {/* Subtext */}
      <div className="absolute inset-x-0 bottom-[22%] flex justify-center">
        <motion.p
          className="font-[family-name:var(--font-dm-sans)] italic text-center max-w-xs text-[clamp(0.82rem,1.8vw,0.95rem)] leading-relaxed text-balance"
          style={{ color: "#B08070" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          And neither of us knew what this would become.
        </motion.p>
      </div>
    </div>
  );
}
