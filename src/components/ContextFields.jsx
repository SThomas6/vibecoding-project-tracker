import { KeyRound } from 'lucide-react';
import { AI_TOOLS, CONTEXT_MAX_LENGTH } from '../constants.js';
import { timeAgo } from '../lib/dates.js';
import { inputStyles, labelStyles } from './styles.js';

// The task's AI context (M9, PRD FR15–FR17): the prompts, replies, logs and
// next steps someone needs to pick the task up without starting from scratch.
// It's a plain textarea, so pasted code or HTML is shown as text and never
// run (NFR12).
export default function ContextFields({ id, context, tool, updatedAt, onChange }) {
  return (
    <section aria-labelledby={`${id}-context-heading`} className="flex flex-col gap-4 border-t border-line pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={`${id}-context-heading`} className="text-base font-semibold text-ink">
          Context
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

      <div>
        <label htmlFor={`${id}-context`} className={labelStyles}>
          Context notes <span className="font-normal text-ink-muted">(Markdown)</span>
        </label>
        <p id={`${id}-context-hint`} className="mt-1 text-sm text-ink-muted">
          Prompts, AI replies, logs and what to do next, so whoever picks this up isn't starting from scratch.
        </p>
        <textarea
          id={`${id}-context`}
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

      <div className="sm:w-1/2">
        <label htmlFor={`${id}-tool`} className={labelStyles}>
          AI tool used
        </label>
        <select id={`${id}-tool`} value={tool} onChange={onChange('contextTool')} className={inputStyles}>
          <option value="">Not recorded</option>
          {AI_TOOLS.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
