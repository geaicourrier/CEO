import { useState } from 'react';
import { Copy, Eye, RotateCcw } from 'lucide-react';
import type { UiTheme } from '@/game/uiTheme';
import { DEFAULT_UI_THEME, THEME_RANGES, themeToCssSnippet } from '@/game/uiTheme';

interface DesignTabProps {
  theme: UiTheme;
  onChange: (next: UiTheme) => void;
  onEnterLiveMode: () => void;
  /** Whether the studio modal is currently collapsed into the floating bar. */
  liveActive: boolean;
  masterStyle: string;
  onMasterStyleChange: (next: string) => void;
}

type SliderKey = keyof typeof THEME_RANGES;

const SECTIONS: {
  title: string;
  keys: { key: SliderKey; label: string; unit: string }[];
}[] = [
  {
    title: 'Châssis Global',
    keys: [
      { key: 'appMaxWidth', label: 'Largeur max', unit: 'px' },
      { key: 'fontScale', label: 'Échelle police', unit: '×' },
    ],
  },
  {
    title: 'Top Tier — Jauges & Profil',
    keys: [
      { key: 'gaugeHeight', label: 'Épaisseur jauge', unit: 'px' },
      { key: 'gaugeIconSize', label: 'Taille icônes', unit: 'px' },
      { key: 'gaugeGap', label: 'Espacement', unit: 'px' },
    ],
  },
  {
    title: 'Middle Tier — Carte & Choix',
    keys: [
      { key: 'cardContextSize', label: 'Texte contexte', unit: 'px' },
      { key: 'buttonPy', label: 'Padding boutons', unit: 'px' },
      { key: 'impactBadgeSize', label: 'Badges impact', unit: 'px' },
      { key: 'cardRadius', label: 'Arrondi carte', unit: 'px' },
    ],
  },
  {
    title: 'Bottom Tier — Comic & Trajectoire',
    keys: [{ key: 'comicHeight', label: 'Hauteur vignettes', unit: 'px' }],
  },
];

function DesignTab({ theme, onChange, onEnterLiveMode, liveActive, masterStyle, onMasterStyleChange }: DesignTabProps) {
  const [copied, setCopied] = useState(false);

  const setKey = (key: SliderKey, value: number) => {
    const r = THEME_RANGES[key];
    const v = Math.min(r.max, Math.max(r.min, value));
    onChange({
      chassis: {
        appMaxWidth: key === 'appMaxWidth' ? v : theme.chassis.appMaxWidth,
        fontScale: key === 'fontScale' ? v : theme.chassis.fontScale,
      },
      topTier: {
        gaugeHeight: key === 'gaugeHeight' ? v : theme.topTier.gaugeHeight,
        gaugeIconSize: key === 'gaugeIconSize' ? v : theme.topTier.gaugeIconSize,
        gaugeGap: key === 'gaugeGap' ? v : theme.topTier.gaugeGap,
      },
      middleTier: {
        cardContextSize: key === 'cardContextSize' ? v : theme.middleTier.cardContextSize,
        buttonPy: key === 'buttonPy' ? v : theme.middleTier.buttonPy,
        impactBadgeSize: key === 'impactBadgeSize' ? v : theme.middleTier.impactBadgeSize,
        cardRadius: key === 'cardRadius' ? v : theme.middleTier.cardRadius,
      },
      bottomTier: {
        comicHeight: key === 'comicHeight' ? v : theme.bottomTier.comicHeight,
      },
    });
  };

  const current = (key: SliderKey): number => {
    switch (key) {
      case 'appMaxWidth': return theme.chassis.appMaxWidth;
      case 'fontScale': return theme.chassis.fontScale;
      case 'gaugeHeight': return theme.topTier.gaugeHeight;
      case 'gaugeIconSize': return theme.topTier.gaugeIconSize;
      case 'gaugeGap': return theme.topTier.gaugeGap;
      case 'cardContextSize': return theme.middleTier.cardContextSize;
      case 'buttonPy': return theme.middleTier.buttonPy;
      case 'impactBadgeSize': return theme.middleTier.impactBadgeSize;
      case 'cardRadius': return theme.middleTier.cardRadius;
      case 'comicHeight': return theme.bottomTier.comicHeight;
    }
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(themeToCssSnippet(theme));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (non-secure context) — no-op.
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <button
        type="button"
        onClick={onEnterLiveMode}
        className="flex shrink-0 items-center justify-center gap-2 rounded border border-slate-400/60 bg-corporate-edge px-3 py-2 font-ui text-xs font-semibold text-slate-100 hover:bg-slate-700/40"
      >
        <Eye className="h-4 w-4" />
        Ajuster en direct{liveActive ? ' (actif)' : ''}
      </button>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
        <div className="rounded border border-corporate-line bg-corporate-edge/40 px-3 py-2">
          <p className="mb-1 font-press text-[10px] uppercase tracking-widest text-slate-400">Style de référence maître</p>
          <textarea
            rows={3}
            value={masterStyle}
            onChange={(e) => onMasterStyleChange(e.target.value)}
            className="max-h-24 w-full resize-none overflow-hidden rounded border border-corporate-line bg-corporate-abyss px-2 py-1.5 font-ui text-[10px] leading-snug text-slate-200 outline-none focus:border-slate-400"
            placeholder="Prompt de style global concaténé à chaque prompt de case..."
          />
          <p className="mt-1 font-ui text-[9px] italic leading-snug text-slate-600">
            Concaténé à chaque prompt de case : [Style maître] + [Prompt].
          </p>
        </div>
        {SECTIONS.map((section) => (
          <div key={section.title} className="rounded border border-corporate-line bg-corporate-edge/40 px-3 py-2">
            <p className="mb-1.5 font-press text-[10px] uppercase tracking-widest text-slate-400">{section.title}</p>
            <div className="space-y-2">
              {section.keys.map(({ key, label, unit }) => {
                const r = THEME_RANGES[key];
                const value = current(key);
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-28 shrink-0 font-ui text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
                    <input
                      type="range"
                      min={r.min}
                      max={r.max}
                      step={r.step}
                      value={value}
                      onChange={(e) => setKey(key, Number(e.target.value))}
                      className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded bg-corporate-line accent-slate-300"
                      aria-label={`${label} (${value}${unit})`}
                    />
                    <span className="w-12 shrink-0 text-right font-ui text-[10px] tabular-nums text-slate-200">
                      {unit === '×' ? value.toFixed(2) : Math.round(value)}{unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex shrink-0 gap-1.5">
        <button
          type="button"
          onClick={copyCss}
          className="flex flex-1 items-center justify-center gap-1.5 rounded border border-corporate-line bg-corporate-panel px-2.5 py-1.5 font-ui text-[11px] text-slate-300 hover:border-slate-400"
        >
          <Copy className="h-3.5 w-3.5" /> Copier CSS
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_UI_THEME })}
          className="flex flex-1 items-center justify-center gap-1.5 rounded border border-red-500/40 bg-red-500/10 px-2.5 py-1.5 font-ui text-[11px] text-red-300 hover:bg-red-500/20"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Origine
        </button>
      </div>
    </div>
  );
}

export default DesignTab;
