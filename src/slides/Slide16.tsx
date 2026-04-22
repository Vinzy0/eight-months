"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";
import SplitBar from "@/components/SplitBar";
import PullQuote from "@/components/PullQuote";

export default function Slide16() {
  const { vince, princess } = stats.initiation.conversationStarterPercent;

  return (
    <div
      className="relative w-full h-full px-6 py-12 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F7EDE0" }}
    >
      {/* Headline */}
      <motion.h2
        className="font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,4.5vw,2.8rem)] text-center mb-12"
        style={{ color: "#2C1A0E" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Who Starts the Conversations?
      </motion.h2>

      {/* SplitBar - Conversation Starter Percentages */}
      <div className="w-full max-w-3xl mb-8">
        <SplitBar
          leftPercent={vince}
          rightPercent={princess}
          leftLabel="Vince"
          rightLabel="Princess"
          delay={0.3}
        />
      </div>

      {/* PullQuote - Fades in after bar animation completes */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <PullQuote
          quote="Princess drives initiation; Vince drives depth. She carries the bandwidth, he carries the weight."
          sender="Pattern Analysis"
        />
      </motion.div>
    </div>
  );
}
