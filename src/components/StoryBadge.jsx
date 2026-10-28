import { storyCode } from '../lib/stories.js';

// A user story's code ("US2") as a small badge (PRD FR13). The code is
// text, so it never depends on colour; indigo on its tint is 7:1 or better in
// both themes.
export default function StoryBadge({ story, ...props }) {
  return (
    <span
      {...props}
      className="inline-flex shrink-0 items-center rounded-md bg-brand-tint px-1.5 py-0.5 font-mono text-xs font-semibold text-brand">
      {storyCode(story)}
    </span>
  );
}
