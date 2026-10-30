exports.default = undefined;
var i = m(require("./55994.js"));
var o = m(require("./73349.js"));
var a = require("./35922.js");
var r = m(require("./59063.js"));
var s = require("./13306.js");
var l = require("./39611.js");
var u = m(require("./93786.js"));
var d = require("./19157.js");
var c = m(require("./68374.js"));
var h = require("./87276.js");
var f = require("./20576.js");
var p = require("./14371.js");
var g = require("./82454.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _;
var v = "sparkline-tooltip";
var y = (0, l.addNamespace)([u.default.down, u.default.move], v);
var b = s.extend;
var x = Math.floor;
function w(e) {
  var t = e.data.widget;
  t._enableOutHandler();
  t._showTooltip();
}
function C(e) {
  var t = new h.Translator2D({}, {}, {
    shiftZeroValue: !e,
    isHorizontal: !!e
  });
  return {
    getTranslator: function () {
      return t;
    },
    update: function (e, n, i) {
      t.update(e, n, i);
    },
    getVisibleArea: function () {
      var e = t.getCanvasVisibleArea();
      return [e.min, e.max];
    },
    visualRange: f.noop,
    calculateInterval: f.noop,
    getMarginOptions: function () {
      return {};
    },
    aggregatedPointBetweenTicks: function () {
      return false;
    }
  };
}
var S = r.default.inherit({
  _getLayoutItems: f.noop,
  _useLinks: false,
  _themeDependentChanges: ["OPTIONS"],
  _initCore: function () {
    this._tooltipTracker = this._renderer.root;
    this._tooltipTracker.attr({
      "pointer-events": "visible"
    });
    this._createHtmlElements();
    this._initTooltipEvents();
    this._argumentAxis = C(true);
    this._valueAxis = C();
  },
  _getDefaultSize: function () {
    return this._defaultSize;
  },
  _disposeCore: function () {
    this._disposeWidgetElements();
    this._disposeTooltipEvents();
    this._ranges = null;
  },
  _optionChangesOrder: ["OPTIONS"],
  _change_OPTIONS: function () {
    this._prepareOptions();
    this._change(["UPDATE"]);
  },
  _customChangesOrder: ["UPDATE"],
  _change_UPDATE: function () {
    this._update();
  },
  _update: function () {
    if (this._tooltipShown) {
      this._tooltipShown = false;
      this._tooltip.hide();
    }
    this._cleanWidgetElements();
    this._updateWidgetElements();
    this._drawWidgetElements();
  },
  _updateWidgetElements: function () {
    var e = this._getCorrectCanvas();
    this._updateRange();
    this._argumentAxis.update(this._ranges.arg, e, this._getStick());
    this._valueAxis.update(this._ranges.val, e);
  },
  _getStick: function () {},
  _applySize: function (e) {
    this._allOptions.size = {
      width: e[2] - e[0],
      height: e[3] - e[1]
    };
    this._change(["UPDATE"]);
  },
  _setupResizeHandler: f.noop,
  _prepareOptions: function () {
    return b(true, {}, this._themeManager.theme(), this.option());
  },
  _getTooltipCoords: function () {
    var e = this._canvas;
    var t = this._renderer.getRootOffset();
    return {
      x: e.width / 2 + t.left,
      y: e.height / 2 + t.top
    };
  },
  _initTooltipEvents: function () {
    var e = {
      widget: this
    };
    this._renderer.root.off("." + v).on(y, e, w);
  },
  _showTooltip: function () {
    if (!this._tooltipShown) {
      this._tooltipShown = true;
      if (this._getTooltip().isEnabled()) {
        this._tooltip.show(this._getTooltipData(), this._getTooltipCoords(), {});
      }
    }
  },
  _hideTooltip: function () {
    if (this._tooltipShown) {
      this._tooltipShown = false;
      this._tooltip.hide();
    }
  },
  _stopCurrentHandling: function () {
    this._hideTooltip();
  },
  _enableOutHandler: function () {
    var e = this;
    if (!e._outHandler) {
      function t(t) {
        var n = t.pageX;
        var i = t.pageY;
        var o = e._renderer.getRootOffset();
        var a = o.left;
        var r = o.top;
        var s = x(n - a);
        var l = x(i - r);
        if (!function (e, t, n) {
          var i = e.width;
          var o = e.height;
          return (0, d.pointInCanvas)({
            left: 0,
            top: 0,
            right: i,
            bottom: o,
            width: i,
            height: o
          }, t, n);
        }(e._canvas, s, l)) {
          e._hideTooltip();
          e._disableOutHandler();
        }
      }
      i.default.on(o.default.getDocument(), y, t);
      this._outHandler = t;
    }
  },
  _disableOutHandler: function () {
    if (this._outHandler) {
      i.default.off(o.default.getDocument(), y, this._outHandler);
    }
    this._outHandler = null;
  },
  _disposeTooltipEvents: function () {
    this._tooltipTracker.off();
    this._disableOutHandler();
    this._renderer.root.off("." + v);
  },
  _getTooltip: function () {
    var e = this;
    if (!e._tooltip) {
      _.apply(this, arguments);
      e._setTooltipRendererOptions(e._tooltipRendererOptions);
      e._tooltipRendererOptions = null;
      e._setTooltipOptions();
    }
    return e._tooltip;
  }
});
var k = S;
exports.default = k;
S.addPlugin(p.plugin);
_ = S.prototype._initTooltip;
S.prototype._initTooltip = f.noop;
var D = S.prototype._disposeTooltip;
S.prototype._disposeTooltip = function () {
  if (this._tooltip) {
    D.apply(this, arguments);
  }
};
S.prototype._setTooltipRendererOptions = function () {
  var e = this._getRendererOptions();
  if (this._tooltip) {
    this._tooltip.setRendererOptions(e);
  } else {
    this._tooltipRendererOptions = e;
  }
};
S.prototype._setTooltipOptions = function () {
  if (this._tooltip) {
    var e = this._getOption("tooltip");
    var t = this._getDefaultTooltipTemplate(e);
    var n = b(t ? {
      contentTemplate: t
    } : {}, e, {
      enabled: e.enabled && this._isTooltipEnabled()
    });
    this._tooltip.update(n);
  }
};
S.prototype._getDefaultTooltipTemplate = function (e) {
  var t = true;
  var n = this.option("rtlEnabled") ? "left" : "right";
  if ((0, a.isFunction)(e.customizeTooltip)) {
    this._tooltip.update(e);
    var o = this._getTooltipData();
    var r = e.customizeTooltip.call(o, o) ?? {};
    t = !("html" in r) && !("text" in r);
  }
  return t && function (e, t) {
    var n = e.lineSpacing;
    var i = e.size;
    var o = `${(n ?? 2) + i}px`;
    return function (e, n) {
      for (var i = e.valueText, a = (0, c.default)("<table>").css({
          borderSpacing: 0,
          lineHeight: o
        }), r = 0; r < i.length; r += 2) {
        var s = (0, c.default)("<tr>");
        (0, c.default)("<td>").text(i[r]).appendTo(s);
        (0, c.default)("<td>").css({
          width: 15
        }).appendTo(s);
        (0, c.default)("<td>").css({
          textAlign: t
        }).text(i[r + 1]).appendTo(s);
        a.append(s);
      }
      n.append(a);
    };
  }(e.font, n);
};
var I = (0, s.extend)(true, {}, g.plugin, {
  init: f.noop,
  dispose: f.noop,
  customize: null,
  members: {
    _getExportMenuOptions: null
  }
});
S.addPlugin(I);
module.exports = exports.default;
module.exports.default = exports.default;