"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide37() {
  const act = getSlideAct(37);
  const theme = actThemes[act];
  const strengths = analysis.top3Strengths;

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
        The three things to protect.
      </motion.h1>

      {/* Strength Cards */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 mb-6">
        {strengths.map((strength: any, index: number) => (
          <motion.div
            key={index}
            className="rounded-2xl p-6 flex flex-col gap-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderLeft: `4px solid ${theme.highlight}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
          >
            {/* Rank Badge and Title Row */}
            <div className="flex items-start gap-4">
              {/* Rank Badge */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-[family-name:var(--font-playfair)] text-lg font-bold"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.bg,
                }}
              >
                {strength.rank}
              </div>

              {/* Strength Title */}
              <h3
                className="font-[family-name:var(--font-playfair)] text-xl font-bold pt-1"
                style={{ color: theme.text }}
              >
                {strength.strength}
              </h3>
            </div>

            {/* Evidence */}
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed ml-14"
              style={{ color: theme.text, opacity: 0.85 }}
            >
              {strength.evidence}
            </p>

            {/* Why To Protect */}
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm italic leading-relaxed ml-14"
              style={{ color: theme.highlight }}
            >
              {strength.whyToProtect}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
