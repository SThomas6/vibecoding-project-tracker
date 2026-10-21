import { DELIVERABLES } from '../constants.js';
import DeliverableCard from './DeliverableCard.jsx';

// The project's deliverables, pinned above the board (PRD FR19): the clients'
// "big anchors" for the presentation, demo, report and documentation, in one
// slim row on wide screens so the board starts near the top of the page.
export default function Deliverables({ links, onSave }) {
  return (
    <section aria-labelledby="deliverables-heading" className="mb-5">
      <h2 id="deliverables-heading" className="px-1 text-base font-semibold text-ink">
        Deliverables
      </h2>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
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
