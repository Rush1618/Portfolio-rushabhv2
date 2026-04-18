/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#040812',
        'bg-surface': '#0a1628',
        'accent-cyan': '#00d4ff',
        'accent-blue': '#0066ff',
        'accent-gold': '#ffd700',
        'accent-purple': '#7c3aed',
        'accent-green': '#00ff88',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        evoxsy: ['Evoxsy', 'serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}
