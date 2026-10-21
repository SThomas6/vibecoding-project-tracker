import { useState, useEffect } from 'react';

/**
 * A tiny localStorage hook — survives reloads, no library needed.
 *
 * `initialValue` is only used when nothing usable is stored. It can be a
 * value or a function that returns one (handy for building seed data lazily).
 * `clean` (optional) receives the stored value and returns the usable part,
 * or undefined to fall back to `initialValue` (see lib/storage.js).
 *
 * Usage:
 *   const [tasks, setTasks] = useLocalStorage('vibetracker.tasks', [], cleanTasks);
 */
export function useLocalStorage(key, initialValue, clean = (value) => value) {
  const [value, setValue] = useState(() => {
    const getInitial = () =>
      typeof initialValue === 'function' ? initialValue() : initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return getInitial();
      return clean(JSON.parse(raw)) ?? getInitial();
    } catch {
      return getInitial();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private-mode error — silently ignore for hackathon */
    }
  }, [key, value]);

  return [value, setValue];
}
