import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black': '#151619',
        'dark_charcoal': '#1D1F22',
        'slate_gray': '#2B2D31',
        'steel_blue': '#35393F',
        'graphite_gray': '#5A6069',
        'dove_gray': '#7C8187',
        'light_gray': '#C1C4CB',
        'light_silver': '#E4E4E4',
        'white_smoke': '#F5F5F5',
        'white': '#FFFFFF',
        'coral': '#E46643',
        'apricot': '#F39765',
      }
    },
  },
  plugins: [],
}
export default config
