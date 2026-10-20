import { useEffect, useState } from 'react';

// The current time, refreshed every `intervalMs` and whenever the tab becomes
// visible again (browsers slow timers down in background tabs). Used so the
// due-date colours update by themselves (PRD FR23).
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timer = setInterval(tick, intervalMs);
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [intervalMs]);

  return now;
}
