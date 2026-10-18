import { useEffect } from 'react';
import type { GameOverId, GaugeState } from '@/game/constants';
import { GAME_OVERS, failureCause } from '@/game/constants';

interface GameOverModalProps {
  ending: GameOverId;
  quartersSurvived: number;
  finalGauges: GaugeState;
  onRestart: () => void;
}

const TONE_STYLES = {
  red: { border: 'border-red-500/50', text: 'text-red-400', glow: 'shadow-[0_0_60px_rgba(239,68,68,0.2)]' },
  amber: { border: 'border-amber-500/50', text: 'text-amber-400', glow: 'shadow-[0_0_60px_rgba(245,158,11,0.2)]' },
  blue: { border: 'border-blue-500/50', text: 'text-blue-400', glow: 'shadow-[0_0_60px_rgba(59,130,246,0.2)]' },
} as const;

function GameOverModal({ ending, quartersSurvived, finalGauges, onRestart }: GameOverModalProps) {
  const def = GAME_OVERS[ending];

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

  const tone = TONE_STYLES[def.tone];

  return (
    <div
      className="absolute inset-x-0 bottom-0 top-[168px] z-30 flex items-center justify-center bg-corporate-abyss/80 p-4 sm:p-6"
      role="alertdialog"
      aria-modal="true"
      aria-label={def.title}
    >
      <div
        className={`flex max-h-full w-full max-w-md flex-col items-center overflow-y-auto rounded-lg border bg-corporate-panel p-6 text-center sm:max-w-lg sm:p-8 ${tone.border} ${tone.glow}`}
      >
        <span className="text-6xl" aria-hidden="true">{def.emoji}</span>
        <h2 className={`mt-4 font-press text-3xl font-bold sm:text-4xl ${tone.text}`}>{def.title}</h2>
        <p className={`mt-3 font-ui text-sm font-bold uppercase tracking-widest ${tone.text}`}>
          {failureCause(ending, finalGauges)}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{def.epilogue}</p>

        <p className="mt-5 font-ui text-sm uppercase tracking-widest text-slate-500">
          Quarters survivés :{' '}
          <span className="font-bold tabular-nums text-slate-300">{quartersSurvived}</span>
        </p>

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 w-full rounded border border-corporate-line bg-corporate-edge px-4 py-3 font-ui text-base font-semibold text-slate-100 transition-colors hover:border-slate-400 hover:bg-slate-700"
        >
          Recommencer
        </button>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-600">Entrée pour relancer</p>
      </div>
    </div>
  );
}

export default GameOverModal;
