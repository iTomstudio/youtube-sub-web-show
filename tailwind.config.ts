import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5E6',
          100: '#FFE5CC',
          200: '#FFCC99',
          300: '#FFB266',
          400: '#FF9933',
          500: '#FF8C00',
          600: '#E67E00',
          700: '#CC7000',
          800: '#B36300',
          900: '#995500',
        },
        'primary-dark': {
          50: '#4D3319',
          100: '#664419',
          200: '#996633',
          300: '#CC884D',
          400: '#FFA566',
          500: '#FFB380',
          600: '#FFC199',
          700: '#FFD0B3',
          800: '#FFDECC',
          900: '#FFEDE6',
        },
      },
      screens: {
        'mobile': '640px',
        'tablet': '768px',
        'desktop': '1024px',
      }
    },
  },
  plugins: [],
}

export default config
