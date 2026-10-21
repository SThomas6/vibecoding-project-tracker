import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants.js';
import { cleanTheme } from '../lib/storage.js';
import { useLocalStorage } from './useLocalStorage.js';

const DEVICE_DARK = '(prefers-color-scheme: dark)';

// Light or Dark mode (PRD FR23, DR13). Until the user picks one with the
// header toggle, the tracker follows the device's own setting; a choice is
// saved between visits. index.html puts Dark mode on <html> before the first
// paint; this keeps it in step.
// Transitions are paused while the class changes, so every colour switches at
// once; otherwise cards, which animate their highlight, would fade between
// themes a moment after the rest of the page.
export function useTheme() {
  const [saved, setSaved] = useLocalStorage(STORAGE_KEYS.theme, null, cleanTheme);
  const [deviceDark, setDeviceDark] = useState(() => window.matchMedia(DEVICE_DARK).matches);
  const theme = saved ?? (deviceDark ? 'dark' : 'light');

  useEffect(() => {
    const query = window.matchMedia(DEVICE_DARK);
    const update = (event) => setDeviceDark(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.classList.toggle('dark', theme === 'dark');
    void root.offsetHeight; // apply the new colours while transitions are paused
    root.classList.remove('theme-switching');
  }, [theme]);

  return [theme, setSaved];
}
