'use strict';
//https://www.youtube.com/watch?v=1yS-JV4fWqY

const selectionButtons = document.querySelectorAll('[data-selection]');

selectionButtons.forEach(selectionButtons => {
  selectionButtons.addEventListener('click', e => {
    const slectionName = selectionButtons.dataset.selection;
    makeSelection(selectionButtons);
  });
});
