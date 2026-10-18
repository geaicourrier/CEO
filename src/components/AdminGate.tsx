import { useCallback, useEffect, useState } from 'react';
import PinPad from './PinPad';
import AdminStudioModal from './admin/AdminStudioModal';
import { getActiveContent } from '@/game/contentStore';
import type { GameContent } from '@/game/content';

export const ADMIN_OPEN_EVENT = 'admin:open';
export const CONTENT_SAVED_EVENT = 'admin:content-saved';
export const ADMIN_LIVE_EVENT = 'admin:live-mode';
export const ADMIN_LIVE_EXIT_EVENT = 'admin:live-mode-exit';

/** Opens the admin gate (PIN pad) when dispatched from any long-press trigger. */
export function requestAdminOpen() {
  window.dispatchEvent(new Event(ADMIN_OPEN_EVENT));
}

/**
 * Top-level gate: long-press triggers request `admin:open`; the PIN pad must be
 * cleared before the Admin Studio mounts.
 */
function AdminGate() {
  const [stage, setStage] = useState<'closed' | 'pin' | 'studio'>('closed');
  const [content, setContent] = useState<GameContent>(() => getActiveContent());

  useEffect(() => {
    const open = () => setStage('pin');
    window.addEventListener(ADMIN_OPEN_EVENT, open);
    return () => window.removeEventListener(ADMIN_OPEN_EVENT, open);
  }, []);

  const unlock = useCallback(() => {
    setContent(getActiveContent());
    setStage('studio');
  }, []);

  if (stage === 'closed') return null;

  if (stage === 'pin') {
    return <PinPad onUnlock={unlock} onClose={() => setStage('closed')} />;
  }

  return (
    <AdminStudioModal
      content={content}
      onChange={setContent}
      onReset={() => setContent(getActiveContent())}
      onClose={() => setStage('closed')}
    />
  );
}

export default AdminGate;
