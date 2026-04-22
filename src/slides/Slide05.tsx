"use client";

import { motion } from "framer-motion";
import ChatBubble from "@/components/ChatBubble";
import { stats, formatDate } from "@/lib/slideData";

export default function Slide05() {
  const longestMessage = stats.length.longestMessageEver;
  const truncatedContent = longestMessage.content.slice(0, 200);

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          Who Writes Essays
        </h2>
      </motion.div>

      {/* Two stat cards Section */}
      <motion.div
        className="flex justify-center gap-8 md:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Vince card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-10 md:p-14 flex flex-col items-center text-center"
          style={{ minWidth: 220, minHeight: 200 }}
        >
          <span
            className="text-6xl md:text-7xl font-bold font-[family-name:var(--font-playfair)]"
            style={{ color: "#2C1A0E" }}
          >
            {stats.length.avgMessageLengthVince}
          </span>
          <span
            className="mt-4 text-lg md:text-xl font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#8B6F4E", opacity: 0.7 }}
          >
            words / message
          </span>
          <span
            className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] mt-3"
            style={{ color: "#C68B59" }}
          >
            Vince
          </span>
        </motion.div>

        {/* Princess card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-10 md:p-14 flex flex-col items-center text-center"
          style={{ minWidth: 220, minHeight: 200 }}
        >
          <span
            className="text-6xl md:text-7xl font-bold font-[family-name:var(--font-playfair)]"
            style={{ color: "#2C1A0E" }}
          >
            {stats.length.avgMessageLengthPrincess}
          </span>
          <span
            className="mt-4 text-lg md:text-xl font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#8B6F4E", opacity: 0.7 }}
          >
            words / message
          </span>
          <span
            className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] mt-3"
            style={{ color: "#C68B59" }}
          >
            Princess
          </span>
        </motion.div>
      </motion.div>

      {/* Longest message Section */}
      <motion.div
        className="w-full max-w-lg px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <ChatBubble
          sender="vince"
          content={truncatedContent + "..."}
          date={formatDate(longestMessage.date)}
        />
        <div className="text-center mt-4">
          <span
            className="text-xs font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#8B6F4E", opacity: 0.6 }}
          >
            {longestMessage.wordCount} words — the longest message ever
          </span>
        </div>
      </motion.div>

      {/* Label Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p
          className="text-sm md:text-base font-[family-name:var(--font-dm-sans)] italic"
          style={{ color: "#8B6F4E", opacity: 0.8 }}
        >
          someone had a lot to say.
        </p>
      </motion.div>
    </div>
  );
}
