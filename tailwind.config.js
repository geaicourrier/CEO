/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        corporate: {
          abyss: '#0B0F17',
          panel: '#111827',
          edge: '#1F2937',
          line: '#374151',
        },
        gauge: {
          cash: '#10B981',
          traction: '#F59E0B',
          morale: '#818CF8',
          board: '#3B82F6',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        press: ['"Playfair Display"', 'Merriweather', 'Georgia', 'serif'],
        ui: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
