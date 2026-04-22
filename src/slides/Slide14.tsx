"use client";

import { motion } from "framer-motion";
import { analysis, formatDateShort } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";

interface InsideJoke {
  phrase: string;
  probableMeaning: string;
  firstSeen: string;
  frequency: string;
}

export default function Slide14() {
  const jokes: InsideJoke[] = analysis.insideJokes;
  const act = getSlideAct(14);
  const theme = actThemes[act];

  const heroJoke = jokes[4];
  const otherJokes = jokes.filter((_, index) => index !== 4);

  return (
    <div
      className="relative w-full min-h-full flex items-center justify-center overflow-y-auto overflow-x-hidden scrollbar-hide"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] uppercase tracking-[0.2em] font-bold block mb-2 opacity-70"
            style={{ color: theme.accent }}
          >
            The Patterns You Never Noticed
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3rem)]"
            style={{ color: theme.text }}
          >
            Inside Jokes
          </h2>
        </motion.div>

        {/* Hero Joke - High Impact Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="rounded-3xl p-8 md:p-10 border text-center"
            style={{
              backgroundColor: `${theme.highlight}40`, // 40% opacity for glass effect
              borderColor: `${theme.accent}20`,
              backdropFilter: "blur(10px)",
              boxShadow: `0 20px 40px ${theme.accent}10`,
            }}
          >
            <h3
              className="font-[family-name:var(--font-playfair)] italic text-[clamp(2.2rem,6vw,4rem)] leading-[1.1] mb-4"
              style={{ color: theme.text }}
            >
              &ldquo;{heroJoke.phrase}&rdquo;
            </h3>
            <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" 
                    style={{ backgroundColor: theme.accent, color: theme.bg }}>
                {heroJoke.frequency} times
              </span>
              <span className="text-xs opacity-60 font-[family-name:var(--font-dm-sans)]" style={{ color: theme.text }}>
                First heard: {formatDateShort(heroJoke.firstSeen)}
              </span>
            </div>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-90"
              style={{ color: theme.text }}
            >
              {heroJoke.probableMeaning}
            </p>
          </div>
        </motion.div>

        {/* Grid for Other Jokes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherJokes.map((joke: InsideJoke, index: number) => (
            <motion.div
              key={joke.phrase}
              className="rounded-2xl p-6 flex flex-col justify-between border h-full text-center"
              style={{
                backgroundColor: `${theme.text}08`, // Super subtle tint
                borderColor: `${theme.accent}15`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h4
                  className="font-[family-name:var(--font-playfair)] italic text-xl mb-3"
                  style={{ color: theme.text }}
                >
                  {joke.phrase}
                </h4>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-6 opacity-80"
                  style={{ color: theme.text }}
                >
                  {joke.probableMeaning}
                </p>
              </div>
              <div className="flex justify-center gap-4 items-end opacity-60 text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                <span>{joke.frequency}</span>
                <span>·</span>
                <span>{formatDateShort(joke.firstSeen)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
