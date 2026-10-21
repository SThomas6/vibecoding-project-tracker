import { daysFromToday } from '../lib/dates.js';

// The demo project shown on first load (M13, PRD FR3, DR10): one made-up team
// building a personal portfolio site, with three tasks per column. `due` and
// `created` are days relative to today and `ago` is hours before now, so every
// due-date state (calm, warning, overdue, done, none) shows whenever the
// prototype is opened. Two tasks carry a pasted handoff (one with a log line)
// and a handoff history; a third has a handoff note only.
const SEED_TASKS = [
  // To Do
  {
    id: 't1', title: 'Write hero section copy', type: 'feature', status: 'todo', assignee: 'alex', due: 5, created: -1,
    description: 'Two-line intro for the landing page hero, in a friendly first-person voice.',
  },
  {
    id: 't3', title: 'Fix mobile nav overlapping the logo', type: 'bug', status: 'todo', assignee: 'jordan', due: -1, created: -3,
    description: 'On screens under 400px wide the menu button sits on top of the logo.',
  },
  {
    id: 't10', title: 'Add a dark mode toggle', type: 'feature', status: 'todo', assignee: '', due: null, created: 0,
    description: 'Follow the system setting by default, with a manual switch in the header.',
  },

  // In Progress
  {
    id: 't4', title: 'Build About page', type: 'feature', status: 'in-progress', assignee: 'priya', due: 0, created: -4,
    description: 'Bio, photo and a short timeline of past projects.',
  },
  {
    id: 't5', title: 'Project carousel skips slides', type: 'bug', status: 'in-progress', assignee: 'alex', due: 2, created: -2,
    description: 'Clicking "next" quickly jumps two slides. Probably a duplicate event listener.',
    contextTool: 'Claude',
    handoffAgo: 1,
    handoffText: [
      'Done: found the cause. A click listener is added on every render, so fast clicks fire twice.',
      'Left: move the listener into useEffect with a cleanup, then remove the debounce workaround.',
      'Watch out: autoplay and the dots share the same index state, so test both after the change.',
      'Start with: "Move the Next button listener into useEffect with a cleanup, keeping autoplay and the dots working."',
    ].join('\n'),
    handoffs: [
      {
        ago: 2,
        from: 'priya',
        to: 'alex',
        note: 'Found a duplicate click listener on re-render; move it into useEffect and check phone Safari.',
      },
    ],
  },
  {
    id: 't2', title: 'Set up contact form', type: 'feature', status: 'in-progress', assignee: 'jordan', due: 1, created: -2,
    description: 'Name, email and message fields that send to my inbox, with validation.',
  },

  // Review
  {
    id: 't6', title: 'CV layout and download button', type: 'feature', status: 'review', assignee: 'jordan', due: 3, created: -5,
    description: 'One-page CV section with a PDF download link.',
    handoffs: [
      {
        ago: 18,
        from: 'alex',
        to: 'jordan',
        note: 'Grid layout is ready; please review the PDF download link and keyboard focus order.',
      },
    ],
  },
  {
    id: 't7', title: 'Footer links 404 after deploy', type: 'bug', status: 'review', assignee: 'priya', due: -2, created: -3,
    description: 'Links work locally but break on Vercel. Likely relative paths.',
    contextTool: 'Cursor',
    handoffAgo: 25,
    handoffText: [
      'Done: relative paths break on nested routes; a vercel.json rewrite only fixed /about.',
      'Left: switch the footer links to root-relative paths ("/about", "/cv", "/contact") and remove the rewrite.',
      'Log: GET /projects/about 404 (clicked from the footer on /projects/carousel)',
      'Check: every footer link on the preview deploy, including from /projects pages.',
    ].join('\n'),
    handoffs: [
      {
        ago: 26,
        from: 'alex',
        to: 'priya',
        note: 'vercel.json rewrite only fixed /about; switch footer links to root-relative paths and test preview.',
      },
    ],
  },
  {
    id: 't11', title: 'Check colour contrast with axe', type: 'feature', status: 'review', assignee: 'alex', due: 1, created: -1,
    description: 'Run an axe scan on every page and fix any contrast issues.',
  },

  // Done
  {
    id: 't8', title: 'Write the PRD', type: 'feature', status: 'done', assignee: 'alex', due: -2, created: -6,
    description: 'Goals, features, milestones and UX for the portfolio site.',
  },
  {
    id: 't9', title: 'Set up Vite and Tailwind', type: 'feature', status: 'done', assignee: 'jordan', due: -3, created: -6,
    description: 'Project scaffold with Tailwind configured.',
  },
  {
    id: 't12', title: 'Pick fonts and colour palette', type: 'feature', status: 'done', assignee: 'priya', due: -1, created: -5,
    description: 'Inter for text, JetBrains Mono for code, and a palette checked for contrast.',
  },
];

export function createSeedTasks() {
  return SEED_TASKS.map(({ due, created, handoffAgo, handoffText, handoffs = [], ...task }) => ({
    contextTool: null,
    ...task,
    dueDate: due == null ? null : daysFromToday(due),
    createdDate: daysFromToday(created),
    handoffText: handoffText ?? '',
    handoffUpdatedAt: handoffAgo == null ? null : hoursAgo(handoffAgo),
    handoffs: handoffs.map(({ ago: handoffAgo, ...entry }, index) => ({
      id: `${task.id}-h${index + 1}`,
      at: hoursAgo(handoffAgo),
      ...entry,
    })),
  }));
}

// The demo project (M11, PRD DR8): its name and one link per deliverable.
// Demo and Documentation point at the live site and the repo; the rest are left
// for the team to add, so both card states show.
export function createSeedProject() {
  return {
    name: 'Portfolio site',
    links: {
      presentation: '',
      demo: 'https://vibecoding-project-tracker-tau.vercel.app/',
      report: '',
      documentation: 'https://github.com/SThomas6/vibecoding-project-tracker',
    },
  };
}

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}
