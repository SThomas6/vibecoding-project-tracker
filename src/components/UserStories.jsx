import { useId, useRef, useState } from 'react';
import { BookMarked, ChevronDown, Filter, Pencil, Plus, Trash2 } from 'lucide-react';
import { storyCode, storyParts, storyProgress } from '../lib/stories.js';
import DeleteStoryDialog from './DeleteStoryDialog.jsx';
import StoryBadge from './StoryBadge.jsx';
import StoryDialog from './StoryDialog.jsx';
import { smallButtonStyles } from './styles.js';

// The project's user stories (PRD FR26–FR28): "As a …, I want …, so that …",
// each with its code, how many of its linked tasks are done, and a button
// that filters the board to them, like the Team strip's Work button. The
// list is folded on every screen size, so the board stays near the top of
// the page (NFR5); the summary line says how far the stories have got.
export default function UserStories({ stories, tasks, activeStory, onFilterStory, onAdd, onUpdate, onDelete }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  // null, { type: 'add' }, { type: 'edit', story } or { type: 'delete', story }
  const [dialog, setDialog] = useState(null);
  const toggleRef = useRef(null);

  const linked = tasks.filter((task) => stories.some((story) => story.id === task.storyId));
  const done = linked.filter((task) => task.status === 'done').length;
  const summary =
    stories.length === 0
      ? 'No stories yet'
      : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'} · ${done} of ${linked.length} linked ${linked.length === 1 ? 'task' : 'tasks'} done`;

  function save(fields) {
    if (dialog.type === 'edit') {
      onUpdate(dialog.story, fields);
    } else {
      onAdd(fields);
      setOpen(true); // show the new story
    }
    setDialog(null);
  }

  function confirmDelete() {
    onDelete(dialog.story);
    setDialog(null);
  }

  return (
    <section aria-labelledby={`${id}-heading`} className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="min-w-0">
          <h2 id={`${id}-heading`} className="text-base font-semibold text-ink">
            User stories
          </h2>
          <p className="text-sm text-ink-muted">{summary}</p>
        </div>
        <div className="flex flex-wrap gap-1 [@media(pointer:coarse)]:gap-2">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            onClick={() => setOpen((value) => !value)}
            className={smallButtonStyles.outlined}
          >
            <BookMarked aria-hidden="true" className="h-3.5 w-3.5" />
            Stories ({stories.length})
            <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <button type="button" onClick={() => setDialog({ type: 'add' })} className={smallButtonStyles.plain}>
            <Plus aria-hidden="true" className="h-3.5 w-3.5" />
            Add story
          </button>
        </div>
      </div>

      <div id={`${id}-list`} hidden={!open} className="mt-3">
        {stories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                progress={storyProgress(story, tasks)}
                active={activeStory === story.id}
                onFilter={() => onFilterStory(activeStory === story.id ? 'all' : story.id)}
                onEdit={() => setDialog({ type: 'edit', story })}
                onDelete={() => setDialog({ type: 'delete', story })}
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-line-control p-4 text-center text-sm text-ink-muted">
            No user stories yet. Add one with "Add story", then link tasks to it in the task form.
          </p>
        )}
      </div>

      {(dialog?.type === 'add' || dialog?.type === 'edit') && (
        <StoryDialog story={dialog.story} onSave={save} onClose={() => setDialog(null)} />
      )}
      {dialog?.type === 'delete' && (
        <DeleteStoryDialog
          story={dialog.story}
          linkedCount={storyProgress(dialog.story, tasks).total}
          fallbackFocusRef={toggleRef}
          onConfirm={confirmDelete}
          onClose={() => setDialog(null)}
        />
      )}
    </section>
  );
}

// One story: its code, the sentence, progress in words (the bar is only a
// picture of the same number) and its three actions. Repeated buttons say
// which story they act on to screen readers ("Edit US2").
function StoryCard({ story, progress, active, onFilter, onEdit, onDelete }) {
  const code = storyCode(story);
  const { lead, role, want, benefit } = storyParts(story);
  const { done, total } = progress;

  return (
    <li
      className={`flex flex-col gap-2 rounded-lg border p-3 shadow-sm ${
        active ? 'border-focus bg-brand-tint/40' : 'border-line bg-surface-card'
      }`}
    >
      <h3 className="flex">
        <StoryBadge story={story} />
      </h3>
      <p className="text-sm text-ink [overflow-wrap:anywhere]">
        <strong>{lead}</strong> {role}, <strong>I want</strong> {want}
        {benefit && (
          <>
            , <strong>so that</strong> {benefit}
          </>
        )}
        .
      </p>
      <div>
        <p className="text-sm text-ink-muted">
          {total === 0 ? 'No tasks linked yet' : `${done} of ${total} ${total === 1 ? 'task' : 'tasks'} done`}
        </p>
        {total > 0 && (
          <div aria-hidden="true" className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-due-safe" style={{ width: `${(done / total) * 100}%` }} />
          </div>
        )}
      </div>
      <div className="mt-auto flex flex-wrap gap-1 border-t border-line pt-2 [@media(pointer:coarse)]:gap-2">
        <button
          type="button"
          aria-pressed={active}
          onClick={onFilter}
          className={active ? smallButtonStyles.selected : smallButtonStyles.plain}
        >
          <Filter aria-hidden="true" className="h-3.5 w-3.5" />
          {active ? 'Showing tasks' : `Tasks (${total})`}
          <span className="sr-only"> for {code}</span>
        </button>
        <button type="button" onClick={onEdit} className={smallButtonStyles.plain}>
          <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
          Edit<span className="sr-only"> {code}</span>
        </button>
        <button type="button" onClick={onDelete} className={smallButtonStyles.danger}>
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Delete<span className="sr-only"> {code}</span>
        </button>
      </div>
    </li>
  );
}
