"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Particles from "@/components/Particles";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide11() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 2000);
    const fadeTimer = setTimeout(() => setShowHint(false), 7000);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const act = getSlideAct(11);
  const theme = actThemes[act];

  return (
    <div 
      className="h-full w-full flex flex-col items-center justify-center relative px-8"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Particles Background */}
      <Particles color={theme.accent} count={25} />

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-playfair)] tracking-tight text-center z-10"
        style={{ color: theme.text }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        The Patterns You Never Noticed
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-dm-sans)] z-10"
        style={{ color: theme.accent }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Act 2
      </motion.p>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            className="absolute bottom-24 text-sm font-[family-name:var(--font-dm-sans)] z-10"
            style={{ color: theme.accent, opacity: 0.5 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            press → to continue
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
