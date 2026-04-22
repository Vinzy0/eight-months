"use client";

import { motion } from "framer-motion";

type Props = {
  quote: string;
  sender: string;
  platform?: string;
  date?: string;
};

export default function PullQuote({ quote, sender, platform, date }: Props) {
  return (
    <motion.div
      className="relative max-w-xl mx-auto text-center px-8 py-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span
        className="absolute -top-4 left-4 text-6xl font-[family-name:var(--font-playfair)] select-none"
        style={{ color: "#C68B59", opacity: 0.3 }}
      >
        &ldquo;
      </span>
      <p
        className="text-lg md:text-xl italic font-[family-name:var(--font-playfair)] leading-relaxed"
        style={{ color: "#2C1A0E" }}
      >
        {quote}
      </p>
      <div
        className="mt-3 text-sm font-[family-name:var(--font-dm-sans)]"
        style={{ color: "#8B6F4E", opacity: 0.55 }}
      >
        — {sender}
        {platform && <span> · {platform}</span>}
        {date && <span> · {date}</span>}
      </div>
    </motion.div>
  );
}
