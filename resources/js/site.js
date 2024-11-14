// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Component files
import sliders from './includes/sliders';
import letters from './includes/letters';
import global from './includes/global';
import crossSection from './includes/crossSection';

import { computePosition } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

// Alpine
window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

// Components init
window.addEventListener('DOMContentLoaded', () => {
  sliders.init();
  letters.init();
  crossSection.init();
  global.init();

  const button = document.querySelector('#parent-4');
  const tooltip = document.querySelector('#child-4');

  console.log(button);
  console.log(tooltip);

  computePosition(button, tooltip, {
    placement: 'bottom-start',
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
});
