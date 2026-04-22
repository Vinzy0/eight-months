"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";

// Monthly message volume data from analysis
const monthlyData = analysis.communicationPatterns.affectionConsistency.monthlyApproximation;

const months = [
  { key: "2025-07", label: "Jul", value: monthlyData["2025-07"] },
  { key: "2025-08", label: "Aug", value: monthlyData["2025-08"] },
  { key: "2025-09", label: "Sep", value: monthlyData["2025-09"] },
  { key: "2025-10", label: "Oct", value: monthlyData["2025-10"] },
  { key: "2025-11", label: "Nov", value: monthlyData["2025-11"] },
  { key: "2025-12", label: "Dec", value: monthlyData["2025-12"] },
  { key: "2026-01", label: "Jan", value: monthlyData["2026-01"] },
  { key: "2026-02", label: "Feb", value: monthlyData["2026-02"] },
  { key: "2026-03", label: "Mar", value: monthlyData["2026-03"] },
  { key: "2026-04", label: "Apr", value: monthlyData["2026-04"] },
];

const maxValue = Math.max(...months.map((m) => m.value));
const minValue = Math.min(...months.map((m) => m.value));

// SVG chart dimensions
const chartWidth = 700;
const chartHeight = 200;
const padding = { top: 20, right: 30, bottom: 40, left: 60 };
const graphWidth = chartWidth - padding.left - padding.right;
const graphHeight = chartHeight - padding.top - padding.bottom;

// Generate path for line chart
function generatePath() {
  const points = months.map((month, index) => {
    const x = padding.left + (index / (months.length - 1)) * graphWidth;
    const y =
      padding.top +
      graphHeight -
      ((month.value - 0) / (maxValue - 0)) * graphHeight;
    return { x, y, value: month.value };
  });

  // Create smooth line path
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }

  return { path, points };
}

const { path: linePath, points } = generatePath();
const pathLength = 2000; // Approximate path length for animation

export default function Slide18() {
  const emotionalLoad = analysis.communicationPatterns.emotionalLoad;
  const attachmentSignals = analysis.communicationPatterns.attachmentSignals;

  return (
    <div
      className="relative w-full h-full px-6 py-6 flex flex-col"
      style={{ backgroundColor: "#F7EDE0" }}
    >
      {/* Header */}
      <motion.h2
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.4rem,3.5vw,2rem)] text-center mb-2"
        style={{ color: "#3D2B1F" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Affection & Attachment
      </motion.h2>

      {/* LINE CHART - Top Half */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-3xl">
          <p
            className="font-[family-name:var(--font-dm-sans)] text-sm text-center mb-2"
            style={{ color: "#5D4A3A" }}
          >
            Monthly Message Volume
          </p>

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto"
            style={{ maxHeight: "150px" }}
          >
            {/* Y-axis grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
              <line
                key={tick}
                x1={padding.left}
                y1={padding.top + graphHeight * (1 - tick)}
                x2={padding.left + graphWidth}
                y2={padding.top + graphHeight * (1 - tick)}
                stroke="#D4C4B0"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))}

            {/* Y-axis labels */}
            <text
              x={padding.left - 10}
              y={padding.top + 5}
              textAnchor="end"
              fontSize="12"
              fill="#8B7355"
              fontFamily="var(--font-dm-sans)"
            >
              {Math.round(maxValue / 1000)}k
            </text>
            <text
              x={padding.left - 10}
              y={padding.top + graphHeight / 2 + 5}
              textAnchor="end"
              fontSize="12"
              fill="#8B7355"
              fontFamily="var(--font-dm-sans)"
            >
              {Math.round(maxValue / 2000)}k
            </text>
            <text
              x={padding.left - 10}
              y={padding.top + graphHeight + 5}
              textAnchor="end"
              fontSize="12"
              fill="#8B7355"
              fontFamily="var(--font-dm-sans)"
            >
              0
            </text>

            {/* Animated line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#A67B5B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Data points */}
            {points.map((point, index) => {
              const isPeak = point.value === maxValue;
              const isDip = point.value === minValue;

              return (
                <motion.g key={index}>
                  {/* Dot */}
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={isPeak || isDip ? 6 : 4}
                    fill={isPeak ? "#C68B59" : isDip ? "#8B6914" : "#A67B5B"}
                    stroke="#F7EDE0"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + (index / months.length) * 2,
                      ease: "backOut",
                    }}
                  />

                  {/* Peak/Dip labels */}
                  {(isPeak || isDip) && (
                    <motion.text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isPeak ? "#C68B59" : "#8B6914"}
                      fontWeight="600"
                      fontFamily="var(--font-dm-sans)"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + (index / months.length) * 2 + 0.2,
                      }}
                    >
                      {isPeak ? "Peak" : "Dip"}
                    </motion.text>
                  )}
                </motion.g>
              );
            })}

            {/* X-axis labels */}
            {months.map((month, index) => (
              <text
                key={month.key}
                x={padding.left + (index / (months.length - 1)) * graphWidth}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#5D4A3A"
                fontFamily="var(--font-dm-sans)"
              >
                {month.label}
              </text>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#C68B59" }}
              />
              <span
                className="text-xs font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#5D4A3A" }}
              >
                Aug Peak ({maxValue.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#8B6914" }}
              />
              <span
                className="text-xs font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#5D4A3A" }}
              >
                Apr Dip ({minValue.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EMOTIONAL LOAD - Middle Section */}
      <motion.div
        className="flex justify-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-2xl px-6 py-3 backdrop-blur-sm w-full max-w-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "1px solid #D4C4B0",
          }}
        >
          <h3
            className="font-[family-name:var(--font-playfair)] text-center text-lg mb-2"
            style={{ color: "#3D2B1F" }}
          >
            Emotional Load
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Vince */}
            <div className="text-center">
              <h4
                className="font-[family-name:var(--font-playfair)] font-semibold mb-1"
                style={{ color: "#5A3E28" }}
              >
                Vince
              </h4>
              <p
                className="font-[family-name:var(--font-dm-sans)] text-sm italic"
                style={{ color: "#5D4A3A" }}
              >
                vents about jealousy + self-image
              </p>
            </div>

            {/* Princess */}
            <div className="text-center">
              <h4
                className="font-[family-name:var(--font-playfair)] font-semibold mb-1"
                style={{ color: "#5A3E28" }}
              >
                Princess
              </h4>
              <p
                className="font-[family-name:var(--font-dm-sans)] text-sm italic"
                style={{ color: "#5D4A3A" }}
              >
                vents about family + school
              </p>
            </div>
          </div>

          {/* Balance indicator */}
          <div className="mt-2 pt-2 border-t border-[#D4C4B0]">
            <p
              className="font-[family-name:var(--font-dm-sans)] text-center text-sm font-medium"
              style={{ color: "#A67B5B" }}
            >
              {emotionalLoad.balance}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ATTACHMENT CHIPS - Bottom Section */}
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Vince - Anxious-leaning */}
        <motion.div
          className="rounded-xl p-4 max-w-[200px]"
          style={{
            backgroundColor: "rgba(166, 123, 91, 0.15)",
            border: "1px solid #A67B5B",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#A67B5B" }}
            />
            <h4
              className="font-[family-name:var(--font-playfair)] font-semibold text-sm"
              style={{ color: "#5A3E28" }}
            >
              Vince
            </h4>
          </div>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs font-medium mb-1"
            style={{ color: "#3D2B1F" }}
          >
            Anxious-leaning
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed"
            style={{ color: "#5D4A3A" }}
          >
            {attachmentSignals.vincePattern}
          </p>
        </motion.div>

        {/* Princess - Avoidant-leaning */}
        <motion.div
          className="rounded-xl p-4 max-w-[200px]"
          style={{
            backgroundColor: "rgba(198, 139, 89, 0.15)",
            border: "1px solid #C68B59",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C68B59" }}
            />
            <h4
              className="font-[family-name:var(--font-playfair)] font-semibold text-sm"
              style={{ color: "#5A3E28" }}
            >
              Princess
            </h4>
          </div>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs font-medium mb-1"
            style={{ color: "#3D2B1F" }}
          >
            Avoidant-leaning
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed"
            style={{ color: "#5D4A3A" }}
          >
            {attachmentSignals.princessPattern}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
