export default {
  init() {
    const addTopBlockPadding = () => {
      $('body main > div:first-of-type').css({ paddingTop: $('#site-header').height() });
    };

    addTopBlockPadding();

    window.addEventListener('resize', () => {
      addTopBlockPadding();
    });

    $('.offcanvas-toggle').on('click', () => {
      $('body').toggleClass('offcanvas-open');
    });

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
  },
};
