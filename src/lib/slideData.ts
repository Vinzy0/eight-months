import statsData from "../../data/parsed/stats.json";
import analysisData from "../../data/parsed/analysis.json";
import quotesData from "../../data/parsed/quotes.json";

export const stats = statsData as any;
export const analysis = analysisData as any;
export const quotes = quotesData as any;

export const firstMessage = stats.firstAndLast.firstMessage;
export const lastMessage = stats.firstAndLast.lastMessage;

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
