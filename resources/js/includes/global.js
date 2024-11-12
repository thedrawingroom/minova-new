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

    $('.toggle-search').on('click', () => {
      $('#search-form').toggleClass('active');
    });
  },
};
