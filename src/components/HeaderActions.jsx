import { Moon, Plus, RotateCcw, Sun } from 'lucide-react';
import { buttonStyles } from './styles.js';

// The header's buttons: Light or Dark mode (PRD FR23), Reset demo (FR20) and
// New task (FR4). On phones New task floats at the bottom right, within thumb
// reach (NFR5); from 640px it sits in the header with the others.
export default function HeaderActions({ theme, onToggleTheme, onReset, onNewTask }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={theme === 'dark'} onClick={onToggleTheme} className={buttonStyles.secondary}>
        {theme === 'dark' ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
      <button type="button" onClick={onReset} className={buttonStyles.secondary}>
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Reset demo
      </button>
      <button
        type="button"
        onClick={onNewTask}
        className={`${buttonStyles.primary} fixed bottom-4 right-4 z-40 shadow-lg sm:static sm:shadow-none`}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
        New task
      </button>
    </div>
  );
}
