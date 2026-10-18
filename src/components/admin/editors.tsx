import { DollarSign, TrendingUp, Users, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Impacts } from '@/game/content';

const GAUGE_FIELDS: { id: keyof Impacts; Icon: LucideIcon; accent: string }[] = [
  { id: 'cash', Icon: DollarSign, accent: 'text-gauge-cash' },
  { id: 'traction', Icon: TrendingUp, accent: 'text-gauge-traction' },
  { id: 'morale', Icon: Users, accent: 'text-gauge-morale' },
  { id: 'board', Icon: Briefcase, accent: 'text-gauge-board' },
];

export function GaugeImpactsEditor({
  impacts,
  onChange,
}: {
  impacts: Impacts;
  onChange: (next: Impacts) => void;
}) {
  const set = (id: keyof Impacts, raw: string) => {
    const v = raw === '' ? undefined : Math.max(-50, Math.min(50, Number(raw)));
    const next = { ...impacts };
    if (v === undefined || v === 0) delete next[id];
    else next[id] = v;
    onChange(next);
  };
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {GAUGE_FIELDS.map(({ id, Icon, accent }) => (
        <label key={id} className="flex flex-col items-center gap-0.5">
          <Icon className={`h-3.5 w-3.5 ${accent}`} aria-label={id} />
          <input
            type="number"
            inputMode="numeric"
            value={impacts[id] ?? ''}
            placeholder="0"
            onChange={(e) => set(id, e.target.value)}
            className="w-full rounded border border-corporate-line bg-corporate-abyss px-1 py-1 text-center font-ui text-xs tabular-nums text-slate-100 outline-none focus:border-slate-400"
          />
        </label>
      ))}
    </div>
  );
}

export function GaugeIconLabels({
  impacts,
  onChange,
}: {
  impacts: Impacts;
  onChange: (next: Impacts) => void;
}) {
  const set = (id: keyof Impacts, raw: string) => {
    const v = raw === '' ? undefined : Math.max(-50, Math.min(50, Number(raw)));
    const next = { ...impacts };
    if (v === undefined || v === 0) delete next[id];
    else next[id] = v;
    onChange(next);
  };
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
      {GAUGE_FIELDS.map(({ id, Icon, accent }) => (
        <label key={id} className="flex items-center gap-1.5">
          <span className={`flex w-16 shrink-0 items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-widest ${accent}`}>
            <Icon className="h-3 w-3" />
            {id === 'morale' ? 'Moral' : id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
          <input
            type="number"
            inputMode="numeric"
            value={impacts[id] ?? ''}
            placeholder="0"
            onChange={(e) => set(id, e.target.value)}
            className="min-w-0 flex-1 rounded border border-corporate-line bg-corporate-abyss px-1 py-1 text-center font-ui text-xs tabular-nums text-slate-100 outline-none focus:border-slate-400"
          />
        </label>
      ))}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  const cls =
    'w-full rounded border border-corporate-line bg-corporate-abyss px-2 py-1.5 font-ui text-xs text-slate-100 outline-none focus:border-slate-400';
  return (
    <label className="block">
      <span className="mb-0.5 block font-ui text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
      {multiline ? (
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none leading-relaxed`} />
      ) : (
        <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

export function ChoiceEditor({
  placeholder,
  label,
  impacts,
  onLabel,
  onImpacts,
}: {
  placeholder: string;
  label: string;
  impacts: Impacts;
  onLabel: (v: string) => void;
  onImpacts: (v: Impacts) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded border border-corporate-line bg-corporate-edge/40 p-2">
      <input
        type="text"
        value={label}
        placeholder={placeholder}
        onChange={(e) => onLabel(e.target.value)}
        className="w-full rounded border border-corporate-line bg-corporate-abyss px-2 py-1.5 font-ui text-xs text-slate-100 outline-none focus:border-slate-400"
      />
      <GaugeImpactsEditor impacts={impacts} onChange={onImpacts} />
    </div>
  );
}

export function ChoiceRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return <div className="grid grid-cols-2 gap-2">{left}{right}</div>;
}

export function SegButton({
  active,
  onClick,
  children,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`min-w-[32px] rounded border px-2 py-1 font-press text-[11px] transition-colors duration-100 ${
        active
          ? 'border-slate-300 bg-corporate-edge text-slate-100'
          : 'border-corporate-line bg-corporate-abyss text-slate-400 hover:border-slate-400 disabled:opacity-40'
      }`}
    >
      {children}
    </button>
  );
}
