"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide28() {
  const act = getSlideAct(28);
  const theme = actThemes[act];
  const greenFlags: any[] = analysis.greenFlags;

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden px-6 py-5"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.div
        className="shrink-0 mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.62rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontWeight: 700,
            color: theme.accent,
            opacity: 0.7,
          }}
        >
          What You&apos;re Doing Right
        </span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "clamp(1.7rem, 4vw, 2.8rem)",
            lineHeight: 1.1,
            color: theme.text,
            marginTop: "0.2rem",
          }}
        >
          Seven Green Flags
        </h1>
      </motion.div>

      {/* Grid — 3 cols so 7 cards fit in 3 rows */}
      <div
        className="flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "0.6rem",
        }}
      >
        {greenFlags.map((flag: any, i: number) => (
          <motion.div
            key={i}
            style={{
              backgroundColor: "rgba(255,255,255,0.45)",
              borderLeft: "3px solid rgba(76,175,80,0.35)",
              borderRadius: "1rem",
              padding: "0.85rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              overflow: "hidden",
              // last card spans 2 cols to fill the row
              ...(i === 6 ? { gridColumn: "2 / 4" } : {}),
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 * i }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#4CAF50",
                lineHeight: 1.2,
              }}
            >
              {flag.pattern}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.7rem",
                lineHeight: 1.45,
                color: theme.text,
                opacity: 0.85,
              }}
            >
              {flag.description}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                fontStyle: "italic",
                lineHeight: 1.4,
                color: theme.accent,
                opacity: 0.65,
                marginTop: "auto",
              }}
            >
              &ldquo;{flag.evidence}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
