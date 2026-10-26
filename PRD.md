# Vibecoding Project Tracker: PRD

**Status:** As agreed in class on 20/10/2026, this PRD holds only the functional, non-functional and data requirements. Each has a unique ID and an MVP mark, so every prototype feature maps back to one. It matches the prototype as built.

**Problem:** In a vibecoding team, what was tried with the AI on a task lives in one person's chat history, so whoever picks it up next starts from scratch.
**Project:** A Kanban-style tracker in which each task keeps its last developer's handoff and copies as a ready-made briefing for the next developer's AI tool.
**Clients:** Prof. Dr. Ignacio Alvarez (THI) and Nathan (Cardiff University).

**Key**
- **MVP:** ✅ marks the minimum viable product: one team manages its tasks, owners and due dates, links tasks to user stories, keeps a handoff with each task, copies it as an AI briefing and pins its deliverables. The rest are **Should** or **Could** (MoSCoW: Clegg and Barker, 1994), and all are built.
- **Sources:** **IA** and **N** are Ignacio and Nathan on client day (20/10/2026); **FL** is Fernando Loizides, module leader and client; **Brief** is the client brief; **Starter PRD** is the hackathon starter PRD; **Extra** means not asked for, so a reason is given.

---

## 1. Functional requirements

What the tracker must do (Sommerville, 2016). Each one completes "The tracker shall…".

| ID | Requirement | Source and reason | MVP? |
|---|---|---|---|
| FR1 | Show tasks as cards on a Kanban board: To Do, In Progress, Review, Done. | Brief: "a kanban board"; IA's four stages. | ✅ |
| FR2 | Show how many tasks each column holds, and a message when one is empty. | Extra: Kanban makes work visible (Anderson, 2010). | Should |
| FR3 | Load a demo project (DR10) the first time it opens. | Assessors see every feature working straight away. | ✅ |
| FR4 | Add tasks through a "New task" form; a title is required. | IA: tasks must be "editable and configurable"; Starter PRD. | ✅ |
| FR5 | Open a card to edit its task; changing the status moves the card. | Starter PRD: "Move the task across columns as you work". | ✅ |
| FR6 | Delete a task from the form, after confirming. | IA. Confirming prevents mistakes. | ✅ |
| FR7 | Confirm each change or copy with a message shown for at least 6 seconds. | Extra: users see what has happened (Nielsen, 1994). | Should |
| FR8 | Mark each task as a Feature or a Bug by colour, icon and label. | Starter PRD; N: colour alone fails colour-blind users. | Should |
| FR9 | Assign each task to one team member, or leave it Unassigned (the default). | IA: to "ask for updates" from its owner. | ✅ |
| FR10 | Hand a task to a teammate in one step, with an optional note. | Starter PRD; IA: the new owner isn't "starting from scratch". | Should |
| FR11 | Show a Team strip with each member's name, email link, GitHub handle, current tasks and a filter. | IA: to "directly email the owner"; N: GitHub. | Should |
| FR12 | Add team members: a name, with an optional email address and GitHub handle. | IA: "adding new members to the team". | Should |
| FR13 | Show each due date relative to today, such as "Due in 3 days" or "Overdue by 1 day". | Brief: "track project tasks over time". | ✅ |
| FR14 | Colour and icon the due label: calm, a warning under 24 hours, an alarm when overdue. | IA: yellow for "immediate", red for overdue. | Should |
| FR15 | Keep a "Handoff for the next developer" on each task: what's done, what's left, the prompts that worked. | IA; Brief: "note useful prompts and results". | ✅ |
| FR16 | Record the AI tool used: Claude, ChatGPT, Cursor, Lovable, Replit or Other. | IA: "log what tool this was". | ✅ |
| FR17 | Show when the handoff was last updated, and preview it on the card. | Starter PRD. Shows how fresh it is. | Should |
| FR18 | Copy a task, with its user story, as a TACO briefing (Task, Actor, Context, Output format). | IA's TACO; structured prompts are more dependable (White et al., 2023). | ✅ |
| FR19 | Pin four deliverable links above the board: Presentation, Demo, Report and Documentation. | Brief: "key milestones"; IA; Starter PRD. | ✅ |
| FR20 | Reset to the demo project, after confirming. | Extra: a demo or assessment starts from a known state. | Should |
| FR21 | Search tasks, and filter by person, type, due state, handoff, AI tool or user story. | Extra: "overview first, zoom and filter" (Shneiderman, 1996). | Should |
| FR22 | Copy just a task's handoff for the next developer's AI agent. | IA invited extras; resuming without context is slow (Parnin and Rugaber, 2011). | Should |
| FR23 | Start in the device's Light or Dark setting, and remember the user's own choice. | N: "make it customizable", if time allows. | Could |
| FR24 | Drag a card to any place in any column with a mouse or pen. | N; the form's Position field works without dragging. | Could |
| FR25 | Rename the project in the header and browser tab. | IA: one project per team. | Should |
| FR26 | Add, edit and delete user stories ("As a…, I want…, so that…"), coded US1, US2 and so on. | FL (06/10): "match user stories" (Cohn, 2004). | ✅ |
| FR27 | Link each task to one user story, shown on its card. | FL. Shows why a task exists. | ✅ |
| FR28 | Show how many of each story's tasks are done, and filter the board to them. | FL. Shows which users' needs are met. | Should |

**Out of scope:**
- **Login:** optional for the clients (IA), and assessors mustn't have to register (FL).
- **More than one team or project:** IA said this can come later.
- **A shared, real-time board:** it needs a server and a database (FL, Starter PRD); Copy handoff carries a task on instead.
- **Free colour choice:** it could break NFR2's contrast, so FR23 offers two checked palettes.
- **Dragging by touch:** it fights page scrolling, so touch users set the Status and Position instead.
- **Editing or removing members, several stories per task, progress charts, prompt history, sounds, exports and other languages:** not asked for.

---

## 2. Non-functional requirements

How well the tracker must work, grouped by the quality types in ISO/IEC 25010:2023, each with a test.

| ID | Requirement | Test | Why | MVP? |
|---|---|---|---|---|
| NFR1 | **Accessibility:** WCAG 2.2 AA (W3C, 2023) in both themes, respecting "reduce motion". | No axe-core violations, plus a manual check. | IA: "always design for accessibility in mind". | ✅ |
| NFR2 | **Colour:** contrast of 4.5:1 for text and 3:1 for icons; never colour alone. | Every colour pair measured; colour-blindness checks. | N: colour-blind users "might struggle". | ✅ |
| NFR3 | **Keyboard:** everything works by keyboard, with visible focus and a "Skip to board" link. | A keyboard-only run of every FR. | Not everyone uses a mouse (WCAG 2.1.1). | ✅ |
| NFR4 | **Screen readers:** landmarks, labelled controls and messages read out. | A VoiceOver run of the main tasks. | IA: accessibility includes the code (ARIA). | ✅ |
| NFR5 | **Any screen size:** works from 320 px wide; main buttons and fields are at least 44 px. | Checked from 320 to 1440 px, and zoomed to 400%. | Phones and zoom users (WCAG 1.4.10, 2.5.8). | ✅ |
| NFR6 | **Easy to learn:** a first-time user can add, hand off and copy a task unaided. | 4 of 5 users finish each within 2 minutes; SUS 68+ (Brooke, 1996). | Brief: it must be "intuitive". | ✅ |
| NFR7 | **Error protection:** deleting, resetting or discarding edits asks first, with the safe choice focused. | Cancelling changes nothing. | There's no backup (Nielsen, 1994). | ✅ |
| NFR8 | **Speed:** loads within 1 s on a computer and 2.5 s on a phone; reacts within 0.1 s, even with 100 tasks. | Lighthouse; a 100-task board timed. | "Good" Core Web Vitals (web.dev, n.d.). | Should |
| NFR9 | **No lost work:** changes save at once and survive reloads; damaged data never blanks the page. | Reopen the browser; corrupt the saved data. | A tracker that forgets is useless. | ✅ |
| NFR10 | **Always available:** a public HTTPS link with no login, live until graduation. | Opens in a private window on a new device. | FL: assessors mustn't register. | ✅ |
| NFR11 | **Privacy:** data stays on the device, with no server, analytics or outside requests. | No outside requests in the Network panel. | IA: a "secretive project" mustn't be exposed. | ✅ |
| NFR12 | **Security:** pasted text never runs as code, and links must use http or https. | Pasting `<script>` into each field runs nothing. | AI output can contain code. | ✅ |
| NFR13 | **Browsers:** current Chrome, Edge, Firefox and Safari, on desktop and mobile. | Every MVP requirement passes in each. | IA: the web is "the default here". | ✅ |
| NFR14 | **Technology:** React, Vite and Tailwind CSS; a static site with no backend. | `npm run build` gives static files only. | N: a "leading web framework"; FL: no backend. | ✅ |
| NFR15 | **Maintainability:** small components, shared settings in one place, and a README. | No source file over 300 lines. | The prototype continues in Nathan's module. | Should |

---

## 3. Data requirements

What the tracker stores, why, and where it comes from (Wiegers and Beatty, 2013).

| ID | Data | Why | Where from | MVP? |
|---|---|---|---|---|
| DR1 | **Task:** ID; title (required, 120 characters); description (2,000); type; status; user story; column position. | To show, edit and move tasks (FR1 to FR8). | The form; the tracker makes the ID. | ✅ |
| DR2 | **Owner:** a member's ID, or Unassigned. | IA: "see who we assigned" (FR9). | The form, or Hand off. | ✅ |
| DR3 | **Dates:** an optional due date, and the date created. | To track tasks over time (FR13, FR14). | The user; the device's clock. | ✅ |
| DR4 | **Handoff and AI tool:** up to 20,000 characters, and the tool used. | So no one starts "from scratch" (IA). | The outgoing developer or their AI agent. | ✅ |
| DR5 | **Handoff last updated:** a date and time. | Shows how fresh it is (FR17). | Set when the handoff changes. | Should |
| DR6 | **Handoff history:** from whom, to whom, an optional note (280 characters) and when. | Shows who has worked on a task (FR10). | Recorded by Hand off. | Should |
| DR7 | **Team member:** ID; name (required, 60 characters); optional email address and GitHub handle. | What IA and N asked for (FR9 to FR12). | Each member, when added. | ✅ |
| DR8 | **Project:** name (80 characters) and four optional deliverable links (http or https). | One project per team; "key milestones" (Brief). | Typed or pasted by the team. | ✅ |
| DR9 | **Copied briefing:** Markdown with Task, Actor, Context and Output format sections. | A clear prompt for any AI tool (FR18, FR22). | Built from the task, DR15 and DR16. | ✅ |
| DR10 | **Demo project:** a fictional team, 12 tasks covering every state, and four user stories. | Every feature can be seen at once (FR3, FR20). | Written by the developer. | ✅ |
| DR11 | **Calculated, not stored:** due states, counts, filter results and story progress. | Stored copies would go out of date. | Worked out when shown. | ✅ |
| DR12 | **Storage:** JSON in the browser's localStorage, under four keys; nothing on a server. | No backend needed (FL); keeps data private (NFR11). | Saved on every change (NFR9). | ✅ |
| DR13 | **Filters and theme:** filters held in memory; the chosen theme saved. | To narrow the board and keep the theme (FR21, FR23). | The filter bar, Tasks buttons and header. | Should |
| DR14 | **Personal data limits:** names, and optional email addresses and GitHub handles, only. | UK GDPR data minimisation, Article 5(1)(c). | Applies to DR7. | ✅ |
| DR15 | **Prompt goals:** four goals, each with Task, Actor and Output format text. | Fills the briefing's TACO sections (FR18). | The developer, from IA's TACO structure. | Should |
| DR16 | **User story:** ID; number (shown as US1); role (required, 60); want (required, 160); benefit (160). | Links tasks to the needs they meet (FR26 to FR28). | Typed by the team. | ✅ |

---

## References

- Anderson, D.J. (2010) *Kanban: Successful Evolutionary Change for Your Technology Business*. Sequim, WA: Blue Hole Press.
- Brooke, J. (1996) 'SUS: a "quick and dirty" usability scale', in Jordan, P.W., Thomas, B., Weerdmeester, B.A. and McClelland, I.L. (eds) *Usability Evaluation in Industry*. London: Taylor & Francis, pp. 189-194.
- Clegg, D. and Barker, R. (1994) *Case Method Fast-Track: A RAD Approach*. Wokingham: Addison-Wesley.
- Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston, MA: Addison-Wesley.
- ISO/IEC 25010:2023 *Systems and software engineering: Systems and software Quality Requirements and Evaluation (SQuaRE): Product quality model*. Geneva: ISO.
- Nielsen, J. (1994, updated 2024) *10 usability heuristics for user interface design*. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/ten-usability-heuristics/
- Parnin, C. and Rugaber, S. (2011) 'Resumption strategies for interrupted programming tasks', *Software Quality Journal*, 19(1), pp. 5-34. doi:10.1007/s11219-010-9104-9
- Shneiderman, B. (1996) 'The eyes have it: a task by data type taxonomy for information visualizations', *Proceedings of the 1996 IEEE Symposium on Visual Languages*. Boulder, CO, pp. 336-343. doi:10.1109/VL.1996.545307
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Harlow: Pearson.
- UK GDPR (2018) *Regulation (EU) 2016/679 as retained in UK law*, Article 5. Available at: https://www.legislation.gov.uk/eur/2016/679/contents
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October. Available at: https://www.w3.org/TR/WCAG22/
- web.dev (n.d.) *How the Core Web Vitals metrics thresholds were defined*. Available at: https://web.dev/articles/defining-core-web-vitals-thresholds
- White, J. et al. (2023) 'A prompt pattern catalog to enhance prompt engineering with ChatGPT', *arXiv*, 2302.11382. Available at: https://arxiv.org/abs/2302.11382
- Wiegers, K. and Beatty, J. (2013) *Software Requirements*. 3rd edn. Redmond, WA: Microsoft Press.

---

*PRD version 4.4 · 26/10/2026: a shorter rewrite of 4.3, with the same IDs and MVP marks.*
