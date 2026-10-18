import { useEffect, useState } from 'react';
import { Delete, X } from 'lucide-react';

interface PinChangeModalProps {
  onValidate: (pin: string) => void;
  onClose: () => void;
}

/** Centered pop-up to set a new 4-digit admin PIN with a virtual keypad. */
function PinChangeModal({ onValidate, onClose }: PinChangeModalProps) {
  const [entry, setEntry] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        setEntry((prev) => (prev.length >= 4 ? prev : prev + e.key));
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        setEntry((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-corporate-abyss/90 p-4" role="dialog" aria-modal="true" aria-label="Modifier le PIN">
      <div className="w-full max-w-[260px] rounded-lg border border-corporate-line bg-corporate-panel p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="font-press text-xs font-bold uppercase tracking-widest text-slate-300">Modifier PIN</span>
          <button type="button" onClick={onClose} aria-label="Annuler" className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2.5" aria-label="Nouveau code">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded border font-press text-lg ${
                entry.length > i
                  ? 'border-slate-300 bg-corporate-edge text-slate-100'
                  : 'border-corporate-line bg-corporate-abyss text-slate-700'
              }`}
            >
              {entry.length > i ? '•' : ''}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center font-ui text-[10px] uppercase tracking-widest text-slate-600">Code à 4 chiffres</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                if (k === 'C') setEntry('');
                else if (k === '⌫') setEntry((prev) => prev.slice(0, -1));
                else setEntry((prev) => (prev.length >= 4 ? prev : prev + k));
              }}
              className="flex h-11 items-center justify-center rounded border border-corporate-line bg-corporate-abyss font-press text-base text-slate-200 transition-all duration-100 hover:border-slate-400 active:scale-95"
            >
              {k === '⌫' ? <Delete className="h-4 w-4" aria-label="Effacer" /> : k}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded border border-corporate-line bg-corporate-abyss px-2 py-1.5 font-ui text-[11px] text-slate-300 hover:border-slate-400"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={entry.length !== 4}
            onClick={() => onValidate(entry)}
            className="flex-1 rounded border border-slate-400/60 bg-corporate-edge px-2 py-1.5 font-ui text-[11px] font-semibold text-slate-100 hover:bg-slate-700/40 disabled:opacity-40"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default PinChangeModal;
