import { useId, useRef, useState } from 'react';
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { AI_TOOLS, TASK_TYPES } from '../constants.js';
import { DEFAULT_FILTERS, hasActiveFilters } from '../lib/filters.js';
import { storyLabel } from '../lib/stories.js';
import { buttonStyles, inputStyles, labelStyles, smallButtonStyles } from './styles.js';

// The five filters that sit behind the "Filters" button on small screens.
const FILTER_KEYS = ['member', 'type', 'due', 'context', 'story'];

// Search and filters for the board (PRD FR12): search tasks, and filter by who
// has worked on or owns a task, task type, due-date state, handoff or AI tool,
// and user story (PRD FR13). From 1280px everything sits in one row; from
// 1024px the filters have a row of their own under the search, so each select
// is wide enough to read; on small screens the five filters fold behind a
// "Filters" button, so the board isn't pushed far down the page (NFR3). Every
// control has a visible label and no placeholder (NFR1).
export default function FilterBar({ filters, team, stories = [], totalCount, shownCount, onChange }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const active = hasActiveFilters(filters);
  const chosen = FILTER_KEYS.filter((key) => filters[key] !== 'all').length;
  const tasks = totalCount === 1 ? 'task' : 'tasks';

  function update(field) {
    return (event) => onChange({ ...filters, [field]: event.target.value });
  }

  // The Clear button disappears once nothing is filtered, so focus moves to
  // the search box rather than being lost.
  function clear() {
    onChange(DEFAULT_FILTERS);
    searchRef.current.focus();
  }

  return (
    <section aria-labelledby={`${id}-heading`} className="mb-6 rounded-xl border border-line bg-surface-card p-4 shadow-sm">
      <h2 id={`${id}-heading`} className="sr-only">
        Search and filter the board
      </h2>

      {/* grid-cols-1 keeps long story names in a select from widening a phone
          screen. In the one-row layout the boxes line up along their bottom
          edge, even when the search label wraps onto two lines. */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.4fr)_repeat(5,minmax(0,1fr))] xl:items-end">
        <div>
          <label htmlFor={`${id}-query`} className={labelStyles}>
            Search tasks <span className="font-normal text-ink-muted">(titles, descriptions, handoffs)</span>
          </label>
          <div className="relative mt-1.5">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            />
            <input
              id={`${id}-query`}
              ref={searchRef}
              type="search"
              value={filters.query}
              onChange={update('query')}
              className="min-h-11 w-full rounded-lg border border-line-control bg-surface-card pl-9 pr-3 text-base text-ink sm:text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-filters`}
          onClick={() => setOpen((value) => !value)}
          className={`${buttonStyles.secondary} justify-self-start lg:hidden`}
        >
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          Filters
          {chosen > 0 && (
            <span className="rounded-full bg-brand px-1.5 text-xs text-white">
              <span className="sr-only">, </span>
              {chosen}
              <span className="sr-only"> on</span>
            </span>
          )}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <div
          id={`${id}-filters`}
          className={`${open ? 'grid' : 'hidden'} grid-cols-1 gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-5 xl:col-span-5`}
        >
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

          <div>
            <label htmlFor={`${id}-story`} className={labelStyles}>
              User story
            </label>
            <select id={`${id}-story`} value={filters.story} onChange={update('story')} className={inputStyles}>
              <option value="all">All user stories</option>
              <option value="none">No user story</option>
              {stories.length > 0 && (
                <optgroup label="Linked to">
                  {stories.map((story) => (
                    <option key={story.id} value={story.id}>
                      {storyLabel(story, 48)}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* The count is read out whenever it changes; it's only shown while filtering. */}
      <div className={`flex flex-wrap items-center gap-3 ${active ? 'mt-3' : ''}`}>
        <p role="status" className={active ? 'text-sm font-medium text-ink-muted' : 'sr-only'}>
          {active ? `Showing ${shownCount} of ${totalCount} ${tasks}` : `Showing all ${totalCount} ${tasks}`}
        </p>
        {active && (
          <button
            type="button"
            onClick={clear}
            className={smallButtonStyles.outlined}
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
