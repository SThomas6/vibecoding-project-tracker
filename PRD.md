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
| FR1 | Show tasks on a Kanban board: To Do, In Progress, Review, Done. | Brief: "a kanban board"; IA's four stages. | ✅ |
| FR2 | Count the tasks in each column. | Extra: Kanban makes work visible (Anderson, 2010). | Should |
| FR3 | Load a demo project (DR10) on first use. | FL: one example must "work with all the features". | ✅ |
| FR4 | Add tasks; a title is required. | IA: tasks must be "editable and configurable"; Starter PRD. | ✅ |
| FR5 | Edit tasks; changing the status moves the card. | Starter PRD: "Move the task across columns as you work". | ✅ |
| FR6 | Delete tasks. | IA. NFR7 makes it ask first. | ✅ |
| FR7 | Confirm each change with a message. | Extra: users see what has happened (Nielsen, 1994). | Should |
| FR8 | Mark tasks as Feature or Bug by colour, icon and label. | Starter PRD; N: colour alone fails colour-blind users. | Should |
| FR9 | Assign each task to one member, or none. | IA: to "ask for updates" from its owner. | ✅ |
| FR10 | Hand a task to a teammate, with an optional note. | Starter PRD; IA: the new owner isn't "starting from scratch". | Should |
| FR11 | Show the team, with contact links and a work filter. | IA: to "directly email the owner"; N: GitHub. | Should |
| FR12 | Add team members. | IA: "adding new members to the team". | Should |
| FR13 | Show due dates relative to today. | Brief: "track project tasks over time". | ✅ |
| FR14 | Colour and icon due labels by urgency. | IA: yellow for "immediate", red for overdue. | Should |
| FR15 | Keep a handoff on each task: what is done, what is left, prompts that worked. | IA; Brief: "note useful prompts and results". | ✅ |
| FR16 | Record the AI tool used. | IA: "log what tool this was". | ✅ |
| FR17 | Show when the handoff changed, and preview it on the card. | Starter PRD. Shows how fresh it is. | Should |
| FR18 | Copy a task as a TACO briefing for an AI tool. | IA's TACO, which matches the Persona and Template prompt patterns (White et al., 2023). | ✅ |
| FR19 | Pin four deliverable links above the board. | Brief: "key milestones"; IA; Starter PRD. | ✅ |
| FR20 | Reset to the demo project. | Extra: a demo or assessment starts from a known state. | Should |
| FR21 | Search and filter the board. | Extra: "overview first, zoom and filter" (Shneiderman, 1996). | Should |
| FR22 | Copy just a task's handoff. | IA invited extras; resuming without context is slow (Parnin and Rugaber, 2011). | Should |
| FR23 | Offer Light and Dark mode. | N: "make it customizable", if time allows. | Could |
| FR24 | Drag cards with a mouse or pen. | N; the form's Position field works without dragging. | Could |
| FR25 | Rename the project. | IA: one project per team. | Should |
| FR26 | Add, edit and delete user stories. | FL (06/10): "match user stories" (Cohn, 2004). | ✅ |
| FR27 | Link each task to one user story. | FL. Shows why a task exists. | ✅ |
| FR28 | Show each story's progress, and filter by it. | FL. Shows which users' needs are met. | Should |

**Out of scope:**
- **Login:** optional for the clients (IA), and assessors mustn't have to register (FL).
- **More than one team or project:** IA said this can come later.
- **A shared, real-time board:** it needs a server and a database (FL, Starter PRD); Copy handoff carries a task on instead.
- **Free colour choice:** it could break NFR2's contrast, so FR23 offers two checked palettes.
- **Dragging by touch:** it fights page scrolling, so touch users set the Status and Position instead.
- **Editing or removing members, several stories per task, progress charts, prompt history, sounds, exports and other languages:** not asked for.

---

## 2. Non-functional requirements

How well the tracker must work, each labelled by a quality concern from ISO/IEC 25010 (ISO, 2023) and given a test.

| ID | Requirement | Test | Why | MVP? |
|---|---|---|---|---|
| NFR1 | **Accessibility:** WCAG 2.2 AA in both themes; no axe-core violations. | No axe-core violations, plus a manual check. | IA: "always design for accessibility in mind". | ✅ |
| NFR2 | **Colour:** 4.5:1 text contrast; never colour alone. | Every colour pair measured; colour-blindness checks. | N: colour-blind users "might struggle". | ✅ |
| NFR3 | **Keyboard:** everything works by keyboard, with visible focus. | A keyboard-only run of every FR. | Not everyone uses a mouse (WCAG 2.1.1). | ✅ |
| NFR4 | **Screen readers:** controls labelled and messages read out (VoiceOver). | A VoiceOver run of the main tasks. | IA: accessibility includes the code (ARIA). | ✅ |
| NFR5 | **Any screen:** works from 320 px; main targets at least 44 px. | Checked from 320 to 1440 px, and zoomed to 400%. | Phones and zoom users (WCAG 1.4.10, 2.5.8). | ✅ |
| NFR6 | **Easy to learn:** 4 of 5 new users add, hand off and copy a task within 2 minutes. | 4 of 5 users finish each within 2 minutes; SUS (Brooke, 1996) above the average, 68 (Sauro, 2011). | Brief: it must be "intuitive". | ✅ |
| NFR7 | **Error protection:** deleting, resetting or discarding asks first. | Cancelling changes nothing. | Extra: there's no backup (Nielsen, 1994). | ✅ |
| NFR8 | **Speed:** loads within 2.5 s on a phone; reacts within 0.1 s. | Lighthouse; a 100-task board timed. | "Good" Core Web Vitals on phones (web.dev, n.d.); 0.1 s feels instant (Shneiderman and Plaisant, 2005, p. 462). | Should |
| NFR9 | **No lost work:** survives reloads and damaged data. | Reopen the browser; corrupt the saved data. | A tracker that forgets is useless. | ✅ |
| NFR10 | **Available:** a public link, no login, until graduation. | Opens in a private window on a new device. | FL: assessors mustn't register. | ✅ |
| NFR11 | **Privacy:** data stays on the device unless the user copies it. | No outside requests in the Network panel. | IA: a "secretive project" mustn't be exposed. | ✅ |
| NFR12 | **Security:** pasted text never runs as code. | Pasting `<script>` into each field runs nothing. | AI output can contain code. | ✅ |
| NFR13 | **Browsers:** Chrome, Edge, Firefox and Safari. | Every MVP requirement passes in each. | IA: the web is "the default here". | ✅ |
| NFR14 | **Technology:** React, Vite and Tailwind; no backend. | `npm run build` gives static files only. | N: a "leading web framework"; FL: no backend. | ✅ |
| NFR15 | **Maintainability:** no source file over 300 lines. | No source file over 300 lines. | The prototype continues in Nathan's module. | Should |

---

## 3. Data requirements

What the tracker stores, why, and where it comes from (Wiegers and Beatty, 2013).

| ID | Data | Why | Where from | MVP? |
|---|---|---|---|---|
| DR1 | **Task:** title (required, 120 characters), description, type, status, story, position. | To show, edit and move tasks (FR1 to FR8). | The form; the tracker makes the ID. | ✅ |
| DR2 | **Owner:** a member, or none. | IA: "see who we assigned" (FR9). | The form, or Hand off. | ✅ |
| DR3 | **Dates:** due (optional) and created. | To track tasks over time (FR13, FR14). | The user; the device's clock. | ✅ |
| DR4 | **Handoff:** up to 20,000 characters, and the AI tool. | So no one starts "from scratch" (IA). | The outgoing developer or their AI agent. | ✅ |
| DR5 | **Handoff updated:** date and time. | Shows how fresh it is (FR17). | Set when the handoff changes. | Should |
| DR6 | **Handoff history:** from, to, note, when. | Shows who has worked on a task (FR10). | Recorded by Hand off. | Should |
| DR7 | **Member:** name (required), email, GitHub handle. | What IA and N asked for (FR9 to FR12). | Each member, when added. | ✅ |
| DR8 | **Project:** name and four deliverable links. | One project per team; "key milestones" (Brief). | Typed or pasted by the team. | ✅ |
| DR9 | **Briefing:** Markdown in TACO sections. | A clear prompt for any AI tool (FR18, FR22). | Built from the task, DR15 and DR16. | ✅ |
| DR10 | **Demo:** a fictional team, 12 tasks, four stories. | Every feature can be seen at once (FR3, FR20). | Written by the developer. | ✅ |
| DR11 | **Calculated:** due states, counts, progress. | Stored copies would go out of date. | Worked out when shown. | ✅ |
| DR12 | **Storage:** the browser's localStorage only. | No backend needed (FL); keeps data private (NFR11). | Saved on every change (NFR9). | ✅ |
| DR13 | **Filters and theme.** | To narrow the board and keep the theme (FR21, FR23). | The filter bar, Tasks buttons and header. | Should |
| DR14 | **Personal data:** names, emails and handles only. | UK GDPR data minimisation (ICO, 2026). | Applies to DR7. | ✅ |
| DR15 | **Prompt goals:** Task, Actor and Output text. | Fills the briefing's TACO sections (FR18). | The developer, from IA's TACO structure. | ✅ |
| DR16 | **User story:** role, want and benefit. | Links tasks to the needs they meet (FR26 to FR28). | Typed by the team. | ✅ |

---

## References

- Anderson, D.J. (2010) *Kanban: Successful Evolutionary Change for Your Technology Business*. Sequim, WA: Blue Hole Press.
- Brooke, J. (1996) 'SUS: a "quick and dirty" usability scale', in Jordan, P.W., Thomas, B., Weerdmeester, B.A. and McClelland, I.L. (eds) *Usability Evaluation in Industry*. London: Taylor & Francis, pp. 189-194.
- Clegg, D. and Barker, R. (1994) *Case Method Fast-Track: A RAD Approach*. Wokingham: Addison-Wesley.
- Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston, MA: Addison-Wesley.
- ICO (2026) *A guide to the data protection principles*. Information Commissioner's Office. Available at: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/ (Accessed: 26 October 2026).
- ISO (2023) *ISO/IEC 25010:2023 Systems and software engineering: Systems and software Quality Requirements and Evaluation (SQuaRE): Product quality model*. Geneva: International Organization for Standardization.
- Nielsen, J. (1994, updated 2024) *10 usability heuristics for user interface design*. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/ten-usability-heuristics/
- Parnin, C. and Rugaber, S. (2011) 'Resumption strategies for interrupted programming tasks', *Software Quality Journal*, 19(1), pp. 5-34. doi:10.1007/s11219-010-9104-9
- Sauro, J. (2011) *A Practical Guide to the System Usability Scale: Background, Benchmarks & Best Practices*. Denver, CO: Measuring Usability LLC.
- Shneiderman, B. (1996) 'The eyes have it: a task by data type taxonomy for information visualizations', *Proceedings of the 1996 IEEE Symposium on Visual Languages*. Boulder, CO, pp. 336-343. doi:10.1109/VL.1996.545307
- Shneiderman, B. and Plaisant, C. (2005) *Designing the User Interface: Strategies for Effective Human-Computer Interaction*. 4th edn. Boston, MA: Pearson Addison-Wesley.
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Harlow: Pearson.
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October. Available at: https://www.w3.org/TR/WCAG22/
- web.dev (n.d.) *How the Core Web Vitals metrics thresholds were defined*. Available at: https://web.dev/articles/defining-core-web-vitals-thresholds
- White, J. et al. (2023) 'A prompt pattern catalog to enhance prompt engineering with ChatGPT', *arXiv*, 2302.11382. Available at: https://arxiv.org/abs/2302.11382
- Wiegers, K. and Beatty, J. (2013) *Software Requirements*. 3rd edn. Redmond, WA: Microsoft Press.

---

*PRD version 4.4 · 26/10/2026: a shorter rewrite of 4.3, with the same IDs and MVP marks.*
