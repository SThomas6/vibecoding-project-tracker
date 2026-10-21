import { useEffect } from 'react';
import { STORAGE_KEYS } from '../constants.js';
import { useLocalStorage } from './useLocalStorage.js';

// Light or Dark mode (PRD FR23, DR13), saved between visits. index.html puts a
// saved Dark mode on <html> before the first paint; this keeps it in step.
// Transitions are paused while the class changes, so every colour switches at
// once; otherwise cards, which animate their highlight, would fade between
// themes a moment after the rest of the page.
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.classList.toggle('dark', theme === 'dark');
    void root.offsetHeight; // apply the new colours while transitions are paused
    root.classList.remove('theme-switching');
  }, [theme]);

  return [theme, setTheme];
}
