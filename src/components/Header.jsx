import { Pencil, SquareKanban } from 'lucide-react';

// Logo, product name and the project's name (with "Rename", M11), top left on
// every page. `children` is a slot for header actions (e.g. "New task").
export default function Header({ projectName, onRename, children }) {
  return (
    <header className="border-b border-line bg-surface-card">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SquareKanban aria-hidden="true" className="h-8 w-8 shrink-0 text-brand" />
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
                className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand hover:bg-surface-sunken"
              >
                <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                Rename<span className="sr-only"> project</span>
              </button>
            </p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
