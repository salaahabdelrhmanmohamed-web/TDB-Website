import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1F3D2B',
          600: '#162D20',
          700: '#0F2218',
        },
        cream: '#F3EDE0',
        surface: {
          DEFAULT: '#FBF8F0',
          hover: '#F7F2E6',
        },
        stone: '#E4DCC8',
        rule: '#D9D1BE',
        muted: '#5B574E',
        brick: '#9B3B2A',
        // Dark mode reference tokens (documented, not built in Phase 3)
        'dark-bg': '#14231A',
        'dark-ink': '#EDE7D8',
        'dark-muted': '#A9B3A8',
        'dark-rule': '#2D4437',
      },
      fontFamily: {
        serif: [
          "'Cormorant Garamond'",
          "'Times New Roman'",
          'Georgia',
          'serif',
        ],
        sans: [
          "'Jost'",
          "'Century Gothic'",
          "'Avenir Next'",
          "'Helvetica Neue'",
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
        '16': '64px',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      boxShadow: {
        // The one significant shadow permitted in the system
        dropdown: '0 8px 24px rgba(31,61,43,0.10)',
        none: 'none',
      },
      maxWidth: {
        main: '1280px',
        'product-grid': '1200px',
        reading: '720px',
      },
      screens: {
        sm: '640px',
        md: '1024px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;

