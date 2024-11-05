// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Component files
import sliders from './components/sliders';
import letters from './components/letters';

// Alpine
window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

// Components init
window.addEventListener('DOMContentLoaded', () => {
  sliders.init();
  letters.init();
});
