import { useEffect, useId, useRef } from 'react';
import Dialog from './Dialog.jsx';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Shown when the browser blocks copying (M10, PRD FR18): the briefing is
// selected in a read-only box, so it can still be copied with the keyboard.
export default function CopyFallbackDialog({ text, onClose }) {
  const id = useId();
  const textRef = useRef(null);

  // Runs after Dialog has opened and focused the box.
  useEffect(() => {
    textRef.current.select();
  }, []);

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={textRef} onClose={onClose}>
      <div className="flex flex-col gap-4 p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          Copy the context
        </h2>
        <p id={`${id}-hint`} className="text-sm text-ink-muted">
          Your browser blocked automatic copying. The briefing is selected below: press Ctrl+C (⌘C on a Mac) to
          copy it, then paste it into your AI tool.
        </p>
        <div>
          <label htmlFor={`${id}-text`} className={labelStyles}>
            Briefing
          </label>
          <textarea
            id={`${id}-text`}
            ref={textRef}
            readOnly
            rows={12}
            value={text}
            aria-describedby={`${id}-hint`}
            className={`${inputStyles} py-2 font-mono`}
          />
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className={buttonStyles.primary}>
            Done
          </button>
        </div>
      </div>
    </Dialog>
  );
}
