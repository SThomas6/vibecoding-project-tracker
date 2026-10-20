/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Design tokens from DESIGN.md §2 ("Clear desk").
      // Every text/background pair below meets WCAG 2.2 AA (4.5:1 or better).
      colors: {
        brand: {
          DEFAULT: '#4338CA', // brand-primary: logo mark, primary buttons, focus ring
          hover: '#3730A3',
          accent: '#0E7490',  // brand-accent: links and highlights
        },
        surface: {
          page: '#F8FAFC',
          card: '#FFFFFF',
          sunken: '#F1F5F9',  // column background
        },
        ink: {
          DEFAULT: '#0F172A', // text-primary
          muted: '#475569',   // text-muted
        },
        line: {
          DEFAULT: '#E2E8F0', // decorative borders (cards, dividers)
          control: '#64748B', // form-control borders, 4.76:1 against white
        },
        // M6 tag-style: type colour is always paired with an icon and a word.
        feature: { DEFAULT: '#1D4ED8', tint: '#DBEAFE' },
        bug: { DEFAULT: '#9D174D', tint: '#FCE7F3' },
        // M8 due-tint: due colour is always paired with an icon and a text label.
        due: {
          safe: '#166534',
          'safe-tint': '#DCFCE7',
          warning: '#92400E',
          'warning-tint': '#FEF3C7',
          overdue: '#B91C1C', // solid fill with white text
          neutral: '#475569',
          'neutral-tint': '#F1F5F9',
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
