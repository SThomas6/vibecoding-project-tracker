import { PROMPT_MODES, STAGES, TASK_TYPES } from '../constants.js';
import { formatDate, formatDateTime } from './dates.js';
import { dueState } from './due.js';
import { findStory, storyCode, storySentence } from './stories.js';
import { getPastContributors } from './tasks.js';
import { getMember } from './team.js';

// Turns a task into a Markdown briefing to paste into an AI tool (PRD FR18,
// DR9). With a prompt goal it follows Ignacio's TACO structure: Task, Actor,
// Context (the key facts, including the user story, then the description,
// pasted handoff and handoff notes) and Output format. Without one it's a
// plain briefing of the same facts. Empty fields are left out.
export function buildBriefing(task, team, now = new Date(), modeId = null, stories = []) {
  const mode = PROMPT_MODES.find((item) => item.id === modeId) ?? null;
  const sections = [`# ${task.title || 'Untitled task'}`];

  if (mode) {
    const context = contextSections(task, team, now, '###', stories);
    sections.push(
      `## Task\n\n${mode.task}`,
      `## Actor\n\n${mode.actor}`,
      `## Context\n\n${context.join('\n\n')}`,
      `## Output format\n\n${mode.output}`
    );
  } else {
    sections.push(...contextSections(task, team, now, '##', stories));
  }

  const footer = [
    task.contextTool && `AI tool: ${task.contextTool}`,
    task.handoffUpdatedAt && `Handoff last updated ${formatDateTime(task.handoffUpdatedAt)}`,
  ].filter(Boolean);
  if (footer.length > 0) sections.push(`---\n\n${footer.join(' · ')}`);

  return `${sections.join('\n\n')}\n`;
}

// The facts about the task, then its description, pasted handoff and handoff
// notes, each under a heading at the given level.
function contextSections(task, team, now, heading, stories) {
  const pastNames = getPastContributors(task)
    .map((id) => getMember(team, id)?.name)
    .filter(Boolean);
  const story = findStory(stories, task.storyId);

  const facts = [
    ['Type', labelOf(TASK_TYPES, task.type)],
    ['Status', labelOf(STAGES, task.status)],
    ['Owner', getMember(team, task.assignee)?.name ?? 'Unassigned'],
    ['Previously worked on by', pastNames.length > 0 ? pastNames.join(', ') : null],
    ['Due', task.dueDate && `${formatDate(task.dueDate)} (${dueState(task, now).label})`],
    ['User story', story && `${storyCode(story)}. ${storySentence(story)}`],
  ]
    .filter(([, value]) => value)
    .map(([name, value]) => `- **${name}:** ${value}`);

  const parts = [facts.join('\n')];
  if (task.description) parts.push(`${heading} Description\n\n${task.description}`);
  if (task.handoffText) parts.push(`${heading} Handoff\n\n${task.handoffText}`);

  const handoffs = task.handoffs ?? [];
  if (handoffs.length > 0) {
    const lines = handoffs.map((item) => formatHandoff(item, team));
    parts.push(`${heading} Handoff notes\n\n${lines.join('\n')}`);
  }
  return parts;
}

function formatHandoff(item, team) {
  const from = getMember(team, item.from)?.name ?? 'Unassigned';
  const to = getMember(team, item.to)?.name ?? 'Unassigned';
  const note = item.note ? ` — "${item.note}"` : '';
  return `- **${formatDateTime(item.at)} (${from} → ${to})**${note}`;
}

// Just the pasted handoff, with the task title, for "Copy handoff" (PRD FR22).
export function buildHandoff(task) {
  return `# Handoff: ${task.title || 'Untitled task'}\n\n${task.handoffText}\n`;
}

function labelOf(list, id) {
  return list.find((item) => item.id === id)?.label ?? id;
}
