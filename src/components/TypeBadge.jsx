import { Bug, Sparkles } from 'lucide-react';

// How each task type looks everywhere it appears (M6): the card stripe, the
// corner badge and the form. Colour is always paired with an icon and a word,
// so the type never depends on colour alone (DESIGN.md §2).
export const TYPE_STYLES = {
  feature: {
    label: 'Feature',
    Icon: Sparkles,
    badge: 'bg-feature-tint text-feature',
    icon: 'text-feature',
    stripeLeft: 'border-l-feature',
    stripeTop: 'border-t-feature',
    selected: 'has-[:checked]:border-feature has-[:checked]:bg-feature-tint',
  },
  bug: {
    label: 'Bug',
    Icon: Bug,
    badge: 'bg-bug-tint text-bug',
    icon: 'text-bug',
    stripeLeft: 'border-l-bug',
    stripeTop: 'border-t-bug',
    selected: 'has-[:checked]:border-bug has-[:checked]:bg-bug-tint',
  },
};

export function typeStyle(type) {
  return TYPE_STYLES[type] ?? TYPE_STYLES.feature;
}

// Small "Feature" / "Bug" badge with its icon.
export default function TypeBadge({ type }) {
  const style = typeStyle(type);
  const { Icon } = style;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-xs font-medium ${style.badge}`}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="sr-only">Type: </span>
      {style.label}
    </span>
  );
}
