import { useEffect, useState } from 'react';
import { Play, Save, Flag, X } from 'lucide-react';

interface InGameMenuProps {
  onResume: () => void;
  onSaveAndExit: () => void;
  onSurrender: () => void;
}

type ModalView = 'menu' | 'confirmSurrender';

function InGameMenu({ onResume, onSaveAndExit, onSurrender }: InGameMenuProps) {
  const [view, setView] = useState<ModalView>('menu');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        if (view === 'menu') onResume();
        else setView('menu');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onResume, view]);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-corporate-abyss/90 p-4" role="dialog" aria-modal="true" aria-label="Menu pause">
      <div className="w-full max-w-sm rounded-lg border border-corporate-line bg-corporate-panel p-5 shadow-xl">
        {view === 'menu' ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-press text-base font-bold text-slate-100">Pause</h2>
              <button type="button" onClick={onResume} aria-label="Fermer" className="text-slate-500 hover:text-slate-300">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={onResume}
                className="flex items-center justify-between rounded border border-corporate-line bg-corporate-edge px-4 py-3 font-ui text-sm font-semibold text-slate-100 transition-colors hover:border-slate-400"
              >
                <span>Reprendre</span>
                <Play className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onSaveAndExit}
                className="flex items-center justify-between rounded border border-corporate-line bg-corporate-panel px-4 py-3 font-ui text-sm font-semibold text-slate-300 transition-colors hover:border-slate-400"
              >
                <span>Sauvegarder et Quitter</span>
                <Save className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView('confirmSurrender')}
                className="flex items-center justify-between rounded border border-red-500/40 bg-red-500/5 px-4 py-3 font-ui text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/15"
              >
                <span>Abandonner la partie</span>
                <Flag className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-slate-600">
              Échap ou P pour reprendre
            </p>
          </>
        ) : (
          <>
            <h2 className="font-press text-base font-bold text-slate-100">Abandonner ?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              La partie en cours sera définitivement effacée. Confirmer l'abandon ?
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setView('menu')}
                className="rounded border border-corporate-line bg-corporate-panel px-3 py-2 font-ui text-sm text-slate-300 hover:border-slate-400"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={onSurrender}
                className="rounded border border-red-500/50 bg-red-500/10 px-3 py-2 font-ui text-sm font-semibold text-red-300 hover:bg-red-500/20"
              >
                Abandonner
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InGameMenu;
