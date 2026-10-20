import { Filter, GitBranch, UserPlus } from 'lucide-react';
import { getContributors } from '../lib/tasks.js';
import Avatar from './Avatar.jsx';

// "Who is driving what" (M7, optional on the slide): one card per team member
// with their contact details, the tasks they have in progress, and a quick
// filter button to show everything they have worked on (PRD FR11, FR23).
// GitHub handles are shown as text, not links, because the demo handles are
// made up and could belong to real people.
export default function TeamStrip({ team, tasks, activeMember, onFilterMember, onAddMember }) {
  return (
    <section aria-labelledby="team-heading" className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <h2 id="team-heading" className="text-base font-semibold text-ink">
          Team
        </h2>
        {/* Adding members (PRD FR12). */}
        <button
          type="button"
          onClick={onAddMember}
          className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand hover:bg-surface-sunken"
        >
          <UserPlus aria-hidden="true" className="h-3.5 w-3.5" />
          Add member
        </button>
      </div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                isSelected ? 'border-brand bg-brand-tint/40' : 'border-line bg-surface-card'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar member={member} size="lg" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{member.name}</p>
                    {member.email && (
                      <p className="truncate text-xs">
                        <a href={`mailto:${member.email}`} className="text-brand-accent underline hover:no-underline">
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.github && (
                      <p className="flex items-center gap-1 text-xs text-ink-muted">
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
                    className={`inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-semibold ${
                      isSelected
                        ? 'bg-brand text-white hover:bg-brand-hover'
                        : 'text-brand hover:bg-surface-sunken'
                    }`}
                  >
                    <Filter aria-hidden="true" className="h-3.5 w-3.5" />
                    {isSelected ? 'Showing work' : `Work (${workedOnCount})`}
                    <span className="sr-only"> for {member.name}</span>
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                {driving.length > 0 ? (
                  <>
                    <span className="font-semibold text-ink">Driving:</span>{' '}
                    {driving.map((task) => task.title).join(', ')}
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
