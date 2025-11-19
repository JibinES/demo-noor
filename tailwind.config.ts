import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        emerald: {
          DEFAULT: '#047857',
          dark: '#065F46',
          light: '#10B981',
        },
        teal: {
          deep: '#115E59',
        },
        // Accent Colors
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F7E7CE',
          rose: '#B76E79',
        },
        // Supporting Colors
        burgundy: {
          DEFAULT: '#7F1D1D',
          dark: '#991B1B',
        },
        // Neutrals
        cream: {
          DEFAULT: '#FAF9F6',
          dark: '#F5F3EE',
        },
        charcoal: '#262626',
        // Functional Colors
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2' }],
        'hero-mobile': ['2rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'elegant': '0 4px 16px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
