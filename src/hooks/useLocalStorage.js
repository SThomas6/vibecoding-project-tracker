import { useState, useEffect } from 'react';

/**
 * A tiny localStorage hook — survives reloads, no library needed.
 *
 * `initialValue` is only used when nothing is stored yet. It can be a value
 * or a function that returns one (handy for building seed data lazily).
 *
 * Usage:
 *   const [tasks, setTasks] = useLocalStorage('vibetracker.tasks', []);
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const getInitial = () =>
      typeof initialValue === 'function' ? initialValue() : initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : getInitial();
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
