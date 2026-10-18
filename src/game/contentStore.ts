import { APP_VERSION } from './constants';
import type { GameContent } from './content';
import { DEFAULT_CONTENT, foundationToGameCard, opsToGameCard } from './content';
import type { GameCard } from './cards';
import { WILD_CARDS, BLACK_SWANS } from './cards';
import type { CardComicStrip } from './comic';
import { normalizeComicStrip, DEFAULT_MASTER_STYLE } from './comic';
import type { Archetype } from './archetypes';
import type { StrategyOption, GaugeId } from './constants';

const STORAGE_KEY = 'game_content_override';

/** Reads the admin-edited content overrides (null = factory defaults). */
export function loadContentOverride(): GameContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameContent;
    if (!Array.isArray(parsed.foundationCards) || !Array.isArray(parsed.opsCards)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveContentOverride(content: GameContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // Storage unavailable — session-only edits.
  }
}

export function clearContentOverride(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}

export function getActiveContent(): GameContent {
  return loadContentOverride() ?? DEFAULT_CONTENT;
}

const GAUGE_ORDER: GaugeId[] = ['cash', 'traction', 'morale', 'board'];

/** Keeps only non-zero impacts and enforces the canonical gauge order. */
function sanitizeImpacts(raw: Record<string, unknown>): Partial<Record<GaugeId, number>> {
  const out: Partial<Record<GaugeId, number>> = {};
  for (const g of GAUGE_ORDER) {
    const v = raw?.[g];
    if (typeof v === 'number' && v !== 0) out[g] = Math.max(-50, Math.min(50, Math.round(v)));
  }
  return out;
}

/** Validates and normalizes imported content; throws on structural mismatch. */
export function normalizeContent(raw: unknown): GameContent {
  if (typeof raw !== 'object' || raw === null) throw new Error('JSON invalide');
  const obj = raw as Partial<GameContent>;
  if (!Array.isArray(obj.foundationCards) || !Array.isArray(obj.opsCards) || !Array.isArray(obj.founders) || !Array.isArray(obj.perks)) {
    throw new Error('Structure JSON incomplète (founders, foundationCards, opsCards, perks requis)');
  }
  const fixChoice = (c: unknown) => {
    const ch = c as { label?: unknown; impacts?: unknown };
    return {
      label: typeof ch.label === 'string' ? ch.label : 'Choix',
      impacts: sanitizeImpacts((ch.impacts ?? {}) as Record<string, unknown>),
    };
  };
  const fixComic = (raw: unknown, card: { department: GameContent['foundationCards'][number]['department']; role: string; text: string; leftChoice: { label: string }; rightChoice: { label: string } }): CardComicStrip =>
    normalizeComicStrip(raw, card as never);
  return {
    version: typeof obj.version === 'string' ? obj.version : APP_VERSION,
    masterStyleReference: typeof obj.masterStyleReference === 'string' && obj.masterStyleReference.trim()
      ? obj.masterStyleReference
      : DEFAULT_MASTER_STYLE,
    founders: obj.founders.map((f) => {
      const p = f as Partial<GameContent['founders'][number]>;
      return {
        id: String(p.id ?? 'founder'),
        name: String(p.name ?? 'Fondateur'),
        domain: String(p.domain ?? ''),
        icon: String(p.icon ?? 'users'),
        tagline: String(p.tagline ?? ''),
        stats: sanitizeImpacts((p.stats ?? {}) as Record<string, unknown>),
        passiveLabel: String(p.passiveLabel ?? ''),
        passiveDescription: String(p.passiveDescription ?? ''),
      };
    }),
    foundationCards: obj.foundationCards.map((c) => {
      const fc = c as Partial<GameContent['foundationCards'][number]>;
      const question = Math.min(4, Math.max(1, Number(fc.question) || 1)) as 1 | 2 | 3 | 4;
      const variant = fc.variant === 'B' ? 'B' as const : 'A' as const;
      return {
        id: `${String(question).padStart(2, '0')}${variant}`,
        question,
        variant,
        department: (['Tech', 'HR', 'Sales', 'Finance', 'Legal', 'Conjoncture'] as const).includes(fc.department as never)
          ? fc.department!
          : 'Tech',
        role: String(fc.role ?? ''),
        text: String(fc.text ?? ''),
        leftChoice: fixChoice(fc.leftChoice),
        rightChoice: fixChoice(fc.rightChoice),
        comicStrip: fixComic(fc.comicStrip, {
          department: (['Tech', 'HR', 'Sales', 'Finance', 'Legal', 'Conjoncture'] as const).includes(fc.department as never)
            ? fc.department!
            : 'Tech',
          role: String(fc.role ?? ''),
          text: String(fc.text ?? ''),
          leftChoice: fixChoice(fc.leftChoice),
          rightChoice: fixChoice(fc.rightChoice),
        }),
      };
    }),
    opsCards: obj.opsCards.map((c) => {
      const oc = c as Partial<GameContent['opsCards'][number]>;
      const year = Math.min(5, Math.max(1, Number(oc.year) || 1)) as 1 | 2 | 3 | 4 | 5;
      const quarter = Math.min(4, Math.max(1, Number(oc.quarter) || 1)) as 1 | 2 | 3 | 4;
      const variant = oc.variant === 'B' ? 'B' as const : 'A' as const;
      return {
        id: `${year}${quarter}${variant}`,
        year,
        quarter,
        variant,
        department: (['Tech', 'HR', 'Sales', 'Finance', 'Legal', 'Conjoncture'] as const).includes(oc.department as never)
          ? oc.department!
          : 'Tech',
        role: String(oc.role ?? ''),
        text: String(oc.text ?? ''),
        leftChoice: fixChoice(oc.leftChoice),
        rightChoice: fixChoice(oc.rightChoice),
        comicStrip: fixComic(oc.comicStrip, {
          department: (['Tech', 'HR', 'Sales', 'Finance', 'Legal', 'Conjoncture'] as const).includes(oc.department as never)
            ? oc.department!
            : 'Tech',
          role: String(oc.role ?? ''),
          text: String(oc.text ?? ''),
          leftChoice: fixChoice(oc.leftChoice),
          rightChoice: fixChoice(oc.rightChoice),
        }),
      };
    }),
    perks: obj.perks.map((p) => {
      const pk = p as Partial<GameContent['perks'][number]>;
      const year = Math.min(5, Math.max(1, Number(pk.year) || 1)) as 1 | 2 | 3 | 4 | 5;
      const slot = Math.min(3, Math.max(1, Number(pk.slot) || 1)) as 1 | 2 | 3;
      const kind = (['permanent-perk', 'temp-boost', 'trade-off'] as const).includes(pk.kind as never)
        ? pk.kind!
        : 'trade-off' as const;
      return {
        id: `y${year}-slot${slot}`,
        year,
        slot,
        kind,
        title: String(pk.title ?? 'Stratégie'),
        description: String(pk.description ?? ''),
        impacts: sanitizeImpacts((pk.impacts ?? {}) as Record<string, unknown>),
        icon: pk.icon ? String(pk.icon) : undefined,
        passiveLabel: pk.passiveLabel ? String(pk.passiveLabel) : undefined,
        passiveDescription: pk.passiveDescription ? String(pk.passiveDescription) : undefined,
      };
    }),
  };
}

/** Builds the JSON file the Export button downloads. */
export function buildExportPayload(content: GameContent): string {
  return JSON.stringify({ ...content, version: APP_VERSION }, null, 2);
}

/* ------------------------- Runtime accessors (live game) ------------------------- */

export function activeFounders(): Archetype[] {
  const content = getActiveContent();
  return content.founders.map((f) => ({
    id: f.id as Archetype['id'],
    name: f.name,
    domain: f.domain,
    icon: f.icon,
    tagline: f.tagline,
    stats: f.stats,
    passiveLabel: f.passiveLabel,
    passiveDescription: f.passiveDescription,
  }));
}

/** Deck for the runtime engine: foundation (Y1) + ops cards + untouched crisis pools. */
export function activeDeck(): GameCard[] {
  const content = getActiveContent();
  const foundation = content.foundationCards.map(foundationToGameCard);
  const ops = content.opsCards.map(opsToGameCard);
  return [...foundation, ...ops, ...WILD_CARDS, ...BLACK_SWANS];
}

export function activeStrategies(): StrategyOption[][] {
  const content = getActiveContent();
  const byYear: StrategyOption[][] = [[], [], [], [], []];
  for (const p of content.perks) {
    const list = byYear[p.year - 1];
    if (!list) continue;
    list.push({
      id: p.id,
      title: p.title,
      description: p.description,
      kind: p.kind,
      deltas: p.impacts,
      perk: p.passiveLabel
        ? { icon: p.icon ?? 'sparkles', label: p.passiveLabel, description: p.passiveDescription ?? '' }
        : undefined,
    });
  }
  return byYear;
}
