import { useId, useRef, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import Avatar from './Avatar.jsx';
import DueBadge from './DueBadge.jsx';
import TypeBadge, { typeStyle } from './TypeBadge.jsx';
import { TEAM } from '../constants.js';
import { getMember } from '../lib/team.js';

// One task on the board: the title with its type badge in the corner, then
// who it's assigned to and a "Hand off" control (M7).
// The title is a button that opens the task. Its ::after layer stretches over
// the whole card, so the full card is clickable but is only one tab stop.
// The hand-off controls sit above that layer (relative z-10) so they get
// their own clicks.
export default function TaskCard({ task, onOpen, onHandOff, highlighted, now }) {
  const member = getMember(task.assignee);
  const others = TEAM.filter((m) => m.id !== task.assignee);
  const [handOffOpen, setHandOffOpen] = useState(false);
  const handOffRef = useRef(null);
  const panelId = useId();

  function closePanel() {
    setHandOffOpen(false);
    handOffRef.current?.focus();
  }

  function handOffTo(memberId) {
    onHandOff(task.id, memberId);
    closePanel();
  }

  return (
    <article
      className={`relative rounded-lg border border-l-4 border-line ${typeStyle(task.type).stripeLeft} p-3 shadow-sm transition duration-300 hover:border-y-line-control hover:border-r-line-control ${highlighted ? 'bg-brand-tint ring-2 ring-brand ring-offset-2 ring-offset-surface-sunken' : 'bg-surface-card'}`}
    >
      <div className="flex items-start justify-between gap-2">
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
        <TypeBadge type={task.type} />
      </div>

      {/* Due-date badge (M8); the wrapper hides itself when there's no badge. */}
      <div className="mt-2 empty:hidden">
        <DueBadge task={task} now={now} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2 text-xs text-ink-muted">
          <Avatar member={member} />
          <span className="truncate">
            <span className="sr-only">Assigned to </span>
            {member ? member.name : 'Unassigned'}
          </span>
        </p>
        <button
          ref={handOffRef}
          type="button"
          aria-expanded={handOffOpen}
          aria-controls={panelId}
          onClick={() => setHandOffOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && handOffOpen) setHandOffOpen(false);
          }}
          className="relative z-10 inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand hover:bg-surface-sunken"
        >
          <ArrowRightLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Hand off<span className="sr-only"> "{task.title}"</span>
        </button>
      </div>

      {handOffOpen && (
        <div
          id={panelId}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closePanel();
          }}
          className="relative z-10 mt-2 rounded-md border border-line bg-surface-sunken p-2"
        >
          <p className="px-1 text-xs font-medium text-ink-muted">Hand off to…</p>
          <ul className="mt-1 flex flex-col gap-1">
            {others.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => handOffTo(m.id)}
                  className="flex min-h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm text-ink hover:bg-surface-card"
                >
                  <Avatar member={m} />
                  <span>
                    <span className="sr-only">Hand off to </span>
                    {m.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
