exports.default = undefined;
var i = require("./58664.js");
var o = m(require("./68374.js"));
var a = m(require("./55994.js"));
var r = m(require("./99393.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./39611.js");
var d = require("./95429.js");
var c = m(require("./58788.js"));
var h = m(require("./20530.js"));
var f = m(require("./87209.js"));
var p = require("./31648.js");
var g = require("./82886.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var v = function (e) {
  var t;
  var n;
  function r() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var c = r.prototype;
  c._getDefaultOptions = function () {
    return (0, s.extend)(e.prototype._getDefaultOptions.call(this), {
      showScrollbar: "never",
      useNative: false,
      selectedIndex: 0,
      bounceEnabled: false,
      items: [],
      showOnClick: false,
      onClick: null,
      onSelectedIndexChanged: null,
      scrollByContent: true
    });
  };
  c._init = function () {
    e.prototype._init.call(this);
    this.option("onVisibilityChange", this._visibilityChangedHandler.bind(this));
    this.option("onEnd", this._endActionHandler.bind(this));
  };
  c._render = function () {
    e.prototype._render.call(this);
    this._renderSelectedItemFrame();
    this.$element().addClass("dx-dateviewroller");
    this._renderContainerClick();
    this._renderItems();
    this._renderSelectedValue();
    this._renderItemsClick();
    this._renderWheelEvent();
    this._renderSelectedIndexChanged();
  };
  c._renderSelectedIndexChanged = function () {
    this._selectedIndexChanged = this._createActionByOption("onSelectedIndexChanged");
  };
  c._renderWheelEvent = function () {
    var e = this;
    a.default.on((0, o.default)(this.container()), "dxmousewheel", function (t) {
      e._isWheelScrolled = true;
    });
  };
  c._renderContainerClick = function () {
    if (this.option("showOnClick")) {
      var e = (0, u.addNamespace)(d.name, this.NAME);
      var t = this._createActionByOption("onClick");
      a.default.off((0, o.default)(this.container()), e);
      a.default.on((0, o.default)(this.container()), e, function (e) {
        t({
          event: e
        });
      });
    }
  };
  c._renderItems = function () {
    var e = this.option("items") || [];
    var t = (0, o.default)();
    (0, o.default)(this.content()).empty();
    e.forEach(function (e) {
      t = t.add((0, o.default)("<div>").addClass("dx-dateview-item").append(e));
    });
    (0, o.default)(this.content()).append(t);
    this._$items = t;
    this.update();
  };
  c._renderSelectedItemFrame = function () {
    (0, o.default)("<div>").addClass("dx-dateview-item-selected-frame").append((0, o.default)("<div>").addClass("dx-dateview-item-selected-border")).appendTo((0, o.default)(this.container()));
  };
  c._renderSelectedValue = function (e) {
    var t = this._fitIndex(e ?? this.option("selectedIndex"));
    this._moveTo({
      top: this._getItemPosition(t)
    });
    this._renderActiveStateItem();
  };
  c._fitIndex = function (e) {
    var t = (this.option("items") || []).length;
    if (e >= t) {
      return t - 1;
    } else if (e < 0) {
      return 0;
    } else {
      return e;
    }
  };
  c._getItemPosition = function (e) {
    return Math.round(this._itemHeight() * e);
  };
  c._renderItemsClick = function () {
    var e = this._getItemSelector();
    var t = (0, u.addNamespace)(d.name, this.NAME);
    a.default.off(this.$element(), t, e);
    a.default.on(this.$element(), t, e, this._itemClickHandler.bind(this));
  };
  c._getItemSelector = function () {
    return ".dx-dateview-item";
  };
  c._itemClickHandler = function (e) {
    this.option("selectedIndex", this._itemElementIndex(e.currentTarget));
  };
  c._itemElementIndex = function (e) {
    return this._itemElements().index(e);
  };
  c._itemElements = function () {
    return this.$element().find(this._getItemSelector());
  };
  c._renderActiveStateItem = function () {
    var e = this.option("selectedIndex");
    (0, l.each)(this._$items, function (t) {
      (0, o.default)(this).toggleClass("dx-dateview-item-selected", e === t);
    });
  };
  c._shouldScrollToNeighborItem = function () {
    return h.default.real().deviceType === "desktop" && this._isWheelScrolled;
  };
  c._moveTo = function (e) {
    var t = (0, g.convertToLocation)(e);
    var n = t.top;
    var i = t.left;
    var a = this.scrollOffset();
    var r = {
      x: a.left - i,
      y: a.top - n
    };
    if (this._isVisible() && (r.x || r.y)) {
      this._prepareDirections(true);
      if (this._animation && !this._shouldScrollToNeighborItem()) {
        var s = this;
        f.default.stop((0, o.default)(this.content()));
        f.default.animate((0, o.default)(this.content()), {
          duration: 200,
          type: "slide",
          to: {
            top: Math.floor(r.y)
          },
          complete: function () {
            (0, p.resetPosition)((0, o.default)(s.content()));
            s.handleMove({
              delta: r
            });
          }
        });
        delete this._animation;
      } else {
        this.handleMove({
          delta: r
        });
      }
    }
  };
  c._validate = function (e) {
    return this._moveIsAllowed(e);
  };
  c._fitSelectedIndexInRange = function (e) {
    var t = this.option("items").length;
    return Math.max(Math.min(e, t - 1), 0);
  };
  c._isInNullNeighborhood = function (e) {
    return e >= -0.1 && e <= 0.1;
  };
  c._getSelectedIndexAfterScroll = function (e) {
    var t = this.scrollOffset().top - e * this._itemHeight();
    if (this._isInNullNeighborhood(t)) {
      return e;
    }
    var n = t > 0 ? 1 : -1;
    return this._fitSelectedIndexInRange(e + n);
  };
  c._getNewSelectedIndex = function (e) {
    if (this._shouldScrollToNeighborItem()) {
      return this._getSelectedIndexAfterScroll(e);
    }
    this._animation = true;
    var t = this.scrollOffset().top / this._itemHeight();
    return Math.round(t);
  };
  c._endActionHandler = function () {
    var e = this.option("selectedIndex");
    var t = this._getNewSelectedIndex(e);
    if (t === e) {
      this._renderSelectedValue(t);
    } else {
      this.option("selectedIndex", t);
    }
    this._isWheelScrolled = false;
  };
  c._itemHeight = function () {
    var e = this._$items.first();
    return (0, i.getHeight)(e);
  };
  c._toggleActive = function (e) {
    this.$element().toggleClass("dx-state-active", e);
  };
  c._isVisible = function () {
    return (0, o.default)(this.container()).is(":visible");
  };
  c._fireSelectedIndexChanged = function (e, t) {
    this._selectedIndexChanged({
      value: e,
      previousValue: t,
      event: undefined
    });
  };
  c._visibilityChanged = function (t) {
    e.prototype._visibilityChanged.call(this, t);
    this._visibilityChangedHandler(t);
  };
  c._visibilityChangedHandler = function (e) {
    var t = this;
    if (e) {
      this._visibilityTimer = setTimeout(function () {
        t._renderSelectedValue(t.option("selectedIndex"));
      });
    }
    this.toggleActiveState(false);
  };
  c.toggleActiveState = function (e) {
    this.$element().toggleClass("dx-dateviewroller-current", e);
  };
  c._refreshSelectedIndex = function () {
    var e = this.option("selectedIndex");
    var t = this._fitIndex(e);
    if (t === e) {
      this._renderActiveStateItem();
    } else {
      this.option("selectedIndex", t);
    }
  };
  c._optionChanged = function (t) {
    switch (t.name) {
      case "selectedIndex":
        this._fireSelectedIndexChanged(t.value, t.previousValue);
        this._renderSelectedValue(t.value);
        break;
      case "items":
        this._renderItems();
        this._refreshSelectedIndex();
        break;
      case "onClick":
      case "showOnClick":
        this._renderContainerClick();
        break;
      case "onSelectedIndexChanged":
        this._renderSelectedIndexChanged();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  c._dispose = function () {
    clearTimeout(this._visibilityTimer);
    e.prototype._dispose.call(this);
  };
  return r;
}(c.default);
(0, r.default)("dxDateViewRoller", v);
var y = v;
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;