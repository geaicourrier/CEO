import type { GaugeState } from './constants';
import type { ArchetypeId } from './archetypes';

const SAVE_KEY = 'ceo_odyssey_save_v1';

export interface GamePerk {
  icon: string;
  label: string;
  description: string;
}

export interface SaveData {
  year: number;
  quarter: number;
  gauges: GaugeState;
  perks: GamePerk[];
  /** Snapshots of the current year's quarters (Q1..Q4) for the trend chart. */
  yearHistory: GaugeState[];
  quartersSurvived: number;
  /** IDs of consumed single-use cards (Wild Cards + Black Swans). */
  consumedCardIds: string[];
  /** Chosen founder archetype (drives stat block + passive perks). */
  archetypeId?: ArchetypeId;
  /** Marks the Community Leader's one-per-game morale bounce as spent. */
  moraleBounceUsed?: boolean;
  /** One-shot passive counters (e.g. Heir's doom-save). */
  passivesUsed?: Record<string, boolean>;
}

export function saveRun(data: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable (private mode, quota) — game continues unsaved.
  }
}

export function loadRun(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveData;
    if (
      typeof parsed.year !== 'number' ||
      typeof parsed.quarter !== 'number' ||
      typeof parsed.gauges?.cash !== 'number' ||
      !Array.isArray(parsed.consumedCardIds)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearRun(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // Nothing to do — no save to clear.
  }
}
