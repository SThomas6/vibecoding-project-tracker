// The four columns of the board, in render order.
// Use these IDs everywhere — do not invent new ones.
export const STAGES = [
  { id: 'todo',        label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review',      label: 'Review' },
  { id: 'done',        label: 'Done' },
];

// The two kinds of task (M6 gives each its own colour and icon).
export const TASK_TYPES = [
  { id: 'feature', label: 'Feature' },
  { id: 'bug',     label: 'Bug' },
];

// The team. For each member the clients asked us to store a name (to see who
// a task is assigned to), an email (to contact a task's owner directly) and a
// GitHub handle. `Task.assignee` holds a member's `id`.
// These are made-up people for the demo; more can be added in the Team strip
// (PRD FR12), so the live list is kept in localStorage.
export const TEAM = [
  { id: 'alex',   name: 'Alex Kim',   email: 'alex.kim@example.com',   github: 'alexkim-demo' },
  { id: 'jordan', name: 'Jordan Lee', email: 'jordan.lee@example.com', github: 'jordanlee-demo' },
  { id: 'priya',  name: 'Priya Shah', email: 'priya.shah@example.com', github: 'priyashah-demo' },
];

// The AI tools a task's context can come from (PRD FR16).
export const AI_TOOLS = ['Claude', 'ChatGPT', 'Cursor', 'Lovable', 'Replit', 'Other'];

// Shown in an empty Context box, so there's always a prompt for what the next
// person needs (PRD FR17). An untouched template is saved as no context.
export const CONTEXT_TEMPLATE = [
  '## Background',
  '',
  '## Constraints',
  '',
  '## Tried so far',
  '',
  '## Pick up from here',
  '',
].join('\n');

export const CONTEXT_MAX_LENGTH = 20000; // PRD DR4

// TACO prompt modes for "Copy context" (PRD FR18, DR9): tailors the Actor and
// Output format sections of the copied briefing without manual typing.
export const PROMPT_MODES = [
  {
    id: 'continue',
    label: 'Continue building',
    actor: 'Act as a senior pair-programming developer picking up an in-progress vibecoding task.',
    output: 'Provide the minimal, working code changes needed for the next step, then end with a short "## Handoff update" block (Tried so far / Pick up from here) I can paste back into the tracker.',
  },
  {
    id: 'debug',
    label: 'Debug and fix',
    actor: 'Act as a debugging specialist investigating the root cause of this issue.',
    output: 'Explain the root cause in two sentences, give the exact fix without breaking existing behaviour, and end with a short "## Handoff update" block I can paste back into the tracker.',
  },
  {
    id: 'review',
    label: 'Accessibility & code review',
    actor: 'Act as a WCAG 2.2 AA accessibility and code-quality reviewer.',
    output: 'List any bugs, accessibility gaps or edge cases in priority order with concrete fixes, then end with a short "## Handoff update" block.',
  },
  {
    id: 'handoff',
    label: 'Write handoff summary',
    actor: 'Act as a technical lead summarising our current AI session for the next teammate.',
    output: 'Write a concise Markdown update with "## Background", "## Constraints", "## Tried so far" and "## Pick up from here", plus a one-line handoff note.',
  },
];

export const HANDOFF_NOTE_MAX_LENGTH = 280; // PRD DR2

// The project's deliverables, pinned above the board as link cards
// (M11, PRD FR19).
export const DELIVERABLES = [
  { id: 'presentation',  label: 'Presentation' },
  { id: 'demo',          label: 'Demo' },
  { id: 'report',        label: 'Report' },
  { id: 'documentation', label: 'Documentation' },
];

// Where the app keeps its data in the browser (localStorage).
export const STORAGE_KEYS = {
  tasks: 'vibetracker.tasks',
  project: 'vibetracker.project',
  team: 'vibetracker.team',
  theme: 'vibetracker.theme',
};
