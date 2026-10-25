import { storyLabel } from '../lib/stories.js';
import { inputStyles, labelStyles } from './styles.js';

// The task form's "User story" field (PRD FR27): the one story this task
// delivers, or None. A separate component so TaskModal.jsx stays under 300
// lines (NFR15).
export default function StoryField({ id, stories, value, onChange }) {
  const hintId = `${id}-story-hint`;

  return (
    <div className="sm:col-span-2">
      <label htmlFor={`${id}-story`} className={labelStyles}>
        User story <span className="font-normal text-ink-muted">(optional)</span>
      </label>
      <select
        id={`${id}-story`}
        value={value}
        onChange={onChange}
        aria-describedby={stories.length === 0 ? hintId : undefined}
        className={inputStyles}
      >
        <option value="">None</option>
        {stories.map((story) => (
          <option key={story.id} value={story.id}>
            {storyLabel(story)}
          </option>
        ))}
      </select>
      {stories.length === 0 && (
        <p id={hintId} className="mt-1.5 text-sm text-ink-muted">
          No user stories yet. Add one with "Add story" in the User stories section above the board.
        </p>
      )}
    </div>
  );
}
