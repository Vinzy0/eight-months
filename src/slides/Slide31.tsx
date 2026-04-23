"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide31() {
  const act = getSlideAct(31);
  const theme = actThemes[act];
  const { whatSheDoesToVince } = analysis;

  const columns = [
    {
      label: "July 2025",
      traits: ["short fragments", "avoidant", "dry banter"],
      quote: whatSheDoesToVince.beforeQuote,
      sender: "vince" as const,
      delay: 0.2,
    },
    {
      label: "September 2025",
      traits: ["long paragraphs", "names his feelings", "writes to stay"],
      quote: whatSheDoesToVince.afterQuote,
      sender: "vince" as const,
      delay: 0.35,
    },
    {
      // from quotePairs 2026-03-30 — Vince naming emotion instead of shutting down
      label: "March 2026",
      traits: ["stays through conflict", "names his sadness", "doesn't disappear"],
      quote: "its honestly because i still feel sad, it doesn't mean that i love u any less (Vince, 2026-03-30)",
      sender: "vince" as const,
      delay: 0.5,
    },
  ];

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
          What This All Means
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
          What Princess does to Vince.
        </h1>
      </motion.div>

      {/* Summary */}
      <motion.p
        className="shrink-0 mb-4"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "0.75rem",
          lineHeight: 1.55,
          color: theme.text,
          opacity: 0.75,
          maxWidth: "70ch",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {whatSheDoesToVince.summary}
      </motion.p>

      {/* Three-column timeline */}
      <div
        className="flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.65rem",
        }}
      >
        {columns.map((col, i) => (
          <motion.div
            key={col.label}
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "1rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              overflow: "hidden",
              borderTop: `3px solid ${theme.accent}${i === 2 ? "80" : "30"}`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: col.delay }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: theme.accent,
              }}
            >
              {col.label}
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {col.traits.map((trait) => (
                <span
                  key={trait}
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.bg,
                    borderRadius: "999px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.62rem",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 600,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "auto" }}>
              <ChatBubble sender={col.sender} content={col.quote} delay={col.delay + 0.1} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom line */}
      <motion.p
        className="shrink-0 text-center mt-3"
        style={{
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          fontSize: "1rem",
          color: theme.text,
          opacity: 0.65,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        She changed how he shows up.
      </motion.p>
    </div>
  );
}
