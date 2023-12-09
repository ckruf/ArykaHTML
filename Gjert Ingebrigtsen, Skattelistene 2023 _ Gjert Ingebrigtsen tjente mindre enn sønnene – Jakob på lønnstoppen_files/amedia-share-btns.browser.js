/* eslint-env browser */

let windowObjectReference = null;

function soMEpopup(network, shareUrl) {
  if (windowObjectReference == null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
        or if such pointer exists but the window was closed */
    const viewportWidth = window.innerWidth;
    const popupWidth = 500;

    let networks = {
      facebook: { width: 'auto', height: 'auto', top: 0, left: 0 },
      twitter: { width: 'auto', height: 'auto', top: 0, left: 0 },
    };

    if (viewportWidth > 600) {
      networks = {
        facebook: {
          width: 500,
          height: 450,
          top: 0,
          left: viewportWidth / 2 - popupWidth / 2,
        },
        twitter: {
          width: 500,
          height: 300,
          top: 0,
          left: viewportWidth / 2 - popupWidth / 2,
        },
      };
    }

    windowObjectReference = window.open(
      shareUrl,
      'soMeWindow',
      `resizable, scrollbars, status,
            height = ${networks[network].height},
            width = ${networks[network].width},
            top = ${networks[network].top},
            left = ${networks[network].left}`
    );
    /* then create it. The new window will be created and
        will be brought on top of any other window. */
  } else {
    windowObjectReference.focus();
    /* else the window reference must exist and the window
        is not closed; therefore, we can bring it back on top of any other
        window with the focus() method. There would be no need to re-create
        the window or to reload the referenced resource. */
  }
}

function createButton({
  shareUrl,
  network,
  label,
  icon,
  iconAlt,
  srText,
  lpTag,
  attributes = [],
}) {
  const li = document.createElement('li');
  li.classList.add(`share-${network}-btn`);
  const button = document.createElement('button');
  button.classList.add(lpTag);
  button.insertAdjacentHTML(
    'afterbegin',
    `<img aria-hidden="true" src="https://r.acdn.no/article/nettavisen/share-icon-${icon}.svg" alt="${iconAlt}">
            ${label}        
            <span class="sr-only">${srText}</span>`
  );
  button.addEventListener('click', () => soMEpopup(network, shareUrl));
  li.appendChild(button);
  if (attributes) {
    attributes.forEach((attribute) => {
      button.setAttribute(attribute.key, attribute.value);
    });
  }

  return li;
}

class Share extends HTMLElement {
  init() {
    if (this.constructed) {
      return;
    }
    this.constructed = true;
    const id = this.getAttribute('acpid');
    if (id === null) {
      return;
    }
    const title = this.getAttribute('title') || '';
    const publication =
      this.getAttribute('publication') || window.location.host;

    const shareBtn = document.createElement('button');
    const shareBtnImg = document.createElement('img');
    shareBtnImg.setAttribute('aria-hidden', 'true');
    shareBtnImg.setAttribute(
      'src',
      'https://r.acdn.no/article/nettavisen/share-btn.svg'
    );
    shareBtnImg.setAttribute('alt', 'Åpne deleknapper for artikkelen');
    shareBtnImg.setAttribute('data-adp-clickLabel', 'share_article_button');
    shareBtnImg.setAttribute('data-adp-clickValue', 'expand');
    shareBtn.classList.add('share-btn');
    shareBtn.classList.add('lp_share_article');
    shareBtn.appendChild(shareBtnImg);
    shareBtn.insertAdjacentHTML(
      'beforeend',
      '<span id="sr-open-close-txt" class="sr-only">Åpne deleknapper for artikkelen</span>'
    );

    const shareBtns = document.createElement('ul');
    shareBtns.setAttribute('aria-expanded', 'false');
    shareBtns.classList.add('share-btns');

    shareBtn.addEventListener('click', () => {
      // a11y
      if (shareBtns.getAttribute('aria-expanded') === 'false') {
        shareBtns.setAttribute('aria-expanded', 'true');
        shareBtnImg.setAttribute('data-adp-clickValue', 'close');
      } else {
        shareBtns.setAttribute('aria-expanded', 'false');
        shareBtnImg.setAttribute('data-adp-clickValue', 'expand');
      }

      // Animate open/close share buttons
      shareBtn.classList.toggle('active-share-btn');
      shareBtns.classList.toggle('active-share-btns');

      // Get screen reader text container
      const srOpenClose = document.getElementById('sr-open-close-txt');

      // Change button and alt text
      if (shareBtns.classList.contains('active-share-btns')) {
        shareBtnImg.setAttribute(
          'src',
          'https://r.acdn.no/article/nettavisen/share-close.svg'
        );
        shareBtnImg.setAttribute('alt', 'Lukk deleknapper for artikkelen');
        srOpenClose.innerText = 'Lukk deleknapper for artikkelen';
      } else {
        shareBtnImg.setAttribute(
          'src',
          'https://r.acdn.no/article/nettavisen/share-btn.svg'
        );
        shareBtnImg.setAttribute('alt', 'Åpne deleknapper for artikkelen');
        srOpenClose.innerText = 'Åpne deleknapper for artikkelen';
      }
    });

    shareBtns.appendChild(
      createButton({
        shareUrl: `https://www.facebook.com/sharer.php?u=https://${publication}/${id}&title=${title}`,
        network: 'facebook',
        label: 'Facebook',
        icon: 'fb',
        iconAlt: 'Facebook-ikon',
        srText: 'Del på Facebook',
        lpTag: 'lp_facebook_share',
        attributes: [
          { key: 'data-adp-clickLabel', value: 'share_article_button' },
          { key: 'data-adp-clickValue', value: 'share_to_facebook' },
        ],
      })
    );
    shareBtns.appendChild(
      createButton({
        shareUrl: `https://twitter.com/share?text=${title}&url=https://${publication}/${id}`,
        network: 'twitter',
        label: 'Twitter',
        icon: 'twitter',
        iconAlt: 'Twitter-ikon',
        srText: 'Del på Twitter',
        lpTag: 'lp_twitter_share',
        attributes: [
          { key: 'data-adp-clickLabel', value: 'share_article_button' },
          { key: 'data-adp-clickValue', value: 'share_to_twitter' },
        ],
      })
    );
    shareBtns.insertAdjacentHTML(
      'beforeend',
      `<li class="share-email-link-btn">
                <a href="mailto:?subject=${title}&body=https://${publication}/${id}" class="lp_email_share" data-adp-clicklabel="share_article_button" data-adp-clickValue="share_to_email">
                <img aria-hidden="true" src="https://r.acdn.no/article/nettavisen/share-icon-copy-link.svg" alt="Ikon av en lenke">
                Epost
                <span class="sr-only">Send lenke til artikkelen på epost</>
                </a>
            </li>`
    );
    this.appendChild(shareBtn);
    this.appendChild(shareBtns);
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
  customElements.define('amedia-share', Share);
} else {
  document.registerElement('amedia-share', { prototype: Share.prototype });
}
