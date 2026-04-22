"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

const emojis: Record<string, string> = {
  "Words of Affirmation": "🗣️",
  "Acts of Service": "🎁",
  "Quality Time": "⏰",
  "Physical Touch": "🤗",
};

export default function Slide27() {
  const theme = actThemes[getSlideAct(27)];
  const { loveLanguages } = analysis;

  const Card = ({
    lang,
    who,
    type,
    delay,
    isPrimary,
  }: {
    lang: { language: string; evidence: string };
    who: string;
    type: string;
    delay: number;
    isPrimary: boolean;
  }) => (
    <motion.div
      className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
        isPrimary ? "border-2" : ""
      }`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderColor: isPrimary ? `${theme.accent}40` : `${theme.accent}20`,
        border: isPrimary ? undefined : `1px solid ${theme.accent}20`,
        boxShadow: `0 4px 24px ${theme.accent}15`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={isPrimary ? "text-2xl" : "text-xl"}>
          {emojis[lang.language]}
        </span>
        <span
          className={`font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider ${
            isPrimary ? "font-bold" : ""
          }`}
          style={{ color: theme.accent, opacity: isPrimary ? 1 : 0.8 }}
        >
          {who} · {type}
        </span>
      </div>
      <h3
        className={`font-[family-name:var(--font-playfair)] font-bold mb-3 ${
          isPrimary ? "text-xl" : "text-lg"
        }`}
        style={{ color: theme.text }}
      >
        {lang.language}
      </h3>
      <p
        className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed"
        style={{ color: theme.text, opacity: isPrimary ? 0.8 : 0.75 }}
      >
        {lang.evidence}
      </p>
    </motion.div>
  );

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.bg }}
    >
      <motion.h1
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,6vw,3.5rem)] text-center mb-2"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        How You Love
      </motion.h1>

      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-sm mb-8 opacity-60"
        style={{ color: theme.accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        The five languages, translated
      </motion.p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mb-4">
        <Card lang={loveLanguages.vincePrimary} who="Vince" type="Primary" delay={0.2} isPrimary />
        <Card lang={loveLanguages.princessPrimary} who="Princess" type="Primary" delay={0.3} isPrimary />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mb-6">
        <Card lang={loveLanguages.vinceSecondary} who="Vince" type="Secondary" delay={0.4} isPrimary={false} />
        <Card lang={loveLanguages.princessSecondary} who="Princess" type="Secondary" delay={0.5} isPrimary={false} />
      </div>

      <motion.div
        className="rounded-2xl p-6 backdrop-blur-sm w-full max-w-4xl border-l-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderLeftColor: theme.highlight,
          boxShadow: `0 4px 24px ${theme.accent}15`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💕</span>
          <span
            className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider font-bold"
            style={{ color: theme.accent }}
          >
            The Compatibility Read
          </span>
        </div>
        <p
          className="font-[family-name:var(--font-dm-sans)] text-sm md:text-base leading-relaxed italic"
          style={{ color: theme.text, opacity: 0.85 }}
        >
          {loveLanguages.compatibilityRead}
        </p>
      </motion.div>
    </div>
  );
}
