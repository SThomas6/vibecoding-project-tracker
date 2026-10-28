import { useId, useRef, useState } from 'react';
import { newId } from '../lib/tasks.js';
import Dialog from './Dialog.jsx';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Adds a team member (PRD FR7, DR6): a name is required so tasks can be
// assigned; email and GitHub handle are optional but must look right.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const FIELDS = ['name', 'email', 'github'];

export default function AddMemberDialog({ onSave, onClose }) {
  const id = useId();
  const refs = { name: useRef(null), email: useRef(null), github: useRef(null) };
  const [form, setForm] = useState({ name: '', email: '', github: '' });
  const [errors, setErrors] = useState({});

  function change(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const github = form.github.trim().replace(/^@/, '');
    const found = {
      name: name ? '' : "Enter the member's name.",
      email: !email || EMAIL.test(email) ? '' : 'Enter an email like name@example.com, or leave it blank.',
      github: !github || GITHUB.test(github) ? '' : 'GitHub handles use letters, numbers and hyphens, up to 39 characters.',
    };
    const first = FIELDS.find((field) => found[field]);
    if (first) {
      setErrors(found);
      refs[first].current.focus();
      return;
    }
    onSave({ id: newId(), name, email, github });
  }

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={refs.name} onClose={onClose} width="max-w-md">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          Add a team member
        </h2>
        <Field id={`${id}-name`} label="Name" inputRef={refs.name} error={errors.name} value={form.name}
          onChange={change('name')} maxLength={60} required autoComplete="off" />
        <Field id={`${id}-email`} label="Email" optional inputRef={refs.email} error={errors.email} value={form.email}
          onChange={change('email')} type="email" maxLength={120} autoComplete="off" />
        <Field id={`${id}-github`} label="GitHub handle" optional inputRef={refs.github} error={errors.github}
          value={form.github} onChange={change('github')} maxLength={40} autoComplete="off" spellCheck={false} />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className={buttonStyles.secondary}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles.primary}>
            Add member
          </button>
        </div>
      </form>
    </Dialog>
  );
}

function Field({ id, label, optional, error, inputRef, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      <input
        id={id}
        ref={inputRef}
        type="text"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputStyles}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
