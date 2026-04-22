import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  platform: string;
  sender: 'vince' | 'princess';
  timestamp: string;
  content: string;
  type: string;
  replyTo?: string;
}

type QuoteCategory = 'sweet' | 'funny' | 'deep' | 'chaotic' | 'conflict' | 'affection' | 'milestone' | 'spicy';

interface Quote {
  sender: string;
  content: string;
  timestamp: string;
  platform: string;
  category: QuoteCategory;
}

interface QuotePair {
  messages: { sender: string; content: string; timestamp: string; platform: string }[];
  category: QuoteCategory;
  label: string;
}

// ─── Keyword / Pattern Banks ────────────────────────────────────────────────

// Sweet: caring, thoughtful, protective — NOT just "goodnight i love you"
const SWEET_PATTERNS = [
  /miss\s*(you|u|ko|kita)/i,
  /take\s*care/i,
  /ingat\b/i,
  /kumain\s*ka/i,
  /kain\s*ka/i,
  /drive\s*safe/i,
  /thinking\s*(of|about)\s*(you|u)/i,
  /iniisip\s*kita/i,
  /proud\s*(of|ako|sayo|ka)/i,
  /believe\s*in\s*(you|u)/i,
  /kaya\s*mo\s*(yan|to)/i,
  /you\s*make\s*me\s*(happy|smile|laugh)/i,
  /galing\s*(mo|ng\s*baby)/i,
  /ang\s*galing/i,
  /thank\s*(you|u)\s*(for|so)/i,
  /salamat/i,
  /wait(ing)?\s*(for|4)\s*(you|u)/i,
  /ill\s*(just\s*)?wait/i,
  /swerte/i,
  /lucky/i,
  /favorite/i,
  /special/i,
  /cute\s*(mo|naman)/i,
  /ang\s*cute/i,
  /appreciate/i,
  /have\s*(some|sum)\s*rest/i,
  /pagaling/i,
  /had\s*so\s*much\s*fun/i,
  /cant\s*wait\s*to\s*see/i,
  /want\s*our\s*relationship\s*to\s*work/i,
];

// Sweet-generic: repetitive patterns to PENALIZE (still match, but score lower)
const SWEET_GENERIC_PENALTY = [
  /good\s*(night|morning).*i\s*love/i,
  /^i\s*love\s*(you|u)\s*(so\s*much\s*)?(baby|babe|babyyy?)?\s*$/i,
  /^(oki|okay)\s*(po\s*)?good\s*night/i,
  /^good\s*night\s*(baby|babyyy?)\s*(i\s*love)?/i,
];

// Funny: absurd, chaotic humor, dumb moments, gaming, wrong sends — NOT just cursing
const FUNNY_PATTERNS = [
  /charot/i,
  /bruh/i,
  /grabe/i,
  /gagi/i,
  /luh/i,
  /jusko/i,
  /naur/i,
  /ano\s*ba/i,
  /akala\s*ko/i,
  /wrong\s*send/i,
  /nakalimutan/i,
  /mali.*pala/i,
  /parang\s*tanga/i,
  /sira\s*(ka|ulo)/i,
  /delulu/i,
  /imagine/i,
  /di\s*ko\s*alam/i,
  /bobo\s*(ko|mo)/i,
  /anong\s*(nangyari|klaseng)/i,
  /😭{2,}/,
  /💀{2,}/,
  /LMAO/,
  /HAHAHA{2,}/i,
];

// Funny-generic: just cursing with no context — penalize
const FUNNY_GENERIC_PENALTY = [
  /^putangina\s*(mo|naman|ng)?\s*$/i,
  /^tangina\s*(mo|naman)?\s*$/i,
  /^gago\s*$/i,
  /^amp\s*$/i,
  /^HAHAHA+\s*$/i,
];

const DEEP_PATTERNS = [
  /scared/i,
  /afraid/i,
  /takot\s*(ako|ko)/i,
  /natatakot/i,
  /trust/i,
  /feel(s?)\s*(like|empty|alone|lost|sad|numb)/i,
  /vulnerable/i,
  /honest(ly)?/i,
  /i('m|\s*am)\s*(not\s*)?okay/i,
  /cry(ing)?/i,
  /umiiyak/i,
  /overthink/i,
  /anxiety/i,
  /worth/i,
  /deserve/i,
  /promise/i,
  /pangako/i,
  /hindi\s*ko\s*alam/i,
  /i\s*don('t|t)\s*know\s*(what|how|if|anymore)/i,
  /change(d)?\s*(me|for|you|everything)/i,
  /matter(s)?\s*(to\s*me)?/i,
  /real\s*(talk|shit|one)/i,
  /never\s*(leave|forget|let|give)/i,
  /important\s*to\s*me/i,
  /mean(s)?\s*(a\s*lot|everything|so\s*much)/i,
  /pagod/i,
  /need\s*(you|u|space|time)/i,
  /realize[d]?/i,
  /narealize/i,
  /genuine/i,
  /lust/i,
  /fault/i,
  /mali\s*ko/i,
  /patient/i,
  /forgive/i,
  /cry.*to/i,
  /wasn('t|t)\s*there/i,
  /let\s*(my|u)\s*down/i,
  /disappoint/i,
];

const CHAOTIC_PATTERNS = [
  /!{3,}/,
  /\?{3,}/,
  /AAAAA/,
  /AHHHHH/i,
  /WAAAA/i,
  /HAHAHAHA{4,}/i,
  /GRABE/,
  /TANGINA/,
  /GAGO/,
  /HALAA/i,
  /SHET/i,
  /😭{3,}/,
  /💀{3,}/,
  /🤣{2,}/,
  /[A-Z]{5,}/,
  /[HGSJAK]{8,}/i,
];

const CONFLICT_PATTERNS = [
  /sorry/i,
  /pasensya/i,
  /patawad/i,
  /galit/i,
  /angry/i,
  /upset/i,
  /annoyed/i,
  /inis/i,
  /selos/i,
  /jealous/i,
  /ignore/i,
  /seen\s*zone/i,
  /left\s*on\s*(read|seen)/i,
  /why\s*(won't|don't|didn't|aren't|can't)\s*you/i,
  /bakit\s*(hindi|di|ayaw)/i,
  /don('t|t)\s*(talk|message|text)\s*(me|to)/i,
  /leave\s*me\s*alone/i,
  /bahala\s*ka/i,
  /ayoko\s*na/i,
  /i('m|\s*am)\s*(done|tired|leaving|over)/i,
  /we\s*need\s*to\s*talk/i,
  /lagi\s*(ka|mo)\s*naman/i,
  /di\s*(ka|mo)\s*(naman|kasi)/i,
  /wala\s*ka\s*(naman|paki)/i,
  /tampo/i,
  /petty/i,
  /pagselosin/i,
];

const AFFECTION_PATTERNS = [
  /i\s*love\s*(you|u)\b/i,
  /mahal\s*kita/i,
  /love\s*(you|u)\b/i,
  /\bily\b/i,
  /labyu/i,
  /lab\s*u\b/i,
  /love\s*na\s*love/i,
  /i\s*like\s*(you|u)\s*(so|a\s*lot)/i,
  /gusto\s*kita/i,
  /you('re|\s*are)\s*(my|the)\s*(everything|world|home|person|favorite)/i,
  /ikaw\s*ang/i,
  /you\s*mean\s*(everything|the\s*world|so\s*much)/i,
  /stay\s*(with\s*(me|you)|forever|always)/i,
  /\bforever\b/i,
  /soulmate/i,
  /❤️/,
  /💕/,
  /💗/,
  /🥰{2,}/,
  /😘{2,}/,
  /saranghae/i,
  /my\s*(love)\b/i,
  /relationship/i,
];

const MILESTONE_PATTERNS = [
  /first\s*(time|ever|date|kiss|call)/i,
  /\bofficial\b/i,
  /\bjowa\b/i,
  /monthsary/i,
  /anniversary|anniv/i,
  /i\s*love\s*you/i,
  /mahal\s*kita/i,
  /\btayo\s*na\b/i,
  /kami\s*na\b/i,
  /met\s*you/i,
  /happy\s*\d+\s*(month|day|week)/i,
  /\blabel\b/i,
  /exclusive/i,
];

// New: SPICY — NSFW, flirty, intimate
const SPICY_PATTERNS = [
  /horny/i,
  /turn(ed|s)?\s*(on|me\s*on)/i,
  /\bkiss\b/i,
  /halik/i,
  /cuddle/i,
  /arouse/i,
  /libog/i,
  /\bsexy\b/i,
  /cock/i,
  /make\s*out/i,
  /flustered/i,
  /kilig/i,
  /kinikilig/i,
  /intimate/i,
  /\bcocky\b/i,
  /finish\s*fast/i,
  /initiate/i,
  /spicy/i,
  /\bhot\b.*\b(when|mo|ka)/i,
  /i\s*find\s*it\s*hot/i,
  /gusto.*kiss/i,
  /magkiss/i,
  /nagkiss/i,
  /first\s*kiss/i,
  /phr?one/i,
];

// ─── Scoring Functions ───────────────────────────────────────────────────────

function scoreCategory(content: string, patterns: RegExp[]): number {
  let score = 0;
  for (const p of patterns) {
    if (p.test(content)) score++;
  }
  return score;
}

function penaltyScore(content: string, penalties: RegExp[]): number {
  let penalty = 0;
  for (const p of penalties) {
    if (p.test(content)) penalty += 3; // heavy penalty to push generic down
  }
  return penalty;
}

function categorizeMessage(content: string): { category: QuoteCategory; score: number } | null {
  const scores: { category: QuoteCategory; score: number }[] = [
    { category: 'spicy', score: scoreCategory(content, SPICY_PATTERNS) },
    { category: 'milestone', score: scoreCategory(content, MILESTONE_PATTERNS) },
    { category: 'affection', score: scoreCategory(content, AFFECTION_PATTERNS) },
    { category: 'deep', score: scoreCategory(content, DEEP_PATTERNS) },
    { category: 'conflict', score: scoreCategory(content, CONFLICT_PATTERNS) },
    {
      category: 'sweet',
      score: Math.max(0, scoreCategory(content, SWEET_PATTERNS) - penaltyScore(content, SWEET_GENERIC_PENALTY)),
    },
    {
      category: 'funny',
      score: Math.max(0, scoreCategory(content, FUNNY_PATTERNS) - penaltyScore(content, FUNNY_GENERIC_PENALTY)),
    },
    { category: 'chaotic', score: scoreCategory(content, CHAOTIC_PATTERNS) },
  ];

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score === 0) return null;
  return scores[0];
}

// ─── Quality Filters ─────────────────────────────────────────────────────────

function isGoodQuote(content: string): boolean {
  if (content.length < 8 || content.length > 500) return false;
  if (content.startsWith('[') && content.endsWith(']')) return false;
  if (/^https?:\/\//i.test(content.trim())) return false;
  const textOnly = content.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F\s]/gu, '');
  if (textOnly.length < 3) return false;
  if (/^Reacted /i.test(content)) return false;
  return true;
}

// Prefer messages with moderate length — long enough to have substance, short enough to be punchy
function qualityScore(content: string): number {
  const len = content.length;
  // Sweet spot: 25-200 chars
  if (len >= 25 && len <= 200) return 3;
  if (len >= 15 && len <= 300) return 1;
  return 0;
}

// Content similarity check — avoid near-duplicate quotes
function isTooSimilar(newContent: string, existing: string[]): boolean {
  const normalized = newContent.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  for (const e of existing) {
    const eNorm = e.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    // Check prefix overlap (first 30 chars)
    if (normalized.slice(0, 30) === eNorm.slice(0, 30)) return true;
    // Check if one contains the other (for short msgs)
    if (normalized.length < 40 && eNorm.includes(normalized)) return true;
    if (eNorm.length < 40 && normalized.includes(eNorm)) return true;
  }
  return false;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const parsedDir = join(__dirname, '..', 'data', 'parsed');
  const messages: Message[] = JSON.parse(readFileSync(join(parsedDir, 'messages.json'), 'utf-8'));

  console.log('═══ PHASE 2b — QUOTES EXTRACTION ═══\n');
  console.log(`Loaded ${messages.length} messages\n`);

  const textMessages = messages.filter(m => m.type === 'text');

  // ─── COLLECT CANDIDATES ──────────────────────────────────────────────────
  interface Candidate {
    msg: Message;
    category: QuoteCategory;
    score: number;
    quality: number;
  }

  const candidates: Map<QuoteCategory, Candidate[]> = new Map();
  const categories: QuoteCategory[] = ['sweet', 'funny', 'deep', 'chaotic', 'conflict', 'affection', 'milestone', 'spicy'];
  for (const cat of categories) {
    candidates.set(cat, []);
  }

  for (const m of textMessages) {
    if (!isGoodQuote(m.content)) continue;

    const result = categorizeMessage(m.content);
    if (!result) continue;

    const quality = qualityScore(m.content);
    candidates.get(result.category)!.push({
      msg: m,
      category: result.category,
      score: result.score + quality,
      quality,
    });
  }

  // ─── SELECT BEST QUOTES PER CATEGORY ─────────────────────────────────────
  const TARGET_PER_CATEGORY: Record<QuoteCategory, number> = {
    sweet: 12,
    funny: 12,
    deep: 10,
    chaotic: 8,
    conflict: 6,
    affection: 10,
    milestone: 6,
    spicy: 8,
  };

  const selectedQuotes: Quote[] = [];
  const usedIds = new Set<string>();

  for (const category of categories) {
    const pool = candidates.get(category)!;

    // Sort by score descending
    pool.sort((a, b) => b.score - a.score);

    // Take deep pool for diversity selection
    const topPool = pool.slice(0, TARGET_PER_CATEGORY[category] * 5);
    const target = TARGET_PER_CATEGORY[category];

    // Select with diversity: time spread, sender balance, content uniqueness
    const selected: Candidate[] = [];
    const selectedContents: string[] = [];
    let vinceCount = 0;
    let princessCount = 0;

    for (const c of topPool) {
      if (selected.length >= target) break;
      if (usedIds.has(c.msg.id)) continue;

      // Date diversity: max 1 per date per category
      const dateKey = c.msg.timestamp.slice(0, 10);
      const dateOccurrences = selected.filter(s => s.msg.timestamp.slice(0, 10) === dateKey).length;
      if (dateOccurrences >= 1) continue;

      // Content diversity: skip if too similar to already-selected
      if (isTooSimilar(c.msg.content, selectedContents)) continue;

      // Sender balance: hard cap at +2 difference, skip if imbalanced and alternatives exist
      const senderCount = c.msg.sender === 'vince' ? vinceCount : princessCount;
      const otherCount = c.msg.sender === 'vince' ? princessCount : vinceCount;
      if (senderCount >= otherCount + 2) {
        // Check if there's a decent alternative from the other sender
        const hasAlt = topPool.some(t =>
          t.msg.sender !== c.msg.sender &&
          !usedIds.has(t.msg.id) &&
          t.score >= c.score - 2 &&
          !isTooSimilar(t.msg.content, selectedContents)
        );
        if (hasAlt) continue;
      }

      selected.push(c);
      selectedContents.push(c.msg.content);
      usedIds.add(c.msg.id);
      if (c.msg.sender === 'vince') vinceCount++;
      else princessCount++;
    }

    // Fill remaining if under target (relax constraints)
    if (selected.length < target) {
      for (const c of topPool) {
        if (selected.length >= target) break;
        if (usedIds.has(c.msg.id)) continue;
        if (isTooSimilar(c.msg.content, selectedContents)) continue;
        selected.push(c);
        selectedContents.push(c.msg.content);
        usedIds.add(c.msg.id);
      }
    }

    for (const c of selected) {
      selectedQuotes.push({
        sender: c.msg.sender,
        content: c.msg.content,
        timestamp: c.msg.timestamp,
        platform: c.msg.platform,
        category,
      });
    }

    console.log(`  ${category}: selected ${selected.length} (vince: ${selected.filter(s => s.msg.sender === 'vince').length}, princess: ${selected.filter(s => s.msg.sender === 'princess').length}) from ${pool.length} candidates`);
  }

  // ─── QUOTE PAIRS (back-and-forth exchanges) ──────────────────────────────
  const quotePairs: { pair: QuotePair; score: number }[] = [];

  for (let i = 0; i < messages.length - 1; i++) {
    // Must be a text back-and-forth (alternating senders)
    if (messages[i].type !== 'text' || messages[i + 1].type !== 'text') continue;
    if (messages[i].sender === messages[i + 1].sender) continue;

    // Gather 2-4 messages in this exchange window
    const window: Message[] = [messages[i], messages[i + 1]];
    for (let j = i + 2; j < Math.min(i + 5, messages.length); j++) {
      if (messages[j].type !== 'text') break;
      const gap = new Date(messages[j].timestamp).getTime() - new Date(messages[j - 1].timestamp).getTime();
      if (gap > 3 * 60 * 1000) break; // 3 min max gap within exchange
      window.push(messages[j]);
    }

    // Need at least 2 messages, both must be decent quality
    const good = window.filter(m => isGoodQuote(m.content) && m.content.length >= 12);
    if (good.length < 2) continue;

    // Must have both senders represented
    const senders = new Set(good.map(m => m.sender));
    if (senders.size < 2) continue;

    // Combined content for scoring
    const combined = good.map(m => m.content).join(' ');

    // Score across all categories
    const catScores: { cat: QuoteCategory; score: number }[] = [
      { cat: 'sweet', score: scoreCategory(combined, SWEET_PATTERNS) },
      { cat: 'funny', score: scoreCategory(combined, FUNNY_PATTERNS) },
      { cat: 'deep', score: scoreCategory(combined, DEEP_PATTERNS) },
      { cat: 'affection', score: scoreCategory(combined, AFFECTION_PATTERNS) },
      { cat: 'spicy', score: scoreCategory(combined, SPICY_PATTERNS) },
      { cat: 'conflict', score: scoreCategory(combined, CONFLICT_PATTERNS) },
    ];
    catScores.sort((a, b) => b.score - a.score);

    if (catScores[0].score < 2) continue;

    // Quality bonus: longer messages in exchange = more context
    const avgLen = good.reduce((s, m) => s + m.content.length, 0) / good.length;
    const lenBonus = avgLen >= 30 ? 2 : avgLen >= 18 ? 1 : 0;

    const pair: QuotePair = {
      messages: good.slice(0, 4).map(m => ({
        sender: m.sender,
        content: m.content.slice(0, 300),
        timestamp: m.timestamp,
        platform: m.platform,
      })),
      category: catScores[0].cat,
      label: `${catScores[0].cat} exchange`,
    };

    quotePairs.push({ pair, score: catScores[0].score + lenBonus });
  }

  // Select best 20 pairs with diversity
  quotePairs.sort((a, b) => b.score - a.score);
  const seenPairContents = new Set<string>();
  const bestPairs: QuotePair[] = [];
  const pairCategoryCounts = new Map<QuoteCategory, number>();
  const pairUsedDates = new Map<string, number>();

  function pairFingerprint(pair: QuotePair): Set<string> {
    // Each message normalized to first 30 chars
    return new Set(pair.messages.map(m => m.content.toLowerCase().replace(/[^a-z]/g, '').slice(0, 30)));
  }

  function pairOverlapsExisting(pair: QuotePair): boolean {
    const fp = pairFingerprint(pair);
    for (const seen of seenPairContents) {
      if (fp.has(seen)) return true;
    }
    return false;
  }

  for (const { pair } of quotePairs) {
    if (bestPairs.length >= 18) break;

    // Skip if any message in this pair was already used in another pair
    if (pairOverlapsExisting(pair)) continue;

    // Date diversity: max 1 pair per day
    const dateKey = pair.messages[0].timestamp.slice(0, 10);
    if ((pairUsedDates.get(dateKey) || 0) >= 1) continue;

    // Category diversity: max 4 per category
    const catCount = pairCategoryCounts.get(pair.category) || 0;
    if (catCount >= 4) continue;

    // Mark all message fingerprints as used
    const fp = pairFingerprint(pair);
    for (const f of fp) seenPairContents.add(f);
    pairUsedDates.set(dateKey, (pairUsedDates.get(dateKey) || 0) + 1);
    pairCategoryCounts.set(pair.category, catCount + 1);
    bestPairs.push(pair);
  }

  // ─── OUTPUT ──────────────────────────────────────────────────────────────
  const output = {
    quotes: selectedQuotes,
    quotePairs: bestPairs,
    meta: {
      totalQuotes: selectedQuotes.length,
      totalPairs: bestPairs.length,
      byCategory: {} as Record<string, number>,
      bySender: {
        vince: selectedQuotes.filter(q => q.sender === 'vince').length,
        princess: selectedQuotes.filter(q => q.sender === 'princess').length,
      },
    },
  };

  for (const cat of categories) {
    output.meta.byCategory[cat] = selectedQuotes.filter(q => q.category === cat).length;
  }

  console.log('\n─── Quote Counts by Category ───');
  for (const cat of categories) {
    console.log(`  ${cat}: ${output.meta.byCategory[cat]}`);
  }

  console.log(`\n─── Total ───`);
  console.log(`  Single quotes: ${selectedQuotes.length}`);
  console.log(`  Quote pairs: ${bestPairs.length}`);
  console.log(`  By sender — Vince: ${output.meta.bySender.vince}, Princess: ${output.meta.bySender.princess}`);

  // Show pair category breakdown
  const pairCats = new Map<string, number>();
  for (const p of bestPairs) {
    pairCats.set(p.category, (pairCats.get(p.category) || 0) + 1);
  }
  console.log(`  Pairs by category: ${[...pairCats.entries()].map(([k, v]) => `${k}(${v})`).join(', ')}`);

  console.log('\n─── Sample Quotes ───');
  for (const cat of categories) {
    const samples = selectedQuotes.filter(q => q.category === cat).slice(0, 2);
    for (const s of samples) {
      console.log(`  [${cat}] ${s.sender}: "${s.content.slice(0, 120)}"`);
    }
  }

  const outputPath = join(parsedDir, 'quotes.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n✅ Quotes saved to ${outputPath}`);
}

main();
