// Due-date states (M8, PRD FR13–FR14).
// A task is due at the END of its due date, in local time.
//   overdue : past the end of the due date
//   warning : due in under 24 hours
//   safe    : due in 24 hours or more ("calm")
//   done    : any task in Done, even an overdue one
// Tasks with no due date get no state (no label).

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function dueState(task, now = new Date()) {
  if (task.status === 'done') return { state: 'done', label: 'Done' };
  if (!task.dueDate) return null;

  const [year, month, day] = task.dueDate.split('-').map(Number);
  const dueDay = new Date(year, month - 1, day);
  const dueEnd = new Date(year, month - 1, day, 23, 59, 59, 999);
  const msLeft = dueEnd - now;
  // Whole calendar days from today (Math.round copes with clock changes).
  const days = Math.round((dueDay - startOfDay(now)) / DAY);

  if (msLeft < 0) {
    const late = Math.max(1, -days);
    return { state: 'overdue', label: `Overdue by ${late} ${late === 1 ? 'day' : 'days'}` };
  }

  const label = days === 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`;
  return { state: msLeft < DAY ? 'warning' : 'safe', label };
}
