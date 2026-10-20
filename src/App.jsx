import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import Board from './components/Board.jsx';
import Header from './components/Header.jsx';
import TaskModal from './components/TaskModal.jsx';
import TeamStrip from './components/TeamStrip.jsx';
import Toast from './components/Toast.jsx';
import { buttonStyles } from './components/styles.js';
import { STORAGE_KEYS } from './constants.js';
import { createSeedTasks } from './data/seed.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useNow } from './hooks/useNow.js';
import { createTask } from './lib/tasks.js';
import { getMember } from './lib/team.js';

/**
 * Vibecoding Project Tracker.
 *
 * Where things live:
 *   - constants.js            : STAGES (board columns), TEAM, storage keys
 *   - data/seed.js            : demo tasks shown on first load
 *   - hooks/useLocalStorage.js: saves state in the browser across reloads
 *   - lib/                    : small helpers (dates, team members, new tasks)
 *   - components/             : Header, Board (columns), TaskCard, Avatar,
 *                               TaskModal (add / edit / delete), Toast,
 *                               TypeBadge, TeamStrip
 *
 * Build sequence (Phase 3):
 *   - M4  data-model           : four columns + demo task cards (done)
 *   - M5  crud-modal           : "New task" modal and edit-on-click (done)
 *   - M6  tag-style            : feature vs. bug colour + icon (done)
 *   - M7  task-owner           : owner on every card + "Hand off to..." (done)
 *   - M8  due-tint             : due-date badge: calm / warning / overdue / done (done)
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
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.tasks, createSeedTasks);

  // Refreshed every minute so due-date colours update by themselves (M8).
  const now = useNow(60_000);

  // null = modal closed; { task: null } = adding; { task } = editing that task.
  const [editing, setEditing] = useState(null);

  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  // The card that was just handed off gets a brief highlight (M7).
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightTimer = useRef(null);

  // TODO M11 project-deliverables:
  //   const [anchors, setAnchors] = useLocalStorage('vibetracker.anchors', [...]);

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 4000);
  }

  function saveTask(fields) {
    if (editing.task) {
      const id = editing.task.id;
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...fields } : task)));
      showToast('Task updated');
    } else {
      setTasks((prev) => [...prev, createTask(fields)]);
      showToast('Task added');
    }
    setEditing(null);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setEditing(null);
    showToast('Task deleted');
  }

  function handOff(taskId, memberId) {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, assignee: memberId } : task)));
    showToast(`Handed off to ${getMember(memberId).name}.`);
    clearTimeout(highlightTimer.current);
    setHighlightedId(taskId);
    highlightTimer.current = setTimeout(() => setHighlightedId(null), 2000);
  }

  return (
    <div className="min-h-screen">
      <a
        href="#board"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand focus:shadow"
      >
        Skip to board
      </a>

      <Header>
        <button type="button" onClick={() => setEditing({ task: null })} className={buttonStyles.primary}>
          <Plus aria-hidden="true" className="h-4 w-4" />
          New task
        </button>
      </Header>

      {/* TODO M11 project-deliverables: render the anchor cards (Presentation / Demo / Report / Documentation) above the board. */}

      <main className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6">
        <TeamStrip tasks={tasks} />
        <div id="board" tabIndex={-1} className="focus:outline-none">
          <Board
            tasks={tasks}
            onOpenTask={(task) => setEditing({ task })}
            onHandOff={handOff}
            highlightedId={highlightedId}
            now={now}
          />
        </div>
      </main>

      {editing && (
        <TaskModal
          task={editing.task}
          onSave={saveTask}
          onDelete={deleteTask}
          onClose={() => setEditing(null)}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
