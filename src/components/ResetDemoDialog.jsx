import { useId, useRef } from 'react';
import Dialog from './Dialog.jsx';
import { buttonStyles } from './styles.js';

// Confirms "Reset demo" (PRD FR2, NFR5). The safe choice, "Keep my data",
// has focus first, so pressing Enter by accident never wipes anything.
export default function ResetDemoDialog({ onConfirm, onClose }) {
  const id = useId();
  const keepRef = useRef(null);

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={keepRef} onClose={onClose} width="max-w-md">
      <div className="flex flex-col gap-4 p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          Reset to the demo project?
        </h2>
        <p className="text-sm text-ink">
          This replaces all tasks, user stories, links, team members and the project name in this browser with the demo project. This can't be
          undone.
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button ref={keepRef} type="button" onClick={onClose} className={buttonStyles.secondary}>
            Keep my data
          </button>
          <button type="button" onClick={onConfirm} className={buttonStyles.dangerSolid}>
            Reset to demo
          </button>
        </div>
      </div>
    </Dialog>
  );
}
