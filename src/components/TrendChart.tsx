import type { GaugeDef, GaugeState } from '@/game/constants';
import { GAUGES } from '@/game/constants';

interface TrendChartProps {
  /** Snapshot history of the past 4 quarters, index 0 = Q1. */
  history: GaugeState[];
}

function TrendChart({ history }: TrendChartProps) {
  const W = 300;
  const H = 130;
  const PAD_L = 6;
  const PAD_R = 6;
  const PAD_T = 10;
  const PAD_B = 18;

  const points = history.length;
  const x = (i: number) =>
    points <= 1 ? (PAD_L + W - PAD_R) / 2 : PAD_L + (i * (W - PAD_L - PAD_R)) / (points - 1);
  const y = (v: number) => PAD_T + ((100 - v) / 100) * (H - PAD_T - PAD_B);

  const linePath = (key: keyof GaugeState) =>
    history.map((snap, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(snap[key]).toFixed(1)}`).join(' ');

  return (
    <div className="flex h-full min-h-0 flex-col rounded border border-corporate-edge bg-corporate-abyss/60 p-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Tendance annuelle des jauges">
        {/* Quarter grid columns + labels */}
        {history.map((_, i) => (
          <g key={i}>
            <line
              x1={x(i)}
              y1={PAD_T}
              x2={x(i)}
              y2={H - PAD_B}
              stroke="#1F2937"
              strokeDasharray="2 3"
            />
            <text x={x(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="#6B7280">
              Q{i + 1}
            </text>
          </g>
        ))}
        {/* Threshold-neutral 50 line */}
        <line x1={PAD_L} y1={y(50)} x2={W - PAD_R} y2={y(50)} stroke="#374151" strokeWidth="0.75" />

        {/* One polyline per gauge */}
        {GAUGES.map((g) => (
          <g key={g.id}>
            <path
              d={linePath(g.id)}
              fill="none"
              stroke={GAUGE_HEX[g.id]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {history.map((snap, i) => (
              <circle key={i} cx={x(i)} cy={y(snap[g.id])} r="2.5" fill={GAUGE_HEX[g.id]} />
            ))}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex shrink-0 flex-wrap justify-center gap-x-3 gap-y-0.5 pt-1">
        {GAUGES.map((g) => (
          <span key={g.id} className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: GAUGE_HEX[g.id] }} aria-hidden="true" />
            {g.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const GAUGE_HEX: Record<GaugeDef['id'], string> = {
  cash: '#10B981',
  traction: '#F59E0B',
  morale: '#818CF8',
  board: '#3B82F6',
};

export default TrendChart;
