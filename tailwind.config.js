/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171922',
        paper: '#FBFBF9',
        mist: '#F3F4F7',
        midnight: {
          50: '#EEF2FA',
          100: '#DCE4F3',
          200: '#B7C6E7',
          300: '#8FA8D6',
          400: '#5F7FBE',
          500: '#3C5C99',
          600: '#28437A',
          700: '#1E3A5F',
          800: '#162A46',
          900: '#0F1D30',
        },
        silver: {
          100: '#F3F4F6',
          200: '#E4E6EA',
          300: '#CDD1D8',
          400: '#B8BFC9',
          500: '#9AA3B0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        wire: '2rem 0.5rem 2rem 0.5rem',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(23, 25, 34, 0.25)',
      },
      keyframes: {
        loop: {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        loop: 'loop 1.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
