import { PROMPT_MODES, STAGES, TASK_TYPES } from '../constants.js';
import { formatDate, formatDateTime } from './dates.js';
import { dueState } from './due.js';
import { getPastContributors } from './tasks.js';
import { getMember } from './team.js';

// Turns a task into a Markdown briefing to paste into an AI tool (M10, PRD
// FR18, DR9): the title as a heading, the key facts, then the description,
// pasted handoff, handoff trail, and optional TACO Actor / Output
// format instructions. Empty fields are left out.
export function buildBriefing(task, team, now = new Date(), modeId = null) {
  const pastNames = getPastContributors(task)
    .map((id) => getMember(team, id)?.name)
    .filter(Boolean);

  const facts = [
    ['Type', labelOf(TASK_TYPES, task.type)],
    ['Status', labelOf(STAGES, task.status)],
    ['Owner', getMember(team, task.assignee)?.name ?? 'Unassigned'],
    ['Previously worked on by', pastNames.length > 0 ? pastNames.join(', ') : null],
    ['Due', task.dueDate && `${formatDate(task.dueDate)} (${dueState(task, now).label})`],
  ]
    .filter(([, value]) => value)
    .map(([name, value]) => `- **${name}:** ${value}`);

  const sections = [`# ${task.title || 'Untitled task'}`, facts.join('\n')];
  const mode = modeId ? PROMPT_MODES.find((item) => item.id === modeId) : null;

  if (mode) sections.push(`## Actor\n\n${mode.actor}`);
  if (task.description) sections.push(`## Description\n\n${task.description}`);
  if (task.handoffText) sections.push(`## Handoff\n\n${task.handoffText}`);

  const handoffs = task.handoffs ?? [];
  if (handoffs.length > 0) {
    const lines = handoffs.map((item) => formatHandoff(item, team));
    sections.push(`## Handoff notes\n\n${lines.join('\n')}`);
  }



  if (mode) sections.push(`## Output format\n\n${mode.output}`);

  const footer = [
    task.contextTool && `AI tool: ${task.contextTool}`,
    task.handoffUpdatedAt && `Handoff last updated ${formatDateTime(task.handoffUpdatedAt)}`,
  ].filter(Boolean);
  if (footer.length > 0) sections.push(`---\n\n${footer.join(' · ')}`);

  return `${sections.join('\n\n')}\n`;
}

function formatHandoff(item, team) {
  const from = getMember(team, item.from)?.name ?? 'Unassigned';
  const to = getMember(team, item.to)?.name ?? 'Unassigned';
  const note = item.note ? ` — "${item.note}"` : '';
  return `- **${formatDateTime(item.at)} (${from} → ${to})**${note}`;
}

// Just the pasted handoff, with the task title, for "Copy handoff" (M12).
export function buildHandoff(task) {
  return `# Handoff: ${task.title || 'Untitled task'}\n\n${task.handoffText}\n`;
}

function labelOf(list, id) {
  return list.find((item) => item.id === id)?.label ?? id;
}
