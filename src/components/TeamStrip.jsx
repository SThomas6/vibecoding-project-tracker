import { GitBranch, UserPlus } from 'lucide-react';
import Avatar from './Avatar.jsx';

// "Who is driving what" (M7, optional on the slide): one card per team member
// with their contact details and the tasks they have in progress.
// GitHub handles are shown as text, not links, because the demo handles are
// made up and could belong to real people.
export default function TeamStrip({ team, tasks, onAddMember }) {
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
          return (
            <li key={member.id} className="rounded-lg border border-line bg-surface-card p-3 shadow-sm">
              <div className="flex items-center gap-3">
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
