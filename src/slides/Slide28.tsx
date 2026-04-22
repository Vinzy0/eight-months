"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide28() {
  const act = getSlideAct(28);
  const theme = actThemes[act];
  const greenFlags = analysis.greenFlags;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3.5rem)] text-center leading-[1.1] mt-8 mb-2"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What You&apos;re Doing Right
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-base uppercase tracking-[0.2em] mb-8"
        style={{ color: theme.accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Seven green flags
      </motion.p>

      {/* Green Flag Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {greenFlags.map((flag: any, index: number) => (
          <motion.div
            key={index}
            className="rounded-2xl p-5 flex flex-col gap-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderLeft: `4px solid rgba(76, 175, 80, 0.3)`,
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <h3
              className="font-[family-name:var(--font-playfair)] text-lg font-bold"
              style={{ color: "#4CAF50" }}
            >
              {flag.pattern}
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed"
              style={{ color: theme.text }}
            >
              {flag.description}
            </p>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-xs italic leading-relaxed opacity-70 mt-1"
              style={{ color: theme.accent }}
            >
              &ldquo;{flag.evidence}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
