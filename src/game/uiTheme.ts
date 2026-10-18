import { APP_VERSION } from './constants';

const THEME_KEY = 'admin_ui_theme';

/** All tunable UI knobs, applied as CSS variables on #app-shell. */
export interface UiTheme {
  chassis: {
    appMaxWidth: number; // px, 360–500
    fontScale: number; // 0.85–1.2
  };
  topTier: {
    gaugeHeight: number; // px, 4–14
    gaugeIconSize: number; // px, 16–28
    gaugeGap: number; // px, 4–16
  };
  middleTier: {
    cardContextSize: number; // px, 12–18
    buttonPy: number; // px, 8–20
    impactBadgeSize: number; // px, 14–24
    cardRadius: number; // px, 8–28
  };
  bottomTier: {
    comicHeight: number; // px, 32–110 (chart takes the rest)
  };
}

export const DEFAULT_UI_THEME: UiTheme = {
  chassis: { appMaxWidth: 430, fontScale: 1 },
  topTier: { gaugeHeight: 8, gaugeIconSize: 22, gaugeGap: 8 },
  middleTier: { cardContextSize: 15, buttonPy: 12, impactBadgeSize: 19, cardRadius: 12 },
  bottomTier: { comicHeight: 72 },
};

export const THEME_RANGES = {
  appMaxWidth: { min: 360, max: 500, step: 2 },
  fontScale: { min: 0.85, max: 1.2, step: 0.01 },
  gaugeHeight: { min: 4, max: 14, step: 1 },
  gaugeIconSize: { min: 16, max: 28, step: 1 },
  gaugeGap: { min: 4, max: 16, step: 1 },
  cardContextSize: { min: 12, max: 18, step: 1 },
  buttonPy: { min: 8, max: 20, step: 1 },
  impactBadgeSize: { min: 14, max: 24, step: 1 },
  cardRadius: { min: 8, max: 28, step: 1 },
  comicHeight: { min: 32, max: 110, step: 2 },
} as const;

type DeepPartial<T> = { [K in keyof T]?: Partial<T[K]> };

function clamp(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** Validates and clamps a partial theme (from storage or JSON import) onto defaults. */
export function normalizeUiTheme(raw: unknown): UiTheme {
  const p = (typeof raw === 'object' && raw !== null ? raw : {}) as DeepPartial<UiTheme>;
  const r = THEME_RANGES;
  const d = DEFAULT_UI_THEME;
  return {
    chassis: {
      appMaxWidth: clamp(p.chassis?.appMaxWidth, r.appMaxWidth.min, r.appMaxWidth.max, d.chassis.appMaxWidth),
      fontScale: clamp(p.chassis?.fontScale, r.fontScale.min, r.fontScale.max, d.chassis.fontScale),
    },
    topTier: {
      gaugeHeight: clamp(p.topTier?.gaugeHeight, r.gaugeHeight.min, r.gaugeHeight.max, d.topTier.gaugeHeight),
      gaugeIconSize: clamp(p.topTier?.gaugeIconSize, r.gaugeIconSize.min, r.gaugeIconSize.max, d.topTier.gaugeIconSize),
      gaugeGap: clamp(p.topTier?.gaugeGap, r.gaugeGap.min, r.gaugeGap.max, d.topTier.gaugeGap),
    },
    middleTier: {
      cardContextSize: clamp(p.middleTier?.cardContextSize, r.cardContextSize.min, r.cardContextSize.max, d.middleTier.cardContextSize),
      buttonPy: clamp(p.middleTier?.buttonPy, r.buttonPy.min, r.buttonPy.max, d.middleTier.buttonPy),
      impactBadgeSize: clamp(p.middleTier?.impactBadgeSize, r.impactBadgeSize.min, r.impactBadgeSize.max, d.middleTier.impactBadgeSize),
      cardRadius: clamp(p.middleTier?.cardRadius, r.cardRadius.min, r.cardRadius.max, d.middleTier.cardRadius),
    },
    bottomTier: {
      comicHeight: clamp(p.bottomTier?.comicHeight, r.comicHeight.min, r.comicHeight.max, d.bottomTier.comicHeight),
    },
  };
}

export function loadUiTheme(): UiTheme {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (!raw) return { ...DEFAULT_UI_THEME };
    return normalizeUiTheme(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_UI_THEME };
  }
}

export function saveUiTheme(theme: UiTheme): void {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    // Storage unavailable — session-only styling.
  }
}

export function clearUiTheme(): void {
  try {
    localStorage.removeItem(THEME_KEY);
  } catch {
    // Nothing to clear.
  }
}

type ThemeListener = (theme: UiTheme) => void;
const listeners = new Set<ThemeListener>();

/** Broadcasts a theme update to App (#app-shell) and any live inspector. */
export function publishUiTheme(theme: UiTheme): void {
  for (const l of listeners) l(theme);
}

export function subscribeUiTheme(listener: ThemeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Flattens the theme into the CSS custom properties consumed by components. */
export function themeToCssVars(theme: UiTheme): Record<string, string> {
  return {
    '--app-max-width': `${theme.chassis.appMaxWidth}px`,
    '--font-scale': String(theme.chassis.fontScale),
    '--gauge-height': `${theme.topTier.gaugeHeight}px`,
    '--gauge-icon-size': `${theme.topTier.gaugeIconSize}px`,
    '--gauge-gap': `${theme.topTier.gaugeGap}px`,
    '--card-context-size': `${theme.middleTier.cardContextSize}px`,
    '--button-py': `${theme.middleTier.buttonPy}px`,
    '--impact-badge-size': `${theme.middleTier.impactBadgeSize}px`,
    '--card-radius': `${theme.middleTier.cardRadius}px`,
    '--comic-height': `${theme.bottomTier.comicHeight}px`,
  };
}

/** Compact one-line CSS block for the "Copier CSS" button. */
export function themeToCssSnippet(theme: UiTheme): string {
  const vars = themeToCssVars(theme);
  return `#app-shell {\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}\n/* generated by C.E.O. Admin Studio v${APP_VERSION} */`;
}
