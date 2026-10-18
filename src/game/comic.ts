import type { GameCard } from './cards';

export interface ComicFrame {
  prompt: string;
  imageUrl?: string;
}

export interface CardComicStrip {
  common: {
    frame1: ComicFrame; // Setup / Exposition
    frame2: ComicFrame; // Tension / The Dilemma
  };
  branchLeft: {
    frame3: ComicFrame; // Left choice action
    frame4: ComicFrame; // Left choice outcome / satirical punchline
  };
  branchRight: {
    frame3: ComicFrame; // Right choice action
    frame4: ComicFrame; // Right choice outcome / satirical punchline
  };
}

/** Generates the default fallback 6-frame prompts for a card from its own content. */
export function defaultComicStrip(card: Pick<GameCard, 'department' | 'role' | 'text' | 'leftChoice' | 'rightChoice'>): CardComicStrip {
  const setup = `${card.department} — ${card.role} intervient.`;
  return {
    common: {
      frame1: {
        prompt: `Case 1 (Exposition) : ${setup} Plan large de l'open space, ton neutre avant la crise.`,
      },
      frame2: {
        prompt: `Case 2 (Tension) : Le dilemme se cristallise. « ${card.text} » Gros plan sur les visages tendus.`,
      },
    },
    branchLeft: {
      frame3: {
        prompt: `Case 3L (Action gauche) : Le fondateur tranche — « ${card.leftChoice.label} ». Geste sec, regard caméra.`,
      },
      frame4: {
        prompt: `Case 4L (Chute gauche) : Conséquence satirique du choix « ${card.leftChoice.label} ». Punchline visuelle en plan moyen.`,
      },
    },
    branchRight: {
      frame3: {
        prompt: `Case 3R (Action droite) : Le fondateur tranche — « ${card.rightChoice.label} ». Geste opposé, posture confiante.`,
      },
      frame4: {
        prompt: `Case 4R (Chute droite) : Conséquence satirique du choix « ${card.rightChoice.label} ». Punchline visuelle en plan moyen.`,
      },
    },
  };
}

/** Ensures a parsed/imported strip is complete; backfills any missing frame with defaults. */
export function normalizeComicStrip(raw: unknown, card: Pick<GameCard, 'department' | 'role' | 'text' | 'leftChoice' | 'rightChoice'>): CardComicStrip {
  const fallback = defaultComicStrip(card);
  if (typeof raw !== 'object' || raw === null) return fallback;
  const s = raw as Partial<CardComicStrip>;
  const fixFrame = (f: unknown, def: ComicFrame): ComicFrame => {
    const fr = (typeof f === 'object' && f !== null ? f : {}) as Partial<ComicFrame>;
    return {
      prompt: typeof fr.prompt === 'string' && fr.prompt.trim() ? fr.prompt : def.prompt,
      ...(typeof fr.imageUrl === 'string' && fr.imageUrl.trim() ? { imageUrl: fr.imageUrl } : {}),
    };
  };
  return {
    common: {
      frame1: fixFrame(s.common?.frame1, fallback.common.frame1),
      frame2: fixFrame(s.common?.frame2, fallback.common.frame2),
    },
    branchLeft: {
      frame3: fixFrame(s.branchLeft?.frame3, fallback.branchLeft.frame3),
      frame4: fixFrame(s.branchLeft?.frame4, fallback.branchLeft.frame4),
    },
    branchRight: {
      frame3: fixFrame(s.branchRight?.frame3, fallback.branchRight.frame3),
      frame4: fixFrame(s.branchRight?.frame4, fallback.branchRight.frame4),
    },
  };
}

export const DEFAULT_MASTER_STYLE = 'Minimalist corporate editorial cartoon, bold vector line art (2px uniform stroke), flat 2D perspective, zero gradients, zero shadows. Monochrome dark slate line art (#0F172A) on light canvas (#F8FAFC) with electric blue (#2563EB) corporate accent. Minimalist expressive character silhouette, square 1:1 frame.';

/** Final generation prompt: [masterStyleReference] + ' ' + [frame.prompt]. */
export function buildFullPrompt(masterStyle: string, framePrompt: string): string {
  return `${masterStyle} ${framePrompt}`;
}
