import { STAGES } from '../constants.js';
import TaskCard from './TaskCard.jsx';

// The Kanban board: one column per stage, each showing the tasks whose status
// matches. Four columns on wide screens, two on tablets, one on phones.
export default function Board({ tasks }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAGES.map((stage) => (
        <Column
          key={stage.id}
          stage={stage}
          tasks={tasks.filter((task) => task.status === stage.id)}
        />
      ))}
    </div>
  );
}

function Column({ stage, tasks }) {
  const headingId = `column-${stage.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="flex min-h-48 flex-col rounded-xl bg-surface-sunken p-3"
    >
      <h2 id={headingId} className="flex items-center justify-between px-1 text-base font-semibold text-ink">
        {stage.label}
        <span className="rounded-full bg-surface-card px-2 py-0.5 text-xs font-medium text-ink-muted">
          {tasks.length}
          <span className="sr-only"> {tasks.length === 1 ? 'task' : 'tasks'}</span>
        </span>
      </h2>

      {tasks.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-lg border border-dashed border-line-control p-4 text-center text-sm text-ink-muted">
          No tasks here yet.
        </p>
      )}
    </section>
  );
}
