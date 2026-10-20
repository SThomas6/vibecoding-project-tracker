import { useEffect, useId, useRef, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { STAGES, TASK_TYPES, TEAM } from '../constants.js';
import { formatDate } from '../lib/dates.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

const NEW_TASK = {
  title: '',
  description: '',
  type: 'feature',
  status: 'todo',
  assignee: TEAM[0].id,
  dueDate: '',
};

// The add / edit form. It uses the browser's native <dialog>, which handles
// the hard accessibility parts for us: focus stays inside the dialog, the page
// behind it can't be reached, and Escape closes it.
//
// `task` is null when adding a new task, or the task being edited.
export default function TaskModal({ task, onSave, onDelete, onClose }) {
  const isEdit = Boolean(task);
  const [form, setForm] = useState(() => ({ ...NEW_TASK, ...task, dueDate: task?.dueDate ?? '' }));
  const [titleError, setTitleError] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const deleteRef = useRef(null);
  const keepRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocusTo = document.activeElement;
    dialog.showModal();
    titleRef.current.focus();

    return () => {
      dialog.close();
      // Put focus back where it was (the card or the "New task" button).
      // If the card moved to another column it's a new element, so find it by
      // task id; if the task was deleted, fall back to the board.
      if (returnFocusTo?.isConnected) {
        returnFocusTo.focus();
        return;
      }
      const taskId = returnFocusTo?.dataset?.taskId;
      const movedCard = taskId && document.querySelector(`[data-task-id="${CSS.escape(taskId)}"]`);
      (movedCard || document.getElementById('board'))?.focus();
    };
  }, []);

  useEffect(() => {
    if (confirmingDelete) keepRef.current.focus();
  }, [confirmingDelete]);

  function update(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setTitleError('Enter a title for the task.');
      titleRef.current.focus();
      return;
    }
    onSave({
      title,
      description: form.description.trim(),
      type: form.type,
      status: form.status,
      assignee: form.assignee,
      dueDate: form.dueDate || null,
    });
  }

  function cancelDelete() {
    setConfirmingDelete(false);
    requestAnimationFrame(() => deleteRef.current?.focus());
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-heading`}
      onCancel={(event) => {
        // Escape key: let React close the dialog so state stays in sync.
        event.preventDefault();
        onClose();
      }}
      className="w-[calc(100%-2rem)] max-w-xl rounded-xl bg-surface-card p-0 text-ink shadow-xl backdrop:bg-ink/60"
    >
      <form onSubmit={handleSubmit} noValidate className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div>
            <h2 id={`${id}-heading`} className="text-lg font-semibold">
              {isEdit ? 'Edit task' : 'New task'}
            </h2>
            {isEdit && <p className="text-sm text-ink-muted">Created {formatDate(task.createdDate)}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-sunken hover:text-ink"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          <div>
            <label htmlFor={`${id}-title`} className={labelStyles}>Title</label>
            <input
              id={`${id}-title`}
              ref={titleRef}
              type="text"
              required
              value={form.title}
              onChange={(event) => {
                update('title')(event);
                if (titleError) setTitleError('');
              }}
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? `${id}-title-error` : undefined}
              className={inputStyles}
            />
            {titleError && (
              <p id={`${id}-title-error`} className="mt-1.5 text-sm font-medium text-danger">
                {titleError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${id}-description`} className={labelStyles}>
              Description <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <textarea
              id={`${id}-description`}
              rows={3}
              value={form.description}
              onChange={update('description')}
              className={`${inputStyles} py-2`}
            />
          </div>

          <fieldset>
            <legend className={labelStyles}>Type</legend>
            <div className="mt-1.5 flex gap-3">
              {TASK_TYPES.map((type) => (
                <label
                  key={type.id}
                  className="flex min-h-11 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-line-control px-3 text-sm font-medium has-[:checked]:border-brand has-[:checked]:bg-surface-sunken"
                >
                  <input
                    type="radio"
                    name={`${id}-type`}
                    value={type.id}
                    checked={form.type === type.id}
                    onChange={update('type')}
                    className="h-4 w-4 accent-brand"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-status`} className={labelStyles}>Status</label>
              <select id={`${id}-status`} value={form.status} onChange={update('status')} className={inputStyles}>
                {STAGES.map((stage) => (
                  <option key={stage.id} value={stage.id}>{stage.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${id}-assignee`} className={labelStyles}>Assigned to</label>
              <select id={`${id}-assignee`} value={form.assignee} onChange={update('assignee')} className={inputStyles}>
                {TEAM.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${id}-due`} className={labelStyles}>
                Due date <span className="font-normal text-ink-muted">(optional)</span>
              </label>
              <input
                id={`${id}-due`}
                type="date"
                value={form.dueDate}
                onChange={update('dueDate')}
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
          {confirmingDelete ? (
            <>
              <p role="alert" className="text-sm font-medium text-ink">
                Delete this task? This can't be undone.
              </p>
              <div className="flex gap-3">
                <button ref={keepRef} type="button" onClick={cancelDelete} className={buttonStyles.secondary}>
                  Keep task
                </button>
                <button type="button" onClick={() => onDelete(task.id)} className={buttonStyles.dangerSolid}>
                  Delete task
                </button>
              </div>
            </>
          ) : (
            <>
              {isEdit ? (
                <button
                  ref={deleteRef}
                  type="button"
                  onClick={() => setConfirmingDelete(true)}
                  className={buttonStyles.danger}
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                  Delete
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className={buttonStyles.secondary}>
                  Cancel
                </button>
                <button type="submit" className={buttonStyles.primary}>
                  {isEdit ? 'Save changes' : 'Add task'}
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </dialog>
  );
}
