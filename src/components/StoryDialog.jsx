import { useId, useRef, useState } from 'react';
import { STORY_LIMITS, storyCode, storySentence } from '../lib/stories.js';
import Dialog from './Dialog.jsx';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Adds or edits a user story (PRD FR13, DR14): "As a …, I want …, so that …".
// Each field has a visible label and a hint, and a live line shows how the
// story will read. Errors appear under their field, and focus moves to the
// first one (NFR1, NFR5). Pasted text is shown as text and never run (NFR8).
const FIELDS = [
  { key: 'role', label: 'As a', hint: 'Who the story is for, such as a recruiter or a visitor on a phone.', rows: 1 },
  { key: 'want', label: 'I want', hint: 'What they want to do, such as download the CV.', rows: 2 },
  { key: 'benefit', label: 'So that', optional: true, hint: 'Why it matters to them, such as I can share it with my team.', rows: 2 },
];

const ERRORS = { role: 'Enter who the story is for.', want: 'Enter what they want to do.' };

export default function StoryDialog({ story, onSave, onClose }) {
  const id = useId();
  const refs = { role: useRef(null), want: useRef(null), benefit: useRef(null) };
  const [form, setForm] = useState({ role: story?.role ?? '', want: story?.want ?? '', benefit: story?.benefit ?? '' });
  const [errors, setErrors] = useState({});
  const heading = story ? `Edit ${storyCode(story)}` : 'Add a user story';

  function change(key) {
    return (event) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fields = { role: form.role.trim(), want: form.want.trim(), benefit: form.benefit.trim() };
    const found = { role: fields.role ? '' : ERRORS.role, want: fields.want ? '' : ERRORS.want };
    const first = ['role', 'want'].find((key) => found[key]);
    if (first) {
      setErrors(found);
      refs[first].current.focus();
      return;
    }
    onSave(fields);
  }

  // The story as it will read, with "…" for anything not filled in yet.
  const preview = storySentence({
    role: form.role.trim() || '…',
    want: form.want.trim() || '…',
    benefit: form.benefit.trim(),
  }).replace(/…\.$/, '…');

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={refs.role} onClose={onClose}>
      <form noValidate onSubmit={handleSubmit} className="flex max-h-[calc(100dvh-2rem)] flex-col gap-4 overflow-y-auto p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          {heading}
        </h2>

        {FIELDS.map(({ key, label, hint, optional, rows }) => {
          const Field = rows > 1 ? 'textarea' : 'input';
          const describedBy = [`${id}-${key}-hint`, errors[key] && `${id}-${key}-error`].filter(Boolean).join(' ');
          return (
            <div key={key}>
              <label htmlFor={`${id}-${key}`} className={labelStyles}>
                {label}
                {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
              </label>
              <p id={`${id}-${key}-hint`} className="mt-1 text-sm text-ink-muted">
                {hint}
              </p>
              <Field
                id={`${id}-${key}`}
                ref={refs[key]}
                {...(rows > 1 ? { rows } : { type: 'text' })}
                required={!optional}
                maxLength={STORY_LIMITS[key]}
                value={form[key]}
                onChange={change(key)}
                aria-invalid={Boolean(errors[key])}
                aria-describedby={describedBy}
                className={`${inputStyles} ${rows > 1 ? 'py-2' : ''}`}
              />
              {errors[key] && (
                <p id={`${id}-${key}-error`} className="mt-1.5 text-sm font-medium text-danger">
                  {errors[key]}
                </p>
              )}
            </div>
          );
        })}

        <p className="rounded-lg bg-surface-sunken px-3 py-2 text-sm text-ink">
          <span className="font-semibold">Reads as:</span> {preview}
        </p>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onClose} className={buttonStyles.secondary}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles.primary}>
            {story ? 'Save story' : 'Add story'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
