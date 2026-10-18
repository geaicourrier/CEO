import { useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface VictoryScreenProps {
  quartersSurvived: number;
  onRestart: () => void;
}

function VictoryScreen({ quartersSurvived, onRestart }: VictoryScreenProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onRestart]);

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-corporate-abyss/95 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-label="IPO Triomphale"
    >
      <div className="w-full max-w-sm rounded-lg border border-emerald-500/50 bg-corporate-panel p-6 text-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
        <Rocket className="mx-auto h-10 w-10 text-emerald-400" aria-hidden="true" />
        <h2 className="mt-3 font-press text-2xl font-bold text-emerald-400">IPO Triomphale</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Cinq ans de chaos, de cafés renversés et de boards retors. La cloche de la bourse sonne pour vous.
          Votre startup entre dans la légende (et dans le S&amp;P 500).
        </p>
        <p className="mt-4 font-ui text-xs uppercase tracking-widest text-slate-500">
          Quarters survivés :{' '}
          <span className="font-bold tabular-nums text-slate-300">{quartersSurvived}</span>
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 w-full rounded border border-emerald-500/50 bg-emerald-500/10 px-4 py-2.5 font-ui text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
        >
          Recommencer
        </button>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-600">Entrée pour rejouer</p>
      </div>
    </div>
  );
}

export default VictoryScreen;
