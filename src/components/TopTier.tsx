import GaugeRow from './GaugeRow';
import PerkBadge from './PerkBadge';
import { Crown, Sparkles, Shield, Rocket, TrendingUp, PiggyBank, Award, Settings, Volume2, VolumeX } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GaugeState, GaugeId } from '@/game/constants';
import { isMuted, setMuted } from '@/game/audioEngine';
import type { GaugeDelta } from './GaugeRow';

interface GamePerk {
  icon: string;
  label: string;
  description: string;
}

const PERK_ICON_MAP: Record<string, LucideIcon> = {
  covenant: Shield,
  runway: PiggyBank,
  growth: TrendingUp,
  award: Award,
  shield: Shield,
  piggy: PiggyBank,
  trend: TrendingUp,
};

const FOUNDER_PERK: GamePerk = {
  icon: 'crown',
  label: 'Fondateur',
  description: 'Badge du fondateur : votre legend status initial.',
};

const FOUNDER_ICON = Crown;

interface TopTierProps {
  phaseLabel: string;
  gauges: GaugeState;
  deltas: GaugeDelta[];
  shake: boolean;
  perks: GamePerk[];
  archetypeName?: string;
  failedGauge?: GaugeId | null;
  onOpenMenu: () => void;
}

function TopTier({ phaseLabel: phase, gauges, deltas, shake, perks, archetypeName, failedGauge, onOpenMenu }: TopTierProps) {
  return (
    <section
      aria-label="Status and assets"
      className="flex shrink-0 flex-col gap-2 border-b border-corporate-edge pb-2"
    >
      <div className="flex items-center justify-between">
        <p className="font-press text-xs tracking-wide text-slate-400 sm:text-sm">{phase}</p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMuted(!isMuted())}
            aria-label={isMuted() ? 'Activer le son' : 'Couper le son'}
            aria-pressed={isMuted()}
            className="rounded border border-corporate-line bg-corporate-panel p-1.5 text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-200"
          >
            {isMuted() ? <VolumeX className="h-3.5 w-3.5" aria-hidden="true" /> : <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Menu pause"
            className="rounded border border-corporate-line bg-corporate-panel p-1.5 text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-200"
          >
            <Settings className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <GaugeRow values={gauges} deltas={deltas} shake={shake} failedGauge={failedGauge} />

      {/* Badges row: fit-content widths so labels are never truncated */}
      <div className="flex flex-wrap items-center gap-1.5" aria-label="Active perks">
        <PerkBadge
          icon={FOUNDER_ICON}
          label={archetypeName ? `Fondateur : ${archetypeName}` : FOUNDER_PERK.label}
          description={FOUNDER_PERK.description}
          highlighted
        />
        {perks.map((perk) => (
          <PerkBadge
            key={perk.label}
            icon={PERK_ICON_MAP[perk.icon] ?? Sparkles}
            label={perk.label}
            description={perk.description}
          />
        ))}
      </div>
    </section>
  );
}

export default TopTier;
