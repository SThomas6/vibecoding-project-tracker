// The page footer: the product name, a reminder that data stays in this
// browser (PRD NFR11, DR12) and a link to the source code (NFR15). The extra
// space at the bottom on phones keeps it clear of the floating New task button.
export default function Footer() {
  return (
    <footer className="mx-auto max-w-screen-2xl border-t border-line px-4 pb-24 pt-4 text-sm text-ink-muted sm:px-6 sm:pb-6">
      Vibecoding Project Tracker · Data stays in this browser ·{' '}
      <a href="https://github.com/SThomas6/vibecoding-project-tracker" className="text-brand-accent underline hover:no-underline">
        Source code on GitHub
      </a>
    </footer>
  );
}
