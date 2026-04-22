"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";

// Act 1 Theme
const THEME = {
  bg: "#FAF3E8",
  accent: "#C68B59",
  text: "#2C1A0E",
  highlight: "#E8CBA7",
  muted: "#8B6F4E",
};

const hourlyDistribution = stats.timing.hourlyDistribution as number[];
const peakHour = stats.timing.peakHour as number;
const lateNightCount = stats.lateNights.lateNightCount as number;

// Helper to format hour (0-23) to readable time
function formatHour(hour: number): string {
  if (hour === 0) return "12am";
  if (hour === 12) return "12pm";
  if (hour < 12) return `${hour}am`;
  return `${hour - 12}pm`;
}

export default function Slide06() {
  const maxCount = Math.max(...hourlyDistribution);
  const minHeight = 14;
  const maxBarLength = 103;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.8rem,4.5vw,3rem)] text-center text-balance"
          style={{ color: THEME.text }}
        >
          Your Hours
        </h2>
      </motion.div>

      {/* Radial Clock Section */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: 280, height: 280 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Clock center - Peak hour callout */}
        <motion.div
          className="absolute z-20 flex flex-col items-center justify-center rounded-full"
          style={{
            width: 60,
            height: 60,
            backgroundColor: THEME.bg,
            boxShadow: `0 0 40px 10px ${THEME.highlight}80`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span
            className="text-[0.7rem] font-[family-name:var(--font-dm-sans)] uppercase tracking-wider"
            style={{ color: THEME.muted }}
          >
            Peak
          </span>
          <span
            className="text-2xl font-[family-name:var(--font-playfair)] font-bold"
            style={{ color: THEME.accent }}
          >
            {formatHour(peakHour)}
          </span>
        </motion.div>

        {/* 24 radial bars */}
        {hourlyDistribution.map((count, index) => {
          const isPeak = index === peakHour;
          const rotation = index * 15;
          const barLength = minHeight + (count / maxCount) * (maxBarLength - minHeight);
          const opacity = 0.3 + (count / maxCount) * 0.7;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                bottom: "50%",
                left: "50%",
                width: 0,
                height: 0,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  width: isPeak ? 13 : 9,
                  height: barLength,
                  bottom: 33,
                  left: isPeak ? -6.5 : -4.5,
                  backgroundColor: isPeak ? THEME.accent : THEME.text,
                  borderRadius: isPeak ? "3px 3px 0 0" : "2px 2px 0 0",
                  boxShadow: isPeak
                    ? `0 0 20px 4px ${THEME.accent}60, 0 0 40px 8px ${THEME.highlight}40`
                    : "none",
                  transformOrigin: "bottom center",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: isPeak ? 1 : opacity }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          );
        })}

        {/* Hour labels */}
        {[0, 6, 12, 18].map((hour) => {
          const rotation = hour * 15 - 90;
          const labelRadius = 129;
          const x = Math.cos((rotation * Math.PI) / 180) * labelRadius;
          const y = Math.sin((rotation * Math.PI) / 180) * labelRadius;

          return (
            <motion.span
              key={hour}
              className="absolute text-xs font-[family-name:var(--font-dm-sans)]"
              style={{
                color: THEME.muted,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + hour * 0.02 }}
            >
              {hour === 0 ? "12" : hour}
            </motion.span>
          );
        })}

        {/* Inner decorative ring */}
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: 74,
            height: 74,
            borderColor: `${THEME.highlight}60`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.div>

      {/* Subtext Section */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <p
          className="font-[family-name:var(--font-dm-sans)] text-center text-[clamp(0.9rem,2vw,1.1rem)]"
          style={{ color: THEME.text }}
        >
          &ldquo;You&apos;re most alive at {formatHour(peakHour)}&rdquo;
        </p>
        <p
          className="font-[family-name:var(--font-dm-sans)] italic text-center text-[clamp(0.8rem,1.8vw,0.95rem)]"
          style={{ color: THEME.muted }}
        >
          and apparently {lateNightCount.toLocaleString()} messages after midnight too
        </p>
      </motion.div>
    </div>
  );
}
