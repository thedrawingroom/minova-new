import { computePosition, flip, shift, autoPlacement } from '@floating-ui/dom';

export default {
  init() {
    const navParents = document.querySelectorAll('[id^="navParent-"]');

    navParents.forEach(navParent => {
      const navChildId = navParent.getAttribute('aria-describedby');
      const navChild = document.getElementById(navChildId);

      if (navChild) {
        const showDropdown = () => {
          navChild.style.display = 'block';
          computePosition(navParent, navChild, {
            placement: 'bottom-start',
            middleware: [flip(), shift({ padding: 5 })],
          }).then(({ x, y }) => {
            Object.assign(navChild.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
        };

        const hideDropdown = () => {
          navChild.style.display = 'none';
        };

        navParent.addEventListener('mouseenter', showDropdown);
        navParent.addEventListener('focusin', showDropdown);

        navParent.addEventListener('mouseleave', hideDropdown);
        navParent.addEventListener('focusout', hideDropdown);
      }
    });
  },
};
