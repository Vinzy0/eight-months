import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes with intelligent conflict resolution.
 * Combines clsx (conditional class handling) with tailwind-merge (Tailwind conflict resolution).
 * 
 * Usage: cn("base-class", condition && "conditional", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
