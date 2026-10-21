import { useId, useRef, useState } from 'react';
import {
  BookOpen,
  CircleCheck,
  CircleDashed,
  ExternalLink,
  FileText,
  MonitorPlay,
  Pencil,
  Plus,
  Presentation,
} from 'lucide-react';
import { isWebLink } from '../lib/links.js';
import { buttonStyles, inputStyles, labelStyles, smallButtonStyles } from './styles.js';

const ICONS = { presentation: Presentation, demo: MonitorPlay, report: FileText, documentation: BookOpen };

const smallButton = smallButtonStyles.plain;

// One deliverable (PRD FR19, DR8), kept to a single slim row so the board
// stays near the top of the page: its name, whether a link has been added
// (an icon and words, not just colour), and Open / Add / Edit. Editing opens
// an inline form across the full width. Only http(s) links are saved or opened.
export default function DeliverableCard({ deliverable, url, onSave }) {
  const Icon = ICONS[deliverable.id];
  const hasLink = isWebLink(url);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const editButtonRef = useRef(null);
  const id = useId();

  function startEditing() {
    setDraft(url);
    setError('');
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function stopEditing() {
    setEditing(false);
    requestAnimationFrame(() => editButtonRef.current?.focus());
  }

  function handleSubmit(event) {
    event.preventDefault();
    const value = draft.trim();
    if (value && !isWebLink(value)) {
      setError('Enter a link that starts with http:// or https://.');
      inputRef.current.focus();
      return;
    }
    // Saving an empty box removes the link.
    if (value !== url) onSave(deliverable.id, value);
    stopEditing();
  }

  return (
    <li
      className={`rounded-lg border border-line bg-surface-card px-3 py-1.5 shadow-sm ${editing ? 'sm:col-span-2 xl:col-span-4' : ''}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Icon aria-hidden="true" className="h-4 w-4 text-brand" />
          {deliverable.label}
        </h3>
        <div className="flex flex-wrap items-center gap-1">
          {hasLink ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-due-safe-tint px-1.5 py-0.5 text-xs font-semibold text-due-safe">
              <CircleCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Link added
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-due-neutral-tint px-1.5 py-0.5 text-xs font-semibold text-due-neutral">
              <CircleDashed aria-hidden="true" className="h-3.5 w-3.5" />
              No link yet
            </span>
          )}
          {!editing && hasLink && (
            // The address shows as a tooltip, and in the browser's status bar on hover.
            <a href={url} title={url} target="_blank" rel="noopener noreferrer" className={`${smallButton} !text-brand-accent underline hover:no-underline`}>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              Open<span className="sr-only"> {deliverable.label}, {new URL(url).host} (opens in a new tab)</span>
            </a>
          )}
          {!editing && (
            <button ref={editButtonRef} type="button" onClick={startEditing} className={smallButton}>
              {hasLink ? <Pencil aria-hidden="true" className="h-3.5 w-3.5" /> : <Plus aria-hidden="true" className="h-3.5 w-3.5" />}
              {hasLink ? 'Edit' : 'Add link'}
              <span className="sr-only">{hasLink ? ' link' : ''} for {deliverable.label}</span>
            </button>
          )}
        </div>
      </div>

      {editing && (
        <form
          noValidate
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.key === 'Escape') stopEditing();
          }}
          className="mt-2 pb-1.5"
        >
          <label htmlFor={`${id}-url`} className={labelStyles}>
            {deliverable.label} link
          </label>
          <input
            id={`${id}-url`}
            ref={inputRef}
            type="url"
            inputMode="url"
            maxLength={2000}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : `${id}-hint`}
            className={inputStyles}
          />
          {error ? (
            <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ) : (
            <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
              Leave it empty to remove the link.
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="submit" className={buttonStyles.primary}>
              Save link
            </button>
            <button type="button" onClick={stopEditing} className={buttonStyles.secondary}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
