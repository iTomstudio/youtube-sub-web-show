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
        'primary': '#3b82f6',
        'secondary': '#8b5cf6',
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
