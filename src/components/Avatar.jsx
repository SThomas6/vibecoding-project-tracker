import { initials } from '../lib/team.js';

const SIZES = {
  md: 'h-7 w-7 text-xs',
  lg: 'h-9 w-9 text-sm',
};

// Round initials badge for a team member. It's decorative: the member's name
// is always written out next to it for screen readers.
export default function Avatar({ member, size = 'md' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white ${SIZES[size]}`}
    >
      {member ? initials(member.name) : '?'}
    </span>
  );
}
