/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Design tokens from DESIGN.md §2 ("Clear desk").
      // Every text/background pair below meets WCAG 2.2 AA (4.5:1 or better).
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)', // #4338CA brand-primary: logo mark, primary buttons, focus ring
          hover: 'rgb(var(--brand-hover) / <alpha-value>)', // #3730A3
          accent: 'rgb(var(--brand-accent) / <alpha-value>)', // #0E7490 brand-accent: links and highlights
          tint: 'rgb(var(--brand-tint) / <alpha-value>)', // #EEF2FF brief highlight after a hand-off (M7)
        },
        surface: {
          page: 'rgb(var(--surface-page) / <alpha-value>)', // #F8FAFC
          card: 'rgb(var(--surface-card) / <alpha-value>)', // #FFFFFF
          sunken: 'rgb(var(--surface-sunken) / <alpha-value>)', // #F1F5F9 column background
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)', // #0F172A text-primary
          muted: 'rgb(var(--ink-muted) / <alpha-value>)', // #475569 text-muted
        },
        line: {
          DEFAULT: 'rgb(var(--line) / <alpha-value>)', // #E2E8F0 decorative borders (cards, dividers)
          control: 'rgb(var(--line-control) / <alpha-value>)', // #64748B form-control borders, 4.76:1 against white
        },
        // Destructive actions (delete). White on red 6.47:1, red on tint 5.91:1.
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)', // #B91C1C
          hover: 'rgb(var(--danger-hover) / <alpha-value>)', // #991B1B
          tint: 'rgb(var(--danger-tint) / <alpha-value>)', // #FEF2F2
        },
        // M6 tag-style: type colour is always paired with an icon and a word.
        feature: {
          DEFAULT: 'rgb(var(--feature) / <alpha-value>)', // #1D4ED8
          tint: 'rgb(var(--feature-tint) / <alpha-value>)', // #DBEAFE
        },
        bug: {
          DEFAULT: 'rgb(var(--bug) / <alpha-value>)', // #9D174D
          tint: 'rgb(var(--bug-tint) / <alpha-value>)', // #FCE7F3
        },
        // M8 due-tint: due colour is always paired with an icon and a text label.
        due: {
          safe: 'rgb(var(--due-safe) / <alpha-value>)', // #166534
          'safe-tint': 'rgb(var(--due-safe-tint) / <alpha-value>)', // #DCFCE7
          warning: 'rgb(var(--due-warning) / <alpha-value>)', // #92400E
          'warning-tint': 'rgb(var(--due-warning-tint) / <alpha-value>)', // #FEF3C7
          overdue: 'rgb(var(--due-overdue) / <alpha-value>)', // #B91C1C solid fill with white text
          neutral: 'rgb(var(--due-neutral) / <alpha-value>)', // #475569
          'neutral-tint': 'rgb(var(--due-neutral-tint) / <alpha-value>)', // #F1F5F9
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
