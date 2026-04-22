export type ActTheme = {
  bg: string;
  accent: string;
  highlight: string;
  text: string;
};

/*
  Coffee palette — warm, intimate, layered like a good latte.

  Act 1 (fun/nostalgic):   cream + caramel
  Act 2 (patterns):        warm linen + mocha
  Act 3 (chapters):        soft taupe + roasted almond
  Act 4 (profiles):        latte foam + espresso tint
  Act 5 (emotional):       warm blush cream + burnt caramel
  Act 6 (forward):         cool coffee + slate mocha
  End card:                deep espresso, almost black
*/

export const actThemes: Record<string, ActTheme> = {
  act1: { bg: "#FAF3E8", accent: "#C68B59", highlight: "#E8CBA7", text: "#2C1A0E" },
  act2: { bg: "#F7EDE0", accent: "#A67B5B", highlight: "#D4A574", text: "#2C1A0E" },
  act3: { bg: "#F3EAE0", accent: "#8B6F4E", highlight: "#C9A882", text: "#2C1A0E" },
  act4: { bg: "#F0E8DE", accent: "#7A6652", highlight: "#B8977A", text: "#2C1A0E" },
  act5: { bg: "#F8EDE4", accent: "#B07A4A", highlight: "#D4A06A", text: "#2C1A0E" },
  act6: { bg: "#EDE6DC", accent: "#6F5B4A", highlight: "#9B8570", text: "#2C1A0E" },
  end:  { bg: "#1A0F08", accent: "#C68B59", highlight: "#D4A574", text: "#FAF3E8" },
};

export const actNames: Record<string, string> = {
  act1: "Look How Far We've Come",
  act2: "The Patterns You Never Noticed",
  act3: "Your Eight Months, In Chapters",
  act4: "Who You Both Are",
  act5: "What This All Means",
  act6: "What Comes Next",
  end: "",
};

export function getSlideAct(slideNumber: number): string {
  if (slideNumber <= 10) return "act1";
  if (slideNumber <= 18) return "act2";
  if (slideNumber <= 23) return "act3";
  if (slideNumber <= 29) return "act4";
  if (slideNumber <= 34) return "act5";
  if (slideNumber <= 41) return "act6";
  return "end";
}
