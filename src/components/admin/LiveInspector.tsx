import { Copy, RotateCcw, Settings2, X } from 'lucide-react';
import type { UiTheme } from '@/game/uiTheme';
import { DEFAULT_UI_THEME, THEME_RANGES, themeToCssSnippet } from '@/game/uiTheme';

interface LiveInspectorProps {
  theme: UiTheme;
  onChange: (next: UiTheme) => void;
  onBackToStudio: () => void;
  onClose: () => void;
}

type SliderKey = keyof typeof THEME_RANGES;

const SLIDERS: { key: SliderKey; label: string; unit: string }[] = [
  { key: 'appMaxWidth', label: 'Châssis', unit: 'px' },
  { key: 'fontScale', label: 'Police', unit: '×' },
  { key: 'gaugeHeight', label: 'Jauge', unit: 'px' },
  { key: 'gaugeIconSize', label: 'Icônes', unit: 'px' },
  { key: 'gaugeGap', label: 'Écart', unit: 'px' },
  { key: 'cardContextSize', label: 'Texte', unit: 'px' },
  { key: 'buttonPy', label: 'Boutons', unit: 'px' },
  { key: 'impactBadgeSize', label: 'Badges', unit: 'px' },
  { key: 'cardRadius', label: 'Arrondi', unit: 'px' },
  { key: 'comicHeight', label: 'Comic', unit: 'px' },
];

function LiveInspector({ theme, onChange, onBackToStudio, onClose }: LiveInspectorProps) {
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

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(themeToCssSnippet(theme));
    } catch {
      // Clipboard unavailable — no-op.
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-50 border-t border-slate-400/50 bg-corporate-panel/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_24px_rgba(0,0,0,0.5)] backdrop-blur">
      <p className="mb-1 text-center font-press text-[9px] uppercase tracking-widest text-slate-500">
        Ajuster en direct
      </p>
      <div className="grid max-h-[34dvh] grid-cols-2 gap-x-3 gap-y-1 overflow-y-auto">
        {SLIDERS.map(({ key, label, unit }) => {
          const r = THEME_RANGES[key];
          const value = current(key);
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-14 shrink-0 truncate font-ui text-[9px] uppercase tracking-wide text-slate-400">{label}</span>
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
              <span className="w-10 shrink-0 text-right font-ui text-[9px] tabular-nums text-slate-200">
                {unit === '×' ? value.toFixed(2) : Math.round(value)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        <button
          type="button"
          onClick={copyCss}
          className="flex flex-1 items-center justify-center gap-1 rounded border border-corporate-line bg-corporate-abyss px-2 py-1 font-ui text-[10px] text-slate-300 hover:border-slate-400"
        >
          <Copy className="h-3 w-3" /> Copier CSS
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_UI_THEME })}
          className="flex flex-1 items-center justify-center gap-1 rounded border border-red-500/40 bg-red-500/10 px-2 py-1 font-ui text-[10px] text-red-300 hover:bg-red-500/20"
        >
          <RotateCcw className="h-3 w-3" /> Origine
        </button>
        <button
          type="button"
          onClick={onBackToStudio}
          className="flex flex-1 items-center justify-center gap-1 rounded border border-slate-400/60 bg-corporate-edge px-2 py-1 font-ui text-[10px] font-semibold text-slate-100"
        >
          <Settings2 className="h-3 w-3" /> Studio
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Quitter le mode direct"
          className="rounded border border-corporate-line bg-corporate-abyss p-1 text-slate-400 hover:border-slate-400"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default LiveInspector;
