"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide34() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const first = new Date("2025-07-06");
    const now = new Date();
    const diff = Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
  }, []);

  const act = getSlideAct(34);
  const theme = actThemes[act];

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.bg }}
    >
      <motion.span
        className="font-[family-name:var(--font-playfair)] text-[clamp(6rem,20vw,14rem)] font-bold leading-none"
        style={{ color: theme.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {days}
      </motion.span>

      <motion.span
        className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl mt-2 tracking-wide"
        style={{ color: theme.accent, opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        days
      </motion.span>

      <motion.div
        className="w-16 h-[1px] my-6"
        style={{ backgroundColor: theme.accent, opacity: 0.3 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      <motion.span
        className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl"
        style={{ color: theme.accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Vince & Princess
      </motion.span>
    </div>
  );
}
