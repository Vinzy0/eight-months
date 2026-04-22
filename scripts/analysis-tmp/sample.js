// Strategic sampler for analysis. Loads messages.json once, dumps multiple
// targeted slices to /scripts/analysis-tmp/out so the analyst can read them
// without re-parsing 14MB on every probe.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'data', 'parsed', 'messages.json');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const all = JSON.parse(fs.readFileSync(SRC, 'utf8'));
console.log('loaded', all.length, 'messages');

// helper
function write(name, obj) {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 2));
  console.log('wrote', name, Array.isArray(obj) ? obj.length : Object.keys(obj).length);
}

// Add date-only field for grouping
const msgs = all.map((m, i) => ({
  i,
  d: m.timestamp.slice(0, 10),
  t: m.timestamp,
  s: m.sender,
  p: m.platform,
  c: (m.content || '').slice(0, 600),
  type: m.type,
}));

// 1) First 200 messages (the very beginning)
write('first-200.json', msgs.slice(0, 200));

// 2) Last 200 messages
write('last-200.json', msgs.slice(-200));

// 3) Around peak day 2025-08-11 (first 80, last 30)
const peak = msgs.filter(m => m.d === '2025-08-11');
write('peak-day-2025-08-11.json', { total: peak.length, sample: peak.slice(0, 80).concat(peak.slice(-30)) });

// 4) Monthly samples — first 20 + last 10 of each month
const months = {};
for (const m of msgs) {
  const k = m.d.slice(0, 7);
  (months[k] ||= []).push(m);
}
const monthlySample = {};
for (const k of Object.keys(months).sort()) {
  monthlySample[k] = {
    total: months[k].length,
    head: months[k].slice(0, 20),
    tail: months[k].slice(-10),
  };
}
write('monthly-samples.json', monthlySample);

// 5) Long messages — top 40 by char length, both senders
const longMsgs = [...msgs]
  .filter(m => m.c.length > 80)
  .sort((a, b) => b.c.length - a.c.length)
  .slice(0, 40);
write('longest-40.json', longMsgs);

// 6) "I love you" first occurrences and all milestones
const loveRe = /\bi\s*love\s*(u|you)\b/i;
const loveMsgs = msgs.filter(m => loveRe.test(m.c));
write('iloveyou-all.json', { total: loveMsgs.length, first30: loveMsgs.slice(0, 30), middle: loveMsgs.slice(Math.floor(loveMsgs.length / 2), Math.floor(loveMsgs.length / 2) + 20), last20: loveMsgs.slice(-20) });

// 7) Look for milestone words
const milestoneRe = /\b(monthsary|anniversary|first kiss|first date|tayo na|official|label|magkasama|i miss u|miss you|miss u)\b/i;
const milestones = msgs.filter(m => milestoneRe.test(m.c)).slice(0, 100);
write('milestones-100.json', milestones);

// 8) Conflict markers
const conflictRe = /\b(sorry|galit|nainis|naasar|naiinis|tampo|fight|away|nakakasakit|nakakainis|inis|nakakahurt|nakakaiyak|umiiyak|natatakot|takot|insecure|jealous|seloso|selos)\b/i;
const conflicts = msgs.filter(m => conflictRe.test(m.c));
write('conflict-markers.json', { total: conflicts.length, sample: conflicts.slice(0, 50).concat(conflicts.slice(Math.floor(conflicts.length / 2), Math.floor(conflicts.length / 2) + 50), conflicts.slice(-30)) });

// 9) Reassurance / vulnerability markers
const vulnRe = /\b(overthink|overthinking|i feel|im scared|natatakot ako|hindi ko alam|i dont know what|kabado|nakakakaba|i need|kailangan kita|kailangan ko|i want u|i want you)\b/i;
const vulns = msgs.filter(m => vulnRe.test(m.c)).slice(0, 80);
write('vulnerable-80.json', vulns);

// 10) Repeating phrases for inside-joke detection — find n-grams that occur 5+ times
const phraseCounts = new Map();
for (const m of msgs) {
  const text = m.c.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) continue;
  const words = text.split(' ').filter(w => w.length > 1);
  // 2-grams to 4-grams
  for (let n = 2; n <= 4; n++) {
    for (let j = 0; j + n <= words.length; j++) {
      const phrase = words.slice(j, j + n).join(' ');
      if (phrase.length < 4) continue;
      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
    }
  }
}
// Filter — only fairly distinctive (count 8+) and not too generic
const stopwords = new Set(['the', 'and', 'i', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'u', 'na', 'ko', 'mo', 'ka', 'ng', 'ang', 'sa', 'po', 'lang', 'naman', 'pa', 'nga', 'pero', 'kasi', 'dito', 'eh', 'oo', 'baby', 'babyy', 'baby ko', 'di', 'wala']);
const candidates = [...phraseCounts.entries()]
  .filter(([p, c]) => c >= 12 && !p.split(' ').every(w => stopwords.has(w)))
  .sort((a, b) => b[1] - a[1])
  .slice(0, 200);
write('phrase-candidates.json', candidates);

// 11) For each candidate phrase, find the first occurrence
write('phrase-first-occurrence.json', candidates.slice(0, 60).map(([p, c]) => {
  const first = msgs.find(m => m.c.toLowerCase().includes(p));
  return { phrase: p, count: c, first: first ? { d: first.d, s: first.s, c: first.c } : null };
}));

// 12) Per-platform message counts
const byPlat = {};
for (const m of msgs) {
  byPlat[m.p] = (byPlat[m.p] || 0) + 1;
}
write('by-platform.json', byPlat);

// 13) Day-by-day count timeline (for chapter detection)
const byDay = {};
for (const m of msgs) {
  byDay[m.d] = (byDay[m.d] || 0) + 1;
}
write('by-day.json', byDay);

console.log('done');
