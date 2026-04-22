"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide35() {
  const act = getSlideAct(35);
  const theme = actThemes[act];

  const forecastText = analysis.forecast as string;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{
        background: `linear-gradient(180deg, ${theme.bg} 0%, #E8E4DC 50%, ${theme.bg} 100%)`,
      }}
    >
      {/* Subtle path/road visual element - SVG line motif */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.15 }}
      >
        <motion.path
          d="M 0 80 Q 100 60, 200 70 T 400 50"
          fill="none"
          stroke={theme.accent}
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 90 Q 150 70, 300 80 T 400 60"
          fill="none"
          stroke={theme.highlight}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>

      {/* Headline */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] italic text-center mb-8"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Where this goes.
      </motion.h1>

      {/* Forecast card with glass effect */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className="w-full max-w-3xl rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: `0 8px 32px rgba(111, 91, 74, 0.1), 0 2px 8px rgba(111, 91, 74, 0.05)`,
            border: `1px solid rgba(255, 255, 255, 0.3)`,
          }}
        >
          <p
            className="font-[family-name:var(--font-dm-sans)] text-base md:text-lg leading-relaxed"
            style={{ color: theme.text }}
          >
            {forecastText}
          </p>
        </div>
      </motion.div>

      {/* Subtle forward arrow indicator */}
      <motion.div
        className="flex justify-center mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg
          width="48"
          height="24"
          viewBox="0 0 48 24"
          fill="none"
          style={{ color: theme.accent }}
        >
          <motion.path
            d="M 4 12 L 40 12 M 32 6 L 40 12 L 32 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
