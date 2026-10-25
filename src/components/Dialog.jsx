import { useEffect, useRef } from 'react';

// On short screens (a phone on its side) dialogs may use almost the full height.
const SHORT_SCREEN = '[@media(max-height:500px)]:max-h-[calc(100dvh-1rem)]';

// Shared shell for every dialog. It uses the browser's native <dialog>, which
// handles the hard accessibility parts for us: focus stays inside the dialog,
// the page behind it can't be reached, and Escape closes it.
// `initialFocusRef` is the control to focus when it opens, and
// `fallbackFocusRef` the one to return to if the opener is gone when it
// closes (after a delete, say). `onClose` runs
// when Escape is pressed; `onClosed` (default `onClose`) runs if the browser
// closes the dialog by itself, which Chrome does on a repeated Escape, so the
// app's state never says a dialog is open when it isn't.
// The backdrop is a fixed dark tint rather than the ink token, which turns
// near-white in Dark mode and would wash the page out instead of dimming it.
export default function Dialog({ labelledBy, initialFocusRef, fallbackFocusRef, onClose, onClosed = onClose, width = 'max-w-xl', children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocusTo = document.activeElement;
    dialog.showModal();
    initialFocusRef?.current?.focus();

    return () => {
      dialog.close();
      restoreFocus(returnFocusTo, fallbackFocusRef?.current);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        // Escape key: let React close the dialog so state stays in sync.
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        // Ignore a late close event if the dialog is open again (React's
        // development mode opens it, closes it and opens it again).
        if (!dialogRef.current?.open) onClosed();
      }}
      className={`w-[calc(100%-2rem)] ${width} rounded-xl bg-surface-card p-0 text-ink shadow-xl backdrop:bg-[rgb(15_23_42/0.6)] ${SHORT_SCREEN}`}
    >
      {children}
    </dialog>
  );
}

// Put focus back where it was (a card, or the button that opened the dialog).
// If the card moved to another column it's a new element, so find it by task
// id; if the task was deleted, fall back to the given control or the board.
// A card can be half under the bar of column links, so it's brought fully into
// view (WCAG 2.4.11).
function restoreFocus(element, fallback) {
  const taskId = element?.dataset?.taskId;
  const target = element?.isConnected
    ? element
    : (taskId && document.querySelector(`[data-task-id="${CSS.escape(taskId)}"]`)) || fallback || document.getElementById('board');
  target?.focus();
  if (taskId) target?.scrollIntoView({ block: 'nearest' });
}
