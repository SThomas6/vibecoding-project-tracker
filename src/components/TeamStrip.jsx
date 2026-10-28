import { Fragment, useId, useState } from 'react';
import { ChevronDown, Filter, GitBranch, UserPlus, Users } from 'lucide-react';
import { getContributors } from '../lib/tasks.js';
import Avatar from './Avatar.jsx';
import { smallButtonStyles } from './styles.js';
import { typeStyle } from './TypeBadge.jsx';

// "Who is driving what" (PRD FR7): one card per team member with their
// contact details, the tasks they have in progress (each with its type's icon
// and colour, as everywhere else a task appears, PRD FR5), and a quick filter
// button to show everything they have worked on (PRD FR12).
// GitHub handles are shown as text, not links, because the demo handles are
// made up and could belong to real people.
// Under 1024px the cards fold behind a "Members" button, as the filters do,
// so the board isn't pushed far down the page (NFR3).
export default function TeamStrip({ team, tasks, activeMember, onFilterMember, onAddMember }) {
  const listId = useId();
  const [open, setOpen] = useState(false);

  return (
    <section aria-labelledby="team-heading" className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <h2 id="team-heading" className="text-base font-semibold text-ink">
          Team
        </h2>
        <div className="flex flex-wrap gap-1 [@media(pointer:coarse)]:gap-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((value) => !value)}
            className={`${smallButtonStyles.outlined} lg:hidden`}
          >
            <Users aria-hidden="true" className="h-3.5 w-3.5" />
            Members ({team.length})
            <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {/* Adding members (PRD FR7). */}
          <button type="button" onClick={onAddMember} className={smallButtonStyles.plain}>
            <UserPlus aria-hidden="true" className="h-3.5 w-3.5" />
            Add member
          </button>
        </div>
      </div>
      {/* minmax(0, 1fr) columns, so long emails wrap rather than widen the page at 320px. */}
      <ul id={listId} className={`${open ? 'grid' : 'hidden'} mt-3 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4`}>
        {team.map((member) => {
          const driving = tasks.filter(
            (task) => task.assignee === member.id && task.status === 'in-progress'
          );
          const workedOnCount = tasks.filter((task) => getContributors(task).includes(member.id)).length;
          const isSelected = activeMember === member.id;

          return (
            <li
              key={member.id}
              className={`rounded-lg border p-3 shadow-sm ${
                isSelected ? 'border-focus bg-brand-tint/40' : 'border-line bg-surface-card'
              }`}
            >
              {/* The Work button drops below the details when they need the room. */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar member={member} size="lg" />
                  <div className="min-w-0 [overflow-wrap:anywhere]">
                    <p className="text-sm font-semibold text-ink">{member.name}</p>
                    {member.email && (
                      <p className="text-sm">
                        <a href={`mailto:${member.email}`} className="text-brand-accent underline hover:no-underline">
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.github && (
                      <p className="flex items-center gap-1 text-sm text-ink-muted">
                        <GitBranch aria-hidden="true" className="h-3.5 w-3.5" />
                        GitHub @{member.github}
                      </p>
                    )}
                  </div>
                </div>
                {onFilterMember && (
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onFilterMember(isSelected ? 'all' : member.id)}
                    className={`shrink-0 ${isSelected ? smallButtonStyles.selected : smallButtonStyles.plain}`}
                  >
                    <Filter aria-hidden="true" className="h-3.5 w-3.5" />
                    {isSelected ? 'Showing work' : `Work (${workedOnCount})`}
                    <span className="sr-only"> for {member.name}</span>
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                {driving.length > 0 ? (
                  <>
                    <span className="font-semibold text-ink">Driving:</span>{' '}
                    {driving.map((task, index) => (
                      <Fragment key={task.id}>
                        {index > 0 && ', '}
                        <DrivingTask task={task} />
                      </Fragment>
                    ))}
                  </>
                ) : (
                  'Nothing in progress'
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// One in-progress task: its type's icon (named for screen readers) and title.
function DrivingTask({ task }) {
  const style = typeStyle(task.type);
  return (
    <span className="inline-flex items-center gap-1">
      <style.Icon aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${style.icon}`} />
      <span className="sr-only">{style.label}: </span>
      {task.title}
    </span>
  );
}
