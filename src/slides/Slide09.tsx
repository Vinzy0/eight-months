"use client";

import { motion } from "framer-motion";
import ChatBubble from "@/components/ChatBubble";
import { stats } from "@/lib/slideData";

// Princess's longest spam streak messages (first 5)
const spamMessages = [
  "oo",
  "ahhh magkakaiba n atayo ng  understandings niyan",
  "so magaagree to disagree na lang",
  "ano oras kaya kami makakarating",
  "matabungkay daw",
];

export default function Slide09() {
  const spamData = stats.spam.princess;
  const timestamp = new Date(spamData.timestamp);
  const formattedDate = timestamp.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

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
          className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.5rem,4vw,2.25rem)] text-center text-balance"
          style={{ color: "#2C1A0E" }}
        >
          Princess was not okay.
        </h2>
      </motion.div>

      {/* Stacked chat bubbles Section */}
      <motion.div
        className="flex flex-col gap-3 max-w-md w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {spamMessages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender="princess"
            content={msg}
            delay={index * 0.2}
          />
        ))}
      </motion.div>

      {/* Bold stat Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p
          className="font-[family-name:var(--font-dm-sans)] font-bold text-[clamp(1.25rem,3vw,1.75rem)] text-center"
          style={{ color: "#C68B59" }}
        >
          {spamData.count} messages. No reply.
        </p>
      </motion.div>

      {/* Timestamp Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <p
          className="font-[family-name:var(--font-dm-sans)] text-sm"
          style={{ color: "#2C1A0E" }}
        >
          {formattedDate} · {formattedTime}
        </p>
      </motion.div>
    </div>
  );
}
