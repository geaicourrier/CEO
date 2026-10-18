import { useMemo, useState } from 'react';
import GameScreen from '@/components/GameScreen';
import StartScreen from '@/components/StartScreen';
import ArchetypeSelect from '@/components/ArchetypeSelect';
import { loadRun } from '@/game/save';
import type { Archetype } from '@/game/archetypes';
import AdminGate from '@/components/AdminGate';
import { ADMIN_LIVE_EVENT, ADMIN_LIVE_EXIT_EVENT } from '@/components/AdminGate';
import { loadUiTheme, themeToCssVars, subscribeUiTheme } from '@/game/uiTheme';
import type { UiTheme } from '@/game/uiTheme';
import { useEffect } from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

type View = 'menu' | 'archetype' | 'game';

interface RunInit {
  archetype?: Archetype;
  initialState?: {
    year: number;
    quarter: number;
    gauges: { cash: number; traction: number; morale: number; board: number };
    perks: { icon: string; label: string; description: string }[];
    yearHistory: { cash: number; traction: number; morale: number; board: number }[];
    quartersSurvived: number;
  };
  consumedCardIds?: string[];
  moraleBounceUsed?: boolean;
  passivesUsed?: Record<string, boolean>;
}

function AppInner() {
  const [view, setView] = useState<View>('menu');
  const [run, setRun] = useState<RunInit | null>(null);
  // Remounts GameScreen (fresh engine + state) on every new/resumed run.
  const [runKey, setRunKey] = useState(0);
  // While the Admin Studio's live mode is open, force a real game screen
  // underneath so CSS tweaks are previewed in gameplay context.
  const [adminLive, setAdminLive] = useState(false);
  const [uiTheme, setUiTheme] = useState<UiTheme>(() => loadUiTheme());

  // The Admin Studio pushes theme changes through this subscription.
  useEffect(() => subscribeUiTheme(setUiTheme), []);

  useEffect(() => {
    const enter = () => setAdminLive(true);
    const exit = () => setAdminLive(false);
    window.addEventListener(ADMIN_LIVE_EVENT, enter);
    window.addEventListener(ADMIN_LIVE_EXIT_EVENT, exit);
    return () => {
      window.removeEventListener(ADMIN_LIVE_EVENT, enter);
      window.removeEventListener(ADMIN_LIVE_EXIT_EVENT, exit);
    };
  }, []);

  const cssVars = useMemo(() => themeToCssVars(uiTheme) as React.CSSProperties, [uiTheme]);

  const startArchetypeSelect = () => {
    setView('archetype');
  };

  const startWithArchetype = (archetype: Archetype) => {
    setRun({ archetype });
    setRunKey((k) => k + 1);
    setView('game');
  };

  const resume = () => {
    const saved = loadRun();
    if (!saved) return;
    setRun({
      initialState: {
        year: saved.year,
        quarter: saved.quarter,
        gauges: saved.gauges,
        perks: saved.perks,
        yearHistory: saved.yearHistory,
        quartersSurvived: saved.quartersSurvived,
      },
      consumedCardIds: saved.consumedCardIds,
      moraleBounceUsed: saved.moraleBounceUsed,
      passivesUsed: saved.passivesUsed,
    });
    setRunKey((k) => k + 1);
    setView('game');
  };

  return (
    <div className="flex h-[100dvh] w-full items-stretch justify-center overflow-hidden bg-corporate-abyss text-slate-100">
      <div id="app-shell" style={cssVars} className="relative flex h-full w-full flex-col justify-between overflow-hidden p-3">
        <div className="pointer-events-none absolute right-3 top-3 z-30 flex justify-end">
          <div className="pointer-events-auto">
            <LanguageToggle />
          </div>
        </div>
        {view === 'menu' && !adminLive && <StartScreen onStartNew={startArchetypeSelect} onResume={resume} />}
        {view === 'archetype' && !adminLive && (
          <ArchetypeSelect onPick={startWithArchetype} onBack={() => setView('menu')} />
        )}
        {view === 'game' || adminLive ? (
          <GameScreen
            key={runKey}
            onExitToMenu={() => setView('menu')}
            archetype={run?.archetype}
            initialState={run?.initialState}
            initialConsumedCardIds={run?.consumedCardIds}
            initialMoraleBounceUsed={run?.moraleBounceUsed}
            initialPassivesUsed={run?.passivesUsed}
          />
        ) : null}
      </div>
      <AdminGate />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
