# Vibecoding Project Tracker

A Kanban board for vibecoding projects that keeps a handoff with each task (what's done, what's left, logs and next steps), so anyone can pick a task up and paste its briefing straight into an AI tool.

Built for CM6312 (Cardiff University) during the UXD Vibecoding Hackathon, 20/10/2026, starting from Prof. Dr. Ignacio Alvarez's hackathon starter repo (github.com/ignacioalvmar/vibecoding-project-tracker). Clients: Prof. Dr. Ignacio Alvarez and Nathan. Requirements are in [`PRD.md`](PRD.md) and the design system in [`DESIGN.md`](DESIGN.md).

**Live demo:** <https://vibecoding-project-tracker-tau.vercel.app/>. It opens without login; all data stays in your browser.

## What it does

| Feature | PRD |
|---|---|
| Four-column board (To Do, In Progress, Review, Done) with task counts; below 1280 px a bar of column links stays at the top | FR1, FR2, NFR5 |
| Demo project on first load, and Reset demo after confirming | FR3, FR20 |
| Add, edit and delete tasks in a dialog; closing the form or leaving the page with unsaved changes asks first | FR4–FR6, NFR7 |
| Drag a card to any place in any column with a mouse or pen (a line shows where it lands), or set its Status and Position in the form | FR5, FR24 |
| A confirmation message after every change | FR7 |
| Feature or Bug, each with its own colour, icon and label | FR8 |
| Owner on every card (Unassigned by default); one-step "Hand off" with an optional note, a handoff history and "Previously worked on by…" | FR9, FR10 |
| Team strip: email, GitHub handle, what each person is driving, a one-click work filter and "Add member" | FR11, FR12 |
| Due-date badge: calm, warning (under 24 hours), overdue or done | FR13, FR14 |
| Handoff for the next developer (what's done, what's left, the prompts that worked): paste or write it, Insert template, Paste from clipboard, a secrets reminder, "Last updated" and a preview on the card | FR15, FR17 |
| "Copy handoff" on cards and in the form (the secret sauce) | FR22 |
| The AI tool used, and "Copy context": the task as a TACO briefing (Task, Actor, Context, Output format) for one of four prompt goals | FR16, FR18 |
| A slim row of four deliverable links, and renaming the project | FR19, FR25 |
| Search and filter the board by who worked on a task, type, due state, and handoff or AI tool | FR21 |
| Light and Dark mode (WCAG 2.2 AA contrast in both), starting from the device's setting; a choice is saved across visits | FR23 |

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

There's no server or database. Everything is saved as JSON in the browser's localStorage (the header says so), checked when it's loaded, and a reset screen appears instead of a blank page if it's ever damaged:

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
- **Dark mode:** the same contrast rules apply, including focus outlines and state outlines (3:1 or better).
- **Phones and touch:** anything you act on is at least 14 px; form fields are 16 px on phones (so iOS doesn't zoom in); compact controls grow to 44 px with 8 px gaps on touch screens; below 1024 px the filters and team cards fold behind buttons; New task floats within thumb reach, and neither it nor the column bar ever covers the focused control.
- **Testing:** every screen and dialog was checked with axe-core in Light and Dark mode (0 violations), by keyboard, and in colour-blindness simulations.

Pasted text is always shown as text and never run. Links only open if they start with http:// or https://.
