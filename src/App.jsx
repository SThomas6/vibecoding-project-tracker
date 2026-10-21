import { useEffect, useRef, useState } from 'react';
import { Moon, Plus, RotateCcw, Sun } from 'lucide-react';
import AddMemberDialog from './components/AddMemberDialog.jsx';
import Board from './components/Board.jsx';
import CopyFallbackDialog from './components/CopyFallbackDialog.jsx';
import Deliverables from './components/Deliverables.jsx';
import FilterBar from './components/FilterBar.jsx';
import Header from './components/Header.jsx';
import RenameProjectDialog from './components/RenameProjectDialog.jsx';
import ResetDemoDialog from './components/ResetDemoDialog.jsx';
import TaskModal from './components/TaskModal.jsx';
import TeamStrip from './components/TeamStrip.jsx';
import Toast from './components/Toast.jsx';
import { buttonStyles } from './components/styles.js';
import { STAGES, STORAGE_KEYS, TEAM } from './constants.js';
import { createSeedProject, createSeedTasks } from './data/seed.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useNow } from './hooks/useNow.js';
import { useTheme } from './hooks/useTheme.js';
import { buildBriefing, buildHandoff } from './lib/briefing.js';
import { cleanProject, cleanTasks, cleanTeam } from './lib/storage.js';
import { copyText } from './lib/clipboard.js';
import { DEFAULT_FILTERS, filterTasks, hasActiveFilters } from './lib/filters.js';
import { createTask, moveTask, newId } from './lib/tasks.js';
import { getMember } from './lib/team.js';

/**
 * Vibecoding Project Tracker.
 *
 * All state lives here; constants.js holds the columns, team and storage keys,
 * data/seed.js the demo project, hooks/ and lib/ small helpers, and components/
 * one piece of UI each. README.md maps every feature to the PRD.
 */

// Re-exported so anything importing these from App.jsx (as in the starter) still works.
export { STAGES, TEAM } from './constants.js';
export { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.tasks, createSeedTasks, cleanTasks);

  // Refreshed every minute so due-date colours update by themselves (M8).
  const now = useNow(60_000);

  // null = modal closed; { task: null } = adding; { task } = editing that task.
  const [editing, setEditing] = useState(null);

  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  // The card that was just saved, moved or handed off gets a brief highlight.
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightTimer = useRef(null);

  // The briefing to copy by hand when the browser blocks copying (M10).
  const [fallbackText, setFallbackText] = useState(null);

  // The team, which can grow (PRD FR12). Starts with the demo team.
  const [team, setTeam] = useLocalStorage(STORAGE_KEYS.team, TEAM, cleanTeam);
  const [addingMember, setAddingMember] = useState(false);

  // The project's name and deliverable links (PRD FR19, FR25, DR8).
  const [project, setProject] = useLocalStorage(STORAGE_KEYS.project, createSeedProject, cleanProject);
  const [renaming, setRenaming] = useState(false);

  // "Reset demo" confirmation (PRD FR20).
  const [resetting, setResetting] = useState(false);

  // Light / Dark theme preference (PRD FR23, DR13), saved across visits.
  const [theme, setTheme] = useTheme();

  // Search and advanced board filters (PRD FR21).
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const filteredTasks = filterTasks(tasks, filters, now);

  useEffect(() => {
    document.title = `${project.name} · Vibecoding Project Tracker`;
  }, [project.name]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
  }

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 4000);
  }

  // `beforeId` is the form's Position: the task it goes above, or null for the
  // bottom. The saved card is highlighted, so it's easy to spot.
  function saveTask(fields, beforeId = null) {
    let id = editing.task?.id;
    if (id) {
      setTasks((prev) => moveTask(prev.map((task) => (task.id === id ? { ...task, ...fields } : task)), id, fields.status, beforeId));
      showToast('Task updated');
    } else {
      const task = createTask(fields);
      id = task.id;
      setTasks((prev) => moveTask([...prev, task], id, fields.status, beforeId));
      showToast('Task added');
    }
    setEditing(null);
    flash(id);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setEditing(null);
    showToast('Task deleted');
  }

  function handOff(taskId, memberId, note = '') {
    const at = new Date().toISOString();
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const entry = { id: newId(), from: task.assignee || '', to: memberId, note, at };
        return {
          ...task,
          assignee: memberId,
          handoffs: [...(task.handoffs ?? []), entry],
        };
      })
    );
    showToast(`Handed off to ${getMember(team, memberId).name}.`);
    flash(taskId);
  }

  // Dropped on the board (PRD FR24): in another column, or at another place in
  // the same one, just above `beforeId` (null for the bottom).
  function moveTo(taskId, status, beforeId) {
    const next = moveTask(tasks, taskId, status, beforeId);
    if (next === tasks) return;
    setTasks(next);
    const column = next.filter((task) => task.status === status);
    const place = column.findIndex((task) => task.id === taskId) + 1;
    showToast(`Moved to ${STAGES.find((stage) => stage.id === status).label}, position ${place} of ${column.length}`);
    flash(taskId);
  }

  // Briefly highlights a card that was just saved, moved or handed off.
  function flash(taskId) {
    clearTimeout(highlightTimer.current);
    setHighlightedId(taskId);
    highlightTimer.current = setTimeout(() => setHighlightedId(null), 2000);
  }

  function saveLink(deliverableId, url) {
    setProject((prev) => ({ ...prev, links: { ...prev.links, [deliverableId]: url } }));
    showToast(url ? 'Link saved' : 'Link removed');
  }

  function renameProject(name) {
    setProject((prev) => ({ ...prev, name }));
    setRenaming(false);
    showToast('Project renamed');
  }

  function resetDemo() {
    setTasks(createSeedTasks());
    setProject(createSeedProject());
    setTeam(TEAM);
    setFilters(DEFAULT_FILTERS);
    setResetting(false);
    showToast('Demo project restored');
  }

  function addMember(member) {
    setTeam((prev) => [...prev, member]);
    setAddingMember(false);
    showToast(`${member.name} added to the team`);
  }

  async function copyHandoff(task) {
    const text = buildHandoff(task);
    if (await copyText(text)) showToast('Handoff copied. Paste it into your AI agent.');
    else setFallbackText(text);
  }

  async function copyContext(task, modeId = 'continue') {
    const text = buildBriefing(task, team, new Date(), modeId);
    if (await copyText(text)) showToast('Context copied. Paste it into your AI tool.');
    else setFallbackText(text);
  }

  return (
    <div className="min-h-screen">
      <a
        href="#board"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand focus:shadow"
      >
        Skip to board
      </a>

      <Header projectName={project.name} onRename={() => setRenaming(true)}>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
            className={buttonStyles.secondary}
          >
            {theme === 'dark' ? (
              <Sun aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Moon aria-hidden="true" className="h-4 w-4" />
            )}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button type="button" onClick={() => setResetting(true)} className={buttonStyles.secondary}>
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset demo
          </button>
          <button type="button" onClick={() => setEditing({ task: null })} className={buttonStyles.primary}>
            <Plus aria-hidden="true" className="h-4 w-4" />
            New task
          </button>
        </div>
      </Header>

      <main className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6">
        <Deliverables links={project.links} onSave={saveLink} />
        <TeamStrip
          team={team}
          tasks={tasks}
          activeMember={filters.member}
          onFilterMember={(member) => setFilters((prev) => ({ ...prev, member }))}
          onAddMember={() => setAddingMember(true)}
        />
        <FilterBar
          filters={filters}
          team={team}
          totalCount={tasks.length}
          shownCount={filteredTasks.length}
          onChange={setFilters}
        />
        <div id="board" tabIndex={-1} className="focus:outline-none">
          <Board
            tasks={filteredTasks}
            team={team}
            hasFilters={hasActiveFilters(filters)}
            onOpenTask={(task) => setEditing({ task })}
            onHandOff={handOff}
            onMove={moveTo}
            onCopy={copyContext}
            onCopyHandoff={copyHandoff}
            highlightedId={highlightedId}
            now={now}
          />
        </div>
      </main>

      {editing && (
        <TaskModal
          task={editing.task}
          tasks={tasks}
          team={team}
          toast={toast}
          onSave={saveTask}
          onDelete={deleteTask}
          onCopy={copyContext}
          onCopyHandoff={copyHandoff}
          onNotify={showToast}
          onClose={() => setEditing(null)}
        />
      )}

      {renaming && (
        <RenameProjectDialog name={project.name} onSave={renameProject} onClose={() => setRenaming(false)} />
      )}

      {addingMember && <AddMemberDialog onSave={addMember} onClose={() => setAddingMember(false)} />}

      {resetting && <ResetDemoDialog onConfirm={resetDemo} onClose={() => setResetting(false)} />}

      {/* After the task form, so it opens on top when copying from there. */}
      {fallbackText !== null && (
        <CopyFallbackDialog text={fallbackText} onClose={() => setFallbackText(null)} />
      )}

      {/* While the task form is open the page behind it can't be seen or
          heard, so the form shows its own copy of the toast instead. */}
      <Toast message={editing ? '' : toast} />
    </div>
  );
}
