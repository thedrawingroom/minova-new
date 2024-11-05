// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Component files
import sliders from './includes/sliders';
import letters from './includes/letters';
import global from './includes/global';

// Alpine
window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

// Components init
window.addEventListener('DOMContentLoaded', () => {
  sliders.init();
  letters.init();
  global.init();
});
