export const colors = {
  steel: {
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#0b1222',
  },
  fire: {
    300: '#fb923c',
    400: '#f97316',
    500: '#ea580c',
    700: '#9a3412',
    800: '#7c2d12',
    900: '#431407',
    glow: 'rgba(249, 115, 22, 0.4)',
  },
  brass: {
    300: '#fbbf24',
    400: '#d97706',
    500: '#b45309',
    glow: 'rgba(251, 191, 36, 0.3)',
  },
  semantic: {
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
  },
};

export const fonts = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
  serif: 'var(--font-serif)',
};

// Type scale and layout from the Nov 2026 plan. The live values are the
// --text-* and --container-content variables in src/app/globals.css; these
// mirror them for reference.
export const typeScale = {
  h1: 'clamp(2.75rem, 6vw, 5.25rem)', // Syne 700
  h2: 'clamp(1.875rem, 3.6vw, 3rem)', // Syne 700
  h3: '1.25rem', // Syne 700
  body: '1.125rem / 1.6', // DM Sans 400
  label: '0.75rem', // DM Sans 700, uppercase, 0.16em tracking, fire-400
  footnote: '0.8125rem', // at least 13px
};

export const layout = {
  contentWidth: '1200px',
  columns: 12,
};
