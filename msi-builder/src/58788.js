exports.default = undefined;
var i = require("./58664.js");
var o = C(require("./68374.js"));
var a = C(require("./55994.js"));
var r = require("./60137.js");
var s = C(require("./47810.js"));
var l = require("./20576.js");
var u = require("./35922.js");
var d = require("./13306.js");
var c = require("./6415.js");
var h = require("./58201.js");
var f = C(require("./20530.js"));
var p = C(require("./99393.js"));
var g = C(require("./13046.js"));
var m = require("./39611.js");
var _ = C(require("./37334.js"));
var v = require("./54142.js");
var y = C(require("./78831.js"));
var b = require("./82205.js");
var x = require("./62754.js");
var w = require("./60650.js");
function C(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var S = "dxScrollable";
var k = g.default.inherit({
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      disabled: false,
      onScroll: null,
      direction: "vertical",
      showScrollbar: "onScroll",
      useNative: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      onUpdated: null,
      onStart: null,
      onEnd: null,
      onBounce: null,
      useSimulatedScrollbar: false,
      useKeyboard: true,
      inertiaEnabled: true,
      updateManually: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat((0, b.deviceDependentOptions)(), [{
      device: function () {
        return r.nativeScrolling && f.default.real().platform === "android" && !s.default.mozilla;
      },
      options: {
        useSimulatedScrollbar: true
      }
    }]);
  },
  _initOptions: function (e) {
    this.callBase(e);
    if (!("useSimulatedScrollbar" in e)) {
      this._setUseSimulatedScrollbar();
    }
  },
  _setUseSimulatedScrollbar: function () {
    if (!this.initialOption("useSimulatedScrollbar")) {
      this.option("useSimulatedScrollbar", !this.option("useNative"));
    }
  },
  _init: function () {
    this.callBase();
    this._initScrollableMarkup();
    this._locked = false;
  },
  _visibilityChanged: function (e) {
    if (e) {
      this.update();
      this._updateRtlPosition();
      if (this._savedScrollOffset) {
        this.scrollTo(this._savedScrollOffset);
      }
      delete this._savedScrollOffset;
    } else {
      this._savedScrollOffset = this.scrollOffset();
    }
  },
  _initScrollableMarkup: function () {
    var e = this.$element().addClass("dx-scrollable");
    var t = this._$container = (0, o.default)("<div>").addClass("dx-scrollable-container");
    var n = this._$wrapper = (0, o.default)("<div>").addClass("dx-scrollable-wrapper");
    (this._$content = (0, o.default)("<div>").addClass("dx-scrollable-content")).append(e.contents()).appendTo(t);
    t.appendTo(n);
    n.appendTo(e);
  },
  _dimensionChanged: function () {
    this.update();
    this._updateRtlPosition();
  },
  _initMarkup: function () {
    this.callBase();
    this._renderDirection();
  },
  _render: function () {
    this._renderStrategy();
    this._attachEventHandlers();
    this._renderDisabledState();
    this._createActions();
    this.update();
    this.callBase();
    this._updateRtlPosition(true);
  },
  _updateRtlPosition: function (e) {
    this._strategy.updateRtlPosition(e);
  },
  _getMaxOffset: function () {
    var e = (0, o.default)(this.container()).get(0);
    return {
      left: e.scrollWidth - e.clientWidth,
      top: e.scrollHeight - e.clientHeight
    };
  },
  _attachEventHandlers: function () {
    var e = this._strategy;
    var t = {
      getDirection: e.getDirection.bind(e),
      validate: this._validate.bind(this),
      isNative: this.option("useNative"),
      scrollTarget: this._$container
    };
    a.default.off(this._$wrapper, "." + S);
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.init, S), t, this._initHandler.bind(this));
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.start, S), e.handleStart.bind(e));
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.move, S), e.handleMove.bind(e));
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.end, S), e.handleEnd.bind(e));
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.cancel, S), e.handleCancel.bind(e));
    a.default.on(this._$wrapper, (0, m.addNamespace)(_.default.stop, S), e.handleStop.bind(e));
    a.default.off(this._$container, "." + S);
    a.default.on(this._$container, (0, m.addNamespace)("scroll", S), e.handleScroll.bind(e));
  },
  _validate: function (e) {
    return !this._isLocked() && (this._updateIfNeed(), this._moveIsAllowed(e));
  },
  _moveIsAllowed: function (e) {
    return this._strategy.validate(e);
  },
  handleMove: function (e) {
    this._strategy.handleMove(e);
  },
  _prepareDirections: function (e) {
    this._strategy._prepareDirections(e);
  },
  _initHandler: function () {
    var e = this._strategy;
    e.handleInit.apply(e, arguments);
  },
  _renderDisabledState: function () {
    this.$element().toggleClass("dx-scrollable-disabled", this.option("disabled"));
    if (this.option("disabled")) {
      this._lock();
    } else {
      this._unlock();
    }
  },
  _renderDirection: function () {
    this.$element().removeClass("dx-scrollable-horizontal").removeClass("dx-scrollable-vertical").removeClass("dx-scrollable-both").addClass("dx-scrollable-" + this.option("direction"));
  },
  _renderStrategy: function () {
    this._createStrategy();
    this._strategy.render();
    this.$element().data("dxScrollableStrategy", this._strategy);
  },
  _createStrategy: function () {
    this._strategy = this.option("useNative") ? new y.default(this) : new v.SimulatedStrategy(this);
  },
  _createActions: function () {
    if (this._strategy) {
      this._strategy.createActions();
    }
  },
  _clean: function () {
    if (this._strategy) {
      this._strategy.dispose();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onStart":
      case "onEnd":
      case "onUpdated":
      case "onScroll":
      case "onBounce":
        this._createActions();
        break;
      case "direction":
        this._resetInactiveDirection();
        this._invalidate();
        break;
      case "useNative":
        this._setUseSimulatedScrollbar();
        this._invalidate();
        break;
      case "inertiaEnabled":
      case "scrollByThumb":
      case "bounceEnabled":
      case "useKeyboard":
      case "showScrollbar":
      case "useSimulatedScrollbar":
        this._invalidate();
        break;
      case "disabled":
        this._renderDisabledState();
        if (this._strategy) {
          this._strategy.disabledChanged();
        }
        break;
      case "updateManually":
      case "scrollByContent":
        break;
      case "width":
        this.callBase(e);
        this._updateRtlPosition();
        break;
      default:
        this.callBase(e);
    }
  },
  _resetInactiveDirection: function () {
    var e = this._getInactiveProp();
    if (e && (0, h.hasWindow)()) {
      var t = this.scrollOffset();
      t[e] = 0;
      this.scrollTo(t);
    }
  },
  _getInactiveProp: function () {
    var e = this.option("direction");
    if (e === "vertical") {
      return "left";
    } else if (e === "horizontal") {
      return "top";
    } else {
      return undefined;
    }
  },
  _location: function () {
    return this._strategy.location();
  },
  _normalizeLocation: function (e) {
    if ((0, u.isPlainObject)(e)) {
      var t = (0, l.ensureDefined)(e.left, e.x);
      var n = (0, l.ensureDefined)(e.top, e.y);
      return {
        left: (0, u.isDefined)(t) ? -t : undefined,
        top: (0, u.isDefined)(n) ? -n : undefined
      };
    }
    var i = this.option("direction");
    return {
      left: i !== "vertical" ? -e : undefined,
      top: i !== "horizontal" ? -e : undefined
    };
  },
  _isLocked: function () {
    return this._locked;
  },
  _lock: function () {
    this._locked = true;
  },
  _unlock: function () {
    if (!this.option("disabled")) {
      this._locked = false;
    }
  },
  _isDirection: function (e) {
    var t = this.option("direction");
    if (e === "vertical") {
      return t !== "horizontal";
    } else if (e === "horizontal") {
      return t !== "vertical";
    } else {
      return t === e;
    }
  },
  _updateAllowedDirection: function () {
    var e = this._strategy._allowedDirections();
    if (this._isDirection("both") && e.vertical && e.horizontal) {
      this._allowedDirectionValue = "both";
    } else if (this._isDirection("horizontal") && e.horizontal) {
      this._allowedDirectionValue = "horizontal";
    } else if (this._isDirection("vertical") && e.vertical) {
      this._allowedDirectionValue = "vertical";
    } else {
      this._allowedDirectionValue = null;
    }
  },
  _allowedDirection: function () {
    return this._allowedDirectionValue;
  },
  $content: function () {
    return this._$content;
  },
  content: function () {
    return (0, c.getPublicElement)(this._$content);
  },
  container: function () {
    return (0, c.getPublicElement)(this._$container);
  },
  scrollOffset: function () {
    return this._strategy._getScrollOffset();
  },
  _isRtlNativeStrategy: function () {
    var e = this.option();
    var t = e.useNative;
    var n = e.rtlEnabled;
    return t && n;
  },
  scrollTop: function () {
    return this.scrollOffset().top;
  },
  scrollLeft: function () {
    return this.scrollOffset().left;
  },
  clientHeight: function () {
    return (0, i.getHeight)(this._$container);
  },
  scrollHeight: function () {
    return (0, i.getOuterHeight)(this.$content());
  },
  clientWidth: function () {
    return (0, i.getWidth)(this._$container);
  },
  scrollWidth: function () {
    return (0, i.getOuterWidth)(this.$content());
  },
  update: function () {
    if (this._strategy) {
      return (0, x.when)(this._strategy.update()).done(function () {
        this._updateAllowedDirection();
      }.bind(this));
    }
  },
  scrollBy: function (e) {
    if ((e = this._normalizeLocation(e)).top || e.left) {
      this._updateIfNeed();
      this._strategy.scrollBy(e);
    }
  },
  scrollTo: function (e) {
    e = this._normalizeLocation(e);
    this._updateIfNeed();
    var t = this._location();
    if (!this.option("useNative")) {
      e = this._strategy._applyScaleRatio(e);
      t = this._strategy._applyScaleRatio(t);
    }
    if (this._isRtlNativeStrategy()) {
      t.left = t.left - this._getMaxOffset().left;
    }
    var n = this._normalizeLocation({
      left: t.left - (0, l.ensureDefined)(e.left, t.left),
      top: t.top - (0, l.ensureDefined)(e.top, t.top)
    });
    if (n.top || n.left) {
      this._strategy.scrollBy(n);
    }
  },
  scrollToElement: function (e, t) {
    var n = (0, o.default)(e);
    var i = this.$content().find(e).length;
    var a = n.parents(".dx-scrollable").length - n.parents(".dx-scrollable-content").length == 0;
    if (i && a) {
      var r = {
        top: 0,
        left: 0
      };
      var s = this.option("direction");
      if (s !== "vertical") {
        r.left = this.getScrollElementPosition(n, "horizontal", t);
      }
      if (s !== "horizontal") {
        r.top = this.getScrollElementPosition(n, "vertical", t);
      }
      this.scrollTo(r);
    }
  },
  getScrollElementPosition: function (e, t, n) {
    var i = this.scrollOffset();
    return (0, w.getElementLocationInternal)(e.get(0), t, (0, o.default)(this.container()).get(0), i, n);
  },
  _updateIfNeed: function () {
    if (!this.option("updateManually")) {
      this.update();
    }
  },
  _useTemplates: function () {
    return false;
  },
  isRenovated: function () {
    return !!k.IS_RENOVATED_WIDGET;
  }
});
(0, p.default)(S, k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;