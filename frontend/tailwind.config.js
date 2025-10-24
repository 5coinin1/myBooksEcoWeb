// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-primary': '#3B82F6',
        'brand-secondary': '#60A5FA',
        'brand-dark': '#111827',
        'brand-light': '#F9FAFB',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        destructive: 'hsl(var(--destructive))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        muted: {
          foreground: 'hsl(var(--muted-foreground))',
        },
      }
    },
  },
  plugins: [],
}