"use client";

import { motion } from "framer-motion";
import { getSlideAct, actThemes } from "@/lib/colors";

export default function Slide43() {
  const act = getSlideAct(43);
  const theme = actThemes[act];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1A0A0A" }}
    >
      <motion.p
        className="font-[family-name:var(--font-dancing)] text-[clamp(2rem,5vw,3.5rem)] text-center px-8 leading-relaxed"
        style={{ color: "#FFF8F3" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
      >
        [your message here]
      </motion.p>

      <motion.p
        className="font-[family-name:var(--font-dm-sans)] text-xs mt-8 tracking-wider uppercase"
        style={{ color: "#FFF8F3", opacity: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        made with every message we ever sent
      </motion.p>
    </div>
  );
}
