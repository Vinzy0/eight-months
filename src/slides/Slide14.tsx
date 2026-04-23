"use client";

import { motion } from "framer-motion";
import { analysis, formatDateShort } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

interface InsideJoke {
  phrase: string;
  probableMeaning: string;
  firstSeen: string;
  frequency: string;
}

export default function Slide14() {
  const jokes: InsideJoke[] = analysis.insideJokes;
  const act = getSlideAct(14);
  const theme = actThemes[act];

  const [j0, j1, j2, j3, j4, j5, j6, j7] = jokes;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  const cardBase: React.CSSProperties = {
    backgroundColor: `${theme.text}07`,
    borderColor: `${theme.accent}18`,
    border: "1px solid",
    borderRadius: "1.25rem",
    padding: "1rem 1.125rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  const phrase = (text: string, size = "1rem") => (
    <p
      style={{
        fontFamily: "var(--font-playfair)",
        fontStyle: "italic",
        fontSize: size,
        lineHeight: 1.2,
        color: theme.text,
        marginBottom: "0.4rem",
      }}
    >
      &ldquo;{text}&rdquo;
    </p>
  );

  const meta = (joke: InsideJoke) => (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        fontSize: "0.65rem",
        fontFamily: "var(--font-dm-sans)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: theme.accent,
        opacity: 0.8,
        marginTop: "0.5rem",
      }}
    >
      <span>{joke.frequency}×</span>
      <span>·</span>
      <span>{formatDateShort(joke.firstSeen)}</span>
    </div>
  );

  const meaning = (text: string) => (
    <p
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "0.72rem",
        lineHeight: 1.5,
        color: theme.text,
        opacity: 0.7,
      }}
    >
      {text}
    </p>
  );

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="w-full h-full flex flex-col px-6 py-6 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div className="mb-4 shrink-0" {...fade(0)}>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 700,
              color: theme.accent,
              opacity: 0.7,
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            The Patterns You Never Noticed
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: theme.text,
              lineHeight: 1.1,
            }}
          >
            Inside Jokes
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div
          className="flex-1 min-h-0"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gap: "0.625rem",
          }}
        >
          {/* Hero card — col 1, rows 1-2 */}
          <motion.div
            {...fade(0.1)}
            style={{
              ...cardBase,
              gridColumn: "1",
              gridRow: "1 / 3",
              backgroundColor: `${theme.highlight}35`,
              borderColor: `${theme.accent}30`,
              padding: "1.5rem",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(8px)",
              boxShadow: `0 8px 32px ${theme.accent}12`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                lineHeight: 1.15,
                color: theme.text,
                marginBottom: "0.75rem",
              }}
            >
              &ldquo;{j4.phrase}&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.8rem",
                lineHeight: 1.55,
                color: theme.text,
                opacity: 0.75,
                marginBottom: "1rem",
                maxWidth: "28ch",
                margin: "0 auto 1rem",
              }}
            >
              {j4.probableMeaning}
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: "0.75rem",
                alignItems: "center",
                backgroundColor: theme.accent,
                color: theme.bg,
                borderRadius: "999px",
                padding: "0.25rem 0.85rem",
                fontSize: "0.65rem",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <span>{j4.frequency}×</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>{formatDateShort(j4.firstSeen)}</span>
            </div>
          </motion.div>

          {/* j0 — col 2, row 1 */}
          <motion.div {...fade(0.15)} style={{ ...cardBase, gridColumn: "2", gridRow: "1" }}>
            {phrase(j0.phrase, "0.8rem")}
            {meaning(j0.probableMeaning)}
            {meta(j0)}
          </motion.div>

          {/* j1 — col 3, row 1 */}
          <motion.div {...fade(0.2)} style={{ ...cardBase, gridColumn: "3", gridRow: "1" }}>
            {phrase(j1.phrase, "0.8rem")}
            {meaning(j1.probableMeaning)}
            {meta(j1)}
          </motion.div>

          {/* j2 — col 2, row 2 */}
          <motion.div {...fade(0.25)} style={{ ...cardBase, gridColumn: "2", gridRow: "2" }}>
            {phrase(j2.phrase, "0.8rem")}
            {meaning(j2.probableMeaning)}
            {meta(j2)}
          </motion.div>

          {/* j3 — col 3, row 2 */}
          <motion.div {...fade(0.3)} style={{ ...cardBase, gridColumn: "3", gridRow: "2" }}>
            {phrase(j3.phrase, "0.8rem")}
            {meaning(j3.probableMeaning)}
            {meta(j3)}
          </motion.div>

          {/* j5 — col 1, row 3 */}
          <motion.div {...fade(0.35)} style={{ ...cardBase, gridColumn: "1", gridRow: "3" }}>
            {phrase(j5.phrase, "0.85rem")}
            {meaning(j5.probableMeaning)}
            {meta(j5)}
          </motion.div>

          {/* j6 — col 2, row 3 */}
          <motion.div {...fade(0.4)} style={{ ...cardBase, gridColumn: "2", gridRow: "3" }}>
            {phrase(j6.phrase, "0.85rem")}
            {meaning(j6.probableMeaning)}
            {meta(j6)}
          </motion.div>

          {/* j7 — col 3, row 3 */}
          <motion.div {...fade(0.45)} style={{ ...cardBase, gridColumn: "3", gridRow: "3" }}>
            {phrase(j7.phrase, "0.85rem")}
            {meaning(j7.probableMeaning)}
            {meta(j7)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
