import { useEffect, useRef, useState } from 'react';
import { Download, Save, Upload, X, KeyRound } from 'lucide-react';
import type { GameContent } from '@/game/content';
import { APP_VERSION } from '@/game/constants';
import {
  saveContentOverride,
  buildExportPayload,
  normalizeContent,
} from '@/game/contentStore';
import { writeAdminPin } from '../PinPad';
import FoundersTab from './FoundersTab';
import FoundationTab from './FoundationTab';
import OpsTab from './OpsTab';
import PerksTab from './PerksTab';
import DesignTab from './DesignTab';
import LiveInspector from './LiveInspector';
import PinChangeModal from './PinChangeModal';
import { loadUiTheme, saveUiTheme, publishUiTheme, normalizeUiTheme } from '@/game/uiTheme';
import type { UiTheme } from '@/game/uiTheme';

interface AdminStudioModalProps {
  content: GameContent;
  onChange: (next: GameContent) => void;
  onClose: () => void;
}

type TabId = 'founders' | 'foundation' | 'ops' | 'perks' | 'design';

const TABS: { id: TabId; label: string }[] = [
  { id: 'founders', label: 'Profils' },
  { id: 'foundation', label: 'Fondation' },
  { id: 'ops', label: 'Deck Y1-Y5' },
  { id: 'perks', label: 'Perks' },
  { id: 'design', label: 'Design UI' },
];

function AdminStudioModal({ content, onChange, onClose }: AdminStudioModalProps) {
  const [tab, setTab] = useState<TabId>('founders');
  const [toast, setToast] = useState<string | null>(null);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [uiTheme, setUiTheme] = useState<UiTheme>(() => loadUiTheme());
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const handleThemeChange = (next: UiTheme) => {
    setUiTheme(next);
    publishUiTheme(next); // live on #app-shell
  };

  const persistTheme = (theme: UiTheme) => saveUiTheme(theme);

  const handleMasterStyleChange = (next: string) => {
    onChange({ ...content, masterStyleReference: next });
  };

  const handleSaveLocal = () => {
    saveContentOverride(content);
    persistTheme(uiTheme);
    flash('Contenu enregistré — actif immédiatement en jeu');
  };

  const handleExport = () => {
    const payload = { ...JSON.parse(buildExportPayload(content)), ui_theme: uiTheme };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game_content.json';
    a.click();
    URL.revokeObjectURL(url);
    flash('game_content.json exporté');
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedJson = JSON.parse(String(reader.result)) as Record<string, unknown>;
        if (parsedJson.ui_theme) {
          handleThemeChange(normalizeUiTheme(parsedJson.ui_theme));
        }
        const parsed = normalizeContent(parsedJson);
        onChange(parsed);
        flash('Contenu importé (non enregistré — pensez à Sauvegarder)');
      } catch (err) {
        flash(err instanceof Error ? err.message : 'Import impossible : JSON invalide');
      }
    };
    reader.readAsText(file);
  };

  const handleImportPaste = () => {
    const raw = window.prompt('Collez le JSON du contenu :');
    if (!raw) return;
    try {
      const parsedJson = JSON.parse(raw) as Record<string, unknown>;
      if (parsedJson.ui_theme) {
        handleThemeChange(normalizeUiTheme(parsedJson.ui_theme));
      }
      const parsed = normalizeContent(parsedJson);
      onChange(parsed);
      flash('Contenu importé (non enregistré — pensez à Sauvegarder)');
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Import impossible : JSON invalide');
    }
  };

  const handlePinValidate = (pin: string) => {
    writeAdminPin(pin);
    setPinModalOpen(false);
    flash('PIN administrateur mis à jour');
  };

  // Live mode collapses the full-screen studio into a floating bottom bar,
  // leaving the game board visible underneath. App swaps in a live game
  // screen so tweaks are previewed in real gameplay context.
  useEffect(() => {
    if (!liveMode) return;
    window.dispatchEvent(new Event('admin:live-mode'));
    return () => {
      window.dispatchEvent(new Event('admin:live-mode-exit'));
    };
  }, [liveMode]);

  if (liveMode) {
    return (
      <LiveInspector
        theme={uiTheme}
        onChange={handleThemeChange}
        onBackToStudio={() => setLiveMode(false)}
        onClose={() => setLiveMode(false)}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-x-hidden bg-corporate-abyss" role="dialog" aria-modal="true" aria-label="Studio d'édition du contenu">
      {/* Top nav — line 1: title + close, line 2: tabs grid */}
      <header className="shrink-0 overflow-x-hidden border-b border-corporate-edge px-2 py-1.5">
        <div className="flex items-center justify-between">
          <h1 className="font-press text-xs font-bold uppercase tracking-widest text-slate-200">Studio d'édition</h1>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le studio"
            className="rounded border border-corporate-line bg-corporate-panel p-1.5 text-slate-400 hover:border-slate-400 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-1.5 grid grid-cols-5 gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`truncate rounded border px-1.5 py-1 font-ui text-[10px] font-semibold transition-colors ${
                tab === t.id
                  ? 'border-slate-300 bg-corporate-edge text-slate-100'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Tab body */}
      <main className="min-h-0 flex-1 overflow-hidden px-3 pt-2">
            {tab === 'founders' && (
          <FoundersTab
            founders={content.founders}
            onChange={(i, next) => {
              const founders = content.founders.slice();
              founders[i] = next;
              onChange({ ...content, founders });
            }}
          />
        )}
        {tab === 'foundation' && (
          <FoundationTab
            cards={content.foundationCards}
            onChange={(id, next) =>
              onChange({
                ...content,
                foundationCards: content.foundationCards.map((c) => (c.id === id ? next : c)),
              })
            }
          />
        )}
        {tab === 'ops' && (
          <OpsTab
            cards={content.opsCards}
            onChange={(id, next) =>
              onChange({ ...content, opsCards: content.opsCards.map((c) => (c.id === id ? next : c)) })
            }
          />
        )}
        {tab === 'perks' && (
          <PerksTab
            perks={content.perks}
            onChange={(id, next) =>
              onChange({ ...content, perks: content.perks.map((p) => (p.id === id ? next : p)) })
            }
          />
        )}
            {tab === 'design' && (
              <DesignTab
                theme={uiTheme}
                onChange={(t) => {
                  handleThemeChange(t);
                  persistTheme(t);
                }}
                onEnterLiveMode={() => setLiveMode(true)}
                liveActive={liveMode}
                masterStyle={content.masterStyleReference}
                onMasterStyleChange={handleMasterStyleChange}
              />
            )}
      </main>

      {/* Bottom action bar */}
      <footer className="shrink-0 overflow-x-hidden border-t border-corporate-edge px-3 py-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSaveLocal}
            className="flex items-center gap-1.5 rounded border border-slate-400/60 bg-corporate-edge px-2.5 py-1.5 font-ui text-[11px] font-semibold text-slate-100 hover:bg-slate-700/40"
          >
            <Save className="h-3.5 w-3.5" /> Sauver
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded border border-corporate-line bg-corporate-panel px-2.5 py-1.5 font-ui text-[11px] text-slate-300 hover:border-slate-400"
          >
            <Download className="h-3.5 w-3.5" /> JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded border border-corporate-line bg-corporate-panel px-2.5 py-1.5 font-ui text-[11px] text-slate-300 hover:border-slate-400"
          >
            <Upload className="h-3.5 w-3.5" /> Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImportFile(f);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => setPinModalOpen(true)}
            className="ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-corporate-line bg-corporate-panel px-2.5 py-1.5 font-ui text-[11px] text-slate-300 hover:border-slate-400"
          >
            <KeyRound className="h-3.5 w-3.5" /> Modifier PIN
          </button>
        </div>
        <p className="mt-1 text-center font-ui text-[9px] uppercase tracking-widest text-slate-600">
          V{APP_VERSION.toUpperCase()} · STUDIO D'ÉDITION
        </p>
        {toast && (
          <p className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded border border-corporate-line bg-corporate-panel px-3 py-1.5 font-ui text-[11px] text-slate-200 shadow-lg">
            {toast}
          </p>
        )}
      </footer>

      {pinModalOpen && (
        <PinChangeModal onValidate={handlePinValidate} onClose={() => setPinModalOpen(false)} />
      )}
    </div>
  );
}

export default AdminStudioModal;
