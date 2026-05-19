import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(0 0% 14.9%)',
        input: 'hsl(0 0% 14.9%)',
        ring: 'hsl(0 0% 83.1%)',
        background: 'hsl(0 0% 3.9%)',
        foreground: 'hsl(0 0% 98%)',
        primary: {
          DEFAULT: 'hsl(0 0% 98%)',
          foreground: 'hsl(0 0% 9%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 63.9%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}
export default config
