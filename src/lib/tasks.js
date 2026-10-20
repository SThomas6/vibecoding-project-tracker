import { todayISO } from './dates.js';

// Builds a complete new task from the form fields. The id and created date
// are set here, so the form never has to deal with them.
export function createTask(fields) {
  return {
    id: newId(),
    createdDate: todayISO(),
    context: '',
    contextTool: null,
    contextUpdatedAt: null,
    ...fields,
  };
}

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}`;
}
