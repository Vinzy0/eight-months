"use client";

import { motion } from "framer-motion";
import { getSlideAct, actThemes } from "@/lib/colors";
// Inline SVG icons (lucide-react not installed)
function SparklesIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function MessageCircleIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function HeartIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ArrowRightIcon({ size = 24, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// Stage data
const stageData = {
  trigger: {
    label: "It starts with...",
    title: "Jealousy or Overthinking",
    description: "Vince gets jealous, Princess overthinks",
    Icon: SparklesIcon,
  },
  escalation: {
    label: "Then it becomes...",
    title: "Quiet Withdrawal Meets Anxious Double-Texting",
    description: "He goes quiet, she sends five more messages",
    Icon: MessageCircleIcon,
  },
  resolution: {
    label: "But you always...",
    title: "Long Apology + 'I Love You' Within the Hour",
    description: "Repair is your strongest skill",
    Icon: HeartIcon,
  },
};

interface StageCardProps {
  stage: typeof stageData.trigger;
  index: number;
  theme: { bg: string; accent: string; highlight: string; text: string };
}

function StageCard({ stage, index, theme }: StageCardProps) {
  const IconComponent = stage.Icon;
  const delay = index * 0.8;

  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-xs"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Stage number / label */}
      <motion.span
        className="text-xs font-[family-name:var(--font-dm-sans)] uppercase tracking-widest mb-3"
        style={{ color: theme.accent, opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {stage.label}
      </motion.span>

      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: theme.highlight, opacity: 0.3 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        <IconComponent size={28} color={theme.accent} />
      </motion.div>

      {/* Title */}
      <h3
        className="text-lg md:text-xl font-bold font-[family-name:var(--font-playfair)] mb-2"
        style={{ color: theme.text }}
      >
        {stage.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm font-[family-name:var(--font-dm-sans)]"
        style={{ color: theme.accent, opacity: 0.8 }}
      >
        {stage.description}
      </p>
    </motion.div>
  );
}

interface ArrowConnectorProps {
  delay: number;
  theme: { accent: string };
}

function ArrowConnector({ delay, theme }: ArrowConnectorProps) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center px-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <ArrowRightIcon size={24} color={theme.accent} />
    </motion.div>
  );
}

export default function Slide17() {
  const act = getSlideAct(17);
  const theme = actThemes[act];

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-between"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)]"
          style={{ color: theme.text }}
        >
          How You Fight
        </h2>
        <p
          className="mt-2 text-sm md:text-base font-[family-name:var(--font-dm-sans)]"
          style={{ color: theme.accent, opacity: 0.7 }}
        >
          The pattern you both know by heart
        </p>
      </motion.div>

      {/* 3-Stage Visual */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full max-w-5xl">
        {/* Stage 1: Trigger */}
        <StageCard stage={stageData.trigger} index={0} theme={theme} />

        {/* Arrow 1 */}
        <ArrowConnector delay={0.6} theme={theme} />

        {/* Stage 2: Escalation */}
        <StageCard stage={stageData.escalation} index={1} theme={theme} />

        {/* Arrow 2 */}
        <ArrowConnector delay={1.4} theme={theme} />

        {/* Stage 3: Resolution */}
        <StageCard stage={stageData.resolution} index={2} theme={theme} />
      </div>

      {/* Pull Quote */}
      <motion.div
        className="max-w-xl mx-auto text-center px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-4xl font-[family-name:var(--font-playfair)] select-none"
          style={{ color: theme.accent, opacity: 0.3 }}
        >
          &ldquo;
        </span>
        <p
          className="text-base md:text-lg italic font-[family-name:var(--font-playfair)] leading-relaxed -mt-4"
          style={{ color: theme.text }}
        >
          pero most times na nababadtrip ako sayo, its because of jealousy
        </p>
        <div
          className="mt-2 text-xs font-[family-name:var(--font-dm-sans)]"
          style={{ color: theme.accent, opacity: 0.6 }}
        >
          — Vince
        </div>
      </motion.div>
    </div>
  );
}
