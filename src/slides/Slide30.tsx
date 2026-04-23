"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide30() {
  const act = getSlideAct(30);
  const theme = actThemes[act];
  const { definingMoment } = analysis;

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden px-6 py-5"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.div
        className="shrink-0 text-center mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
          September 1, 2025
        </span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            lineHeight: 1.15,
            color: theme.text,
            marginTop: "0.2rem",
          }}
        >
          If we had to pick one moment.
        </h1>
      </motion.div>

      {/* Two-column layout — chat left, why-this-one right */}
      <div
        className="flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {/* Left — conversation */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {definingMoment.conversation.map((msg: any, i: number) => (
            <ChatBubble
              key={i}
              sender={msg.sender}
              content={msg.content}
              delay={0.25 + i * 0.15}
            />
          ))}
        </motion.div>

        {/* Right — why this one + context */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: "1rem",
              padding: "1.25rem",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              flex: 1,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: theme.text,
                marginBottom: "0.6rem",
              }}
            >
              Why this exchange
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.75rem",
                lineHeight: 1.6,
                color: theme.text,
                opacity: 0.85,
              }}
            >
              {definingMoment.whyThisOne}
            </p>
          </div>

          {/* Pull quote */}
          <div
            style={{
              borderLeft: `3px solid ${theme.accent}40`,
              paddingLeft: "1rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "1rem",
                color: theme.text,
                opacity: 0.7,
                lineHeight: 1.4,
              }}
            >
              The moment the conversation changed.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
