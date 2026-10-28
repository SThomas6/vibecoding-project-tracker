import { STORY_LIMITS } from './stories.js';

// Checks data loaded from localStorage before the app uses it (PRD DR11).
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

const isText = (value) => typeof value === 'string' && value.trim() !== '';

// A user story needs an id, a whole number, a role and a want (PRD DR14).
function isStory(story) {
  return (
    isObject(story) &&
    typeof story.id === 'string' &&
    Number.isInteger(story.number) &&
    story.number > 0 &&
    isText(story.role) &&
    isText(story.want) &&
    (story.benefit == null || typeof story.benefit === 'string')
  );
}

// Keeps the valid stories, once each, trimmed to their limits. Older saved
// data has no stories, which counts as none.
function cleanStories(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .filter((story) => isStory(story) && !seen.has(story.id) && seen.add(story.id))
    .map((story) => ({
      id: story.id,
      number: story.number,
      role: story.role.trim().slice(0, STORY_LIMITS.role),
      want: story.want.trim().slice(0, STORY_LIMITS.want),
      benefit: (story.benefit ?? '').trim().slice(0, STORY_LIMITS.benefit),
    }));
}

function isMember(member) {
  return isObject(member) && typeof member.id === 'string' && typeof member.name === 'string';
}

// Tasks keep their user story link (PRD DR1); anything else counts as none.
export const cleanTasks = (value) =>
  Array.isArray(value)
    ? value.filter(isTask).map((task) => ({ ...task, storyId: typeof task.storyId === 'string' ? task.storyId : null }))
    : undefined;

export const cleanTeam = (value) => (Array.isArray(value) ? value.filter(isMember) : undefined);

export const cleanProject = (value) =>
  isObject(value) && typeof value.name === 'string' && isObject(value.links)
    ? { ...value, stories: cleanStories(value.stories) }
    : undefined;

export const cleanTheme = (value) => (value === 'light' || value === 'dark' ? value : undefined);
