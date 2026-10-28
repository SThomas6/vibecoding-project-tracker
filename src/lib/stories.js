// User stories (PRD FR13, DR14): "As a <role>, I want <want>, so that
// <benefit>." Each has a number, shown as a code such as "US2". A task links
// to one story by its id; an id that matches no story counts as none. How far
// a story has got is worked out when it's shown, never stored (DR10).

export const STORY_LIMITS = { role: 60, want: 160, benefit: 160 };

// One more than the highest number in use, so the first story is US1.
export function nextStoryNumber(stories) {
  return stories.reduce((highest, story) => Math.max(highest, story.number), 0) + 1;
}

export function storyCode(story) {
  return `US${story.number}`;
}

// The story a task links to, or null.
export function findStory(stories, storyId) {
  return (storyId && stories.find((story) => story.id === storyId)) || null;
}

// The three parts of a story, tidied for display. A role that already
// starts with "a" or "an" ("an editor") keeps its own, after a plain "As".
export function storyParts(story) {
  const role = trimEnd(story.role);
  const ownArticle = /^(a|an)\s/i.test(role);
  return {
    lead: ownArticle ? 'As' : 'As a',
    role,
    want: trimEnd(story.want),
    benefit: story.benefit ? trimEnd(story.benefit) : '',
  };
}

// "As a recruiter, I want to download the CV, so that I can share it."
export function storySentence(story) {
  const { lead, role, want, benefit } = storyParts(story);
  return `${lead} ${role}, I want ${want}${benefit ? `, so that ${benefit}` : ''}.`;
}

// How many of the tasks linked to a story are done (PRD FR13).
export function storyProgress(story, tasks) {
  const linked = tasks.filter((task) => task.storyId === story.id);
  return { done: linked.filter((task) => task.status === 'done').length, total: linked.length };
}

// "US1: As a recruiter, I want to see the developer's best…", for dropdowns.
export function storyLabel(story, length = 70) {
  const text = `${storyCode(story)}: ${storySentence(story)}`;
  return text.length > length ? `${text.slice(0, length - 1).trimEnd()}…` : text;
}

// Drops trailing full stops and commas, so the sentence never reads "CV., so that".
function trimEnd(text) {
  return text.trim().replace(/[\s.,;:]+$/, '');
}
