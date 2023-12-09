/* eslint-env browser */
class BylineDescription extends HTMLElement {
  init() {
    this.constructed = true;
    this.style.display = 'table';
    const minimizedElementContent = this.textContent;
    const viewportWidth = document.documentElement.clientWidth;
    let cutoffNumber;
    switch (true) {
      case viewportWidth <= 340:
        cutoffNumber = 65;
        break;
      case viewportWidth <= 360:
        cutoffNumber = 72;
        break;
      case viewportWidth <= 380:
        cutoffNumber = 78;
        break;
      case viewportWidth <= 390:
        cutoffNumber = 82;
        break;
      case viewportWidth <= 420:
        cutoffNumber = 95;
        break;
      case viewportWidth <= 520:
        cutoffNumber = 100;
        break;
      case viewportWidth <= 540:
        cutoffNumber = 135;
        break;
      case viewportWidth > 540:
        cutoffNumber = 140;
        break;
      default:
        cutoffNumber = 140;
        break;
    }

    const moreAuthorInfo = document.createElement('button');
    moreAuthorInfo.classList.add('more-author-info');
    moreAuthorInfo.insertAdjacentHTML(
      'afterbegin',
      '<img src="https://r.acdn.no/article/nettavisen/ellipsis.svg" alt="Vis mer informasjon">'
    );

    const lessAuthorInfo = document.createElement('button');
    lessAuthorInfo.classList.add('less-author-info');
    lessAuthorInfo.insertAdjacentHTML(
      'afterbegin',
      '<img src="https://r.acdn.no/article/nettavisen/ellipsis_less.svg" alt="Vis mindre informasjon">'
    );

    const firstText = minimizedElementContent.slice(0, cutoffNumber);
    const lastText = document.createElement('span');
    lastText.style.display = 'none';
    lastText.textContent = minimizedElementContent.slice(cutoffNumber);

    moreAuthorInfo.addEventListener('click', () => {
      moreAuthorInfo.style = 'display: none';
      moreAuthorInfo.nextSibling.style.display = 'inline-block';
    });

    lessAuthorInfo.addEventListener('click', () => {
      lessAuthorInfo.parentElement.style.display = 'none';
      moreAuthorInfo.style.display = 'inline-block';
    });

    this.innerHTML = '';
    this.textContent = firstText;
    this.appendChild(moreAuthorInfo);
    this.appendChild(lastText);
    lastText.appendChild(lessAuthorInfo);
  }

  connectedCallback() {
    if (this.constructed) {
      return;
    }
    // Use a timeout to ensure children are inserted into DOM
    setTimeout(() => this.init(), 15);
  }

  attachedCallback() {
    if (this.constructed) {
      return;
    }
    setTimeout(() => this.init(), 15);
  }
}

if (customElements && customElements.define) {
  customElements.define('amedia-byline-description', BylineDescription);
} else {
  document.registerElement('amedia-byline-description', {
    prototype: BylineDescription.prototype,
  });
}
