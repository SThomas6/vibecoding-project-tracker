import { useId, useRef } from 'react';
import { storyCode, storySentence } from '../lib/stories.js';
import Dialog from './Dialog.jsx';
import { buttonStyles } from './styles.js';

// Confirms deleting a user story (PRD FR13, NFR5). The safe choice, "Keep
// story", has focus first, so pressing Enter by accident deletes nothing.
// Deleting unlinks the story's tasks; the tasks themselves stay.
export default function DeleteStoryDialog({ story, linkedCount, fallbackFocusRef, onConfirm, onClose }) {
  const id = useId();
  const keepRef = useRef(null);
  const code = storyCode(story);
  const tasks = linkedCount === 1 ? 'task' : 'tasks';

  return (
    <Dialog
      labelledBy={`${id}-heading`}
      initialFocusRef={keepRef}
      fallbackFocusRef={fallbackFocusRef}
      onClose={onClose}
      width="max-w-md"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={`${id}-heading`} className="text-lg font-semibold">
          Delete {code}?
        </h2>
        <p className="text-sm text-ink-muted">{storySentence(story)}</p>
        <p className="text-sm text-ink">
          {linkedCount > 0 ? `Its ${linkedCount} linked ${tasks} will be unlinked.` : 'No tasks are linked to it.'} This
          can't be undone.
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button ref={keepRef} type="button" onClick={onClose} className={buttonStyles.secondary}>
            Keep story
          </button>
          <button type="button" onClick={onConfirm} className={buttonStyles.dangerSolid}>
            Delete story
          </button>
        </div>
      </div>
    </Dialog>
  );
}
