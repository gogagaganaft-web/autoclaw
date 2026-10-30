exports.SimulatedStrategy = exports.Scroller = undefined;
var i = require("./58664.js");
var o = b(require("./68374.js"));
var a = b(require("./73349.js"));
var r = b(require("./55994.js"));
var s = require("./78008.js");
var l = require("./13306.js");
var u = require("./58201.js");
var d = require("./95479.js");
var c = require("./35922.js");
var h = require("./37518.js");
var f = require("./31648.js");
var p = b(require("./38377.js"));
var g = b(require("./6866.js"));
var m = require("./39611.js");
var _ = require("./20576.js");
var v = b(require("./89043.js"));
var y = require("./62754.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var x;
var w;
var C = "horizontal";
var S = Math.round(1000 / 60);
var k = 400 / S;
var D = (1 - Math.pow(0.92, k)) / 0.07999999999999996;
var I = "pageUp";
var T = "pageDown";
var E = "end";
var O = "home";
var A = "leftArrow";
var P = "upArrow";
var M = "rightArrow";
var R = "downArrow";
var B = "tab";
var L = g.default.inherit({
  ctor: function (e) {
    this.callBase();
    this.scroller = e;
  },
  VELOCITY_LIMIT: 1,
  _isFinished: function () {
    return Math.abs(this.scroller._velocity) <= this.VELOCITY_LIMIT;
  },
  _step: function () {
    this.scroller._scrollStep(this.scroller._velocity);
    this.scroller._velocity *= this._acceleration();
  },
  _acceleration: function () {
    if (this.scroller._inBounds()) {
      return 0.92;
    } else {
      return 0.5;
    }
  },
  _complete: function () {
    this.scroller._scrollComplete();
  }
});
var V = L.inherit({
  VELOCITY_LIMIT: 0.2,
  _isFinished: function () {
    return this.scroller._crossBoundOnNextStep() || this.callBase();
  },
  _acceleration: function () {
    return 0.92;
  },
  _complete: function () {
    this.scroller._move(this.scroller._bounceLocation);
    this.callBase();
  }
});
var F = p.default.inherit({
  ctor: function (e) {
    this._initOptions(e);
    this._initAnimators();
    this._initScrollbar();
  },
  _initOptions: function (e) {
    var t = this;
    this._location = 0;
    this._topReached = false;
    this._bottomReached = false;
    this._axis = e.direction === C ? "x" : "y";
    this._prop = e.direction === C ? "left" : "top";
    this._dimension = e.direction === C ? "width" : "height";
    this._scrollProp = e.direction === C ? "scrollLeft" : "scrollTop";
    (0, d.each)(e, function (e, n) {
      t["_" + e] = n;
    });
  },
  _initAnimators: function () {
    this._inertiaAnimator = new L(this);
    this._bounceAnimator = new V(this);
  },
  _initScrollbar: function () {
    this._scrollbar = new v.default((0, o.default)("<div>").appendTo(this._$container), {
      direction: this._direction,
      visible: this._scrollByThumb,
      visibilityMode: this._visibilityModeNormalize(this._scrollbarVisible),
      expandable: this._scrollByThumb
    });
    this._$scrollbar = this._scrollbar.$element();
  },
  _visibilityModeNormalize: function (e) {
    if (e === true) {
      return "onScroll";
    } else if (e === false) {
      return "never";
    } else {
      return e;
    }
  },
  _scrollStep: function (e) {
    var t = this._location;
    this._location += e;
    this._suppressBounce();
    this._move();
    if (!(Math.abs(t - this._location) < 1)) {
      r.default.triggerHandler(this._$container, {
        type: "scroll"
      });
    }
  },
  _suppressBounce: function () {
    if (!this._bounceEnabled && !this._inBounds(this._location)) {
      this._velocity = 0;
      this._location = this._boundLocation();
    }
  },
  _boundLocation: function (e) {
    e = e !== undefined ? e : this._location;
    return Math.max(Math.min(e, this._maxOffset), this._minOffset);
  },
  _move: function (e) {
    this._location = e !== undefined ? e * this._getScaleRatio() : this._location;
    this._moveContent();
    this._moveScrollbar();
  },
  _moveContent: function () {
    var e = this._location;
    this._$container[this._scrollProp](-e / this._getScaleRatio());
    this._moveContentByTranslator(e);
  },
  _getScaleRatio: function () {
    if ((0, u.hasWindow)() && !this._scaleRatio) {
      var e = this._$element.get(0);
      var t = this._getRealDimension(e, this._dimension);
      var n = this._getBaseDimension(e, this._dimension);
      this._scaleRatio = Math.round(t / n * 100) / 100;
    }
    return this._scaleRatio || 1;
  },
  _getRealDimension: function (e, t) {
    return Math.round((0, h.getBoundingRect)(e)[t]);
  },
  _getBaseDimension: function (e, t) {
    return e["offset" + (0, s.titleize)(t)];
  },
  _moveContentByTranslator: function (e) {
    var t;
    var n = -this._maxScrollPropValue;
    t = e > 0 ? e : e <= n ? e - n : e % 1;
    if (this._translateOffset !== t) {
      var i = {
        [this._prop]: t
      };
      this._translateOffset = t;
      if (t !== 0) {
        (0, f.move)(this._$content, i);
      } else {
        (0, f.resetPosition)(this._$content);
      }
    }
  },
  _moveScrollbar: function () {
    this._scrollbar.moveTo(this._location);
  },
  _scrollComplete: function () {
    if (this._inBounds()) {
      this._hideScrollbar();
      if (this._completeDeferred) {
        this._completeDeferred.resolve();
      }
    }
    this._scrollToBounds();
  },
  _scrollToBounds: function () {
    if (!this._inBounds()) {
      this._bounceAction();
      this._setupBounce();
      this._bounceAnimator.start();
    }
  },
  _setupBounce: function () {
    var e = (this._bounceLocation = this._boundLocation()) - this._location;
    this._velocity = e / D;
  },
  _inBounds: function (e) {
    e = e !== undefined ? e : this._location;
    return this._boundLocation(e) === e;
  },
  _crossBoundOnNextStep: function () {
    var e = this._location;
    var t = e + this._velocity;
    return e < this._minOffset && t >= this._minOffset || e > this._maxOffset && t <= this._maxOffset;
  },
  _initHandler: function (e) {
    this._stopScrolling();
    this._prepareThumbScrolling(e);
  },
  _stopScrolling: (0, _.deferRenderer)(function () {
    this._hideScrollbar();
    this._inertiaAnimator.stop();
    this._bounceAnimator.stop();
  }),
  _prepareThumbScrolling: function (e) {
    if (!(0, m.isDxMouseWheelEvent)(e.originalEvent)) {
      var t = (0, o.default)(e.originalEvent.target);
      var n = this._isScrollbar(t);
      if (n) {
        this._moveToMouseLocation(e);
      }
      this._thumbScrolling = n || this._isThumb(t);
      this._crossThumbScrolling = !this._thumbScrolling && this._isAnyThumbScrolling(t);
      if (this._thumbScrolling) {
        this._scrollbar.feedbackOn();
      }
    }
  },
  _isThumbScrollingHandler: function (e) {
    return this._isThumb(e);
  },
  _moveToMouseLocation: function (e) {
    var t = e["page" + this._axis.toUpperCase()] - this._$element.offset()[this._prop];
    var n = this._location + t / this._containerToContentRatio() - (0, i.getHeight)(this._$container) / 2;
    this._scrollStep(-Math.round(n));
  },
  _startHandler: function () {
    this._showScrollbar();
  },
  _moveHandler: function (e) {
    if (!this._crossThumbScrolling) {
      if (this._thumbScrolling) {
        e[this._axis] = -Math.round(e[this._axis] / this._containerToContentRatio());
      }
      this._scrollBy(e);
    }
  },
  _scrollBy: function (e) {
    e = e[this._axis];
    if (!this._inBounds()) {
      e *= 0.5;
    }
    this._scrollStep(e);
  },
  _scrollByHandler: function (e) {
    this._scrollBy(e);
    this._scrollComplete();
  },
  _containerToContentRatio: function () {
    return this._scrollbar.containerToContentRatio();
  },
  _endHandler: function (e) {
    this._completeDeferred = new y.Deferred();
    this._velocity = e[this._axis];
    this._inertiaHandler();
    this._resetThumbScrolling();
    return this._completeDeferred.promise();
  },
  _inertiaHandler: function () {
    this._suppressInertia();
    this._inertiaAnimator.start();
  },
  _suppressInertia: function () {
    if (!this._inertiaEnabled || !!this._thumbScrolling) {
      this._velocity = 0;
    }
  },
  _resetThumbScrolling: function () {
    this._thumbScrolling = false;
    this._crossThumbScrolling = false;
  },
  _stopHandler: function () {
    if (this._thumbScrolling) {
      this._scrollComplete();
    }
    this._resetThumbScrolling();
    this._scrollToBounds();
  },
  _disposeHandler: function () {
    this._stopScrolling();
    this._$scrollbar.remove();
  },
  _updateHandler: function () {
    this._update();
    this._moveToBounds();
  },
  _update: function () {
    var e = this;
    this._stopScrolling();
    return (0, _.deferUpdate)(function () {
      e._resetScaleRatio();
      e._updateLocation();
      e._updateBounds();
      e._updateScrollbar();
      (0, _.deferRender)(function () {
        e._moveScrollbar();
        e._scrollbar.update();
      });
    });
  },
  _resetScaleRatio: function () {
    this._scaleRatio = null;
  },
  _updateLocation: function () {
    this._location = ((0, f.locate)(this._$content)[this._prop] - this._$container[this._scrollProp]()) * this._getScaleRatio();
  },
  _updateBounds: function () {
    this._maxOffset = this._getMaxOffset();
    this._minOffset = this._getMinOffset();
  },
  _getMaxOffset: function () {
    return 0;
  },
  _getMinOffset: function () {
    this._maxScrollPropValue = Math.max(this._contentSize() - this._containerSize(), 0);
    return -this._maxScrollPropValue;
  },
  _updateScrollbar: (0, _.deferUpdater)(function () {
    var e = this;
    var t = this._containerSize();
    var n = this._contentSize();
    var i = this._getBaseDimension(this._$container.get(0), this._dimension);
    var o = this._getBaseDimension(this._$content.get(0), this._dimension);
    (0, _.deferRender)(function () {
      e._scrollbar.option({
        containerSize: t,
        contentSize: n,
        baseContainerSize: i,
        baseContentSize: o,
        scaleRatio: e._getScaleRatio()
      });
    });
  }),
  _moveToBounds: (0, _.deferRenderer)((0, _.deferUpdater)((0, _.deferRenderer)(function () {
    var e = this._boundLocation();
    var t = e !== this._location;
    this._location = e;
    this._move();
    if (t) {
      this._scrollAction();
    }
  }))),
  _createActionsHandler: function (e) {
    this._scrollAction = e.scroll;
    this._bounceAction = e.bounce;
  },
  _showScrollbar: function () {
    this._scrollbar.option("visible", true);
  },
  _hideScrollbar: function () {
    this._scrollbar.option("visible", false);
  },
  _containerSize: function () {
    return this._getRealDimension(this._$container.get(0), this._dimension);
  },
  _contentSize: function () {
    var e = this._$content.css("overflow" + this._axis.toUpperCase()) === "hidden";
    var t = this._getRealDimension(this._$content.get(0), this._dimension);
    if (!e) {
      var n = this._$content[0]["scroll" + (0, s.titleize)(this._dimension)] * this._getScaleRatio();
      t = Math.max(n, t);
    }
    return t;
  },
  _validateEvent: function (e) {
    var t = (0, o.default)(e.originalEvent.target);
    return this._isThumb(t) || this._isScrollbar(t);
  },
  _isThumb: function (e) {
    return this._scrollByThumb && this._scrollbar.isThumb(e);
  },
  _isScrollbar: function (e) {
    return this._scrollByThumb && e && e.is(this._$scrollbar);
  },
  _reachedMin: function () {
    return Math.round(this._location - this._minOffset) <= 0;
  },
  _reachedMax: function () {
    return Math.round(this._location - this._maxOffset) >= 0;
  },
  _cursorEnterHandler: function () {
    this._resetScaleRatio();
    this._updateScrollbar();
    this._scrollbar.cursorEnter();
  },
  _cursorLeaveHandler: function () {
    this._scrollbar.cursorLeave();
  },
  dispose: _.noop
});
exports.Scroller = F;
var H = p.default.inherit({
  ctor: function (e) {
    this._init(e);
  },
  _init: function (e) {
    this._component = e;
    this._$element = e.$element();
    this._$container = (0, o.default)(e.container());
    this._$wrapper = e._$wrapper;
    this._$content = e.$content();
    this.option = e.option.bind(e);
    this._createActionByOption = e._createActionByOption.bind(e);
    this._isLocked = e._isLocked.bind(e);
    this._isDirection = e._isDirection.bind(e);
    this._allowedDirection = e._allowedDirection.bind(e);
    this._getMaxOffset = e._getMaxOffset.bind(e);
  },
  render: function () {
    this._$element.addClass("dx-scrollable-simulated");
    this._createScrollers();
    if (this.option("useKeyboard")) {
      this._$container.prop("tabIndex", 0);
    }
    this._attachKeyboardHandler();
    this._attachCursorHandlers();
  },
  _createScrollers: function () {
    this._scrollers = {};
    if (this._isDirection(C)) {
      this._createScroller(C);
    }
    if (this._isDirection("vertical")) {
      this._createScroller("vertical");
    }
    this._$element.toggleClass("dx-scrollable-scrollbars-alwaysvisible", this.option("showScrollbar") === "always");
  },
  _createScroller: function (e) {
    this._scrollers[e] = new F(this._scrollerOptions(e));
  },
  _scrollerOptions: function (e) {
    return {
      direction: e,
      $content: this._$content,
      $container: this._$container,
      $wrapper: this._$wrapper,
      $element: this._$element,
      scrollByThumb: this.option("scrollByThumb"),
      scrollbarVisible: this.option("showScrollbar"),
      bounceEnabled: this.option("bounceEnabled"),
      inertiaEnabled: this.option("inertiaEnabled"),
      isAnyThumbScrolling: this._isAnyThumbScrolling.bind(this)
    };
  },
  _applyScaleRatio: function (e) {
    for (var t in this._scrollers) {
      var n = this._getPropByDirection(t);
      if ((0, c.isDefined)(e[n])) {
        var i = this._scrollers[t];
        e[n] *= i._getScaleRatio();
      }
    }
    return e;
  },
  _isAnyThumbScrolling: function (e) {
    var t = false;
    this._eventHandler("isThumbScrolling", e).done(function (e, n) {
      t = e || n;
    });
    return t;
  },
  handleInit: function (e) {
    this._suppressDirections(e);
    this._eventForUserAction = e;
    this._eventHandler("init", e);
  },
  _suppressDirections: function (e) {
    if ((0, m.isDxMouseWheelEvent)(e.originalEvent)) {
      this._prepareDirections(true);
    } else {
      this._prepareDirections();
      this._eachScroller(function (t, n) {
        var i = (0, o.default)(e.originalEvent.target);
        var a = t._validateEvent(e) || this.option("scrollByContent") && this._isContent(i);
        this._validDirections[n] = a;
      });
    }
  },
  _isContent: function (e) {
    return !!e.closest(this._$element).length;
  },
  _prepareDirections: function (e) {
    e = e || false;
    this._validDirections = {};
    this._validDirections[C] = e;
    this._validDirections.vertical = e;
  },
  _eachScroller: function (e) {
    e = e.bind(this);
    (0, d.each)(this._scrollers, function (t, n) {
      e(n, t);
    });
  },
  handleStart: function (e) {
    this._eventForUserAction = e;
    this._eventHandler("start").done(this._startAction);
  },
  _saveActive: function () {
    w = this;
  },
  _resetActive: function () {
    if (w === this) {
      w = null;
    }
  },
  handleMove: function (e) {
    if (this._isLocked()) {
      e.cancel = true;
      this._resetActive();
      return;
    }
    this._saveActive();
    if (e.preventDefault) {
      e.preventDefault();
    }
    this._adjustDistance(e, e.delta);
    this._eventForUserAction = e;
    this._eventHandler("move", e.delta);
  },
  _adjustDistance: function (e, t) {
    t.x *= this._validDirections[C];
    t.y *= this._validDirections.vertical;
    var n = this._tryGetDevicePixelRatio();
    if (n && (0, m.isDxMouseWheelEvent)(e.originalEvent)) {
      t.x = Math.round(t.x / n * 100) / 100;
      t.y = Math.round(t.y / n * 100) / 100;
    }
  },
  _tryGetDevicePixelRatio: function () {
    if ((0, u.hasWindow)()) {
      return (0, u.getWindow)().devicePixelRatio;
    }
  },
  handleEnd: function (e) {
    this._resetActive();
    this._refreshCursorState(e.originalEvent && e.originalEvent.target);
    this._adjustDistance(e, e.velocity);
    this._eventForUserAction = e;
    return this._eventHandler("end", e.velocity).done(this._endAction);
  },
  handleCancel: function (e) {
    this._resetActive();
    this._eventForUserAction = e;
    return this._eventHandler("end", {
      x: 0,
      y: 0
    });
  },
  handleStop: function () {
    this._resetActive();
    this._eventHandler("stop");
  },
  handleScroll: function () {
    this._updateRtlConfig();
    this._scrollAction();
  },
  _attachKeyboardHandler: function () {
    r.default.off(this._$element, `.dxSimulatedScrollableKeyboard`);
    if (!this.option("disabled") && this.option("useKeyboard")) {
      r.default.on(this._$element, (0, m.addNamespace)("keydown", "dxSimulatedScrollableKeyboard"), this._keyDownHandler.bind(this));
    }
  },
  _keyDownHandler: function (e) {
    var t = this;
    clearTimeout(this._updateHandlerTimeout);
    this._updateHandlerTimeout = setTimeout(function () {
      if ((0, m.normalizeKeyName)(e) === B) {
        t._eachScroller(function (e) {
          e._updateHandler();
        });
      }
    });
    if (this._$container.is(a.default.getActiveElement(this._$container.get(0)))) {
      var n = true;
      switch ((0, m.normalizeKeyName)(e)) {
        case R:
          this._scrollByLine({
            y: 1
          });
          break;
        case P:
          this._scrollByLine({
            y: -1
          });
          break;
        case M:
          this._scrollByLine({
            x: 1
          });
          break;
        case A:
          this._scrollByLine({
            x: -1
          });
          break;
        case T:
          this._scrollByPage(1);
          break;
        case I:
          this._scrollByPage(-1);
          break;
        case O:
          this._scrollToHome();
          break;
        case E:
          this._scrollToEnd();
          break;
        default:
          n = false;
      }
      if (n) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  },
  _scrollByLine: function (e) {
    var t = this._tryGetDevicePixelRatio();
    var n = 40;
    if (t) {
      n = Math.abs(n / t * 100) / 100;
    }
    this.scrollBy({
      top: (e.y || 0) * -n,
      left: (e.x || 0) * -n
    });
  },
  _scrollByPage: function (e) {
    var t = this._wheelProp();
    var n = {};
    var o = this._dimensionByProp(t) === "width" ? i.getWidth : i.getHeight;
    n[t] = e * -o(this._$container);
    this.scrollBy(n);
  },
  _dimensionByProp: function (e) {
    if (e === "left") {
      return "width";
    } else {
      return "height";
    }
  },
  _getPropByDirection: function (e) {
    if (e === C) {
      return "left";
    } else {
      return "top";
    }
  },
  _scrollToHome: function () {
    var e = {
      [this._wheelProp()]: 0
    };
    this._component.scrollTo(e);
  },
  _scrollToEnd: function () {
    var e = this._wheelProp();
    var t = {};
    var n = this._dimensionByProp(e) === "width" ? i.getWidth : i.getHeight;
    t[e] = n(this._$content) - n(this._$container);
    this._component.scrollTo(t);
  },
  createActions: function () {
    this._startAction = this._createActionHandler("onStart");
    this._endAction = this._createActionHandler("onEnd");
    this._updateAction = this._createActionHandler("onUpdated");
    this._createScrollerActions();
  },
  _createScrollerActions: function () {
    this._scrollAction = this._createActionHandler("onScroll");
    this._bounceAction = this._createActionHandler("onBounce");
    this._eventHandler("createActions", {
      scroll: this._scrollAction,
      bounce: this._bounceAction
    });
  },
  _createActionHandler: function (e) {
    var t = arguments;
    var n = this;
    var i = this._createActionByOption(e);
    return function () {
      i((0, l.extend)(n._createActionArgs(), t));
    };
  },
  _createActionArgs: function () {
    var e = this._scrollers;
    var t = e.horizontal;
    var n = e.vertical;
    var i = this._getScrollOffset();
    this._scrollOffset = {
      top: n && i.top,
      left: t && i.left
    };
    return {
      event: this._eventForUserAction,
      scrollOffset: this._scrollOffset,
      reachedLeft: t && t._reachedMax(),
      reachedRight: t && t._reachedMin(),
      reachedTop: n && n._reachedMax(),
      reachedBottom: n && n._reachedMin()
    };
  },
  _getScrollOffset: function () {
    return {
      top: -this.location().top,
      left: -this.location().left
    };
  },
  _eventHandler: function (e) {
    var t = [].slice.call(arguments).slice(1);
    var n = (0, d.map)(this._scrollers, function (n) {
      return n["_" + e + "Handler"].apply(n, t);
    });
    return y.when.apply(o.default, n).promise();
  },
  location: function () {
    var e = (0, f.locate)(this._$content);
    e.top -= this._$container.scrollTop();
    e.left -= this._$container.scrollLeft();
    return e;
  },
  disabledChanged: function () {
    this._attachCursorHandlers();
  },
  _attachCursorHandlers: function () {
    r.default.off(this._$element, `.dxSimulatedScrollableCursor`);
    if (!this.option("disabled") && this._isHoverMode()) {
      r.default.on(this._$element, (0, m.addNamespace)("mouseenter", "dxSimulatedScrollableCursor"), this._cursorEnterHandler.bind(this));
      r.default.on(this._$element, (0, m.addNamespace)("mouseleave", "dxSimulatedScrollableCursor"), this._cursorLeaveHandler.bind(this));
    }
  },
  _isHoverMode: function () {
    return this.option("showScrollbar") === "onHover";
  },
  _cursorEnterHandler: function (e) {
    (e = e || {}).originalEvent = e.originalEvent || {};
    if (!w && !e.originalEvent._hoverHandled) {
      if (x) {
        x._cursorLeaveHandler();
      }
      x = this;
      this._eventHandler("cursorEnter");
      e.originalEvent._hoverHandled = true;
    }
  },
  _cursorLeaveHandler: function (e) {
    if (x === this && w !== x) {
      this._eventHandler("cursorLeave");
      x = null;
      this._refreshCursorState(e && e.relatedTarget);
    }
  },
  _refreshCursorState: function (e) {
    if (this._isHoverMode() || e && !w) {
      var t = (0, o.default)(e).closest(`.dx-scrollable-simulated:not(.dx-state-disabled)`);
      var n = t.length && t.data("dxScrollableStrategy");
      if (x && x !== n) {
        x._cursorLeaveHandler();
      }
      if (n) {
        n._cursorEnterHandler();
      }
    }
  },
  update: function () {
    var e = this;
    var t = this._eventHandler("update").done(this._updateAction);
    return (0, y.when)(t, (0, _.deferUpdate)(function () {
      var t = e._allowedDirections();
      (0, _.deferRender)(function () {
        var n = t.vertical ? "pan-x" : "";
        n = t.horizontal ? "pan-y" : n;
        n = t.vertical && t.horizontal ? "none" : n;
        e._$container.css("touchAction", n);
      });
      return (0, y.when)().promise();
    }));
  },
  _allowedDirections: function () {
    var e = this.option("bounceEnabled");
    var t = this._scrollers.vertical;
    var n = this._scrollers[C];
    return {
      vertical: t && (t._minOffset < 0 || e),
      horizontal: n && (n._minOffset < 0 || e)
    };
  },
  _updateBounds: function () {
    if (this._scrollers[C]) {
      this._scrollers[C]._updateBounds();
    }
  },
  _isHorizontalAndRtlEnabled: function () {
    return this.option("rtlEnabled") && this.option("direction") !== "vertical";
  },
  updateRtlPosition: function (e) {
    if (e) {
      this._rtlConfig = {
        scrollRight: 0,
        clientWidth: this._$container.get(0).clientWidth,
        windowPixelRatio: this._getWindowDevicePixelRatio()
      };
    }
    this._updateBounds();
    if (this._isHorizontalAndRtlEnabled()) {
      var t = this._getMaxOffset().left - this._rtlConfig.scrollRight;
      if (t <= 0) {
        t = 0;
        this._rtlConfig.scrollRight = this._getMaxOffset().left;
      }
      if (this._getScrollOffset().left !== t) {
        this._rtlConfig.skipUpdating = true;
        this._component.scrollTo({
          left: t
        });
        this._rtlConfig.skipUpdating = false;
      }
    }
  },
  _updateRtlConfig: function () {
    if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
      var e = this._$container.get(0);
      var t = e.clientWidth;
      var n = e.scrollLeft;
      var i = this._getWindowDevicePixelRatio();
      if (this._rtlConfig.windowPixelRatio === i && this._rtlConfig.clientWidth === t) {
        this._rtlConfig.scrollRight = this._getMaxOffset().left - n;
      }
      this._rtlConfig.clientWidth = t;
      this._rtlConfig.windowPixelRatio = i;
    }
  },
  _getWindowDevicePixelRatio: function () {
    if ((0, u.hasWindow)()) {
      return (0, u.getWindow)().devicePixelRatio;
    } else {
      return 1;
    }
  },
  scrollBy: function (e) {
    var t = this._scrollers.vertical;
    var n = this._scrollers[C];
    if (t) {
      e.top = t._boundLocation(e.top + t._location) - t._location;
    }
    if (n) {
      e.left = n._boundLocation(e.left + n._location) - n._location;
    }
    this._prepareDirections(true);
    this._startAction();
    this._eventHandler("scrollBy", {
      x: e.left,
      y: e.top
    });
    this._endAction();
    this._updateRtlConfig();
  },
  validate: function (e) {
    return (!(0, m.isDxMouseWheelEvent)(e) || !(0, m.isCommandKeyPressed)(e)) && !this.option("disabled") && (!!this.option("bounceEnabled") || ((0, m.isDxMouseWheelEvent)(e) ? this._validateWheel(e) : this._validateMove(e)));
  },
  _validateWheel: function (e) {
    var t = this;
    var n = this._scrollers[this._wheelDirection(e)];
    var i = n._reachedMin();
    var o = n._reachedMax();
    var a = !i || !o;
    var r = !i && !o;
    var s = i && e.delta > 0;
    var l = o && e.delta < 0;
    var u = a && (r || s || l);
    if (u = u || this._validateWheelTimer !== undefined) {
      clearTimeout(this._validateWheelTimer);
      this._validateWheelTimer = setTimeout(function () {
        t._validateWheelTimer = undefined;
      }, 500);
    }
    return u;
  },
  _validateMove: function (e) {
    return (!!this.option("scrollByContent") || !!(0, o.default)(e.target).closest(`.dx-scrollable-scrollbar`).length) && this._allowedDirection();
  },
  getDirection: function (e) {
    if ((0, m.isDxMouseWheelEvent)(e)) {
      return this._wheelDirection(e);
    } else {
      return this._allowedDirection();
    }
  },
  _wheelProp: function () {
    if (this._wheelDirection() === C) {
      return "left";
    } else {
      return "top";
    }
  },
  _wheelDirection: function (e) {
    switch (this.option("direction")) {
      case C:
        return C;
      case "vertical":
        return "vertical";
      default:
        if (e && e.shiftKey) {
          return C;
        } else {
          return "vertical";
        }
    }
  },
  dispose: function () {
    this._resetActive();
    if (x === this) {
      x = null;
    }
    this._eventHandler("dispose");
    this._detachEventHandlers();
    this._$element.removeClass("dx-scrollable-simulated");
    this._eventForUserAction = null;
    clearTimeout(this._validateWheelTimer);
    clearTimeout(this._updateHandlerTimeout);
  },
  _detachEventHandlers: function () {
    r.default.off(this._$element, `.dxSimulatedScrollableCursor`);
    r.default.off(this._$container, `.dxSimulatedScrollableKeyboard`);
  }
});
exports.SimulatedStrategy = H;