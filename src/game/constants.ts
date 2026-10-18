import { DollarSign, TrendingUp, Users, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const APP_VERSION = '1.3.0';

export type GaugeId = 'cash' | 'traction' | 'morale' | 'board';

export interface GaugeDef {
  id: GaugeId;
  emoji: string;
  label: string;
  Icon: LucideIcon;
  text: string;
  bar: string;
}

export const GAUGES: GaugeDef[] = [
  {
    id: 'cash',
    emoji: '💰',
    label: 'Cash',
    Icon: DollarSign,
    text: 'text-gauge-cash',
    bar: 'bg-gauge-cash',
  },
  {
    id: 'traction',
    emoji: '📈',
    label: 'Traction',
    Icon: TrendingUp,
    text: 'text-gauge-traction',
    bar: 'bg-gauge-traction',
  },
  {
    id: 'morale',
    emoji: '👥',
    label: 'Morale',
    Icon: Users,
    text: 'text-gauge-morale',
    bar: 'bg-gauge-morale',
  },
  {
    id: 'board',
    emoji: '👔',
    label: 'Board',
    Icon: Briefcase,
    text: 'text-gauge-board',
    bar: 'bg-gauge-board',
  },
];

export type GaugeState = Record<GaugeId, number>;

export const INITIAL_GAUGES: GaugeState = { cash: 50, traction: 50, morale: 50, board: 50 };

export function applyDeltas(state: GaugeState, deltas: Partial<GaugeState>): GaugeState {
  const next = { ...state };
  for (const [id, delta] of Object.entries(deltas) as [GaugeId, number][]) {
    next[id] = Math.min(100, Math.max(0, next[id] + delta));
  }
  return next;
}

export type Tilt = 'left' | 'right' | null;

/* ---------------------------------- Timeline ---------------------------------- */

export const TOTAL_YEARS = 5;
export const QUARTERS_PER_YEAR = 4;

/** Average-gauge threshold to survive each year's review. */
export const YEAR_THRESHOLDS = [45, 50, 55, 60, 65];

export type Phase =
  | { kind: 'quarter' }
  | { kind: 'annualReview' }
  | { kind: 'gameOver'; ending: GameOverId }
  | { kind: 'victory' };

export function phaseLabel(year: number, quarter: number): string {
  const stage = year <= 1 ? 'Seed' : year === 2 ? 'Series A' : year === 3 ? 'Series B' : year === 4 ? 'Série C' : 'Pre-IPO';
  return `Y${year} • Q${quarter} — ${stage}`;
}

/* --------------------------------- Game overs --------------------------------- */

export type GameOverId =
  | 'banqueroute'
  | 'opa'
  | 'ghostSaaS'
  | 'crashBuzz'
  | 'demission'
  | 'utopie'
  | 'eviction'
  | 'pantin'
  | 'evictionDoree';

export interface GameOverDef {
  id: GameOverId;
  emoji: string;
  title: string;
  epilogue: string;
  tone: 'red' | 'amber' | 'blue';
}

export const GAME_OVERS: Record<GameOverId, GameOverDef> = {
  banqueroute: {
    id: 'banqueroute',
    emoji: '💰',
    title: 'Banqueroute sèche',
    epilogue: "Le compte est à zéro. Le huissier est déjà là, et il n'accepte pas les capitaux propres comme pourboire.",
    tone: 'red',
  },
  opa: {
    id: 'opa',
    emoji: '💰',
    title: 'Rachat hostile / OPA',
    epilogue: "Trop de cash attire les requins. Votre boîte vient d'être absorbée pendant votre pause déjeuner.",
    tone: 'red',
  },
  ghostSaaS: {
    id: 'ghostSaaS',
    emoji: '⭐',
    title: 'Le Ghost SaaS',
    epilogue: "Plus personne ne se souvient de votre produit. Même Google ne vous trouve plus. Vous êtes un fantôme B2B.",
    tone: 'red',
  },
  crashBuzz: {
    id: 'crashBuzz',
    emoji: '⭐',
    title: 'Crash sous le buzz',
    epilogue: "Le hype a dépassé la réalité d'un trimestre. TechCrunch vient d'écrire votre nécrologie en 800 mots.",
    tone: 'red',
  },
  demission: {
    id: 'demission',
    emoji: '👥',
    title: 'Démission générale',
    epilogue: "Toute l'équipe est partie chez le concurrent. Il vous reste un bureau vide et un badge d'accès inutile.",
    tone: 'red',
  },
  utopie: {
    id: 'utopie',
    emoji: '👥',
    title: "L'Utopie autogérée",
    epilogue: "L'équipe a voté votre éviction à l'unanimité. Le bonheur total n'a plus besoin de CEO.",
    tone: 'amber',
  },
  eviction: {
    id: 'eviction',
    emoji: '👔',
    title: 'Éviction sans préavis',
    epilogue: "Le conseil d'administration a voté pendant votre sieste. Votre badge ne fonctionne plus.",
    tone: 'red',
  },
  pantin: {
    id: 'pantin',
    emoji: '👔',
    title: 'Pantin institutionnel',
    epilogue: "Le board vous a transformé en marionnette. Chaque décision vient désormais d'en haut, sans vous.",
    tone: 'amber',
  },
  evictionDoree: {
    id: 'evictionDoree',
    emoji: '👔',
    title: 'Éviction dorée',
    epilogue: "Le board vous remercie poliment et engage un CEO aguerri. Vous recevez un chèque confortable et un conseil : « La prochaine fois, apprenez à dire non. »",
    tone: 'amber',
  },
};

/** Returns the sudden-death ending triggered by gauge extremes, if any. */
const LOW_ENDINGS: Record<GaugeId, GameOverId> = {
  cash: 'banqueroute',
  traction: 'ghostSaaS',
  morale: 'demission',
  board: 'eviction',
};

const HIGH_ENDINGS: Record<GaugeId, GameOverId> = {
  cash: 'opa',
  traction: 'crashBuzz',
  morale: 'utopie',
  board: 'pantin',
};

export function suddenDeathEnding(gauges: GaugeState): GameOverId | null {
  for (const [id, value] of Object.entries(gauges) as [GaugeId, number][]) {
    if (value <= 0) return LOW_ENDINGS[id];
    if (value >= 100) return HIGH_ENDINGS[id];
  }
  return null;
}

/** Returns the gauge that hit a fatal extreme, if any. */
export function fatalGauge(gauges: GaugeState): GaugeId | null {
  for (const [id, value] of Object.entries(gauges) as [GaugeId, number][]) {
    if (value <= 0 || value >= 100) return id;
  }
  return null;
}

const GAUGE_LABELS: Record<GaugeId, string> = {
  cash: 'Cash',
  traction: 'Traction',
  morale: 'Moral',
  board: 'Board',
};

/** Human-readable cause of death, e.g. "Faillite : Cash tombé à 0%". */
export function failureCause(ending: GameOverId, gauges: GaugeState): string {
  const label = (id: GaugeId) => GAUGE_LABELS[id];
  const at = (id: GaugeId) => `${label(id)} à ${Math.round(gauges[id])}%`;
  switch (ending) {
    case 'banqueroute': return `Faillite : ${at('cash')}`;
    case 'opa': return `Rachat hostile : ${at('cash')}`;
    case 'ghostSaaS': return `Ghost SaaS : ${at('traction')}`;
    case 'crashBuzz': return `Crash sous le buzz : ${at('traction')}`;
    case 'demission': return `Insurrection : ${at('morale')}`;
    case 'utopie': return `Utopie autogérée : ${at('morale')}`;
    case 'eviction': return `Éviction : ${at('board')}`;
    case 'pantin': return `Pantin institutionnel : ${at('board')}`;
    case 'evictionDoree': return `Revue annuelle : moyenne sous le seuil`;
  }
}

export function gaugeAverage(gauges: GaugeState): number {
  return (gauges.cash + gauges.traction + gauges.morale + gauges.board) / GAUGES.length;
}

/* ----------------------------- Strategy options ------------------------------ */

export interface StrategyOption {
  id: string;
  title: string;
  description: string;
  kind: 'permanent-perk' | 'temp-boost' | 'trade-off';
  /** Applied immediately at validation. */
  deltas: Partial<GaugeState>;
  /** Perk granted by a `permanent-perk` option (shown as a badge). */
  perk?: { icon: string; label: string; description: string };
}

export const STRATEGY_POOL: StrategyOption[][] = [
  // Y1 → Y2 arbitrage
  [
    {
      id: 'y2-perk-covenant',
      title: 'Covenant Premium',
      description: "Perk permanent : les chutes de Board sont deux fois moins violentes.",
      kind: 'permanent-perk',
      deltas: { board: 5 },
      perk: { icon: 'shield', label: 'Covenant', description: 'Les chutes de Board sont divisées par deux.' },
    },
    {
      id: 'y2-boost-hype',
      title: 'Hype Engine',
      description: "Boost 2 trimestres : +8 Traction et +5 Cash immédiats, mais −10 Morale à la fin.",
      kind: 'temp-boost',
      deltas: { traction: 8, cash: 5 },
    },
    {
      id: 'y2-trade-liberte',
      title: ' Pacte de Liberté',
      description: "Trade-off : +15 Morale durable, mais −10 Cash et le board vous surveille (−5 Board).",
      kind: 'trade-off',
      deltas: { morale: 15, cash: -10, board: -5 },
    },
  ],
  // Y2 → Y3
  [
    {
      id: 'y3-perk-runway',
      title: 'Runway+',
      description: "Perk permanent : la trésorerie plancher est relevée de 5 points.",
      kind: 'permanent-perk',
      deltas: { cash: 5 },
      perk: { icon: 'piggy', label: 'Runway+', description: 'Trésorerie plancher relevée de 5 points.' },
    },
    {
      id: 'y3-boost-sprint',
      title: 'Sprint Mode',
      description: "Boost 2 trimestres : +10 Traction, −8 Morale immédiat.",
      kind: 'temp-boost',
      deltas: { traction: 10, morale: -8 },
    },
    {
      id: 'y3-trade-pr',
      title: 'Coup de Com',
      description: "Trade-off : +12 Traction immédiat, mais −8 Board (ils détestent le buzz).",
      kind: 'trade-off',
      deltas: { traction: 12, board: -8 },
    },
  ],
  // Y3 → Y4
  [
    {
      id: 'y4-perk-growth',
      title: 'Growth Hack',
      description: "Perk permanent : les gains de Traction sont amplifiés de 25%.",
      kind: 'permanent-perk',
      deltas: { traction: 5 },
      perk: { icon: 'trend', label: 'Growth Hack', description: 'Gains de Traction amplifiés de 25%.' },
    },
    {
      id: 'y4-boost-cash',
      title: 'Levée Éclair',
      description: "Boost 2 trimestres : +15 Cash, −6 Morale immédiat.",
      kind: 'temp-boost',
      deltas: { cash: 15, morale: -6 },
    },
    {
      id: 'y4-trade-cafe',
      title: 'Café Gratuit',
      description: "Trade-off : +10 Morale immédiat, mais −6 Cash.",
      kind: 'trade-off',
      deltas: { morale: 10, cash: -6 },
    },
  ],
  // Y4 → Y5
  [
    {
      id: 'y5-perk-prix',
      title: 'Prix Startup',
      description: "Perk permanent : prestige médiatique, bonus annuel au Board.",
      kind: 'permanent-perk',
      deltas: { board: 8 },
      perk: { icon: 'award', label: 'Prix Startup', description: 'Bonus annuel de prestige au Board.' },
    },
    {
      id: 'y5-boost-board',
      title: 'Board honeymoon',
      description: "Boost 2 trimestres : +12 Board, −5 Cash immédiat.",
      kind: 'temp-boost',
      deltas: { board: 12, cash: -5 },
    },
    {
      id: 'y5-trade-lobby',
      title: 'Lobbying discret',
      description: "Trade-off : +10 Board et +5 Traction, mais −12 Cash.",
      kind: 'trade-off',
      deltas: { board: 10, traction: 5, cash: -12 },
    },
  ],
];

