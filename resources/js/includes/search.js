export default {
  init() {
    const searchForm = document.getElementById('searchForm');
    const normalNavItems = document.querySelectorAll('.normal-nav');
    const searchButton = document.querySelector('.search-button button');

    if (!searchForm || !searchButton) return;

    searchButton.addEventListener('click', () => {
      if (searchForm.classList.contains('active')) {
        searchForm.classList.remove('active');
        normalNavItems.forEach(item => {
          item.classList.remove('hidden');
        });
      } else {
        searchForm.classList.add('active');
        normalNavItems.forEach(item => {
          item.classList.add('hidden');
        });
      }
    });

    const closeButton = searchForm.querySelector('button[type="button"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        searchForm.classList.remove('active');
        normalNavItems.forEach(item => {
          item.classList.remove('hidden');
        });
      });
    }
  },
};
