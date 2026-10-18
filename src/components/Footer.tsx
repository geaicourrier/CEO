import { APP_VERSION } from '@/game/constants';
import { useLongPress } from '@/hooks/useLongPress';
import { requestAdminOpen } from './AdminGate';

function Footer() {
  const longPress = useLongPress(requestAdminOpen, 800);

  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-corporate-edge bg-corporate-abyss px-3 py-1 sm:px-6">
      <span className="font-ui text-[10px] tabular-nums text-slate-600">v{APP_VERSION}</span>
      <nav className="flex items-center gap-3" aria-label="Legal and rules">
        <button
          type="button"
          className="font-ui text-[10px] text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
          {...longPress}
        >
          Règles
        </button>
        <button type="button" className="font-ui text-[10px] text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline">
          Mentions légales
        </button>
      </nav>
    </footer>
  );
}

export default Footer;
