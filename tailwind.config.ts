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
        sans: ['var(--font-sofia)', 'Arial', 'sans-serif'],
      },
      colors: {
        forest: '#1B4332',
        'forest-dark': '#142E23',
        sage: '#52796F',
        'sage-light': '#84A98C',
        olive: '#2D4A35',
        moss: '#40916C',
        canvas: '#F8F5F0',
        lifted: '#FDFCFA',
        bone: '#EDE8E0',
        'dark-footer': '#1B2E20',
        ink: '#1A1A18',
        charcoal: '#2C2C2A',
        slate: '#6B7B6F',
        dust: '#A8B5AB',
        amber: '#C8651A',
        'amber-light': '#E8894A',
        whatsapp: '#25D366',
      },
      borderRadius: {
        btn: '20px',
        card: '24px',
        xl2: '40px',
      },
      boxShadow: {
        card: '0px 24px 48px 0px rgba(0,0,0,0.10)',
        nav: '0px 4px 24px 0px rgba(0,0,0,0.06)',
        'nav-scrolled': '0px 8px 32px 0px rgba(0,0,0,0.12)',
        hero: '0px 48px 80px 0px rgba(0,0,0,0.22)',
        wa: '0px 8px 32px 0px rgba(37,211,102,0.4)',
      },
      letterSpacing: {
        tight: '-0.02em',
        eyebrow: '0.07em',
        button: '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
