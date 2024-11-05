export default {
  init() {
    const addTopBlockPadding = () => {
      $('body main > div:first-of-type').css({ paddingTop: $('#site-header').height() });
    };

    addTopBlockPadding();

    window.addEventListener('resize', () => {
      addTopBlockPadding();
    });
  },
};
