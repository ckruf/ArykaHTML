System.register([], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      /******************************************************************************
      Copyright (c) Microsoft Corporation.

      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.

      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */

      function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
          return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
              function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
              function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
      }

      function __classPrivateFieldGet(receiver, state, kind, f) {
          if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }

      function __classPrivateFieldSet(receiver, state, value, kind, f) {
          if (kind === "m") throw new TypeError("Private method is not writable");
          if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
      }

      typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
          var e = new Error(message);
          return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };

      /** 
       * The result of method invoked with args as arguments wrapped in a promise
       * @param {function} method
       * @param {array} args
       * @return {Promise}
       */
      function castAsPromise(method, args) {
          let result;
          try { 
              result = method(...args);
              return Promise.resolve(result);
          } catch(e) {
              return Promise.reject(e);
          }
      }

      function sendResult(eventName, eventId, data) {
          if (self.amediaNativeBridge) {
              const json = JSON.stringify({ eventId, ...data });
              self.amediaNativeBridge.receiveResultFromWeb(json);
          }
          self.dispatchEvent(new CustomEvent(eventName,{ detail: { ...data } } ));
      }
      class RPCserver {
          constructor({ version, component, listeners = {} }) {
              this.version = version;
              this.component = component;
              Object.keys(listeners).forEach(name => this.addListener(name, listeners[name]));
              self.addEventListener(`amedia-rpc-event:${component}:ready`, () => this.handshake());
              setTimeout(() => this.handshake(), 0);
          }

          handshake() {
              const detail = { version: this.version };
              self.dispatchEvent(new CustomEvent(`amedia-rpc-event:${this.component}:live`, { detail }));
              if (self.amediaNativeBridge) {
                  self.amediaNativeBridge.handshake(this.component, this.version);
              }
          }

          addListener(name, method) {
              self.addEventListener(`amedia-rpc-event:${this.component}:${name}`, evt => {
                  evt.stopImmediatePropagation();
                  const { eventId = '', args = [] } = evt.detail || {};
                  const eventResult = `amedia-rpc-event:${this.component}:${name}:${eventId}`;

                  castAsPromise(method, args)
                      .then(result => sendResult(eventResult, eventId, { result }))
                      .catch(err => {
                          const error = err instanceof Error ? err.message : err;
                          return sendResult(eventResult, eventId, { error });
                      });
              });
          }
      }

      /* eslint-disable no-return-assign, no-plusplus */
      const win = typeof self !== 'undefined'
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
      const getRandomValues$1 =
          (typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
          (typeof win.msCrypto !== 'undefined' &&
              typeof win.msCrypto.getRandomValues === 'function' &&
              win.msCrypto.getRandomValues.bind(win.msCrypto));

      if (getRandomValues$1) ; else {
          // Math.random()-based (RNG)
          //
          // If all else fails, use Math.random().  It's fast, but is of unspecified
          // quality.
          new Array(16);
      }
      for (let i = 0; i < 256; ++i) {
          (i + 0x100).toString(16).substr(1);
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

      const version$1 = '6.2.2';

      const getSitekeyFromConfig = (host) => __awaiter(void 0, void 0, void 0, function* () {
          const res = yield fetch('https://services.api.no/api/client-config/v1/config/publication?domain=' + host);
          const publication = yield res.json();
          return Promise.resolve(publication.key);
      });
      function removeSiteConfigFromLocalStorage() {
          window.localStorage.removeItem("adp-site-config");
          window.localStorage.removeItem("adp-site-configs");
      }

      // Store function names. Used when user sends a dispatch method
      var Action;
      (function (Action) {
          Action[Action["setStartedDomLogging"] = 0] = "setStartedDomLogging";
          Action[Action["setRoot"] = 1] = "setRoot";
          Action[Action["setInitOptions"] = 2] = "setInitOptions";
          Action[Action["addClickEvent"] = 3] = "addClickEvent";
          Action[Action["addCommentEvent"] = 4] = "addCommentEvent";
          Action[Action["addCustomEvent"] = 5] = "addCustomEvent";
          Action[Action["addErrorEvent"] = 6] = "addErrorEvent";
          Action[Action["addInscreenEvent"] = 7] = "addInscreenEvent";
          Action[Action["addLegacyEvent"] = 8] = "addLegacyEvent";
          Action[Action["addVideoEvent"] = 9] = "addVideoEvent";
          Action[Action["addPrebidEvent"] = 10] = "addPrebidEvent";
          Action[Action["addScrollEvent"] = 11] = "addScrollEvent";
          Action[Action["addPlaybackAdEvent"] = 12] = "addPlaybackAdEvent";
          Action[Action["addWPAdBlock"] = 13] = "addWPAdBlock";
          Action[Action["addArticle"] = 14] = "addArticle";
          Action[Action["addCollectionPage"] = 15] = "addCollectionPage";
          Action[Action["addCustomElement"] = 16] = "addCustomElement";
          Action[Action["addMetaElement"] = 17] = "addMetaElement";
          Action[Action["addResource"] = 18] = "addResource";
          Action[Action["addTeaser"] = 19] = "addTeaser";
          Action[Action["addVideo"] = 20] = "addVideo";
          Action[Action["addPage"] = 21] = "addPage";
          Action[Action["addMetaEmbed"] = 22] = "addMetaEmbed";
          Action[Action["addPerformanceEvent"] = 23] = "addPerformanceEvent";
          Action[Action["addWebVitalsEvent"] = 24] = "addWebVitalsEvent";
          Action[Action["addCallToAction"] = 25] = "addCallToAction";
      })(Action || (Action = {}));

      const getEnumArr = (enumVal) => Object.keys(enumVal).reduce((reducer, val) => {
          if (isNaN(Number(val))) {
              reducer.push(val);
          }
          return reducer;
      }, []);
      const getEnumObj = enumVal => Object.keys(enumVal).reduce((reducer, val) => {
          if (isNaN(Number(val)))
              reducer[val] = val;
          return reducer;
      }, {});

      /**
       * Mutations function body. Every mutation is inside a switch method.
       * Changes state and returns it. This function is responsible for updating the state in the store.
       */
      const createMutations = (action, state, payload) => {
          switch (action) {
              case Action.setInitOptions: {
                  state.initOptions = payload;
                  return state;
              }
              case Action.setStartedDomLogging: {
                  state.startedDomLogging = payload;
                  return state;
              }
              case Action.setRoot: {
                  state.root = payload;
                  return state;
              }
              case Action.addPage: {
                  state.Pages.push(payload);
                  return state;
              }
              case Action.addErrorEvent: {
                  state.ErrorEvents.push(payload);
                  return state;
              }
              case Action.addClickEvent: {
                  state.ClickEvents.push(payload);
                  return state;
              }
              case Action.addCommentEvent: {
                  state.CommentEvents.push(payload);
                  return state;
              }
              case Action.addMetaEmbed: {
                  state.MetaEmbeds.push(payload);
                  return state;
              }
              case Action.addCustomEvent: {
                  state.CustomEvents.push(payload);
                  return state;
              }
              case Action.addInscreenEvent: {
                  state.InscreenEvents.push(payload);
                  return state;
              }
              case Action.addLegacyEvent: {
                  state.LegacyEvents.push(payload);
                  return state;
              }
              case Action.addPrebidEvent: {
                  state.PrebidEvents.push(payload);
                  return state;
              }
              case Action.addScrollEvent: {
                  state.ScrollEvents.push(payload);
                  return state;
              }
              case Action.addPlaybackAdEvent: {
                  state.PlaybackAdEvents.push(payload);
                  return state;
              }
              case Action.addVideoEvent: {
                  state.VideoEvents.push(payload);
                  return state;
              }
              case Action.addPerformanceEvent: {
                  state.PerformanceEvents.push(payload);
                  return state;
              }
              case Action.addWebVitalsEvent: {
                  state.WebVitalsEvents.push(payload);
                  return state;
              }
              case Action.addWPAdBlock: {
                  state.WPAdBlocks.push(payload);
                  return state;
              }
              case Action.addArticle: {
                  state.Articles.push(payload);
                  return state;
              }
              case Action.addCollectionPage: {
                  state.CollectionPages.push(payload);
                  return state;
              }
              case Action.addCustomElement: {
                  state.CustomElements.push(payload);
                  return state;
              }
              case Action.addMetaElement: {
                  state.MetaElements.push(payload);
                  return state;
              }
              case Action.addResource: {
                  state.Resources.push(payload);
                  return state;
              }
              case Action.addTeaser: {
                  state.Teasers.push(payload);
                  return state;
              }
              case Action.addVideo: {
                  state.Videos.push(payload);
                  return state;
              }
              case Action.addCallToAction: {
                  state.CallToActions.push(payload);
                  return state;
              }
              default: {
                  throw new Error(`You need to implement ${action} mutation.`);
              }
          }
      };
      /**
       * Creates mutation functions based of the FunctionName enum
       * This is done in order do minimise duplicating code
       * This functions loops through the enum object, and creates a function for every enum entry.
       * It creates new functions with two arguments, `state` and `payload`
       * And creates appropriate function body from method getMutationsFunctionBody
       * Variable `MethodName` is needed because the anonymous function does not have
       * Access to the enum outside of its scope.
       * That's why we create a new expressions in order to create the new object.
       * Every function returns state, the same as any reducer function.
       */
      const mutations = getEnumArr(Action).reduce((reducer, methodName) => (reducer = Object.assign(Object.assign({}, reducer), { [methodName]: new Function("state", "payload", `
        const Action = ${JSON.stringify(getEnumObj(Action))};
        const func = ${createMutations};
        return func('${methodName}', state, payload);
    `) })), {});
      /**
       * Actions function body. Every action does the same thing.
       * It commits a new action with new payload
       */
      const createActions = (methodName) => `context.commit('${methodName}', payload);`;
      /**
       * Creates action functions based of the FunctionName enum.
       * It creates new functions with two arguments, `context` and `payload`
       */
      const actions = getEnumArr(Action).reduce((reducer, methodName) => (reducer = Object.assign(Object.assign({}, reducer), { [methodName]: new Function("context", "payload", createActions(methodName)) })), {});

      var state = {
          startedDomLogging: false,
          root: null,
          initOptions: [],
          ErrorEvents: [],
          ClickEvents: [],
          CommentEvents: [],
          CustomEvents: [],
          InscreenEvents: [],
          LegacyEvents: [],
          VideoEvents: [],
          PrebidEvents: [],
          ScrollEvents: [],
          PlaybackAdEvents: [],
          AdpEvents: [],
          WPAdBlocks: [],
          Articles: [],
          CollectionPages: [],
          CustomElements: [],
          MetaElements: [],
          Resources: [],
          Teasers: [],
          Videos: [],
          Pages: [],
          MetaEmbeds: [],
          PerformanceEvents: [],
          WebVitalsEvents: [],
          CallToActions: [],
      };

      /**
       * Som doc for class
       * {@link PubSub}
       */
      class PubSub {
          constructor() {
              this.events = {};
          }
          /**
           * {@link PubSub.subscribe}
           */
          subscribe(event, clb) {
              if (!this.events.hasOwnProperty(event))
                  this.events[event] = [];
              this.events[event].push(clb);
              return {
                  unsubscribe: () => {
                      this.events[event] = [];
                  },
              };
          }
          unsubscribe(event) {
              this.events[event] = [];
          }
          publish(event, data = {}) {
              if (!this.events.hasOwnProperty(event))
                  return [];
              return this.events[event].map((clb) => clb({ event, data }));
          }
      }

      class Store {
          constructor(params) {
              this.map = {
                  addEvent: "allEvents",
                  setStartedDomLogging: "startedDomLogging",
                  setPageView: "pageView",
                  addClickEvent: "ClickEvent",
                  addCommentEvent: "CommentEvent",
                  addCustomEvent: "CustomEvent",
                  addErrorEvent: "ErrorEvent",
                  addInscreenEvent: "InscreenEvent",
                  addLegacyEvent: "LegacyEvent",
                  addVideoEvent: "VideoEvent",
                  addPrebidEvent: "PrebidEvent",
                  addScrollEvent: "ScrollEvent",
                  addPlaybackAdEvent: "CideoAdEvent",
                  addAdpEvent: "AdpEvent",
                  addWPAdBlock: "WPAdBlock",
                  addArticle: "Article",
                  addCollectionPage: "CollectionPage",
                  addCustomElement: "CustomElement",
                  addMetaElement: "MetaElement",
                  addResource: "Resource",
                  addTeaser: "Teaser",
                  addVideo: "Video",
                  addPage: "Page",
                  addPerformanceEvent: "PerformanceEvent",
                  addWebVitalsEvent: "WebVitalsEvent",
                  addMetaEmbed: "MetaEmbed",
                  addCallToAction: "CallToAction",
              };
              this.actions = {};
              this.mutations = {};
              this.state = {};
              this.status = "resting";
              this.events = new PubSub();
              if (params.hasOwnProperty("actions"))
                  this.actions = params.actions;
              if (params.hasOwnProperty("mutations"))
                  this.mutations = params.mutations;
              this.state = new Proxy(params.state || {}, {
                  set: (state, key, value) => {
                      state[key] = value;
                      this.status = "resting";
                      return true;
                  },
              });
          }
          //ACTION
          dispatch(actionKey, payload) {
              if (typeof this.actions[actionKey] !== "function") {
                  console.error(`Action "${actionKey} doesn't exist.`);
                  return false;
              }
              this.status = "action";
              this.actions[actionKey](this, payload);
              return true;
          }
          //MUTATION
          commit(actionKey, payload) {
              if (typeof this.mutations[actionKey] !== "function") {
                  console.log(`Mutation "${actionKey}" doesn't exist`);
                  return false;
              }
              this.status = "mutation";
              const newState = this.mutations[actionKey](this.state, payload);
              try {
                  this.state = Object.assign(this.state, newState);
                  this.events.publish(this.map[actionKey], this.state[`${this.map[actionKey]}s`]);
                  new CustomEvent("adplogger:store-update", { detail: this.events });
                  return true;
              }
              catch (error) {
                  return false;
              }
          }
      }

      var store$1 = new Promise((res, rej) => {
          window.addEventListener("adplogger:store-init", (evt) => {
              if (evt.detail) {
                  res(evt.detail);
              }
          });
          setTimeout(() => {
              res(new Store({
                  actions,
                  mutations,
                  state,
              }));
          }, 500);
      });

      const storePromise = () => __awaiter(void 0, void 0, void 0, function* () {
          return yield store$1;
      });

      const createError = (message, type, level, stacktrace) => ({
          message: message !== null && message !== void 0 ? message : '',
          level: level !== null && level !== void 0 ? level : 'error',
          stacktrace: stacktrace !== null && stacktrace !== void 0 ? stacktrace : [],
          type: type !== null && type !== void 0 ? type : 'error',
      });

      function getSelector(element) {
          if (element === document.documentElement) {
              return 'html';
          }
          if (element.id) {
              return `#${element.id}`;
          }
          let selector = '';
          // If it doesnt have a parent Element and the element is not the document Element
          // Assume we have a fragment
          if (!element.parentElement) {
              return 'documentFragment';
          }
          if (element.parentElement !== document.documentElement) {
              selector = `${getSelector(element.parentNode)} >`;
          }
          const siblings = Array.from(element.parentElement.children);
          const siblingInfo = siblings
              .filter(sibling => sibling !== element)
              .reduce((pv, sibling) => ({
              tagNames: [...pv.tagNames, sibling.tagName],
              classNames: [...pv.classNames, ...sibling.classList],
          }), { tagNames: [], classNames: [] });
          const classNames = [...[].slice.call(element.classList)]
              .filter(className => siblingInfo.classNames.includes(className));
          if (classNames.length > 0) {
              return `${selector} .${classNames[0]}`;
          }
          if (!siblingInfo.tagNames.includes(element.tagName)) {
              return `${selector} ${element.tagName.toLowerCase()}`;
          }
          const index = siblings.indexOf(element);
          return `${selector} :nth-child(${index + 1})`;
      }

      function getAttribute(attribute) {
          return attributeExistsInElement(attribute) ? getAttributeFromElement(attribute) : null;
      }
      function attributeExistsInElement(attribute) {
          return self.document &&
              self.document.documentElement &&
              self.document.documentElement.getAttribute(attribute) ? true : false;
      }
      function getAttributeFromElement(attribute) {
          return self.document.documentElement.getAttribute(attribute);
      }

      function createNamespace(str) {
          return str.split('.').reduce((parent, key) => {
              parent[key] = parent[key] || {};
              return parent[key];
          }, self);
      }

      function getPageUrl() {
          const { protocol, hostname, pathname, search } = self.location;
          return `${protocol}//${hostname}${pathname}${search}`;
      }
      function removePiiFromUrl(url) {
          /* If str includes __pii__=true, remove everything after first question mark */
          if (url.toLowerCase().includes("__pii__=true")) {
              return url.split("?")[0];
          }
          return url;
      }
      function getURLWithoutHash() {
          return self.location.href.replace(self.location.hash, '');
      }
      function wrapHistoryMethods(methodName) {
          const historyMethod = history[methodName];
          history[methodName] = function (...args) {
              const oldUrl = getURLWithoutHash();
              historyMethod.apply(history, args);
              if (oldUrl !== getURLWithoutHash()) {
                  self.dispatchEvent(new CustomEvent('adp:url-change'));
              }
          };
      }
      if (self.history && history.pushState) {
          wrapHistoryMethods('pushState');
          wrapHistoryMethods('replaceState');
      }

      var _ClearableWeakMap_wm;
      class ClearableWeakMap {
          constructor() {
              _ClearableWeakMap_wm.set(this, void 0);
              __classPrivateFieldSet(this, _ClearableWeakMap_wm, new WeakMap(), "f");
          }
          clear() {
              __classPrivateFieldSet(this, _ClearableWeakMap_wm, new WeakMap(), "f");
          }
          delete(k) {
              return __classPrivateFieldGet(this, _ClearableWeakMap_wm, "f").delete(k);
          }
          get(k) {
              return __classPrivateFieldGet(this, _ClearableWeakMap_wm, "f").get(k);
          }
          has(k) {
              return __classPrivateFieldGet(this, _ClearableWeakMap_wm, "f").has(k);
          }
          set(k, v) {
              __classPrivateFieldGet(this, _ClearableWeakMap_wm, "f").set(k, v);
              return this;
          }
      }
      _ClearableWeakMap_wm = new WeakMap();

      function isPromise(value) {
          return typeof value === "object" && typeof value.then === "function";
      }
      class FakePromise {
          constructor(value) {
              this.state = "fulfilled";
              this.value = value;
              this.then = function (cb) {
                  try {
                      const newValue = cb(this.value);
                      if (isPromise(newValue)) {
                          return newValue;
                      }
                      return new FakePromise(newValue);
                  }
                  catch (e) {
                      return new FakeRejectPromise(e);
                  }
              };
          }
          catch() {
              return this;
          }
      }
      class FakeRejectPromise {
          constructor(reason) {
              this.state = "rejected";
              this.reason = reason;
          }
          then(cb) {
              return cb(this);
          }
          catch(cb) {
              return cb(this.reason);
          }
      }
      FakePromise.prototype.then = function (cb) {
          try {
              const newValue = cb(this.value);
              if (isPromise(newValue)) {
                  return newValue;
              }
              return new FakePromise(newValue);
          }
          catch (e) {
              return new FakeRejectPromise(e);
          }
      };
      //@ts-ignore
      FakeRejectPromise.prototype.then = function (_, reject) {
          if (typeof reject === "function") {
              return new FakePromise(reject(this.reason));
          }
          return this;
      };
      FakeRejectPromise.prototype.catch = function (cb) {
          const newValue = cb(this.reason);
          return new FakePromise(newValue);
      };

      function getStore$4(name) {
          const ns = createNamespace(`adpStore.${name}`);
          return new FakePromise({
              put: (value, key) => {
                  ns[key] = value;
                  return new FakePromise();
              },
              del: (key) => {
                  delete ns[key];
                  return new FakePromise();
              },
              get: (key) => new FakePromise(ns[key]),
              list: () => new FakePromise(ns.keys()),
              add: (value, key) => {
                  ns[key] = value;
                  return new FakePromise();
              },
              close: () => new FakePromise(),
          });
      }
      function flush$3(name = 'events') {
          const ns = createNamespace(`adpStore.${name}`);
          const result = Object.keys(ns).map(key => ns[key]);
          //TODO: Remove any and give it a proper type
          /** @type Object */ self.adpStore[name] = {};
          return new FakePromise(result);
      }

      var globalVar = /*#__PURE__*/Object.freeze({
          __proto__: null,
          getStore: getStore$4,
          flush: flush$3
      });

      function getEnvironment() {
          const { hostname } = self.location;
          const localhostRegex = /localhost/g;
          const securehostRegex = /secure.amedia/g;
          const snapRegex = /no.snap[0-9]?[0-9].api.no/g;
          if (hostname.match(localhostRegex)) {
              return "localhost";
          }
          if (hostname.match(snapRegex) || hostname.match(securehostRegex)) {
              return "snap";
          }
          else {
              // We dont really know if it is prod, but we can assume it is.
              // Prod should be the safest mode to run in anyhow
              return "prod";
          }
      }
      function isLocalhost() {
          const environment = getEnvironment();
          return environment.includes("localhost");
      }

      const isLocalHost$2 = location.hostname.includes("localhost");
      const blacklistedHosts$1 = [];
      function useUserModule() {
          var _a, _b, _c;
          return __awaiter(this, void 0, void 0, function* () {
              const store = yield storePromise();
              if ((typeof window !== "undefined" &&
                  blacklistedHosts$1.indexOf(window.location.host) > -1) ||
                  (
                  //@ts-ignore
                  (_c = (_b = (_a = store.state.initOptions) === null || _a === void 0 ? void 0 : _a.exclude) === null || _b === void 0 ? void 0 : _b.modules) === null || _c === void 0 ? void 0 : _c.includes("user")) ||
                  isLocalHost$2) {
                  return Promise.resolve(false);
              }
              return Promise.resolve(true);
          });
      }
      // Timeout after 1 ms, as amedia-user cannot be reached on localhost
      // 0  ms is reserved for other uses in amedia-user.
      function getUserKey$1() {
          return __awaiter(this, void 0, void 0, function* () {
              const useUserModulePromise = yield useUserModule();
              if (!useUserModulePromise) {
                  return Promise.resolve(null);
              }
              const { UserDataRequest } = yield module.import('https://assets.acdn.no/pkg/@amedia/user/v0/user.js');
              return new UserDataRequest()
                  .withAttributes(["trackingKey"])
                  .fetch({
                  timeout: isLocalhost() ? 1 : 500,
              })
                  .then(({ attributes, state }) => {
                  if (state.isLoggedIn) {
                      return attributes.trackingKey;
                  }
                  return "";
              })
                  .catch(() => {
                  return "";
              });
          });
      }
      function logNonUserAccess() {
          return __awaiter(this, void 0, void 0, function* () {
              const useUserModulePromise = yield useUserModule();
              if (!useUserModulePromise) {
                  return Promise.resolve(null);
              }
              const { UserDataRequest } = yield module.import('https://assets.acdn.no/pkg/@amedia/user/v0/user.js');
              return new UserDataRequest()
                  .withNonUserAccess()
                  .fetch({
                  timeout: isLocalhost() ? 1 : 500,
              })
                  .then(({ nonUserAccess }) => {
                  if (nonUserAccess && nonUserAccess.length > 0) {
                      const { accessFeatures, customer } = nonUserAccess[0];
                      const nonUserAccessObject = {
                          accessFeatures: accessFeatures,
                          customer: customer,
                      };
                      log("CustomEvent", {
                          type: "custom",
                          name: "nonUserAccess",
                          data: JSON.stringify(nonUserAccessObject),
                      }).catch((e) => {
                          console.error(`Adplogger: Error when creating nonUserAcces CustomEvent: ${e}`);
                      });
                  }
                  return Promise.resolve(null);
              })
                  .catch((e) => {
                  return Promise.resolve(null);
              });
          });
      }
      let pageViewId;
      let previousUrl;
      function getPageViewId() {
          let url = getPageUrl();
          if (!pageViewId || previousUrl !== url) {
              pageViewId = v4();
              previousUrl = url;
          }
          return Promise.resolve(pageViewId);
      }
      function refreshPageViewId() {
          return getPageViewId();
      }
      self.addEventListener("adp:url-change", () => refreshPageViewId());
      // Get and refresh lastVisitDates
      const refreshLastVisitDates = (dateArray, domainBrowserId) => {
          try {
              const lastVisitDates = dateArray.join("|");
              window.localStorage.setItem("amedia:lastvisitdates", `${domainBrowserId}:${lastVisitDates}`);
          }
          catch (error) {
              /* log.info(`Exception raised when setting value in localStorage: ${error}`); */
          }
      };
      function validateLastVisitDates(dateString) {
          const today = new Date();
          const dateLastWeek = new Date(Date.now() - 8 * 1000 * 60 * 60 * 24);
          let dateArray = [today.toISOString().slice(0, 10)];
          if (dateString) {
              dateString.split("|").forEach((date) => {
                  let ts = new Date(date);
                  if (ts.getTime() > dateLastWeek.getTime() && ts < today) {
                      dateArray.push(ts.toISOString().slice(0, 10));
                  }
              });
          }
          return [...new Set(dateArray.sort().reverse())];
      }
      function getLastVisitDates() {
          return __awaiter(this, void 0, void 0, function* () {
              // Returns an array with the latest dates the users has visited within the last week
              const { domainBrowserId } = yield getCommon$1();
              let lastVisitDates = window.localStorage.getItem("amedia:lastvisitdates") || "";
              const [storedBrowserId, dates] = lastVisitDates.split(":");
              let dateArray = validateLastVisitDates(domainBrowserId === storedBrowserId ? dates : "");
              refreshLastVisitDates(dateArray, domainBrowserId);
              return dateArray;
          });
      }

      const isLocalHost$1 = location.hostname.includes("localhost");
      const localhostBrowserId = v4();
      const localhostDomainVisitId = v4();
      const localhostPageViewId = v4();
      const localhostUserKey = v4();
      let siteKey;
      function getCommon$1() {
          var _a, _b, _c, _d;
          return __awaiter(this, void 0, void 0, function* () {
              const store = yield storePromise();
              const userKeyPromise = getUserKey$1().catch(() => null);
              if (!siteKey) {
                  siteKey =
                      ((_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-sitekey")) ||
                          (
                          //@ts-ignore
                          (_c = (_b = store.state.initOptions) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.siteKey) ||
                          (yield getSitekeyFromConfig(window.location.host.search("localhost") > -1
                              ? "www.tangotidende.no"
                              : ((_d = window.location.host) === null || _d === void 0 ? void 0 : _d.length)
                                  ? window.location.host
                                  : "www.tangotidende.no")) ||
                          "undefined";
              }
              const logger = `adplogger2JS:${version$1}`;
              const { getBrowserId, getVisitId } = !isLocalHost$1
                  ? yield module.import('https://assets.acdn.no/pkg/@amedia/browserid/v1/index.js')
                  : { getBrowserId: null, getVisitId: null };
              const [domainBrowserId, domainVisitId, pageViewId, userKey] = yield Promise.all([
                  isLocalHost$1 ? localhostBrowserId : getBrowserId(),
                  isLocalHost$1 ? localhostDomainVisitId : getVisitId(),
                  isLocalHost$1 ? localhostPageViewId : getPageViewId(),
                  isLocalHost$1 ? localhostUserKey : userKeyPromise,
              ]);
              return Object.assign(Object.assign({ pageViewId, domainBrowserId: domainBrowserId || "", domainVisitId: domainVisitId || "" }, (userKey && { userKey })), { siteKey,
                  logger, payload: {} });
          });
      }

      let responseEnd = Math.round(Date.now());
      self.addEventListener('adp:url-change', () => {
          responseEnd = Date.now();
      });
      function getEventData() {
          return Promise.resolve({
              // We cannot use perfomance.now since a single page app wont change time origin.
              deltaTimestamp: Date.now() - responseEnd,
          });
      }

      class ADPTypeError extends TypeError {
          constructor(className, path) {
              super();
              this.name = 'ADPTypeError';
              this.message = `Could not create ${className} instance. "${path}" must be `;
          }
      }
      class StringError extends ADPTypeError {
          constructor(className, path, value) {
              super(className, path);
              this.name = 'StringError';
              this.message += `a "String". Value is "${JSON.stringify(value)}"`;
          }
      }
      class NumberError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'NumberError';
              this.message += 'a "Float Number"';
          }
      }
      class IntegerError extends ADPTypeError {
          constructor(className, path, value) {
              super(className, path);
              this.name = 'IntegerError';
              this.message += `an "Integer". Value is "${JSON.stringify(value)}"`;
          }
      }
      class BooleanError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'BooleanError';
              this.message += 'a Boolean"';
          }
      }
      class ObjectError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'ObjectError';
              this.message += 'an "Object"';
          }
      }
      class ArrayError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'ArrayError';
              this.message += 'an Array';
          }
      }
      class MultiError extends ADPTypeError {
          constructor(className, types, path, extra = "") {
              super(className, path);
              this.name = 'MultiError';
              this.message += `one of ${types.join()} extra: ${extra}`;
          }
      }
      class UriError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'UriError';
              this.message += 'a valid uri';
          }
      }
      class DateTimeError extends ADPTypeError {
          constructor(className, path) {
              super(className, path);
              this.name = 'DateTimeError';
              this.message += 'a valid date-time';
          }
      }
      class AllowedValuesError extends ADPTypeError {
          constructor(className, path, allowedValues, currentValue) {
              super(className, path);
              this.name = 'AllowedValuesError';
              this.message += `one of ${allowedValues.join(', ')}. Current value is "${JSON.stringify(currentValue)}"`;
          }
      }
      class AllowedValueError extends ADPTypeError {
          constructor(className, path, allowedValue, currentValue) {
              super(className, path);
              this.name = 'AllowedValueError';
              this.message += `'${allowedValue}'. Current Value is '${currentValue}'.`;
          }
      }
      class NoIndexedDB extends Error {
          constructor(message = '') {
              super(message);
              this.name = 'NoIndexedDB';
          }
      }
      class WrongModeIndexedDB extends Error {
          constructor(message) {
              super(message);
              this.name = 'WrongModeIndexedDB';
          }
      }
      class NoLocalStorage extends Error {
          constructor(message = '') {
              super(message);
              this.name = 'NoLocalStorage';
          }
      }

      function localStorageAvailable() {
          let storage;
          try {
              storage = window.localStorage;
              const x = "__storage_test__";
              storage.setItem(x, x);
              storage.removeItem(x);
              return true;
          }
          catch (e) {
              return (e instanceof DOMException &&
                  // everything except Firefox
                  (e.code === 22 ||
                      // Firefox
                      e.code === 1014 ||
                      // test name field too, because code might not be present
                      // everything except Firefox
                      e.name === "QuotaExceededError" ||
                      // Firefox
                      e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                  // acknowledge QuotaExceededError only if there's something already stored
                  // @ts-ignore
                  storage &&
                  storage.length !== 0);
          }
      }
      function getStorage(name, func) {
          try {
              const storage = JSON.parse(window.localStorage.getItem(`adp:${name}`) || "{}");
              const result = func(storage);
              window.localStorage.setItem(`adp:${name}`, JSON.stringify(storage));
              return result;
          }
          catch (e) {
              if (!localStorageAvailable) {
                  console.error("No local storage available.");
              }
              else {
                  console.error(`Failed to get local storage. Error: ${e}`);
              }
              //@ts-ignore
              return new FakeRejectPromise(new NoLocalStorage());
          }
      }
      function getStore$3(name) {
          if (!localStorageAvailable) {
              //@ts-ignore
              return new FakeRejectPromise(new NoLocalStorage());
          }
          const get = getStorage.bind(null, name);
          return new FakePromise({
              put: (value, key) => get((store) => {
                  store[key] = value;
                  return new FakePromise();
              }),
              del: (key) => get((store) => {
                  delete store[key];
                  return new FakePromise();
              }),
              get: (key) => get((store) => new FakePromise(store[key])),
              list: () => get((store) => {
                  const keys = Object.keys(store);
                  return new FakePromise(keys);
              }),
              add: (value, key) => get((store) => {
                  store[key] = value;
                  return new FakePromise();
              }),
              close: () => new FakePromise(),
          });
      }
      function flush$2(name = "events") {
          return getStorage(name, (store) => {
              const result = Object.keys(store).map((key) => {
                  const value = store[key];
                  delete store[key];
                  return value;
              });
              return new FakePromise(result);
          });
      }
      function getEvents() {
          return getStorage("events", (store) => {
              const result = Object.keys(store).map((key) => {
                  const value = store[key];
                  return value;
              });
              return new FakePromise(result);
          });
      }

      var webStorage = /*#__PURE__*/Object.freeze({
          __proto__: null,
          localStorageAvailable: localStorageAvailable,
          getStore: getStore$3,
          flush: flush$2,
          getEvents: getEvents
      });

      const DB_NAME = 'adplogger-store';
      function methodFactory(transaction, storeName, method, ...args) {
          const store = transaction.objectStore(storeName);
          const req = store[method](...args);
          return new Promise((resolve, reject) => {
              req.onerror = () => reject(req.error);
              req.onsuccess = () => resolve(req.result);
          });
      }
      function putUnavailable() {
          return Promise.reject(new WrongModeIndexedDB('Mode must be "readwrite" to use put/delete'));
      }
      function getStore$2(name, mode = 'readonly') {
          if (typeof self.indexedDB === 'undefined') {
              return Promise.reject(new NoIndexedDB('IndexedDB not available'));
          }
          return new Promise((resolve, reject) => {
              const openreq = self.indexedDB.open(DB_NAME, 1);
              openreq.onerror = () => reject(openreq.error);
              openreq.onsuccess = () => {
                  const db = openreq.result;
                  // @ts-ignore
                  const tx = db.transaction(name, mode);
                  const put = mode === 'readwrite' ?
                      methodFactory.bind(null, tx, name, 'put') : putUnavailable;
                  const del = mode === 'readwrite' ?
                      methodFactory.bind(null, tx, name, 'delete') : putUnavailable;
                  resolve({
                      put,
                      del,
                      get: methodFactory.bind(null, tx, name, 'get'),
                      add: methodFactory.bind(null, tx, name, 'add'),
                      tx,
                      close: () => Promise.resolve(db.close()),
                  });
              };
              // First time setup: create an empty object store
              openreq.onupgradeneeded = () => {
                  openreq.result.createObjectStore("events");
              };
          });
      }
      function flush$1(name = 'events') {
          return __awaiter(this, void 0, void 0, function* () {
              const store = yield getStore$2(name, 'readwrite');
              const { tx } = store;
              const objectStore = tx.objectStore(name);
              let resolve;
              let reject;
              const data = [];
              const result = new Promise((_resolve, _reject) => {
                  resolve = _resolve;
                  reject = _reject;
              });
              const req = objectStore.openCursor();
              tx.onerror = () => reject(tx.error);
              // Older Safari do not support keyCursor
              req.onsuccess = (evt) => {
                  const cursor = evt.target.result;
                  if (!cursor) {
                      objectStore.clear().onsuccess = store.close;
                      resolve(data);
                      return;
                  }
                  data.push(cursor.value);
                  cursor.continue();
              };
              return yield result;
          });
      }

      var idb = /*#__PURE__*/Object.freeze({
          __proto__: null,
          getStore: getStore$2,
          flush: flush$1
      });

      const ConstErrorData = {
          message: '',
          level: '',
          type: '',
      };

      /**
       * Based on https://www.stacktracejs.com/
       * @module /lib/events/error/stackframe
       * @typicalname stackframe
       */
      function _capitalize(str) {
          return str.charAt(0).toUpperCase() + str.substring(1);
      }
      function _getter(p) {
          return function () {
              return this[p];
          };
      }
      const booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
      const numericProps = ['columnNumber', 'lineNumber'];
      const stringProps = ['fileName', 'functionName', 'source'];
      const stackframeProperties = [...booleanProps, ...numericProps, ...stringProps];
      /**
       * Class representing a StackFrame
       * @class StackFrame
       * @property {boolean} [isConstructor]
       * @property {boolean} [isEval]
       * @property {boolean} [isNative]
       * @property {boolean} [isToplevel]
       * @property {number} [columnNumber]
       * @property {number} [lineNumber]
       * @property {string} [fileName]
       * @property {string} [functionName]
       * @property {string} [source]
       */
      class StackFrame {
          /**
           * @param {object} obj An object of properties to set on the StackFrame object
           */
          constructor(obj = {}) {
              stackframeProperties
                  .filter(prop => typeof obj[prop] !== 'undefined')
                  .forEach(prop => this[`set${_capitalize(prop)}`](obj[prop]));
          }
      }
      function createGetterAndSetter(props, setter) {
          props.forEach((prop) => {
              const name = _capitalize(prop);
              StackFrame.prototype[`get${name}`] = _getter(prop);
              StackFrame.prototype[`set${name}`] = setter(prop);
          });
      }
      createGetterAndSetter(booleanProps, p => function (v) {
          this[p] = Boolean(v);
      });
      createGetterAndSetter(numericProps, p => function (v) {
          if (!isNaN(parseFloat(v)) && isFinite(v)) {
              this[p] = Number(v);
          }
      });
      createGetterAndSetter(stringProps, p => function (v) {
          this[p] = String(v);
      });

      /**
       * @module /lib/events/error/stack-parser
       * @typicalname stackParser
       */
      const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
      const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
      function extractLocation(urlLike) {
          // Fail-fast but return locations like "(native)"
          if (!urlLike.includes(':')) {
              return [urlLike];
          }
          const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
          const parts = regExp.exec(urlLike.replace(/[()]/g, ''));
          return [parts[1], parts[2] || undefined, parts[3] || undefined];
      }
      function parseV8OrIE(error) {
          return error.stack
              .split('\n')
              .filter(line => !!line.match(CHROME_IE_STACK_REGEXP))
              .map((line) => {
              if (line.includes('(eval ')) {
                  // Throw away eval information
                  line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
              }
              let sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');
              // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
              // case it has spaces in it, as the string is split on \s+ later on
              const location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
              // remove the parenthesized location from the line, if it was matched
              sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
              const tokens = sanitizedLine.split(/\s+/).slice(1);
              // if a location was matched, pass it to extractLocation() otherwise pop the last token
              const locationParts = extractLocation(location ? location[1] : tokens.pop());
              const functionName = tokens.join(' ') || undefined;
              const fileName = ['eval', '<anonymous>'].includes(locationParts[0]) ? undefined : locationParts[0];
              return new StackFrame({
                  functionName,
                  fileName,
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
              });
          });
      }
      function parseFFOrSafari(error) {
          return error.stack
              .split('\n')
              .filter(line => !line.match(SAFARI_NATIVE_CODE_REGEXP))
              .map((line) => {
              // Throw away eval information
              if (line.includes(' > eval')) {
                  line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
              }
              if (!line.includes('@') && !line.includes(':')) {
                  // Safari eval frames only have function names and nothing else
                  return new StackFrame({
                      functionName: line
                  });
              }
              const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
              const matches = line.match(functionNameRegex);
              const functionName = matches && matches[1] ? matches[1] : undefined;
              const locationParts = extractLocation(line.replace(functionNameRegex, ''));
              return new StackFrame({
                  functionName,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
              });
          });
      }
      /**
       * Parses an Error object to a normalized [Stackframe](https://github.com/stacktracejs/error-stack-parser/)
       * object
       * @param {Error} error
       * @returns { StackFrame }
       */
      function parseErrorStack(error) {
          if (!error.stack) {
              return [];
          }
          if (error.stack.match(CHROME_IE_STACK_REGEXP)) {
              return parseV8OrIE(error);
          }
          return parseFFOrSafari(error);
      }

      /**
       * This module exposes a logError method, wraps console.error
       * and logs all global errors to the server.
       * @module /lib/events/error/error
       * @typicalname error
       */
      /**
       * Log an Error event to the server
       * @param { Object } data The Error Event payload
       * @param { HTMLElement } [element] An optional HTML element assosiated with the error
       */
      let lastData;
      let lastElement;
      function logError(data, element, trace = "") {
          if ((data === lastData && element === lastElement)) {
              return;
          }
          if (typeof data === "string") {
              throw new Error(`"logError" failed. Argument must be an object of type ${Object.keys(ConstErrorData)}`);
          }
          if (typeof data !== "object") {
              throw new Error('"logError" failed. Argument must be an object or a string');
          }
          lastData = data;
          lastElement = element;
          data.stacktrace = parseErrorStack(data);
          if (data.message === "" && data.stacktrace.length === 0) {
              return Promise.resolve();
          }
          if (data.message.toString().substr(0, 2) !== "V:") {
              data.message = "E:" + version$1 + " " + data.message;
          }
          return log("ErrorEvent", data, element || getRoot()).catch(() => { });
      }
      // This was removed to test if we will miss errors
      //ready(initErrorLogTracker);

      const libs = {
          globalVar,
          webStorage,
          idb,
      };
      let currentLib = "webStorage";
      window.addEventListener("adplogger:store-init", () => {
          checkIfIDBisAvailable();
      });
      // Check if idb is available and functioning
      function checkIfIDBisAvailable() {
          return __awaiter(this, void 0, void 0, function* () {
              if (typeof self.indexedDB === "undefined") {
                  return Promise.reject(new NoIndexedDB("IndexedDB not available"));
              }
              else {
                  getStore$2("events", "readwrite").then((store) => {
                      store
                          .get("test")
                          .then((value) => {
                          if (value !== "idbtest") {
                              store.add("idbtest", "test");
                          }
                      })
                          .then(() => store.del("test"))
                          .then(() => store.close())
                          .then(() => upgradeToIDB())
                          .catch((e) => {
                          logError({
                              type: "error",
                              message: `Browser cannot do necessary operations with IndexedDB. Continue using webstorage. ${e}`,
                              level: "warning",
                          }, null);
                      });
                  });
              }
          });
      }
      function upgradeToIDB() {
          currentLib = "idb";
          //TODO: This is casting an error. Figure out why
          //@ts-ignore
          Promise.all([flush$2("events"), flush$3("events")])
              //TODO: This is casting an error. Figure out why
              //@ts-ignore
              .then((d1, d2) => [
              {
                  name: "events",
                  value: Object.assign(Object.assign({}, d1), d2),
              },
          ])
              // Open the idb store and add all values to idb
              .then((dbs) => {
              Promise.all(dbs.map((db) => getStore$2(db.name, "readwrite")
                  //TODO: Remove any and give it a proper type
                  .then((store) => Promise.all(Object.keys(db.value).map((key) => db.value[key].forEach((evt) => {
                  store.add(evt, v4());
              }))).then(() => {
                  store.close();
              }))));
          })
              .catch((e) => {
              logError({
                  type: "error",
                  message: `Error when transferring events from localstorage to IndexedDB. ${e}`,
                  level: "warning",
              }, null);
          });
      }
      function createMethod(methodName) {
          return function creator(...args) {
              const res = libs[currentLib][methodName](...args).catch((err) => {
                  // downgrade on error
                  if (err instanceof NoIndexedDB) {
                      currentLib = "webStorage";
                      return libs[currentLib][methodName](...args);
                  }
                  if (err instanceof NoLocalStorage) {
                      currentLib = "globalVar";
                      return libs[currentLib][methodName](...args);
                  }
                  throw err;
              });
              return res;
          };
      }
      const getStore$1 = createMethod("getStore");
      const flush = createMethod("flush");

      function optionalFieldsErrorHandler(errors) {
          errors.forEach((error) => {
              if (getEnvironment() === "localhost" || getEnvironment() === "snap") {
                  console.warn(`V:${version$1}. Adplogger failed to validate field: ${error}`);
              }
              else {
                  logError({
                      type: "error",
                      message: `V:${version$1}. ${error}`,
                      level: "warning",
                  }, null);
              }
          });
      }

      const typeTest = {
          string: (prop) => typeof prop === "string",
          object: (prop) => Object.prototype.toString.call(prop) === "[object Object]",
          number: (prop) => !isNaN(parseFloat(prop)),
          integer: (prop) => !isNaN(parseInt(prop, 10)) && Number(prop) % 1 === 0,
          boolean: (prop) => typeof prop === "boolean" || prop === "true" || prop === "false",
          array: (prop) => Array.isArray(prop),
      };
      function string(className, key, prop) {
          if (!typeTest.string(prop)) {
              throw new StringError(className, key, prop);
          }
      }
      function object(className, key, prop) {
          if (!typeTest.object(prop)) {
              throw new ObjectError(className, key);
          }
      }
      function number(className, key, prop) {
          if (!typeTest.number(prop)) {
              throw new NumberError(className, key);
          }
      }
      function integer(className, key, prop) {
          if (!typeTest.integer(prop)) {
              throw new IntegerError(className, key, prop);
          }
      }
      function boolean(className, key, prop) {
          if (!typeTest.boolean(prop)) {
              throw new BooleanError(className, key);
          }
      }
      function array(className, key, prop) {
          if (!typeTest.array(prop)) {
              throw new ArrayError(className, key);
          }
      }
      // Not an exact uri format. Also accepts relative uri
      const uriPattern = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i;
      function uri(className, key, prop) {
          if (!uriPattern.test(prop)) {
              throw new UriError(className, key);
          }
      }
      const dateTimePattern = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;
      function dateTime(className, key, prop) {
          if (!dateTimePattern.test(prop)) {
              throw new DateTimeError(className, key);
          }
      }
      function multitype(className, key, types, prop) {
          if (!types.some(type => typeTest[type](prop))) {
              console.log(`-----> Types ${types} Key ${key} Prop ${prop}`);
              throw new MultiError(className, types, key, prop);
          }
      }
      function oneOf(className, key, allowedValues, prop) {
          if (!allowedValues.includes(prop)) {
              throw new AllowedValuesError(className, key, allowedValues, prop);
          }
      }
      function hasValue(className, key, allowedValue, prop) {
          if (allowedValue !== prop) {
              throw new AllowedValueError(className, key, allowedValue, prop);
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Common {
          constructor(data, isExtended = false) {
              let optionalFieldsErrors = [];
              string('Common', 'domainBrowserId', data.domainBrowserId);
              this.domainBrowserId = data.domainBrowserId;
              string('Common', 'domainVisitId', data.domainVisitId);
              this.domainVisitId = data.domainVisitId;
              string('Common', 'siteKey', data.siteKey);
              this.siteKey = data.siteKey;
              string('Common', 'pageViewId', data.pageViewId);
              this.pageViewId = data.pageViewId;
              try {
                  if (data.userKey !== undefined) {
                      string('Common', 'userKey', data.userKey);
                      this.userKey = data.userKey;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('Common', 'logger', data.logger);
              this.logger = data.logger;
              object('Common', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.schemaName !== undefined) {
                      string('Common', 'schemaName', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'common';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Definitions {
          constructor(data) {
              let optionalFieldsErrors = [];
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class AdpEvent extends Common {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('AdpEvent', 'schemaName', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('AdpEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              integer('AdpEvent', 'payload.deltaTimestamp', data.payload.deltaTimestamp);
              this.payload.deltaTimestamp = parseInt(data.payload.deltaTimestamp, 10);
              string('AdpEvent', 'payload.concernsMeta', data.payload.concernsMeta);
              this.payload.concernsMeta = data.payload.concernsMeta;
              try {
                  if (data.payload.contentId !== undefined) {
                      string('AdpEvent', 'payload.contentId', data.payload.contentId);
                      this.payload.contentId = data.payload.contentId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.metaType !== undefined) {
                      string('AdpEvent', 'payload.metaType', data.payload.metaType);
                      oneOf('AdpEvent', 'payload.metaType', ['MetaElement', 'Page', 'WebPageElement', 'Article', 'Teaser', 'Video', 'navigation', 'resource', 'meta-comment', 'meta-custom', 'meta-error', 'meta-prebid', 'meta-legacy', 'NewsArticle', 'AdvertiserContentArticle', 'OpinionNewsArticle', 'ReviewNewsArticle', 'CollectionPage', 'ImageGallery', 'VideoGallery', 'CustomElement', 'WPAdBlock', 'MetaEmbed', 'CallToAction'], data.payload.metaType);
                      this.payload.metaType = data.payload.metaType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('AdpEvent', 'payload.type', data.payload.type);
              oneOf('AdpEvent', 'payload.type', ['click', 'scroll', 'inscreen', 'purchase', 'registration', 'video', 'video-ad', 'comment', 'custom', 'error', 'prebid', 'legacy', 'performance', 'web-vitals'], data.payload.type);
              this.payload.type = data.payload.type;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class ClickEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('ClickEvent', 'schemaName', data.schemaName);
                      hasValue('ClickEvent', 'schemaName', 'event-click', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-click';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('ClickEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.link !== undefined) {
                      string('ClickEvent', 'payload.link', data.payload.link);
                      uri('ClickEvent', 'payload.link', data.payload.link);
                      this.payload.link = data.payload.link;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('ClickEvent', 'payload.cssSelector', data.payload.cssSelector);
              this.payload.cssSelector = data.payload.cssSelector;
              integer('ClickEvent', 'payload.coordinateX', data.payload.coordinateX);
              this.payload.coordinateX = parseInt(data.payload.coordinateX, 10);
              integer('ClickEvent', 'payload.coordinateY', data.payload.coordinateY);
              this.payload.coordinateY = parseInt(data.payload.coordinateY, 10);
              string('ClickEvent', 'payload.type', data.payload.type);
              hasValue('ClickEvent', 'payload.type', 'click', data.payload.type);
              this.payload.type = data.payload.type;
              try {
                  if (data.payload.clickLabel !== undefined) {
                      string('ClickEvent', 'payload.clickLabel', data.payload.clickLabel);
                      this.payload.clickLabel = data.payload.clickLabel;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.clickValue !== undefined) {
                      string('ClickEvent', 'payload.clickValue', data.payload.clickValue);
                      this.payload.clickValue = data.payload.clickValue;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class CommentEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('CommentEvent', 'schemaName', data.schemaName);
                      hasValue('CommentEvent', 'schemaName', 'event-comment', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-comment';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('CommentEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('CommentEvent', 'payload.type', data.payload.type);
              hasValue('CommentEvent', 'payload.type', 'comment', data.payload.type);
              this.payload.type = data.payload.type;
              string('CommentEvent', 'payload.action', data.payload.action);
              oneOf('CommentEvent', 'payload.action', ['created', 'edited', 'deleted'], data.payload.action);
              this.payload.action = data.payload.action;
              string('CommentEvent', 'payload.messageId', data.payload.messageId);
              this.payload.messageId = data.payload.messageId;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class CustomEvent$1 extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('CustomEvent', 'schemaName', data.schemaName);
                      hasValue('CustomEvent', 'schemaName', 'event-custom', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-custom';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('CustomEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('CustomEvent', 'payload.type', data.payload.type);
              hasValue('CustomEvent', 'payload.type', 'custom', data.payload.type);
              this.payload.type = data.payload.type;
              try {
                  if (data.payload.data !== undefined) {
                      string('CustomEvent', 'payload.data', data.payload.data);
                      this.payload.data = data.payload.data;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.name !== undefined) {
                      string('CustomEvent', 'payload.name', data.payload.name);
                      this.payload.name = data.payload.name;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class ErrorEvent$1 extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              try {
                  if (data.schemaName !== undefined) {
                      string('ErrorEvent', 'schemaName', data.schemaName);
                      hasValue('ErrorEvent', 'schemaName', 'event-error', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-error';
                  }
              } catch (error) {
              }
              object('ErrorEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('ErrorEvent', 'payload.type', data.payload.type);
              hasValue('ErrorEvent', 'payload.type', 'error', data.payload.type);
              this.payload.type = data.payload.type;
              string('ErrorEvent', 'payload.level', data.payload.level);
              oneOf('ErrorEvent', 'payload.level', ['fatal', 'error', 'warning', 'info', 'debug'], data.payload.level);
              this.payload.level = data.payload.level;
              string('ErrorEvent', 'payload.message', data.payload.message);
              this.payload.message = data.payload.message;
              try {
                  if (data.payload.stacktrace !== undefined) {
                      array('ErrorEvent', 'payload.stacktrace', data.payload.stacktrace);
                      this.payload.stacktrace = data.payload.stacktrace.map((item) => {
                          const result = {};
                          try {
                              if (item !== undefined) {
                                  object('ErrorEvent', 'item', item);
                                  result.item = result.item || {};
                                  try {
                                      if (item.isConstructor !== undefined) {
                                          boolean('ErrorEvent', 'item.isConstructor', item.isConstructor);
                                          result.item.isConstructor = typeof item.isConstructor === 'string' ? item.isConstructor === 'true' : item.isConstructor;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.isEval !== undefined) {
                                          boolean('ErrorEvent', 'item.isEval', item.isEval);
                                          result.item.isEval = typeof item.isEval === 'string' ? item.isEval === 'true' : item.isEval;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.isNative !== undefined) {
                                          boolean('ErrorEvent', 'item.isNative', item.isNative);
                                          result.item.isNative = typeof item.isNative === 'string' ? item.isNative === 'true' : item.isNative;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.isToplevel !== undefined) {
                                          boolean('ErrorEvent', 'item.isToplevel', item.isToplevel);
                                          result.item.isToplevel = typeof item.isToplevel === 'string' ? item.isToplevel === 'true' : item.isToplevel;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.columnNumber !== undefined) {
                                          integer('ErrorEvent', 'item.columnNumber', item.columnNumber);
                                          result.item.columnNumber = parseInt(item.columnNumber, 10);
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.lineNumber !== undefined) {
                                          integer('ErrorEvent', 'item.lineNumber', item.lineNumber);
                                          result.item.lineNumber = parseInt(item.lineNumber, 10);
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.fileName !== undefined) {
                                          string('ErrorEvent', 'item.fileName', item.fileName);
                                          result.item.fileName = item.fileName;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.functionName !== undefined) {
                                          string('ErrorEvent', 'item.functionName', item.functionName);
                                          result.item.functionName = item.functionName;
                                      }
                                  } catch (error) {
                                  }
                                  try {
                                      if (item.source !== undefined) {
                                          string('ErrorEvent', 'item.source', item.source);
                                          result.item.source = item.source;
                                      }
                                  } catch (error) {
                                  }
                              }
                          } catch (error) {
                          }
                          return result.item;
                      });
                  }
              } catch (error) {
              }
              try {
                  if (data.payload.source !== undefined) {
                      string('ErrorEvent', 'payload.source', data.payload.source);
                      this.payload.source = data.payload.source;
                  }
              } catch (error) {
              }
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class InscreenEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('InscreenEvent', 'schemaName', data.schemaName);
                      hasValue('InscreenEvent', 'schemaName', 'event-inscreen', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-inscreen';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('InscreenEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('InscreenEvent', 'payload.type', data.payload.type);
              hasValue('InscreenEvent', 'payload.type', 'inscreen', data.payload.type);
              this.payload.type = data.payload.type;
              integer('InscreenEvent', 'payload.duration', data.payload.duration);
              this.payload.duration = parseInt(data.payload.duration, 10);
              try {
                  if (data.payload.area !== undefined) {
                      integer('InscreenEvent', 'payload.area', data.payload.area);
                      this.payload.area = parseInt(data.payload.area, 10);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              integer('InscreenEvent', 'payload.deltaTimestamp', data.payload.deltaTimestamp);
              this.payload.deltaTimestamp = parseInt(data.payload.deltaTimestamp, 10);
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class LegacyEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('LegacyEvent', 'schemaName', data.schemaName);
                      hasValue('LegacyEvent', 'schemaName', 'event-legacy', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-legacy';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('LegacyEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('LegacyEvent', 'payload.type', data.payload.type);
              hasValue('LegacyEvent', 'payload.type', 'legacy', data.payload.type);
              this.payload.type = data.payload.type;
              array('LegacyEvent', 'payload.data', data.payload.data);
              this.payload.data = data.payload.data.map((item) => {
                  const result = {};
                  try {
                      if (item !== undefined) {
                          object('LegacyEvent', 'item', item);
                          result.item = result.item || {};
                          string('LegacyEvent', 'item.name', item.name);
                          result.item.name = item.name;
                          multitype('LegacyEvent', 'item.value', ['string'], item.value);
                          result.item.value = item.value;
                      }
                  } catch (error) {
                      optionalFieldsErrors.push(error);
                  }
                  return result.item;
              });
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class PerformanceEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('PerformanceEvent', 'schemaName', data.schemaName);
                      hasValue('PerformanceEvent', 'schemaName', 'event-performance', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-performance';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('PerformanceEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('PerformanceEvent', 'payload.type', data.payload.type);
              hasValue('PerformanceEvent', 'payload.type', 'performance', data.payload.type);
              this.payload.type = data.payload.type;
              try {
                  if (data.payload.fp !== undefined) {
                      number('PerformanceEvent', 'payload.fp', data.payload.fp);
                      this.payload.fp = parseFloat(data.payload.fp);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.fcp !== undefined) {
                      number('PerformanceEvent', 'payload.fcp', data.payload.fcp);
                      this.payload.fcp = parseFloat(data.payload.fcp);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.domInteractive !== undefined) {
                      number('PerformanceEvent', 'payload.domInteractive', data.payload.domInteractive);
                      this.payload.domInteractive = parseFloat(data.payload.domInteractive);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.domContentLoaded !== undefined) {
                      number('PerformanceEvent', 'payload.domContentLoaded', data.payload.domContentLoaded);
                      this.payload.domContentLoaded = parseFloat(data.payload.domContentLoaded);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.domComplete !== undefined) {
                      number('PerformanceEvent', 'payload.domComplete', data.payload.domComplete);
                      this.payload.domComplete = parseFloat(data.payload.domComplete);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class PlaybackAdEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('PlaybackAdEvent', 'schemaName', data.schemaName);
                      hasValue('PlaybackAdEvent', 'schemaName', 'event-playback-ad', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-playback-ad';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('PlaybackAdEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.adpType !== undefined) {
                      string('PlaybackAdEvent', 'payload.adpType', data.payload.adpType);
                      oneOf('PlaybackAdEvent', 'payload.adpType', ['ad-started', 'ad-skipped', 'ad-blocked', 'ad-completed', 'ad-resumed', 'ad-paused'], data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adType !== undefined) {
                      string('PlaybackAdEvent', 'payload.adType', data.payload.adType);
                      this.payload.adType = data.payload.adType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adId !== undefined) {
                      string('PlaybackAdEvent', 'payload.adId', data.payload.adId);
                      this.payload.adId = data.payload.adId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.currentTime !== undefined) {
                      number('PlaybackAdEvent', 'payload.currentTime', data.payload.currentTime);
                      this.payload.currentTime = parseFloat(data.payload.currentTime);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.duration !== undefined) {
                      number('PlaybackAdEvent', 'payload.duration', data.payload.duration);
                      this.payload.duration = parseFloat(data.payload.duration);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.length !== undefined) {
                      number('PlaybackAdEvent', 'payload.length', data.payload.length);
                      this.payload.length = parseFloat(data.payload.length);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('PlaybackAdEvent', 'payload.type', data.payload.type);
              hasValue('PlaybackAdEvent', 'payload.type', 'video-ad', data.payload.type);
              this.payload.type = data.payload.type;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class VideoEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('VideoEvent', 'schemaName', data.schemaName);
                      hasValue('VideoEvent', 'schemaName', 'event-playback', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-playback';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('VideoEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.adpType !== undefined) {
                      string('VideoEvent', 'payload.adpType', data.payload.adpType);
                      oneOf('VideoEvent', 'payload.adpType', ['fullscreenenter', 'fullscreenexit', 'muted', 'ended', 'pause', 'playing', 'loadstart', 'loadeddata', 'loadedmetadata', 'resize', 'seeking', 'seeked', 'volumechange', 'cuepointstart', 'cuepointend', 'timeupdate'], data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.currentTime !== undefined) {
                      number('VideoEvent', 'payload.currentTime', data.payload.currentTime);
                      this.payload.currentTime = parseFloat(data.payload.currentTime);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.duration !== undefined) {
                      number('VideoEvent', 'payload.duration', data.payload.duration);
                      this.payload.duration = parseFloat(data.payload.duration);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.volume !== undefined) {
                      integer('VideoEvent', 'payload.volume', data.payload.volume);
                      this.payload.volume = parseInt(data.payload.volume, 10);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.playbackRate !== undefined) {
                      integer('VideoEvent', 'payload.playbackRate', data.payload.playbackRate);
                      this.payload.playbackRate = parseInt(data.payload.playbackRate, 10);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('VideoEvent', 'payload.type', data.payload.type);
              hasValue('VideoEvent', 'payload.type', 'video', data.payload.type);
              this.payload.type = data.payload.type;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class PrebidEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('PrebidEvent', 'schemaName', data.schemaName);
                      hasValue('PrebidEvent', 'schemaName', 'event-prebid', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-prebid';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('PrebidEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('PrebidEvent', 'payload.bidder', data.payload.bidder);
              this.payload.bidder = data.payload.bidder;
              string('PrebidEvent', 'payload.adUnitCode', data.payload.adUnitCode);
              this.payload.adUnitCode = data.payload.adUnitCode;
              try {
                  if (data.payload.adType !== undefined) {
                      string('PrebidEvent', 'payload.adType', data.payload.adType);
                      oneOf('PrebidEvent', 'payload.adType', ['banner', 'native'], data.payload.adType);
                      this.payload.adType = data.payload.adType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              number('PrebidEvent', 'payload.cpm', data.payload.cpm);
              this.payload.cpm = parseFloat(data.payload.cpm);
              boolean('PrebidEvent', 'payload.won', data.payload.won);
              this.payload.won = typeof data.payload.won === 'string' ? data.payload.won === 'true' : data.payload.won;
              integer('PrebidEvent', 'payload.timeToRespond', data.payload.timeToRespond);
              this.payload.timeToRespond = parseInt(data.payload.timeToRespond, 10);
              string('PrebidEvent', 'payload.type', data.payload.type);
              hasValue('PrebidEvent', 'payload.type', 'prebid', data.payload.type);
              this.payload.type = data.payload.type;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class ScrollEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('ScrollEvent', 'schemaName', data.schemaName);
                      hasValue('ScrollEvent', 'schemaName', 'event-scroll', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-scroll';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('ScrollEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              integer('ScrollEvent', 'payload.start', data.payload.start);
              this.payload.start = parseInt(data.payload.start, 10);
              integer('ScrollEvent', 'payload.stop', data.payload.stop);
              this.payload.stop = parseInt(data.payload.stop, 10);
              integer('ScrollEvent', 'payload.duration', data.payload.duration);
              this.payload.duration = parseInt(data.payload.duration, 10);
              integer('ScrollEvent', 'payload.max', data.payload.max);
              this.payload.max = parseInt(data.payload.max, 10);
              string('ScrollEvent', 'payload.type', data.payload.type);
              hasValue('ScrollEvent', 'payload.type', 'scroll', data.payload.type);
              this.payload.type = data.payload.type;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class WebVitalsEvent extends AdpEvent {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('WebVitalsEvent', 'schemaName', data.schemaName);
                      hasValue('WebVitalsEvent', 'schemaName', 'event-web-vitals', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'event-web-vitals';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('WebVitalsEvent', 'payload', data.payload);
              this.payload = this.payload || {};
              string('WebVitalsEvent', 'payload.type', data.payload.type);
              hasValue('WebVitalsEvent', 'payload.type', 'web-vitals', data.payload.type);
              this.payload.type = data.payload.type;
              try {
                  if (data.payload.lcp !== undefined) {
                      number('WebVitalsEvent', 'payload.lcp', data.payload.lcp);
                      this.payload.lcp = parseFloat(data.payload.lcp);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.fcp !== undefined) {
                      number('WebVitalsEvent', 'payload.fcp', data.payload.fcp);
                      this.payload.fcp = parseFloat(data.payload.fcp);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.cls !== undefined) {
                      number('WebVitalsEvent', 'payload.cls', data.payload.cls);
                      this.payload.cls = parseFloat(data.payload.cls);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.ttfb !== undefined) {
                      number('WebVitalsEvent', 'payload.ttfb', data.payload.ttfb);
                      this.payload.ttfb = parseFloat(data.payload.ttfb);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class MetaElement extends Common {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('MetaElement', 'schemaName', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-element';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('MetaElement', 'payload', data.payload);
              this.payload = this.payload || {};
              string('MetaElement', 'payload.id', data.payload.id);
              this.payload.id = data.payload.id;
              try {
                  if (data.payload.position !== undefined) {
                      integer('MetaElement', 'payload.position', data.payload.position);
                      this.payload.position = parseInt(data.payload.position, 10);
                  } else if (!isExtended) {
                      this.payload.position = 0;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.type !== undefined) {
                      string('MetaElement', 'payload.type', data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'WebPageElement';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('MetaElement', 'payload.adpType', data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.parent !== undefined) {
                      string('MetaElement', 'payload.parent', data.payload.parent);
                      this.payload.parent = data.payload.parent;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.productFeature !== undefined) {
                      string('MetaElement', 'payload.productFeature', data.payload.productFeature);
                      this.payload.productFeature = data.payload.productFeature;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.cssSelector !== undefined) {
                      string('MetaElement', 'payload.cssSelector', data.payload.cssSelector);
                      this.payload.cssSelector = data.payload.cssSelector;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class WPAdBlock extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('WPAdBlock', 'schemaName', data.schemaName);
                      hasValue('WPAdBlock', 'schemaName', 'meta-ad', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-ad';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('WPAdBlock', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('WPAdBlock', 'payload.type', data.payload.type);
                      hasValue('WPAdBlock', 'payload.type', 'WPAdBlock', data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'WPAdBlock';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('WPAdBlock', 'payload.adpType', data.payload.adpType);
                      hasValue('WPAdBlock', 'payload.adpType', 'ad', data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  } else if (!isExtended) {
                      this.payload.adpType = 'ad';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('WPAdBlock', 'payload.name', data.payload.name);
              this.payload.name = data.payload.name;
              try {
                  if (data.payload.position !== undefined) {
                      integer('WPAdBlock', 'payload.position', data.payload.position);
                      this.payload.position = parseInt(data.payload.position, 10);
                  } else if (!isExtended) {
                      this.payload.position = 0;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('WPAdBlock', 'payload.unit', data.payload.unit);
              this.payload.unit = data.payload.unit;
              string('WPAdBlock', 'payload.lineItem', data.payload.lineItem);
              this.payload.lineItem = data.payload.lineItem;
              string('WPAdBlock', 'payload.advertiser', data.payload.advertiser);
              this.payload.advertiser = data.payload.advertiser;
              string('WPAdBlock', 'payload.creative', data.payload.creative);
              this.payload.creative = data.payload.creative;
              try {
                  if (data.payload.order !== undefined) {
                      string('WPAdBlock', 'payload.order', data.payload.order);
                      this.payload.order = data.payload.order;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Article extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('Article', 'schemaName', data.schemaName);
                      hasValue('Article', 'schemaName', 'meta-article', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-article';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('Article', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('Article', 'payload.type', data.payload.type);
                      oneOf('Article', 'payload.type', ['Article', 'NewsArticle', 'AdvertiserContentArticle', 'OpinionNewsArticle', 'ReviewNewsArticle'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'Article';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('Article', 'payload.adpType', data.payload.adpType);
                      oneOf('Article', 'payload.adpType', ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'], data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.contentId !== undefined) {
                      string('Article', 'payload.contentId', data.payload.contentId);
                      this.payload.contentId = data.payload.contentId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.datePublished !== undefined) {
                      string('Article', 'payload.datePublished', data.payload.datePublished);
                      dateTime('Article', 'payload.datePublished', data.payload.datePublished);
                      this.payload.datePublished = data.payload.datePublished;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.dateModified !== undefined) {
                      string('Article', 'payload.dateModified', data.payload.dateModified);
                      dateTime('Article', 'payload.dateModified', data.payload.dateModified);
                      this.payload.dateModified = data.payload.dateModified;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.title !== undefined) {
                      string('Article', 'payload.title', data.payload.title);
                      this.payload.title = data.payload.title;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.byline !== undefined) {
                      string('Article', 'payload.byline', data.payload.byline);
                      this.payload.byline = data.payload.byline;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.isPartOf !== undefined) {
                      string('Article', 'payload.isPartOf', data.payload.isPartOf);
                      uri('Article', 'payload.isPartOf', data.payload.isPartOf);
                      this.payload.isPartOf = data.payload.isPartOf;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.pageStart !== undefined) {
                      string('Article', 'payload.pageStart', data.payload.pageStart);
                      this.payload.pageStart = data.payload.pageStart;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.pageEnd !== undefined) {
                      string('Article', 'payload.pageEnd', data.payload.pageEnd);
                      this.payload.pageEnd = data.payload.pageEnd;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.articleSection !== undefined) {
                      string('Article', 'payload.articleSection', data.payload.articleSection);
                      this.payload.articleSection = data.payload.articleSection;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.tags !== undefined) {
                      string('Article', 'payload.tags', data.payload.tags);
                      this.payload.tags = data.payload.tags;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.contentModel !== undefined) {
                      string('Article', 'payload.contentModel', data.payload.contentModel);
                      oneOf('Article', 'payload.contentModel', ['paywall', 'registration', 'metered', 'free'], data.payload.contentModel);
                      this.payload.contentModel = data.payload.contentModel;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.presentationMode !== undefined) {
                      string('Article', 'payload.presentationMode', data.payload.presentationMode);
                      oneOf('Article', 'payload.presentationMode', ['full', 'excerpt'], data.payload.presentationMode);
                      this.payload.presentationMode = data.payload.presentationMode;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class CollectionPage extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('CollectionPage', 'schemaName', data.schemaName);
                      hasValue('CollectionPage', 'schemaName', 'meta-collection-page', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-collection-page';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('CollectionPage', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('CollectionPage', 'payload.type', data.payload.type);
                      oneOf('CollectionPage', 'payload.type', ['CollectionPage', 'ImageGallery', 'VideoGallery'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'CollectionPage';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('CollectionPage', 'payload.adpType', data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.contentId !== undefined) {
                      string('CollectionPage', 'payload.contentId', data.payload.contentId);
                      this.payload.contentId = data.payload.contentId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('CollectionPage', 'payload.title', data.payload.title);
              this.payload.title = data.payload.title;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class CallToAction extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('CallToAction', 'schemaName', data.schemaName);
                      hasValue('CallToAction', 'schemaName', 'meta-cta', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-cta';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('CallToAction', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('CallToAction', 'payload.type', data.payload.type);
                      oneOf('CallToAction', 'payload.type', ['CallToAction'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'CallToAction';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('CallToAction', 'payload.contentId', data.payload.contentId);
              this.payload.contentId = data.payload.contentId;
              string('CallToAction', 'payload.adpType', data.payload.adpType);
              oneOf('CallToAction', 'payload.adpType', ['teaser', 'funnel', 'receipt'], data.payload.adpType);
              this.payload.adpType = data.payload.adpType;
              try {
                  if (data.payload.teaserVariant !== undefined) {
                      string('CallToAction', 'payload.teaserVariant', data.payload.teaserVariant);
                      this.payload.teaserVariant = data.payload.teaserVariant;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.funnelStep !== undefined) {
                      string('CallToAction', 'payload.funnelStep', data.payload.funnelStep);
                      this.payload.funnelStep = data.payload.funnelStep;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.data !== undefined) {
                      string('CallToAction', 'payload.data', data.payload.data);
                      this.payload.data = data.payload.data;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class CustomElement extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('CustomElement', 'schemaName', data.schemaName);
                      hasValue('CustomElement', 'schemaName', 'meta-custom', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-custom';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('CustomElement', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('CustomElement', 'payload.type', data.payload.type);
                      oneOf('CustomElement', 'payload.type', ['CustomElement'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'CustomElement';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('CustomElement', 'payload.adpType', data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.name !== undefined) {
                      string('CustomElement', 'payload.name', data.payload.name);
                      this.payload.name = data.payload.name;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.data !== undefined) {
                      string('CustomElement', 'payload.data', data.payload.data);
                      this.payload.data = data.payload.data;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class MetaEmbed extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('MetaEmbed', 'schemaName', data.schemaName);
                      hasValue('MetaEmbed', 'schemaName', 'meta-embed', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-embed';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('MetaEmbed', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('MetaEmbed', 'payload.type', data.payload.type);
                      oneOf('MetaEmbed', 'payload.type', ['MetaEmbed'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'MetaEmbed';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('MetaEmbed', 'payload.adpType', data.payload.adpType);
                      oneOf('MetaEmbed', 'payload.adpType', ['smartembed', 'component'], data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  } else if (!isExtended) {
                      this.payload.adpType = 'smartembed';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.name !== undefined) {
                      string('MetaEmbed', 'payload.name', data.payload.name);
                      this.payload.name = data.payload.name;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('MetaEmbed', 'payload.url', data.payload.url);
              uri('MetaEmbed', 'payload.url', data.payload.url);
              this.payload.url = data.payload.url;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Page extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('Page', 'schemaName', data.schemaName);
                      hasValue('Page', 'schemaName', 'meta-page', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-page';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('Page', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('Page', 'payload.type', data.payload.type);
                      hasValue('Page', 'payload.type', 'Page', data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'WebPageElement';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.name !== undefined) {
                      string('Page', 'payload.name', data.payload.name);
                      this.payload.name = data.payload.name;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.referrer !== undefined) {
                      string('Page', 'payload.referrer', data.payload.referrer);
                      uri('Page', 'payload.referrer', data.payload.referrer);
                      this.payload.referrer = data.payload.referrer;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.previousIdentifier !== undefined) {
                      string('Page', 'payload.previousIdentifier', data.payload.previousIdentifier);
                      this.payload.previousIdentifier = data.payload.previousIdentifier;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.lastDomainVisitDate !== undefined) {
                      string('Page', 'payload.lastDomainVisitDate', data.payload.lastDomainVisitDate);
                      dateTime('Page', 'payload.lastDomainVisitDate', data.payload.lastDomainVisitDate);
                      this.payload.lastDomainVisitDate = data.payload.lastDomainVisitDate;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.sourceApp !== undefined) {
                      string('Page', 'payload.sourceApp', data.payload.sourceApp);
                      this.payload.sourceApp = data.payload.sourceApp;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adblockDetected !== undefined) {
                      boolean('Page', 'payload.adblockDetected', data.payload.adblockDetected);
                      this.payload.adblockDetected = typeof data.payload.adblockDetected === 'string' ? data.payload.adblockDetected === 'true' : data.payload.adblockDetected;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.initialDocumentHeight !== undefined) {
                      integer('Page', 'payload.initialDocumentHeight', data.payload.initialDocumentHeight);
                      this.payload.initialDocumentHeight = parseInt(data.payload.initialDocumentHeight, 10);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.pageUrl !== undefined) {
                      string('Page', 'payload.pageUrl', data.payload.pageUrl);
                      uri('Page', 'payload.pageUrl', data.payload.pageUrl);
                      this.payload.pageUrl = data.payload.pageUrl;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.pageModel !== undefined) {
                      string('Page', 'payload.pageModel', data.payload.pageModel);
                      this.payload.pageModel = data.payload.pageModel;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.isFrontPage !== undefined) {
                      string('Page', 'payload.isFrontPage', data.payload.isFrontPage);
                      oneOf('Page', 'payload.isFrontPage', ['true', 'false'], data.payload.isFrontPage);
                      this.payload.isFrontPage = data.payload.isFrontPage;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              Object.keys(data.payload).filter(key => /^ns_.*/.test(key)).forEach((key) => {
                  const temp = data.payload[key];
                  string('Page', 'temp', temp);
                  this.payload[key] = temp;
              });
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Resource extends Common {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('Resource', 'schemaName', data.schemaName);
                      hasValue('Resource', 'schemaName', 'meta-resource', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-resource';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('Resource', 'payload', data.payload);
              this.payload = this.payload || {};
              string('Resource', 'payload.type', data.payload.type);
              oneOf('Resource', 'payload.type', ['navigation', 'resource'], data.payload.type);
              this.payload.type = data.payload.type;
              try {
                  if (data.payload.firstMeaningfulPaint !== undefined) {
                      integer('Resource', 'payload.firstMeaningfulPaint', data.payload.firstMeaningfulPaint);
                      this.payload.firstMeaningfulPaint = parseInt(data.payload.firstMeaningfulPaint, 10);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.cachedContent !== undefined) {
                      boolean('Resource', 'payload.cachedContent', data.payload.cachedContent);
                      this.payload.cachedContent = typeof data.payload.cachedContent === 'string' ? data.payload.cachedContent === 'true' : data.payload.cachedContent;
                  } else if (!isExtended) {
                      this.payload.cachedContent = false;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.url !== undefined) {
                      string('Resource', 'payload.url', data.payload.url);
                      uri('Resource', 'payload.url', data.payload.url);
                      this.payload.url = data.payload.url;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.nextHopProtocol !== undefined) {
                      string('Resource', 'payload.nextHopProtocol', data.payload.nextHopProtocol);
                      this.payload.nextHopProtocol = data.payload.nextHopProtocol;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.initiatorType !== undefined) {
                      string('Resource', 'payload.initiatorType', data.payload.initiatorType);
                      this.payload.initiatorType = data.payload.initiatorType;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              Object.keys(data.payload).filter(key => /a_brws_prf_.*/.test(key)).forEach((key) => {
                  const temp = data.payload[key];
                  integer('Resource', 'temp', temp);
                  this.payload[key] = temp;
              });
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Teaser extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('Teaser', 'schemaName', data.schemaName);
                      hasValue('Teaser', 'schemaName', 'meta-teaser', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-teaser';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('Teaser', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('Teaser', 'payload.type', data.payload.type);
                      oneOf('Teaser', 'payload.type', ['Article', 'NewsArticle', 'AdvertiserContentArticle', 'OpinionNewsArticle', 'ReviewNewsArticle', 'VideoObject', 'ChallengeDeck'], data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'Article';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.adpType !== undefined) {
                      string('Teaser', 'payload.adpType', data.payload.adpType);
                      hasValue('Teaser', 'payload.adpType', 'teaser', data.payload.adpType);
                      this.payload.adpType = data.payload.adpType;
                  } else if (!isExtended) {
                      this.payload.adpType = 'teaser';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.variant !== undefined) {
                      string('Teaser', 'payload.variant', data.payload.variant);
                      this.payload.variant = data.payload.variant;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.testId !== undefined) {
                      string('Teaser', 'payload.testId', data.payload.testId);
                      this.payload.testId = data.payload.testId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.contentId !== undefined) {
                      string('Teaser', 'payload.contentId', data.payload.contentId);
                      this.payload.contentId = data.payload.contentId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.title !== undefined) {
                      string('Teaser', 'payload.title', data.payload.title);
                      this.payload.title = data.payload.title;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('Teaser', 'payload.url', data.payload.url);
              uri('Teaser', 'payload.url', data.payload.url);
              this.payload.url = data.payload.url;
              try {
                  if (data.payload.contentModel !== undefined) {
                      string('Teaser', 'payload.contentModel', data.payload.contentModel);
                      oneOf('Teaser', 'payload.contentModel', ['paywall', 'registration', 'metered', 'free'], data.payload.contentModel);
                      this.payload.contentModel = data.payload.contentModel;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.productFeature !== undefined) {
                      string('Teaser', 'payload.productFeature', data.payload.productFeature);
                      this.payload.productFeature = data.payload.productFeature;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */

      class Video extends MetaElement {
          constructor(data, isExtended = false) {
              // @ts-ignore
              super(data, true);
              let optionalFieldsErrors = [];
              try {
                  if (data.schemaName !== undefined) {
                      string('Video', 'schemaName', data.schemaName);
                      hasValue('Video', 'schemaName', 'meta-video', data.schemaName);
                      this.schemaName = data.schemaName;
                  } else if (!isExtended) {
                      this.schemaName = 'meta-video';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              object('Video', 'payload', data.payload);
              this.payload = this.payload || {};
              try {
                  if (data.payload.type !== undefined) {
                      string('Video', 'payload.type', data.payload.type);
                      hasValue('Video', 'payload.type', 'Video', data.payload.type);
                      this.payload.type = data.payload.type;
                  } else if (!isExtended) {
                      this.payload.type = 'Video';
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.contentId !== undefined) {
                      string('Video', 'payload.contentId', data.payload.contentId);
                      this.payload.contentId = data.payload.contentId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.playerId !== undefined) {
                      string('Video', 'payload.playerId', data.payload.playerId);
                      this.payload.playerId = data.payload.playerId;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.title !== undefined) {
                      string('Video', 'payload.title', data.payload.title);
                      this.payload.title = data.payload.title;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.description !== undefined) {
                      string('Video', 'payload.description', data.payload.description);
                      this.payload.description = data.payload.description;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.category !== undefined) {
                      string('Video', 'payload.category', data.payload.category);
                      this.payload.category = data.payload.category;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.autoplay !== undefined) {
                      boolean('Video', 'payload.autoplay', data.payload.autoplay);
                      this.payload.autoplay = typeof data.payload.autoplay === 'string' ? data.payload.autoplay === 'true' : data.payload.autoplay;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.autopause !== undefined) {
                      boolean('Video', 'payload.autopause', data.payload.autopause);
                      this.payload.autopause = typeof data.payload.autopause === 'string' ? data.payload.autopause === 'true' : data.payload.autopause;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.live !== undefined) {
                      boolean('Video', 'payload.live', data.payload.live);
                      this.payload.live = typeof data.payload.live === 'string' ? data.payload.live === 'true' : data.payload.live;
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.length !== undefined) {
                      number('Video', 'payload.length', data.payload.length);
                      this.payload.length = parseFloat(data.payload.length);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              try {
                  if (data.payload.startTime !== undefined) {
                      number('Video', 'payload.startTime', data.payload.startTime);
                      this.payload.startTime = parseFloat(data.payload.startTime);
                  }
              } catch (error) {
                  optionalFieldsErrors.push(error);
              }
              string('Video', 'payload.src', data.payload.src);
              uri('Video', 'payload.src', data.payload.src);
              this.payload.src = data.payload.src;
              if (optionalFieldsErrors.length > 0) {optionalFieldsErrorHandler(optionalFieldsErrors);}
          }
      }

      var types = /*#__PURE__*/Object.freeze({
          __proto__: null,
          Common: Common,
          Definitions: Definitions,
          ClickEvent: ClickEvent,
          CommentEvent: CommentEvent,
          CustomEvent: CustomEvent$1,
          ErrorEvent: ErrorEvent$1,
          InscreenEvent: InscreenEvent,
          LegacyEvent: LegacyEvent,
          PerformanceEvent: PerformanceEvent,
          PlaybackAdEvent: PlaybackAdEvent,
          VideoEvent: VideoEvent,
          PrebidEvent: PrebidEvent,
          ScrollEvent: ScrollEvent,
          WebVitalsEvent: WebVitalsEvent,
          AdpEvent: AdpEvent,
          WPAdBlock: WPAdBlock,
          Article: Article,
          CollectionPage: CollectionPage,
          CallToAction: CallToAction,
          CustomElement: CustomElement,
          MetaElement: MetaElement,
          MetaEmbed: MetaEmbed,
          Page: Page,
          Resource: Resource,
          Teaser: Teaser,
          Video: Video
      });

      const idMap = new WeakMap();
      function setCommonMeta(metaTreeElement) {
          if (!metaTreeElement) {
              throw new Error("setMetaIdAndParent is called without an element");
          }
          (function recurse(node) {
              const { parent } = node;
              if (parent) {
                  if (!parent.data.id) {
                      recurse(parent);
                  }
                  node.data.parent = parent.data.id;
              }
              if (!node.data.cssSelector) {
                  node.data.cssSelector = getSelector(node.element);
              }
              if (!node.data.id) {
                  let uuid = v4();
                  const uuidImmutable = uuid.slice(); // Deep copy to ensure uuid never changes. Not sure if necessary
                  node.data.id = uuidImmutable;
                  Object.defineProperty(node.data, "id", {
                      get: () => {
                          return uuidImmutable;
                      },
                      set: (id) => {
                          // Still allow the id to be overwritten
                          idMap.set(node.data, id);
                      },
                      enumerable: true,
                  });
              }
              return node.data.id;
          })(metaTreeElement);
      }

      const attributesToGet = [
          { key: "pageModel", attribute: "data-pagemodel" },
          { key: "isFrontPage", attribute: "data-isfrontpage" },
          { key: "sourceApp", attribute: "data-sourceapp" },
      ];
      class MetaNode {
          constructor(element, type = "MetaElement", data = null, schemaName = undefined) {
              this.isLogged = false;
              this.element = element;
              this.children = [];
              this.parent = null;
              this.data = data;
              this.type = type;
              this.events = new PubSub();
              this.schemaName = schemaName;
          }
          getTree() {
              const parents = [];
              let current = this;
              while (current) {
                  parents.push(current);
                  current = current.parent;
              }
              return parents;
          }
      }
      let root;
      let lookup = new ClearableWeakMap();
      function logPage(rootElement, log) {
          return __awaiter(this, void 0, void 0, function* () {
              const pageKeys = {};
              const store = yield storePromise();
              pageKeys.type = "Page";
              pageKeys.pageUrl = getPageUrl();
              pageKeys.pageUrl = removePiiFromUrl(getPageUrl());
              const lastVisitDates = yield getLastVisitDates();
              if (lastVisitDates.length >= 2) {
                  pageKeys.lastDomainVisitDate = new Date(lastVisitDates[1]).toISOString();
              }
              if (self.document && self.document.title) {
                  pageKeys.name = self.document.title;
              }
              if (typeof self.document.referrer === "string" &&
                  self.document.referrer.length > 0) {
                  pageKeys.referrer = removePiiFromUrl(self.document.referrer);
              }
              attributesToGet.forEach(({ attribute, key }) => {
                  var _a, _b, _c;
                  // If we have html attributes, we use them
                  return (attributeExistsInElement(attribute) &&
                      (pageKeys[key] = getAttribute(attribute))) ||
                      // If not we use config from store
                      //@ts-ignore
                      (((_a = store.state.initOptions) === null || _a === void 0 ? void 0 : _a.config) &&
                          (
                          //@ts-ignore
                          (_b = store.state.initOptions) === null || _b === void 0 ? void 0 : _b.config[key]) &&
                          //@ts-ignore
                          (pageKeys[key] = (_c = store.state.initOptions) === null || _c === void 0 ? void 0 : _c.config[key]));
              });
              const root = new MetaNode(rootElement, "Page", Object.assign({}, pageKeys));
              if (log) {
                  setTimeout(() => logMeta(root), 0);
              }
              else {
                  setCommonMeta(root);
                  root.isLogged = true;
              }
              return root;
          });
      }
      function resetMetaTree(log = true, call, page = null) {
          return __awaiter(this, void 0, void 0, function* () {
              const rootElement = self.document && self.document.documentElement
                  ? document.documentElement
                  : self;
              root = yield logPage(rootElement, log);
              lookup.clear();
              const store = yield storePromise();
              store.dispatch("setRoot", root);
              lookup.set(rootElement, root);
              window.dispatchEvent(new CustomEvent("adplogger:store-init", { detail: store }));
              logNonUserAccess();
              //Set adplogger global to ready
              globalThis.Adplogger2.ready = true;
              if (call)
                  call();
          });
      }
      function findParent(element) {
          return (function recurse(currentNode) {
              var _a;
              if (!((_a = currentNode === null || currentNode === void 0 ? void 0 : currentNode.element) === null || _a === void 0 ? void 0 : _a.contains(element))) {
                  return false;
              }
              let result = currentNode;
              currentNode.children.every((child) => {
                  const temp = recurse(child);
                  if (temp) {
                      result = temp;
                      return false;
                  }
                  return true;
              });
              return result;
          })(root);
      }
      function isHTMLElement(element) {
          return self.HTMLElement && element instanceof HTMLElement;
      }
      function getMetaElement(element) {
          return lookup.get(element) || null;
      }
      function getRoot() {
          return root;
      }
      function getClosestMetaElement(element) {
          if (element instanceof MetaNode) {
              return element;
          }
          let metaElement = null;
          while (element !== null && metaElement === null) {
              metaElement = getMetaElement(element);
              element = element.parentNode || null;
          }
          return metaElement || getRoot();
      }
      //Only for video.
      //We need something else then weakmap becuase we can have multiple videos on same element
      const videoElements = [];
      function addMetaElement(element, type, data, override = false, schemaName = undefined) {
          if (!element) {
              throw new Error("You must provide an Element");
          }
          let node = lookup.get(element);
          if (type === "Video") {
              const elmToSave = {
                  contentId: data.contentId,
                  element: element,
              };
              const elementExists = videoElements.find((el) => el.contentId === data.contentId);
              if (!elementExists) {
                  videoElements.push(elmToSave);
                  node = null;
              }
              else {
                  node = elementExists.node;
              }
          }
          if (node) {
              if (override)
                  node.isLogged = false;
              const id = node.data.id;
              node.data = Object.assign(Object.assign({}, node.data), data);
              if (!data.id && id)
                  node.data.id = id;
              return node;
          }
          node = new MetaNode(element, type, data, schemaName);
          if (type === "Video") {
              const elementIndex = videoElements.findIndex((el) => el.contentId === data.contentId);
              if (elementIndex !== -1) {
                  videoElements[elementIndex].node = node;
              }
          }
          lookup.set(element, node);
          if (!isHTMLElement(element)) {
              node.parent = root;
              return node;
          }
          // Add DOM parent
          const parent = findParent(element);
          if (!parent) {
              return node;
          }
          node.parent = parent;
          parent.children = parent.children.filter((parentChildNode) => {
              if (element.contains(parentChildNode.element)) {
                  node.children.push(parentChildNode);
                  return false;
              }
              return true;
          });
          parent.children.push(node);
          return node;
      }
      // Starts the app. Kind like a main()
      // Useful place to set a breakpoint in your
      // JS debugger if you want to see the flow of
      // the app from start to end
      // Should not log if data-adp-nolog is true
      if (typeof window !== "undefined") {
          const noLog = document.querySelector("html").getAttribute("data-adp-nolog");
          if (noLog !== "true") ;
          else {
              console.warn("Adplogger2 is disabled because of data-adp-nolog property in html tag");
          }
      }
      /* ready(resetMetaTree) */

      /**
       * @module lib/logger
       * @typicalname logger
       */
      let getStore = getStore$1;
      let getCommon = getCommon$1;
      // TODO move this to store
      function notifyUpdate() {
          self.dispatchEvent(new CustomEvent("adplogger:store-update"));
      }
      // Adds event to localstorage as adp:events
      function add(storename, method, logObjectId, event) {
          return getStore(storename, "readwrite").then((store) => {
              store[method](event, logObjectId).then(() => store.close());
          });
      }
      const addFinishedEvent = add.bind(null, "events", "add");
      function logCommon(type, data, element) {
          return getCommon().then((pageview) => __awaiter(this, void 0, void 0, function* () {
              const payload = Object.assign(Object.assign({}, pageview), { payload: Object.assign({}, data) });
              let adpEvent;
              try {
                  adpEvent = new types[type](payload);
              }
              catch (e) {
                  if (e) {
                      console.error(`V:${version$1}. ${e}`);
                  }
                  console.error(`V:${version$1}. adp log common event error ${type} ${JSON.stringify(data)}`);
                  return Promise.reject();
              }
              const store = yield storePromise();
              //@ts-ignore
              store.dispatch(`add${type}`, { type, data, pageview, element });
              const logObjectId = v4();
              return addFinishedEvent(logObjectId, adpEvent).then(() => notifyUpdate());
          }));
      }
      function logMeta(metaElement) {
          var _a;
          return __awaiter(this, void 0, void 0, function* () {
              if (metaElement.isLogged) {
                  return Promise.resolve();
              }
              setCommonMeta(metaElement);
              metaElement.isLogged = true;
              try {
                  const store = yield storePromise();
                  store.dispatch("addMetaElement", { element: metaElement });
                  return yield logCommon(((_a = metaElement.schemaName) !== null && _a !== void 0 ? _a : metaElement.type), metaElement.data, metaElement);
              }
              catch (e) {
                  console.log("ERROR", e);
                  console.error(`V:${version$1}. log meta error ${e} ${metaElement.type} ${JSON.stringify(metaElement.data)}`);
                  metaElement.isLogged = false;
              }
          });
      }
      function logEvent(type, data, element = null) {
          return __awaiter(this, void 0, void 0, function* () {
              if (element) {
                  const metaElement = getClosestMetaElement(element);
                  metaElement.events.publish(type, data);
                  // Log all parent meta elements before logging the event.
                  return Promise.all(metaElement.getTree().map(logMeta))
                      .then(() => {
                      data.concernsMeta = metaElement.data.id;
                      if (metaElement.type) {
                          data.metaType = metaElement.type;
                      }
                      if (metaElement.data.contentId) {
                          data.contentId = metaElement.data.contentId;
                      }
                      return logEvent(type, data, null);
                  })
                      .catch((e) => {
                      console.log(type);
                      if (e) {
                          console.error(`V:${version$1}. ${e}`);
                      }
                      console.error(`V:${version$1}. adp logEvent error ${type} ${JSON.stringify(data)}`);
                      return Promise.reject("logEvent error reject");
                  });
              }
              return getEventData().then((commonEventData) => logCommon(type, Object.assign(Object.assign({}, commonEventData), data), element));
          });
      }
      /**
       * Log Event or MetaElement data to ADP
       * @param {String} type ADP schema type
       * @param {Object} data Data
       * @param {HTMLElement | MetaNode} [element] Element connected to the log event
       */
      function log(type, data, element = null) {
          var _a;
          // Should not log if data-adp-nolog is true
          if (typeof window !== "undefined") {
              const noLog = document.querySelector("html").getAttribute("data-adp-nolog");
              if (noLog === "true") {
                  console.warn("Adplogger2 is disabled because of data-adp-nolog property in html tag");
                  return Promise.reject("LOGGER DISABLED");
              }
          }
          if (!types[type]) {
              return logEvent("ErrorEvent", {
                  level: "error",
                  message: `"${type}" is not a valid ADP logger type`,
                  type: "error",
              }, getRoot());
          }
          const Type = types[type];
          // Could use isPrototypeOf instead. But eslint complains
          if (Type.prototype instanceof AdpEvent) {
              element = element || ((_a = getRoot()) === null || _a === void 0 ? void 0 : _a.element);
              return logEvent(type, data, element);
          }
          if (Type.prototype instanceof MetaElement) {
              throw new Error("MetaElement types should not be logged directly. Only as a part of an event");
          }
          // Whatever you are logging, assume they are complete
          return logCommon(type, data, element);
      }

      // Expose internal variables for testings
      let trackingCount = 0;
      let timer$1;
      const abTestData = [];
      function saveToSessionStorage(key, value) {
          try {
              window.localStorage.setItem(key, JSON.stringify(value));
          }
          catch (error) {
              /* log.info(`Exception raised when setting value in localStorage: ${error}`); */
          }
      }
      function getFromSessionStorage(key) {
          let value;
          try {
              value = window.localStorage
                  .getItem(key);
          }
          catch (error) {
              /* log.info(`Exception raised when retrieving key from localStorage: ${error}`); */
          }
          return value;
      }
      function deleteFromSessionStorage(key) {
          try {
              window.localStorage
                  .removeItem(key);
          }
          catch (error) {
              /* log.info(`Exception raised when removing key from localStorage: ${error}`); */
          }
      }
      const initialize = (duration = 5000) => {
          var _a, _b;
          //Check if page is frontepage
          const isFrontPage = ((_a = document === null || document === void 0 ? void 0 : document.querySelector("[data-isfrontpage]")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-isfrontpage")) == "true";
          if (isFrontPage) {
              deleteFromSessionStorage('adp_variant_click');
              return;
          }
          const dataString = getFromSessionStorage('adp_variant_click');
          if (!dataString) {
              // Nothing to track
              return;
          }
          const hasAccess = Boolean((_b = document === null || document === void 0 ? void 0 : document.querySelector('[data-access]')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-access'));
          if (!hasAccess) {
              return;
          }
          const data = JSON.parse(dataString);
          deleteFromSessionStorage('adp_variant_click');
          timer$1 = setInterval(() => {
              if (trackingCount === 4) {
                  clearInterval(timer$1);
                  return;
              }
              if (data === null) {
                  return;
              }
              const stringifiedData = JSON.stringify({
                  type: 'adp_variant_read',
                  data: data,
              });
              log("CustomEvent", { type: "custom", name: 'adp_variant_read', data: stringifiedData }, getRoot());
              trackingCount += 1;
          }, duration);
      };
      const getAbVariantForTeaser = (node) => {
          if (node) {
              if ((node === null || node === void 0 ? void 0 : node.hasAttribute('data-adp-testid')) &&
                  (node === null || node === void 0 ? void 0 : node.getAttribute('data-adp-testid')) !== '') {
                  return getABTestData(node);
              }
          }
          return undefined;
      };
      const setClickInSessionStorage = (node) => {
          const abVariant = getAbVariantForTeaser(node);
          if (abVariant) {
              const stringifiedData = JSON.stringify({
                  type: 'adp_variant_click',
                  data: abVariant,
              });
              log("CustomEvent", { type: "custom", name: 'adp_variant_click', data: stringifiedData }, node);
              saveToSessionStorage('adp_variant_click', abVariant);
          }
      };
      function getABTestData(node) {
          var _a, _b;
          const siteid = node.getAttribute('data-adp-siteid');
          const teaserid = node.getAttribute('data-adp-teaserid');
          const variantid = node.getAttribute('data-adp-variantid');
          const testId = node === null || node === void 0 ? void 0 : node.getAttribute("data-adp-testid");
          const title = (_a = node === null || node === void 0 ? void 0 : node.querySelector("[itemprop=headline]")) === null || _a === void 0 ? void 0 : _a.textContent;
          const imgurl = (_b = node === null || node === void 0 ? void 0 : node.querySelector("img")) === null || _b === void 0 ? void 0 : _b.getAttribute("src");
          const position = 'fp'; // short for frontpage
          return {
              siteId: siteid,
              teaserId: teaserid,
              context: position,
              testId: testId,
              variantId: variantid,
              title: title,
              imgurl: imgurl,
          };
      }
      const setABTestDataForTeaser = (element) => {
          const data = getAbVariantForTeaser(element);
          if (data) {
              const dataExists = abTestData.findIndex(ex => JSON.stringify(data) === JSON.stringify(ex)) > -1;
              if (!dataExists) {
                  abTestData.push(data);
                  const stringifiedData = JSON.stringify({
                      type: 'adp_variant_click',
                      data: data,
                  });
                  log("CustomEvent", { type: "custom", name: 'adp_variant_view', data: stringifiedData }, element);
              }
          }
      };

      let listeners = [];
      let complete = false;
      function domComplete() {
          return __awaiter(this, void 0, void 0, function* () {
              const store = yield storePromise();
              complete = true;
              store.dispatch('setStartedDomLogging', true);
              document.removeEventListener('DOMContentLoaded', domComplete);
              window.removeEventListener('load', domComplete);
              listeners.forEach(func => func());
              listeners = [];
          });
      }
      function ready(func) {
          if (complete) {
              func();
          }
          else {
              listeners.push(func);
          }
      }
      const initiateDom = () => {
          if (document.readyState !== 'loading') {
              window.setTimeout(domComplete, 0);
          }
          else {
              document.addEventListener('DOMContentLoaded', domComplete);
              window.addEventListener('load', domComplete);
          }
      };

      function throttle(fn, wait = 400) {
          fn.waiting = false;
          return (...args) => {
              if (!fn.waiting) {
                  fn(...args);
                  fn.waiting = true;
                  setTimeout(() => {
                      fn.waiting = false;
                  }, wait);
              }
          };
      }
      function debounce(func, wait = 400) {
          let timeout;
          return (...args) => {
              const later = () => {
                  timeout = null;
                  func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
          };
      }

      const browserSupportsKeepalive = typeof Request !== "undefined" &&
          "keepalive" in new Request("https://www.google.com");
      const err = "";
      /**
       * Internal function using the Fetch API to send data to sero.
       *
       * @param  {string} url Endpoint for request
       * @param  {string} data Key-value pairs as query string
       * @param  {boolean} dropKeepAlive boolean indicating whether the fetch request should have the keepalive attribute
       * @return {Promise} Resolves the request with a message
       * @ignore
       */
      function performRequestWithFetch(url, data, dropKeepAlive) {
          const customHeaders = constructHeaders(data);
          return window.fetch(url, {
              method: "POST",
              body: data,
              keepalive: !dropKeepAlive,
              mode: "cors",
              credentials: "omit",
              headers: new Headers(customHeaders),
          });
      }
      function constructHeaders(data) {
          const payloadObject = JSON.parse(data)[0];
          var headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("X-ADP-Site", payloadObject.siteKey);
          headers.append("X-ADP-Logger", payloadObject.logger);
          if ("useKey" in payloadObject) {
              headers.append("X-ADP-User", payloadObject.userKey);
          }
          return headers;
      }
      function byteCount(s) {
          return encodeURI(s).split(/%..|./).length - 1;
      }
      let queue = [];
      // This is the max limit Sero has for each payload. If adplogger send a payload above this size, Sero will not accept it.
      const MAX = 20000;
      let sending = false;
      function sendData(url, data, maxBytes = MAX, retries = 0, ctx = { performRequestWithFetch, browserSupportsKeepalive, err }) {
          const respond = (queuestate) => {
              queue = queue.filter((i) => !queuestate.includes(i));
              if (queue.length > 0) {
                  return new Promise((resolve, reject) => {
                      sendData(url, [], maxBytes, 0, ctx)
                          .then((r) => {
                          resolve(r);
                      })
                          .catch((e) => {
                          reject(e);
                      });
                  });
              }
              return;
          };
          queue.push(...data);
          if (retries >= 5) {
              return Promise.reject(new Error(`V:${version$1}. Too many retries. Last error: ${ctx.err} on url: ${url}`));
          }
          if (!sending) {
              let queuestate = [...queue]; // shallow copy
              let payload = JSON.stringify(queuestate);
              let b = byteCount(payload);
              while (b > maxBytes && queuestate.length > 1) {
                  queuestate = queuestate.slice(0, Math.ceil(queuestate.length / 2));
                  payload = JSON.stringify(queuestate);
                  b = byteCount(payload);
              }
              if (b > 2) {
                  sending = true;
                  // we want to use keepalive when possible. if fetch is polyfilled we cannot
                  const dropKeepAlive = !ctx.browserSupportsKeepalive;
                  return (ctx
                      .performRequestWithFetch(url, payload, dropKeepAlive)
                      //TODO: Remove any and give it a proper type
                      .then((response) => {
                      sending = false;
                      if (!response.ok) {
                          console.error(`V:${version$1}. Response failed: ${response.status} - ${response.statusText}`);
                          throw Error(`Response failed: ${response.status} - ${response.statusText}`);
                      }
                      respond(queuestate);
                      return response;
                  })
                      .catch((err) => {
                      sending = false;
                      if (err.name === "TypeError" &&
                          (err.message === "Failed to fetch" ||
                              err.message === "Type error")) {
                          respond(queuestate);
                          return Promise.resolve("sending assumed ok");
                      }
                      console.error(`V:${version$1}. Send error, bytes=${b}, keepalive=${!dropKeepAlive} error: ${err}`);
                      // queue = queue.filter((i) => !queuestate.includes(i)); // TODO: Decide - Keep or remove
                      ctx.err = err;
                      // turn off keepalive in retries - in case this is a fetch polyfill which falsely reports keepalive capabilities
                      ctx.browserSupportsKeepalive = false;
                      return new Promise((resolve, reject) => setTimeout(() => {
                          sendData(url, [], maxBytes, retries + 1, ctx)
                              .then((r) => resolve(r))
                              .catch((e) => {
                              console.error(`V:${version$1}. Error while sending: ${e}`);
                              reject(e);
                          });
                      }, 250));
                  }));
              }
          }
          return Promise.resolve("sending queued");
      }

      let send;
      // Empty stores and send events
      function flushEvents() {
          var _a;
          if (!send) {
              return;
          }
          (_a = flush("events")) === null || _a === void 0 ? void 0 : _a.then((data) => {
              send(data).catch((e) => console.error(`V:${version$1}. Flush event error ${e}`));
          });
      }
      self.addEventListener("adplogger:store-update", debounce(() => flushEvents(), 100));
      self.addEventListener("pagehide", flushEvents);
      // self.addEventListener('blur', flushEvents);
      self.addEventListener("adplogger:user-inactive", flushEvents);
      function setBackendUrl(url) {
          send = sendData.bind(null, url);
          flushEvents();
      }

      const KILKAYA_URL = "//cl.k5a.io/6143532e3fb9a76297593ea2.js";
      const MBL_URL = "//log.medietall.no/analytics.js";
      const mblProps = ["paid", "login", "subscriber", "channel", "paywall", "subscriberid"];
      const k5aMetaProps = [
          "paid",
          "login",
          "subscriber",
          "channel",
          "paywall",
          "subscriberid",
      ];
      const k5aMeta = {};
      const mblMeta = {};
      const assignToWindow = () => {
          // @ts-ignore
          window.k5aMeta = k5aMeta;
          // @ts-ignore
          window.mblMeta = mblMeta;
      };
      const assignPropToGlobalVar = (prop, value) => {
          if (mblProps.indexOf(prop) > -1)
              mblMeta[prop] = value;
          if (k5aMetaProps.indexOf(prop) > -1)
              k5aMeta[prop] = value;
      };
      const blacklistedHosts = [];
      function getUserKey() {
          var _a, _b, _c;
          return __awaiter(this, void 0, void 0, function* () {
              const store = yield storePromise();
              const useUserModuleModule = !((_c = (_b = (_a = store.state.initOptions) === null || _a === void 0 ? void 0 : _a.exclude) === null || _b === void 0 ? void 0 : _b.modules) === null || _c === void 0 ? void 0 : _c.includes("user"));
              if (!useUserModuleModule)
                  return;
              if (typeof window !== "undefined" &&
                  blacklistedHosts.indexOf(window.location.host) > -1) {
                  assignPropToGlobalVar("login", false);
                  assignPropToGlobalVar("subscriber", false);
                  return Promise.resolve(null);
              }
              return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                  const { isPaywall, hasDataAccess } = getHeadData();
                  assignPropToGlobalVar("paid", isPaywall);
                  if (isPaywall && !hasDataAccess)
                      assignPropToGlobalVar("paywall", "hard");
                  try {
                      const { UserDataRequest } = yield module.import('https://assets.acdn.no/pkg/@amedia/user/v0/user.js');
                      return new UserDataRequest()
                          .withAttributes(["trackingKey", "extraData"])
                          .fetch({
                          timeout: isLocalhost() ? 1 : 500,
                      })
                          .then(({ attributes, state }) => {
                          var _a, _b;
                          const isSubscriber = (_a = attributes.extraData) === null || _a === void 0 ? void 0 : _a.customer_keys;
                          const subscriberid = (_b = attributes.extraData) === null || _b === void 0 ? void 0 : _b.mbl_user_key;
                          assignPropToGlobalVar("login", state.isLoggedIn);
                          assignPropToGlobalVar("subscriber", typeof isSubscriber !== "undefined");
                          if (typeof subscriberid !== "undefined") {
                              assignPropToGlobalVar("subscriberid", subscriberid);
                          }
                          resolve(true);
                      })
                          .catch(() => {
                          assignPropToGlobalVar("login", false);
                          assignPropToGlobalVar("subscriber", false);
                          reject(false);
                      });
                  }
                  catch (error) {
                      assignPropToGlobalVar("login", false);
                      assignPropToGlobalVar("subscriber", false);
                      reject(false);
                  }
              }));
          });
      }
      const getKilklayaInstance = () => {
          return new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.async = true;
              script.src = KILKAYA_URL;
              resolve({ element: script });
          });
      };
      const getMBLInstance = () => {
          return new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.async = true;
              script.src = MBL_URL;
              resolve({ element: script });
          });
      };
      const getHeadData = () => {
          const htmlElm = document.getElementsByTagName("html")[0];
          return {
              isPaywall: htmlElm.getAttribute("data-paywall") === "true",
              hasDataAccess: htmlElm.getAttribute("data-access") === "true",
          };
      };
      const initKilkaya = () => __awaiter(void 0, void 0, void 0, function* () {
          var _a, _b, _c, _d, _e, _f;
          const store = yield storePromise();
          const useKilkaya = !((_c = (_b = (_a = store.state.initOptions) === null || _a === void 0 ? void 0 : _a.exclude) === null || _b === void 0 ? void 0 : _b.modules) === null || _c === void 0 ? void 0 : _c.includes("kilkaya"));
          const useMbl = !((_f = (_e = (_d = store.state.initOptions) === null || _d === void 0 ? void 0 : _d.exclude) === null || _e === void 0 ? void 0 : _e.modules) === null || _f === void 0 ? void 0 : _f.includes("mbl"));
          const { element: kilkayaElement } = yield getKilklayaInstance();
          const { element: mblElement } = yield getMBLInstance();
          const pushapp = navigator.userAgent.indexOf("pushvarslings-app") !== -1 ||
              navigator.userAgent.indexOf("Nettavisen") !== -1;
          if (pushapp) {
              const iPad = navigator.userAgent.indexOf("iPad") !== -1;
              const iPhone = navigator.userAgent.indexOf("iPhone") !== -1;
              const android = navigator.userAgent.indexOf("ndroid") > -1;
              const tabletpattern = /Samsung (SM-T|GT-P|SM-P|SM-N)|SGP|Lenovo|iPad/g;
              const tablet = tabletpattern.test(navigator.userAgent);
              if (iPhone) {
                  assignPropToGlobalVar("channel", "mobile_ios_app");
              }
              else if (iPad) {
                  assignPropToGlobalVar("channel", "tablet_ios_app");
              }
              else if (android && tablet) {
                  assignPropToGlobalVar("channel", "tablet_android_app");
              }
              else if (android) {
                  assignPropToGlobalVar("channel", "mobile_android_app");
              }
          }
          try {
              yield getUserKey();
              assignToWindow();
              shouldLoadScript(KILKAYA_URL, useKilkaya) &&
                  document.head.appendChild(kilkayaElement);
              shouldLoadScript(MBL_URL, useMbl) && document.head.appendChild(mblElement);
          }
          catch (error) {
              assignToWindow();
              shouldLoadScript(KILKAYA_URL, useKilkaya) &&
                  document.head.appendChild(kilkayaElement);
              shouldLoadScript(MBL_URL, useMbl) && document.head.appendChild(mblElement);
          }
      });
      const shouldLoadScript = (url = "", exclude) => {
          if (!exclude)
              return false;
          let loadScript = true;
          const scripts = document.getElementsByTagName("script");
          for (let i = scripts.length; i--;) {
              if (scripts[i].src.search(url) > -1) {
                  loadScript = false;
                  break;
              }
          }
          return loadScript;
      };

      const conditionsForCustomMicrodataParsing = ["http://schema.org/keywords"];
      const srcHasValue = ['audio', 'embed', 'iframe', 'img', 'source', 'track', 'video'];
      const hrefHasValue = ['a', 'area', 'link'];
      const valueHasValue = ['data', 'meter'];
      const customMicrodataParsing = {
          [conditionsForCustomMicrodataParsing[0]]: {
              transform: (text) => {
                  return text.replace(/(\n)/g, ',');
              }
          }
      };
      function getMicrodataPropertyValue(element, name) {
          if (element.hasAttribute('content')) {
              return element.getAttribute('content');
          }
          const tagName = element.tagName.toLowerCase();
          if (srcHasValue.includes(tagName)) {
              return element.getAttribute('src');
          }
          if (hrefHasValue.includes(tagName)) {
              return element.getAttribute('href');
          }
          if (tagName === 'object') {
              return element.getAttribute('data');
          }
          if (valueHasValue.includes(tagName)) {
              return Number(element.getAttribute('value'));
          }
          if (tagName === 'time') {
              return element.getAttribute('datetime');
          }
          return conditionsForCustomMicrodataParsing.includes(name)
              ? customMicrodataParsing[name].transform(element.textContent.trim())
              : element.textContent.trim();
      }

      /* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT */
      const isURL$1 = /^(https?:|)\/\//;
      const protocolPattern = /https?:/;
      const context = {
          WPAdBlock: {
              vocab: '//schema.org/',
              '//schema.org/WPAdBlock': 'WPAdBlock',
              '//www.adplogger.no/json-schema/meta-ad#unit': 'unit',
              '//www.adplogger.no/json-schema/meta-ad#lineItem': 'lineItem',
              '//www.adplogger.no/json-schema/meta-ad#advertiser': 'advertiser',
              '//www.adplogger.no/json-schema/meta-ad#creative': 'creative',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType',
              '//www.adplogger.no/json-schema/meta-ad#order': 'order'
          },
          Article: {
              vocab: '//schema.org/',
              '//schema.org/identifier': 'contentId',
              '//schema.org/headline': 'title',
              '//schema.org/author': 'byline',
              '//schema.org/keywords': 'tags',
              '//www.adplogger.no/json-schema/meta-article#contentModel': 'contentModel',
              '//www.adplogger.no/json-schema/meta-article#articleSection': 'articleSection',
              '//www.adplogger.no/json-schema/meta-article#presentationMode': 'presentationMode',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType',
              '//www.adplogger.no/json-schema/meta-element#productFeature': 'productFeature'
          },
          CollectionPage: {
              vocab: '//schema.org/',
              '//schema.org/identifier': 'contentId',
              '//schema.org/headline': 'title',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType'
          },
          CallToAction: {
              vocab: '//www.adplogger.no/json-schema/',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType'
          },
          CustomElement: {
              vocab: '//www.adplogger.no/json-schema/',
              '//www.adplogger.no/json-schema/custom-element#name': 'name',
              '//www.adplogger.no/json-schema/custom-element#data': 'data',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType'
          },
          MetaElement: {
              vocab: '//www.adplogger.no/json-schema/meta-element/#',
              '//www.adplogger.no/json-schema/meta-element#parent': 'parent',
              '//www.adplogger.no/json-schema/meta-element#productFeature': 'productFeature',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType'
          },
          MetaEmbed: {
              vocab: '//www.adplogger.no/json-schema/',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType'
          },
          Page: {
              vocab: '//www.adplogger.no/json-schema/meta-page/#',
              '//schema.org/Page': 'Page',
              '//schema.org/name': 'name',
              '//schema.org/url': 'url',
              '//www.adplogger.no/json-schema/meta-page#pageModel': 'pageModel',
              '//www.adplogger.no/json-schema/meta-page#isFrontPage': 'isFrontPage'
          },
          Resource: {
              vocab: '//www.adplogger.no/json-schema/meta-resource/#'
          },
          Teaser: {
              vocab: '//schema.org/',
              '//schema.org/headline': 'title',
              '//schema.org/identifier': 'contentId',
              '//www.adplogger.no/json-schema/meta-element#adpType': 'adpType',
              '//www.adplogger.no/json-schema/meta-teaser#testid': 'testId',
              '//www.adplogger.no/json-schema/meta-teaser#variant': 'variant',
              '//www.adplogger.no/json-schema/meta-element#productFeature': 'productFeature'
          },
          Video: {
              vocab: '//schema.org/',
              '//schema.org/VideoObject': 'Video',
              '//schema.org/url': 'src',
              '//schema.org/duration': 'duration',
              '//schema.org/startTime': 'startTime',
              '//schema.org/headline': 'title',
              '//schema.org/category': 'category',
              '//schema.org/contentId': 'contentId',
              '//schema.org/length': 'length',
              '//schema.org/playerId': 'playerId',
              '//schema.org/live': 'live'
          }
      };
      function getContext(type, adpType) {
          if (type === '//schema.org/WPAdBlock') {
              return 'WPAdBlock';
          }
          if (type === '//schema.org/Article' && ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'].includes(adpType)) {
              return 'Article';
          }
          if (type === '//schema.org/Article' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/NewsArticle' && ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'].includes(adpType)) {
              return 'Article';
          }
          if (type === '//schema.org/NewsArticle' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/AdvertiserContentArticle' && ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'].includes(adpType)) {
              return 'Article';
          }
          if (type === '//schema.org/AdvertiserContentArticle' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/OpinionNewsArticle' && ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'].includes(adpType)) {
              return 'Article';
          }
          if (type === '//schema.org/OpinionNewsArticle' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/ReviewNewsArticle' && ['story', 'opinion', 'gallery', 'video', 'embed', 'poll', 'review', 'ytring', 'section', 'feature', 'livecenter', 'commercial'].includes(adpType)) {
              return 'Article';
          }
          if (type === '//schema.org/ReviewNewsArticle' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/CollectionPage') {
              return 'CollectionPage';
          }
          if (type === '//schema.org/ImageGallery') {
              return 'CollectionPage';
          }
          if (type === '//schema.org/VideoGallery') {
              return 'CollectionPage';
          }
          if (type === '//www.adplogger.no/json-schema/CallToAction') {
              return 'CallToAction';
          }
          if (type === '//www.adplogger.no/json-schema/CustomElement') {
              return 'CustomElement';
          }
          if (type === '//www.adplogger.no/json-schema/meta-element/#WebPageElement') {
              return 'MetaElement';
          }
          if (type === '//www.adplogger.no/json-schema/MetaEmbed') {
              return 'MetaEmbed';
          }
          if (type === '//schema.org/Page') {
              return 'Page';
          }
          if (type === '//www.adplogger.no/json-schema/meta-resource/#navigation') {
              return 'Resource';
          }
          if (type === '//www.adplogger.no/json-schema/meta-resource/#resource') {
              return 'Resource';
          }
          if (type === '//schema.org/VideoObject' && ['teaser'].includes(adpType)) {
              return 'Teaser';
          }
          if (type === '//schema.org/VideoObject' && !adpType) {
              return 'Video';
          }
          if (type === '//schema.org/ChallengeDeck') {
              return 'Teaser';
          }
          return 'MetaElement';
      }
      function mapToAdp(microData) {
          var _a;
          //Only needed for tags. TODO: Find a better way to handle
          if (microData['http://schema.org/keywords'] && microData['https://www.adplogger.no/json-schema/meta-article#tags']) {
              microData['http://schema.org/keywords'] =
                  [
                      ...microData['http://schema.org/keywords'].split(','),
                      ...microData['https://www.adplogger.no/json-schema/meta-article#tags'].split(',')
                  ]
                      .filter((value, index, self) => self.indexOf(value) === index)
                      .join(',');
          }
          const adpType = microData['https://www.adplogger.no/json-schema/meta-element#adpType'] ||
              microData['http://www.adplogger.no/json-schema/meta-element#adpType'] ||
              Object.keys(microData).reduce((pv, key) => (key.includes('adpType') ? microData[key] : pv), undefined);
          const type = getContext(((_a = microData === null || microData === void 0 ? void 0 : microData.className) === null || _a === void 0 ? void 0 : _a.replace(protocolPattern, '')) || microData.type.replace(protocolPattern, ''), adpType);
          const ctx = context[type];
          const data = Object.keys(microData)
              .reduce((result, key) => {
              const value = microData[key];
              if (key === 'type') {
                  result[key] = ctx[value.replace(protocolPattern, '')] || value.replace(ctx.vocab, '').replace(protocolPattern, '');
                  return result;
              }
              if (!isURL$1.test(key)) {
                  result[key] = value;
                  return result;
              }
              const urlKey = key.replace(protocolPattern, '');
              if (ctx[urlKey]) {
                  result[ctx[urlKey]] = value;
                  return result;
              }
              result[urlKey.replace(ctx.vocab, '')] = value;
              return result;
          }, {});
          return {
              data,
              type,
          };
      }

      /**
       * This module registers HTML elements as ADP Meta Elements.
       * On load we select all elements that contain microdata, json-ld or matches
       * a registered css selector.
       * When nodes are inserted to the DOM these are also checked for microdata,
       * json-ld or a registered css selector.
       * Schema.org vocabularies are then mapped against our ADP types.
       * Meta Elements are not logged until an event that conencts to the element are logged
       *
       * @module meta-utils/collect-meta-elements
       * @typicalname metaElement
       */
      const isURL = /https?:\/\//;
      const vocabPattern = /(.*\/).*$/;
      // If we dont remove itemprops that are children of unrelated itemscopes (ie. metaElements)
      // they will overwrite the itemprops of our current metaElement. Articles will become teasers and so on.
      function removeOutOfScopeItemprops(currentMetaElement, nestedProps) {
          let filteredList = nestedProps.filter((itemprop) => {
              const closestMetaElement = itemprop.closest("[itemscope]");
              if (currentMetaElement.isSameNode(closestMetaElement)) {
                  return itemprop;
              }
          });
          return filteredList;
      }
      const getPropertyElements = (element) => {
          const nestedElements = [
              ...[].slice.call(element.querySelectorAll("[itemprop]")),
          ];
          const hasNestedItemScopes = [
              ...[].slice.call(element.querySelectorAll("[itemscope]")),
          ];
          return { nestedElements, hasNestedItemScopes };
      };
      function getMicroData(element) {
          const type = element.getAttribute("itemtype");
          const id = element.getAttribute("itemid");
          if (!isURL.test(type)) {
              logError({
                  type: "error",
                  message: `Itemtype (${type}) is not an URL. Page: ${location.href}`,
                  level: "warning",
              }, null);
              return {};
          }
          const vocab = type.match(vocabPattern)[1];
          let { nestedElements, hasNestedItemScopes } = getPropertyElements(element);
          if (hasNestedItemScopes.length > 0) {
              nestedElements = removeOutOfScopeItemprops(element, nestedElements);
          }
          return nestedElements.reduce((pv, cv) => {
              let name = cv.getAttribute("itemprop");
              name = isURL.test(name) ? name : `${vocab}${name}`;
              if (cv.getAttribute("itemscope")) {
                  pv[name] = getMicroData(cv);
              }
              else {
                  pv[name] = getMicrodataPropertyValue(cv, name);
              }
              return pv;
          }, { type, id });
      }
      function getMicroDataExplicit(element) {
          const type = element.getAttribute("itemtype");
          if (!isURL.test(type)) {
              logError({
                  type: "error",
                  message: `Itemtype (${type}) is not an URL. Page: ${location.href}`,
                  level: "warning",
              }, null);
              return {};
          }
          let { nestedElements, hasNestedItemScopes } = getPropertyElements(element);
          if (hasNestedItemScopes.length > 0) {
              nestedElements = removeOutOfScopeItemprops(element, nestedElements);
          }
          return nestedElements.reduce((pv, cv) => {
              let name = cv.getAttribute("itemprop");
              if (cv.getAttribute("itemscope")) {
                  pv[name] = getMicroData(cv);
              }
              else {
                  pv[name] = getMicrodataPropertyValue(cv, name);
              }
              return pv;
          }, {});
      }
      function createClassname(str) {
          return str.replace(/\s([a-zA-Z])/g, (char) => char[1].toUpperCase());
      }
      function logElementsWithMicroData(elementSet) {
          elementSet.forEach((element) => __awaiter(this, void 0, void 0, function* () {
              const itemType = element.getAttribute("itemtype");
              if (itemType.startsWith("https://www.adplogger.no/json-schema/meta")) {
                  const schemaName = itemType.split("/").pop();
                  try {
                      const microdata = getMicroDataExplicit(element);
                      microdata.id = v4();
                      const { default: data } = yield module.import(`./schemas/${schemaName}.js`);
                      const payloadProperties = data.properties.payload.properties;
                      Object.keys(payloadProperties).forEach((prop) => {
                          const { default: def } = payloadProperties[prop];
                          if (def && !microdata[prop]) {
                              microdata[prop] = def;
                          }
                      });
                      const { type } = microdata;
                      addMetaElement(element, type, microdata, false, createClassname(data.title));
                  }
                  catch (error) {
                      console.log({ error });
                  }
              }
              else {
                  const microdata = getMicroData(element);
                  const { data, type } = mapToAdp(microdata);
                  addMetaElement(element, type, data);
              }
          }));
      }
      const querySelectors = {};
      function logElementsWithCssSelector(elementMap) {
          elementMap.forEach((elements, selector) => {
              elements.forEach((element) => {
                  const { data, type } = JSON.parse(JSON.stringify(querySelectors[selector]));
                  addMetaElement(element, type, data);
                  querySelectors[selector].data.position += 1;
              });
          });
      }
      function logElements(parent = document.body) {
          // If parent has shadow dom, we take shadow dom as parent
          if (parent.shadowRoot) {
              parent = parent.shadowRoot;
          }
          // Should not log if data-adp-nolog is true
          if (typeof window !== "undefined") {
              const noLog = document.querySelector("html").getAttribute("data-adp-nolog");
              if (noLog === "true") {
                  console.warn("Adplogger2 is disabled because of data-adp-nolog property in html tag");
                  return;
              }
          }
          const elementsWithMicroData = new Set([
              ...[].slice.call(parent.querySelectorAll("[itemscope]")),
          ]);
          new Set([
              ...[].slice.call(parent.querySelectorAll("[data-adp-testid]")),
          ]);
          if ((parent === null || parent === void 0 ? void 0 : parent.hasAttribute) && (parent === null || parent === void 0 ? void 0 : parent.hasAttribute("itemscope"))) {
              elementsWithMicroData.add(parent);
          }
          const elementsFromSelector = new Map();
          Object.keys(querySelectors).forEach((selector) => {
              const matchedElements = [];
              if (parent.matches(selector)) {
                  matchedElements.push(parent);
              }
              matchedElements.push(...parent.querySelectorAll(selector));
              if (matchedElements.length === 0) {
                  return;
              }
              elementsFromSelector.set(selector, matchedElements.filter((el) => !elementsWithMicroData.has(el)));
          });
          logElementsWithMicroData(elementsWithMicroData);
          logElementsWithCssSelector(elementsFromSelector);
          //logElementsWithABTesting(elementsWithABTest)
          if (parent === document.body) {
              elementsWithMicroData.add(document.documentElement);
          }
          self.dispatchEvent(new CustomEvent("adplogger:meta-elements-added", {
              detail: [...elementsWithMicroData],
          }));
      }
      const onUrlChange = () => {
          window.addEventListener("adp:url-change", () => {
              resetMetaTree(true, logElements);
          });
      };
      ready(logElements);
      ready(onUrlChange);
      /**
       * Define an element or an CSS selector as an ADP Meta Element type
       * @param {string} type The type of Meta Element. Described in {@link ../../../../schemas|Schemas}
       * @param {Object} adpMetaObject The meta element payload
       * @param {HTMLElement} [element] An Optional HTML Element.
       * If not present you must supply an cssSelector
       */
      function register(type, adpMetaObject, element = null) {
          if (!element) {
              const selector = adpMetaObject.cssSelector;
              if (selector) {
                  if (Number.isInteger(adpMetaObject.position)) {
                      adpMetaObject.position += 1;
                  }
                  else {
                      adpMetaObject.position = 0;
                  }
                  querySelectors[selector] = {
                      type,
                      data: adpMetaObject,
                  };
                  // create copy
                  const data = JSON.parse(JSON.stringify(adpMetaObject));
                  document.querySelectorAll(selector).forEach((el) => {
                      addMetaElement(el, type, data);
                      adpMetaObject.position += 1;
                  });
              }
              else {
                  throw new Error("Missing property cssSelector on the adp meta object");
              }
          }
          else if (window.HTMLElement && element instanceof HTMLElement) {
              addMetaElement(element, type, adpMetaObject);
          }
          else {
              throw new Error("Element must be an HTML Element");
          }
      }
      let elements = [];
      const elementBlackList = ["style", "link"];
      const flushElements = () => {
          elements
              .filter((el) => el.nodeType === 1 &&
              !elementBlackList.includes(el.nodeName.toLowerCase()))
              .forEach((el) => logElements(el));
          elements = [];
      };
      const observer = new MutationObserver((mutationList) => {
          var _a, _b, _c, _d, _e;
          for (const mutation of mutationList) {
              if (mutation.type === "childList") {
                  if (((_a = mutation.target) === null || _a === void 0 ? void 0 : _a.hasAttribute("data-adp-log")) &&
                      ((_b = mutation.target) === null || _b === void 0 ? void 0 : _b.getAttribute("data-adp-log")) ===
                          "false") {
                      return;
                  }
                  elements.push(...[...mutation.addedNodes]);
              }
              else if (mutation.type === "attributes") {
                  // This is for logging elements asynchronously. When attribute `data-adp-log` is true,
                  // we log it.
                  if ((_c = mutation.target) === null || _c === void 0 ? void 0 : _c.hasAttribute("data-adp-log")) {
                      if (((_d = mutation.target) === null || _d === void 0 ? void 0 : _d.getAttribute("data-adp-log")) ===
                          "false")
                          return;
                      else if (((_e = mutation.target) === null || _e === void 0 ? void 0 : _e.getAttribute("data-adp-log")) ===
                          "true") {
                          elements.push(...[mutation.target]);
                      }
                  }
                  if (mutation.target["localName"] === "bazaar-ad") {
                      elements.push(...[mutation.target]);
                  }
              }
          }
          flushElements();
      });
      observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
      });

      /**
       * All clicks in the DOM is captured by ADPlogger on the window object.
       * The Event is captured in the capture phase and an ADP Click Object
       * is created on the event . This object can be found on `event.adpClickEvent`.
       * We prevent the default navigation action on a-tags unless the target
       * attribute is set to `_blank`. We create a `event.preventAdpLogging`
       * method on the event. This means that if you would like to handle
       * click logging manually. You can attach a click listener to an element
       * in the bubbling phase and call preventAdpLogging.
       *
       * The preventDefault method is monkey patched So we know if the default
       * action is beeing prevented by another listener.
       *
       * In the bubbling phase of the event, we log the ADP Click Object unless
       * `preventAdpLogging` has been called. We then perform the page navigation.
       * @module lib/events/click
       * @typicalname click
       */
      const adpDefaultPrevented = new Set();
      let clickEvent;
      function wrapPreventDefault(e) {
          const oldPreventDeafult = e.preventDefault.bind(e);
          if (e.defaultPrevented) {
              adpDefaultPrevented.add(e);
          }
          e.preventDefault = function () {
              adpDefaultPrevented.add(e);
              oldPreventDeafult();
          };
          oldPreventDeafult();
      }
      const baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
      /**
       * @typedef {Object} AdpClickEvent
       * @mixes MouseEvent
       * @property {ClickEvent} adpClickEvent The Click Event data assosiated with the click
       * @property {function} preventAdpLogging Prevent the default logging of the click event
       */
      /**
       * Set log data on the event object
       * @param {AdpClickEvent} e
       * @private
       */
      // return the value of the attribute if it exists, otherwise return undefined
      const getAttributeValue = (attributes, attributeName) => {
          var _a;
          return ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.getNamedItem(attributeName)) === null || _a === void 0 ? void 0 : _a.value) || undefined;
      };
      function addClickData(e) {
          var _a, _b;
          // Adding composed path and using that to get the element for shadow root
          // Do not use e.path as it is not standard across the browsers
          const composedPath = e === null || e === void 0 ? void 0 : e.composedPath();
          // We need this because the target of shadow root is itself, and not the clicked element
          //@ts-ignore
          const target = (e.target.shadowRoot && composedPath[0]) ? composedPath[0] : e.target;
          const eventAttributes = target.attributes;
          let clickLabel = getAttributeValue(eventAttributes, "data-adp-clickLabel");
          let clickValue = getAttributeValue(eventAttributes, "data-adp-clickValue");
          if (!clickValue) {
              const clickValueElement = ((_a = composedPath === null || composedPath === void 0 ? void 0 : composedPath.find((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.getNamedItem('data-adp-clickValue'); })) === null || _a === void 0 ? void 0 : _a.attributes) || undefined;
              if (clickValueElement)
                  clickValue = getAttributeValue(clickValueElement, "data-adp-clickValue");
          }
          if (!clickLabel) {
              const clickLabelElement = ((_b = composedPath === null || composedPath === void 0 ? void 0 : composedPath.find((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.getNamedItem('data-adp-clickLabel'); })) === null || _b === void 0 ? void 0 : _b.attributes) || undefined;
              if (clickLabelElement)
                  clickLabel = getAttributeValue(clickLabelElement, "data-adp-clickLabel");
          }
          e.adpClickEvent = Object.assign(Object.assign({ cssSelector: getSelector(target), coordinateX: Math.round(e.pageX), coordinateY: Math.round(e.pageY), target: getClosestMetaElement(target) }, (clickLabel && { clickLabel: clickLabel })), (clickValue && { clickValue: clickValue }));
          e.preventAdpLogging = () => {
              delete e.adpClickEvent;
          };
          const linkElement = e.composedPath()
              .filter(element => element instanceof Element)
              .find((element) => element.tagName.toLowerCase() === 'a');
          if (linkElement) {
              const src = linkElement.getAttribute('href');
              if (src) {
                  e.adpClickEvent.link = new URL(src, baseUrl).toString();
                  // If the element is a normal link, we monkeypatch preventdefault
                  // and set window.location.href instead of default action.
                  // This give us the possibility of a async logging followed by a page navigation.
                  if (linkElement.getAttribute("target") !== "_blank" &&
                      !e.ctrlKey &&
                      !e.metaKey) {
                      wrapPreventDefault(e);
                  }
                  else {
                      e.newWindow = true;
                  }
              }
          }
      }
      function logClickEvent(e) {
          // The click event is sometimes fired twice whereas the second event
          // is a timestamp (I think its a sideeffect from requestAnimationFrame).
          // Therefore, we only update the clickEvent if it contains a valid adpClickEvent.
          if (e.adpClickEvent) {
              clickEvent = e;
          }
          let timeStamp = Date.now();
          let alreadySent = false;
          function cleanUpAndRedirect(clickEvent) {
              alreadySent = true;
              if (!clickEvent.adpClickEvent) {
                  return;
              }
              const { link } = clickEvent.adpClickEvent;
              if (!link || adpDefaultPrevented.has(clickEvent)) {
                  adpDefaultPrevented.delete(clickEvent);
                  return;
              }
              if (!clickEvent.newWindow) {
                  window.location.href = link;
              }
          }
          function checkForTimeOut() {
              // If the click event hangs (times out) for some reason, we redirect the user after x milliseconds
              // AnimationFrame is used to be able to check the timeSinceClick while the click is still being logged.
              // The check is done every ~16ms.
              if (alreadySent) {
                  return;
              }
              let timeRightNow = Date.now();
              let timeSinceClick = timeRightNow - timeStamp;
              if (timeSinceClick > 150) {
                  cleanUpAndRedirect(clickEvent);
                  return;
              }
              window.requestAnimationFrame(checkForTimeOut);
          }
          function sendClickData() {
              const { cssSelector, target, coordinateY, coordinateX, link, clickLabel, clickValue } = clickEvent.adpClickEvent;
              //TODO: Remove impl after AB testing is moved to backend
              setClickInSessionStorage(target.element);
              log('ClickEvent', {
                  type: 'click',
                  cssSelector,
                  coordinateX,
                  coordinateY,
                  link,
                  clickLabel,
                  clickValue
              }, target)
                  .catch(() => { }) // Always then
                  .then(() => {
                  if (alreadySent) {
                      return;
                  }
                  cleanUpAndRedirect(clickEvent);
              });
          }
          try {
              checkForTimeOut();
              sendClickData();
          }
          // If something goes wrong, redirect the user.
          catch (e) {
              cleanUpAndRedirect(clickEvent);
          }
      }
      // Check if the disable click logging flag is set in the HTML root(document) tag.
      function isClickLoggingDisabled() {
          var _a, _b;
          const disabledLoggingTypes = (_b = (_a = self.document) === null || _a === void 0 ? void 0 : _a.documentElement) === null || _b === void 0 ? void 0 : _b.getAttribute("data-disable-adplogger2-types");
          return (disabledLoggingTypes === null || disabledLoggingTypes === void 0 ? void 0 : disabledLoggingTypes.includes("click"));
      }
      // add eventlisteners and enable click logging if not disabled
      function activateClickLogging() {
          if (isClickLoggingDisabled()) {
              return;
          }
          else {
              self.addEventListener("click", addClickData, true);
              // Make sure the listener executes last to allow clients time to skip logging or change event data
              self.addEventListener("click", (e) => setTimeout(() => {
                  //setClickInSessionStorage(e.target)
                  logClickEvent(e);
              }, 0), false);
          }
      }
      ready(activateClickLogging);

      var resizeObservers = [];

      var hasActiveObservations = function () {
          return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
      };

      var hasSkippedObservations = function () {
          return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
      };

      var msg = 'ResizeObserver loop completed with undelivered notifications.';
      var deliverResizeLoopError = function () {
          var event;
          if (typeof ErrorEvent === 'function') {
              event = new ErrorEvent('error', {
                  message: msg
              });
          }
          else {
              event = document.createEvent('Event');
              event.initEvent('error', false, false);
              event.message = msg;
          }
          window.dispatchEvent(event);
      };

      var ResizeObserverBoxOptions;
      (function (ResizeObserverBoxOptions) {
          ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
          ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
          ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
      })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

      var freeze = function (obj) { return Object.freeze(obj); };

      var ResizeObserverSize = (function () {
          function ResizeObserverSize(inlineSize, blockSize) {
              this.inlineSize = inlineSize;
              this.blockSize = blockSize;
              freeze(this);
          }
          return ResizeObserverSize;
      }());

      var DOMRectReadOnly = (function () {
          function DOMRectReadOnly(x, y, width, height) {
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
              this.top = this.y;
              this.left = this.x;
              this.bottom = this.top + this.height;
              this.right = this.left + this.width;
              return freeze(this);
          }
          DOMRectReadOnly.prototype.toJSON = function () {
              var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
              return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
          };
          DOMRectReadOnly.fromRect = function (rectangle) {
              return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
          };
          return DOMRectReadOnly;
      }());

      var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
      var isHidden = function (target) {
          if (isSVG(target)) {
              var _a = target.getBBox(), width = _a.width, height = _a.height;
              return !width && !height;
          }
          var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
          return !(offsetWidth || offsetHeight || target.getClientRects().length);
      };
      var isElement = function (obj) {
          var _a;
          if (obj instanceof Element) {
              return true;
          }
          var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
          return !!(scope && obj instanceof scope.Element);
      };
      var isReplacedElement = function (target) {
          switch (target.tagName) {
              case 'INPUT':
                  if (target.type !== 'image') {
                      break;
                  }
              case 'VIDEO':
              case 'AUDIO':
              case 'EMBED':
              case 'OBJECT':
              case 'CANVAS':
              case 'IFRAME':
              case 'IMG':
                  return true;
          }
          return false;
      };

      var global$1 = typeof window !== 'undefined' ? window : {};

      var cache = new WeakMap();
      var scrollRegexp = /auto|scroll/;
      var verticalRegexp = /^tb|vertical/;
      var IE = (/msie|trident/i).test(global$1.navigator && global$1.navigator.userAgent);
      var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
      var size = function (inlineSize, blockSize, switchSizes) {
          if (inlineSize === void 0) { inlineSize = 0; }
          if (blockSize === void 0) { blockSize = 0; }
          if (switchSizes === void 0) { switchSizes = false; }
          return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
      };
      var zeroBoxes = freeze({
          devicePixelContentBoxSize: size(),
          borderBoxSize: size(),
          contentBoxSize: size(),
          contentRect: new DOMRectReadOnly(0, 0, 0, 0)
      });
      var calculateBoxSizes = function (target, forceRecalculation) {
          if (forceRecalculation === void 0) { forceRecalculation = false; }
          if (cache.has(target) && !forceRecalculation) {
              return cache.get(target);
          }
          if (isHidden(target)) {
              cache.set(target, zeroBoxes);
              return zeroBoxes;
          }
          var cs = getComputedStyle(target);
          var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
          var removePadding = !IE && cs.boxSizing === 'border-box';
          var switchSizes = verticalRegexp.test(cs.writingMode || '');
          var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
          var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
          var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
          var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
          var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
          var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
          var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
          var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
          var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
          var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
          var horizontalPadding = paddingLeft + paddingRight;
          var verticalPadding = paddingTop + paddingBottom;
          var horizontalBorderArea = borderLeft + borderRight;
          var verticalBorderArea = borderTop + borderBottom;
          var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
          var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
          var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
          var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
          var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
          var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
          var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
          var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
          var boxes = freeze({
              devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
              borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
              contentBoxSize: size(contentWidth, contentHeight, switchSizes),
              contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
          });
          cache.set(target, boxes);
          return boxes;
      };
      var calculateBoxSize = function (target, observedBox, forceRecalculation) {
          var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
          switch (observedBox) {
              case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
                  return devicePixelContentBoxSize;
              case ResizeObserverBoxOptions.BORDER_BOX:
                  return borderBoxSize;
              default:
                  return contentBoxSize;
          }
      };

      var ResizeObserverEntry = (function () {
          function ResizeObserverEntry(target) {
              var boxes = calculateBoxSizes(target);
              this.target = target;
              this.contentRect = boxes.contentRect;
              this.borderBoxSize = freeze([boxes.borderBoxSize]);
              this.contentBoxSize = freeze([boxes.contentBoxSize]);
              this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
          }
          return ResizeObserverEntry;
      }());

      var calculateDepthForNode = function (node) {
          if (isHidden(node)) {
              return Infinity;
          }
          var depth = 0;
          var parent = node.parentNode;
          while (parent) {
              depth += 1;
              parent = parent.parentNode;
          }
          return depth;
      };

      var broadcastActiveObservations = function () {
          var shallowestDepth = Infinity;
          var callbacks = [];
          resizeObservers.forEach(function processObserver(ro) {
              if (ro.activeTargets.length === 0) {
                  return;
              }
              var entries = [];
              ro.activeTargets.forEach(function processTarget(ot) {
                  var entry = new ResizeObserverEntry(ot.target);
                  var targetDepth = calculateDepthForNode(ot.target);
                  entries.push(entry);
                  ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
                  if (targetDepth < shallowestDepth) {
                      shallowestDepth = targetDepth;
                  }
              });
              callbacks.push(function resizeObserverCallback() {
                  ro.callback.call(ro.observer, entries, ro.observer);
              });
              ro.activeTargets.splice(0, ro.activeTargets.length);
          });
          for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
              var callback = callbacks_1[_i];
              callback();
          }
          return shallowestDepth;
      };

      var gatherActiveObservationsAtDepth = function (depth) {
          resizeObservers.forEach(function processObserver(ro) {
              ro.activeTargets.splice(0, ro.activeTargets.length);
              ro.skippedTargets.splice(0, ro.skippedTargets.length);
              ro.observationTargets.forEach(function processTarget(ot) {
                  if (ot.isActive()) {
                      if (calculateDepthForNode(ot.target) > depth) {
                          ro.activeTargets.push(ot);
                      }
                      else {
                          ro.skippedTargets.push(ot);
                      }
                  }
              });
          });
      };

      var process = function () {
          var depth = 0;
          gatherActiveObservationsAtDepth(depth);
          while (hasActiveObservations()) {
              depth = broadcastActiveObservations();
              gatherActiveObservationsAtDepth(depth);
          }
          if (hasSkippedObservations()) {
              deliverResizeLoopError();
          }
          return depth > 0;
      };

      var trigger;
      var callbacks = [];
      var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
      var queueMicroTask = function (callback) {
          if (!trigger) {
              var toggle_1 = 0;
              var el_1 = document.createTextNode('');
              var config = { characterData: true };
              new MutationObserver(function () { return notify(); }).observe(el_1, config);
              trigger = function () { el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++); };
          }
          callbacks.push(callback);
          trigger();
      };

      var queueResizeObserver = function (cb) {
          queueMicroTask(function ResizeObserver() {
              requestAnimationFrame(cb);
          });
      };

      var watching = 0;
      var isWatching = function () { return !!watching; };
      var CATCH_PERIOD = 250;
      var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
      var events = [
          'resize',
          'load',
          'transitionend',
          'animationend',
          'animationstart',
          'animationiteration',
          'keyup',
          'keydown',
          'mouseup',
          'mousedown',
          'mouseover',
          'mouseout',
          'blur',
          'focus'
      ];
      var time = function (timeout) {
          if (timeout === void 0) { timeout = 0; }
          return Date.now() + timeout;
      };
      var scheduled = false;
      var Scheduler = (function () {
          function Scheduler() {
              var _this = this;
              this.stopped = true;
              this.listener = function () { return _this.schedule(); };
          }
          Scheduler.prototype.run = function (timeout) {
              var _this = this;
              if (timeout === void 0) { timeout = CATCH_PERIOD; }
              if (scheduled) {
                  return;
              }
              scheduled = true;
              var until = time(timeout);
              queueResizeObserver(function () {
                  var elementsHaveResized = false;
                  try {
                      elementsHaveResized = process();
                  }
                  finally {
                      scheduled = false;
                      timeout = until - time();
                      if (!isWatching()) {
                          return;
                      }
                      if (elementsHaveResized) {
                          _this.run(1000);
                      }
                      else if (timeout > 0) {
                          _this.run(timeout);
                      }
                      else {
                          _this.start();
                      }
                  }
              });
          };
          Scheduler.prototype.schedule = function () {
              this.stop();
              this.run();
          };
          Scheduler.prototype.observe = function () {
              var _this = this;
              var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
              document.body ? cb() : global$1.addEventListener('DOMContentLoaded', cb);
          };
          Scheduler.prototype.start = function () {
              var _this = this;
              if (this.stopped) {
                  this.stopped = false;
                  this.observer = new MutationObserver(this.listener);
                  this.observe();
                  events.forEach(function (name) { return global$1.addEventListener(name, _this.listener, true); });
              }
          };
          Scheduler.prototype.stop = function () {
              var _this = this;
              if (!this.stopped) {
                  this.observer && this.observer.disconnect();
                  events.forEach(function (name) { return global$1.removeEventListener(name, _this.listener, true); });
                  this.stopped = true;
              }
          };
          return Scheduler;
      }());
      var scheduler = new Scheduler();
      var updateCount = function (n) {
          !watching && n > 0 && scheduler.start();
          watching += n;
          !watching && scheduler.stop();
      };

      var skipNotifyOnElement = function (target) {
          return !isSVG(target)
              && !isReplacedElement(target)
              && getComputedStyle(target).display === 'inline';
      };
      var ResizeObservation = (function () {
          function ResizeObservation(target, observedBox) {
              this.target = target;
              this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
              this.lastReportedSize = {
                  inlineSize: 0,
                  blockSize: 0
              };
          }
          ResizeObservation.prototype.isActive = function () {
              var size = calculateBoxSize(this.target, this.observedBox, true);
              if (skipNotifyOnElement(this.target)) {
                  this.lastReportedSize = size;
              }
              if (this.lastReportedSize.inlineSize !== size.inlineSize
                  || this.lastReportedSize.blockSize !== size.blockSize) {
                  return true;
              }
              return false;
          };
          return ResizeObservation;
      }());

      var ResizeObserverDetail = (function () {
          function ResizeObserverDetail(resizeObserver, callback) {
              this.activeTargets = [];
              this.skippedTargets = [];
              this.observationTargets = [];
              this.observer = resizeObserver;
              this.callback = callback;
          }
          return ResizeObserverDetail;
      }());

      var observerMap = new WeakMap();
      var getObservationIndex = function (observationTargets, target) {
          for (var i = 0; i < observationTargets.length; i += 1) {
              if (observationTargets[i].target === target) {
                  return i;
              }
          }
          return -1;
      };
      var ResizeObserverController = (function () {
          function ResizeObserverController() {
          }
          ResizeObserverController.connect = function (resizeObserver, callback) {
              var detail = new ResizeObserverDetail(resizeObserver, callback);
              observerMap.set(resizeObserver, detail);
          };
          ResizeObserverController.observe = function (resizeObserver, target, options) {
              var detail = observerMap.get(resizeObserver);
              var firstObservation = detail.observationTargets.length === 0;
              if (getObservationIndex(detail.observationTargets, target) < 0) {
                  firstObservation && resizeObservers.push(detail);
                  detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                  updateCount(1);
                  scheduler.schedule();
              }
          };
          ResizeObserverController.unobserve = function (resizeObserver, target) {
              var detail = observerMap.get(resizeObserver);
              var index = getObservationIndex(detail.observationTargets, target);
              var lastObservation = detail.observationTargets.length === 1;
              if (index >= 0) {
                  lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                  detail.observationTargets.splice(index, 1);
                  updateCount(-1);
              }
          };
          ResizeObserverController.disconnect = function (resizeObserver) {
              var _this = this;
              var detail = observerMap.get(resizeObserver);
              detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
              detail.activeTargets.splice(0, detail.activeTargets.length);
          };
          return ResizeObserverController;
      }());

      var ResizeObserver$1 = (function () {
          function ResizeObserver(callback) {
              if (arguments.length === 0) {
                  throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
              }
              if (typeof callback !== 'function') {
                  throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
              }
              ResizeObserverController.connect(this, callback);
          }
          ResizeObserver.prototype.observe = function (target, options) {
              if (arguments.length === 0) {
                  throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
              }
              if (!isElement(target)) {
                  throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
              }
              ResizeObserverController.observe(this, target, options);
          };
          ResizeObserver.prototype.unobserve = function (target) {
              if (arguments.length === 0) {
                  throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
              }
              if (!isElement(target)) {
                  throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
              }
              ResizeObserverController.unobserve(this, target);
          };
          ResizeObserver.prototype.disconnect = function () {
              ResizeObserverController.disconnect(this);
          };
          ResizeObserver.toString = function () {
              return 'function ResizeObserver () { [polyfill code] }';
          };
          return ResizeObserver;
      }());

      let passiveSupported = false;
      try {
          const options = {
              get passive() {
                  passiveSupported = true;
                  return false;
              }
          };
          window.addEventListener('test', null, options);
          window.removeEventListener('test', null, {});
      }
      catch (err) {
          passiveSupported = false;
      }
      function addEvent(target, type, listener, capture = false) {
          let options = false;
          if (passiveSupported) {
              options = {
                  passive: true,
                  capture
              };
          }
          target.addEventListener(type, listener, options);
      }

      const INACTIVITY_TIME = 10000; // 10 seconds
      let timer;
      const dispatchInActivityEvent = throttle(() => {
          if (timer) {
              clearTimeout(timer);
          }
          //   console.log("User INACTIVE");
          window.dispatchEvent(new CustomEvent("adplogger:user-inactive"));
      });
      function resetTimer() {
          clearTimeout(timer);
          timer = setTimeout(() => {
              dispatchInActivityEvent();
          }, INACTIVITY_TIME);
      }
      const dispatchActivityEvent = throttle(() => {
          resetTimer();
          //   console.log("user ACTIVE");
          window.dispatchEvent(new CustomEvent("adplogger:user-active"));
      });
      // Events considered to indicate that a user is engaged with browsing the webpage
      const initActivityEvents = () => {
          [
              "mousedown",
              "keydown",
              "mousemove",
              "focus",
              "scroll",
              "resize",
              "video-active",
              "touchmove",
              "deviceorientation",
          ].forEach((evt) => addEvent(window, evt, dispatchActivityEvent));
      };
      // Events considered to indicate that a user is not engaged with browsing the webpage
      const initInactivityEvents = () => {
          ["blur"].forEach((evt) => addEvent(window, evt, dispatchInActivityEvent));
      };
      ready(initActivityEvents);
      ready(initInactivityEvents);

      class Logger {
          constructor(element) {
              this.element = element;
              this.duration = 0;
              this.lastEventTime = undefined;
              this.sendCount = 0; // Used for selecting sending interval
          }
          send(onError) {
              if (this.duration > 250) {
                  const adpType = "InscreenEvent";
                  const data = { type: "inscreen", duration: this.duration };
                  const element = this.element;
                  log(adpType, data, element).catch((error) => {
                      console.error(`V. Could not create InscreenEvent Log. Error: ${error}`);
                      const logEvent = { adpType, data, element, attempt: 1 };
                      onError(logEvent);
                  });
              }
          }
      }

      /**
       * Measures if element is inscreen when 50% of the element is in the viewport
       * or if the element is larger than the viewport and 10% of the viewport is covered.
       *
       * You cannot currently manually log inscreen and no logging method is exported from this module.
       * @module lib/events/inscreen
       * @typicalname inscreen
       */
      // hack for rollup
      const Polyfill = ResizeObserver$1;
      const ResizeObserver = /** @type {any} */ (window).ResizeObserver || Polyfill;
      const elementsCurrentlyInscreen = new WeakMap();
      const durationListenerUnload = new WeakMap();
      let inscreenObserver;
      function calculateTreshold(sendCount) {
          // Calculates scaling logging intervals.
          // const logIntervals = [4000, 4500, 4501, 4502]; // Debug interval
          const logIntervals = [1000, 10000, 20000, 40000, 60000, 80000]; // production interval
          const maxLogInterval = logIntervals.length - 1;
          const logIntervalSelector = Math.min(sendCount, maxLogInterval);
          const durationTreshold = logIntervals[logIntervalSelector];
          return durationTreshold;
      }
      // @ts-ignore
      const resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
              if (elementsCurrentlyInscreen.has(entry.target)) {
                  return;
              }
              inscreenObserver.unobserve(entry.target);
              inscreenObserver.observe(entry.target);
          });
      });
      // createNewLogger(element) is not needed anymore. Can be replaced with new Logger(element);
      function createNewLogger(element) {
          return new Logger(element);
      }
      function createDurationListener(element) {
          let logger = createNewLogger(element);
          logger.lastEventTime = Date.now();
          elementsCurrentlyInscreen.set(element, logger);
          function updateDuration() {
              if (!logger.lastEventTime) {
                  logger.lastEventTime = Date.now();
              }
              const justNow = Date.now();
              const maxDuration = calculateTreshold(logger.sendCount);
              // In rare cases of very high duration, send the max duration + inactivity time instead
              const duration = Math.min(justNow - logger.lastEventTime, maxDuration + INACTIVITY_TIME);
              logger.duration = duration;
              // logger.updateDuration({ duration });
          }
          function sendAndContinue() {
              const previousSendCount = logger.sendCount;
              logger.send(err => handleLogError(err));
              logger = createNewLogger(element);
              logger.sendCount = previousSendCount + 1;
          }
          function sendAndStop() {
              updateDuration();
              logger.send(err => handleLogError(err));
              elementsCurrentlyInscreen.delete(element);
              durationListenerUnload.delete(element);
          }
          function forceSend() {
              updateDuration();
              sendAndContinue();
          }
          function userActiveHandler() {
              updateDuration();
              const durationTreshold = calculateTreshold(logger.sendCount);
              if (logger.duration >= durationTreshold) {
                  sendAndContinue();
              }
          }
          function unload() {
              sendAndStop();
              window.removeEventListener("adplogger:user-active", userActiveHandler);
              window.removeEventListener("adplogger:user-inactive", forceSend);
              window.removeEventListener("beforeunload", unload);
          }
          window.addEventListener("adplogger:user-active", userActiveHandler);
          window.addEventListener("adplogger:user-inactive", forceSend);
          window.addEventListener("beforeunload", unload);
          return unload;
      }
      function retryFailedEvent(logEvent) {
          const { adpType, data, element } = logEvent;
          log(adpType, data, element).catch(() => {
              logEvent.attempt += 1;
              handleLogError(logEvent);
          });
      }
      function handleLogError(logEvent) {
          if (logEvent.attempt > 1) {
              console.error(`Failed sending on retry, aborting. Duration lost: ${logEvent.data.duration}`);
              return;
          }
          setTimeout(() => {
              retryFailedEvent(logEvent);
          }, 5000);
      }
      function elementLargerThanViewPort(element) {
          let { top, bottom } = element.getBoundingClientRect();
          return bottom - top > window.innerHeight;
      }
      // Is triggered everytime an element intersects the viewport.
      function intersectionHandler(entry) {
          const ratio = entry.intersectionRatio;
          let element = entry.target;
          const isInscreen = elementsCurrentlyInscreen.has(element);
          const scrolledIntoScreen = elementLargerThanViewPort(element)
              ? ratio > 0
              : ratio >= 0.5;
          const scrolledOutofScreen = elementLargerThanViewPort(element)
              ? ratio <= 0
              : ratio < 0.5;
          if (scrolledIntoScreen && !isInscreen) {
              //TODO: Remove impl after AB testing is moved to backend
              setABTestDataForTeaser(element);
              const unload = createDurationListener(element);
              durationListenerUnload.set(element, unload);
          }
          if (scrolledOutofScreen) {
              if (isInscreen && durationListenerUnload.has(element)) {
                  // Send duration and remove element from elementsCurrentlyInscreen list
                  durationListenerUnload.get(element)();
              }
              return;
          }
      }
      inscreenObserver = new IntersectionObserver((entries) => {
          entries.forEach(intersectionHandler);
      }, {
          threshold: [0, 0.5],
      });
      function disconnectObservers() {
          if (inscreenObserver) {
              inscreenObserver.disconnect();
          }
          if (resizeObserver) {
              resizeObserver.disconnect();
          }
      }
      window.addEventListener("beforeunload", disconnectObservers);
      // Log all tagged elements.
      self.addEventListener("adplogger:meta-elements-added", (event) => 
      /** @type { CustomEvent } */ (event).detail.forEach((element) => {
          inscreenObserver.observe(element);
      }));
      self.addEventListener("adplogger:meta-elements-log", (event) => {
          /* setABTestDataForTeaser(event.detail) */
          const unload = createDurationListener(event.detail);
          durationListenerUnload.set(event.detail, unload);
      });

      function printDebugInfo() {
          const environment = getEnvironment();
          if (environment === "localhost") {
              const style = [
                  "color: #52de73",
                  "background: #1D1E20",
                  "font-size: 12px",
                  "border: 1px solid #52de73",
                  "padding: 10px",
              ].join(";");
              console.log(`%cADPLogger2 Status: Ready | Environment: ${environment} | Debugmode: False`, style);
              console.info("%cCheck get-environment.js if you see this message in production.", "color:#52de73; padding: 3px 3px 3px 3px; ");
          }
      }

      /**
       * ## Console.log
       *
       * We add functionality to the native `console.log`
       * `console.log('adp', {CustomData});`
       * The first argument is the string 'adp' and the second argument is a
       * dictionary object or an array of objects
       * ```javascript
       * console.log('adp', [{
       *     name: 'MyDimention',
       *     value: true
       * }
       *     name: 'MyStuff',
       *     value: 20
       * }])
       * ```
       *
       *
       * ## Performance.Measure
       *
       * Every time you record a `performance.measure` we log the name of the
       * Measure and the duration as value
       * ```javascript
       * performace.mark('test');
       * setTimeout(() => performance.measure('MyName', 'test'), 100);
       * // Logs a custom dimention named 'MyName' with the value 100
       * ```
       * @module lib/events/custom
       * @typicalname custom
       */
      /**
       * A dictionary for custom dimentions
       * @typedef {object} CustomData
       * @property {string} name - The identifier of the data
       * @property {string | number | boolean} value - The data value. Must be a primititve
       */
      /**
       * Logs data  not defined as a type by adp. This should only be used for temporary logging
       * If you find that logging made through logCustom should be permanent, you should
       * create a type in ADP.
      //  * @param {CustomData | CustomData[]} data
       * - An dictionary object or an array of dictionary objects
       * @param {HTMLElement | MetaNode} [element] - Element connected to the log event
       * @returns {Promise<void>}
       */
      function logCustom(data, element = getRoot(), name = "") {
          data = JSON.stringify(data);
          return log("CustomEvent", { type: "custom", data, name }, element);
      }
      let count = 1;
      function customEventHandler(event) {
          var _a, _b, _c, _d, _e;
          if (getEnvironment() === "localhost") {
              console.log("#", count, "ADPLogger2 recieved event: ", event);
              count += 1;
          }
          if (Array.isArray(event.detail)) {
              event.detail.forEach(detail => {
                  var _a;
                  const data = (detail === null || detail === void 0 ? void 0 : detail.value) || (detail === null || detail === void 0 ? void 0 : detail.data) || {};
                  logCustom(data, (_a = detail === null || detail === void 0 ? void 0 : detail.element) !== null && _a !== void 0 ? _a : getRoot(), detail === null || detail === void 0 ? void 0 : detail.name);
              });
          }
          else {
              const data = ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.value) || ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.data) || {};
              logCustom(data, (_d = (_c = event.detail) === null || _c === void 0 ? void 0 : _c.element) !== null && _d !== void 0 ? _d : getRoot(), (_e = event.detail) === null || _e === void 0 ? void 0 : _e.name);
          }
          document.dispatchEvent(new Event("adplogger2:event-logged"));
      }
      function initCustomEvent() {
          document.addEventListener("adplogger2:custom-event", customEventHandler);
          document.addEventListener("adplogger2:ready", printDebugInfo);
          document.dispatchEvent(new Event("adplogger2:ready"));
      }
      ready(initCustomEvent);

      var a=-1,o=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n));}),!0);},c=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},u=function(){var e=c();return e&&e.activationStart||0},f=function(e,n){var t=c(),r="navigate";a>=0?r="back-forward-cache":t&&(document.prerendering||u()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-")));return {name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},s=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries());}));}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},d=function(e,n,t,r){var i,a;return function(o){n.value>=0&&(o||r)&&((a=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=a,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n));}},l=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}));},p=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n);};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0);},v=function(e){var n=!1;return function(t){n||(e(t),n=!0);}},m=-1,h=function(){return "hidden"!==document.visibilityState||document.prerendering?1/0:0},g=function(e){"hidden"===document.visibilityState&&m>-1&&(m="visibilitychange"===e.type?e.timeStamp:0,T());},y=function(){addEventListener("visibilitychange",g,!0),addEventListener("prerenderingchange",g,!0);},T=function(){removeEventListener("visibilitychange",g,!0),removeEventListener("prerenderingchange",g,!0);},E=function(){return m<0&&(m=h(),y(),o((function(){setTimeout((function(){m=h(),y();}),0);}))),{get firstHiddenTime(){return m}}},C=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e();},L=[1800,3e3],b=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("FCP"),a=s("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(a.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-u(),0),i.entries.push(e),t(!0)));}));}));a&&(t=d(e,i,L,n.reportAllChanges),o((function(r){i=f("FCP"),t=d(e,i,L,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,t(!0);}));})));}));},w=[.1,.25],S=function(e,n){n=n||{},b(v((function(){var t,r=f("CLS",0),i=0,a=[],c=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=a[0],t=a[a.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,a.push(e)):(i=e.value,a=[e]);}})),i>r.value&&(r.value=i,r.entries=a,t());},u=s("layout-shift",c);u&&(t=d(e,r,w,n.reportAllChanges),p((function(){c(u.takeRecords()),t(!0);})),o((function(){i=0,r=f("CLS",0),t=d(e,r,w,n.reportAllChanges),l((function(){return t()}));})),setTimeout(t,0));})));},U=[2500,4e3],V={},W=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("LCP"),a=function(e){var n=e[e.length-1];n&&n.startTime<r.firstHiddenTime&&(i.value=Math.max(n.startTime-u(),0),i.entries=[n],t());},c=s("largest-contentful-paint",a);if(c){t=d(e,i,U,n.reportAllChanges);var m=v((function(){V[i.id]||(a(c.takeRecords()),c.disconnect(),V[i.id]=!0,t(!0));}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return setTimeout(m,0)}),!0);})),p(m),o((function(r){i=f("LCP"),t=d(e,i,U,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,V[i.id]=!0,t(!0);}));}));}}));},X=[800,1800],Y=function e(n){document.prerendering?C((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0);},Z=function(e,n){n=n||{};var t=f("TTFB"),r=d(e,t,X,n.reportAllChanges);Y((function(){var i=c();if(i){var a=i.responseStart;if(a<=0||a>performance.now())return;t.value=Math.max(a-u(),0),t.entries=[i],r(!0),o((function(){t=f("TTFB",0),(r=d(e,t,X,n.reportAllChanges))(!0);}));}}));};

      const version = '3.1.0';

      const TIMEOUT = 5000;
      const constructPayload = (name, value, func) => ({
          name,
          value,
          func,
      });
      const constructErrorPayload = (index) => {
          switch (index) {
              case 0:
                  return constructPayload("CLS", 0, console.warn.bind(undefined, "Cannot get web vital metric CLS"));
              case 1:
                  return constructPayload("LCP", 0, console.warn.bind(undefined, "Cannot get web vital metric LCP"));
              case 2:
                  return constructPayload("FCP", 0, console.warn.bind(undefined, "Cannot get web vital metric FCP"));
              case 3:
                  return constructPayload("TTFB", 0, console.warn.bind(undefined, "Cannot get web vital metric TTFB"));
          }
      };
      const getWebVitalsMetric = (funcs) => {
          return funcs.map((func, index) => new Promise((res, rej) => {
              func((metric) => res(metric), { reportAllChanges: true });
              setTimeout(() => {
                  rej(constructErrorPayload(index));
              }, index * TIMEOUT);
          }));
      };
      const initWebVitalsEvent = () => __awaiter(void 0, void 0, void 0, function* () {
          try {
              const allWebVitals = (yield Promise.allSettled(getWebVitalsMetric([S, W, b, Z])));
              allWebVitals.forEach((result) => result.status === "rejected" && result.reason.func());
              const normalizedWebVitals = allWebVitals.reduce((reducer, data) => {
                  var _a, _b, _c, _d, _e, _f, _g;
                  if (data.status === "rejected") {
                      reducer = Object.assign(Object.assign({}, reducer), { [(_b = (_a = data === null || data === void 0 ? void 0 : data.reason) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()]: (_c = data === null || data === void 0 ? void 0 : data.reason) === null || _c === void 0 ? void 0 : _c.value });
                  }
                  else {
                      reducer = Object.assign(Object.assign({}, reducer), { [(_e = (_d = data === null || data === void 0 ? void 0 : data.value) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.toLowerCase()]: Number((_g = (_f = data === null || data === void 0 ? void 0 : data.value) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.toFixed(2)) });
                  }
                  return reducer;
              }, {});
              try {
                  yield log("WebVitalsEvent", Object.assign(Object.assign({}, normalizedWebVitals), { type: "web-vitals", metaType: "Page" }), getRoot());
              }
              catch (error) {
                  console.warn(`V:${version}. ${error}`);
              }
          }
          catch (error) {
              console.warn(`V:${version}. ${error}`);
          }
      });
      ready(initWebVitalsEvent);

      const paintMapping = {
          "first-contentful-paint": "fcp",
          "first-paint": "fp",
      };
      const initPerformanceEvent = () => __awaiter(void 0, void 0, void 0, function* () {
          var _a, _b, _c, _d, _e, _f;
          const paintPerformance = performance.getEntriesByType("paint");
          const timingPerformance = performance.getEntriesByType("navigation");
          const payload = Object.keys(paintMapping).reduce((acc, key) => {
              var _a, _b;
              acc = Object.assign(Object.assign({}, acc), { [paintMapping[key]]: Math.round((_b = (_a = paintPerformance === null || paintPerformance === void 0 ? void 0 : paintPerformance.find((p) => p.name === key)) === null || _a === void 0 ? void 0 : _a.startTime) !== null && _b !== void 0 ? _b : 0) });
              return acc;
          }, {});
          payload.domComplete = (_b = Math.round((_a = timingPerformance[0]) === null || _a === void 0 ? void 0 : _a.domComplete)) !== null && _b !== void 0 ? _b : 0;
          payload.domInteractive =
              (_d = Math.round((_c = timingPerformance[0]) === null || _c === void 0 ? void 0 : _c.domInteractive)) !== null && _d !== void 0 ? _d : 0;
          payload.domContentLoaded =
              (_f = Math.round((_e = timingPerformance[0]) === null || _e === void 0 ? void 0 : _e.domContentLoadedEventEnd)) !== null && _f !== void 0 ? _f : 0;
          try {
              yield log("PerformanceEvent", Object.assign(Object.assign({}, payload), { type: "performance", metaType: "Page" }), getRoot());
          }
          catch (error) {
              console.error(`V:${version}. ${error}`);
          }
      });
      ready(initPerformanceEvent);

      /**
       * Flowplayer video logging
       * @module lib/events/video
       * @typicalname video
       */
      const adEvts = [
          "ad-started",
          "ad-skipped",
          "ad-completed",
      ];
      const playerEvents = [
          "cuepointstart",
          "cuepointend",
          "pause",
          "ended",
          "fullscreenenter",
          "fullscreenexit",
      ];
      const playerStartEvents = [
          "loadstart",
          "loadeddata",
      ];
      //TODO: Refactor this
      /**
       * Register a player object and attaches logging to the player
       * @param {Object} player A Flowplayer player object
       */
      function registerVideo(player, flowplayer) {
          const playerElement = player.root;
          let playerMetaElement;
          let playerTick;
          let playerAdTick;
          let lastTimestamp = 0;
          let lastCurrentTime = 0;
          let startTime = 0;
          let playing = false;
          let metadataloaded = false;
          let queue = [];
          let adDuration = 0;
          let adProgress = 0;
          function loadMetaData(player) {
              var _a, _b, _c;
              playerMetaElement = addMetaElement(playerElement, "Video", {
                  title: player.opts.title,
                  autoplay: player.opts.autoplay === true ||
                      player.opts.autoplay === "flowplayer.autoplay.ON",
                  autopause: player.opts.autopause,
                  live: player.opts.live,
                  length: player.duration || 0,
                  startTime: player.currentTime,
                  src: player.currentSrc,
                  adpType: "video",
                  type: "Video",
                  description: player.opts.description || "",
                  contentId: "flowplayer:" + ((_a = player.opts.metadata) === null || _a === void 0 ? void 0 : _a.media_id) || "",
                  playerId: ((_b = player.opts.metadata) === null || _b === void 0 ? void 0 : _b.player_id) || "",
                  category: ((_c = player.opts.metadata) === null || _c === void 0 ? void 0 : _c.category_name) || "",
              });
              metadataloaded = true;
              queue === null || queue === void 0 ? void 0 : queue.forEach((data) => send(data));
              queue = null;
          }
          function resetPlayerTick(isAd = false) {
              if (isAd) {
                  playerAdTick = new Date().getTime(); // used to calculate actual ad duration
              }
              else {
                  playerTick = new Date().getTime(); // used to calculate actual duration
              }
          }
          function getDuration(isAd = false) {
              let duration = 0;
              switch (isAd) {
                  case true:
                      if (!playerAdTick) {
                          break;
                      }
                      duration = Date.now() - playerAdTick;
                      resetPlayerTick(true);
                      break;
                  default:
                      if (!playerTick) {
                          break;
                      }
                      if (player.currentTime === 0) {
                          resetPlayerTick();
                          break;
                      }
                      duration = Date.now() - playerTick;
                      resetPlayerTick();
                      break;
              }
              return duration;
          }
          function send(data) {
              window.dispatchEvent(new CustomEvent("video-active"));
              data.type = "video";
              if (metadataloaded === false) {
                  queue.push(data);
                  return;
              }
              log("VideoEvent", data, playerMetaElement).catch((e) => console.error(`V:${version$1}. ${e}`));
          }
          if (player.opts &&
              player.playerState &&
              player.playerState["is-loaded"] === true &&
              player.opts.metadata) {
              loadMetaData(player);
          }
          // The media's metadata has finished loading; all attributes
          // now contain as much useful information as they're going to.
          // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
          player.on("loadedmetadata", () => {
              if (!metadataloaded) {
                  loadMetaData(player);
              }
              startTime = Math.floor(player.currentTime * 1000);
          });
          player.on("timeupdate", throttle((e) => {
              if (e.timeStamp - lastTimestamp > 5000) {
                  lastTimestamp = e.timeStamp;
                  send({
                      adpType: e.type,
                      duration: getDuration(),
                      currentTime: Math.floor(player.currentTime * 1000),
                      playbackRate: player.playbackRate,
                  });
              }
          }));
          player.on("src", () => {
              loadMetaData(player);
          });
          // note that pause events occur not only when user clicks pause.
          // before buffering, before ads, before finish etc there is also a pause
          playerEvents.forEach((evt) => {
              player.on(evt, (e) => {
                  send({
                      adpType: e.type,
                      duration: getDuration(),
                      currentTime: Math.floor(player.currentTime * 1000),
                  });
                  if (e.type === "pause" || e.type === "ended") {
                      // cuepointend ?
                      playing = false;
                      playerTick = 0;
                  }
              });
          });
          // 1: timeSinceLastSeek > 500 stops Flowplayer from flooding the logger with events
          // if the user slides the timemarker on the timeline.
          player.on("seeking", (e) => {
              let timeSinceLastSeek = e.timeStamp - lastTimestamp;
              let durationBeforeSeek = getDuration();
              let currentTimeBeforeSeek = (lastCurrentTime || startTime) + durationBeforeSeek;
              if (timeSinceLastSeek > 500) {
                  send({
                      adpType: e.type,
                      duration: durationBeforeSeek,
                      currentTime: currentTimeBeforeSeek,
                  });
                  lastTimestamp = e.timeStamp;
              }
          });
          playerStartEvents.forEach((evt) => {
              player.on(evt, (e) => {
                  send({
                      adpType: e.type,
                  });
                  resetPlayerTick();
              });
          });
          // Sent when the video begins to play either for the first time,
          // after having been paused, or after ending and then restarting.
          // we need to control a custom player flag because playing
          // triggers after seeking when player is running. We want to avoid this
          // behavior as it floods the logger
          player.on("playing", (e) => {
              if (!playing) {
                  lastCurrentTime = Math.floor(player.currentTime * 1000);
                  lastTimestamp = e.timeStamp; // prevent time_update from triggering
                  resetPlayerTick();
                  send({
                      adpType: "playing",
                      currentTime: Math.floor(player.currentTime * 1000),
                  });
                  playing = true;
              }
          });
          player.on("error", (e) => {
              const error = createError(e === null || e === void 0 ? void 0 : e.toString());
              logError(error, playerElement);
          });
          // Track ad events if ads exist on the player
          if (flowplayer && flowplayer.ads) {
              // ad paused
              player.on("ad-paused", (e) => {
                  log("PlaybackAdEvent", {
                      type: "video-ad",
                      adpType: e.type,
                      // @ts-ignore
                      adId: e.detail.vast_ad_id,
                      // @ts-ignore
                      adType: e.detail.ad_type,
                      currentTime: adProgress,
                      duration: getDuration(true),
                      length: Math.abs(adDuration * 1000),
                  }, playerMetaElement).catch((e) => console.error(`V:${version$1}. ${e}`));
                  playerAdTick = 0;
              });
              // ad resumed
              player.on("ad-resumed", (e) => {
                  resetPlayerTick(true);
                  log("PlaybackAdEvent", {
                      type: "video-ad",
                      adpType: e.type,
                      // @ts-ignore
                      adId: e.detail.vast_ad_id,
                      // @ts-ignore
                      adType: e.detail.ad_type,
                      currentTime: adProgress,
                      length: Math.abs(adDuration * 1000),
                      duration: getDuration(true),
                  }, playerMetaElement).catch((e) => console.error(`V:${version$1}. ${e}`));
              });
              // ad progress
              player.on("ad-progress", (e) => {
                  var _a, _b;
                  // @ts-ignore
                  if (typeof ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.duration) && typeof ((_b = e.detail) === null || _b === void 0 ? void 0 : _b.remaining)) {
                      // @ts-ignore
                      adProgress = Math.round(
                      // @ts-ignore
                      (e.detail.duration - e.detail.remaining) * 1000);
                  }
              });
              // ad started, skipped, completed
              adEvts.forEach((evt) => {
                  player.on(evt, (e) => {
                      var _a;
                      // @ts-ignore
                      if (typeof ((_a = e.detail.ad) === null || _a === void 0 ? void 0 : _a.duration)) {
                          // @ts-ignore
                          adDuration = e.detail.ad.duration;
                          // @ts-ignore
                          lastTimestamp = Math.floor(e.detail.ad.duration * 1000);
                      }
                      if (e.type === "ad-started") {
                          resetPlayerTick(true);
                      }
                      log("PlaybackAdEvent", {
                          type: "video-ad",
                          adpType: e.type,
                          // @ts-ignore
                          adId: e.detail.vast_ad_id,
                          // @ts-ignore
                          adType: e.detail.ad_type,
                          currentTime: e.type === "ad-started" ? 0 : adProgress,
                          duration: getDuration(true),
                          length: Math.abs(adDuration * 1000),
                      }, playerMetaElement).catch((e) => console.error(`V:${version$1}. ${e}`));
                  });
              });
          }
      }

      const getBackendUrl = () => {
          const environment = getEnvironment();
          if (environment === 'localhost') {
              return 'https://services.api.no/api/adplogger/v3/dummy';
          }
          if (environment === 'snap') {
              return 'https://collect-test.adplogger.no/';
          }
          return 'https://collect.adplogger.no/';
      };

      const isLocalHost = location.hostname.includes("localhost");
      let initialized = false;
      let store;
      // Guard to handle multiple instances of adplogger
      let guard = true;
      if (typeof globalThis.Adplogger2 === "undefined") {
          Object.defineProperty(globalThis, "Adplogger2", {
              value: {
                  version: version$1,
                  ready: false,
              },
              enumerable: false,
              configurable: true,
              writable: true,
          });
          guard = false;
      }
      const createSDKBridge = () => {
          window.addEventListener("adplogger-sdk:meta-element-added", (ev) => __awaiter(void 0, void 0, void 0, function* () {
              //@ts-ignore
              const node = yield addMetaElement(...ev.detail);
              window.dispatchEvent(new CustomEvent("adplogger:meta-elements-added", {
                  detail: [node.element],
              }));
              window.dispatchEvent(new CustomEvent("adplogger-core:meta-element-added", {
                  detail: node,
              }));
          }));
          window.addEventListener("adplogger-sdk:meta-event-added", ({ detail }) => __awaiter(void 0, void 0, void 0, function* () {
              const { type, payload, eventElement } = detail;
              try {
                  yield log(type, payload, eventElement);
                  notifyUpdate();
                  window.dispatchEvent(new CustomEvent("adplogger-core:meta-event-added", {
                      detail: { isLogged: true, data: { type, payload } },
                  }));
              }
              catch (error) {
                  window.dispatchEvent(new CustomEvent("adplogger-core:meta-event-added", {
                      detail: { isLogged: false, data: error },
                  }));
              }
          }));
      };
      const startDOMLogging = (log) => {
          resetMetaTree(log, log && initiateDom);
      };
      function startADPLogger(config) {
          var _a;
          if (guard)
              return;
          if (!config.url) {
              throw new Error("You must set a endpoint for adplogger");
          }
          setBackendUrl(config.url);
          !isLocalHost && initKilkaya();
          startDOMLogging((_a = config === null || config === void 0 ? void 0 : config.log) !== null && _a !== void 0 ? _a : true);
          createSDKBridge();
          initialize();
          // Temp function to remove old site-config from localstorage
          removeSiteConfigFromLocalStorage();
          window.dispatchEvent(new CustomEvent("adplogger.live"));
          window.addEventListener("adplogger.ready", () => window.dispatchEvent(new CustomEvent("adplogger.live")));
          window.addEventListener("adplogger.logger", 
          /** @type {CustomEvent} */ (evt) => {
              const { method, args, resolve, reject } = evt.detail;
              if (!methods[method]) {
                  reject(new Error(`adplogger does not have the method ${method}`));
              }
              try {
                  const result = methods[method](...args);
                  if (result && result.constructor && result.constructor === Promise) {
                      result.then(resolve).catch(reject);
                  }
                  else {
                      resolve(result);
                  }
              }
              catch (e) {
                  reject(e);
              }
          });
      }
      const getEmptyOptions = () => ({
          exclude: {
              modules: [],
          },
          config: {},
      });
      const init = (options) => __awaiter(void 0, void 0, void 0, function* () {
          if (initialized)
              return;
          if (!options) {
              options = getEmptyOptions();
          }
          initialized = true;
          store = yield storePromise();
          store.dispatch("setInitOptions", options);
          if (!store.state.startedDomLogging) {
              if (typeof window !== "undefined") {
                  startADPLogger({ url: getBackendUrl() });
                  console.log("ADPLOGGER INITIALIZED");
              }
          }
      });
      // Autostart module if no one is starting it explicitly
      setTimeout(init);
      const methods = {
          init: startADPLogger,
          log,
          //logCustom,
          logError,
          registerVideo,
          register,
      };
      const rpcServer = new RPCserver({
          component: "adplogger",
          version: "1.0",
      });
      Object.keys(methods).forEach((name) => rpcServer.addListener(name, methods[name]));

      console.log('NOMODULE -');

    })
  };
}));
