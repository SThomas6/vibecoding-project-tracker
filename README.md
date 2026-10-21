# Vibecoding Project Tracker

A Kanban board for vibecoding projects that also keeps the AI context behind each task: the prompts, replies, logs and next steps, so anyone can pick a task up and paste its briefing straight into an AI tool.

Built for CM6312 (Cardiff University) during the UXD Vibecoding Hackathon, 20/10/2026. Clients: Prof. Dr. Ignacio Alvarez and Nathan. Requirements are in [`PRD.md`](PRD.md) and the design system in [`DESIGN.md`](DESIGN.md).

**Live demo:** <https://vibecoding-project-tracker-tau.vercel.app/>. It opens without login; all data stays in your browser.

## What it does

| Feature | PRD |
|---|---|
| Four-column board (To Do, In Progress, Review, Done) with task counts | FR1, FR2 |
| Add, edit and delete tasks in a dialog; drag a card to another column with the mouse, or change its status in the form | FR4–FR6 |
| Feature or Bug, each with its own colour, icon and label | FR8 |
| Owner on every card, Unassigned by default, one-step "Hand off" with optional handoff note and contributor trail ("Previously worked on by…") | FR9, FR10 |
| Team strip: email, GitHub handle, what each person is driving, one-click work filter and "Add member" | FR11, FR12 |
| Due-date badge: calm, warning (under 24 hours), overdue or done | FR13, FR14 |
| The AI tool used, and a prompt goal (TACO structure) for the copied briefing | FR16 |
| "Copy context": the task as a TACO-structured Markdown briefing for an AI tool | FR18 |
| Four deliverable link cards and an editable project name | FR19 |
| Reset to the demo project, after confirming | FR20 |
| Search issues and filter the board by who has worked on or owns a task, task type, due state and AI context or tool | FR21 |
| Handoff box: paste in the handoff text; the next developer reads it on the card and copies it into their AI agent | FR22 |
| Light and Dark mode toggle (WCAG 2.2 AA contrast in both palettes), saved across visits | FR23 |

## Run it

Needs Node 18 or later.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # static files in dist/
```

It deploys to any static host. On Vercel, import the repo and accept the Vite defaults.

## How the code is organised

```
src/
  App.jsx          state and handlers for the whole app
  constants.js     columns, task types, team, AI tools, deliverables, storage keys
  data/seed.js     the demo project (dates are relative to today)
  hooks/           useLocalStorage (saves state), useNow (refreshes due dates)
  lib/             small pure helpers: dates, due states, team, tasks,
                   briefing (Markdown for "Copy context"), clipboard, links
  components/      one component per file, e.g. Board, TaskCard, TaskModal,
                   HandoffFields, BriefingFields, Deliverables, Dialog (shared shell)
```

Shared button and field styles are in `components/styles.js`, and colour tokens in `tailwind.config.js`. Keep every file under 300 lines.

## Data

There's no server or database. Everything is saved as JSON in the browser's localStorage:

- `vibetracker.tasks`: the tasks, including context, the pasted handoff and the handoff history
- `vibetracker.project`: the project name and deliverable links
- `vibetracker.team`: the team members (starts with the demo team)
- `vibetracker.theme`: `'light'` or `'dark'` theme preference

The first visit loads the demo project. **Reset demo** in the header (or clearing site data) brings it back.

## Accessibility

The tracker targets WCAG 2.2 AA:

- **Colour:** colour is never the only signal; every state also has an icon and words.
- **Keyboard:** everything works with a keyboard, with a visible focus outline and a "Skip to board" link. Dragging cards is a mouse shortcut; the Status field in the task form does the same without dragging (WCAG 2.5.7).
- **Dialogs:** they use the native `<dialog>` element, so focus stays inside and returns to where it was.
- **Confirmations:** they're announced through a live region.
- **Testing:** every screen and dialog was checked with axe-core (0 violations), by keyboard, and in colour-blindness simulations.

Pasted text is always shown as text and never run. Links only open if they start with http:// or https://.
