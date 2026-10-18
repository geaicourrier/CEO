import { HelpCircle } from 'lucide-react';
import type { CardComicStrip, ComicFrame } from '@/game/comic';

type BranchSide = 'left' | 'right';

export type StripPhase = 'reading' | BranchSide;

interface ComicStripProps {
  strip: CardComicStrip | null;
  /** 'reading' shows locked placeholders; a side previews/reveals that branch. */
  phase: StripPhase;
  /** True once the choice is committed (frames stay revealed until next card). */
  committed: boolean;
}

function FrameSlot({ frame, label, locked }: { frame: ComicFrame; label: string; locked?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${frame.prompt}`}
      className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded border border-corporate-line bg-corporate-panel"
    >
      {frame.imageUrl ? (
        <img src={frame.imageUrl} alt={label} className="h-full w-full object-cover" draggable={false} />
      ) : locked ? (
        <HelpCircle className="h-5 w-5 text-slate-600" aria-hidden="true" />
      ) : (
        <span className="px-1 text-center font-press text-[7px] leading-tight text-slate-500 line-clamp-6">
          {frame.prompt}
        </span>
      )}
    </div>
  );
}

function ComicStrip({ strip, phase, committed }: ComicStripProps) {
  const branchFrames =
    phase !== 'reading' && strip
      ? phase === 'left'
        ? [strip.branchLeft.frame3, strip.branchLeft.frame4]
        : [strip.branchRight.frame3, strip.branchRight.frame4]
      : null;

  return (
    <section
      aria-label="Comic strip"
      className="shrink-0 border-t border-corporate-edge pt-2"
      style={{ height: 'var(--comic-height, 72px)' }}
    >
      <div
        className={`grid h-full grid-cols-4 gap-2 transition-opacity duration-300 ${
          committed ? 'opacity-100 ring-inset' : 'opacity-90'
        }`}
      >
        {strip ? (
          <>
            <FrameSlot frame={strip.common.frame1} label="Case 1 — Exposition" />
            <FrameSlot frame={strip.common.frame2} label="Case 2 — Tension" />
            {branchFrames ? (
              <>
                <FrameSlot frame={branchFrames[0]} label={`Case 3${phase === 'left' ? 'L' : 'R'} — Action`} />
                <FrameSlot frame={branchFrames[1]} label={`Case 4${phase === 'left' ? 'L' : 'R'} — Chute`} />
              </>
            ) : (
              <>
                <FrameSlot frame={{ prompt: 'Choix en attente' }} label="Case 3 — verrouillée" locked />
                <FrameSlot frame={{ prompt: 'Choix en attente' }} label="Case 4 — verrouillée" locked />
              </>
            )}
          </>
        ) : (
          Array.from({ length: 4 }, (_, i) => (
            <FrameSlot key={i} frame={{ prompt: '' }} label={`Case ${i + 1} — verrouillée`} locked />
          ))
        )}
      </div>
    </section>
  );
}

export default ComicStrip;
