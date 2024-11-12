export default {
  init() {
    // Add padding to top block based on header height
    const addTopBlockPadding = () => {
      $('body main > div:first-of-type').css({ paddingTop: $('#site-header').height() });
    };
    addTopBlockPadding();

    window.addEventListener('resize', () => {
      addTopBlockPadding();
    });

    // Offcanvas toggle functionality
    $('.offcanvas-toggle').on('click', () => {
      $('body').toggleClass('offcanvas-open');
    });

    // Region selector logic
    const initRegionSelector = () => {
      const regionSelector = document.getElementById('region-selector');
      if (!regionSelector) return;

      const currentPath = window.location.pathname;
      if (currentPath.includes('/americas')) {
        regionSelector.value = 'americas';
      } else if (currentPath.includes('/emea-cis')) {
        regionSelector.value = 'emea-cis';
      } else if (currentPath.includes('/apac')) {
        regionSelector.value = 'apac';
      }

      regionSelector.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        const redirectUrl = selectedOption.getAttribute('data-url');
        window.location.href = redirectUrl;
      });
    };

    initRegionSelector();

    // Contact form
    const contactToggle = document.getElementById('contact-toggle');
    const contactContainer = document.getElementById('contact-container');

    if (contactToggle && contactContainer) {
      contactToggle.addEventListener('click', () => {
        contactContainer.classList.toggle('translate-y-full');
      });
    }

    const termsCheckbox = document.getElementById('contact-terms');
    const submitButton = document.getElementById('submit-button');

    const toggleSubmitButton = () => {
      if (submitButton) {
        submitButton.disabled = !termsCheckbox.checked;
      }
    };

    if (termsCheckbox) {
      termsCheckbox.addEventListener('click', toggleSubmitButton);
    }
  },
};
