import { AlarmClock, CircleCheck, Clock, TriangleAlert } from 'lucide-react';
import { formatDate } from '../lib/dates.js';
import { dueState } from '../lib/due.js';

// Each due state has its own colour, icon and words (DESIGN.md §2), so it
// never depends on colour alone. Overdue is the only solid badge.
const DUE_STYLES = {
  safe: { Icon: Clock, className: 'bg-due-safe-tint text-due-safe' },
  warning: { Icon: TriangleAlert, className: 'bg-due-warning-tint text-due-warning' },
  overdue: { Icon: AlarmClock, className: 'bg-due-overdue text-white' },
  done: { Icon: CircleCheck, className: 'bg-due-neutral-tint text-due-neutral' },
};

export default function DueBadge({ task, now }) {
  const due = dueState(task, now);
  if (!due) return null;
  const { Icon, className } = DUE_STYLES[due.state];

  return (
    <span
      data-due-state={due.state}
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold ${className}`}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {due.label}
      {task.dueDate && (
        <span className="sr-only">
          {due.state === 'done' ? ` (was due ${formatDate(task.dueDate)})` : ` (${formatDate(task.dueDate)})`}
        </span>
      )}
    </span>
  );
}
