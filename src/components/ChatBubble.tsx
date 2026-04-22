"use client";

import { motion } from "framer-motion";

/*
 * Chat bubble sizing rules — apply to ALL slides with chat bubbles:
 *
 *  Bubble:    min-width 120px · padding 12px 16px
 *             border-radius 18px, 4px on the sender's corner
 *             (top-left for princess / top-right for vince)
 *  Message:   text-base (16px), font-medium
 *  Metadata:  text-xs (12px), opacity-60, below the bubble like a photo caption
 */

function DiscordIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.133 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const platformIcons: Record<string, React.ReactNode> = {
  discord: <DiscordIcon />,
  instagram: <span>IG</span>,
  whatsapp: <span>WA</span>,
};

type Props = {
  sender: "vince" | "princess";
  content: string;
  platform?: string;
  date?: string;
  delay?: number;
};

export default function ChatBubble({ sender, content, platform, date, delay = 0 }: Props) {
  const isPrincess = sender === "princess";

  return (
    <motion.div
      className={`flex flex-col ${isPrincess ? "items-start" : "items-end"}`}
      initial={{ opacity: 0, x: isPrincess ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Bubble */}
      <div
        className="max-w-[75%] font-[family-name:var(--font-dm-sans)] text-base font-medium whitespace-pre-line"
        style={{
          minWidth: 120,
          padding: "12px 16px",
          borderRadius: 18,
          ...(isPrincess
            ? { borderTopLeftRadius: 4, background: "#F4A7B9", boxShadow: "0 4px 16px rgba(244,167,185,0.3)" }
            : { borderTopRightRadius: 4, background: "#FDDCB5", boxShadow: "0 4px 16px rgba(253,220,181,0.4)" }),
          color: "#3D2B1F",
        }}
      >
        {content}
      </div>

      {/* Metadata — caption style */}
      <div
        className={`flex items-center gap-1.5 mt-1.5 opacity-60 font-[family-name:var(--font-dm-sans)] text-xs ${
          isPrincess ? "ml-2" : "mr-2"
        }`}
        style={{ color: "#B08070" }}
      >
        {isPrincess && <span className="font-medium">Princess</span>}
        {!isPrincess && <span>Vince</span>}
        {platform && (
          <>
            <span>·</span>
            {platformIcons[platform] ?? null}
            {date && <span>{date} · {platform.charAt(0).toUpperCase() + platform.slice(1)}</span>}
          </>
        )}
        {!platform && date && (
          <>
            <span>·</span>
            <span>{date}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
