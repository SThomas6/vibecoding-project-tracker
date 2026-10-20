import Board from './components/Board.jsx';
import Header from './components/Header.jsx';
import { STORAGE_KEYS } from './constants.js';
import { createSeedTasks } from './data/seed.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

/**
 * Vibecoding Project Tracker.
 *
 * Where things live:
 *   - constants.js            : STAGES (board columns), TEAM, storage keys
 *   - data/seed.js            : demo tasks shown on first load
 *   - hooks/useLocalStorage.js: saves state in the browser across reloads
 *   - lib/                    : small helpers (dates, team members)
 *   - components/             : Header, Board (columns), TaskCard, Avatar
 *
 * Build sequence (Phase 3):
 *   - M4  data-model           : four columns + demo task cards (done)
 *   - M5  crud-modal           : "New task" modal and edit-on-click
 *   - M6  tag-style            : feature vs. bug colour + icon (DESIGN.md §2)
 *   - M7  task-owner           : assignee badge + "Hand off to..." dropdown
 *   - M8  due-tint             : colour cards by due date (DESIGN.md §2)
 *   - M9  task-context         : curated Context briefing field on the modal
 *   - M10 copy-context         : "Copy Context" button that serialises the task
 *   - M11 project-deliverables : the deliverable anchor cards above the board
 *   - M12 secret-sauce         : the one thing that makes this tracker ours
 *
 * Search for `TODO M<n>` to find the hook for each remaining milestone.
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee               id of a TEAM member
 * @property {string|null} dueDate           ISO 'YYYY-MM-DD'
 * @property {string} createdDate            ISO 'YYYY-MM-DD'
 * @property {string} context                M9: curated briefing for the next AI / teammate
 * @property {string|null} contextTool       M9: 'Claude' | 'ChatGPT' | 'Cursor' | 'Lovable' | 'Replit' | 'Other'
 * @property {string|null} contextUpdatedAt  M9: ISO timestamp, set automatically on save
 */

// Re-exported so anything importing these from App.jsx (as in the starter) still works.
export { STAGES, TEAM } from './constants.js';
export { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [tasks] = useLocalStorage(STORAGE_KEYS.tasks, createSeedTasks);

  // TODO M5 crud-modal:
  //   const [editing, setEditing] = useState(null);
  //
  // TODO M11 project-deliverables:
  //   const [anchors, setAnchors] = useLocalStorage('vibetracker.anchors', [...]);

  return (
    <div className="min-h-screen">
      <a
        href="#board"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand focus:shadow"
      >
        Skip to board
      </a>

      <Header />

      {/* TODO M11 project-deliverables: render the anchor cards (Presentation / Demo / Report / Documentation) above the board. */}

      <main id="board" tabIndex={-1} className="mx-auto max-w-screen-2xl px-4 py-6 focus:outline-none sm:px-6">
        <Board tasks={tasks} />
      </main>
    </div>
  );
}
