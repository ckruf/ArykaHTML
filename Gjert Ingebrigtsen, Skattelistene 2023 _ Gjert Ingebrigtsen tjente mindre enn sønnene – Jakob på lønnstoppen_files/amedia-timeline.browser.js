class AmediaTimeline extends HTMLElement {
  init() {
    this.initialized = true;

    if (this.getAttribute('collapsed') === 'true') {
      const btn = document.createElement('button');
      btn.classList.add('expand');
      btn.textContent = this.nn ? 'Sjå meir' : 'Se mer';
      btn.addEventListener('click', () => this.toggle());
      const btnContainer = this.querySelector('.button-container');
      if (btnContainer) {
        btnContainer.appendChild(btn);
      }
    }
  }

  toggle() {
    const isOpen = this.getAttribute('aria-expanded') === 'true'; // default: false
    const wrapper = this.querySelector('.wrapper');
    const btnText = this.querySelector('.expand');
    if (isOpen) {
      wrapper.style.height = '';
      btnText.innerHTML = this.nn ? 'Sjå meir' : 'Se mer';
    } else {
      wrapper.style.height = `${
        this.querySelector('.content').scrollHeight + 70
      }px`;
      btnText.innerHTML = this.nn ? 'Sjå mindre' : 'Se mindre';
    }
    this.setExpanded(isOpen);
  }

  setExpanded(isOpen) {
    this.setAttribute('aria-expanded', (!isOpen).toString());
  }

  connectedCallback() {
    if (this.initialized) {
      return;
    }
    this.nn = this.getAttribute('data-locale') === 'nn_NO';
    this.init();
  }

  attachedCallback() {
    if (this.initialized) {
      return;
    }
    this.nn = this.getAttribute('data-locale') === 'nn_NO';
    this.init();
  }
}

if (customElements && customElements.define) {
  customElements.define('amedia-timeline', AmediaTimeline);
} else {
  // document.registerElement is deprecated
  document.registerElement('amedia-timeline', {
    prototype: AmediaTimeline.prototype,
  });
}
