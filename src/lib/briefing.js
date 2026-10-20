import { STAGES, TASK_TYPES } from '../constants.js';
import { formatDate, formatDateTime } from './dates.js';
import { dueState } from './due.js';
import { getMember } from './team.js';

// Turns a task into a Markdown briefing to paste into an AI tool (M10, PRD
// FR18, DR9): the title as a heading, the key facts, then the description and
// context. Empty fields are left out, so the AI isn't given blank sections.
export function buildBriefing(task, now = new Date()) {
  const facts = [
    ['Type', labelOf(TASK_TYPES, task.type)],
    ['Status', labelOf(STAGES, task.status)],
    ['Owner', getMember(task.assignee)?.name ?? 'Unassigned'],
    ['Due', task.dueDate && `${formatDate(task.dueDate)} (${dueState(task, now).label})`],
  ]
    .filter(([, value]) => value)
    .map(([name, value]) => `- **${name}:** ${value}`);

  const sections = [`# ${task.title || 'Untitled task'}`, facts.join('\n')];
  if (task.description) sections.push(`## Description\n\n${task.description}`);
  if (task.context) sections.push(`## Context\n\n${task.context}`);

  const footer = [
    task.contextTool && `AI tool: ${task.contextTool}`,
    task.contextUpdatedAt && `Context last updated ${formatDateTime(task.contextUpdatedAt)}`,
  ].filter(Boolean);
  if (footer.length > 0) sections.push(`---\n\n${footer.join(' · ')}`);

  return `${sections.join('\n\n')}\n`;
}

function labelOf(list, id) {
  return list.find((item) => item.id === id)?.label ?? id;
}
