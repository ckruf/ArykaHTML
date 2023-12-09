import { addMetaElement, addMetaEvent } from 'https://assets.acdn.no/pkg/@amedia/adplogger-sdk/v0/main.js';
import { getBrowserId } from 'https://assets.acdn.no/pkg/@amedia/browserid/v1/index.js';
import { UserDataRequest } from 'https://assets.acdn.no/pkg/@amedia/user/v0/user.js';

const isDebugEnabled = () =>
  window.location.href.indexOf('debug=true') !== -1;

/**
 *  Console logs with a Bazaar prefix when ?debug=true is in the URL.
 *  Tip: Add a (Bazaar) filter in your developer console to only show the Bazaar log.
 */
function debug(...data) {
  if (isDebugEnabled() && data.length > 0) {
    const sinceStart = Date.now() - window.bazaarLoadStart;
    data[0] = `(Bazaar) ${data[0]} [Time: ${sinceStart}ms]`;
    console.log(...data);
  }
}

const queryStrToObj = function queryStrToObj(str) {
  return str.split('&').reduce(function (memo, pair) {
    let vals = pair.split('=');
    memo[vals[0]] = vals[1];
    return memo;
  }, {});
};

const getUserAccess = function (cookieValue) {
  if (!cookieValue) {
    return;
  }
  return queryStrToObj(cookieValue).a_sub_status === 'active';
};

const readCookie = function (name, { doc = document } = {}) {
  let value = '; ' + doc.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
  return '';
};

/* jshint node:true */

const userLogin = readCookie('daxsub', {});

function isDivCollapsed() {
  return new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      let element = document.createElement('div');
      element.innerHTML = '&nbsp;';
      element.className = 'ads adsbox';
      element.style.position = 'absolute';
      element.style.left = '0px';
      element.style.top = '0px';
      element.style.width = '1px';
      element.style.height = '1px';

      document.body.appendChild(element);

      window.setTimeout(() => {
        resolve(element.offsetHeight === 0);
        if (element.remove === undefined)
          return element.parentElement.removeChild(element);
        return element.remove();
      }, 100);
    });
  });
}
function isAdsJsBlocked() {
  return fetch('/api/bazaar/v2/ad/adsbygoogle.js')
    .then(() => false)
    .catch(() => true);
}

// This is just a simple shim we need because bazaar loads before adp logger.
function logToAdp(obj) {
  window.addEventListener('message', function initializedListener(evt) {
    if (!evt.data || evt.data.adpEventName !== 'seshat-alive') {
      return;
    }

    window.removeEventListener('message', initializedListener);
    window.postMessage(obj, '*');
  });

  window.postMessage({ adpEventName: 'seshat-ping' }, '*');
}

Promise.all([isAdsJsBlocked(), isDivCollapsed()])
  .then((result) => {
    let detected = !(result.indexOf(true) === -1);

    logToAdp({
      adpEventName: 'seshat-add',
      data: {
        a_adblock: detected,
      },
    });

    debug('Detected AdBlocker: ', detected);
    if (userLogin !== '') {
      debug('Detected UserLogin: daxsub cookie created');
    }
  })
  .catch((err) => debug(err));

const promisedFn = (pfn, data, counter) =>
  new Promise((resolve, reject) => {
    {
      resolve(pfn(data, true));
    }
  });

if (!window.__cmpDISABLED) {
  window.__cmpDISABLED = (method, param, fn) => {
    switch (method) {
      case 'getConsentData':
        promisedFn(fn, null);
        debug('__cmp.getConsentData: IABConsentString is disabled');
        break;
      case 'getVendorConsent':
        promisedFn(fn, null);
        debug('__cmp.getVendorConsents: IABConsentString is disabled');
        break;
      /*case 'getConsentData':
            promisedFn(fn, { consentData: consentString, gdprApplies: true, hasGlobalScope: false }, 0);
            log.debug(`IABConsentString:{ 'consentString': '${consentString}', 'consent': ${consent} }`);
            break;
        case 'getVendorConsents':
            promisedFn(fn, {
                metadata: metaData,
                gdprApplies: true,
                hasGlobalScope: false,
                purposeConsents,
                vendorConsents,
            }, 0);
            log.debug(`IABMetaData:{ 'metaData': '${metaData}' }`);
            break;*/
      case 'ping':
        promisedFn(fn, { gdprAppliesGlobally: false, cmpLoaded: true });
        break;
    }
  };
}

function setPositionFixed(element) {
  Object.assign(element.style, { top: '0', position: 'fixed' });
}

function resetPositionFixed(element) {
  Object.assign(element.style, { position: 'relative' });
  delete element.style.top;
}

function createDOMPlaceHolder() {
  const placeholderElement = document.createElement('div');
  placeholderElement.setAttribute('data-am-placeholder', 'sticky-placeholder');
  return placeholderElement;
}

/**
 *  Sets the DOM-element to a fixed position.
 *  @param: DOM-element
 */
const stickToTop = (elementToStick) => {
  const placeholderElement = createDOMPlaceHolder();
  elementToStick.parentNode.insertBefore(placeholderElement, elementToStick);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.target.nextSibling === elementToStick) {
        entry.boundingClientRect.top >= 0
          ? resetPositionFixed(elementToStick)
          : setPositionFixed(elementToStick);
      }
    });
  };

  const observer = new IntersectionObserver(callback);
  observer.observe(placeholderElement);
};

/* global questback */

const runPopup = (cfg) => {
  const conf = {
    title: '',
    text: cfg.questbackPopupText,
    autoDisplay: true,
    delay: 0.5,
    displayFraction: parseFloat(cfg.questbackPopupFrequency),
    activePeriodStart: undefined,
    activePeriodEnd: undefined,
    buttons: [
      {
        type: 'participate',
        text: 'JA, jeg deltar',
      },
      {
        type: 'decline',
        text: 'Nei takk',
      },
    ],
    width: 500,
    height: 'auto',
    left: '50%',
    top: '50%',
    display: {
      type: 'tab',
      width: 800,
      height: 600,
    },
    theme: {
      shadow: true,
      backdrop: false,
      buttonAlignment: 'center',
      showAnimation: {
        type: 'fade-in',
        duration: 500,
        css: undefined,
      },
      hideAnimation: {
        type: 'fade-out',
        duration: 500,
        css: undefined,
      },
    },
    disableCookies: false,
    cookieName: undefined,
    redisplayAfterDays: 365,
  };
  const el = document.createElement('script');
  el.setAttribute(
    'src',
    'https://services.api.no/api/bazaar/assets/v2/questback.popup-1.0.1.js'
  );
  el.addEventListener('load', () => {
    questback.popup.create(cfg.questbackPopupLink, conf);
  });
  document.getElementsByTagName('script')[0].parentNode.appendChild(el);
};

let viewWidth = 0;
function isMobile() {
  if (viewWidth === 0) {
    viewWidth = Math.min(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }
  return viewWidth < 768;
}

const articleURLPattern = /(\d+-\d+-.*|\d+\.html)$/;

const isArticle = articleURLPattern.test(window.location.pathname);
const isNettavisen = window.location.href.indexOf('nettavisen.no') > -1;

const isExtern = 'internal';

function isLocalhost() {
  return window.location.host.includes('localhost');
}

function isSnap() {
  return window.location.host.endsWith('.api.no');
}

window.bazaartag = {};

const slots = [];
const slotSizes = [];
const slotCreatives = [];
const loadedSlotIds = [];
const loadedSlotIdsOnStartup = [];

let singleRequestMode = false;

let takeoverDisplayed = false;
let topbannerSpecialFormatDisplayed = false;
let parallaxDisplayed = false;
let doShadowing = !isMobile();

const previewMode = window.location.href.indexOf('previewMode=true') > -1;

(function setSingleRequestMode() {
  if (window.location.href.indexOf('singlerequest=false') > -1) {
    singleRequestMode = false;
  } else if (window.location.href.indexOf('singlerequest=true') > -1) {
    singleRequestMode = true;
  }
})();

function addPreviewModeAdjustHeight(iframe) {
  window.addEventListener('message', (evt) => {
    function eventFromNativeTemplate() {
      return (
        evt.data !== undefined &&
        evt.data.type !== undefined &&
        evt.data.type === 'bazaar:native_size'
      );
    }

    if (eventFromNativeTemplate()) {
      debug('googletag: previewMode adjust native size', evt.data, iframe);
      iframe.setAttribute('height', evt.data.height + 20 + 'px');
    }
  });
}

function createPreviewIFrame(materialType, materialId, campaignId) {
  const contentIFrame = document.createElement('iframe');
  contentIFrame.setAttribute('id', 'previewFrame');
  addPreviewModeAdjustHeight(contentIFrame);
  const baseUrl =
    isSnap() || isLocalhost()
      ? 'https://services.snap0.api.no'
      : 'https://services.api.no';
  let contentSrc = `${baseUrl}/api/boutique/v1/render/${materialType}/${materialId}`;

  if (campaignId) {
    contentSrc = `${baseUrl}/api/boutique/v1/order/render/${materialType}/${campaignId}`;
  }

  contentIFrame.setAttribute('src', contentSrc);
  const width = isMobile() ? '100%' : '980px';
  contentIFrame.setAttribute('width', width);
  contentIFrame.setAttribute('height', '600px');
  return contentIFrame;
}

function refreshIframe(contentDiv) {
  const iframe = document.querySelector(`iframe[id='previewFrame']`);
  iframe.setAttribute('style', 'visibility: hidden');
  const updateInfo = document.createElement('div');
  updateInfo.setAttribute('class', 'preview-info');
  updateInfo.innerHTML = 'Oppdaterer annonse...';
  contentDiv.appendChild(updateInfo);
  setTimeout(() => {
    let src = iframe.getAttribute('src');
    iframe.setAttribute('src', src);
    iframe.setAttribute('style', 'visibility: unset');
    contentDiv.removeChild(updateInfo);
  }, 3000);
}

function addPreview(slotId) {
  const urlParams = new URLSearchParams(window.location.search);
  const materialId = urlParams.get('materialId');
  const campaignId = urlParams.get('campaignId');
  let materialType = urlParams.get('materialType')
    ? urlParams.get('materialType')
    : 'standard';

  debug(
    `previewMode: display preview on ${slotId} with materialId=${materialId}, campaignId=${campaignId}, materialType=${materialType}`
  );

  if (!(materialId || campaignId)) {
    debug(
      `previewMode: MISSING materialId OR campaignId parameter on ${slotId}`
    );
    return;
  }

  const contentDiv = document.querySelector(`div[id=${slotId}]`);
  const iframe = createPreviewIFrame(materialType, materialId, campaignId);
  contentDiv.appendChild(iframe);

  const previewInfo = document.createElement('div');
  previewInfo.setAttribute('class', 'preview-info');

  const refreshLink = document.createElement('a');
  refreshLink.innerHTML =
    'Dette er en forhåndsvisning. Ser den ikke riktig ut? Trykk her for å oppdatere annonsen.';
  refreshLink.addEventListener('click', () => refreshIframe(contentDiv));
  previewInfo.appendChild(refreshLink);
  contentDiv.appendChild(previewInfo);
}

window.bazaartag.initialize = function () {
  debug('Initialize GPT implementation');
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
};

window.bazaartag.setTakeoverDisplayed = function () {
  debug('googletag: takeover displayed true');
  takeoverDisplayed = true;
};

window.bazaartag.isTakeoverDisplayed = function () {
  debug('googletag: isTakeoverDisplayed', takeoverDisplayed);
  return takeoverDisplayed;
};

window.bazaartag.setTopbannerSpecialFormatDisplayed = function () {
  debug('googletag: topbannerSpecialFormatDisplayed displayed true');
  topbannerSpecialFormatDisplayed = true;
  doShadowing = false;
};

window.bazaartag.isTopbannerSpecialFormatDisplayed = function () {
  debug(
    'googletag: isTopbannerSpecialFormatDisplayed',
    topbannerSpecialFormatDisplayed
  );
  return topbannerSpecialFormatDisplayed;
};

window.bazaartag.isDoShadowing = function () {
  debug('googletag: isDoShadowing', doShadowing);
  return doShadowing;
};

window.bazaartag.setParallaxFormatDisplayed = function () {
  debug('googletag: parallaxDisplayed displayed true');
  parallaxDisplayed = true;
};

window.bazaartag.clearParallaxFormatDisplayed = function () {
  debug('googletag: parallaxDisplayed displayed false');
  parallaxDisplayed = false;
};

window.bazaartag.isParallaxFormatDisplayed = function () {
  debug('googletag: isParallaxFormatDisplayed', parallaxDisplayed);
  return parallaxDisplayed;
};

window.bazaartag.setTargeting = function (key, value) {
  debug(`googletag: setTargeting(${key}, ${value})`);
  window.googletag.pubads().setTargeting(key, value);
};

function refreshSlot(slotId, usePreviousSizeMapping, refreshExistingSlot) {
  if (checkPreviewModeForSlot(slotId)) {
    return;
  }
  const refreshSlot = slots[slotId];
  const slotSize = slotSizes[slotId];
  let mapping = [];
  let removedTargeting = [];
  if (usePreviousSizeMapping && slotSize) {
    if (slotSize[0] === 1 || slotSize[0] === 0) {
      debug(
        `googletag: refreshing slot(${slotId}) Previous size is 1x1 or 0x0, do not refresh`,
        slotSize
      );
      return;
    }
    mapping = window.googletag
      .sizeMapping()
      .addSize([768, 0], slotSize)
      .addSize([0, 0], slotSize)
      .build();
    refreshSlot.defineSizeMapping(mapping);
    //Remove prebid targeting to avoid 1x1 ads on refresh with previous size
    refreshSlot.getTargetingKeys().forEach((key) => {
      if (key.indexOf('hb_') > -1) {
        refreshSlot.clearTargeting(key);
        removedTargeting.push(key);
      }
    });
  }
  if (refreshExistingSlot) {
    refreshSlot.setTargeting('refresh', isArticle ? 'art' : 'forsiden');
  }
  debug(
    `googletag: refreshing slot(${slotId}) Use previous sizeMapping=${usePreviousSizeMapping}, refreshExistingSlot=${refreshExistingSlot}`,
    refreshSlot,
    slotSize,
    mapping,
    removedTargeting
  );
  window.googletag.pubads().refresh([refreshSlot]);
}

window.bazaartag.slotLoadedOnStartup = function (slotId) {
  let wasLoadedOnStartup = loadedSlotIdsOnStartup[slotId];
  debug(`googletag: slotLoadedOnStartup(${slotId})=${wasLoadedOnStartup}`);
  return wasLoadedOnStartup;
};

function checkPreviewModeForSlot(slotId) {
  if (previewMode) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('slotId') === slotId) {
      debug(`googletag: previewMode for ${slotId}`);
      return true;
    }
  }
  return false;
}

window.bazaartag.display = function (slotId) {
  if (checkPreviewModeForSlot(slotId)) {
    addPreview(slotId);
    return;
  }

  debug(`googletag: display(${slotId})`);
  window.googletag.display(slotId);

  if (!singleRequestMode) {
    refreshSlot(slotId);
  } else if (!loadedSlotIdsOnStartup[slotId]) {
    debug(
      `googletag: ${slotId} was not loaded on startup, refreshing slot`
    );
    refreshSlot(slotId);
  }
};

window.bazaartag.isNative = function (slotId) {
  const slotSize = slotSizes[slotId];
  if (slotSize) {
    const creativeId = slotCreatives[slotId];
    return (
      (slotSize[0] === 1 || slotSize[0] === 0) && creativeId && creativeId > 0
    );
  }
  return false;
};

window.bazaartag.refreshWithPreviousSize = function (slotId) {
  refreshSlot(slotId, true, true);
};

window.bazaartag.refresh = function (
  slotId,
  usePreviousSizeMapping,
  refreshExistingSlot
) {
  refreshSlot(slotId, usePreviousSizeMapping, refreshExistingSlot);
};

window.bazaartag.addEventListener = function (eventId, eventFn) {
  debug(`googletag: addEventListener(${eventId})`, eventFn);
  window.googletag.pubads().addEventListener(eventId, eventFn);
};

window.bazaartag.pauseAdServer = function () {
  debug('googletag: disableInitialLoad');
  window.googletag.pubads().disableInitialLoad();
};

window.bazaartag.enableServices = function () {
  debug('googletag: enableServices');
  if (singleRequestMode) {
    debug('googletag: using single request mode');
    window.googletag.pubads().enableSingleRequest();
  } else {
    debug('googletag: single request mode disabled');
  }
  window.googletag.pubads().setCentering(true);
  window.googletag.enableServices();
};

window.bazaartag.defineOutOfPageSlot = function (slotOptions) {
  const { url, slotId } = slotOptions;
  let outOfPageSlot = window.googletag.defineOutOfPageSlot(url, slotId);
  debug('googletag: defineOutOfPageSlot', outOfPageSlot);
  slots[slotId] = outOfPageSlot;
  return outOfPageSlot;
};

window.bazaartag.registerSlotId = function (slotId) {
  loadedSlotIds.push(slotId);
};

window.bazaartag.defineSlot = function (slotOptions) {
  const { url, size, slotId } = slotOptions;
  let slot = window.googletag.defineSlot(url, size, slotId);
  debug(`googletag: defineSlot(${url}, ${size}, ${slotId})`, slotOptions);
  slots[slotId] = slot;
  return slot;
};

window.bazaartag.sizeMapping = function () {
  let sizeMapping = window.googletag.sizeMapping();
  debug('googletag: sizeMapping', sizeMapping);
  return sizeMapping;
};

window.bazaartag.loadAds = function () {
  loadedSlotIds.forEach((slotId) => (loadedSlotIdsOnStartup[slotId] = true));
  debug(
    'googletag: refresh() Loaded slotIds on startup: ' + loadedSlotIdsOnStartup
  );
  if (singleRequestMode) {
    debug('googletag: refresh() on single request mode');
    window.googletag.pubads().refresh();
  } else {
    debug('googletag: refresh disabled for none single request mode');
  }
};

window.bazaartag.setRequestNonPersonalizedAds = function (request) {
  debug(`googletag: setRequestNonPersonalizedAds(${request})`);
  window.googletag.pubads().setRequestNonPersonalizedAds(request);
};

window.bazaartag.setPublisherProvidedId = function (id) {
  debug(`googletag: setPublisherProvidedId(${id})`);
  window.googletag.pubads().setPublisherProvidedId(id);
};

window.bazaartag.setSlotTargeting = function (slot, slotTargeting) {
  debug(
    `googletag: setSlotTargeting(slot, ${slotTargeting.keywords}, ${slotTargeting.position}, ${slotTargeting.positionIndex}, ${slotTargeting.threshold}, ${slotTargeting.adnami})`,
    slot
  );
  slot
    .addService(window.googletag.pubads())
    .setTargeting('keyword', slotTargeting.keywords)
    .setTargeting('position', slotTargeting.positionIndex)
    .setTargeting('format', slotTargeting.position)
    .setTargeting('threshold', slotTargeting.threshold)
    .setTargeting('adnami_format', slotTargeting.adnami)
    .setTargeting('demandmanager1', 'demandmanager1')
    .setCollapseEmptyDiv(true);
};

window.bazaartag.defineSizeMapping = function (slot, sizeMapping) {
  debug(
    `googletag: defineSizeMapping(${slot.getSlotElementId()})`,
    sizeMapping
  );

  slot.defineSizeMapping(sizeMapping);
};

window.bazaartag.isReady = function () {
  let ready = !(
    window.googletag.defineSlot === undefined || !window.googletag.apiReady
  );
  debug('googletag: isReady', ready);
  return ready;
};

window.bazaartag.registerSlot = function (slotId, size, creativeId) {
  debug(`googletag: registering slot (${slotId}) size`, size);
  slotSizes[slotId] = size;
  debug(`googletag: registering slot (${slotId}) creativeId`, creativeId);
  slotCreatives[slotId] = creativeId;
};

window.bazaartag.hasLoadedAds = function () {
  let slotSizesLoaded = Object.keys(slotSizes).length;
  debug(`googletag: hasLoadedAds slotSizes.length=${slotSizesLoaded}`);
  return slotSizesLoaded > 0;
};

window.bazaartag.cmd = {};

window.bazaartag.cmd.push = function (fn) {
  window.googletag.cmd.push(fn);
};

window.bazaartag.setTargetingPrebid = function () {
  window.pbjs.setTargetingForGPTAsync();
};

if (window.performance) {
  debug(
    `REQUIRE_DEBUG: end (inside) of gpt-service ts: ${window.performance.now()}`
  );
}

const keywordUrlPattern = /keyword=([0-9a-zA-ZæøåÆØÅ, \-_]+)/;

let resolve$2;

const prebidJsSetup = () => {
  if (window.bazaartag.isReady()) {
    debug('prebid: loading prebid script');
    const gads = document.createElement('script');
    gads.type = 'text/javascript';
    gads.src = `//micro.rubiconproject.com/prebid/dynamic/10856.js?section=test`;
    const node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
  } else {
    debug('prebid: gpt not ready');
    setTimeout(prebidJsSetup, 5);
  }
};

const ready = new Promise((_resolve) => {
  resolve$2 = _resolve;
});

let midtbannerPositions = [
  'midtbanner',
  'midtbanner',
  'midtbanner',
  'midtbanner',
  'midtbanner',
  'midtbanner',
  'midtbanner',
  'midtbanner',
];
let netboardPositions = [
  'netboard',
  'netboard',
  'netboard',
  'netboard',
  'netboard',
  'netboard',
];
const articlePositions = {
  small: {
    nettavisen: {
      static: ['takeover'],
      dynamic: midtbannerPositions,
    },
    alt: {
      static: [],
      dynamic: midtbannerPositions,
    },
    default: {
      static: [],
      dynamic: midtbannerPositions,
    },
  },
  large: {
    nettavisen: {
      static: [
        'takeover',
        'toppbanner',
        'skyskraper',
        'skyskraper',
        'skyskraper',
        'skyskraper',
      ],
      dynamic: netboardPositions,
    },
    alt: {
      static: [],
      dynamic: netboardPositions,
    },
    default: {
      static: ['toppbanner', 'skyskraper', 'artikkelboard'],
      dynamic: ['netboard'],
    },
  },
};

function getPositions(body) {
  debug('PrepareAds: Get positions from body', body);
  const publication = body.publicationName || document.location.hostname;
  const positions = body.positions || body.preload || [];
  const usePredefinedPositions =
    body.predefinedPositions !== undefined ? body.predefinedPositions : true;
  let isAltNo = publication.toLowerCase() === 'alt';
  let isNettavisen = publication.toLowerCase().indexOf('nettavisen') !== -1;

  debug(
    'PrepareAds: Use predefined positions config',
    usePredefinedPositions
  );

  debug('PrepareAds: is alt.no', isAltNo);

  if ((isAltNo || isArticle) && usePredefinedPositions) {
    const ads =
      window.innerWidth && window.innerWidth < 767
        ? articlePositions.small
        : articlePositions.large;

    debug('PrepareAds: Use predefined positions', ads);

    if (isNettavisen) {
      return ads.nettavisen;
    } else if (isAltNo) {
      return ads.alt;
    }
    return ads.default;
  } else {
    debug(`PrepareAds: Use config positions`, positions);
    return {
      static: positions,
      dynamic: [],
    };
  }
}

function parseText(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    debug(
      'Could not parse Bazaar configuration as json. Evaluated as empty.',
      text
    );
    return {};
  }
}

/**
 *   Assigns default values and returns the config.
 */
function buildConfig(body) {
  const predefinedPositions = getPositions(body);
  const positions = [
    ...predefinedPositions.static,
    ...predefinedPositions.dynamic,
  ];
  const publication =
    body.publication !== undefined
      ? body.publication
      : document.location.hostname;

  let thresholdValueToppbanner = '200';
  let thresholdValueMidtbanner = '200';
  let thresholdValueNetboard = '200';

  if (publication.indexOf('www.nettavisen.no') > -1) {
    thresholdValueMidtbanner = '400';
    thresholdValueNetboard = '400';
  }

  debug(
    `Threshold set to ${thresholdValueToppbanner} for toppbanner, ${thresholdValueMidtbanner} for midtbanner and ${thresholdValueNetboard} for netboard`
  );

  const config = {
    publication: publication,
    publicationName: body.publicationName || document.location.hostname,
    titleCode: body.title_code || '',

    slotUrl: '/56257416/{publication}/{position}',

    audiencePixelUrl:
      'https://pubads.g.doubleclick.net/activity;dc_iu=/56257416/DFPAudiencePixel;ord={ord};dc_seg={segment}',

    mobileToppbanner: thresholdValueToppbanner,
    mobileMidtbanner: thresholdValueMidtbanner,
    mobileNetboard: thresholdValueNetboard,
    desktopToppbanner: thresholdValueToppbanner,
    desktopMidtbanner: thresholdValueMidtbanner,
    desktopNetboard: thresholdValueNetboard,
    desktopArtikkelboard: '-100',
    desktopSkyskraper: '0',
    takeover: '100',
    keywords: body.keywords !== undefined ? body.keywords : [],

    positions,
    enableCMP: body.cmp,
    dynamicPositionOrder: predefinedPositions.dynamic,
    localLazyLoad:
      body.localLazyLoad !== undefined ? body.localLazyLoad : false,
    categories:
      document.getElementsByName('categories').length > 0
        ? [
            `${document
              .getElementsByName('categories')[0]
              .getAttribute('content')}`,
          ]
        : [],
    questbackPopupActive:
      body['questback.popup.active'] !== undefined &&
      body['questback.popup.active'] !== 'false',
    questbackPopupFrequency:
      body['questback.popup.frequency'] !== undefined
        ? body['questback.popup.frequency']
        : '',
    questbackPopupLink:
      body['questback.popup.link'] !== undefined
        ? body['questback.popup.link']
        : '',
    questbackPopupText:
      body['questback.popup.text'] !== undefined
        ? body['questback.popup.text']
        : '',
  };

  const urlKeywords = window.location.href.match(keywordUrlPattern);
  if (urlKeywords) {
    config.keywords = config.keywords.concat(urlKeywords[1].split(','));
  }

  if (/pushvarslings-app/i.test(navigator.userAgent)) {
    config.keywords.push('pushapp');
  }

  const viewWidth = Math.min(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (viewWidth < 1375) {
    debug('Viewport is under 1375px, removing skyskraper from config');
    config.positions = config.positions.filter(
      (pos) => pos.indexOf('skyskraper') === -1
    );
  }
  return config;
}

class bazaarConfig extends HTMLElement {
  /**
   *  Returns the content found in the first bazaarscript as text.
   */
  getScriptBody() {
    const bazaarScripts = [].slice
      .call(this.getElementsByTagName('script'))
      .filter(
        (script) => script.getAttribute('type') === 'application/bazaarscript'
      );

    return bazaarScripts && bazaarScripts.length > 0
      ? bazaarScripts[0].textContent
      : undefined;
  }

  connectedCallback() {
    // Timeout because of safari not ready
    setTimeout(() => this.init(), 1);
  }

  attachedCallback() {
    this.init();
  }

  init() {
    window.bazaartag = window.bazaartag || {};
    window.bazaartag.cmd = window.bazaartag.cmd || [];

    window.bazaartag.initialize();
    prebidJsSetup();

    const body = this.getScriptBody();
    const json = parseText(body);
    debug('Config json: ', json);
    const config = buildConfig(json);

    debug('Config ready: ', config);
    resolve$2(config);
    if (config.questbackPopupActive) {
      runPopup(config);
    }
  }
}

if (customElements && customElements.define) {
  if (customElements.get('bazaar-config') === undefined) {
    customElements.define('bazaar-config', bazaarConfig);
  }
} else {
  // @ts-ignore
  document.registerElement('bazaar-config', {
    prototype: bazaarConfig.prototype,
  });
}

var config$2 = () => ready;

const desktopBreakpoint = [768, 0];
const mobileBreakpoint = [0, 0];

function getMidtbannerId() {
  if (isMobile()) {
    return 'mobilbanner';
  }
  return 'midtbanner';
}

function includeFullscreenSize(index, keywords) {
  return (
    index &&
    (index === 2 || index === 3) &&
    keywords &&
    keywords.indexOf('forsiden') > -1
  );
}

function getMidtbannerSizesDesktop(index, keywords) {
  const midtbannerSizes = [
    [980, 150],
    [980, 200],
    [980, 240],
    [980, 300],
    [980, 500],
    [980, 600],
    [970, 570],
    [970, 550],
    [1920, 1080],
    'fluid',
  ];
  if (includeFullscreenSize(index, keywords)) {
    midtbannerSizes.push([1, 2]);
    return midtbannerSizes;
  }
  return midtbannerSizes;
}

function getMidtbannerSizesMobile(index, keywords) {
  const midtbannerSizes = [
    [336, 280],
    [320, 50],
    [320, 100],
    [320, 250],
    [320, 320],
    [320, 400],
    [320, 480],
    [300, 100],
    [300, 250],
    [300, 300],
    [300, 600],
    [250, 250],
    [280, 500],
    [250, 360],
    [250, 500],
    [240, 400],
    [234, 60],
    [200, 200],
    [180, 700],
    [160, 600],
    [120, 600],
    [120, 240],
    [90, 728],
    [300, 240],
    [300, 210],
    [1920, 1080],
    'fluid',
  ];
  if (includeFullscreenSize(index, keywords)) {
    midtbannerSizes.push([1, 2]);
    return midtbannerSizes;
  }
  return midtbannerSizes;
}

function getToppbannerSizes() {
  return {
    minHeight: {
      mobile: 250,
      desktop: 300,
    },
    prebid: {
      use: true,
      native: false,
      banner: true,
      video: false,
    },
    size: [1, 1],
    breakpoints: [
      {
        break: [
          [768, 0],
          [
            [980, 150],
            [980, 200],
            [980, 240],
            [980, 300],
            [970, 170],
            [1000, 150],
            [1000, 300],
          ],
        ],
      },
      {
        break: [
          mobileBreakpoint,
          [
            [300, 250],
            [320, 250],
          ],
        ],
      },
    ],
  };
}

function getToppbannerDodsSizes() {
  return {
    minHeight: {
      mobile: 250,
      desktop: 300,
    },
    prebid: {
      use: false,
    },
    size: [300, 250],
    breakpoints: [
      {
        break: [
          [768, 0],
          [
            [980, 120],
            [980, 150],
            [980, 200],
            [980, 240],
            [980, 300],
          ],
        ],
      },
      {
        break: [
          mobileBreakpoint,
          [
            [300, 250],
            [320, 250],
          ],
        ],
      },
    ],
  };
}

function getToppbannerFmSizes() {
  return {
    minHeight: {
      mobile: 100,
      desktop: 100,
    },
    prebid: {
      use: false,
    },
    size: [300, 250],
    breakpoints: [
      {
        break: [
          [768, 0],
          [[980, 50], [980, 100], [980, 130], [980, 150], 'fluid'],
        ],
      },
      {
        break: [mobileBreakpoint, [[320, 50], [320, 100], [320, 150], 'fluid']],
      },
    ],
  };
}

function getMidtbannerFmSizes() {
  return {
    minHeight: {
      mobile: 100,
      desktop: 100,
    },
    prebid: {
      use: false,
    },
    size: [300, 250],
    breakpoints: [
      {
        break: [
          [768, 0],
          [
            [980, 50],
            [980, 100],
            [980, 130],
            [980, 150],
            [980, 300],
            [980, 500],
            [980, 600],
            'fluid',
          ],
        ],
      },
      {
        break: [
          mobileBreakpoint,
          [
            [320, 50],
            [320, 100],
            [320, 150],
            [320, 250],
            [320, 320],
            [320, 400],
            'fluid',
          ],
        ],
      },
    ],
  };
}

function getSkyskraperDodsSizes() {
  return {
    minHeight: {
      mobile: 500,
      desktop: 500,
    },
    prebid: {
      use: false,
    },
    size: [181, 500],
    breakpoints: [
      {
        break: [
          [1300, 250],
          [
            [180, 500],
            [250, 500],
            [300, 600],
          ],
        ],
      },
      { break: [mobileBreakpoint, []] },
    ],
  };
}

function getMidtbannerSizes(index, keywords) {
  return {
    minHeight: {
      mobile: 250,
      desktop: 300,
    },
    prebid: {
      use: true,
      native: true,
      banner: true,
      video: true,
      placementId: getMidtbannerId(),
    },
    size: [1, 1],
    breakpoints: [
      {
        break: [desktopBreakpoint, getMidtbannerSizesDesktop(index, keywords)],
      },
      {
        break: [mobileBreakpoint, getMidtbannerSizesMobile(index, keywords)],
      },
    ],
  };
}

function getNetboardSizes() {
  return {
    minHeight: {
      mobile: 250,
      desktop: 500,
    },
    prebid: {
      use: true,
      native: true,
      banner: true,
      video: true,
    },
    size: ['fluid'],
    breakpoints: [
      {
        break: [desktopBreakpoint, [[580, 400], [580, 500], 'fluid']],
      },
      {
        break: [mobileBreakpoint, [[580, 400], [580, 500], 'fluid']],
      },
    ],
  };
}

function getSkyskraperSizes() {
  return {
    minHeight: {
      mobile: 500,
      desktop: 500,
    },
    prebid: {
      use: true,
      native: false,
      banner: true,
      video: false,
    },
    size: [180, 500],
    breakpoints: [
      {
        break: [
          [1300, 250],
          [
            [320, 250],
            [320, 320],
            [320, 400],
            [320, 480],
            [300, 250],
            [300, 300],
            [300, 600],
            [300, 1050],
            [280, 500],
            [250, 250],
            [250, 360],
            [250, 500],
            [240, 400],
            [180, 500],
            [180, 700],
            [160, 600],
            [90, 728],
          ],
        ],
      },
      { break: [mobileBreakpoint, []] },
    ],
  };
}

function getArtikkelboardSizes() {
  return {
    minHeight: {
      mobile: 250,
      desktop: 250,
    },
    prebid: {
      use: true,
      native: true,
      banner: true,
      video: true,
    },
    size: ['fluid'],
    breakpoints: [
      {
        break: [
          desktopBreakpoint,
          [[320, 250], [300, 250], [300, 300], [250, 250], 'fluid'],
        ],
      },
      { break: [mobileBreakpoint, []] },
    ],
  };
}

function getTakeoverSizes() {
  return {
    prebid: {
      use: true,
      native: false,
      banner: true,
      video: false,
    },
    size: [1920, 1080],
    breakpoints: [
      {
        break: [
          desktopBreakpoint,
          [
            [1920, 1080],
            [1, 2],
            [2, 2],
            [300, 220],
          ],
        ],
      },
      {
        break: [
          mobileBreakpoint,
          [
            [1920, 1080],
            [1, 2],
            [2, 2],
          ],
        ],
      },
    ],
  };
}

function getInstreamSizes() {
  return {
    prebid: {
      use: true,
    },
  };
}

function getSponsorbannerSizes() {
  return {
    prebid: {
      use: false,
    },
    minHeight: {
      mobile: 250,
      desktop: 300,
    },
    size: [1, 1],
    breakpoints: [
      {
        break: [
          [768, 0],
          [
            [980, 120],
            [980, 150],
            [980, 200],
            [980, 240],
            [980, 300],
          ],
        ],
      },
      {
        break: [
          mobileBreakpoint,
          [
            [300, 250],
            [300, 300],
            [320, 250],
          ],
        ],
      },
    ],
  };
}

/**
 *  Mapping containing:
 *  1) minHeight for giving default css min-height the ad
 *  2) a fallback size and lookup sizes for each position used when fetching ads from DFP
 *  through the Google Publisher Tag library. Any position not mapped will return as false.
 *
 *  https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot
 */
function mapping(position, index, keywords) {
  switch (position) {
    case 'instream':
      return getInstreamSizes();
    case 'toppbanner':
      return getToppbannerSizes();
    case 'toppbannerdods':
      return getToppbannerDodsSizes();
    case 'toppbannerfm':
      return getToppbannerFmSizes();
    case 'skyskraperdods':
      return getSkyskraperDodsSizes();
    case 'midtbanner':
      return getMidtbannerSizes(index, keywords);
    case 'netboard':
      return getNetboardSizes();
    case 'netboardsmb':
      return getNetboardSizes();
    case 'skyskraper':
      return getSkyskraperSizes();
    case 'artikkelboard':
      return getArtikkelboardSizes();
    case 'midtbannersmb':
      return getMidtbannerSizes(index, keywords);
    case 'midtbannerfm':
      return getMidtbannerFmSizes();
    case 'takeover':
      return getTakeoverSizes();
    case 'sponsorbanner':
      return getSponsorbannerSizes();
    default:
      return false;
  }
}

const createSlot$1 = (slotInfo) => {
  const { url, sizeMapping, slotId, position, id, publication } = slotInfo;
  window.bazaartag.registerSlotId(slotId);
  let size = sizeMapping.size;
  let slot = window.bazaartag.defineSlot({
    url,
    size,
    slotId,
    position,
    publication,
  });
  debug('Load slot', slot);

  if (!slot) {
    console.error(
      `Error getting slot for ${position}, id=${id} slotId=${slotId}, size ${size}, url ${url}`
    );
    return false;
  }
  const map = window.bazaartag.sizeMapping();

  if (map && sizeMapping.breakpoints !== undefined) {
    for (const prop in sizeMapping.breakpoints) {
      const value = sizeMapping.breakpoints[prop];
      map.addSize(value.break[0], value.break[1]);
    }
    window.bazaartag.defineSizeMapping(slot, map.build());
  }
  return slot;
};

/**
 * Styles bazaar-element if page requested with query-parameter google_nofetch=true or google_nofetch=1
 * @param bazaarAdId of bazaar-element to style
 */
const setStylingIfNoFetch = (bazaarAdId) => {
  const fetchNoAds = window.location.href.indexOf('google_nofetch') !== -1;
  const renderNoAds = window.location.href.indexOf('google_norender') !== -1;

  if (fetchNoAds || renderNoAds) {
    const bazaarAd = document.getElementById(bazaarAdId);
    if (bazaarAd.classList) {
      bazaarAd.classList.add('am-bazaar-ad--noad');
    } else {
      bazaarAd.className = 'am-bazaar-ad--noad';
    }
    const positionElement = document.createElement('div');
    positionElement.innerHTML = bazaarAdId;
    bazaarAd.insertBefore(positionElement, bazaarAd.firstChild);
  }
};

const showPrebidInfo = window.location.href.indexOf('prebid_show=true') !== -1;
let _table;
let _overlay;

function resultLogging(info, args, data) {
  let tr = document.createElement('tr');
  let tdinfo = document.createElement('td');
  let tdargs = document.createElement('td');
  tr.appendChild(tdinfo);
  tr.appendChild(tdargs);
  tdinfo.innerHTML = info;
  if (args !== undefined) {
    tdargs.innerHTML = args;
  }
  _table.appendChild(tr);

  _overlay.scrollTop = _overlay.scrollHeight;

  if (data !== undefined) {
    debug(info, data);
  }
}

function createOverlay() {
  _overlay = document.createElement('div');
  _overlay.id = 'bazaar-debug-overlay';
  _table = document.createElement('table');
  _overlay.appendChild(_table);
  document.body.appendChild(_overlay);
}

const init$1 = () => {
  if (showPrebidInfo) {
    createOverlay();
    window.pbjs.onEvent('addAdUnits', () => {
      resultLogging(
        'Prebid adUnits',
        window.pbjs.adUnits.map((au) => au.code)
      );
    });
    window.pbjs.onEvent('auctionInit', (data) => {
      resultLogging('Auction start', `Timeout: ${data.timeout}ms`, data);
    });
    window.pbjs.onEvent('auctionEnd', () => {
      resultLogging('Auction ended');
    });
    window.pbjs.onEvent('bidRequested', (data) => {
      resultLogging(
        'Bid requested',
        `${data.bidderCode} ${
          data.gdprConsent && data.gdprConsent.consentString
            ? '(ConsentString is set)'
            : '(ConsentString is NOT set)'
        }`,
        data
      );
    });
    window.pbjs.onEvent('bidResponse', (data) => {
      resultLogging(
        'Bid response',
        `${data.bidderCode} - ${data.adUnitCode} (${data.width}x${data.height}) - ${data.mediaType} - ${data.cpm} NOK`,
        data
      );
    });
    window.pbjs.onEvent('bidderDone', (data) => {
      resultLogging('Bidder done', data.bidderCode, data);
    });
    window.pbjs.onEvent('requestBids', () => {
      resultLogging('Requesting bids');
    });
    window.pbjs.onEvent('bidTimeout', (data) => {
      resultLogging(
        'Bid timeout',
        data
          .map((b) => b.bidder)
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(', '),
        data
      );
    });
  }
};

const bidWon = () => {
  if (showPrebidInfo) {
    window.pbjs.onEvent('bidWon', (data) => {
      resultLogging(
        'Bid won',
        `${data.bidderCode} - ${data.adUnitCode} (${data.width}x${data.height}) - ${data.mediaType} - ${data.cpm} NOK`,
        data
      );
    });
  }
};

const isPrebidDisabled =
  window.location.href.indexOf('prebid_disable=true') !== -1;

let prebidAdUnits = [];
let instreamAdUnit;
let PREBID_TIMEOUT = 2000;
let config$1;
let prebidDone = false;
let displayCalledBeforePrebidDone = {};
let prebidTargeting = {};
let instreamTargeting = {};

// Do not call display before prebid is done
function callDelayedDisplay() {
  debug('prebid: calling delayed display', displayCalledBeforePrebidDone);

  Object.values(displayCalledBeforePrebidDone).forEach((element) => {
    debug(
      `prebid: calling delayed display on element ${element.id}`,
      element
    );
    const inViewportObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          debug(
            `prebid: ${element.id} is in viewport, calling delayed display`
          );
          element.displayFunction();
          inViewportObserver.disconnect();
          removedDelayedDisplay(element.id);
        } else {
          // The user scrolled pass the ad before prebid was done
          debug(
            `prebid: ${element.id} is no longer in the viewport, skip delayed display`
          );
        }
      });
    });
    let bazaarAd = document.querySelector(`bazaar-ad[id="${element.id}"]`);
    debug(
      `prebid: Creating in viewport observer for ${element.id}`,
      bazaarAd
    );
    inViewportObserver.observe(bazaarAd);
  });
}
function triggerPrebidInstreamEvent(targeting) {
  const prebidInstreamDone = new CustomEvent('prebid:instream_done', {});
  prebidInstreamDone.data = {
    adServerTargeting: targeting,
  };
  debug(
    'prebid instream: sending prebid:instream_done',
    prebidInstreamDone
  );
  window.dispatchEvent(prebidInstreamDone);
  window.addEventListener('prebid:resend_if_done', () => {
    debug('prebid instream: sending prebid:resend_if_done');
    window.dispatchEvent(prebidInstreamDone);
  });
}

function sendVideoAdserverRequest(bidResponses, timedOut, auctionId) {
  debug(
    'prebid instream: Returning from instream request, adding bid if exists',
    bidResponses,
    timedOut,
    auctionId
  );
  let bidTargeting = {};
  if (config$1.positions.indexOf('instream') > -1 && bidResponses) {
    let cpm = 0;
    Object.entries(bidResponses).forEach(([, value]) => {
      if (value.bids && value.bids.length > 0) {
        value.bids.forEach((bid) => {
          //Find highest bid
          if (bid.cpm > cpm) {
            bidTargeting = bid.adserverTargeting;
            cpm = bid.cpm;
          }
        });
        debug(
          'prebid instream: Got instream adserverTargeting',
          bidTargeting
        );
      } else {
        debug('prebid instream: Got no instream bids');
      }
    });
  }

  const targeting = {
    ...instreamTargeting,
    ...bidTargeting,
  };

  triggerPrebidInstreamEvent(targeting);
}

function sendAdserverRequest(bidResponses, timedOut, auctionId) {
  if (window.pbjs.adserverCalled) {
    debug('prebid: Prebid Adserver request already sent');
    return;
  }
  debug(
    'prebid: Sending Prebid Adserver request',
    bidResponses,
    timedOut,
    auctionId
  );
  window.pbjs.adserverCalled = true;
  window.pbjs.que.push(() => {
    debug('prebid: Returned from Prebid');
    bidWon();
    window.pbjs.setTargetingForGPTAsync();
    if (!prebidDone) {
      debug('prebid: Prebid is done, loading page ads');
      prebidDone = true;
      window.bazaartag.loadAds();
    }
    callDelayedDisplay();
  });
}

function getAdunit(adUnitId) {
  debug('prebid: getAdunits', prebidAdUnits);
  const adUnitFromId = prebidAdUnits.find((ad) => ad.code === adUnitId);
  debug('prebid: Got prebidAdUnits from adUnitId', adUnitId, adUnitFromId);
  return adUnitFromId;
}

function requestBids(requestedAdUnits, refreshCall) {
  if (refreshCall) {
    debug('prebid: Refresh call for adunits', requestedAdUnits);
    window.pbjs.adserverCalled = false;
  }
  let requestBids = {
    callback: sendAdserverRequest,
    gptSlotObjects: requestedAdUnits,
    timeout: PREBID_TIMEOUT,
    data: prebidTargeting,
    // sizeMappings: 'defineres i GUI'et istedet for å sende inn her. da kan adops selv konfigurere ting der'
  };
  debug('prebid: Requesting ads for adunits', requestBids);
  window.pbjs.rp.requestBids(requestBids);
}

function setInstreamTargeting(targeting) {
  if (targeting.keywords) {
    instreamTargeting.keyword = targeting.keywords.join(',');
  }
  let trackingKey = targeting.a_user_key;
  instreamTargeting.a_user_key = trackingKey;
  instreamTargeting.a_brws_id = targeting.a_brws_id;
  instreamTargeting.publication = targeting.publication;
  instreamTargeting.ppid = trackingKey ? trackingKey.replace(/-/g, '') : '';

  //Make sure flowplayer targeting is set, even if instream prebid is not completed
  window.__flowplayerAdParameters = instreamTargeting;
  debug(
    'prebid: setting window.__flowplayerAdParameters',
    window.__flowplayerAdParameters
  );
}

function initPrebid(ads, targeting) {
  if (isPrebidDisabled) {
    debug('prebid: prebid is disabled');
    prebidDone = true;
    return false;
  }
  prebidTargeting = targeting;

  if (targeting) {
    setInstreamTargeting(targeting);
  }

  if (prebidAdUnits.length === 0 && !instreamAdUnit) {
    debug('prebid: No prebid adunits found, exiting prebid');
    prebidDone = true;
    return false;
  }

  debug(
    'prebid: Prebid adunit config and targeting',
    prebidAdUnits,
    targeting
  );
  window.pbjs = window.pbjs || {};
  window.pbjs.que = window.pbjs.que || [];

  // request pbjs bids when it loads
  window.pbjs.que.push(() => {
    init$1();
    // TODO: Add adplogger as analytics
    // window.pbjs.enableAnalytics([{ provider: 'adplogger' }]);
    if (prebidAdUnits.length > 0) {
      requestBids(prebidAdUnits);
    } else {
      prebidDone = true;
    }

    if (instreamAdUnit) {
      let viewBidRequest = {
        adSlotName: instreamAdUnit.getAdUnitPath(),
        adServer: 'override',
        playerSize: [640, 360],
        callback: sendVideoAdserverRequest,
        data: targeting,
      };
      debug('prebid: Requesting instream ads', viewBidRequest);
      window.pbjs.rp.requestVideoBids(viewBidRequest);
    }
  });

  debug('prebid: Setting prebid timeout ms', PREBID_TIMEOUT);

  if (prebidAdUnits.length > 0) {
    setTimeout(() => {
      sendAdserverRequest(prebidAdUnits);
    }, PREBID_TIMEOUT);
  }

  debug('prebid: Prebid init done');
  return true;
}

function isPrebidDone() {
  return prebidDone;
}

function isPrebidInUse(sizeMapping) {
  return sizeMapping.prebid !== undefined && sizeMapping.prebid.use;
}

function createAdunit(slotInfo) {
  const { sizeMapping, slotId: id, conf, prebidConfig } = slotInfo;
  if (!isPrebidInUse(sizeMapping) || isPrebidDisabled) {
    return null;
  }
  config$1 = conf;

  debug(
    `prebid: creating prebid adunit for id ${id}, keywords ${prebidConfig.keywords}`,
    prebidConfig
  );

  let adUnit = {};
  adUnit.code = id;
  adUnit.mediaTypes = {};
  adUnit.getAdUnitPath = () => prebidConfig.url;
  adUnit.getSlotElementId = () => id;
  adUnit.getSizes = () => [];

  if (sizeMapping.prebid.banner) {
    debug(`prebid: adding prebid banner mediatype for id ${id}`);
    addBannerMediaType();
  }
  if (sizeMapping.prebid.native) {
    debug(`prebid: adding prebid native mediatype for id ${id}`, adUnit);
    addNativeMediaType();
  }
  if (sizeMapping.prebid.video) {
    debug(`prebid: adding prebid video mediatype for id ${id}`);
    addVideoMediaType();
  }
  debug(`prebid: Prebid adunit for id ${id} created`, adUnit);

  if (adUnit.code === 'ad-instream-1') {
    debug(
      `prebid: Prebid adunit for id ${id} stored as instream unit`,
      adUnit
    );
    instreamAdUnit = adUnit;
  } else {
    debug(`prebid: Prebid adunit for id ${id} stored in list`, adUnit);
    prebidAdUnits.push(adUnit);
  }
  return adUnit;

  function addVideoMediaType() {
    adUnit.mediaTypes.video = {
      context: 'outstream',
      playerSize: [640, 480],
    };
  }

  function addNativeMediaType() {
    adUnit.mediaTypes.native = {
      image: {
        required: true,
        aspect_ratios: [
          {
            ratio_width: 1.91,
            ratio_height: 1,
          },
        ],
      },
      title: {
        required: true,
        len: 200,
      },
      sponsoredBy: {
        required: true,
      },
      clickUrl: {
        required: true,
      },
    };
  }

  function addBannerMediaType() {
    let desktopSizes = sizeMapping.breakpoints[0].break[1].filter(
      (item) => item !== 'fluid'
    );
    let mobileSizes = sizeMapping.breakpoints[1].break[1].filter(
      (item) => item !== 'fluid'
    );
    const sizes = (isMobile() ? mobileSizes : desktopSizes).concat([
      [1, 1],
    ]);
    adUnit.getSizes = () => [sizes];
    adUnit.mediaTypes.banner = { sizes };
    debug(
      `prebid: Set sizes on prebid adunit id ${id} for devicetype [${
        isMobile() ? 'Mobile' : 'Desktop'
      }]`,
      adUnit.getSizes()
    );
  }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function removedDelayedDisplay(id) {
  if (displayCalledBeforePrebidDone[id]) {
    debug(`prebid: remove old delayed display for ${id}`);
    delete displayCalledBeforePrebidDone[id];
  }
}

function addDelayedDisplay(displayFunction, id) {
  removedDelayedDisplay(id);
  debug(
    `prebid: prebid not done, delay call display for ${id}`,
    displayCalledBeforePrebidDone
  );
  displayCalledBeforePrebidDone[id] = {
    displayFunction: displayFunction,
    id: id,
  };
}

function callDisplayWhenPrebidDone(displayFunction, id) {
  if (prebidDone) {
    debug(`prebid: prebid done, call display for ${id}`);
    displayFunction();
  } else {
    addDelayedDisplay(displayFunction, id);
  }
}

const isEnabled$1 = window.location.href.indexOf('showads=true') !== -1;
let adsTable = [];
const slotVisibilityChanged$1 = 'visualAds-slotVisibilityChanged';
const impressionViewable$1 = 'visualAds-impressionViewable';
const slotOnload = 'visualAds-slotOnload';
const slotRenderEnded$1 = 'visualAds-slotRenderEnded';

const htmlTable = (() => {
  let _table;
  let _overlay;

  const createRows = () => {
    let row;
    const createRow = (element) => {
      let bazaarAdId = null;
      Object.entries(element).forEach(([, value]) => {
        const cell = row.insertCell(-1);
        cell.innerHTML = value;
      });
      row.addEventListener('click', () => {
        const removeBorder = (ads) =>
          ads.forEach((el) => el.removeAttribute('style'));
        const setBorder = (ad) =>
          ad.setAttribute('style', 'outline: red solid 5px;');
        let bazaarAd = document.getElementById(bazaarAdId);
        if (!bazaarAd) {
          const position = bazaarAdId.slice(0, bazaarAdId.indexOf('-'));
          const index = bazaarAdId.slice(bazaarAdId.indexOf('-') + 1);
          bazaarAd = document.querySelectorAll(
            `bazaar-ad[position=${position}]`
          )[index - 1];
        }
        removeBorder(document.querySelectorAll('bazaar-ad'));
        setBorder(bazaarAd);
        bazaarAd.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'end',
        });
      });
    };
    row = _table.insertRow(-1);
    const tableHeader = {
      h1: 'Annonseposisjon',
      h2: 'GAM OrdreID',
      h3: 'Synlighet i Viewport',
    };
    createRow(tableHeader);
    adsTable.forEach((element) => {
      row = _table.insertRow(-1);
      createRow(element);
    });

    if (adsTable.length === 0) {
      row = _table.insertRow(-1);
      createRow({
        h1: 'Ingen annonser har blitt lastet, scroll siden for å laste',
        h2: '',
        h3: '',
      });
    }
  };

  return {
    create: () => {
      _overlay = document.createElement('div');
      _overlay.id = 'bazaar-debug-overlay';
      _table = document.createElement('TABLE');
      createRows();
    },
    appendToDocument: () => {
      _overlay.appendChild(_table);
      document.body.appendChild(_overlay);
    },
    removeTable: () => {
      if (_overlay) {
        document.body.removeChild(_overlay);
      }
    },
  };
})();

const addAdObject = (adId) => {
  if (isEnabled$1) {
    debug(`VisibleLog: ${adId}`);
    adsTable.push({
      id: adId,
      orderId: 'Ikke vist',
      inViewPercentage: '0%',
    });
  }
};

const addLogOverlay = () => {
  if (isEnabled$1) {
    htmlTable.removeTable();
    htmlTable.create();
    htmlTable.appendToDocument();
  }
};

const updateAd = (eventType, adInfo) => {
  const id = adInfo.id;
  const index = adsTable.map((e) => e.id).indexOf(id);
  if (index !== -1) {
    if (eventType === slotRenderEnded$1) {
      if (adInfo.isEmpty !== null && adInfo.isEmpty) {
        adsTable[index].orderId = 'Ingen annonse';
      }
    } else if (eventType === impressionViewable$1) {
      if (adInfo.info !== null && adInfo.info.campaignId !== null) {
        adsTable[index].orderId = adInfo.info.campaignId;
      }
    } else if (eventType === slotOnload) {
      if (adInfo.info !== null && adInfo.info.campaignId !== null) {
        adsTable[index].orderId = adInfo.info.campaignId;
      }
    } else if (eventType === slotVisibilityChanged$1) {
      adsTable[index].inViewPercentage = `${adInfo.inViewPercentage}%`;
    }
  }
  addLogOverlay();
};

const eventHandler = (eventType, data) => {
  debug(`VisibleLog: Event ${eventType} ${data.id}`, data);
  updateAd(eventType, data);
};

window.addEventListener(impressionViewable$1, (data) => {
  eventHandler(impressionViewable$1, data.detail);
});

window.addEventListener(slotVisibilityChanged$1, (data) => {
  eventHandler(slotVisibilityChanged$1, data.detail);
});

window.addEventListener(slotOnload, (data) => {
  eventHandler(slotOnload, data.detail);
});

window.addEventListener(slotRenderEnded$1, (data) => {
  eventHandler(slotRenderEnded$1, data.detail);
});

const isEnabled =
  typeof window !== 'undefined' &&
  window.performance &&
  window.performance.timing.fetchStart !== undefined;

const start = isEnabled ? window.performance.timing.fetchStart : undefined;

/**
 *  Returns elapsed time in milliseconds since page load.
 */
function elapsed() {
  return isEnabled ? Date.now() - start : undefined;
}

function displayTakeover(event) {
  const id = event.slot.getSlotElementId();
  const element = document.getElementById(id);
  const parent = element.parentNode;
  parent.classList.add('takeover-loaded');
  const button = document.createElement('div');
  button.innerHTML = 'Lukk annonsen';
  button.classList.add('takeover-close');
  button.addEventListener('click', () => parent.parentNode.removeChild(parent));
  element.appendChild(button);
}

function styleDoubleFullscreen(element) {
  // Get bazaar-ad children
  let children = element.querySelectorAll('div,iframe');

  // Style bazaar-ad
  element.style.setProperty('height', 'calc(200vh + 30px)');
  element.style.setProperty('margin-top', '20px');
  // for desktop
  if (window.innerWidth > 500) {
    element.style.setProperty('width', '100vw');
    element.style.setProperty('left', '-50vw');
    element.style.setProperty('margin-left', '500px');
    element.style.setProperty('margin-right', '0px');
  } else {
    // Set to 100% instead of 100vw to not cause horizontal overflow
    element.style.setProperty('width', '100%');
  }

  // Style bazaar-ad > div
  children[0].style.setProperty('position', 'relative');
  children[0].style.setProperty('height', '200vh', 'important');
  if (isNettavisen) {
    children[0].classList.add('bazaar-parallax-label-x2');
    children[0].style.marginTop = '20px';
  } else {
    children[0].classList.add('am-bazaar-ad--labeled');
  }

  // Style bazaar-ad > div > iframe
  children[1].style.setProperty('width', 'inherit');
  children[1].style.setProperty('height', 'inherit');
  children[1].style.setProperty('left', '0');
  children[1].style.setProperty('position', 'absolute');
  children[1].style.setProperty('top', '0');

  // Style bazaar-ad > div > div
  children[2].style.setProperty('position', 'sticky');
  children[2].style.setProperty('top', '0');
  children[2].style.setProperty('height', '100vh', 'important');

  // Style bazaar-ad > div > div > iframe
  children[3].style.setProperty('width', '100%');
  children[3].style.setProperty('height', '100vh');
}

function styleIframe(iframe) {
  iframe.classList.add('parallax-iframe');
}

function styleIframeWrapper(iframe, extra = {}) {
  let iframeStyle = {
    position: 'absolute',
    clip: 'rect(auto, auto, auto, auto)',
    clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)',
    left: 0,
    top: 0,
  };
  debug(
    'parallax: setting style on iframe wrapper',
    iframe.parentElement,
    iframeStyle,
    extra
  );
  Object.assign(iframe.parentElement.style, iframeStyle, extra);
}

function unsetRelativeParent(bazaarAd) {
  Object.assign(bazaarAd.parentElement.parentElement.style, {
    position: 'unset',
  });
}

function setWrapperOverflow(entry, wrapper) {
  if (entry.isIntersecting) {
    debug('parallax: unset overflow on page wrapper');
    // some elements are set to overflow: hidden, so we need to unset it for position: sticky to work
    wrapper.style.overflow = 'unset';
    entry.target.style.overflow = 'unset';
  } else {
    debug('parallax: set overflow back to original on wrapper');
    // set it back to original state
    wrapper.style.overflow = '';
    entry.target.style.overflow = '';
  }
}

const doubleFullscreenCallback = (entries) => {
  entries.forEach((entry) => {
    let wrapper = document.querySelector('.maelstrom-wrapper');
    if (wrapper) {
      setWrapperOverflow(entry, wrapper);
    }
    const skys = Array.from(document.querySelectorAll('.top-sky-container'));
    if (skys.length > 0) {
      if (entry.intersectionRatio > 0) {
        skys.forEach((sky) => {
          sky.style.cssText = 'transition:opacity .5s;opacity:0;';
        });
      } else {
        skys.forEach((sky) => {
          sky.style.cssText = 'transition:opacity .5s;opacity:1;';
        });
      }
    }
  });
};

const doubleFullscreenObserver = new IntersectionObserver(
  doubleFullscreenCallback
);

function hideSkyskraper(entry, sky) {
  if (entry.intersectionRatio > 0) {
    // fullscreen is Intersecting
    sky.style.cssText = 'transition:opacity .5s;opacity:0;';
  } else {
    sky.style.cssText = 'transition:opacity .5s;opacity:1;';
  }
}

const fullscreenCallback = (entries) => {
  entries.forEach((entry) => {
    const skyLeft = document.querySelector('.article-skyscraper-left');
    if (skyLeft) {
      hideSkyskraper(entry, skyLeft);
    }
    const skyContainers = document.querySelectorAll('.top-sky-container');
    if (skyContainers) {
      skyContainers.forEach((sky) => {
        hideSkyskraper(entry, sky);
      });
    }
  });
};

const fullscreenObserver = new IntersectionObserver(fullscreenCallback);

function addDoubleFullscreenLayers(bazaarElement, stickyLayerSource) {
  bazaarElement.firstElementChild.insertAdjacentHTML(
    'afterbegin',
    `<iframe src='${stickyLayerSource}' scrolling="no" allowtransparency="true" frameborder="0"></iframe>`
  );
}

function setupDoubleFullscreen(iframe, stickyLayerSource) {
  debug('parallax: Creating double fullscreen', iframe, stickyLayerSource);
  let bazaarElement = iframe.closest('bazaar-ad');
  if (!bazaarElement) {
    return;
  }

  bazaarElement.removeLabel();
  addDoubleFullscreenLayers(bazaarElement, stickyLayerSource);
  styleDoubleFullscreen(bazaarElement);
  unsetRelativeParent(bazaarElement);
  bazaarElement.classList.add('bazaar-parallax-x2');
  doubleFullscreenObserver.observe(bazaarElement.parentElement);

  fullscreenObserver.observe(bazaarElement);
}

function createWaypoint(targetElem, source, data) {
  if (!targetElem || !source || !data) {
    return;
  }

  function createObserver(el, th) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: th,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
  }

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      source.postMessage(
        JSON.stringify({
          callbackId: entry.target.dataset.callbackid,
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          isVisible: entry.isVisible,
        }),
        '*'
      );
    });
  }

  const newWP = document.createElement('span');
  newWP.classList.add('waypoint');
  newWP.style.cssText =
    'display: block;width: 10px;height: 10px;position: absolute;left: 50%;z-index: 10;background-color: rgba(255, 255, 255, 0.5);border-radius: 5px;opacity: 0;';
  newWP.dataset.callbackid = data.eventId;
  newWP.style.top =
    data.threshold <= 1
      ? `${Math.round(data.threshold * 100)}%`
      : `${data.threshold}%`;
  targetElem.appendChild(newWP);
  createObserver(newWP, 0.9);
  debug('parallax: Waypoint created', newWP);
}

function styleParallax(element, extra = {}) {
  element.classList.add('parallax');
  Object.assign(
    element.style,
    {
      zIndex: 1,
      position: 'fixed',
      top: 0,
      left: 0,
      visibility: 'visible',
      width: '100vw',
      height: '100vh',
      'margin-left': '0px',
      'margin-right': '0px',
    },
    extra
  );
}

function setupParallax(iframe) {
  let bazaarElement = iframe.closest('bazaar-ad');
  if (!bazaarElement) {
    return;
  }

  bazaarElement.setAttribute('labeled', 'false');

  if (isArticle) {
    bazaarElement.firstElementChild.classList.add(
      'bazaar-parallax-article-label'
    );
  } else {
    if (window.location.href.indexOf('www.nettavisen.no') > -1) {
      bazaarElement.firstElementChild.classList.add(
        'bazaar-parallax-nettavisen-label'
      );
    } else {
      bazaarElement.firstElementChild.classList.add('bazaar-parallax-label');
      bazaarElement.firstElementChild.classList.add('am-bazaar-ad--labeled');
    }
  }

  debug('parallax: bazaar-ad to create parallax for', bazaarElement);

  styleParallax(bazaarElement, {
    left: 'calc(-50vw + 50%)',
    position: 'relative',
    marginTop: '20px',
  });
  styleIframe(iframe);
  styleIframeWrapper(iframe);
  unsetRelativeParent(bazaarElement);

  fullscreenObserver.observe(bazaarElement);

  // div with ad meta get styled with 100vh with !important, need to hide it make click work
  if (bazaarElement.childElementCount > 1) {
    bazaarElement.lastChild.style.display = 'none';
  }
}

window.addEventListener('message', (evt) => {
  try {
    const targetParallax = document.querySelector('.bazaar-parallax-x2');
    if (!targetParallax) {
      return;
    }
    const payload =
      typeof evt.data === 'object' ? evt.data : JSON.parse(evt.data);
    if (payload.action === 'addWaypoint') {
      createWaypoint(targetParallax, evt.source, payload);
    }
  } catch (e) {
    return;
  }
});

function hidePlacement(iframe) {
  let bazaarElement = iframe.closest('bazaar-ad');
  if (!bazaarElement) {
    return;
  }
  bazaarElement.style.display = 'none';
}

function renderParallax(iframe, type, foregroundUrl) {
  if (window.bazaartag.isTakeoverDisplayed()) {
    debug('parallax: Takeover is displayed, do not display parallax');
    hidePlacement(iframe);
    return;
  }
  if (window.bazaartag.isParallaxFormatDisplayed() && !isNettavisen) {
    debug(
      'parallax: Parallax is already displayed, do not display second parallax'
    );
    hidePlacement(iframe);
    return;
  }
  if (type && type === 'bazaar:parallax:x2') {
    if (
      window.bazaartag.isTopbannerSpecialFormatDisplayed() &&
      !isNettavisen
    ) {
      debug(
        'parallax: Wallpaper or horseshoe is displayed, do not display double parallax'
      );
      hidePlacement(iframe);
      return;
    }
    debug('parallax: Setting up double parallax');
    setupDoubleFullscreen(iframe, foregroundUrl);
  } else {
    debug(
      `parallax: Setting up parallax in iframe [${iframe.getAttribute('id')}]`
    );
    setupParallax(iframe);
  }
  window.bazaartag.setParallaxFormatDisplayed();
}

// default settings
let adId = 'toppbanner-1';
const shadowPlaceholderId = 'shadow-1';
let adImpressionViewable = false;
let moveForward = false;
let isShadowing = false;

let shadowReposition = false;

let shadowRepositionInterval;

// Get an element's distance from the top of the page
let getElemDistance = function (elem) {
  let location = 0;
  if (elem.offsetParent) {
    do {
      location += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }
  return location >= 0 ? location : 0;
};

/**
 * The logic for creating the placeholder container for the ad.
 * This containers height is set as big as the ad, as the ad will be overlapping/put on top of it.
 */
const shadow = (function () {
  const shadowElement = "bazaar-ad[position='shadow']";
  return {
    setUpShadowPlaceholderElement: () => {
      let ad = shadow.getAd();
      if (ad === null) {
        debug('shadow: did not find ad to shadow');
      }
      let shadowPlaceholder = shadow.getShadowPlaceholder();
      if (shadowPlaceholder === null) {
        debug('shadow: did not find shadow placeholder');
      } else {
        shadowPlaceholder.style.display = 'unset';
      }
      if (ad !== null && shadowPlaceholder !== null) {
        debug(
          'shadow: fetching shadow placeholder element',
          shadowPlaceholder
        );
        debug(`shadow: starting shadowing for ${adId}`);
        return shadowPlaceholder;
      }
      return null;
    },
    getShadowPlaceholder() {
      return document.querySelector(shadowElement);
    },
    getAd() {
      return document.querySelector(`bazaar-ad[id='${adId}']`);
    },
  };
})();

/**
 * The logic for moving the elements back and forth is handled here.
 * - moveForward:
 * sets css properties of the ads container: top and z-index
 * The top-property will move the element x-number of pixels,
 * so that the element is overlapping the placeholder container.
 *
 * - moveBack:
 * clears the css properties which in turn will move the ad back to its original place
 */
const positioning = (function () {
  return {
    moveForward: () => {
      let ad = shadow.getAd();

      ad.parentNode.style.height = ad.style.height;

      let shadowPlaceholder = shadow.getShadowPlaceholder();

      let rect = shadowPlaceholder.getBoundingClientRect();
      let rect2 = ad.getBoundingClientRect();

      if (rect2.top < rect.top + 20 && rect2.top > rect.top - 20) {
        // log.debug('shadow: position already calculated for shadow element, returning');
        return;
      }

      let height = `${ad.parentNode.clientHeight + 40}px`;

      shadowPlaceholder.style.height = height;

      rect = shadowPlaceholder.getBoundingClientRect();

      let ypos = getElemDistance(shadowPlaceholder);

      ad.style.top = `${ypos}px`;
      ad.style.zIndex = 2;

      rect2 = ad.getBoundingClientRect();

      // fine tune position
      while (rect2.top > rect.top + 20) {
        ypos -= 10;
        ad.style.top = `${ypos}px`;
        rect2 = ad.getBoundingClientRect();
      }
    },

    moveBack: () => {
      let ad = shadow.getAd();
      ad.parentNode.style.height = ad.style.height;
      ad.style.top = '';
      ad.style.zIndex = 0;
    },
  };
})();

function checkShouldReposition(entry) {
  if (entry.intersectionRatio === 0) {
    shadowReposition = false;
  } else if (entry.intersectionRatio > 0) {
    shadowReposition = true;
  }
}

/**
 * The heart of shadow placement, the callback handling how the logic is handled.
 * The callback handles logic when:
 * - the shadow placeholder is in viewport
 * - scrolling down into the placeholder -> move ad from original position to overlay placeholder
 * - scrolling up from the placeholder   -> move ad from placeholder to its original position
 * - exiting shadow and cleaning up when inscreen of ad as been accomplished
 * @param entries
 * @param observer
 */
const callback = (entries) => {
  if (!window.bazaartag.isDoShadowing()) {
    debug('shadow: stop shadowing element');
    exitShadowing();
    return;
  }
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0 && !adImpressionViewable) {
      moveForward = true;
      debug(
        'shadow: shadow placeholder in viewport, no inscreen, move shadowed ad to shadow placeholder'
      );
    } else if (entry.intersectionRatio === 0 && !adImpressionViewable) {
      if (moveForward) {
        moveForward = false;
        debug(
          'shadow: shadow placeholder not in viewport, no inscreen, move shadowed ad back to original position'
        );
        positioning.moveBack();
      }
    } else if (
      (entry.intersectionRatio === 0 || !moveForward) &&
      adImpressionViewable
    ) {
      let shadowDOMElement = shadow.getShadowPlaceholder();
      let rect = shadowDOMElement.getBoundingClientRect();
      // Move up if scroll up
      if (rect.top > 0) {
        exitShadowing();
      } // leave in place if scroll down to prevent jumping
    }
    checkShouldReposition(entry);
  });
};

const observer = new IntersectionObserver(callback);

function doReposition() {
  shadowRepositionInterval = setInterval(() => {
    if (shadowReposition) {
      if (moveForward) {
        positioning.moveForward();
      }
    }
  }, 1000);
}

const startObserver = (target) => {
  if (target !== null && target !== undefined) {
    doReposition();

    observer.observe(target);
    debug('shadow: start observing shadow element', target);
  } else {
    debug('shadow: could not observe shadow element');
  }
};

const stopObserver = (target) => {
  if (target !== null && target !== undefined) {
    debug(`shadow: stop observing shadow ${adId}`);
    observer.disconnect();
  }
};

const exitShadowing = () => {
  clearInterval(shadowRepositionInterval);
  moveForward = false;
  let shadowPlaceholder = shadow.getShadowPlaceholder();
  stopObserver(shadowPlaceholder);
  positioning.moveBack();
  shadowPlaceholder.style.height = '0px';
  isShadowing = false;
  debug(
    'shadow: inscreen, finish shadow, shadowed ad moved back to original position'
  );
};

window.addEventListener('message', (evt) => {
  if (
    evt.data.type !== undefined &&
    (evt.data.type.indexOf('wallpaper') !== -1 ||
      evt.data.type.indexOf('hestesko') !== -1)
  ) {
    window.bazaartag.setTopbannerSpecialFormatDisplayed();
    debug(`shadow: shouldn't shadow ${evt.data.type}`);
    if (isShadowing) {
      const shadowPlaceholder = shadow.getShadowPlaceholder();
      if (shadowPlaceholder !== null) {
        exitShadowing();
      }
    }
  }
});

const startShadow = (id) => {
  if (id === shadowPlaceholderId || id === adId) {
    if (!window.bazaartag.isDoShadowing()) {
      debug("shadow: shouldn't shadow elements on page");
      return;
    }

    if (adImpressionViewable) {
      debug(`shadow: ${adId} is already inscreen, aborting shadowing`);
      return;
    }

    const shadowPlaceholder = shadow.setUpShadowPlaceholderElement();
    if (shadowPlaceholder !== null) {
      startObserver(shadowPlaceholder);
      isShadowing = true;
    }
  }
};

const stopShadow = (position) => {
  if (position === adId) {
    debug(`shadow: shadowed ad ${adId} got inscreen`);
    adImpressionViewable = true;
    isShadowing = false;
  }
};

const styleBazaarAd = function () {};

// @ts-nocheck

const styleElement = function (element, styles) {
  Object.assign(element.style, styles);
};

const placeOrRemove = function () {
  const skys = document.querySelectorAll(
    "bazaar-ad[position='skyskraper'][class*='am-bazaar-ad lp_skyskraper']"
  );
  if (skys === null || skys.length < 1) {
    return;
  }
  const isfrontpage =
    skys[0].parentElement.hasAttribute('data-isfrontpage') &&
    skys[0].parentElement.getAttribute('data-isfrontpage') === 'true';
  if (!isfrontpage) {
    debug('On articlepage, adjusting skyskraper height');
    const stickyContainerArea = skys[0].parentElement.parentElement;
    styleElement(stickyContainerArea, { top: '0', bottom: '0' });
  }
  skys.forEach((sky) => sky.enable());
};

const moveToTop = function () {
  const skyContainer = document.getElementsByClassName(
    'skyscraper-ads-container'
  )[0];
  const skyContainerLeft = document.getElementsByClassName(
    'skyscraper-ads-container-left'
  )[0];

  if (skyContainer) {
    skyContainer.style.top = 0;
  }

  if (skyContainerLeft) {
    skyContainerLeft.style.top = 0;
  }
};

const refreshInterval = (isNative) =>
  window.location.href.indexOf('fastRefresh=true') !== -1
    ? 5000
    : isNative
    ? 60000
    : 30000;
const isRefreshDisabled = () =>
  window.location.href.indexOf('refresh=false') !== -1;

const isDeathPages = () =>
  decodeURIComponent(window.location.href).indexOf('/vis/dødsannonser') > -1 ||
  decodeURIComponent(window.location.href).indexOf('/vis/dodsannonser') > -1;

let refreshTimeouts = [];

/**
 *  Get the position by parsing the ad unit path in the slot.
 *  NB! Requires the path structure not to change.
 */
const getPositionFromSlot = (slot) => slot.getAdUnitPath().split('/')[3];

const moveSkyskraperPosition = (event) => {
  const isRegularToppbanner = event.size[0] !== 1000;
  if (isRegularToppbanner) {
    debug('Regular toppbanner detected, moving skyskraper to the top');
    moveToTop();
  }
};

const impressionViewable = () => {
  window.bazaartag.addEventListener('impressionViewable', (event) => {
    debug(
      `event: impressionViewable ${event.slot.getSlotElementId()}`,
      event
    );
    const bazaarTagId = event.slot.getSlotElementId().replace('ad-', '');
    debug(`Impression viewable ${bazaarTagId} @${elapsed()}ms`);
    stopShadow(bazaarTagId);

    if (!event.isEmpty && window.location.href.indexOf('showads=true') !== -1) {
      window.dispatchEvent(
        new CustomEvent('visualAds-impressionViewable', {
          detail: {
            id: bazaarTagId,
            info: event.slot.getResponseInformation(),
          },
        })
      );
    }
  });
};

function getTargeting(slot) {
  return slot
    .getTargetingKeys()
    .map((key) => key + '=' + slot.getTargeting(key));
}

const slotOnLoad = () => {
  window.bazaartag.addEventListener('slotOnload', (event) => {
    debug(`event: slotOnload ${event.slot.getSlotElementId()}`, event);
    debug(
      `event: slotOnload targeting ${event.slot.getSlotElementId()} `,
      getTargeting(event.slot)
    );
    const bazaarTagId = event.slot.getSlotElementId().replace('ad-', '');
    debug(`Impression download ${bazaarTagId} @${elapsed()}ms`);
    styleBazaarAd(event.slot.getSlotElementId());

    let element = document.getElementById(bazaarTagId);
    if (element) {
      element.style.minHeight = '0px';
    }
    if (!event.isEmpty && window.location.href.indexOf('showads=true') !== -1) {
      window.dispatchEvent(
        new CustomEvent('visualAds-slotOnload', {
          detail: {
            id: bazaarTagId,
            info: event.slot.getResponseInformation(),
          },
        })
      );
    }
  });
};

const createLogMeta = (bazaarAdTag, itemprop, content) => {
  const meta = document.createElement('meta');
  meta.setAttribute('itemprop', itemprop);
  meta.setAttribute('content', content);
  insertAfter(meta, bazaarAdTag.firstChild);
};

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function isParallax(slotPosition, adIndex, event) {
  return (
    slotPosition === 'midtbanner' &&
    (parseInt(adIndex) === 2 || parseInt(adIndex) === 3) &&
    event.size &&
    ((event.size[0] === 1920 && event.size[1] === 1080) ||
      (event.size[0] === 1 && event.size[1] === 2))
  );
}

const slotRenderEnded = (frontpage) => {
  window.bazaartag.addEventListener('slotRenderEnded', (event) => {
    let slotElementId = event.slot.getSlotElementId();
    window.bazaartag.registerSlot(slotElementId, event.size, event.creativeId);
    debug(`event: slotRenderEnded ${slotElementId}`, event);
    const slotPosition = getPositionFromSlot(event.slot);
    const bazaarTagId = slotElementId.replace('ad-', '');
    const adIndex = bazaarTagId.replace(`${slotPosition}-`, '');

    debug(
      `Rendered ${bazaarTagId} ${event.size} Index: ${adIndex} ` +
        `(campaignId:${event.campaignId}, creativeId:${event.creativeId}, ` +
        `lineItemId:${event.lineItemId}, isEmpty:${event.isEmpty}) ` +
        `advertiserId:${event.advertiserId} size: ${event.size}` +
        `@${elapsed()}ms - Frontpage: ${frontpage}`
    );

    if (window.location.href.indexOf('showads=true') !== -1) {
      window.dispatchEvent(
        new CustomEvent('visualAds-slotRenderEnded', {
          detail: {
            id: bazaarTagId,
            campaignId: event.campaignId,
            isEmpty: event.isEmpty,
          },
        })
      );
    }
    const bazaarAdTag = document.querySelector(
      `bazaar-ad[data-id="${bazaarTagId}"]`
    );

    if (bazaarAdTag && !event.isEmpty) {
      bazaarAdTag.setAttribute('itemscope', '');
      bazaarAdTag.setAttribute('itemtype', 'http://schema.org/WPAdBlock');
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-element#adpType',
        'ad'
      );
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-ad#advertiser',
        event.advertiserId
      );
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-ad#creative',
        event.creativeId
      );
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-ad#lineItem',
        event.lineItemId
      );
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-ad#order',
        event.campaignId
      );
      createLogMeta(bazaarAdTag, 'name', slotPosition);
      createLogMeta(bazaarAdTag, 'position', adIndex);
      createLogMeta(
        bazaarAdTag,
        'https://www.adplogger.no/json-schema/meta-ad#unit',
        'unknown'
      );
    }

    if (frontpage && isParallax(slotPosition, adIndex, event)) {
      renderParallax(bazaarAdTag.getElementsByTagName('iframe')[0]);
    } else if (!frontpage && isParallax(slotPosition, adIndex, event)) {
      debug(
        'parallax: Tried to render parallax on invalid placement, hiding and aborting further rendering'
      );
      bazaarAdTag.style.display = 'none';
      return;
    }

    if (slotPosition === 'skyskraper') {
      let skyskr = document.querySelector(`div[data-id=${slotElementId}]`);
      skyskr.setAttribute('creative-id', event.creativeId);
    }

    if (bazaarTagId.indexOf('takeover') > -1 && !event.isEmpty) {
      displayTakeover(event);
      window.bazaartag.setTakeoverDisplayed();
    }
    if (event.isEmpty) {
      if (bazaarAdTag) {
        debug(`element: ${bazaarTagId} is empty, setting display none`);
        bazaarAdTag.style.display = 'none';
      }
      debug(
        `Rendered ${bazaarTagId} empty, aborting further render logic.`
      );
      return;
    }

    if (!isDeathPages()) {
      placeOrRemove();
    }

    if (slotPosition === 'toppbanner' || slotPosition === 'toppbannerdods') {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      if (!isFirefox) {
        moveSkyskraperPosition(event);
      } else {
        debug('Browser is Firefox, skip moving skyskraper up');
      }
    }
    if (slotPosition === 'skyskraper') {
      const viewportWidthDesktop = 1375;
      window.bazaartag.setTargeting(
        'viewportWidthDesktop',
        window.innerWidth > viewportWidthDesktop ? 'true' : 'false'
      );

      const sky = document.getElementById(bazaarTagId);
      if (!sky) {
        return;
      }
      {
        const iframe = sky.getElementsByTagName('iframe')[0];
        if (!iframe) {
          return;
        }
        if (iframe.width !== '1') {
          sky.style.width = `${iframe.width}px`;
        } else {
          // Skyskraper width from prebid
          window.pbjs.onEvent('bidWon', (data) => {
            let skyskraperId = sky.getAttribute('id');
            if (data.adUnitCode && data.adUnitCode.indexOf(skyskraperId) > -1) {
              debug(
                `Setting skyskraper ${skyskraperId} width ${data.width}px from Prebid`
              );
              sky.style.width = `${data.width}px`;
            }
          });
        }
      }
    }
    if (event.size && event.size[1] <= 600 && slotPosition === 'midtbanner') {
      addAdvertiserLink(bazaarTagId);
    }
  });
};

function addAdvertiserLink(bazaarTagId) {
  const bazaarAd = document.getElementById(bazaarTagId);
  if (bazaarAd) {
    bazaarAd.setAttribute('advertiser-link', 'display');
  }
}

function shouldUsePreviousSizeMapping(slotElementId) {
  return (
    (isArticle && slotElementId.indexOf('skyskraper') === -1) ||
    slotElementId.indexOf('toppbanner') > -1
  );
}

function shouldRefresh(slotElementId) {
  if (isRefreshDisabled()) {
    debug('Refresh: refresh is disabled');
    return false;
  }
  if (window.bazaartag.isNative(slotElementId)) {
    debug(`Refresh: ${slotElementId} is Native, do not refresh`);
    return false;
  }
  if (
    slotElementId.indexOf('toppbanner') > -1 &&
    window.bazaartag.isTopbannerSpecialFormatDisplayed()
  ) {
    debug(
      'Refresh: do not refresh toppbanner when special format is displayed'
    );
    return false;
  }
  if (
    slotElementId.indexOf('toppbannerfm') > -1 ||
    slotElementId.indexOf('midtbannerfm') > -1
  ) {
    debug('Refresh: do not refresh fm placements');
    return false;
  }
  if (slotElementId.indexOf('sponsorbanner') > -1) {
    debug('Refresh: do not refresh sponsorbanner placements');
    return false;
  }
  if (slotElementId.indexOf('takeover') > -1) {
    debug('Refresh: do not refresh takeover');
    return false;
  }
  return true;
}

function clearRefreshTimeout(slotElementId) {
  if (refreshTimeouts[slotElementId]) {
    let timeoutId = refreshTimeouts[slotElementId];
    window.clearTimeout(timeoutId);
    refreshTimeouts[slotElementId] = undefined;
    debug('Refresh: Removed refresh for', slotElementId, timeoutId);
  }
}

function setRefreshTimeout(slotElementId) {
  if (shouldRefresh(slotElementId) && !refreshTimeouts[slotElementId]) {
    const isNative = window.bazaartag.isNative(slotElementId);
    const intervalForRefresh = refreshInterval(isNative);
    const prebidAdunit = getAdunit(slotElementId);
    const shouldUsePreviousSize = shouldUsePreviousSizeMapping(slotElementId); //Avoid ad-jumping/page-shifting
    const shouldDoPrebid = !shouldUsePreviousSize && prebidAdunit != null; //To avoid prebid 1x1 (will create ad-jumping/page-shifting), do not use prebid when using previous size when refreshing
    const refreshLog = `Refresh: doRefresh for ${slotElementId}, shouldUsePreviousSize=${shouldUsePreviousSize}, RefreshInterval=${intervalForRefresh}, DoPrebid=${shouldDoPrebid}, isNative=${isNative}`;

    debug(refreshLog);

    const timeoutId = window.setTimeout(() => {
      window.bazaartag.clearParallaxFormatDisplayed();
      debug(refreshLog);
      if (shouldDoPrebid) {
        debug(
          `Refresh: doing prebid request before refreshing ${slotElementId}`,
          prebidAdunit
        );
        addDelayedDisplay(() => {
          debug(`Refresh: called delayed refresh on ${slotElementId}`);
          window.bazaartag.refresh(slotElementId, false, true);
        }, slotElementId.replace('ad-', ''));
        requestBids([prebidAdunit], true);
      } else {
        debug(`Refresh: no prebid before refreshing ${slotElementId}`);
        window.bazaartag.refreshWithPreviousSize(slotElementId);
      }
      refreshTimeouts[slotElementId] = undefined;
    }, intervalForRefresh);

    refreshTimeouts[slotElementId] = timeoutId;
    debug(
      'Refresh: Added refresh for',
      slotElementId,
      timeoutId,
      intervalForRefresh
    );
  } else {
    removedDelayedDisplay(slotElementId.replace('ad-', ''));
  }
}

const slotVisibilityChanged = () => {
  window.bazaartag.addEventListener('slotVisibilityChanged', (event) => {
    let slotElementId = event.slot.getSlotElementId();
    debug(`event: slotVisibilityChanged ${slotElementId}`, event);
    const bazaarTagId = slotElementId.replace('ad-', '');
    if (event.inViewPercentage === 0) {
      debug(
        `Visibility changed ${bazaarTagId} - ${
          event.inViewPercentage
        }% - @${elapsed()}ms`
      );
    }
    if (event.inViewPercentage >= 50) {
      setRefreshTimeout(slotElementId);
    } else {
      clearRefreshTimeout(slotElementId);
    }
    if (window.location.href.indexOf('showads=true') !== -1) {
      window.dispatchEvent(
        new CustomEvent('visualAds-slotVisibilityChanged', {
          detail: {
            id: bazaarTagId,
            inViewPercentage: event.inViewPercentage,
            elapsed: elapsed(),
          },
        })
      );
    }
  });
};

let elements = [];
let observers = {};
let lazyloadData = {};

/**
 *  Creates an interaction observer with a threshold value
 *  Uses the threshold as a key for saving the interaction observer
 *  @param: integer for px used for threshold
 */
const createObserver = (threshold) => {
  debug('create lazyload observer');
  const observer = new IntersectionObserver(
    (entries) => {
      function logEntry(domElement) {
        const position = domElement.getAttribute('position');
        if (position != null) {
          debug(
            `Lazyload triggered on bazaar-ad position=${position}, with threshold=${threshold}`
          );
        } else {
          debug(
            `Lazyload triggered on an unknown dom element with threshold=${threshold}`
          );
        }
      }

      entries.forEach((entry) => {
        const index = elements.indexOf(entry.target);

        let renderElement =
          index !== -1 && (entry.isIntersecting || entry.intersectionRatio > 0);

        if (renderElement) {
          window.requestAnimationFrame(entry.target.render.bind(entry.target));
          logEntry(entry.target);
          observer.unobserve(entry.target);
          elements.splice(index, 1);
        }
      });
    },
    {
      rootMargin: threshold,
    }
  );

  observers[threshold] = observer;
  return observer;
};

const handleThreshold = (element, threshold) => {
  const observer = observers[threshold] || createObserver(threshold);
  if (
    window.performance &&
    window.performance.navigation.type &&
    window.performance.navigation.type === 2
  ) {
    debug('back navigation detected, freezing ads', element);
    setTimeout(() => {
      window.addEventListener(
        'scroll',
        () => {
          debug('scroll detected, unfreezing ads', element);
          if (elements.indexOf(element) === -1) {
            if (element.classList.contains('frozen')) {
              element.classList.remove('frozen');
            }
            elements.push(element);
            observer.observe(element);
          }
        },
        { once: true }
      );
    }, 1000);
  } else if (elements.indexOf(element) === -1) {
    debug('no back navigation detected, loading ad');
    elements.push(element);
    observer.observe(element);
  }
};

function getThreshold(position) {
  if (position === undefined) {
    position = '';
  }
  switch (position) {
    case 'toppbanner':
      return lazyloadData.toppbanner;
    case 'midtbanner':
      return lazyloadData.midtbanner;
    case 'netboard':
      return lazyloadData.netboard;
    case 'artikkelboard':
      return lazyloadData.artikkelboard;
    case 'skyskraper':
      return lazyloadData.skyskraper;
    default:
      return 0;
  }
}

/**
 *  Reads the lazyload threshold values from the config
 *  @param: config
 */
const initLazyloadConfig = (config) => {
  if (isMobile()) {
    lazyloadData = {
      toppbanner: config.mobileToppbanner,
      midtbanner: config.mobileMidtbanner,
      netboard: config.mobileNetboard,
    };
  } else {
    lazyloadData = {
      toppbanner: config.desktopToppbanner,
      midtbanner: config.desktopMidtbanner,
      netboard: config.desktopNetboard,
    };
  }
  lazyloadData.artikkelboard = config.desktopArtikkelboard;
  lazyloadData.skyskraper = config.desktopSkyskraper;
  debug('lazyload: threshold values', lazyloadData);
};

function _typeof(t) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        })(t);
}

const sourcepoint = function () {
  var t,
    e,
    o = [],
    n = window,
    r = n;
  for (; r; ) {
    try {
      if (r.frames.__tcfapiLocator) {
        t = r;
        break;
      }
    } catch (t) {}
    if (r === n.top) break;
    r = r.parent;
  }
  t ||
    (!(function t() {
      var e = n.document,
        o = !!n.frames.__tcfapiLocator;
      if (!o)
        if (e.body) {
          var r = e.createElement('iframe');
          (r.style.cssText = 'display:none'),
            (r.name = '__tcfapiLocator'),
            e.body.appendChild(r);
        } else setTimeout(t, 5);
      return !o;
    })(),
    (n.__tcfapi = function () {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      if (!n.length) return o;
      'setGdprApplies' === n[0]
        ? n.length > 3 &&
          2 === parseInt(n[1], 10) &&
          'boolean' == typeof n[3] &&
          ((e = n[3]), 'function' == typeof n[2] && n[2]('set', !0))
        : 'ping' === n[0]
        ? 'function' == typeof n[2] &&
          n[2]({
            gdprApplies: e,
            cmpLoaded: !1,
            cmpStatus: 'stub',
          })
        : o.push(n);
    }),
    n.addEventListener(
      'message',
      function (t) {
        var e = 'string' == typeof t.data,
          o = {};
        if (e)
          try {
            o = JSON.parse(t.data);
          } catch (t) {}
        else o = t.data;
        var n = 'object' === _typeof(o) && null !== o ? o.__tcfapiCall : null;
        n &&
          window.__tcfapi(
            n.command,
            n.version,
            function (o, r) {
              var a = {
                __tcfapiReturn: {
                  returnValue: o,
                  success: r,
                  callId: n.callId,
                },
              };
              t &&
                t.source &&
                t.source.postMessage &&
                t.source.postMessage(e ? JSON.stringify(a) : a, '*');
            },
            n.parameter
          );
      },
      !1
    ));
};

const BASE_ENDPOINT = 'https://cdn.privacy-mgmt.com';

let resolve$1;
let reject;
let spReady;
let messageDialog;
const data = {};

function logConsent(value) {
  if (!messageDialog) {
    debug('Cannot select CMP dialog');
    return;
  }

  addMetaEvent(messageDialog, 'ClickEvent', {
    type: 'click',
    cssSelector: 'cmp-button', // this does not exists but is required
    coordinateX: 0, // this does not exists but is required
    coordinateY: 0, // this does not exists but is required,
    clickLabel: `cmp-consent`,
    clickValue: value,
  });
}

async function loadCMP(
  userData = { state: {}, attributes: {} },
  enableCMP
) {
  if (spReady) {
    return spReady;
  }

  if (!enableCMP) {
    debug('cmp is not enabled');
    return null;
  }

  const {
    state: { emergencyMode = [] },
    attributes: { uuid: authId = null },
  } = userData;

  // Don't activate cmp if emergencymode aid is active
  if (emergencyMode.includes('aid')) {
    return null;
  }

  sourcepoint();
  window._sp_queue = [];

  let timer = setTimeout(() => {
    timer = false;
    reject(new Error('Sourcepoint timeout'));
  }, 1000);

  spReady = new Promise((r, rj) => {
    resolve$1 = r;
    reject = rj;
  });

  window._sp_ = {
    config: {
      accountId: 1913,
      ...(authId && { authId }),
      baseEndpoint: BASE_ENDPOINT,
      gdpr: {},
      events: {
        onSPPMObjectReady: function () {
          if (!timer) {
            debug('Sourcepoint ready after timeout');
            return;
          }
          if (!window.__tcfapi) {
            return reject('window.__tcfapi is not loaded');
          }
          window.__tcfapi('addEventListener', 2, (tcdata, success) => {
            if (!success) {
              return reject(new Error('Could not get consent data'));
            }
            if (
              tcdata.eventStatus === 'useractioncomplete' ||
              tcdata.eventStatus === 'tcloaded'
            ) {
              data.tcdata = tcdata;
              clearTimeout(timer);
              debug('CMP loaded with data', data);
              resolve$1(data);
              window.__tcfapi(
                'removeEventListener',
                2,
                () => {},
                tcdata.listenerId
              );
            } else if (tcdata.eventStatus === 'cmpuishown') {
              clearTimeout(timer);
              // log this?
            }
          });
        },
        onConsentReady: function (consentUUID, euconsent) {
          data.euconsent = euconsent;
          data.consentUUID = consentUUID;
        },
        onMessageReceiveData: function (message_type, data) {
          const { messageId } = data;
          if (!messageId || message_type !== 'gdpr') {
            return;
          }

          const observer = new MutationObserver((records, observer) => {
            records.forEach((record) => {
              if (record.addedNodes.length > 0) {
                record.addedNodes.forEach((node) => {
                  if (node.id === `sp_message_container_${messageId}`) {
                    messageDialog = node;
                    addMetaElement(messageDialog, 'CallToAction', {
                      contentId: 'cmp-dialog',
                      adpType: 'teaser',
                    });
                    observer.disconnect();
                  }
                });
              }
            });
          });
          observer.observe(document.body, {
            subtree: true,
            childList: true,
          });
        },
        onMessageChoiceSelect: function (message_type, _, choice_type_id) {
          if (message_type !== 'gdpr' || !messageDialog) {
            return;
          }
          switch (choice_type_id) {
            case 11:
              logConsent('accept');
              break;
            case 13:
              logConsent('reject');
              break;
          }
        },
        onPrivacyManagerAction: function (message_type, pmData) {
          if (message_type !== 'gdpr') {
            return;
          }

          if (
            pmData.purposeConsent === 'some' ||
            pmData.vendorConsent === 'some'
          ) {
            logConsent('accept-partial');
            return;
          }
          if (
            pmData.purposeConsent === 'all' &&
            pmData.vendorConsent === 'all'
          ) {
            logConsent('accept');
            return;
          }
          if (
            pmData.purposeConsent === 'all' ||
            pmData.vendorConsent === 'all'
          ) {
            logConsent('accept-partial');
            return;
          }
          logConsent('reject');
        },
        onError: function (message_type, errorCode, errorObject) {
          debug(
            `CMP:[event] onError ${errorCode} ${message_type}`,
            errorObject
          );
          if (!timer) {
            clearTimeout(timer);
          }
          reject(
            new Error(`CMP:[event] Error ${errorCode} ${errorObject.message}`)
          );
        },
      },
    },
  };

  const wrapperMessagingWithoutDetectionScript =
    document.createElement('script');
  wrapperMessagingWithoutDetectionScript.src = `${BASE_ENDPOINT}/unified/wrapperMessagingWithoutDetection.js`;
  document
    .querySelector('head')
    .appendChild(wrapperMessagingWithoutDetectionScript);

  return spReady;
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var userUUID = () => {
  let pageviewIdTag = document.querySelector('meta[name="adpPageviewId"]');
  let pageviewId;
  if (!pageviewIdTag) {
    const tag = document.createElement('meta');
    tag.name = 'adpPageviewId';
    tag.content = v4();
    document.head.appendChild(tag);
    pageviewId = tag.content;
  } else {
    pageviewId = pageviewIdTag.content;
  }

  return pageviewId;
};

let config;

function getBrowser(userAgent, keywords) {
  debug(`targeting: ${userAgent}, keywords: ${keywords}`);
  // To separate articles and frontpage viewings
  let viewTypePostfix =
    keywords !== null && keywords.indexOf('art') > -1 ? ' art' : ' front';
  if (userAgent.toLowerCase().indexOf('firefox') > -1) {
    return `Firefox${viewTypePostfix}`;
  } else if (userAgent.toLowerCase().indexOf('edge') > -1) {
    return `Edge${viewTypePostfix}`;
  } else if (userAgent.toLowerCase().indexOf('chrome') > -1) {
    return `Chrome${viewTypePostfix}`;
  } else if (userAgent.toLowerCase().indexOf('safari') > -1) {
    return `Safari${viewTypePostfix}`;
  } else if (userAgent.toLowerCase().indexOf('crios') > -1) {
    return `Chrome Mobile${viewTypePostfix}`;
  } else if (userAgent.toLowerCase().indexOf('trident') > -1) {
    return `Internet Explorer${viewTypePostfix}`;
  }
  return '';
}

function setPlussAltTargeting(extraData) {
  const delta = extraData.plussalt_price_delta;
  if (delta !== undefined) {
    const price = parseInt(delta, 10);
    if (isNaN(price)) {
      debug(
        'Plussalt price delta is not a number, targeting aborted',
        delta
      );
    } else {
      debug('Targeting plussalt price delta', delta);
      window.bazaartag.setTargeting('plussalt_price_delta', `${delta > 0}`);
    }
  }
  if (extraData.plussalt_eligible) {
    window.bazaartag.setTargeting(
      'plussalt_eligible',
      `${extraData.plussalt_eligible}`
    );
  }
  if (extraData.plussalt_subscription !== undefined) {
    window.bazaartag.setTargeting(
      'plussalt_sub',
      `${extraData.plussalt_subscription === 'TRUE'}`
    );
  }
}

function setCreditCardTargeting(extraData) {
  const expirationDate = new Date(extraData.cc_expiration_date);
  const now = new Date();
  if (
    now.getFullYear() === expirationDate.getFullYear() &&
    now.getMonth() === expirationDate.getMonth()
  ) {
    window.bazaartag.setTargeting('credit_card', 'expiring');
  } else if (now.getTime() > expirationDate.getTime()) {
    window.bazaartag.setTargeting('credit_card', 'expired');
  }
}

function isUserGroup(extraData, endsWith) {
  for (let i = 0; i < endsWith.length; i += 1) {
    if ((extraData.user_grouping_number - endsWith[i]) % 10 === 0) {
      return true;
    }
  }
  return false;
}

function setUserGroupTargeting(extraData) {
  if (isUserGroup(extraData, [4])) {
    debug(
      `usergroup: user has usergroup ${extraData.user_grouping_number}, add targeting user_group=10%`
    );
    window.bazaartag.setTargeting('user_group', '10%');
  } else if (isUserGroup(extraData, [1, 3, 7, 9])) {
    debug(
      `usergroup: user has usergroup ${extraData.user_grouping_number}, add targeting user_group=40%`
    );
    window.bazaartag.setTargeting('user_group', '40%');
  } else {
    debug(
      `usergroup: user has usergroup ${extraData.user_grouping_number}, add targeting user_group=50%`
    );
    window.bazaartag.setTargeting('user_group', '50%');
  }
}

function setUserDataTargeting(userAccess, browserId, userData) {
  const {
    attributes: { trackingKey, privacyPreferences, extraData },
  } = userData;

  if (userAccess) {
    debug('Targeting aid aktiv');
    window.bazaartag.setTargeting('aid_active', 'aktiv');
  }

  setPlussAltTargeting(extraData);

  debug('setting user group targeting');

  if (extraData.diar_user_key) {
    debug(
      `diar: user has diar_user_key ${extraData.diar_user_key}, adding targeting`
    );
    window.bazaartag.setTargeting('diar_user_key', extraData.diar_user_key);
  }

  if (extraData.user_grouping_number) {
    setUserGroupTargeting(extraData);
  }

  if (extraData.cc_expiration_date) {
    setCreditCardTargeting(extraData);
  }

  debug('Targeting aid innlogget');
  window.bazaartag.setTargeting('aid', 'innlogget');

  if (privacyPreferences && privacyPreferences.personalizedAds) {
    const ppid = trackingKey ? trackingKey.replace(/-/g, '') : '';
    debug('Sending PPID (ukey): ', ppid);
    window.bazaartag.setPublisherProvidedId(ppid);

    debug('Sending a_user_key:', trackingKey);
    window.bazaartag.setTargeting('a_user_key', trackingKey);
  } else {
    window.bazaartag.setRequestNonPersonalizedAds(1);
  }
}

function setNotLoggedInTargeting(browserId) {
  const ppid = browserId ? browserId.replace(/-/g, '') : '';
  debug('Sending PPID (brws): ', ppid);
  window.bazaartag.setPublisherProvidedId(ppid);

  debug('Sending aid: ', 'ikkeinnlogget');
  window.bazaartag.setTargeting('aid', 'ikkeinnlogget');
}

function getSlotKeywords(keywords, index, position) {
  const midtbannerFrontpage =
    position === 'midtbanner' && keywords.indexOf('forsiden') > -1;

  if (midtbannerFrontpage && index === 1) {
    keywords = keywords.concat(['cm']);
  }
  if (midtbannerFrontpage && index === 4) {
    keywords = keywords.concat(['cm2']);
  }
  if (keywords.indexOf('forsiden') > -1) {
    return keywords.concat([`forsiden_${index}`]);
  } else if (keywords.indexOf('art') > -1) {
    return keywords.concat([`art_${index}`]);
  } else if (keywords.indexOf('section') > -1) {
    return keywords.concat([`section_${index}`]);
  }

  return keywords;
}

function getAdnamiKeywords(position) {
  if (position === 'toppbanner') {
    return 'skin';
  }
  if (isMobile()) {
    if (position === 'takeover') {
      return 'topscroll_mobile';
    } else if (position === 'midtbanner') {
      return 'midscroll_mobile,double_midscroll_mobile';
    }
  } else {
    if (position === 'takeover') {
      return 'topscroll_desktop';
    } else if (position === 'midtbanner') {
      return 'midscroll_desktop,double_midscroll_desktop';
    }
  }
  return '';
}

function createSlot(publication, ad) {
  const url = config.slotUrl
    .replace('{publication}', publication)
    .replace('{position}', ad.position);

  if (ad.position !== 'instream' && ad.position !== 'shadow') {
    let slot = createSlot$1({
      url,
      publication,
      id: ad.id,
      slotId: ad.slotId,
      position: ad.position,
      sizeMapping: ad.sizeMapping,
    });
    let slotTargeting = {
      keywords: getSlotKeywords(config.keywords, ad.index, ad.position),
      positionIndex: ad.index,
      position: ad.position,
      threshold: ad.threshold,
      publication,
    };
    slotTargeting.adnami = getAdnamiKeywords(ad.position);

    window.bazaartag.setSlotTargeting(slot, slotTargeting);

    debug(`Created slot with elementId: ${ad.slotId}`, slot);
  } else {
    debug(`Did not create slot for ${ad.position}`);
  }
}

function registerSegments(userData, browserId, publication, ads) {
  let prebidTargeting = {
    keywords: config.keywords,
  };

  // register segments
  if (userData) {
    const {
      attributes: { extraData, privacyPreferences, trackingKey },
    } = userData;
    if (Object.keys(extraData).length !== 0 && extraData.ad_segments) {
      const segments = extraData.ad_segments.split(',');
      window.bazaartag.setTargeting('user_segments', segments);
    }
    prebidTargeting.visitor = {
      age: [`${extraData.age}`],
    };
    prebidTargeting.diarTargeting = {
      kv: [
        { reportingId: [`${extraData.diar_user_key}`] },
        { targetingId: [`${extraData.diar_user_key}`] },
      ],
    };
    if (privacyPreferences && privacyPreferences.personalizedAds) {
      prebidTargeting.a_user_key = trackingKey;
    }
  }

  prebidTargeting.a_brws_id = browserId;
  prebidTargeting.publication = publication;

  initPrebid(ads, prebidTargeting);
}

function initTargeting(userData, browserId, publication, ads, userAccess) {
  try {
    // debug
    debug('initTargeting: About to set audience pixels if applicable');
    debug('initTargeting: userData', userData);
    debug('initTargeting: browserId:', browserId);

    registerSegments(userData, browserId, publication, ads);

    window.bazaartag.cmd.push(() => {
      debug(
        'initTargeting: Completed initial slot creation of ads',
        ads.map((ad) => ad.id)
      );

      impressionViewable();
      slotOnLoad();
      slotRenderEnded(
        config && config.keywords && config.keywords.indexOf('forsiden') > -1
      );
      slotVisibilityChanged();

      window.bazaartag.pauseAdServer();

      window.bazaartag.setTargeting('publication', publication);
      window.bazaartag.setTargeting('keyword', config.keywords);
      if (config.categories.length > 0) {
        window.bazaartag.setTargeting('categories', config.categories);
      }
      window.bazaartag.setTargeting('fritekst', config.keywords);
      window.bazaartag.setTargeting('bazaar', isExtern);

      let userAgent = getBrowser(navigator.userAgent, config.keywords);
      debug(`initTargeting: userAgent=${userAgent}`);
      window.bazaartag.setTargeting('userAgent', userAgent);

      const uuid = userUUID();
      if (uuid) {
        window.bazaartag.setTargeting('pageview_id', uuid);
      }

      if (userData && userData.attributes.trackingKey) {
        setUserDataTargeting(userAccess, browserId, userData);
      } else {
        setNotLoggedInTargeting(browserId);
      }

      debug('initTargeting: Sending a_brws_id:', browserId);
      window.bazaartag.setTargeting('a_brws_id', browserId);

      window.bazaartag.enableServices();
      addLogOverlay();
      setTimeout(() => checkAdsLoaded(), 5000);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 *  Must be called prior to load as it prepares the Google Publisher Tag services for the publication.
 */
function init(data, preparation) {
  debug('Running init');

  config = data;
  const publication = config.publication;
  initLazyloadConfig(config);

  const userAccess =
    getUserAccess(readCookie('daxsub', {})) ||
    false;

  const getUserData = new UserDataRequest()
    .withAttributes(['uuid', 'trackingKey', 'privacyPreferences', 'extraData'])
    .fetch(isDebugEnabled() ? { timeout: 1000 } : undefined);

  const browserIdPromise = getBrowserId();
  const adsPromise = preparation();
  return getUserData
    .then((userData) =>
      Promise.all([
        browserIdPromise,
        adsPromise,
        userData,
        loadCMP(userData, config.enableCMP),
      ])
    )
    .catch((e) => {
      console.error('getUserData failed, init targeting without userdata', e);
      return Promise.all([browserIdPromise, adsPromise]);
    })
    .then(([browserId, ads, userData = null]) => {
      initTargeting(userData, browserId, publication, ads, userAccess);
      return true;
    });
}

function checkAdsLoaded() {
  if (!window.bazaartag.hasLoadedAds()) {
    debug('AdsLoaded: Ads has not been loaded, trigger load');
    window.bazaartag.loadAds();
  } else {
    debug('AdsLoaded: Ads has been loaded');
  }
}

function callDisplayWithPrebid(slotId) {
  const prebidAdunit = getAdunit(slotId);
  if (prebidAdunit) {
    debug(
      `Prebid: ${slotId} was not loaded on startup, do prebid`,
      prebidAdunit
    );
    let delayedDisplayDone = false;
    addDelayedDisplay(() => {
      debug(`Prebid: callDisplayWithPrebid(${slotId})`, prebidAdunit);
      delayedDisplayDone = true;
      window.bazaartag.display(slotId);
    }, slotId.replace('ad-', ''));
    requestBids([prebidAdunit], true);
    setTimeout(() => {
      if (!delayedDisplayDone) {
        debug(
          `Prebid: delayed display for (${slotId}) took to long, calling display`
        );
        window.bazaartag.display(slotId);
      }
    }, 2000);
  } else {
    debug(`Prebid: ${slotId} had no prebid adunit, calling display`);
    window.bazaartag.display(slotId);
  }
}

/**
 *  Loads a slot through Google Publisher Tag.
 */
function load({ position, id, index, slotId }) {
  debug(`RunningLoad: ${position}`);
  try {
    if (position === 'shadow') {
      return {
        id,
        position,
        slotId,
        display: () => startShadow(id, isMobile()),
      };
    }

    const sizeMapping = mapping(position, index, config.keywords);
    if (!sizeMapping) {
      console.error(
        `Error getting size-mapping slot for ${position} id=${id} slotId=${slotId}`
      );
      return false;
    }
    debug(
      `CreateSizeMapping: ${position} id=${id} slotId=${slotId} index=${index} keywords=${config.keywords}`,
      sizeMapping
    );

    const url = config.slotUrl
      .replace('{publication}', config.publication)
      .replace('{position}', position);

    const prebidConfig = {
      url,
      keywords: config.keywords,
    };

    let prebidAdUnit = createAdunit({
      sizeMapping,
      slotId,
      position,
      conf: config,
      prebidConfig,
    });
    let threshold = getThreshold(position);
    let ad = {
      id,
      threshold,
      slotId,
      prebidAdUnit,
      position,
      sizeMapping,
      index,
      display: (element) => {
        if (slotId === 'ad-instream-1') {
          debug('Do not call display for placeholder instream');
          return;
        }
        const slotLoadedOnStartup =
          window.bazaartag.slotLoadedOnStartup(slotId);
        let prebidDone = isPrebidDone();

        debug(
          `Calling display on bazaar-ad ${slotId}. Loaded on startup: ${slotLoadedOnStartup}, Prebid done: ${prebidDone}`,
          element
        );

        window.bazaartag.cmd.push(() => {
          if (slotLoadedOnStartup || !prebidDone) {
            debug(`PageLoading: adding ${slotId} to display queue`);
            callDisplayWhenPrebidDone(() => {
              debug(
                `CallDisplay ${slotId}. Loaded on startup: ${window.bazaartag.slotLoadedOnStartup(
                  slotId
                )}`
              );
              window.bazaartag.display(slotId);
            }, id);
          } else {
            debug(`LazyLoading: calling prebid with display on ${slotId}`);
            callDisplayWithPrebid(slotId);
          }
        });
        startShadow(id);
        setStylingIfNoFetch(id);
      },
    };
    window.bazaartag.cmd.push(() => {
      createSlot(config.publication, ad);
    });
    return ad;
  } catch (e) {
    console.error(
      `Error loading position ${position}, id ${id} slotId ${slotId}`,
      e
    );
    return false;
  }
}

// @ts-nocheck

const store = {};

let resolve;

const disableInstreamPrebid =
  window.location.href.indexOf('instreamPrebid=false') !== -1;

const storeReady = new Promise((_resolve) => {
  resolve = _resolve;
});

/**
 *  Generates a unique id and index with a locking mechanism since it is based on a shared variable in the store.
 */
const generateIdentifier = (position) =>
  new Promise((_resolve) => {
    store.positions[position] = store.positions[position] || {};
    const index = store.positions[position].nextIndex || 1;
    store.positions[position].nextIndex = index + 1;
    const id = `${position}-${index}`;
    const slotId = `ad-${id}`;
    _resolve({ position, id, index, slotId });
  });

/**
 *  Loads an ad by generating a unique id for it, fetching it using the loader and returning the ad.
 */
const loadAd = (position) => generateIdentifier(position).then(load);

/**
 * Loads ads and puts them into the store position prepared list.
 */
const prepareAds = (positions) => {
  if (
    !disableInstreamPrebid &&
    (document.querySelector('amedia-video') ||
      document.querySelector('amedia-smartembed-video') ||
      document.querySelector('brick-player') ||
      window.location.href.indexOf('nettavisen.no') !== -1)
  ) {
    debug('Detected amedia-video, appending instream position');
    positions.push('instream');
  }

  debug('PrepareAds', positions);
  return Promise.all(
    positions.map((position) => {
      store.positions[position] = store.positions[position] || {};
      store.positions[position].prepared =
        store.positions[position].prepared || [];

      return loadAd(position).then((ad) => {
        store.positions[position].prepared.push(ad);
        return ad;
      });
    })
  );
};

/**
 *  Prepares the store by reading the config and loading the ads.
 */

config$2().then((_config) => {
  store.config = _config;
  store.positions = {};

  init(_config, () => prepareAds(store.config.positions))
    .then(() => {
      function isDFPLoaded() {
        if (!window.bazaartag.isReady()) {
          setTimeout(isDFPLoaded, 5);
        } else {
          resolve(store);
        }
      }
      isDFPLoaded();
    });
});

/**
 *  Extracts a prepared ad from the stores prepared list or else returns undefined.
 */
const getPreparedAd = (position) =>
  store.positions[position] && store.positions[position].prepared
    ? store.positions[position].prepared.shift()
    : undefined;

/**
 *  Returns an ad by either getting an ad ready for display or loading a new ad.
 */
const getAd = (position) =>
  storeReady
    .then(() => getPreparedAd(position))
    .then((ad) => ad || loadAd(position));

function getDynamicPosition() {
  return storeReady.then(() => {
    if (
      !store.config.dynamicPositionOrder ||
      !store.config.dynamicPositionOrder.length
    ) {
      return 'missing';
    }
    return store.config.dynamicPositionOrder.shift();
  });
}

const hideLinkUrls = [
  'nettavisen.no',
  'traktor.no',
  'norsklandbruk.no',
  'bondebladet.no',
  'alt.no',
];

function showViseLink() {
  for (let i = 0; i < hideLinkUrls.length; i++) {
    if (window.location.href.indexOf(hideLinkUrls[i]) > -1) {
      debug(`Hide Vise link on ${hideLinkUrls[i]}`);
      return false;
    }
  }
  return true;
}

const shouldShowViseLink = showViseLink();

var viseLink = (appendTo, mobile) => {
  if (shouldShowViseLink) {
    const link = document.createElement('div');
    link.setAttribute('class', 'advertise-link');
    if (mobile) {
      link.innerHTML = `<a href="https://www.vise.no/vis/annonsekjop?adlink=click" class="lp_advertiser_link_logo"><span class="advertise-link-logo">Vise</span> din egen annonse her?</a>`;
    } else {
      link.innerHTML = `<a href="https://www.vise.no/vis/annonsekjop?adlink=click" class="lp_advertiser_link_logo"><span class="advertise-link-logo">Vise</span> din egen annonse her? Prøv vår selvbetjente løsning!</a>`;
    }
    appendTo.appendChild(link);
  }
};

const configWallpaper = {
  width: 1920,
  height: 1020,
  linkHeight: 1000,
  stickyHeight: 1985,
  left: 'calc(50% - (1000px / 2) - 460px)',
  adHeight: '',
};

const configHorseshoe = {
  width: 1360,
  height: 720,
  linkHeight: 700,
  stickyHeight: 1985,
  left: 'calc(50% - (1000px / 2) - 180px)',
  adHeight: '',
};

const dom = {
  createLink(clickUrl, config) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', `${clickUrl}`);
    linkElement.setAttribute('target', '_blank');
    Object.assign(linkElement.style, {
      display: 'block',
      height: `${config.linkHeight}px`,
      left: `${config.left}`,
      position: 'absolute',
      top: '0px',
      width: `${config.width}px`,
    });
    return linkElement;
  },
  styleIframe(element, config) {
    Object.assign(element.style, {
      height: `${config.height}px`,
      left: `${config.left}`,
      width: `${config.width}px`,
    });
  },
  styleAbsoluteContainer(element, config) {
    Object.assign(element.style, {
      top: '0px',
      position: 'absolute',
      width: `${config.width}px`,
    });
    element.style.setProperty(
      'height',
      `${config.stickyHeight}px`,
      'important'
    );
  },
  styleStickyContainer(element, config) {
    Object.assign(element.style, {
      left: `${config.left}`,
      display: 'flex',
      alignItems: 'flex-start',
      position: 'sticky',
      top: '30px',
    });
    element.style.setProperty('height', `${config.height}px`, 'important');
  },
  styleBazaarTagContainer(element, config) {
    Object.assign(element.style, {
      left: `${config.left}`,
      position: 'relative',
      display: 'block',
      height: `${config.adHeight}px`,
      width: `${config.width}px`,
    });
  },
};

const templates = (() => {
  let _absoluteContainer;
  let _stickyContainer;
  let _adContainer;
  let _iframe;

  const initVariables = (bazaarTag) => {
    _adContainer = document.getElementById('ad-toppbanner-1');
    _iframe = _adContainer.querySelector('iframe');
    _stickyContainer = bazaarTag.getElementsByClassName('stickyContainer')[0];
    _absoluteContainer =
      bazaarTag.getElementsByClassName('absoluteContainer')[0];
  };

  const styleContainers = (bazaarTag, config) => {
    dom.styleIframe(_iframe, config);
    dom.styleStickyContainer(_stickyContainer, config);
    dom.styleAbsoluteContainer(_absoluteContainer, config);
    dom.styleBazaarTagContainer(bazaarTag, config);
    bazaarTag.classList.remove('am-bazaar-ad--labeled');
    _stickyContainer.classList.add('am-bazaar-ad--labeled');
  };

  const setAdHeight = (config) => {
    config.adHeight =
      Number(_iframe.height.replace('px', '')) +
      (window.location.href.indexOf('www.nettavisen.no') > -1 ? 0 : 20);
  };

  const createLink = (url, config) => {
    if (_adContainer) {
      _adContainer.appendChild(dom.createLink(url, config));
    }
  };

  const createTemplate = (bazaarTag, config) => {
    initVariables(bazaarTag);
    setAdHeight(config);
    styleContainers(bazaarTag, config);
  };

  return {
    wallpaper: {
      createScriptScript: (data, bazaarTag) => {
        createTemplate(bazaarTag, configWallpaper);
      },
      createScriptImg: (data, bazaarTag) => {
        createTemplate(bazaarTag, configWallpaper);
        createLink(data.clickUrl, configWallpaper);
        const advertiserIsAdform =
          data.advertiser !== undefined && data.advertiser === 'adform';
        if (advertiserIsAdform) {
          _adContainer.style.paddingLeft = '0px';
        } else {
          _adContainer.style.paddingLeft = '460px';
        }
        if (data.background) {
          _stickyContainer.style.background = `url(${data.background.img}) 0px 0px no-repeat`;
        }
      },
      createImgImg: (data, bazaarTag) => {
        createTemplate(bazaarTag, configWallpaper);
        createLink(data.clickUrl, configWallpaper);
        if (data.top) {
          _adContainer.style.background = `url(${data.top.img}) 460px 0px no-repeat`;
        }
        if (data.background) {
          _stickyContainer.style.background = `url(${data.background.img}) 0px 0px no-repeat`;
        }
      },
    },
    horseshoe: {
      createScriptScript: (data, bazaarTag) => {
        createTemplate(bazaarTag, configHorseshoe);
      },
      createImgImg: (data, bazaarTag) => {
        createTemplate(bazaarTag, configHorseshoe);
        createLink(data.clickUrl, configHorseshoe);
        if (data.top && data.left && data.left) {
          // LEFT AD
          const leftImg = document.createElement('div');
          Object.assign(leftImg.style, {
            order: 1,
            background: `url(${data.left.img}) 0px 0px no-repeat`,
          });
          leftImg.style.setProperty(
            'width',
            `${data.left.width}px`,
            'important'
          );
          leftImg.style.setProperty(
            'height',
            `${data.left.height}px`,
            'important'
          );

          // RIGHT AD
          const rightImg = document.createElement('div');
          Object.assign(rightImg.style, {
            order: 3,
            background: `url(${data.right.img}) 0px 0px no-repeat`,
          });
          rightImg.style.setProperty(
            'width',
            `${data.right.width}px`,
            'important'
          );
          rightImg.style.setProperty(
            'height',
            `${data.right.height}px`,
            'important'
          );

          // TOPPBANNER STYLING
          _adContainer.style.background = `url(${data.top.img}) 0px 0px no-repeat`;
          _adContainer.style.order = 2;
          _adContainer.style.setProperty(
            'width',
            `${data.top.width}px`,
            'important'
          );

          // ADD CHILDREN TO FLEX CONTAINER
          _stickyContainer.appendChild(leftImg);
          _stickyContainer.appendChild(rightImg);

          // PARENT STYLING
          const totalWidth =
            data.left.width + data.top.width + data.right.width;
          _absoluteContainer.style.width = `${totalWidth}px`;
        }
      },
    },
  };
})();

const wallpaper = templates.wallpaper;
const horseshoe = templates.horseshoe;

const createWallpaper = (data, template) => {
  let topbanner = document.querySelector('bazaar-ad[position="toppbanner"]');
  if (topbanner == null) {
    //Used for preview screenshots in google-admanager-api
    topbanner = document.querySelector('div.toppbanner');
  }
  const frontpage = document.querySelector('amedia-frontpage');
  if (topbanner === null || !topbanner.querySelector('iframe')) {
    return;
  }
  if (window.bazaartag.isTakeoverDisplayed() && !isNettavisen) {
    debug(
      'Takeover is displayed, do not display wallpaper, hide adunit',
      topbanner
    );
    topbanner.style.display = 'none';
    return;
  }
  if (frontpage) {
    frontpage.classList.add('wallpaper');
  }
  topbanner.classList.add('wallpaper');
  template(data, topbanner);

  window.bazaartag.setTopbannerSpecialFormatDisplayed();
};

window.addEventListener('message', (evt) => {
  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:wallpaper_img_img'
  ) {
    debug('Wallpaper with two images ready: ', evt.data);
    createWallpaper(evt.data, wallpaper.createImgImg);
  }

  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:wallpaper_script_img'
  ) {
    debug('Wallpaper with script and image ready: ', evt.data);
    createWallpaper(evt.data, wallpaper.createScriptImg);
  }

  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:wallpaper_script_script'
  ) {
    debug('Wallpaper with two scripts ready: ', evt.data);
    createWallpaper(evt.data, wallpaper.createScriptScript);
  }
});

window.addEventListener('externalSitesWallpaper', (evt) => {
  if (
    evt.detail !== undefined &&
    evt.detail.type !== undefined &&
    evt.detail.type === 'bazaar:wallpaper_img_img'
  ) {
    debug(
      'External sites testing wallpaper with two images ready: ',
      evt.detail
    );
    createWallpaper(evt.detail, wallpaper.createImgImg);
  }

  if (
    evt.detail !== undefined &&
    evt.detail.type !== undefined &&
    evt.detail.type === 'bazaar:wallpaper_script_img'
  ) {
    debug(
      'External sites testing wallpaper with script and images ready: ',
      evt.detail
    );
    createWallpaper(evt.detail, wallpaper.createScriptImg);
  }

  if (
    evt.detail !== undefined &&
    evt.detail.type !== undefined &&
    evt.detail.type === 'bazaar:wallpaper_script_script'
  ) {
    debug(
      'External sites testing wallpaper with two script ready: ',
      evt.detail
    );
    createWallpaper(evt.detail, wallpaper.createScriptScript);
  }
});

const createTemplate = (data, template) => {
  let topbanner = document.querySelector('bazaar-ad[position="toppbanner"]');
  if (topbanner == null) {
    //Used for preview screenshots in google-admanager-api
    topbanner = document.querySelector('div.toppbanner');
  }
  const frontpage = document.querySelector('amedia-frontpage');
  if (topbanner === null || !topbanner.querySelector('iframe')) {
    return;
  }
  if (window.bazaartag.isTakeoverDisplayed() && !isNettavisen) {
    debug(
      'Takeover is displayed, do not display horseshoe, hide adunit',
      topbanner
    );
    topbanner.style.display = 'none';
    return;
  }
  if (frontpage) {
    frontpage.classList.add('horseshoe');
  }
  topbanner.classList.add('horseshoe');
  template(data, topbanner);
  window.bazaartag.setTopbannerSpecialFormatDisplayed();
};

window.addEventListener('message', (evt) => {
  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:hestesko_img_img_img'
  ) {
    debug('Horseshoe with two images ready: ', evt.data);
    createTemplate(evt.data, horseshoe.createImgImg);
  }

  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:hestesko_script_script_script'
  ) {
    debug('Horseshoe 3xscript ready: ', evt.data);
    createTemplate(evt.data, horseshoe.createScriptScript);
  }
});

window.addEventListener('externalSitesHorseshoe', (evt) => {
  if (
    evt.detail !== undefined &&
    evt.detail.type !== undefined &&
    evt.detail.type === 'bazaar:hestesko_img_img_img'
  ) {
    debug(
      'External sites testing horseshoe with two images ready: ',
      evt.detail
    );
    createTemplate(evt.detail, horseshoe.createImgImg);
  }
});

window.addEventListener('message', (evt) => {
  if (evt.data.type === 'ADSM_MACRO_UNLOAD') {
    const callingIframe = getCallingIframe$2(evt);
    if (callingIframe) {
      const bazaarElement = callingIframe[0].closest('bazaar-ad');
      const position = bazaarElement.getAttribute('position');
      if (position === 'toppbanner') {
        debug('adnami: toppbanner special format displayed');
        window.bazaartag.setTopbannerSpecialFormatDisplayed();
      } else if (position === 'midtbanner') {
        debug('adnami: parallax format displayed');
        window.bazaartag.setParallaxFormatDisplayed();
      } else if (position === 'takeover') {
        debug('adnami: takeover format displayed');
        window.bazaartag.setTakeoverDisplayed();
      }
    }
  }
});

function getCallingIframe$2(evt) {
  return [].slice
    .call(document.querySelectorAll('iframe'))
    .filter((iframeElement) => iframeElement.contentWindow === evt.source);
}

function getCallingIframe$1(evt) {
  return [].slice
    .call(document.querySelectorAll('iframe'))
    .filter((iframeElement) => iframeElement.contentWindow === evt.source);
}

function eventFromNativeTemplate(evt) {
  return (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:native_video_full_template_ad'
  );
}

function eventFromNativeHeadlineTemplate(evt) {
  return (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:native_with_headline'
  );
}

window.addEventListener('message', (evt) => {
  const iframe = getCallingIframe$1(evt);
  if (!iframe || !iframe[0]) {
    return;
  }

  if (eventFromNativeTemplate(evt) && isMobile()) {
    debug(
      'native: dfp native video full template sent postmessage to bazaar with data: ',
      evt.data
    );
    iframe[0].style.height = evt.data.videoHeight;
    debug(
      `native: calling iframe got style height ${evt.data.videoHeight}`
    );
  }

  if (eventFromNativeHeadlineTemplate(evt)) {
    debug(
      'native: Removing label, dfp native video full headline sent postmessage with data: ',
      evt.data
    );
    const bazaarElement = iframe[0].closest('bazaar-ad');
    bazaarElement.removeLabel();
  }
});

function getCallingIframe(evt) {
  return [].slice
    .call(document.querySelectorAll('iframe'))
    .filter((iframeElement) => iframeElement.contentWindow === evt.source);
}

window.addEventListener('message', (evt) => {
  // IMAGE OR SCRIPT TEMPLATE
  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    (evt.data.type === 'bazaar:parallax' ||
      evt.data.type === 'bazaar:parallax:x2' ||
      evt.data.type === 'bazaar:parallax-script')
  ) {
    debug(`Got parallax event: ${evt.data.type}`);
    const iframe = getCallingIframe(evt);
    if (!iframe[0]) {
      return;
    }
    let foregroundUrl = evt.data.foreground_url || undefined;
    renderParallax(iframe[0], evt.data.type, foregroundUrl);
  }
});

window.addEventListener('message', (evt) => {
  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:prebid-native'
  ) {
    debug('Prebid native: received data', evt.data);
    const contentDiv = document.querySelector(`div[id=${evt.data.positionId}]`);
    let bazaarElement = contentDiv.closest('bazaar-ad');
    bazaarElement.removeLabel();
    let divToHide = contentDiv.querySelector(
      `div[id=div_utif_${evt.data.positionId}]`
    );
    divToHide.style.display = 'none';
  }
});

const templateScript = (adId) => {
  let s = `var w = window; for (i = 0; i < 10; i++) { w = w.parent; if (w.pbjs) { try { w.pbjs.renderAd(document, '${adId}'); break; } catch (e) { continue; } } }`;
  let scriptElement = document.createElement('script');
  scriptElement.innerHTML = s;
  return scriptElement;
};

window.addEventListener('message', (evt) => {
  if (
    evt.data !== undefined &&
    evt.data.type !== undefined &&
    evt.data.type === 'bazaar:prebid-video'
  ) {
    debug('Prebid native: received data', evt.data);
    const contentDiv = document.querySelector(`div[id=${evt.data.positionId}]`);
    let script = templateScript(evt.data.adId);
    let divToHide = contentDiv.querySelector(
      `div[id=div_utif_${evt.data.positionId}]`
    );
    divToHide.style.display = 'none';
    contentDiv.appendChild(script);
  }
});

const cssLabel = 'am-bazaar-ad--labeled';
const cssNoLabel = 'am-bazaar-ad--nolabel';

const minHeightPositions = [
  'toppbanner',
  'midtbanner',
  'netboard',
  'netboardsmb',
  'midtbannersmb',
];

class bazaarAdGPT extends HTMLElement {
  render() {
    if (this.isDisabled()) {
      return;
    }

    this.ad.then((ad) => {
      this.removeLoadSpinner();
      if (this.isAdRendered()) {
        debug(`ElementId: ${ad.id} is already rendered, aborting render`);
        return;
      }
      if (ad) {
        debug(
          `ElementId: ${ad.id} is in viewport, attached elementId to element in DOM`
        );

        // this is for external sites trying to show skyskraper on narrower viewports
        const viewWidth = Math.min(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        if (ad.id === 'skyskraper-1' && viewWidth < 1375) {
          debug(
            'Tried to display skyskraper in viewport under 1375px, do not display'
          );
          return;
        }

        if (
          this.hasAttribute('labeled') &&
          this.getAttribute('labeled') === 'true'
        ) {
          this.addLabel();
        }
        this.setId(ad);
        ad.display(this);
        this.adRendered = true;
        document.dispatchEvent(
          new CustomEvent('bazaar:logViewportData', {
            detail: this,
          })
        );
      }
    });
  }

  addAdvertiserLink() {
    viseLink(this, isMobile());
  }

  isAdRendered() {
    return this.adRendered;
  }

  getPosition() {
    this.position = this.getAttribute('position');
    if (this.position === 'dynamic') {
      return getDynamicPosition().then((position) => {
        this.position = position;
        if (position === 'missing') {
          this.disable();
          this.remove();
        }
      });
    }
    return Promise.resolve();
  }

  create() {
    if (this.isCreated) {
      return Promise.resolve();
    }
    this.isCreated = true;

    this.adRendered = false;
    return this.getPosition().then(() => {
      if (window.location.href.indexOf('nettavisen.no') !== -1) {
        if (
          window.performance &&
          window.performance.navigation.type &&
          window.performance.navigation.type === 2
        ) {
          this.classList.add('frozen');
        } else {
          this.setMinHeightForElement();
          if (this.classList.contains('frozen')) {
            this.classList.remove('frozen');
          }
        }
      } else {
        this.setMinHeightForElement();
      }
      while (this.hasChildNodes()) {
        this.removeChild(this.firstChild);
      }

      this.createAdContainer();
    });
  }

  connectedCallback() {
    if (this.connected === true) {
      return;
    }
    this.connected = true;
    this.create().then(() => this.init());
  }

  remove() {
    debug('Removing bazaar-ad element', this);
    this.parentNode.removeChild(this);
  }

  // registerElement fallback
  attachedCallback() {
    if (this.connected === true) {
      return;
    }
    this.connected = true;
    this.create().then(() => this.init());
  }

  init() {
    if (!this.isCreated) {
      this.create().then(() => this.init());
      return;
    }
    if (this.isDisabled()) {
      return;
    }

    debug(`InitAd: ${this.position}`);
    this.ad = getAd(this.position);
    const element = this;
    let thresholdValue = '0px';
    this.ad.then((ad) => {
      this.setDataId(ad);
      if (ad.threshold) {
        thresholdValue = `${ad.threshold}px`;
      }
      handleThreshold(element, thresholdValue);
    });

    if (window.location.href.indexOf('nettavisen.no') !== -1) {
      if (
        window.performance &&
        window.performance.navigation.type &&
        window.performance.navigation.type !== 2
      ) {
        this.addLoadSpinner();
      }
    } else {
      this.addLoadSpinner();
    }
  }

  addLoadSpinner() {
    const addSpinnerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && !this.spinnerRemoved) {
          if (this.position !== 'shadow' && this.position !== 'takeover') {
            debug(`Adding load spinner for ${this.position}`);
            this.bazaarSpinner = document.createElement('div');
            this.bazaarSpinner.setAttribute('class', 'bazaarSpinnerContainer');
            this.bazaarSpinner.innerHTML =
              '<bazaar-amedia-spinner><span><span class="dots"></span></span></bazaar-amedia-spinner>';
            this.appendChild(this.bazaarSpinner);
          }
        }
        addSpinnerObserver.disconnect();
      });
    });
    addSpinnerObserver.observe(this);
  }

  removeLoadSpinner() {
    if (this.bazaarSpinner !== undefined) {
      this.removeChild(this.bazaarSpinner);
    }
    this.spinnerRemoved = true;
  }
  /**
   * Defines attributes this element observes. Allows us to hook into
   * attributeChangedCallback for the specified attributes.
   */
  static get observedAttributes() {
    return ['disabled', 'labeled', 'advertiser-link'];
  }

  setMinHeightForElement() {
    if (minHeightPositions.indexOf(this.position) !== -1) {
      this.setMinHeight(this.position);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'disabled' && !this.hasAttribute('disabled')) {
      this.init();
    }
    if (attr === 'labeled' && this.hasAttribute('labeled')) {
      if (newValue === 'true' || newValue === true) {
        this.addLabel();
      }
      if (newValue === 'false' || newValue === false) {
        this.removeLabel();
      }
    }
    if (attr === 'advertiser-link' && !oldValue && newValue === 'display') {
      this.addAdvertiserLink();
    }
  }

  /**
   *  Sets id-attribute on both bazaar-tag and on ad-container
   */
  setId(ad) {
    this.adContainer.setAttribute('id', ad.slotId);
    this.setAttribute('id', ad.id);
  }

  setDataId(ad) {
    this.adContainer.setAttribute('data-id', ad.slotId);
    this.setAttribute('data-id', ad.id);
    addAdObject(ad.id);
  }

  /**
   *  Removes the 'annonse'-label from the ad
   */
  removeLabel() {
    this.classList.remove(cssLabel);
    this.classList.add(cssNoLabel);
  }

  /**
   *  Adds the 'annonse'-label to the ad
   */
  addLabel() {
    this.classList.add(cssLabel);
    this.classList.remove(cssNoLabel);
  }

  /**
   * Checks if element is disabled
   */
  isDisabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * Disabling element
   */
  disable() {
    if (this && !this.isDisabled()) {
      this.setAttribute('disabled', 'disabled');
    }
  }

  enable() {
    if (this && this.isDisabled()) {
      this.removeAttribute('disabled');
    }
  }

  /**
   *  Sets the default min-height for ad based on the ad-position.
   */
  setMinHeight(position) {
    let sizeMapping = mapping(position);
    if (!sizeMapping) {
      return;
    }

    const DESKTOP_BREAKPOINT = 1200;
    const minHeight =
      window.screen.width > DESKTOP_BREAKPOINT
        ? sizeMapping.minHeight.desktop
        : sizeMapping.minHeight.mobile;

    this.style.minHeight = `${minHeight}px`;
    debug(
      `Set minHeight: ${this.style.minHeight} for position ${position}`
    );
  }

  sticky() {
    stickToTop(this);
  }

  createAdContainer() {
    this.adContainer = document.createElement('div');
    if (this.position === 'toppbanner') {
      const parent = this.parentNode;
      const wrapper = document.createElement('div');
      wrapper.classList.add('bazaar-ad-wrapper');
      parent.replaceChild(wrapper, this);
      wrapper.appendChild(this);

      const stickyContainer = document.createElement('div');
      const absoluteContainer = document.createElement('div');
      stickyContainer.classList.add('stickyContainer');
      absoluteContainer.classList.add('absoluteContainer');
      stickyContainer.appendChild(this.adContainer);
      absoluteContainer.appendChild(stickyContainer);
      this.appendChild(absoluteContainer);
    } else {
      this.appendChild(this.adContainer);
    }
  }
}

if (customElements && customElements.define) {
  if (customElements.get('bazaar-ad') === undefined) {
    customElements.define('bazaar-ad', bazaarAdGPT);
  }
} else {
  document.registerElement('bazaar-ad', {
    prototype: bazaarAdGPT.prototype,
  });
}

/*!
 * (c) Copyright Adnami ApS, all rights reserved.
 * 
 * Package: @adnami.io/adsm.macro.7f0b8ca3-e22d-4e39-a47a-3edc6c3787c2.js
 * Version: 1.0.12
 * Date:    2023-09-05T13:29:03.166Z
 * 
 */!function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n});},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0);}([function(t,e,o){var n=o(1),a=o(4),r=o(10),i=o(11),s=o(12),d=o(13),l={uuid:d.uuid,certifications:d.certifications,default:function(){var t=window.adsmtag=window.adsmtag||{},e=[];e.push((function(){a.run(),n.run();})),t.cmd=e.concat(t.cmd||[]),i.load(s.config.rmbRef);}};r.bootstrap(l);},function(t,e,o){var n=o(2),a=o(3);t.exports={run:function(){var t=window.adsmtag=window.adsmtag||{};t.mnemonics=t.mnemonics||[],-1===t.mnemonics.indexOf("css")&&(n.create(a,"adsmtag-css"),t.mnemonics.push("css"));}};},function(t,e){function o(t,e,o,n){try{"insertRule"in t?t.insertRule(e+"{"+o+"}",n):"addRule"in t&&t.addRule(e,o,n);}catch(t){}}t.exports={create:function(t,e){var n=window.document.createElement("style");n.styleSheet&&n.appendChild(window.document.createTextNode("")),(window.document.head||window.document.getElementsByTagName("head")[0]).appendChild(n);for(var a=n.sheet||n.styleSheet,r=a.cssRules||a.rules,i=0;i<t.length;i++){var s=t[i];o(a,s.selector,s.styles,r.length);}}};},function(t,e){t.exports=[{selector:'img[src^="//match.adsrvr.org"]',styles:"display:none;"},{selector:"img.native-ads-pixel-tracker",styles:"display:none;"},{selector:"#adform-wallpaper-left,#adform-wallpaper-right",styles:"display:none;"},{selector:'.adsm-skin bazaar-ad[position="toppbanner"]',styles:"width:100vw;right:-50%;transform:translateX(-50%);"},{selector:'.adsm-skin-generic .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) .adsm-wallpaper,.am-bazaar-ad--labeled:not([position="outstreamvideo"]) .adsm-wallpaper',styles:"height:100vh !important;top:0px !important;"},{selector:'.adsm-skin-generic.adsm-skin-seamless .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) .adsm-wallpaper,.am-bazaar-ad--labeled:not([position="outstreamvideo"]) .adsm-wallpaper',styles:"height:100vh !important;top:0px !important;"},{selector:'.adsm-skin-generic .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) .adsm-wallpaper-l,.am-bazaar-ad--labeled:not([position="outstreamvideo"]) .adsm-wallpaper-l,.adsm-skin-generic .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) .adsm-wallpaper-r,.am-bazaar-ad--labeled:not([position="outstreamvideo"]) .adsm-wallpaper-r',styles:"width:auto !important;"},{selector:".adsm-skin-generic #main-content-begin",styles:"position:relative;"},{selector:".adsm-skin-generic #main-content-begin > article",styles:"padding-top:unset !important;"},{selector:".adsm-skin #art-challengeAd-0 > amedia-include,.adsm-skin #art-challengeAd-1 > amedia-include,.adsm-skin #art-challengeAd-2 > amedia-include",styles:"min-height:0 !important;"},{selector:".adsm-skin #forsiden-www-nettavisen-no > div.maelstrom-wrapper",styles:"padding-top:unset !important;"},{selector:".adsm-skin-seamless #Sportspill\\ Trav > div.maelstrom-wrapper > div.sportspill-rikstoto-races-today-wrap",styles:"position:absolute !important;"},{selector:'.adsm-skin-generic .design-nettavisen .am-bazaar-ad--labeled[position="toppbanner"]::before',styles:"position:absolute !important;top:-30px !important;margin:auto !important;width:1000px !important;"},{selector:'.adnm-topscroll bazaar-ad[position="takeover"].takeover-loaded .takeover-close',styles:"top:2px !important;"},{selector:'.adnm-topscroll .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-html-topscroll-frame,.adnm-topscroll .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-html-topscroll-frame',styles:"width:100% !important;height:90vh !important;"},{selector:'.adnm-topscroll .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-html-topscroll-tag,.adnm-topscroll .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-html-topscroll-tag',styles:"width:100% !important;height:calc(90vh + 20px) !important;"},{selector:'.adnm-topscroll .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-scroll-down-btn,.adnm-topscroll .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-scroll-down-btn',styles:"width:50px !important;height:120px !important;"},{selector:'.adnm-topscroll .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-scroll-down-btn > div,.adnm-topscroll .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-scroll-down-btn > div',styles:"width:50px !important;height:50px !important;"},{selector:".adnm-topscroll-text-box.am-bazaar-ad--labeled",styles:"height:0px !important;margin:unset !important;"},{selector:'.adnm-topscroll bazaar-ad[position="takeover"].takeover-loaded',styles:"display:block !important;"},{selector:'.adnm-topscroll body:not(.nettav) bazaar-ad[position="takeover"].takeover-loaded',styles:"overflow:unset !important;"},{selector:".adnm-topscroll body.nettav #page-header",styles:"z-index:99999;background-color:#f5f5f5;"},{selector:'.adnm-html-interscroll-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent div.adnm-html-interscroll-frame-wrapper',styles:"width:100vw !important;height:80vh !important;"},{selector:'.adnm-html-interscroll-doublescreen-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent-double div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll-doublescreen-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent-double div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll-doublescreen body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent-double div.adnm-html-interscroll-frame-wrapper,.adnm-html-interscroll-doublescreen body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent-double div.adnm-html-interscroll-frame-wrapper',styles:"width:100vw !important;height:200vh !important;"},{selector:'.adnm-html-interscroll-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent div.adnm-html-interscroll-tag,.adnm-html-interscroll-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent div.adnm-html-interscroll-tag,.adnm-html-interscroll-doublescreen-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent-double div.adnm-html-interscroll-tag,.adnm-html-interscroll-doublescreen-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent-double div.adnm-html-interscroll-tag,.adnm-html-interscroll body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent div.adnm-html-interscroll-tag,.adnm-html-interscroll body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent div.adnm-html-interscroll-tag,.adnm-html-interscroll-doublescreen body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-interscroll-parent-double div.adnm-html-interscroll-tag,.adnm-html-interscroll-doublescreen body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-interscroll-parent-double div.adnm-html-interscroll-tag',styles:"width:100% !important;height:100% !important;"},{selector:'.adnm-html-interscroll-desktop.adnm_midscroll_sky_opacity bazaar-ad[position="skyskraper"],.adnm-html-interscroll-doublescreen-desktop.adnm_midscroll_sky_opacity bazaar-ad[position="skyskraper"]',styles:"opacity:0 !important;"},{selector:'.adnm-html-interscroll-desktop bazaar-ad[position="skyskraper"],.adnm-html-interscroll-doublescreen-desktop bazaar-ad[position="skyskraper"]',styles:"transition:opacity 0.5s ease 0s !important;"},{selector:'.adnm-html-outstream body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-outstream-parent div.adnm-html-outstream-wrapper,.adnm-html-outstream body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-outstream-parent div.adnm-html-outstream-wrapper,.adnm-html-outstream body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-outstream-parent,.adnm-html-outstream body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-outstream-parent',styles:"width:100vw !important;height:230px !important;"},{selector:'.adnm-html-outstream-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-outstream-parent div.adnm-html-outstream-wrapper,.adnm-html-outstream-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-outstream-parent div.adnm-html-outstream-wrapper,.adnm-html-outstream-desktop body .am-bazaar-ad:not([position="outstreamvideo"]):not([position="chatbox"]):not([position="takeover"]):not(.takeover-close) div.adnm-outstream-parent,.adnm-html-outstream-desktop body .am-bazaar-ad--labeled:not([position="outstreamvideo"]) div.adnm-outstream-parent',styles:"width:980px !important;height:600px !important;"}];},function(t,e,o){var n=o(5);t.exports={run:function(){var t=window.adsmtag=window.adsmtag||{};t.mnemonics=t.mnemonics||[],-1===t.mnemonics.indexOf("scripts")&&(n.run(),t.mnemonics.push("scripts"));}};},function(t,e,o){var n=o(6).functions.cloneCert;function a(t){if("IntersectionObserver"in window&&t){let o={rootMargin:"0px",threshold:.01};var e=document.querySelector("html");new IntersectionObserver((t,o)=>{t.forEach(t=>{0==t.isIntersecting?e.classList.remove("adnm_midscroll_sky_opacity"):e.classList.add("adnm_midscroll_sky_opacity");});},o).observe(t);}}var r=o(7),i=o(8),s=o(9);function d(){document.querySelectorAll('bazaar-ad[position="toppbanner"] .adnm-creative').forEach((function(t){var e=t.style.width,o=t.style.height;t.style.setProperty("width",e,"important"),t.style.setProperty("height",o,"important");}));let t=document.querySelectorAll(".adsm-wallpaper-l");var e=!1;if(t.forEach((function(t){""!==t.style.width&&(e=!0);})),e){t.forEach((function(t){let e=t.style.width;t.style.setProperty("width",e,"important");})),document.querySelectorAll(".adsm-wallpaper-r").forEach((function(t){let e=t.style.width;t.style.setProperty("width",e,"important");}));}else setTimeout(d,50);}const l="adnm-interscroll-parent-double";function c(t,e,o=!1){if(!function(t,e){let n=null,a=t;for(;a.parent&&a.parent!==window;)a=a.parent;const r=document.querySelectorAll("iframe");for(let t=0;t<r.length;t++)if(r[t].contentWindow===a){n=r[t].parentNode;break}for(let t=0;t<e;t++)n=n.parentNode,o&&n.classList.add(l);return n.classList.contains(l)||n.classList.add(l),n}(t,e))return removeParentClass(),console.error("Could not find format parent element")}function m(){document.querySelectorAll("."+l).forEach(t=>{t.classList.remove(l);});}t.exports={run:function(){window.adsm=window.adsm||{},window.adsm.certifications=window.adsm.certifications||[],window.adsm.certifications["adnami-canvas-desktop-topscroll"]={cert:{element:'bazaar-ad[position="takeover"]',height:"90vh"},onDestroy:function(){var t;(t=document.querySelector('bazaar-ad[position="takeover"]'))&&(t.classList.remove("takeover-loaded"),t.classList.remove("am-bazaar-ad--labeled"),t.classList.add("am-bazaar-ad--nolabel"));},onLoaded:function(){},onInit:function(){var t;(t=document.querySelector('bazaar-ad[position="takeover"]'))&&(t.classList.add("takeover-loaded"),t.classList.add("am-bazaar-ad--labeled"),t.classList.remove("am-bazaar-ad--nolabel"));}},window.adsm.certifications["adnami-canvas-mobile-topscroll"]=n("adnami-canvas-desktop-topscroll"),window.adsm.certifications["adnami-canvas-mobile-midscroll"]={cert:{},onDestroy:function(){r.removeAutoHeightParents();},onLoaded:function(t){r.autoHeightParents(t);},onInit:function(t){r.addParentClass(t,2);}},window.adsm.certifications["adnami-canvas-mobile-midscroll-stickies"]=n("adnami-canvas-mobile-midscroll"),window.adsm.certifications["adnami-midscroll-mobile-sticky"]=n("adnami-canvas-mobile-midscroll"),window.adsm.certifications["adnami-midscroll-doublescreen-mobile"]={cert:{},onDestroy:function(){r.removeAutoHeightParents(),m(source);},onLoaded:function(t){r.autoHeightParents(t);},onInit:function(t){c(t,2);}},window.adsm.certifications["adnami-midscroll-desktop"]={cert:{},onDestroy:function(){r.removeAutoHeightParents(),r.removeParentClass();},onLoaded:function(t){r.autoHeightParents(t),document.querySelectorAll(".adnm-html-interscroll-frame-wrapper").forEach(t=>{a(t);});},onInit:function(t){r.addParentClass(t,2);}},window.adsm.certifications["adnami-midscroll-doublescreen-desktop"]={cert:{},onDestroy:function(){r.removeAutoHeightParents(),m(source);},onLoaded:function(t){r.autoHeightParents(t),document.querySelectorAll(".adnm-html-interscroll-frame-wrapper").forEach(t=>{a(t);});},onInit:function(t){c(t,2);}},window.adsm.certifications["adnami-canvas-desktop-fluidskin"]={cert:{element:'bazaar-ad[position="toppbanner"]',content:".adnami-banner-wrapper",forceHeight:!0},onDestroy:function(){i.removeSideskinBannerResizeClass(),i.removeAlignSkys();},onLoaded:function(t){i.initSideSkinBannerResizeGeneric(t,2),d(),i.alignSkys(".top-sky-container",!0,null);},onInit:function(){!function(){if(document.querySelector('bazaar-ad[position="toppbanner"]')){var t=document.createElement("div");t.setAttribute("class","adnami-banner-wrapper"),t.style.setProperty("width","980px","important"),t.style.height="0px",t.style.paddingLeft="var(--brick-space-adnamiX, 20px)",t.style.paddingRight="var(--brick-space-adnamiX, 20px)",document.getElementById("ad-toppbanner-1").appendChild(t);}}(),i.initAlignSkys();}},window.adsm.certifications["adnami-canvas-seamless-skin"]=n("adnami-canvas-desktop-fluidskin"),window.adsm.certifications["adnami-outstream-format"]={cert:{centered:!0},onDestroy:function(){s.removeParentClass();},onLoaded:function(t){},onInit:function(t){s.addParentClass(t,2);}},window.adsm.certifications["adnami-outstream-mobile"]={cert:{centered:!1,widthOverride:"100vw"},onDestroy:function(){s.removeParentClass();},onLoaded:function(t){},onInit:function(t){s.addParentClass(t,2);}};}};},function(t,e){var o={addEvent:function(t,e,o){return t.addEventListener?t.addEventListener(e,o,!1):!!t.attachEvent&&t.attachEvent("on"+e,o)},cloneCert:function(t){var e=JSON.parse(JSON.stringify(window.adsm.certifications[t]));return e.onInit=window.adsm.certifications[t].onInit,e.onDestroy=window.adsm.certifications[t].onDestroy,e.onLoaded=window.adsm.certifications[t].onLoaded,e}},n=function(){var t,e,o,n,a=document.getElementsByTagName("html")[0],r="10px",i="1500px",s="absolute",d="fixed";function l(){return a.getBoundingClientRect().top}function c(t,e,o){t&&(t.style.marginTop=e,t.style.position=o);}return {defineSkyWrappers:function(o,n){t=o,e=n;},defineSkyArray:function(t){o=t;},adjustSkys:function(){null!==document.querySelector("html.adsm-skin")||n?l()<-parseInt(i)?(c(t,r,d),c(e,r,d)):(c(t,i,s),c(e,i,s)):(c(t,r,d),c(e,r,d));},adjustSkycrapers:function(t,e){if(n)if(l()<t)for(var a=0;a<o.length;a++)c(o[a],e+"px",d);else for(a=0;a<o.length;a++)c(o[a],l()+Math.abs(t)+e+"px",d);else for(a=0;a<o.length;a++)c(o[a],e+"px",d);},enableFunctionality:function(t){n=t;},overrideDefaultVals:function(t,e,o,n){r=t,i=e,s=o,d=n;},getSkyArray:function(){return o}}}(),a=function(){var t,e=document.querySelector(".adnm-adwell"),o=window.setInterval((function(){var r=document.querySelector(".adnm-adwell iframe");if(n+=100,function(){return (t=e=document.querySelector(".adnm-adwell"),t?t.getBoundingClientRect().height:null)>100&&null!==document.querySelector(".adnm-adwell iframe");var t;}())t=e.firstChild,clearInterval(o),e.style.maxWidth=((i=r)?i.getBoundingClientRect().width:null)+"px",a();else if(n>1e4)return clearInterval(o),!1;var i;}),100),n=0;function a(){var o=document.createElement("div");e&&t&&(e.insertBefore(o,t),o.classList.add("adnm-adwell-close-button"),o.innerHTML="&#10006",document.querySelector(".adnm-adwell-close-button").addEventListener("click",r));}function r(){e&&(e.classList.add("adnm-adwell-gone"),e.classList.remove("adnm-adwell-full"));}return {insertCloseButton:a,addEvent:function(t,e,o){return t.addEventListener?t.addEventListener(e,o,!1):!!t.attachEvent&&t.attachEvent("on"+e,o)},adwellFullHeight:function(){e&&(e.classList.add("adnm-adwell-full"),setTimeout(r,7e3));}}}();t.exports={functions:o,adnamiSkyAdjuster:n,adnamiBottomBanner:a};},function(t,e){const o="adnm-interscroll-parent";function n(){document.querySelectorAll("."+o).forEach(t=>{t.classList.remove(o);});}const a="adnm-interscroll-creative-parent";let r=null,i=null;t.exports={addParentClass:function(t,e,a=!1){if(!function(t,e){let n=null,r=t;for(;r.parent&&r.parent!==window;)r=r.parent;const i=document.querySelectorAll("iframe");for(let t=0;t<i.length;t++)if(i[t].contentWindow===r){n=i[t].parentNode;break}for(let t=0;t<e;t++)n=n.parentNode,a&&n.classList.add(o);return n.classList.contains(o)||n.classList.add(o),n}(t,e))return n(),console.error("Could not find format parent element")},removeParentClass:n,autoHeightParents:function(t){r=document.createElement("style"),document.head.appendChild(r),r.innerHTML=`.${a} { height: auto !important; max-height: unset !important; display: block !important }`,function(t){let e=null,o=t;for(;o.parent&&o.parent!==window;)o=o.parent;const n=document.querySelectorAll("iframe");for(let t=0;t<n.length;t++)if(n[t].contentWindow===o){e=n[t].parentNode;break}i=e.offsetHeight,e=e.parentNode;for(;"body"!==e.tagName.toLowerCase();)e.offsetHeight<i&&e.classList.add(a),e=e.parentNode;}(t);},removeAutoHeightParents:function(){document.querySelectorAll("."+a).forEach(t=>{t.classList.remove(a);}),r&&r.parentElement.removeChild(r);}};},function(t,e){const o="adsm-skin-banner-parent";let n=null;const a="adnm-skin-sky-selector";let r=null,i=[];function s(){for(let t=0;t<i.length;t++){const e=document.querySelectorAll(i[t].skySelectors),o=document.querySelector(i[t].alignSelector);if(e.length>0&&o){if(e[0].classList.contains(`${a}-${t}`)){const n=e[0].getBoundingClientRect().top,a=o.getBoundingClientRect().bottom;Math.abs(n-a-i[t].spacing)>1&&d();}if(i[t].restoreWhenUnder){o.getBoundingClientRect().bottom<0?e.forEach(e=>{e.classList.remove(`${a}-${t}`);}):e.forEach(e=>{e.classList.add(`${a}-${t}`);});}}}}function d(){if(0===i.length)return;r.innerHTML="";let t="";for(let o=0;o<i.length;o++){const n=document.querySelectorAll(i[o].skySelectors);if(0===n.length)return console.error("Could not find any skys to target");const s=document.querySelector(i[o].alignSelector);if(!s)return console.error("Could not find element to align under");n.forEach(t=>{t.classList.add(`${a}-${o}`);});const d=n[0];let l=0,c=e(l,o);r.innerHTML=t+c;const m=window.scrollY+d.getBoundingClientRect().top,p=window.scrollY+s.getBoundingClientRect().top+s.offsetHeight;l=i[o].spacing+p-m,t+=e(l,o),r.innerHTML=t;}function e(t,e){return `.adsm-skin .${a}-${e} { margin-top: 0px !important; position: ${i[e].cssPosition} !important; top: ${t}px !important; } `}}t.exports={initSideSkinBannerResizeGeneric:function(t,e=2,a=0){if(!document.querySelector(window.adsm.certifications["adnami-canvas-desktop-fluidskin"].cert.content))return console.error("Could not find element to wrap around");if(n=document.createElement("style"),document.head.appendChild(n),!function(t,e){let n=null,a=t;for(;a.parent&&a.parent!==window;)a=a.parent;const i=document.querySelectorAll("iframe");for(let t=0;t<i.length;t++)if(i[t].contentWindow===a){n=i[t].parentNode;break}for(let t=0;t<e;t++)n=n.parentNode,n.classList.add(o);return n}(t,e))return removeParentClass(),console.error("Could not find format parent element");function i(){if(n){const t=document.querySelector(window.adsm.certifications["adnami-canvas-desktop-fluidskin"].cert.content).offsetWidth+a;n.innerHTML=`.adsm-skin .${o} {min-width: unset !important; max-width: ${t}px !important; width: ${t}px !important; margin-left: auto !important; margin-right: auto !important; height: auto !important; max-height: unset !important;`;}}window.addEventListener?window.addEventListener("resize",i,!1):window.attachEvent("resize",i),i();},removeSideskinBannerResizeClass:function(){n&&n.parentElement.removeChild(n),document.removeEventListener("resize",applyStyling),document.querySelectorAll("."+o).forEach(t=>{t.classList.remove(o);});},alignSkys:function(t,e,o=null,n=20,a="absolute"){o||(o=".adsm-wallpaper"),i.push({skySelectors:t,restoreWhenUnder:e,alignSelector:o,spacing:n,cssPosition:a}),d();},removeAlignSkys:function(){r.parentElement.removeChild(r),i=[];for(let t=0;t<i.length;t++){document.querySelectorAll(i[t].skySelectors).forEach(e=>{e.classList.contains(`${a}-${t}`)&&e.classList.remove(`${a}-${t}`);});}window.removeEventListener("resize",d),window.removeEventListener("scroll",s);},initAlignSkys:function(){r=document.createElement("style"),document.head.appendChild(r),window.addEventListener("resize",d),window.addEventListener("scroll",s);}};},function(t,e){const o="adnm-outstream-parent";function n(){document.querySelectorAll("."+o).forEach(t=>{t.classList.remove(o);});}const a="adnm-outstream-creative-parent";let r=null,i=null;t.exports={addParentClass:function(t,e,a=!1){if(!function(t,e){let n=null,r=t;for(;r.parent&&r.parent!==window;)r=r.parent;const i=document.querySelectorAll("iframe");for(let t=0;t<i.length;t++)if(i[t].contentWindow===r){n=i[t].parentNode;break}for(let t=0;t<e;t++)n=n.parentNode,a&&n.classList.add(o);return n.classList.contains(o)||n.classList.add(o),n}(t,e))return n(),console.error("Could not find format parent element")},removeParentClass:n,autoWidthParents:function(t){r=document.createElement("style"),document.head.appendChild(r),r.innerHTML=`.${a} { max-width: unset !important; display: block !important }`,function(t){let e=null,o=t;for(;o.parent&&o.parent!==window;)o=o.parent;const n=document.querySelectorAll("iframe");for(let t=0;t<n.length;t++)if(n[t].contentWindow===o){e=n[t].parentNode;break}i=e.offsetWidth,e=e.parentNode;for(;"body"!==e.tagName.toLowerCase();)e.offsetWidth<i&&e.classList.add(a),e=e.parentNode;}(t);},removeAutoWidthParents:function(){document.querySelectorAll("."+a).forEach(t=>{t.classList.remove(a);}),r&&r.parentElement.removeChild(r);}};},function(t,e){t.exports={bootstrap:function(t){var e=window.adsmtag=window.adsmtag||{};e.macro?e.macro.uuid===t.uuid||e.mnemonics||(e.macro.uuid=t.uuid,e.macro.loaded=!0,e.macro.certifications=t.certifications||void 0,t.default()):(e.macro={},e.macro.uuid=t.uuid,e.macro.loaded=!0,e.macro.certifications=t.certifications||void 0,t.default());}};},function(t,e){t.exports={load:function(t,e){var o=document.createElement("script");e&&(o.id=e),o.async=!0,o.type="text/javascript",o.src=t;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n);},loadDefer:function(t,e){var o=document.createElement("script");e&&(o.id=e),o.async=!0,o.type="text/javascript",o.src=t;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n);},loadSync:function(t,e){var o=document.createElement("script");e&&(o.id=e),o.type="text/javascript",o.src=t;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n);}};},function(t,e){var o,n,a={getMacroRmbRef:function(){return n},getMacroEdgeRef:function(){return o},edgeRef:o="https://macro.adnami.io/macro/gen/adsm.macro.rmb.js",edgeRefLegacy:"https://macro.adnami.io/macro/gen/adsm.macro.rmb.js",rmbRef:n="https://macro.adnami.io/macro/gen/adsm.macro.rmb.js",lazyLoadEdge:"https://macro.adnami.io/macro/gen/adsm.macro.rmb.js",boosterRef:""};t.exports={config:a};},function(t,e){(function(e){const o={dirname:e,url:"https://adnami.io/",uuid:"7f0b8ca3-e22d-4e39-a47a-3edc6c3787c2",inject:!1};t.exports=o;}).call(this,"/");}]);

window.bazaarLoadStart = Date.now();
