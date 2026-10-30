exports.plugin = exports.Tooltip = undefined;
var i = require("./58664.js");
var o = g(require("./73349.js"));
var a = require("./58201.js");
var r = require("./3532.js");
var s = require("./78008.js");
var l = g(require("./68374.js"));
var u = require("./56453.js");
var d = require("./35922.js");
var c = require("./13306.js");
var h = require("./19157.js");
var f = g(require("./30343.js"));
var p = require("./64509.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = f.default.format;
var _ = Math.ceil;
var v = Math.max;
var y = Math.min;
var b = (0, a.getWindow)();
function x(e) {
  e.css({
    left: "-9999px"
  }).detach();
}
function w() {
  return (0, l.default)("<div>").css({
    position: "relative",
    display: "inline-block",
    padding: 0,
    margin: 0,
    border: "0px solid transparent"
  });
}
function C(e) {
  this._eventTrigger = e.eventTrigger;
  this._widgetRoot = e.widgetRoot;
  this._widget = e.widget;
  this._textHtmlContainers = [];
  this._wrapper = (0, l.default)("<div>").css({
    position: "absolute",
    overflow: "hidden",
    pointerEvents: "none"
  }).addClass(e.cssClass);
  var t = this._renderer = new u.Renderer({
    pathModified: e.pathModified,
    container: this._wrapper[0]
  });
  t.root.attr({
    "pointer-events": "none"
  });
  this._text = t.text(undefined, 0, 0);
  this._textGroupHtml = (0, l.default)("<div>").css({
    position: "absolute",
    padding: 0,
    margin: 0,
    border: "0px solid transparent"
  }).appendTo(this._wrapper);
  this._textHtml = w().appendTo(this._textGroupHtml);
}
exports.Tooltip = C;
C.prototype = {
  constructor: C,
  dispose: function () {
    this._wrapper.remove();
    this._renderer.dispose();
    this._options = this._widgetRoot = null;
  },
  _getContainer: function () {
    var e = this._options;
    var t = (0, l.default)(this._widgetRoot).closest(e.container);
    if (t.length === 0) {
      t = (0, l.default)(e.container);
    }
    return (t.length ? t : (0, l.default)("body")).get(0);
  },
  setTemplate: function (e) {
    this._template = e ? this._widget._getTemplate(e) : null;
  },
  setOptions: function (e) {
    var t = this;
    e = e || {};
    var n = this;
    n._options = e;
    n._textFontStyles = (0, h.patchFontOptions)(e.font);
    n._textFontStyles.color = n._textFontStyles.fill;
    n._wrapper.css({
      zIndex: e.zIndex
    });
    n._customizeTooltip = e.customizeTooltip;
    var o = n._textGroupHtml;
    if (this.plaque) {
      this.plaque.clear();
    }
    this.setTemplate(e.contentTemplate);
    var a = e.interactive ? "auto" : "none";
    if (e.interactive) {
      this._renderer.root.css({
        "-ms-user-select": "auto",
        "-moz-user-select": "auto",
        "-webkit-user-select": "auto"
      });
    }
    this.plaque = new p.Plaque({
      opacity: n._options.opacity,
      color: n._options.color,
      border: n._options.border,
      paddingLeftRight: n._options.paddingLeftRight,
      paddingTopBottom: n._options.paddingTopBottom,
      arrowLength: n._options.arrowLength,
      arrowWidth: 20,
      shadow: n._options.shadow,
      cornerRadius: n._options.cornerRadius
    }, n, n._renderer.root, function (s) {
      var l = s.group;
      var u = s.onRender;
      var d = s.eventData;
      var c = s.isMoving;
      var h = s.templateCallback;
      var f = h === undefined ? function () {} : h;
      var p = n._state;
      if (!c) {
        var g = n._template;
        var m = g && !p.formatObject.skipTemplate;
        if (p.html || m) {
          o.css({
            color: p.textColor,
            width: 3000,
            pointerEvents: a
          });
          if (m) {
            var _ = n._textHtmlContainers;
            var v = w().appendTo(n._textGroupHtml);
            _.push(v);
            g.render({
              model: p.formatObject,
              container: v,
              onRendered: function () {
                _.splice(0, _.length - 1).forEach(function (e) {
                  return e.remove();
                });
                n._textHtml = (0, r.replaceWith)(n._textHtml, v);
                p.html = n._textHtml.html();
                if ((0, i.getWidth)(n._textHtml) === 0 && (0, i.getHeight)(n._textHtml) === 0) {
                  t.plaque.clear();
                  f(false);
                  return;
                }
                u();
                n._riseEvents(d);
                n._moveWrapper();
                n.plaque.customizeCloud({
                  fill: p.color,
                  stroke: p.borderColor,
                  "pointer-events": a
                });
                f(true);
                n._textHtmlContainers = [];
              }
            });
            return;
          }
          n._text.attr({
            text: ""
          });
          n._textHtml.html(p.html);
        } else {
          n._text.css({
            fill: p.textColor
          }).attr({
            text: p.text,
            class: e.cssClass,
            "pointer-events": a
          }).append(l.attr({
            align: e.textAlignment
          }));
        }
        n._riseEvents(d);
        n.plaque.customizeCloud({
          fill: p.color,
          stroke: p.borderColor,
          "pointer-events": a
        });
      }
      u();
      n._moveWrapper();
      return true;
    }, true, function (e, t) {
      if (e._state.html) {
        var i = b.getComputedStyle(n._textHtml.get(0));
        return i = {
          x: 0,
          y: 0,
          width: _(parseFloat(i.width)),
          height: _(parseFloat(i.height))
        };
      }
      return t.getBBox();
    }, function (e, t, i, o) {
      if (e._state.html) {
        n._textGroupHtml.css({
          left: i,
          top: o
        });
      } else {
        t.move(i, o);
      }
    });
    return n;
  },
  _riseEvents: function (e) {
    if (this._eventData) {
      this._eventTrigger("tooltipHidden", this._eventData);
    }
    this._eventData = e;
    this._eventTrigger("tooltipShown", this._eventData);
  },
  setRendererOptions: function (e) {
    this._renderer.setOptions(e);
    this._textGroupHtml.css({
      direction: e.rtl ? "rtl" : "ltr"
    });
    return this;
  },
  update: function (e) {
    this.setOptions(e);
    x(this._wrapper);
    var t = {};
    for (var n in this._textFontStyles) {
      t[(0, s.camelize)(n)] = this._textFontStyles[n];
    }
    this._textGroupHtml.css(t);
    this._text.css(this._textFontStyles);
    this._eventData = null;
    return this;
  },
  _prepare: function (e, t, n = this._customizeTooltip) {
    var i = this._options;
    var o = {};
    if ((0, d.isFunction)(n)) {
      o = n.call(e, e);
      if ("text" in (o = (0, d.isPlainObject)(o) ? o : {})) {
        t.text = (0, d.isDefined)(o.text) ? String(o.text) : "";
      }
      if ("html" in o) {
        t.html = (0, d.isDefined)(o.html) ? String(o.html) : "";
      }
    }
    if (!("text" in t) && !("html" in t)) {
      t.text = e.valueText || e.description || "";
    }
    t.color = o.color || i.color;
    t.borderColor = o.borderColor || (i.border || {}).color;
    t.textColor = o.fontColor || (this._textFontStyles || {}).color;
    return !!t.text || !!t.html || !!this._template;
  },
  show: function (e, t, n, i, o) {
    if (this._options.forceEvents) {
      n.x = t.x;
      n.y = t.y - t.offset;
      this._riseEvents(n);
      return true;
    }
    var a = {
      formatObject: e,
      eventData: n,
      templateCallback: o
    };
    if (!this._prepare(e, a, i)) {
      return false;
    }
    this._state = a;
    this._wrapper.appendTo(this._getContainer());
    this._clear();
    var r = (0, c.extend)({}, this._options, {
      canvas: this._getCanvas()
    }, a, {
      x: t.x,
      y: t.y,
      offset: t.offset
    });
    return this.plaque.clear().draw(r);
  },
  isCursorOnTooltip: function (e, t) {
    if (this._options.interactive) {
      var n = this.plaque.getBBox();
      return e > n.x && e < n.x + n.width && t > n.y && t < n.y + n.height;
    }
    return false;
  },
  hide: function (e) {
    x(this._wrapper);
    if (this._eventData) {
      this._eventTrigger("tooltipHidden", this._options.forceEvents ? (0, c.extend)({
        isPointerOut: e
      }, this._eventData) : this._eventData);
      this._clear();
      this._eventData = null;
    }
  },
  _clear: function () {
    this._textHtml.empty();
  },
  move: function (e, t, n) {
    this.plaque.draw({
      x: e,
      y: t,
      offset: n,
      canvas: this._getCanvas(),
      isMoving: true
    });
  },
  _moveWrapper: function () {
    var e = this.plaque.getBBox();
    this._renderer.resize(e.width, e.height);
    var t = this._wrapper.css({
      left: 0,
      top: 0
    }).offset();
    var n = e.x;
    var o = e.y;
    this._wrapper.css({
      left: n - t.left,
      top: o - t.top
    });
    this.plaque.moveRoot(-n, -o);
    if (this._state.html) {
      this._textHtml.css({
        left: -n,
        top: -o
      });
      this._textGroupHtml.css({
        width: _((0, i.getWidth)(this._textHtml))
      });
    }
  },
  formatValue: function (e, t) {
    var n = t ? function (e, t) {
      var n = e;
      switch (t) {
        case "argument":
          n = {
            format: e.argumentFormat
          };
          break;
        case "percent":
          n = {
            format: {
              type: "percent",
              precision: e.format && e.format.percentPrecision
            }
          };
      }
      return n;
    }(this._options, t) : this._options;
    return m(e, n.format);
  },
  getOptions: function () {
    return this._options;
  },
  getLocation: function () {
    return (0, h.normalizeEnum)(this._options.location);
  },
  isEnabled: function () {
    return !!this._options.enabled || !!this._options.forceEvents;
  },
  isShared: function () {
    return !!this._options.shared;
  },
  _getCanvas: function () {
    var e = this._getContainer();
    var t = e.getBoundingClientRect();
    var n = o.default.getDocumentElement();
    var i = o.default.getDocument();
    var a = b.pageXOffset || n.scrollLeft || 0;
    var r = b.pageYOffset || n.scrollTop || 0;
    var s = {
      left: a,
      top: r,
      width: v(n.clientWidth, i.body.clientWidth) + a,
      height: v(i.body.scrollHeight, n.scrollHeight, i.body.offsetHeight, n.offsetHeight, i.body.clientHeight, n.clientHeight),
      right: 0,
      bottom: 0
    };
    if (e !== o.default.getBody()) {
      a = v(s.left, s.left + t.left);
      r = v(s.top, s.top + t.top);
      s.width = y(t.width, s.width) + a + s.left;
      s.height = y(t.height, s.height) + r + s.top;
      s.left = a;
      s.top = r;
    }
    return s;
  }
};
var S = {
  name: "tooltip",
  init: function () {
    this._initTooltip();
  },
  dispose: function () {
    this._disposeTooltip();
  },
  members: {
    _initTooltip: function () {
      this._tooltip = new C({
        cssClass: this._rootClassPrefix + "-tooltip",
        eventTrigger: this._eventTrigger,
        pathModified: this.option("pathModified"),
        widgetRoot: this.element(),
        widget: this
      });
    },
    _disposeTooltip: function () {
      this._tooltip.dispose();
      this._tooltip = null;
    },
    _setTooltipRendererOptions: function () {
      this._tooltip.setRendererOptions(this._getRendererOptions());
    },
    _setTooltipOptions: function () {
      this._tooltip.update(this._getOption("tooltip"));
    }
  },
  extenders: {
    _stopCurrentHandling: function () {
      if (this._tooltip) {
        this._tooltip.hide();
      }
    }
  },
  customize: function (e) {
    var t = e.prototype;
    t._eventsMap.onTooltipShown = {
      name: "tooltipShown"
    };
    t._eventsMap.onTooltipHidden = {
      name: "tooltipHidden"
    };
    e.addChange({
      code: "TOOLTIP_RENDERER",
      handler: function () {
        this._setTooltipRendererOptions();
      },
      isThemeDependent: true,
      isOptionChange: true
    });
    e.addChange({
      code: "TOOLTIP",
      handler: function () {
        this._setTooltipOptions();
      },
      isThemeDependent: true,
      isOptionChange: true,
      option: "tooltip"
    });
  },
  fontFields: ["tooltip.font"]
};
exports.plugin = S;