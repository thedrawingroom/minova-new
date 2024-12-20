import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.antlers.html',
    './resources/**/*.antlers.php',
    './resources/**/*.blade.php',
    './resources/**/*.vue',
    './content/**/*.md',
    './resources/js/components/sliders.js',
    './resources/css/site.css',
  ],
  safelist: ['size-10', 'fill-minova-gold', 'rotate-180'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'flama-book': ['Flama Book', 'sans-serif'],
      },
      letterSpacing: {
        '00': '0',
      },
      lineHeight: {
        'x1-57': '1.57',
      },
      colors: {
        'minova-gold': '#FAB90A',
        'minova-blue': '#1D2B4C',
        'minova-grey': '#C8C8C8',
      },
      borderRadius: {
        button: '25px',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      },
      screens: {
        '3xl': '1536px',
        '2xl': '1440px',
        xl: '1140px',
        lg: '960px',
        md: '720px',
        sm: '540px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        'video-shallow' : '16 / 5',
      },
      rotate: {
        270: '270deg',
      },
    },
  },

  plugins: [typography],
};
