import { useRef } from 'react';
import { ClipboardPaste, Copy, KeyRound, MessageSquareQuote } from 'lucide-react';
import { HANDOFF_TEXT_MAX_LENGTH } from '../constants.js';
import { readClipboardText } from '../lib/clipboard.js';
import { formatDateTime, timeAgo } from '../lib/dates.js';
import { getMember } from '../lib/team.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// The handoff for the next developer (PRD FR15, FR17, FR22: the secret sauce).
// Instead of logging every prompt by hand, the outgoing developer pastes in one
// handoff text, such as the summary their AI agent wrote at the end of a
// session, with any logs or traces. Whoever picks the task up reads it here
// (and on the card) and copies it straight into their own AI agent. It's a
// plain textarea, so pasted code is never run (NFR12).
export default function HandoffFields({ id, text, updatedAt, handoffs = [], team = [], onSetText, onCopy, onNotify }) {
  const textRef = useRef(null);

  async function paste() {
    const clipboard = await readClipboardText();
    if (!clipboard) {
      textRef.current?.focus();
      onNotify('Press Ctrl+V (⌘V on a Mac) in the handoff box to paste.');
      return;
    }
    onSetText(clipboard.slice(0, HANDOFF_TEXT_MAX_LENGTH));
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
      {handoffs.length > 0 && (
        <div className="rounded-lg border border-line bg-surface-sunken p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <MessageSquareQuote aria-hidden="true" className="h-4 w-4 text-brand" />
            Handoff history ({handoffs.length})
          </p>
          <ol className="mt-2 flex flex-col gap-1.5 text-xs text-ink-muted">
            {[...handoffs].reverse().map((item) => (
              <li key={item.id} className="rounded bg-surface-card px-2.5 py-1.5 text-ink">
                <span className="font-semibold">
                  {getMember(team, item.from)?.name ?? 'Unassigned'} → {getMember(team, item.to)?.name ?? 'Unassigned'}
                </span>{' '}
                <time dateTime={item.at} className="text-ink-muted">
                  ({formatDateTime(item.at)})
                </time>
                {item.note && <p className="mt-0.5 text-ink">{item.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <label htmlFor={`${id}-handoff`} className={labelStyles}>
          Handoff text
        </label>
        <p id={`${id}-handoff-hint`} className="mt-1 text-sm text-ink-muted">
          Paste the handoff your AI agent wrote, or write what's done, what's left and any blockers, plus any logs
          or traces. The next developer copies it into their own AI agent.
        </p>
        <textarea
          id={`${id}-handoff`}
          ref={textRef}
          rows={8}
          maxLength={HANDOFF_TEXT_MAX_LENGTH}
          value={text}
          onChange={(event) => onSetText(event.target.value)}
          aria-describedby={`${id}-handoff-hint ${id}-handoff-secrets`}
          className={`${inputStyles} py-2 font-mono leading-relaxed`}
        />
        <p id={`${id}-handoff-secrets`} className="mt-1.5 flex items-start gap-1.5 text-sm text-ink-muted">
          <KeyRound aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          Never paste passwords, API keys or tokens. The handoff is saved in this browser and copied into AI chats.
        </p>
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
