/* eslint-env browser */

class AmediaScrollytellingImage extends HTMLElement {
  static get observedAttributes() {
    return ['class'];
  }

  init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    const srcset = this.getAttribute('srcset');
    const src = this.getAttribute('src');
    const alt = this.getAttribute('alt');
    const aoiAttr = this.getAttribute('aoi');
    // json is encoded as base64 to escape it. Decode with atob
    this.aoi = aoiAttr ? JSON.parse(window.atob(aoiAttr)) : null;
    this.height = parseInt(this.getAttribute('height') || '0', 10);
    this.width = parseInt(this.getAttribute('width') || '0', 10);
    this.pictureClass = this.getAttribute('pictureClass');

    const pictureHtml = `
            <picture class="${this.pictureClass}">
                <source media="(min-width: 30000px)" srcset="${srcset}" alt="${alt}">
                <img src="${src}" alt="${alt}">
            </picture>
        `;

    this.insertAdjacentHTML('afterbegin', pictureHtml);

    this.img = this.querySelector('img');
    this.setAOI();
    window.addEventListener('resize', () => this.setAOI());
    window.addEventListener('orientationchange', () => this.setAOI());
  }

  setAOI() {
    if (this.aoi === null) {
      return;
    }

    const { y, x, height, width } = this.aoi;
    const availableHeight = this.offsetHeight;
    const availableWidth = this.offsetWidth;

    const scale = Math.max(
      availableHeight / this.height,
      availableWidth / this.width
    );

    const imageWidth = Math.round(this.width * scale);
    const imageHeight = Math.round(this.height * scale);
    const aoiX = imageWidth * (x / 100);
    const aoiY = imageHeight * (y / 100);
    const aoiW = imageWidth * (width / 100);
    const aoiH = imageHeight * (height / 100);

    const aoiArea = aoiW * aoiH;
    const imageArea = imageWidth * imageHeight;

    const showFullImage = imageArea * 0.95 <= aoiArea;

    let yOffset = 0;
    let xOffset = 0;

    if (availableWidth === imageWidth) {
      const maxOffset = (imageHeight - availableHeight) * -1;
      const aoiOffset = -(aoiY + (aoiH - availableHeight) / 2);
      yOffset = Math.round(Math.min(0, Math.max(maxOffset, aoiOffset)));
    } else {
      const maxOffset = (imageWidth - availableWidth) * -1;
      const aoiOffset = -(aoiX + (aoiW - availableWidth) / 2);
      xOffset = Math.round(Math.min(0, Math.max(maxOffset, aoiOffset)));
    }

    const aoiStyle = `object-fit:fill;width:${imageWidth}px;height:${imageHeight}px;margin-left:${xOffset}px;margin-top:${yOffset}px;`;

    this.img.setAttribute(
      'style',
      showFullImage ? 'object-fit:contain' : aoiStyle
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue && newValue.indexOf('hidden') === -1) {
      this.setAOI();
    }
  }

  attachedCallback() {
    this.init();
  }

  connectedCallback() {
    this.init();
  }
}

if (customElements && customElements.define) {
  customElements.define(
    'amedia-scrollytelling-image',
    AmediaScrollytellingImage
  );
} else {
  /** @type { any } */ (document).registerElement(
    'amedia-scrollytelling-image',
    {
      prototype: AmediaScrollytellingImage.prototype,
    }
  );
}
