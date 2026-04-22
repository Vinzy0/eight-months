"use client";

import { motion } from "framer-motion";
import Particles from "@/components/Particles";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide24() {
  const act = getSlideAct(24);
  const theme = actThemes[act];

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center relative px-8"
      style={{ backgroundColor: theme.bg }}
    >
      <Particles color={theme.accent} count={25} />

      {/* Act Label */}
      <motion.span
        className="text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-dm-sans)] font-medium mb-6"
        style={{ color: theme.accent, opacity: 0.6 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Act Four
      </motion.span>

      {/* Title */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-center z-10 leading-tight"
        style={{
          color: theme.text,
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Who You Both Are
      </motion.h1>

      {/* Decorative Divider */}
      <motion.div
        className="flex items-center justify-center gap-3 my-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-16 h-px"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="w-16 h-px"
          style={{ backgroundColor: theme.accent }}
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] text-center z-10 max-w-md"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Eight months of messages. Two people, fully seen.
      </motion.p>
    </div>
  );
}
