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
          50: '#F6F2FB',
          100: '#EBE1F6',
          200: '#D4C0EC',
          300: '#B99EDD',
          400: '#A07FD1',
          500: '#8862C4',
          600: '#7049AE',
          700: '#5C3894',
          800: '#472A73',
          900: '#331E54',
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
