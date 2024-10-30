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

  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        flama: ['Flama', 'sans-serif'],
        flamablack: ['FlamaBlack', 'sans-serif'],
        helvetica: ['helvetica', 'sans-serif'],
      },
      letterSpacing: {
        '00': '0',
      },
      lineHeight: {
        'x1-57': '1.57',
      },
      colors: {
        minovaGold: '#FAB90A',
        minovaGoldClicked: 'rgba(250, 185, 10, 0.7)',
      },
      borderRadius: {
        button: '25px',
      },
      screens: {
        '3xl': '2100px',
        '2xl': '1440px',
        xl: '1140px',
        lg: '960px',
        md: '720px',
        sm: '540px',
      },
      safelist: ['sm:text-xl', 'text-4xl', 'sm:text-6xl', 'text-7xl', 'bg-blue-500', 'sm:bg-red-500'],
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
