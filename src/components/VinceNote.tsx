"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NOTES: Record<number, string> = {
  1: "hey baby, im here too, lagay ko lang dito mga extra comments ko hehe, NOW GO TO THE NEXT PAGEE",
  2: "this isn't the exact start hehe, but ito yung earliest chat natin na na scrape ko hehe. the actual first one i think is the one on messenger yung nag cchismisan tayo but di ko na siya makita ulit 😭",
  3: "holy, messenger, ig, discord, and WhatsApp",
  4: "SA MESSAGES LANG YAN, sa call kasi ako magaling hehe 😁",
  5: "NO WAY U HAVE LONGER MESSAGES THAN ME, AND HOW IS THIS OUR LONGEST MESSAGE 😭",
  6: "damn 2pm, idk why though, bakit kaya",
  7: "ANO MERON SA MONDAYS HAHHAHAHA, i thought na weekends tayo magsspike ng chats... wait alam ko na, nag ccall kasi tayo ng weekends, kaya pala.",
  8: "😭😭😭",
  9: "NUNG ANO MO YAN, YUNG UMALIS KAYO TAS DI KA MAKASALITA HAHAHAHAH",
  10: "I DONT REMEMBER THIS 😭 WTF",
  // 11 → blank (chapter 2)
  12: "I DONT REMEMBER THESEEE HAHAHA, why did we meet sa waiting shed? AT 4 AM TOO???",
  13: "MOST ACTIVE DAY YAN HAHAH, NASIRA LANG",
  14: "this is less \"inside jokes\" and more just like, general stuff between us",
  15: "most used words mo ano, wala, si?????",
  16: "fair.",
  17: "actually real though, matagal na natin napansin to hehe, we're smart",
  18: "HAHAHAHAH PEAK NATIN AUG, btw bumaba to sa April because i took the data around early April i think",
  // 19 → blank (act 3)
  20: "IS THIS REALLY HOW? naaalala ko yung chismisan natin, but ig we did start on valo HAHAHAAHHA",
  21: "AGHHHH NOOOO, NAG CCRINGE PA KO DITO",
  22: "NAKAKACRINGEEE, I DONT WANNA SEE MY CHATSS",
  23: "nag away ata tayo nito i think, TANGINA BAT ETO YUNG NAPILI NA CHAT KO 😭",
  // 24 → blank (act 4)
  25: "yup, fair",
  26: "HEHE, AND I LOVE ALL OF THIS",
  27: "OOOOHHHH",
  28: "sorry panget ng layout hehe",
  29: "hmmm, fair, we do have to talk about a few stuff.",
  30: "NOOOO, NOT MY CHATTT 😭",
  31: "ooohhh",
  32: "really 🥹",
  // 33 → removed slide
  34: "awwww",
  35: "hehe, DI GANYAN NANGYAREEE",
  36: "tapos na natin 1 hehe :D 2 to go",
  37: "YES.",
  38: "NOTE YAN NI CLAUDE PARA SAYO NOT MINE (maya pa sakin hehe)",
  39: "🥹🥹🥹",
  40: "what was that? march 20-28?",
  41: "NOPEE, HEHE",
  42: "❤️❤️❤️",
  43: "i love u baby, hope u enjoyed thisss :>>>",
};

interface VinceNoteProps {
  currentSlide: number;
}

export default function VinceNote({ currentSlide }: VinceNoteProps) {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const note = NOTES[currentSlide];
  const hasNote = Boolean(note);

  // Close only if new slide has no note; otherwise reopen
  useEffect(() => {
    if (!NOTES[currentSlide]) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [currentSlide]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 0)}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
      style={{ cursor: "grab", touchAction: "none" }}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {open && hasNote && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative max-w-[260px]"
          >
            <div
              style={{
                background: "rgba(255,252,245,0.96)",
                border: "1px solid rgba(198,139,89,0.2)",
                borderRadius: "1.25rem 1.25rem 0.25rem 1.25rem",
                padding: "0.9rem 1.1rem",
                boxShadow: "0 8px 32px rgba(44,26,14,0.12)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  color: "#2C1A0E",
                }}
              >
                {note}
              </p>
              {/* Vince label */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#C68B59",
                  marginTop: "0.5rem",
                }}
              >
                vince
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating circle */}
      <motion.button
        onClick={() => {
          if (!isDragging && hasNote) setOpen((o) => !o);
        }}
        animate={
          hasNote && !open
            ? { boxShadow: ["0 0 0 0px rgba(198,139,89,0.4)", "0 0 0 8px rgba(198,139,89,0)", "0 0 0 0px rgba(198,139,89,0)"] }
            : {}
        }
        transition={hasNote && !open ? { duration: 2, repeat: Infinity, ease: "easeOut" } : {}}
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          border: "2.5px solid #C68B59",
          overflow: "hidden",
          cursor: hasNote ? "pointer" : "default",
          opacity: hasNote ? 1 : 0.35,
          flexShrink: 0,
          background: "#FAF3E8",
          padding: 0,
          position: "relative",
        }}
        whileHover={hasNote ? { scale: 1.08 } : {}}
        whileTap={hasNote ? { scale: 0.95 } : {}}
      >
        <Image
          src="/vince.png"
          alt="Vince"
          fill
          draggable={false}
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </motion.button>
    </motion.div>
  );
}
