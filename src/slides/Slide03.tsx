"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";
import StatCard from "@/components/StatCard";

export default function Slide03() {
  const statItems = [
    {
      value: stats.volume.totalMessages,
      label: "messages exchanged",
      icon: "💬",
    },
    {
      value: stats.volume.totalWords,
      label: "words shared",
      icon: "✍️",
    },
    {
      value: stats.volume.totalDays,
      label: "days of talking",
      icon: "📅",
    },
    {
      value: 4,
      label: "platforms",
      icon: "📱",
    },
  ];

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center relative px-8 py-12"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Title Section - separate div with generous bottom margin */}
      <motion.div
        className="mb-16 md:mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          The Big Numbers
        </h2>
      </motion.div>

      {/* Stats Grid Section - separate div with generous spacing */}
      <motion.div
        className="grid grid-cols-2 gap-8 md:gap-12 max-w-4xl w-full mb-16 md:mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {statItems.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5 + index * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <StatCard
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              duration={2.5}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Subtitle Section - separate div */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <p
          className="text-lg md:text-xl font-[family-name:var(--font-dm-sans)] italic text-center"
          style={{ color: "#5A3E28" }}
        >
          This is what 8 months looks like.
        </p>
      </motion.div>
    </div>
  );
}
