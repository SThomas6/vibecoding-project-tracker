import { useId, useRef, useState } from 'react';
import Dialog from './Dialog.jsx';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Renames the project shown in the header (M11, PRD DR8: "the name is typed in").
export default function RenameProjectDialog({ name, onSave, onClose }) {
  const id = useId();
  const inputRef = useRef(null);
  const [value, setValue] = useState(name);
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Enter a name for the project.');
      inputRef.current.focus();
      return;
    }
    onSave(trimmed);
  }

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={inputRef} onClose={onClose} width="max-w-md">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          Rename project
        </h2>
        <div>
          <label htmlFor={`${id}-name`} className={labelStyles}>
            Project name
          </label>
          <input
            id={`${id}-name`}
            ref={inputRef}
            type="text"
            required
            maxLength={80}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={inputStyles}
          />
          {error && (
            <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className={buttonStyles.secondary}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles.primary}>
            Save name
          </button>
        </div>
      </form>
    </Dialog>
  );
}
