import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
        'ar-one': ['"AR One Sans"', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        anton: ['var(--font-anton)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      colors: {
        coral: '#fc673f',
        frost: '#eef4f6',
        carbon: '#231f20',
        teal: '#114d43',
        lime: '#dff122',
        mauve: '#aca7a9',
      },
    },
  },
  plugins: [],
}
export default config
