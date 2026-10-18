import { useState } from 'react';
import type { AnnualPerk } from '@/game/content';
import { Field, SegButton, GaugeImpactsEditor } from './editors';

interface PerksTabProps {
  perks: AnnualPerk[];
  onChange: (id: string, next: AnnualPerk) => void;
}

function PerksTab({ perks, onChange }: PerksTabProps) {
  const [year, setYear] = useState(1);
  const [slot, setSlot] = useState(1);

  const perk = perks.find((p) => p.year === year && p.slot === slot);
  const patch = (p: Partial<AnnualPerk>) => perk && onChange(perk.id, { ...perk, ...p });

  const KIND_LABELS: Record<AnnualPerk['kind'], string> = {
    'permanent-perk': 'Perk permanent',
    'temp-boost': 'Boost 2 trimestres',
    'trade-off': 'Trade-off',
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div className="flex items-center gap-1">
          <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-slate-600">Bilan</span>
          {[1, 2, 3, 4, 5].map((y) => (
            <SegButton key={y} active={year === y} onClick={() => setYear(y as AnnualPerk['year'])}>
              Y{y}
            </SegButton>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((s) => (
            <SegButton key={s} active={slot === s} onClick={() => setSlot(s as AnnualPerk['slot'])}>
              Choix {s}
            </SegButton>
          ))}
        </div>
      </div>

      {perk ? (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
          <div className="flex items-center gap-2">
            <Field label="Nom de la stratégie" value={perk.title} onChange={(v) => patch({ title: v })} />
          </div>
          <Field label="Description" value={perk.description} onChange={(v) => patch({ description: v })} multiline />
          <div>
            <p className="mb-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-slate-500">Effets de jauge immédiats</p>
            <GaugeImpactsEditor impacts={perk.impacts} onChange={(impacts) => patch({ impacts })} />
          </div>
          <div>
            <p className="mb-1 font-ui text-[9px] font-bold uppercase tracking-widest text-slate-500">Type</p>
            <div className="flex gap-1.5">
              {(['permanent-perk', 'temp-boost', 'trade-off'] as const).map((k) => (
                <SegButton key={k} active={perk.kind === k} onClick={() => patch({ kind: k })}>
                  {KIND_LABELS[k]}
                </SegButton>
              ))}
            </div>
          </div>
          <Field label="Passif — nom (vide = aucun)" value={perk.passiveLabel ?? ''} onChange={(v) => patch({ passiveLabel: v || undefined })} />
          <Field label="Passif — description" value={perk.passiveDescription ?? ''} onChange={(v) => patch({ passiveDescription: v || undefined })} multiline />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <p className="font-ui text-xs text-slate-600">Aucun perk à cet emplacement.</p>
        </div>
      )}
    </div>
  );
}

export default PerksTab;
