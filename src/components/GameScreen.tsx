import { useCallback, useEffect, useRef, useState } from 'react';
import TopTier from './TopTier';
import DecisionCard from './DecisionCard';
import ComicStrip from './ComicStrip';
import Footer from './Footer';
import GaugeRow, { type GaugeDelta } from './GaugeRow';
import GameOverModal from './GameOverModal';
import AnnualReview from './AnnualReview';
import VictoryScreen from './VictoryScreen';
import InGameMenu from './InGameMenu';
import { Settings } from 'lucide-react';
import type { GameCard } from '@/game/cards';
import type { GaugeState, GaugeId, StrategyOption } from '@/game/constants';
import {
  applyDeltas,
  phaseLabel,
  suddenDeathEnding,
  fatalGauge,
  gaugeAverage,
  YEAR_THRESHOLDS,
  TOTAL_YEARS,
  QUARTERS_PER_YEAR,
} from '@/game/constants';
import { createDeckEngine, impactsToDeltas } from '@/game/deck';
import { activeStrategies, getActiveContent } from '@/game/contentStore';
import { defaultComicStrip } from '@/game/comic';
import type { Archetype } from '@/game/archetypes';
import { applyArchetypeStats } from '@/game/archetypes';
import { saveRun, clearRun } from '@/game/save';
import { playSwipe, playLowGaugeWarning, stopAmbient, setAmbientMood } from '@/game/audioEngine';
import { chimePositive, chimeNeutral, alertLow } from '@/game/audio';

const RESOLVE_MS = 800;
/** Card exit (~240ms) + gauge collapse (~700ms) + full pacing pause before the reveal. */
const GAME_OVER_REVEAL_MS = RESOLVE_MS + 1000;
const MORALE_BOUNCE_FROM = 25;
const MORALE_BOUNCE_TO = 28;
const MORALE_FLOOR_Y1 = 15;
const DOOM_SAVE_TO = 20;

type Screen = 'game' | 'gameOver' | 'annual' | 'victory';

export interface GameScreenProps {
  onExitToMenu: () => void;
  archetype?: Archetype;
  /** Consumed single-use card IDs restored from a previous save, if resuming. */
  initialConsumedCardIds?: string[];
  /** Initial state restored from a previous save, if resuming. */
  initialState?: { year: number; quarter: number; gauges: GaugeState; perks: { icon: string; label: string; description: string }[]; yearHistory: GaugeState[]; quartersSurvived: number };
  /** Restored Community Leader bounce flag. */
  initialMoraleBounceUsed?: boolean;
  /** Restored one-shot passive counters (Heir doom-save). */
  initialPassivesUsed?: Record<string, boolean>;
}

interface GameState {
  year: number;
  quarter: number;
  gauges: GaugeState;
  perks: { icon: string; label: string; description: string }[];
  /** Snapshots of the current year's quarters (Q1..Q4) for the trend chart. */
  yearHistory: GaugeState[];
  quartersSurvived: number;
}

function baselineState(archetype?: Archetype): GameState {
  const gauges = archetype
    ? applyArchetypeStats({ cash: 50, traction: 50, morale: 50, board: 50 }, archetype)
    : { cash: 50, traction: 50, morale: 50, board: 50 };
  return { year: 1, quarter: 1, gauges, perks: [], yearHistory: [], quartersSurvived: 0 };
}

function GameScreen({ onExitToMenu, archetype, initialConsumedCardIds, initialState, initialMoraleBounceUsed, initialPassivesUsed }: GameScreenProps) {
  const [state, setState] = useState<GameState>(() => initialState ?? baselineState(archetype));
  const [screen, setScreen] = useState<Screen>('game');
  const [ending, setEnding] = useState<string | null>(null);
  const [deltas, setDeltas] = useState<GaugeDelta[]>([]);
  const [shake, setShake] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [failedGauge, setFailedGauge] = useState<GaugeId | null>(null);
  const moraleBounceUsed = useRef(initialMoraleBounceUsed ?? false);
  const passivesUsed = useRef<Record<string, boolean>>(initialPassivesUsed ?? {});
  const [branch, setBranch] = useState<{ preview: 'left' | 'right' | null; committed: 'left' | 'right' | null }>({
    preview: null,
    committed: null,
  });

  const engine = useRef(createDeckEngine());
  const [card, setCard] = useState<GameCard>(() => {
    const s = initialState;
    if (s && initialConsumedCardIds) engine.current.restoreConsumed(initialConsumedCardIds);
    return s ? engine.current.draw(s.year, s.quarter as 1 | 2 | 3 | 4) : engine.current.draw(1, 1);
  });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  const drawNextCard = useCallback((year: number, quarter: number) => {
    setCard(engine.current.draw(year, quarter as 1 | 2 | 3 | 4));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /** Persist the full active run (called after each resolved decision and each arbitrage). */
  const persist = useCallback((s: GameState) => {
    saveRun({
      year: s.year,
      quarter: s.quarter,
      gauges: s.gauges,
      perks: s.perks,
      yearHistory: s.yearHistory,
      quartersSurvived: s.quartersSurvived,
      consumedCardIds: engine.current.consumedIds(),
      archetypeId: archetype?.id,
      moraleBounceUsed: moraleBounceUsed.current,
      passivesUsed: passivesUsed.current,
    });
  }, [archetype]);

  /** Community Leader passive: one-shot morale bounce under 25%.
   *  Cult Following: Moral floor 15 pts during Year 1.
   *  Golden Parachute: one-shot save if Cash or Board hits 0. */
  const applyPassives = useCallback((gauges: GaugeState): GaugeState => {
    const next = { ...gauges };
    if (
      archetype?.id === 'community' &&
      !moraleBounceUsed.current &&
      next.morale < MORALE_BOUNCE_FROM
    ) {
      moraleBounceUsed.current = true;
      next.morale = MORALE_BOUNCE_TO;
    }
    if (archetype?.id === 'community' && stateRef.current.year === 1 && next.morale < MORALE_FLOOR_Y1) {
      next.morale = MORALE_FLOOR_Y1;
    }
    if (
      archetype?.id === 'heir' &&
      !passivesUsed.current.doomSave &&
      (next.cash <= 0 || next.board <= 0)
    ) {
      passivesUsed.current.doomSave = true;
      if (next.cash <= 0) next.cash = DOOM_SAVE_TO;
      if (next.board <= 0) next.board = DOOM_SAVE_TO;
    }
    return next;
  }, [archetype]);

  const advanceTurn = useCallback((newGauges: GaugeState) => {
    setState((s) => {
      const history = [...s.yearHistory, newGauges];
      const quartersSurvived = s.quartersSurvived + 1;

      // End of Q4: yearly checks.
      if (s.quarter === QUARTERS_PER_YEAR) {
        const threshold = YEAR_THRESHOLDS[s.year - 1];
        const effectiveThreshold =
          archetype?.id === 'insider' ? threshold - 5 : threshold;
        if (s.year === TOTAL_YEARS && gaugeAverage(newGauges) >= effectiveThreshold) {
          timers.current.push(setTimeout(() => setScreen('victory'), RESOLVE_MS));
        } else if (gaugeAverage(newGauges) < effectiveThreshold) {
          timers.current.push(
            setTimeout(() => {
              setEnding('evictionDoree');
              setFailedGauge(null);
              setScreen('gameOver');
            }, GAME_OVER_REVEAL_MS),
          );
        } else {
          timers.current.push(setTimeout(() => setScreen('annual'), RESOLVE_MS));
        }
        return { ...s, gauges: newGauges, yearHistory: history, quartersSurvived };
      }

      // Sudden death check (every quarter): let the card exit and the fatal gauge
      // collapse animate through the full pacing pause before the reveal.
      const doom = suddenDeathEnding(newGauges);
      if (doom) {
        const doomedGauge = fatalGauge(newGauges);
        timers.current.push(
          setTimeout(() => {
            setEnding(doom);
            setFailedGauge(doomedGauge);
            setScreen('gameOver');
          }, GAME_OVER_REVEAL_MS),
        );
        return { ...s, gauges: newGauges, yearHistory: history, quartersSurvived };
      }

      const nextQuarter = s.quarter + 1;
      drawNextCard(s.year, nextQuarter);
      const next = { ...s, quarter: nextQuarter, gauges: newGauges, yearHistory: history, quartersSurvived };
      timers.current.push(setTimeout(() => persist(next), 50));
      return next;
    });
  }, [drawNextCard, persist, archetype]);

  const handleResolve = useCallback(
    (side: 'left' | 'right') => {
      setResolving(true);
      playSwipe();

      const choice = side === 'left' ? card.leftChoice : card.rightChoice;
      const cardDeltas = impactsToDeltas(choice.impacts);

      const entries = Object.entries(cardDeltas) as [keyof GaugeState, number][];
      // Floating badges follow the strict top-tier order: Cash, Traction, Morale, Board.
      const order: GaugeId[] = ['cash', 'traction', 'morale', 'board'];
      entries.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
      setDeltas(entries.map(([id, value]) => ({ id, value })));

      const hasMajorDrop = entries.some(([, v]) => v <= -20);
      const netPositive = entries.reduce((sum, [, v]) => sum + v, 0) > 0;
      if (hasMajorDrop) alertLow();
      else if (netPositive) chimePositive();
      else chimeNeutral();

      // Bootstrapper passive: soften Conjoncture cash penalties by 25%.
      let deltasForPlayer = cardDeltas;
      if (archetype?.id === 'bootstrapper' && (deltasForPlayer.cash ?? 0) < 0) {
        deltasForPlayer = { ...deltasForPlayer, cash: Math.round((deltasForPlayer.cash ?? 0) * 0.75) };
      }
      // Insider passive: soften Board penalties by 20%.
      if (archetype?.id === 'insider' && (deltasForPlayer.board ?? 0) < 0) {
        deltasForPlayer = { ...deltasForPlayer, board: Math.round((deltasForPlayer.board ?? 0) * 0.8) };
      }
      // Hacker passive: soften Tech debt morale penalties by 20%.
      if (archetype?.id === 'hacker' && card.department === 'Tech' && (deltasForPlayer.morale ?? 0) < 0) {
        deltasForPlayer = { ...deltasForPlayer, morale: Math.round((deltasForPlayer.morale ?? 0) * 0.8) };
      }
      // Hustler passive: +25% traction gains on Sales choices.
      if (archetype?.id === 'hustler' && card.department === 'Sales' && (deltasForPlayer.traction ?? 0) > 0) {
        deltasForPlayer = { ...deltasForPlayer, traction: Math.round((deltasForPlayer.traction ?? 0) * 1.25) };
      }

      const newGauges = applyPassives(applyDeltas(state.gauges, deltasForPlayer));

      // One-shot low-gauge warning on transition strictly below 25%.
      const wasBelow = Object.values(state.gauges).some((v) => v < 25);
      const isBelow = Object.values(newGauges).some((v) => v < 25);
      if (!wasBelow && isBelow) playLowGaugeWarning();

      timers.current.push(setTimeout(() => setState((s) => ({ ...s, gauges: newGauges })), 30));
      if (hasMajorDrop) timers.current.push(setTimeout(() => setShake(true), 30));
      timers.current.push(
        setTimeout(() => {
          setShake(false);
          setDeltas([]);
          setResolving(false);
        }, RESOLVE_MS),
      );

      advanceTurn(newGauges);
    },
    [card, state.gauges, advanceTurn, archetype, applyPassives],
  );

  const handleStrategy = useCallback(
    (option: StrategyOption) => {
      const nextYear = state.year + 1;
      setState((s) => {
        // Hustler passive: +15% traction gains during annual arbitrations.
        let optionDeltas = option.deltas;
        if (archetype?.id === 'hustler' && (optionDeltas.traction ?? 0) > 0) {
          optionDeltas = {
            ...optionDeltas,
            traction: Math.round((optionDeltas.traction ?? 0) * 1.15),
          };
        }
        const next = {
          ...s,
          gauges: applyDeltas(s.gauges, optionDeltas),
          perks: option.perk ? [...s.perks, option.perk] : s.perks,
          year: nextYear,
          quarter: 1,
          yearHistory: [],
        };
        persist(next);
        return next;
      });
      drawNextCard(nextYear, 1);
      setScreen('game');
    },
    [state.year, drawNextCard, persist, archetype],
  );

  const handleRestart = useCallback(() => {
    clearRun();
    stopAmbient();
    onExitToMenu();
  }, [onExitToMenu]);

  // Ending and victory screens clear the active save.
  useEffect(() => {
    if (screen === 'gameOver' || screen === 'victory') clearRun();
  }, [screen]);

  // Adaptive ambient follows the gauge profile.
  useEffect(() => {
    if (screen !== 'game' && screen !== 'annual') {
      stopAmbient();
      return;
    }
    const g = state.gauges;
    if (Object.values(g).some((v) => v < 25)) setAmbientMood('crisis');
    else if (Object.values(g).some((v) => v > 75)) setAmbientMood('overdrive');
    else setAmbientMood('standard');
  }, [state.gauges, screen]);

  const openMenu = useCallback(() => {
    if (screen === 'game' && !resolving) setMenuOpen(true);
  }, [screen, resolving]);

  // Keyboard: P or Escape (while a card is neutral) opens the pause menu.
  useEffect(() => {
    if (screen !== 'game' || menuOpen || resolving) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setMenuOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, menuOpen, resolving]);

  const handleSaveAndExit = useCallback(() => {
    persist(stateRef.current);
    stopAmbient();
    onExitToMenu();
  }, [persist, onExitToMenu]);

  const handleSurrender = useCallback(() => {
    clearRun();
    stopAmbient();
    setMenuOpen(false);
    onExitToMenu();
  }, [onExitToMenu]);

  const strategyOptions = activeStrategies()[state.year - 1] ?? [];

  // Comic strip for the active card: custom edits when present, otherwise generated defaults.
  const activeStrip = card.comicStrip ?? defaultComicStrip(card);
  const stripPhase: 'reading' | 'left' | 'right' = branch.committed ?? branch.preview ?? 'reading';

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col gap-2 overflow-hidden">
      <TopTier
        phaseLabel={phaseLabel(state.year, state.quarter)}
        gauges={state.gauges}
        deltas={deltas}
        shake={shake}
        perks={state.perks}
        onOpenMenu={openMenu}
        archetypeName={archetype?.name}
        failedGauge={failedGauge}
      />

      <main aria-label="Decision area" className="relative min-h-0 flex-1 pt-1">
        {screen === 'game' && (
          <DecisionCard
            card={card}
            disabled={resolving || menuOpen}
            onResolve={handleResolve}
            onBranchSignal={setBranch}
          />
        )}
        {screen === 'annual' && (
          <AnnualReview
            year={state.year}
            finalGauges={state.gauges}
            history={state.yearHistory}
            options={strategyOptions}
            onSelect={handleStrategy}
          />
        )}
      </main>

      <ComicStrip strip={activeStrip} phase={stripPhase} committed={branch.committed !== null} />
      <Footer />

      {menuOpen && (
        <InGameMenu
          onResume={() => setMenuOpen(false)}
          onSaveAndExit={handleSaveAndExit}
          onSurrender={handleSurrender}
        />
      )}

      {screen === 'gameOver' && ending && (
        <GameOverModal
          ending={ending as never}
          quartersSurvived={state.quartersSurvived}
          finalGauges={state.gauges}
          onRestart={handleRestart}
        />
      )}
      {screen === 'victory' && (
        <VictoryScreen quartersSurvived={state.quartersSurvived} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default GameScreen;
