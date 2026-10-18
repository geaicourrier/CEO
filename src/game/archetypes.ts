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
    tagline: "Le code d'abord, le reste ensuite.",
    stats: { cash: -4, traction: 10, morale: 5, board: 0 },
    passiveLabel: 'Debt Shield',
    passiveDescription: 'Les crises de dette technique touchent le Moral 20% moins fort.',
  },
  hustler: {
    id: 'hustler',
    name: 'Le Hustler',
    domain: 'Ventes & Business Dev',
    icon: 'handshake',
    tagline: 'Pas de contrat, pas de café.',
    stats: { cash: 5, traction: 12, morale: -5, board: 0 },
    passiveLabel: 'Aggressive Pipeline',
    passiveDescription: '+25% Traction sur les choix commerciaux.',
  },
  insider: {
    id: 'insider',
    name: "L'Insider",
    domain: 'Finance & VC',
    icon: 'network',
    tagline: 'La rentabilité est une illusion, la valorisation est reine.',
    stats: { cash: 10, traction: 0, morale: -5, board: 8 },
    passiveLabel: 'VC Alignment',
    passiveDescription: 'Les pénalités de Board sont réduites de 20%.',
  },
  bootstrapper: {
    id: 'bootstrapper',
    name: 'Le Bootstrapper',
    domain: 'Rentabilité & Frugalité',
    icon: 'lifebuoy',
    tagline: 'Zéro dette, zéro investisseur, zéro compromis.',
    stats: { cash: 8, traction: -5, morale: 5, board: -5 },
    passiveLabel: 'Lean Discipline',
    passiveDescription: 'Les coûts imprévus sont diminués de 25%.',
  },
  community: {
    id: 'community',
    name: 'Le Community Leader',
    domain: 'Marque & Viralité',
    icon: 'users',
    tagline: "Les utilisateurs ne sont pas des clients, c'est une armée.",
    stats: { cash: -5, traction: 8, morale: 10, board: -5 },
    passiveLabel: 'Cult Following',
    passiveDescription: 'Le Moral ne peut descendre sous 15 pts en Année 1.',
  },
  heir: {
    id: 'heir',
    name: "L'Héritier",
    domain: 'Capital & Réseau',
    icon: 'crown',
    tagline: "L'échec n'est qu'un problème de liquidités.",
    stats: { cash: 15, traction: -5, morale: -10, board: 8 },
    passiveLabel: 'Golden Parachute',
    passiveDescription: '1 fois par run, si Cash ou Board tombe à 0, remontée immédiate à 20 pts.',
  },
  deeptech: {
    id: 'deeptech',
    name: 'Le Chercheur DeepTech',
    domain: 'Science & Brevets',
    icon: 'flask',
    tagline: 'Validé par les pairs, incompris par les marchés.',
    stats: { cash: 4, traction: -10, morale: 10, board: 2 },
    passiveLabel: 'Patent Fortress',
    passiveDescription: 'Immunité aux litiges PI et audits techniques.',
  },
  veteran: {
    id: 'veteran',
    name: 'Le Vétéran',
    domain: 'Gouvernance & Grands Comptes',
    icon: 'landmark',
    tagline: 'Pas de révolution sans formulaire en triple exemplaire.',
    stats: { cash: 4, traction: 0, morale: -8, board: 12 },
    passiveLabel: 'Corporate Shield',
    passiveDescription: 'Contrôles fiscaux et audits sans impact sur le Board.',
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
