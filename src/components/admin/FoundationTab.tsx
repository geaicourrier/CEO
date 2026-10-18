import { useState } from 'react';
import type { FoundationCard } from '@/game/content';
import { ChoiceEditor, ChoiceRow, SegButton, Field } from './editors';
import StoryboardPanel from './StoryboardPanel';

interface FoundationTabProps {
  cards: FoundationCard[];
  onChange: (id: string, next: FoundationCard) => void;
}

function FoundationTab({ cards, onChange }: FoundationTabProps) {
  const [question, setQuestion] = useState(1);
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  const id = `${String(question).padStart(2, '0')}${variant}`;
  const card = cards.find((c) => c.id === id);

  const patch = (p: Partial<FoundationCard>) => card && onChange(card.id, { ...card, ...p });

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((q) => (
            <SegButton key={q} active={question === q} onClick={() => setQuestion(q as 1 | 2 | 3 | 4)}>
              0{q}
            </SegButton>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {(['A', 'B'] as const).map((v) => (
            <SegButton key={v} active={variant === v} onClick={() => setVariant(v)}>
              {v}
            </SegButton>
          ))}
        </div>
      </div>

      {card ? (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
          <span className="self-start rounded bg-slate-500/15 px-2 py-0.5 font-press text-[11px] text-slate-300">{card.id}</span>
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
          <p className="font-ui text-[10px] italic leading-snug text-slate-600">
            Seuls les impacts non nuls sont prévisualisés en jeu.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <p className="font-ui text-xs text-slate-600">Aucune carte à cet emplacement ({id}).</p>
        </div>
      )}
    </div>
  );
}

export default FoundationTab;
