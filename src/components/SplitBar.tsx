"use client";

import { motion } from "framer-motion";

type Props = {
  leftPercent: number;
  rightPercent: number;
  leftLabel: string;
  rightLabel: string;
  leftColor?: string;
  rightColor?: string;
  delay?: number;
};

export default function SplitBar({
  leftPercent,
  rightPercent,
  leftLabel,
  rightLabel,
  leftColor = "#FDDCB5",
  rightColor = "#F4A7B9",
  delay = 0,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Bars container */}
      <div className="w-full flex items-center justify-center gap-8">
        {/* Left bar - grows from center to left */}
        <div className="flex-1 flex justify-end">
          <motion.div
            className="relative rounded-lg flex items-center justify-start overflow-hidden"
            style={{
              height: 48,
              background: leftColor,
              boxShadow: "0 4px 16px rgba(253,220,181,0.4)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${leftPercent}%` }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              delay,
            }}
          >
            {/* Percentage label - positioned at right edge of bar */}
            <motion.span
              className="absolute right-3 font-[family-name:var(--font-dm-sans)] font-semibold text-lg whitespace-nowrap"
              style={{ color: "#3D2B1F" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.4 }}
            >
              {leftPercent}%
            </motion.span>
          </motion.div>
        </div>

        {/* Right bar - grows from center to right */}
        <div className="flex-1 flex justify-start">
          <motion.div
            className="relative rounded-lg flex items-center justify-end overflow-hidden"
            style={{
              height: 48,
              background: rightColor,
              boxShadow: "0 4px 16px rgba(244,167,185,0.3)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${rightPercent}%` }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              delay,
            }}
          >
            {/* Percentage label - positioned at left edge of bar */}
            <motion.span
              className="absolute left-3 font-[family-name:var(--font-dm-sans)] font-semibold text-lg whitespace-nowrap"
              style={{ color: "#3D2B1F" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.4 }}
            >
              {rightPercent}%
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Name labels */}
      <div className="w-full flex items-center justify-center gap-8 mt-4">
        <motion.span
          className="flex-1 text-right font-[family-name:var(--font-dm-sans)] font-medium text-base"
          style={{ color: "#3D2B1F" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.4 }}
        >
          {leftLabel}
        </motion.span>
        <motion.span
          className="flex-1 text-left font-[family-name:var(--font-dm-sans)] font-medium text-base"
          style={{ color: "#3D2B1F" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.4 }}
        >
          {rightLabel}
        </motion.span>
      </div>
    </div>
  );
}
