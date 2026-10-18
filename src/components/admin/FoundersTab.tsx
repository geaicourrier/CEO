import { useState } from 'react';
import type { FounderProfile } from '@/game/content';
import { Field, GaugeIconLabels } from './editors';

interface FoundersTabProps {
  founders: FounderProfile[];
  onChange: (index: number, next: FounderProfile) => void;
}

function FoundersTab({ founders, onChange }: FoundersTabProps) {
  const [idx, setIdx] = useState(0);
  const f = founders[idx];
  if (!f) return null;

  const patch = (p: Partial<FounderProfile>) => onChange(idx, { ...f, ...p });

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="grid shrink-0 grid-cols-4 gap-1.5" role="tablist" aria-label="Profils de fondateur">
        {founders.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setIdx(i)}
            aria-pressed={i === idx}
            title={p.name}
            className={`aspect-video truncate rounded border px-1 py-0.5 font-ui text-xs font-semibold transition-colors ${
              i === idx
                ? 'border-slate-300 bg-corporate-edge text-slate-100'
                : 'border-corporate-line bg-corporate-abyss text-slate-400 hover:border-slate-400'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
        <Field label="Nom" value={f.name} onChange={(v) => patch({ name: v })} />
        <Field label="Domaine" value={f.domain} onChange={(v) => patch({ domain: v })} />
        <Field label="Bio / Devise" value={f.tagline} onChange={(v) => patch({ tagline: v })} multiline rows={2} />
        <div>
          <p className="mb-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-slate-500">Offsets de départ des jauges</p>
          <GaugeIconLabels impacts={f.stats} onChange={(stats) => patch({ stats })} />
        </div>
        <Field label="Perk passif — nom" value={f.passiveLabel} onChange={(v) => patch({ passiveLabel: v })} />
        <Field label="Perk passif — description" value={f.passiveDescription} onChange={(v) => patch({ passiveDescription: v })} multiline />
      </div>
    </div>
  );
}

export default FoundersTab;
