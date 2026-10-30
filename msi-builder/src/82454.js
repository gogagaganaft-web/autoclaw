exports.plugin = exports.getMarkup = exports.exportWidgets = exports.exportFromMarkup = exports.combineMarkups = exports.ExportMenu = undefined;
var i = require("./13306.js");
var o = require("./58201.js");
var a = require("./19157.js");
var r = require("./19155.js");
var s = require("./78292.js");
var l = g(require("./28109.js"));
var u = require("./35922.js");
var d = require("./86231.js");
var c = require("./24028.js");
var h = g(require("./93786.js"));
var f = require("./30869.js");
var p = require("./58664.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e) {
  return (m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function _(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (m(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (m(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (m(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var v = [h.default.down, h.default.move].join(" ");
var y = [[9, 12, 26, 12, 26, 14, 9, 14], [9, 17, 26, 17, 26, 19, 9, 19], [9, 22, 26, 22, 26, 24, 9, 24]];
var b = ["PNG", "JPEG", "GIF"];
var x = ["PDF", "SVG"];
var w = /data-backgroundcolor="([^"]*)"/;
function C() {
  var e = s.image.testFormats(b);
  return {
    unsupported: e.unsupported,
    supported: e.supported.concat(x)
  };
}
function S(e, t, n) {
  n = n || C();
  e = String(e).toUpperCase();
  if (n.supported.indexOf(e) !== -1) {
    return e;
  }
  if (n.unsupported.indexOf(e) !== -1 && t) {
    t("W2108", [e]);
  }
}
function k(e) {
  if (e === "SVG") {
    return s.svg.getData;
  } else if (e === "PDF") {
    return s.pdf.getData;
  } else {
    return s.image.getData;
  }
}
function D(e, t) {
  var n = (0, o.getWindow)().document;
  var i = n.createElement("iframe");
  i.onload = function (e, t) {
    return function () {
      var n = this;
      var i = this.contentWindow;
      var o = i.document.createElement("img");
      i.document.body.appendChild(o);
      var a = function (e) {
        e.style.width = "21cm";
        var t = (0, p.getWidth)(e);
        e.style.width = "";
        return t;
      }(i.document.body) / t.width;
      if (a < 1) {
        i.document.body.style.transform = `scale(${a})`;
        i.document.body.style["transform-origin"] = "0 0";
      }
      function r() {
        n.parentElement.removeChild(n);
      }
      o.addEventListener("load", function () {
        i.focus();
        i.print();
      });
      o.addEventListener("error", r);
      i.addEventListener("afterprint", function () {
        setTimeout(r, 0);
      });
      o.src = e;
    };
  }(e, t);
  i.style.position = "fixed";
  i.style.width = "0";
  i.style.height = "0";
  i.style.right = "0";
  i.style.bottom = "0";
  n.body.appendChild(i);
}
function I(e, t, n) {
  var i = {};
  var o = n.type;
  var r = n.format;
  var s = function (e, t, n) {
    var i = -85;
    var o = 40 + n * 30;
    var a = {
      rect: {
        width: 118,
        height: 30,
        x: -84,
        y: o
      },
      text: {
        x: i + (e.rtl ? 105 : 15),
        y: o + 30 - 8
      }
    };
    if (t === "printing") {
      a.separator = {
        stroke: e.button.default.borderColor,
        "stroke-width": 1,
        cursor: "pointer",
        sharp: "v",
        d: "M -85 " + (o + 30 - 1) + " L 35 " + (o + 30 - 1)
      };
    }
    return a;
  }(t, o, n.itemIndex);
  var l = (0, a.patchFontOptions)(t.font);
  l["pointer-events"] = "none";
  var u = e.g().attr({
    class: "dx-export-menu-list-item"
  });
  i["export-element-type"] = o;
  if (r) {
    i["export-element-format"] = r;
  }
  var d = e.rect();
  d.attr(s.rect).css({
    cursor: "pointer",
    "pointer-events": "all"
  }).data(i);
  d.on(c.start + ".export", function () {
    return d.attr({
      fill: t.button.hover.backgroundColor
    });
  }).on(c.end + ".export", function () {
    return d.attr({
      fill: null
    });
  });
  d.append(u);
  var h = e.text(n.text).css(l).attr(s.text).append(u);
  if (o === "printing") {
    e.path(null, "line").attr(s.separator).append(u);
  }
  return {
    g: u,
    rect: d,
    resetState: function () {
      return d.attr({
        fill: null
      });
    },
    fixPosition: function () {
      var e = h.getBBox();
      h.move(s.text.x - e.x - (t.rtl ? e.width : 0));
    }
  };
}
function T(e, t) {
  t.format = S(t.format) || "PNG";
  t.fileName = t.fileName || "file";
  t.exportingAction = t.onExporting;
  t.exportedAction = t.onExported;
  t.fileSavingAction = t.onFileSaving;
  t.margin = (0, u.isDefined)(t.margin) ? t.margin : 10;
  t.backgroundColor = (0, u.isDefined)(t.backgroundColor) ? t.backgroundColor : function (e) {
    var t = w.exec(e);
    if (t == null) {
      return undefined;
    } else {
      return t[1];
    }
  }(e) || (0, d.getTheme)().backgroundColor;
  (0, s.export)(e, t, k(t.format));
}
exports.exportFromMarkup = T;
exports.getMarkup = function (e) {
  return E(e).markup;
};
exports.exportWidgets = function (e, t) {
  var n = E(e, {
    gridLayout: (t = t || {}).gridLayout,
    verticalAlignment: t.verticalAlignment,
    horizontalAlignment: t.horizontalAlignment
  });
  t.width = n.width;
  t.height = n.height;
  T(n.markup, t);
};
function E(e, t = {}) {
  if (Array.isArray(e)) {
    if (!Array.isArray(e[0])) {
      e = e.map(function (e) {
        return [e];
      });
    }
  } else {
    e = [[e]];
  }
  var n = !t.gridLayout;
  var i = e.reduce(function (e, t, i) {
    var o = t.reduce(function (e, t, n) {
      var o = t.getSize();
      var a = t.option("backgroundColor") || (0, d.getTheme)(t.option("theme")).backgroundColor;
      if (a && e.backgroundColors.indexOf(a) === -1) {
        e.backgroundColors.push(a);
      }
      e.hOffset = e.width;
      e.width += o.width;
      e.height = Math.max(e.height, o.height);
      e.itemWidth = Math.max(e.itemWidth, o.width);
      e.items.push({
        markup: t.svg(),
        width: o.width,
        height: o.height,
        c: n,
        r: i,
        hOffset: e.hOffset
      });
      return e;
    }, {
      items: [],
      height: 0,
      itemWidth: 0,
      hOffset: 0,
      width: 0,
      backgroundColors: e.backgroundColors
    });
    e.rowOffsets.push(e.totalHeight);
    e.rowHeights.push(o.height);
    e.totalHeight += o.height;
    e.items = e.items.concat(o.items);
    e.itemWidth = Math.max(e.itemWidth, o.itemWidth);
    e.maxItemLen = Math.max(e.maxItemLen, o.items.length);
    e.totalWidth = n ? Math.max(e.totalWidth, o.width) : e.maxItemLen * e.itemWidth;
    return e;
  }, {
    items: [],
    rowOffsets: [],
    rowHeights: [],
    itemWidth: 0,
    totalHeight: 0,
    maxItemLen: 0,
    totalWidth: 0,
    backgroundColors: []
  });
  var o = `data-backgroundcolor="${i.backgroundColors.length === 1 ? i.backgroundColors[0] : ""}" `;
  function a(e) {
    var n = t.verticalAlignment;
    var o = i.rowHeights[e.r] - e.height;
    return i.rowOffsets[e.r] + (n === "bottom" ? o : n === "center" ? o / 2 : 0);
  }
  function r(e) {
    if (n) {
      return e.hOffset;
    }
    var o = t.horizontalAlignment;
    var a = i.itemWidth;
    var r = a - e.width;
    return e.c * a + (o === "right" ? r : o === "center" ? r / 2 : 0);
  }
  var s = i.totalHeight;
  var l = i.totalWidth;
  return {
    markup: "<svg " + o + "height=\"" + s + "\" width=\"" + l + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">" + i.items.map(function (e) {
      return `<g transform="translate(${r(e)},${a(e)})">${e.markup}</g>`;
    }).join("") + "</svg>",
    width: l,
    height: s
  };
}
exports.combineMarkups = E;
function O(e) {
  var t = this._renderer = e.renderer;
  this._incidentOccurred = e.incidentOccurred;
  this._exportTo = e.exportTo;
  this._print = e.print;
  this._shadow = t.shadowFilter("-50%", "-50%", "200%", "200%", 2, 6, 3);
  this._shadow.attr({
    opacity: 0.8
  });
  this._group = t.g().attr(_({
    class: "dx-export-menu"
  }, r.HIDDEN_FOR_EXPORT, true)).linkOn(t.root, {
    name: "export-menu",
    after: "peripheral"
  });
  this._buttonGroup = t.g().attr({
    class: "dx-export-menu-button"
  }).append(this._group);
  this._listGroup = t.g().attr({
    class: "dx-export-menu-list"
  }).append(this._group);
  this._overlay = t.rect(-85, 39, 120, 0);
  this._overlay.attr({
    "stroke-width": 1,
    cursor: "pointer",
    rx: 4,
    ry: 4,
    filter: this._shadow.id
  });
  this._overlay.data({
    "export-element-type": "list"
  });
  this.validFormats = C();
  this._subscribeEvents();
}
function A(e, t, n, i) {
  if (i || t.format) {
    i = S(i || t.format, e._incidentOccurred);
  }
  var o = e.getSize();
  var a = o.width;
  var r = o.height;
  return {
    format: i || "PNG",
    fileName: n || t.fileName || "file",
    backgroundColor: t.backgroundColor,
    width: a,
    height: r,
    margin: t.margin,
    svgToCanvas: t.svgToCanvas,
    exportingAction: e._createActionByOption("onExporting", {
      excludeValidators: ["disabled"]
    }),
    exportedAction: e._createActionByOption("onExported", {
      excludeValidators: ["disabled"]
    }),
    fileSavingAction: e._createActionByOption("onFileSaving", {
      excludeValidators: ["disabled"]
    })
  };
}
exports.ExportMenu = O;
(0, i.extend)(O.prototype, {
  getLayoutOptions: function () {
    if (this._hiddenDueToLayout) {
      return {
        width: 0,
        height: 0,
        cutSide: "vertical",
        cutLayoutSide: "top"
      };
    }
    var e = this._buttonGroup.getBBox();
    e.cutSide = "vertical";
    e.cutLayoutSide = "top";
    e.height += 10;
    e.position = {
      vertical: "top",
      horizontal: "right"
    };
    e.verticalAlignment = "top";
    e.horizontalAlignment = "right";
    return e;
  },
  shift: function (e, t) {
    this._group.attr({
      translateY: this._group.attr("translateY") + t
    });
  },
  draw: function (e, t, n) {
    this._group.move(e - 35 - 2 - 3 + n.left, Math.floor(t / 2 - 17.5));
    var i = this.getLayoutOptions();
    if (i.width > e || i.height > t) {
      this.freeSpace();
    }
    return this;
  },
  show: function () {
    this._group.linkAppend();
  },
  hide: function () {
    this._group.linkRemove();
  },
  setOptions: function (e) {
    var t = this;
    this._options = e;
    if (e.formats) {
      e.formats = e.formats.reduce(function (e, n) {
        if (n = S(n, t._incidentOccurred, t.validFormats)) {
          e.push(n);
        }
        return e;
      }, []);
    } else {
      e.formats = this.validFormats.supported.slice();
    }
    e.printingEnabled = e.printingEnabled === undefined || e.printingEnabled;
    if (e.enabled && (e.formats.length || e.printingEnabled)) {
      this.show();
      this._updateButton();
      this._updateList();
      this._hideList();
    } else {
      this.hide();
    }
  },
  dispose: function () {
    this._unsubscribeEvents();
    this._group.linkRemove().linkOff();
    this._group.dispose();
    this._shadow.dispose();
  },
  layoutOptions: function () {
    return this._options.enabled && {
      horizontalAlignment: "right",
      verticalAlignment: "top",
      weak: true
    };
  },
  measure: function () {
    this._fillSpace();
    var e = this._options.button.margin;
    return [35 + e.left + e.right, 35 + e.top + e.bottom];
  },
  move: function (e) {
    var t = this._options.button.margin;
    this._group.attr({
      translateX: Math.round(e[0]) + t.left,
      translateY: Math.round(e[1]) + t.top
    });
  },
  _fillSpace: function () {
    this._hiddenDueToLayout = false;
    this.show();
  },
  freeSpace: function () {
    this._incidentOccurred("W2107");
    this._hiddenDueToLayout = true;
    this.hide();
  },
  _hideList: function () {
    this._listGroup.remove();
    this._listShown = false;
    this._setButtonState("default");
    this._menuItems.forEach(function (e) {
      return e.resetState();
    });
  },
  _showList: function () {
    this._listGroup.append(this._group);
    this._listShown = true;
    this._menuItems.forEach(function (e) {
      return e.fixPosition();
    });
  },
  _setButtonState: function (e) {
    var t = this._options.button[e];
    this._button.attr({
      stroke: t.borderColor,
      fill: t.backgroundColor
    });
    this._icon.attr({
      fill: t.color
    });
  },
  _subscribeEvents: function () {
    var e = this;
    this._renderer.root.on(h.default.up + ".export", function (t) {
      var n = t.target["export-element-type"];
      if (n) {
        if (n === "button") {
          if (e._listShown) {
            e._setButtonState("default");
            e._hideList();
          } else {
            e._setButtonState("focus");
            e._showList();
          }
        } else if (n === "printing") {
          e._print();
          e._hideList();
        } else if (n === "exporting") {
          e._exportTo(t.target["export-element-format"]);
          e._hideList();
        }
      } else if (e._button) {
        e._hideList();
      }
    });
    this._listGroup.on(v, function (e) {
      return e.stopPropagation();
    });
    this._buttonGroup.on(h.default.enter, function () {
      return e._setButtonState("hover");
    });
    this._buttonGroup.on(h.default.leave, function () {
      return e._setButtonState(e._listShown ? "focus" : "default");
    });
    this._buttonGroup.on(h.default.down + ".export", function () {
      return e._setButtonState("active");
    });
  },
  _unsubscribeEvents: function () {
    this._renderer.root.off(".export");
    this._listGroup.off();
    this._buttonGroup.off();
  },
  _updateButton: function () {
    var e = this._renderer;
    var t = this._options;
    var n = {
      "export-element-type": "button"
    };
    if (!this._button) {
      this._button = e.rect(0, 0, 35, 35).append(this._buttonGroup);
      this._button.attr({
        rx: 4,
        ry: 4,
        fill: t.button.default.backgroundColor,
        stroke: t.button.default.borderColor,
        "stroke-width": 1,
        cursor: "pointer"
      });
      this._button.data(n);
      this._icon = e.path(y).append(this._buttonGroup);
      this._icon.attr({
        fill: t.button.default.color,
        cursor: "pointer"
      });
      this._icon.data(n);
      this._buttonGroup.setTitle(l.default.format("vizExport-titleMenuText"));
    }
  },
  _updateList: function () {
    var e = this._options;
    var t = e.button.default;
    var n = this._listGroup;
    var i = function (e, t) {
      var n = [];
      if (t.printingEnabled) {
        n.push(I(e, t, {
          type: "printing",
          text: l.default.format("vizExport-printingButtonText"),
          itemIndex: n.length
        }));
      }
      return n = t.formats.reduce(function (n, i) {
        n.push(I(e, t, {
          type: "exporting",
          text: l.default.getFormatter("vizExport-exportButtonText")(i),
          format: i,
          itemIndex: n.length
        }));
        return n;
      }, n);
    }(this._renderer, e);
    this._shadow.attr({
      color: e.shadowColor
    });
    this._overlay.attr({
      height: i.length * 30 + 2,
      fill: t.backgroundColor,
      stroke: t.borderColor
    });
    n.clear();
    this._overlay.append(n);
    i.forEach(function (e) {
      return e.g.append(n);
    });
    this._menuItems = i;
  }
});
var P = {
  name: "export",
  init: function () {
    var e = this;
    this._exportMenu = new O({
      renderer: this._renderer,
      incidentOccurred: this._incidentOccurred,
      print: function () {
        return e.print();
      },
      exportTo: function (t) {
        return e.exportTo(undefined, t);
      }
    });
    this._layout.add(this._exportMenu);
  },
  dispose: function () {
    this._exportMenu.dispose();
  },
  members: {
    _getExportMenuOptions: function () {
      return (0, i.extend)({}, this._getOption("export"), {
        rtl: this._getOption("rtlEnabled", true)
      });
    },
    _disablePointerEvents: function () {
      var e = this._renderer.root.attr("pointer-events");
      this._renderer.root.attr({
        "pointer-events": "none"
      });
      return e;
    },
    exportTo: function (e, t) {
      var n = this;
      var i = this._exportMenu;
      var o = A(this, this._getOption("export") || {}, e, t);
      if (i) {
        i.hide();
      }
      var a = this._disablePointerEvents();
      var r = (0, s.export)(this._renderer.root.element, o, k(o.format)).fail(f.logger.error).always(function () {
        n._renderer.root.attr({
          "pointer-events": a
        });
      });
      if (i) {
        i.show();
      }
      return r;
    },
    print: function () {
      var e = this;
      var t = this._exportMenu;
      var n = A(this, this._getOption("export") || {});
      n.exportingAction = null;
      n.exportedAction = null;
      n.margin = 0;
      n.format = "PNG";
      n.useBase64 = true;
      n.fileSavingAction = function (e) {
        D(`data:image/png;base64,${e.data}`, {
          width: n.width,
          __test: n.__test
        });
        e.cancel = true;
      };
      var i = this._disablePointerEvents();
      if (t) {
        t.hide();
      }
      var o = (0, s.export)(this._renderer.root.element, n, k(n.format)).fail(f.logger.error).always(function () {
        e._renderer.root.attr({
          "pointer-events": i
        });
      });
      if (t) {
        t.show();
      }
      return o;
    }
  },
  customize: function (e) {
    var t = e.prototype;
    e.addChange({
      code: "EXPORT",
      handler: function () {
        this._exportMenu.setOptions(this._getExportMenuOptions());
        this._change(["LAYOUT"]);
      },
      isThemeDependent: true,
      isOptionChange: true,
      option: "export"
    });
    t._optionChangesMap.onExporting = "EXPORT";
    t._optionChangesMap.onExported = "EXPORT";
    t._optionChangesMap.onFileSaving = "EXPORT";
  },
  fontFields: ["export.font"]
};
exports.plugin = P;