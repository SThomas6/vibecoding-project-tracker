import { dueState } from './due.js';
import { getContributors } from './tasks.js';

// Default state for the search and advanced board filters (PRD FR23).
export const DEFAULT_FILTERS = {
  query: '',
  member: 'all',
  type: 'all',
  due: 'all',
  context: 'all',
};

export function hasActiveFilters(filters) {
  return (
    filters.query.trim() !== '' ||
    filters.member !== 'all' ||
    filters.type !== 'all' ||
    filters.due !== 'all' ||
    filters.context !== 'all'
  );
}

// Filters tasks on the Kanban board by search text, who worked on or owns the
// task, task type, due-date state and AI context / handoff state (PRD FR23).
export function filterTasks(tasks, filters, now = new Date()) {
  const query = filters.query.trim().toLowerCase();

  return tasks.filter((task) => {
    if (query && !matchesQuery(task, query)) return false;
    if (!matchesMember(task, filters.member)) return false;
    if (filters.type !== 'all' && task.type !== filters.type) return false;
    if (!matchesDue(task, filters.due, now)) return false;
    if (!matchesContext(task, filters.context)) return false;
    return true;
  });
}

function matchesQuery(task, query) {
  const handoffText = (task.handoffs ?? []).map((item) => item.note ?? '').join(' ');
  const promptText = (task.promptLog ?? [])
    .map((entry) => `${entry.prompt ?? ''} ${entry.result ?? ''}`)
    .join(' ');
  const haystack = [task.title, task.description, task.context, task.contextTool, handoffText, promptText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

function matchesMember(task, memberFilter) {
  if (memberFilter === 'all') return true;
  if (memberFilter === 'unassigned') return !task.assignee;
  if (memberFilter.startsWith('owned:')) {
    return task.assignee === memberFilter.slice('owned:'.length);
  }
  // Matches tasks the member currently owns OR previously worked on (handoffs).
  return getContributors(task).includes(memberFilter);
}

function matchesDue(task, dueFilter, now) {
  if (dueFilter === 'all') return true;
  if (dueFilter === 'none') return !task.dueDate && task.status !== 'done';
  const current = dueState(task, now);
  return current?.state === dueFilter;
}

function matchesContext(task, contextFilter) {
  if (contextFilter === 'all') return true;
  if (contextFilter === 'has-context') return Boolean(task.context?.trim());
  if (contextFilter === 'has-handoff') return (task.handoffs?.length ?? 0) > 0;
  if (contextFilter === 'has-prompts') return (task.promptLog?.length ?? 0) > 0;
  if (contextFilter.startsWith('tool:')) {
    const tool = contextFilter.slice('tool:'.length);
    const inLog = (task.promptLog ?? []).some((entry) => entry.tool === tool);
    return task.contextTool === tool || inLog;
  }
  return true;
}
