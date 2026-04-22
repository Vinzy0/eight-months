"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide39() {
  const act = getSlideAct(39);
  const theme = actThemes[act];

  const adviceParagraphs = analysis.adviceForVince as string[];

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header — Dancing Script, centered, fade in */}
      <motion.h1
        className="font-[family-name:var(--font-dancing)] text-[clamp(2.5rem,6vw,4rem)] text-center mb-10"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        For Vince.
      </motion.h1>

      {/* Advice Paragraphs — DM Sans, fade in sequentially */}
      <div className="flex-1 flex flex-col">
        {adviceParagraphs.map((para, i) => (
          <motion.p
            key={i}
            className="font-[family-name:var(--font-dm-sans)] text-base md:text-lg leading-relaxed"
            style={{
              color: theme.text,
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.6 }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
