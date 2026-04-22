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

interface Stats {
  volume: {
    totalMessages: number;
    totalMessagesVince: number;
    totalMessagesPrincess: number;
    totalWords: number;
    totalWordsVince: number;
    totalWordsPrincess: number;
    totalDays: number;
    totalDaysActive: number;
    messagePercent: { vince: number; princess: number };
    wordPercent: { vince: number; princess: number };
  };
  initiation: {
    conversationStarterPercent: { vince: number; princess: number };
    totalConversations: number;
  };
  length: {
    avgMessageLengthVince: number;
    avgMessageLengthPrincess: number;
    longestMessageEver: { content: string; sender: string; date: string; wordCount: number };
  };
  timing: {
    hourlyDistribution: number[];
    peakHour: number;
    dailyDistribution: number[];
    peakDay: string;
    mostActiveDate: string;
    mostActiveDateCount: number;
    mostActiveDateSample: { sender: string; content: string }[];
  };
  streaks: {
    longestStreak: number;
    longestStreakStart: string;
    longestStreakEnd: string;
    currentStreak: number;
  };
  lateNights: {
    lateNightCount: number;
    lateNightByMonth: { month: string; count: number }[];
  };
  replyGaps: {
    vince: { durationMinutes: number; timestamp: string; contextBefore: string };
    princess: { durationMinutes: number; timestamp: string; contextBefore: string };
  };
  spam: {
    vince: { count: number; timestamp: string; messages: string[] };
    princess: { count: number; timestamp: string; messages: string[] };
  };
  emojis: {
    vince: { emoji: string; count: number }[];
    princess: { emoji: string; count: number }[];
  };
  words: {
    vinceTopWords: { word: string; count: number }[];
    princessTopWords: { word: string; count: number }[];
    topWordsShared: string[];
  };
  firstAndLast: {
    firstMessage: { sender: string; content: string; timestamp: string; platform: string };
    lastMessage: { sender: string; content: string; timestamp: string; platform: string };
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Emoji regex — covers most common emoji ranges
const EMOJI_REGEX = /(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

const STOP_WORDS = new Set([
  'i', 'you', 'the', 'a', 'is', 'it', 'to', 'and', 'of', 'in', 'that', 'this',
  'was', 'for', 'on', 'are', 'at', 'be', 'have', 'with', 'he', 'she', 'we',
  'they', 'do', 'did', 'will', 'would', 'my', 'your', 'me', 'ko', 'ka', 'mo',
  'ang', 'ng', 'na', 'sa', 'yung', 'pero', 'kasi', 'lang', 'naman', 'talaga',
  'diba', 'oo', 'hindi', 'haha', 'hahaha', 'lol', 'ah', 'oh', 'like', 'so',
  'just', 'not', 'no', 'yes', 'what', 'if', 'but', 'or', 'an', 'has', 'had',
  'can', 'been', 'more', 'when', 'who', 'how', 'all', 'about', 'up', 'out',
  'than', 'them', 'then', 'its', 'our', 'also', 'may', 'ba', 'pa', 'nga',
  'eh', 'din', 'rin', 'yun', 'siya', 'ako', 'ikaw', 'ung', 'don', 'dun',
  'tas', 'tapos', 'yon', 'di', 'mag', 'nag', 'pag', 'ya', 'ha', 'okay',
  'ok', 'im', 'dont', 'cant', 'thats', 'its', 'ill', 'ive', 'youre',
  'hahahaha', 'hahahahaha', 'lmao', 'omg',
  // media/system markers
  'media', 'sticker', 'call', 'embed', 'shared', 'link',
]);

function getDateKey(ts: string): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getMonthKey(ts: string): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0) return `${h} hours, ${m} minutes`;
  return `${m} minutes`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const parsedDir = join(__dirname, '..', 'data', 'parsed');
  const messages: Message[] = JSON.parse(readFileSync(join(parsedDir, 'messages.json'), 'utf-8'));

  console.log('═══ PHASE 2a — STAT EXTRACTION ═══\n');
  console.log(`Loaded ${messages.length} messages\n`);

  const textMessages = messages.filter(m => m.type === 'text');
  const vinceMsgs = messages.filter(m => m.sender === 'vince');
  const princessMsgs = messages.filter(m => m.sender === 'princess');
  const vinceText = textMessages.filter(m => m.sender === 'vince');
  const princessText = textMessages.filter(m => m.sender === 'princess');

  // ─── VOLUME ─────────────────────────────────────────────────────────────
  const totalMessages = messages.length;
  const totalWordsVince = vinceText.reduce((sum, m) => sum + countWords(m.content), 0);
  const totalWordsPrincess = princessText.reduce((sum, m) => sum + countWords(m.content), 0);
  const totalWords = totalWordsVince + totalWordsPrincess;

  const firstDate = new Date(messages[0].timestamp);
  const lastDate = new Date(messages[messages.length - 1].timestamp);
  const totalDays = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const activeDays = new Set(messages.map(m => getDateKey(m.timestamp)));
  const totalDaysActive = activeDays.size;

  console.log('─── Volume ───');
  console.log(`  Total messages: ${totalMessages}`);
  console.log(`  Total words: ${totalWords}`);
  console.log(`  Vince: ${vinceMsgs.length} msgs (${(vinceMsgs.length / totalMessages * 100).toFixed(1)}%), ${totalWordsVince} words`);
  console.log(`  Princess: ${princessMsgs.length} msgs (${(princessMsgs.length / totalMessages * 100).toFixed(1)}%), ${totalWordsPrincess} words`);
  console.log(`  Total days: ${totalDays}, Active days: ${totalDaysActive}`);

  // ─── INITIATION ─────────────────────────────────────────────────────────
  // Who sends first after a 3+ hour gap
  const GAP_THRESHOLD_MS = 3 * 60 * 60 * 1000; // 3 hours
  let vinceStarts = 0;
  let princessStarts = 0;

  for (let i = 1; i < messages.length; i++) {
    const gap = new Date(messages[i].timestamp).getTime() - new Date(messages[i - 1].timestamp).getTime();
    if (gap >= GAP_THRESHOLD_MS) {
      if (messages[i].sender === 'vince') vinceStarts++;
      else princessStarts++;
    }
  }

  // First message is always a conversation start
  if (messages[0].sender === 'vince') vinceStarts++;
  else princessStarts++;

  const totalConversations = vinceStarts + princessStarts;

  console.log('\n─── Initiation ───');
  console.log(`  Conversations (3hr+ gaps): ${totalConversations}`);
  console.log(`  Vince starts: ${vinceStarts} (${(vinceStarts / totalConversations * 100).toFixed(1)}%)`);
  console.log(`  Princess starts: ${princessStarts} (${(princessStarts / totalConversations * 100).toFixed(1)}%)`);

  // ─── LENGTH ─────────────────────────────────────────────────────────────
  const avgVince = vinceText.length > 0
    ? vinceText.reduce((s, m) => s + countWords(m.content), 0) / vinceText.length
    : 0;
  const avgPrincess = princessText.length > 0
    ? princessText.reduce((s, m) => s + countWords(m.content), 0) / princessText.length
    : 0;

  let longestMsg = textMessages[0];
  let longestWordCount = 0;
  for (const m of textMessages) {
    const wc = countWords(m.content);
    if (wc > longestWordCount) {
      longestWordCount = wc;
      longestMsg = m;
    }
  }

  console.log('\n─── Length ───');
  console.log(`  Avg words/msg — Vince: ${avgVince.toFixed(1)}, Princess: ${avgPrincess.toFixed(1)}`);
  console.log(`  Longest message: ${longestWordCount} words by ${longestMsg.sender} on ${getDateKey(longestMsg.timestamp)}`);

  // ─── TIMING ─────────────────────────────────────────────────────────────
  const hourly = new Array(24).fill(0);
  const daily = new Array(7).fill(0);
  const dateCounts = new Map<string, number>();

  for (const m of messages) {
    const d = new Date(m.timestamp);
    hourly[d.getHours()]++;
    daily[d.getDay()]++;
    const dk = getDateKey(m.timestamp);
    dateCounts.set(dk, (dateCounts.get(dk) || 0) + 1);
  }

  const peakHour = hourly.indexOf(Math.max(...hourly));
  const peakDayIdx = daily.indexOf(Math.max(...daily));

  // Most active date
  let mostActiveDate = '';
  let mostActiveDateCount = 0;
  for (const [date, count] of dateCounts) {
    if (count > mostActiveDateCount) {
      mostActiveDateCount = count;
      mostActiveDate = date;
    }
  }

  // 3 sample messages from most active date
  const mostActiveDateMsgs = textMessages
    .filter(m => getDateKey(m.timestamp) === mostActiveDate)
    .slice(0, 100); // take a pool
  const sampleIndices = [
    Math.floor(mostActiveDateMsgs.length * 0.2),
    Math.floor(mostActiveDateMsgs.length * 0.5),
    Math.floor(mostActiveDateMsgs.length * 0.8),
  ];
  const mostActiveDateSample = sampleIndices
    .map(i => mostActiveDateMsgs[i])
    .filter(Boolean)
    .map(m => ({ sender: m.sender, content: m.content.slice(0, 200) }));

  console.log('\n─── Timing ───');
  console.log(`  Peak hour: ${peakHour}:00 (${hourly[peakHour]} messages)`);
  console.log(`  Peak day: ${DAY_NAMES[peakDayIdx]} (${daily[peakDayIdx]} messages)`);
  console.log(`  Most active date: ${mostActiveDate} (${mostActiveDateCount} messages)`);

  // ─── STREAKS ────────────────────────────────────────────────────────────
  const sortedDays = [...activeDays].sort();
  let longestStreak = 1;
  let currentRun = 1;
  let streakStart = sortedDays[0];
  let bestStreakStart = sortedDays[0];
  let bestStreakEnd = sortedDays[0];

  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1]);
    const curr = new Date(sortedDays[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentRun++;
      if (currentRun > longestStreak) {
        longestStreak = currentRun;
        bestStreakStart = streakStart;
        bestStreakEnd = sortedDays[i];
      }
    } else {
      currentRun = 1;
      streakStart = sortedDays[i];
    }
  }

  // Current streak (counting back from today)
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  let currentStreak = 0;
  let checkDate = new Date(today);

  while (true) {
    const key = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    if (activeDays.has(key)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  console.log('\n─── Streaks ───');
  console.log(`  Longest streak: ${longestStreak} days (${bestStreakStart} to ${bestStreakEnd})`);
  console.log(`  Current streak: ${currentStreak} days`);

  // ─── LATE NIGHTS ────────────────────────────────────────────────────────
  const lateNightMsgs = messages.filter(m => {
    const h = new Date(m.timestamp).getHours();
    return h >= 0 && h < 4;
  });
  const lateNightCount = lateNightMsgs.length;

  const lateNightByMonthMap = new Map<string, number>();
  for (const m of lateNightMsgs) {
    const mk = getMonthKey(m.timestamp);
    lateNightByMonthMap.set(mk, (lateNightByMonthMap.get(mk) || 0) + 1);
  }
  const lateNightByMonth = [...lateNightByMonthMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }));

  console.log('\n─── Late Nights (midnight–4am) ───');
  console.log(`  Total: ${lateNightCount} messages`);
  for (const { month, count } of lateNightByMonth) {
    console.log(`    ${month}: ${count}`);
  }

  // ─── REPLY GAPS ─────────────────────────────────────────────────────────
  let longestGapVince = { durationMinutes: 0, timestamp: '', contextBefore: '' };
  let longestGapPrincess = { durationMinutes: 0, timestamp: '', contextBefore: '' };

  for (let i = 1; i < messages.length; i++) {
    if (messages[i].sender !== messages[i - 1].sender) {
      const gap = (new Date(messages[i].timestamp).getTime() - new Date(messages[i - 1].timestamp).getTime()) / (1000 * 60);

      // This is a reply gap — the person replying is messages[i].sender
      // The person who was LEFT WAITING is messages[i-1].sender
      // So the gap is attributed to the replier (messages[i].sender) — they took long to reply
      if (messages[i].sender === 'vince' && gap > longestGapVince.durationMinutes) {
        longestGapVince = {
          durationMinutes: Math.round(gap),
          timestamp: messages[i].timestamp,
          contextBefore: messages[i - 1].content.slice(0, 200),
        };
      }
      if (messages[i].sender === 'princess' && gap > longestGapPrincess.durationMinutes) {
        longestGapPrincess = {
          durationMinutes: Math.round(gap),
          timestamp: messages[i].timestamp,
          contextBefore: messages[i - 1].content.slice(0, 200),
        };
      }
    }
  }

  console.log('\n─── Reply Gaps ───');
  console.log(`  Vince's longest reply gap: ${formatDuration(longestGapVince.durationMinutes)}`);
  console.log(`    After Princess said: "${longestGapVince.contextBefore.slice(0, 80)}..."`);
  console.log(`  Princess's longest reply gap: ${formatDuration(longestGapPrincess.durationMinutes)}`);
  console.log(`    After Vince said: "${longestGapPrincess.contextBefore.slice(0, 80)}..."`);

  // ─── SPAM STREAKS ──────────────────────────────────────────────────────
  // Longest streak of consecutive messages from same sender (no reply in between)
  let bestSpamVince = { count: 0, timestamp: '', messages: [] as string[] };
  let bestSpamPrincess = { count: 0, timestamp: '', messages: [] as string[] };

  let currentSpamSender = messages[0].sender;
  let currentSpamCount = 1;
  let currentSpamStart = 0;

  for (let i = 1; i < messages.length; i++) {
    if (messages[i].sender === currentSpamSender) {
      currentSpamCount++;
    } else {
      // Flush
      if (currentSpamSender === 'vince' && currentSpamCount > bestSpamVince.count) {
        bestSpamVince = {
          count: currentSpamCount,
          timestamp: messages[currentSpamStart].timestamp,
          messages: messages.slice(currentSpamStart, currentSpamStart + currentSpamCount)
            .map(m => m.content.slice(0, 150)),
        };
      }
      if (currentSpamSender === 'princess' && currentSpamCount > bestSpamPrincess.count) {
        bestSpamPrincess = {
          count: currentSpamCount,
          timestamp: messages[currentSpamStart].timestamp,
          messages: messages.slice(currentSpamStart, currentSpamStart + currentSpamCount)
            .map(m => m.content.slice(0, 150)),
        };
      }
      currentSpamSender = messages[i].sender;
      currentSpamCount = 1;
      currentSpamStart = i;
    }
  }
  // Flush final
  if (currentSpamSender === 'vince' && currentSpamCount > bestSpamVince.count) {
    bestSpamVince = {
      count: currentSpamCount,
      timestamp: messages[currentSpamStart].timestamp,
      messages: messages.slice(currentSpamStart, currentSpamStart + currentSpamCount)
        .map(m => m.content.slice(0, 150)),
    };
  }
  if (currentSpamSender === 'princess' && currentSpamCount > bestSpamPrincess.count) {
    bestSpamPrincess = {
      count: currentSpamCount,
      timestamp: messages[currentSpamStart].timestamp,
      messages: messages.slice(currentSpamStart, currentSpamStart + currentSpamCount)
        .map(m => m.content.slice(0, 150)),
    };
  }

  // Only keep first 10 messages for display
  bestSpamVince.messages = bestSpamVince.messages.slice(0, 10);
  bestSpamPrincess.messages = bestSpamPrincess.messages.slice(0, 10);

  console.log('\n─── Spam Streaks ───');
  console.log(`  Vince: ${bestSpamVince.count} messages in a row (${getDateKey(bestSpamVince.timestamp)})`);
  console.log(`  Princess: ${bestSpamPrincess.count} messages in a row (${getDateKey(bestSpamPrincess.timestamp)})`);

  // ─── EMOJIS ─────────────────────────────────────────────────────────────
  function extractEmojis(msgs: Message[]): { emoji: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const m of msgs) {
      if (m.type !== 'text') continue;
      const emojis = m.content.match(EMOJI_REGEX);
      if (emojis) {
        for (const e of emojis) {
          counts.set(e, (counts.get(e) || 0) + 1);
        }
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([emoji, count]) => ({ emoji, count }));
  }

  const vinceEmojis = extractEmojis(vinceMsgs);
  const princessEmojis = extractEmojis(princessMsgs);

  console.log('\n─── Top Emojis ───');
  console.log(`  Vince: ${vinceEmojis.map(e => `${e.emoji}(${e.count})`).join(' ')}`);
  console.log(`  Princess: ${princessEmojis.map(e => `${e.emoji}(${e.count})`).join(' ')}`);

  // ─── WORDS ──────────────────────────────────────────────────────────────
  function topWords(msgs: Message[]): { word: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const m of msgs) {
      if (m.type !== 'text') continue;
      const words = m.content.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 1);
      for (const w of words) {
        if (!STOP_WORDS.has(w)) {
          counts.set(w, (counts.get(w) || 0) + 1);
        }
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  const vinceTopWords = topWords(vinceMsgs);
  const princessTopWords = topWords(princessMsgs);

  const vinceWordSet = new Set(vinceTopWords.map(w => w.word));
  const princessWordSet = new Set(princessTopWords.map(w => w.word));
  const topWordsShared = [...vinceWordSet].filter(w => princessWordSet.has(w));

  console.log('\n─── Top Words ───');
  console.log(`  Vince: ${vinceTopWords.map(w => `${w.word}(${w.count})`).join(', ')}`);
  console.log(`  Princess: ${princessTopWords.map(w => `${w.word}(${w.count})`).join(', ')}`);
  console.log(`  Shared: ${topWordsShared.join(', ')}`);

  // ─── FIRST & LAST ──────────────────────────────────────────────────────
  const firstMessage = {
    sender: messages[0].sender,
    content: messages[0].content,
    timestamp: messages[0].timestamp,
    platform: messages[0].platform,
  };
  const lastMessage = {
    sender: messages[messages.length - 1].sender,
    content: messages[messages.length - 1].content,
    timestamp: messages[messages.length - 1].timestamp,
    platform: messages[messages.length - 1].platform,
  };

  console.log('\n─── First & Last ───');
  console.log(`  First: [${firstMessage.platform}] ${firstMessage.sender}: "${firstMessage.content.slice(0, 80)}"`);
  console.log(`  Last:  [${lastMessage.platform}] ${lastMessage.sender}: "${lastMessage.content.slice(0, 80)}"`);

  // ─── BUILD STATS OBJECT ────────────────────────────────────────────────
  const stats: Stats = {
    volume: {
      totalMessages,
      totalMessagesVince: vinceMsgs.length,
      totalMessagesPrincess: princessMsgs.length,
      totalWords,
      totalWordsVince,
      totalWordsPrincess,
      totalDays,
      totalDaysActive,
      messagePercent: {
        vince: Math.round(vinceMsgs.length / totalMessages * 1000) / 10,
        princess: Math.round(princessMsgs.length / totalMessages * 1000) / 10,
      },
      wordPercent: {
        vince: Math.round(totalWordsVince / totalWords * 1000) / 10,
        princess: Math.round(totalWordsPrincess / totalWords * 1000) / 10,
      },
    },
    initiation: {
      conversationStarterPercent: {
        vince: Math.round(vinceStarts / totalConversations * 1000) / 10,
        princess: Math.round(princessStarts / totalConversations * 1000) / 10,
      },
      totalConversations,
    },
    length: {
      avgMessageLengthVince: Math.round(avgVince * 10) / 10,
      avgMessageLengthPrincess: Math.round(avgPrincess * 10) / 10,
      longestMessageEver: {
        content: longestMsg.content,
        sender: longestMsg.sender,
        date: getDateKey(longestMsg.timestamp),
        wordCount: longestWordCount,
      },
    },
    timing: {
      hourlyDistribution: hourly,
      peakHour,
      dailyDistribution: daily,
      peakDay: DAY_NAMES[peakDayIdx],
      mostActiveDate,
      mostActiveDateCount,
      mostActiveDateSample,
    },
    streaks: {
      longestStreak,
      longestStreakStart: bestStreakStart,
      longestStreakEnd: bestStreakEnd,
      currentStreak,
    },
    lateNights: {
      lateNightCount,
      lateNightByMonth,
    },
    replyGaps: {
      vince: longestGapVince,
      princess: longestGapPrincess,
    },
    spam: {
      vince: bestSpamVince,
      princess: bestSpamPrincess,
    },
    emojis: {
      vince: vinceEmojis,
      princess: princessEmojis,
    },
    words: {
      vinceTopWords,
      princessTopWords,
      topWordsShared,
    },
    firstAndLast: {
      firstMessage,
      lastMessage,
    },
  };

  // ─── SAVE ──────────────────────────────────────────────────────────────
  const outputPath = join(parsedDir, 'stats.json');
  writeFileSync(outputPath, JSON.stringify(stats, null, 2), 'utf-8');
  console.log(`\n✅ Stats saved to ${outputPath}`);
}

main();
