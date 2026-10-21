import { todayISO } from './dates.js';

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee               id of a team member, or '' for Unassigned
 * @property {string|null} dueDate           ISO 'YYYY-MM-DD'
 * @property {string} createdDate            ISO 'YYYY-MM-DD'
 * @property {string|null} contextTool       the AI tool used (PRD FR16, DR4)
 * @property {string} handoffText            pasted handoff for the next developer's AI agent (PRD FR15, DR4)
 * @property {string|null} handoffUpdatedAt  ISO timestamp, set when the handoff text changes (PRD DR5)
 * @property {Array} handoffs                handoff history ({ id, from, to, note, at }) (PRD FR10, DR6)
 */

// Builds a complete new task from the form fields. The id and created date
// are set here, so the form never has to deal with them.
export function createTask(fields) {
  return {
    id: newId(),
    createdDate: todayISO(),
    contextTool: null,
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
// off this task (PRD FR10, FR21).
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

// Moves a task to a column, just above the task `beforeId`, or to the bottom
// of the column when `beforeId` is null (PRD FR24: drag and drop, and the
// form's Position field). A column shows its tasks in list order, so moving a
// task in the list is all it takes. Returns the same list when nothing moves,
// so the caller can tell.
export function moveTask(tasks, taskId, status, beforeId = null) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task || beforeId === taskId) return tasks;
  const rest = tasks.filter((item) => item.id !== taskId);
  const at = beforeId ? rest.findIndex((item) => item.id === beforeId) : -1;
  const moved = { ...task, status };
  const next = at < 0 ? [...rest, moved] : [...rest.slice(0, at), moved, ...rest.slice(at)];
  const unchanged = task.status === status && columnOrder(tasks, status) === columnOrder(next, status);
  return unchanged ? tasks : next;
}

function columnOrder(tasks, status) {
  return tasks
    .filter((item) => item.status === status)
    .map((item) => item.id)
    .join();
}

// The task below this one in its column, or '' if it's at the bottom.
export function nextInColumn(tasks, taskId) {
  const task = tasks.find((item) => item.id === taskId);
  const column = tasks.filter((item) => item.status === task?.status);
  return column[column.findIndex((item) => item.id === taskId) + 1]?.id ?? '';
}
