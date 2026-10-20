import { useEffect, useRef } from 'react';

// Shared shell for every dialog. It uses the browser's native <dialog>, which
// handles the hard accessibility parts for us: focus stays inside the dialog,
// the page behind it can't be reached, and Escape closes it.
// `initialFocusRef` is the control to focus when it opens.
export default function Dialog({ labelledBy, initialFocusRef, onClose, width = 'max-w-xl', children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocusTo = document.activeElement;
    dialog.showModal();
    initialFocusRef?.current?.focus();

    return () => {
      dialog.close();
      restoreFocus(returnFocusTo);
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
      className={`w-[calc(100%-2rem)] ${width} rounded-xl bg-surface-card p-0 text-ink shadow-xl backdrop:bg-ink/60`}
    >
      {children}
    </dialog>
  );
}

// Put focus back where it was (a card, or the button that opened the dialog).
// If the card moved to another column it's a new element, so find it by task
// id; if the task was deleted, fall back to the board.
function restoreFocus(element) {
  if (element?.isConnected) {
    element.focus();
    return;
  }
  const taskId = element?.dataset?.taskId;
  const movedCard = taskId && document.querySelector(`[data-task-id="${CSS.escape(taskId)}"]`);
  (movedCard || document.getElementById('board'))?.focus();
}
