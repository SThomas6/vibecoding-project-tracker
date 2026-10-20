import { useRef } from 'react';
import { ClipboardPaste, Copy } from 'lucide-react';
import { CONTEXT_MAX_LENGTH } from '../constants.js';
import { readClipboardText } from '../lib/clipboard.js';
import { timeAgo } from '../lib/dates.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// The handoff for the next developer (M12 secret sauce). Instead of logging
// every prompt by hand, the outgoing developer pastes in one handoff text, such
// as the summary their AI agent wrote at the end of a session. Whoever picks
// the task up reads it here (and on the card) and copies it straight into their
// own AI agent. It's a plain textarea, so pasted code is never run (NFR12).
export default function HandoffFields({ id, text, updatedAt, onSetText, onCopy, onNotify }) {
  const textRef = useRef(null);

  async function paste() {
    const clipboard = await readClipboardText();
    if (!clipboard) {
      textRef.current?.focus();
      onNotify('Press Ctrl+V (⌘V on a Mac) in the handoff box to paste.');
      return;
    }
    onSetText(clipboard.slice(0, CONTEXT_MAX_LENGTH));
    textRef.current?.focus();
    onNotify('Handoff pasted. Save changes to keep it.');
  }

  function copy() {
    if (!text.trim()) {
      textRef.current?.focus();
      onNotify('Paste or write a handoff first.');
      return;
    }
    onCopy();
  }

  return (
    <section aria-labelledby={`${id}-handoff-heading`} className="flex flex-col gap-3 border-t border-line pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={`${id}-handoff-heading`} className="text-base font-semibold text-ink">
          Handoff for the next developer
        </h3>
        <p className="text-sm text-ink-muted">
          {updatedAt ? (
            <>
              Last updated <time dateTime={updatedAt}>{timeAgo(updatedAt)}</time>
            </>
          ) : (
            'No handoff yet'
          )}
        </p>
      </div>
      <div>
        <label htmlFor={`${id}-handoff`} className={labelStyles}>
          Handoff text
        </label>
        <p id={`${id}-handoff-hint`} className="mt-1 text-sm text-ink-muted">
          Paste the handoff your AI agent wrote, or write what's done, what's left and any blockers. The next
          developer copies it into their own AI agent.
        </p>
        <textarea
          id={`${id}-handoff`}
          ref={textRef}
          rows={8}
          maxLength={CONTEXT_MAX_LENGTH}
          value={text}
          onChange={(event) => onSetText(event.target.value)}
          aria-describedby={`${id}-handoff-hint`}
          className={`${inputStyles} py-2 font-mono leading-relaxed`}
        />
      </div>
      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={paste} className={buttonStyles.secondary}>
          <ClipboardPaste aria-hidden="true" className="h-4 w-4" />
          Paste from clipboard
        </button>
        <button type="button" onClick={copy} className={buttonStyles.secondary}>
          <Copy aria-hidden="true" className="h-4 w-4" />
          Copy handoff
        </button>
      </div>
    </section>
  );
}
