// Shared Tailwind class strings so buttons and form fields look the same
// everywhere (DESIGN.md §4). Every button is at least 44px tall.

const button =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold';

export const buttonStyles = {
  primary: `${button} bg-brand text-white hover:bg-brand-hover`,
  secondary: `${button} border border-line-control bg-surface-card text-ink hover:bg-surface-sunken`,
  danger: `${button} border border-danger bg-surface-card text-danger hover:bg-danger-tint`,
  dangerSolid: `${button} bg-danger text-white hover:bg-danger-hover`,
};

export const labelStyles = 'block text-sm font-medium text-ink';

export const inputStyles =
  'mt-1.5 block min-h-11 w-full rounded-lg border border-line-control bg-surface-card px-3 text-sm text-ink placeholder:text-ink-muted';
