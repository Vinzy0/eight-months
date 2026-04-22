"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide30() {
  const act = getSlideAct(30);
  const theme = actThemes[act];
  const { definingMoment } = analysis;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mt-4"
          style={{ color: theme.text }}
        >
          If we had to pick one moment.
        </h1>
        <p
          className="font-[family-name:var(--font-dm-sans)] text-sm mt-3 opacity-70"
          style={{ color: theme.text }}
        >
          September 1, 2025
        </p>
      </motion.div>

      {/* Chat Bubbles — All from Vince (right-aligned) */}
      <motion.div
        className="w-full max-w-3xl mx-auto flex flex-col gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {definingMoment.conversation.map((message: any, index: number) => (
          <ChatBubble
            key={index}
            sender={message.sender}
            content={message.content}
            delay={0.3 + index * 0.15}
          />
        ))}
      </motion.div>

      {/* Why This One Card */}
      <motion.div
        className="w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <div
          className="rounded-2xl p-6 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3
            className="font-[family-name:var(--font-playfair)] text-lg font-bold mb-3"
            style={{ color: theme.text }}
          >
            Why this exchange
          </h3>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed"
            style={{ color: theme.text, opacity: 0.85 }}
          >
            {definingMoment.whyThisOne}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
