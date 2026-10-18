import { useEffect, useState } from 'react';
import { Shield, PiggyBank, TrendingUp, Award, Scale, Zap, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GaugeState, StrategyOption } from '@/game/constants';
import TrendChart from './TrendChart';

interface AnnualReviewProps {
  year: number;
  /** Gauge values at the end of Q4 (already resolved). */
  finalGauges: GaugeState;
  /** Quarterly snapshots Q1–Q4 of the finishing year. */
  history: GaugeState[];
  options: StrategyOption[];
  onSelect: (option: StrategyOption) => void;
}

const PERK_ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  piggy: PiggyBank,
  trend: TrendingUp,
  award: Award,
};

const KIND_STYLE: Record<StrategyOption['kind'], { tag: string; Icon: LucideIcon }> = {
  'permanent-perk': { tag: 'Perk permanent', Icon: Sparkles },
  'temp-boost': { tag: 'Boost 2 trimestres', Icon: Zap },
  'trade-off': { tag: 'Trade-off', Icon: Scale },
};

function AnnualReview({ year, finalGauges, history, options, onSelect }: AnnualReviewProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelected((s) => Math.max(0, s - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelected((s) => Math.min(options.length - 1, s + 1));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(options[selected]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options, selected, onSelect]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-2" aria-label="Arbitrage stratégique de fin d'année">
      <header className="shrink-0 text-center">
        <h2 className="font-press text-sm font-bold uppercase tracking-widest text-slate-200 sm:text-base">
          Arbitrage Stratégique
        </h2>
        <p className="font-ui text-[10px] uppercase tracking-widest text-slate-500">Fin d'année {year} — choisissez votre cap pour Y{year + 1}</p>
      </header>

      {/* Two strategy options side-by-side */}
      <div className="grid shrink-0 grid-cols-2 gap-3 sm:gap-4" role="group" aria-label="Options stratégiques">
        {options.map((opt, i) => {
          const kind = KIND_STYLE[opt.kind];
          const active = selected === i;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt)}
              aria-pressed={active}
              className={`flex h-32 flex-col items-center justify-center gap-1.5 rounded border px-3 text-center transition-all duration-150 sm:h-36 ${
                active
                  ? 'border-slate-300 bg-corporate-edge shadow-[0_0_0_2px_rgba(148,163,184,0.35)]'
                  : 'border-corporate-line bg-corporate-panel hover:border-slate-400'
              }`}
            >
              <kind.Icon className={`h-5 w-5 ${active ? 'text-slate-200' : 'text-slate-500'}`} aria-hidden="true" />
              <span className={`font-ui text-sm font-semibold ${active ? 'text-slate-100' : 'text-slate-300'}`}>
                {opt.title}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${active ? 'text-gauge-traction' : 'text-slate-600'}`}>
                {kind.tag}
              </span>
              <span className="text-[10px] leading-snug text-slate-400">{opt.description}</span>
            </button>
          );
        })}
      </div>

      {/* Annual trend chart fills the rest */}
      <div className="min-h-0 flex-1">
        <TrendChart history={history} />
      </div>

      <p className="shrink-0 text-center text-[10px] uppercase tracking-widest text-slate-600">
        ← → pour choisir · Entrée pour valider
      </p>
    </div>
  );
}

export default AnnualReview;
