import type { GaugeState } from './constants';
import { activeFounders } from './contentStore';

export type ArchetypeId =
  | 'hacker'
  | 'hustler'
  | 'insider'
  | 'bootstrapper'
  | 'community'
  | 'heir'
  | 'deeptech'
  | 'veteran';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  domain: string;
  icon: string;
  tagline: string;
  /** Stat adjustments applied to the starting gauges. */
  stats: Partial<GaugeState>;
  passiveLabel: string;
  passiveDescription: string;
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  hacker: {
    id: 'hacker',
    name: 'Le Hacker',
    domain: 'Tech & R&D',
    icon: 'cpu',
    tagline: 'Code first, apologize never.',
    stats: { cash: -5, traction: 10, morale: 0, board: -15 },
    passiveLabel: 'Tech Momentum',
    passiveDescription: '+15% Traction sur les choix tech, −10% Moral sur les réunions Board.',
  },
  hustler: {
    id: 'hustler',
    name: 'Le Hustler',
    domain: 'Ventes & Business Dev',
    icon: 'handshake',
    tagline: "Coffee's for closers.",
    stats: { cash: 10, traction: 5, morale: -10, board: 0 },
    passiveLabel: 'Deal Closer',
    passiveDescription: "+15% Cash sur les levées et ventes, risque accru de clash d'équipe.",
  },
  insider: {
    id: 'insider',
    name: "L'Insider",
    domain: 'Finance & VC',
    icon: 'network',
    tagline: "It's not what you know, it's who you know.",
    stats: { cash: -10, traction: -5, morale: -5, board: 20 },
    passiveLabel: 'Board Immunity',
    passiveDescription: 'Immunité temporaire aux pénalités de Board, mais coût Cash élevé.',
  },
  bootstrapper: {
    id: 'bootstrapper',
    name: 'Le Bootstrapper',
    domain: 'Rentabilité & Frugalité',
    icon: 'lifebuoy',
    tagline: 'Profits over hype.',
    stats: { cash: 15, traction: -15, morale: 5, board: -20 },
    passiveLabel: 'Lean Burn',
    passiveDescription: 'Consommation de Cash réduite de 25%, croissance Traction plus lente.',
  },
  community: {
    id: 'community',
    name: 'Le Community Leader',
    domain: 'Marque & Viralité',
    icon: 'users',
    tagline: 'Build in public, die in public.',
    stats: { cash: -15, traction: 15, morale: 15, board: -15 },
    passiveLabel: 'Cult Following',
    passiveDescription: '+20% Moral, mais forte volatilité de Traction sur les bad buzz.',
  },
  heir: {
    id: 'heir',
    name: "L'Héritier",
    domain: 'Capital & Réseau',
    icon: 'crown',
    tagline: "Failure is an option when daddy pays.",
    stats: { cash: 25, traction: -20, morale: -15, board: 10 },
    passiveLabel: 'Trust Fund',
    passiveDescription: 'Réserve de Cash bonus d\'urgence, malus permanent de Moral de l\'équipe (−10%).',
  },
  deeptech: {
    id: 'deeptech',
    name: 'Le Chercheur DeepTech',
    domain: 'Science & Brevets',
    icon: 'flask',
    tagline: 'Peer-reviewed, market-ignored.',
    stats: { cash: -10, traction: -10, morale: 5, board: 0 },
    passiveLabel: 'Patent Moat',
    passiveDescription: 'Barrière à l\'entrée technologique (+25% Traction Y3+), déconnexion marché Y1 (−15% Cash).',
  },
  veteran: {
    id: 'veteran',
    name: 'Le Vétéran',
    domain: 'Gouvernance & Grands Comptes',
    icon: 'landmark',
    tagline: 'Been there, failed that.',
    stats: { cash: 0, traction: 0, morale: 0, board: 0 },
    passiveLabel: 'Seasoned Operator',
    passiveDescription: 'Anticipe les crises de trésorerie, résistance accrue aux chutes de Board.',
  },
};

/** Applies an archetype's stat block to the baseline gauges (clamped by the caller). */
export function applyArchetypeStats(base: GaugeState, archetype: Archetype): GaugeState {
  const next = { ...base };
  for (const [id, delta] of Object.entries(archetype.stats) as [keyof GaugeState, number][]) {
    next[id] = Math.min(100, Math.max(0, next[id] + delta));
  }
  return next;
}

/** Picks exactly 3 distinct archetypes at random from the active founder profiles. */
export function rollArchetypeChoices(): Archetype[] {
  const pool = activeFounders();
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(3, pool.length));
}
