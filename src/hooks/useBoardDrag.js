import { useEffect, useRef, useState } from 'react';

// Drag a card to another column, or to another place in its own column, with
// a mouse or pen (PRD FR24). The card lands where it's dropped: above the
// first card whose middle is below the pointer, or at the bottom. It uses
// pointer events rather than native drag and drop, which can't start from a
// <button> in Firefox (and each card is mostly its title button). Touch and
// keyboard users set the Status and Position in the form instead, so nothing
// depends on dragging (WCAG 2.2 SC 2.5.7). A drag only starts once the pointer
// has moved 6px, so a plain click still opens the task. Escape cancels it.
const THRESHOLD = 6;
const EDGE = 48; // px from the top or bottom of the window that scrolls the page

export function useBoardDrag(onMove) {
  // { taskId, fromStage, overStage, beforeId, lands, dx, dy }; `lands` is false
  // while dropping would leave the card where it is.
  const [drag, setDrag] = useState(null);
  const press = useRef(null); // the press being tracked, with its stop() function
  const ignoreClick = useRef(false);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  // Stop listening if the board goes away mid-drag.
  useEffect(() => () => press.current?.stop(), []);

  function begin(event, task) {
    ignoreClick.current = false;
    if (event.pointerType === 'touch' || event.button !== 0) return;
    // The card's own buttons (Hand off, Copy…) and the hand-off panel keep
    // working as they are.
    if (event.target.closest('a, input, select, textarea, button:not([data-task-id]), [data-no-drag]')) return;

    const p = {
      taskId: task.id,
      fromStage: task.status,
      x: event.clientX,
      y: event.clientY,
      scrollY: window.scrollY,
      pointerId: event.pointerId,
      el: event.currentTarget,
      started: false,
      target: null, // { stage, beforeId }
      // The card below this one now: dropping just above it changes nothing.
      nextId: event.currentTarget.closest('[data-card-id]')?.nextElementSibling?.dataset.cardId ?? null,
    };

    // Listen on the whole window, so a quick drag that leaves the card at once
    // is still followed.
    function move(e) {
      if (e.pointerId !== p.pointerId) return;
      if (!p.started) {
        if (Math.hypot(e.clientX - p.x, e.clientY - p.y) < THRESHOLD) return;
        p.started = true;
        ignoreClick.current = true;
        try {
          p.el.setPointerCapture(p.pointerId); // keeps following outside the window
        } catch {
          /* the pointer has already been released */
        }
        window.getSelection()?.removeAllRanges();
        document.body.classList.add('select-none');
      }
      if (e.clientY < EDGE) window.scrollBy(0, -16);
      else if (e.clientY > window.innerHeight - EDGE) window.scrollBy(0, 16);
      p.target = dropTarget(e.clientX, e.clientY, p.taskId);
      setDrag({
        taskId: p.taskId,
        fromStage: p.fromStage,
        overStage: p.target?.stage ?? null,
        beforeId: p.target?.beforeId ?? null,
        lands: Boolean(p.target) && !(p.target.stage === p.fromStage && p.target.beforeId === p.nextId),
        dx: e.clientX - p.x,
        dy: e.clientY - p.y + (window.scrollY - p.scrollY),
      });
    }
    function up(e) {
      if (e.pointerId === p.pointerId) finish(true);
    }
    function cancel() {
      finish(false);
    }
    function key(e) {
      if (e.key === 'Escape' && p.started) finish(false);
    }
    function finish(drop) {
      p.stop();
      if (drop && p.started && p.target) onMoveRef.current(p.taskId, p.target.stage, p.target.beforeId);
      setDrag(null);
      // Only the click that comes straight after the drag is ignored. If none
      // comes (Escape, or the window lost focus), the next click still works.
      setTimeout(() => {
        ignoreClick.current = false;
      }, 0);
    }
    p.stop = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('keydown', key);
      window.removeEventListener('blur', cancel);
      document.body.classList.remove('select-none');
      if (press.current === p) press.current = null;
    };

    press.current?.stop();
    press.current = p;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('keydown', key);
    window.addEventListener('blur', cancel);
  }

  function cardProps(task) {
    return {
      onPointerDown: (event) => begin(event, task),
      onClickCapture(event) {
        // The click that ends a drag shouldn't also open the task.
        if (!ignoreClick.current) return;
        ignoreClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      },
    };
  }

  return { drag, cardProps };
}

// Where a card dropped here would land: the column under the pointer, and the
// card it would go above (the first whose middle is below the pointer), or
// null for the bottom. The card being dragged is skipped.
function dropTarget(x, y, draggedId) {
  for (const column of document.querySelectorAll('[data-stage]')) {
    const rect = column.getBoundingClientRect();
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;
    const below = [...column.querySelectorAll('[data-card-id]')].find((card) => {
      if (card.dataset.cardId === draggedId) return false;
      const box = card.getBoundingClientRect();
      return y < box.top + box.height / 2;
    });
    return { stage: column.dataset.stage, beforeId: below?.dataset.cardId ?? null };
  }
  return null;
}
