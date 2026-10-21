// Checks data loaded from localStorage before the app uses it (PRD DR12).
// Each function returns the usable part of what was saved, or undefined if
// none of it is usable, in which case the demo value is used instead. That
// way data edited by hand, or left by an older version, can't blank the page.

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function isTask(task) {
  return (
    isObject(task) &&
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.status === 'string' &&
    (task.handoffs === undefined || Array.isArray(task.handoffs))
  );
}

function isMember(member) {
  return isObject(member) && typeof member.id === 'string' && typeof member.name === 'string';
}

export const cleanTasks = (value) => (Array.isArray(value) ? value.filter(isTask) : undefined);

export const cleanTeam = (value) => (Array.isArray(value) ? value.filter(isMember) : undefined);

export const cleanProject = (value) =>
  isObject(value) && typeof value.name === 'string' && isObject(value.links) ? value : undefined;

export const cleanTheme = (value) => (value === 'light' || value === 'dark' ? value : undefined);
