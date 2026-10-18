import { useState } from 'react';
import type { OpsCard } from '@/game/content';
import { ChoiceEditor, ChoiceRow, SegButton, Field } from './editors';
import StoryboardPanel from './StoryboardPanel';

interface OpsTabProps {
  cards: OpsCard[];
  onChange: (id: string, next: OpsCard) => void;
}

function OpsTab({ cards, onChange }: OpsTabProps) {
  const [year, setYear] = useState(1);
  const [quarter, setQuarter] = useState(2);
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  const id = `${year}${quarter}${variant}`;
  const card = cards.find((c) => c.id === id);

  const patch = (p: Partial<OpsCard>) => card && onChange(card.id, { ...card, ...p });

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      {/* Filters: year, quarter, variant */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div className="flex items-center gap-1">
          <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-slate-600">An</span>
          {[1, 2, 3, 4, 5].map((y) => (
            <SegButton key={y} active={year === y} onClick={() => setYear(y as OpsCard['year'])}>
              Y{y}
            </SegButton>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-slate-600">Trim.</span>
          {[1, 2, 3, 4].map((q) => (
            <SegButton key={q} active={quarter === q} onClick={() => setQuarter(q as OpsCard['quarter'])}>
              Q{q}
            </SegButton>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {(['A', 'B'] as const).map((v) => (
            <SegButton key={v} active={variant === v} onClick={() => setVariant(v)}>
              {v}
            </SegButton>
          ))}
        </div>
        <span className="ml-auto rounded bg-slate-500/15 px-2 py-0.5 font-press text-[11px] text-slate-300">{id}</span>
      </div>

      {card ? (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
          <Field label="Rôle / Interlocuteur" value={card.role} onChange={(v) => patch({ role: v })} />
          <Field label="Contexte / Dilemme" value={card.text} onChange={(v) => patch({ text: v })} multiline />
          <ChoiceRow
            left={
              <ChoiceEditor
                placeholder="Option Gauche..."
                label={card.leftChoice.label}
                impacts={card.leftChoice.impacts}
                onLabel={(label) => patch({ leftChoice: { ...card.leftChoice, label } })}
                onImpacts={(impacts) => patch({ leftChoice: { ...card.leftChoice, impacts } })}
              />
            }
            right={
              <ChoiceEditor
                placeholder="Option Droite..."
                label={card.rightChoice.label}
                impacts={card.rightChoice.impacts}
                onLabel={(label) => patch({ rightChoice: { ...card.rightChoice, label } })}
                onImpacts={(impacts) => patch({ rightChoice: { ...card.rightChoice, impacts } })}
              />
            }
          />
          <StoryboardPanel card={card} strip={card.comicStrip} onChange={(comicStrip) => patch({ comicStrip })} />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <p className="font-ui text-xs text-slate-600">Aucune carte à cet emplacement ({id}).</p>
        </div>
      )}
    </div>
  );
}

export default OpsTab;
