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

// Small text buttons on cards and section headings: 14px text, 36px tall, or
// 44px on touch screens, where fingers need more room (WCAG 2.5.8).
const smallButton =
  'inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-sm font-semibold [@media(pointer:coarse)]:min-h-11';

export const smallButtonStyles = {
  plain: `${smallButton} text-brand hover:bg-surface-sunken`,
  selected: `${smallButton} bg-brand text-white hover:bg-brand-hover`,
  outlined: `${smallButton} border border-line-control bg-surface-card text-brand hover:bg-surface-sunken`,
};

export const labelStyles = 'block text-sm font-medium text-ink';

// 16px text on phones: iOS Safari zooms in on any field with smaller text.
export const inputStyles =
  'mt-1.5 block min-h-11 w-full rounded-lg border border-line-control bg-surface-card px-3 text-base text-ink placeholder:text-ink-muted sm:text-sm';
