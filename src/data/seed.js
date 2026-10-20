import { daysFromToday } from '../lib/dates.js';

// The demo project shown on first load (M13, PRD FR3, DR10): one made-up team
// building a personal portfolio site, with three tasks per column. `due` and
// `created` are days relative to today and `ago` is hours before now, so every
// due-date state (calm, warning, overdue, done, none) shows whenever the
// prototype is opened. Two tasks carry full context and a prompt log.
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
    ago: 2,
    context: [
      '## Background',
      'The project carousel on the home page jumps two slides when "Next" is clicked quickly. It happens in Chrome and Safari, but not on first load.',
      '',
      '## Constraints',
      'Keep the current Carousel component and its props. No new libraries.',
      '',
      '## Tried so far',
      '- Logged the click handler: it fires twice after any re-render.',
      '- Debouncing the button hides the bug but makes the carousel feel slow.',
      '',
      '## Pick up from here',
      'The click listener is added in the component body on every render. Move it into useEffect with a cleanup that removes it, then test fast clicking on a phone.',
    ].join('\n'),
    prompts: [
      {
        ago: 5, tool: 'Claude', outcome: 'worked',
        prompt: 'Why does my React carousel skip two slides when I click Next quickly? Here is the component.',
        result: 'Found a click listener added on every render, and showed how to move it into useEffect with a cleanup.',
      },
      {
        ago: 4, tool: 'ChatGPT', outcome: 'partly',
        prompt: 'Add a debounce to the Next button in this carousel component.',
        result: 'Stops the skipping, but clicks less than 300 ms apart are ignored, so it feels laggy.',
      },
      {
        ago: 3, tool: 'Cursor', outcome: 'failed',
        prompt: 'Rewrite the carousel with CSS scroll snap.',
        result: 'Rewrote the whole component and broke the autoplay and the dots.',
      },
    ],
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
    ago: 26,
    context: [
      '## Background',
      'The footer links (About, CV, Contact) work locally but return 404 on the Vercel deploy.',
      '',
      '## Constraints',
      'Must work on Vercel and locally. Keep the links as plain anchors.',
      '',
      '## Tried so far',
      '- The links use relative paths like "about.html", so on nested routes they resolve to /projects/about.html.',
      '- A vercel.json rewrite fixed /about, but not the nested routes.',
      '',
      '## Pick up from here',
      'Change the footer links to root-relative paths ("/about") and remove the rewrite. Check every footer link on the preview deploy before merging.',
    ].join('\n'),
    prompts: [
      {
        ago: 30, tool: 'Cursor', outcome: 'worked',
        prompt: 'Why do my footer links 404 on Vercel but work locally?',
        result: 'Relative paths resolve against the current route; suggested root-relative links.',
      },
      {
        ago: 27, tool: 'Claude', outcome: 'partly',
        prompt: 'Write a vercel.json rewrite so /about serves about.html.',
        result: 'Fixed /about only; nested routes still 404.',
      },
    ],
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
  return SEED_TASKS.map(({ due, created, ago, prompts = [], handoffs = [], ...task }) => ({
    context: '',
    contextTool: null,
    ...task,
    dueDate: due == null ? null : daysFromToday(due),
    createdDate: daysFromToday(created),
    contextUpdatedAt: ago == null ? null : hoursAgo(ago),
    promptLog: prompts.map(({ ago: promptAgo, ...entry }, index) => ({
      id: `${task.id}-p${index + 1}`,
      at: hoursAgo(promptAgo),
      ...entry,
    })),
    handoffs: handoffs.map(({ ago: handoffAgo, ...entry }, index) => ({
      id: `${task.id}-h${index + 1}`,
      at: hoursAgo(handoffAgo),
      ...entry,
    })),
  }));
}

// The demo project (M11, PRD DR8): its name and one link per deliverable.
// Documentation points at the real repo; the rest are left for the team to add.
export function createSeedProject() {
  return {
    name: 'Portfolio site',
    links: {
      presentation: '',
      demo: '',
      report: '',
      documentation: 'https://github.com/SThomas6/vibecoding-project-tracker',
    },
  };
}

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}
