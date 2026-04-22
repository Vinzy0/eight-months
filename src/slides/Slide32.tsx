"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide32() {
  const act = getSlideAct(32);
  const theme = actThemes[act];
  const { whatVinceDoesToPrincess } = analysis;

  const beforeTraits = ["avoidant by default", "disappears when hurt", "I'm fine"];
  const afterTraits = ["writes long apologies", "names her feelings", "stays through the hard"];

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3.5rem)] text-center leading-[1.1] mt-4 mb-6"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Vince does to Princess.
      </motion.h1>

      {/* Split Layout — Two Columns */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* LEFT COLUMN — Before (Early Princess) */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Date Label */}
          <span
            className="font-[family-name:var(--font-dm-sans)] text-sm"
            style={{ color: theme.accent }}
          >
            August 2025
          </span>

          {/* Trait Chips */}
          <div className="flex flex-wrap gap-2">
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
          <ChatBubble
            sender="princess"
            content={whatVinceDoesToPrincess.beforeQuote}
            delay={0.3}
          />
        </motion.div>

        {/* RIGHT COLUMN — After (Late Princess) */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Date Label */}
          <span
            className="font-[family-name:var(--font-dm-sans)] text-sm"
            style={{ color: theme.accent }}
          >
            November 2025
          </span>

          {/* Trait Chips */}
          <div className="flex flex-wrap gap-2">
            {afterTraits.map((trait, index) => (
              <motion.span
                key={trait}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>

          {/* After Quote */}
          <ChatBubble
            sender="princess"
            content={whatVinceDoesToPrincess.afterQuote}
            delay={0.5}
          />
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.p
        className="font-[family-name:var(--font-playfair)] italic text-xl text-center mt-auto mb-4"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        He changed how she shows up.
      </motion.p>
    </div>
  );
}
