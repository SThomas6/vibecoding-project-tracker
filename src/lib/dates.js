// Dates are stored as 'YYYY-MM-DD' strings in the user's own time zone.

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Today as 'YYYY-MM-DD'. (toISOString() uses UTC, which can be a day off
// near midnight, so we build the string from local date parts instead.)
export function todayISO() {
  return toISODate(new Date());
}

// A date relative to today, e.g. daysFromToday(-2) is two days ago.
export function daysFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toISODate(date);
}
