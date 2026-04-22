"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide25() {
  const act = getSlideAct(25);
  const theme = actThemes[act];
  const vince = analysis.individualProfiles.vince;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col p-6 md:p-10 overflow-y-auto"
      style={{ backgroundColor: theme.bg, color: theme.text }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center mb-6">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-2">Vince</h1>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: theme.accent }} />
      </motion.div>

      {/* Two Column Layout */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left: Personality Traits */}
        <div
          className="rounded-2xl p-5 backdrop-blur-sm"
          style={{ backgroundColor: `${theme.highlight}20`, border: `1px solid ${theme.accent}30` }}
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-3" style={{ color: theme.accent }}>
            Personality Traits
          </h3>
          <ul className="space-y-2">
            {vince.personalityTraits.map((trait: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="font-bold min-w-[1.5rem]" style={{ color: theme.accent }}>{i + 1}.</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Cares About */}
        <div
          className="rounded-2xl p-5 backdrop-blur-sm"
          style={{ backgroundColor: `${theme.highlight}20`, border: `1px solid ${theme.accent}30` }}
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-3" style={{ color: theme.accent }}>
            Cares About
          </h3>
          <div className="flex flex-wrap gap-2">
            {vince.theyCareAbout.map((care: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
              >
                {care}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Three Cards Row */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-2xl p-4 backdrop-blur-sm"
          style={{ backgroundColor: `${theme.highlight}15`, border: `1px solid ${theme.accent}25` }}
        >
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold mb-2" style={{ color: theme.accent }}>
            How They Love
          </h4>
          <p className="text-xs leading-relaxed opacity-90">{vince.howTheyLove}</p>
        </div>
        <div
          className="rounded-2xl p-4 backdrop-blur-sm"
          style={{ backgroundColor: `${theme.highlight}15`, border: `1px solid ${theme.accent}25` }}
        >
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold mb-2" style={{ color: theme.accent }}>
            How They Fight
          </h4>
          <p className="text-xs leading-relaxed opacity-90">{vince.howTheyFight}</p>
        </div>
        <div
          className="rounded-2xl p-4 backdrop-blur-sm"
          style={{ backgroundColor: `${theme.highlight}15`, border: `1px solid ${theme.accent}25` }}
        >
          <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold mb-2" style={{ color: theme.accent }}>
            How They Humor
          </h4>
          <p className="text-xs leading-relaxed opacity-90">{vince.howTheyHumor}</p>
        </div>
      </motion.div>

      {/* Communication Style */}
      <motion.div
        variants={item}
        className="rounded-2xl p-4 mb-4 backdrop-blur-sm"
        style={{ backgroundColor: `${theme.highlight}15`, border: `1px solid ${theme.accent}25` }}
      >
        <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold mb-2" style={{ color: theme.accent }}>
          Communication Style
        </h4>
        <p className="text-xs leading-relaxed opacity-90">{vince.communicationStyle}</p>
      </motion.div>

      {/* Blindspots */}
      <motion.div
        variants={item}
        className="rounded-2xl p-4 mb-6 backdrop-blur-sm"
        style={{ backgroundColor: `${theme.highlight}15`, border: `1px solid ${theme.accent}25` }}
      >
        <h4 className="font-[family-name:var(--font-playfair)] text-sm font-semibold mb-2" style={{ color: theme.accent }}>
          Blindspots
        </h4>
        <p className="text-xs leading-relaxed opacity-90">{vince.blindspots}</p>
      </motion.div>

      {/* Pull Quote */}
      <motion.div variants={item} className="flex justify-center">
        <ChatBubble sender="vince" content={vince.pullQuotes[0]} delay={0.8} />
      </motion.div>
    </motion.div>
  );
}
