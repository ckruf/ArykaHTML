let rng;
const win =
  typeof self !== 'undefined'
    ? self
    : typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : global;
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
const getRandomValues =
  (typeof crypto !== 'undefined' &&
    crypto.getRandomValues &&
    crypto.getRandomValues.bind(crypto)) ||
  (typeof win.msCrypto !== 'undefined' &&
    typeof win.msCrypto.getRandomValues === 'function' &&
    win.msCrypto.getRandomValues.bind(win.msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  const rnds8 = new Uint8Array(16);

  rng = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  const rnds = new Array(16);

  rng = function mathRNG() {
    for (let i = 0, r; i < 16; i += 1) {
      if ((i & 0x03) === 0) {
        r = Math.random() * 0x100000000;
      }
      rnds[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
    }

    return rnds;
  };
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  let i = offset || 0;
  const bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return [
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
  ].join('');
}

function uuid() {
  const rnds = rng();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  return bytesToUuid(rnds);
}

function throttle(fn) {
  let waiting = false;
  return (...args) => {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, 400);
    }
  };
}

/* global cookieStore */
function read(value) {
  const v = value[0] === '"' ? value.slice(1, -1) : value;
  return v.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
}

function write(value) {
  return encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  );
}

const MILLISECONDS_IN_A_DAY = 864e5;

async function setCookie(name, value, attr) {
  if (typeof cookieStore !== 'undefined' && location.protocol === 'https:') {
    let expires;
    if (attr && attr.expires) {
      expires =
        attr.expires instanceof Date
          ? attr.expires.getTime()
          : Date.now() + attr.expires * MILLISECONDS_IN_A_DAY;
    }

    // CookieStore API only writes secure cookies (https://wicg.github.io/cookie-store/#secure-cookies)
    cookieStore.set({
      name,
      value,
      ...(attr.domain ? { domain: attr.domain } : {}),
      ...(attr.path ? { path: attr.path } : {}),
      ...(attr.sameSite ? { sameSite: attr.sameSite } : {}),
      expires,
    });
    return;
  }

  if (typeof document === 'undefined') {
    return;
  }

  const attributes = { path: '/', ...attr };

  if (typeof attributes.expires === 'number') {
    attributes.expires = new Date(
      Date.now() + attributes.expires * MILLISECONDS_IN_A_DAY
    );
  }
  if (attributes.expires) {
    attributes.expires = attributes.expires.toUTCString();
  }

  const encodedName = encodeURIComponent(name)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);

  let stringifiedAttributes = Object.keys(attributes).reduce(
    (result, attributeName) => {
      if (!attributes[attributeName]) {
        return result;
      }

      result += `; ${attributeName}`;

      if (attributes[attributeName] === true) {
        return result;
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      return `${result}=${attributes[attributeName].split(';')[0]}`;
    },
    ''
  );

  stringifiedAttributes += '; Secure';

  document.cookie = `${encodedName}=${write(value)}${stringifiedAttributes}`;
}

async function getCookie(name) {
  if (typeof cookieStore !== 'undefined') {
    // Since name may be encoded, we need to check for that too.
    return Promise.all([
      cookieStore.get(name),
      cookieStore.get(encodeURIComponent(name)),
    ])
      .then((values) => values.find((v) => !!v))
      .then((cookie) => cookie && cookie.value);
  }
  if (typeof document === 'undefined' || (arguments.length && !name)) {
    return undefined;
  }

  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all.
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const jar = {};
  cookies.some((element) => {
    const parts = element.split('=');
    const value = parts.slice(1).join('=');

    try {
      const found = decodeURIComponent(parts[0]);
      jar[found] = read(value);

      if (name === found) {
        return true;
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return false;
  });

  return name ? jar[name] : jar;
}

const domain = self.location.hostname.replace(/(.*\.)([^.]+\.\w+$)/, '$2');

async function generateUUID() {
  return uuid();
}

const storeVisitId = async (visitId) =>
  setCookie('amedia:visitid', visitId, {
    expires: new Date(Date.now() + 1800000), // 30 minutes
    domain,
    sameSite: 'lax',
  }).then(() => getCookie('amedia:visitid'));

async function createVisitId() {
  const ts = Date.now();
  const visitId = `${uuid()}|${ts}`;
  return storeVisitId(visitId);
}

async function refreshVisitId() {
  let visitId = await getCookie('amedia:visitid');
  if (!visitId) {
    visitId = await createVisitId();
  }
  if (!visitId) {
    return null;
  }
  const [id, ts] = visitId.split('|');
  if (!id || (ts && Date.now() - 1.8e6 > ts)) {
    return createVisitId();
  }
  return storeVisitId(`${id}|${Date.now()}`);
}

if (typeof window !== 'undefined') {
  // Events considered to indicate that a user is engaged with browsing the webpage
  [
    'mousedown',
    'keydown',
    'mousemove',
    'focus',
    'scroll',
    'resize',
    'seshat-video-active',
    'touchmove',
    'deviceorientation',
  ].forEach((evt) => window.addEventListener(evt, throttle(refreshVisitId)));
}

class TextExplainer extends HTMLElement {
  constructor() {
    super();

    const uniqueId = new Promise((resolve, reject) => {
      generateUUID()
        .then((id) => {
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    });

    uniqueId.then((id) => {
      this._uniqueId = id;
      this._createTemplate();
      this._addEventListeners();
    });
  }

  _calculateDialogueBoxPosition() {
    const dialogueButtonRect =
      this.querySelector('.dialogue-button').getBoundingClientRect();
    let parentElement = this.parentElement;
    const dialogueBox = this._dialogueBox;
    const windowWidth = window.innerWidth;
    const dialogueBoxWidth = 400;
    const dialogueBoxRight = 'auto';
    let dialogueBoxLeft = dialogueButtonRect.left;

    if (windowWidth < 770) {
      while (
        parentElement &&
        getComputedStyle(parentElement).display === 'inline'
      ) {
        parentElement = parentElement.parentElement;
      }
      if (parentElement) {
        parentElement.style.position = 'relative';
      }
      dialogueBox.style.left = `0px`;
      dialogueBox.style.right = dialogueBoxRight;
    } else {
      // Check if the dialog box is cut off by the right side of the screen
      const cutOff = dialogueBoxLeft + dialogueBoxWidth - windowWidth;
      if (cutOff > 0) {
        // Adjust the left value by the amount the dialog box is cut off by the screen
        dialogueBoxLeft -= cutOff;
      }
      dialogueBox.style.left = `${dialogueBoxLeft}px`;
      dialogueBox.style.top = `${
        dialogueButtonRect.top + dialogueButtonRect.height
      }px`;
    }
  }

  _createTemplate() {
    const { title, explanation } = this.dataset;

    const template = document.createElement('template');

    template.innerHTML = /* html */ `
    <button 
      type="button" 
      id="dialouge-btn-${this._uniqueId}" 
      class="dialogue-button" 
      aria-controls="dialogue-box-${this._uniqueId}" 
      aria-expanded="false" 
      aria-haspopup="dialog"
      aria-label="${title} (klikk for forklaring på ordet)"
      data-dialogue>${title}</button>

    <dialog 
      id="dialogue-box-${this._uniqueId}"
      class="dialogue-box" 
      role="dialog" 
      aria-describedby="dialogue-description-${this._uniqueId}">
      <div class="dialogue-container">
        <button class="close-dialogue" aria-label="Lukk">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h3 id="dialogue-title-${this._uniqueId}" class="dialogue-title">
          <dfn aria-describedby="dialogue-description-${this._uniqueId}">${title}</dfn>
        </h3>
        <div id="dialogue-description-${this._uniqueId}">${explanation}</div>
      </div>
    </dialog>
    `;

    const content = template.content.cloneNode(true);

    this.appendChild(content);
  }

  _addEventListeners() {
    this._dialogueButton = this.querySelector('.dialogue-button');
    this._dialogueBox = this.querySelector('.dialogue-box');
    this._closeDialogue = this.querySelector('.close-dialogue');

    // add click event listener to dialogue button
    this._dialogueButton.addEventListener('click', () => {
      // check if the dialogue box is already open
      if (this._dialogueBox.open) {
        this._closeDialogueBox(this._dialogueBox, this._dialogueButton);
      } else {
        this._openDialogueBox(this._dialogueBox);
      }
    });

    // add click event listener to close button
    this._closeDialogue.addEventListener('click', () => {
      this._closeDialogueBox(this._dialogueBox, this._dialogueButton);
    });

    // add click event listener to document to close dialog box when clicking outside of it
    document.addEventListener('click', (event) => {
      if (
        this._dialogueBox.open &&
        !event.target.closest('.dialogue-box') &&
        !event.target.closest('.dialogue-button')
      ) {
        this._closeDialogueBox(this._dialogueBox, this._dialogueButton);
      }
    });

    // add click event for the Escape key to close dialog box
    document.addEventListener('keydown', this._closeDialogOnEscape);

    // use throttling to optimize scroll event listener
    let isThrottled = false;

    const handleScroll = () => {
      if (!isThrottled) {
        window.requestAnimationFrame(() => {
          this._calculateDialogueBoxPosition();
          isThrottled = false;
        });
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 100);
      }
    };

    // add scroll event listener to window
    window.addEventListener('scroll', () => {
      // If the dialogue box is open
      if (this._dialogueBox.open) {
        handleScroll();
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    });
  }

  _openDialogueBox() {
    // Close any other open dialog windows
    const openDialogues = document.querySelectorAll('.dialogue-box[open]');
    openDialogues.forEach((dialogue) => {
      dialogue.classList.remove('open');
      dialogue.classList.add('closed');
      dialogue.close();
    });

    this._dialogueBox.classList.remove('closed');
    this._calculateDialogueBoxPosition();
    this._dialogueBox.show();
    this._dialogueBox.classList.add('open');
    this._dialogueButton.setAttribute('aria-expanded', 'true');
    this._closeDialogue.focus();
  }

  _closeDialogueBox() {
    const openDialogues = document.querySelectorAll('.dialogue-box[open]');
    openDialogues.forEach((dialogue) => {
      dialogue.classList.remove('open');
      dialogue.classList.add('closed');
    });
    this._dialogueBox.classList.add('closed');
    // add transitionend event listener to dialogue box
    this._dialogueBox.addEventListener('transitionend', (event) => {
      if (
        (event.propertyName === 'margin' || event.propertyName === 'opacity') &&
        event.target.classList.contains('closed')
      ) {
        this._dialogueBox.close();
      }
    });

    this._dialogueButton.setAttribute('aria-expanded', 'false');
    this._dialogueButton.focus();
  }

  _closeDialogOnEscape = (event) => {
    if (event.keyCode === 27) {
      // check if the key is the Escape key
      this._closeDialogueBox(this._dialogueBox, this._dialogueButton);
    }
  };

  _handleDocumentClick(event) {
    if (
      this._dialogueBox.open &&
      !event.target.closest('.dialogue-box') &&
      !event.target.closest('.dialogue-button')
    ) {
      this._closeDialogueBox();
    }
  }
}

customElements.define('text-explainer', TextExplainer);
