import { computePosition, autoUpdate } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

export default {
  init() {
    const buttons = document.querySelectorAll('[aria-describedby="tooltip"]');
    const tooltips = document.querySelectorAll('[role="tooltip"]');

    buttons.forEach((button, index) => {
      const tooltip = tooltips[index];

      function updateTooltipPosition() {
        computePosition(button, tooltip, {
          placement: 'top-start',
        }).then(({ x, y }) => {
          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }

      button.addEventListener('mouseenter', () => {
        tooltip.classList.remove('hidden');
        tooltip.classList.add('show');
        updateTooltipPosition();

        autoUpdate(button, tooltip, updateTooltipPosition);
      });

      button.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
        tooltip.classList.add('hidden');
      });

      button.addEventListener('focus', () => {
        tooltip.classList.remove('hidden');
        tooltip.classList.add('show');
        updateTooltipPosition();
        autoUpdate(button, tooltip, updateTooltipPosition);
      });

      button.addEventListener('blur', () => {
        tooltip.classList.remove('show');
        tooltip.classList.add('hidden');
      });
    });
  },
};
