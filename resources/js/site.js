// This is all you.
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';

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

document.addEventListener("alpine:init", function () {
  Alpine.data('cookieConsent', () => ({
    state: Alpine.$persist('unknown').as('cookieConsent'),

    init() {
      this.dispatchEvent()
    },

    dialogue: {
      ['x-show']() {
        return this.state == 'unknown'
      }
    },

    accept: {
      ['@click']() {
        this.state = 'accepted'

        this.dispatchEvent()
      }
    },

    decline: {
      ['@click']() {
        this.state = 'declined'

        this.dispatchEvent()
      }
    },

    dispatchEvent() {
      document.dispatchEvent(new CustomEvent('cookieConsent', {
        detail: this.state
      }))
    }

  }))
});
