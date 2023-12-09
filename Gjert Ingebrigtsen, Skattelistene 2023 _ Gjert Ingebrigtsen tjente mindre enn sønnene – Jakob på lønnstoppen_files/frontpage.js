var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/css-mediaquery/index.js
var require_css_mediaquery = __commonJS({
  "node_modules/css-mediaquery/index.js"(exports) {
    "use strict";
    exports.match = matchQuery;
    exports.parse = parseQuery;
    var RE_MEDIA_QUERY = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i;
    var RE_MQ_EXPRESSION = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/;
    var RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;
    var RE_LENGTH_UNIT = /(em|rem|px|cm|mm|in|pt|pc)?$/;
    var RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?$/;
    function matchQuery(mediaQuery, values) {
      return parseQuery(mediaQuery).some(function(query) {
        var inverse = query.inverse;
        var typeMatch = query.type === "all" || values.type === query.type;
        if (typeMatch && inverse || !(typeMatch || inverse)) {
          return false;
        }
        var expressionsMatch = query.expressions.every(function(expression) {
          var feature = expression.feature, modifier = expression.modifier, expValue = expression.value, value = values[feature];
          if (!value) {
            return false;
          }
          switch (feature) {
            case "orientation":
            case "scan":
              return value.toLowerCase() === expValue.toLowerCase();
            case "width":
            case "height":
            case "device-width":
            case "device-height":
              expValue = toPx(expValue);
              value = toPx(value);
              break;
            case "resolution":
              expValue = toDpi(expValue);
              value = toDpi(value);
              break;
            case "aspect-ratio":
            case "device-aspect-ratio":
            case /* Deprecated */
            "device-pixel-ratio":
              expValue = toDecimal(expValue);
              value = toDecimal(value);
              break;
            case "grid":
            case "color":
            case "color-index":
            case "monochrome":
              expValue = parseInt(expValue, 10) || 1;
              value = parseInt(value, 10) || 0;
              break;
          }
          switch (modifier) {
            case "min":
              return value >= expValue;
            case "max":
              return value <= expValue;
            default:
              return value === expValue;
          }
        });
        return expressionsMatch && !inverse || !expressionsMatch && inverse;
      });
    }
    function parseQuery(mediaQuery) {
      return mediaQuery.split(",").map(function(query) {
        query = query.trim();
        var captures = query.match(RE_MEDIA_QUERY), modifier = captures[1], type = captures[2], expressions = captures[3] || "", parsed = {};
        parsed.inverse = !!modifier && modifier.toLowerCase() === "not";
        parsed.type = type ? type.toLowerCase() : "all";
        expressions = expressions.match(/\([^\)]+\)/g) || [];
        parsed.expressions = expressions.map(function(expression) {
          var captures2 = expression.match(RE_MQ_EXPRESSION), feature = captures2[1].toLowerCase().match(RE_MQ_FEATURE);
          return {
            modifier: feature[1],
            feature: feature[2],
            value: captures2[2]
          };
        });
        return parsed;
      });
    }
    function toDecimal(ratio) {
      var decimal = Number(ratio), numbers;
      if (!decimal) {
        numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
        decimal = numbers[1] / numbers[2];
      }
      return decimal;
    }
    function toDpi(resolution) {
      var value = parseFloat(resolution), units = String(resolution).match(RE_RESOLUTION_UNIT)[1];
      switch (units) {
        case "dpcm":
          return value / 2.54;
        case "dppx":
          return value * 96;
        default:
          return value;
      }
    }
    function toPx(length) {
      var value = parseFloat(length), units = String(length).match(RE_LENGTH_UNIT)[1];
      switch (units) {
        case "em":
          return value * 16;
        case "rem":
          return value * 16;
        case "cm":
          return value * 96 / 2.54;
        case "mm":
          return value * 96 / 2.54 / 10;
        case "in":
          return value * 96;
        case "pt":
          return value * 72;
        case "pc":
          return value * 72 / 12;
        default:
          return value;
      }
    }
  }
});

// assets/js/amedia-img.js
import { BrickImage, AmediaImageClient } from "https://assets.acdn.no/pkg/@amedia/brick-image/v2/brick-image.js";
if (customElements && !customElements.get("brick-image")) {
  customElements.define("brick-image", BrickImage);
}
if (customElements && !customElements.get("amedia-img")) {
  customElements.define("amedia-img", AmediaImageClient);
}

// assets/js/countdown.js
import { Countdown } from "https://assets.acdn.no/pkg/@amedia/brick-countdown/v0/amedia-countdown.js";
if (customElements && !customElements.get("amedia-countdown")) {
  customElements.define("amedia-countdown", Countdown);
}

// assets/js/frontpage.js
import { getBrowserId } from "https://assets.acdn.no/pkg/@amedia/browserid/v1/index.js";
import { UserDataRequest } from "https://assets.acdn.no/pkg/@amedia/user/v0/user.js";

// assets/js/adjust-teaser.js
function sortTeaserColumns(teaserColumns, vPadding) {
  return teaserColumns.map((teaserColumn, index) => {
    const height = teaserColumn.reduce((pv, teaser) => pv + teaser.height, 0) + (teaserColumn.length - 1) * vPadding;
    return {
      index,
      height,
      length: teaserColumns.length
    };
  }).sort((a, b) => a.height - b.height).filter((teaser, index, arr) => index === 0 || index === arr.length - 1);
}
function getHeightDiffFunction(columnsSorted, vPadding, percentage) {
  if (!percentage) {
    return columnsSorted[1].height - columnsSorted[0].height;
  }
  return columnsSorted[0].height / columnsSorted[1].height * 100;
}
function setHeight(teaserColumns, vPadding, sizes, firstContainer) {
  const columnsSorted = sortTeaserColumns(teaserColumns, vPadding);
  if (firstContainer && getHeightDiffFunction(columnsSorted, vPadding, true) > 60) {
    return;
  }
  const diff = getHeightDiffFunction(columnsSorted, vPadding);
  const tallestColumn = teaserColumns[columnsSorted[1].index];
  const smallestColumn = teaserColumns[columnsSorted[0].index];
  let fails = false;
  const newSmallestHeight = smallestColumn.reduce((pv, teaserWrapper, i) => {
    const info = teaserWrapper.teaser.increaseSize(true);
    if (!info) {
      fails = true;
      return pv;
    }
    if (sizes.indexOf(info.width) === -1) {
      fails = true;
      return pv;
    }
    return pv + info.height + i * vPadding;
  }, 0);
  const newTallestHeight = tallestColumn.reduce((pv, teaserWrapper, i) => {
    const info = teaserWrapper.teaser.decreaseSize(true);
    if (!info) {
      fails = true;
      return pv;
    }
    if (sizes.indexOf(info.width) === -1) {
      fails = true;
      return pv;
    }
    return pv + info.height + i * vPadding;
  }, 0);
  if (fails) {
    return;
  }
  const newDiff = Math.abs(newTallestHeight - newSmallestHeight);
  const alterColumnWidths = newDiff < diff;
  if (alterColumnWidths) {
    smallestColumn.forEach((teaserWrapper) => {
      const info = teaserWrapper.teaser.increaseSize();
      teaserWrapper.width = info.width;
      teaserWrapper.height = info.height;
    });
    tallestColumn.forEach((teaserWrapper) => {
      const info = teaserWrapper.teaser.decreaseSize();
      teaserWrapper.width = info.width;
      teaserWrapper.height = info.height;
    });
    setHeight(teaserColumns, vPadding, sizes);
  }
}
function shrink(iterations, teaserColumns, vPadding) {
  iterations -= 1;
  const columnsSorted = sortTeaserColumns(teaserColumns, vPadding);
  let diff = getHeightDiffFunction(columnsSorted, vPadding);
  let reduction = diff / teaserColumns[columnsSorted[1].index].length;
  teaserColumns[columnsSorted[1].index].slice(0).sort((a, b) => b.teaser.getInfo().minHeight - a.teaser.getInfo().minHeight).forEach((teaserWrapper) => {
    const factor = teaserWrapper.teaser.shrink(reduction);
    diff -= factor;
    reduction += reduction - factor;
    teaserWrapper.height = teaserWrapper.teaser.getInfo().height;
  });
  reduction = diff / teaserColumns[columnsSorted[0].index].length;
  teaserColumns[columnsSorted[0].index].slice(0).sort((a, b) => {
    const maxHeight = a.teaser.getInfo().maxHeight;
    if (!maxHeight) {
      return 1;
    }
    return b.teaser.getInfo().maxHeight - maxHeight;
  }).forEach((teaserWrapper) => {
    const factor = teaserWrapper.teaser.grow(reduction);
    reduction += reduction - factor;
    teaserWrapper.height = teaserWrapper.teaser.getInfo().height;
  });
  if (iterations > 0) {
    shrink(iterations, teaserColumns);
  }
}
function setCoordinates(teaserColumns, ltr = true, vPadding, hPadding) {
  let left = 0;
  let top = 0;
  if (teaserColumns.length > 1 && teaserColumns[0][0]) {
    const visualLeft = teaserColumns[0][0].width > teaserColumns[teaserColumns.length - 1][0].width;
    ltr = ltr && visualLeft || !ltr && !visualLeft;
    if (!ltr) {
      teaserColumns = teaserColumns.reverse();
    }
  }
  teaserColumns.forEach((column) => {
    top = 0;
    column.forEach((teaserWrapper) => {
      teaserWrapper.top = top;
      const info = teaserWrapper.teaser.getInfo();
      top += info.height + vPadding;
      teaserWrapper.left = left;
    });
    left += column[0].teaser.getInfo().width + hPadding;
  });
}
function getHeightDiff(teaserColumns, vPadding, percentage) {
  const columnsSorted = sortTeaserColumns(teaserColumns, vPadding);
  return getHeightDiffFunction(columnsSorted, vPadding, percentage);
}

// assets/js/layout-definitions.js
var smallScreen = 500;
var smallScreenTeaserSizes = [500];
var largeScreen = 980;
var largeScreenTeaserSizes = [980, 880, 780, 680, 580, 480, 380, 280];
var layouts = {
  [smallScreen]: {
    width: smallScreen,
    getInitialTeaserSize: (teaser, compositions) => {
      if (teaser.firstTeaser || teaser.important) {
        teaser.setVersion("default");
      }
      if (compositions && compositions.length > 0) {
        const compositionsString = compositions[compositions.length - 1].join();
        if (compositionsString === "242-default,242-default") {
          teaser.setVersion("imageLeft");
        }
      }
      return [smallScreen, "largest"];
    },
    indexDelta: (teaserList) => {
      let delta = 0;
      if (teaserList.length === 0) {
        return 0;
      }
      if (Array.isArray(teaserList[0])) {
        delta = 1;
      }
      return teaserList[delta] === void 0 || teaserList[delta].hasImage ? delta : delta + 1;
    },
    getAvailableSizes: () => [...smallScreenTeaserSizes],
    chooseVersion: (teaser, compositions, fullwidth, index, groupType) => {
      if (groupType === "complex") {
        return teaser.important ? teaser.setVersion("default") : teaser.setVersion("imageLeft", smallScreen);
      }
      if (compositions && compositions.length > 0) {
        const compositionsString = compositions[compositions.length - 1].join();
        if (compositionsString === `${smallScreen}-imageLeft`) {
          return teaser.setVersion("default");
        }
      }
      if (fullwidth && index !== 0) {
        return teaser.setVersion("imageLeft", smallScreen);
      }
      if (index === 0 || teaser.important) {
        return teaser.setVersion("default");
      }
      return teaser.setVersion("imageLeft", smallScreen);
    },
    hPadding: 16,
    vPadding: 24,
    column: 500,
    alterDirection: false,
    teaserSizes: [...smallScreenTeaserSizes],
    columns: 1,
    breakOnDiff: 60
  },
  [largeScreen]: {
    width: largeScreen,
    getInitialTeaserSize: (teaser) => {
      let size = largeScreenTeaserSizes[largeScreenTeaserSizes.length - 1];
      if (!teaser.hasImage) {
        size = largeScreenTeaserSizes[5];
      }
      if (teaser.premium || teaser.important || teaser.firstTeaser) {
        size = largeScreenTeaserSizes[3];
      }
      if (!teaser.hasImage && teaser.firstTeaser) {
        size = largeScreenTeaserSizes[0];
      }
      return [size, "largest"];
    },
    indexDelta: () => 0,
    getAvailableSizes: (index) => {
      if (index < 2) {
        return [...largeScreenTeaserSizes].filter((_, i) => i !== 5);
      }
      return [...largeScreenTeaserSizes];
    },
    chooseVersion: (teaser, compositions, fullwidth, index) => {
      if (fullwidth && index !== 0) {
        return teaser.setVersion("imageLeft", largeScreen);
      }
      if (!fullwidth) {
        return teaser.setVersion("default");
      }
      return teaser.setVersion("imageLeft", largeScreen);
    },
    hPadding: 20,
    vPadding: 30,
    column: 80,
    alterDirection: true,
    teaserSizes: [...largeScreenTeaserSizes],
    columns: 10,
    breakOnDiff: 0
  }
};
function getLayoutKeys() {
  return Object.keys(layouts).map((key) => parseInt(key, 10));
}
function getLayout() {
  const viewPortWidth = window.innerWidth;
  const sortedLayoutWidths = getLayoutKeys().sort((a, b) => a - b);
  return sortedLayoutWidths.find((layoutWidth) => viewPortWidth <= layoutWidth) || Math.max(...sortedLayoutWidths);
}

// assets/js/container.js
var Container = class {
  constructor(options) {
    this.freeSpace = [];
    this.content = [];
    this.type = options.type;
    this.ltr = options.ltr;
    this.vPadding = options.vPadding;
    this.hPadding = options.hPadding;
    this.compositions = options.compositions || [];
    this.index = options.index || 0;
    this.maxHeight = {};
  }
  addMaxHeight(left, max) {
    if (this.maxHeight[left]) {
      this.maxHeight[left] += max;
    } else {
      this.maxHeight[left] = max;
    }
  }
  getMaxHeight(left) {
    return Object.keys(this.maxHeight).reduce((result, key) => {
      key = parseInt(key, 10);
      if (left !== key && result < this.maxHeight[key]) {
        result = this.maxHeight[key];
      }
      return result;
    }, 0);
  }
  updateFree(rect) {
    if (this.content.length === 0) {
      return;
    }
    const teaserWrapper = this.content[this.content.length - 1];
    const teaserInfo = teaserWrapper.teaser.getInfo();
    this.addMaxHeight(teaserWrapper.left, teaserInfo.maxHeight || 0);
    if (rect === void 0) {
      const height = this.forceSecondTeaser ? 1e4 : teaserWrapper.height + teaserWrapper.height * 0.25;
      this.freeSpace.push({
        width: this.type - teaserWrapper.width - this.hPadding,
        height,
        top: 0,
        left: teaserWrapper.width + this.hPadding
      });
      this.freeSpace = this.freeSpace.filter(
        (f) => f.width > 0 && f.height > 0
      );
      return;
    }
    this.freeSpace.splice(this.freeSpace.indexOf(rect), 1);
    let rectHeight = rect.height;
    if (this.content.length === 2) {
      const firstTeaserWrapper = this.content[this.content.length - 2];
      rectHeight = firstTeaserWrapper.height > teaserWrapper.height ? firstTeaserWrapper.height : teaserWrapper.height;
    }
    if (teaserWrapper.height < rectHeight) {
      this.freeSpace.push({
        width: teaserWrapper.width,
        height: rectHeight - teaserWrapper.height - this.vPadding,
        top: rect.top + teaserWrapper.height + this.vPadding,
        left: rect.left
      });
    }
    if (teaserWrapper.width < rect.width) {
      this.freeSpace.push({
        width: rect.width - teaserWrapper.width - this.hPadding,
        height: rectHeight,
        top: rect.top,
        left: rect.left + teaserWrapper.width + this.hPadding
      });
    }
    this.freeSpace = this.freeSpace.filter((f) => f.width > 0 && f.height > 0).sort((a, b) => a.top - b.top);
  }
  getColumns() {
    let columns = this.content.reduce((pv, teaserWrapper) => {
      pv[teaserWrapper.left] = pv[teaserWrapper.left] || [];
      pv[teaserWrapper.left].push(teaserWrapper);
      return pv;
    }, {});
    columns = Object.keys(columns).sort().map((key) => columns[key].sort((a, b) => a.top - b.top));
    return columns;
  }
  fill() {
    this.content.forEach(
      (teaserWrapper) => teaserWrapper.teaser.setActiveBreakpoint(this.type)
    );
    let columns = this.getColumns();
    if (columns.length === 1) {
      columns[0].forEach(
        (teaserWrapper) => layouts[this.type].chooseVersion(
          teaserWrapper.teaser,
          this.compositions,
          true,
          this.index
        )
      );
    }
    this.freeSpace.filter((r) => r.top === 0).forEach((freeSpace) => {
      let remainingWidth = freeSpace.width + this.hPadding;
      columns.slice(0).reverse().every((column) => {
        let top = 0;
        const newWidth = column[0].width + remainingWidth;
        column.forEach((teaserWrapper) => {
          const { teaser } = teaserWrapper;
          teaser.setWidth(
            [newWidth, "largest", teaserWrapper.width],
            newWidth
          );
          const teaserInfo = teaser.getInfo();
          teaserWrapper.width = teaserInfo.width;
          teaserWrapper.height = teaserInfo.height;
          teaserWrapper.top = top;
          top += teaserInfo.height + this.vPadding;
        });
        remainingWidth = newWidth - column[0].width + this.hPadding;
        return remainingWidth > 0;
      });
    });
    if (columns.length > 1) {
      setHeight(
        columns,
        this.vPadding,
        layouts[this.type].getAvailableSizes(this.index),
        this.firstContainer
      );
      shrink(columns.length - 1, columns, this.vPadding);
      const diff = getHeightDiff(columns, this.vPadding, true);
      if (diff < layouts[this.type].breakOnDiff) {
        let top = 0;
        columns = [
          columns.reduce(
            (pv, column) => pv.concat(
              column.map((teaserWrapper) => {
                const { teaser } = teaserWrapper;
                teaser.setVersion("imageLeft");
                teaser.setWidth([this.type, "largest"]);
                const teaserInfo = teaser.getInfo();
                teaserWrapper.width = teaserInfo.width;
                teaserWrapper.height = teaserInfo.height;
                teaserWrapper.top = top;
                teaserWrapper.left = 0;
                top += teaserInfo.height + this.vPadding;
                return teaserWrapper;
              })
            ),
            []
          )
        ];
      }
    } else {
      columns[0].forEach((teaserWrapper) => {
        teaserWrapper.teaser.setMinImageHeight();
        teaserWrapper.teaser.setMaxImageHeight();
      });
    }
    setCoordinates(columns, this.ltr, this.vPadding, this.hPadding);
    const compositions = this.getColumns().map(
      (column) => `${column[0].width}-${column[0].teaser.activeBreakpoint ? column[0].teaser.activeBreakpoint.active.version : "default"}`
    );
    this.compositions.push(compositions);
    return {
      compositions,
      columns: this.getColumns(),
      width: this.type,
      content: this.content
    };
  }
  add(teaser, groupType, retry) {
    if (this.open === false) {
      return false;
    }
    teaser.setActiveBreakpoint(this.type);
    if (this.content.length === 0) {
      const sizes = layouts[this.type].getInitialTeaserSize(
        teaser,
        this.compositions
      );
      teaser.setWidth(sizes);
      const teaserInfo = teaser.getInfo();
      this.content.push({
        left: 0,
        top: 0,
        width: teaserInfo.width,
        height: teaserInfo.height,
        teaser
      });
      if (teaser.firstTeaser) {
        this.firstContainer = true;
      }
      this.forceSecondTeaser = !teaser.hasSize(this.type);
      this.updateFree();
      return true;
    }
    layouts[this.type].chooseVersion(
      teaser,
      this.compositions,
      false,
      this.index,
      groupType
    );
    const foundFreeSpace = !this.freeSpace.sort((r1, r2) => r2.top - r1.top).every((rect) => {
      const availableHeight = rect.height + this.getMaxHeight(rect.left);
      if (teaser.setWidthBestFit(rect.width, availableHeight, rect.top > 0)) {
        const teaserInfo = teaser.getInfo();
        this.content.push({
          left: rect.left,
          top: rect.top,
          width: teaserInfo.width,
          height: teaserInfo.height,
          teaser
        });
        this.updateFree(rect);
        return false;
      }
      return true;
    });
    if (!foundFreeSpace && !retry && this.content.length === 1) {
      const firstTeaser = this.content[0];
      if (!firstTeaser) {
        this.open = false;
        return this.open;
      }
      const remainingWidth = this.type - firstTeaser.width - this.hPadding;
      if (remainingWidth > 0 && !teaser.hasSize(remainingWidth)) {
        const targetSize = teaser.getSmallestSize(remainingWidth);
        firstTeaser.teaser.setActiveBreakpoint(this.type);
        if (targetSize && firstTeaser.teaser.hasSize(
          this.type - targetSize.width - this.hPadding
        )) {
          this.freeSpace = [];
          firstTeaser.teaser.setWidth([
            this.type - targetSize.width - this.hPadding
          ]);
          const firstTeaserInfo = firstTeaser.teaser.getInfo();
          firstTeaser.width = firstTeaserInfo.width;
          firstTeaser.height = firstTeaserInfo.height;
          this.updateFree();
          return this.add(teaser, groupType, true);
        }
        this.open = false;
        return false;
      }
    }
    this.open = foundFreeSpace;
    return this.open;
  }
  getHeight() {
    return this.content.reduce((containerHeight, containerItem) => {
      const { top } = containerItem;
      const { height } = containerItem.teaser.getInfo();
      if (top + height > containerHeight) {
        return top + height;
      }
      return containerHeight;
    }, 0);
  }
};

// assets/js/teaser.js
var import_css_mediaquery = __toESM(require_css_mediaquery(), 1);

// assets/js/log.js
var isDebugEnabled = false;
if (typeof window !== "undefined") {
  isDebugEnabled = window.location.href.indexOf("debug=true") !== -1;
}
function debug(type, ...data) {
  if (isDebugEnabled && data.length > 0) {
    data.unshift("Optimus");
    console[type](...data);
  }
}
var log_default = {
  log: debug.bind("log"),
  error: debug.bind("error"),
  info: debug.bind("info")
};

// assets/js/teaser.js
var mediaqueryPattern = /^@media\s+([^{]+)/;
var defaultBreakpoints = {
  version: "default",
  layout: []
};
var defaultVersion = {
  height: 0,
  fontSize: 1
};
function sortTeasers(a, b) {
  const s = b.width - a.width;
  if (s === 0) {
    return b.height - a.height;
  }
  return s;
}
function sortTeasersAsc(a, b) {
  const s = a.width - b.width;
  if (s === 0) {
    return b.height - a.height;
  }
  return s;
}
function aoiPercentage(num, per) {
  return num * ((100 - per) / 100);
}
var Teaser = class {
  constructor(options = {}) {
    this.lastItem = options.lastItem;
    this.breakpoints = {};
    this.id = options.id;
    this.css = options.css || { general: [] };
    this.premium = !!options.premium;
    this.important = !!options.isImportant;
    this.hasImage = options.hasImage;
    this.firstTeaser = !!options.firstTeaser;
    this.heightPercentage = options.imgAoi && options.imgAoi.heightPercentage ? options.imgAoi.heightPercentage : 0;
    this.widthPercentage = options.imgAoi && options.imgAoi.widthPercentage ? options.imgAoi.widthPercentage : 0;
    this.aoi = options.imgAoi;
    this.data = options.data || {};
    this.type = options.type;
    if (options.layout) {
      Object.keys(options.layout).forEach((key) => {
        const breakpoint = parseInt(key, 10);
        if (typeof breakpoint !== "number" || Number.isNaN(breakpoint)) {
          return;
        }
        this.addBreakPoint(breakpoint, options.layout[key], key);
      });
    }
  }
  addBreakPoint(breakpoint, layout = [], key) {
    if (this.breakpoints[breakpoint]) {
      return this;
    }
    this.breakpoints[breakpoint] = { ...defaultBreakpoints };
    this.breakpoints[breakpoint].layout = layout.reduce((result, l) => {
      if (!l.versions) {
        result.push({ version: "default", width: l.width, ...defaultVersion });
        return result;
      }
      return result.concat(
        Object.keys(l.versions).map((version) => {
          const masterVersion = l.versions[version][0];
          const dynamicVersion = l.versions[version].slice(1).filter((ver) => {
            if (!ver || !ver.test) {
              return false;
            }
            let testFunc;
            try {
              testFunc = new Function("data", ver.test);
            } catch (e) {
              log_default.log(e);
              return false;
            }
            return testFunc(this.data);
          }).sort((a, b) => a.height - b.height).pop();
          if (dynamicVersion && dynamicVersion.height > masterVersion.height) {
            Object.keys(dynamicVersion).forEach((k) => {
              if (k === "styles") {
                masterVersion.styles = masterVersion.styles.concat(
                  dynamicVersion.styles
                );
              } else {
                masterVersion[k] = dynamicVersion[k];
              }
            });
          }
          return {
            version,
            width: l.width,
            ...defaultVersion,
            ...masterVersion
          };
        })
      );
    }, []);
    this.breakpoints[breakpoint].type = key;
    return this;
  }
  setActiveBreakpoint(viewportWidth) {
    let activeBreakpoint = Object.keys(this.breakpoints).filter((key) => key <= viewportWidth).sort().pop();
    if (activeBreakpoint) {
      this.activeBreakpoint = this.breakpoints[activeBreakpoint];
      return this;
    }
    activeBreakpoint = Object.keys(this.breakpoints).sort().shift();
    this.activeBreakpoint = this.breakpoints[activeBreakpoint];
    return this;
  }
  setWidth(widths, maxMinWidth = 1e4) {
    if (!this.activeBreakpoint) {
      return false;
    }
    this.activeBreakpoint.active = false;
    widths.every((availableWidth) => {
      let version;
      if (availableWidth === "largest") {
        version = this.activeBreakpoint.layout.filter(
          (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width <= maxMinWidth
        ).sort(sortTeasers).shift();
        if (version) {
          this.activeBreakpoint.active = version;
          return false;
        }
        return true;
      }
      version = this.activeBreakpoint.layout.filter(
        (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width === availableWidth
      ).sort((a, b) => b.height - a.height).shift();
      if (version) {
        this.activeBreakpoint.active = version;
        return false;
      }
      return true;
    });
    return this.activeBreakpoint.active;
  }
  hasSize(size) {
    if (!this.activeBreakpoint) {
      return false;
    }
    const version = this.activeBreakpoint.layout.filter(
      (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width === size
    ).sort(sortTeasersAsc).shift();
    return !!version;
  }
  getSmallestSize(size) {
    if (!this.activeBreakpoint) {
      return false;
    }
    const version = this.activeBreakpoint.layout.filter(
      (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width >= size
    ).sort(sortTeasersAsc).shift();
    return version;
  }
  setWidthBestFit(availableWidth, availableHeight, fixedWidth) {
    if (!this.activeBreakpoint) {
      return false;
    }
    const version = this.activeBreakpoint.layout.filter(
      (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && (!fixedWidth ? layout.width <= availableWidth : layout.width === availableWidth) && layout.height - (layout.minHeight || 0) <= availableHeight
    ).sort((a, b) => {
      if (this.hasImage) {
        return sortTeasers(a, b);
      }
      return a.width - b.width;
    }).shift();
    this.activeBreakpoint.active = version;
    return this.activeBreakpoint.active;
  }
  decreaseSize(dryRun) {
    if (!this.activeBreakpoint) {
      return false;
    }
    const version = this.activeBreakpoint.layout.filter(
      (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width < this.activeBreakpoint.active.width
    ).sort(sortTeasers).shift();
    if (!version) {
      return false;
    }
    if (dryRun) {
      return version;
    }
    this.activeBreakpoint.active = version;
    return this.activeBreakpoint.active;
  }
  increaseSize(dryRun) {
    if (!this.activeBreakpoint) {
      return false;
    }
    const version = this.activeBreakpoint.layout.filter(
      (layout) => !(this.activeBreakpoint.version && layout.version !== this.activeBreakpoint.version) && layout.width > this.activeBreakpoint.active.width
    ).sort(sortTeasersAsc).shift();
    if (!version) {
      return false;
    }
    if (dryRun) {
      return version;
    }
    this.activeBreakpoint.active = version;
    return this.activeBreakpoint.active;
  }
  setVersion(version, width) {
    if (!this.activeBreakpoint) {
      return false;
    }
    let validVersion;
    if (width) {
      validVersion = this.activeBreakpoint.layout.filter(
        (l) => l.width === width && l.version === version
      ).length !== 0;
    } else {
      validVersion = this.activeBreakpoint.layout.some(
        (l) => l.version === version
      );
    }
    if (validVersion) {
      this.activeBreakpoint.version = version;
    } else {
      this.activeBreakpoint.version = "default";
    }
    return validVersion;
  }
  getStyles() {
    if (!this.activeBreakpoint || !this.activeBreakpoint.active) {
      return false;
    }
    const styles = { common: [], mediaqueries: [], animations: [] };
    this.css.general.forEach((css) => {
      css = css.trim();
      const mediaquery = css.match(mediaqueryPattern);
      if (mediaquery) {
        if (import_css_mediaquery.default.match(mediaquery[1], {
          type: "screen",
          width: this.activeBreakpoint.type
        })) {
          styles.mediaqueries.push(css);
        }
      } else {
        styles.common.push(css);
      }
    });
    if (this.css.animations) {
      styles.animations = styles.animations.concat(this.css.animations);
    }
    if (this.activeBreakpoint.active.styles) {
      this.activeBreakpoint.active.styles.forEach((css) => {
        css = css.trim();
        const mediaquery = css.match(mediaqueryPattern);
        if (mediaquery) {
          if (import_css_mediaquery.default.match(mediaquery[1], {
            type: "screen",
            width: this.activeBreakpoint.type
          })) {
            styles.mediaqueries.push(css);
          }
        } else {
          styles.common.push(css);
        }
      });
    }
    const version = this.activeBreakpoint.active.version || "default";
    if (this.css[version]) {
      this.css[version].forEach((css) => {
        css = css.trim();
        const mediaquery = css.match(mediaqueryPattern);
        if (mediaquery) {
          if (import_css_mediaquery.default.match(mediaquery[1], {
            type: "screen",
            width: this.activeBreakpoint.type
          })) {
            styles.mediaqueries.push(css);
          }
        } else {
          styles.common.push(css);
        }
      });
    }
    return {
      common: styles.common.join("\n"),
      mediaqueries: styles.mediaqueries.join("\n"),
      animations: styles.animations.join("\n")
    };
  }
  getInfo() {
    if (!this.activeBreakpoint || !this.activeBreakpoint.active) {
      return false;
    }
    return this.activeBreakpoint.active;
  }
  calculateReduction(minHeight, size, minImageHeight, imageHeight) {
    let reduction = Math.min(minHeight, size);
    if (minImageHeight) {
      const maxReduction = imageHeight - minImageHeight < 0 ? 0 : imageHeight - minImageHeight;
      reduction = reduction < maxReduction ? reduction : maxReduction;
    }
    return reduction;
  }
  shrink(size) {
    if (!size || !this.aoi || !this.activeBreakpoint || !this.activeBreakpoint.active) {
      return 0;
    }
    const { imageHeight, minImageHeight } = this.activeBreakpoint.active;
    if (imageHeight && this.activeBreakpoint.active.version === "default") {
      let minHeight = this.activeBreakpoint.active.minHeight || 0;
      const reduction = this.calculateReduction(
        minHeight,
        size,
        minImageHeight,
        imageHeight
      );
      const scale = imageHeight / this.aoi.orgHeight;
      const aoiTop = this.aoi.y * scale;
      this.activeBreakpoint.active.imageHeight -= reduction || 0;
      this.activeBreakpoint.active.height -= reduction;
      this.activeBreakpoint.active.imageTop = Math.min(aoiTop, reduction) / this.activeBreakpoint.active.imageHeight * 100;
      return reduction;
    }
    return 0;
  }
  getImageWidth(expansion, ratio) {
    const tempWidth = this.activeBreakpoint.active.imageWidth || this.activeBreakpoint.active.width;
    const imageWidth = tempWidth + expansion * ratio;
    return {
      imageWidth,
      imageWidthPercentage: imageWidth / this.activeBreakpoint.active.width * 100
    };
  }
  grow(size) {
    if (!size || !this.activeBreakpoint || !this.activeBreakpoint.active) {
      return 0;
    }
    const { imageHeight } = this.activeBreakpoint.active;
    if (imageHeight && this.aoi && this.activeBreakpoint.active.version === "default") {
      const minHeight = this.activeBreakpoint.active.minHeight || 0;
      let expansion = Math.min(minHeight, size);
      const scale = imageHeight / this.aoi.orgHeight;
      const ratio = this.aoi.orgWidth / this.aoi.orgHeight;
      const aoiLeft = this.aoi.x * scale;
      if (expansion) {
        let imageWidthInfo = this.getImageWidth(expansion, ratio);
        const aoiVisible = Math.abs(this.aoi.widthPercentage - 100);
        const imageVisible = Math.abs(
          100 - imageWidthInfo.imageWidthPercentage
        );
        if (aoiVisible < imageVisible) {
          expansion *= aoiVisible / 100;
          imageWidthInfo = this.getImageWidth(expansion, ratio);
        }
        this.activeBreakpoint.active.imageHeight += expansion;
        this.activeBreakpoint.active.height += expansion;
        const imageWidthDiff = imageWidthInfo.imageWidth - this.activeBreakpoint.active.width;
        if (imageWidthDiff > 0) {
          this.activeBreakpoint.active.imageWidthPercent = imageWidthInfo.imageWidthPercentage;
          const imageLeft = Math.min(aoiLeft, imageWidthDiff);
          this.activeBreakpoint.active.imageLeft = imageLeft / this.activeBreakpoint.active.width * 100;
        }
        return expansion;
      }
    } else if (this.hasImage === false) {
      const expansion = Math.min(
        size,
        this.activeBreakpoint.active.height / this.activeBreakpoint.active.lineCount
      );
      this.activeBreakpoint.active.verticalPadding = expansion;
      this.activeBreakpoint.active.height += expansion;
      return expansion;
    }
    return 0;
  }
  setMinImageHeight() {
    if (this.aoi && this.activeBreakpoint && this.activeBreakpoint.active) {
      const { imageHeight } = this.activeBreakpoint.active;
      const imageHeightPercentage = imageHeight / this.activeBreakpoint.active.height * 100;
      const scale = imageHeight / this.aoi.orgHeight;
      const aoiTop = this.aoi.y * scale;
      if (imageHeight && this.activeBreakpoint.active.version === "default") {
        const heightPercentage = parseInt(this.activeBreakpoint.type, 10) === 500 ? Math.max(75, this.aoi.heightPercentage) : this.aoi.heightPercentage;
        const reduction = imageHeightPercentage < heightPercentage ? 0 : aoiPercentage(imageHeight, heightPercentage);
        this.activeBreakpoint.active.imageHeight -= reduction;
        this.activeBreakpoint.active.height -= reduction;
        this.activeBreakpoint.active.imageTop = Math.min(aoiTop, reduction) / this.activeBreakpoint.active.imageHeight * 100;
      }
    }
  }
  /*
    Temporary function for setting a lower imageheight if the teaser has a maxImageHeight attribute.
  */
  setMaxImageHeight() {
    if (this.aoi && this.activeBreakpoint && this.activeBreakpoint.active) {
      const { imageHeight, maxImageHeight } = this.activeBreakpoint.active;
      if (imageHeight && maxImageHeight) {
        const imageReduction = imageHeight - maxImageHeight;
        const hasAOI = this.aoi.y !== 0 || this.aoi.x !== 0;
        const scale = imageHeight / this.aoi.orgHeight;
        const aoiTop = this.aoi.y * scale;
        const reduceImage = hasAOI && imageReduction > 0 && imageReduction < aoiTop;
        if (reduceImage) {
          const imageTop = hasAOI ? imageReduction / this.activeBreakpoint.active.imageHeight * 100 : 0;
          this.activeBreakpoint.active.imageHeight -= imageReduction;
          this.activeBreakpoint.active.height -= imageReduction;
          this.activeBreakpoint.active.imageTop = imageTop;
        }
      }
    }
  }
};

// assets/js/grid-css.js
var animations = [];
function getAnimations() {
  return animations;
}
function createTeaserStyles(containerInfo, breakpoint) {
  breakpoint.rowCounter = breakpoint.rowCounter || 0;
  const rows = containerInfo.content.reduce((r, teaserContainer) => {
    if (r.indexOf(teaserContainer.top) === -1) {
      r.push(teaserContainer.top);
    }
    return r;
  }, []).sort((a, b) => a - b);
  let floatStyle = "";
  let lastBreakpointStyle = "";
  let conditionalStyles = "";
  const templateRows = rows.reduce(
    (pv, cv, i, arr) => `${pv} ${i === arr.length - 1 && arr.length > 1 ? "min-content" : "max-content"}`,
    ""
  );
  breakpoint.rows = `${breakpoint.rows || ""} ${templateRows}`;
  containerInfo.columns.forEach((column) => {
    column.forEach((teaserContainer, i) => {
      const teaserInfo = teaserContainer.teaser.getInfo();
      const teaserId = teaserContainer.teaser.id;
      const teaserType = teaserContainer.teaser.type;
      const styles = teaserContainer.teaser.getStyles();
      const rowStart = breakpoint.rowCounter + rows.indexOf(teaserContainer.top) + 1;
      const rowEnd = breakpoint.rowCounter + (column[i + 1] ? rows.indexOf(column[i + 1].top) + 1 : 1 + rows.length);
      const columnStart = 1 + Math.floor(
        teaserContainer.left / breakpoint.width * layouts[breakpoint.width].columns
      );
      const columnEnd = 1 + Math.floor(
        (teaserContainer.left + teaserInfo.width) / breakpoint.width * layouts[breakpoint.width].columns
      );
      if (styles.animations) {
        if (animations.indexOf(styles.animations) === -1) {
          animations.push(styles.animations);
        }
      }
      if (styles.mediaqueries) {
        conditionalStyles += styles.mediaqueries;
      }
      if (styles.common) {
        floatStyle += styles.common;
      }
      const gridColumnEnd = columnEnd < layouts[breakpoint.width].columns ? columnEnd + 1 : columnEnd;
      floatStyle += `
      #art-${teaserId} {
          grid-column-start: ${columnStart};
          grid-column-end: ${teaserInfo.width ? gridColumnEnd : "none"};
          grid-row-start: ${rowStart};
          grid-row-end: ${rowEnd};
      }`;
      floatStyle += `
      @media screen and (max-width: 532px) {
        #art-${teaserId} {
            grid-column-end: ${teaserInfo.width ? gridColumnEnd : "auto"};
        }
      }`;
      if (teaserType === "smartembed") {
        lastBreakpointStyle += `
                #art-${teaserId} {
                  overflow: hidden;                
                }
                `;
        floatStyle += `
                #art-${teaserId} {
                    overflow: hidden;
                }
                `;
      }
      if (teaserInfo) {
        floatStyle += `
        #art-${teaserId} .titleWrapper > span {
            font-size: ${teaserInfo.fontSize}em;
        }
        #art-${teaserId} .teaser_image img.amedia-img-full {
            top: ${-teaserInfo.imageTop || 0}%;
            left: ${-teaserInfo.imageLeft || 0}%;
            width: ${teaserInfo.imageWidthPercent || 100}%;
            height: auto;
        }
        `;
        if (teaserType === "smartembed") {
          lastBreakpointStyle += `
                #art-${teaserId} {
                    min-height: ${teaserInfo.height}px;
                }
                `;
          floatStyle += `
                #art-${teaserId} {
                    min-height: ${teaserInfo.height / (containerInfo.width + breakpoint.styles.hPadding * 2) * 100}vw;
                }
                `;
        }
        if (teaserInfo.verticalPadding) {
          const padding = (teaserInfo.verticalPadding / teaserInfo.width * 100 + 6) / 2;
          floatStyle += `
                #art-${teaserId} .with-background-color .body,
                #art-${teaserId} .no-image .body {
                    padding-top: ${padding}% !important;
                    padding-bottom: ${padding}% !important;
                }
                `;
        }
        if (teaserInfo.imageHeight && teaserInfo.version === "default") {
          floatStyle += `
                #art-${teaserId} .imagewrapper {
                    padding-top: ${teaserInfo.imageHeight / teaserInfo.width * 100}% !important;
                }
                `;
        }
      }
    });
  });
  let css = `
    @media screen and (min-width: ${breakpoint.styles.minWidth}px) and (max-width:${breakpoint.styles.maxWidth}px) {
        ${floatStyle}
    }
    `;
  if (breakpoint.styles.lastBreakpoint) {
    css += `@media screen and (min-width:${breakpoint.styles.maxWidth}px) {
            ${floatStyle}
            ${lastBreakpointStyle}
        }`;
  }
  css += conditionalStyles;
  breakpoint.rowCounter += rows.length;
  return css;
}
function getGridCss({ columns, breakpoint, id, useStaticGrid }) {
  let css;
  const useMobileStaticGrid = breakpoint.styles.minWidth === 0 && useStaticGrid;
  if (useMobileStaticGrid) {
    css = getMobileStaticGridCss(breakpoint, id);
  } else {
    css = `
    @media screen and (min-width: ${breakpoint.styles.minWidth}px) and (max-width:${breakpoint.styles.maxWidth}px) {
        #${id} {
            grid-template-columns: ${columns};
            grid-template-rows: ${breakpoint.rows};
            grid-column-gap: ${breakpoint.styles.hPadding / breakpoint.width * 100}%;
            grid-row-gap: ${breakpoint.styles.vPadding / breakpoint.width * 100}vw;
            margin-bottom: ${breakpoint.styles.vPadding / breakpoint.width * 100}vw;
        }
    }`;
  }
  if (breakpoint.styles.lastBreakpoint) {
    css += `
        @media screen and (min-width:${breakpoint.styles.maxWidth}px) {
            #${id} {
                grid-template-columns: ${columns};
                grid-template-rows: ${breakpoint.rows};
                grid-column-gap: ${breakpoint.styles.hPadding / breakpoint.width * 100}%;
                grid-row-gap: ${breakpoint.styles.vPadding}px;
                margin-bottom: ${breakpoint.styles.vPadding}px;
            }
        }
        `;
  }
  return css;
}
function getMobileStaticGridCss(breakpoint, id) {
  return `
    @media screen and (max-width: 532px) {
        #${id} {
            grid-template-columns: auto;
            grid-template-rows: ${breakpoint.rows};
            grid-column-gap: var(--brick-space-x1);
            grid-row-gap: var(--brick-space-x1);
            margin-bottom: var(--brick-space-x1);
        }
    }`;
}
function createFrontStyle(breakpoint, id, isGroup, useStaticGrid) {
  const columns = Array(layouts[breakpoint.width].columns).fill(
    `${layouts[breakpoint.width].column / breakpoint.width * 100}%`,
    0,
    layouts[breakpoint.width].columns
  ).join(" ");
  let css = getGridCss({ columns, breakpoint, id, useStaticGrid });
  css += `
    #${id} {
        display: grid;
        padding-top: 0;
    }`;
  breakpoint.rowCounter = 0;
  return css;
}
function createFrontUnknownHeightStyle(id) {
  return `
    #${id} {
        display: block;
        padding-top:0;
    }`;
}

// assets/js/color-mapping.js
var drEditionColorMapping = {
  black: "background-black",
  grayDark: "background-dark-gray",
  gray: "background-gray",
  purple: "background-purple",
  blue: "background-blue",
  blueLight: "background-light-blue",
  green: "background-green",
  greenLight: "background-light-green",
  cinnamon: "background-cinnamon",
  gold: "background-gold",
  yellow: "background-yellow",
  redDark: "background-dark-red",
  red: "background-red",
  redLight: "background-light-red",
  finance: "background-finance",
  brown: "background-brown",
  customOne: "custom-one",
  customTwo: "custom-two",
  customThree: "custom-three",
  white: "background-custom-sport"
};

// assets/js/create-sonar.js
var brickThemes = ["alfa", "bravo", "charlie", "nettavisen"];
function createSonar(theme) {
  const useBrickIconSonar = brickThemes.includes(theme);
  const sonarHtml = useBrickIconSonar ? `<brick-icon iconTheme="${theme}" iconid="pill-breaking"></brick-icon>` : '<span class="optimus-complex-sonar" aria-hidden="true"></span>';
  return sonarHtml;
}

// assets/js/page-layout.js
var currentLayout = getLayout();
var optimusElementIndex = 0;
function closeContainer(breakpoint, unknownHeight) {
  const containerInfo = breakpoint.container.fill();
  const styles = createTeaserStyles(containerInfo, breakpoint);
  breakpoint.styles.compositions.push(containerInfo.compositions);
  breakpoint.styles.currentPageYPosition += breakpoint.container.getHeight() + breakpoint.styles.vPadding;
  breakpoint.index += 1;
  if (unknownHeight) {
    return "";
  }
  return styles;
}
function addTeaserPositionToHTML(html, index) {
  return html.replace(
    "<meta",
    `<meta itemprop="position" content="${index}" /><meta`
  );
}
function createContainer(breakpoint, ltr) {
  breakpoint.container = new Container({
    type: breakpoint.width,
    ltr,
    index: breakpoint.container.index + 1,
    vPadding: breakpoint.styles.vPadding,
    hPadding: breakpoint.styles.hPadding,
    compositions: breakpoint.styles.compositions
  });
}
function createPageHeader({ title: title2, breakingNews, theme }) {
  let html = "<header><h2>";
  if (breakingNews) {
    html += createSonar(theme);
  }
  html += `${title2}</h2></header>`;
  return html;
}
function createLargePageHeader({ title: title2, breakingNews, theme, largeTitleCss }) {
  let html = `<header><h2 class="${largeTitleCss}">`;
  if (breakingNews) {
    html += createSonar(theme);
  }
  html += `${title2}</h2></header>`;
  return html;
}
var PageLayout = class {
  constructor({ id, breakpoints: breakpoints2, options, theme }) {
    this.html = "";
    this.frontCSS = "";
    this.articleCSS = "";
    this.jsExternal = [];
    this.id = id;
    this.breakpoints = [];
    this.pageHeight = {};
    this.theme = theme;
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    let currentMinBreakpointWidth = 0;
    this.breakpoints = breakpoints2.sort((a, b) => a.width - b.width).map((breakpoint, i) => {
      const maxWidth = breakpoint.width + breakpoint.hPadding * 2;
      const lastBreakpoint = i === breakpoints2.length - 1;
      const minWidth = currentMinBreakpointWidth;
      currentMinBreakpointWidth = maxWidth + 1;
      return {
        container: new Container({
          type: breakpoint.width,
          ltr: true,
          index: this.containerIndex[breakpoint.width] || 0,
          vPadding: breakpoint.vPadding,
          hPadding: breakpoint.hPadding,
          compositions: []
        }),
        width: breakpoint.width,
        styles: {
          minWidth,
          maxWidth,
          ltr: true,
          vPadding: breakpoint.vPadding,
          hPadding: breakpoint.hPadding,
          lastBreakpoint,
          alterDirection: breakpoint.alterDirection,
          currentPageYPosition: 0,
          compositions: []
        },
        index: options.index || 0
      };
    });
  }
  close() {
    const useStaticGrid = brickThemes.includes(this.theme);
    const isDrEditionGroup = this.group && this.source === "dredition" && this.type === "complex";
    this.breakpoints = this.breakpoints.map((breakpoint) => {
      this.articleCSS += closeContainer(breakpoint, this.unknownHeight);
      this.frontCSS += createFrontStyle(
        breakpoint,
        this.id,
        isDrEditionGroup,
        useStaticGrid
      );
      return breakpoint;
    }).sort((a, b) => b.width - a.width);
    if (this.unknownHeight) {
      this.frontCSS = createFrontUnknownHeightStyle(this.id);
    }
    this.articleCSS += getAnimations().join("");
    const css = `
        <style type="text/css" data-desc="Article styles for ${this.id}">${this.articleCSS}</style>
        <style type="text/css" data-desc="Front styles for ${this.id}">${this.frontCSS}</style>
        `;
    let html = `<div id="${this.id}" class="front">${this.html}</div>`;
    if (this.group && this.type === "complex") {
      let title2 = "";
      let classes = "optimus-complex-front";
      if (this.title && this.largeTitle === true) {
        const largeTitleCss = "large";
        title2 = createLargePageHeader({
          title: this.title,
          breakingNews: this.breakingNews,
          theme: this.theme,
          largeTitleCss
        });
      } else if (this.title && this.largeTitle === false) {
        title2 = createPageHeader({
          title: this.title,
          breakingNews: this.breakingNews,
          theme: this.theme
        });
      } else {
        classes += " noHeader";
      }
      if (this.backgroundColor) {
        classes += ` optimus-${drEditionColorMapping[this.backgroundColor]}`;
      }
      html = `<section class="${classes}">${title2}${html}</section>`;
    }
    html = `${css}${html}`;
    return {
      html,
      jsExternal: this.jsExternal
    };
  }
  add(teaserList, onlyFillContainer) {
    let done = false;
    return teaserList.filter((teaserData) => {
      if (done) {
        return true;
      }
      if (!teaserData) {
        return false;
      }
      if (teaserData.type === "multivariant") {
        return false;
      }
      const teaser = new Teaser(teaserData);
      let breakpoints2 = this.breakpoints.slice();
      if (onlyFillContainer) {
        breakpoints2 = breakpoints2.sort((a, b) => {
          if (a.width === onlyFillContainer) {
            return -1;
          }
          if (b.width === onlyFillContainer) {
            return 1;
          }
          return 0;
        });
      }
      breakpoints2.forEach((breakpoint) => {
        if (!done) {
          const isAdded = breakpoint.container.add(teaser, this.type);
          if (!isAdded && breakpoint.width === onlyFillContainer) {
            done = true;
          } else if (!isAdded) {
            this.articleCSS += closeContainer(breakpoint, this.unknownHeight);
            this.containerIndex[breakpoint.width] = breakpoint.container.index;
            if (breakpoint.styles.alterDirection && breakpoint.container.content.length > 1) {
              breakpoint.styles.ltr = !breakpoint.styles.ltr;
            }
            createContainer(breakpoint, breakpoint.styles.ltr);
            breakpoint.container.add(teaser, this.type);
          }
        }
      });
      if (!done) {
        let attr = "";
        if (teaser.breakpoints && teaser.breakpoints[currentLayout] && teaser.breakpoints[currentLayout].active) {
          attr += `linecount="${teaser.breakpoints[currentLayout].active.lineCount}" `;
          attr += `version="${teaser.breakpoints[currentLayout].active.version}" `;
          attr += `width="${teaser.breakpoints[currentLayout].active.width}" `;
          attr += `index="${optimusElementIndex}"`;
        }
        if (teaserData.experimentDebug) {
          attr += ' style="outline: red solid 5px;"';
        }
        optimusElementIndex += 1;
        let teaserHtml = teaserData.html;
        if (teaserHtml) {
          const match = teaserHtml.match(
            /<a href="(https:\/\/www.alt.no[^"]*)"/
          );
          if (match) {
            teaserHtml = teaserHtml.replace(
              /<a href="[^"]*"/,
              `<a href="${match[1]}?amedia_referrer=${location.host}&infobox"`
            );
          }
          teaserHtml = addTeaserPositionToHTML(teaserHtml, optimusElementIndex);
        }
        this.html += `<optimus-element id="art-${teaserData.id}" ${attr}>${teaserHtml}</optimus-element>`;
        if (teaserData.js) {
          this.jsExternal = this.jsExternal.concat(teaserData.js);
        }
      }
      return done;
    });
  }
};
var page_layout_default = PageLayout;

// assets/js/group-page-layout.js
var currentLayout2 = getLayout();
var optimusElementIndex2 = 0;
function createContainer2(breakpoint, ltr) {
  breakpoint.container = new Container({
    type: breakpoint.width,
    ltr,
    index: breakpoint.container.index + 1,
    vPadding: breakpoint.styles.vPadding,
    hPadding: breakpoint.styles.hPadding,
    compositions: breakpoint.styles.compositions
  });
}
function createPageHeader2(title2, sonar, theme) {
  let html = "<header><h2>";
  if (sonar) {
    html += createSonar(theme);
  }
  html += `${title2}</h2></header>`;
  return html;
}
function createLargePageHeader2(title2, sonar, largeTitleCss, theme) {
  let html = `<header><h2 class="${largeTitleCss}">`;
  if (sonar) {
    html += createSonar(theme);
  }
  html += `${title2}</h2></header>`;
  return html;
}
var GroupPageLayout = class {
  constructor({ id, breakpoints: breakpoints2, options, theme, meta }) {
    __publicField(this, "getWrapMarkup", ({
      carouselChildrenCount,
      minSlidesToShow,
      carouselMarkup
    }) => {
      if (carouselChildrenCount <= 0) {
        return "";
      }
      if (carouselChildrenCount === 1) {
        return carouselMarkup;
      } else {
        return `<brick-carousel min-slides-to-show="${minSlidesToShow}" style="--version:left">${carouselMarkup}</brick-carousel>`;
      }
    });
    this.html = "";
    this.carouselMarkup = "";
    this.carouselChildrenCount = 0;
    this.groupFooterMarkupOne = "";
    this.groupFooterMarkupTwo = "";
    this.promoteFirstMarkup = "";
    this.defaultMarkup = "";
    this.meta = meta;
    this.jsExternal = [];
    this.id = id;
    this.breakpoints = [];
    this.pageHeight = {};
    this.theme = theme;
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    let currentMinBreakpointWidth = 0;
    this.breakpoints = breakpoints2.sort((a, b) => a.width - b.width).map((breakpoint, i) => {
      const maxWidth = breakpoint.width + breakpoint.hPadding * 2;
      const lastBreakpoint = i === breakpoints2.length - 1;
      const minWidth = currentMinBreakpointWidth;
      currentMinBreakpointWidth = maxWidth + 1;
      return {
        container: new Container({
          type: breakpoint.width,
          ltr: true,
          index: this.containerIndex[breakpoint.width] || 0,
          vPadding: breakpoint.vPadding,
          hPadding: breakpoint.hPadding,
          compositions: []
        }),
        width: breakpoint.width,
        styles: {
          minWidth,
          maxWidth,
          ltr: true,
          vPadding: breakpoint.vPadding,
          hPadding: breakpoint.hPadding,
          lastBreakpoint,
          alterDirection: breakpoint.alterDirection,
          currentPageYPosition: 0,
          compositions: []
        },
        index: options.index || 0
      };
    });
  }
  close() {
    this.breakpoints = this.breakpoints.map((breakpoint) => {
      return breakpoint;
    }).sort((a, b) => b.width - a.width);
    let frontClass = "front";
    let idClass = this.id;
    let minSlidesToShow = 2;
    if (this.groupType === "soccer") {
      frontClass = "soccer";
      idClass = "soccer";
      minSlidesToShow = 1;
    }
    const wrapHorizontalGroup = this.getWrapMarkup({
      carouselChildrenCount: this.carouselChildrenCount,
      minSlidesToShow,
      carouselMarkup: this.carouselMarkup
    });
    let html = `<div id="${idClass}" class=${frontClass}>
    ${this.html}</div>`;
    if (this.group && this.type === "complex") {
      let title2 = "";
      let classes = `optimus-complex-front ${this.groupType}`;
      if (this.title && this.largeTitle === true) {
        const largeTitleCss = "large";
        title2 = createLargePageHeader2(
          this.title,
          this.breakingNews,
          largeTitleCss,
          this.theme
        );
      } else if (this.title && this.largeTitle === false) {
        title2 = createPageHeader2(this.title, this.breakingNews, this.theme);
      } else {
        classes += " noHeader";
      }
      if (this.backgroundColor) {
        classes += ` optimus-${drEditionColorMapping[this.backgroundColor]}`;
      }
      const useHorizonalSpace = title2 || wrapHorizontalGroup || this.groupFooterMarkupOne || this.groupFooterMarkupTwo;
      if (this.meta.groupType === "list-horizontal") {
        const padding = useHorizonalSpace ? "wrap-horizontal-space" : "";
        const isSolo = this.carouselChildrenCount === 1 ? "solo-group" : "";
        html = `<section class="${classes}" data-group="ghost">${title2}<div class="wrap-horizontal ${padding} ${isSolo}">${this.promoteFirstMarkup}${wrapHorizontalGroup}${this.groupFooterMarkupOne}${this.groupFooterMarkupTwo}</section>`;
      } else if (this.meta.groupType === "default") {
        html = `<section class="${classes}" data-group="ghost">${title2}<div class="wrap-default">${this.defaultMarkup}</div>${this.groupFooterMarkupOne}${this.groupFooterMarkupTwo}</section>`;
      }
    }
    html = `${html}`;
    return {
      html,
      jsExternal: this.jsExternal
    };
  }
  handlePromoteFirstTeaser(teaserList) {
    const ghostTeasers = teaserList.filter(
      (teaser) => teaser.type === "ghost-teaser"
    );
    const firstGhostTeaser = ghostTeasers.shift();
    if (firstGhostTeaser) {
      this.promoteFirstMarkup = `<div class="promote-first">${firstGhostTeaser.html}</div>`;
      const indexOf = teaserList.findIndex(
        (teaser) => (teaser == null ? void 0 : teaser.teaserId) === (firstGhostTeaser == null ? void 0 : firstGhostTeaser.teaserId)
      );
      teaserList.splice(indexOf, 1);
    }
  }
  handleGroupFooterOneItem(teaserList) {
    const lastItem = teaserList[teaserList.length - 1];
    this.groupFooterMarkupOne = lastItem.html;
    teaserList.pop();
  }
  handleGroupFooterTwoItems(teaserList) {
    const lastTwoItems = teaserList.slice(-2);
    this.groupFooterMarkupTwo = lastTwoItems[0].html += lastTwoItems[1].html;
    teaserList.splice(-2);
  }
  add(teaserList, onlyFillContainer) {
    let done = false;
    if (this.meta.groupType === "list-horizontal" && this.meta.promoteFirst) {
      this.handlePromoteFirstTeaser(teaserList);
    }
    if (this.meta.groupFooter === "lastItem") {
      this.handleGroupFooterOneItem(teaserList);
    } else if (this.meta.groupFooter === "lastTwoItems") {
      this.handleGroupFooterTwoItems(teaserList);
    }
    return teaserList.filter((teaserData) => {
      if (done) {
        return true;
      }
      if (!teaserData) {
        return false;
      }
      const teaser = new Teaser(teaserData);
      let breakpoints2 = this.breakpoints.slice();
      if (onlyFillContainer) {
        breakpoints2 = breakpoints2.sort((a, b) => {
          if (a.width === onlyFillContainer) {
            return -1;
          }
          if (b.width === onlyFillContainer) {
            return 1;
          }
          return 0;
        });
      }
      breakpoints2.forEach((breakpoint) => {
        if (!done) {
          const isAdded = breakpoint.container.add(teaser, this.type);
          if (!isAdded && breakpoint.width === onlyFillContainer) {
            done = true;
          } else if (!isAdded) {
            this.containerIndex[breakpoint.width] = breakpoint.container.index;
            if (breakpoint.styles.alterDirection && breakpoint.container.content.length > 1) {
              breakpoint.styles.ltr = !breakpoint.styles.ltr;
            }
            createContainer2(breakpoint, breakpoint.styles.ltr);
            breakpoint.container.add(teaser, this.type);
          }
        }
      });
      if (!done) {
        let attr = "";
        if (teaser.breakpoints && teaser.breakpoints[currentLayout2] && teaser.breakpoints[currentLayout2].active) {
          attr += `linecount="${teaser.breakpoints[currentLayout2].active.lineCount}" `;
          attr += `version="${teaser.breakpoints[currentLayout2].active.version}" `;
          attr += `width="${teaser.breakpoints[currentLayout2].active.width}" `;
          attr += `index="${optimusElementIndex2}"`;
        }
        optimusElementIndex2 += 1;
        const isSoloHorizonal = teaserList.length === 1 && this.meta.groupType === "list-horizontal";
        const isMultipleHorizontal = teaserList.length > 1 && this.meta.groupType === "list-horizontal";
        if (isSoloHorizonal) {
          if (teaser.type === "ghost-teaser") {
            this.carouselMarkup += teaserData.html;
            this.carouselChildrenCount += 1;
          }
        }
        if (isMultipleHorizontal) {
          if (teaser.type === "ghost-teaser") {
            this.carouselMarkup += `<div class="carouselcontent ${this.carouselChildrenCount}">${teaserData.html}</div>`;
            this.carouselChildrenCount += 1;
          }
        }
        if (this.meta.groupType === "default") {
          this.defaultMarkup += `<div class="group-default-element" id="art-${teaserData.id}" ${attr}>${teaserData.html}</div>`;
        }
      }
      return done;
    });
  }
};
var group_page_layout_default = GroupPageLayout;

// assets/js/stitcher.js
function stitcher_default(teasers) {
  teasers.forEach((item, i) => {
    item.meta = item.meta || {};
    if (Array.isArray(item)) {
      const meta = item.find((m) => m.type === "meta");
      if (meta) {
        Object.assign(item.meta, meta);
        item.splice(item.indexOf(meta), 1);
      }
      item.meta.type = item.meta.source === "dredition" ? "complex" : "group";
      if (item.meta.source === "tv2") {
        item.meta.type = "complex";
        item.meta.source = "dredition";
      }
    }
    item.meta.index = item.meta.index || i;
  });
  const fullList = teasers.sort((a, b) => a.meta.index - b.meta.index).reduce((result, item, i) => {
    if (Array.isArray(item)) {
      result.push(item);
      result.push([]);
      return result;
    }
    if (i === 0) {
      result.push([]);
    }
    const previousGroup = result[result.length - 1];
    previousGroup.push(item);
    return result;
  }, []);
  return function() {
    return fullList.shift() || false;
  };
}

// assets/js/getUserRecommendations.js
function getQueryParam(name) {
  const query = new URLSearchParams(location.search);
  return query.get(name) || "";
}
function getNonSubscriberHash(nliHash, user) {
  if (!nliHash || nliHash === "not-in-use" || user.extraData.customer_keys || user.extraData.plussalt_subscription || user.extraData.amedia_staff) {
    return "";
  }
  if (location.hostname.includes("www.ao.no") && user.extraData.user_grouping_number <= 39) {
    return nliHash;
  }
  return "";
}
function getRecommendations(user, nliHash) {
  return {
    user_key: user.trackingKey,
    user_grouping_number: user.extraData.user_grouping_number,
    amedia_staff: user.extraData.amedia_staff,
    recommendation_hash: getNonSubscriberHash(nliHash, user) || "",
    uuid: user.uuid,
    plussalt_subscription: user.extraData.plussalt_subscription || getQueryParam("plussalt_subscription") === "true"
  };
}
function getRecommendationsBrowserId(id, nliHash) {
  if (nliHash === "not-in-use") {
    return {};
  }
  return {
    user_key: id,
    recommendation_hash: nliHash
  };
}

// assets/js/mixins.js
function isNettavisen() {
  return document.domain.indexOf("nettavisen.no") !== -1;
}
function allPositions(item) {
  return item && item.insertPositions;
}
function getTeaserIdMap(teasers) {
  const keyValuePairs = teasers.filter((teaser) => teaser.id && teaser.type === "teaser").map((teaser) => [teaser.id, true]);
  return new Map(keyValuePairs);
}
function mixinFrontPageElements(frontPageElements, delta, primary = []) {
  frontPageElements.filter((item) => item.error === void 0).map((item) => {
    if (Array.isArray(item)) {
      const itemPos = item.find(allPositions);
      return itemPos.insertPositions.map((pos) => {
        const componentElement = item.slice(0);
        componentElement.pos = pos + delta;
        return componentElement;
      });
    }
    return item.insertPositions.map((pos) => {
      const componentElement = { ...item };
      componentElement.pos = pos + delta;
      return componentElement;
    });
  }).reduce((a, b) => a.concat(b), []).sort((a, b) => a.pos - b.pos).forEach((el, i) => {
    const pos = el.pos + i;
    if (Array.isArray(el)) {
      const lastMobileAd = el.find((m) => m.positionName === "midtbannersmb");
      const addAd = !lastMobileAd || isNettavisen();
      if (pos + 4 < primary.length && addAd) {
        return primary.splice(pos, 0, el);
      }
      if (lastMobileAd) {
        return primary.push(el);
      }
    } else {
      const lastDesktopAd = el.positionName === "netboardsmb";
      if (pos + 4 < primary.length) {
        return primary.splice(pos, 0, el);
      }
      if (lastDesktopAd) {
        return primary.push(el);
      }
    }
    return primary;
  });
  return primary;
}

// assets/js/restore-scroll-position.js
function scrollElementIntoView(el, offset) {
  el.scrollIntoView({ block: "center" });
  const delta = el.getBoundingClientRect().top - offset;
  window.scrollBy(0, delta);
}
function reScrollElementIntoView(el, elementPreviousTop, offset) {
  const newTop = el.getBoundingClientRect().top;
  if (newTop > elementPreviousTop + 100 || newTop < elementPreviousTop - 100) {
    scrollElementIntoView(el, offset);
  }
}
function restoreScrollPosition() {
  if (!history.replaceState) {
    return;
  }
  const state = history.state;
  if (state && state.id) {
    const el = document.getElementById(state.id);
    if (!el) {
      return;
    }
    const realestateCarousel = document.getElementsByTagName(
      "tivoli-realestatecarousel"
    )[0];
    const latestlist = document.getElementsByTagName("amedia-latestlist")[0];
    const amediaIncludes = document.getElementsByTagName("amedia-include");
    if (amediaIncludes && state.amediaIncludeHeights) {
      [...amediaIncludes].forEach((ai) => {
        state.amediaIncludeHeights.every((aiHeight) => {
          if (ai.getAttribute("src") === aiHeight.src) {
            ai.style.minHeight = `${aiHeight.height}px`;
            return false;
          }
          return true;
        });
      });
    }
    if (realestateCarousel) {
      if (state.tivoliRSHeight && state.tivoliRSHeight > 225) {
        realestateCarousel.style.height = `${state.tivoliRSHeight}px`;
      }
    }
    if (latestlist) {
      if (state.latestListHeight && state.latestListHeight > 13) {
        latestlist.style.height = `${state.latestListHeight}vw`;
      }
    }
    const offset = state.offset;
    setTimeout(() => {
      scrollElementIntoView(el, offset);
      const elementTop = el.getBoundingClientRect().top;
      let hasScrolled = false;
      setTimeout(() => {
        window.addEventListener(
          "scroll",
          () => {
            hasScrolled = true;
          },
          { once: true }
        );
        setTimeout(() => {
          if (!hasScrolled) {
            reScrollElementIntoView(el, elementTop, offset);
          }
        }, 1500);
      }, 1e3);
    }, 600);
  }
}

// assets/js/experiment-personalised.js
var PersonalisedDataExperiment = class {
  constructor(data) {
    var _a2;
    if (!data) {
      data = [];
    }
    this.teaserData = this.filterMetaTeasers(data);
    this.personalizedTeasers = this.getPersonalizedTeasers(data);
    this.topListTeasers = (_a2 = this.personalizedTeasers) == null ? void 0 : _a2.filter(
      (el) => el.source === "toplist"
    );
    this.tracerRequestId = this.getTracerRequestId(data);
    this.setTeaserTracerMarkup();
  }
  filterMetaTeasers(data) {
    return data.filter(
      (el) => el && !el.personalised_content && !el.tracer_request_id
    );
  }
  getPersonalizedTeasers(data) {
    return data.filter(
      (el) => el && el.personalised_content && el.personalised_content.length > 0
    ).map((el) => el.personalised_content)[0] || [];
  }
  getTracerRequestId(data) {
    let tracerRequestId = "";
    data.forEach((el) => {
      if (el == null ? void 0 : el.tracer_request_id) {
        tracerRequestId = el.tracer_request_id;
      }
    });
    return tracerRequestId;
  }
  getPageTracerMarkup() {
    const itemscope = document.createElement("div");
    itemscope.setAttribute("id", "ordinoTracer");
    if (this.tracerRequestId || this.topListTeasers) {
      itemscope.setAttribute("itemscope", "");
      itemscope.setAttribute(
        "itemtype",
        "https://www.adplogger.no/json-schema/CustomElement"
      );
      const itemPropTracer = document.createElement("meta");
      itemPropTracer.setAttribute("itemprop", "custom-element#data");
      const tracerObject = {};
      Object.assign(
        tracerObject,
        this.tracerRequestId ? { tracer_request_id: this.tracerRequestId } : {}
      );
      Object.assign(
        tracerObject,
        this.topListTeasers ? { personalized_toplist: this.topListTeasers } : {}
      );
      itemPropTracer.setAttribute("content", `${JSON.stringify(tracerObject)}`);
      const itemPropName = document.createElement("meta");
      itemPropName.setAttribute("itemprop", "custom-element#name");
      itemPropName.setAttribute("content", "ordino_front_feed");
      itemscope.appendChild(itemPropTracer);
      itemscope.appendChild(itemPropName);
    }
    return itemscope;
  }
  addItemPropToHTML(html, itemProp, content) {
    return html.replace(
      "<meta",
      `<meta itemprop="${itemProp}" content="${content}" /><meta`
    );
  }
  setTeaserTracerMarkup() {
    var _a2;
    (_a2 = this.topListTeasers) == null ? void 0 : _a2.forEach((el) => {
      if (this.teaserData[el.position.to].html) {
        this.teaserData[el.position.to].html = this.addItemPropToHTML(
          this.teaserData[el.position.to].html,
          "productFeature",
          "personalized_toplist"
        );
      }
    });
  }
};

// assets/js/backend.js
function rewriteNarrowWide(src) {
  const viewWidth = Math.min(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (viewWidth < 768) {
    return src.replace("/wide", "/narrow");
  }
  return src;
}
function shouldPersonalize() {
  const query = new URLSearchParams(window.location.search);
  const hasPersonalizedParam = query.has("personalized");
  if (!hasPersonalizedParam) {
    return true;
  }
  return query.get("personalized") === "true";
}
async function fetchData(src, token2, recommendations = {}) {
  let srcUrl = src;
  let fetchOptions = {};
  let queryParams = {
    token: token2,
    ts: Date.now()
  };
  if (src.includes("/ordino")) {
    srcUrl = rewriteNarrowWide(src);
    if (recommendations.uuid) {
      fetchOptions = {
        headers: {
          "user-uuid": recommendations.uuid
        }
      };
    }
    const personalized = shouldPersonalize();
    queryParams = {
      ...queryParams,
      ...recommendations.plussalt_subscription && {
        plussalt_subscription: true
      },
      ...recommendations.user_key && {
        user_key: recommendations.user_key
      },
      ...recommendations.recommendation_hash && {
        recommendation_hash: recommendations.recommendation_hash
      },
      ...recommendations && recommendations.user_grouping_number && {
        user_group: recommendations.user_grouping_number
      },
      ...recommendations && recommendations.amedia_staff && {
        amedia_staff: recommendations.amedia_staff
      },
      ...!personalized ? { personalized: false } : {}
    };
  }
  if (srcUrl && srcUrl.startsWith("/")) {
    srcUrl = `https://${document.domain}${srcUrl}`;
  }
  const url = new URL(srcUrl);
  Object.keys(queryParams).forEach(
    (name) => url.searchParams.append(name, queryParams[name])
  );
  return fetch(url.toString(), fetchOptions).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${src}. Status code ${res.statusCode}. Status text ${res.statusText}`
      );
    }
    return res.json();
  }).then((data) => {
    data.queryParams = queryParams;
    return data;
  });
}

// assets/js/test-for-localstorage.js
function localStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && // everything except Firefox
    (e.code === 22 || // Firefox
    e.code === 1014 || // test name field too, because code might not be present
    // everything except Firefox
    e.name === "QuotaExceededError" || // Firefox
    e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
    storage && storage.length !== 0;
  }
}

// assets/js/ab-token.js
var tok = 1e4;
if (localStorageAvailable()) {
  tok = window.localStorage.getItem("ab_token");
  if (!tok) {
    tok = Math.floor(Math.random() * 899999) + 1e5;
    window.localStorage.setItem("ab_token", tok);
  }
}
var token = tok;

// assets/js/article-bottom.js
function isArticle() {
  var _a2;
  const pagemodel = ((_a2 = document.documentElement) == null ? void 0 : _a2.getAttribute("data-pagemodel")) || "";
  return ["story", "feature", "opinion"].includes(pagemodel);
}
function isInternalTraffic(wwwDomain) {
  return document.referrer.includes(wwwDomain);
}
function getPageData() {
  var _a2;
  return JSON.parse(((_a2 = document.querySelector("page-data")) == null ? void 0 : _a2.textContent) || "{}");
}
function removeCurrentArticle(teasers, index) {
  teasers.splice(index, 1);
  return teasers;
}
function injectDescription(index, length) {
  const descriptionText = `Saken du har lest er nummer ${index + 1} av ${length} p\xE5 forsiden. Fortsett \xE5 lese fra sak ${index + 2}:`;
  const descriptionElement = document.createElement("p");
  descriptionElement.appendChild(document.createTextNode(descriptionText));
  descriptionElement.style.fontFamily = "Open Sans";
  descriptionElement.style.fontStyle = "italic";
  descriptionElement.style.fontSize = "larger";
  descriptionElement.style.color = "#000";
  const frontpageElement = document.getElementsByTagName("amedia-frontpage")[0];
  frontpageElement.insertBefore(
    descriptionElement,
    frontpageElement.firstChild
  );
}
function removePrecedingTeasers(teasers, index, userData) {
  const minTeasersLength = 5;
  if (index < teasers.length - minTeasersLength) {
    if (userData.extraData.user_grouping_number <= 15 || userData.extraData.amedia_staff) {
      injectDescription(index, teasers.length);
    }
    return teasers.splice(index);
  }
  return teasers;
}
function applyArticleTreatment(teasers, userData) {
  const pageData = getPageData();
  if (!pageData.env || !userData || userData.extraData.user_grouping_number >= 32) {
    return teasers;
  }
  const acpId = pageData.data.fields.id;
  let flatTeasers = teasers.flat();
  const currentArticleIndex = flatTeasers.findIndex(
    (item) => {
      var _a2;
      return item.id === acpId || ((_a2 = item.adp) == null ? void 0 : _a2.teaserId) === acpId;
    }
  );
  if (currentArticleIndex < 0) {
    return teasers;
  }
  flatTeasers = removeCurrentArticle(flatTeasers, currentArticleIndex);
  if (isInternalTraffic(pageData.env.publication.wwwDomain)) {
    flatTeasers = removePrecedingTeasers(
      flatTeasers,
      currentArticleIndex,
      userData
    );
  }
  return flatTeasers;
}

// node_modules/@amedia/uuid/index.js
var rng;
var win = typeof self !== "undefined" ? self : typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : global;
var getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof win.msCrypto !== "undefined" && typeof win.msCrypto.getRandomValues === "function" && win.msCrypto.getRandomValues.bind(win.msCrypto);
if (getRandomValues) {
  const rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  const rnds = new Array(16);
  rng = function mathRNG() {
    for (let i = 0, r; i < 16; i += 1) {
      if ((i & 3) === 0) {
        r = Math.random() * 4294967296;
      }
      rnds[i] = r >>> ((i & 3) << 3) & 255;
    }
    return rnds;
  };
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 256).toString(16).substr(1);
}
function bytesToUuid(buf, offset) {
  let i = offset || 0;
  const bth = byteToHex;
  return [
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]]
  ].join("");
}
function uuid() {
  const rnds = rng();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return bytesToUuid(rnds);
}

// assets/js/versions.js
var layoutsDefault = () => ({
  500: { teaserSizes: [500, 276, 212] },
  980: { teaserSizes: [980, 780, 680, 580, 480, 380, 280] }
});
var getVersions = (layoutProps) => {
  let layoutVersion;
  const layoutWidths = Object.keys(layoutProps.dimensions || {}).map((key) => parseInt(key, 10)).sort((a, b) => a - b);
  if (layoutWidths.length > 0) {
    const layout = layoutsDefault();
    layoutVersion = Object.keys(layout).reduce((result, breakpoint) => {
      result[breakpoint] = layout[breakpoint].teaserSizes.filter((size) => {
        if (!layoutProps.width) {
          return true;
        }
        return !(layoutProps.width.min > size || layoutProps.width.max < size);
      }).map((size) => {
        const dimensionKey = layoutWidths.filter((w) => w <= size).pop();
        const dimensions = layoutProps.dimensions[dimensionKey] || layoutProps.dimensions[0];
        if (!dimensions) {
          return null;
        }
        return {
          width: size,
          versions: {
            default: [
              {
                styles: [],
                height: dimensions.ratio ? dimensions.ratio / 100 * size : dimensions.height
              }
            ]
          }
        };
      }).filter((item) => !!item);
      return result;
    }, {});
  }
  return layoutVersion;
};

// assets/js/smart-embed.js
var getMnemonicHost = () => {
  const { host } = window.location;
  if (host.includes("snap0.api.no")) {
    return "services-snap0.api.no";
  } else if (host.includes("snap1.api.no")) {
    return "services-snap1.api.no";
  } else if (host.includes("snap2.api.no")) {
    return "services-snap2.api.no";
  } else if (host.includes("snap3.api.no")) {
    return "services-snap3.api.no";
  } else if (host.includes("snap4.api.no")) {
    return "services-snap4.api.no";
  } else if (host.includes("snap5.api.no")) {
    return "services-snap5.api.no";
  } else if (host.includes("snap6.api.no")) {
    return "services-snap6.api.no";
  }
  return "services.api.no";
};
if (!Object.fromEntries) {
  Object.fromEntries = function(entries) {
    if (!entries || !entries[Symbol.iterator]) {
      throw new Error(
        "Object.fromEntries() requires a single iterable argument"
      );
    }
    let obj = {};
    for (let [key, value] of entries) {
      obj[key] = value;
    }
    return obj;
  };
}
var getAbTestUrl = (abTestStr, userData) => {
  var _a2;
  const parts = abTestStr.split("|");
  if (parts.length != 4) {
    return abTestStr;
  }
  const bRangeStart = parts[2].split("-")[0];
  const bRangeEnd = parts[2].split("-")[1];
  const userGroup = (_a2 = userData == null ? void 0 : userData.extraData) == null ? void 0 : _a2.user_grouping_number;
  if (userGroup && userGroup >= bRangeStart && userGroup <= bRangeEnd) {
    return parts[1];
  }
  return parts[0];
};
var renderHTML = (url, publication, userData) => {
  if (url.endsWith("|abtest")) {
    url = getAbTestUrl(url, userData);
  }
  const params = Object.fromEntries(new URLSearchParams(new URL(url).search));
  params.publication = publication;
  const manifestUrl = `https://${getMnemonicHost()}/api/mnemonic/v1/manifest/${encodeURIComponent(
    url
  )}`;
  const attr = Object.keys(params).map((key) => `param-${key}="${params[key]}"`).join(" ");
  return `<amedia-include ${attr} lazy="true" manifest="${manifestUrl}"></amedia-include>`;
};
var renderSmartEmbed = (teaser, userData) => {
  if (teaser.type !== "smart-embed" || !teaser.id.startsWith("http")) {
    return teaser;
  }
  const renderedTeaser = {
    id: uuid(),
    type: "smartembed",
    premium: false,
    html: renderHTML(teaser.id, teaser.publication, userData),
    js: []
  };
  const layout = getVersions(teaser.layout);
  if (layout) {
    renderedTeaser.layout = layout;
  } else {
    renderedTeaser.unknownHeight = true;
  }
  return renderedTeaser;
};
var smart_embed_default = renderSmartEmbed;

// assets/js/ghost-teaser.js
var staticLayout = {
  dimensions: {
    280: {
      ratio: 120
    },
    380: {
      ratio: 110
    },
    480: {
      ratio: 100
    },
    500: {
      ratio: 80
    }
  },
  width: {
    min: 280,
    max: 500
  }
};
function renderGhostTeaser(teaser, theme, publication, showPlayerToUser) {
  var _a2;
  let matchingPreference = "";
  let isSportsTeaser = false;
  if (teaser.id.startsWith("19")) {
    isSportsTeaser = true;
    matchingPreference = `${teaser.sourceParticipant}`;
  }
  const teaserId = teaser.id;
  let frontPageId = teaser.frontpage_id;
  if (!frontPageId) {
    frontPageId = teaser.frontpageID;
  }
  const checksum = teaser.checksum;
  let purpose = (_a2 = teaser.auxData) == null ? void 0 : _a2.domain;
  if (!purpose) {
    purpose = teaser.domain;
  }
  const teaserData = `<amedia-laserbeak sports="${isSportsTeaser}" frontpage-id="${frontPageId}" teaser-id="${teaserId}" checksum="${checksum}" purpose="${purpose}" theme="${theme}" publication="${publication}" preference="${matchingPreference}" has-access="${showPlayerToUser}"></amedia-laserbeak>`;
  const renderedTeaser = {
    id: uuid(),
    teaserId: teaser.id,
    type: "ghost-teaser",
    premium: teaser.premium,
    html: teaserData,
    js: []
  };
  const layout = getVersions(staticLayout);
  if (layout) {
    renderedTeaser.layout = layout;
  } else {
    renderedTeaser.unknownHeight = true;
  }
  return renderedTeaser;
}

// node_modules/@amedia/frontend-rpc/lib/cast-as-promise.js
function castAsPromise(method, args) {
  let result;
  try {
    result = method(...args);
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
}

// node_modules/@amedia/frontend-rpc/lib/server.js
function sendResult(eventName, eventId, data) {
  if (self.amediaNativeBridge) {
    const json = JSON.stringify({ eventId, ...data });
    self.amediaNativeBridge.receiveResultFromWeb(json);
  }
  self.dispatchEvent(new CustomEvent(eventName, { detail: { ...data } }));
}
var RPCserver = class {
  constructor({ version, component, listeners = {} }) {
    this.version = version;
    this.component = component;
    Object.keys(listeners).forEach(
      (name) => this.addListener(name, listeners[name])
    );
    self.addEventListener(
      `amedia-rpc-event:${component}:ready`,
      () => this.handshake()
    );
    setTimeout(() => this.handshake(), 0);
  }
  handshake() {
    const detail = { version: this.version };
    self.dispatchEvent(
      new CustomEvent(`amedia-rpc-event:${this.component}:live`, { detail })
    );
    if (self.amediaNativeBridge) {
      self.amediaNativeBridge.handshake(this.component, this.version);
    }
  }
  addListener(name, method) {
    self.addEventListener(
      `amedia-rpc-event:${this.component}:${name}`,
      (evt) => {
        evt.stopImmediatePropagation();
        const { eventId = "", args = [] } = evt.detail || {};
        const eventResult = `amedia-rpc-event:${this.component}:${name}:${eventId}`;
        castAsPromise(method, args).then((result) => sendResult(eventResult, eventId, { result })).catch((err) => {
          const error = err instanceof Error ? err.message : err;
          return sendResult(eventResult, eventId, { error });
        });
      }
    );
  }
};

// node_modules/@amedia/frontend-rpc/lib/client.js
function createPromise() {
  let resolve;
  let reject;
  let isFullfilled = false;
  const promise = new Promise((_resolve, _reject) => {
    resolve = (data) => {
      if (!isFullfilled) {
        _resolve(data);
      }
      isFullfilled = true;
    };
    reject = (err) => {
      if (!isFullfilled) {
        _reject(err);
      }
      isFullfilled = true;
    };
  });
  return { promise, resolve, reject };
}
function createMethod(component, method) {
  return (...args) => {
    const { resolve, reject, promise } = createPromise();
    const eventId = uuid();
    const detail = { eventId, args };
    const evt = new CustomEvent(`amedia-rpc-event:${component}:${method}`, {
      detail
    });
    self.dispatchEvent(evt);
    if (self.amediaNativeBridge) {
      const jsonArgs = JSON.stringify(args);
      self.amediaNativeBridge.callNativeMethod(
        component,
        method,
        jsonArgs,
        eventId
      );
    }
    self.addEventListener(
      `amedia-rpc-event:${component}:${method}:${eventId}`,
      (e) => {
        if (!e.detail) {
          resolve();
        }
        const { error, result } = e.detail;
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
    return promise;
  };
}
var RPCclient = class {
  constructor({ version, component, methods = [] }) {
    this.component = component;
    this.version = version;
    this.queue = [];
    methods.forEach((method) => this.addMethod(method));
    this.boundLiveHandler = this.liveHandler.bind(this);
    self.addEventListener(
      `amedia-rpc-event:${component}:live`,
      this.boundLiveHandler
    );
    setTimeout(
      () => self.dispatchEvent(
        new CustomEvent(`amedia-rpc-event:${component}:ready`)
      ),
      0
    );
  }
  liveHandler(evt) {
    const [receivedMajor, receivedMinor] = evt.detail.version.split(".").map((v) => parseInt(v, 10));
    const [major, minor] = this.version.split(".").map((v) => parseInt(v, 10));
    if (receivedMajor !== major) {
      throw new Error(
        `${this.component} version mismatch. Server version: ${receivedMajor}. Client version: ${major}`
      );
    }
    if (receivedMinor < minor) {
      console.warn(
        `${this.component} server version is on an earlier minor version (${receivedMinor}) than the client (${minor})`
      );
    }
    const queue = this.queue.slice(0);
    delete this.queue;
    queue.forEach((func) => func());
    self.removeEventListener(
      `amedia-rpc-event:${this.component}:live`,
      this.boundLiveHandler
    );
  }
  addMethod(name) {
    if (this[name]) {
      throw new Error(`${name} already exists on the RPC interface.`);
    }
    this[name] = (...args) => {
      if (this.queue) {
        let resolve;
        let reject;
        const promise = new Promise((resolveInner, rejectInner) => {
          resolve = resolveInner;
          reject = rejectInner;
        });
        this.queue.push(
          () => this[name](...args).then(resolve).catch(reject)
        );
        return promise;
      }
      this[name] = createMethod(this.component, name);
      return this[name](...args);
    };
  }
};

// assets/js/optimus-element.js
var _a;
var title = (_a = document.querySelector("title")) == null ? void 0 : _a.textContent;
function browserHasBFCache() {
  const iOSVersionArray = navigator.appVersion.match(/OS (\d+)_(\d+)/);
  return !!iOSVersionArray && (parseInt(iOSVersionArray[1], 10) === 13 && parseInt(iOSVersionArray[2], 10) >= 4 || parseInt(iOSVersionArray[1], 10) > 13);
}
function isDesktopSafari() {
  const uA = navigator.userAgent;
  const vendor = navigator.vendor;
  return /Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA);
}
var navigationPrevented = false;
var rpcserver = new RPCserver({
  version: "1.0.0",
  component: "optimus"
});
rpcserver.addListener("preventNavigation", () => {
  navigationPrevented = true;
});
var rpcclient = new RPCclient({
  version: "1.0.0",
  component: "optimus"
});
rpcclient.addMethod("navigate");
function sendNavigation(url, evt) {
  if (!url || !navigationPrevented) {
    return;
  }
  evt.preventDefault();
  rpcclient.navigate({
    url: new URL(url, document.baseURI).toString()
  });
}
var OptimusElement = class extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", (evt) => {
      const teaserLinkElement = this.querySelector(".teaser_link");
      if (teaserLinkElement) {
        sendNavigation(teaserLinkElement.getAttribute("href"), evt);
      }
      if (browserHasBFCache() || isDesktopSafari()) {
        return;
      }
      if (this.id) {
        let tivoliRSHeight = 225;
        let latestListHeight = 13;
        const amediaIncludeHeights = [];
        if (document.getElementsByTagName("tivoli-realestatecarousel").length > 0) {
          tivoliRSHeight = document.getElementsByTagName("tivoli-realestatecarousel")[0].getBoundingClientRect().height;
        }
        if (document.getElementsByTagName("amedia-latestlist").length > 0) {
          latestListHeight = document.getElementsByTagName("amedia-latestlist")[0].getBoundingClientRect().height;
        }
        const amediaIncludes = document.getElementsByTagName("amedia-include");
        if (amediaIncludes.length > 0) {
          [...amediaIncludes].forEach(
            (ai) => amediaIncludeHeights.push({
              height: ai.getBoundingClientRect().height,
              src: ai.getAttribute("src")
            })
          );
        }
        history.scrollRestoration = "manual";
        history.replaceState(
          {
            id: this.id,
            offset: this.getBoundingClientRect().top,
            tivoliRSHeight,
            latestListHeight,
            amediaIncludeHeights
          },
          title
        );
      } else {
        history.scrollRestoration = "auto";
      }
    });
  }
};
if (!customElements.get("optimus-element")) {
  customElements.define("optimus-element", OptimusElement);
}

// assets/js/frontpage.js
var currentLayout3 = getLayout();
var breakpoints = getLayoutKeys().sort().map((key) => layouts[key]);
var Frontpage = class extends HTMLElement {
  connectedCallback() {
    this.pages = [];
    this.publication = this.getAttribute("publication");
    this.theme = this.getAttribute("theme");
    this.brickTeaserVersions = /* @__PURE__ */ new Map();
    this.init();
  }
  getFrontpageObjects() {
    try {
      return JSON.parse(window.atob(this.getAttribute("common-elements")));
    } catch (e) {
      return [];
    }
  }
  setId() {
    const id = this.getAttribute("id");
    if (!id) {
      this.setAttribute(
        "id",
        `front-${this.getElementsByTagName("amedia-frontpage").length}`
      );
    }
  }
  get src() {
    const src = this.getAttribute("src");
    if (window.location.protocol === "https:") {
      return src.replace("http:", "https:");
    }
    return src;
  }
  setBrickTeaserVersions(teaser) {
    if (teaser.css) {
      const brickTeaserVersion = teaser.css.brickTeaserVersion;
      if (brickTeaserVersion) {
        this.brickTeaserVersions.set(`${brickTeaserVersion}`, {
          brickTeaserVersion
        });
      }
    }
  }
  async init() {
    try {
      this.setId();
      const nliHash = this.hasAttribute("inject-nli") ? this.getAttribute("inject-nli") : "not-in-use";
      const [browserid] = await Promise.all([
        getBrowserId().catch(() => void 0)
      ]);
      await new UserDataRequest().withAttributes([
        "name",
        "privacyPreferences",
        "extraData",
        "trackingKey",
        "uuid"
      ]).fetch({ timeout: 1e3 }).then(({ attributes, state }) => {
        this.userAttributes = attributes;
        this.userState = state;
      }).catch(() => {
        this.userState = { isLoggedIn: false };
      });
      const authenticated = this.userState.isLoggedIn;
      const recommendations = authenticated ? getRecommendations(this.userAttributes, nliHash) : getRecommendationsBrowserId(browserid, nliHash);
      const primary = await fetchData(this.src, token, recommendations);
      const pde = new PersonalisedDataExperiment(primary);
      this.appendChild(pde.getPageTracerMarkup());
      const filtered = pde.teaserData;
      const teaserIdMap = getTeaserIdMap(filtered);
      const { queryParams } = primary;
      let isAmediaStaff;
      let hasVideoAccess;
      if (this.userState.isLoggedIn) {
        isAmediaStaff = this.userAttributes.extraData.amedia_staff;
        hasVideoAccess = this.userAttributes.extraData.customer_keys || this.userAttributes.extraData.plussalt_subscription;
      }
      let teaserItems = await Promise.all(
        filtered.map(async (teaser) => {
          teaser = smart_embed_default(teaser, this.userAttributes);
          if (teaser.type === "ghost-teaser") {
            teaser = renderGhostTeaser(teaser, this.theme, this.publication);
          }
          if (teaser.unknownHeight) {
            const group = [{ type: "meta", unknownHeight: true }, teaser];
            group.unknownHeight = true;
            return group;
          }
          const showPlayerToUser = hasVideoAccess || isAmediaStaff || !teaser.premium;
          if (Array.isArray(teaser)) {
            teaser = teaser.filter(
              (element) => element && !teaserIdMap.get(element.id)
            );
            teaser = teaser.map(smart_embed_default);
            return Promise.all(
              teaser.map(async (element) => {
                if ((element == null ? void 0 : element.type) === "ghost-teaser") {
                  element = renderGhostTeaser(
                    element,
                    this.theme,
                    this.publication,
                    showPlayerToUser
                  );
                  return element;
                }
                if (element.videoTeaserMarkup && element.playOnFront && showPlayerToUser) {
                  element.html = element.videoTeaserMarkup.html;
                }
                this.setBrickTeaserVersions(element);
                return element;
              })
            );
          }
          if (teaser.videoTeaserMarkup && teaser.playOnFront && showPlayerToUser) {
            teaser.html = teaser.videoTeaserMarkup.html;
          }
          this.setBrickTeaserVersions(teaser);
          return teaser;
        })
      );
      teaserItems.filter((item) => !item.error);
      if (isArticle() && this.userState.isLoggedIn) {
        teaserItems = applyArticleTreatment(teaserItems, this.userAttributes);
      }
      const posDelta = layouts[currentLayout3].indexDelta(teaserItems);
      const frontPageElements = this.getFrontpageObjects();
      teaserItems = mixinFrontPageElements(
        frontPageElements,
        posDelta,
        teaserItems
      );
      teaserItems.every((teaser) => {
        if (teaser.type === "teaser") {
          teaser.firstTeaser = true;
          return !teaser.hasImage;
        }
        return true;
      });
      const batchOfElements = stitcher_default(teaserItems);
      let list;
      while (list = batchOfElements()) {
        this.addContent(list);
      }
      this.renderPages();
      const spinner = this.querySelector("amedia-spinner");
      spinner == null ? void 0 : spinner.parentNode.removeChild(spinner);
      this.querySelector("#ordinoTracer").appendChild(this.content);
      if (!isArticle()) {
        restoreScrollPosition();
      }
      window.dispatchEvent(
        new CustomEvent("frontpage-rendered", { detail: { queryParams } })
      );
    } catch (error) {
      this.remove();
      error.message = `Optimus fallback: ${error.message || ""}`;
      console.error(error);
    }
  }
  addBrickStyling() {
    let styleLinkHtml = "";
    this.brickTeaserVersions.forEach((value) => {
      const { brickTeaserVersion } = value;
      styleLinkHtml += `<link media="all" rel="stylesheet" type="text/css" href="https://assets.acdn.no/pkg/@amedia/brick-teaser/${brickTeaserVersion}/css/brick-teaser.css">`;
    });
    return styleLinkHtml;
  }
  renderPages() {
    let html = "";
    html += this.addBrickStyling();
    this.pages.forEach((page) => {
      if (!page) {
        return;
      }
      const pageInfo = page.close();
      html += pageInfo.html;
      if (pageInfo.jsExternal) {
        pageInfo.jsExternal.forEach((asset) => {
          html += `<script type="module" src="${asset}"><\/script>`;
        });
      }
    });
    const range = document.createRange();
    range.selectNode(this);
    this.content = range.createContextualFragment(html);
  }
  addContent(list) {
    var _a2, _b;
    let [page] = this.pages.slice(-1);
    const id = `front${this.pages.length}`;
    this.contentIndex = this.contentIndex || 0;
    const { meta } = list;
    const containerIndex = page ? page.containerIndex : getLayoutKeys().reduce(
      (result, width) => ({ ...result, [width]: 0 }),
      {}
    );
    const options = {
      ...meta,
      index: meta && meta.type === "complex" ? 0 : this.contentIndex,
      containerIndex,
      group: meta ? meta.type === "group" || meta.type === "complex" : false
    };
    this.contentIndex += list.length;
    if (!options.group) {
      const lastAvailablePage = this.pages.slice().reverse().find((p) => !p.group);
      if (lastAvailablePage) {
        list = lastAvailablePage.add(list, currentLayout3);
      }
    } else if (list[0]) {
      list[0].firstTeaser = true;
    }
    if (list.length !== 0) {
      if (((_a2 = list.meta) == null ? void 0 : _a2.groupType) === "list-horizontal" || ((_b = list.meta) == null ? void 0 : _b.groupType) === "default") {
        page = new group_page_layout_default({
          id,
          breakpoints,
          options,
          theme: this.theme,
          meta: list.meta
        });
        page.add(list);
      } else {
        page = new page_layout_default({
          id,
          breakpoints,
          options,
          theme: this.theme
        });
        page.add(list);
      }
      this.pages.push(page);
    }
  }
};
if (customElements && !customElements.get("amedia-frontpage")) {
  customElements.define("amedia-frontpage", Frontpage);
} else if (!customElements) {
  console.error("This browser does not support Custom Elements");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1tZWRpYXF1ZXJ5L2luZGV4LmpzIiwgIi4uL2FtZWRpYS1pbWcuanMiLCAiLi4vY291bnRkb3duLmpzIiwgIi4uL2Zyb250cGFnZS5qcyIsICIuLi9hZGp1c3QtdGVhc2VyLmpzIiwgIi4uL2xheW91dC1kZWZpbml0aW9ucy5qcyIsICIuLi9jb250YWluZXIuanMiLCAiLi4vdGVhc2VyLmpzIiwgIi4uL2xvZy5qcyIsICIuLi9ncmlkLWNzcy5qcyIsICIuLi9jb2xvci1tYXBwaW5nLmpzIiwgIi4uL2NyZWF0ZS1zb25hci5qcyIsICIuLi9wYWdlLWxheW91dC5qcyIsICIuLi9ncm91cC1wYWdlLWxheW91dC5qcyIsICIuLi9zdGl0Y2hlci5qcyIsICIuLi9nZXRVc2VyUmVjb21tZW5kYXRpb25zLmpzIiwgIi4uL21peGlucy5qcyIsICIuLi9yZXN0b3JlLXNjcm9sbC1wb3NpdGlvbi5qcyIsICIuLi9leHBlcmltZW50LXBlcnNvbmFsaXNlZC5qcyIsICIuLi9iYWNrZW5kLmpzIiwgIi4uL3Rlc3QtZm9yLWxvY2Fsc3RvcmFnZS5qcyIsICIuLi9hYi10b2tlbi5qcyIsICIuLi9hcnRpY2xlLWJvdHRvbS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFtZWRpYS91dWlkL2luZGV4LmpzIiwgIi4uL3ZlcnNpb25zLmpzIiwgIi4uL3NtYXJ0LWVtYmVkLmpzIiwgIi4uL2dob3N0LXRlYXNlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFtZWRpYS9mcm9udGVuZC1ycGMvbGliL2Nhc3QtYXMtcHJvbWlzZS5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFtZWRpYS9mcm9udGVuZC1ycGMvbGliL3NlcnZlci5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFtZWRpYS9mcm9udGVuZC1ycGMvbGliL2NsaWVudC5qcyIsICIuLi9vcHRpbXVzLWVsZW1lbnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG5Db3B5cmlnaHQgKGMpIDIwMTQsIFlhaG9vISBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5Db3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuXG5TZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLm1hdGNoID0gbWF0Y2hRdWVyeTtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZVF1ZXJ5O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgUkVfTUVESUFfUVVFUlkgICAgID0gLyg/Oihvbmx5fG5vdCk/XFxzKihbXlxcc1xcKFxcKV0rKSg/OlxccyphbmQpP1xccyopPyguKyk/L2ksXG4gICAgUkVfTVFfRVhQUkVTU0lPTiAgID0gL1xcKFxccyooW15cXHNcXDpcXCldKylcXHMqKD86XFw6XFxzKihbXlxcc1xcKV0rKSk/XFxzKlxcKS8sXG4gICAgUkVfTVFfRkVBVFVSRSAgICAgID0gL14oPzoobWlufG1heCktKT8oLispLyxcbiAgICBSRV9MRU5HVEhfVU5JVCAgICAgPSAvKGVtfHJlbXxweHxjbXxtbXxpbnxwdHxwYyk/JC8sXG4gICAgUkVfUkVTT0xVVElPTl9VTklUID0gLyhkcGl8ZHBjbXxkcHB4KT8kLztcblxuZnVuY3Rpb24gbWF0Y2hRdWVyeShtZWRpYVF1ZXJ5LCB2YWx1ZXMpIHtcbiAgICByZXR1cm4gcGFyc2VRdWVyeShtZWRpYVF1ZXJ5KS5zb21lKGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgaW52ZXJzZSA9IHF1ZXJ5LmludmVyc2U7XG5cbiAgICAgICAgLy8gRWl0aGVyIHRoZSBwYXJzZWQgb3Igc3BlY2lmaWVkIGB0eXBlYCBpcyBcImFsbFwiLCBvciB0aGUgdHlwZXMgbXVzdCBiZVxuICAgICAgICAvLyBlcXVhbCBmb3IgYSBtYXRjaC5cbiAgICAgICAgdmFyIHR5cGVNYXRjaCA9IHF1ZXJ5LnR5cGUgPT09ICdhbGwnIHx8IHZhbHVlcy50eXBlID09PSBxdWVyeS50eXBlO1xuXG4gICAgICAgIC8vIFF1aXQgZWFybHkgd2hlbiBgdHlwZWAgZG9lc24ndCBtYXRjaCwgYnV0IHRha2UgXCJub3RcIiBpbnRvIGFjY291bnQuXG4gICAgICAgIGlmICgodHlwZU1hdGNoICYmIGludmVyc2UpIHx8ICEodHlwZU1hdGNoIHx8IGludmVyc2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwcmVzc2lvbnNNYXRjaCA9IHF1ZXJ5LmV4cHJlc3Npb25zLmV2ZXJ5KGZ1bmN0aW9uIChleHByZXNzaW9uKSB7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZSAgPSBleHByZXNzaW9uLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBleHByZXNzaW9uLm1vZGlmaWVyLFxuICAgICAgICAgICAgICAgIGV4cFZhbHVlID0gZXhwcmVzc2lvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICA9IHZhbHVlc1tmZWF0dXJlXTtcblxuICAgICAgICAgICAgLy8gTWlzc2luZyBvciBmYWxzeSB2YWx1ZXMgZG9uJ3QgbWF0Y2guXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdvcmllbnRhdGlvbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Nhbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBleHBWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZGV2aWNlLXdpZHRoJzpcbiAgICAgICAgICAgICAgICBjYXNlICdkZXZpY2UtaGVpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgZXhwVmFsdWUgPSB0b1B4KGV4cFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgPSB0b1B4KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXNvbHV0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgZXhwVmFsdWUgPSB0b0RwaShleHBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICAgID0gdG9EcGkodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2FzcGVjdC1yYXRpbyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZGV2aWNlLWFzcGVjdC1yYXRpbyc6XG4gICAgICAgICAgICAgICAgY2FzZSAvKiBEZXByZWNhdGVkICovICdkZXZpY2UtcGl4ZWwtcmF0aW8nOlxuICAgICAgICAgICAgICAgICAgICBleHBWYWx1ZSA9IHRvRGVjaW1hbChleHBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICAgID0gdG9EZWNpbWFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdncmlkJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3ItaW5kZXgnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbm9jaHJvbWUnOlxuICAgICAgICAgICAgICAgICAgICBleHBWYWx1ZSA9IHBhcnNlSW50KGV4cFZhbHVlLCAxMCkgfHwgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgPSBwYXJzZUludCh2YWx1ZSwgMTApIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluJzogcmV0dXJuIHZhbHVlID49IGV4cFZhbHVlO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21heCc6IHJldHVybiB2YWx1ZSA8PSBleHBWYWx1ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0ICAgOiByZXR1cm4gdmFsdWUgPT09IGV4cFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKGV4cHJlc3Npb25zTWF0Y2ggJiYgIWludmVyc2UpIHx8ICghZXhwcmVzc2lvbnNNYXRjaCAmJiBpbnZlcnNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VRdWVyeShtZWRpYVF1ZXJ5KSB7XG4gICAgcmV0dXJuIG1lZGlhUXVlcnkuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuXG4gICAgICAgIHZhciBjYXB0dXJlcyAgICA9IHF1ZXJ5Lm1hdGNoKFJFX01FRElBX1FVRVJZKSxcbiAgICAgICAgICAgIG1vZGlmaWVyICAgID0gY2FwdHVyZXNbMV0sXG4gICAgICAgICAgICB0eXBlICAgICAgICA9IGNhcHR1cmVzWzJdLFxuICAgICAgICAgICAgZXhwcmVzc2lvbnMgPSBjYXB0dXJlc1szXSB8fCAnJyxcbiAgICAgICAgICAgIHBhcnNlZCAgICAgID0ge307XG5cbiAgICAgICAgcGFyc2VkLmludmVyc2UgPSAhIW1vZGlmaWVyICYmIG1vZGlmaWVyLnRvTG93ZXJDYXNlKCkgPT09ICdub3QnO1xuICAgICAgICBwYXJzZWQudHlwZSAgICA9IHR5cGUgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiAnYWxsJztcblxuICAgICAgICAvLyBTcGxpdCBleHByZXNzaW9ucyBpbnRvIGEgbGlzdC5cbiAgICAgICAgZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucy5tYXRjaCgvXFwoW15cXCldK1xcKS9nKSB8fCBbXTtcblxuICAgICAgICBwYXJzZWQuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucy5tYXAoZnVuY3Rpb24gKGV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHZhciBjYXB0dXJlcyA9IGV4cHJlc3Npb24ubWF0Y2goUkVfTVFfRVhQUkVTU0lPTiksXG4gICAgICAgICAgICAgICAgZmVhdHVyZSAgPSBjYXB0dXJlc1sxXS50b0xvd2VyQ2FzZSgpLm1hdGNoKFJFX01RX0ZFQVRVUkUpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBmZWF0dXJlWzFdLFxuICAgICAgICAgICAgICAgIGZlYXR1cmUgOiBmZWF0dXJlWzJdLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgOiBjYXB0dXJlc1syXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9KTtcbn1cblxuLy8gLS0gVXRpbGl0aWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gdG9EZWNpbWFsKHJhdGlvKSB7XG4gICAgdmFyIGRlY2ltYWwgPSBOdW1iZXIocmF0aW8pLFxuICAgICAgICBudW1iZXJzO1xuXG4gICAgaWYgKCFkZWNpbWFsKSB7XG4gICAgICAgIG51bWJlcnMgPSByYXRpby5tYXRjaCgvXihcXGQrKVxccypcXC9cXHMqKFxcZCspJC8pO1xuICAgICAgICBkZWNpbWFsID0gbnVtYmVyc1sxXSAvIG51bWJlcnNbMl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY2ltYWw7XG59XG5cbmZ1bmN0aW9uIHRvRHBpKHJlc29sdXRpb24pIHtcbiAgICB2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KHJlc29sdXRpb24pLFxuICAgICAgICB1bml0cyA9IFN0cmluZyhyZXNvbHV0aW9uKS5tYXRjaChSRV9SRVNPTFVUSU9OX1VOSVQpWzFdO1xuXG4gICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICdkcGNtJzogcmV0dXJuIHZhbHVlIC8gMi41NDtcbiAgICAgICAgY2FzZSAnZHBweCc6IHJldHVybiB2YWx1ZSAqIDk2O1xuICAgICAgICBkZWZhdWx0ICAgIDogcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9QeChsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KGxlbmd0aCksXG4gICAgICAgIHVuaXRzID0gU3RyaW5nKGxlbmd0aCkubWF0Y2goUkVfTEVOR1RIX1VOSVQpWzFdO1xuXG4gICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICdlbScgOiByZXR1cm4gdmFsdWUgKiAxNjtcbiAgICAgICAgY2FzZSAncmVtJzogcmV0dXJuIHZhbHVlICogMTY7XG4gICAgICAgIGNhc2UgJ2NtJyA6IHJldHVybiB2YWx1ZSAqIDk2IC8gMi41NDtcbiAgICAgICAgY2FzZSAnbW0nIDogcmV0dXJuIHZhbHVlICogOTYgLyAyLjU0IC8gMTA7XG4gICAgICAgIGNhc2UgJ2luJyA6IHJldHVybiB2YWx1ZSAqIDk2O1xuICAgICAgICBjYXNlICdwdCcgOiByZXR1cm4gdmFsdWUgKiA3MjtcbiAgICAgICAgY2FzZSAncGMnIDogcmV0dXJuIHZhbHVlICogNzIgLyAxMjtcbiAgICAgICAgZGVmYXVsdCAgIDogcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBCcmlja0ltYWdlLCBBbWVkaWFJbWFnZUNsaWVudCB9IGZyb20gJ0BhbWVkaWEvYnJpY2staW1hZ2UnO1xuXG5pZiAoY3VzdG9tRWxlbWVudHMgJiYgIWN1c3RvbUVsZW1lbnRzLmdldCgnYnJpY2staW1hZ2UnKSkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2JyaWNrLWltYWdlJywgQnJpY2tJbWFnZSk7XG59XG5cbmlmIChjdXN0b21FbGVtZW50cyAmJiAhY3VzdG9tRWxlbWVudHMuZ2V0KCdhbWVkaWEtaW1nJykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbWVkaWEtaW1nJywgQW1lZGlhSW1hZ2VDbGllbnQpO1xufVxuIiwgImltcG9ydCB7IENvdW50ZG93biB9IGZyb20gJ0BhbWVkaWEvYnJpY2stY291bnRkb3duJztcblxuaWYgKGN1c3RvbUVsZW1lbnRzICYmICFjdXN0b21FbGVtZW50cy5nZXQoJ2FtZWRpYS1jb3VudGRvd24nKSkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FtZWRpYS1jb3VudGRvd24nLCBDb3VudGRvd24pO1xufVxuIiwgIi8vIEB0cy1ub2NoZWNrXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBAdHMtaWdub3JlXG5cbmltcG9ydCAnLi9hbWVkaWEtaW1nLmpzJztcbmltcG9ydCAnLi9jb3VudGRvd24uanMnO1xuXG5pbXBvcnQgeyBnZXRCcm93c2VySWQgfSBmcm9tICdAYW1lZGlhL2Jyb3dzZXJpZCc7XG5pbXBvcnQgeyBVc2VyRGF0YVJlcXVlc3QgfSBmcm9tICdAYW1lZGlhL3VzZXInO1xuXG5pbXBvcnQgUGFnZUxheW91dCBmcm9tICcuL3BhZ2UtbGF5b3V0LmpzJztcbmltcG9ydCBHcm91cFBhZ2VMYXlvdXQgZnJvbSAnLi9ncm91cC1wYWdlLWxheW91dC5qcyc7XG5pbXBvcnQgc3RpdGNoZXIgZnJvbSAnLi9zdGl0Y2hlci5qcyc7XG5pbXBvcnQge1xuICBnZXRSZWNvbW1lbmRhdGlvbnMsXG4gIGdldFJlY29tbWVuZGF0aW9uc0Jyb3dzZXJJZCxcbn0gZnJvbSAnLi9nZXRVc2VyUmVjb21tZW5kYXRpb25zLmpzJztcbmltcG9ydCB7IG1peGluRnJvbnRQYWdlRWxlbWVudHMsIGdldFRlYXNlcklkTWFwIH0gZnJvbSAnLi9taXhpbnMuanMnO1xuaW1wb3J0IHsgcmVzdG9yZVNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi9yZXN0b3JlLXNjcm9sbC1wb3NpdGlvbi5qcyc7XG5pbXBvcnQgeyBQZXJzb25hbGlzZWREYXRhRXhwZXJpbWVudCB9IGZyb20gJy4vZXhwZXJpbWVudC1wZXJzb25hbGlzZWQuanMnO1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7IHRva2VuIH0gZnJvbSAnLi9hYi10b2tlbi5qcyc7XG5pbXBvcnQgeyBpc0FydGljbGUsIGFwcGx5QXJ0aWNsZVRyZWF0bWVudCB9IGZyb20gJy4vYXJ0aWNsZS1ib3R0b20uanMnO1xuaW1wb3J0IHsgZ2V0TGF5b3V0LCBnZXRMYXlvdXRLZXlzLCBsYXlvdXRzIH0gZnJvbSAnLi9sYXlvdXQtZGVmaW5pdGlvbnMuanMnO1xuaW1wb3J0IHJlbmRlclNtYXJ0RW1iZWQgZnJvbSAnLi9zbWFydC1lbWJlZC5qcyc7XG5pbXBvcnQgeyByZW5kZXJHaG9zdFRlYXNlciB9IGZyb20gJy4vZ2hvc3QtdGVhc2VyLmpzJztcblxuaW1wb3J0ICcuL29wdGltdXMtZWxlbWVudC5qcyc7XG5cbmNvbnN0IGN1cnJlbnRMYXlvdXQgPSBnZXRMYXlvdXQoKTtcbmNvbnN0IGJyZWFrcG9pbnRzID0gZ2V0TGF5b3V0S2V5cygpXG4gIC5zb3J0KClcbiAgLm1hcCgoa2V5KSA9PiBsYXlvdXRzW2tleV0pO1xuXG5jbGFzcyBGcm9udHBhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucGFnZXMgPSBbXTtcbiAgICB0aGlzLnB1YmxpY2F0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3B1YmxpY2F0aW9uJyk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCd0aGVtZScpO1xuICAgIHRoaXMuYnJpY2tUZWFzZXJWZXJzaW9ucyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGdldEZyb250cGFnZU9iamVjdHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuZ2V0QXR0cmlidXRlKCdjb21tb24tZWxlbWVudHMnKSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBzZXRJZCgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFxuICAgICAgICAnaWQnLFxuICAgICAgICBgZnJvbnQtJHt0aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhbWVkaWEtZnJvbnRwYWdlJykubGVuZ3RofWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNyYygpIHtcbiAgICBjb25zdCBzcmMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcbiAgICAgIHJldHVybiBzcmMucmVwbGFjZSgnaHR0cDonLCAnaHR0cHM6Jyk7XG4gICAgfVxuICAgIHJldHVybiBzcmM7XG4gIH1cblxuICBzZXRCcmlja1RlYXNlclZlcnNpb25zKHRlYXNlcikge1xuICAgIGlmICh0ZWFzZXIuY3NzKSB7XG4gICAgICBjb25zdCBicmlja1RlYXNlclZlcnNpb24gPSB0ZWFzZXIuY3NzLmJyaWNrVGVhc2VyVmVyc2lvbjtcblxuICAgICAgaWYgKGJyaWNrVGVhc2VyVmVyc2lvbikge1xuICAgICAgICB0aGlzLmJyaWNrVGVhc2VyVmVyc2lvbnMuc2V0KGAke2JyaWNrVGVhc2VyVmVyc2lvbn1gLCB7XG4gICAgICAgICAgYnJpY2tUZWFzZXJWZXJzaW9uLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNldElkKCk7XG4gICAgICBjb25zdCBubGlIYXNoID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2luamVjdC1ubGknKVxuICAgICAgICA/IHRoaXMuZ2V0QXR0cmlidXRlKCdpbmplY3QtbmxpJylcbiAgICAgICAgOiAnbm90LWluLXVzZSc7XG5cbiAgICAgIGNvbnN0IFticm93c2VyaWRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRCcm93c2VySWQoKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpLFxuICAgICAgXSk7XG5cbiAgICAgIGF3YWl0IG5ldyBVc2VyRGF0YVJlcXVlc3QoKVxuICAgICAgICAud2l0aEF0dHJpYnV0ZXMoW1xuICAgICAgICAgICduYW1lJyxcbiAgICAgICAgICAncHJpdmFjeVByZWZlcmVuY2VzJyxcbiAgICAgICAgICAnZXh0cmFEYXRhJyxcbiAgICAgICAgICAndHJhY2tpbmdLZXknLFxuICAgICAgICAgICd1dWlkJyxcbiAgICAgICAgXSlcbiAgICAgICAgLmZldGNoKHsgdGltZW91dDogMTAwMCB9KVxuICAgICAgICAudGhlbigoeyBhdHRyaWJ1dGVzLCBzdGF0ZSB9KSA9PiB7XG4gICAgICAgICAgdGhpcy51c2VyQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgICAgdGhpcy51c2VyU3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXJTdGF0ZSA9IHsgaXNMb2dnZWRJbjogZmFsc2UgfTtcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBhdXRoZW50aWNhdGVkID0gdGhpcy51c2VyU3RhdGUuaXNMb2dnZWRJbjtcblxuICAgICAgY29uc3QgcmVjb21tZW5kYXRpb25zID0gYXV0aGVudGljYXRlZFxuICAgICAgICA/IGdldFJlY29tbWVuZGF0aW9ucyh0aGlzLnVzZXJBdHRyaWJ1dGVzLCBubGlIYXNoKVxuICAgICAgICA6IGdldFJlY29tbWVuZGF0aW9uc0Jyb3dzZXJJZChicm93c2VyaWQsIG5saUhhc2gpO1xuXG4gICAgICBjb25zdCBwcmltYXJ5ID0gYXdhaXQgZmV0Y2hEYXRhKHRoaXMuc3JjLCB0b2tlbiwgcmVjb21tZW5kYXRpb25zKTtcbiAgICAgIGNvbnN0IHBkZSA9IG5ldyBQZXJzb25hbGlzZWREYXRhRXhwZXJpbWVudChwcmltYXJ5KTtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQocGRlLmdldFBhZ2VUcmFjZXJNYXJrdXAoKSk7XG4gICAgICBjb25zdCBmaWx0ZXJlZCA9IHBkZS50ZWFzZXJEYXRhO1xuICAgICAgY29uc3QgdGVhc2VySWRNYXAgPSBnZXRUZWFzZXJJZE1hcChmaWx0ZXJlZCk7XG4gICAgICBjb25zdCB7IHF1ZXJ5UGFyYW1zIH0gPSBwcmltYXJ5O1xuXG4gICAgICBsZXQgaXNBbWVkaWFTdGFmZjtcbiAgICAgIGxldCBoYXNWaWRlb0FjY2VzcztcbiAgICAgIGlmICh0aGlzLnVzZXJTdGF0ZS5pc0xvZ2dlZEluKSB7XG4gICAgICAgIGlzQW1lZGlhU3RhZmYgPSB0aGlzLnVzZXJBdHRyaWJ1dGVzLmV4dHJhRGF0YS5hbWVkaWFfc3RhZmY7XG4gICAgICAgIGhhc1ZpZGVvQWNjZXNzID1cbiAgICAgICAgICB0aGlzLnVzZXJBdHRyaWJ1dGVzLmV4dHJhRGF0YS5jdXN0b21lcl9rZXlzIHx8XG4gICAgICAgICAgdGhpcy51c2VyQXR0cmlidXRlcy5leHRyYURhdGEucGx1c3NhbHRfc3Vic2NyaXB0aW9uO1xuICAgICAgfVxuXG4gICAgICBsZXQgdGVhc2VySXRlbXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgZmlsdGVyZWQubWFwKGFzeW5jICh0ZWFzZXIpID0+IHtcbiAgICAgICAgICB0ZWFzZXIgPSByZW5kZXJTbWFydEVtYmVkKHRlYXNlciwgdGhpcy51c2VyQXR0cmlidXRlcyk7XG4gICAgICAgICAgaWYgKHRlYXNlci50eXBlID09PSAnZ2hvc3QtdGVhc2VyJykge1xuICAgICAgICAgICAgdGVhc2VyID0gcmVuZGVyR2hvc3RUZWFzZXIodGVhc2VyLCB0aGlzLnRoZW1lLCB0aGlzLnB1YmxpY2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRlYXNlci51bmtub3duSGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IFt7IHR5cGU6ICdtZXRhJywgdW5rbm93bkhlaWdodDogdHJ1ZSB9LCB0ZWFzZXJdO1xuICAgICAgICAgICAgZ3JvdXAudW5rbm93bkhlaWdodCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2hvd1BsYXllclRvVXNlciA9XG4gICAgICAgICAgICBoYXNWaWRlb0FjY2VzcyB8fCBpc0FtZWRpYVN0YWZmIHx8ICF0ZWFzZXIucHJlbWl1bTtcblxuICAgICAgICAgIC8vIGlzIGl0IGEgZ3JvdXA/XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGVhc2VyKSkge1xuICAgICAgICAgICAgdGVhc2VyID0gdGVhc2VyLmZpbHRlcihcbiAgICAgICAgICAgICAgKGVsZW1lbnQpID0+IGVsZW1lbnQgJiYgIXRlYXNlcklkTWFwLmdldChlbGVtZW50LmlkKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRlYXNlciA9IHRlYXNlci5tYXAocmVuZGVyU21hcnRFbWJlZCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIHRlYXNlci5tYXAoYXN5bmMgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudD8udHlwZSA9PT0gJ2dob3N0LXRlYXNlcicpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSByZW5kZXJHaG9zdFRlYXNlcihcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdWJsaWNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2hvd1BsYXllclRvVXNlclxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnZpZGVvVGVhc2VyTWFya3VwICYmXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXlPbkZyb250ICYmXG4gICAgICAgICAgICAgICAgICBzaG93UGxheWVyVG9Vc2VyXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwgPSBlbGVtZW50LnZpZGVvVGVhc2VyTWFya3VwLmh0bWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnJpY2tUZWFzZXJWZXJzaW9ucyhlbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGVhc2VyLnZpZGVvVGVhc2VyTWFya3VwICYmXG4gICAgICAgICAgICB0ZWFzZXIucGxheU9uRnJvbnQgJiZcbiAgICAgICAgICAgIHNob3dQbGF5ZXJUb1VzZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRlYXNlci5odG1sID0gdGVhc2VyLnZpZGVvVGVhc2VyTWFya3VwLmh0bWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zZXRCcmlja1RlYXNlclZlcnNpb25zKHRlYXNlcik7XG5cbiAgICAgICAgICByZXR1cm4gdGVhc2VyO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGVhc2VySXRlbXMuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5lcnJvcik7XG5cbiAgICAgIGlmIChpc0FydGljbGUoKSAmJiB0aGlzLnVzZXJTdGF0ZS5pc0xvZ2dlZEluKSB7XG4gICAgICAgIHRlYXNlckl0ZW1zID0gYXBwbHlBcnRpY2xlVHJlYXRtZW50KHRlYXNlckl0ZW1zLCB0aGlzLnVzZXJBdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcG9zRGVsdGEgPSBsYXlvdXRzW2N1cnJlbnRMYXlvdXRdLmluZGV4RGVsdGEodGVhc2VySXRlbXMpO1xuICAgICAgY29uc3QgZnJvbnRQYWdlRWxlbWVudHMgPSB0aGlzLmdldEZyb250cGFnZU9iamVjdHMoKTtcbiAgICAgIHRlYXNlckl0ZW1zID0gbWl4aW5Gcm9udFBhZ2VFbGVtZW50cyhcbiAgICAgICAgZnJvbnRQYWdlRWxlbWVudHMsXG4gICAgICAgIHBvc0RlbHRhLFxuICAgICAgICB0ZWFzZXJJdGVtc1xuICAgICAgKTtcblxuICAgICAgLy8gYWRkIGZpcnN0VGVhc2VyID0gdHJ1ZSB0byBmaXJzdCB0ZWFzZXJzIHVudGlsIHdlIHJlYWNoIGEgdGVhc2VyIHdpdGggYW4gaW1hZ2VcbiAgICAgIC8vIHRoaXMgaXMgZG9uZSBmb3IgbGF5b3V0IHB1cnBvc2VzLiBXZSB3YW50IHRoZSBmaXJzdCB0ZWFzZXIgd2l0aCBhbiBpbWFnZSB0byBiZSBsYXJnZS5cbiAgICAgIHRlYXNlckl0ZW1zLmV2ZXJ5KCh0ZWFzZXIpID0+IHtcbiAgICAgICAgaWYgKHRlYXNlci50eXBlID09PSAndGVhc2VyJykge1xuICAgICAgICAgIHRlYXNlci5maXJzdFRlYXNlciA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuICF0ZWFzZXIuaGFzSW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgLy8gU3BsaXQgdXAgZnJvbnRzIGFuZCBhZGQgdGhlbVxuICAgICAgY29uc3QgYmF0Y2hPZkVsZW1lbnRzID0gc3RpdGNoZXIodGVhc2VySXRlbXMpO1xuICAgICAgbGV0IGxpc3Q7XG5cbiAgICAgIHdoaWxlICgobGlzdCA9IGJhdGNoT2ZFbGVtZW50cygpKSkge1xuICAgICAgICB0aGlzLmFkZENvbnRlbnQobGlzdCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbmRlclBhZ2VzKCk7XG5cbiAgICAgIGNvbnN0IHNwaW5uZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2FtZWRpYS1zcGlubmVyJyk7XG4gICAgICBzcGlubmVyPy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNwaW5uZXIpO1xuICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCcjb3JkaW5vVHJhY2VyJykuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcblxuICAgICAgaWYgKCFpc0FydGljbGUoKSkge1xuICAgICAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnZnJvbnRwYWdlLXJlbmRlcmVkJywgeyBkZXRhaWw6IHsgcXVlcnlQYXJhbXMgfSB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBgT3B0aW11cyBmYWxsYmFjazogJHtlcnJvci5tZXNzYWdlIHx8ICcnfWA7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhZGRCcmlja1N0eWxpbmcoKSB7XG4gICAgbGV0IHN0eWxlTGlua0h0bWwgPSAnJztcbiAgICB0aGlzLmJyaWNrVGVhc2VyVmVyc2lvbnMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHsgYnJpY2tUZWFzZXJWZXJzaW9uIH0gPSB2YWx1ZTtcbiAgICAgIHN0eWxlTGlua0h0bWwgKz0gYDxsaW5rIG1lZGlhPVwiYWxsXCIgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2Fzc2V0cy5hY2RuLm5vL3BrZy9AYW1lZGlhL2JyaWNrLXRlYXNlci8ke2JyaWNrVGVhc2VyVmVyc2lvbn0vY3NzL2JyaWNrLXRlYXNlci5jc3NcIj5gO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0eWxlTGlua0h0bWw7XG4gIH1cblxuICByZW5kZXJQYWdlcygpIHtcbiAgICBsZXQgaHRtbCA9ICcnO1xuXG4gICAgaHRtbCArPSB0aGlzLmFkZEJyaWNrU3R5bGluZygpO1xuXG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICBpZiAoIXBhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdlSW5mbyA9IHBhZ2UuY2xvc2UoKTtcbiAgICAgIGh0bWwgKz0gcGFnZUluZm8uaHRtbDtcblxuICAgICAgaWYgKHBhZ2VJbmZvLmpzRXh0ZXJuYWwpIHtcbiAgICAgICAgcGFnZUluZm8uanNFeHRlcm5hbC5mb3JFYWNoKChhc3NldCkgPT4ge1xuICAgICAgICAgIGh0bWwgKz0gYDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiIHNyYz1cIiR7YXNzZXR9XCI+PC9zY3JpcHQ+YDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgLy8gU2FmYXJpIGluIGlPUzkgbmVlZHMgdGhlIGNvbnRleHQgZm9yIHRoZSByYW5nZSB0b1xuICAgIC8vIGJlIHNldCBleHBsaWNpdGx5LCB0aGlzIGlzIGRvbmUgd2l0aCBzZWxlY3ROb2RlKHRoaXMpXG4gICAgLy8gd2hpY2ggc2V0cyB0aGUgcmFuZ2UgdG8gY29udGFpbiB0aGlzIGN1c3RvbSBlbGVtZW50IGFuZCBpdHMgY29udGVudFxuICAgIHJhbmdlLnNlbGVjdE5vZGUodGhpcyk7XG4gICAgdGhpcy5jb250ZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpO1xuICB9XG5cbiAgYWRkQ29udGVudChsaXN0KSB7XG4gICAgbGV0IFtwYWdlXSA9IHRoaXMucGFnZXMuc2xpY2UoLTEpO1xuICAgIGNvbnN0IGlkID0gYGZyb250JHt0aGlzLnBhZ2VzLmxlbmd0aH1gO1xuICAgIHRoaXMuY29udGVudEluZGV4ID0gdGhpcy5jb250ZW50SW5kZXggfHwgMDtcbiAgICBjb25zdCB7IG1ldGEgfSA9IGxpc3Q7XG5cbiAgICBjb25zdCBjb250YWluZXJJbmRleCA9IHBhZ2VcbiAgICAgID8gcGFnZS5jb250YWluZXJJbmRleFxuICAgICAgOiBnZXRMYXlvdXRLZXlzKCkucmVkdWNlKFxuICAgICAgICAgIChyZXN1bHQsIHdpZHRoKSA9PiAoeyAuLi5yZXN1bHQsIFt3aWR0aF06IDAgfSksXG4gICAgICAgICAge31cbiAgICAgICAgKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAuLi5tZXRhLFxuICAgICAgaW5kZXg6IG1ldGEgJiYgbWV0YS50eXBlID09PSAnY29tcGxleCcgPyAwIDogdGhpcy5jb250ZW50SW5kZXgsXG4gICAgICBjb250YWluZXJJbmRleCxcbiAgICAgIGdyb3VwOiBtZXRhID8gbWV0YS50eXBlID09PSAnZ3JvdXAnIHx8IG1ldGEudHlwZSA9PT0gJ2NvbXBsZXgnIDogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMuY29udGVudEluZGV4ICs9IGxpc3QubGVuZ3RoO1xuICAgIGlmICghb3B0aW9ucy5ncm91cCkge1xuICAgICAgLy8gRmlsbCBwcmV2aW91cyBjb250YWluZXJcbiAgICAgIGNvbnN0IGxhc3RBdmFpbGFibGVQYWdlID0gdGhpcy5wYWdlc1xuICAgICAgICAuc2xpY2UoKVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5maW5kKChwKSA9PiAhcC5ncm91cCk7XG4gICAgICBpZiAobGFzdEF2YWlsYWJsZVBhZ2UpIHtcbiAgICAgICAgbGlzdCA9IGxhc3RBdmFpbGFibGVQYWdlLmFkZChsaXN0LCBjdXJyZW50TGF5b3V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxpc3RbMF0pIHtcbiAgICAgIGxpc3RbMF0uZmlyc3RUZWFzZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChsaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0Lm1ldGE/Lmdyb3VwVHlwZSA9PT0gJ2xpc3QtaG9yaXpvbnRhbCcgfHxcbiAgICAgICAgbGlzdC5tZXRhPy5ncm91cFR5cGUgPT09ICdkZWZhdWx0J1xuICAgICAgKSB7XG4gICAgICAgIHBhZ2UgPSBuZXcgR3JvdXBQYWdlTGF5b3V0KHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBicmVha3BvaW50cyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lLFxuICAgICAgICAgIG1ldGE6IGxpc3QubWV0YSxcbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2UuYWRkKGxpc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZSA9IG5ldyBQYWdlTGF5b3V0KHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBicmVha3BvaW50cyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5hZGQobGlzdCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhZ2VzLnB1c2gocGFnZSk7XG4gICAgfVxuICB9XG59XG5cbmlmIChjdXN0b21FbGVtZW50cyAmJiAhY3VzdG9tRWxlbWVudHMuZ2V0KCdhbWVkaWEtZnJvbnRwYWdlJykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbWVkaWEtZnJvbnRwYWdlJywgRnJvbnRwYWdlKTtcbn0gZWxzZSBpZiAoIWN1c3RvbUVsZW1lbnRzKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IEN1c3RvbSBFbGVtZW50cycpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc29ydFRlYXNlckNvbHVtbnModGVhc2VyQ29sdW1ucywgdlBhZGRpbmcpIHtcbiAgcmV0dXJuIHRlYXNlckNvbHVtbnNcbiAgICAubWFwKCh0ZWFzZXJDb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBoZWlnaHQgPVxuICAgICAgICB0ZWFzZXJDb2x1bW4ucmVkdWNlKChwdiwgdGVhc2VyKSA9PiBwdiArIHRlYXNlci5oZWlnaHQsIDApICtcbiAgICAgICAgKHRlYXNlckNvbHVtbi5sZW5ndGggLSAxKSAqIHZQYWRkaW5nO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgbGVuZ3RoOiB0ZWFzZXJDb2x1bW5zLmxlbmd0aCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuc29ydCgoYSwgYikgPT4gYS5oZWlnaHQgLSBiLmhlaWdodClcbiAgICAuZmlsdGVyKCh0ZWFzZXIsIGluZGV4LCBhcnIpID0+IGluZGV4ID09PSAwIHx8IGluZGV4ID09PSBhcnIubGVuZ3RoIC0gMSk7XG59XG5cbmZ1bmN0aW9uIGdldEhlaWdodERpZmZGdW5jdGlvbihjb2x1bW5zU29ydGVkLCB2UGFkZGluZywgcGVyY2VudGFnZSkge1xuICBpZiAoIXBlcmNlbnRhZ2UpIHtcbiAgICByZXR1cm4gY29sdW1uc1NvcnRlZFsxXS5oZWlnaHQgLSBjb2x1bW5zU29ydGVkWzBdLmhlaWdodDtcbiAgfVxuICByZXR1cm4gKGNvbHVtbnNTb3J0ZWRbMF0uaGVpZ2h0IC8gY29sdW1uc1NvcnRlZFsxXS5oZWlnaHQpICogMTAwO1xufVxuXG5mdW5jdGlvbiBzZXRIZWlnaHQodGVhc2VyQ29sdW1ucywgdlBhZGRpbmcsIHNpemVzLCBmaXJzdENvbnRhaW5lcikge1xuICBjb25zdCBjb2x1bW5zU29ydGVkID0gc29ydFRlYXNlckNvbHVtbnModGVhc2VyQ29sdW1ucywgdlBhZGRpbmcpO1xuICAvLyBNb3JlIHJlc3RyaWN0aXZlIGZvciBmaXJzdCBjb250YWluZXIuIE9ubHkgY2hhbmdlIGxheW91dCBpZiB3ZSBoYXZlIHZlcnkgbXVjaCB3aGl0ZXNwYWNlXG4gIGlmIChcbiAgICBmaXJzdENvbnRhaW5lciAmJlxuICAgIGdldEhlaWdodERpZmZGdW5jdGlvbihjb2x1bW5zU29ydGVkLCB2UGFkZGluZywgdHJ1ZSkgPiA2MFxuICApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZGlmZiA9IGdldEhlaWdodERpZmZGdW5jdGlvbihjb2x1bW5zU29ydGVkLCB2UGFkZGluZyk7XG4gIGNvbnN0IHRhbGxlc3RDb2x1bW4gPSB0ZWFzZXJDb2x1bW5zW2NvbHVtbnNTb3J0ZWRbMV0uaW5kZXhdO1xuICBjb25zdCBzbWFsbGVzdENvbHVtbiA9IHRlYXNlckNvbHVtbnNbY29sdW1uc1NvcnRlZFswXS5pbmRleF07XG4gIGxldCBmYWlscyA9IGZhbHNlO1xuXG4gIGNvbnN0IG5ld1NtYWxsZXN0SGVpZ2h0ID0gc21hbGxlc3RDb2x1bW4ucmVkdWNlKChwdiwgdGVhc2VyV3JhcHBlciwgaSkgPT4ge1xuICAgIGNvbnN0IGluZm8gPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5pbmNyZWFzZVNpemUodHJ1ZSk7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBmYWlscyA9IHRydWU7XG4gICAgICByZXR1cm4gcHY7XG4gICAgfVxuICAgIGlmIChzaXplcy5pbmRleE9mKGluZm8ud2lkdGgpID09PSAtMSkge1xuICAgICAgZmFpbHMgPSB0cnVlO1xuICAgICAgcmV0dXJuIHB2O1xuICAgIH1cbiAgICByZXR1cm4gcHYgKyBpbmZvLmhlaWdodCArIGkgKiB2UGFkZGluZztcbiAgfSwgMCk7XG5cbiAgY29uc3QgbmV3VGFsbGVzdEhlaWdodCA9IHRhbGxlc3RDb2x1bW4ucmVkdWNlKChwdiwgdGVhc2VyV3JhcHBlciwgaSkgPT4ge1xuICAgIGNvbnN0IGluZm8gPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5kZWNyZWFzZVNpemUodHJ1ZSk7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBmYWlscyA9IHRydWU7XG4gICAgICByZXR1cm4gcHY7XG4gICAgfVxuICAgIGlmIChzaXplcy5pbmRleE9mKGluZm8ud2lkdGgpID09PSAtMSkge1xuICAgICAgZmFpbHMgPSB0cnVlO1xuICAgICAgcmV0dXJuIHB2O1xuICAgIH1cbiAgICByZXR1cm4gcHYgKyBpbmZvLmhlaWdodCArIGkgKiB2UGFkZGluZztcbiAgfSwgMCk7XG5cbiAgaWYgKGZhaWxzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbmV3RGlmZiA9IE1hdGguYWJzKG5ld1RhbGxlc3RIZWlnaHQgLSBuZXdTbWFsbGVzdEhlaWdodCk7XG4gIGNvbnN0IGFsdGVyQ29sdW1uV2lkdGhzID0gbmV3RGlmZiA8IGRpZmY7XG5cbiAgaWYgKGFsdGVyQ29sdW1uV2lkdGhzKSB7XG4gICAgc21hbGxlc3RDb2x1bW4uZm9yRWFjaCgodGVhc2VyV3JhcHBlcikgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IHRlYXNlcldyYXBwZXIudGVhc2VyLmluY3JlYXNlU2l6ZSgpO1xuICAgICAgdGVhc2VyV3JhcHBlci53aWR0aCA9IGluZm8ud2lkdGg7XG4gICAgICB0ZWFzZXJXcmFwcGVyLmhlaWdodCA9IGluZm8uaGVpZ2h0O1xuICAgIH0pO1xuXG4gICAgdGFsbGVzdENvbHVtbi5mb3JFYWNoKCh0ZWFzZXJXcmFwcGVyKSA9PiB7XG4gICAgICBjb25zdCBpbmZvID0gdGVhc2VyV3JhcHBlci50ZWFzZXIuZGVjcmVhc2VTaXplKCk7XG4gICAgICB0ZWFzZXJXcmFwcGVyLndpZHRoID0gaW5mby53aWR0aDtcbiAgICAgIHRlYXNlcldyYXBwZXIuaGVpZ2h0ID0gaW5mby5oZWlnaHQ7XG4gICAgfSk7XG4gICAgc2V0SGVpZ2h0KHRlYXNlckNvbHVtbnMsIHZQYWRkaW5nLCBzaXplcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hyaW5rKGl0ZXJhdGlvbnMsIHRlYXNlckNvbHVtbnMsIHZQYWRkaW5nKSB7XG4gIGl0ZXJhdGlvbnMgLT0gMTtcbiAgY29uc3QgY29sdW1uc1NvcnRlZCA9IHNvcnRUZWFzZXJDb2x1bW5zKHRlYXNlckNvbHVtbnMsIHZQYWRkaW5nKTtcbiAgbGV0IGRpZmYgPSBnZXRIZWlnaHREaWZmRnVuY3Rpb24oY29sdW1uc1NvcnRlZCwgdlBhZGRpbmcpO1xuICBsZXQgcmVkdWN0aW9uID0gZGlmZiAvIHRlYXNlckNvbHVtbnNbY29sdW1uc1NvcnRlZFsxXS5pbmRleF0ubGVuZ3RoO1xuXG4gIHRlYXNlckNvbHVtbnNbY29sdW1uc1NvcnRlZFsxXS5pbmRleF1cbiAgICAuc2xpY2UoMClcbiAgICAuc29ydCgoYSwgYikgPT4gYi50ZWFzZXIuZ2V0SW5mbygpLm1pbkhlaWdodCAtIGEudGVhc2VyLmdldEluZm8oKS5taW5IZWlnaHQpXG4gICAgLmZvckVhY2goKHRlYXNlcldyYXBwZXIpID0+IHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IHRlYXNlcldyYXBwZXIudGVhc2VyLnNocmluayhyZWR1Y3Rpb24pO1xuICAgICAgZGlmZiAtPSBmYWN0b3I7XG4gICAgICByZWR1Y3Rpb24gKz0gcmVkdWN0aW9uIC0gZmFjdG9yO1xuICAgICAgdGVhc2VyV3JhcHBlci5oZWlnaHQgPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5nZXRJbmZvKCkuaGVpZ2h0O1xuICAgIH0pO1xuXG4gIHJlZHVjdGlvbiA9IGRpZmYgLyB0ZWFzZXJDb2x1bW5zW2NvbHVtbnNTb3J0ZWRbMF0uaW5kZXhdLmxlbmd0aDtcbiAgdGVhc2VyQ29sdW1uc1tjb2x1bW5zU29ydGVkWzBdLmluZGV4XVxuICAgIC5zbGljZSgwKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBtYXhIZWlnaHQgPSBhLnRlYXNlci5nZXRJbmZvKCkubWF4SGVpZ2h0O1xuICAgICAgaWYgKCFtYXhIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gYi50ZWFzZXIuZ2V0SW5mbygpLm1heEhlaWdodCAtIG1heEhlaWdodDtcbiAgICB9KVxuICAgIC5mb3JFYWNoKCh0ZWFzZXJXcmFwcGVyKSA9PiB7XG4gICAgICBjb25zdCBmYWN0b3IgPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5ncm93KHJlZHVjdGlvbik7XG4gICAgICByZWR1Y3Rpb24gKz0gcmVkdWN0aW9uIC0gZmFjdG9yO1xuICAgICAgdGVhc2VyV3JhcHBlci5oZWlnaHQgPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5nZXRJbmZvKCkuaGVpZ2h0O1xuICAgIH0pO1xuXG4gIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgIHNocmluayhpdGVyYXRpb25zLCB0ZWFzZXJDb2x1bW5zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRDb29yZGluYXRlcyh0ZWFzZXJDb2x1bW5zLCBsdHIgPSB0cnVlLCB2UGFkZGluZywgaFBhZGRpbmcpIHtcbiAgbGV0IGxlZnQgPSAwO1xuICBsZXQgdG9wID0gMDtcbiAgLy8gQ2hhbmdlIGRpcmVjdGlvbiBvZiByb3cgbGF5b3V0LlxuICAvLyBDaGVjayBmaXJzdCBhbmQgbGFzdCBjb2x1bW4gdG8gZmluZCB0aGUgY3VycmVudCB2aXN1YWwgZGlyZWN0aW9uIChmcm9tIGxhcmdlIHRvIHNtYWxsKVxuICBpZiAodGVhc2VyQ29sdW1ucy5sZW5ndGggPiAxICYmIHRlYXNlckNvbHVtbnNbMF1bMF0pIHtcbiAgICBjb25zdCB2aXN1YWxMZWZ0ID1cbiAgICAgIHRlYXNlckNvbHVtbnNbMF1bMF0ud2lkdGggPlxuICAgICAgdGVhc2VyQ29sdW1uc1t0ZWFzZXJDb2x1bW5zLmxlbmd0aCAtIDFdWzBdLndpZHRoO1xuICAgIGx0ciA9IChsdHIgJiYgdmlzdWFsTGVmdCkgfHwgKCFsdHIgJiYgIXZpc3VhbExlZnQpO1xuXG4gICAgaWYgKCFsdHIpIHtcbiAgICAgIHRlYXNlckNvbHVtbnMgPSB0ZWFzZXJDb2x1bW5zLnJldmVyc2UoKTtcbiAgICB9XG4gIH1cbiAgdGVhc2VyQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICB0b3AgPSAwO1xuICAgIGNvbHVtbi5mb3JFYWNoKCh0ZWFzZXJXcmFwcGVyKSA9PiB7XG4gICAgICB0ZWFzZXJXcmFwcGVyLnRvcCA9IHRvcDtcbiAgICAgIGNvbnN0IGluZm8gPSB0ZWFzZXJXcmFwcGVyLnRlYXNlci5nZXRJbmZvKCk7XG4gICAgICB0b3AgKz0gaW5mby5oZWlnaHQgKyB2UGFkZGluZztcbiAgICAgIHRlYXNlcldyYXBwZXIubGVmdCA9IGxlZnQ7XG4gICAgfSk7XG4gICAgbGVmdCArPSBjb2x1bW5bMF0udGVhc2VyLmdldEluZm8oKS53aWR0aCArIGhQYWRkaW5nO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlaWdodERpZmYodGVhc2VyQ29sdW1ucywgdlBhZGRpbmcsIHBlcmNlbnRhZ2UpIHtcbiAgY29uc3QgY29sdW1uc1NvcnRlZCA9IHNvcnRUZWFzZXJDb2x1bW5zKHRlYXNlckNvbHVtbnMsIHZQYWRkaW5nKTtcbiAgcmV0dXJuIGdldEhlaWdodERpZmZGdW5jdGlvbihjb2x1bW5zU29ydGVkLCB2UGFkZGluZywgcGVyY2VudGFnZSk7XG59XG5leHBvcnQgeyBzZXRIZWlnaHQsIHNocmluaywgc2V0Q29vcmRpbmF0ZXMgfTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNtYWxsU2NyZWVuID0gNTAwO1xuY29uc3Qgc21hbGxTY3JlZW5UZWFzZXJTaXplcyA9IFs1MDBdO1xuY29uc3QgbGFyZ2VTY3JlZW4gPSA5ODA7XG5jb25zdCBsYXJnZVNjcmVlblRlYXNlclNpemVzID0gWzk4MCwgODgwLCA3ODAsIDY4MCwgNTgwLCA0ODAsIDM4MCwgMjgwXTtcblxuY29uc3QgbGF5b3V0cyA9IHtcbiAgW3NtYWxsU2NyZWVuXToge1xuICAgIHdpZHRoOiBzbWFsbFNjcmVlbixcbiAgICBnZXRJbml0aWFsVGVhc2VyU2l6ZTogKHRlYXNlciwgY29tcG9zaXRpb25zKSA9PiB7XG4gICAgICBpZiAodGVhc2VyLmZpcnN0VGVhc2VyIHx8IHRlYXNlci5pbXBvcnRhbnQpIHtcbiAgICAgICAgdGVhc2VyLnNldFZlcnNpb24oJ2RlZmF1bHQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wb3NpdGlvbnMgJiYgY29tcG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgY29tcG9zaXRpb25zU3RyaW5nID0gY29tcG9zaXRpb25zW2NvbXBvc2l0aW9ucy5sZW5ndGggLSAxXS5qb2luKCk7XG4gICAgICAgIGlmIChjb21wb3NpdGlvbnNTdHJpbmcgPT09ICcyNDItZGVmYXVsdCwyNDItZGVmYXVsdCcpIHtcbiAgICAgICAgICB0ZWFzZXIuc2V0VmVyc2lvbignaW1hZ2VMZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbc21hbGxTY3JlZW4sICdsYXJnZXN0J107XG4gICAgfSxcbiAgICBpbmRleERlbHRhOiAodGVhc2VyTGlzdCkgPT4ge1xuICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgaWYgKHRlYXNlckxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0ZWFzZXJMaXN0WzBdKSkge1xuICAgICAgICBkZWx0YSA9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZWFzZXJMaXN0W2RlbHRhXSA9PT0gdW5kZWZpbmVkIHx8IHRlYXNlckxpc3RbZGVsdGFdLmhhc0ltYWdlXG4gICAgICAgID8gZGVsdGFcbiAgICAgICAgOiBkZWx0YSArIDE7XG4gICAgfSxcbiAgICBnZXRBdmFpbGFibGVTaXplczogKCkgPT4gWy4uLnNtYWxsU2NyZWVuVGVhc2VyU2l6ZXNdLFxuICAgIGNob29zZVZlcnNpb246ICh0ZWFzZXIsIGNvbXBvc2l0aW9ucywgZnVsbHdpZHRoLCBpbmRleCwgZ3JvdXBUeXBlKSA9PiB7XG4gICAgICBpZiAoZ3JvdXBUeXBlID09PSAnY29tcGxleCcpIHtcbiAgICAgICAgcmV0dXJuIHRlYXNlci5pbXBvcnRhbnRcbiAgICAgICAgICA/IHRlYXNlci5zZXRWZXJzaW9uKCdkZWZhdWx0JylcbiAgICAgICAgICA6IHRlYXNlci5zZXRWZXJzaW9uKCdpbWFnZUxlZnQnLCBzbWFsbFNjcmVlbik7XG4gICAgICB9XG4gICAgICBpZiAoY29tcG9zaXRpb25zICYmIGNvbXBvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGNvbXBvc2l0aW9uc1N0cmluZyA9IGNvbXBvc2l0aW9uc1tjb21wb3NpdGlvbnMubGVuZ3RoIC0gMV0uam9pbigpO1xuICAgICAgICBpZiAoY29tcG9zaXRpb25zU3RyaW5nID09PSBgJHtzbWFsbFNjcmVlbn0taW1hZ2VMZWZ0YCkge1xuICAgICAgICAgIHJldHVybiB0ZWFzZXIuc2V0VmVyc2lvbignZGVmYXVsdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZnVsbHdpZHRoICYmIGluZGV4ICE9PSAwKSB7XG4gICAgICAgIHJldHVybiB0ZWFzZXIuc2V0VmVyc2lvbignaW1hZ2VMZWZ0Jywgc21hbGxTY3JlZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSAwIHx8IHRlYXNlci5pbXBvcnRhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRlYXNlci5zZXRWZXJzaW9uKCdkZWZhdWx0Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGVhc2VyLnNldFZlcnNpb24oJ2ltYWdlTGVmdCcsIHNtYWxsU2NyZWVuKTtcbiAgICB9LFxuICAgIGhQYWRkaW5nOiAxNixcbiAgICB2UGFkZGluZzogMjQsXG4gICAgY29sdW1uOiA1MDAsXG4gICAgYWx0ZXJEaXJlY3Rpb246IGZhbHNlLFxuICAgIHRlYXNlclNpemVzOiBbLi4uc21hbGxTY3JlZW5UZWFzZXJTaXplc10sXG4gICAgY29sdW1uczogMSxcbiAgICBicmVha09uRGlmZjogNjAsXG4gIH0sXG4gIFtsYXJnZVNjcmVlbl06IHtcbiAgICB3aWR0aDogbGFyZ2VTY3JlZW4sXG4gICAgZ2V0SW5pdGlhbFRlYXNlclNpemU6ICh0ZWFzZXIpID0+IHtcbiAgICAgIGxldCBzaXplID0gbGFyZ2VTY3JlZW5UZWFzZXJTaXplc1tsYXJnZVNjcmVlblRlYXNlclNpemVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAoIXRlYXNlci5oYXNJbWFnZSkge1xuICAgICAgICBzaXplID0gbGFyZ2VTY3JlZW5UZWFzZXJTaXplc1s1XTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRlYXNlci5wcmVtaXVtIHx8IHRlYXNlci5pbXBvcnRhbnQgfHwgdGVhc2VyLmZpcnN0VGVhc2VyKSB7XG4gICAgICAgIHNpemUgPSBsYXJnZVNjcmVlblRlYXNlclNpemVzWzNdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRlYXNlci5oYXNJbWFnZSAmJiB0ZWFzZXIuZmlyc3RUZWFzZXIpIHtcbiAgICAgICAgc2l6ZSA9IGxhcmdlU2NyZWVuVGVhc2VyU2l6ZXNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gW3NpemUsICdsYXJnZXN0J107XG4gICAgfSxcbiAgICBpbmRleERlbHRhOiAoKSA9PiAwLFxuICAgIGdldEF2YWlsYWJsZVNpemVzOiAoaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5sYXJnZVNjcmVlblRlYXNlclNpemVzXS5maWx0ZXIoKF8sIGkpID0+IGkgIT09IDUpOyAvLyBXZSBjYW5ub3QgaGF2ZSBhbiBlcXVhbCA1MC81MCBzcGxpdCBvbiB0aGUgdG9wIG9mIHRoZSBwYWdlXG4gICAgICB9XG4gICAgICByZXR1cm4gWy4uLmxhcmdlU2NyZWVuVGVhc2VyU2l6ZXNdO1xuICAgIH0sXG4gICAgY2hvb3NlVmVyc2lvbjogKHRlYXNlciwgY29tcG9zaXRpb25zLCBmdWxsd2lkdGgsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZnVsbHdpZHRoICYmIGluZGV4ICE9PSAwKSB7XG4gICAgICAgIHJldHVybiB0ZWFzZXIuc2V0VmVyc2lvbignaW1hZ2VMZWZ0JywgbGFyZ2VTY3JlZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZ1bGx3aWR0aCkge1xuICAgICAgICByZXR1cm4gdGVhc2VyLnNldFZlcnNpb24oJ2RlZmF1bHQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZWFzZXIuc2V0VmVyc2lvbignaW1hZ2VMZWZ0JywgbGFyZ2VTY3JlZW4pO1xuICAgIH0sXG5cbiAgICBoUGFkZGluZzogMjAsXG4gICAgdlBhZGRpbmc6IDMwLFxuICAgIGNvbHVtbjogODAsXG4gICAgYWx0ZXJEaXJlY3Rpb246IHRydWUsXG4gICAgdGVhc2VyU2l6ZXM6IFsuLi5sYXJnZVNjcmVlblRlYXNlclNpemVzXSxcbiAgICBjb2x1bW5zOiAxMCxcbiAgICBicmVha09uRGlmZjogMCxcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGdldExheW91dEtleXMoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhsYXlvdXRzKS5tYXAoKGtleSkgPT4gcGFyc2VJbnQoa2V5LCAxMCkpO1xufVxuXG5mdW5jdGlvbiBnZXRMYXlvdXQoKSB7XG4gIGNvbnN0IHZpZXdQb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY29uc3Qgc29ydGVkTGF5b3V0V2lkdGhzID0gZ2V0TGF5b3V0S2V5cygpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgcmV0dXJuIChcbiAgICBzb3J0ZWRMYXlvdXRXaWR0aHMuZmluZCgobGF5b3V0V2lkdGgpID0+IHZpZXdQb3J0V2lkdGggPD0gbGF5b3V0V2lkdGgpIHx8XG4gICAgTWF0aC5tYXgoLi4uc29ydGVkTGF5b3V0V2lkdGhzKVxuICApO1xufVxuXG5leHBvcnQgeyBsYXlvdXRzLCBnZXRMYXlvdXQsIGdldExheW91dEtleXMgfTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7XG4gIHNldEhlaWdodCxcbiAgc2hyaW5rLFxuICBzZXRDb29yZGluYXRlcyxcbiAgZ2V0SGVpZ2h0RGlmZixcbn0gZnJvbSAnLi9hZGp1c3QtdGVhc2VyLmpzJztcbmltcG9ydCB7IGxheW91dHMgfSBmcm9tICcuL2xheW91dC1kZWZpbml0aW9ucy5qcyc7XG5cbmNsYXNzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZyZWVTcGFjZSA9IFtdO1xuICAgIHRoaXMuY29udGVudCA9IFtdO1xuICAgIHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICB0aGlzLmx0ciA9IG9wdGlvbnMubHRyO1xuICAgIHRoaXMudlBhZGRpbmcgPSBvcHRpb25zLnZQYWRkaW5nO1xuICAgIHRoaXMuaFBhZGRpbmcgPSBvcHRpb25zLmhQYWRkaW5nO1xuICAgIHRoaXMuY29tcG9zaXRpb25zID0gb3B0aW9ucy5jb21wb3NpdGlvbnMgfHwgW107XG4gICAgdGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXggfHwgMDtcbiAgICB0aGlzLm1heEhlaWdodCA9IHt9O1xuICB9XG5cbiAgYWRkTWF4SGVpZ2h0KGxlZnQsIG1heCkge1xuICAgIGlmICh0aGlzLm1heEhlaWdodFtsZWZ0XSkge1xuICAgICAgdGhpcy5tYXhIZWlnaHRbbGVmdF0gKz0gbWF4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heEhlaWdodFtsZWZ0XSA9IG1heDtcbiAgICB9XG4gIH1cblxuICBnZXRNYXhIZWlnaHQobGVmdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1heEhlaWdodCkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICBpZiAobGVmdCAhPT0ga2V5ICYmIHJlc3VsdCA8IHRoaXMubWF4SGVpZ2h0W2tleV0pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXhIZWlnaHRba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgMCk7XG4gIH1cblxuICB1cGRhdGVGcmVlKHJlY3QpIHtcbiAgICAvLyBUaGUgYWxnb3JpdGhtIHdvcmtzIGJ5IGRpdmlkaW5nIHVudXNlZCBzcGFjZSBpbnNpZGUgdGhlIGNvbnRhaW5lciBpbnRvIHJlY3RhbmdsZXMuXG4gICAgLy8gV2hlbiB3ZSBpbnNlcnQgYSBuZXcgdGVhc2VyIGluIHRoZSBjb250YWluZXIgd2UgY2hlY2sgaWYgaXQgZml0cyBpbnNpZGUgb25lXG4gICAgLy8gb2YgdGhlIGZyZWUgc3BhY2UgcmVjdGFuZ2xlc1xuICAgIC8vIElmIGl0IGRvZXMsIHdlIGluc2VydCB0aGUgdGVhc2VyIGFuZCB1cGRhdGUgdGhlIGZyZWUgc3BhY2UgcmVjdGFuZ2xlc1xuICAgIC8vIElmIGl0IGRvZXNudCBmaXQgd2UgY2xvc2UgdGhlIGNvbnRhaW5lciBhbmQgY3JlYXRlIGEgbmV3IGNvbnRhaW5lclxuICAgIC8vIFdlIHRoZW4gdHJ5IHRvIGZpbGwgdGhlIHJlbWFpbmluZyBmcmVlIHNhcGNlIHJlY3RhbmdsZXNcbiAgICAvLyBhbHRlcmluZyB0aGUgd2lkdGggb2YgdGhlIHRlYXNlcnMgYW5kIHRoZSBpbWFnZSBjcm9wc1xuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IGxhc3QgdGVhc2VyXG4gICAgY29uc3QgdGVhc2VyV3JhcHBlciA9IHRoaXMuY29udGVudFt0aGlzLmNvbnRlbnQubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgdGVhc2VySW5mbyA9IHRlYXNlcldyYXBwZXIudGVhc2VyLmdldEluZm8oKTtcblxuICAgIHRoaXMuYWRkTWF4SGVpZ2h0KHRlYXNlcldyYXBwZXIubGVmdCwgdGVhc2VySW5mby5tYXhIZWlnaHQgfHwgMCk7XG5cbiAgICBpZiAocmVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmZvcmNlU2Vjb25kVGVhc2VyXG4gICAgICAgID8gMTAwMDBcbiAgICAgICAgOiB0ZWFzZXJXcmFwcGVyLmhlaWdodCArIHRlYXNlcldyYXBwZXIuaGVpZ2h0ICogMC4yNTtcblxuICAgICAgdGhpcy5mcmVlU3BhY2UucHVzaCh7XG4gICAgICAgIHdpZHRoOiB0aGlzLnR5cGUgLSB0ZWFzZXJXcmFwcGVyLndpZHRoIC0gdGhpcy5oUGFkZGluZyxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IHRlYXNlcldyYXBwZXIud2lkdGggKyB0aGlzLmhQYWRkaW5nLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmZyZWVTcGFjZSA9IHRoaXMuZnJlZVNwYWNlLmZpbHRlcihcbiAgICAgICAgKGYpID0+IGYud2lkdGggPiAwICYmIGYuaGVpZ2h0ID4gMFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2xkIGZyZWUgc3BhY2VcbiAgICB0aGlzLmZyZWVTcGFjZS5zcGxpY2UodGhpcy5mcmVlU3BhY2UuaW5kZXhPZihyZWN0KSwgMSk7XG5cbiAgICBsZXQgcmVjdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCBmaXJzdFRlYXNlcldyYXBwZXIgPSB0aGlzLmNvbnRlbnRbdGhpcy5jb250ZW50Lmxlbmd0aCAtIDJdO1xuICAgICAgcmVjdEhlaWdodCA9XG4gICAgICAgIGZpcnN0VGVhc2VyV3JhcHBlci5oZWlnaHQgPiB0ZWFzZXJXcmFwcGVyLmhlaWdodFxuICAgICAgICAgID8gZmlyc3RUZWFzZXJXcmFwcGVyLmhlaWdodFxuICAgICAgICAgIDogdGVhc2VyV3JhcHBlci5oZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRlYXNlcldyYXBwZXIuaGVpZ2h0IDwgcmVjdEhlaWdodCkge1xuICAgICAgdGhpcy5mcmVlU3BhY2UucHVzaCh7XG4gICAgICAgIHdpZHRoOiB0ZWFzZXJXcmFwcGVyLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHJlY3RIZWlnaHQgLSB0ZWFzZXJXcmFwcGVyLmhlaWdodCAtIHRoaXMudlBhZGRpbmcsXG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB0ZWFzZXJXcmFwcGVyLmhlaWdodCArIHRoaXMudlBhZGRpbmcsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0ZWFzZXJXcmFwcGVyLndpZHRoIDwgcmVjdC53aWR0aCkge1xuICAgICAgdGhpcy5mcmVlU3BhY2UucHVzaCh7XG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoIC0gdGVhc2VyV3JhcHBlci53aWR0aCAtIHRoaXMuaFBhZGRpbmcsXG4gICAgICAgIGhlaWdodDogcmVjdEhlaWdodCxcbiAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgdGVhc2VyV3JhcHBlci53aWR0aCArIHRoaXMuaFBhZGRpbmcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmZyZWVTcGFjZSA9IHRoaXMuZnJlZVNwYWNlXG4gICAgICAuZmlsdGVyKChmKSA9PiBmLndpZHRoID4gMCAmJiBmLmhlaWdodCA+IDApXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS50b3AgLSBiLnRvcCk7XG4gIH1cblxuICBnZXRDb2x1bW5zKCkge1xuICAgIGxldCBjb2x1bW5zID0gdGhpcy5jb250ZW50LnJlZHVjZSgocHYsIHRlYXNlcldyYXBwZXIpID0+IHtcbiAgICAgIHB2W3RlYXNlcldyYXBwZXIubGVmdF0gPSBwdlt0ZWFzZXJXcmFwcGVyLmxlZnRdIHx8IFtdO1xuICAgICAgcHZbdGVhc2VyV3JhcHBlci5sZWZ0XS5wdXNoKHRlYXNlcldyYXBwZXIpO1xuICAgICAgcmV0dXJuIHB2O1xuICAgIH0sIHt9KTtcblxuICAgIC8vIFNvcnQgdGVhc2VycyBpbiBjb2x1bW5zXG4gICAgY29sdW1ucyA9IE9iamVjdC5rZXlzKGNvbHVtbnMpXG4gICAgICAuc29ydCgpXG4gICAgICAubWFwKChrZXkpID0+IGNvbHVtbnNba2V5XS5zb3J0KChhLCBiKSA9PiBhLnRvcCAtIGIudG9wKSk7XG5cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIGZpbGwoKSB7XG4gICAgLy8gRW5zdXJlIGNvcnJlY3QgYnJlYWtwb2ludFxuICAgIHRoaXMuY29udGVudC5mb3JFYWNoKCh0ZWFzZXJXcmFwcGVyKSA9PlxuICAgICAgdGVhc2VyV3JhcHBlci50ZWFzZXIuc2V0QWN0aXZlQnJlYWtwb2ludCh0aGlzLnR5cGUpXG4gICAgKTtcblxuICAgIC8vIEZpbmQgY29sdW1uc1xuICAgIGxldCBjb2x1bW5zID0gdGhpcy5nZXRDb2x1bW5zKCk7XG5cbiAgICAvLyBGaW5kIGFueSBob3Jpem9udGFsIGZyZWUgc3BhY2VcbiAgICBpZiAoY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbHVtbnNbMF0uZm9yRWFjaCgodGVhc2VyV3JhcHBlcikgPT5cbiAgICAgICAgbGF5b3V0c1t0aGlzLnR5cGVdLmNob29zZVZlcnNpb24oXG4gICAgICAgICAgdGVhc2VyV3JhcHBlci50ZWFzZXIsXG4gICAgICAgICAgdGhpcy5jb21wb3NpdGlvbnMsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICB0aGlzLmluZGV4XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZnJlZVNwYWNlXG4gICAgICAuZmlsdGVyKChyKSA9PiByLnRvcCA9PT0gMClcbiAgICAgIC5mb3JFYWNoKChmcmVlU3BhY2UpID0+IHtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gZnJlZVNwYWNlLndpZHRoICsgdGhpcy5oUGFkZGluZztcbiAgICAgICAgY29sdW1uc1xuICAgICAgICAgIC5zbGljZSgwKVxuICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAuZXZlcnkoKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IGNvbHVtblswXS53aWR0aCArIHJlbWFpbmluZ1dpZHRoO1xuXG4gICAgICAgICAgICBjb2x1bW4uZm9yRWFjaCgodGVhc2VyV3JhcHBlcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IHRlYXNlciB9ID0gdGVhc2VyV3JhcHBlcjtcbiAgICAgICAgICAgICAgdGVhc2VyLnNldFdpZHRoKFxuICAgICAgICAgICAgICAgIFtuZXdXaWR0aCwgJ2xhcmdlc3QnLCB0ZWFzZXJXcmFwcGVyLndpZHRoXSxcbiAgICAgICAgICAgICAgICBuZXdXaWR0aFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBjb25zdCB0ZWFzZXJJbmZvID0gdGVhc2VyLmdldEluZm8oKTtcbiAgICAgICAgICAgICAgdGVhc2VyV3JhcHBlci53aWR0aCA9IHRlYXNlckluZm8ud2lkdGg7XG4gICAgICAgICAgICAgIHRlYXNlcldyYXBwZXIuaGVpZ2h0ID0gdGVhc2VySW5mby5oZWlnaHQ7XG4gICAgICAgICAgICAgIHRlYXNlcldyYXBwZXIudG9wID0gdG9wO1xuICAgICAgICAgICAgICB0b3AgKz0gdGVhc2VySW5mby5oZWlnaHQgKyB0aGlzLnZQYWRkaW5nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZW1haW5pbmdXaWR0aCA9IG5ld1dpZHRoIC0gY29sdW1uWzBdLndpZHRoICsgdGhpcy5oUGFkZGluZztcblxuICAgICAgICAgICAgcmV0dXJuIHJlbWFpbmluZ1dpZHRoID4gMDtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgc2V0SGVpZ2h0KFxuICAgICAgICBjb2x1bW5zLFxuICAgICAgICB0aGlzLnZQYWRkaW5nLFxuICAgICAgICBsYXlvdXRzW3RoaXMudHlwZV0uZ2V0QXZhaWxhYmxlU2l6ZXModGhpcy5pbmRleCksXG4gICAgICAgIHRoaXMuZmlyc3RDb250YWluZXJcbiAgICAgICk7XG4gICAgICBzaHJpbmsoY29sdW1ucy5sZW5ndGggLSAxLCBjb2x1bW5zLCB0aGlzLnZQYWRkaW5nKTtcbiAgICAgIGNvbnN0IGRpZmYgPSBnZXRIZWlnaHREaWZmKGNvbHVtbnMsIHRoaXMudlBhZGRpbmcsIHRydWUpO1xuICAgICAgaWYgKGRpZmYgPCBsYXlvdXRzW3RoaXMudHlwZV0uYnJlYWtPbkRpZmYpIHtcbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGNvbHVtbnMgPSBbXG4gICAgICAgICAgY29sdW1ucy5yZWR1Y2UoXG4gICAgICAgICAgICAocHYsIGNvbHVtbikgPT5cbiAgICAgICAgICAgICAgcHYuY29uY2F0KFxuICAgICAgICAgICAgICAgIGNvbHVtbi5tYXAoKHRlYXNlcldyYXBwZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGVhc2VyIH0gPSB0ZWFzZXJXcmFwcGVyO1xuICAgICAgICAgICAgICAgICAgdGVhc2VyLnNldFZlcnNpb24oJ2ltYWdlTGVmdCcpO1xuICAgICAgICAgICAgICAgICAgdGVhc2VyLnNldFdpZHRoKFt0aGlzLnR5cGUsICdsYXJnZXN0J10pO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdGVhc2VySW5mbyA9IHRlYXNlci5nZXRJbmZvKCk7XG4gICAgICAgICAgICAgICAgICB0ZWFzZXJXcmFwcGVyLndpZHRoID0gdGVhc2VySW5mby53aWR0aDtcbiAgICAgICAgICAgICAgICAgIHRlYXNlcldyYXBwZXIuaGVpZ2h0ID0gdGVhc2VySW5mby5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICB0ZWFzZXJXcmFwcGVyLnRvcCA9IHRvcDtcbiAgICAgICAgICAgICAgICAgIHRlYXNlcldyYXBwZXIubGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgICB0b3AgKz0gdGVhc2VySW5mby5oZWlnaHQgKyB0aGlzLnZQYWRkaW5nO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlYXNlcldyYXBwZXI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFtdXG4gICAgICAgICAgKSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uc1swXS5mb3JFYWNoKCh0ZWFzZXJXcmFwcGVyKSA9PiB7XG4gICAgICAgIHRlYXNlcldyYXBwZXIudGVhc2VyLnNldE1pbkltYWdlSGVpZ2h0KCk7XG4gICAgICAgIHRlYXNlcldyYXBwZXIudGVhc2VyLnNldE1heEltYWdlSGVpZ2h0KCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDb29yZGluYXRlcyhjb2x1bW5zLCB0aGlzLmx0ciwgdGhpcy52UGFkZGluZywgdGhpcy5oUGFkZGluZyk7XG5cbiAgICBjb25zdCBjb21wb3NpdGlvbnMgPSB0aGlzLmdldENvbHVtbnMoKS5tYXAoXG4gICAgICAoY29sdW1uKSA9PlxuICAgICAgICBgJHtjb2x1bW5bMF0ud2lkdGh9LSR7XG4gICAgICAgICAgY29sdW1uWzBdLnRlYXNlci5hY3RpdmVCcmVha3BvaW50XG4gICAgICAgICAgICA/IGNvbHVtblswXS50ZWFzZXIuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUudmVyc2lvblxuICAgICAgICAgICAgOiAnZGVmYXVsdCdcbiAgICAgICAgfWBcbiAgICApO1xuXG4gICAgdGhpcy5jb21wb3NpdGlvbnMucHVzaChjb21wb3NpdGlvbnMpO1xuICAgIHJldHVybiB7XG4gICAgICBjb21wb3NpdGlvbnMsXG4gICAgICBjb2x1bW5zOiB0aGlzLmdldENvbHVtbnMoKSxcbiAgICAgIHdpZHRoOiB0aGlzLnR5cGUsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnQsXG4gICAgfTtcbiAgfVxuXG4gIGFkZCh0ZWFzZXIsIGdyb3VwVHlwZSwgcmV0cnkpIHtcbiAgICBpZiAodGhpcy5vcGVuID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRlYXNlci5zZXRBY3RpdmVCcmVha3BvaW50KHRoaXMudHlwZSk7XG5cbiAgICBpZiAodGhpcy5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3Qgc2l6ZXMgPSBsYXlvdXRzW3RoaXMudHlwZV0uZ2V0SW5pdGlhbFRlYXNlclNpemUoXG4gICAgICAgIHRlYXNlcixcbiAgICAgICAgdGhpcy5jb21wb3NpdGlvbnNcbiAgICAgICk7XG4gICAgICB0ZWFzZXIuc2V0V2lkdGgoc2l6ZXMpO1xuICAgICAgY29uc3QgdGVhc2VySW5mbyA9IHRlYXNlci5nZXRJbmZvKCk7XG4gICAgICB0aGlzLmNvbnRlbnQucHVzaCh7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IHRlYXNlckluZm8ud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGVhc2VySW5mby5oZWlnaHQsXG4gICAgICAgIHRlYXNlcixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGVhc2VyLmZpcnN0VGVhc2VyKSB7XG4gICAgICAgIHRoaXMuZmlyc3RDb250YWluZXIgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZvcmNlU2Vjb25kVGVhc2VyID0gIXRlYXNlci5oYXNTaXplKHRoaXMudHlwZSk7XG5cbiAgICAgIHRoaXMudXBkYXRlRnJlZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGF5b3V0c1t0aGlzLnR5cGVdLmNob29zZVZlcnNpb24oXG4gICAgICB0ZWFzZXIsXG4gICAgICB0aGlzLmNvbXBvc2l0aW9ucyxcbiAgICAgIGZhbHNlLFxuICAgICAgdGhpcy5pbmRleCxcbiAgICAgIGdyb3VwVHlwZVxuICAgICk7XG5cbiAgICBjb25zdCBmb3VuZEZyZWVTcGFjZSA9ICF0aGlzLmZyZWVTcGFjZVxuICAgICAgLnNvcnQoKHIxLCByMikgPT4gcjIudG9wIC0gcjEudG9wKVxuICAgICAgLmV2ZXJ5KChyZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IHJlY3QuaGVpZ2h0ICsgdGhpcy5nZXRNYXhIZWlnaHQocmVjdC5sZWZ0KTtcbiAgICAgICAgaWYgKHRlYXNlci5zZXRXaWR0aEJlc3RGaXQocmVjdC53aWR0aCwgYXZhaWxhYmxlSGVpZ2h0LCByZWN0LnRvcCA+IDApKSB7XG4gICAgICAgICAgY29uc3QgdGVhc2VySW5mbyA9IHRlYXNlci5nZXRJbmZvKCk7XG5cbiAgICAgICAgICB0aGlzLmNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgd2lkdGg6IHRlYXNlckluZm8ud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRlYXNlckluZm8uaGVpZ2h0LFxuICAgICAgICAgICAgdGVhc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMudXBkYXRlRnJlZShyZWN0KTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgLy8gU2Vjb25kIGl0ZW0gaXMgdG8gd2lkZSBmb3IgZW1wdHkgc3BhY2UuIFRyeSBkZWNyZWFzaW5nIHRoZSBmaXJzdCBpdGVtXG4gICAgaWYgKCFmb3VuZEZyZWVTcGFjZSAmJiAhcmV0cnkgJiYgdGhpcy5jb250ZW50Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZmlyc3RUZWFzZXIgPSB0aGlzLmNvbnRlbnRbMF07XG4gICAgICBpZiAoIWZpcnN0VGVhc2VyKSB7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVtYWluaW5nV2lkdGggPSB0aGlzLnR5cGUgLSBmaXJzdFRlYXNlci53aWR0aCAtIHRoaXMuaFBhZGRpbmc7XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPiAwICYmICF0ZWFzZXIuaGFzU2l6ZShyZW1haW5pbmdXaWR0aCkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0U2l6ZSA9IHRlYXNlci5nZXRTbWFsbGVzdFNpemUocmVtYWluaW5nV2lkdGgpO1xuICAgICAgICBmaXJzdFRlYXNlci50ZWFzZXIuc2V0QWN0aXZlQnJlYWtwb2ludCh0aGlzLnR5cGUpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGFyZ2V0U2l6ZSAmJlxuICAgICAgICAgIGZpcnN0VGVhc2VyLnRlYXNlci5oYXNTaXplKFxuICAgICAgICAgICAgdGhpcy50eXBlIC0gdGFyZ2V0U2l6ZS53aWR0aCAtIHRoaXMuaFBhZGRpbmdcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuZnJlZVNwYWNlID0gW107XG4gICAgICAgICAgZmlyc3RUZWFzZXIudGVhc2VyLnNldFdpZHRoKFtcbiAgICAgICAgICAgIHRoaXMudHlwZSAtIHRhcmdldFNpemUud2lkdGggLSB0aGlzLmhQYWRkaW5nLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGNvbnN0IGZpcnN0VGVhc2VySW5mbyA9IGZpcnN0VGVhc2VyLnRlYXNlci5nZXRJbmZvKCk7XG4gICAgICAgICAgZmlyc3RUZWFzZXIud2lkdGggPSBmaXJzdFRlYXNlckluZm8ud2lkdGg7XG4gICAgICAgICAgZmlyc3RUZWFzZXIuaGVpZ2h0ID0gZmlyc3RUZWFzZXJJbmZvLmhlaWdodDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZyZWUoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGQodGVhc2VyLCBncm91cFR5cGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuID0gZm91bmRGcmVlU3BhY2U7XG5cbiAgICByZXR1cm4gdGhpcy5vcGVuO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQucmVkdWNlKChjb250YWluZXJIZWlnaHQsIGNvbnRhaW5lckl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHsgdG9wIH0gPSBjb250YWluZXJJdGVtO1xuICAgICAgY29uc3QgeyBoZWlnaHQgfSA9IGNvbnRhaW5lckl0ZW0udGVhc2VyLmdldEluZm8oKTtcblxuICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGNvbnRhaW5lckhlaWdodCkge1xuICAgICAgICByZXR1cm4gdG9wICsgaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xuICAgIH0sIDApO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRhaW5lciB9O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNzc21xIGZyb20gJ2Nzcy1tZWRpYXF1ZXJ5JztcblxuaW1wb3J0IGRlYnVnIGZyb20gJy4vbG9nLmpzJztcblxuY29uc3QgbWVkaWFxdWVyeVBhdHRlcm4gPSAvXkBtZWRpYVxccysoW157XSspLztcblxuY29uc3QgZGVmYXVsdEJyZWFrcG9pbnRzID0ge1xuICB2ZXJzaW9uOiAnZGVmYXVsdCcsXG4gIGxheW91dDogW10sXG59O1xuXG5jb25zdCBkZWZhdWx0VmVyc2lvbiA9IHtcbiAgaGVpZ2h0OiAwLFxuICBmb250U2l6ZTogMSxcbn07XG5cbmZ1bmN0aW9uIHNvcnRUZWFzZXJzKGEsIGIpIHtcbiAgY29uc3QgcyA9IGIud2lkdGggLSBhLndpZHRoO1xuICBpZiAocyA9PT0gMCkge1xuICAgIHJldHVybiBiLmhlaWdodCAtIGEuaGVpZ2h0O1xuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBzb3J0VGVhc2Vyc0FzYyhhLCBiKSB7XG4gIGNvbnN0IHMgPSBhLndpZHRoIC0gYi53aWR0aDtcblxuICBpZiAocyA9PT0gMCkge1xuICAgIHJldHVybiBiLmhlaWdodCAtIGEuaGVpZ2h0O1xuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhb2lQZXJjZW50YWdlKG51bSwgcGVyKSB7XG4gIHJldHVybiBudW0gKiAoKDEwMCAtIHBlcikgLyAxMDApO1xufVxuXG5jbGFzcyBUZWFzZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxhc3RJdGVtID0gb3B0aW9ucy5sYXN0SXRlbTtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0ge307XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgdGhpcy5jc3MgPSBvcHRpb25zLmNzcyB8fCB7IGdlbmVyYWw6IFtdIH07XG4gICAgdGhpcy5wcmVtaXVtID0gISFvcHRpb25zLnByZW1pdW07XG4gICAgdGhpcy5pbXBvcnRhbnQgPSAhIW9wdGlvbnMuaXNJbXBvcnRhbnQ7XG4gICAgdGhpcy5oYXNJbWFnZSA9IG9wdGlvbnMuaGFzSW1hZ2U7XG4gICAgdGhpcy5maXJzdFRlYXNlciA9ICEhb3B0aW9ucy5maXJzdFRlYXNlcjtcbiAgICB0aGlzLmhlaWdodFBlcmNlbnRhZ2UgPVxuICAgICAgb3B0aW9ucy5pbWdBb2kgJiYgb3B0aW9ucy5pbWdBb2kuaGVpZ2h0UGVyY2VudGFnZVxuICAgICAgICA/IG9wdGlvbnMuaW1nQW9pLmhlaWdodFBlcmNlbnRhZ2VcbiAgICAgICAgOiAwO1xuICAgIHRoaXMud2lkdGhQZXJjZW50YWdlID1cbiAgICAgIG9wdGlvbnMuaW1nQW9pICYmIG9wdGlvbnMuaW1nQW9pLndpZHRoUGVyY2VudGFnZVxuICAgICAgICA/IG9wdGlvbnMuaW1nQW9pLndpZHRoUGVyY2VudGFnZVxuICAgICAgICA6IDA7XG4gICAgdGhpcy5hb2kgPSBvcHRpb25zLmltZ0FvaTtcbiAgICB0aGlzLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XG4gICAgdGhpcy50eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIGlmIChvcHRpb25zLmxheW91dCkge1xuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5sYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBicmVha3BvaW50ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludCAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkQnJlYWtQb2ludChicmVha3BvaW50LCBvcHRpb25zLmxheW91dFtrZXldLCBrZXkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQnJlYWtQb2ludChicmVha3BvaW50LCBsYXlvdXQgPSBbXSwga2V5KSB7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gPSB7IC4uLmRlZmF1bHRCcmVha3BvaW50cyB9O1xuXG4gICAgLy8gRmxhdHRlbiBsYXlvdXQgb2JqZWN0XG4gICAgdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XS5sYXlvdXQgPSBsYXlvdXQucmVkdWNlKChyZXN1bHQsIGwpID0+IHtcbiAgICAgIGlmICghbC52ZXJzaW9ucykge1xuICAgICAgICByZXN1bHQucHVzaCh7IHZlcnNpb246ICdkZWZhdWx0Jywgd2lkdGg6IGwud2lkdGgsIC4uLmRlZmF1bHRWZXJzaW9uIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdC5jb25jYXQoXG4gICAgICAgIE9iamVjdC5rZXlzKGwudmVyc2lvbnMpLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICAgIC8vIENob29zZSBjb3JyZWN0IGR5bmFtaWMgdmVyc2lvblxuICAgICAgICAgIGNvbnN0IG1hc3RlclZlcnNpb24gPSBsLnZlcnNpb25zW3ZlcnNpb25dWzBdO1xuXG4gICAgICAgICAgY29uc3QgZHluYW1pY1ZlcnNpb24gPSBsLnZlcnNpb25zW3ZlcnNpb25dXG4gICAgICAgICAgICAuc2xpY2UoMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHZlcikgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXZlciB8fCAhdmVyLnRlc3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IHRlc3RGdW5jO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlc3RGdW5jID0gbmV3IEZ1bmN0aW9uKCdkYXRhJywgdmVyLnRlc3QpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZGVidWcubG9nKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGVzdEZ1bmModGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5oZWlnaHQgLSBiLmhlaWdodClcbiAgICAgICAgICAgIC5wb3AoKTtcblxuICAgICAgICAgIGlmIChkeW5hbWljVmVyc2lvbiAmJiBkeW5hbWljVmVyc2lvbi5oZWlnaHQgPiBtYXN0ZXJWZXJzaW9uLmhlaWdodCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZHluYW1pY1ZlcnNpb24pLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgaWYgKGsgPT09ICdzdHlsZXMnKSB7XG4gICAgICAgICAgICAgICAgbWFzdGVyVmVyc2lvbi5zdHlsZXMgPSBtYXN0ZXJWZXJzaW9uLnN0eWxlcy5jb25jYXQoXG4gICAgICAgICAgICAgICAgICBkeW5hbWljVmVyc2lvbi5zdHlsZXNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hc3RlclZlcnNpb25ba10gPSBkeW5hbWljVmVyc2lvbltrXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgICB3aWR0aDogbC53aWR0aCxcbiAgICAgICAgICAgIC4uLmRlZmF1bHRWZXJzaW9uLFxuICAgICAgICAgICAgLi4ubWFzdGVyVmVyc2lvbixcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LCBbXSk7XG4gICAgdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XS50eXBlID0ga2V5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0QWN0aXZlQnJlYWtwb2ludCh2aWV3cG9ydFdpZHRoKSB7XG4gICAgLy8gVGVzdCBpZiB3ZSBoYXZlIGEgYnJlYWtwb2ludCBiZWxvdyB0aGUgdmlld3BvcnQgd2lkdGhcbiAgICBsZXQgYWN0aXZlQnJlYWtwb2ludCA9IE9iamVjdC5rZXlzKHRoaXMuYnJlYWtwb2ludHMpXG4gICAgICAuZmlsdGVyKChrZXkpID0+IGtleSA8PSB2aWV3cG9ydFdpZHRoKVxuICAgICAgLnNvcnQoKVxuICAgICAgLnBvcCgpO1xuXG4gICAgaWYgKGFjdGl2ZUJyZWFrcG9pbnQpIHtcbiAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludHNbYWN0aXZlQnJlYWtwb2ludF07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBub3QsIGdldCB0aGUgc21hbGxlcyBicmVha3BvaW50XG4gICAgYWN0aXZlQnJlYWtwb2ludCA9IE9iamVjdC5rZXlzKHRoaXMuYnJlYWtwb2ludHMpLnNvcnQoKS5zaGlmdCgpO1xuXG4gICAgdGhpcy5hY3RpdmVCcmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50c1thY3RpdmVCcmVha3BvaW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFdpZHRoKHdpZHRocywgbWF4TWluV2lkdGggPSAxMDAwMCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHdpZHRocy5ldmVyeSgoYXZhaWxhYmxlV2lkdGgpID0+IHtcbiAgICAgIGxldCB2ZXJzaW9uO1xuICAgICAgaWYgKGF2YWlsYWJsZVdpZHRoID09PSAnbGFyZ2VzdCcpIHtcbiAgICAgICAgdmVyc2lvbiA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5sYXlvdXRcbiAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKGxheW91dCkgPT5cbiAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvbiAmJlxuICAgICAgICAgICAgICAgIGxheW91dC52ZXJzaW9uICE9PSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvblxuICAgICAgICAgICAgICApICYmIGxheW91dC53aWR0aCA8PSBtYXhNaW5XaWR0aFxuICAgICAgICAgIClcbiAgICAgICAgICAuc29ydChzb3J0VGVhc2VycylcbiAgICAgICAgICAuc2hpZnQoKTtcblxuICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUgPSB2ZXJzaW9uO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZlcnNpb24gPSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQubGF5b3V0XG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgKGxheW91dCkgPT5cbiAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uICYmXG4gICAgICAgICAgICAgIGxheW91dC52ZXJzaW9uICE9PSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvblxuICAgICAgICAgICAgKSAmJiBsYXlvdXQud2lkdGggPT09IGF2YWlsYWJsZVdpZHRoXG4gICAgICAgIClcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuaGVpZ2h0IC0gYS5oZWlnaHQpXG4gICAgICAgIC5zaGlmdCgpO1xuXG4gICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlID0gdmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmU7XG4gIH1cblxuICBoYXNTaXplKHNpemUpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlQnJlYWtwb2ludCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQubGF5b3V0XG4gICAgICAuZmlsdGVyKFxuICAgICAgICAobGF5b3V0KSA9PlxuICAgICAgICAgICEoXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvbiAmJlxuICAgICAgICAgICAgbGF5b3V0LnZlcnNpb24gIT09IHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uXG4gICAgICAgICAgKSAmJiBsYXlvdXQud2lkdGggPT09IHNpemVcbiAgICAgIClcbiAgICAgIC5zb3J0KHNvcnRUZWFzZXJzQXNjKVxuICAgICAgLnNoaWZ0KCk7XG5cbiAgICByZXR1cm4gISF2ZXJzaW9uO1xuICB9XG5cbiAgZ2V0U21hbGxlc3RTaXplKHNpemUpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlQnJlYWtwb2ludCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQubGF5b3V0XG4gICAgICAuZmlsdGVyKFxuICAgICAgICAobGF5b3V0KSA9PlxuICAgICAgICAgICEoXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvbiAmJlxuICAgICAgICAgICAgbGF5b3V0LnZlcnNpb24gIT09IHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uXG4gICAgICAgICAgKSAmJiBsYXlvdXQud2lkdGggPj0gc2l6ZVxuICAgICAgKVxuICAgICAgLnNvcnQoc29ydFRlYXNlcnNBc2MpXG4gICAgICAuc2hpZnQoKTtcblxuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbiAgc2V0V2lkdGhCZXN0Rml0KGF2YWlsYWJsZVdpZHRoLCBhdmFpbGFibGVIZWlnaHQsIGZpeGVkV2lkdGgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlQnJlYWtwb2ludCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQubGF5b3V0XG4gICAgICAuZmlsdGVyKFxuICAgICAgICAobGF5b3V0KSA9PlxuICAgICAgICAgICEoXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvbiAmJlxuICAgICAgICAgICAgbGF5b3V0LnZlcnNpb24gIT09IHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uXG4gICAgICAgICAgKSAmJlxuICAgICAgICAgICghZml4ZWRXaWR0aFxuICAgICAgICAgICAgPyBsYXlvdXQud2lkdGggPD0gYXZhaWxhYmxlV2lkdGhcbiAgICAgICAgICAgIDogbGF5b3V0LndpZHRoID09PSBhdmFpbGFibGVXaWR0aCkgJiZcbiAgICAgICAgICBsYXlvdXQuaGVpZ2h0IC0gKGxheW91dC5taW5IZWlnaHQgfHwgMCkgPD0gYXZhaWxhYmxlSGVpZ2h0XG4gICAgICApXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAodGhpcy5oYXNJbWFnZSkge1xuICAgICAgICAgIHJldHVybiBzb3J0VGVhc2VycyhhLCBiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS53aWR0aCAtIGIud2lkdGg7XG4gICAgICB9KVxuICAgICAgLnNoaWZ0KCk7XG5cbiAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlID0gdmVyc2lvbjtcblxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlO1xuICB9XG5cbiAgZGVjcmVhc2VTaXplKGRyeVJ1bikge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmVyc2lvbiA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5sYXlvdXRcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChsYXlvdXQpID0+XG4gICAgICAgICAgIShcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uICYmXG4gICAgICAgICAgICBsYXlvdXQudmVyc2lvbiAhPT0gdGhpcy5hY3RpdmVCcmVha3BvaW50LnZlcnNpb25cbiAgICAgICAgICApICYmIGxheW91dC53aWR0aCA8IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUud2lkdGhcbiAgICAgIClcbiAgICAgIC5zb3J0KHNvcnRUZWFzZXJzKVxuICAgICAgLnNoaWZ0KCk7XG5cbiAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZHJ5UnVuKSB7XG4gICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlID0gdmVyc2lvbjtcblxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlO1xuICB9XG5cbiAgaW5jcmVhc2VTaXplKGRyeVJ1bikge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmVyc2lvbiA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5sYXlvdXRcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChsYXlvdXQpID0+XG4gICAgICAgICAgIShcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uICYmXG4gICAgICAgICAgICBsYXlvdXQudmVyc2lvbiAhPT0gdGhpcy5hY3RpdmVCcmVha3BvaW50LnZlcnNpb25cbiAgICAgICAgICApICYmIGxheW91dC53aWR0aCA+IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUud2lkdGhcbiAgICAgIClcbiAgICAgIC5zb3J0KHNvcnRUZWFzZXJzQXNjKVxuICAgICAgLnNoaWZ0KCk7XG5cbiAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZHJ5UnVuKSB7XG4gICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlID0gdmVyc2lvbjtcblxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlO1xuICB9XG5cbiAgc2V0VmVyc2lvbih2ZXJzaW9uLCB3aWR0aCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHZhbGlkVmVyc2lvbjtcbiAgICBpZiAod2lkdGgpIHtcbiAgICAgIHZhbGlkVmVyc2lvbiA9XG4gICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5sYXlvdXQuZmlsdGVyKFxuICAgICAgICAgIChsKSA9PiBsLndpZHRoID09PSB3aWR0aCAmJiBsLnZlcnNpb24gPT09IHZlcnNpb25cbiAgICAgICAgKS5sZW5ndGggIT09IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkVmVyc2lvbiA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5sYXlvdXQuc29tZShcbiAgICAgICAgKGwpID0+IGwudmVyc2lvbiA9PT0gdmVyc2lvblxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRWZXJzaW9uKSB7XG4gICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC52ZXJzaW9uID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRWZXJzaW9uO1xuICB9XG5cbiAgZ2V0U3R5bGVzKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50IHx8ICF0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGVzID0geyBjb21tb246IFtdLCBtZWRpYXF1ZXJpZXM6IFtdLCBhbmltYXRpb25zOiBbXSB9O1xuICAgIHRoaXMuY3NzLmdlbmVyYWwuZm9yRWFjaCgoY3NzKSA9PiB7XG4gICAgICBjc3MgPSBjc3MudHJpbSgpO1xuICAgICAgY29uc3QgbWVkaWFxdWVyeSA9IGNzcy5tYXRjaChtZWRpYXF1ZXJ5UGF0dGVybik7XG4gICAgICBpZiAobWVkaWFxdWVyeSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY3NzbXEubWF0Y2gobWVkaWFxdWVyeVsxXSwge1xuICAgICAgICAgICAgdHlwZTogJ3NjcmVlbicsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5hY3RpdmVCcmVha3BvaW50LnR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc3R5bGVzLm1lZGlhcXVlcmllcy5wdXNoKGNzcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlcy5jb21tb24ucHVzaChjc3MpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY3NzLmFuaW1hdGlvbnMpIHtcbiAgICAgIHN0eWxlcy5hbmltYXRpb25zID0gc3R5bGVzLmFuaW1hdGlvbnMuY29uY2F0KHRoaXMuY3NzLmFuaW1hdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLnN0eWxlcykge1xuICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5zdHlsZXMuZm9yRWFjaCgoY3NzKSA9PiB7XG4gICAgICAgIGNzcyA9IGNzcy50cmltKCk7XG4gICAgICAgIGNvbnN0IG1lZGlhcXVlcnkgPSBjc3MubWF0Y2gobWVkaWFxdWVyeVBhdHRlcm4pO1xuICAgICAgICBpZiAobWVkaWFxdWVyeSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNzc21xLm1hdGNoKG1lZGlhcXVlcnlbMV0sIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3NjcmVlbicsXG4gICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudHlwZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzdHlsZXMubWVkaWFxdWVyaWVzLnB1c2goY3NzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVzLmNvbW1vbi5wdXNoKGNzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uID0gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS52ZXJzaW9uIHx8ICdkZWZhdWx0JztcbiAgICBpZiAodGhpcy5jc3NbdmVyc2lvbl0pIHtcbiAgICAgIHRoaXMuY3NzW3ZlcnNpb25dLmZvckVhY2goKGNzcykgPT4ge1xuICAgICAgICBjc3MgPSBjc3MudHJpbSgpO1xuICAgICAgICBjb25zdCBtZWRpYXF1ZXJ5ID0gY3NzLm1hdGNoKG1lZGlhcXVlcnlQYXR0ZXJuKTtcbiAgICAgICAgaWYgKG1lZGlhcXVlcnkpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjc3NtcS5tYXRjaChtZWRpYXF1ZXJ5WzFdLCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzY3JlZW4nLFxuICAgICAgICAgICAgICB3aWR0aDogdGhpcy5hY3RpdmVCcmVha3BvaW50LnR5cGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3R5bGVzLm1lZGlhcXVlcmllcy5wdXNoKGNzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlcy5jb21tb24ucHVzaChjc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbW1vbjogc3R5bGVzLmNvbW1vbi5qb2luKCdcXG4nKSxcbiAgICAgIG1lZGlhcXVlcmllczogc3R5bGVzLm1lZGlhcXVlcmllcy5qb2luKCdcXG4nKSxcbiAgICAgIGFuaW1hdGlvbnM6IHN0eWxlcy5hbmltYXRpb25zLmpvaW4oJ1xcbicpLFxuICAgIH07XG4gIH1cblxuICBnZXRJbmZvKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVCcmVha3BvaW50IHx8ICF0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlO1xuICB9XG5cbiAgY2FsY3VsYXRlUmVkdWN0aW9uKG1pbkhlaWdodCwgc2l6ZSwgbWluSW1hZ2VIZWlnaHQsIGltYWdlSGVpZ2h0KSB7XG4gICAgbGV0IHJlZHVjdGlvbiA9IE1hdGgubWluKG1pbkhlaWdodCwgc2l6ZSk7XG5cbiAgICBpZiAobWluSW1hZ2VIZWlnaHQpIHtcbiAgICAgIGNvbnN0IG1heFJlZHVjdGlvbiA9XG4gICAgICAgIGltYWdlSGVpZ2h0IC0gbWluSW1hZ2VIZWlnaHQgPCAwID8gMCA6IGltYWdlSGVpZ2h0IC0gbWluSW1hZ2VIZWlnaHQ7XG4gICAgICByZWR1Y3Rpb24gPSByZWR1Y3Rpb24gPCBtYXhSZWR1Y3Rpb24gPyByZWR1Y3Rpb24gOiBtYXhSZWR1Y3Rpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZHVjdGlvbjtcbiAgfVxuXG4gIHNocmluayhzaXplKSB7XG4gICAgaWYgKFxuICAgICAgIXNpemUgfHxcbiAgICAgICF0aGlzLmFvaSB8fFxuICAgICAgIXRoaXMuYWN0aXZlQnJlYWtwb2ludCB8fFxuICAgICAgIXRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmVcbiAgICApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjb25zdCB7IGltYWdlSGVpZ2h0LCBtaW5JbWFnZUhlaWdodCB9ID0gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZTtcblxuICAgIGlmIChpbWFnZUhlaWdodCAmJiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLnZlcnNpb24gPT09ICdkZWZhdWx0Jykge1xuICAgICAgbGV0IG1pbkhlaWdodCA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUubWluSGVpZ2h0IHx8IDA7XG5cbiAgICAgIGNvbnN0IHJlZHVjdGlvbiA9IHRoaXMuY2FsY3VsYXRlUmVkdWN0aW9uKFxuICAgICAgICBtaW5IZWlnaHQsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG1pbkltYWdlSGVpZ2h0LFxuICAgICAgICBpbWFnZUhlaWdodFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2NhbGUgPSBpbWFnZUhlaWdodCAvIHRoaXMuYW9pLm9yZ0hlaWdodDtcbiAgICAgIGNvbnN0IGFvaVRvcCA9IHRoaXMuYW9pLnkgKiBzY2FsZTtcbiAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VIZWlnaHQgLT0gcmVkdWN0aW9uIHx8IDA7XG4gICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmhlaWdodCAtPSByZWR1Y3Rpb247XG4gICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmltYWdlVG9wID1cbiAgICAgICAgKE1hdGgubWluKGFvaVRvcCwgcmVkdWN0aW9uKSAvXG4gICAgICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5pbWFnZUhlaWdodCkgKlxuICAgICAgICAxMDA7XG4gICAgICByZXR1cm4gcmVkdWN0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZ2V0SW1hZ2VXaWR0aChleHBhbnNpb24sIHJhdGlvKSB7XG4gICAgY29uc3QgdGVtcFdpZHRoID1cbiAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VXaWR0aCB8fFxuICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS53aWR0aDtcbiAgICBjb25zdCBpbWFnZVdpZHRoID0gdGVtcFdpZHRoICsgZXhwYW5zaW9uICogcmF0aW87XG5cbiAgICByZXR1cm4ge1xuICAgICAgaW1hZ2VXaWR0aCxcbiAgICAgIGltYWdlV2lkdGhQZXJjZW50YWdlOlxuICAgICAgICAoaW1hZ2VXaWR0aCAvIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUud2lkdGgpICogMTAwLFxuICAgIH07XG4gIH1cblxuICBncm93KHNpemUpIHtcbiAgICBpZiAoIXNpemUgfHwgIXRoaXMuYWN0aXZlQnJlYWtwb2ludCB8fCAhdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHsgaW1hZ2VIZWlnaHQgfSA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmU7XG4gICAgaWYgKFxuICAgICAgaW1hZ2VIZWlnaHQgJiZcbiAgICAgIHRoaXMuYW9pICYmXG4gICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLnZlcnNpb24gPT09ICdkZWZhdWx0J1xuICAgICkge1xuICAgICAgY29uc3QgbWluSGVpZ2h0ID0gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5taW5IZWlnaHQgfHwgMDtcbiAgICAgIGxldCBleHBhbnNpb24gPSBNYXRoLm1pbihtaW5IZWlnaHQsIHNpemUpO1xuICAgICAgY29uc3Qgc2NhbGUgPSBpbWFnZUhlaWdodCAvIHRoaXMuYW9pLm9yZ0hlaWdodDtcbiAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5hb2kub3JnV2lkdGggLyB0aGlzLmFvaS5vcmdIZWlnaHQ7XG4gICAgICBjb25zdCBhb2lMZWZ0ID0gdGhpcy5hb2kueCAqIHNjYWxlO1xuXG4gICAgICBpZiAoZXhwYW5zaW9uKSB7XG4gICAgICAgIGxldCBpbWFnZVdpZHRoSW5mbyA9IHRoaXMuZ2V0SW1hZ2VXaWR0aChleHBhbnNpb24sIHJhdGlvKTtcblxuICAgICAgICBjb25zdCBhb2lWaXNpYmxlID0gTWF0aC5hYnModGhpcy5hb2kud2lkdGhQZXJjZW50YWdlIC0gMTAwKTtcbiAgICAgICAgY29uc3QgaW1hZ2VWaXNpYmxlID0gTWF0aC5hYnMoXG4gICAgICAgICAgMTAwIC0gaW1hZ2VXaWR0aEluZm8uaW1hZ2VXaWR0aFBlcmNlbnRhZ2VcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGFvaVZpc2libGUgPCBpbWFnZVZpc2libGUpIHtcbiAgICAgICAgICAvLyBJZiBhb2kgaXMgb3V0c2lkZSB2aWV3LCByZWNhbGN1bGF0ZSBleHBhbnNpb25cbiAgICAgICAgICBleHBhbnNpb24gKj0gYW9pVmlzaWJsZSAvIDEwMDtcbiAgICAgICAgICBpbWFnZVdpZHRoSW5mbyA9IHRoaXMuZ2V0SW1hZ2VXaWR0aChleHBhbnNpb24sIHJhdGlvKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmltYWdlSGVpZ2h0ICs9IGV4cGFuc2lvbjtcbiAgICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5oZWlnaHQgKz0gZXhwYW5zaW9uO1xuXG4gICAgICAgIGNvbnN0IGltYWdlV2lkdGhEaWZmID1cbiAgICAgICAgICBpbWFnZVdpZHRoSW5mby5pbWFnZVdpZHRoIC0gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS53aWR0aDtcbiAgICAgICAgaWYgKGltYWdlV2lkdGhEaWZmID4gMCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VXaWR0aFBlcmNlbnQgPVxuICAgICAgICAgICAgaW1hZ2VXaWR0aEluZm8uaW1hZ2VXaWR0aFBlcmNlbnRhZ2U7XG4gICAgICAgICAgY29uc3QgaW1hZ2VMZWZ0ID0gTWF0aC5taW4oYW9pTGVmdCwgaW1hZ2VXaWR0aERpZmYpO1xuICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VMZWZ0ID1cbiAgICAgICAgICAgIChpbWFnZUxlZnQgLyB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLndpZHRoKSAqIDEwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHBhbnNpb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0ltYWdlID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgZXhwYW5zaW9uID0gTWF0aC5taW4oXG4gICAgICAgIHNpemUsXG4gICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaGVpZ2h0IC9cbiAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmxpbmVDb3VudFxuICAgICAgKTtcbiAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUudmVydGljYWxQYWRkaW5nID0gZXhwYW5zaW9uO1xuICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5oZWlnaHQgKz0gZXhwYW5zaW9uO1xuICAgICAgcmV0dXJuIGV4cGFuc2lvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHNldE1pbkltYWdlSGVpZ2h0KCkge1xuICAgIGlmICh0aGlzLmFvaSAmJiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQgJiYgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZSkge1xuICAgICAgY29uc3QgeyBpbWFnZUhlaWdodCB9ID0gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZTtcblxuICAgICAgY29uc3QgaW1hZ2VIZWlnaHRQZXJjZW50YWdlID1cbiAgICAgICAgKGltYWdlSGVpZ2h0IC8gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5oZWlnaHQpICogMTAwO1xuXG4gICAgICBjb25zdCBzY2FsZSA9IGltYWdlSGVpZ2h0IC8gdGhpcy5hb2kub3JnSGVpZ2h0O1xuXG4gICAgICBjb25zdCBhb2lUb3AgPSB0aGlzLmFvaS55ICogc2NhbGU7XG4gICAgICBpZiAoaW1hZ2VIZWlnaHQgJiYgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS52ZXJzaW9uID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgLy8gVG9kbyBtb3ZlIHRoaXMgdG8gbGF5b3V0LWRlZmluaXRpb25zIGNvbmZpZ1xuICAgICAgICBjb25zdCBoZWlnaHRQZXJjZW50YWdlID1cbiAgICAgICAgICBwYXJzZUludCh0aGlzLmFjdGl2ZUJyZWFrcG9pbnQudHlwZSwgMTApID09PSA1MDBcbiAgICAgICAgICAgID8gTWF0aC5tYXgoNzUsIHRoaXMuYW9pLmhlaWdodFBlcmNlbnRhZ2UpXG4gICAgICAgICAgICA6IHRoaXMuYW9pLmhlaWdodFBlcmNlbnRhZ2U7XG4gICAgICAgIGNvbnN0IHJlZHVjdGlvbiA9XG4gICAgICAgICAgaW1hZ2VIZWlnaHRQZXJjZW50YWdlIDwgaGVpZ2h0UGVyY2VudGFnZVxuICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICA6IGFvaVBlcmNlbnRhZ2UoaW1hZ2VIZWlnaHQsIGhlaWdodFBlcmNlbnRhZ2UpO1xuICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmltYWdlSGVpZ2h0IC09IHJlZHVjdGlvbjtcbiAgICAgICAgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5oZWlnaHQgLT0gcmVkdWN0aW9uO1xuICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmltYWdlVG9wID1cbiAgICAgICAgICAoTWF0aC5taW4oYW9pVG9wLCByZWR1Y3Rpb24pIC9cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VIZWlnaHQpICpcbiAgICAgICAgICAxMDA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qXG4gICAgVGVtcG9yYXJ5IGZ1bmN0aW9uIGZvciBzZXR0aW5nIGEgbG93ZXIgaW1hZ2VoZWlnaHQgaWYgdGhlIHRlYXNlciBoYXMgYSBtYXhJbWFnZUhlaWdodCBhdHRyaWJ1dGUuXG4gICovXG4gIHNldE1heEltYWdlSGVpZ2h0KCkge1xuICAgIGlmICh0aGlzLmFvaSAmJiB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQgJiYgdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZSkge1xuICAgICAgY29uc3QgeyBpbWFnZUhlaWdodCwgbWF4SW1hZ2VIZWlnaHQgfSA9IHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmU7XG4gICAgICBpZiAoaW1hZ2VIZWlnaHQgJiYgbWF4SW1hZ2VIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VSZWR1Y3Rpb24gPSBpbWFnZUhlaWdodCAtIG1heEltYWdlSGVpZ2h0O1xuICAgICAgICBjb25zdCBoYXNBT0kgPSB0aGlzLmFvaS55ICE9PSAwIHx8IHRoaXMuYW9pLnggIT09IDA7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gaW1hZ2VIZWlnaHQgLyB0aGlzLmFvaS5vcmdIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGFvaVRvcCA9IHRoaXMuYW9pLnkgKiBzY2FsZTtcbiAgICAgICAgY29uc3QgcmVkdWNlSW1hZ2UgPVxuICAgICAgICAgIGhhc0FPSSAmJiBpbWFnZVJlZHVjdGlvbiA+IDAgJiYgaW1hZ2VSZWR1Y3Rpb24gPCBhb2lUb3A7XG5cbiAgICAgICAgaWYgKHJlZHVjZUltYWdlKSB7XG4gICAgICAgICAgY29uc3QgaW1hZ2VUb3AgPSBoYXNBT0lcbiAgICAgICAgICAgID8gKGltYWdlUmVkdWN0aW9uIC8gdGhpcy5hY3RpdmVCcmVha3BvaW50LmFjdGl2ZS5pbWFnZUhlaWdodCkgKiAxMDBcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUJyZWFrcG9pbnQuYWN0aXZlLmltYWdlSGVpZ2h0IC09IGltYWdlUmVkdWN0aW9uO1xuICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaGVpZ2h0IC09IGltYWdlUmVkdWN0aW9uO1xuICAgICAgICAgIHRoaXMuYWN0aXZlQnJlYWtwb2ludC5hY3RpdmUuaW1hZ2VUb3AgPSBpbWFnZVRvcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBUZWFzZXIgfTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmxldCBpc0RlYnVnRW5hYmxlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlzRGVidWdFbmFibGVkID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignZGVidWc9dHJ1ZScpICE9PSAtMTtcbn1cblxuLyoqXG4gKiAgQ29uc29sZSBsb2dzIHdpdGggYSBPcHRpbXVzIHByZWZpeCB3aGVuID9kZWJ1Zz10cnVlIGlzIGluIHRoZSBVUkwuXG4gKiAgVGlwOiBBZGQgYSAoT3B0aW11cykgZmlsdGVyIGluIHlvdXIgZGV2ZWxvcGVyIGNvbnNvbGUgdG8gb25seSBzaG93IHRoZSBPcHRpbXVzIGxvZy5cbiAqL1xuZnVuY3Rpb24gZGVidWcodHlwZSwgLi4uZGF0YSkge1xuICBpZiAoaXNEZWJ1Z0VuYWJsZWQgJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZGF0YS51bnNoaWZ0KCdPcHRpbXVzJyk7XG4gICAgY29uc29sZVt0eXBlXSguLi5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGxvZzogZGVidWcuYmluZCgnbG9nJyksXG4gIGVycm9yOiBkZWJ1Zy5iaW5kKCdlcnJvcicpLFxuICBpbmZvOiBkZWJ1Zy5iaW5kKCdpbmZvJyksXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgbGF5b3V0cyB9IGZyb20gJy4vbGF5b3V0LWRlZmluaXRpb25zLmpzJztcblxuY29uc3QgYW5pbWF0aW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25zKCkge1xuICByZXR1cm4gYW5pbWF0aW9ucztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGVhc2VyU3R5bGVzKGNvbnRhaW5lckluZm8sIGJyZWFrcG9pbnQpIHtcbiAgYnJlYWtwb2ludC5yb3dDb3VudGVyID0gYnJlYWtwb2ludC5yb3dDb3VudGVyIHx8IDA7XG4gIGNvbnN0IHJvd3MgPSBjb250YWluZXJJbmZvLmNvbnRlbnRcbiAgICAucmVkdWNlKChyLCB0ZWFzZXJDb250YWluZXIpID0+IHtcbiAgICAgIGlmIChyLmluZGV4T2YodGVhc2VyQ29udGFpbmVyLnRvcCkgPT09IC0xKSB7XG4gICAgICAgIHIucHVzaCh0ZWFzZXJDb250YWluZXIudG9wKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0sIFtdKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cbiAgbGV0IGZsb2F0U3R5bGUgPSAnJztcbiAgbGV0IGxhc3RCcmVha3BvaW50U3R5bGUgPSAnJztcbiAgbGV0IGNvbmRpdGlvbmFsU3R5bGVzID0gJyc7XG5cbiAgY29uc3QgdGVtcGxhdGVSb3dzID0gcm93cy5yZWR1Y2UoXG4gICAgKHB2LCBjdiwgaSwgYXJyKSA9PlxuICAgICAgYCR7cHZ9ICR7XG4gICAgICAgIGkgPT09IGFyci5sZW5ndGggLSAxICYmIGFyci5sZW5ndGggPiAxID8gJ21pbi1jb250ZW50JyA6ICdtYXgtY29udGVudCdcbiAgICAgIH1gLFxuICAgICcnXG4gICk7XG4gIGJyZWFrcG9pbnQucm93cyA9IGAke2JyZWFrcG9pbnQucm93cyB8fCAnJ30gJHt0ZW1wbGF0ZVJvd3N9YDtcblxuICBjb250YWluZXJJbmZvLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgY29sdW1uLmZvckVhY2goKHRlYXNlckNvbnRhaW5lciwgaSkgPT4ge1xuICAgICAgY29uc3QgdGVhc2VySW5mbyA9IHRlYXNlckNvbnRhaW5lci50ZWFzZXIuZ2V0SW5mbygpO1xuICAgICAgY29uc3QgdGVhc2VySWQgPSB0ZWFzZXJDb250YWluZXIudGVhc2VyLmlkO1xuICAgICAgY29uc3QgdGVhc2VyVHlwZSA9IHRlYXNlckNvbnRhaW5lci50ZWFzZXIudHlwZTtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHRlYXNlckNvbnRhaW5lci50ZWFzZXIuZ2V0U3R5bGVzKCk7XG4gICAgICBjb25zdCByb3dTdGFydCA9XG4gICAgICAgIGJyZWFrcG9pbnQucm93Q291bnRlciArIHJvd3MuaW5kZXhPZih0ZWFzZXJDb250YWluZXIudG9wKSArIDE7XG4gICAgICBjb25zdCByb3dFbmQgPVxuICAgICAgICBicmVha3BvaW50LnJvd0NvdW50ZXIgK1xuICAgICAgICAoY29sdW1uW2kgKyAxXSA/IHJvd3MuaW5kZXhPZihjb2x1bW5baSArIDFdLnRvcCkgKyAxIDogMSArIHJvd3MubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGNvbHVtblN0YXJ0ID1cbiAgICAgICAgMSArXG4gICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgKHRlYXNlckNvbnRhaW5lci5sZWZ0IC8gYnJlYWtwb2ludC53aWR0aCkgKlxuICAgICAgICAgICAgbGF5b3V0c1ticmVha3BvaW50LndpZHRoXS5jb2x1bW5zXG4gICAgICAgICk7XG4gICAgICBjb25zdCBjb2x1bW5FbmQgPVxuICAgICAgICAxICtcbiAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAoKHRlYXNlckNvbnRhaW5lci5sZWZ0ICsgdGVhc2VySW5mby53aWR0aCkgLyBicmVha3BvaW50LndpZHRoKSAqXG4gICAgICAgICAgICBsYXlvdXRzW2JyZWFrcG9pbnQud2lkdGhdLmNvbHVtbnNcbiAgICAgICAgKTtcblxuICAgICAgaWYgKHN0eWxlcy5hbmltYXRpb25zKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25zLmluZGV4T2Yoc3R5bGVzLmFuaW1hdGlvbnMpID09PSAtMSkge1xuICAgICAgICAgIGFuaW1hdGlvbnMucHVzaChzdHlsZXMuYW5pbWF0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0eWxlcy5tZWRpYXF1ZXJpZXMpIHtcbiAgICAgICAgY29uZGl0aW9uYWxTdHlsZXMgKz0gc3R5bGVzLm1lZGlhcXVlcmllcztcbiAgICAgIH1cblxuICAgICAgaWYgKHN0eWxlcy5jb21tb24pIHtcbiAgICAgICAgZmxvYXRTdHlsZSArPSBzdHlsZXMuY29tbW9uO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncmlkQ29sdW1uRW5kID1cbiAgICAgICAgY29sdW1uRW5kIDwgbGF5b3V0c1ticmVha3BvaW50LndpZHRoXS5jb2x1bW5zXG4gICAgICAgICAgPyBjb2x1bW5FbmQgKyAxXG4gICAgICAgICAgOiBjb2x1bW5FbmQ7XG5cbiAgICAgIGZsb2F0U3R5bGUgKz0gYFxuICAgICAgI2FydC0ke3RlYXNlcklkfSB7XG4gICAgICAgICAgZ3JpZC1jb2x1bW4tc3RhcnQ6ICR7Y29sdW1uU3RhcnR9O1xuICAgICAgICAgIGdyaWQtY29sdW1uLWVuZDogJHt0ZWFzZXJJbmZvLndpZHRoID8gZ3JpZENvbHVtbkVuZCA6ICdub25lJ307XG4gICAgICAgICAgZ3JpZC1yb3ctc3RhcnQ6ICR7cm93U3RhcnR9O1xuICAgICAgICAgIGdyaWQtcm93LWVuZDogJHtyb3dFbmR9O1xuICAgICAgfWA7XG5cbiAgICAgIGZsb2F0U3R5bGUgKz0gYFxuICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTMycHgpIHtcbiAgICAgICAgI2FydC0ke3RlYXNlcklkfSB7XG4gICAgICAgICAgICBncmlkLWNvbHVtbi1lbmQ6ICR7dGVhc2VySW5mby53aWR0aCA/IGdyaWRDb2x1bW5FbmQgOiAnYXV0byd9O1xuICAgICAgICB9XG4gICAgICB9YDtcbiAgICAgIGlmICh0ZWFzZXJUeXBlID09PSAnc21hcnRlbWJlZCcpIHtcbiAgICAgICAgbGFzdEJyZWFrcG9pbnRTdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgI2FydC0ke3RlYXNlcklkfSB7XG4gICAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgZmxvYXRTdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgI2FydC0ke3RlYXNlcklkfSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZWFzZXJJbmZvKSB7XG4gICAgICAgIGZsb2F0U3R5bGUgKz0gYFxuICAgICAgICAjYXJ0LSR7dGVhc2VySWR9IC50aXRsZVdyYXBwZXIgPiBzcGFuIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJHt0ZWFzZXJJbmZvLmZvbnRTaXplfWVtO1xuICAgICAgICB9XG4gICAgICAgICNhcnQtJHt0ZWFzZXJJZH0gLnRlYXNlcl9pbWFnZSBpbWcuYW1lZGlhLWltZy1mdWxsIHtcbiAgICAgICAgICAgIHRvcDogJHstdGVhc2VySW5mby5pbWFnZVRvcCB8fCAwfSU7XG4gICAgICAgICAgICBsZWZ0OiAkey10ZWFzZXJJbmZvLmltYWdlTGVmdCB8fCAwfSU7XG4gICAgICAgICAgICB3aWR0aDogJHt0ZWFzZXJJbmZvLmltYWdlV2lkdGhQZXJjZW50IHx8IDEwMH0lO1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgaWYgKHRlYXNlclR5cGUgPT09ICdzbWFydGVtYmVkJykge1xuICAgICAgICAgIGxhc3RCcmVha3BvaW50U3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgICNhcnQtJHt0ZWFzZXJJZH0ge1xuICAgICAgICAgICAgICAgICAgICBtaW4taGVpZ2h0OiAke3RlYXNlckluZm8uaGVpZ2h0fXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgIGZsb2F0U3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgICNhcnQtJHt0ZWFzZXJJZH0ge1xuICAgICAgICAgICAgICAgICAgICBtaW4taGVpZ2h0OiAke1xuICAgICAgICAgICAgICAgICAgICAgICh0ZWFzZXJJbmZvLmhlaWdodCAvXG4gICAgICAgICAgICAgICAgICAgICAgICAoY29udGFpbmVySW5mby53aWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQuc3R5bGVzLmhQYWRkaW5nICogMikpICpcbiAgICAgICAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgICAgICAgICAgfXZ3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlYXNlckluZm8udmVydGljYWxQYWRkaW5nKSB7XG4gICAgICAgICAgY29uc3QgcGFkZGluZyA9XG4gICAgICAgICAgICAoKHRlYXNlckluZm8udmVydGljYWxQYWRkaW5nIC8gdGVhc2VySW5mby53aWR0aCkgKiAxMDAgKyA2KSAvIDI7XG4gICAgICAgICAgZmxvYXRTdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgI2FydC0ke3RlYXNlcklkfSAud2l0aC1iYWNrZ3JvdW5kLWNvbG9yIC5ib2R5LFxuICAgICAgICAgICAgICAgICNhcnQtJHt0ZWFzZXJJZH0gLm5vLWltYWdlIC5ib2R5IHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy10b3A6ICR7cGFkZGluZ30lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAke3BhZGRpbmd9JSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFzZXJJbmZvLmltYWdlSGVpZ2h0ICYmIHRlYXNlckluZm8udmVyc2lvbiA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgLy9UZW1wb3JhcnkgZml4IGZvciBtaXNzaW5nIGltYWdlIHdpZHRoLiBXaWxsIHByb2JhYmx5IGJlIHJlcGxhY2VkIGJ5IGFzcGVjdC1yYXRpb1xuICAgICAgICAgIGZsb2F0U3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgICNhcnQtJHt0ZWFzZXJJZH0gLmltYWdld3JhcHBlciB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAke1xuICAgICAgICAgICAgICAgICAgICAgICh0ZWFzZXJJbmZvLmltYWdlSGVpZ2h0IC8gdGVhc2VySW5mby53aWR0aCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgfSUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBsZXQgY3NzID0gYFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnJlYWtwb2ludC5zdHlsZXMubWluV2lkdGh9cHgpIGFuZCAobWF4LXdpZHRoOiR7YnJlYWtwb2ludC5zdHlsZXMubWF4V2lkdGh9cHgpIHtcbiAgICAgICAgJHtmbG9hdFN0eWxlfVxuICAgIH1cbiAgICBgO1xuXG4gIGlmIChicmVha3BvaW50LnN0eWxlcy5sYXN0QnJlYWtwb2ludCkge1xuICAgIGNzcyArPSBgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoke2JyZWFrcG9pbnQuc3R5bGVzLm1heFdpZHRofXB4KSB7XG4gICAgICAgICAgICAke2Zsb2F0U3R5bGV9XG4gICAgICAgICAgICAke2xhc3RCcmVha3BvaW50U3R5bGV9XG4gICAgICAgIH1gO1xuICB9XG4gIGNzcyArPSBjb25kaXRpb25hbFN0eWxlcztcblxuICBicmVha3BvaW50LnJvd0NvdW50ZXIgKz0gcm93cy5sZW5ndGg7XG4gIHJldHVybiBjc3M7XG59XG5cbmZ1bmN0aW9uIGdldEdyaWRDc3MoeyBjb2x1bW5zLCBicmVha3BvaW50LCBpZCwgdXNlU3RhdGljR3JpZCB9KSB7XG4gIGxldCBjc3M7XG4gIGNvbnN0IHVzZU1vYmlsZVN0YXRpY0dyaWQgPSBicmVha3BvaW50LnN0eWxlcy5taW5XaWR0aCA9PT0gMCAmJiB1c2VTdGF0aWNHcmlkO1xuICBpZiAodXNlTW9iaWxlU3RhdGljR3JpZCkge1xuICAgIGNzcyA9IGdldE1vYmlsZVN0YXRpY0dyaWRDc3MoYnJlYWtwb2ludCwgaWQpO1xuICB9IGVsc2Uge1xuICAgIGNzcyA9IGBcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke1xuICAgICAgYnJlYWtwb2ludC5zdHlsZXMubWluV2lkdGhcbiAgICB9cHgpIGFuZCAobWF4LXdpZHRoOiR7YnJlYWtwb2ludC5zdHlsZXMubWF4V2lkdGh9cHgpIHtcbiAgICAgICAgIyR7aWR9IHtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJHtjb2x1bW5zfTtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHticmVha3BvaW50LnJvd3N9O1xuICAgICAgICAgICAgZ3JpZC1jb2x1bW4tZ2FwOiAke1xuICAgICAgICAgICAgICAoYnJlYWtwb2ludC5zdHlsZXMuaFBhZGRpbmcgLyBicmVha3BvaW50LndpZHRoKSAqIDEwMFxuICAgICAgICAgICAgfSU7XG4gICAgICAgICAgICBncmlkLXJvdy1nYXA6ICR7XG4gICAgICAgICAgICAgIChicmVha3BvaW50LnN0eWxlcy52UGFkZGluZyAvIGJyZWFrcG9pbnQud2lkdGgpICogMTAwXG4gICAgICAgICAgICB9dnc7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAke1xuICAgICAgICAgICAgICAoYnJlYWtwb2ludC5zdHlsZXMudlBhZGRpbmcgLyBicmVha3BvaW50LndpZHRoKSAqIDEwMFxuICAgICAgICAgICAgfXZ3O1xuICAgICAgICB9XG4gICAgfWA7XG4gIH1cblxuICBpZiAoYnJlYWtwb2ludC5zdHlsZXMubGFzdEJyZWFrcG9pbnQpIHtcbiAgICBjc3MgKz0gYFxuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiR7YnJlYWtwb2ludC5zdHlsZXMubWF4V2lkdGh9cHgpIHtcbiAgICAgICAgICAgICMke2lkfSB7XG4gICAgICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAke2NvbHVtbnN9O1xuICAgICAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHticmVha3BvaW50LnJvd3N9O1xuICAgICAgICAgICAgICAgIGdyaWQtY29sdW1uLWdhcDogJHtcbiAgICAgICAgICAgICAgICAgIChicmVha3BvaW50LnN0eWxlcy5oUGFkZGluZyAvIGJyZWFrcG9pbnQud2lkdGgpICogMTAwXG4gICAgICAgICAgICAgICAgfSU7XG4gICAgICAgICAgICAgICAgZ3JpZC1yb3ctZ2FwOiAke2JyZWFrcG9pbnQuc3R5bGVzLnZQYWRkaW5nfXB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICR7YnJlYWtwb2ludC5zdHlsZXMudlBhZGRpbmd9cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgfVxuICByZXR1cm4gY3NzO1xufVxuXG5mdW5jdGlvbiBnZXRNb2JpbGVTdGF0aWNHcmlkQ3NzKGJyZWFrcG9pbnQsIGlkKSB7XG4gIHJldHVybiBgXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTMycHgpIHtcbiAgICAgICAgIyR7aWR9IHtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bztcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHticmVha3BvaW50LnJvd3N9O1xuICAgICAgICAgICAgZ3JpZC1jb2x1bW4tZ2FwOiB2YXIoLS1icmljay1zcGFjZS14MSk7XG4gICAgICAgICAgICBncmlkLXJvdy1nYXA6IHZhcigtLWJyaWNrLXNwYWNlLXgxKTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWJyaWNrLXNwYWNlLXgxKTtcbiAgICAgICAgfVxuICAgIH1gO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcm9udFN0eWxlKGJyZWFrcG9pbnQsIGlkLCBpc0dyb3VwLCB1c2VTdGF0aWNHcmlkKSB7XG4gIGNvbnN0IGNvbHVtbnMgPSBBcnJheShsYXlvdXRzW2JyZWFrcG9pbnQud2lkdGhdLmNvbHVtbnMpXG4gICAgLmZpbGwoXG4gICAgICBgJHsobGF5b3V0c1ticmVha3BvaW50LndpZHRoXS5jb2x1bW4gLyBicmVha3BvaW50LndpZHRoKSAqIDEwMH0lYCxcbiAgICAgIDAsXG4gICAgICBsYXlvdXRzW2JyZWFrcG9pbnQud2lkdGhdLmNvbHVtbnNcbiAgICApXG4gICAgLmpvaW4oJyAnKTtcbiAgbGV0IGNzcyA9IGdldEdyaWRDc3MoeyBjb2x1bW5zLCBicmVha3BvaW50LCBpZCwgdXNlU3RhdGljR3JpZCB9KTtcblxuICBjc3MgKz0gYFxuICAgICMke2lkfSB7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIH1gO1xuICBicmVha3BvaW50LnJvd0NvdW50ZXIgPSAwO1xuICByZXR1cm4gY3NzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcm9udFVua25vd25IZWlnaHRTdHlsZShpZCkge1xuICByZXR1cm4gYFxuICAgICMke2lkfSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwYWRkaW5nLXRvcDowO1xuICAgIH1gO1xufVxuXG5leHBvcnQge1xuICBnZXRBbmltYXRpb25zLFxuICBjcmVhdGVUZWFzZXJTdHlsZXMsXG4gIGNyZWF0ZUZyb250U3R5bGUsXG4gIGNyZWF0ZUZyb250VW5rbm93bkhlaWdodFN0eWxlLFxufTtcbiIsICJleHBvcnQgY29uc3QgZHJFZGl0aW9uQ29sb3JNYXBwaW5nID0ge1xuICBibGFjazogJ2JhY2tncm91bmQtYmxhY2snLFxuICBncmF5RGFyazogJ2JhY2tncm91bmQtZGFyay1ncmF5JyxcbiAgZ3JheTogJ2JhY2tncm91bmQtZ3JheScsXG4gIHB1cnBsZTogJ2JhY2tncm91bmQtcHVycGxlJyxcbiAgYmx1ZTogJ2JhY2tncm91bmQtYmx1ZScsXG4gIGJsdWVMaWdodDogJ2JhY2tncm91bmQtbGlnaHQtYmx1ZScsXG4gIGdyZWVuOiAnYmFja2dyb3VuZC1ncmVlbicsXG4gIGdyZWVuTGlnaHQ6ICdiYWNrZ3JvdW5kLWxpZ2h0LWdyZWVuJyxcbiAgY2lubmFtb246ICdiYWNrZ3JvdW5kLWNpbm5hbW9uJyxcbiAgZ29sZDogJ2JhY2tncm91bmQtZ29sZCcsXG4gIHllbGxvdzogJ2JhY2tncm91bmQteWVsbG93JyxcbiAgcmVkRGFyazogJ2JhY2tncm91bmQtZGFyay1yZWQnLFxuICByZWQ6ICdiYWNrZ3JvdW5kLXJlZCcsXG4gIHJlZExpZ2h0OiAnYmFja2dyb3VuZC1saWdodC1yZWQnLFxuICBmaW5hbmNlOiAnYmFja2dyb3VuZC1maW5hbmNlJyxcbiAgYnJvd246ICdiYWNrZ3JvdW5kLWJyb3duJyxcbiAgY3VzdG9tT25lOiAnY3VzdG9tLW9uZScsXG4gIGN1c3RvbVR3bzogJ2N1c3RvbS10d28nLFxuICBjdXN0b21UaHJlZTogJ2N1c3RvbS10aHJlZScsXG4gIHdoaXRlOiAnYmFja2dyb3VuZC1jdXN0b20tc3BvcnQnLFxufTtcbiIsICJleHBvcnQgY29uc3QgYnJpY2tUaGVtZXMgPSBbJ2FsZmEnLCAnYnJhdm8nLCAnY2hhcmxpZScsICduZXR0YXZpc2VuJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb25hcih0aGVtZSkge1xuICBjb25zdCB1c2VCcmlja0ljb25Tb25hciA9IGJyaWNrVGhlbWVzLmluY2x1ZGVzKHRoZW1lKTtcbiAgY29uc3Qgc29uYXJIdG1sID0gdXNlQnJpY2tJY29uU29uYXJcbiAgICA/IGA8YnJpY2staWNvbiBpY29uVGhlbWU9XCIke3RoZW1lfVwiIGljb25pZD1cInBpbGwtYnJlYWtpbmdcIj48L2JyaWNrLWljb24+YFxuICAgIDogJzxzcGFuIGNsYXNzPVwib3B0aW11cy1jb21wbGV4LXNvbmFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPic7XG4gIHJldHVybiBzb25hckh0bWw7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL2NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBUZWFzZXIgfSBmcm9tICcuL3RlYXNlci5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVUZWFzZXJTdHlsZXMsXG4gIGNyZWF0ZUZyb250U3R5bGUsXG4gIGNyZWF0ZUZyb250VW5rbm93bkhlaWdodFN0eWxlLFxuICBnZXRBbmltYXRpb25zLFxufSBmcm9tICcuL2dyaWQtY3NzLmpzJztcbmltcG9ydCB7IGRyRWRpdGlvbkNvbG9yTWFwcGluZyB9IGZyb20gJy4vY29sb3ItbWFwcGluZy5qcyc7XG5pbXBvcnQgeyBnZXRMYXlvdXQgfSBmcm9tICcuL2xheW91dC1kZWZpbml0aW9ucy5qcyc7XG5pbXBvcnQgeyBicmlja1RoZW1lcywgY3JlYXRlU29uYXIgfSBmcm9tICcuL2NyZWF0ZS1zb25hci5qcyc7XG5cbmNvbnN0IGN1cnJlbnRMYXlvdXQgPSBnZXRMYXlvdXQoKTtcblxubGV0IG9wdGltdXNFbGVtZW50SW5kZXggPSAwO1xuXG5mdW5jdGlvbiBjbG9zZUNvbnRhaW5lcihicmVha3BvaW50LCB1bmtub3duSGVpZ2h0KSB7XG4gIGNvbnN0IGNvbnRhaW5lckluZm8gPSBicmVha3BvaW50LmNvbnRhaW5lci5maWxsKCk7XG4gIGNvbnN0IHN0eWxlcyA9IGNyZWF0ZVRlYXNlclN0eWxlcyhjb250YWluZXJJbmZvLCBicmVha3BvaW50KTtcbiAgYnJlYWtwb2ludC5zdHlsZXMuY29tcG9zaXRpb25zLnB1c2goY29udGFpbmVySW5mby5jb21wb3NpdGlvbnMpO1xuICBicmVha3BvaW50LnN0eWxlcy5jdXJyZW50UGFnZVlQb3NpdGlvbiArPVxuICAgIGJyZWFrcG9pbnQuY29udGFpbmVyLmdldEhlaWdodCgpICsgYnJlYWtwb2ludC5zdHlsZXMudlBhZGRpbmc7XG4gIGJyZWFrcG9pbnQuaW5kZXggKz0gMTtcbiAgaWYgKHVua25vd25IZWlnaHQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBhZGRUZWFzZXJQb3NpdGlvblRvSFRNTChodG1sLCBpbmRleCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKFxuICAgICc8bWV0YScsXG4gICAgYDxtZXRhIGl0ZW1wcm9wPVwicG9zaXRpb25cIiBjb250ZW50PVwiJHtpbmRleH1cIiAvPjxtZXRhYFxuICApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoYnJlYWtwb2ludCwgbHRyKSB7XG4gIGJyZWFrcG9pbnQuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7XG4gICAgdHlwZTogYnJlYWtwb2ludC53aWR0aCxcbiAgICBsdHIsXG4gICAgaW5kZXg6IGJyZWFrcG9pbnQuY29udGFpbmVyLmluZGV4ICsgMSxcbiAgICB2UGFkZGluZzogYnJlYWtwb2ludC5zdHlsZXMudlBhZGRpbmcsXG4gICAgaFBhZGRpbmc6IGJyZWFrcG9pbnQuc3R5bGVzLmhQYWRkaW5nLFxuICAgIGNvbXBvc2l0aW9uczogYnJlYWtwb2ludC5zdHlsZXMuY29tcG9zaXRpb25zLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFnZUhlYWRlcih7IHRpdGxlLCBicmVha2luZ05ld3MsIHRoZW1lIH0pIHtcbiAgbGV0IGh0bWwgPSAnPGhlYWRlcj48aDI+JztcbiAgaWYgKGJyZWFraW5nTmV3cykge1xuICAgIGh0bWwgKz0gY3JlYXRlU29uYXIodGhlbWUpO1xuICB9XG4gIGh0bWwgKz0gYCR7dGl0bGV9PC9oMj48L2hlYWRlcj5gO1xuICByZXR1cm4gaHRtbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGFyZ2VQYWdlSGVhZGVyKHsgdGl0bGUsIGJyZWFraW5nTmV3cywgdGhlbWUsIGxhcmdlVGl0bGVDc3MgfSkge1xuICBsZXQgaHRtbCA9IGA8aGVhZGVyPjxoMiBjbGFzcz1cIiR7bGFyZ2VUaXRsZUNzc31cIj5gO1xuICBpZiAoYnJlYWtpbmdOZXdzKSB7XG4gICAgaHRtbCArPSBjcmVhdGVTb25hcih0aGVtZSk7XG4gIH1cbiAgaHRtbCArPSBgJHt0aXRsZX08L2gyPjwvaGVhZGVyPmA7XG4gIHJldHVybiBodG1sO1xufVxuXG5jbGFzcyBQYWdlTGF5b3V0IHtcbiAgY29uc3RydWN0b3IoeyBpZCwgYnJlYWtwb2ludHMsIG9wdGlvbnMsIHRoZW1lIH0pIHtcbiAgICB0aGlzLmh0bWwgPSAnJztcbiAgICB0aGlzLmZyb250Q1NTID0gJyc7XG4gICAgdGhpcy5hcnRpY2xlQ1NTID0gJyc7XG4gICAgdGhpcy5qc0V4dGVybmFsID0gW107XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLnBhZ2VIZWlnaHQgPSB7fTtcbiAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IGJyZWFrcG9pbnRzXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS53aWR0aCAtIGIud2lkdGgpXG4gICAgICAubWFwKChicmVha3BvaW50LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gYnJlYWtwb2ludC53aWR0aCArIGJyZWFrcG9pbnQuaFBhZGRpbmcgKiAyO1xuICAgICAgICBjb25zdCBsYXN0QnJlYWtwb2ludCA9IGkgPT09IGJyZWFrcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IG1pbldpZHRoID0gY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aDtcbiAgICAgICAgY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aCA9IG1heFdpZHRoICsgMTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250YWluZXI6IG5ldyBDb250YWluZXIoe1xuICAgICAgICAgICAgdHlwZTogYnJlYWtwb2ludC53aWR0aCxcbiAgICAgICAgICAgIGx0cjogdHJ1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmNvbnRhaW5lckluZGV4W2JyZWFrcG9pbnQud2lkdGhdIHx8IDAsXG4gICAgICAgICAgICB2UGFkZGluZzogYnJlYWtwb2ludC52UGFkZGluZyxcbiAgICAgICAgICAgIGhQYWRkaW5nOiBicmVha3BvaW50LmhQYWRkaW5nLFxuICAgICAgICAgICAgY29tcG9zaXRpb25zOiBbXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB3aWR0aDogYnJlYWtwb2ludC53aWR0aCxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIG1pbldpZHRoLFxuICAgICAgICAgICAgbWF4V2lkdGgsXG4gICAgICAgICAgICBsdHI6IHRydWUsXG4gICAgICAgICAgICB2UGFkZGluZzogYnJlYWtwb2ludC52UGFkZGluZyxcbiAgICAgICAgICAgIGhQYWRkaW5nOiBicmVha3BvaW50LmhQYWRkaW5nLFxuICAgICAgICAgICAgbGFzdEJyZWFrcG9pbnQsXG4gICAgICAgICAgICBhbHRlckRpcmVjdGlvbjogYnJlYWtwb2ludC5hbHRlckRpcmVjdGlvbixcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlWVBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgY29tcG9zaXRpb25zOiBbXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4OiBvcHRpb25zLmluZGV4IHx8IDAsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGNvbnN0IHVzZVN0YXRpY0dyaWQgPSBicmlja1RoZW1lcy5pbmNsdWRlcyh0aGlzLnRoZW1lKTtcbiAgICBjb25zdCBpc0RyRWRpdGlvbkdyb3VwID1cbiAgICAgIHRoaXMuZ3JvdXAgJiYgdGhpcy5zb3VyY2UgPT09ICdkcmVkaXRpb24nICYmIHRoaXMudHlwZSA9PT0gJ2NvbXBsZXgnO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLmJyZWFrcG9pbnRzXG4gICAgICAubWFwKChicmVha3BvaW50KSA9PiB7XG4gICAgICAgIHRoaXMuYXJ0aWNsZUNTUyArPSBjbG9zZUNvbnRhaW5lcihicmVha3BvaW50LCB0aGlzLnVua25vd25IZWlnaHQpO1xuICAgICAgICB0aGlzLmZyb250Q1NTICs9IGNyZWF0ZUZyb250U3R5bGUoXG4gICAgICAgICAgYnJlYWtwb2ludCxcbiAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgIGlzRHJFZGl0aW9uR3JvdXAsXG4gICAgICAgICAgdXNlU3RhdGljR3JpZFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYnJlYWtwb2ludDtcbiAgICAgIH0pXG4gICAgICAuc29ydCgoYSwgYikgPT4gYi53aWR0aCAtIGEud2lkdGgpO1xuXG4gICAgaWYgKHRoaXMudW5rbm93bkhlaWdodCkge1xuICAgICAgdGhpcy5mcm9udENTUyA9IGNyZWF0ZUZyb250VW5rbm93bkhlaWdodFN0eWxlKHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHRoaXMuYXJ0aWNsZUNTUyArPSBnZXRBbmltYXRpb25zKCkuam9pbignJyk7XG5cbiAgICBjb25zdCBjc3MgPSBgXG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIiBkYXRhLWRlc2M9XCJBcnRpY2xlIHN0eWxlcyBmb3IgJHt0aGlzLmlkfVwiPiR7dGhpcy5hcnRpY2xlQ1NTfTwvc3R5bGU+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIiBkYXRhLWRlc2M9XCJGcm9udCBzdHlsZXMgZm9yICR7dGhpcy5pZH1cIj4ke3RoaXMuZnJvbnRDU1N9PC9zdHlsZT5cbiAgICAgICAgYDtcblxuICAgIGxldCBodG1sID0gYDxkaXYgaWQ9XCIke3RoaXMuaWR9XCIgY2xhc3M9XCJmcm9udFwiPiR7dGhpcy5odG1sfTwvZGl2PmA7XG5cbiAgICBpZiAodGhpcy5ncm91cCAmJiB0aGlzLnR5cGUgPT09ICdjb21wbGV4Jykge1xuICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICBsZXQgY2xhc3NlcyA9ICdvcHRpbXVzLWNvbXBsZXgtZnJvbnQnO1xuXG4gICAgICBpZiAodGhpcy50aXRsZSAmJiB0aGlzLmxhcmdlVGl0bGUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbGFyZ2VUaXRsZUNzcyA9ICdsYXJnZSc7XG4gICAgICAgIHRpdGxlID0gY3JlYXRlTGFyZ2VQYWdlSGVhZGVyKHtcbiAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgICAgICBicmVha2luZ05ld3M6IHRoaXMuYnJlYWtpbmdOZXdzLFxuICAgICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lLFxuICAgICAgICAgIGxhcmdlVGl0bGVDc3MsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRpdGxlICYmIHRoaXMubGFyZ2VUaXRsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGl0bGUgPSBjcmVhdGVQYWdlSGVhZGVyKHtcbiAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgICAgICBicmVha2luZ05ld3M6IHRoaXMuYnJlYWtpbmdOZXdzLFxuICAgICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzZXMgKz0gJyBub0hlYWRlcic7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgY2xhc3NlcyArPSBgIG9wdGltdXMtJHtkckVkaXRpb25Db2xvck1hcHBpbmdbdGhpcy5iYWNrZ3JvdW5kQ29sb3JdfWA7XG4gICAgICB9XG4gICAgICBodG1sID0gYDxzZWN0aW9uIGNsYXNzPVwiJHtjbGFzc2VzfVwiPiR7dGl0bGV9JHtodG1sfTwvc2VjdGlvbj5gO1xuICAgIH1cblxuICAgIGh0bWwgPSBgJHtjc3N9JHtodG1sfWA7XG4gICAgcmV0dXJuIHtcbiAgICAgIGh0bWwsXG4gICAgICBqc0V4dGVybmFsOiB0aGlzLmpzRXh0ZXJuYWwsXG4gICAgfTtcbiAgfVxuXG4gIGFkZCh0ZWFzZXJMaXN0LCBvbmx5RmlsbENvbnRhaW5lcikge1xuICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgcmV0dXJuIHRlYXNlckxpc3QuZmlsdGVyKCh0ZWFzZXJEYXRhKSA9PiB7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGVhc2VyRGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVhc2VyRGF0YS50eXBlID09PSAnbXVsdGl2YXJpYW50Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYXNlciA9IG5ldyBUZWFzZXIodGVhc2VyRGF0YSk7XG5cbiAgICAgIGxldCBicmVha3BvaW50cyA9IHRoaXMuYnJlYWtwb2ludHMuc2xpY2UoKTtcblxuICAgICAgaWYgKG9ubHlGaWxsQ29udGFpbmVyKSB7XG4gICAgICAgIGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhLndpZHRoID09PSBvbmx5RmlsbENvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYi53aWR0aCA9PT0gb25seUZpbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrcG9pbnRzLmZvckVhY2goKGJyZWFrcG9pbnQpID0+IHtcbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgY29uc3QgaXNBZGRlZCA9IGJyZWFrcG9pbnQuY29udGFpbmVyLmFkZCh0ZWFzZXIsIHRoaXMudHlwZSk7XG5cbiAgICAgICAgICBpZiAoIWlzQWRkZWQgJiYgYnJlYWtwb2ludC53aWR0aCA9PT0gb25seUZpbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzQWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZUNTUyArPSBjbG9zZUNvbnRhaW5lcihicmVha3BvaW50LCB0aGlzLnVua25vd25IZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJJbmRleFticmVha3BvaW50LndpZHRoXSA9IGJyZWFrcG9pbnQuY29udGFpbmVyLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGJyZWFrcG9pbnQuc3R5bGVzLmFsdGVyRGlyZWN0aW9uICYmXG4gICAgICAgICAgICAgIGJyZWFrcG9pbnQuY29udGFpbmVyLmNvbnRlbnQubGVuZ3RoID4gMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGJyZWFrcG9pbnQuc3R5bGVzLmx0ciA9ICFicmVha3BvaW50LnN0eWxlcy5sdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVDb250YWluZXIoYnJlYWtwb2ludCwgYnJlYWtwb2ludC5zdHlsZXMubHRyKTtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQuY29udGFpbmVyLmFkZCh0ZWFzZXIsIHRoaXMudHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghZG9uZSkge1xuICAgICAgICBsZXQgYXR0ciA9ICcnO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGVhc2VyLmJyZWFrcG9pbnRzICYmXG4gICAgICAgICAgdGVhc2VyLmJyZWFrcG9pbnRzW2N1cnJlbnRMYXlvdXRdICYmXG4gICAgICAgICAgdGVhc2VyLmJyZWFrcG9pbnRzW2N1cnJlbnRMYXlvdXRdLmFjdGl2ZVxuICAgICAgICApIHtcbiAgICAgICAgICBhdHRyICs9IGBsaW5lY291bnQ9XCIke3RlYXNlci5icmVha3BvaW50c1tjdXJyZW50TGF5b3V0XS5hY3RpdmUubGluZUNvdW50fVwiIGA7XG4gICAgICAgICAgYXR0ciArPSBgdmVyc2lvbj1cIiR7dGVhc2VyLmJyZWFrcG9pbnRzW2N1cnJlbnRMYXlvdXRdLmFjdGl2ZS52ZXJzaW9ufVwiIGA7XG4gICAgICAgICAgYXR0ciArPSBgd2lkdGg9XCIke3RlYXNlci5icmVha3BvaW50c1tjdXJyZW50TGF5b3V0XS5hY3RpdmUud2lkdGh9XCIgYDtcbiAgICAgICAgICBhdHRyICs9IGBpbmRleD1cIiR7b3B0aW11c0VsZW1lbnRJbmRleH1cImA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVhc2VyRGF0YS5leHBlcmltZW50RGVidWcpIHtcbiAgICAgICAgICBhdHRyICs9ICcgc3R5bGU9XCJvdXRsaW5lOiByZWQgc29saWQgNXB4O1wiJztcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGltdXNFbGVtZW50SW5kZXggKz0gMTtcbiAgICAgICAgbGV0IHRlYXNlckh0bWwgPSB0ZWFzZXJEYXRhLmh0bWw7XG4gICAgICAgIGlmICh0ZWFzZXJIdG1sKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSB0ZWFzZXJIdG1sLm1hdGNoKFxuICAgICAgICAgICAgLzxhIGhyZWY9XCIoaHR0cHM6XFwvXFwvd3d3LmFsdC5ub1teXCJdKilcIi9cbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdGVhc2VySHRtbCA9IHRlYXNlckh0bWwucmVwbGFjZShcbiAgICAgICAgICAgICAgLzxhIGhyZWY9XCJbXlwiXSpcIi8sXG4gICAgICAgICAgICAgIGA8YSBocmVmPVwiJHttYXRjaFsxXX0/YW1lZGlhX3JlZmVycmVyPSR7bG9jYXRpb24uaG9zdH0maW5mb2JveFwiYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGVhc2VySHRtbCA9IGFkZFRlYXNlclBvc2l0aW9uVG9IVE1MKHRlYXNlckh0bWwsIG9wdGltdXNFbGVtZW50SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHRtbCArPSBgPG9wdGltdXMtZWxlbWVudCBpZD1cImFydC0ke3RlYXNlckRhdGEuaWR9XCIgJHthdHRyfT4ke3RlYXNlckh0bWx9PC9vcHRpbXVzLWVsZW1lbnQ+YDtcbiAgICAgICAgaWYgKHRlYXNlckRhdGEuanMpIHtcbiAgICAgICAgICB0aGlzLmpzRXh0ZXJuYWwgPSB0aGlzLmpzRXh0ZXJuYWwuY29uY2F0KHRlYXNlckRhdGEuanMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9uZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlTGF5b3V0O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgJ2h0dHBzOi8vYXNzZXRzLmFjZG4ubm8vcGtnL0BhbWVkaWEvYnJpY2stY2Fyb3VzZWwvdjAvYnJpY2stY2Fyb3VzZWwuanMnO1xuXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL2NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBUZWFzZXIgfSBmcm9tICcuL3RlYXNlci5qcyc7XG5pbXBvcnQgeyBkckVkaXRpb25Db2xvck1hcHBpbmcgfSBmcm9tICcuL2NvbG9yLW1hcHBpbmcuanMnO1xuaW1wb3J0IHsgZ2V0TGF5b3V0IH0gZnJvbSAnLi9sYXlvdXQtZGVmaW5pdGlvbnMuanMnO1xuaW1wb3J0IHsgY3JlYXRlU29uYXIgfSBmcm9tICcuL2NyZWF0ZS1zb25hci5qcyc7XG5cbmNvbnN0IGN1cnJlbnRMYXlvdXQgPSBnZXRMYXlvdXQoKTtcblxubGV0IG9wdGltdXNFbGVtZW50SW5kZXggPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoYnJlYWtwb2ludCwgbHRyKSB7XG4gIGJyZWFrcG9pbnQuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7XG4gICAgdHlwZTogYnJlYWtwb2ludC53aWR0aCxcbiAgICBsdHIsXG4gICAgaW5kZXg6IGJyZWFrcG9pbnQuY29udGFpbmVyLmluZGV4ICsgMSxcbiAgICB2UGFkZGluZzogYnJlYWtwb2ludC5zdHlsZXMudlBhZGRpbmcsXG4gICAgaFBhZGRpbmc6IGJyZWFrcG9pbnQuc3R5bGVzLmhQYWRkaW5nLFxuICAgIGNvbXBvc2l0aW9uczogYnJlYWtwb2ludC5zdHlsZXMuY29tcG9zaXRpb25zLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFnZUhlYWRlcih0aXRsZSwgc29uYXIsIHRoZW1lKSB7XG4gIGxldCBodG1sID0gJzxoZWFkZXI+PGgyPic7XG4gIGlmIChzb25hcikge1xuICAgIGh0bWwgKz0gY3JlYXRlU29uYXIodGhlbWUpO1xuICB9XG4gIGh0bWwgKz0gYCR7dGl0bGV9PC9oMj48L2hlYWRlcj5gO1xuICByZXR1cm4gaHRtbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGFyZ2VQYWdlSGVhZGVyKHRpdGxlLCBzb25hciwgbGFyZ2VUaXRsZUNzcywgdGhlbWUpIHtcbiAgbGV0IGh0bWwgPSBgPGhlYWRlcj48aDIgY2xhc3M9XCIke2xhcmdlVGl0bGVDc3N9XCI+YDtcbiAgaWYgKHNvbmFyKSB7XG4gICAgaHRtbCArPSBjcmVhdGVTb25hcih0aGVtZSk7XG4gIH1cbiAgaHRtbCArPSBgJHt0aXRsZX08L2gyPjwvaGVhZGVyPmA7XG4gIHJldHVybiBodG1sO1xufVxuXG5jbGFzcyBHcm91cFBhZ2VMYXlvdXQge1xuICBjb25zdHJ1Y3Rvcih7IGlkLCBicmVha3BvaW50cywgb3B0aW9ucywgdGhlbWUsIG1ldGEgfSkge1xuICAgIHRoaXMuaHRtbCA9ICcnO1xuICAgIHRoaXMuY2Fyb3VzZWxNYXJrdXAgPSAnJztcbiAgICB0aGlzLmNhcm91c2VsQ2hpbGRyZW5Db3VudCA9IDA7XG4gICAgdGhpcy5ncm91cEZvb3Rlck1hcmt1cE9uZSA9ICcnO1xuICAgIHRoaXMuZ3JvdXBGb290ZXJNYXJrdXBUd28gPSAnJztcbiAgICB0aGlzLnByb21vdGVGaXJzdE1hcmt1cCA9ICcnO1xuICAgIHRoaXMuZGVmYXVsdE1hcmt1cCA9ICcnO1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gICAgdGhpcy5qc0V4dGVybmFsID0gW107XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLnBhZ2VIZWlnaHQgPSB7fTtcbiAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IGJyZWFrcG9pbnRzXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS53aWR0aCAtIGIud2lkdGgpXG4gICAgICAubWFwKChicmVha3BvaW50LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gYnJlYWtwb2ludC53aWR0aCArIGJyZWFrcG9pbnQuaFBhZGRpbmcgKiAyO1xuICAgICAgICBjb25zdCBsYXN0QnJlYWtwb2ludCA9IGkgPT09IGJyZWFrcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IG1pbldpZHRoID0gY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aDtcbiAgICAgICAgY3VycmVudE1pbkJyZWFrcG9pbnRXaWR0aCA9IG1heFdpZHRoICsgMTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250YWluZXI6IG5ldyBDb250YWluZXIoe1xuICAgICAgICAgICAgdHlwZTogYnJlYWtwb2ludC53aWR0aCxcbiAgICAgICAgICAgIGx0cjogdHJ1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmNvbnRhaW5lckluZGV4W2JyZWFrcG9pbnQud2lkdGhdIHx8IDAsXG4gICAgICAgICAgICB2UGFkZGluZzogYnJlYWtwb2ludC52UGFkZGluZyxcbiAgICAgICAgICAgIGhQYWRkaW5nOiBicmVha3BvaW50LmhQYWRkaW5nLFxuICAgICAgICAgICAgY29tcG9zaXRpb25zOiBbXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB3aWR0aDogYnJlYWtwb2ludC53aWR0aCxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIG1pbldpZHRoLFxuICAgICAgICAgICAgbWF4V2lkdGgsXG4gICAgICAgICAgICBsdHI6IHRydWUsXG4gICAgICAgICAgICB2UGFkZGluZzogYnJlYWtwb2ludC52UGFkZGluZyxcbiAgICAgICAgICAgIGhQYWRkaW5nOiBicmVha3BvaW50LmhQYWRkaW5nLFxuICAgICAgICAgICAgbGFzdEJyZWFrcG9pbnQsXG4gICAgICAgICAgICBhbHRlckRpcmVjdGlvbjogYnJlYWtwb2ludC5hbHRlckRpcmVjdGlvbixcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlWVBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgY29tcG9zaXRpb25zOiBbXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4OiBvcHRpb25zLmluZGV4IHx8IDAsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFdyYXBNYXJrdXAgPSAoe1xuICAgIGNhcm91c2VsQ2hpbGRyZW5Db3VudCxcbiAgICBtaW5TbGlkZXNUb1Nob3csXG4gICAgY2Fyb3VzZWxNYXJrdXAsXG4gIH0pID0+IHtcbiAgICBpZiAoY2Fyb3VzZWxDaGlsZHJlbkNvdW50IDw9IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNhcm91c2VsQ2hpbGRyZW5Db3VudCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNhcm91c2VsTWFya3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYDxicmljay1jYXJvdXNlbCBtaW4tc2xpZGVzLXRvLXNob3c9XCIke21pblNsaWRlc1RvU2hvd31cIiBzdHlsZT1cIi0tdmVyc2lvbjpsZWZ0XCI+JHtjYXJvdXNlbE1hcmt1cH08L2JyaWNrLWNhcm91c2VsPmA7XG4gICAgfVxuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLmJyZWFrcG9pbnRzXG4gICAgICAubWFwKChicmVha3BvaW50KSA9PiB7XG4gICAgICAgIHJldHVybiBicmVha3BvaW50O1xuICAgICAgfSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBiLndpZHRoIC0gYS53aWR0aCk7XG5cbiAgICBsZXQgZnJvbnRDbGFzcyA9ICdmcm9udCc7XG4gICAgbGV0IGlkQ2xhc3MgPSB0aGlzLmlkO1xuICAgIGxldCBtaW5TbGlkZXNUb1Nob3cgPSAyO1xuICAgIGlmICh0aGlzLmdyb3VwVHlwZSA9PT0gJ3NvY2NlcicpIHtcbiAgICAgIGZyb250Q2xhc3MgPSAnc29jY2VyJztcbiAgICAgIGlkQ2xhc3MgPSAnc29jY2VyJztcbiAgICAgIG1pblNsaWRlc1RvU2hvdyA9IDE7XG4gICAgfVxuICAgIGNvbnN0IHdyYXBIb3Jpem9udGFsR3JvdXAgPSB0aGlzLmdldFdyYXBNYXJrdXAoe1xuICAgICAgY2Fyb3VzZWxDaGlsZHJlbkNvdW50OiB0aGlzLmNhcm91c2VsQ2hpbGRyZW5Db3VudCxcbiAgICAgIG1pblNsaWRlc1RvU2hvdyxcbiAgICAgIGNhcm91c2VsTWFya3VwOiB0aGlzLmNhcm91c2VsTWFya3VwLFxuICAgIH0pO1xuXG4gICAgbGV0IGh0bWwgPSBgPGRpdiBpZD1cIiR7aWRDbGFzc31cIiBjbGFzcz0ke2Zyb250Q2xhc3N9PlxuICAgICR7dGhpcy5odG1sfTwvZGl2PmA7XG5cbiAgICBpZiAodGhpcy5ncm91cCAmJiB0aGlzLnR5cGUgPT09ICdjb21wbGV4Jykge1xuICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICBsZXQgY2xhc3NlcyA9IGBvcHRpbXVzLWNvbXBsZXgtZnJvbnQgJHt0aGlzLmdyb3VwVHlwZX1gO1xuXG4gICAgICBpZiAodGhpcy50aXRsZSAmJiB0aGlzLmxhcmdlVGl0bGUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbGFyZ2VUaXRsZUNzcyA9ICdsYXJnZSc7XG4gICAgICAgIHRpdGxlID0gY3JlYXRlTGFyZ2VQYWdlSGVhZGVyKFxuICAgICAgICAgIHRoaXMudGl0bGUsXG4gICAgICAgICAgdGhpcy5icmVha2luZ05ld3MsXG4gICAgICAgICAgbGFyZ2VUaXRsZUNzcyxcbiAgICAgICAgICB0aGlzLnRoZW1lXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudGl0bGUgJiYgdGhpcy5sYXJnZVRpdGxlID09PSBmYWxzZSkge1xuICAgICAgICB0aXRsZSA9IGNyZWF0ZVBhZ2VIZWFkZXIodGhpcy50aXRsZSwgdGhpcy5icmVha2luZ05ld3MsIHRoaXMudGhlbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NlcyArPSAnIG5vSGVhZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICBjbGFzc2VzICs9IGAgb3B0aW11cy0ke2RyRWRpdGlvbkNvbG9yTWFwcGluZ1t0aGlzLmJhY2tncm91bmRDb2xvcl19YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXNlSG9yaXpvbmFsU3BhY2UgPVxuICAgICAgICB0aXRsZSB8fFxuICAgICAgICB3cmFwSG9yaXpvbnRhbEdyb3VwIHx8XG4gICAgICAgIHRoaXMuZ3JvdXBGb290ZXJNYXJrdXBPbmUgfHxcbiAgICAgICAgdGhpcy5ncm91cEZvb3Rlck1hcmt1cFR3bztcblxuICAgICAgaWYgKHRoaXMubWV0YS5ncm91cFR5cGUgPT09ICdsaXN0LWhvcml6b250YWwnKSB7XG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB1c2VIb3Jpem9uYWxTcGFjZSA/ICd3cmFwLWhvcml6b250YWwtc3BhY2UnIDogJyc7XG4gICAgICAgIGNvbnN0IGlzU29sbyA9IHRoaXMuY2Fyb3VzZWxDaGlsZHJlbkNvdW50ID09PSAxID8gJ3NvbG8tZ3JvdXAnIDogJyc7XG4gICAgICAgIGh0bWwgPSBgPHNlY3Rpb24gY2xhc3M9XCIke2NsYXNzZXN9XCIgZGF0YS1ncm91cD1cImdob3N0XCI+JHt0aXRsZX08ZGl2IGNsYXNzPVwid3JhcC1ob3Jpem9udGFsICR7cGFkZGluZ30gJHtpc1NvbG99XCI+JHt0aGlzLnByb21vdGVGaXJzdE1hcmt1cH0ke3dyYXBIb3Jpem9udGFsR3JvdXB9JHt0aGlzLmdyb3VwRm9vdGVyTWFya3VwT25lfSR7dGhpcy5ncm91cEZvb3Rlck1hcmt1cFR3b308L3NlY3Rpb24+YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tZXRhLmdyb3VwVHlwZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGh0bWwgPSBgPHNlY3Rpb24gY2xhc3M9XCIke2NsYXNzZXN9XCIgZGF0YS1ncm91cD1cImdob3N0XCI+JHt0aXRsZX08ZGl2IGNsYXNzPVwid3JhcC1kZWZhdWx0XCI+JHt0aGlzLmRlZmF1bHRNYXJrdXB9PC9kaXY+JHt0aGlzLmdyb3VwRm9vdGVyTWFya3VwT25lfSR7dGhpcy5ncm91cEZvb3Rlck1hcmt1cFR3b308L3NlY3Rpb24+YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBodG1sID0gYCR7aHRtbH1gO1xuICAgIHJldHVybiB7XG4gICAgICBodG1sLFxuICAgICAganNFeHRlcm5hbDogdGhpcy5qc0V4dGVybmFsLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVQcm9tb3RlRmlyc3RUZWFzZXIodGVhc2VyTGlzdCkge1xuICAgIGNvbnN0IGdob3N0VGVhc2VycyA9IHRlYXNlckxpc3QuZmlsdGVyKFxuICAgICAgKHRlYXNlcikgPT4gdGVhc2VyLnR5cGUgPT09ICdnaG9zdC10ZWFzZXInXG4gICAgKTtcblxuICAgIGNvbnN0IGZpcnN0R2hvc3RUZWFzZXIgPSBnaG9zdFRlYXNlcnMuc2hpZnQoKTtcbiAgICBpZiAoZmlyc3RHaG9zdFRlYXNlcikge1xuICAgICAgdGhpcy5wcm9tb3RlRmlyc3RNYXJrdXAgPSBgPGRpdiBjbGFzcz1cInByb21vdGUtZmlyc3RcIj4ke2ZpcnN0R2hvc3RUZWFzZXIuaHRtbH08L2Rpdj5gO1xuXG4gICAgICBjb25zdCBpbmRleE9mID0gdGVhc2VyTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICh0ZWFzZXIpID0+IHRlYXNlcj8udGVhc2VySWQgPT09IGZpcnN0R2hvc3RUZWFzZXI/LnRlYXNlcklkXG4gICAgICApO1xuICAgICAgdGVhc2VyTGlzdC5zcGxpY2UoaW5kZXhPZiwgMSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlR3JvdXBGb290ZXJPbmVJdGVtKHRlYXNlckxpc3QpIHtcbiAgICBjb25zdCBsYXN0SXRlbSA9IHRlYXNlckxpc3RbdGVhc2VyTGlzdC5sZW5ndGggLSAxXTtcbiAgICB0aGlzLmdyb3VwRm9vdGVyTWFya3VwT25lID0gbGFzdEl0ZW0uaHRtbDtcbiAgICB0ZWFzZXJMaXN0LnBvcCgpO1xuICB9XG5cbiAgaGFuZGxlR3JvdXBGb290ZXJUd29JdGVtcyh0ZWFzZXJMaXN0KSB7XG4gICAgY29uc3QgbGFzdFR3b0l0ZW1zID0gdGVhc2VyTGlzdC5zbGljZSgtMik7XG4gICAgdGhpcy5ncm91cEZvb3Rlck1hcmt1cFR3byA9IGxhc3RUd29JdGVtc1swXS5odG1sICs9IGxhc3RUd29JdGVtc1sxXS5odG1sO1xuICAgIHRlYXNlckxpc3Quc3BsaWNlKC0yKTtcbiAgfVxuXG4gIGFkZCh0ZWFzZXJMaXN0LCBvbmx5RmlsbENvbnRhaW5lcikge1xuICAgIGxldCBkb25lID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5tZXRhLmdyb3VwVHlwZSA9PT0gJ2xpc3QtaG9yaXpvbnRhbCcgJiYgdGhpcy5tZXRhLnByb21vdGVGaXJzdCkge1xuICAgICAgdGhpcy5oYW5kbGVQcm9tb3RlRmlyc3RUZWFzZXIodGVhc2VyTGlzdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWV0YS5ncm91cEZvb3RlciA9PT0gJ2xhc3RJdGVtJykge1xuICAgICAgdGhpcy5oYW5kbGVHcm91cEZvb3Rlck9uZUl0ZW0odGVhc2VyTGlzdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1ldGEuZ3JvdXBGb290ZXIgPT09ICdsYXN0VHdvSXRlbXMnKSB7XG4gICAgICB0aGlzLmhhbmRsZUdyb3VwRm9vdGVyVHdvSXRlbXModGVhc2VyTGlzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlYXNlckxpc3QuZmlsdGVyKCh0ZWFzZXJEYXRhKSA9PiB7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGVhc2VyRGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYXNlciA9IG5ldyBUZWFzZXIodGVhc2VyRGF0YSk7XG5cbiAgICAgIGxldCBicmVha3BvaW50cyA9IHRoaXMuYnJlYWtwb2ludHMuc2xpY2UoKTtcblxuICAgICAgaWYgKG9ubHlGaWxsQ29udGFpbmVyKSB7XG4gICAgICAgIGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhLndpZHRoID09PSBvbmx5RmlsbENvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYi53aWR0aCA9PT0gb25seUZpbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrcG9pbnRzLmZvckVhY2goKGJyZWFrcG9pbnQpID0+IHtcbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgY29uc3QgaXNBZGRlZCA9IGJyZWFrcG9pbnQuY29udGFpbmVyLmFkZCh0ZWFzZXIsIHRoaXMudHlwZSk7XG5cbiAgICAgICAgICBpZiAoIWlzQWRkZWQgJiYgYnJlYWtwb2ludC53aWR0aCA9PT0gb25seUZpbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzQWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVySW5kZXhbYnJlYWtwb2ludC53aWR0aF0gPSBicmVha3BvaW50LmNvbnRhaW5lci5pbmRleDtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBicmVha3BvaW50LnN0eWxlcy5hbHRlckRpcmVjdGlvbiAmJlxuICAgICAgICAgICAgICBicmVha3BvaW50LmNvbnRhaW5lci5jb250ZW50Lmxlbmd0aCA+IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBicmVha3BvaW50LnN0eWxlcy5sdHIgPSAhYnJlYWtwb2ludC5zdHlsZXMubHRyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlQ29udGFpbmVyKGJyZWFrcG9pbnQsIGJyZWFrcG9pbnQuc3R5bGVzLmx0cik7XG4gICAgICAgICAgICBicmVha3BvaW50LmNvbnRhaW5lci5hZGQodGVhc2VyLCB0aGlzLnR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIWRvbmUpIHtcbiAgICAgICAgbGV0IGF0dHIgPSAnJztcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRlYXNlci5icmVha3BvaW50cyAmJlxuICAgICAgICAgIHRlYXNlci5icmVha3BvaW50c1tjdXJyZW50TGF5b3V0XSAmJlxuICAgICAgICAgIHRlYXNlci5icmVha3BvaW50c1tjdXJyZW50TGF5b3V0XS5hY3RpdmVcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXR0ciArPSBgbGluZWNvdW50PVwiJHt0ZWFzZXIuYnJlYWtwb2ludHNbY3VycmVudExheW91dF0uYWN0aXZlLmxpbmVDb3VudH1cIiBgO1xuICAgICAgICAgIGF0dHIgKz0gYHZlcnNpb249XCIke3RlYXNlci5icmVha3BvaW50c1tjdXJyZW50TGF5b3V0XS5hY3RpdmUudmVyc2lvbn1cIiBgO1xuICAgICAgICAgIGF0dHIgKz0gYHdpZHRoPVwiJHt0ZWFzZXIuYnJlYWtwb2ludHNbY3VycmVudExheW91dF0uYWN0aXZlLndpZHRofVwiIGA7XG4gICAgICAgICAgYXR0ciArPSBgaW5kZXg9XCIke29wdGltdXNFbGVtZW50SW5kZXh9XCJgO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW11c0VsZW1lbnRJbmRleCArPSAxO1xuXG4gICAgICAgIGNvbnN0IGlzU29sb0hvcml6b25hbCA9XG4gICAgICAgICAgdGVhc2VyTGlzdC5sZW5ndGggPT09IDEgJiYgdGhpcy5tZXRhLmdyb3VwVHlwZSA9PT0gJ2xpc3QtaG9yaXpvbnRhbCc7XG4gICAgICAgIGNvbnN0IGlzTXVsdGlwbGVIb3Jpem9udGFsID1cbiAgICAgICAgICB0ZWFzZXJMaXN0Lmxlbmd0aCA+IDEgJiYgdGhpcy5tZXRhLmdyb3VwVHlwZSA9PT0gJ2xpc3QtaG9yaXpvbnRhbCc7XG5cbiAgICAgICAgaWYgKGlzU29sb0hvcml6b25hbCkge1xuICAgICAgICAgIGlmICh0ZWFzZXIudHlwZSA9PT0gJ2dob3N0LXRlYXNlcicpIHtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWxNYXJrdXAgKz0gdGVhc2VyRGF0YS5odG1sO1xuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbENoaWxkcmVuQ291bnQgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNdWx0aXBsZUhvcml6b250YWwpIHtcbiAgICAgICAgICBpZiAodGVhc2VyLnR5cGUgPT09ICdnaG9zdC10ZWFzZXInKSB7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsTWFya3VwICs9IGA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxjb250ZW50ICR7dGhpcy5jYXJvdXNlbENoaWxkcmVuQ291bnR9XCI+JHt0ZWFzZXJEYXRhLmh0bWx9PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWxDaGlsZHJlbkNvdW50ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWV0YS5ncm91cFR5cGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgIC8vIG9ubHkgZm9yIGRlZmF1bHQgZ3JvdXBzXG4gICAgICAgICAgdGhpcy5kZWZhdWx0TWFya3VwICs9IGA8ZGl2IGNsYXNzPVwiZ3JvdXAtZGVmYXVsdC1lbGVtZW50XCIgaWQ9XCJhcnQtJHt0ZWFzZXJEYXRhLmlkfVwiICR7YXR0cn0+JHt0ZWFzZXJEYXRhLmh0bWx9PC9kaXY+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5odG1sICs9IGA8b3B0aW11cy1lbGVtZW50IGlkPVwiYXJ0LSR7dGVhc2VyRGF0YS5pZH1cIiAke2F0dHJ9PiR7dGVhc2VyRGF0YS5odG1sfTwvb3B0aW11cy1lbGVtZW50PmA7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9uZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cFBhZ2VMYXlvdXQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUT0RPIGFkZCB3ZWlnaHQgYW5kIG11bHRpcGxlIHNvcnQga2V5c1xuLy8gY29uc3Qgc29ydEJ5ID0gWydpbmRleCddXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0ZWFzZXJzKSB7XG4gIC8vIGFkZCBtZXRhIGZvciBncm91cHNcbiAgdGVhc2Vycy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgaXRlbS5tZXRhID0gaXRlbS5tZXRhIHx8IHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBjb25zdCBtZXRhID0gaXRlbS5maW5kKChtKSA9PiBtLnR5cGUgPT09ICdtZXRhJyk7XG4gICAgICBpZiAobWV0YSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0ubWV0YSwgbWV0YSk7XG4gICAgICAgIGl0ZW0uc3BsaWNlKGl0ZW0uaW5kZXhPZihtZXRhKSwgMSk7XG4gICAgICB9XG4gICAgICBpdGVtLm1ldGEudHlwZSA9IGl0ZW0ubWV0YS5zb3VyY2UgPT09ICdkcmVkaXRpb24nID8gJ2NvbXBsZXgnIDogJ2dyb3VwJztcblxuICAgICAgaWYgKGl0ZW0ubWV0YS5zb3VyY2UgPT09ICd0djInKSB7XG4gICAgICAgIGl0ZW0ubWV0YS50eXBlID0gJ2NvbXBsZXgnO1xuICAgICAgICBpdGVtLm1ldGEuc291cmNlID0gJ2RyZWRpdGlvbic7XG4gICAgICB9XG4gICAgfVxuICAgIGl0ZW0ubWV0YS5pbmRleCA9IGl0ZW0ubWV0YS5pbmRleCB8fCBpO1xuICB9KTtcblxuICBjb25zdCBmdWxsTGlzdCA9IHRlYXNlcnNcbiAgICAuc29ydCgoYSwgYikgPT4gYS5tZXRhLmluZGV4IC0gYi5tZXRhLmluZGV4KVxuICAgIC5yZWR1Y2UoKHJlc3VsdCwgaXRlbSwgaSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtdKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtdKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldmlvdXNHcm91cCA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICBwcmV2aW91c0dyb3VwLnB1c2goaXRlbSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdWxsTGlzdC5zaGlmdCgpIHx8IGZhbHNlO1xuICB9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbShuYW1lKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xuICByZXR1cm4gcXVlcnkuZ2V0KG5hbWUpIHx8ICcnO1xufVxuXG4vKlxuY3VzdG9tZXJfa2V5czogVGhlIHVzZXIgaGFzIGFjY2VzcyB0aHJvdWdoIHJlZ3VsYXIgc3Vic2NyaXB0aW9uXG5wbHVzc2FsdF9zdWJzY3JpcHRpb246IFRoZSB1c2VyIGhhcyBhY2Nlc3MgdGhyb3VnaCBwbHVzc2FsdCBzdWJzY3JpcHRpb25cbmFtZWRpYV9zdGFmZjogVGhlIHVzZXIgaXMgYW4gZW1wbG95ZWVcbiovXG5mdW5jdGlvbiBnZXROb25TdWJzY3JpYmVySGFzaChubGlIYXNoLCB1c2VyKSB7XG4gIGlmIChcbiAgICAhbmxpSGFzaCB8fFxuICAgIG5saUhhc2ggPT09ICdub3QtaW4tdXNlJyB8fFxuICAgIHVzZXIuZXh0cmFEYXRhLmN1c3RvbWVyX2tleXMgfHxcbiAgICB1c2VyLmV4dHJhRGF0YS5wbHVzc2FsdF9zdWJzY3JpcHRpb24gfHxcbiAgICB1c2VyLmV4dHJhRGF0YS5hbWVkaWFfc3RhZmZcbiAgKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKFxuICAgIGxvY2F0aW9uLmhvc3RuYW1lLmluY2x1ZGVzKCd3d3cuYW8ubm8nKSAmJlxuICAgIHVzZXIuZXh0cmFEYXRhLnVzZXJfZ3JvdXBpbmdfbnVtYmVyIDw9IDM5XG4gICkge1xuICAgIHJldHVybiBubGlIYXNoO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0UmVjb21tZW5kYXRpb25zKHVzZXIsIG5saUhhc2gpIHtcbiAgcmV0dXJuIHtcbiAgICB1c2VyX2tleTogdXNlci50cmFja2luZ0tleSxcbiAgICB1c2VyX2dyb3VwaW5nX251bWJlcjogdXNlci5leHRyYURhdGEudXNlcl9ncm91cGluZ19udW1iZXIsXG4gICAgYW1lZGlhX3N0YWZmOiB1c2VyLmV4dHJhRGF0YS5hbWVkaWFfc3RhZmYsXG4gICAgcmVjb21tZW5kYXRpb25faGFzaDogZ2V0Tm9uU3Vic2NyaWJlckhhc2gobmxpSGFzaCwgdXNlcikgfHwgJycsXG4gICAgdXVpZDogdXNlci51dWlkLFxuICAgIHBsdXNzYWx0X3N1YnNjcmlwdGlvbjpcbiAgICAgIHVzZXIuZXh0cmFEYXRhLnBsdXNzYWx0X3N1YnNjcmlwdGlvbiB8fFxuICAgICAgZ2V0UXVlcnlQYXJhbSgncGx1c3NhbHRfc3Vic2NyaXB0aW9uJykgPT09ICd0cnVlJyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjb21tZW5kYXRpb25zQnJvd3NlcklkKGlkLCBubGlIYXNoKSB7XG4gIGlmIChubGlIYXNoID09PSAnbm90LWluLXVzZScpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB1c2VyX2tleTogaWQsXG4gICAgcmVjb21tZW5kYXRpb25faGFzaDogbmxpSGFzaCxcbiAgfTtcbn1cblxuZXhwb3J0IHsgZ2V0UmVjb21tZW5kYXRpb25zLCBnZXRSZWNvbW1lbmRhdGlvbnNCcm93c2VySWQgfTtcbiIsICIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc05ldHRhdmlzZW4oKSB7XG4gIHJldHVybiBkb2N1bWVudC5kb21haW4uaW5kZXhPZignbmV0dGF2aXNlbi5ubycpICE9PSAtMTtcbn1cblxuLy8gUmV0dXJuaW5nIHRydWUgaWYgaXRlbSBoYXMgYXJyYXkgb2YgbnVtYmVycyB3aGVyZSB0byBhZGQgdGhlIGNvbW9uZW50XG5mdW5jdGlvbiBhbGxQb3NpdGlvbnMoaXRlbSkge1xuICByZXR1cm4gaXRlbSAmJiBpdGVtLmluc2VydFBvc2l0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRlYXNlcklkTWFwKHRlYXNlcnMpIHtcbiAgY29uc3Qga2V5VmFsdWVQYWlycyA9IHRlYXNlcnNcbiAgICAuZmlsdGVyKCh0ZWFzZXIpID0+IHRlYXNlci5pZCAmJiB0ZWFzZXIudHlwZSA9PT0gJ3RlYXNlcicpXG4gICAgLm1hcCgodGVhc2VyKSA9PiBbdGVhc2VyLmlkLCB0cnVlXSk7XG4gIHJldHVybiBuZXcgTWFwKGtleVZhbHVlUGFpcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5Gcm9udFBhZ2VFbGVtZW50cyhmcm9udFBhZ2VFbGVtZW50cywgZGVsdGEsIHByaW1hcnkgPSBbXSkge1xuICAvLyBXZSBnZXQgdGhlIHBvc2l0aW9ucyBmcm9tIGVhY2ggY29tcG9uZW50IGVsZW1lbnQgYW5kIG1ha2UgYSBjb21wbGV0ZSBsaXN0XG4gIC8vIG9mIGNvbXBvbmVudHMvYWRzIHRoYXQgd2UgYWRkIG9uZSBvcmUgbXVsdGlwbGUgdGltZXMgdG8gdGVhc2VySXRlbXMsXG4gIC8vIGF0IHRoZSBjb3JyZWN0IGluZGV4IHBvc2l0aW9uIGxpc3RlZCBpbiB0aGUgaXRlbS5pbnNlcnRQb3NpdGlvbnMgYXJyYXlcbiAgZnJvbnRQYWdlRWxlbWVudHNcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmVycm9yID09PSB1bmRlZmluZWQpXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgY29uc3QgaXRlbVBvcyA9IGl0ZW0uZmluZChhbGxQb3NpdGlvbnMpO1xuICAgICAgICByZXR1cm4gaXRlbVBvcy5pbnNlcnRQb3NpdGlvbnMubWFwKChwb3MpID0+IHtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnRFbGVtZW50ID0gaXRlbS5zbGljZSgwKTtcbiAgICAgICAgICBjb21wb25lbnRFbGVtZW50LnBvcyA9IHBvcyArIGRlbHRhO1xuICAgICAgICAgIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW0uaW5zZXJ0UG9zaXRpb25zLm1hcCgocG9zKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEVsZW1lbnQgPSB7IC4uLml0ZW0gfTsgLy8gY2xvbmUgdGhlIGVsZW1lbnRcbiAgICAgICAgY29tcG9uZW50RWxlbWVudC5wb3MgPSBwb3MgKyBkZWx0YTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpLCBbXSkgLy8gZmxhdHRlblxuICAgIC5zb3J0KChhLCBiKSA9PiBhLnBvcyAtIGIucG9zKVxuICAgIC5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgY29uc3QgcG9zID0gZWwucG9zICsgaTtcbiAgICAgIC8vIGFkIHdpdGggcG9zaXRpb24gbWlkdGJhbm5lcnNtYiB3aWxsIGJlIGFkZGVkIHRvIHRoZSBlbmRcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSkge1xuICAgICAgICBjb25zdCBsYXN0TW9iaWxlQWQgPSBlbC5maW5kKChtKSA9PiBtLnBvc2l0aW9uTmFtZSA9PT0gJ21pZHRiYW5uZXJzbWInKTtcbiAgICAgICAgY29uc3QgYWRkQWQgPSAhbGFzdE1vYmlsZUFkIHx8IGlzTmV0dGF2aXNlbigpO1xuICAgICAgICBpZiAocG9zICsgNCA8IHByaW1hcnkubGVuZ3RoICYmIGFkZEFkKSB7XG4gICAgICAgICAgcmV0dXJuIHByaW1hcnkuc3BsaWNlKHBvcywgMCwgZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0TW9iaWxlQWQpIHtcbiAgICAgICAgICByZXR1cm4gcHJpbWFyeS5wdXNoKGVsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFzdERlc2t0b3BBZCA9IGVsLnBvc2l0aW9uTmFtZSA9PT0gJ25ldGJvYXJkc21iJztcbiAgICAgICAgaWYgKHBvcyArIDQgPCBwcmltYXJ5Lmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBwcmltYXJ5LnNwbGljZShwb3MsIDAsIGVsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgbmV0Ym9hcmRzbWIgbGFzdCBpZiBub3QgYWRkZWQgYmVmb3JlXG4gICAgICAgIGlmIChsYXN0RGVza3RvcEFkKSB7XG4gICAgICAgICAgcmV0dXJuIHByaW1hcnkucHVzaChlbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByaW1hcnk7XG4gICAgfSk7XG4gIHJldHVybiBwcmltYXJ5O1xufVxuIiwgImZ1bmN0aW9uIHNjcm9sbEVsZW1lbnRJbnRvVmlldyhlbCwgb2Zmc2V0KSB7XG4gIGVsLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICdjZW50ZXInIH0pO1xuICBjb25zdCBkZWx0YSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIG9mZnNldDtcbiAgd2luZG93LnNjcm9sbEJ5KDAsIGRlbHRhKTtcbn1cblxuZnVuY3Rpb24gcmVTY3JvbGxFbGVtZW50SW50b1ZpZXcoZWwsIGVsZW1lbnRQcmV2aW91c1RvcCwgb2Zmc2V0KSB7XG4gIGNvbnN0IG5ld1RvcCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgaWYgKG5ld1RvcCA+IGVsZW1lbnRQcmV2aW91c1RvcCArIDEwMCB8fCBuZXdUb3AgPCBlbGVtZW50UHJldmlvdXNUb3AgLSAxMDApIHtcbiAgICBzY3JvbGxFbGVtZW50SW50b1ZpZXcoZWwsIG9mZnNldCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxQb3NpdGlvbigpIHtcbiAgaWYgKCFoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzdGF0ZSA9IGhpc3Rvcnkuc3RhdGU7XG4gIGlmIChzdGF0ZSAmJiBzdGF0ZS5pZCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RhdGUuaWQpO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVhbGVzdGF0ZUNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXG4gICAgICAndGl2b2xpLXJlYWxlc3RhdGVjYXJvdXNlbCdcbiAgICApWzBdO1xuICAgIGNvbnN0IGxhdGVzdGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYW1lZGlhLWxhdGVzdGxpc3QnKVswXTtcblxuICAgIGNvbnN0IGFtZWRpYUluY2x1ZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2FtZWRpYS1pbmNsdWRlJyk7XG4gICAgaWYgKGFtZWRpYUluY2x1ZGVzICYmIHN0YXRlLmFtZWRpYUluY2x1ZGVIZWlnaHRzKSB7XG4gICAgICBbLi4uYW1lZGlhSW5jbHVkZXNdLmZvckVhY2goKGFpKSA9PiB7XG4gICAgICAgIHN0YXRlLmFtZWRpYUluY2x1ZGVIZWlnaHRzLmV2ZXJ5KChhaUhlaWdodCkgPT4ge1xuICAgICAgICAgIGlmIChhaS5nZXRBdHRyaWJ1dGUoJ3NyYycpID09PSBhaUhlaWdodC5zcmMpIHtcbiAgICAgICAgICAgIGFpLnN0eWxlLm1pbkhlaWdodCA9IGAke2FpSGVpZ2h0LmhlaWdodH1weGA7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocmVhbGVzdGF0ZUNhcm91c2VsKSB7XG4gICAgICBpZiAoc3RhdGUudGl2b2xpUlNIZWlnaHQgJiYgc3RhdGUudGl2b2xpUlNIZWlnaHQgPiAyMjUpIHtcbiAgICAgICAgcmVhbGVzdGF0ZUNhcm91c2VsLnN0eWxlLmhlaWdodCA9IGAke3N0YXRlLnRpdm9saVJTSGVpZ2h0fXB4YDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhdGVzdGxpc3QpIHtcbiAgICAgIGlmIChzdGF0ZS5sYXRlc3RMaXN0SGVpZ2h0ICYmIHN0YXRlLmxhdGVzdExpc3RIZWlnaHQgPiAxMykge1xuICAgICAgICBsYXRlc3RsaXN0LnN0eWxlLmhlaWdodCA9IGAke3N0YXRlLmxhdGVzdExpc3RIZWlnaHR9dndgO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSBzdGF0ZS5vZmZzZXQ7XG4gICAgLy8gRGVsYXkgYmVmb3JlIGNsaWNrZWQgZWxlbWVudCBpcyBzY3JvbGxlZCBpbnRvIHZpZXcsIHNvIHRoZSBwYWdlIGhhcyB0aW1lIHRvIGRyYXdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNjcm9sbEVsZW1lbnRJbnRvVmlldyhlbCwgb2Zmc2V0KTtcbiAgICAgIGNvbnN0IGVsZW1lbnRUb3AgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICBsZXQgaGFzU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBEbyBub3QgcmVzY3JvbGwgZWxlbWVudCBpbnRvIHZpZXcgaWYgdXNlciBzdGFydHMgc2Nyb2xsaW5nIHRvIGF2b2lkIGp1bXBpbmdcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ3Njcm9sbCcsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgaGFzU2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBoYXMgZWxlbWVudCBtb3ZlZCBiZWNhdXNlIG9mIHNsb3cgcGFnZSByZW5kcmluZ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoIWhhc1Njcm9sbGVkKSB7XG4gICAgICAgICAgICByZVNjcm9sbEVsZW1lbnRJbnRvVmlldyhlbCwgZWxlbWVudFRvcCwgb2Zmc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDE1MDApO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSwgNjAwKTtcbiAgfVxufVxuIiwgImNsYXNzIFBlcnNvbmFsaXNlZERhdGFFeHBlcmltZW50IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgZGF0YSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnRlYXNlckRhdGEgPSB0aGlzLmZpbHRlck1ldGFUZWFzZXJzKGRhdGEpO1xuICAgIHRoaXMucGVyc29uYWxpemVkVGVhc2VycyA9IHRoaXMuZ2V0UGVyc29uYWxpemVkVGVhc2VycyhkYXRhKTtcbiAgICB0aGlzLnRvcExpc3RUZWFzZXJzID0gdGhpcy5wZXJzb25hbGl6ZWRUZWFzZXJzPy5maWx0ZXIoXG4gICAgICAoZWwpID0+IGVsLnNvdXJjZSA9PT0gJ3RvcGxpc3QnXG4gICAgKTtcbiAgICB0aGlzLnRyYWNlclJlcXVlc3RJZCA9IHRoaXMuZ2V0VHJhY2VyUmVxdWVzdElkKGRhdGEpO1xuICAgIHRoaXMuc2V0VGVhc2VyVHJhY2VyTWFya3VwKCk7XG4gIH1cblxuICBmaWx0ZXJNZXRhVGVhc2VycyhkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEuZmlsdGVyKFxuICAgICAgKGVsKSA9PiBlbCAmJiAhZWwucGVyc29uYWxpc2VkX2NvbnRlbnQgJiYgIWVsLnRyYWNlcl9yZXF1ZXN0X2lkXG4gICAgKTtcbiAgfVxuXG4gIGdldFBlcnNvbmFsaXplZFRlYXNlcnMoZGF0YSkge1xuICAgIHJldHVybiAoXG4gICAgICBkYXRhXG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgKGVsKSA9PlxuICAgICAgICAgICAgZWwgJiYgZWwucGVyc29uYWxpc2VkX2NvbnRlbnQgJiYgZWwucGVyc29uYWxpc2VkX2NvbnRlbnQubGVuZ3RoID4gMFxuICAgICAgICApXG4gICAgICAgIC5tYXAoKGVsKSA9PiBlbC5wZXJzb25hbGlzZWRfY29udGVudClbMF0gfHwgW11cbiAgICApO1xuICB9XG5cbiAgZ2V0VHJhY2VyUmVxdWVzdElkKGRhdGEpIHtcbiAgICBsZXQgdHJhY2VyUmVxdWVzdElkID0gJyc7XG4gICAgZGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgaWYgKGVsPy50cmFjZXJfcmVxdWVzdF9pZCkge1xuICAgICAgICB0cmFjZXJSZXF1ZXN0SWQgPSBlbC50cmFjZXJfcmVxdWVzdF9pZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdHJhY2VyUmVxdWVzdElkO1xuICB9XG5cbiAgZ2V0UGFnZVRyYWNlck1hcmt1cCgpIHtcbiAgICBjb25zdCBpdGVtc2NvcGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpdGVtc2NvcGUuc2V0QXR0cmlidXRlKCdpZCcsICdvcmRpbm9UcmFjZXInKTtcblxuICAgIGlmICh0aGlzLnRyYWNlclJlcXVlc3RJZCB8fCB0aGlzLnRvcExpc3RUZWFzZXJzKSB7XG4gICAgICBpdGVtc2NvcGUuc2V0QXR0cmlidXRlKCdpdGVtc2NvcGUnLCAnJyk7XG4gICAgICBpdGVtc2NvcGUuc2V0QXR0cmlidXRlKFxuICAgICAgICAnaXRlbXR5cGUnLFxuICAgICAgICAnaHR0cHM6Ly93d3cuYWRwbG9nZ2VyLm5vL2pzb24tc2NoZW1hL0N1c3RvbUVsZW1lbnQnXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpdGVtUHJvcFRyYWNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgIGl0ZW1Qcm9wVHJhY2VyLnNldEF0dHJpYnV0ZSgnaXRlbXByb3AnLCAnY3VzdG9tLWVsZW1lbnQjZGF0YScpO1xuICAgICAgY29uc3QgdHJhY2VyT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB0cmFjZXJPYmplY3QsXG4gICAgICAgIHRoaXMudHJhY2VyUmVxdWVzdElkID8geyB0cmFjZXJfcmVxdWVzdF9pZDogdGhpcy50cmFjZXJSZXF1ZXN0SWQgfSA6IHt9XG4gICAgICApO1xuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgdHJhY2VyT2JqZWN0LFxuICAgICAgICB0aGlzLnRvcExpc3RUZWFzZXJzID8geyBwZXJzb25hbGl6ZWRfdG9wbGlzdDogdGhpcy50b3BMaXN0VGVhc2VycyB9IDoge31cbiAgICAgICk7XG5cbiAgICAgIGl0ZW1Qcm9wVHJhY2VyLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGAke0pTT04uc3RyaW5naWZ5KHRyYWNlck9iamVjdCl9YCk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Qcm9wTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgIGl0ZW1Qcm9wTmFtZS5zZXRBdHRyaWJ1dGUoJ2l0ZW1wcm9wJywgJ2N1c3RvbS1lbGVtZW50I25hbWUnKTtcbiAgICAgIGl0ZW1Qcm9wTmFtZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCAnb3JkaW5vX2Zyb250X2ZlZWQnKTtcblxuICAgICAgaXRlbXNjb3BlLmFwcGVuZENoaWxkKGl0ZW1Qcm9wVHJhY2VyKTtcbiAgICAgIGl0ZW1zY29wZS5hcHBlbmRDaGlsZChpdGVtUHJvcE5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbXNjb3BlO1xuICB9XG5cbiAgYWRkSXRlbVByb3BUb0hUTUwoaHRtbCwgaXRlbVByb3AsIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFxuICAgICAgJzxtZXRhJyxcbiAgICAgIGA8bWV0YSBpdGVtcHJvcD1cIiR7aXRlbVByb3B9XCIgY29udGVudD1cIiR7Y29udGVudH1cIiAvPjxtZXRhYFxuICAgICk7XG4gIH1cblxuICBzZXRUZWFzZXJUcmFjZXJNYXJrdXAoKSB7XG4gICAgdGhpcy50b3BMaXN0VGVhc2Vycz8uZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGlmICh0aGlzLnRlYXNlckRhdGFbZWwucG9zaXRpb24udG9dLmh0bWwpIHtcbiAgICAgICAgdGhpcy50ZWFzZXJEYXRhW2VsLnBvc2l0aW9uLnRvXS5odG1sID0gdGhpcy5hZGRJdGVtUHJvcFRvSFRNTChcbiAgICAgICAgICB0aGlzLnRlYXNlckRhdGFbZWwucG9zaXRpb24udG9dLmh0bWwsXG4gICAgICAgICAgJ3Byb2R1Y3RGZWF0dXJlJyxcbiAgICAgICAgICAncGVyc29uYWxpemVkX3RvcGxpc3QnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGVyc29uYWxpc2VkRGF0YUV4cGVyaW1lbnQgfTtcbiIsICJmdW5jdGlvbiByZXdyaXRlTmFycm93V2lkZShzcmMpIHtcbiAgY29uc3Qgdmlld1dpZHRoID0gTWF0aC5taW4oXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IDBcbiAgKTtcbiAgaWYgKHZpZXdXaWR0aCA8IDc2OCkge1xuICAgIHJldHVybiBzcmMucmVwbGFjZSgnL3dpZGUnLCAnL25hcnJvdycpO1xuICB9XG4gIHJldHVybiBzcmM7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFBlcnNvbmFsaXplKCkge1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIGNvbnN0IGhhc1BlcnNvbmFsaXplZFBhcmFtID0gcXVlcnkuaGFzKCdwZXJzb25hbGl6ZWQnKTtcblxuICBpZiAoIWhhc1BlcnNvbmFsaXplZFBhcmFtKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gcXVlcnkuZ2V0KCdwZXJzb25hbGl6ZWQnKSA9PT0gJ3RydWUnO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKHNyYywgdG9rZW4sIHJlY29tbWVuZGF0aW9ucyA9IHt9KSB7XG4gIGxldCBzcmNVcmwgPSBzcmM7XG4gIGxldCBmZXRjaE9wdGlvbnMgPSB7fTtcbiAgbGV0IHF1ZXJ5UGFyYW1zID0ge1xuICAgIHRva2VuLFxuICAgIHRzOiBEYXRlLm5vdygpLFxuICB9O1xuICBpZiAoc3JjLmluY2x1ZGVzKCcvb3JkaW5vJykpIHtcbiAgICBzcmNVcmwgPSByZXdyaXRlTmFycm93V2lkZShzcmMpO1xuXG4gICAgaWYgKHJlY29tbWVuZGF0aW9ucy51dWlkKSB7XG4gICAgICBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAndXNlci11dWlkJzogcmVjb21tZW5kYXRpb25zLnV1aWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJzb25hbGl6ZWQgPSBzaG91bGRQZXJzb25hbGl6ZSgpO1xuICAgIHF1ZXJ5UGFyYW1zID0ge1xuICAgICAgLi4ucXVlcnlQYXJhbXMsXG4gICAgICAuLi4ocmVjb21tZW5kYXRpb25zLnBsdXNzYWx0X3N1YnNjcmlwdGlvbiAmJiB7XG4gICAgICAgIHBsdXNzYWx0X3N1YnNjcmlwdGlvbjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgLi4uKHJlY29tbWVuZGF0aW9ucy51c2VyX2tleSAmJiB7XG4gICAgICAgIHVzZXJfa2V5OiByZWNvbW1lbmRhdGlvbnMudXNlcl9rZXksXG4gICAgICB9KSxcbiAgICAgIC4uLihyZWNvbW1lbmRhdGlvbnMucmVjb21tZW5kYXRpb25faGFzaCAmJiB7XG4gICAgICAgIHJlY29tbWVuZGF0aW9uX2hhc2g6IHJlY29tbWVuZGF0aW9ucy5yZWNvbW1lbmRhdGlvbl9oYXNoLFxuICAgICAgfSksXG4gICAgICAuLi4ocmVjb21tZW5kYXRpb25zICYmXG4gICAgICAgIHJlY29tbWVuZGF0aW9ucy51c2VyX2dyb3VwaW5nX251bWJlciAmJiB7XG4gICAgICAgICAgdXNlcl9ncm91cDogcmVjb21tZW5kYXRpb25zLnVzZXJfZ3JvdXBpbmdfbnVtYmVyLFxuICAgICAgICB9KSxcbiAgICAgIC4uLihyZWNvbW1lbmRhdGlvbnMgJiZcbiAgICAgICAgcmVjb21tZW5kYXRpb25zLmFtZWRpYV9zdGFmZiAmJiB7XG4gICAgICAgICAgYW1lZGlhX3N0YWZmOiByZWNvbW1lbmRhdGlvbnMuYW1lZGlhX3N0YWZmLFxuICAgICAgICB9KSxcbiAgICAgIC4uLighcGVyc29uYWxpemVkID8geyBwZXJzb25hbGl6ZWQ6IGZhbHNlIH0gOiB7fSksXG4gICAgfTtcbiAgfVxuICBpZiAoc3JjVXJsICYmIHNyY1VybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICBzcmNVcmwgPSBgaHR0cHM6Ly8ke2RvY3VtZW50LmRvbWFpbn0ke3NyY1VybH1gO1xuICB9XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoc3JjVXJsKTtcbiAgT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpLmZvckVhY2goKG5hbWUpID0+XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQobmFtZSwgcXVlcnlQYXJhbXNbbmFtZV0pXG4gICk7XG4gIHJldHVybiBmZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmFpbGVkIHRvIGZldGNoICR7c3JjfS4gU3RhdHVzIGNvZGUgJHtyZXMuc3RhdHVzQ29kZX0uIFN0YXR1cyB0ZXh0ICR7cmVzLnN0YXR1c1RleHR9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgZGF0YS5xdWVyeVBhcmFtcyA9IHF1ZXJ5UGFyYW1zO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2NhbFN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gIGxldCBzdG9yYWdlO1xuICB0cnkge1xuICAgIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAoXG4gICAgICBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmXG4gICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAoZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgIHN0b3JhZ2UgJiZcbiAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB0ZXN0Rm9yTG9jYWxTdG9yYWdlIGZyb20gJy4vdGVzdC1mb3ItbG9jYWxzdG9yYWdlLmpzJztcblxubGV0IHRvayA9IDEwMDAwO1xuaWYgKHRlc3RGb3JMb2NhbFN0b3JhZ2UoKSkge1xuICB0b2sgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FiX3Rva2VuJyk7XG4gIGlmICghdG9rKSB7XG4gICAgdG9rID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogODk5OTk5KSArIDEwMDAwMDtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FiX3Rva2VuJywgdG9rKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9rZW4gPSB0b2s7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0FydGljbGUoKSB7XG4gIGNvbnN0IHBhZ2Vtb2RlbCA9XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZW1vZGVsJykgfHwgJyc7XG4gIHJldHVybiBbJ3N0b3J5JywgJ2ZlYXR1cmUnLCAnb3BpbmlvbiddLmluY2x1ZGVzKHBhZ2Vtb2RlbCk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJuYWxUcmFmZmljKHd3d0RvbWFpbikge1xuICByZXR1cm4gZG9jdW1lbnQucmVmZXJyZXIuaW5jbHVkZXMod3d3RG9tYWluKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFnZURhdGEoKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2UtZGF0YScpPy50ZXh0Q29udGVudCB8fCAne30nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ3VycmVudEFydGljbGUodGVhc2VycywgaW5kZXgpIHtcbiAgdGVhc2Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICByZXR1cm4gdGVhc2Vycztcbn1cblxuZnVuY3Rpb24gaW5qZWN0RGVzY3JpcHRpb24oaW5kZXgsIGxlbmd0aCkge1xuICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBgU2FrZW4gZHUgaGFyIGxlc3QgZXIgbnVtbWVyICR7XG4gICAgaW5kZXggKyAxXG4gIH0gYXYgJHtsZW5ndGh9IHBcdTAwRTUgZm9yc2lkZW4uIEZvcnRzZXR0IFx1MDBFNSBsZXNlIGZyYSBzYWsgJHtpbmRleCArIDJ9OmA7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZGVzY3JpcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRlc2NyaXB0aW9uVGV4dCkpO1xuICBkZXNjcmlwdGlvbkVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9ICdPcGVuIFNhbnMnO1xuICBkZXNjcmlwdGlvbkVsZW1lbnQuc3R5bGUuZm9udFN0eWxlID0gJ2l0YWxpYyc7XG4gIGRlc2NyaXB0aW9uRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICdsYXJnZXInO1xuICBkZXNjcmlwdGlvbkVsZW1lbnQuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG4gIGNvbnN0IGZyb250cGFnZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYW1lZGlhLWZyb250cGFnZScpWzBdO1xuICBmcm9udHBhZ2VFbGVtZW50Lmluc2VydEJlZm9yZShcbiAgICBkZXNjcmlwdGlvbkVsZW1lbnQsXG4gICAgZnJvbnRwYWdlRWxlbWVudC5maXJzdENoaWxkXG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZWNlZGluZ1RlYXNlcnModGVhc2VycywgaW5kZXgsIHVzZXJEYXRhKSB7XG4gIGNvbnN0IG1pblRlYXNlcnNMZW5ndGggPSA1O1xuICBpZiAoaW5kZXggPCB0ZWFzZXJzLmxlbmd0aCAtIG1pblRlYXNlcnNMZW5ndGgpIHtcbiAgICBpZiAoXG4gICAgICB1c2VyRGF0YS5leHRyYURhdGEudXNlcl9ncm91cGluZ19udW1iZXIgPD0gMTUgfHxcbiAgICAgIHVzZXJEYXRhLmV4dHJhRGF0YS5hbWVkaWFfc3RhZmZcbiAgICApIHtcbiAgICAgIGluamVjdERlc2NyaXB0aW9uKGluZGV4LCB0ZWFzZXJzLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB0ZWFzZXJzLnNwbGljZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHRlYXNlcnM7XG59XG5cbmZ1bmN0aW9uIGFwcGx5QXJ0aWNsZVRyZWF0bWVudCh0ZWFzZXJzLCB1c2VyRGF0YSkge1xuICBjb25zdCBwYWdlRGF0YSA9IGdldFBhZ2VEYXRhKCk7XG4gIGlmIChcbiAgICAhcGFnZURhdGEuZW52IHx8XG4gICAgIXVzZXJEYXRhIHx8XG4gICAgdXNlckRhdGEuZXh0cmFEYXRhLnVzZXJfZ3JvdXBpbmdfbnVtYmVyID49IDMyXG4gICkge1xuICAgIHJldHVybiB0ZWFzZXJzO1xuICB9XG4gIGNvbnN0IGFjcElkID0gcGFnZURhdGEuZGF0YS5maWVsZHMuaWQ7XG4gIGxldCBmbGF0VGVhc2VycyA9IHRlYXNlcnMuZmxhdCgpO1xuICBjb25zdCBjdXJyZW50QXJ0aWNsZUluZGV4ID0gZmxhdFRlYXNlcnMuZmluZEluZGV4KFxuICAgIChpdGVtKSA9PiBpdGVtLmlkID09PSBhY3BJZCB8fCBpdGVtLmFkcD8udGVhc2VySWQgPT09IGFjcElkXG4gICk7XG4gIGlmIChjdXJyZW50QXJ0aWNsZUluZGV4IDwgMCkge1xuICAgIHJldHVybiB0ZWFzZXJzO1xuICB9XG4gIGZsYXRUZWFzZXJzID0gcmVtb3ZlQ3VycmVudEFydGljbGUoZmxhdFRlYXNlcnMsIGN1cnJlbnRBcnRpY2xlSW5kZXgpO1xuICBpZiAoaXNJbnRlcm5hbFRyYWZmaWMocGFnZURhdGEuZW52LnB1YmxpY2F0aW9uLnd3d0RvbWFpbikpIHtcbiAgICBmbGF0VGVhc2VycyA9IHJlbW92ZVByZWNlZGluZ1RlYXNlcnMoXG4gICAgICBmbGF0VGVhc2VycyxcbiAgICAgIGN1cnJlbnRBcnRpY2xlSW5kZXgsXG4gICAgICB1c2VyRGF0YVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZsYXRUZWFzZXJzO1xufVxuXG5leHBvcnQgeyBpc0FydGljbGUsIGFwcGx5QXJ0aWNsZVRyZWF0bWVudCB9O1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24sIG5vLXBsdXNwbHVzICovXG5sZXQgcm5nO1xuY29uc3Qgd2luID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgPyBzZWxmXG4gICAgOiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gd2luZG93XG4gICAgICAgICAgICA6IGdsb2JhbDtcbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxuY29uc3QgZ2V0UmFuZG9tVmFsdWVzID1cbiAgICAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAodHlwZW9mIHdpbi5tc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbi5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgd2luLm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKHdpbi5tc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gICAgY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICAgIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICAgICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICAgICAgcmV0dXJuIHJuZHM4O1xuICAgIH07XG59IGVsc2Uge1xuICAgIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgICAvL1xuICAgIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gICAgLy8gcXVhbGl0eS5cbiAgICBjb25zdCBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICAgIHJuZyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCByOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuICAgICAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHtcbiAgICAgICAgICAgICAgICByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm5kc1tpXSA9IChyID4+PiAoKGkgJiAweDAzKSA8PCAzKSkgJiAweGZmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJuZHM7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICAgIGxldCBpID0gb2Zmc2V0IHx8IDA7XG4gICAgY29uc3QgYnRoID0gYnl0ZVRvSGV4O1xuICAgIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgJy0nLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICAnLScsXG4gICAgICAgIGJ0aFtidWZbaSsrXV0sXG4gICAgICAgIGJ0aFtidWZbaSsrXV0sXG4gICAgICAgICctJyxcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgYnRoW2J1ZltpKytdXSxcbiAgICAgICAgJy0nLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgICAgICBidGhbYnVmW2krK11dLFxuICAgIF0uam9pbignJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIGNvbnN0IHJuZHMgPSBybmcoKTtcblxuICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gICAgcmV0dXJuIGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuIiwgImNvbnN0IGxheW91dHNEZWZhdWx0ID0gKCkgPT4gKHtcbiAgNTAwOiB7IHRlYXNlclNpemVzOiBbNTAwLCAyNzYsIDIxMl0gfSxcbiAgOTgwOiB7IHRlYXNlclNpemVzOiBbOTgwLCA3ODAsIDY4MCwgNTgwLCA0ODAsIDM4MCwgMjgwXSB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRWZXJzaW9ucyA9IChsYXlvdXRQcm9wcykgPT4ge1xuICBsZXQgbGF5b3V0VmVyc2lvbjtcbiAgY29uc3QgbGF5b3V0V2lkdGhzID0gT2JqZWN0LmtleXMobGF5b3V0UHJvcHMuZGltZW5zaW9ucyB8fCB7fSlcbiAgICAubWFwKChrZXkpID0+IHBhcnNlSW50KGtleSwgMTApKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cbiAgaWYgKGxheW91dFdpZHRocy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgbGF5b3V0ID0gbGF5b3V0c0RlZmF1bHQoKTtcbiAgICBsYXlvdXRWZXJzaW9uID0gT2JqZWN0LmtleXMobGF5b3V0KS5yZWR1Y2UoKHJlc3VsdCwgYnJlYWtwb2ludCkgPT4ge1xuICAgICAgcmVzdWx0W2JyZWFrcG9pbnRdID0gbGF5b3V0W2JyZWFrcG9pbnRdLnRlYXNlclNpemVzXG4gICAgICAgIC5maWx0ZXIoKHNpemUpID0+IHtcbiAgICAgICAgICBpZiAoIWxheW91dFByb3BzLndpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICEoXG4gICAgICAgICAgICBsYXlvdXRQcm9wcy53aWR0aC5taW4gPiBzaXplIHx8IGxheW91dFByb3BzLndpZHRoLm1heCA8IHNpemVcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChzaXplKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGltZW5zaW9uS2V5ID0gbGF5b3V0V2lkdGhzLmZpbHRlcigodykgPT4gdyA8PSBzaXplKS5wb3AoKTtcbiAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID1cbiAgICAgICAgICAgIGxheW91dFByb3BzLmRpbWVuc2lvbnNbZGltZW5zaW9uS2V5XSB8fCBsYXlvdXRQcm9wcy5kaW1lbnNpb25zWzBdO1xuICAgICAgICAgIGlmICghZGltZW5zaW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgIHZlcnNpb25zOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLnJhdGlvXG4gICAgICAgICAgICAgICAgICAgID8gKGRpbWVuc2lvbnMucmF0aW8gLyAxMDApICogc2l6ZVxuICAgICAgICAgICAgICAgICAgICA6IGRpbWVuc2lvbnMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbiAgfVxuICByZXR1cm4gbGF5b3V0VmVyc2lvbjtcbn07XG4iLCAiaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BhbWVkaWEvdXVpZCc7XG5cbmltcG9ydCB7IGdldFZlcnNpb25zIH0gZnJvbSAnLi92ZXJzaW9ucy5qcyc7XG5cbmNvbnN0IGdldE1uZW1vbmljSG9zdCA9ICgpID0+IHtcbiAgY29uc3QgeyBob3N0IH0gPSB3aW5kb3cubG9jYXRpb247XG4gIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwMC5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDAuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwMS5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDEuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwMi5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDIuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwMy5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDMuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwNC5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDQuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwNS5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDUuYXBpLm5vJztcbiAgfSBlbHNlIGlmIChob3N0LmluY2x1ZGVzKCdzbmFwNi5hcGkubm8nKSkge1xuICAgIHJldHVybiAnc2VydmljZXMtc25hcDYuYXBpLm5vJztcbiAgfVxuICByZXR1cm4gJ3NlcnZpY2VzLmFwaS5ubyc7XG59O1xuXG4vLyBQb2x5ZmlsbCBmb3IgT2JqZWN0LmZyb21FbnRyaWVzXG5pZiAoIU9iamVjdC5mcm9tRW50cmllcykge1xuICBPYmplY3QuZnJvbUVudHJpZXMgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgIGlmICghZW50cmllcyB8fCAhZW50cmllc1tTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdPYmplY3QuZnJvbUVudHJpZXMoKSByZXF1aXJlcyBhIHNpbmdsZSBpdGVyYWJsZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBvYmogPSB7fTtcbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldEFiVGVzdFVybCA9IChhYlRlc3RTdHIsIHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gYWJUZXN0U3RyLnNwbGl0KCd8Jyk7XG4gIGlmIChwYXJ0cy5sZW5ndGggIT0gNCkge1xuICAgIHJldHVybiBhYlRlc3RTdHI7XG4gIH1cbiAgY29uc3QgYlJhbmdlU3RhcnQgPSBwYXJ0c1syXS5zcGxpdCgnLScpWzBdO1xuICBjb25zdCBiUmFuZ2VFbmQgPSBwYXJ0c1syXS5zcGxpdCgnLScpWzFdO1xuICBjb25zdCB1c2VyR3JvdXAgPSB1c2VyRGF0YT8uZXh0cmFEYXRhPy51c2VyX2dyb3VwaW5nX251bWJlcjtcbiAgaWYgKHVzZXJHcm91cCAmJiB1c2VyR3JvdXAgPj0gYlJhbmdlU3RhcnQgJiYgdXNlckdyb3VwIDw9IGJSYW5nZUVuZCkge1xuICAgIHJldHVybiBwYXJ0c1sxXTtcbiAgfVxuICByZXR1cm4gcGFydHNbMF07XG59O1xuXG5jb25zdCByZW5kZXJIVE1MID0gKHVybCwgcHVibGljYXRpb24sIHVzZXJEYXRhKSA9PiB7XG4gIGlmICh1cmwuZW5kc1dpdGgoJ3xhYnRlc3QnKSkge1xuICAgIHVybCA9IGdldEFiVGVzdFVybCh1cmwsIHVzZXJEYXRhKTtcbiAgfVxuICBjb25zdCBwYXJhbXMgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IFVSTFNlYXJjaFBhcmFtcyhuZXcgVVJMKHVybCkuc2VhcmNoKSk7XG4gIHBhcmFtcy5wdWJsaWNhdGlvbiA9IHB1YmxpY2F0aW9uO1xuXG4gIGNvbnN0IG1hbmlmZXN0VXJsID0gYGh0dHBzOi8vJHtnZXRNbmVtb25pY0hvc3QoKX0vYXBpL21uZW1vbmljL3YxL21hbmlmZXN0LyR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgIHVybFxuICApfWA7XG4gIGNvbnN0IGF0dHIgPSBPYmplY3Qua2V5cyhwYXJhbXMpXG4gICAgLm1hcCgoa2V5KSA9PiBgcGFyYW0tJHtrZXl9PVwiJHtwYXJhbXNba2V5XX1cImApXG4gICAgLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYDxhbWVkaWEtaW5jbHVkZSAke2F0dHJ9IGxhenk9XCJ0cnVlXCIgbWFuaWZlc3Q9XCIke21hbmlmZXN0VXJsfVwiPjwvYW1lZGlhLWluY2x1ZGU+YDtcbn07XG5cbmNvbnN0IHJlbmRlclNtYXJ0RW1iZWQgPSAodGVhc2VyLCB1c2VyRGF0YSkgPT4ge1xuICBpZiAodGVhc2VyLnR5cGUgIT09ICdzbWFydC1lbWJlZCcgfHwgIXRlYXNlci5pZC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICByZXR1cm4gdGVhc2VyO1xuICB9XG4gIGNvbnN0IHJlbmRlcmVkVGVhc2VyID0ge1xuICAgIGlkOiB1dWlkKCksXG4gICAgdHlwZTogJ3NtYXJ0ZW1iZWQnLFxuICAgIHByZW1pdW06IGZhbHNlLFxuICAgIGh0bWw6IHJlbmRlckhUTUwodGVhc2VyLmlkLCB0ZWFzZXIucHVibGljYXRpb24sIHVzZXJEYXRhKSxcbiAgICBqczogW10sXG4gIH07XG5cbiAgY29uc3QgbGF5b3V0ID0gZ2V0VmVyc2lvbnModGVhc2VyLmxheW91dCk7XG4gIGlmIChsYXlvdXQpIHtcbiAgICByZW5kZXJlZFRlYXNlci5sYXlvdXQgPSBsYXlvdXQ7XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyZWRUZWFzZXIudW5rbm93bkhlaWdodCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gcmVuZGVyZWRUZWFzZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJTbWFydEVtYmVkO1xuIiwgImltcG9ydCB7IHV1aWQgfSBmcm9tICdAYW1lZGlhL3V1aWQnO1xuXG5pbXBvcnQgeyBnZXRWZXJzaW9ucyB9IGZyb20gJy4vdmVyc2lvbnMuanMnO1xuXG4vLyBBIHJhbmRvbSBzdGF0aWNMYXlvdXQgZm9yIG5vdywgdGhlIGhlaWdodHMvcmF0aW9zIHNob3VsZCBiZSByZXBsYWNlZCB3aXRoIHNvbWV0aGluZyBjb29sIGFuZCBkeW5hbWljLlxuLy8gbWluL21heC13aWR0aCBzaG91bGQgY29tZSBmcm9tIHRoZSBzb3VyY2U/XG5cbmNvbnN0IHN0YXRpY0xheW91dCA9IHtcbiAgZGltZW5zaW9uczoge1xuICAgIDI4MDoge1xuICAgICAgcmF0aW86IDEyMCxcbiAgICB9LFxuICAgIDM4MDoge1xuICAgICAgcmF0aW86IDExMCxcbiAgICB9LFxuICAgIDQ4MDoge1xuICAgICAgcmF0aW86IDEwMCxcbiAgICB9LFxuICAgIDUwMDoge1xuICAgICAgcmF0aW86IDgwLFxuICAgIH0sXG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgbWluOiAyODAsXG4gICAgbWF4OiA1MDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyR2hvc3RUZWFzZXIoXG4gIHRlYXNlcixcbiAgdGhlbWUsXG4gIHB1YmxpY2F0aW9uLFxuICBzaG93UGxheWVyVG9Vc2VyXG4pIHtcbiAgbGV0IG1hdGNoaW5nUHJlZmVyZW5jZSA9ICcnO1xuXG4gIGxldCBpc1Nwb3J0c1RlYXNlciA9IGZhbHNlO1xuICBpZiAodGVhc2VyLmlkLnN0YXJ0c1dpdGgoJzE5JykpIHtcbiAgICBpc1Nwb3J0c1RlYXNlciA9IHRydWU7XG4gICAgbWF0Y2hpbmdQcmVmZXJlbmNlID0gYCR7dGVhc2VyLnNvdXJjZVBhcnRpY2lwYW50fWA7XG4gIH1cblxuICAvL2NvbnN0IHRlYXNlcklkID0gJzUtNTUtMTI3MjY3MCc7XG4gIC8vY29uc3QgZnJvbnRQYWdlSWQgPSAnMTEtNThjYTVkMjQ1MzIxNWUwYWQ2YjNmMjQxJztcblxuICBjb25zdCB0ZWFzZXJJZCA9IHRlYXNlci5pZDtcbiAgbGV0IGZyb250UGFnZUlkID0gdGVhc2VyLmZyb250cGFnZV9pZDtcbiAgaWYgKCFmcm9udFBhZ2VJZCkge1xuICAgIGZyb250UGFnZUlkID0gdGVhc2VyLmZyb250cGFnZUlEO1xuICB9XG4gIGNvbnN0IGNoZWNrc3VtID0gdGVhc2VyLmNoZWNrc3VtO1xuICBsZXQgcHVycG9zZSA9IHRlYXNlci5hdXhEYXRhPy5kb21haW47XG4gIGlmICghcHVycG9zZSkge1xuICAgIHB1cnBvc2UgPSB0ZWFzZXIuZG9tYWluO1xuICB9XG5cbiAgY29uc3QgdGVhc2VyRGF0YSA9IGA8YW1lZGlhLWxhc2VyYmVhayBzcG9ydHM9XCIke2lzU3BvcnRzVGVhc2VyfVwiIGZyb250cGFnZS1pZD1cIiR7ZnJvbnRQYWdlSWR9XCIgdGVhc2VyLWlkPVwiJHt0ZWFzZXJJZH1cIiBjaGVja3N1bT1cIiR7Y2hlY2tzdW19XCIgcHVycG9zZT1cIiR7cHVycG9zZX1cIiB0aGVtZT1cIiR7dGhlbWV9XCIgcHVibGljYXRpb249XCIke3B1YmxpY2F0aW9ufVwiIHByZWZlcmVuY2U9XCIke21hdGNoaW5nUHJlZmVyZW5jZX1cIiBoYXMtYWNjZXNzPVwiJHtzaG93UGxheWVyVG9Vc2VyfVwiPjwvYW1lZGlhLWxhc2VyYmVhaz5gO1xuXG4gIGNvbnN0IHJlbmRlcmVkVGVhc2VyID0ge1xuICAgIGlkOiB1dWlkKCksXG4gICAgdGVhc2VySWQ6IHRlYXNlci5pZCxcbiAgICB0eXBlOiAnZ2hvc3QtdGVhc2VyJyxcbiAgICBwcmVtaXVtOiB0ZWFzZXIucHJlbWl1bSxcbiAgICBodG1sOiB0ZWFzZXJEYXRhLFxuICAgIGpzOiBbXSxcbiAgfTtcblxuICBjb25zdCBsYXlvdXQgPSBnZXRWZXJzaW9ucyhzdGF0aWNMYXlvdXQpO1xuICBpZiAobGF5b3V0KSB7XG4gICAgcmVuZGVyZWRUZWFzZXIubGF5b3V0ID0gbGF5b3V0O1xuICB9IGVsc2Uge1xuICAgIHJlbmRlcmVkVGVhc2VyLnVua25vd25IZWlnaHQgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHJlbmRlcmVkVGVhc2VyO1xufVxuIiwgIi8qKlxuICogVGhlIHJlc3VsdCBvZiBtZXRob2QgaW52b2tlZCB3aXRoIGFyZ3MgYXMgYXJndW1lbnRzIHdyYXBwZWQgaW4gYSBwcm9taXNlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXN0QXNQcm9taXNlKG1ldGhvZCwgYXJncykge1xuICBsZXQgcmVzdWx0O1xuICB0cnkge1xuICAgIHJlc3VsdCA9IG1ldGhvZCguLi5hcmdzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBjYXN0QXNQcm9taXNlIH0gZnJvbSAnLi9jYXN0LWFzLXByb21pc2UuanMnO1xuXG5mdW5jdGlvbiBzZW5kUmVzdWx0KGV2ZW50TmFtZSwgZXZlbnRJZCwgZGF0YSkge1xuICBpZiAoc2VsZi5hbWVkaWFOYXRpdmVCcmlkZ2UpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoeyBldmVudElkLCAuLi5kYXRhIH0pO1xuICAgIHNlbGYuYW1lZGlhTmF0aXZlQnJpZGdlLnJlY2VpdmVSZXN1bHRGcm9tV2ViKGpzb24pO1xuICB9XG4gIHNlbGYuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbDogeyAuLi5kYXRhIH0gfSkpO1xufVxuZXhwb3J0IGNsYXNzIFJQQ3NlcnZlciB7XG4gIGNvbnN0cnVjdG9yKHsgdmVyc2lvbiwgY29tcG9uZW50LCBsaXN0ZW5lcnMgPSB7fSB9KSB7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKG5hbWUpID0+XG4gICAgICB0aGlzLmFkZExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyc1tuYW1lXSlcbiAgICApO1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihgYW1lZGlhLXJwYy1ldmVudDoke2NvbXBvbmVudH06cmVhZHlgLCAoKSA9PlxuICAgICAgdGhpcy5oYW5kc2hha2UoKVxuICAgICk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhhbmRzaGFrZSgpLCAwKTtcbiAgfVxuXG4gIGhhbmRzaGFrZSgpIHtcbiAgICBjb25zdCBkZXRhaWwgPSB7IHZlcnNpb246IHRoaXMudmVyc2lvbiB9O1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudChgYW1lZGlhLXJwYy1ldmVudDoke3RoaXMuY29tcG9uZW50fTpsaXZlYCwgeyBkZXRhaWwgfSlcbiAgICApO1xuICAgIGlmIChzZWxmLmFtZWRpYU5hdGl2ZUJyaWRnZSkge1xuICAgICAgc2VsZi5hbWVkaWFOYXRpdmVCcmlkZ2UuaGFuZHNoYWtlKHRoaXMuY29tcG9uZW50LCB0aGlzLnZlcnNpb24pO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpc3RlbmVyKG5hbWUsIG1ldGhvZCkge1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIGBhbWVkaWEtcnBjLWV2ZW50OiR7dGhpcy5jb21wb25lbnR9OiR7bmFtZX1gLFxuICAgICAgKGV2dCkgPT4ge1xuICAgICAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IHsgZXZlbnRJZCA9ICcnLCBhcmdzID0gW10gfSA9IGV2dC5kZXRhaWwgfHwge307XG4gICAgICAgIGNvbnN0IGV2ZW50UmVzdWx0ID0gYGFtZWRpYS1ycGMtZXZlbnQ6JHt0aGlzLmNvbXBvbmVudH06JHtuYW1lfToke2V2ZW50SWR9YDtcblxuICAgICAgICBjYXN0QXNQcm9taXNlKG1ldGhvZCwgYXJncylcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiBzZW5kUmVzdWx0KGV2ZW50UmVzdWx0LCBldmVudElkLCB7IHJlc3VsdCB9KSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyO1xuICAgICAgICAgICAgcmV0dXJuIHNlbmRSZXN1bHQoZXZlbnRSZXN1bHQsIGV2ZW50SWQsIHsgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IHV1aWQgfSBmcm9tICdAYW1lZGlhL3V1aWQnO1xuXG4vKipcbiAqIEB0eXBlZGVmIExhenlQcm9taXNlXG4gKiBAdHlwZSB7b2JqZWN0fVxuICogQHByb3BlcnR5IHtQcm9taXNlfSBwcm9taXNlXG4gKiBAcHJvcGVydHkge2Z1bmNpdG9ufSByZXNvbHZlXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSByZWplY3RcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBwcm9taXNlIHRoYXQgY2FuIGJlIHJldHVybmVkIGZyb20gdGhlIGZ1bmN0aW9uIGFuZCBmdWxmaWxsZWRcbiAqIG91dHNpZGUgb2YgdGhlIFByb21pc2UgY3JlYXRvciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtMYXp5UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHJvbWlzZSgpIHtcbiAgbGV0IHJlc29sdmU7XG4gIGxldCByZWplY3Q7XG4gIGxldCBpc0Z1bGxmaWxsZWQgPSBmYWxzZTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIHJlc29sdmUgPSAoZGF0YSkgPT4ge1xuICAgICAgaWYgKCFpc0Z1bGxmaWxsZWQpIHtcbiAgICAgICAgX3Jlc29sdmUoZGF0YSk7XG4gICAgICB9XG4gICAgICBpc0Z1bGxmaWxsZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmVqZWN0ID0gKGVycikgPT4ge1xuICAgICAgaWYgKCFpc0Z1bGxmaWxsZWQpIHtcbiAgICAgICAgX3JlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgaXNGdWxsZmlsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHsgcHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0IH07XG59XG5cbi8qKlxuICogQ3JlYXRlIG1ldGhvZCB0aGF0IGludm9rZXMgYSBtZXRob2QgdGhyb3VnaCBlaXRoZXIgYW4gZXZlbnQgb3IgdGhlIGFtZWRpYU5hdGl2ZUJyaWRnZSBpbnRlcmZhY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnQgTmFtZXNwYWNlIGZvciB0aGUgYXBpXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIE5hbWUgb2YgdGhlIG1ldGhvZFxuICogQHJldHVybnMge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGNhbGxzIGEgcmVtb3RlIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgeyByZXNvbHZlLCByZWplY3QsIHByb21pc2UgfSA9IGNyZWF0ZVByb21pc2UoKTtcbiAgICBjb25zdCBldmVudElkID0gdXVpZCgpO1xuICAgIGNvbnN0IGRldGFpbCA9IHsgZXZlbnRJZCwgYXJncyB9O1xuICAgIGNvbnN0IGV2dCA9IG5ldyBDdXN0b21FdmVudChgYW1lZGlhLXJwYy1ldmVudDoke2NvbXBvbmVudH06JHttZXRob2R9YCwge1xuICAgICAgZGV0YWlsLFxuICAgIH0pO1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIGlmIChzZWxmLmFtZWRpYU5hdGl2ZUJyaWRnZSkge1xuICAgICAgY29uc3QganNvbkFyZ3MgPSBKU09OLnN0cmluZ2lmeShhcmdzKTtcbiAgICAgIHNlbGYuYW1lZGlhTmF0aXZlQnJpZGdlLmNhbGxOYXRpdmVNZXRob2QoXG4gICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBqc29uQXJncyxcbiAgICAgICAgZXZlbnRJZFxuICAgICAgKTtcbiAgICB9XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgYGFtZWRpYS1ycGMtZXZlbnQ6JHtjb21wb25lbnR9OiR7bWV0aG9kfToke2V2ZW50SWR9YCxcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGlmICghZS5kZXRhaWwpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBlcnJvciwgcmVzdWx0IH0gPSBlLmRldGFpbDtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUlBDY2xpZW50IHtcbiAgY29uc3RydWN0b3IoeyB2ZXJzaW9uLCBjb21wb25lbnQsIG1ldGhvZHMgPSBbXSB9KSB7XG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgbWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHRoaXMuYWRkTWV0aG9kKG1ldGhvZCkpO1xuICAgIHRoaXMuYm91bmRMaXZlSGFuZGxlciA9IHRoaXMubGl2ZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBgYW1lZGlhLXJwYy1ldmVudDoke2NvbXBvbmVudH06bGl2ZWAsXG4gICAgICB0aGlzLmJvdW5kTGl2ZUhhbmRsZXJcbiAgICApO1xuICAgIHNldFRpbWVvdXQoXG4gICAgICAoKSA9PlxuICAgICAgICBzZWxmLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KGBhbWVkaWEtcnBjLWV2ZW50OiR7Y29tcG9uZW50fTpyZWFkeWApXG4gICAgICAgICksXG4gICAgICAwXG4gICAgKTtcbiAgfVxuXG4gIGxpdmVIYW5kbGVyKGV2dCkge1xuICAgIGNvbnN0IFtyZWNlaXZlZE1ham9yLCByZWNlaXZlZE1pbm9yXSA9IGV2dC5kZXRhaWwudmVyc2lvblxuICAgICAgLnNwbGl0KCcuJylcbiAgICAgIC5tYXAoKHYpID0+IHBhcnNlSW50KHYsIDEwKSk7XG4gICAgY29uc3QgW21ham9yLCBtaW5vcl0gPSB0aGlzLnZlcnNpb24uc3BsaXQoJy4nKS5tYXAoKHYpID0+IHBhcnNlSW50KHYsIDEwKSk7XG4gICAgaWYgKHJlY2VpdmVkTWFqb3IgIT09IG1ham9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAke3RoaXMuY29tcG9uZW50fSB2ZXJzaW9uIG1pc21hdGNoLiBTZXJ2ZXIgdmVyc2lvbjogJHtyZWNlaXZlZE1ham9yfS4gQ2xpZW50IHZlcnNpb246ICR7bWFqb3J9YFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHJlY2VpdmVkTWlub3IgPCBtaW5vcikge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgJHt0aGlzLmNvbXBvbmVudH0gc2VydmVyIHZlcnNpb24gaXMgb24gYW4gZWFybGllciBtaW5vciB2ZXJzaW9uICgke3JlY2VpdmVkTWlub3J9KSB0aGFuIHRoZSBjbGllbnQgKCR7bWlub3J9KWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5xdWV1ZS5zbGljZSgwKTtcbiAgICBkZWxldGUgdGhpcy5xdWV1ZTtcbiAgICBxdWV1ZS5mb3JFYWNoKChmdW5jKSA9PiBmdW5jKCkpO1xuICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgIGBhbWVkaWEtcnBjLWV2ZW50OiR7dGhpcy5jb21wb25lbnR9OmxpdmVgLFxuICAgICAgdGhpcy5ib3VuZExpdmVIYW5kbGVyXG4gICAgKTtcbiAgfVxuXG4gIGFkZE1ldGhvZChuYW1lKSB7XG4gICAgaWYgKHRoaXNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cyBvbiB0aGUgUlBDIGludGVyZmFjZS5gKTtcbiAgICB9XG4gICAgdGhpc1tuYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAodGhpcy5xdWV1ZSkge1xuICAgICAgICBsZXQgcmVzb2x2ZTtcbiAgICAgICAgbGV0IHJlamVjdDtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlSW5uZXIsIHJlamVjdElubmVyKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSA9IHJlc29sdmVJbm5lcjtcbiAgICAgICAgICByZWplY3QgPSByZWplY3RJbm5lcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucXVldWUucHVzaCgoKSA9PlxuICAgICAgICAgIHRoaXNbbmFtZV0oLi4uYXJncylcbiAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHRoaXNbbmFtZV0gPSBjcmVhdGVNZXRob2QodGhpcy5jb21wb25lbnQsIG5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXNbbmFtZV0oLi4uYXJncyk7XG4gICAgfTtcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgUlBDc2VydmVyLCBSUENjbGllbnQgfSBmcm9tICdAYW1lZGlhL2Zyb250ZW5kLXJwYyc7XG5cbmNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGl0bGUnKT8udGV4dENvbnRlbnQ7XG5cbmZ1bmN0aW9uIGJyb3dzZXJIYXNCRkNhY2hlKCkge1xuICBjb25zdCBpT1NWZXJzaW9uQXJyYXkgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKS8pO1xuICByZXR1cm4gKFxuICAgICEhaU9TVmVyc2lvbkFycmF5ICYmXG4gICAgKChwYXJzZUludChpT1NWZXJzaW9uQXJyYXlbMV0sIDEwKSA9PT0gMTMgJiZcbiAgICAgIHBhcnNlSW50KGlPU1ZlcnNpb25BcnJheVsyXSwgMTApID49IDQpIHx8XG4gICAgICBwYXJzZUludChpT1NWZXJzaW9uQXJyYXlbMV0sIDEwKSA+IDEzKVxuICApO1xufVxuXG5mdW5jdGlvbiBpc0Rlc2t0b3BTYWZhcmkoKSB7XG4gIGNvbnN0IHVBID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgY29uc3QgdmVuZG9yID0gbmF2aWdhdG9yLnZlbmRvcjtcbiAgcmV0dXJuIChcbiAgICAvU2FmYXJpL2kudGVzdCh1QSkgJiZcbiAgICAvQXBwbGUgQ29tcHV0ZXIvLnRlc3QodmVuZG9yKSAmJlxuICAgICEvTW9iaXxBbmRyb2lkL2kudGVzdCh1QSlcbiAgKTtcbn1cblxubGV0IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSBmYWxzZTtcbmNvbnN0IHJwY3NlcnZlciA9IG5ldyBSUENzZXJ2ZXIoe1xuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb21wb25lbnQ6ICdvcHRpbXVzJyxcbn0pO1xucnBjc2VydmVyLmFkZExpc3RlbmVyKCdwcmV2ZW50TmF2aWdhdGlvbicsICgpID0+IHtcbiAgbmF2aWdhdGlvblByZXZlbnRlZCA9IHRydWU7XG59KTtcbmNvbnN0IHJwY2NsaWVudCA9IG5ldyBSUENjbGllbnQoe1xuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb21wb25lbnQ6ICdvcHRpbXVzJyxcbn0pO1xucnBjY2xpZW50LmFkZE1ldGhvZCgnbmF2aWdhdGUnKTtcblxuZnVuY3Rpb24gc2VuZE5hdmlnYXRpb24odXJsLCBldnQpIHtcbiAgaWYgKCF1cmwgfHwgIW5hdmlnYXRpb25QcmV2ZW50ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIHJwY2NsaWVudC5uYXZpZ2F0ZSh7XG4gICAgdXJsOiBuZXcgVVJMKHVybCwgZG9jdW1lbnQuYmFzZVVSSSkudG9TdHJpbmcoKSxcbiAgfSk7XG59XG5jbGFzcyBPcHRpbXVzRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGVhc2VyTGlua0VsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZWFzZXJfbGluaycpO1xuICAgICAgaWYgKHRlYXNlckxpbmtFbGVtZW50KSB7XG4gICAgICAgIHNlbmROYXZpZ2F0aW9uKHRlYXNlckxpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpLCBldnQpO1xuICAgICAgfVxuICAgICAgaWYgKGJyb3dzZXJIYXNCRkNhY2hlKCkgfHwgaXNEZXNrdG9wU2FmYXJpKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgbGV0IHRpdm9saVJTSGVpZ2h0ID0gMjI1O1xuICAgICAgICBsZXQgbGF0ZXN0TGlzdEhlaWdodCA9IDEzO1xuICAgICAgICBjb25zdCBhbWVkaWFJbmNsdWRlSGVpZ2h0cyA9IFtdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rpdm9saS1yZWFsZXN0YXRlY2Fyb3VzZWwnKS5sZW5ndGggPiAwXG4gICAgICAgICkge1xuICAgICAgICAgIHRpdm9saVJTSGVpZ2h0ID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGl2b2xpLXJlYWxlc3RhdGVjYXJvdXNlbCcpWzBdXG4gICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYW1lZGlhLWxhdGVzdGxpc3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF0ZXN0TGlzdEhlaWdodCA9IGRvY3VtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2FtZWRpYS1sYXRlc3RsaXN0JylbMF1cbiAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbWVkaWFJbmNsdWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhbWVkaWEtaW5jbHVkZScpO1xuICAgICAgICBpZiAoYW1lZGlhSW5jbHVkZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIFsuLi5hbWVkaWFJbmNsdWRlc10uZm9yRWFjaCgoYWkpID0+XG4gICAgICAgICAgICBhbWVkaWFJbmNsdWRlSGVpZ2h0cy5wdXNoKHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBhaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsXG4gICAgICAgICAgICAgIHNyYzogYWkuZ2V0QXR0cmlidXRlKCdzcmMnKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCxcbiAgICAgICAgICAgIHRpdm9saVJTSGVpZ2h0OiB0aXZvbGlSU0hlaWdodCxcbiAgICAgICAgICAgIGxhdGVzdExpc3RIZWlnaHQ6IGxhdGVzdExpc3RIZWlnaHQsXG4gICAgICAgICAgICBhbWVkaWFJbmNsdWRlSGVpZ2h0czogYW1lZGlhSW5jbHVkZUhlaWdodHMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdhdXRvJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldCgnb3B0aW11cy1lbGVtZW50JykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdvcHRpbXVzLWVsZW1lbnQnLCBPcHRpbXVzRWxlbWVudCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQVFBLFlBQVEsUUFBUTtBQUNoQixZQUFRLFFBQVE7QUFJaEIsUUFBSSxpQkFBcUI7QUFBekIsUUFDSSxtQkFBcUI7QUFEekIsUUFFSSxnQkFBcUI7QUFGekIsUUFHSSxpQkFBcUI7QUFIekIsUUFJSSxxQkFBcUI7QUFFekIsYUFBUyxXQUFXLFlBQVksUUFBUTtBQUNwQyxhQUFPLFdBQVcsVUFBVSxFQUFFLEtBQUssU0FBVSxPQUFPO0FBQ2hELFlBQUksVUFBVSxNQUFNO0FBSXBCLFlBQUksWUFBWSxNQUFNLFNBQVMsU0FBUyxPQUFPLFNBQVMsTUFBTTtBQUc5RCxZQUFLLGFBQWEsV0FBWSxFQUFFLGFBQWEsVUFBVTtBQUNuRCxpQkFBTztBQUFBLFFBQ1g7QUFFQSxZQUFJLG1CQUFtQixNQUFNLFlBQVksTUFBTSxTQUFVLFlBQVk7QUFDakUsY0FBSSxVQUFXLFdBQVcsU0FDdEIsV0FBVyxXQUFXLFVBQ3RCLFdBQVcsV0FBVyxPQUN0QixRQUFXLE9BQU8sT0FBTztBQUc3QixjQUFJLENBQUMsT0FBTztBQUFFLG1CQUFPO0FBQUEsVUFBTztBQUU1QixrQkFBUSxTQUFTO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxLQUFLO0FBQ0QscUJBQU8sTUFBTSxZQUFZLE1B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UUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQUEsTUFDNUMsQ0FBQztBQUFBLElBQ0g7QUFFSixVQUFNLFVBQVU7QUFBQSxNQUNkLEdBQUc7QUFBQSxNQUNILE9BQU8sUUFBUSxLQUFLLFNBQVMsWUFBWSxJQUFJLEtBQUs7QUFBQSxNQUNsRDtBQUFBLE1BQ0EsT0FBTyxPQUFPLEtBQUssU0FBUyxXQUFXLEtBQUssU0FBUyxZQUFZO0FBQUEsSUFDbkU7QUFFQSxTQUFLLGdCQUFnQixLQUFLO0FBQzFCLFFBQUksQ0FBQyxRQUFRLE9BQU87QUFFbEIsWUFBTSxvQkFBb0IsS0FBSyxNQUM1QixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLO0FBQ3ZCLFVBQUksbUJBQW1CO0FBQ3JCLGVBQU8sa0JBQWtCLElBQUksTUFBTUQsY0FBYTtBQUFBLE1BQ2xEO0FBQUEsSUFDRixXQUFXLEtBQUssQ0FBQyxHQUFHO0FBQ2xCLFdBQUssQ0FBQyxFQUFFLGNBQWM7QUFBQSxJQUN4QjtBQUVBLFFBQUksS0FBSyxXQUFXLEdBQUc7QUFDckIsWUFDRUMsTUFBQSxLQUFLLFNBQUwsZ0JBQUFBLElBQVcsZUFBYyx1QkFDekIsVUFBSyxTQUFMLG1CQUFXLGVBQWMsV0FDekI7QUFDQSxlQUFPLElBQUksMEJBQWdCO0FBQUEsVUFDekI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsT0FBTyxLQUFLO0FBQUEsVUFDWixNQUFNLEtBQUs7QUFBQSxRQUNiLENBQUM7QUFDRCxhQUFLLElBQUksSUFBSTtBQUFBLE1BQ2YsT0FBTztBQUNMLGVBQU8sSUFBSSxvQkFBVztBQUFBLFVBQ3BCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE9BQU8sS0FBSztBQUFBLFFBQ2QsQ0FBQztBQUNELGFBQUssSUFBSSxJQUFJO0FBQUEsTUFDZjtBQUNBLFdBQUssTUFBTSxLQUFLLElBQUk7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQUksa0JBQWtCLENBQUMsZUFBZSxJQUFJLGtCQUFrQixHQUFHO0FBQzdELGlCQUFlLE9BQU8sb0JBQW9CLFNBQVM7QUFDckQsV0FBVyxDQUFDLGdCQUFnQjtBQUMxQixVQUFRLE1BQU0sK0NBQStDO0FBQy9EOyIsCiAgIm5hbWVzIjogWyJjYXB0dXJlcyIsICJjc3NtcSIsICJ0aXRsZSIsICJicmVha3BvaW50cyIsICJjdXJyZW50TGF5b3V0IiwgIm9wdGltdXNFbGVtZW50SW5kZXgiLCAiY3JlYXRlQ29udGFpbmVyIiwgImNyZWF0ZVBhZ2VIZWFkZXIiLCAidGl0bGUiLCAiY3JlYXRlTGFyZ2VQYWdlSGVhZGVyIiwgImJyZWFrcG9pbnRzIiwgIl9hIiwgInRva2VuIiwgIl9hIiwgIl9hIiwgIl9hIiwgImN1cnJlbnRMYXlvdXQiLCAiX2EiXQp9Cg==
