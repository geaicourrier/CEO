import type { GaugeDef, GaugeId, GaugeState } from '@/game/constants';
import { GAUGES } from '@/game/constants';

export interface GaugeDelta {
  id: keyof GaugeState;
  value: number;
}

interface GaugeRowProps {
  values: GaugeState;
  /** Deltas currently animating (shown as floating tags). */
  deltas: GaugeDelta[];
  shake: boolean;
  /** Gauge that caused a game over — highlighted with a red pulse. */
  failedGauge?: GaugeId | null;
}

interface GaugeColumnProps extends Pick<GaugeDef, 'emoji' | 'label' | 'text' | 'bar' | 'Icon'> {
  value: number;
  delta?: number;
  shake: boolean;
  failed: boolean;
}

function GaugeColumn({ emoji, label, text, bar, Icon, value, delta, shake, failed }: GaugeColumnProps) {
  const majorDrop = shake && delta !== undefined && delta <= -20;

  return (
    <div
      className={`flex min-h-0 flex-col items-center gap-1 ${majorDrop ? 'animate-gauge-shake' : ''} ${failed ? 'rounded-sm ring-2 ring-red-500 animate-gauge-fatal-pulse' : ''}`}
      aria-label={`${emoji} ${label}: ${value}%`}
    >
      {/* Vertical fill bar (bottom to top) */}
      <div
        className="relative min-h-0 flex-1 overflow-hidden rounded-sm bg-corporate-edge"
        style={{ width: 'var(--gauge-height, 8px)' }}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`absolute bottom-0 left-0 w-full rounded-sm ${bar} transition-[height] duration-700 ease-out`}
          style={{ height: `${value}%` }}
        />
        {/* Floating delta tag pinned to the bar top */}
        {delta !== undefined && (
          <span
            className={`animate-delta-float absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded px-1 py-0.5 font-ui text-[11px] font-bold tabular-nums ${
              delta >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
            }`}
          >
            {delta >= 0 ? `+${delta}%` : `${delta}%`}
          </span>
        )}
      </div>

      {/* Icon and percentage stacked directly under each bar */}
      <div className="flex shrink-0 flex-col items-center gap-0.5">
        <Icon className={`${text} shrink-0`} style={{ height: 'var(--gauge-icon-size, 22px)', width: 'var(--gauge-icon-size, 22px)' }} aria-hidden="true" />
        <span className={`font-ui text-xs font-bold tabular-nums sm:text-sm ${text}`}>{value}%</span>
      </div>
    </div>
  );
}

function GaugeRow({ values, deltas, shake, failedGauge }: GaugeRowProps) {
  const deltaMap = new Map(deltas.map((d) => [d.id, d.value]));
  return (
    <div className="grid h-32 min-h-0 grid-cols-4" style={{ gap: 'var(--gauge-gap, 8px)' }} role="group" aria-label="Company gauges">
      {GAUGES.map((g) => (
        <GaugeColumn
          key={g.id}
          emoji={g.emoji}
          label={g.label}
          text={g.text}
          bar={g.bar}
          Icon={g.Icon}
          value={values[g.id]}
          delta={deltaMap.get(g.id)}
          shake={shake}
          failed={failedGauge === g.id}
        />
      ))}
    </div>
  );
}

export default GaugeRow;
