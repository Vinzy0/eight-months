"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  label: string;
  icon?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

// Ease out quart - slows down as it approaches the target
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function StatCard({ 
  value, 
  label, 
  icon, 
  suffix = "", 
  duration = 2.5,
  className 
}: Props) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    
    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Apply ease-out curve - slows down near the end
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * value);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure we end exactly at the target
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [value, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={cn(
          "p-8 md:p-10 flex flex-col items-center text-center",
          "bg-card/60 backdrop-blur-md border-accent/10",
          className
        )}
      >
        <CardContent className="p-0 flex flex-col items-center">
          {icon && <span className="text-3xl mb-4">{icon}</span>}
          <span
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-foreground"
          >
            {count.toLocaleString()}{suffix}
          </span>
          <span
            className="mt-3 text-sm md:text-base font-[family-name:var(--font-dm-sans)] text-muted-foreground"
          >
            {label}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
