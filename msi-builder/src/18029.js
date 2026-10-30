exports.BaseGauge = undefined;
exports.compareArrays = function (e, t) {
  return e && t && e.length === t.length && function (e, t) {
    var n;
    var i;
    var o;
    var a = e.length;
    for (n = 0; n < a; ++n) {
      i = e[n] != e[n];
      o = t[n] != t[n];
      if ((!i || !o) && e[n] !== t[n]) {
        return false;
      }
    }
    return true;
  }(e, t);
};
exports.getSampleText = exports.formatValue = undefined;
var i = require("./19157.js");
var o = require("./13306.js");
var a = require("./17953.js");
var r = g(require("./59063.js"));
var s = g(require("./41802.js"));
var l = g(require("./57298.js"));
var u = g(require("./30343.js"));
var d = require("./82454.js");
var c = require("./17384.js");
var h = require("./14371.js");
var f = require("./64758.js");
var p = require("./20576.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = Number;
var _ = o.extend;
var v = u.default.format;
var y = r.default.inherit({
  _rootClassPrefix: "dxg",
  _themeSection: "gauge",
  _createThemeManager: function () {
    return new s.default.ThemeManager(this._getThemeManagerOptions());
  },
  _initCore: function () {
    var e = this._renderer.root;
    this._valueChangingLocker = 0;
    this._translator = this._factory.createTranslator();
    this._tracker = this._factory.createTracker({
      renderer: this._renderer,
      container: e
    });
    this._setTrackerCallbacks();
  },
  _beginValueChanging: function () {
    this._resetIsReady();
    this._onBeginUpdate();
    ++this._valueChangingLocker;
  },
  _endValueChanging: function () {
    if (--this._valueChangingLocker == 0) {
      this._drawn();
    }
  },
  _setTrackerCallbacks: function () {
    var e = this._renderer;
    var t = this._tooltip;
    this._tracker.setCallbacks({
      "tooltip-show": function (n, i, o) {
        var a = n.getTooltipParameters();
        var r = e.getRootOffset();
        var s = _({
          value: a.value,
          valueText: t.formatValue(a.value),
          color: a.color
        }, i);
        return t.show(s, {
          x: a.x + r.left,
          y: a.y + r.top,
          offset: a.offset
        }, {
          target: i
        }, undefined, o);
      },
      "tooltip-hide": function () {
        return t.hide();
      }
    });
  },
  _dispose: function () {
    this._cleanCore();
    this.callBase.apply(this, arguments);
  },
  _disposeCore: function () {
    this._themeManager.dispose();
    this._tracker.dispose();
    this._translator = this._tracker = null;
  },
  _cleanCore: function () {
    this._tracker.deactivate();
    this._cleanContent();
  },
  _renderCore: function () {
    if (this._isValidDomain) {
      this._renderContent();
      this._renderGraphicObjects();
      this._tracker.setTooltipState(this._tooltip.isEnabled());
      this._tracker.activate();
      this._noAnimation = false;
    }
  },
  _applyChanges: function () {
    this.callBase.apply(this, arguments);
    this._resizing = this._noAnimation = false;
  },
  _setContentSize: function () {
    var e = this;
    e._resizing = e._noAnimation = e._changes.count() === 2;
    e.callBase.apply(e, arguments);
  },
  _applySize: function (e) {
    this._innerRect = {
      left: e[0],
      top: e[1],
      right: e[2],
      bottom: e[3]
    };
    var t = this._layout._cache;
    this._cleanCore();
    this._renderCore();
    this._layout._cache = this._layout._cache || t;
    return [e[0], this._innerRect.top, e[2], this._innerRect.bottom];
  },
  _initialChanges: ["DOMAIN"],
  _themeDependentChanges: ["DOMAIN"],
  _optionChangesMap: {
    subtitle: "MOSTLY_TOTAL",
    indicator: "MOSTLY_TOTAL",
    geometry: "MOSTLY_TOTAL",
    animation: "MOSTLY_TOTAL",
    startValue: "DOMAIN",
    endValue: "DOMAIN"
  },
  _optionChangesOrder: ["DOMAIN", "MOSTLY_TOTAL"],
  _change_DOMAIN: function () {
    this._setupDomain();
  },
  _change_MOSTLY_TOTAL: function () {
    this._applyMostlyTotalChange();
  },
  _updateExtraElements: p.noop,
  _setupDomain: function () {
    this._setupDomainCore();
    this._isValidDomain = isFinite(1 / (this._translator.getDomain()[1] - this._translator.getDomain()[0]));
    if (!this._isValidDomain) {
      this._incidentOccurred("W2301");
    }
    this._change(["MOSTLY_TOTAL"]);
  },
  _applyMostlyTotalChange: function () {
    this._setupCodomain();
    this._setupAnimationSettings();
    this._setupDefaultFormat();
    this._change(["LAYOUT"]);
  },
  _setupAnimationSettings: function () {
    var e = this.option("animation");
    this._animationSettings = null;
    if ((e === undefined || e) && (e = _({
      enabled: true,
      duration: 1000,
      easing: "easeOutCubic"
    }, e)).enabled && e.duration > 0) {
      this._animationSettings = {
        duration: m(e.duration),
        easing: e.easing
      };
    }
    this._containerBackgroundColor = this.option("containerBackgroundColor") || this._themeManager.theme().containerBackgroundColor;
  },
  _setupDefaultFormat: function () {
    var e = this._translator.getDomain();
    this._defaultFormatOptions = (0, i.getAppropriateFormat)(e[0], e[1], this._getApproximateScreenRange());
  },
  _setupDomainCore: null,
  _calculateSize: null,
  _cleanContent: null,
  _renderContent: null,
  _setupCodomain: null,
  _getApproximateScreenRange: null,
  _factory: {
    createTranslator: function () {
      return new a.Translator1D();
    },
    createTracker: function (e) {
      return new l.default(e);
    }
  }
});
exports.BaseGauge = y;
function b(e, t, n) {
  if (Object.is(e, -0)) {
    e = 0;
  }
  var i;
  var o = v(e, (t = t || {}).format);
  if (typeof t.customizeText == "function") {
    i = _({
      value: e,
      valueText: o
    }, n);
    return String(t.customizeText.call(i, i));
  } else {
    return o;
  }
}
exports.formatValue = b;
exports.getSampleText = function (e, t) {
  var n = b(e.getDomainStart(), t);
  var i = b(e.getDomainEnd(), t);
  if (n.length >= i.length) {
    return n;
  } else {
    return i;
  }
};
y.addPlugin(d.plugin);
y.addPlugin(c.plugin);
y.addPlugin(h.plugin);
y.addPlugin(f.plugin);
var x = y.prototype._setTooltipOptions;
y.prototype._setTooltipOptions = function () {
  x.apply(this, arguments);
  if (this._tracker) {
    this._tracker.setTooltipState(this._tooltip.isEnabled());
  }
};