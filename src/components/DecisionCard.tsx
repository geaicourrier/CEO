import { useCallback, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { GameCard } from '@/game/cards';
import { GAUGES } from '@/game/constants';
import type { GaugeId, Tilt } from '@/game/constants';

interface DecisionCardProps {
  card: GameCard;
  /** true while the resolution sequence runs (inputs disabled, no new card). */
  disabled: boolean;
  onResolve: (side: 'left' | 'right') => void;
  /** Reports the live branch signal: tilt/drag preview or committed exit side. */
  onBranchSignal?: (signal: { preview: 'left' | 'right' | null; committed: 'left' | 'right' | null }) => void;
}

interface ChoiceButtonProps {
  arrow: '←' | '→';
  label: string;
  impacted: { Icon: LucideIcon; text: string }[];
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}

function ChoiceButton({ arrow, label, impacted, active, disabled, onClick }: ChoiceButtonProps) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-1.5">
      {/* Gauge preview icons: outside the button, in flow above it — no overlap possible */}
      {impacted.length > 0 && (
        <span className="flex shrink-0 items-center justify-center gap-2" aria-hidden="true">
          {impacted.map(({ Icon, text }, i) => (
            <span
              key={i}
              className={`flex items-center justify-center rounded-full border-2 border-corporate-abyss bg-corporate-panel shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all duration-150 ${
                active ? `${text} brightness-150 scale-110` : `${text} opacity-90`
              }`}
              style={{ height: 'var(--impact-badge-size, 19px)', width: 'var(--impact-badge-size, 19px)' }}
            >
              <Icon className="h-3 w-3" strokeWidth={2.5} />
            </span>
          ))}
        </span>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        style={{ paddingTop: 'var(--button-py, 12px)', paddingBottom: 'var(--button-py, 12px)' }}
        className={`group flex min-h-[56px] w-full flex-1 items-center justify-center gap-2 rounded border px-3 font-ui text-sm font-semibold leading-snug transition-all duration-150 disabled:opacity-60 sm:text-base ${
          active
            ? 'border-slate-300 bg-slate-100 text-corporate-abyss shadow-[0_0_0_2px_rgba(148,163,184,0.4)]'
            : 'border-corporate-line bg-corporate-panel text-slate-200 hover:border-slate-400 hover:bg-corporate-edge'
        }`}
      >
        <span aria-hidden="true" className="shrink-0 text-slate-400 group-hover:text-inherit">{arrow}</span>
        <span>{label}</span>
      </button>
    </div>
  );
}

const GAUGE_MAP = Object.fromEntries(GAUGES.map((g) => [g.id, g])) as Record<
  GaugeId,
  (typeof GAUGES)[number]
>;

const DEPARTMENT_STYLES: Record<GameCard['department'], { badge: string }> = {
  Tech: { badge: 'bg-gauge-board/15 text-gauge-board' },
  HR: { badge: 'bg-gauge-morale/15 text-gauge-morale' },
  Sales: { badge: 'bg-gauge-traction/15 text-gauge-traction' },
  Finance: { badge: 'bg-gauge-cash/15 text-gauge-cash' },
  Legal: { badge: 'bg-slate-500/15 text-slate-400' },
  Conjoncture: { badge: 'bg-slate-500/15 text-slate-400' },
};

/** Drag beyond this (px) completes the swipe; below, the card snaps back. */
const SWIPE_THRESHOLD = 80;
/** Tilt preview (px) while hovering/keyboard-tilting without committing. */
const TILT_PREVIEW = 10;
/** Full off-screen slide distance as a percentage of card width. */
const EXIT_DISTANCE_PCT = 150;

type Phase = 'idle' | 'swiping' | 'done';

function DecisionCard({ card, disabled, onResolve, onBranchSignal }: DecisionCardProps) {
  const [tilt, setTilt] = useState<Tilt>(null);
  const [dragX, setDragX] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [exitSide, setExitSide] = useState<Exclude<Tilt, null>>('left');
  const [entering, setEntering] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const locked = useRef(false);

  const choose = useCallback(
    (side: Exclude<Tilt, null>) => {
      if (disabled || locked.current || phase === 'swiping') return;
      locked.current = true;
      setTilt(side);
      setExitSide(side);
      setPhase('swiping');
      // Resolve impacts immediately; the card keeps animating out in parallel.
      onResolve(side);
    },
    [disabled, onResolve, phase],
  );

  // Complete the exit and prep the next card's entrance (~250ms slide).
  useEffect(() => {
    if (phase !== 'swiping') return;
    const t = setTimeout(() => {
      setPhase('done');
      setEntering(true);
    }, 240);
    return () => clearTimeout(t);
  }, [phase]);

  // Reset transient state when the next card arrives.
  useEffect(() => {
    locked.current = false;
    setPhase('idle');
    setTilt(null);
    setDragX(0);
    setExitSide('left');
    if (entering) {
      const t = setTimeout(() => setEntering(false), 240);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  // Keyboard: ← tilt, → tilt, Escape cancel, Enter/Space validate (programmatic swipe).
  useEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setTilt('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          setTilt('right');
          break;
        case 'Escape':
          e.preventDefault();
          setTilt(null);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          choose(tilt ?? 'left');
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tilt, choose, disabled]);

  // Pointer (mouse drag / touch swipe) on the card core.
  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled || phase !== 'idle') return;
    dragStartX.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null || disabled || phase !== 'idle') return;
    const dx = e.clientX - dragStartX.current;
    setDragX(Math.max(-120, Math.min(120, dx)));
  };
  const onPointerUp = () => {
    if (dragStartX.current === null || disabled) return;
    const dx = dragX;
    dragStartX.current = null;
    setDragX(0);
    if (dx <= -SWIPE_THRESHOLD) choose('left');
    else if (dx >= SWIPE_THRESHOLD) choose('right');
    // Below threshold: dragX reset above snaps the card back to center.
  };

  const activeSide: Tilt = dragX !== 0 ? (dragX < 0 ? 'left' : 'right') : tilt;
  const swiping = phase === 'swiping';

  // Comic strip preview: live branch while reading, committed branch during resolution.
  useEffect(() => {
    if (!onBranchSignal) return;
    const committed = phase === 'swiping' || phase === 'done' ? exitSide : null;
    const preview = committed ?? activeSide ?? null;
    onBranchSignal({ preview, committed });
  }, [activeSide, phase, exitSide, onBranchSignal]);

  // Manual drag tracks the finger; committed swipes slide fully off-screen with fade.
  const transform = swiping
    ? `translateX(${exitSide === 'left' ? `-${EXIT_DISTANCE_PCT}%` : `${EXIT_DISTANCE_PCT}%`}) rotate(${exitSide === 'left' ? -14 : 14}deg)`
    : `translateX(${dragX || (activeSide === 'left' ? -TILT_PREVIEW : activeSide === 'right' ? TILT_PREVIEW : 0)}px) rotate(${(dragX || (activeSide === 'left' ? -TILT_PREVIEW : activeSide === 'right' ? TILT_PREVIEW : 0)) / 4}deg)`;

  // Preview icons follow the strict top-tier order: Cash, Traction, Morale, Board.
  const impactedIcons = (deltas: GameCard['leftChoice']['impacts']) =>
    (['cash', 'traction', 'morale', 'board'] as const)
      .filter((id) => id in deltas)
      .map((id) => ({
        Icon: GAUGE_MAP[id].Icon,
        text: GAUGE_MAP[id].text,
      }));

  const leftImpacted = impactedIcons(card.leftChoice.impacts);
  const rightImpacted = impactedIcons(card.rightChoice.impacts);
  const deptStyle = DEPARTMENT_STYLES[card.department];

  return (
    <article
      aria-label="Decision card"
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-lg border bg-corporate-panel will-change-transform ${
        entering ? 'animate-card-enter' : ''
      } ${
        swiping
          ? 'opacity-0 transition-all duration-300 ease-in'
          : 'opacity-100 transition-transform duration-200 ease-out'
      } ${
        activeSide
          ? 'border-slate-400'
          : 'border-corporate-edge'
      }`}
      style={{ transform, borderRadius: 'var(--card-radius, 12px)' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Card header */}
      <header className="flex items-center justify-between border-b border-corporate-edge px-3 py-2 sm:px-4">
        <span
          className={`rounded px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-widest sm:text-xs ${deptStyle.badge}`}
        >
          {card.department}
        </span>
        <span className="font-press text-xs italic text-slate-400 sm:text-sm">{card.role}</span>
      </header>

      {/* Card core: vignette + dilemma */}
      <div className="flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center gap-3 px-3 sm:gap-5 sm:px-5">
        <div
          aria-hidden="true"
          className="hidden h-16 w-16 shrink-0 items-center justify-center rounded border border-dashed border-corporate-line bg-corporate-abyss sm:flex sm:h-20 sm:w-20"
        >
          <span className="font-press text-2xl text-slate-600">n°{card.id.slice(-1)}</span>
        </div>
        <p className="leading-relaxed text-slate-200" style={{ fontSize: 'var(--card-context-size, 15px)' }}>{card.text}</p>
      </div>

      {/* Two horizontal choice buttons, strictly side-by-side */}
      <div className="grid shrink-0 grid-cols-2 gap-3 px-3 pb-3 sm:gap-4 sm:px-5 sm:pb-4">
        <ChoiceButton
          arrow="←"
          label={card.leftChoice.label}
          impacted={leftImpacted}
          active={activeSide === 'left'}
          disabled={disabled}
          onClick={() => choose('left')}
        />
        <ChoiceButton
          arrow="→"
          label={card.rightChoice.label}
          impacted={rightImpacted}
          active={activeSide === 'right'}
          disabled={disabled}
          onClick={() => choose('right')}
        />
      </div>
    </article>
  );
}

export default DecisionCard;
