import { SquareKanban } from 'lucide-react';

// Logo and product name, top left on every page. `children` is a slot for
// header actions (e.g. the "New task" button).
export default function Header({ children }) {
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
            <p className="text-sm text-ink-muted">Project: Portfolio site</p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
