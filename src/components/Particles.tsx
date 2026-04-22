"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function seededRandom(seed: number) {
  // Simple deterministic PRNG so particles are stable across hydration
  return () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function generateParticles(count: number): Particle[] {
  const rand = seededRandom(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    size: rand() * 5 + 2,
    duration: rand() * 14 + 10,
    delay: rand() * 6,
    opacity: rand() * 0.08 + 0.03,
  }));
}

export default function Particles({ color = "#C68B59", count = 25 }: { color?: string; count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [particles] = useState(() => generateParticles(count));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: p.opacity,
          }}
          initial={{ y: "100vh" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
