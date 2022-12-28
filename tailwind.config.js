module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accentYellow: '#FFF133',
        baseNav: '#000',
        baseBody: '#151515',
        backgroundGray: '#1E1E1E',
        backgroundPlayer: '#2F3234',
        border: '#2c2c2c',
      },
      maxWidth: {
        main: '640px',
      },
      btn: {
        disabled: '#fff',
        gradient: '#fff',
      },
      width: {
        desktopPost: '576px',
      },
      height: {
        desktopPost: '576px',
      },
    },
  },
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {
          //primary: '#44ADEE',
          primary: '#FFF',
          secondary: '#0284c7',
          accent: '#E9498C',
          accent2: '#FFF133',
          neutral: '#1A1A1A',
          info: '#4AA8BF',
          success: '#81328F',
          warning: '#EF8234',
          error: '#EA4034',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
  important: true,
}
