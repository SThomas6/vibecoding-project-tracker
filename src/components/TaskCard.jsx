import { useId, useRef, useState } from 'react';
import { ArrowRightLeft, Copy, History, MessageSquareQuote, ScrollText } from 'lucide-react';
import { HANDOFF_NOTE_MAX_LENGTH } from '../constants.js';
import { getPastContributors } from '../lib/tasks.js';
import { getMember } from '../lib/team.js';
import Avatar from './Avatar.jsx';
import DueBadge from './DueBadge.jsx';
import TypeBadge, { typeStyle } from './TypeBadge.jsx';

// One task on the board: the title with its type badge in the corner, its due
// state, any handoff note and past contributors, who it's assigned to, and a
// row of actions: "Hand off" (M7, PRD FR10) and "Copy context" (M10, PRD FR18).
// The title is a button that opens the task. Its ::after layer stretches over
// the whole card, so the full card is clickable but is only one tab stop.
// The action buttons sit above that layer (relative z-10) so they get their
// own clicks.
const actionStyles =
  'relative z-10 inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand hover:bg-surface-sunken';

export default function TaskCard({ task, team, onOpen, onHandOff, onCopy, highlighted, now }) {
  const member = getMember(team, task.assignee);
  const others = team.filter((m) => m.id !== task.assignee);
  const pastNames = getPastContributors(task)
    .map((id) => getMember(team, id)?.name)
    .filter(Boolean);
  const latestHandoff = task.handoffs?.length ? task.handoffs[task.handoffs.length - 1] : null;
  const handoffFrom = latestHandoff ? getMember(team, latestHandoff.from)?.name : null;

  const [handOffOpen, setHandOffOpen] = useState(false);
  const [note, setNote] = useState('');
  const handOffRef = useRef(null);
  const panelId = useId();

  function closePanel() {
    setHandOffOpen(false);
    setNote('');
    handOffRef.current?.focus();
  }

  function handOffTo(memberId) {
    onHandOff(task.id, memberId, note.trim());
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

      {latestHandoff?.note && (
        <p className="mt-2 rounded-md bg-surface-sunken px-2 py-1.5 text-xs text-ink">
          <span className="flex items-center gap-1 font-semibold text-ink-muted">
            <MessageSquareQuote aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand" />
            {handoffFrom ? `Handoff from ${handoffFrom}:` : 'Latest handoff:'}
          </span>
          <span className="mt-0.5 block line-clamp-2">{latestHandoff.note}</span>
        </p>
      )}

      {task.promptLog?.length > 0 && (
        <p className="mt-2 flex items-center gap-1 text-xs text-ink-muted">
          <ScrollText aria-hidden="true" className="h-3.5 w-3.5" />
          {task.promptLog.length} {task.promptLog.length === 1 ? 'prompt' : 'prompts'} logged
        </p>
      )}

      <p className="mt-3 flex min-w-0 items-center gap-2 text-xs text-ink-muted">
        <Avatar member={member} />
        <span className="truncate">
          <span className="sr-only">Assigned to </span>
          {member ? member.name : 'Unassigned'}
        </span>
      </p>

      {pastNames.length > 0 && (
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
          <History aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span>Previously worked on by {pastNames.join(', ')}</span>
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-1 border-t border-line pt-2">
        <button
          ref={handOffRef}
          type="button"
          aria-expanded={handOffOpen}
          aria-controls={panelId}
          onClick={() => setHandOffOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && handOffOpen) setHandOffOpen(false);
          }}
          className={actionStyles}
        >
          <ArrowRightLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Hand off<span className="sr-only"> "{task.title}"</span>
        </button>
        <button type="button" onClick={() => onCopy(task)} className={actionStyles}>
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          Copy context<span className="sr-only"> for "{task.title}"</span>
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
          <div className="mb-2">
            <label htmlFor={`${panelId}-note`} className="block text-xs font-medium text-ink">
              Handoff note <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <p id={`${panelId}-note-hint`} className="text-xs text-ink-muted">
              What is done or what the next person should try
            </p>
            <input
              id={`${panelId}-note`}
              type="text"
              maxLength={HANDOFF_NOTE_MAX_LENGTH}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              aria-describedby={`${panelId}-note-hint`}
              className="mt-1 min-h-9 w-full rounded-md border border-line-control bg-surface-card px-2 text-xs text-ink"
            />
          </div>
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
