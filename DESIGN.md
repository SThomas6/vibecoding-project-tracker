# Vibecoding Project Tracker — Design

**Status:** Filled in for `design-done`. Direction chosen: **A. Clear desk**, picked for accessibility.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B, during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

One sentence that captures the feeling the tracker should leave you with.

Calm, light and focused, like a tidy desk: the tasks and the prompts behind them stand out, not the tool.

Two or three references that capture the vibe (links to dribbble shots, screenshots of apps you admire, Pinterest boards — anything visual):

- [Linear](https://linear.app): calm neutral surfaces with a single accent colour.
- [GitHub Projects](https://github.com/features/issues): a plain, readable board where every label has text.
- [Notion](https://www.notion.so) light theme: generous white space and quiet typography.

Anti-references — what we are explicitly **not** trying to look like:

- Neon "hacker" dashboards, and rainbow boards where colour is the only signal.

## 2. Color palette

These are the colors the build milestones will reference. The hex values are in `tailwind.config.js`; the Tailwind class names are in brackets. Contrast ratios are against the background each colour is used on (WCAG 2.2 AA needs 4.5:1 for text and 3:1 for UI parts like borders and focus rings).

### Brand

| Token | Hex | Where it shows up | Contrast |
|---|---|---|---|
| `brand-primary` (`brand`) | `#4338CA` | Logo mark, primary buttons, focus ring | White text on it 7.90:1 · as focus ring on page 7.55:1 |
| `brand-accent` (`brand-accent`) | `#0E7490` | Links and highlights | 5.36:1 on white |
| `surface-page` (`surface-page`) | `#F8FAFC` | Page background | — |
| `surface-card` (`surface-card`) | `#FFFFFF` | Card background | — |
| `text-primary` (`ink`) | `#0F172A` | Body text | 17.85:1 on cards · 16.30:1 on columns |
| `text-muted` (`ink-muted`) | `#475569` | Captions, dates, counts | 7.58:1 on cards · 6.92:1 on columns |

Supporting tokens: `surface-sunken` `#F1F5F9` (column background), `line` `#E2E8F0` (decorative borders), `line-control` `#64748B` (form-control borders, 4.76:1 on white).

### Task type (M6 `tag-style`)

| Token | Hex | When used | Contrast |
|---|---|---|---|
| `type-feature` (`feature`) | `#1D4ED8` on tint `#DBEAFE` | Cards tagged `feature` (accent stripe + sparkles icon + the word "Feature") | 5.49:1 |
| `type-bug` (`bug`) | `#9D174D` on tint `#FCE7F3` | Cards tagged `bug` (accent stripe + bug icon + the word "Bug") | 6.71:1 |

Blue and magenta were picked over the usual green and red because red/green is the hardest pair to tell apart for the most common types of colour blindness. Red is kept for "overdue" only.

### Due-date states (M8 `due-tint`)

| Token | Hex | When used | Contrast |
|---|---|---|---|
| `due-safe` | `#166534` on tint `#DCFCE7` | 24 hours or more away (clock icon, "Due in 3 days") | 6.49:1 |
| `due-warning` | `#92400E` on tint `#FEF3C7` | Less than 24 hours (warning icon, "Due today") | 6.37:1 |
| `due-overdue` | white on solid `#B91C1C` | Past due (alarm icon, "Overdue by 1 day") | 6.47:1 |
| `due-neutral` | `#475569` on tint `#F1F5F9` | Done (overrides date; check icon, "Done") | 6.92:1 |

Overdue is the only solid chip, so it stands out by weight and shape as well as colour.

## 3. Typography

| Role | Font | Why |
|---|---|---|
| Heading | Inter (semibold) | Designed for screens, with a tall x-height that stays readable at small sizes. |
| Body | Inter (regular) | Using one family keeps the page calm and loads quickly. |
| Monospace (tags, badges, code) | JetBrains Mono | Clearly separates look-alike characters (0/O, 1/l/I), which matters when reading prompts and code. |

Both fonts are bundled with the app (`@fontsource`), so no requests go to third-party font servers.

Sizes (in `rem`, so browser zoom and user font settings still work):

- Page title: 24 px / semibold
- Column header: 16 px / semibold, written exactly as "To Do", "In Progress", "Review", "Done" (no all-caps)
- Card title: 14 px / medium
- Body: 14–16 px / regular
- Caption: 12 px / regular muted (only for secondary details, never for anything you need to act on)

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** White cards on a light grey column with a 1px border and no heavy shadow; the title comes first, with owner and dates in one quiet row underneath.
- **Buttons:** A solid indigo fill for the one main action on screen (New task, Save) and outlined for everything else, at least 44 px tall so they're easy to hit.
- **Modal:** Centred, about 36 rem wide, on a dimmed backdrop. Focus moves into it when it opens and returns to the card when it closes, and Escape closes it.
- **Empty states:** A dashed border with muted text that says what to do next. Never sad.
- **Drag affordance (if used):** None in the core build, which uses a status dropdown. If drag-and-drop is added later, the dropdown stays as the keyboard alternative.

## 5. Voice / microcopy

Plain, short and calm: the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
| "+" button label | "New task" |
| Empty column placeholder | "No tasks here yet." |
| Toast after "Copy as Prompt Context" | "Context copied. Paste it into your AI tool." |
| Confirm-delete message | "Delete this task? This can't be undone." |
| Handoff toast (M7 `task-owner`) | "Handed off to {name}." |
| Toasts after add / edit / delete (M5) | "Task added" · "Task updated" · "Task deleted" |
| Missing title error | "Enter a title for the task." |

## 6. Logo / wordmark

- **Product name:** Vibecoding Project Tracker
- **Wordmark style:** The name in Inter semibold, ink colour, next to a small indigo board icon (Lucide `square-kanban`), top left of every page.

## 7. Theme switching and out of scope

- **Light and Dark mode (FR23):** Light mode ("Clear desk") is the default. A header toggle switches to an accessible Dark mode (`html.dark` CSS variables in `src/index.css`), where every text pair meets WCAG 2.2 AA (`#F8FAFC` ink on `#1E293B` card = 13.98:1; `#CBD5E1` muted on `#1E293B` = 9.85:1; `#94A3B8` control borders on `#1E293B` = 5.71:1; all type and due-state badges between 6.47:1 and 10.62:1).
- **Out of scope:** arbitrary user-picked colour wheels (which could break contrast), animations beyond a 200 ms fade, and custom icon sets (Lucide icons are used throughout).

## 8. Accessibility rules

These apply to every milestone. The clients asked for accessibility in both the visual design and the code (ARIA).

- **Contrast:** every text pair meets WCAG 2.2 AA (see §2). Form-control borders and the focus ring are at least 3:1.
- **Never colour alone:** task type is colour + icon + word, and due state is colour + icon + text.
- **Keyboard:** everything works with Tab, Enter and Escape. A visible focus outline is always on, and a "Skip to board" link comes first.
- **Screen readers:** `header`/`main` landmarks, a heading per column, cards in lists, a label on every form field, and toasts announced through an `aria-live` region.
- **Zoom and small screens:** text sizes use `rem`, and the board reflows from four columns to two to one, so it still works at 400% zoom or on a phone.
- **Motion:** honour `prefers-reduced-motion`.
- **Checking:** run an automated axe-core scan and a keyboard-only pass after each milestone.

---

*DESIGN.md version: hackathon-starter v1*
