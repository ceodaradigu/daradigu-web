/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slow-rotate': 'spin 60s linear infinite',
        'slow-fade': 'fade-in-out 20s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
      },
    },
  },
  plugins: [],
};
