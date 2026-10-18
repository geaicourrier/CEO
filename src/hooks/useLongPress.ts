import { useRef } from 'react';

/**
 * Calls `onLongPress` after `delay` ms of continuous pointer-down; cancels on
 * release/leave/move. The click that follows a completed long-press is swallowed
 * so both actions never fire from a single gesture.
 */
export function useLongPress(onLongPress: () => void, delay = 800) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);

  const start = () => {
    fired.current = false;
    timer.current = setTimeout(() => {
      fired.current = true;
      onLongPress();
    }, delay);
  };
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  return {
    onPointerDown: (e: React.PointerEvent) => {
      // Only primary button / touch; ignore right-clicks.
      if (e.button === 2) return;
      start();
    },
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerMove: (e: React.PointerEvent) => {
      // Cancel if the pointer moves more than a small slop (a scroll, not a hold).
      if (Math.abs(e.movementX) > 8 || Math.abs(e.movementY) > 8) cancel();
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (fired.current) {
        e.preventDefault();
        e.stopPropagation();
        fired.current = false;
      }
    },
  };
}
