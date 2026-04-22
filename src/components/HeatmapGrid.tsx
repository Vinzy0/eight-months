"use client";

import { motion } from "framer-motion";

type Props = {
  cells: number[];
  labels?: string[];
  maxValue: number;
  accentColor?: string;
  highlightIndex?: number;
  delay?: number;
  cellSize?: number;
  gap?: number;
};

export default function HeatmapGrid({
  cells,
  labels,
  maxValue,
  accentColor = "#C68B59",
  highlightIndex,
  delay = 0,
  cellSize = 28,
  gap = 4,
}: Props) {
  const getCellOpacity = (value: number) => {
    const normalized = value / maxValue;
    return normalized * 0.8 + 0.2;
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{ gap: labels ? 8 : 0 }}
    >
      <div
        className="flex flex-wrap justify-center"
        style={{ gap }}
      >
        {cells.map((value, index) => {
          const opacity = getCellOpacity(value);
          const isHighlighted = highlightIndex === index;
          const cellDelay = delay + index * 0.03;

          const cellStyle = {
            width: cellSize,
            height: cellSize,
            backgroundColor: accentColor,
            opacity: 0,
            boxShadow: isHighlighted ? `0 0 12px ${accentColor}80` : "none",
          };

          return (
            <motion.div
              key={index}
              className="rounded-sm"
              style={cellStyle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: opacity,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                delay: cellDelay,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {labels && labels.length > 0 && (
        <div
          className="flex flex-wrap justify-center"
          style={{ gap }}
        >
          {labels.map((label, index) => (
            <motion.span
              key={index}
              className="text-xs text-center font-[family-name:var(--font-dm-sans)]"
              style={{
                width: cellSize,
                color: "#8B6F4E",
                opacity: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{
                duration: 0.3,
                delay: delay + index * 0.03 + 0.2,
                ease: "easeOut",
              }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
