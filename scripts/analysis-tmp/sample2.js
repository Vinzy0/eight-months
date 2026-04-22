// Second-pass sampler — targeted searches for inside-joke material,
// pet names, recurring references, and key emotional moments.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'data', 'parsed', 'messages.json');
const OUT = path.join(__dirname, 'out');

const all = JSON.parse(fs.readFileSync(SRC, 'utf8'));
console.log('loaded', all.length);

const msgs = all.map((m, i) => ({
  i, d: m.timestamp.slice(0, 10), t: m.timestamp,
  s: m.sender, p: m.platform, c: (m.content || '').slice(0, 400),
  type: m.type,
}));

function write(name, obj) {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 2));
  console.log('wrote', name);
}

function findFirstAndCount(re) {
  let count = 0;
  let first = null;
  const samples = [];
  for (const m of msgs) {
    if (re.test(m.c)) {
      count++;
      if (!first) first = m;
      if (samples.length < 6) samples.push(m);
    }
  }
  return { count, first, samples };
}

// Hunt for distinctive recurring tokens (potential inside jokes / pet names)
const targets = {
  mahal: /\bmahal\b/i,
  baby_ko: /\bbaby ko\b/i,
  babyy_pluss: /\bbabyy+\b/i,
  princessss: /\bprincess+\b/i,
  vincent_ian_pedres: /\bvincent ian pedres\b/i,
  princess_genrose: /\bprincess genrose\b/i,
  mallow: /\bmallow/i,
  strawberry: /\bstrwbrry|strawberry/i,
  sweet_boy: /\bsweet boy\b/i,
  meta_ai_song: /\b@meta ai\b/i,
  bbg: /\bbbg\b/i,
  bb: /\bbb\b/i,
  bub: /\bbub\b/i,
  honey: /\bhoney\b/i,
  mwa: /\bmwa\b/i,
  iLabU: /\bi lab u\b/i,
  forehead_kiss: /forehead kiss/i,
  ngiyaw: /ngiyaw/i,
  meow: /meow/i,
  pusa: /pusa/i,
  cat: /\bcat\b/i,
  dog: /\bdog\b/i,
  podcast: /podcast/i,
  marriage: /\bmarriage|marry|wife|husband|asawa\b/i,
  kasal: /\bkasal\b/i,
  family: /\bfamily|pamilya\b/i,
  kids: /\b(kids|anak|baby plans)\b/i,
  jealous: /\bjealous|nagseselos|nagselos|seloso|seloso\b/i,
  insecure: /\binsecure|insecurities\b/i,
  overthink: /\boverthink/i,
  abandonment: /abandonment/i,
  avoidant: /avoidant/i,
  anxious: /anxious|anxiety/i,
  trust: /\btrust\b/i,
  promise: /\bpromise\b/i,
  forever: /\bforever\b/i,
  always: /\balways\b/i,
  pictures: /\bpictures? na pic\b/i,
  selfie: /\bselfie\b/i,
  pic_mo: /pic mo|picture mo/i,
  hug: /\bhug\b|yakap/i,
  cuddle: /\bcuddle\b/i,
  kiss: /\bkiss\b|halik/i,
  miss_u: /\bmiss u\b|\bmiss you\b/i,
  hate_u: /\bhate u\b|\bhate you\b/i,
  brb: /\bbrb\b/i,
  call_natin: /\bcall natin\b|tara call/i,
  tara_laro: /\btara laro\b|laro tayo/i,
  valorant: /\bvalorant|valo\b/i,
  minecraft: /\bminecraft\b/i,
  league: /\bleague\b/i,
  osu: /\bosu\b/i,
  pet_pet: /\bpet pet\b/i,
  ate_eat: /eat na|kain ka/i,
  drive_safe: /drive safe/i,
  ingat: /\bingat\b/i,
  good_morning: /good morning|gm po|magandang umaga/i,
  goodnight: /goodnight|gnight|gn po/i,
  pasalubong: /pasalubong/i,
  utang: /\butang\b/i,
  tata_tito: /\bhi po tito|hi po tita/i,
  antonio: /antonio/i,
  tagaytay: /tagaytay/i,
  rrl: /\brrl\b|review of related/i,
  thesis: /thesis/i,
  exam: /\bexam\b/i,
  defense: /defense/i,
  prof: /\bprof\b/i,
  badmood: /badmood|bad mood|bad day|bad mood/i,
  okay_lang: /okay lang/i,
  cocky: /cocky/i,
  sus: /\bsus\b/i,
  pogi: /\bpogi\b/i,
  ganda: /\bganda\b|maganda ka/i,
  cute_mo: /cute mo|cute naman|ang cute/i,
  super_simp: /simp/i,
  loser: /\bloser\b/i,
  diva: /\bdiva\b/i,
  babyy_appears: /babyy/i,
  itago_mo_bestfriend: /itago mo bestfriend/i,
  bestfriend: /\bbestfriend\b|best friend/i,
  partner: /\bpartner\b/i,
  future: /\bfuture\b/i,
  wife: /\bwife\b/i,
  hubby: /hubby|hubs/i,
  kotse: /kotse|car ko|car mo/i,
  pizza: /pizza/i,
  jollibee: /jollibee/i,
  chicken: /chicken/i,
  ramen: /ramen/i,
  cafe: /\bcafe\b/i,
  date_night: /date night|date day/i,
  monthsary: /monthsary/i,
  anniv: /anniv|anniversary/i,
  bday: /\bbday|birthday\b/i,
  podcast2: /podcast/i,
  oks_oki: /\boki\b/i,
  ofcoz: /ofcoz|ofcourse/i,
};

const out = {};
for (const [name, re] of Object.entries(targets)) {
  out[name] = findFirstAndCount(re);
}
write('targeted-search.json', out);

// Also look at conversations on key dates
const keyDates = ['2025-08-09', '2025-08-10', '2025-08-11', '2025-08-30', '2025-09-02', '2025-10-12', '2025-12-26', '2026-02-04', '2026-02-14', '2026-03-30'];
const keyDateSamples = {};
for (const d of keyDates) {
  const dayMsgs = msgs.filter(m => m.d === d);
  keyDateSamples[d] = {
    total: dayMsgs.length,
    sample: dayMsgs.slice(0, 60),
  };
}
write('key-date-samples.json', keyDateSamples);

// Find the Sep 2 longest message in full
const sep2Long = all.find(m => m.timestamp.startsWith('2025-09-01') && (m.content || '').length > 1500);
if (sep2Long) write('sep2-longest.json', sep2Long);

console.log('done');
