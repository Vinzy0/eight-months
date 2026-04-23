"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSlideAct, actThemes, actNames } from "@/lib/colors";
import Particles from "@/components/Particles";
import VinceNote from "@/components/VinceNote";

import Slide01 from "@/slides/Slide01";
import Slide02 from "@/slides/Slide02";
import Slide03 from "@/slides/Slide03";
import Slide04 from "@/slides/Slide04";
import Slide05 from "@/slides/Slide05";
import Slide06 from "@/slides/Slide06";
import Slide07 from "@/slides/Slide07";
import Slide08 from "@/slides/Slide08";
import Slide09 from "@/slides/Slide09";
import Slide10 from "@/slides/Slide10";
import Slide11 from "@/slides/Slide11";
import Slide12 from "@/slides/Slide12";
import Slide13 from "@/slides/Slide13";
import Slide14 from "@/slides/Slide14";
import Slide15 from "@/slides/Slide15";
import Slide16 from "@/slides/Slide16";
import Slide17 from "@/slides/Slide17";
import Slide18 from "@/slides/Slide18";
import Slide19 from "@/slides/Slide19";
import Slide20 from "@/slides/Slide20";
import Slide21 from "@/slides/Slide21";
import Slide22 from "@/slides/Slide22";
import Slide23 from "@/slides/Slide23";
import Slide24 from "@/slides/Slide24";
import Slide25 from "@/slides/Slide25";
import Slide26 from "@/slides/Slide26";
import Slide27 from "@/slides/Slide27";
import Slide28 from "@/slides/Slide28";
import Slide29 from "@/slides/Slide29";
import Slide30 from "@/slides/Slide30";
import Slide31 from "@/slides/Slide31";
import Slide32 from "@/slides/Slide32";
import Slide34 from "@/slides/Slide34";
import Slide35 from "@/slides/Slide35";
import Slide36 from "@/slides/Slide36";
import Slide37 from "@/slides/Slide37";
import Slide38 from "@/slides/Slide38";
import Slide39 from "@/slides/Slide39";
import Slide40 from "@/slides/Slide40";
import Slide41 from "@/slides/Slide41";
import Slide42 from "@/slides/Slide42";
import Slide43 from "@/slides/Slide43";

const TOTAL_SLIDES = 43;

const slideComponents: Record<number, React.ComponentType> = {
  1: Slide01,
  2: Slide02,
  3: Slide03,
  4: Slide04,
  5: Slide05,
  6: Slide06,
  7: Slide07,
  8: Slide08,
  9: Slide09,
  10: Slide10,
  11: Slide11,
  12: Slide12,
  13: Slide13,
  14: Slide14,
  15: Slide15,
  16: Slide16,
  17: Slide17,
  18: Slide18,
  19: Slide19,
  20: Slide20,
  21: Slide21,
  22: Slide22,
  23: Slide23,
  24: Slide24,
  25: Slide25,
  26: Slide26,
  27: Slide27,
  28: Slide28,
  29: Slide29,
  30: Slide30,
  31: Slide31,
  32: Slide32,
  34: Slide34,
  35: Slide35,
  36: Slide36,
  37: Slide37,
  38: Slide38,
  39: Slide39,
  40: Slide40,
  41: Slide41,
  42: Slide42,
  43: Slide43,
};

export default function Slideshow() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(0);
  const transitioning = useRef(false);

  const act = getSlideAct(current);
  const theme = actThemes[act];

  const goTo = useCallback(
    (next: number) => {
      if (transitioning.current) return;
      const step = next > current ? 1 : -1;
      let target = next;
      while (target >= 1 && target <= TOTAL_SLIDES && !slideComponents[target]) {
        target += step;
      }
      if (target < 1 || target > TOTAL_SLIDES || !slideComponents[target]) return;
      transitioning.current = true;
      setDirection(step);
      setCurrent(target);
      setTimeout(() => {
        transitioning.current = false;
      }, 600);
    },
    [current]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo]);

  const SlideComponent = slideComponents[current];
  const progress = (current / TOTAL_SLIDES) * 100;
  const actLabel = actNames[act];

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        transition: "background-color 1.2s ease, color 1.2s ease",
      }}
    >
      {/* Particles */}
      <Particles color={theme.accent} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <motion.div
          className="h-full"
          style={{ backgroundColor: theme.accent }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Act label */}
      {actLabel && (
        <div className="fixed top-4 left-6 z-40">
          <span
            className="text-xs font-[family-name:var(--font-dm-sans)] tracking-wider uppercase"
            style={{ opacity: 0.35 }}
          >
            {actLabel}
          </span>
        </div>
      )}

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className="absolute inset-0 flex items-center justify-center"
          custom={direction}
          initial={{ opacity: 0, y: direction >= 0 ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction >= 0 ? -20 : 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {SlideComponent && <SlideComponent />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {current > 1 && (
        <button
          onClick={() => goTo(current - 1)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full opacity-20 hover:opacity-60 transition-opacity"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {current < TOTAL_SLIDES && (() => { let n = current + 1; while (n <= TOTAL_SLIDES && !slideComponents[n]) n++; return n <= TOTAL_SLIDES; })() && (
        <button
          onClick={() => goTo(current + 1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full opacity-20 hover:opacity-60 transition-opacity"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Vince floating note */}
      <VinceNote currentSlide={current} />

      {/* Slide counter */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <span
          className="text-xs font-[family-name:var(--font-dm-sans)] tabular-nums"
          style={{ opacity: 0.3 }}
        >
          {current} / {TOTAL_SLIDES}
        </span>
      </div>
    </div>
  );
}
