/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
        },
        secondary: {
          DEFAULT: '#834cbc',
          dark: '#7545a7',
          light: '#b48ead',
          50: '#f5f0fa',
          100: '#ebe0f5',
          200: '#d4bfeb',
          900: '#3d1f5c',
        },
        accent: {
          pink: '#e879a8',
          warm: '#c97bb2',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Nunito', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
