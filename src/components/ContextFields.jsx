import { useRef, useState } from 'react';
import { ClipboardPaste, Copy, KeyRound, MessageSquareQuote } from 'lucide-react';
import { AI_TOOLS, CONTEXT_MAX_LENGTH, PROMPT_MODES } from '../constants.js';
import { readClipboardText } from '../lib/clipboard.js';
import { formatDateTime, timeAgo } from '../lib/dates.js';
import { cleanContext } from '../lib/tasks.js';
import { getMember } from '../lib/team.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// The task's AI context (M9, PRD FR15–FR18): the prompts, replies, handoff
// trail, TACO prompt mode and one-click AI reply paste-back so whoever picks
// the task up isn't starting from scratch. It's a plain textarea, so pasted
// code or HTML is shown as text and never run (NFR12).
export default function ContextFields({
  id,
  context,
  tool,
  handoffs = [],
  team = [],
  updatedAt,
  onChange,
  onSetContext,
  onCopy,
  onNotify,
}) {
  const [modeId, setModeId] = useState('continue');
  const contextRef = useRef(null);

  async function pasteAiReply() {
    const text = await readClipboardText();
    if (!text) {
      contextRef.current?.focus();
      onNotify?.('Press Ctrl+V (⌘V on a Mac) inside Context notes to paste your AI reply.');
      return;
    }
    const existing = cleanContext(context);
    const stamp = formatDateTime(new Date().toISOString());
    const block = `## AI session update (${stamp})\n${text}`;
    const next = existing ? `${existing}\n\n${block}`.slice(0, CONTEXT_MAX_LENGTH) : block.slice(0, CONTEXT_MAX_LENGTH);
    onSetContext(next);
    contextRef.current?.focus();
    onNotify?.('AI reply appended to context notes');
  }

  return (
    <section aria-labelledby={`${id}-context-heading`} className="flex flex-col gap-4 border-t border-line pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={`${id}-context-heading`} className="text-base font-semibold text-ink">
          Context &amp; AI handoff
        </h3>
        <p className="text-sm text-ink-muted">
          {updatedAt ? (
            <>
              Last updated <time dateTime={updatedAt}>{timeAgo(updatedAt)}</time>
            </>
          ) : (
            'No context saved yet'
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
            {[...handoffs].reverse().map((item) => {
              const from = getMember(team, item.from)?.name ?? 'Unassigned';
              const to = getMember(team, item.to)?.name ?? 'Unassigned';
              return (
                <li key={item.id} className="rounded bg-surface-card px-2.5 py-1.5 text-ink">
                  <span className="font-semibold">
                    {from} → {to}
                  </span>{' '}
                  <time dateTime={item.at} className="text-ink-muted">
                    ({formatDateTime(item.at)})
                  </time>
                  {item.note && <p className="mt-0.5 text-ink">{item.note}</p>}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={`${id}-context`} className={labelStyles}>
            Context notes <span className="font-normal text-ink-muted">(Markdown)</span>
          </label>
          <button
            type="button"
            onClick={pasteAiReply}
            className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand hover:bg-surface-sunken"
          >
            <ClipboardPaste aria-hidden="true" className="h-3.5 w-3.5" />
            Paste AI reply from clipboard
          </button>
        </div>
        <p id={`${id}-context-hint`} className="mt-1 text-sm text-ink-muted">
          Prompts, AI replies, logs and what to do next, so whoever picks this up isn't starting from scratch.
        </p>
        <textarea
          id={`${id}-context`}
          ref={contextRef}
          rows={10}
          maxLength={CONTEXT_MAX_LENGTH}
          value={context}
          onChange={onChange('context')}
          aria-describedby={`${id}-context-hint ${id}-context-secrets`}
          className={`${inputStyles} py-2 font-mono leading-relaxed`}
        />
        <p id={`${id}-context-secrets`} className="mt-1.5 flex items-start gap-1.5 text-sm text-ink-muted">
          <KeyRound aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          Never paste passwords, API keys or tokens. Context is saved in this browser and copied into AI chats.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-tool`} className={labelStyles}>
            AI tool used
          </label>
          <select id={`${id}-tool`} value={tool} onChange={onChange('contextTool')} className={inputStyles}>
            <option value="">Not recorded</option>
            {AI_TOOLS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-mode`} className={labelStyles}>
            Prompt goal (TACO structure)
          </label>
          <select
            id={`${id}-mode`}
            value={modeId}
            onChange={(event) => setModeId(event.target.value)}
            className={inputStyles}
          >
            <option value="">Plain briefing (no TACO wrapper)</option>
            {PROMPT_MODES.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        {/* Copies what's on screen, including unsaved changes and the TACO prompt mode (M10). */}
        <button type="button" onClick={() => onCopy(modeId || null)} className={buttonStyles.secondary}>
          <Copy aria-hidden="true" className="h-4 w-4" />
          Copy context
        </button>
      </div>
    </section>
  );
}
