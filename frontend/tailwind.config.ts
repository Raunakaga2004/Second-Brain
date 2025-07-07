import { type Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: '#26396f',
        secondary: '#7e95e1',
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
}
export default config
