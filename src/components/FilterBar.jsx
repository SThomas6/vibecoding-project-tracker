import { useId } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { AI_TOOLS, TASK_TYPES } from '../constants.js';
import { DEFAULT_FILTERS, hasActiveFilters } from '../lib/filters.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// Search and advanced filters for the Kanban board (PRD FR23): lets the team
// search issues and filter by who has worked on or owns a task, task type,
// due-date state and AI context or tool. Every control has a visible label and
// no placeholder text (NFR1, NFR3, NFR4).
export default function FilterBar({ filters, team, totalCount, shownCount, onChange }) {
  const id = useId();
  const active = hasActiveFilters(filters);

  function update(field) {
    return (event) => onChange({ ...filters, [field]: event.target.value });
  }

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="mb-6 rounded-xl border border-line bg-surface-card p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`${id}-heading`} className="flex items-center gap-2 text-base font-semibold text-ink">
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-brand" />
          Search and filter board
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <p role="status" className="text-xs font-medium text-ink-muted">
            {active
              ? `Showing ${shownCount} of ${totalCount} ${totalCount === 1 ? 'task' : 'tasks'}`
              : `${totalCount} ${totalCount === 1 ? 'task' : 'tasks'} on the board`}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => onChange(DEFAULT_FILTERS)}
              className="inline-flex min-h-9 items-center gap-1 rounded-md border border-line-control bg-surface-card px-2.5 text-xs font-semibold text-brand hover:bg-surface-sunken"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor={`${id}-query`} className={labelStyles}>
            Search issues
          </label>
          <div className="relative mt-1.5">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            />
            <input
              id={`${id}-query`}
              type="search"
              value={filters.query}
              onChange={update('query')}
              aria-describedby={`${id}-query-hint`}
              className="min-h-11 w-full rounded-lg border border-line-control bg-surface-card pl-9 pr-3 text-sm text-ink"
            />
          </div>
          <p id={`${id}-query-hint`} className="mt-1 text-xs text-ink-muted">
            Title, description or handoff
          </p>
        </div>

        <div>
          <label htmlFor={`${id}-member`} className={labelStyles}>
            Worked on by
          </label>
          <select id={`${id}-member`} value={filters.member} onChange={update('member')} className={inputStyles}>
            <option value="all">All team members</option>
            <option value="unassigned">Unassigned only</option>
            <optgroup label="Worked on or owned by">
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} (all work)
                </option>
              ))}
            </optgroup>
            <optgroup label="Currently assigned to">
              {team.map((member) => (
                <option key={`owned:${member.id}`} value={`owned:${member.id}`}>
                  {member.name} (current owner)
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-type`} className={labelStyles}>
            Type
          </label>
          <select id={`${id}-type`} value={filters.type} onChange={update('type')} className={inputStyles}>
            <option value="all">All types</option>
            {TASK_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-due`} className={labelStyles}>
            Due state
          </label>
          <select id={`${id}-due`} value={filters.due} onChange={update('due')} className={inputStyles}>
            <option value="all">All due states</option>
            <option value="overdue">Overdue</option>
            <option value="warning">Due soon (under 24h)</option>
            <option value="safe">Calm (24h or more)</option>
            <option value="none">No due date</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-context`} className={labelStyles}>
            Handoff &amp; AI tool
          </label>
          <select id={`${id}-context`} value={filters.context} onChange={update('context')} className={inputStyles}>
            <option value="all">All tasks</option>
            <option value="has-handoff">Has a handoff</option>
            <optgroup label="By AI tool used">
              {AI_TOOLS.map((tool) => (
                <option key={tool} value={`tool:${tool}`}>
                  {tool}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </section>
  );
}
