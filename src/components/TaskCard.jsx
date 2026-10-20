import Avatar from './Avatar.jsx';
import { getMember } from '../lib/team.js';

// One task on the board: the title, then who it's assigned to.
export default function TaskCard({ task }) {
  const member = getMember(task.assignee);

  return (
    <article className="rounded-lg border border-line bg-surface-card p-3 shadow-sm">
      <h3 className="text-sm font-medium leading-snug text-ink">{task.title}</h3>
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
