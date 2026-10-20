import { useRef, useState } from 'react';
import { CircleCheck, CircleDot, CircleX, Plus, Trash2 } from 'lucide-react';
import { AI_TOOLS, PROMPT_OUTCOMES } from '../constants.js';
import { formatDateTime } from '../lib/dates.js';
import { newId } from '../lib/tasks.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Each outcome has its own icon and words as well as a colour (NFR2).
const OUTCOME_STYLES = {
  worked: { Icon: CircleCheck, className: 'bg-due-safe-tint text-due-safe' },
  partly: { Icon: CircleDot, className: 'bg-due-warning-tint text-due-warning' },
  failed: { Icon: CircleX, className: 'bg-danger-tint text-danger' },
};

const EMPTY_DRAFT = { prompt: '', result: '', outcome: 'worked' };

// The task's prompt log (M12 "secret sauce", PRD FR22, DR6): every prompt
// tried, the AI tool, what came back and whether it worked, so nobody has to
// remember the prompt that produced something. Prompts that worked are added
// to the copied briefing. Entries are saved with the rest of the task form,
// so Cancel undoes any change here. It sits inside that form, so it uses a
// fieldset and a plain button rather than a nested <form>.
export default function PromptLog({ id, entries, defaultTool, onChange, onNotify }) {
  const [draft, setDraft] = useState(() => ({ ...EMPTY_DRAFT, tool: defaultTool }));
  const [error, setError] = useState('');
  const promptRef = useRef(null);

  function update(field) {
    return (event) => setDraft((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function addEntry() {
    const prompt = draft.prompt.trim();
    if (!prompt) {
      setError('Enter the prompt you used.');
      promptRef.current.focus();
      return;
    }
    const entry = {
      id: newId(),
      at: new Date().toISOString(),
      tool: draft.tool || null,
      prompt,
      result: draft.result.trim(),
      outcome: draft.outcome,
    };
    onChange([...entries, entry]);
    setDraft({ ...EMPTY_DRAFT, tool: draft.tool });
    promptRef.current.focus();
    onNotify('Prompt added to the log');
  }

  function removeEntry(entryId) {
    onChange(entries.filter((entry) => entry.id !== entryId));
    promptRef.current.focus();
    onNotify('Prompt removed from the log');
  }

  return (
    <section aria-labelledby={`${id}-log-heading`} className="flex flex-col gap-4 border-t border-line pt-5">
      <div>
        <h3 id={`${id}-log-heading`} className="text-base font-semibold text-ink">
          Prompt log <span className="font-normal text-ink-muted">({entries.length})</span>
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          Record each prompt you try and whether it worked. Prompts that worked are added to the copied context.
        </p>
      </div>

      {entries.length > 0 && (
        <ol className="flex flex-col gap-3">
          {[...entries].reverse().map((entry) => (
            <Entry key={entry.id} entry={entry} onRemove={removeEntry} />
          ))}
        </ol>
      )}

      <fieldset className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-4">
        <legend className="px-1 text-sm font-semibold text-ink">Add a prompt</legend>
        <div>
          <label htmlFor={`${id}-log-prompt`} className={labelStyles}>
            Prompt
          </label>
          <textarea
            id={`${id}-log-prompt`}
            ref={promptRef}
            rows={3}
            maxLength={5000}
            value={draft.prompt}
            onChange={(event) => {
              update('prompt')(event);
              if (error) setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-log-error` : undefined}
            className={`${inputStyles} py-2 font-mono`}
          />
          {error && (
            <p id={`${id}-log-error`} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-log-result`} className={labelStyles}>
            Result <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            id={`${id}-log-result`}
            rows={3}
            maxLength={5000}
            value={draft.result}
            onChange={update('result')}
            className={`${inputStyles} py-2`}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-log-tool`} className={labelStyles}>
              AI tool
            </label>
            <select id={`${id}-log-tool`} value={draft.tool} onChange={update('tool')} className={inputStyles}>
              <option value="">Not recorded</option>
              {AI_TOOLS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className={labelStyles}>Did it work?</legend>
            <div className="mt-1.5 flex flex-wrap gap-x-4">
              {PROMPT_OUTCOMES.map((outcome) => {
                const { Icon } = OUTCOME_STYLES[outcome.id];
                return (
                  <label key={outcome.id} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-ink">
                    <input
                      type="radio"
                      name={`${id}-log-outcome`}
                      value={outcome.id}
                      checked={draft.outcome === outcome.id}
                      onChange={update('outcome')}
                      className="h-4 w-4 accent-brand"
                    />
                    <Icon aria-hidden="true" className="h-4 w-4 text-ink-muted" />
                    {outcome.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
        <div>
          <button type="button" onClick={addEntry} className={buttonStyles.secondary}>
            <Plus aria-hidden="true" className="h-4 w-4" />
            Add to log
          </button>
        </div>
      </fieldset>
    </section>
  );
}

function Entry({ entry, onRemove }) {
  const { Icon, className } = OUTCOME_STYLES[entry.outcome] ?? OUTCOME_STYLES.partly;
  const label = PROMPT_OUTCOMES.find((outcome) => outcome.id === entry.outcome)?.label ?? entry.outcome;
  const when = formatDateTime(entry.at);

  return (
    <li className="rounded-lg border border-line bg-surface-card p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold ${className}`}>
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />
            {label}
          </span>
          {entry.tool && <span className="font-medium text-ink">{entry.tool}</span>}
          <time dateTime={entry.at}>{when}</time>
        </p>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-xs font-semibold text-danger hover:bg-danger-tint"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Remove<span className="sr-only"> prompt from {when}</span>
        </button>
      </div>
      <p className="mt-2 whitespace-pre-wrap break-words font-mono text-sm text-ink">
        <span className="sr-only">Prompt: </span>
        {entry.prompt}
      </p>
      {entry.result && (
        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-ink-muted">
          <span className="font-semibold text-ink">Result: </span>
          {entry.result}
        </p>
      )}
    </li>
  );
}
