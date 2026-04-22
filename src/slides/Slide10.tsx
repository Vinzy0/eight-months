"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { stats } from "@/lib/slideData";
import ChatBubble from "@/components/ChatBubble";

function formatDuration(totalMinutes: number): { hours: number; minutes: number } {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

function useCountUp(targetHours: number, targetMinutes: number, duration: number = 2) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const totalTargetMinutes = targetHours * 60 + targetMinutes;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentTotalMinutes = Math.floor(totalTargetMinutes * eased);
      const currentHours = Math.floor(currentTotalMinutes / 60);
      const currentMinutes = currentTotalMinutes % 60;
      
      setHours(currentHours);
      setMinutes(currentMinutes);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timer);
  }, [targetHours, targetMinutes, duration]);

  return { hours, minutes };
}

interface ColumnProps {
  name: string;
  durationMinutes: number;
  contextBefore: string;
  label: string;
  delay: number;
}

function WaitingColumn({ name, durationMinutes, contextBefore, label, delay }: ColumnProps) {
  const { hours, minutes } = formatDuration(durationMinutes);
  const { hours: countHours, minutes: countMinutes } = useCountUp(hours, minutes, 2);

  // Truncate long context messages
  const truncatedContext = contextBefore.length > 50 
    ? contextBefore.slice(0, 50) + "..."
    : contextBefore;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 max-w-xs px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Name */}
      <h3 
        className="font-[family-name:var(--font-playfair)] text-lg md:text-xl"
        style={{ color: "#5A3E28" }}
      >
        {name}
      </h3>

      {/* Duration - Large */}
      <div 
        className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)]"
        style={{ color: "#2C1A0E" }}
      >
        {countHours}h {countMinutes}m
      </div>

      {/* Context - what they said before vanishing */}
      <div 
        className="text-sm italic opacity-60 font-[family-name:var(--font-dm-sans)] text-center px-4"
        style={{ color: "#5A3E28" }}
      >
        &ldquo;{truncatedContext}&rdquo;
      </div>

      {/* Playful label */}
      <div 
        className="text-sm font-[family-name:var(--font-dm-sans)] font-medium"
        style={{ color: "#C68B59" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Slide10() {
  const vinceGap = stats.replyGaps.vince;
  const princessGap = stats.replyGaps.princess;

  // Determine who waited longer for playful labels
  const vinceWon = vinceGap.durationMinutes > princessGap.durationMinutes;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,4.5vw,2.8rem)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          Who Left Who Waiting
        </h2>
      </motion.div>

      {/* Two columns Section */}
      <motion.div
        className="flex justify-center gap-8 md:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Vince's longest gap */}
        <WaitingColumn
          name="Vince"
          durationMinutes={vinceGap.durationMinutes}
          contextBefore={vinceGap.contextBefore}
          label={vinceWon ? "Champion ghoster 🏆" : "Gone fishing 🎣"}
          delay={0.3}
        />

        {/* Princess's longest gap */}
        <WaitingColumn
          name="Princess"
          durationMinutes={princessGap.durationMinutes}
          contextBefore={princessGap.contextBefore}
          label={vinceWon ? "Patiently waiting ⏳" : "Queen of silence 👑"}
          delay={0.5}
        />
      </motion.div>

      {/* Funny quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <ChatBubble 
          sender="vince" 
          content="sorry nagvalorant lang" 
          delay={1.2} 
        />
      </motion.div>
    </div>
  );
}
