"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/slideData";

interface WordItem {
  word: string;
  count: number;
}

// Calculate font size class based on rank (0 = most frequent)
function getSizeClass(rank: number): string {
  // rank 0 = text-4xl, rank 9 = text-base
  const sizes = [
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
    "text-base",
    "text-base",
    "text-base",
    "text-base",
  ];
  return sizes[rank] || "text-base";
}

// Organic positioning offsets for varied layout
const positionOffsets = [
  { x: -8, y: 0 },
  { x: 12, y: 8 },
  { x: -6, y: 16 },
  { x: 10, y: 4 },
  { x: -10, y: 12 },
  { x: 6, y: 0 },
  { x: -4, y: 8 },
  { x: 8, y: 16 },
  { x: -12, y: 4 },
  { x: 4, y: 12 },
];

interface WordColumnProps {
  title: string;
  words: WordItem[];
  isShared?: boolean;
  delayOffset: number;
}

function WordColumn({ title, words, isShared = false, delayOffset }: WordColumnProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Column Header */}
      <motion.h3
        className="font-[family-name:var(--font-playfair)] text-lg md:text-xl mb-6"
        style={{ color: isShared ? "#8B5A2B" : "#5A3E28" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayOffset, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h3>

      {/* Words Container */}
      <div className="relative w-full max-w-[180px] min-h-[400px]">
        {words.map((item, index) => {
          const offset = positionOffsets[index % positionOffsets.length];
          const sizeClass = isShared ? "text-2xl" : getSizeClass(index);

          return (
            <motion.div
              key={item.word}
              className={`absolute font-[family-name:var(--font-playfair)] ${sizeClass} whitespace-nowrap`}
              style={{
                color: isShared ? "#5A3E28" : "#2C1A0E",
                left: `calc(50% + ${offset.x}px)`,
                top: `${index * 40 + offset.y}px`,
                transform: "translateX(-50%)",
                backgroundColor: isShared ? "rgba(198, 139, 89, 0.15)" : "transparent",
                padding: isShared ? "4px 12px" : "4px 0",
                borderRadius: isShared ? "9999px" : "0",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: delayOffset + 0.2 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {item.word}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Slide15() {
  const vinceWords: WordItem[] = stats.words.vinceTopWords.slice(0, 10);
  const princessWords: WordItem[] = stats.words.princessTopWords.slice(0, 10);
  const sharedWords: string[] = stats.words.topWordsShared;

  // Convert shared words to WordItem format with counts
  const sharedWordItems: WordItem[] = sharedWords.map((word) => ({
    word,
    count: 0, // Count not needed for display
  }));

  return (
    <div
      className="relative w-full h-full px-6 py-10 overflow-hidden"
      style={{ backgroundColor: "#FAF3E8" }}
    >
      {/* Section Title */}
      <motion.h2
        className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.4rem,3vw,2rem)] text-center mb-8"
        style={{ color: "#3D2B1F" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        The Words We Used Most
      </motion.h2>

      {/* Three Columns */}
      <div className="flex justify-center items-start gap-8 md:gap-16 lg:gap-24">
        {/* Vince's Words */}
        <WordColumn
          title="Vince's Words"
          words={vinceWords}
          delayOffset={0.1}
        />

        {/* Shared Words */}
        <WordColumn
          title="Shared"
          words={sharedWordItems}
          isShared={true}
          delayOffset={0.2}
        />

        {/* Princess's Words */}
        <WordColumn
          title="Princess's Words"
          words={princessWords}
          delayOffset={0.3}
        />
      </div>
    </div>
  );
}
