import { useEffect, useState } from 'react';
import { Briefcase, Play, RotateCcw, ScrollText, X } from 'lucide-react';
import { APP_VERSION, phaseLabel } from '@/game/constants';
import { loadRun } from '@/game/save';
import { useLongPress } from '@/hooks/useLongPress';
import { requestAdminOpen } from './AdminGate';
import { useLanguage } from '@/i18n/LanguageContext';

interface StartScreenProps {
  onStartNew: () => void;
  onResume: (consumedCardIds: string[]) => void;
}

type ModalKind = 'rules' | 'confirmNew' | null;

const MENU_ITEMS = ['continue', 'new', 'rules'] as const;
type MenuItem = (typeof MENU_ITEMS)[number];

function StartScreen({ onStartNew, onResume }: StartScreenProps) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(() => loadRun());
  const [modal, setModal] = useState<ModalKind>(null);
  const [highlight, setHighlight] = useState<MenuItem>('new');

  // Re-check the save when regaining focus (e.g. returning from a surrendered run).
  useEffect(() => {
    const sync = () => setSaved(loadRun());
    window.addEventListener('focus', sync);
    return () => window.removeEventListener('focus', sync);
  }, []);

  const items: MenuItem[] = [
    ...(saved ? (['continue'] as const) : []),
    'new' as const,
    'rules' as const,
  ];

  const adminLongPress = useLongPress(requestAdminOpen, 800);

  const activate = (item: MenuItem) => {
    if (item === 'continue' && saved) onResume(saved.consumedCardIds);
    else if (item === 'new') {
      if (loadRun()) setModal('confirmNew');
      else onStartNew();
    } else if (item === 'rules') setModal('rules');
  };

  // Keyboard: ↑/↓ highlight, Enter validate, shortcuts on menus.
  useEffect(() => {
    if (modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const idx = items.indexOf(highlight);
        const dir = e.key === 'ArrowUp' ? -1 : 1;
        setHighlight(items[(idx + dir + items.length) % items.length]);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(highlight);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight, modal, items.join(','), saved]);

  const labelFor = (item: MenuItem) =>
    item === 'continue' ? t('menu.continue') : item === 'new' ? t('menu.new') : t('menu.rules');

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-4" aria-label="Menu principal">
      {/* Title block */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-corporate-line bg-corporate-panel shadow-[0_0_32px_rgba(59,130,246,0.15)]">
          <Briefcase className="h-8 w-8 text-gauge-board" aria-hidden="true" />
        </div>
        <h1 className="font-press text-2xl font-bold leading-tight text-slate-100 sm:text-3xl">
          C.E.O.
        </h1>
        <p className="mt-1 font-press text-sm italic tracking-wide text-slate-400 sm:text-base">
          Corporate Emergency Odyssey
        </p>
        <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-500">
          {t('app.tagline')}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex w-full max-w-xs flex-col gap-2" aria-label={t('menu.options')}>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => activate(item)}
            onMouseEnter={() => setHighlight(item)}
            aria-current={highlight === item}
            {...(item === 'rules' ? adminLongPress : {})}
            className={`flex items-center justify-between rounded border px-4 py-3 font-ui text-sm font-semibold transition-all duration-150 ${
              highlight === item
                ? 'border-slate-300 bg-corporate-edge text-slate-100 shadow-[0_0_0_2px_rgba(148,163,184,0.3)]'
                : 'border-corporate-line bg-corporate-panel text-slate-300 hover:border-slate-400'
            }`}
          >
            <span>{labelFor(item)}</span>
            {item === 'continue' && <Play className="h-4 w-4" aria-hidden="true" />}
            {item === 'new' && <RotateCcw className="h-4 w-4" aria-hidden="true" />}
            {item === 'rules' && <ScrollText className="h-4 w-4" aria-hidden="true" />}
          </button>
        ))}
      </nav>

      {/* Saved-run summary */}
      {saved && (
        <p className="text-center font-ui text-[11px] text-slate-500">
          Sauvegarde : {phaseLabel(saved.year, saved.quarter)} • {saved.quartersSurvived} trimestre
          {saved.quartersSurvived > 1 ? 's' : ''} survécu{saved.quartersSurvived > 1 ? 's' : ''}
        </p>
      )}

      <span className="font-ui text-[10px] tabular-nums text-slate-600">v{APP_VERSION}</span>

      {/* Modals */}
      {modal === 'confirmNew' && (
        <Modal title={t('menu.confirmNew.title')} onClose={() => setModal(null)}>
          <p className="text-sm leading-relaxed text-slate-300">
            {t('menu.confirmNew.body')}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded border border-corporate-line bg-corporate-panel px-3 py-2 font-ui text-sm text-slate-300 hover:border-slate-400"
            >
              {t('menu.confirmNew.cancel')}
            </button>
            <button
              type="button"
              onClick={() => {
                setModal(null);
                onStartNew();
              }}
              className="rounded border border-red-500/50 bg-red-500/10 px-3 py-2 font-ui text-sm font-semibold text-red-300 hover:bg-red-500/20"
            >
              {t('menu.confirmNew.confirm')}
            </button>
          </div>
        </Modal>
      )}

      {modal === 'rules' && (
        <Modal title={t('rules.title')} onClose={() => setModal(null)}>
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-300">
            <li>
              <strong className="text-slate-100">{t('rules.objective')} :</strong>{' '}
              {t('rules.objectiveBody')}
            </li>
            <li>
              <strong className="text-slate-100">{t('rules.gauges')} :</strong>{' '}
              {t('rules.gaugesBody')}
            </li>
            <li>
              <strong className="text-slate-100">{t('rules.controls')} :</strong>{' '}
              {t('rules.controlsBody')}
            </li>
            <li>
              <strong className="text-slate-100">{t('rules.pause')} :</strong>{' '}
              {t('rules.pauseBody')}
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  const { t } = useLanguage();
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

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-corporate-abyss/90 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-sm rounded-lg border border-corporate-line bg-corporate-panel p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-press text-base font-bold text-slate-100">{title}</h2>
          <button type="button" onClick={onClose} aria-label={t('common.close')} className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

export default StartScreen;
