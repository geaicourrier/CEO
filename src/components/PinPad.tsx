import { useEffect, useRef, useState } from 'react';
import { Delete, X } from 'lucide-react';

interface PinPadProps {
  onUnlock: () => void;
  onClose: () => void;
}

const PIN_KEY = 'admin_pin';
const DEFAULT_PIN = '2506';

export function readAdminPin(): string {
  try {
    return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function writeAdminPin(pin: string): void {
  try {
    localStorage.setItem(PIN_KEY, pin);
  } catch {
    // Storage unavailable — PIN change is session-only.
  }
}

function PinPad({ onUnlock, onClose }: PinPadProps) {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        push(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        backspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        validateRef.current?.(entry);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const push = (digit: string) => {
    setError(false);
    setEntry((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + digit;
      if (next.length === 4) {
        timer.current = setTimeout(() => validate(next), 120);
      }
      return next;
    });
  };

  const backspace = () => {
    setError(false);
    setEntry((prev) => prev.slice(0, -1));
  };

  const validate = (code: string) => {
    if (code === readAdminPin()) onUnlock();
    else {
      setError(true);
      setTimeout(() => setEntry(''), 450);
    }
  };

  const validateRef = useRef(validate);
  validateRef.current = validate;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-corporate-abyss/95 p-4" role="dialog" aria-modal="true" aria-label="Accès administrateur">
      <div className={`w-full max-w-[260px] rounded-lg border border-corporate-line bg-corporate-panel p-4 shadow-2xl ${error ? 'animate-pin-shake' : ''}`}>
        <div className="flex items-center justify-between">
          <span className="font-press text-xs font-bold uppercase tracking-widest text-slate-400">Accès Admin</span>
          <button type="button" onClick={onClose} aria-label="Fermer" className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2.5" aria-label="Code saisi">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded border font-press text-lg transition-colors duration-150 ${
                error
                  ? 'border-red-500/60 text-red-400'
                  : entry.length > i
                    ? 'border-slate-300 bg-corporate-edge text-slate-100'
                    : 'border-corporate-line bg-corporate-abyss text-slate-700'
              }`}
            >
              {entry.length > i ? '•' : ''}
            </span>
          ))}
        </div>
        <p className={`mt-2 text-center font-ui text-[10px] uppercase tracking-widest ${error ? 'text-red-400' : 'text-slate-600'}`}>
          {error ? 'Code refusé' : 'Code à 4 chiffres'}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                if (k === 'C') setEntry('');
                else if (k === '⌫') backspace();
                else push(k);
              }}
              className="flex h-11 items-center justify-center rounded border border-corporate-line bg-corporate-abyss font-press text-base text-slate-200 transition-all duration-100 hover:border-slate-400 active:scale-95"
            >
              {k === '⌫' ? <Delete className="h-4 w-4" aria-label="Effacer" /> : k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PinPad;
