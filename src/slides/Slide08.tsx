"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
};

const emojiVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      ...springTransition,
      delay: i * 0.1,
    },
  }),
};

interface EmojiRowProps {
  emoji: string;
  count: number;
  index: number;
  isTop?: boolean;
}

function EmojiRow({ emoji, count, index, isTop }: EmojiRowProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      custom={index}
      variants={emojiVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className={`font-emoji leading-none ${
          isTop ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
        }`}
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={springTransition}
      >
        {emoji}
      </motion.span>
      <span
        className="text-xs md:text-sm font-[family-name:var(--font-dm-sans)]"
        style={{ color: "#8B6F4E" }}
      >
        {count.toLocaleString()}
      </span>
    </motion.div>
  );
}

interface EmojiColumnProps {
  name: string;
  emojis: { emoji: string; count: number }[];
  personality: string;
  delayOffset?: number;
}

function EmojiColumn({ name, emojis, personality, delayOffset = 0 }: EmojiColumnProps) {
  const topEmoji = emojis[0];

  return (
    <div className="flex flex-col items-center">
      {/* Name header */}
      <motion.h3
        className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] mb-4"
        style={{ color: "#2C1A0E" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delayOffset }}
      >
        {name}
      </motion.h3>

      {/* Top emoji - larger */}
      <div className="mb-3">
        <EmojiRow
          emoji={topEmoji.emoji}
          count={topEmoji.count}
          index={0 + delayOffset * 5}
          isTop={true}
        />
      </div>

      {/* Remaining emojis */}
      <div className="flex flex-col gap-3">
        {emojis.slice(1).map((item, i) => (
          <EmojiRow
            key={item.emoji}
            emoji={item.emoji}
            count={item.count}
            index={i + 1 + delayOffset * 5}
          />
        ))}
      </div>

      {/* Personality read */}
      <motion.p
        className="mt-4 text-sm md:text-base font-[family-name:var(--font-dm-sans)] italic text-center"
        style={{ color: "#5A3E28" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 + delayOffset }}
      >
        {personality}
      </motion.p>
    </div>
  );
}

export default function Slide08() {
  const vinceEmojis = stats.emojis.vince;
  const princessEmojis = stats.emojis.princess;

  return (
    <div
      className="relative w-full h-full px-6 py-8 flex flex-col items-center justify-evenly"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-center"
          style={{ color: "#2C1A0E" }}
        >
          Your Emojis
        </h2>
      </motion.div>

      {/* Two columns Section */}
      <motion.div
        className="flex justify-center gap-10 md:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Vince column - left */}
        <EmojiColumn
          name="Vince"
          emojis={vinceEmojis}
          personality={`Vince is a ${vinceEmojis[0].emoji} person. That tracks.`}
          delayOffset={0}
        />

        {/* Divider */}
        <motion.div
          className="w-px h-64 self-center hidden md:block"
          style={{ backgroundColor: "#C68B59", opacity: 0.3 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Princess column - right */}
        <EmojiColumn
          name="Princess"
          emojis={princessEmojis}
          personality={`Princess is a ${princessEmojis[0].emoji} person. Relatable.`}
          delayOffset={0.2}
        />
      </motion.div>

      {/* Fun fact Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <p
          className="text-sm md:text-base font-[family-name:var(--font-dm-sans)] text-center max-w-md"
          style={{ color: "#8B6F4E" }}
        >
          You both use{" "}
          <span style={{ color: "#C68B59", fontWeight: 600 }}>😭</span> the
          most. Emotional damage? Emotional damage.
        </p>
      </motion.div>
    </div>
  );
}
