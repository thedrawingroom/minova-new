// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Component files
import sliders from './components/sliders';

// Alpine
window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

// Sliders
sliders.init();
