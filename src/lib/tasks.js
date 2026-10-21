import { todayISO } from './dates.js';

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

// Moves a task to another column, at the bottom of it (drag and drop).
export function moveTask(tasks, taskId, status) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task || task.status === status) return tasks;
  return [...tasks.filter((item) => item.id !== taskId), { ...task, status }];
}
