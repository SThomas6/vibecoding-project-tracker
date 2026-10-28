import { useMemo, useState } from 'react';
import { SessionContext } from '../hooks/useSession.js';
import { DEMO_USER, endSession, readSession, startSession } from '../lib/session.js';
import LoginPage from './LoginPage.jsx';

// Shows the MVP login page (PRD FR16) until someone presses Login, then the tracker,
// signed in as the demo user (John Doe) until the tab is closed or they log
// out. The status line, always on the page, tells screen-reader users that
// they've logged in or out.
export default function AuthGate({ children }) {
  const [user, setUser] = useState(readSession);
  const [loggedOut, setLoggedOut] = useState(false);
  const [message, setMessage] = useState('');

  const session = useMemo(
    () => ({
      user,
      logout() {
        endSession();
        setLoggedOut(true);
        setUser(null);
        setMessage("You've logged out.");
      },
    }),
    [user]
  );

  function login() {
    setUser(startSession());
    setMessage(`Logged in as ${DEMO_USER.name}.`);
  }

  return (
    <>
      {user ? (
        <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
      ) : (
        <LoginPage user={DEMO_USER} loggedOut={loggedOut} onLogin={login} />
      )}
      <p role="status" className="sr-only">
        {message}
      </p>
    </>
  );
}
