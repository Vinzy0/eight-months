"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

interface Risk {
  rank: number;
  pattern: string;
  whyItsARisk: string;
  ifUnaddressed: string;
  evidence: string;
}

export default function Slide36() {
  const act = getSlideAct(36);
  const theme = actThemes[act];
  const risks: Risk[] = analysis.top3Risks;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Headline */}
      <motion.h1
        className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,5vw,3rem)] italic text-center mb-8"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The three things to watch.
      </motion.h1>

      {/* Risk Cards */}
      <div className="flex-1 flex flex-col gap-5 max-w-3xl mx-auto w-full">
        {risks.map((risk, index) => (
          <motion.div
            key={risk.rank}
            className="relative rounded-2xl p-5 md:p-6"
            style={{
              backgroundColor: `${theme.highlight}20`,
              borderLeft: `3px solid ${theme.accent}`,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.15,
              ease: "easeOut",
            }}
          >
            {/* Rank Badge */}
            <div
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-[family-name:var(--font-dm-sans)] font-bold text-sm"
              style={{
                backgroundColor: theme.accent,
                color: theme.bg,
              }}
            >
              {risk.rank}
            </div>

            {/* Pattern Title */}
            <h2
              className="font-[family-name:var(--font-dm-sans)] text-lg md:text-xl font-bold mb-3 pl-4"
              style={{ color: theme.text }}
            >
              {risk.pattern}
            </h2>

            {/* Why It's A Risk */}
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm md:text-base leading-relaxed mb-3"
              style={{ color: theme.text, opacity: 0.9 }}
            >
              {risk.whyItsARisk}
            </p>

            {/* If Unaddressed - Italic */}
            <p
              className="font-[family-name:var(--font-dm-sans)] text-sm italic leading-relaxed mb-4"
              style={{ color: theme.accent }}
            >
              {risk.ifUnaddressed}
            </p>

            {/* Evidence Quote */}
            <div
              className="rounded-lg px-4 py-3"
              style={{ backgroundColor: `${theme.accent}15` }}
            >
              <p
                className="font-[family-name:var(--font-dm-sans)] text-sm italic"
                style={{ color: theme.accent }}
              >
                {risk.evidence}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
