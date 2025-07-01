// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ai-black': '#18181B', // Premium dark background
        'ai-surface': '#23272F', // Card/surface background
        'ai-green': '#22D3A9', // Premium teal-green
        'ai-blue': '#3B82F6', // Premium blue accent
        'ai-gold': '#FFD700', // Gold for premium highlights
        'ai-red': '#F43F5E',   // Modern red for alerts/actions
        'ai-orange': '#FF8A4C', // Premium orange for actions/highlights
        'ai-gray': '#A1A1AA', // Neutral gray for text
        'ai-border': '#2A2E37', // Border color for cards/inputs
      },
    },
  },
  plugins: [],
}