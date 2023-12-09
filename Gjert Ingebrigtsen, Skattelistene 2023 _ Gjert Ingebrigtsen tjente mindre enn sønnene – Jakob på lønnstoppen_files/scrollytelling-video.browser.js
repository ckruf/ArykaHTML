/* eslint-env browser */

class AmediaScrollytellingVideo extends HTMLElement {
  init() {
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    const videoId = this.getAttribute('videoId');
    const videoClass = this.getAttribute('videoClass');

    const src = `https://lw-amedia-cf.lwcdn.com/v-${videoId}_high.mp4`;
    const poster = `https://lw-amedia-cf.lwcdn.com/i/v-i-${videoId}-1.jpg`;

    const videoHtml = `
            <video class="video ${videoClass}" playsinline muted loop preload="metadata" preload="auto" poster="${poster}">
                <source src="${src}" type="video/mp4">
            </video>
        `;

    this.insertAdjacentHTML('afterbegin', videoHtml);
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
    'amedia-scrollytelling-video',
    AmediaScrollytellingVideo
  );
} else {
  /** @type { any } */ (document).registerElement(
    'amedia-scrollytelling-video',
    {
      prototype: AmediaScrollytellingVideo.prototype,
    }
  );
}
