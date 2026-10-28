import { useEffect, useId, useRef, useState } from 'react';
import { Info, LogIn, SquareKanban } from 'lucide-react';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// The MVP login page (PRD FR16), shown before the board. It's only the interface of a
// login, as the stakeholders asked for one: there's no register page, nothing
// typed is checked, saved or sent, and pressing Login always signs in the demo
// user, John Doe. The notice says so plainly at the top, so a reviewer knows
// no account is needed (Brief: reviewers mustn't have to register). Both
// fields are labelled and say they're optional, with no placeholders.
export default function LoginPage({ user, loggedOut, onLogin }) {
  const id = useId();
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login · Vibecoding Project Tracker';
    if (loggedOut) emailRef.current?.focus();
  }, [loggedOut]);

  function handleSubmit(event) {
    event.preventDefault();
    // Whatever was typed is forgotten straight away; it's never checked or kept.
    setEmail('');
    setPassword('');
    onLogin();
  }

  return (
    <main className="flex min-h-screen items-start justify-center px-4 py-10 sm:items-center">
      <div className="w-full max-w-md">
        <p className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-ink">
          <SquareKanban aria-hidden="true" className="h-7 w-7 shrink-0 text-brand" />
          Vibecoding Project Tracker
        </p>

        <div className="rounded-xl border border-line bg-surface-card p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-ink">Login</h1>

          <div id={`${id}-notice`} className="mt-4 rounded-lg border-2 border-focus bg-brand-tint p-4">
            <p className="flex items-center gap-2 text-base font-bold text-ink">
              <Info aria-hidden="true" className="h-5 w-5 shrink-0 text-brand" />
              MVP login page
            </p>
            <p className="mt-1 text-base font-semibold text-ink">
              Please press Login to log in. No login details required.
            </p>
            <p className="mt-2 text-sm text-ink">
              Whatever you type, you'll be logged in as {user.name}, the demo user. Nothing you type is checked,
              saved or sent.
            </p>
          </div>

          {loggedOut && <p className="mt-4 text-sm font-medium text-ink">You've logged out.</p>}

          <form noValidate onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div>
              <label htmlFor={`${id}-email`} className={labelStyles}>
                Email <span className="font-normal text-ink-muted">(optional)</span>
              </label>
              <input
                id={`${id}-email`}
                ref={emailRef}
                type="email"
                inputMode="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby={`${id}-notice`}
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor={`${id}-password`} className={labelStyles}>
                Password <span className="font-normal text-ink-muted">(optional)</span>
              </label>
              <input
                id={`${id}-password`}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputStyles}
              />
            </div>
            <button type="submit" aria-describedby={`${id}-notice`} className={`${buttonStyles.primary} w-full`}>
              <LogIn aria-hidden="true" className="h-4 w-4" />
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-ink-muted">
            There's no Register page: in this MVP everyone uses the one demo account.
          </p>
        </div>
      </div>
    </main>
  );
}
