import { initials } from '../lib/team.js';

// Round initials badge for a team member. It's decorative: the member's name
// is always written out next to it for screen readers.
export default function Avatar({ member }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white"
    >
      {member ? initials(member.name) : '?'}
    </span>
  );
}
