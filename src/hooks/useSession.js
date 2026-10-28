import { createContext, useContext } from 'react';

// Who is signed in through the MVP login (the demo user, John Doe) and how to
// log out. AuthGate.jsx provides it; the header and the task form read it.
export const SessionContext = createContext({ user: null, logout() {} });

export function useSession() {
  return useContext(SessionContext);
}
