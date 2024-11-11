function toggleOffCanvasSearch() {
  const searchForm = document.getElementById('offCanvasSearchForm');
  if (searchForm.classList.contains('active')) {
    searchForm.classList.remove('active');
  } else {
    searchForm.classList.add('active');
  }
}

window.toggleOffCanvasSearch = toggleOffCanvasSearch;

export default {
  init() {},
};
