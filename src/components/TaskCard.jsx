import Avatar from './Avatar.jsx';
import { getMember } from '../lib/team.js';

// One task on the board: the title, then who it's assigned to.
// The title is a button that opens the task. Its ::after layer stretches over
// the whole card, so the full card is clickable but is only one tab stop.
export default function TaskCard({ task, onOpen }) {
  const member = getMember(task.assignee);

  return (
    <article className="relative rounded-lg border border-line bg-surface-card p-3 shadow-sm transition-colors hover:border-line-control">
      <h3 className="text-sm font-medium leading-snug text-ink">
        <button
          type="button"
          data-task-id={task.id}
          onClick={() => onOpen(task)}
          className="text-left after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
        >
          {task.title}
        </button>
      </h3>
      <p className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
        <Avatar member={member} />
        <span>
          <span className="sr-only">Assigned to </span>
          {member ? member.name : 'Unassigned'}
        </span>
      </p>
    </article>
  );
}
