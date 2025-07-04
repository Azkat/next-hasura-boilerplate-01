module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        accentYellow: '#FFF133',
        baseNav: '#121317',
        baseBody: '#121317',
        backgroundGray: '#16181D',
        backgroundPlayer: '#2F3234',
        border: '#2c2c2c',
        borderLow: '#1c1c1c',
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
  plugins: [require('daisyui'), require('flowbite/plugin')],
  important: true,
}
