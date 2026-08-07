/** Strip bot follow-up line and return display text + chip labels. */
export function parseBotReply(raw: string): { body: string; followups: string[] } {
  const match = raw.match(/\nFOLLOWUPS:\s*(.+)$/i);
  if (!match) {
    return { body: raw.trim(), followups: [] };
  }

  const body = raw.slice(0, match.index).trim();
  const followups = match[1]
    .split(";;")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  return { body, followups };
}
