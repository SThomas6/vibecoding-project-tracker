import { HardDrive, LogOut, Pencil, SquareKanban } from 'lucide-react';
import { useSession } from '../hooks/useSession.js';
import Avatar from './Avatar.jsx';
import { smallButtonStyles } from './styles.js';

// Logo, product name and the project's name (with "Rename", PRD FR25), top
// left on every page, then one line saying what the tracker is for and that
// it saves only in this browser (PRD NFR6, NFR11). The logo and the name both
// go home. `children` is a slot for header actions (e.g. "New task"). Under
// the project, who is signed in through the MVP login, with Log out.
export default function Header({ projectName, onRename, children }) {
  const { user, logout } = useSession();

  return (
    <header className="border-b border-line bg-surface-card">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          {/* A second, mouse-only way home; keyboard and screen-reader users have the name. */}
          <a href="/" aria-hidden="true" tabIndex={-1} className="mt-0.5 shrink-0">
            <SquareKanban className="h-8 w-8 text-brand" />
          </a>
          <div>
            <h1 className="text-xl font-semibold leading-tight text-ink sm:text-2xl">
              <a href="/" className="rounded-sm hover:underline">
                Vibecoding Project Tracker
              </a>
            </h1>
            <p className="flex flex-wrap items-center gap-x-1 text-sm text-ink-muted">
              <span>
                Project: <span className="font-medium text-ink">{projectName}</span>
              </span>
              <button
                type="button"
                onClick={onRename}
                className={smallButtonStyles.plain}
              >
                <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                Rename<span className="sr-only"> project</span>
              </button>
            </p>
            {user && (
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
                <Avatar member={user} />
                <span>
                  Signed in as <span className="font-medium text-ink">{user.name}</span>
                </span>
                <button type="button" onClick={logout} className={smallButtonStyles.plain}>
                  <LogOut aria-hidden="true" className="h-3.5 w-3.5" />
                  Log out
                </button>
              </p>
            )}
            <p className="mt-0.5 flex items-start gap-1.5 text-sm text-ink-muted">
              <HardDrive aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Plan tasks, hand them off and brief your AI tool. Saved only in this browser: to pass work on, use
                Copy handoff.
              </span>
            </p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
