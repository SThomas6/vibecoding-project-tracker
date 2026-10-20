import { CONTEXT_TEMPLATE } from '../constants.js';
import { todayISO } from './dates.js';

// Builds a complete new task from the form fields. The id and created date
// are set here, so the form never has to deal with them.
export function createTask(fields) {
  return {
    id: newId(),
    createdDate: todayISO(),
    context: '',
    contextTool: null,
    contextUpdatedAt: null,
    handoffText: '',
    handoffUpdatedAt: null,
    handoffs: [],
    ...fields,
  };
}

export function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}`;
}

// Every team member ID who currently owns or has previously worked on / handed
// off this task (PRD FR10, FR23).
export function getContributors(task) {
  const ids = new Set();
  if (task.assignee) ids.add(task.assignee);
  for (const item of task.handoffs ?? []) {
    if (item.from) ids.add(item.from);
    if (item.to) ids.add(item.to);
  }
  return [...ids];
}

// Team member IDs who worked on the task previously, excluding the current owner.
export function getPastContributors(task) {
  return getContributors(task).filter((id) => id !== task.assignee);
}

// What gets saved from the Context box: an untouched template counts as no
// context, so it isn't stored or copied.
export function cleanContext(text) {
  const trimmed = text.trim();
  return trimmed === CONTEXT_TEMPLATE.trim() ? '' : trimmed;
}
