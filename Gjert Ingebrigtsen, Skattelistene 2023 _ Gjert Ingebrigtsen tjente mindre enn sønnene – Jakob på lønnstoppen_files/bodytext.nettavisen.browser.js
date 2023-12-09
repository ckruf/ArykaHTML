const tableScrollElements =
  document.querySelectorAll('.amedia-table-wrapper') || [];

tableScrollElements.forEach((tableScrollElement) => {
  const hasOverflow =
    tableScrollElement.scrollWidth > tableScrollElement.clientWidth;

  if (tableScrollElements.length && hasOverflow) {
    let mouseX = 0;
    tableScrollElement.style.cursor = 'grab';

    tableScrollElement.addEventListener('mousedown', function (e) {
      this.scrollX = this.scrollLeft;
      mouseX = e.pageX - this.offsetLeft;
      this.style.cursor = 'grabbing';

      this.addEventListener('mousemove', mouseMoveFunction);
    });

    tableScrollElement.addEventListener('mouseup', function () {
      this.removeEventListener('mousemove', mouseMoveFunction);
      mouseX = 0;
      this.style.cursor = 'grab';
    });

    // FIXME: This was intentional for whatever reason. Requires further investigation.
    // eslint-disable-next-line no-inner-declarations
    function mouseMoveFunction(e) {
      const mouseX2 = e.pageX - this.offsetLeft;
      if (mouseX) this.scrollLeft = this.scrollX + mouseX - mouseX2;
    }
  }
});
