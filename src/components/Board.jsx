import { STAGES } from '../constants.js';
import { useBoardDrag } from '../hooks/useBoardDrag.js';
import { smallButtonStyles } from './styles.js';
import TaskCard from './TaskCard.jsx';

// The Kanban board (PRD FR1, FR2): one column per stage, each showing the
// tasks whose status matches, in list order. Four columns on wide screens, two
// on tablets, one on phones. Cards can be dragged to any place in any column
// with a mouse or pen (useBoardDrag, PRD FR24), and a line shows where the card
// will land. The Status and Position fields in the task form do the same
// without dragging, and the hint says so on touch screens, where dragging is off.
export default function Board({ tasks, team, hasFilters, onOpenTask, onHandOff, onCopy, onCopyHandoff, onMove, highlightedId, now }) {
  const { drag, cardProps } = useBoardDrag(onMove);

  return (
    <>
    <p className="mb-2 px-1 text-sm text-ink-muted">
      <span className="[@media(pointer:coarse)]:hidden">
        Drag a card to move it to another column or place, or open the task and change its Status or Position.
      </span>
      <span className="hidden [@media(pointer:coarse)]:inline">
        To move a task, open it and change its Status or Position.
      </span>
    </p>
    <ColumnLinks tasks={tasks} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAGES.map((stage) => (
        <Column
          key={stage.id}
          stage={stage}
          tasks={tasks.filter((task) => task.status === stage.id)}
          team={team}
          hasFilters={hasFilters}
          onOpenTask={onOpenTask}
          onHandOff={onHandOff}
          onCopy={onCopy}
          onCopyHandoff={onCopyHandoff}
          highlightedId={highlightedId}
          now={now}
          drag={drag}
          cardProps={cardProps}
        />
      ))}
    </div>
    </>
  );
}

function Column({ stage, tasks, team, hasFilters, onOpenTask, onHandOff, onCopy, onCopyHandoff, highlightedId, now, drag, cardProps }) {
  const headingId = `column-${stage.id}`;
  // A card would land in this column: show where with a line between cards.
  const isOver = Boolean(drag?.lands) && drag.overStage === stage.id;
  // Moving into another column also outlines the column.
  const isTarget = isOver && drag.fromStage !== stage.id;

  return (
    <section
      data-stage={stage.id}
      aria-labelledby={headingId}
      className={`flex min-h-48 flex-col rounded-xl p-3 ${isTarget ? 'bg-brand-tint outline-dashed outline-2 outline-offset-2 outline-focus' : 'bg-surface-sunken'}`}
    >
      <h2 id={headingId} className="flex scroll-mt-16 items-center justify-between px-1 text-base font-semibold text-ink xl:scroll-mt-0">
        {stage.label}
        <span className="rounded-full bg-surface-card px-2 py-0.5 text-xs font-medium text-ink-muted">
          <span className="sr-only">, </span>
          {tasks.length}
          <span className="sr-only"> {tasks.length === 1 ? 'task' : 'tasks'}</span>
        </span>
      </h2>

      {tasks.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {tasks.map((task, index) => (
            <li key={task.id} data-card-id={task.id} className="relative">
              {isOver && drag.beforeId === task.id && <DropLine />}
              {isOver && drag.beforeId === null && index === tasks.length - 1 && <DropLine below />}
              <TaskCard
                task={task}
                team={team}
                onOpen={onOpenTask}
                onHandOff={onHandOff}
                onCopy={onCopy}
                onCopyHandoff={onCopyHandoff}
                highlighted={task.id === highlightedId}
                now={now}
                dragProps={cardProps(task)}
                dragOffset={drag?.taskId === task.id ? drag : null}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-lg border border-dashed border-line-control p-4 text-center text-sm text-ink-muted">
          {hasFilters ? (
            'No matching tasks in this column.'
          ) : (
            <>
              No tasks here yet.
              <span className="mt-1 block">Add one with New task, or move a card here.</span>
            </>
          )}
        </p>
      )}

      {isTarget && tasks.length === 0 && (
        <p aria-hidden="true" className="mt-2 rounded-lg border-2 border-dashed border-focus p-3 text-center text-sm font-semibold text-brand">
          Drop to move to {stage.label}
        </p>
      )}
    </section>
  );
}

// Where the dragged card will land: a line in the gap above (or below) a card.
// It's drawn above the dragged card, which follows the pointer, so it stays in
// view. Screen readers hear the result ("Moved to Review, position 2 of 4").
function DropLine({ below = false }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-1 z-[60] h-1 rounded-full bg-focus ${below ? '-bottom-1.5' : '-top-1.5'}`}
    />
  );
}

// Below 1280px the columns stack, so a bar that stays at the top of the screen
// jumps to each one, with its count (PRD NFR5).
function ColumnLinks({ tasks }) {
  return (
    <nav aria-label="Columns" className="sticky top-0 z-30 -mx-4 mb-3 border-b border-line bg-surface-page px-3 py-2 sm:-mx-6 sm:px-6 xl:hidden">
      <ul className="flex gap-1 overflow-x-auto">
        {STAGES.map((stage) => {
          const count = tasks.filter((task) => task.status === stage.id).length;
          return (
            <li key={stage.id} className="shrink-0">
              <a href={`#column-${stage.id}`} className={`${smallButtonStyles.outlined} whitespace-nowrap !px-1.5`}>
                {stage.label}
                <span className="rounded-full bg-surface-sunken px-1 text-xs text-ink-muted">
                  <span className="sr-only">, </span>
                  {count}
                  <span className="sr-only"> {count === 1 ? 'task' : 'tasks'}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
