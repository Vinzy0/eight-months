"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide33() {
  const act = getSlideAct(33);
  const theme = actThemes[act];

  // Full letter text — extract salutation and body paragraphs
  const fullLetter = analysis.theLoveLetter as string;

  // Remove the "Princess," salutation and split remaining text into paragraphs
  const bodyText = fullLetter.replace(/^Princess,\s*\n\n/, "");
  const letterParagraphs = bodyText.split("\n\n");

  return (
    <div
      className="relative w-full h-full px-6 py-12 flex flex-col overflow-y-auto"
      style={{
        background: `linear-gradient(135deg, ${theme.bg} 0%, #FDE8E8 50%, ${theme.bg} 100%)`,
      }}
    >
      {/* Salutation Header */}
      <motion.h1
        className="font-[family-name:var(--font-dancing)] text-[clamp(2.5rem,6vw,4rem)] text-center mb-10"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Dear Princess,
      </motion.h1>

      {/* Letter Body — Paragraph by paragraph fade */}
      <div className="flex-1 flex flex-col">
        {letterParagraphs.map((para, i) => (
          <motion.p
            key={i}
            className="font-[family-name:var(--font-dancing)] text-lg md:text-xl leading-relaxed"
            style={{
              color: theme.text,
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.8 }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
