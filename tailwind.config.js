/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#fafaf9',
          100: '#f5f0eb',
          200: '#e7e0d9',
          300: '#d4ccc3',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#1c1917',
          900: '#0c0a09',
          950: '#080706',
        },
        accent: {
          DEFAULT: '#e8613c',
          light: '#f2845e',
          dark: '#c44a28',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
