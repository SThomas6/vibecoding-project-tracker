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

// The AI tools a task can be worked on with (PRD FR16).
export const AI_TOOLS = ['Claude', 'ChatGPT', 'Cursor', 'Lovable', 'Replit', 'Other'];

// The longest handoff text that can be saved.
export const HANDOFF_TEXT_MAX_LENGTH = 20000;

// Prompt goals for "Copy context" (PRD FR18, DR15), in Ignacio's TACO
// structure: the Task (what the AI should do), the Actor (the persona it
// takes) and the Output format. briefing.js fills in the Context.
export const PROMPT_MODES = [
  {
    id: 'continue',
    label: 'Continue building',
    task: 'Continue building this task from where the handoff stops.',
    actor: 'Act as a senior pair-programming developer picking up an in-progress vibecoding task.',
    output: 'Give the smallest working code change for the next step, then end with a short "## Handoff update" (Done, Left, Prompts that worked, Start with) that I can paste back into the tracker.',
  },
  {
    id: 'debug',
    label: 'Debug and fix',
    task: 'Find the root cause of the problem described below and fix it.',
    actor: 'Act as a debugging specialist investigating the root cause of this issue.',
    output: 'Explain the root cause in two sentences, give the exact fix without breaking existing behaviour, then end with a short "## Handoff update" (Done, Left, Prompts that worked, Start with).',
  },
  {
    id: 'review',
    label: 'Accessibility & code review',
    task: 'Review the work on this task for bugs, accessibility gaps and edge cases.',
    actor: 'Act as a WCAG 2.2 AA accessibility and code-quality reviewer.',
    output: 'List the problems in priority order, each with a concrete fix, then end with a short "## Handoff update" (Done, Left, Prompts that worked, Start with).',
  },
  {
    id: 'handoff',
    label: 'Write handoff summary',
    task: 'Write the handoff for the next developer who picks up this task.',
    actor: 'Act as a technical lead summarising this AI session for the next teammate.',
    output: 'A short Markdown handoff with "Done", "Left", "Prompts that worked" (each with its result), "Watch out" and "Start with" lines, ready to paste into the tracker\'s handoff box.',
  },
];

export const HANDOFF_NOTE_MAX_LENGTH = 280; // PRD DR6

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
