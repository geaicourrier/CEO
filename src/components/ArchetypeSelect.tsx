import { useCallback, useEffect, useState } from 'react';
import { Cpu, Handshake, Network, LifeBuoy, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Archetype } from '@/game/archetypes';
import { rollArchetypeChoices } from '@/game/archetypes';

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  handshake: Handshake,
  network: Network,
  lifebuoy: LifeBuoy,
  users: Users,
};

interface ArchetypeSelectProps {
  onPick: (archetype: Archetype) => void;
  onBack: () => void;
}

function ArchetypeSelect({ onPick, onBack }: ArchetypeSelectProps) {
  const [choices] = useState<Archetype[]>(rollArchetypeChoices);
  const [highlight, setHighlight] = useState(0);

  const confirm = useCallback(
    (index: number) => {
      onPick(choices[index]);
    },
    [choices, onPick],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => (h + (e.key === 'ArrowUp' ? 2 : 1)) % 3);
      } else if (e.key === '1') confirm(0);
      else if (e.key === '2') confirm(1);
      else if (e.key === '3') confirm(2);
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        confirm(highlight);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [highlight, confirm, onBack]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4" aria-label="Choix du fondateur">
      <div className="text-center">
        <h1 className="font-press text-lg font-bold text-slate-100 sm:text-xl">Choisissez votre fondateur</h1>
        <p className="mt-1 text-xs text-slate-500">Trois profils tirés au sort. Un seul survivra.</p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        {choices.map((a, i) => {
          const Icon = ICONS[a.icon] ?? Users;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => confirm(i)}
              onMouseEnter={() => setHighlight(i)}
              aria-current={highlight === i}
              className={`flex items-start gap-3 rounded border px-4 py-3 text-left transition-all duration-150 ${
                highlight === i
                  ? 'border-slate-300 bg-corporate-edge shadow-[0_0_0_2px_rgba(148,163,184,0.3)]'
                  : 'border-corporate-line bg-corporate-panel hover:border-slate-400'
              }`}
            >
              <span className="mt-0.5 rounded border border-corporate-line bg-corporate-abyss p-2 text-gauge-board">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="font-press text-sm font-bold text-slate-100">{a.name}</span>
                  <span className="font-ui text-[10px] uppercase tracking-widest text-slate-500">{a.domain}</span>
                </span>
                <span className="mt-0.5 block text-xs italic text-slate-500">« {a.tagline} »</span>
                <span className="mt-2 flex flex-wrap gap-1.5 font-ui text-[11px]">
                  {a.stats.traction !== undefined && <span className="text-gauge-traction">Traction {a.stats.traction > 0 ? `+${a.stats.traction}` : a.stats.traction}</span>}
                  {a.stats.morale !== undefined && <span className="text-gauge-morale">Moral {a.stats.morale > 0 ? `+${a.stats.morale}` : a.stats.morale}</span>}
                  {a.stats.cash !== undefined && <span className="text-gauge-cash">Cash {a.stats.cash > 0 ? `+${a.stats.cash}` : a.stats.cash}</span>}
                  {a.stats.board !== undefined && <span className="text-gauge-board">Board {a.stats.board > 0 ? `+${a.stats.board}` : a.stats.board}</span>}
                </span>
                <span className="mt-1.5 block text-[11px] leading-relaxed text-slate-400">
                  <strong className="text-slate-300">{a.passiveLabel} :</strong> {a.passiveDescription}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="font-ui text-[10px] uppercase tracking-widest text-slate-600">1-3 ou ↑↓ puis Entrée</p>
        <button type="button" onClick={onBack} className="mt-2 font-ui text-[11px] text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline">
          Retour au menu
        </button>
      </div>
    </div>
  );
}

export default ArchetypeSelect;
