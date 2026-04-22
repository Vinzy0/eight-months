"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide31() {
  const act = getSlideAct(31);
  const theme = actThemes[act];
  const { whatSheDoesToVince } = analysis;

  const beforeTraits = ["short fragments", "avoidant", "dry banter"];
  const afterTraits = ["long paragraphs", "names his feelings", "writes to stay"];

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3.5rem)] text-center leading-[1.1] mt-4 mb-8"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Princess does to Vince.
      </motion.h1>

      {/* Split Layout */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* LEFT COLUMN — Before (Early Vince) */}
        <motion.div
          className="rounded-2xl p-6 flex flex-col"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: theme.accent }}
          >
            July 2025
          </span>

          {/* Trait Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {beforeTraits.map((trait, index) => (
              <motion.span
                key={trait}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>

          {/* Before Quote */}
          <div className="mt-auto">
            <ChatBubble
              sender="vince"
              content={whatSheDoesToVince.beforeQuote}
              delay={0.5}
            />
          </div>
        </motion.div>

        {/* RIGHT COLUMN — After (Late Vince) */}
        <motion.div
          className="rounded-2xl p-6 flex flex-col"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: theme.accent }}
          >
            September 2025
          </span>

          {/* Trait Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {afterTraits.map((trait, index) => (
              <motion.span
                key={trait}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>

          {/* After Quote */}
          <div className="mt-auto">
            <ChatBubble
              sender="vince"
              content={whatSheDoesToVince.afterQuote}
              delay={0.7}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.p
        className="font-[family-name:var(--font-playfair)] italic text-xl text-center"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        She changed how he shows up.
      </motion.p>
    </div>
  );
}
