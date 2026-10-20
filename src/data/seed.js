import { daysFromToday } from '../lib/dates.js';

// Demo tasks for one vibecoding project (a personal portfolio site), so the
// board isn't empty on first load. `due` and `created` are days relative to
// today, so the due-date colours still make sense whenever the prototype is
// opened.
const SEED_TASKS = [
  {
    id: 't1', title: 'Write hero section copy', type: 'feature', status: 'todo', assignee: 'alex', due: 5, created: -1,
    description: 'Two-line intro for the landing page hero, in a friendly first-person voice.',
  },
  {
    id: 't2', title: 'Set up contact form', type: 'feature', status: 'todo', assignee: 'priya', due: 1, created: -2,
    description: 'Name, email and message fields that send to my inbox, with validation.',
  },
  {
    id: 't3', title: 'Fix mobile nav overlapping the logo', type: 'bug', status: 'todo', assignee: 'jordan', due: -1, created: -3,
    description: 'On screens under 400px wide the menu button sits on top of the logo.',
  },
  {
    id: 't4', title: 'Build About page', type: 'feature', status: 'in-progress', assignee: 'priya', due: 0, created: -4,
    description: 'Bio, photo and a short timeline of past projects.',
  },
  {
    id: 't5', title: 'Project carousel skips slides', type: 'bug', status: 'in-progress', assignee: 'alex', due: 2, created: -2,
    description: 'Clicking "next" quickly jumps two slides. Probably a duplicate event listener.',
  },
  {
    id: 't6', title: 'CV layout and download button', type: 'feature', status: 'review', assignee: 'jordan', due: 3, created: -5,
    description: 'One-page CV section with a PDF download link.',
  },
  {
    id: 't7', title: 'Footer links 404 after deploy', type: 'bug', status: 'review', assignee: 'priya', due: 0, created: -1,
    description: 'Links work locally but break on Vercel. Likely relative paths.',
  },
  {
    id: 't8', title: 'Write the PRD', type: 'feature', status: 'done', assignee: 'alex', due: -2, created: -6,
    description: 'Goals, features, milestones and UX for the portfolio site.',
  },
  {
    id: 't9', title: 'Set up Vite and Tailwind', type: 'feature', status: 'done', assignee: 'jordan', due: -3, created: -6,
    description: 'Project scaffold with Tailwind configured.',
  },
];

export function createSeedTasks() {
  return SEED_TASKS.map(({ due, created, ...task }) => ({
    ...task,
    dueDate: due == null ? null : daysFromToday(due),
    createdDate: daysFromToday(created),
    context: '',
    contextTool: null,
    contextUpdatedAt: null,
  }));
}
