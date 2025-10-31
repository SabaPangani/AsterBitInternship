/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'DejaVu Sans',
          'Noto Sans',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['22px', { lineHeight: '1.35' }],
        h2: ['16px', { lineHeight: '1.4' }],
        subtitle: ['13px', { lineHeight: '1.45' }],
        body: ['11px', { lineHeight: '1.6' }],
      },
      lineHeight: {
        tightish: '1.35',
        normalish: '1.6',
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
