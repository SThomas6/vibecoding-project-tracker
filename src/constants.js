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
// These are made-up people for the prototype.
export const TEAM = [
  { id: 'alex',   name: 'Alex Kim',   email: 'alex.kim@example.com',   github: 'alexkim-demo' },
  { id: 'jordan', name: 'Jordan Lee', email: 'jordan.lee@example.com', github: 'jordanlee-demo' },
  { id: 'priya',  name: 'Priya Shah', email: 'priya.shah@example.com', github: 'priyashah-demo' },
];

// Where the app keeps its data in the browser (localStorage).
export const STORAGE_KEYS = {
  tasks: 'vibetracker.tasks',
};
