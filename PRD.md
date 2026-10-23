# Vibecoding Project Tracker — PRD

**Status:** As agreed in class on 20/10/2026, this PRD contains only the functional, non-functional and data requirements. Each has a unique ID and an MVP mark, so every prototype feature maps back to one. Version 4 matches the prototype as built.

**Problem:** In a vibecoding team, what was tried with the AI on a task, what worked and what's left lives in one person's chat history, so whoever picks the task up next starts from scratch.
**Project:** A Kanban-style tracker for vibecoding projects. Each task keeps the handoff its last developer (or their AI agent) wrote, and copies as a ready-made briefing for the next developer's AI tool.
**Clients:** Prof. Dr. Ignacio Alvarez (THI) and Nathan (Cardiff University).

**Key**
- **MVP:** ✅ marks the minimum viable product. In the MVP, one team can manage its tasks on the board, see who owns each task and when it is due, keep a handoff with each task and copy it as an AI briefing, and pin its deliverables. Its data survives a reload. The others are ranked **Should** or **Could** (MoSCoW: Clegg and Barker, 1994), and all are built in the prototype.
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
| FR2 | Each column heading shall show how many tasks it holds, and an empty column shall say "No tasks here yet. Add one with New task, or move a card here." (or "No matching tasks in this column." while filtering). | Extra: making the work at each stage visible is the core of Kanban (Anderson, 2010), and the message shows an empty column isn't an error (Nielsen, 1994). | Should |
| FR3 | The first time the tracker is opened, it shall load a demo project (DR10), so the board isn't empty. | New users, and assessors, can see every feature working straight away. | ✅ |
| FR4 | The tracker shall let the user add a task through a "New task" form with a title, description, type, status, owner, due date, handoff and AI tool. If the title is missing, it shall show an error under the field and not save. | IA: tasks must be "editable and configurable"; Starter PRD. | ✅ |
| FR5 | Selecting a card shall open the same form, filled in, to edit the task, and show when the task was created. Changing the status moves the card to that column; moving it to Done completes it. The form closes without saving on Cancel, ✕ or Escape, asking first if anything has changed (NFR7). | IA ("editable and configurable"); Starter PRD ("Move the task across columns as you work"). | ✅ |
| FR6 | The tracker shall let the user delete a task from the form, after confirming "Delete this task? This can't be undone." | IA. Confirming prevents losing a task by mistake (Nielsen, 1994). | ✅ |
| FR7 | After each change or copy (a task added, updated, deleted, moved, handed off or copied; the project renamed), the tracker shall show a short confirmation, such as "Task added", for at least 6 seconds. | Extra: users should always know what has just happened (Nielsen, 1994). | Should |
| FR8 | The tracker shall mark each task as a Feature or a Bug with a different colour, icon and label, the same on the card and in the form. | Starter PRD (colour-coded types). The clients suggested red and green, but N warned that colour-blind users "might struggle", so an icon and label are added (NFR2). | Should |
| FR9 | The tracker shall let the user assign each task to one team member, or leave it Unassigned, which is the default. Each card shall show its owner's initials and name. | IA: tasks are assigned "so that we can go back to that person and ask for updates". Unassigned is the default so new work isn't quietly given to one person. | ✅ |
| FR10 | Each card shall have a "Hand off" button that reassigns the task in one step, with an optional note, and confirms with the new owner's name, a brief highlight and a message. The handoff joins the task's history (DR6), and the card shows who worked on it before. | Starter PRD ("Hand off a task to a teammate"); IA: the new owner isn't "starting from scratch". | Should |
| FR11 | A Team strip above the board shall list each member's name, email address (as a link), GitHub handle and In Progress tasks, with a one-click filter for every task they have worked on. On small screens the cards fold behind a "Members" button. | IA: email, "so that someone could directly email the owner of a task"; N: "email and maybe GitHub account". | Should |
| FR12 | The tracker shall let the user add a team member with a name (required), an email address and a GitHub handle (both optional). | IA: "adding new members to the team". | Should |
| FR13 | Each card with a due date shall show it relative to today ("Due in 3 days", "Due today", "Overdue by 1 day"), or "Done" once the task is finished. | Brief ("track project tasks over time"). | ✅ |
| FR14 | The due-date label shall change colour and icon automatically: calm when it's due 24 hours or more away, a warning under 24 hours, an alarm when overdue, and neutral when done. | IA: yellow for "sort of immediate", red for overdue; Starter PRD (due-date colour tinting). "Immediate" is taken as under 24 hours: an assumption to confirm with the clients. | Should |
| FR15 | The task form shall have a "Handoff for the next developer" section: a large text box for the handoff (what's done, what's left, the prompts that worked and their results, blockers, logs or traces), often written by the outgoing developer's AI agent; a "Paste from clipboard" button; an optional "Insert template" button (Done, Left, Prompts that worked, Watch out, Start with); a reminder never to paste passwords or keys; and the task's handoff history. If pasted text is cut to the length limit (DR4), the form says so. | IA: a long context field for "a conversation or a bug log or a trace", so the next person is "not starting from scratch"; Brief ("note useful prompts and results"). | ✅ |
| FR16 | The task form shall let the user record the AI tool used: Claude, ChatGPT, Cursor, Lovable, Replit or Other. | IA: "log what tool this was"; Starter PRD. | ✅ |
| FR17 | The form shall show when the handoff was last updated ("Last updated 2 hours ago"), and each card with a handoff shall show its first two lines and who handed the task over. | Starter PRD (the timestamp is saved automatically). The time shows how fresh the handoff is; the preview makes it easy to spot on the board. | Should |
| FR18 | A "Copy context" button on each card and in the form shall copy the task as a Markdown briefing (DR9), set out as Task, Actor, Context and Output format for a prompt goal (DR15), and confirm "Context copied. Paste it into your AI tool." The form lets the user pick the goal or a plain briefing; cards use the first goal. If the browser blocks copying, the briefing opens selected, to copy by hand. | IA: his TACO prompt structure, and copying context so it "can be easily put into an AI"; Starter PRD. Prompts that set a persona and an output template give more dependable answers (White et al., 2023). | ✅ |
| FR19 | Four deliverable cards (Presentation, Demo, Report and Documentation) shall be pinned above the board. Each holds one link that can be added, changed or removed, opens it in a new tab, and shows whether a link has been added. | Brief ("key milestones"); IA ("big anchors for project deliverables"); Starter PRD. | ✅ |
| FR20 | The tracker shall let the user reset it to the demo project, after confirming. | Extra: lets a demo or an assessment start from a known state. | Should |
| FR21 | The tracker shall let the user search tasks (titles, descriptions and handoffs), filter the board by who has worked on or owns a task, type, due-date state, and handoff or AI tool, see how many tasks match, and clear the filters in one step. On small screens the filters fold behind a "Filters" button. | Extra: as the board grows, teammates can focus on one person's work, urgent bugs or tasks with a handoff: "overview first, zoom and filter" (Shneiderman, 1996). | Should |
| FR22 | Cards with a handoff, and the form, shall have a "Copy handoff" button that copies just the handoff, headed by the task's title, for the next developer to paste into their own AI agent. | Our "secret sauce", as IA invited extra features. Developers resuming a task spend a long time rebuilding its context (Parnin and Rugaber, 2011), so the handoff moves in one click. | Should |
| FR23 | The tracker shall start in the device's own Light or Dark setting and let the user switch between Light mode and Dark mode, with both palettes meeting NFR2 and the choice saved between visits. | N: "make it customizable", if time allows. Two preset palettes keep every colour pair WCAG 2.2 AA compliant, and following the device means most people never need the setting. | Could |
| FR24 | The user shall be able to drag a card to any place in any column with a mouse or pen, and it shall land where it's dropped. A line shows where it will land (and another column is outlined), Escape cancels, and the move is confirmed with its place ("Moved to Review, position 2 of 4"). | N suggested "being able to drag the cards" among the extras IA invited. The form's Status and Position fields do the same without dragging (NFR3). | Could |
| FR25 | The tracker shall let the user rename the project. The new name shows in the header and the browser tab. | IA: one project per team, so the board carries its name (DR8); the tab title tells it apart from other open tabs. | Should |

**Out of scope for this prototype:**
- **Login:** IA thought it "might be good" for a "very secretive project", and N suggested leaving it for his module. The link must also open without registering (FL).
- **More than one team or project:** IA said this can come later.
- **A shared, real-time board:** it needs a server and a database, which FL and the Starter PRD ruled out. Each browser keeps its own copy, and Copy handoff carries a task to the next developer.
- **Editing or removing team members:** only adding was asked for (FR12).
- **Free choice of colours, or more palettes (such as black on yellow):** free choice could break the contrast in NFR2, and every palette is more colour pairs to check, so FR23 offers two checked palettes.
- **Dragging by touch** (press and hold, then slide): it would fight page scrolling, so touch users set the Status and Position instead.
- **Exporting or importing the board as a file:** not asked for; Copy handoff and Copy context already carry a task to another developer.
- **Progress charts, a full prompt history or tracking developer experience** (raised as possibilities on 06/10): the handoff keeps the prompts that worked (FR15), which the clients' hand-off need calls for.
- **Sounds for actions** (a "secret sauce" idea): every action already shows and announces a message (FR7), and sound would disturb a shared room.
- **A Markdown preview of the handoff:** keeping it as plain text means pasted code can never run (NFR12).
- **Matching tasks to user stories:** not asked for by the clients; each task's description holds its goal.
- **Languages other than English:** not asked for; the wording is plain and backed by icons.

---

## 2. Non-functional requirements

How well the tracker must work, grouped by the quality types in ISO/IEC 25010:2023. Each has a test that shows it has been met.

| ID | Requirement | How it's tested | Why it's needed | MVP? |
|---|---|---|---|---|
| NFR1 | **Accessibility.** The tracker shall meet WCAG 2.2 Level AA (W3C, 2023) in Light and Dark mode, and respect the system's "reduce motion" setting. | No violations in an axe-core scan of every screen and dialog in both modes, plus a manual check. | IA: "always design for accessibility in mind… both in terms of the design as well as the way it's developed". | ✅ |
| NFR2 | **Colour.** Text shall have a contrast ratio of at least 4.5:1 (3:1 for borders, icons and focus outlines) in both modes. Colour shall never be the only signal: every coloured state also has an icon and text. | Every colour pair is measured, and the board still makes sense in greyscale and in colour-blindness simulations. | N: "white on grey is probably not the best color", and colour-blind users "might struggle". | ✅ |
| NFR3 | **Keyboard.** Everything shall work with a keyboard alone, with a visible focus outline, a "Skip to board" link, and focus that moves into dialogs and back out. Nothing shall need dragging. | A keyboard-only run through every FR. | People who can't use a mouse, including screen-reader users, rely on the keyboard (WCAG 2.1.1, 2.4.7, 2.5.7). | ✅ |
| NFR4 | **Screen readers.** Pages shall use landmarks, headings and labelled controls whose names start with their visible text, and status messages shall be read out. | Adding, editing, handing off and copying a task with VoiceOver on a Mac. | Asked about ARIA tags, IA said accessibility covers how the tracker is built, not just its design (WCAG 2.5.3, 4.1.2, 4.1.3). | ✅ |
| NFR5 | **Any screen size.** The layout shall reflow from four columns to two to one, and work from 320 px wide and at 400% zoom. Main buttons and form fields shall be at least 44 px high, and compact controls at least 36 px (44 px with 8 px gaps on touch screens). Anything you act on shall be at least 14 px, with form fields at 16 px on phones. Below 1280 px a bar of column links shall stay at the top, below 1024 px the filters and team cards shall fold behind buttons, and on phones New task shall stay within thumb reach; neither the bar nor New task may hide the focused control. | Checked at 320, 375, 768 and 1440 px wide, on a phone held sideways, and at 400% zoom. | So it works on phones and for people who zoom in (WCAG 1.4.10, 2.4.11, 2.5.8). Smaller text in a field makes iPhone Safari zoom in. | ✅ |
| NFR6 | **Easy to learn.** A first-time user shall be able to add a task, hand it off and copy its context without help; the header says what the tracker is for. | At least 4 of 5 test users finish all three tasks unaided, each within 2 minutes, with no more than one wrong turn per task on average, and their average System Usability Scale score is 68 or more (Brooke, 1996). | Brief: the tracker must be "intuitive". | ✅ |
| NFR7 | **Error protection.** Deleting a task, resetting the demo, and closing a form or leaving the page with unsaved changes shall need confirmation, with the safe choice focused first. Error messages shall say what went wrong and how to fix it. | Cancelling each destructive action leaves the data unchanged. | The data lives in one browser with no backup, and a handoff can be long, so a slip is costly (Nielsen, 1994). | ✅ |
| NFR8 | **Speed.** The board shall appear within 1 second on a computer and within 2.5 seconds on a mid-range phone over a slow 4G connection, and respond to each action within 0.1 seconds, even with 100 tasks. | Lighthouse's desktop and mobile settings on the deployed site, and a 100-task board timed in Chrome DevTools. | So the tool feels instant and never interrupts the user's work. A phone on a slow network gets 2.5 seconds, the "good" loading time in Google's Core Web Vitals (web.dev, n.d.). | Should |
| NFR9 | **No lost work.** Every change shall be saved straight away and survive reloading the page and restarting the browser. Saved data shall be checked when it's loaded: damaged entries are skipped, and if the page still can't be shown it offers a reset instead of a blank screen. If saving fails, the tracker shall say so. | Make changes, then close and reopen the browser: everything is still there. Damage the saved data, and the page still loads. | A tracker that forgets changes is useless. The Starter PRD loads the board from local storage. | ✅ |
| NFR10 | **Always available.** The prototype shall be at a public HTTPS address that opens without login or registration and stays live until graduation. | Opens in a private window on a device that has never used it; rechecked monthly. | FL: assessors must not have to register. IA suggested Vercel. | ✅ |
| NFR11 | **Privacy.** All data shall stay on the user's device, with no server, analytics or requests to other sites, and the page shall say it's saved only in this browser. | The browser's Network panel shows no requests to other sites. | IA: a "secretive project" shouldn't be "exposed on the internet". UK GDPR: collect only what's needed. | ✅ |
| NFR12 | **Security.** Anything typed or pasted shall be shown as text and never run as code, and links shall only open if they start with http:// or https://. | Pasting `<script>alert(1)</script>` into each field runs nothing. | Pasted AI output and logs can contain code (cross-site scripting). | ✅ |
| NFR13 | **Browsers.** The tracker shall work in current Chrome, Edge, Firefox and Safari, on desktop and mobile, with nothing to install. | Every MVP requirement passes in each browser. | IA: web platforms "are the default here", and assessors may use any browser. | ✅ |
| NFR14 | **Technology.** The tracker shall be built with React, Vite and Tailwind CSS as a static website, with no backend or database. | `npm run build` produces static files only. | N: any "leading web framework"; FL (13/10): "I don't need a fully working backend"; Starter PRD. | ✅ |
| NFR15 | **Maintainability.** The code shall use small single-purpose components, keep shared settings in one place, and have a README, so another developer can extend it. | No source file over 300 lines, and the build passes. | The prototype becomes the starting point for Nathan's group module. | Should |

---

## 3. Data requirements

What the tracker stores, why, and where it comes from (Wiegers and Beatty, 2013).

| ID | Data | Why it's needed | Where it comes from | MVP? |
|---|---|---|---|---|
| DR1 | **Task details:** a unique ID; title (required, up to 120 characters); description (optional, up to 2,000); type (Feature or Bug); status (To Do, In Progress, Review or Done); and its place in its column, kept as the order the tasks are saved in. | To show, edit and move each task (FR1–FR8, FR24). | Typed or chosen in the form (the status also by dragging). The tracker generates the ID; the clients set the type and status values (Starter PRD). | ✅ |
| DR2 | **Owner:** a team member's ID, or Unassigned (the default). It uses IDs, not names, so renaming someone doesn't break the link. | IA: "we need to be able to see who we assigned" (FR9–FR11). | Chosen in the form or set by Hand off. | ✅ |
| DR3 | **Dates:** an optional due date and the date the task was created, both stored as YYYY-MM-DD. | To track tasks over time (Brief) and show the due-date labels (FR13, FR14). | The user picks the due date; the created date comes from the device's clock. | ✅ |
| DR4 | **Handoff and AI tool:** the handoff text (plain text or Markdown, up to 20,000 characters), and the AI tool used (from FR16's list, or none). | Lets anyone pick up a task "not starting from scratch" (IA) (FR15, FR16, FR18, FR22). | Pasted or written by the outgoing developer, often their AI agent's end-of-session summary. The tool list comes from the clients (Starter PRD). | ✅ |
| DR5 | **Handoff last updated:** a date and time, set automatically when the handoff text changes. | Shows how fresh the handoff is (FR17). | The device's clock. | Should |
| DR6 | **Handoff history:** one entry each time the owner changes, with who it came from and went to (member IDs), an optional note of up to 280 characters, and the date and time. | Shows who has worked on a task and what they passed on (FR10, FR15, FR21). | Recorded by Hand off (with its note), or when the owner is changed in the form. | Should |
| DR7 | **Team members:** an ID, a name (required, up to 60 characters), and an email address and GitHub handle (optional, format-checked). | IA: the name shows "who we assigned", and the email lets people "directly email the owner". N: GitHub (FR9–FR12). | Given by each member when they're added (FR12). | ✅ |
| DR8 | **Project and deliverables:** the project's name (up to 80 characters), and one optional link (http or https only) for each of Presentation, Demo, Report and Documentation. | One project per team (IA). The deliverables are the "key milestones" (Brief) (FR1, FR19, FR25). | The name is typed in. The links are pasted from wherever each deliverable lives, such as Vercel, OneDrive or GitHub. | ✅ |
| DR9 | **Copied briefing:** Markdown with the title as a heading, then Task, Actor, Context and Output format sections (a plain briefing has only the Context). The Context holds the type, status, owner, past contributors and due date, then the description, handoff and handoff history. A footer gives the AI tool and when the handoff was last updated. Empty fields are left out. Copy handoff copies only the title and handoff. | Reads as a clear TACO prompt when pasted into an AI tool (FR18, FR22; IA). | Put together by the tracker from DR1–DR7 and DR15. | ✅ |
| DR10 | **Demo project:** a fictional team (with example.com email addresses) and three tasks per column, covering every due-date state and an Unassigned task. Two tasks hold a pasted handoff and a handoff history, and two deliverable links are filled in. Dates are set relative to today. | So the board is never empty and every feature can be seen (FR3, FR20). Fictional people mean no real personal data is stored. | Written by the developer in the code. | ✅ |
| DR11 | **Calculated, not stored:** due-date states, initials, column counts, who is working on or has worked on what, filter results, deliverable status and "last updated" times are worked out when shown. | Stored copies would go out of date. | Calculated from DR1–DR8 and the device's clock. | ✅ |
| DR12 | **Storage:** all data saved as JSON in the browser's localStorage (about 5 MiB per site) under four keys: tasks, team, project and theme. It's kept until the user clears or resets it; nothing is stored on a server. | The Starter PRD chose localStorage, and FL didn't require a backend. Keeping the data on the device protects it (NFR11). | Written by the tracker on every change (NFR9). | ✅ |
| DR13 | **Board filter state and theme:** the search text and filters (in memory only), and the Light or Dark theme the user chose (saved; until then, the device's setting). | Lets the user narrow the board (FR21) and remembers their theme between visits (FR23). | Chosen by the user in the filter bar, Team strip or header. | Should |
| DR14 | **Personal data limits:** only names, and optionally email addresses and GitHub handles. No roles, photos, passwords or usage data. | UK GDPR data minimisation (Article 5(1)(c)). The clients asked only for these (IA, N). | Applies to DR7. | ✅ |
| DR15 | **Prompt goals:** four goals (Continue building, Debug and fix, Accessibility and code review, Write handoff summary), each with its Task, Actor and Output format text. | Fills the TACO sections of the briefing, so the user doesn't have to write them (FR18). | Written by the developer from IA's TACO structure; the Context comes from the task itself (DR9). | Should |

---

## References

- Anderson, D.J. (2010) *Kanban: Successful Evolutionary Change for Your Technology Business*. Sequim, WA: Blue Hole Press.
- Brooke, J. (1996) 'SUS: a "quick and dirty" usability scale', in Jordan, P.W., Thomas, B., Weerdmeester, B.A. and McClelland, I.L. (eds) *Usability Evaluation in Industry*. London: Taylor & Francis, pp. 189–194.
- Clegg, D. and Barker, R. (1994) *Case Method Fast-Track: A RAD Approach*. Wokingham: Addison-Wesley.
- ISO/IEC 25010:2023 *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. Geneva: ISO.
- Nielsen, J. (1994, updated 2024) *10 usability heuristics for user interface design*. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/ten-usability-heuristics/
- Parnin, C. and Rugaber, S. (2011) 'Resumption strategies for interrupted programming tasks', *Software Quality Journal*, 19(1), pp. 5–34. doi:10.1007/s11219-010-9104-9
- Shneiderman, B. (1996) 'The eyes have it: a task by data type taxonomy for information visualizations', *Proceedings of the 1996 IEEE Symposium on Visual Languages*. Boulder, CO, pp. 336–343. doi:10.1109/VL.1996.545307
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Harlow: Pearson.
- UK GDPR (2018) *Regulation (EU) 2016/679 as retained in UK law*, Article 5. Available at: https://www.legislation.gov.uk/eur/2016/679/contents
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October. Available at: https://www.w3.org/TR/WCAG22/
- White, J., Fu, Q., Hays, S., Sandborn, M., Olea, C., Gilbert, H., Elnashar, A., Spencer-Smith, J. and Schmidt, D.C. (2023) 'A prompt pattern catalog to enhance prompt engineering with ChatGPT', *arXiv*, 2302.11382. Available at: https://arxiv.org/abs/2302.11382
- web.dev (n.d.) *How the Core Web Vitals metrics thresholds were defined*. Available at: https://web.dev/articles/defining-core-web-vitals-thresholds
- Wiegers, K. and Beatty, J. (2013) *Software Requirements*. 3rd edn. Redmond, WA: Microsoft Press.

---

*PRD version 4.2 · 23/10/2026*
