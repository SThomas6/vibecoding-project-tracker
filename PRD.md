# Vibecoding Project Tracker: PRD

**Status:** As agreed with the clients on 20/10/2026, this PRD holds only the functional, non-functional and data requirements. Each has a unique ID and an MVP mark, so every prototype feature maps back to one. It matches the prototype as built.

**Problem:** In a vibecoding team, what was tried with the AI on a task lives in one person's chat history, so whoever picks it up next starts from scratch.
**Project:** A Kanban-style tracker in which each task keeps its last developer's handoff and copies as a ready-made briefing for the next developer's AI tool.
**Clients:** two clients, a product owner and the lead of the team that will extend the tracker.

**Key**
- **MVP:** ✅ marks the minimum viable product: one team manages its tasks, owners and due dates, links tasks to user stories, keeps a handoff with each task, copies it as an AI briefing and pins its deliverables. The rest are **Should** or **Could** (MoSCoW: Clegg and Barker, 1994), and all are built.
- **Sources:** **Client** is the clients' interview (20/10/2026) or Q&A (28/10/2026); **Brief** is the client brief; **Starter PRD** is the client's starter PRD; **Extra** means not asked for, so a reason is given.

---

## 1. Functional requirements

What the tracker must do (Sommerville, 2016). Each one completes "The tracker shall…".

| ID | Requirement | Source and reason | MVP? |
|---|---|---|---|
| FR1 | Show tasks on a Kanban board (To Do, In Progress, Review, Done), with a count on each column. | Brief: "a kanban board"; the client's four stages. Counts make the load on each stage visible. | ✅ |
| FR2 | Load a demo project (DR9) on first use, and reset to it. | Brief: one example must "work with all the features"; a demo starts from a known state. | ✅ |
| FR3 | Add, edit and delete tasks; a title is required, and changing the status moves the card. | Client: tasks must be "editable and configurable"; Starter PRD: "Move the task across columns as you work". NFR5 makes deleting ask first. | ✅ |
| FR4 | Confirm each change with a message. | Extra: users see what has happened (Nielsen, 1994). | Should |
| FR5 | Mark tasks as Feature or Bug by colour, icon and label. | Starter PRD; Client: colour alone fails colour-blind users. | Should |
| FR6 | Assign each task to one member, or none, and hand it to a teammate with an optional note. | Client: to "ask for updates" from its owner, and so the new owner isn't "starting from scratch"; Starter PRD. | ✅ |
| FR7 | Show the team, with contact links and a work filter, and add members. | Client: to "directly email the owner", see GitHub handles and allow "adding new members to the team". | Should |
| FR8 | Show due dates relative to today, with a colour and icon for urgency. | Brief: "track project tasks over time"; Client: yellow for "immediate", red for overdue. | ✅ |
| FR9 | Keep a handoff on each task (what is done, what is left, prompts that worked), the AI tool used and when it changed. | Client: "log what tool this was"; Brief: "note useful prompts and results"; Starter PRD: show how fresh it is, with a preview on the card. | ✅ |
| FR10 | Copy a task as a TACO briefing for an AI tool, or copy just its handoff. | Client's TACO format, which matches the Persona and Template prompt patterns (White et al., 2023); resuming without context is slow (Parnin and Rugaber, 2011). | ✅ |
| FR11 | Pin four deliverable links above the board, under a project name the team can change. | Brief: "key milestones"; Client: one project per team. | ✅ |
| FR12 | Search; filter by person, type, due date, handoff, tool or story. | Extra: "overview first, zoom and filter" (Shneiderman, 1996). | Should |
| FR13 | Add, edit and delete user stories, link each task to one, and show each story's progress. | Brief: "match user stories" (Cohn, 2004). Shows why a task exists, and which needs are met. | ✅ |
| FR14 | Drag cards with a mouse or pen. | Client; the form's Status and Position fields work without dragging. | Could |
| FR15 | Offer Light and Dark mode, starting in Light. | Client: "make it customizable", if time allows. | Could |
| FR16 | Show an MVP login page that signs in a demo user with no details, and Log out. | Client Q&A (28/10): a login page; the Brief says reviewers must not register, so no details are needed. | ✅ |

**Out of scope:**
- **Real accounts:** FR16 is only the interface of a login, because reviewers mustn't have to register (Brief); accounts need a backend.
- **More than one team or project:** the clients said this can come later.
- **A shared, real-time board:** it needs a server and a database (Brief, Starter PRD); Copy handoff carries a task on instead.
- **Free colour choice:** it could break NFR2's contrast, so FR15 offers two checked palettes.
- **Dragging by touch:** it fights page scrolling, so touch users set the Status and Position instead.
- **Editing or removing members, several stories per task, progress charts, prompt history, sounds, exports and other languages:** not asked for.

---

## 2. Non-functional requirements

How well the tracker must work, each labelled by a quality concern from ISO/IEC 25010 (ISO, 2023) and given a test.

| ID | Requirement | Test | Why | MVP? |
|---|---|---|---|---|
| NFR1 | **Accessibility:** the tracker meets WCAG 2.2 AA in Light and Dark mode. Every feature works with a keyboard alone, and screen readers can read every button and message. | No axe-core violations; every FR completed using only a keyboard. | Client: "always design for accessibility in mind". | ✅ |
| NFR2 | **Colour:** all text has a contrast of at least 4.5:1, and colour is never the only clue to meaning. | Every colour pair measured; checked in colour-blindness simulations. | Client: colour-blind users "might struggle". | ✅ |
| NFR3 | **Screen sizes:** the tracker works on screens from 320 px wide, and main buttons are at least 44 px. | Checked from 320 to 1440 px wide, and zoomed to 400%. | People use phones and zoom in (WCAG 1.4.10, 2.5.8). | ✅ |
| NFR4 | **Easy to learn:** new users can add, hand off and copy a task without help. | New users finish all three tasks without help. | Brief: it must be "intuitive". | ✅ |
| NFR5 | **Preventing mistakes:** deleting, resetting or discarding changes always asks first. | Pressing Cancel changes nothing. | Extra: a task's handoff and history take hours to rebuild (Nielsen, 1994). | ✅ |
| NFR6 | **Speed:** pages load within 2.5 seconds on a phone, and the tracker responds within 0.1 seconds. | Lighthouse; a 100-task board timed. | Anything under 0.1 s feels instant (web.dev, n.d.; Shneiderman and Plaisant, 2005, p. 462). | Should |
| NFR7 | **Reliability:** anyone can open the link without an account, and no work is lost after a reload or if saved data is damaged. | Opens in a private window on a new device; reopen the browser; corrupt the saved data. | Brief: reviewers must not register; a tracker that loses work is useless. | ✅ |
| NFR8 | **Privacy and security:** data never leaves the device unless the user copies it, and pasted text can never run as code. | No outside requests in the Network panel; pasting `<script>` into each field runs nothing. | Client: a "secretive project"; AI output can contain code. | ✅ |
| NFR9 | **Browsers:** the tracker works in Chrome, Edge and Safari. | Every MVP requirement passes in each; Edge shares Chrome's engine. | Client: the web is "the default here". | ✅ |
| NFR10 | **Technology:** built with React, Vite and Tailwind, with no backend and no code file over 300 lines. | `npm run build` gives static files only; no source file over 300 lines. | Client: a "leading web framework"; another team will build on it. | ✅ |

---

## 3. Data requirements

What the tracker stores, why, and where it comes from (Wiegers and Beatty, 2013).

| ID | Data | Why | Where from | MVP? |
|---|---|---|---|---|
| DR1 | **Task:** title (required, 120 characters), description, type, status, story, position. | Show and move tasks (FR1, FR3). | The form. | ✅ |
| DR2 | **Owner:** a member, or none. | Client: "see who we assigned". | Form; Hand off. | ✅ |
| DR3 | **Dates:** due (optional) and created. | Track tasks over time (FR8). | User; clock. | ✅ |
| DR4 | **Handoff:** up to 20,000 characters, the AI tool and when it was updated. | No "starting from scratch" (FR9). | Outgoing developer. | ✅ |
| DR5 | **Handoff history:** from, to, note (280), when. | Shows who worked on it (FR6). | Hand off. | Should |
| DR6 | **Member:** name (required, 60), email, GitHub handle. | Contact owners (FR7). | The team. | ✅ |
| DR7 | **Project:** name (80) and four http(s) links. | "Key milestones" (FR11). | The team. | ✅ |
| DR8 | **Briefing:** Markdown with Task, Actor, Context and Output sections, from one of four prompt goals. | A clear prompt for any AI tool (FR10). | Built from the task. | ✅ |
| DR9 | **Demo:** a fictional team, 12 tasks, four stories. | Show every feature (FR2). | The developer. | ✅ |
| DR10 | **Calculated:** due states, counts, progress. | Stored copies would go stale. | Computed. | ✅ |
| DR11 | **Storage:** JSON in the browser's localStorage, under four keys; the sign-in lasts for the tab. | No backend; privacy (NFR8). | Saved on each change. | ✅ |
| DR12 | **Filters and theme:** filters held in memory; the theme saved. | Narrow the board (FR12); keep the theme (FR15). | Filter bar; header. | Should |
| DR13 | **Personal data:** names, emails and handles only. | Data minimisation (ICO, 2026). | Members, when added. | ✅ |
| DR14 | **User story:** role, want and benefit. | Link tasks to needs (FR13). | The team. | ✅ |

---

## References

- Clegg, D. and Barker, R. (1994) *Case Method Fast-Track: A RAD Approach*. Wokingham: Addison-Wesley.
- Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston, MA: Addison-Wesley.
- ICO (2026) *A guide to the data protection principles*. Information Commissioner's Office. Available at: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/ (Accessed: 26 October 2026).
- ISO (2023) *ISO/IEC 25010:2023 Systems and software engineering: Systems and software Quality Requirements and Evaluation (SQuaRE): Product quality model*. Geneva: International Organization for Standardization.
- Nielsen, J. (1994, updated 2024) *10 usability heuristics for user interface design*. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/ten-usability-heuristics/
- Parnin, C. and Rugaber, S. (2011) 'Resumption strategies for interrupted programming tasks', *Software Quality Journal*, 19(1), pp. 5-34. doi:10.1007/s11219-010-9104-9
- Shneiderman, B. (1996) 'The eyes have it: a task by data type taxonomy for information visualizations', *Proceedings of the 1996 IEEE Symposium on Visual Languages*. Boulder, CO, pp. 336-343. doi:10.1109/VL.1996.545307
- Shneiderman, B. and Plaisant, C. (2005) *Designing the User Interface: Strategies for Effective Human-Computer Interaction*. 4th edn. Boston, MA: Pearson Addison-Wesley.
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Harlow: Pearson.
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October. Available at: https://www.w3.org/TR/WCAG22/
- web.dev (n.d.) *How the Core Web Vitals metrics thresholds were defined*. Available at: https://web.dev/articles/defining-core-web-vitals-thresholds
- White, J. et al. (2023) 'A prompt pattern catalog to enhance prompt engineering with ChatGPT', *arXiv*, 2302.11382. Available at: https://arxiv.org/abs/2302.11382
- Wiegers, K. and Beatty, J. (2013) *Software Requirements*. 3rd edn. Redmond, WA: Microsoft Press.

---

*PRD version 5.0 · 28/10/2026: 16 functional, 10 non-functional and 14 data requirements, merged from version 4.6's 28, 15 and 16 with nothing dropped from the prototype, plus the MVP login (FR16).*
