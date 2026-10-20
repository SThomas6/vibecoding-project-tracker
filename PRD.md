# Vibecoding Project Tracker — PRD

**Status:** As agreed in class on 20/10/2026, this PRD contains only the functional, non-functional and data requirements. Each has a unique ID and an MVP mark, so every prototype feature can be mapped back to it.

**Project:** A Kanban-style tracker for vibecoding projects that also stores the prompts, AI tools and outcomes behind each task.
**Clients:** Prof. Dr. Ignacio Alvarez (THI) and Nathan (Cardiff University).

**Key**
- **MVP:** ✅ marks the minimum viable product. In the MVP, one team can manage its tasks on the board, see who owns each task and when it is due, keep and copy the AI context behind each task, and pin its deliverables. Its data survives a reload. The other requirements are ranked **Should** or **Could** (MoSCoW: Clegg and Barker, 1994), and are still in scope for the prototype.
- **Sources:**
  - **IA** and **N:** Ignacio and Nathan, on client day (20/10/2026).
  - **FL:** Fernando Loizides, module leader and client.
  - **Brief:** the client brief.
  - **Starter PRD:** the hackathon starter PRD (commit `4252714`).
  - **Extra:** not asked for by the clients, so a reason is given.

---

## 1. Functional requirements

What the tracker must do (Sommerville, 2016).

| ID | Requirement | Source and reason | MVP? |
|---|---|---|---|
| FR1 | The tracker shall show the project's tasks on a Kanban board, under the project's name, with four columns in this order: To Do, In Progress, Review, Done. Each task shall appear as a card, showing its title, in the column for its status. | Brief ("a kanban board"); IA ("to-do, in progress, review, and done"); Starter PRD. | ✅ |
| FR2 | Each column heading shall show how many tasks it holds, and an empty column shall say "No tasks here yet." | Extra: shows the workload at each stage, and that an empty column isn't an error (Nielsen, 1994). | Should |
| FR3 | The first time the tracker is opened, it shall load a demo project (DR10), so the board isn't empty. | New users, and assessors, can see every feature working straight away. | ✅ |
| FR4 | The tracker shall let the user add a task through a "New task" form with a title, description, type, status, owner, due date and context. If the title is missing, it shall show an error under the field and not save. | IA: tasks must be "editable and configurable"; Starter PRD. | ✅ |
| FR5 | Selecting a card shall open the same form, filled in, to edit the task, and show when the task was created. Changing the status moves the card to that column; moving it to Done completes it. The form can be closed without saving (Cancel, ✕ or Escape). | IA ("editable and configurable"); Starter PRD ("Move the task across columns as you work"). | ✅ |
| FR6 | The tracker shall let the user delete a task from the form, after confirming "Delete this task? This can't be undone." | IA. Confirming prevents losing a task by mistake (Nielsen, 1994). | ✅ |
| FR7 | After a task is added, updated, deleted, handed off or copied, the tracker shall show a short confirmation, such as "Task added". | Extra: users should always know what has just happened (Nielsen, 1994). | Should |
| FR8 | The tracker shall mark each task as a Feature or a Bug with a different colour, icon and label, the same on the card and in the form. | Starter PRD (colour-coded types). N suggested red and green but warned that colour-blind users "might struggle", so an icon and label are added (NFR2). | Should |
| FR9 | The tracker shall let the user assign each task to one team member, or leave it Unassigned, which is the default. Each card shall show its owner's initials and name. | IA: tasks are assigned "so that we can go back to that person and ask for updates". Unassigned is the default so new work isn't quietly given to one person. | ✅ |
| FR10 | Each card shall have a "Hand off" button that reassigns the task to another member in one step, confirmed by the new owner's name, a brief highlight and a message. | Starter PRD ("Hand off a task to a teammate"); IA: the new owner isn't "starting from scratch". | Should |
| FR11 | A Team strip above the board shall list each member's name, email address (as a link), GitHub handle and In Progress tasks. | IA: email, "so that someone could directly email the owner of a task"; N: "email and maybe GitHub account". | Should |
| FR12 | The tracker shall let the user add a team member with a name (required), an email address and a GitHub handle (both optional). | IA: "adding new members to the team". | Should |
| FR13 | Each card with a due date shall show it relative to today ("Due in 3 days", "Due today", "Overdue by 1 day"), or "Done" once the task is finished. | Brief ("track project tasks over time"). | ✅ |
| FR14 | The due-date label shall change colour and icon automatically: calm when it's due 24 hours or more away, a warning under 24 hours, an alarm when overdue, and neutral when done. | IA: yellow for "sort of immediate", red for overdue. The 24-hour line is an assumption to confirm with the clients. | Should |
| FR15 | The task form shall have a Context section: a large Markdown text area for prompts, AI replies, conversation summaries, bug logs, traces, requirements and results. | IA: storing context in the task is what makes this tracker different. Brief ("note useful prompts and results"). | ✅ |
| FR16 | The Context section shall let the user record the AI tool used: Claude, ChatGPT, Cursor, Lovable, Replit or Other. | IA: "log what tool this was"; Starter PRD. | ✅ |
| FR17 | New tasks shall start with a context template (Background, Constraints, Tried so far, Pick up from here), and the form shall show when the context was last updated ("Last updated 2 hours ago"). | Starter PRD (the timestamp is saved automatically). The template prompts for what the next person needs; the timestamp shows how fresh it is. | Should |
| FR18 | A "Copy context" button on each card and in the form shall copy the task to the clipboard as a Markdown briefing (DR9), and confirm "Context copied. Paste it into your AI tool." | IA: so it "can be easily put into an AI" and work can continue "straight away"; Starter PRD. | ✅ |
| FR19 | Four deliverable cards (Presentation, Demo, Report and Documentation) shall be pinned above the board. Each holds one link, opens it in a new tab, and shows whether a link has been added. | Brief ("key milestones"); IA ("big anchors for project deliverables"); Starter PRD. | ✅ |
| FR20 | The tracker shall let the user reset it to the demo project, after confirming. | Extra: lets a demo or an assessment start from a known state. | Should |
| FR21 | The tracker shall let the user pick the type and due-date colours from preset palettes that all meet NFR2. | N: "make it customizable", if time allows. Presets keep every option accessible. | Could |
| FR22 | Each task shall have a Prompt log recording each prompt, the AI tool, the result and whether it worked. Prompts that worked are added to the copied briefing. | Our "secret sauce", since IA invited extra features. Brief ("note useful prompts and results"); Starter PRD ("no one remembers the prompt that produced it"). | Could |

**Out of scope for this prototype:**
- **Login:** IA and N saw it as a later extra, and the link must open without registering (FL).
- **More than one team or project:** IA said this can come later.
- **A shared, real-time board:** it needs a server and a database, which FL and the Starter PRD ruled out.
- **Drag-and-drop:** changing the status already moves tasks, and dragging is hard to make accessible.

---

## 2. Non-functional requirements

How well the tracker must work, grouped by the quality types in ISO/IEC 25010:2023. Each has a test that shows it has been met.

| ID | Requirement | How it's tested | Why it's needed | MVP? |
|---|---|---|---|---|
| NFR1 | **Accessibility.** The tracker shall meet WCAG 2.2 Level AA (W3C, 2023) and respect the system's "reduce motion" setting. | No violations in an axe-core scan of every screen and dialog, plus a manual check. | IA: "always design for accessibility in mind… both in terms of the design as well as the way it's developed". | ✅ |
| NFR2 | **Colour.** Text shall have a contrast ratio of at least 4.5:1 (3:1 for borders and icons). Colour shall never be the only signal: every coloured state also has an icon and text. | Every colour pair is measured, and the board still makes sense in greyscale and in colour-blindness simulations. | N: "white on grey is probably not the best color", and colour-blind users "might struggle". | ✅ |
| NFR3 | **Keyboard.** Everything shall work with a keyboard alone, with a visible focus outline, a "Skip to board" link, and focus that moves into dialogs and back out. | A keyboard-only run through every FR. | People who can't use a mouse, including screen-reader users, rely on the keyboard (WCAG 2.1.1, 2.4.7). | ✅ |
| NFR4 | **Screen readers.** Pages shall use landmarks, headings and labelled controls, and status messages shall be read out. | Adding, editing, handing off and copying a task with VoiceOver and NVDA. | Asked about ARIA tags, IA said accessibility covers how the tracker is built, not just its design (WCAG 4.1.2, 4.1.3). | ✅ |
| NFR5 | **Any screen size.** The layout shall reflow from four columns to two to one, work from 320 px wide and at 400% zoom, and keep controls at least 44 px high. | Checked at 320, 768 and 1440 px wide, and at 400% zoom. | So it works on phones and for people who zoom in (WCAG 1.4.10, 2.5.8). | ✅ |
| NFR6 | **Easy to learn.** A first-time user shall be able to add a task, hand it off and copy its context without help. | At least 4 of 5 test users finish all three tasks unaided, each within 2 minutes. | Brief: the tracker must be "intuitive". | ✅ |
| NFR7 | **Error protection.** Deleting and resetting shall need confirmation, and error messages shall say what went wrong and how to fix it. | Cancelling each destructive action leaves the data unchanged. | The data lives in one browser with no backup, so a slip is costly (Nielsen, 1994). | ✅ |
| NFR8 | **Speed.** The board shall load within 1 second, and respond to each action within 0.1 seconds, even with 100 tasks. | Lighthouse and Chrome DevTools, on the deployed site. | So the tool feels instant and never interrupts the user's work. | Should |
| NFR9 | **No lost work.** Every change shall be saved straight away and survive reloading the page and restarting the browser. | Make changes, then close and reopen the browser: everything is still there. | A tracker that forgets changes is useless. The Starter PRD loads the board from local storage. | ✅ |
| NFR10 | **Always available.** The prototype shall be at a public HTTPS address that opens without login or registration and stays live until graduation. | Opens in a private window on a device that has never used it; rechecked monthly. | FL: assessors must not have to register. IA suggested Vercel. | ✅ |
| NFR11 | **Privacy.** All data shall stay on the user's device, with no server, analytics or requests to other sites. | The browser's Network panel shows no requests to other sites. | IA: a "secretive project" shouldn't be "exposed on the internet". UK GDPR: collect only what's needed. | ✅ |
| NFR12 | **Security.** Anything typed or pasted shall be shown as text and never run as code, and links shall only open if they start with http:// or https://. | Pasting `<script>alert(1)</script>` into each field runs nothing. | Pasted AI output and logs can contain code (cross-site scripting). | ✅ |
| NFR13 | **Browsers.** The tracker shall work in current Chrome, Edge, Firefox and Safari, on desktop and mobile, with nothing to install. | Every MVP requirement passes in each browser. | IA: web platforms "are the default here", and assessors may use any browser. | ✅ |
| NFR14 | **Technology.** The tracker shall be built with React, Vite and Tailwind CSS as a static website, with no backend or database. | `npm run build` produces static files only. | N: any "leading web framework"; FL: no databases for the prototype; Starter PRD. | ✅ |
| NFR15 | **Maintainability.** The code shall use small single-purpose components, keep shared settings in one place, and have a README, so another developer can extend it. | No source file over 300 lines, and the build passes. | The prototype becomes the starting point for Nathan's group module. | Should |

---

## 3. Data requirements

What the tracker stores, why, and where it comes from (Wiegers and Beatty, 2013).

| ID | Data | Why it's needed | Where it comes from | MVP? |
|---|---|---|---|---|
| DR1 | **Task details:** a unique ID; title (required, up to 120 characters); description (optional, up to 2,000); type (Feature or Bug); status (To Do, In Progress, Review or Done). | To show, edit and move each task (FR1–FR8). | Typed or chosen in the task form. The tracker generates the ID; the clients set the type and status values (Starter PRD). | ✅ |
| DR2 | **Owner:** a team member's ID, or Unassigned (the default). It's an ID, not a name, so renaming someone doesn't break the link. | IA: "we need to be able to see who we assigned" (FR9–FR11). | Chosen in the form or with Hand off. | ✅ |
| DR3 | **Dates:** an optional due date and the date the task was created, both stored as YYYY-MM-DD. | To track tasks over time (Brief) and show the due-date labels (FR13, FR14). | The user picks the due date; the created date comes from the device's clock. | ✅ |
| DR4 | **Context:** Markdown text up to 20,000 characters, and the AI tool used. | Lets anyone pick up a task "not starting from scratch" (IA) (FR15, FR16, FR18). | Written or pasted by the user from AI chats, logs, traces and requirements. The tool comes from the clients' list (Starter PRD). | ✅ |
| DR5 | **Context last updated:** a date and time, set automatically when the context changes. | Shows how fresh the context is (FR17). | The device's clock. | Should |
| DR6 | **Prompt log entries:** date and time, AI tool, prompt, result and outcome (Worked, Partly or Didn't work). | Keeps the history of prompts and results (FR22; Brief). | Pasted by the user from the AI chat; the date and time come from the device's clock. | Could |
| DR7 | **Team members:** an ID, a name (required), and an email address and GitHub handle (optional, format-checked). | IA: the name shows "who we assigned", and the email lets people "directly email the owner". N: GitHub (FR9–FR12). | Given by each member when they're added (FR12). | ✅ |
| DR8 | **Project and deliverables:** the project's name, and one optional link (http or https only) for each of Presentation, Demo, Report and Documentation. | One project per team (IA). The deliverables are the "key milestones" (Brief) (FR1, FR19). | The name is typed in. The links are pasted from wherever each deliverable lives, such as Vercel, OneDrive or GitHub. | ✅ |
| DR9 | **Copied briefing:** Markdown with the title as a heading, then the type, status, owner and due date, the description, the context, any prompts that worked, and the AI tool and last-updated time. Empty fields are left out. | Reads as a clear briefing when pasted into an AI tool (FR18). | Put together by the tracker from DR1–DR6. | ✅ |
| DR10 | **Demo project:** a fictional team (with example.com email addresses) and about three tasks per column, covering every due-date state, with at least two holding full context. Dates are set relative to today. | So the board is never empty and every feature can be seen (FR3, FR20). Fictional people mean no real personal data is stored. | Written by the developer in the code. | ✅ |
| DR11 | **Calculated, not stored:** due-date states, initials, column counts, who is working on what, deliverable status and "last updated" times are worked out when shown. | Stored copies would go out of date. | Calculated from DR1–DR8 and the device's clock. | ✅ |
| DR12 | **Storage:** all data saved as JSON in the browser's localStorage (about 5 MiB per site), and kept until the user clears or resets it. Nothing is stored on a server. | The Starter PRD chose localStorage, and FL said not to use databases. Keeping the data on the device protects it (NFR11). | Written by the tracker on every change (NFR9). | ✅ |
| DR13 | **Colour preference:** the chosen palette. | Remembers the user's choice between visits (FR21). | Chosen by the user. | Could |
| DR14 | **Personal data limits:** only names, and optionally email addresses and GitHub handles. No roles, photos, passwords or usage data. | UK GDPR data minimisation (Article 5(1)(c)). The clients asked only for these (IA, N). | Applies to DR7. | ✅ |

---

## References

- Clegg, D. and Barker, R. (1994) *Case Method Fast-Track: A RAD Approach*. Wokingham: Addison-Wesley.
- ISO/IEC 25010:2023 *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. Geneva: ISO.
- Nielsen, J. (1994, updated 2024) *10 usability heuristics for user interface design*. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/ten-usability-heuristics/
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Harlow: Pearson.
- UK GDPR (2018) *Regulation (EU) 2016/679 as retained in UK law*, Article 5. Available at: https://www.legislation.gov.uk/eur/2016/679/contents
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October. Available at: https://www.w3.org/TR/WCAG22/
- Wiegers, K. and Beatty, J. (2013) *Software Requirements*. 3rd edn. Redmond, WA: Microsoft Press.

---

*PRD version 3 · 20/10/2026*
