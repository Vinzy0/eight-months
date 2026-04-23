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
          The Full Picture
        </h1>
      </motion.div>

      {/* Body — 3 columns */}
      <div
        className="flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.65rem",
        }}
      >
        {/* Col 1 — What She Does to Him */}
        <motion.div
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            borderLeft: `3px solid ${theme.highlight}60`,
            borderRadius: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.2,
            }}
          >
            What She Does to Him
          </h3>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.7rem",
              lineHeight: 1.5,
              color: theme.text,
              opacity: 0.8,
            }}
          >
            {whatSheDoesToVince.summary}
          </p>
          <div style={{ marginTop: "auto" }}>
            <ChatBubble sender="vince" content={whatSheDoesToVince.afterQuote} delay={0.4} />
          </div>
        </motion.div>

        {/* Col 2 — What He Does to Her */}
        <motion.div
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            borderLeft: `3px solid ${theme.highlight}60`,
            borderRadius: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.2,
            }}
          >
            What He Does to Her
          </h3>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.7rem",
              lineHeight: 1.5,
              color: theme.text,
              opacity: 0.8,
            }}
          >
            {whatVinceDoesToPrincess.summary}
          </p>
          <div style={{ marginTop: "auto" }}>
            <ChatBubble sender="princess" content={whatVinceDoesToPrincess.afterQuote} delay={0.5} />
          </div>
        </motion.div>

        {/* Col 3 — Yellow Flags */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", overflow: "hidden" }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.text,
              flexShrink: 0,
            }}
          >
            Awareness Notes
          </h2>
          {yellowFlags.map((flag: any, i: number) => (
            <motion.div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.35)",
                borderLeft: "3px solid rgba(255,193,7,0.35)",
                borderRadius: "0.75rem",
                padding: "0.65rem 0.85rem",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: "0.2rem",
                }}
              >
                {flag.pattern}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.63rem",
                  lineHeight: 1.4,
                  color: theme.text,
                  opacity: 0.75,
                }}
              >
                {flag.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
