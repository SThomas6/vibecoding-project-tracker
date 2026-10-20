// Short confirmation messages ("Task added"). The live region is always on
// the page, so screen readers announce each new message without moving focus.
export default function Toast({ message }) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      {message && (
        <p className="rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white shadow-lg">
          {message}
        </p>
      )}
    </div>
  );
}
