export type Language = 'fr' | 'en';

export const LANGUAGES: Language[] = ['fr', 'en'];

export const LANG_LABELS: Record<Language, string> = {
  fr: 'FR',
  en: 'EN',
};

type Dict = Record<string, string>;

const fr: Dict = {
  // App / menu
  'app.title': 'C.E.O.',
  'app.subtitle': 'Corporate Emergency Odyssey',
  'app.tagline': 'Survivez à 20 trimestres de décisions impossibles. Quatre jauges, aucun filet.',
  'menu.continue': 'Continuer',
  'menu.new': 'Nouvelle Partie',
  'menu.rules': 'Règles / Pitch',
  'menu.options': 'Options de jeu',
  'menu.confirmNew.title': 'Recommencer ?',
  'menu.confirmNew.body': 'Une partie en cours existe. Voulez-vous recommencer à zéro ?',
  'menu.confirmNew.cancel': 'Annuler',
  'menu.confirmNew.confirm': 'Recommencer',
  'rules.title': 'Règles / Pitch',
  'rules.objective': 'Objectif',
  'rules.objectiveBody': 'survivre 20 trimestres (5 ans) et atteindre l\'IPO Triomphale.',
  'rules.gauges': 'Les 4 jauges',
  'rules.gaugesBody': '💰 Cash, ⭐ Traction, 👥 Morale, 👔 Board. Si une jauge atteint 0 ou 100, c\'est la fin.',
  'rules.controls': 'Contrôle clavier',
  'rules.controlsBody': '←/→ pour pencher la carte, Entrée pour valider. Sur mobile : glissez la carte ou touchez un choix.',
  'rules.pause': 'Pause',
  'rules.pauseBody': 'touchez la roue dentée ou appuyez sur P en jeu.',

  // Gauges
  'gauge.cash': 'Cash',
  'gauge.traction': 'Traction',
  'gauge.morale': 'Morale',
  'gauge.board': 'Board',

  // Save summary
  'save.summary': 'Sauvegarde : {phase} • {quarters} trimestre{plural} survécu{plural}',

  // Misc
  'common.close': 'Fermer',
};

const en: Dict = {
  'app.title': 'C.E.O.',
  'app.subtitle': 'Corporate Emergency Odyssey',
  'app.tagline': 'Survive 20 quarters of impossible decisions. Four gauges, no safety net.',
  'menu.continue': 'Continue',
  'menu.new': 'New Game',
  'menu.rules': 'Rules / Pitch',
  'menu.options': 'Game options',
  'menu.confirmNew.title': 'Restart?',
  'menu.confirmNew.body': 'A game is already in progress. Do you want to start over?',
  'menu.confirmNew.cancel': 'Cancel',
  'menu.confirmNew.confirm': 'Restart',
  'rules.title': 'Rules / Pitch',
  'rules.objective': 'Goal',
  'rules.objectiveBody': 'survive 20 quarters (5 years) and reach the Triumphant IPO.',
  'rules.gauges': 'The 4 gauges',
  'rules.gaugesBody': '💰 Cash, ⭐ Traction, 👥 Morale, 👔 Board. If any gauge hits 0 or 100, it\'s over.',
  'rules.controls': 'Keyboard controls',
  'rules.controlsBody': '←/→ to tilt the card, Enter to confirm. On mobile: swipe the card or tap a choice.',
  'rules.pause': 'Pause',
  'rules.pauseBody': 'tap the gear icon or press P in game.',

  'gauge.cash': 'Cash',
  'gauge.traction': 'Traction',
  'gauge.morale': 'Morale',
  'gauge.board': 'Board',

  'save.summary': 'Save: {phase} • {quarters} quarter{plural} survived',

  'common.close': 'Close',
};

export const TRANSLATIONS: Record<Language, Dict> = { fr, en };

const STORAGE_KEY = 'ceo_language';

export function loadStoredLanguage(): Language {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'fr' || v === 'en') return v;
  } catch {
    // ignore
  }
  return 'fr';
}

export function storeLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}
