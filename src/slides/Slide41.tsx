"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide41() {
  const act = getSlideAct(41);
  const theme = actThemes[act];
  const prediction = analysis.theBet;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-center overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Headline */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-center leading-[1.1] mb-8"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My bet.
      </motion.h1>

      {/* Prediction Card */}
      <motion.div
        className="w-full max-w-2xl rounded-2xl p-8 shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderLeft: `4px solid ${theme.accent}`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p
          className="font-[family-name:var(--font-dm-sans)] text-[clamp(0.95rem,2vw,1.125rem)] leading-[1.8]"
          style={{ color: theme.text }}
        >
          {prediction}
        </p>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-sm italic text-center mt-8"
        style={{ color: theme.highlight }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Screenshot this. Check back in 6 months.
      </motion.p>
    </div>
  );
}
