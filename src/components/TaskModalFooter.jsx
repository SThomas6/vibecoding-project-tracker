import { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { buttonStyles } from './styles.js';

// The task form's footer (PRD FR5, FR6, NFR7): Delete, Cancel and Save, or,
// while a question is open, the question and its two answers. The safe
// answer gets focus first, so pressing Enter by accident never loses work.
function question(confirming, isEdit) {
  if (confirming === 'delete') {
    return { text: "Delete this task? This can't be undone.", keep: 'Keep task', go: 'Delete task' };
  }
  return isEdit
    ? { text: 'Discard your changes?', keep: 'Keep editing', go: 'Discard changes' }
    : { text: 'Discard this new task?', keep: 'Keep editing', go: 'Discard task' };
}

export default function TaskModalFooter({ isEdit, confirming, deleteRef, cancelRef, onAskDelete, onCancel, onKeep, onConfirm }) {
  const keepRef = useRef(null);

  useEffect(() => {
    if (confirming) keepRef.current.focus();
  }, [confirming]);

  if (confirming) {
    const { text, keep, go } = question(confirming, isEdit);
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
        <p role="alert" className="text-sm font-medium text-ink">
          {text}
        </p>
        <div className="flex gap-3">
          <button ref={keepRef} type="button" onClick={onKeep} className={buttonStyles.secondary}>
            {keep}
          </button>
          <button type="button" onClick={onConfirm} className={buttonStyles.dangerSolid}>
            {go}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
      {isEdit ? (
        <button ref={deleteRef} type="button" onClick={onAskDelete} className={buttonStyles.danger}>
          <Trash2 aria-hidden="true" className="h-4 w-4" />
          Delete
        </button>
      ) : (
        <span />
      )}
      <div className="flex gap-3">
        <button ref={cancelRef} type="button" onClick={onCancel} className={buttonStyles.secondary}>
          Cancel
        </button>
        <button type="submit" className={buttonStyles.primary}>
          {isEdit ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </div>
  );
}
