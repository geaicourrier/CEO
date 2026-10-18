import { activeDeck } from './contentStore';
import type { GameCard } from './cards';
import type { GaugeState } from './constants';

export type { GameCard, CardImpacts, Department } from './cards';

const WILD_ROLL_CHANCE = 0.25;
const SWAN_ROLL_CHANCE = 0.5;

/** A run-scoped deck: standard cards are reusable, Wild Cards / Black Swans are consumed once. */
export interface DeckEngine {
  /** Returns the card for the given turn, consuming a Wild Card or Black Swan if drawn. */
  draw(year: number, quarter: 1 | 2 | 3 | 4): GameCard;
  remainingWildCards(): number;
  remainingBlackSwans(): number;
  /** Marks single-use cards as already drawn (run restore from a save). */
  restoreConsumed(ids: string[]): void;
  /** IDs of all single-use cards consumed so far (for persistence). */
  consumedIds(): string[];
}

/** Fixed founding sequence: the first turns of any new run, in strict chronological order. */
const GENESIS_SEQUENCE: { year: number; quarter: number; cardId: string }[] = [
  { year: 1, quarter: 1, cardId: '01B' },
  { year: 1, quarter: 2, cardId: '01A' },
  { year: 1, quarter: 3, cardId: '03A' },
];

export function createDeckEngine(): DeckEngine {
  const deck = activeDeck();
  const wildPool = deck.filter((c) => c.timing.isWildCard);
  const swanPool = deck.filter((c) => c.timing.isBlackSwan);
  const consumed = new Set<string>();

  const standardPool = deck.filter((c) => !c.timing.isWildCard && !c.timing.isBlackSwan);

  const standard = (year: number, quarter: number) => {
    const exact = standardPool.filter((c) => c.timing.year === year && c.timing.quarter === quarter);
    // Years beyond Y1 reuse the whole standard pool (cards have no Y2+ timings).
    return exact.length > 0 ? exact : standardPool;
  };

  const pickRandom = <T,>(items: T[]): T | null => {
    if (items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)];
  };

  const genesisCard = (year: number, quarter: number): GameCard | undefined => {
    const entry = GENESIS_SEQUENCE.find((g) => g.year === year && g.quarter === quarter);
    if (!entry) return undefined;
    return standardPool.find((c) => c.id === entry.cardId);
  };

  return {
    draw(year, quarter) {
      // Founding events are forced: no Wild Card roll, no random draw, deterministic order.
      const genesis = genesisCard(year, quarter);
      if (genesis) return genesis;

      // Crisis events require an established company: they only roll from Year 2 onward.
      if (year > 1 && quarter === 1 && wildPool.length > 0 && Math.random() < WILD_ROLL_CHANCE) {
        const picked = pickRandom(wildPool.splice(0, 1));
        if (picked) {
          consumed.add(picked.id);
          return picked;
        }
      }
      if (year > 1 && quarter === 4 && swanPool.length > 0 && Math.random() < SWAN_ROLL_CHANCE) {
        const picked = pickRandom(swanPool.splice(0, 1));
        if (picked) {
          consumed.add(picked.id);
          return picked;
        }
      }

      // Q2/Q3 always standard; Q1/Q4 fall back to standard when the roll fails or the pool is empty.
      return pickRandom(standard(year, quarter)) ?? standardPool[0];
    },

    remainingWildCards() {
      return wildPool.length;
    },

    remainingBlackSwans() {
      return swanPool.length;
    },

    restoreConsumed(ids) {
      for (const id of ids) {
        consumed.add(id);
        const wi = wildPool.findIndex((c) => c.id === id);
        if (wi !== -1) wildPool.splice(wi, 1);
        const si = swanPool.findIndex((c) => c.id === id);
        if (si !== -1) swanPool.splice(si, 1);
      }
    },

    consumedIds() {
      return [...consumed];
    },
  };
}

/** Converts a drawn GameCard's impacts into gauge deltas for the existing resolution pipeline. */
export function impactsToDeltas(impacts: GameCard['leftChoice']['impacts']): Partial<GaugeState> {
  return {
    ...(impacts.cash !== undefined ? { cash: impacts.cash } : {}),
    ...(impacts.traction !== undefined ? { traction: impacts.traction } : {}),
    ...(impacts.morale !== undefined ? { morale: impacts.morale } : {}),
    ...(impacts.board !== undefined ? { board: impacts.board } : {}),
  };
}
