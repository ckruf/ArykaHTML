/* eslint-env browser */

class AmediaScrollytellingEmbed extends HTMLElement {
  init() {
    if (this.isInit) {
      return;
    }
    this.contentClass = this.getAttribute('contentClass');
    this.contentBgGray = this.getAttribute('contentBgGray');
    this.contentBgBlack = this.getAttribute('contentBgBlack');
    this.contentTextClass = this.getAttribute('contentTextClass');
    this.titleClass = this.getAttribute('titleClass');

    this.colorSchemes = {
      gray: this.contentBgGray,
      black: this.contentBgBlack,
      white: this.contentBgWhite,
    };

    this.isInit = true;

    const smartEmbedUrl = this.getAttribute('smartEmbedUrl');
    const embedHtml = `
            <amedia-include manifest="https://services.api.no/api/mnemonic/v1/manifest/${smartEmbedUrl}"></amedia-include>
        `;

    this.insertAdjacentHTML('afterbegin', embedHtml);
    this.addEventListener('embedProgress', this.parseProgress);
    this.addEventListener('configIsLoaded', this.applyEmbedConfig);
  }

  attachedCallback() {
    this.init();
  }

  connectedCallback() {
    this.init();
  }

  applyEmbedConfig(e) {
    this.activeKeyframe = 0;
    this.embedConfig = e.detail?.data;

    const config = this.embedConfig?.scrollytellingConfig;

    if (this.embedConfig?.scrollytellingConfig?.frames) {
      const acpId = this.id.split('media-')[1];

      const textWrapper = this.parentElement.parentElement.querySelector(
        `div[data-scrollytelling-media='${acpId}']`
      );

      const { frames } = this.embedConfig?.scrollytellingConfig || 0;

      for (var i = 0; i < frames; i++) {
        const textBlock = document.createElement('div');
        const textElements = config.keyframes?.filter(
          (frame) =>
            frame.sortorder === i &&
            (frame.content?.title || frame.content?.text)
        );

        const firstColor =
          textElements.find((element) => element?.color)?.color || 'gray';

        textBlock.className = `content text ${firstColor} ${this.contentClass}`;

        if (textElements.length) {
          for (const textEl of textElements) {
            const colorScheme = textEl.color ? textEl.color : 'gray';
            const contentBackground = document.createElement('div');
            contentBackground.className = `content-background ${this.colorSchemes[colorScheme]}`; // '${this.contentBgBlack} '

            const title = document.createElement('h3');
            title.className = `content-title ${this.titleClass}`;
            title.innerText = textEl.content.title;

            const contentText = document.createElement('p');
            contentText.className = `content-text ${this.contentTextClass}`;
            contentText.innerText = textEl.content.text;

            contentBackground.appendChild(title);
            contentBackground.appendChild(contentText);
            textBlock.appendChild(contentBackground);
          }
        }
        textWrapper.appendChild(textBlock);
      }
    }
  }
}

if (customElements && customElements.define) {
  customElements.define(
    'amedia-scrollytelling-embed',
    AmediaScrollytellingEmbed
  );
} else {
  /** @type { any } */ (document).registerElement(
    'amedia-scrollytelling-embed',
    {
      prototype: AmediaScrollytellingEmbed.prototype,
    }
  );
}
