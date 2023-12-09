var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// ../brick-template/dist/index.mjs
var d = { shadow: false, version: "1.0.0" };
var c = (r) => {
  if (r.indexOf("-") <= 0 || r.indexOf("-") === r.length - 1)
    throw new Error("You need at least 1 dash in the custom element name, and it cannot be at the beginning or end of the selector!");
};
var h = (r) => (i) => {
  window && window.customElements && !window.customElements.get(r.selector) && (c(r.selector), i.prototype.config = { ...d, ...r }, window.customElements.define(r.selector, i));
};
function o(r, i) {
  let e = r[i];
  if (!e) {
    let t = i.split("-");
    e = [t.shift(), ...t.map((s) => s[0].toUpperCase() + s.slice(1))].join(""), r[i] = e;
  }
  return e;
}
var m = (r) => {
  let i = r;
  return i.data && (i = { ...i, ...JSON.parse(decodeURIComponent(i.data)) }), i;
};
var p = HTMLElement || class {
};
var a = class extends p {
  constructor() {
    var e, t, s;
    super();
    this.parameters = {}, this.selector = ((e = this.config) == null ? void 0 : e.selector) || this.tagName, this.root = (t = this.config) != null && t.shadow ? this.attachShadow({ mode: "open" }) : this, (s = this.config) != null && s.component && (this.component = this.config.component), this.attrToProp = {}, this.constructor.mirroredProps && this.defineProperties();
  }
  get HTML() {
    return this._HTML;
  }
  set HTML(e) {
    this._HTML = e;
  }
  get isRendered() {
    return this.hasAttribute("is-rendered");
  }
  set isRendered(e) {
    e ? this.setAttribute("is-rendered", "") : this.removeAttribute("is-rendered");
  }
  get eventListeners() {
    return [];
  }
  get template() {
    let e = document.createElement("template");
    return e.innerHTML = this.HTML, e;
  }
  async connectedCallback() {
    this.parameters = m({ ...this.parameters, ...this.dataset, ...this.data }), this.isRendered || (this.attachDOM(), this.isRendered = true), this.addEventListeners();
  }
  async disconnectedCallback() {
    this.removeEventListeners();
  }
  attachDOM() {
    var e;
    (e = this.styles) != null && e.host && (this.className = this.styles.host()), this.component || this.root.appendChild(this.template.content.cloneNode(true));
  }
  addEventListeners() {
    this.eventListeners.forEach(({ selector: e, action: t, listener: s }) => {
      if (e === "window" && window.addEventListener(t, s), e === "this")
        this.root.addEventListener(t, s);
      else {
        let n = this.root.querySelector(e);
        n && n.addEventListener(t, s);
      }
    });
  }
  removeEventListeners() {
    this.eventListeners.forEach(({ selector: e, action: t, listener: s }) => {
      e === "window" && window.removeEventListener(t, s), e === "this" && this.root.removeEventListener(t, s);
      let n = this.root.querySelector(e);
      n && n.removeEventListener(t, s);
    });
  }
  defineProperties() {
    if (Array.isArray(this.constructor.mirroredProps))
      return (/* @__PURE__ */ new Set([...this.constructor.mirroredProps])).forEach((t) => {
        let s = o(this.attrToProp, t);
        Object.defineProperty(this, s, { configurable: true, set: (n) => {
          this.setAttribute(t, n.toString()), this.data && (this.data[s] = n);
        }, get: () => this.getAttribute(t) });
      });
  }
};

// src/components/image/video-preview.ts
var VideoPreview = class extends a {
  constructor() {
    super();
    this.threshold = 0.5;
    this.rootMargin = "0px";
    this.timer = 5e3;
    this.mediaQuery = "(max-width: 532px)";
    this.smallDevice = window.matchMedia(this.mediaQuery);
  }
  async connectedCallback() {
    super.connectedCallback();
    const isSmallDevice = this.smallDevice.matches;
    if (isSmallDevice) {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersectionCallback.bind(this),
        {
          root: null,
          rootMargin: this.rootMargin,
          threshold: this.threshold
        }
      );
      this.intersectionObserver.observe(this);
    }
  }
  async disconnectedCallback() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    super.disconnectedCallback();
  }
  handleIntersectionCallback(entries) {
    entries.forEach((entry) => {
      const imageContainer = this.querySelector(
        "[data-preview-image]"
      );
      if (entry.isIntersecting) {
        imageContainer.classList.add("hide");
        setTimeout(() => {
          imageContainer.classList.remove("hide");
        }, this.timer);
      }
    });
  }
  get HTML() {
    return "";
  }
};
VideoPreview = __decorateClass([
  h({
    selector: "video-preview"
  })
], VideoPreview);
export {
  VideoPreview
};
