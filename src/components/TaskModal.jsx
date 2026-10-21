import { useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { STAGES, TASK_TYPES } from '../constants.js';
import { formatDate } from '../lib/dates.js';
import { newId } from '../lib/tasks.js';
import { inputStyles, labelStyles } from './styles.js';
import BriefingFields from './BriefingFields.jsx';
import Dialog from './Dialog.jsx';
import DueBadge from './DueBadge.jsx';
import HandoffFields from './HandoffFields.jsx';
import TaskModalFooter from './TaskModalFooter.jsx';
import Toast from './Toast.jsx';
import TypeBadge, { typeStyle } from './TypeBadge.jsx';

// New tasks start Unassigned (PRD FR9, DR2).
const NEW_TASK = {
  title: '',
  description: '',
  type: 'feature',
  status: 'todo',
  assignee: '',
  dueDate: '',
};

// The form's starting values: a blank new task, or the task being edited.
function formFor(task) {
  return {
    ...NEW_TASK,
    ...task,
    dueDate: task?.dueDate ?? '',
    contextTool: task?.contextTool ?? '',
    handoffText: task?.handoffText ?? '',
  };
}

// The add / edit form, in the shared native <dialog> (Dialog.jsx).
// `task` is null when adding a new task, or the task being edited.
// Closing a form that has changes asks first, so a long pasted handoff isn't
// lost to a stray Escape (PRD NFR7). Escape again leaves without saving.
export default function TaskModal({ task, team, toast, onSave, onDelete, onCopy, onCopyHandoff, onNotify, onClose }) {
  const isEdit = Boolean(task);
  const [initialForm] = useState(() => formFor(task));
  const [form, setForm] = useState(initialForm);
  const changed = Object.keys(initialForm).some((key) => form[key] !== initialForm[key]);
  const [titleError, setTitleError] = useState('');
  // The question in the footer: null, 'delete' or 'discard'.
  const [confirming, setConfirming] = useState(null);

  const titleRef = useRef(null);
  const closeRef = useRef(null);
  const cancelRef = useRef(null);
  const deleteRef = useRef(null);
  // Finds the control to put focus back on after "Keep task" / "Keep editing".
  const returnFocus = useRef(null);
  const id = useId();

  function update(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) {
      setTitleError('Enter a title for the task.');
      titleRef.current.focus();
      return;
    }
    onSave(fieldsFromForm(form, task));
  }

  function ask(question, findReturn) {
    returnFocus.current = findReturn;
    setConfirming(question);
  }

  function keep() {
    setConfirming(null);
    requestAnimationFrame(() => {
      const target = returnFocus.current?.();
      (target?.isConnected ? target : titleRef.current)?.focus();
    });
  }

  // ✕ and Cancel: close straight away, or ask first if anything has changed.
  function requestClose(findReturn) {
    if (changed) ask('discard', findReturn);
    else onClose();
  }

  // Escape asks the same way. Pressed again while "Discard your changes?" is
  // showing, it leaves without saving; browsers close a dialog on a repeated
  // Escape anyway, so this keeps every browser the same.
  function handleEscape() {
    if (confirming === 'discard' || !changed) {
      onClose();
      return;
    }
    const focused = document.activeElement;
    ask('discard', () => focused);
  }

  return (
    <Dialog labelledBy={`${id}-heading`} initialFocusRef={titleRef} onClose={handleEscape} onClosed={onClose}>
      <form onSubmit={handleSubmit} noValidate className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div
          className={`flex items-start justify-between gap-4 rounded-t-xl border-b border-t-4 border-b-line ${typeStyle(form.type).stripeTop} px-6 py-4`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 id={`${id}-heading`} className="text-lg font-semibold">
                {isEdit ? 'Edit task' : 'New task'}
              </h2>
              <TypeBadge type={form.type} />
              <DueBadge task={{ status: form.status, dueDate: form.dueDate || null }} now={new Date()} />
            </div>
            {isEdit && <p className="text-sm text-ink-muted">Created {formatDate(task.createdDate)}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => requestClose(() => closeRef.current)}
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
              maxLength={120}
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
              maxLength={2000}
              value={form.description}
              onChange={update('description')}
              className={`${inputStyles} py-2`}
            />
          </div>

          <fieldset>
            <legend className={labelStyles}>Type</legend>
            <div className="mt-1.5 flex gap-3">
              {TASK_TYPES.map((type) => {
                const style = typeStyle(type.id);
                return (
                  <label
                    key={type.id}
                    className={`flex min-h-11 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-line-control px-3 text-sm font-medium ${style.selected}`}
                  >
                    <input
                      type="radio"
                      name={`${id}-type`}
                      value={type.id}
                      checked={form.type === type.id}
                      onChange={update('type')}
                      className="h-4 w-4 accent-brand"
                    />
                    <style.Icon aria-hidden="true" className={`h-4 w-4 ${style.icon}`} />
                    {type.label}
                  </label>
                );
              })}
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
                <option value="">Unassigned</option>
                {team.map((member) => (
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

          <HandoffFields
            id={id}
            text={form.handoffText}
            updatedAt={task?.handoffUpdatedAt}
            handoffs={task?.handoffs ?? []}
            team={team}
            onSetText={(handoffText) => setForm((prev) => ({ ...prev, handoffText }))}
            onCopy={() => onCopyHandoff({ ...task, ...fieldsFromForm(form, task) })}
            onNotify={onNotify}
          />

          <BriefingFields
            id={id}
            tool={form.contextTool}
            onChange={update}
            onCopy={(modeId) => onCopy({ ...task, ...fieldsFromForm(form, task) }, modeId)}
          />
        </div>

        <TaskModalFooter
          isEdit={isEdit}
          confirming={confirming}
          deleteRef={deleteRef}
          cancelRef={cancelRef}
          onAskDelete={() => ask('delete', () => deleteRef.current)}
          onCancel={() => requestClose(() => cancelRef.current)}
          onKeep={keep}
          onConfirm={() => (confirming === 'delete' ? onDelete(task.id) : onClose())}
        />
      </form>
      <Toast message={toast} />
    </Dialog>
  );
}

// The task as it would be saved from the form, used by Save and by Copy
// context. The handoff's "last updated" time only moves when its text changes.
function fieldsFromForm(form, task) {
  const contextTool = form.contextTool || null;
  const ownerChanged = task && form.assignee !== (task.assignee ?? '');
  const handoffs = ownerChanged
    ? [...(task.handoffs ?? []), { id: newId(), from: task.assignee || '', to: form.assignee, note: '', at: new Date().toISOString() }]
    : (task?.handoffs ?? []);
  const handoffText = form.handoffText.trim();
  const handoffChanged = handoffText !== (task?.handoffText ?? '');
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    type: form.type,
    status: form.status,
    assignee: form.assignee,
    dueDate: form.dueDate || null,
    contextTool,
    handoffText,
    handoffUpdatedAt: handoffChanged ? new Date().toISOString() : (task?.handoffUpdatedAt ?? null),
    handoffs,
  };
}
