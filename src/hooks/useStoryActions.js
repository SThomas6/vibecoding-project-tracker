import { nextStoryNumber, storyCode } from '../lib/stories.js';
import { newId } from '../lib/tasks.js';

// Adds, edits and deletes the project's user stories (PRD FR13), with the
// message each change shows. Stories live in the project object (DR14).
// Deleting one unlinks its tasks and turns off the board's story filter if it
// was showing that story. Kept out of App.jsx so it stays under 300 lines.
export function useStoryActions({ project, setProject, tasks, setTasks, setFilters, showToast }) {
  const stories = project.stories ?? [];

  function addStory(fields) {
    const story = { id: newId(), number: nextStoryNumber(stories), ...fields };
    setProject((prev) => ({ ...prev, stories: [...(prev.stories ?? []), story] }));
    showToast(`User story ${storyCode(story)} added`);
  }

  function updateStory(story, fields) {
    setProject((prev) => ({
      ...prev,
      stories: (prev.stories ?? []).map((item) => (item.id === story.id ? { ...item, ...fields } : item)),
    }));
    showToast(`User story ${storyCode(story)} updated`);
  }

  function deleteStory(story) {
    const unlinked = tasks.filter((task) => task.storyId === story.id).length;
    setProject((prev) => ({ ...prev, stories: (prev.stories ?? []).filter((item) => item.id !== story.id) }));
    if (unlinked > 0) {
      setTasks((prev) => prev.map((task) => (task.storyId === story.id ? { ...task, storyId: null } : task)));
    }
    setFilters((prev) => (prev.story === story.id ? { ...prev, story: 'all' } : prev));
    const note = unlinked > 0 ? `. ${unlinked} ${unlinked === 1 ? 'task' : 'tasks'} unlinked` : '';
    showToast(`User story ${storyCode(story)} deleted${note}`);
  }

  return { stories, addStory, updateStory, deleteStory };
}
