"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide29() {
  const act = getSlideAct(29);
  const theme = actThemes[act];
  const { yellowFlags, whatSheDoesToVince, whatVinceDoesToPrincess } = analysis;

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
        The Full Picture
      </motion.h1>

      {/* Split Layout */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* LEFT COLUMN — Transformation Stories */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Story 1: What She Does to Him */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderLeft: `4px solid ${theme.highlight}50`,
            }}
          >
            <h3
              className="font-[family-name:var(--font-playfair)] text-lg font-bold mb-2"
              style={{ color: theme.text }}
            >
              What She Does to Him
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-4"
              style={{ color: theme.text, opacity: 0.85 }}
            >
              {whatSheDoesToVince.summary}
            </p>
            <div className="flex flex-col gap-3">
              <ChatBubble sender="vince" content={whatSheDoesToVince.beforeQuote} delay={0.3} />
              <ChatBubble sender="vince" content={whatSheDoesToVince.afterQuote} delay={0.4} />
            </div>
          </div>

          {/* Story 2: What He Does to Her */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderLeft: `4px solid ${theme.highlight}50`,
            }}
          >
            <h3
              className="font-[family-name:var(--font-playfair)] text-lg font-bold mb-2"
              style={{ color: theme.text }}
            >
              What He Does to Her
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-4"
              style={{ color: theme.text, opacity: 0.85 }}
            >
              {whatVinceDoesToPrincess.summary}
            </p>
            <div className="flex flex-col gap-3">
              <ChatBubble sender="princess" content={whatVinceDoesToPrincess.beforeQuote} delay={0.5} />
              <ChatBubble sender="princess" content={whatVinceDoesToPrincess.afterQuote} delay={0.6} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Yellow Flags */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-4"
            style={{ color: theme.text }}
          >
            Awareness Notes
          </h2>
          <div className="flex flex-col gap-3">
            {yellowFlags.map((flag: any, index: number) => (
              <motion.div
                key={index}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  borderLeft: "3px solid rgba(255, 193, 7, 0.3)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <h4
                  className="font-[family-name:var(--font-dm-sans)] text-sm font-bold mb-1"
                  style={{ color: theme.text }}
                >
                  {flag.pattern}
                </h4>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed mb-2"
                  style={{ color: theme.text, opacity: 0.8 }}
                >
                  {flag.description}
                </p>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-xs italic leading-relaxed"
                  style={{ color: theme.accent, opacity: 0.65 }}
                >
                  &ldquo;{flag.evidence}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
