"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide22() {
  const act = getSlideAct(22);
  const theme = actThemes[act];
  const chapter = analysis.chapters[2]; // "Without a Label"

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Chapter Number */}
      <motion.span
        className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.3em] font-bold block mb-4 opacity-60"
        style={{ color: theme.accent }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Chapter Three
      </motion.span>

      {/* Chapter Title */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2.5rem,7vw,4.5rem)] text-center leading-[1.1] mb-4"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {chapter.name}
      </motion.h1>

      {/* Date Range */}
      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-lg mb-8 opacity-70"
        style={{ color: theme.accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {chapter.dateRange}
      </motion.p>

      {/* Tone Badge */}
      <motion.div
        className="px-4 py-2 rounded-full mb-8"
        style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span
          className="font-[family-name:var(--font-dm-sans)] text-sm italic"
          style={{ color: theme.accent }}
        >
          {chapter.dominantTone}
        </span>
      </motion.div>

      {/* Summary */}
      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-base md:text-lg leading-relaxed max-w-2xl text-center mb-10"
        style={{ color: theme.text, opacity: 0.85 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {chapter.summary}
      </motion.p>

      {/* Pull Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <ChatBubble
          sender="vince"
          content={chapter.pullQuote}
          delay={1}
        />
      </motion.div>
    </div>
  );
}