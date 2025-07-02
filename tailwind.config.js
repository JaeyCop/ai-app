/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      'ai-black': '#18181B',
      'ai-surface': '#23272F',
      'ai-green': '#22D3A9',
      'ai-blue': '#3B82F6',
      'ai-gold': '#FFD700',
      'ai-red': '#F43F5E',
      'ai-orange': '#FF8A4C',
      'ai-gray': '#A1A1AA',
      'ai-border': '#2A2E37',
    },
  },
};
export const plugins = [
  require('@tailwindcss/typography'),
];