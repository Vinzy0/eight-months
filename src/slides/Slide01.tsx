"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/slideData";

const START_DATE = "2025-07-07T12:51:41.532Z";

export default function Slide01() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 2000);
    const fadeTimer = setTimeout(() => setShowHint(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const startDate = formatDate(START_DATE);
  const today = formatDate(new Date().toISOString());

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative px-8">
      {/* Title */}
      <motion.h1
        className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-playfair)] tracking-tight"
        style={{ color: "#2C1A0E" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Eight Months
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-xl md:text-2xl font-[family-name:var(--font-dm-sans)]"
        style={{ color: "#5A3E28" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Vince{" "}
        <span className="mx-2" style={{ color: "#C68B59" }}>&middot;</span>
        {" "}Princess
      </motion.p>

      {/* Date range */}
      <motion.p
        className="mt-4 text-sm font-[family-name:var(--font-dm-sans)]"
        style={{ color: "#8B6F4E", opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {startDate} — {today}
      </motion.p>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            className="absolute bottom-24 text-sm font-[family-name:var(--font-dm-sans)]"
            style={{ color: "#8B6F4E", opacity: 0.35 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            press → to begin
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
