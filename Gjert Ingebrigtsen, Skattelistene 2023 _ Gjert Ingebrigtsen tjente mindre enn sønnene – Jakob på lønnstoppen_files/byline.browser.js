/* eslint-env browser */
window.addEventListener('DOMContentLoaded', () => {
  const modfiedDateButton = document.getElementById('toggle-modified');
  if (modfiedDateButton) {
    modfiedDateButton.addEventListener('click', () => {
      const publicationPublished = document.getElementById(
        'publication-published'
      );
      publicationPublished.classList.toggle('is-expanded');
    });
  }
});
