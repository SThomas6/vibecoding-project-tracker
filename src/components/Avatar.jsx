import { initials } from '../lib/team.js';

const SIZES = {
  md: 'h-7 w-7 text-xs',
  lg: 'h-9 w-9 text-sm',
};

// Round initials badge for a team member. It's decorative: the member's name
// (or "Unassigned") is always written out next to it for screen readers.
// Unassigned tasks get a grey "?" (white on grey 4.76:1).
export default function Avatar({ member, size = 'md' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${member ? 'bg-brand' : 'bg-line-control'} ${SIZES[size]}`}
    >
      {member ? initials(member.name) : '?'}
    </span>
  );
}
