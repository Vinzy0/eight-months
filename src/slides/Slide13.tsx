"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";
import ChatBubble from "@/components/ChatBubble";
import { getSlideAct, actThemes } from "@/lib/colors";

function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export default function Slide13() {
  const act = getSlideAct(13);
  const theme = actThemes[act];

  const mostActiveDate = stats.timing.mostActiveDate || "2025-08-11";
  const messageCount = stats.timing.mostActiveDateCount || 1642;
  const sampleMessages = stats.timing.mostActiveDateSample || [
    { sender: "vince", content: "THEN LARO TAYO PAGUWI KO" },
    { sender: "vince", content: "ay" },
    { sender: "vince", content: "di ko pa alam 🥲" },
  ];

  const dayOfWeek = getDayOfWeek(mostActiveDate);
  const formattedDate = formatDateLong(mostActiveDate);

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-between overflow-hidden"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header Section - Date */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight"
          style={{ color: theme.text }}
        >
          {formattedDate}
        </h1>
        <p
          className="font-[family-name:var(--font-dm-sans)] text-lg md:text-xl mt-1"
          style={{ color: theme.accent }}
        >
          {dayOfWeek}
        </p>
      </motion.div>

      {/* Big Number Section */}
      <motion.div
        className="text-center my-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="font-[family-name:var(--font-playfair)] text-[clamp(4rem,10vw,7rem)] font-bold leading-none"
          style={{
            color: theme.text,
            textShadow: `0 0 40px ${theme.highlight}80, 0 0 80px ${theme.accent}40`,
          }}
          animate={{
            textShadow: [
              `0 0 40px ${theme.highlight}80, 0 0 80px ${theme.accent}40`,
              `0 0 60px ${theme.highlight}A0, 0 0 120px ${theme.accent}60`,
              `0 0 40px ${theme.highlight}80, 0 0 80px ${theme.accent}40`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {formatNumber(messageCount)}
        </motion.div>
        <motion.p
          className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl mt-2"
          style={{ color: theme.accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          messages
        </motion.p>
      </motion.div>

      {/* Chat Bubbles Section */}
      <div className="w-full max-w-2xl flex flex-col gap-3 px-4">
        {sampleMessages.map((msg: any, index: number) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            content={msg.content}
            delay={0.8 + index * 0.15}
          />
        ))}
      </div>

    </div>
  );
}
