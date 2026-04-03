/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo-black': 'archivo-black',
        'anonymous-pro': 'anonymous-pro'
      },
      width: {
        'medium': '768px',
      },
      maxWidth: {
        'medium': '768px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'blink': {
          '50%': { color: 'transparent' }
        },
        'typeT': {
          'from': { 'background-size': '0 200%' }
        },
        'typeB': {
          '50%': { 'background-position': '0 -100%, 0 0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 1.5s ease-out forwards',
        'blink': 'blink 1s linear infinite',
        'blink-250': 'blink 1s linear infinite 250ms',
        'blink-500': 'blink 1s linear infinite 500ms',
        'type': 'typeB .7s infinite steps(1), typeT calc(var(--n)*.025s) steps(var(--n)) forwards'
      }
    }
  },
  plugins: [],
}

