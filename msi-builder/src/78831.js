exports.default = undefined;
var i = require("./58664.js");
var o = h(require("./68374.js"));
var a = h(require("./55994.js"));
var r = require("./39611.js");
var s = require("./20576.js");
var l = require("./95479.js");
var u = h(require("./20530.js"));
var d = h(require("./38377.js"));
var c = h(require("./89043.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = d.default.inherit({
  ctor: function (e) {
    this._init(e);
  },
  _init: function (e) {
    this._component = e;
    this._$element = e.$element();
    this._$container = (0, o.default)(e.container());
    this._$content = e.$content();
    this._direction = e.option("direction");
    this._useSimulatedScrollbar = e.option("useSimulatedScrollbar");
    this.option = e.option.bind(e);
    this._createActionByOption = e._createActionByOption.bind(e);
    this._isLocked = e._isLocked.bind(e);
    this._isDirection = e._isDirection.bind(e);
    this._allowedDirection = e._allowedDirection.bind(e);
    this._getMaxOffset = e._getMaxOffset.bind(e);
    this._isRtlNativeStrategy = e._isRtlNativeStrategy.bind(e);
  },
  render: function () {
    var e = u.default.real().platform;
    this._$element.addClass("dx-scrollable-native").addClass("dx-scrollable-native-" + e).toggleClass("dx-scrollable-scrollbars-hidden", !this._isScrollbarVisible());
    if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
      this._renderScrollbars();
    }
  },
  updateRtlPosition: function (e) {
    if (e && this.option("rtlEnabled") && this._isScrollbarVisible() && this._useSimulatedScrollbar) {
      this._moveScrollbars();
    }
  },
  _renderScrollbars: function () {
    this._scrollbars = {};
    this._hideScrollbarTimeout = 0;
    this._$element.addClass("dx-scrollable-scrollbar-simulated");
    this._renderScrollbar("vertical");
    this._renderScrollbar("horizontal");
  },
  _renderScrollbar: function (e) {
    if (this._isDirection(e)) {
      this._scrollbars[e] = new c.default((0, o.default)("<div>").appendTo(this._$element), {
        direction: e,
        expandable: this._component.option("scrollByThumb")
      });
    }
  },
  handleInit: s.noop,
  handleStart: s.noop,
  handleMove: function (e) {
    if (this._isLocked()) {
      e.cancel = true;
    } else if (this._allowedDirection()) {
      e.originalEvent.isScrollingEvent = true;
    }
  },
  handleEnd: s.noop,
  handleCancel: s.noop,
  handleStop: s.noop,
  _eachScrollbar: function (e) {
    e = e.bind(this);
    (0, l.each)(this._scrollbars || {}, function (t, n) {
      e(n, t);
    });
  },
  createActions: function () {
    this._scrollAction = this._createActionByOption("onScroll");
    this._updateAction = this._createActionByOption("onUpdated");
  },
  _createActionArgs: function () {
    var e = this.location();
    var t = e.left;
    var n = e.top;
    return {
      event: this._eventForUserAction,
      scrollOffset: this._getScrollOffset(),
      reachedLeft: this._isRtlNativeStrategy() ? this._isReachedRight(-t) : this._isReachedLeft(t),
      reachedRight: this._isRtlNativeStrategy() ? this._isReachedLeft(-Math.abs(t)) : this._isReachedRight(t),
      reachedTop: this._isDirection("vertical") ? Math.round(n) >= 0 : undefined,
      reachedBottom: this._isDirection("vertical") ? Math.round(Math.abs(n) - this._getMaxOffset().top) >= 0 : undefined
    };
  },
  _getScrollOffset: function () {
    var e = this.location();
    var t = e.top;
    var n = e.left;
    return {
      top: -t,
      left: this._normalizeOffsetLeft(-n)
    };
  },
  _normalizeOffsetLeft: function (e) {
    if (this._isRtlNativeStrategy()) {
      return this._getMaxOffset().left + e;
    } else {
      return e;
    }
  },
  _isReachedLeft: function (e) {
    if (this._isDirection("horizontal")) {
      return Math.round(e) >= 0;
    } else {
      return undefined;
    }
  },
  _isReachedRight: function (e) {
    if (this._isDirection("horizontal")) {
      return Math.round(Math.abs(e) - this._getMaxOffset().left) >= 0;
    } else {
      return undefined;
    }
  },
  _isScrollbarVisible: function () {
    var e = this.option().showScrollbar;
    return e !== "never" && e !== false;
  },
  handleScroll: function (e) {
    this._eventForUserAction = e;
    this._moveScrollbars();
    this._scrollAction(this._createActionArgs());
  },
  _moveScrollbars: function () {
    var e = this._getScrollOffset();
    var t = e.top;
    var n = e.left;
    this._eachScrollbar(function (e) {
      e.moveTo({
        top: -t,
        left: -n
      });
      e.option("visible", true);
    });
    this._hideScrollbars();
  },
  _hideScrollbars: function () {
    clearTimeout(this._hideScrollbarTimeout);
    this._hideScrollbarTimeout = setTimeout(function () {
      this._eachScrollbar(function (e) {
        e.option("visible", false);
      });
    }.bind(this), 500);
  },
  location: function () {
    return {
      left: -this._$container.scrollLeft(),
      top: -this._$container.scrollTop()
    };
  },
  disabledChanged: s.noop,
  update: function () {
    this._update();
    this._updateAction(this._createActionArgs());
  },
  _update: function () {
    this._updateDimensions();
    this._updateScrollbars();
  },
  _updateDimensions: function () {
    this._containerSize = {
      height: (0, i.getHeight)(this._$container),
      width: (0, i.getWidth)(this._$container)
    };
    this._componentContentSize = {
      height: (0, i.getHeight)(this._component.$content()),
      width: (0, i.getWidth)(this._component.$content())
    };
    this._contentSize = {
      height: (0, i.getHeight)(this._$content),
      width: (0, i.getWidth)(this._$content)
    };
  },
  _updateScrollbars: function () {
    this._eachScrollbar(function (e, t) {
      var n = t === "vertical" ? "height" : "width";
      e.option({
        containerSize: this._containerSize[n],
        contentSize: this._componentContentSize[n]
      });
      e.update();
    });
  },
  _allowedDirections: function () {
    return {
      vertical: this._isDirection("vertical") && this._contentSize.height > this._containerSize.height,
      horizontal: this._isDirection("horizontal") && this._contentSize.width > this._containerSize.width
    };
  },
  dispose: function () {
    var e = this._$element.get(0).className;
    var t = new RegExp("dx-scrollable-native\\S*", "g");
    if (t.test(e)) {
      this._$element.removeClass(e.match(t).join(" "));
    }
    a.default.off(this._$element, ".dxNativeScrollable");
    a.default.off(this._$container, ".dxNativeScrollable");
    this._removeScrollbars();
    clearTimeout(this._hideScrollbarTimeout);
  },
  _removeScrollbars: function () {
    this._eachScrollbar(function (e) {
      e.$element().remove();
    });
  },
  scrollBy: function (e) {
    var t = this.location();
    this._$container.scrollTop(Math.round(-t.top - e.top));
    this._$container.scrollLeft(Math.round(-t.left - e.left));
  },
  validate: function (e) {
    return !this.option("disabled") && (!(0, r.isDxMouseWheelEvent)(e) || !this._isScrolledInMaxDirection(e)) && !!this._allowedDirection();
  },
  _isScrolledInMaxDirection: function (e) {
    var t = this._$container.get(0);
    if (e.delta > 0) {
      if (e.shiftKey) {
        return !t.scrollLeft;
      } else {
        return !t.scrollTop;
      }
    } else if (e.shiftKey) {
      return t.scrollLeft >= this._getMaxOffset().left;
    } else {
      return t.scrollTop >= this._getMaxOffset().top;
    }
  },
  getDirection: function () {
    return this._allowedDirection();
  }
});
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;