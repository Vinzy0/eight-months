import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// ─── Types ───────────────────────────────────────────────────────────────────

type Sender = 'vince' | 'princess';
type Platform = 'discord' | 'instagram' | 'whatsapp' | 'messenger';
type MsgType = 'text' | 'media' | 'sticker' | 'call' | 'reaction' | 'other';

interface Message {
  id: string;
  platform: Platform;
  sender: Sender;
  timestamp: string; // ISO string
  content: string;
  type: MsgType;
  replyTo?: string;
}

// ─── Sender Mapping ──────────────────────────────────────────────────────────

const VINCE_NAMES = new Set([
  'vinzy0',
  'vince',
  'vince pedres',
  'iehehei',
]);

const PRINCESS_NAMES = new Set([
  'yuyuxi',
  'presa_prinsesa 🍓',
  'presa_prinsesa \u00f0\u009f\u008d\u0093', // mojibake variant
  'princess genrose',
  'strawbaby',
]);

// Discord bot names to skip
const DISCORD_BOTS = new Set([
  'wordle', 'echo chess daily', 'solitaire home story',
  'rythm', '8 ball pool', 'whiteboard', 'magic garden', '2v2.io',
]);

function mapSender(name: string): Sender | null {
  const lower = name.toLowerCase().trim();
  if (VINCE_NAMES.has(lower)) return 'vince';
  if (PRINCESS_NAMES.has(lower)) return 'princess';
  // Check partial matches for mojibake Instagram names
  if (lower.includes('presa_prinsesa') || lower.includes('presa prinsesa')) return 'princess';
  if (lower.includes('princess')) return 'princess';
  if (lower.includes('vinzy') || lower.includes('vince')) return 'vince';
  return null;
}

// ─── ID Generator ────────────────────────────────────────────────────────────

let idCounter = 0;
function genId(platform: string): string {
  return `${platform}-${++idCounter}`;
}

// ─── Discord Parser ──────────────────────────────────────────────────────────

function parseDiscord(filePath: string): Message[] {
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const messages: Message[] = [];

  for (const msg of data.messages) {
    const authorName = msg.author?.name?.toLowerCase() || '';

    // Skip bots
    if (msg.author?.isBot || DISCORD_BOTS.has(authorName)) continue;

    // Skip system messages
    if (msg.type === 'ChannelPinnedMessage' || msg.type === 'RecipientAdd' ||
        msg.type === 'RecipientRemove' || msg.type === 'Call') {
      // But keep calls as call type
      if (msg.type === 'Call') {
        const sender = mapSender(msg.author?.name || '');
        if (sender) {
          messages.push({
            id: msg.id || genId('discord'),
            platform: 'discord',
            sender,
            timestamp: new Date(msg.timestamp).toISOString(),
            content: '[call]',
            type: 'call',
          });
        }
      }
      continue;
    }

    const sender = mapSender(msg.author?.name || '');
    if (!sender) continue;

    // Determine type
    let type: MsgType = 'text';
    let content = msg.content || '';

    if (msg.stickers && msg.stickers.length > 0) {
      type = 'sticker';
      content = content || `[sticker: ${msg.stickers[0].name || 'unknown'}]`;
    } else if (msg.attachments && msg.attachments.length > 0) {
      type = 'media';
      content = content || '[media]';
    } else if (!content && msg.embeds && msg.embeds.length > 0) {
      type = 'other';
      content = '[embed]';
    }

    // Skip empty messages
    if (!content.trim()) continue;

    // Handle reactions as separate messages? No — skip reactions, they're metadata
    // But check for reaction-type messages
    if (msg.type === 'Default' || msg.type === 'Reply' || msg.type === 'InlineReply') {
      messages.push({
        id: msg.id || genId('discord'),
        platform: 'discord',
        sender,
        timestamp: new Date(msg.timestamp).toISOString(),
        content: content.trim(),
        type,
        ...(msg.reference?.messageId ? { replyTo: msg.reference.messageId } : {}),
      });
    }
  }

  return messages;
}

// ─── Instagram Parser ────────────────────────────────────────────────────────

function decodeInstagramText(text: string): string {
  // Instagram exports use mojibake (UTF-8 bytes stored as Latin-1)
  try {
    const bytes = new Uint8Array(text.split('').map(c => c.charCodeAt(0)));
    const decoded = new TextDecoder('utf-8').decode(bytes);
    return decoded;
  } catch {
    return text;
  }
}

function parseInstagram(filePath: string, label: string): Message[] {
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const messages: Message[] = [];

  for (const msg of data.messages) {
    const rawSender = decodeInstagramText(msg.sender_name || '');
    const sender = mapSender(rawSender);
    if (!sender) continue;

    const timestamp = new Date(msg.timestamp_ms).toISOString();
    let content = '';
    let type: MsgType = 'text';

    if (msg.content) {
      content = decodeInstagramText(msg.content);
    }

    // Check for reactions-only messages
    if (content.startsWith('Reacted ') && content.includes(' to your message')) {
      type = 'reaction';
    }
    // Check for "sent an attachment" / shared links
    else if (msg.share) {
      type = 'media';
      if (!content || content.includes('sent an attachment')) {
        content = msg.share.share_text
          ? decodeInstagramText(msg.share.share_text)
          : '[shared link]';
      }
    }
    // Check for media (photos, videos, audio)
    else if (msg.photos || msg.videos || msg.audio_files) {
      type = 'media';
      content = content || '[media]';
    }
    // Skip messages with no content at all
    else if (!content) {
      // Likely unsent or media-only with no text
      type = 'media';
      content = '[media]';
    }

    // Skip system messages
    if (content.includes('liked a message') ||
        content.includes('named the group') ||
        content.includes('created the group') ||
        content.includes('joined the group') ||
        content.includes('left the group')) {
      continue;
    }

    messages.push({
      id: genId(`ig-${label}`),
      platform: 'instagram',
      sender,
      timestamp,
      content: content.trim(),
      type,
    });
  }

  return messages;
}

// ─── Messenger Parser ────────────────────────────────────────────────────────

function parseMessenger(filePath: string): Message[] {
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const messages: Message[] = [];

  for (const msg of data.messages) {
    const sender = mapSender(msg.senderName || '');
    if (!sender) continue;

    const timestamp = new Date(msg.timestamp).toISOString();
    let content = msg.text || '';
    let type: MsgType = msg.type === 'media' ? 'media' : 'text';

    if (msg.type === 'sticker') type = 'sticker';

    // Skip unsent messages
    if (msg.isUnsent) continue;

    // Handle media with no text
    if (!content && msg.media && msg.media.length > 0) {
      type = 'media';
      content = '[media]';
    }

    if (!content.trim()) continue;

    messages.push({
      id: genId('messenger'),
      platform: 'messenger',
      sender,
      timestamp,
      content: content.trim(),
      type,
    });
  }

  return messages;
}

// ─── WhatsApp Parser ─────────────────────────────────────────────────────────

function parseWhatsApp(filePath: string): Message[] {
  const raw = readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  const messages: Message[] = [];

  // WhatsApp format: DD/MM/YYYY, H:MM am/pm - Sender: Message
  // Also handles multiline messages (continuation lines don't start with date pattern)
  const linePattern = /^(\d{1,2}\/\d{1,2}\/\d{4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.+?):\s(.*)$/i;

  // System message pattern (no sender)
  const systemPattern = /^(\d{1,2}\/\d{1,2}\/\d{4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.+)$/i;

  let currentMsg: { date: string; time: string; sender: string; content: string } | null = null;

  function flushCurrent() {
    if (!currentMsg) return;

    const sender = mapSender(currentMsg.sender);
    if (!sender) return;

    let content = currentMsg.content.trim();
    let type: MsgType = 'text';

    // Skip system messages
    if (content === '<Media omitted>') {
      type = 'media';
      content = '[media]';
    } else if (content === 'This message was deleted' ||
               content === 'You deleted this message') {
      return;
    } else if (content.includes('missed voice call') ||
               content.includes('missed video call') ||
               content === '' || content === 'null') {
      if (content.includes('call')) {
        type = 'call';
        content = '[call]';
      } else {
        return;
      }
    }

    if (!content.trim()) return;

    // Parse date: DD/MM/YYYY
    const [dayStr, monthStr, yearStr] = currentMsg.date.split('/');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);

    // Parse time: H:MM am/pm
    const timeMatch = currentMsg.time.match(/(\d{1,2}):(\d{2})\s(am|pm)/i);
    if (!timeMatch) return;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3].toLowerCase();

    if (ampm === 'pm' && hours !== 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;

    const timestamp = new Date(year, month, day, hours, minutes).toISOString();

    messages.push({
      id: genId('whatsapp'),
      platform: 'whatsapp',
      sender,
      timestamp,
      content,
      type,
    });
  }

  for (const line of lines) {
    const match = line.match(linePattern);
    if (match) {
      flushCurrent();
      currentMsg = {
        date: match[1],
        time: match[2],
        sender: match[3],
        content: match[4],
      };
    } else if (currentMsg) {
      // Check if it's a system line (no sender)
      const sysMatch = line.match(systemPattern);
      if (sysMatch && !sysMatch[3].includes(':')) {
        flushCurrent();
        currentMsg = null;
      } else {
        // Continuation of previous message
        currentMsg.content += '\n' + line;
      }
    }
  }
  flushCurrent();

  return messages;
}

// ─── Deduplication ───────────────────────────────────────────────────────────

function dedup(messages: Message[]): Message[] {
  // Sort by timestamp first
  messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const seen = new Set<string>();
  const result: Message[] = [];

  for (const msg of messages) {
    // Create a dedup key: same sender, similar timestamp (within 2 min), similar content
    const ts = Math.floor(new Date(msg.timestamp).getTime() / 120000); // 2-min bucket
    const contentKey = msg.content.toLowerCase().replace(/\s+/g, '').slice(0, 50);
    const key = `${msg.sender}|${ts}|${contentKey}`;

    if (seen.has(key)) continue;
    seen.add(key);
    result.push(msg);
  }

  return result;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const rawDir = join(__dirname, '..', 'data', 'raw');
  const parsedDir = join(__dirname, '..', 'data', 'parsed');

  mkdirSync(parsedDir, { recursive: true });

  console.log('═══ PHASE 1 — PARSE & NORMALIZE ═══\n');

  // Parse each platform
  const platformMessages: Record<string, Message[]> = {};

  console.log('Parsing Discord...');
  platformMessages['discord'] = parseDiscord(join(rawDir, 'discord.json'));

  console.log('Parsing Instagram (Presa account)...');
  platformMessages['ig-presa'] = parseInstagram(join(rawDir, 'ig-princess1.json'), 'presa');

  console.log('Parsing Instagram (Princess Genrose account)...');
  platformMessages['ig-genrose'] = parseInstagram(join(rawDir, 'ig-princess2.json'), 'genrose');

  console.log('Parsing Instagram GC...');
  platformMessages['ig-gc'] = parseInstagram(join(rawDir, 'ig-gc.json'), 'gc');

  console.log('Parsing Messenger (part 101)...');
  const messenger101 = parseMessenger(join(rawDir, 'messenger-101.json'));

  console.log('Parsing Messenger (part 99)...');
  const messenger99 = parseMessenger(join(rawDir, 'messenger-99.json'));
  platformMessages['messenger'] = [...messenger101, ...messenger99];

  console.log('Parsing WhatsApp...');
  platformMessages['whatsapp'] = parseWhatsApp(join(rawDir, 'whatsapp.txt'));

  // Log per-platform counts
  console.log('\n─── Messages Parsed Per Platform ───');
  const platformCounts: Record<string, number> = {};
  for (const [platform, msgs] of Object.entries(platformMessages)) {
    console.log(`  ${platform}: ${msgs.length} messages`);
    platformCounts[platform] = msgs.length;

    // Check for 0 messages
    if (msgs.length === 0) {
      throw new Error(`❌ FATAL: ${platform} returned 0 messages. Check the parser and raw file.`);
    }
  }

  // Merge all
  let allMessages = Object.values(platformMessages).flat();
  const totalBeforeDedup = allMessages.length;
  console.log(`\n  Total before dedup: ${totalBeforeDedup}`);

  // Deduplicate
  allMessages = dedup(allMessages);
  const totalAfterDedup = allMessages.length;
  console.log(`  Total after dedup: ${totalAfterDedup}`);
  console.log(`  Removed ${totalBeforeDedup - totalAfterDedup} duplicates`);

  // Date range
  const firstMsg = allMessages[0];
  const lastMsg = allMessages[allMessages.length - 1];
  console.log(`\n─── Date Range ───`);
  console.log(`  First: ${new Date(firstMsg.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
  console.log(`  Last:  ${new Date(lastMsg.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);

  // Sender breakdown
  const vinceMsgs = allMessages.filter(m => m.sender === 'vince');
  const princessMsgs = allMessages.filter(m => m.sender === 'princess');
  console.log(`\n─── Sender Breakdown ───`);
  console.log(`  Vince:    ${vinceMsgs.length} messages (${(vinceMsgs.length / allMessages.length * 100).toFixed(1)}%)`);
  console.log(`  Princess: ${princessMsgs.length} messages (${(princessMsgs.length / allMessages.length * 100).toFixed(1)}%)`);

  // Check minimum 100 per sender
  if (vinceMsgs.length < 100) {
    throw new Error(`❌ FATAL: Only ${vinceMsgs.length} messages mapped to Vince. Check sender mappings.`);
  }
  if (princessMsgs.length < 100) {
    throw new Error(`❌ FATAL: Only ${princessMsgs.length} messages mapped to Princess. Check sender mappings.`);
  }

  // Type breakdown
  const typeCounts: Record<string, number> = {};
  for (const msg of allMessages) {
    typeCounts[msg.type] = (typeCounts[msg.type] || 0) + 1;
  }
  console.log(`\n─── Message Types ───`);
  for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type}: ${count}`);
  }

  // Check for unrecognized senders (scan raw files)
  console.log(`\n─── Unrecognized Sender Check ───`);
  checkUnrecognizedSenders(rawDir);

  // Save
  const outputPath = join(parsedDir, 'messages.json');
  writeFileSync(outputPath, JSON.stringify(allMessages, null, 2), 'utf-8');
  console.log(`\n✅ Saved ${allMessages.length} messages to ${outputPath}`);
}

function checkUnrecognizedSenders(rawDir: string) {
  const unrecognized = new Map<string, number>();

  // Discord
  const discord = JSON.parse(readFileSync(join(rawDir, 'discord.json'), 'utf-8'));
  for (const msg of discord.messages) {
    const name = msg.author?.name || '';
    if (!msg.author?.isBot && !DISCORD_BOTS.has(name.toLowerCase()) && !mapSender(name)) {
      unrecognized.set(`[Discord] ${name}`, (unrecognized.get(`[Discord] ${name}`) || 0) + 1);
    }
  }

  // Instagram files
  for (const file of ['ig-princess1.json', 'ig-princess2.json', 'ig-gc.json']) {
    const data = JSON.parse(readFileSync(join(rawDir, file), 'utf-8'));
    for (const msg of data.messages) {
      const rawName = msg.sender_name || '';
      const decoded = decodeInstagramText(rawName);
      if (!mapSender(decoded)) {
        unrecognized.set(`[IG] ${decoded}`, (unrecognized.get(`[IG] ${decoded}`) || 0) + 1);
      }
    }
  }

  // Messenger
  for (const file of ['messenger-101.json', 'messenger-99.json']) {
    const data = JSON.parse(readFileSync(join(rawDir, file), 'utf-8'));
    for (const msg of data.messages) {
      if (!mapSender(msg.senderName || '')) {
        unrecognized.set(`[Messenger] ${msg.senderName}`, (unrecognized.get(`[Messenger] ${msg.senderName}`) || 0) + 1);
      }
    }
  }

  // WhatsApp
  const waLines = readFileSync(join(rawDir, 'whatsapp.txt'), 'utf-8').split('\n');
  const linePattern = /^(\d{1,2}\/\d{1,2}\/\d{4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.+?):\s/i;
  const waSenders = new Map<string, number>();
  for (const line of waLines) {
    const match = line.match(linePattern);
    if (match) {
      const sender = match[3];
      if (!mapSender(sender)) {
        waSenders.set(sender, (waSenders.get(sender) || 0) + 1);
      }
    }
  }
  for (const [sender, count] of waSenders) {
    unrecognized.set(`[WhatsApp] ${sender}`, count);
  }

  if (unrecognized.size === 0) {
    console.log('  ✅ No unrecognized senders found!');
  } else {
    console.log('  ⚠️ Unrecognized senders:');
    for (const [name, count] of [...unrecognized.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${name}: ${count} messages`);
    }
  }
}

main();
