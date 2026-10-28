import { findStory } from './stories.js';
import { newId, nextInColumn } from './tasks.js';

// The task form's values, kept apart from the form's layout (TaskModal.jsx).

// A new task's starting values. It's assigned to whoever is signed in (the MVP
// login's demo user, John Doe), as their own work, so its card shows their
// initials and name; Unassigned and everyone else are still in the list.
const NEW_TASK = {
  title: '',
  description: '',
  type: 'feature',
  status: 'todo',
  assignee: '',
  dueDate: '',
};

// The form's starting values: a blank new task, or the task being edited.
// `beforeId` is the Position field (PRD FR14): the task this one sits above in
// its column, or '' for the bottom, where new tasks go. A link to a story that
// no longer exists starts as None (PRD FR13).
export function formFor(task, tasks, stories = [], userId = '') {
  return {
    ...NEW_TASK,
    assignee: userId,
    ...task,
    dueDate: task?.dueDate ?? '',
    contextTool: task?.contextTool ?? '',
    handoffText: task?.handoffText ?? '',
    storyId: findStory(stories, task?.storyId)?.id ?? '',
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
    storyId: form.storyId || null,
  };
}
