import { newId, nextInColumn } from './tasks.js';

// The task form's values, kept apart from the form's layout (TaskModal.jsx).

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
// `beforeId` is the Position field (PRD FR24): the task this one sits above in
// its column, or '' for the bottom, where new tasks go.
export function formFor(task, tasks) {
  return {
    ...NEW_TASK,
    ...task,
    dueDate: task?.dueDate ?? '',
    contextTool: task?.contextTool ?? '',
    handoffText: task?.handoffText ?? '',
    beforeId: task ? nextInColumn(tasks, task.id) : '',
  };
}

// The task as it would be saved from the form, used by Save and by Copy
// context. The handoff's "last updated" time only moves when its text changes.
export function fieldsFromForm(form, task) {
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
