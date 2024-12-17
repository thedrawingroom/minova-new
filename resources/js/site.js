// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Component files
import sliders from './includes/sliders';
import letters from './includes/letters';
import global from './includes/global';
import crossSection from './includes/crossSection';
import nav from './includes/nav';
import carousel from './includes/carousel';

// Alpine
window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

// Components init
window.addEventListener('DOMContentLoaded', () => {
  sliders.init();
  letters.init();
  crossSection.init();
  nav.init();
  global.init();
  carousel.init();
});
