"use client";

import { motion } from "framer-motion";
import ChatBubble from "@/components/ChatBubble";
import { quotes } from "@/lib/slideData";

// Split bar component inline for this slide
function SplitBar({
  leftPercent,
  rightPercent,
  leftLabel,
  rightLabel,
  categoryLabel,
  delay = 0,
}: {
  leftPercent: number;
  rightPercent: number;
  leftLabel: string;
  rightLabel: string;
  categoryLabel: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Category label */}
      <p
        className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest mb-3 text-center"
        style={{ color: "#C68B59" }}
      >
        {categoryLabel}
      </p>

      {/* Labels row */}
      <div className="flex justify-between mb-2 px-1">
        <span
          className="font-[family-name:var(--font-dm-sans)] text-sm font-medium"
          style={{ color: "#2C1A0E" }}
        >
          {leftLabel} {leftPercent}%
        </span>
        <span
          className="font-[family-name:var(--font-dm-sans)] text-sm font-medium"
          style={{ color: "#2C1A0E" }}
        >
          {rightPercent}% {rightLabel}
        </span>
      </div>

      {/* Bar */}
      <div className="h-4 w-full flex bg-[#E8DCC8] rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            backgroundColor: "#C68B59",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${leftPercent}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="h-full ml-auto"
          style={{
            backgroundColor: "#2C1A0E",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${rightPercent}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Slide04() {
  // Find a funny quote for the bottom
  const funnyQuote = quotes.quotes.find((q: any) => q.category === "funny" && q.sender === "vince");

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.8rem,4.5vw,2.8rem)] text-center text-balance"
          style={{ color: "#2C1A0E" }}
        >
          Who&apos;s The Bigger Simp
        </h2>
      </motion.div>

      {/* Split Bars Section */}
      <motion.div
        className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SplitBar
          leftPercent={43.7}
          rightPercent={56.3}
          leftLabel="Vince"
          rightLabel="Princess"
          categoryLabel="Messages Sent"
          delay={0.3}
        />
        <SplitBar
          leftPercent={39.7}
          rightPercent={60.3}
          leftLabel="Vince"
          rightLabel="Princess"
          categoryLabel="Words Typed"
          delay={0.5}
        />
        <SplitBar
          leftPercent={36.5}
          rightPercent={63.5}
          leftLabel="Vince"
          rightLabel="Princess"
          categoryLabel="Who Texts First"
          delay={0.7}
        />
      </motion.div>

      {/* Verdict Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(1rem,2.5vw,1.3rem)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          Princess. It&apos;s not even close.
        </p>
      </motion.div>

      {/* Quote bubble Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {funnyQuote && (
          <ChatBubble
            sender={funnyQuote.sender}
            content={funnyQuote.content}
            platform={funnyQuote.platform}
            delay={1.6}
          />
        )}
      </motion.div>
    </div>
  );
}
