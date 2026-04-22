"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide23() {
  const act = getSlideAct(23);
  const theme = actThemes[act];
  const chapter4 = analysis.chapters[3]; // "Something Like a Home"
  const chapter5 = analysis.chapters[4]; // "The Quiet"

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
        Chapter Four & Five
      </motion.span>

      {/* Chapter 4 Title */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,6vw,3.5rem)] text-center leading-[1.1] mb-2"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {chapter4.name}
      </motion.h1>

      {/* Divider */}
      <motion.div
        className="flex items-center gap-4 my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-16 h-px" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />
        <span className="font-[family-name:var(--font-dm-sans)] text-sm" style={{ color: theme.accent, opacity: 0.5 }}>&</span>
        <div className="w-16 h-px" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />
      </motion.div>

      {/* Chapter 5 Title */}
      <motion.h2
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.5rem,4vw,2.5rem)] text-center leading-[1.1] mb-6"
        style={{ color: theme.text, opacity: 0.8 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {chapter5.name}
      </motion.h2>

      {/* Combined Date Range */}
      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-base mb-8 opacity-70"
        style={{ color: theme.accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {chapter4.dateRange} · {chapter5.dateRange}
      </motion.p>

      {/* Two summaries side by side */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 max-w-4xl w-full mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {/* Chapter 4 */}
        <div
          className="flex-1 rounded-2xl p-5"
          style={{ backgroundColor: `${theme.highlight}30`, border: `1px solid ${theme.accent}20` }}
        >
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider mb-2 font-bold"
            style={{ color: theme.accent }}
          >
            {chapter4.dominantTone}
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed"
            style={{ color: theme.text, opacity: 0.85 }}
          >
            {chapter4.summary}
          </p>
        </div>

        {/* Chapter 5 */}
        <div
          className="flex-1 rounded-2xl p-5"
          style={{ backgroundColor: `${theme.highlight}30`, border: `1px solid ${theme.accent}20` }}
        >
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider mb-2 font-bold"
            style={{ color: theme.accent }}
          >
            {chapter5.dominantTone}
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed"
            style={{ color: theme.text, opacity: 0.85 }}
          >
            {chapter5.summary}
          </p>
        </div>
      </motion.div>

      {/* Pull Quote from The Quiet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <ChatBubble
          sender="princess"
          content={chapter5.pullQuote}
          delay={1.2}
        />
      </motion.div>
    </div>
  );
}