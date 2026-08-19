import { buildSearchIndex, type CommandItem } from "./command-data";

/**
 * Normalizes query string and ranks matching items from command index.
 */
export function searchCommandItems(query: string): CommandItem[] {
  const allItems = buildSearchIndex();
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return allItems;
  }

  type ScoredItem = { item: CommandItem; score: number };
  const scored: ScoredItem[] = [];

  for (const item of allItems) {
    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    let score = 0;

    if (titleLower === trimmed) {
      score = 100;
    } else if (titleLower.startsWith(trimmed)) {
      score = 80;
    } else if (item.labId && item.labId.toLowerCase().includes(trimmed)) {
      score = 75;
    } else if (titleLower.includes(trimmed)) {
      score = 50;
    } else if (subtitleLower.includes(trimmed)) {
      score = 40;
    } else if (item.keywords.some((k) => k.includes(trimmed))) {
      score = 30;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.item);
}
