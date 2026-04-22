"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSlideAct, actThemes } from "@/lib/colors";
import { formatDate, firstMessage } from "@/lib/slideData";
import Particles from "@/components/Particles";

export default function Slide42() {
  const [days, setDays] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    const first = new Date(firstMessage.timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
    setToday(formatDate(now.toISOString()));
  }, []);

  const act = getSlideAct(42);
  const theme = actThemes[act];

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: theme.bg }}
    >
      <Particles color={theme.accent} count={20} />

      <motion.span
        className="font-[family-name:var(--font-playfair)] text-[clamp(6rem,20vw,14rem)] font-bold leading-none z-10"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {days}
      </motion.span>

      <motion.span
        className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl mt-2 tracking-wide z-10"
        style={{ color: theme.accent, opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        days
      </motion.span>

      <motion.div
        className="w-16 h-[1px] my-6 z-10"
        style={{ backgroundColor: theme.accent, opacity: 0.3 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      <motion.span
        className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl z-10"
        style={{ color: theme.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Vince & Princess
      </motion.span>

      <motion.span
        className="font-[family-name:var(--font-dm-sans)] text-sm md:text-base mt-3 z-10"
        style={{ color: theme.accent, opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {formatDate(firstMessage.timestamp)} — {today}
      </motion.span>

      <motion.span
        className="font-[family-name:var(--font-dancing)] text-2xl md:text-4xl italic mt-8 z-10"
        style={{ color: theme.highlight }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        and still here.
      </motion.span>
    </div>
  );
}
