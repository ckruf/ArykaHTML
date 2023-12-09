/* eslint-env browser */

const getArrowBackground = (cueColor) => {
  const cssVars = {
    customOne: `var(--custom-background-color-one, #ffffff)`,
    customTwo: `var(--custom-background-color-two, #ffffff)`,
    default: `var(--swatchHighlights-${cueColor}, #ffffff)`,
  };
  return cssVars[cueColor] || cssVars.default;
};

const useWhiteArrow = (cueColor) =>
  [
    'black',
    'grayDark',
    'purple',
    'blue',
    'green',
    'greenLight',
    'cinnamon',
    'yellow',
    'redDark',
    'red',
    'brown',
  ].includes(cueColor);

class AmediaFactbox extends HTMLElement {
  constructor() {
    super();
    this.expandFactbox = this.expandFactbox.bind(this);
    this.collapseFactbox = this.collapseFactbox.bind(this);
    this.loadedImages = this.loadedImages.bind(this);
    this.expandOnLoad = this.expandOnLoad.bind(this);
    this.config = { childList: true, subtree: true };
    this.observer = new MutationObserver((nodes) => {
      nodes.forEach(this.loadedImages);
    });
  }

  loadedImages(mutation) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(this.expandOnLoad);
    }
  }

  expandOnLoad(n) {
    if (n.src) {
      n.addEventListener('load', () => {
        this.element.style.height = `${this.sectionHeight}px`; // We recalculate the height after lazyloaded image has loaded
      });
    }
  }

  collapseFactbox() {
    this.element.style.height = '';
    this.observer.disconnect();
  }

  expandFactbox() {
    this.element.style.height = `${this.sectionHeight}px`;
    this.observer.observe(this.element, this.config);
  }

  get sectionHeight() {
    function parsePixelToInt(value) {
      return value ? parseInt(value.replace('px', ''), 10) : 0;
    }
    const { paddingBottom = '0px', paddingTop = '0px' } =
      window.getComputedStyle(this.element);

    return (
      this.element.querySelector('.content').scrollHeight +
      parsePixelToInt(paddingBottom) +
      parsePixelToInt(paddingTop) +
      28
    );
  }

  init() {
    const cssVar = getArrowBackground(this.cueColor);
    const collapsed = this.getAttribute('collapsed') === 'true';
    const collapsedButton = `<button aria-expanded="${!collapsed}" aria-label="Ekspander eller minimer faktaboksen." class="expand-button lp_factbox-expand">
                <svg aria-hidden="true" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow" tabindex="-1" style="background: #ffffff;background: ${cssVar};">
                    <path d="M17.4697 23.5303C17.7626 23.8232 18.2374 23.8232 18.5303 23.5303L23.3033 18.7574C23.5962 18.4645 23.5962 17.9896 23.3033 17.6967C23.0104 17.4038 22.5355 17.4038 22.2426 17.6967L18 21.9393L13.7574 17.6967C13.4645 17.4038 12.9896 17.4038 12.6967 17.6967C12.4038 17.9896 12.4038 18.4645 12.6967 18.7574L17.4697 23.5303ZM17.25 10L17.25 23L18.75 23L18.75 10L17.25 10Z" fill="${
                      useWhiteArrow(this.cueColor) && this.cueColor
                        ? '#ffffff'
                        : '#292827'
                    }" />
                </svg>
            </button>`;
    if (this.getAttribute('collapsed') === 'true') {
      this.insertAdjacentHTML('afterbegin', collapsedButton);
      this.querySelector('.expand-button').addEventListener('click', () =>
        this.toggle()
      );
    }
  }

  disableFocusInsideDiv() {
    const focusableElements = 'a, button, input, select, textarea';
    const focusables = this.bodyContent.querySelectorAll(focusableElements);

    this.bodyContent.setAttribute('aria-hidden', 'true');

    focusables.forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });
  }

  enableFocusInsideDiv() {
    const focusableElements = 'a, button, input, select, textarea';
    const focusables = this.bodyContent.querySelectorAll(focusableElements);

    this.bodyContent.removeAttribute('aria-hidden');

    focusables.forEach((element) => {
      element.removeAttribute('tabindex');
    });
  }

  toggle() {
    const isOpen =
      this.querySelector('.expand-button').getAttribute('aria-expanded') ===
      'true';

    if (isOpen) {
      this.collapseFactbox(this.innerContent);
      this.disableFocusInsideDiv(this.innerContent);
    } else {
      this.expandFactbox(this.innerContent);
      this.enableFocusInsideDiv(this.innerContent);
    }
    this.querySelector('.expand-button').setAttribute(
      'aria-expanded',
      (!isOpen).toString()
    );
  }

  connectedCallback() {
    this.element = this.querySelector('.wrapper--collapsed');
    this.innerContent = this.querySelector('.wrapper--collapsed');
    this.cueColor = this.getAttribute('color'); // i.e. grayDark
    this.bodyContent = this.querySelector('.body');
    this.disableFocusInsideDiv(this.bodyContent);
    this.init();
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  attachedCallback() {
    if (this.initalized) {
      return;
    }
    this.init();
  }
}

if (customElements && customElements.define) {
  customElements.define('amedia-factbox', AmediaFactbox);
} else {
  document.registerElement('amedia-factbox', {
    prototype: AmediaFactbox.prototype,
  });
}
