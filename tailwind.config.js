module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accentYellow: '#FFF133',
      },
    },
  },
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#44ADEE',
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
}
