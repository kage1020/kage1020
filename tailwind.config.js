/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 5s steps(18), cursor 1.5s steps(1) 5s infinite',
      },
      boxShadow: {
        '-inner': 'inset 0 -2px 4px 0 rgb(0 0 0 / 0.05)',
        ball: 'box-shadow: -20px -10px 50px 5px rgba(0, 0, 0, .5) inset;',
      },
      fontFamily: {
        noto: [
          'Noto Sans JP',
          'Helvetica Neue',
          'Helvetica',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Arial',
          'Yu Gothic',
          'Meiryo',
          'sans-serif',
        ],
        roboto: [
          'Roboto Mono',
          'Helvetica Neue',
          'Helvetica',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Arial',
          'Yu Gothic',
          'Meiryo',
          'sans-serif',
        ],
      },
      keyframes: {
        typewriter: {
          from: { width: 0 },
        },
        cursor: {
          '50%': { borderRightColor: 'transparent' }
        }
      },
    },
  },
  plugins: [],
};
