// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan everything in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
