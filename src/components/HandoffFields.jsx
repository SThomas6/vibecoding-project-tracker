import { useRef, useState } from 'react';
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
// Text past the limit is cut off, so say so rather than lose it silently,
// and show the count once the box is nearly full (PRD DR4, NFR7).
const LIMIT = HANDOFF_TEXT_MAX_LENGTH.toLocaleString('en-GB');
const CUT_MESSAGE = `Only the first ${LIMIT} characters fit, so the end of what you pasted was left out.`;

export default function HandoffFields({ id, text, updatedAt, handoffs = [], team = [], onSetText, onCopy }) {
  const textRef = useRef(null);
  const nearLimit = text.length >= HANDOFF_TEXT_MAX_LENGTH * 0.9;
  // Instructions and warnings about the box stay beside it (and are read out)
  // until the next edit, rather than vanishing with a toast.
  const [notice, setNotice] = useState('');

  async function paste() {
    const clipboard = await readClipboardText();
    textRef.current?.focus();
    if (!clipboard) {
      setNotice('Your browser didn\'t allow pasting from here. Press Ctrl+V (⌘V on a Mac) in the box instead.');
      return;
    }
    onSetText(clipboard.slice(0, HANDOFF_TEXT_MAX_LENGTH));
    setNotice(clipboard.length > HANDOFF_TEXT_MAX_LENGTH ? CUT_MESSAGE : 'Handoff pasted. Save changes to keep it.');
  }

  // Pasting with Ctrl+V: the browser cuts the text to fit, so warn if it will
  // (after the paste's own change has cleared any older message).
  function checkPaste(event) {
    const box = event.currentTarget;
    const room = HANDOFF_TEXT_MAX_LENGTH - text.length + (box.selectionEnd - box.selectionStart);
    if (event.clipboardData.getData('text').length > room) setTimeout(() => setNotice(CUT_MESSAGE), 0);
  }

  function copy() {
    if (!text.trim()) {
      textRef.current?.focus();
      setNotice('Paste or write a handoff first.');
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
          Paste the handoff your AI agent wrote, or write what's done, what's left, the prompts that worked and any
          logs or traces. The next developer copies it into their own AI agent.
        </p>
        <textarea
          id={`${id}-handoff`}
          ref={textRef}
          rows={8}
          maxLength={HANDOFF_TEXT_MAX_LENGTH}
          value={text}
          onChange={(event) => {
            onSetText(event.target.value);
            setNotice('');
          }}
          onPaste={checkPaste}
          aria-describedby={`${id}-handoff-hint ${id}-handoff-secrets${nearLimit ? ` ${id}-handoff-count` : ''}`}
          className={`${inputStyles} py-2 font-mono leading-relaxed`}
        />
        <p role="status" className={notice ? 'mt-1.5 text-sm font-medium text-ink' : 'sr-only'}>
          {notice}
        </p>
        {nearLimit && (
          <p id={`${id}-handoff-count`} className="mt-1.5 text-sm font-medium text-ink">
            {text.length.toLocaleString('en-GB')} of {LIMIT} characters used
          </p>
        )}
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
