"use client";

import { motion } from "framer-motion";
import { analysis } from "@/lib/slideData";
import { getSlideAct, actThemes } from "@/lib/colors";
import ChatBubble from "@/components/ChatBubble";

export default function Slide26() {
  const act = getSlideAct(26);
  const theme = actThemes[act];
  const profile = analysis.individualProfiles.princess;
  const cardBg = "rgba(244, 167, 185, 0.08)";

  return (
    <div className="relative w-full h-full px-6 py-6 flex flex-col overflow-y-auto" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <h1 className="font-[family-name:var(--font-playfair)] italic text-[clamp(2rem,5vw,3rem)]" style={{ color: theme.text }}>Princess</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-12 h-px" style={{ backgroundColor: theme.accent }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.highlight }} />
          <div className="w-12 h-px" style={{ backgroundColor: theme.accent }} />
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <motion.div className="rounded-xl p-4" style={{ backgroundColor: cardBg }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold mb-3" style={{ color: theme.text }}>Who She Is</h3>
          <ul className="space-y-2">
            {profile.personalityTraits.map((trait: string, i: number) => (
              <li key={i} className="font-[family-name:var(--font-dm-sans)] text-sm flex items-start gap-2" style={{ color: theme.text, opacity: 0.9 }}>
                <span style={{ color: theme.highlight }}>{i + 1}.</span>{trait}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="rounded-xl p-4" style={{ backgroundColor: cardBg }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold mb-3" style={{ color: theme.text }}>What She Cares About</h3>
          <div className="flex flex-wrap gap-2">
            {profile.theyCareAbout.map((item: string, i: number) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-dm-sans)]" style={{ backgroundColor: `${theme.highlight}30`, color: theme.text, border: `1px solid ${theme.highlight}50` }}>{item}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Three Cards: Love, Fight, Humor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {[
          { title: "How She Loves", content: profile.howTheyLove, delay: 0.3 },
          { title: "How She Fights", content: profile.howTheyFight, delay: 0.4 },
          { title: "How She Humors", content: profile.howTheyHumor, delay: 0.5 },
        ].map((card, i) => (
          <motion.div key={i} className="rounded-xl p-4" style={{ backgroundColor: cardBg }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}>
            <h4 className="font-[family-name:var(--font-playfair)] text-sm font-bold mb-2" style={{ color: theme.highlight }}>{card.title}</h4>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed" style={{ color: theme.text, opacity: 0.85 }}>{card.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Communication & Blindspots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {[
          { title: "Communication Style", content: profile.communicationStyle, delay: 0.6 },
          { title: "Blindspots", content: profile.blindspots, delay: 0.7 },
        ].map((card, i) => (
          <motion.div key={i} className="rounded-xl p-4" style={{ backgroundColor: cardBg }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}>
            <h4 className="font-[family-name:var(--font-playfair)] text-sm font-bold mb-2" style={{ color: theme.accent }}>{card.title}</h4>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed" style={{ color: theme.text, opacity: 0.85 }}>{card.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Pull Quote */}
      <motion.div className="mt-auto pt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <ChatBubble sender="princess" content={profile.pullQuotes[0]} delay={0.9} />
      </motion.div>
    </div>
  );
}
