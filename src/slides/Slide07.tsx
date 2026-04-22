"use client";

import { motion } from "framer-motion";
import { stats, formatDate } from "@/lib/slideData";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Slide07() {
  const dailyDistribution = stats.timing.dailyDistribution;
  const peakDay = stats.timing.peakDay;
  const maxValue = Math.max(...dailyDistribution);

  const formattedMostActiveDate = formatDate(stats.timing.mostActiveDate);

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          Your Days
        </h2>
      </motion.div>

      {/* Day-of-week bars Section */}
      <motion.div
        className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {days.map((day, index) => {
          const count = dailyDistribution[index];
          const isPeak = day === peakDay.slice(0, 3);
          const barWidth = (count / maxValue) * 70;

          return (
            <div
              key={day}
              className="flex items-center gap-4 w-full"
            >
              {/* Day label */}
              <span
                className="text-sm md:text-base font-medium w-12 text-right font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#2C1A0E" }}
              >
                {day}
              </span>

              {/* Bar container */}
              <div className="flex-1 h-8 md:h-10 bg-white/50 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    backgroundColor: isPeak ? "#C68B59" : "#D4B896",
                  }}
                />
              </div>

              {/* Count */}
              <span
                className="text-sm md:text-base font-semibold w-16 font-[family-name:var(--font-dm-sans)]"
                style={{ color: isPeak ? "#C68B59" : "#2C1A0E" }}
              >
                {count.toLocaleString()}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Most active date Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div
          className="text-center px-8 py-5 md:px-12 md:py-7 rounded-2xl"
          style={{ backgroundColor: "rgba(198, 139, 89, 0.15)" }}
        >
          <p 
            className="text-sm mb-2 font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#2C1A0E" }}
          >
            Your record day
          </p>
          <p
            className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]"
            style={{ color: "#C68B59" }}
          >
            {stats.timing.mostActiveDateCount.toLocaleString()} messages
          </p>
          <p 
            className="text-sm mt-2 font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#2C1A0E" }}
          >
            on {formattedMostActiveDate}
          </p>
        </div>
      </motion.div>

      {/* Snippet text Section */}
      <motion.div
        className="flex flex-col items-center gap-3 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {stats.timing.mostActiveDateSample.slice(0, 2).map((msg: { sender: string; content: string }, index: number) => (
          <p
            key={index}
            className="font-[family-name:var(--font-dm-sans)] text-sm md:text-base text-center italic"
            style={{ color: "#8B6F4E", opacity: 0.7 }}
          >
            &ldquo;{msg.content}&rdquo;
          </p>
        ))}
      </motion.div>
    </div>
  );
}
