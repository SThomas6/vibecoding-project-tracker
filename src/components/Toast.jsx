// Short confirmation messages ("Task added"). The live region is always on
// the page, so screen readers announce each new message without moving focus.
// On phones it sits higher, clear of the floating "New task" button.
export default function Toast({ message }) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 sm:bottom-6"
    >
      {message && (
        <p className="rounded-lg border border-line-control bg-[#0F172A] px-4 py-3 text-sm font-medium text-white shadow-lg">
          {message}
        </p>
      )}
    </div>
  );
}
