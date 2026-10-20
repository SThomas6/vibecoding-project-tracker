import { DELIVERABLES } from '../constants.js';
import DeliverableCard from './DeliverableCard.jsx';

// The project's deliverables, pinned above the board (M11, PRD FR19): the
// clients' "big anchors" for the presentation, demo, report and documentation.
export default function Deliverables({ links, onSave }) {
  return (
    <section aria-labelledby="deliverables-heading" className="mb-6">
      <h2 id="deliverables-heading" className="px-1 text-base font-semibold text-ink">
        Deliverables
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DELIVERABLES.map((deliverable) => (
          <DeliverableCard
            key={deliverable.id}
            deliverable={deliverable}
            url={links[deliverable.id] ?? ''}
            onSave={onSave}
          />
        ))}
      </ul>
    </section>
  );
}
