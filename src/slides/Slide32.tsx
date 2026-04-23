"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide32() {
  const act = getSlideAct(32);
  const theme = actThemes[act];
  const { whatVinceDoesToPrincess } = analysis;

  const columns = [
    {
      label: "August 2025",
      traits: ["avoidant by default", "disappears when hurt", "I'm fine"],
      quote: whatVinceDoesToPrincess.beforeQuote,
      sender: "princess" as const,
      delay: 0.2,
    },
    {
      label: "November 2025",
      traits: ["writes long apologies", "names her feelings", "stays through the hard"],
      quote: whatVinceDoesToPrincess.afterQuote,
      sender: "princess" as const,
      delay: 0.35,
    },
    {
      // from whatVinceDoesToPrincess.summary — Princess reaching out at 2am, April 2026
      label: "April 2026",
      traits: ["reaches out at 2am", "names her stress", "chooses to stay"],
      quote: "babyyyyyy wake up pls (Princess, 2026-04)",
      sender: "princess" as const,
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
          What Vince does to Princess.
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
        {whatVinceDoesToPrincess.summary}
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
        He changed how she shows up.
      </motion.p>
    </div>
  );
}
