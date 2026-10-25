import { dueState } from './due.js';
import { getContributors } from './tasks.js';

// Default state for the search and board filters (PRD FR21, DR13).
export const DEFAULT_FILTERS = {
  query: '',
  member: 'all',
  type: 'all',
  due: 'all',
  context: 'all',
  story: 'all',
};

export function hasActiveFilters(filters) {
  return (
    filters.query.trim() !== '' ||
    filters.member !== 'all' ||
    filters.type !== 'all' ||
    filters.due !== 'all' ||
    filters.context !== 'all' ||
    filters.story !== 'all'
  );
}

// Filters tasks on the Kanban board by search text, who worked on or owns the
// task, task type, due-date state, handoff or AI tool (PRD FR21) and user
// story (PRD FR28).
export function filterTasks(tasks, filters, now = new Date(), stories = []) {
  const query = filters.query.trim().toLowerCase();

  return tasks.filter((task) => {
    if (query && !matchesQuery(task, query)) return false;
    if (!matchesMember(task, filters.member)) return false;
    if (filters.type !== 'all' && task.type !== filters.type) return false;
    if (!matchesDue(task, filters.due, now)) return false;
    if (!matchesContext(task, filters.context)) return false;
    if (!matchesStory(task, filters.story, stories)) return false;
    return true;
  });
}

function matchesQuery(task, query) {
  const handoffNotes = (task.handoffs ?? []).map((item) => item.note ?? '').join(' ');
  const haystack = [task.title, task.description, task.contextTool, task.handoffText, handoffNotes]
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
  if (contextFilter === 'has-handoff') return Boolean(task.handoffText?.trim()) || (task.handoffs?.length ?? 0) > 0;
  if (contextFilter.startsWith('tool:')) return task.contextTool === contextFilter.slice('tool:'.length);
  return true;
}

// 'none' also matches a link to a story that no longer exists.
function matchesStory(task, storyFilter, stories) {
  if (storyFilter === 'all') return true;
  const linked = stories.some((story) => story.id === task.storyId);
  if (storyFilter === 'none') return !linked;
  return linked && task.storyId === storyFilter;
}
