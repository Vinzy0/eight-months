"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { stats, quotes } from "@/lib/slideData";
import HeatmapGrid from "@/components/HeatmapGrid";
import ChatBubble from "@/components/ChatBubble";

// Late-night quotes (timestamp hours 0-5)
const lateNightQuotes = [
  {
    sender: "vince" as const,
    content: "ill just wait for u nalang",
    platform: "whatsapp",
    date: "Aug 28, 2:18 AM",
  },
  {
    sender: "princess" as const,
    content: "ill wait for u lang sa waiting shed",
    platform: "whatsapp",
    date: "Dec 15, 4:45 AM",
  },
];

// Month labels for the heatmap
const monthLabels = [
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan", "Feb", "Mar", "Apr"
];

function CountUpNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);
  
  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  );
}

export default function Slide12() {
  const lateNightData = stats.lateNights;
  const counts = lateNightData.lateNightByMonth.map((m: { count: number }) => m.count);
  const maxCount = Math.max(...counts);
  
  // Theme colors
  const bgColor = "#F7EDE0";
  const accentColor = "#A67B5B";
  const textColor = "#3D2B1F";
  
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center px-8 py-12"
      style={{ backgroundColor: bgColor }}
    >
      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)] tracking-tight text-center"
        style={{ color: textColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Late Nights Together
      </motion.h1>
      
      {/* Big Number with count-up */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="text-7xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-playfair)]"
          style={{ color: accentColor }}
        >
          <CountUpNumber value={lateNightData.lateNightCount} duration={2} />
        </div>
        <motion.p
          className="mt-2 text-lg md:text-xl font-[family-name:var(--font-dm-sans)]"
          style={{ color: textColor, opacity: 0.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          nights neither of you wanted to end
        </motion.p>
      </motion.div>
      
      {/* Heatmap Grid */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <HeatmapGrid
          cells={counts}
          labels={monthLabels}
          maxValue={maxCount}
          accentColor={accentColor}
          delay={0.6}
          cellSize={36}
          gap={6}
        />
      </motion.div>
      
      {/* Late-night quotes */}
      <motion.div
        className="mt-10 w-full max-w-2xl flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {lateNightQuotes.map((quote, index) => (
          <ChatBubble
            key={index}
            sender={quote.sender}
            content={quote.content}
            platform={quote.platform}
            date={quote.date}
            delay={1.4 + index * 0.2}
          />
        ))}
      </motion.div>
    </div>
  );
}
