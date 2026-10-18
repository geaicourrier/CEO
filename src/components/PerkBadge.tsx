import { useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface PerkBadgeProps {
  icon: LucideIcon;
  label: string;
  description: string;
  highlighted?: boolean;
}

type TipAlign = 'left' | 'center' | 'right';

const EDGE_MARGIN = 12;
const TOOLTIP_MAX_W = 240;

function PerkBadge({ icon: Icon, label, description, highlighted = false }: PerkBadgeProps) {
  const [showTip, setShowTip] = useState(false);
  const [align, setAlign] = useState<TipAlign>('center');
  const badgeRef = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computeAlign = () => {
    const rect = badgeRef.current?.getBoundingClientRect();
    if (!rect) return 'center' as TipAlign;
    const tipHalf = TOOLTIP_MAX_W / 2;
    const centeredLeft = rect.left + rect.width / 2 - tipHalf;
    const centeredRight = rect.left + rect.width / 2 + tipHalf;
    if (centeredLeft < EDGE_MARGIN) return 'left';
    if (centeredRight > window.innerWidth - EDGE_MARGIN) return 'right';
    return 'center';
  };

  const open = () => {
    setAlign(computeAlign());
    setShowTip(true);
  };

  const close = () => setShowTip(false);

  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  const alignClass =
    align === 'left'
      ? 'left-0 translate-x-0'
      : align === 'right'
        ? 'right-0 translate-x-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={badgeRef}
      className="relative flex touch-none select-none items-center justify-center px-0.5"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
      onTouchStart={() => {
        cancelHold();
        holdTimer.current = setTimeout(open, 350);
      }}
      onTouchEnd={() => {
        cancelHold();
        setTimeout(close, 1200);
      }}
      tabIndex={0}
      role="button"
      aria-label={`${label} — ${description}`}
    >
      <span
        className={`flex w-auto min-w-[90px] max-w-full items-center justify-center gap-1.5 rounded border px-3 py-1.5 ${
          highlighted
            ? 'border-amber-400/60 bg-amber-400/10'
            : 'border-corporate-edge bg-corporate-panel'
        }`}
      >
        <Icon className={`h-[18px] w-[18px] shrink-0 ${highlighted ? 'text-amber-400' : 'text-slate-400'}`} aria-hidden="true" />
        <span className="whitespace-nowrap text-[13px] font-medium leading-tight text-slate-300">{label}</span>
      </span>

      {showTip && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute bottom-full z-20 mb-2 w-max max-w-[240px] rounded border border-corporate-line bg-corporate-abyss px-2.5 py-1.5 text-center text-[11px] leading-snug text-slate-200 shadow-lg ${alignClass}`}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default PerkBadge;
