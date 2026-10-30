Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = D(require("./49387.js"));
var o = require("./31648.js");
var a = D(require("./99393.js"));
var r = D(require("./73349.js"));
var s = D(require("./13046.js"));
var l = require("./6415.js");
var u = D(require("./68374.js"));
var d = require("./10688.js");
var c = require("./20576.js");
var h = require("./62754.js");
var f = require("./13306.js");
var p = require("./78008.js");
var g = require("./37518.js");
var m = require("./58664.js");
var _ = require("./68752.js");
var v = require("./35922.js");
var y = require("./77695.js");
var b = require("./58201.js");
var x = D(require("./55994.js"));
var w = require("./23174.js");
var C = D(require("./93786.js"));
var S = require("./39611.js");
var k = D(require("./6866.js"));
function D(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function I() {
  return (I = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function T(e) {
  return (T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function E(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (T(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (T(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (T(t) === "symbol") {
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
var O;
var A;
var P = (0, b.getWindow)();
var M = "dxDraggable";
var R = (0, S.addNamespace)(w.start, M);
var B = (0, S.addNamespace)(w.move, M);
var L = (0, S.addNamespace)(w.end, M);
var V = (0, S.addNamespace)(w.enter, M);
var F = (0, S.addNamespace)(w.leave, M);
var H = (0, S.addNamespace)(C.default.down, M);
var N = (0, S.addNamespace)("keydown", M);
function z(e) {
  return {
    x: e.pageX - (0, u.default)(P).scrollLeft(),
    y: e.pageY - (0, u.default)(P).scrollTop()
  };
}
var j = function () {
  function e(e, t) {
    this._$scrollableAtPointer = null;
    this._preventScroll = true;
    this._component = t;
    if (e === "vertical") {
      this._scrollValue = "scrollTop";
      this._overFlowAttr = "overflowY";
      this._sizeAttr = "height";
      this._scrollSizeProp = "scrollHeight";
      this._clientSizeProp = "clientHeight";
      this._limitProps = {
        start: "top",
        end: "bottom"
      };
    } else {
      this._scrollValue = "scrollLeft";
      this._overFlowAttr = "overflowX";
      this._sizeAttr = "width";
      this._scrollSizeProp = "scrollWidth";
      this._clientSizeProp = "clientWidth";
      this._limitProps = {
        start: "left",
        end: "right"
      };
    }
  }
  var t = e.prototype;
  t.updateScrollable = function (e, t) {
    var n = this;
    var i = false;
    e.some(function (e) {
      var o = (0, u.default)(e);
      var a = o.hasClass("dx-overlay-wrapper");
      var r = o.hasClass("dx-overlay-content");
      return !!a || !!r || (i = n._trySetScrollable(e, t));
    });
    if (!i) {
      this._$scrollableAtPointer = null;
      this._scrollSpeed = 0;
    }
  };
  t.isScrolling = function () {
    return !!this._scrollSpeed;
  };
  t.isScrollable = function (e) {
    return (e.css(this._overFlowAttr) === "auto" || e.hasClass("dx-scrollable-container")) && e.prop(this._scrollSizeProp) > Math.ceil(this._sizeAttr === "width" ? (0, m.getWidth)(e) : (0, m.getHeight)(e));
  };
  t._trySetScrollable = function (e, t) {
    var n;
    var i = (0, u.default)(e);
    var o = this._component.option("scrollSensitivity");
    var a = this.isScrollable(i);
    if (a) {
      if (o > (n = this._calculateDistanceToBorders(i, t))[this._limitProps.start]) {
        if (!this._preventScroll) {
          this._scrollSpeed = -this._calculateScrollSpeed(n[this._limitProps.start]);
          this._$scrollableAtPointer = i;
        }
      } else if (o > n[this._limitProps.end]) {
        if (!this._preventScroll) {
          this._scrollSpeed = this._calculateScrollSpeed(n[this._limitProps.end]);
          this._$scrollableAtPointer = i;
        }
      } else {
        a = false;
        this._preventScroll = false;
      }
    }
    return a;
  };
  t._calculateDistanceToBorders = function (e, t) {
    var n;
    var i = e.get(0);
    if (i) {
      n = (0, g.getBoundingRect)(i);
      return {
        left: t.x - n.left,
        top: t.y - n.top,
        right: n.right - t.x,
        bottom: n.bottom - t.y
      };
    } else {
      return {};
    }
  };
  t._calculateScrollSpeed = function (e) {
    var t = this._component;
    var n = t.option("scrollSensitivity");
    var i = t.option("scrollSpeed");
    return Math.ceil(Math.pow((n - e) / n, 2) * i);
  };
  t.scrollByStep = function () {
    if (this._$scrollableAtPointer && this._scrollSpeed) {
      if (this._$scrollableAtPointer.hasClass("dx-scrollable-container")) {
        var e = this._$scrollableAtPointer.closest(".dx-scrollable");
        var t = e.data("dxScrollable") || e.data("dxScrollView");
        if (t) {
          var n = t.scrollOffset()[this._limitProps.start] + this._scrollSpeed;
          t.scrollTo(E({}, this._limitProps.start, n));
        }
      } else {
        var i = this._$scrollableAtPointer[this._scrollValue]() + this._scrollSpeed;
        this._$scrollableAtPointer[this._scrollValue](i);
      }
      var o = this._component._dragMoveArgs;
      if (o) {
        this._component._dragMoveHandler(o);
      }
    }
  };
  t.reset = function () {
    this._$scrollableAtPointer = null;
    this._scrollSpeed = 0;
    this._preventScroll = true;
  };
  t.isOutsideScrollable = function (e, t) {
    if (!e) {
      return false;
    }
    var n = (0, g.getBoundingRect)(e.get(0));
    var i = n[this._limitProps.start];
    var o = n[this._sizeAttr];
    var a = z(t);
    var r = this._sizeAttr === "width" ? a.x : a.y;
    return r < i || r > i + o;
  };
  return e;
}();
var W = k.default.inherit({
  ctor: function (e) {
    this.callBase();
    this._strategy = e;
  },
  _step: function () {
    var e = this._strategy._horizontalScrollHelper;
    var t = this._strategy._verticalScrollHelper;
    if (e) {
      e.scrollByStep();
    }
    if (t) {
      t.scrollByStep();
    }
  }
});
var G = s.default.inherit({
  reset: c.noop,
  dragMove: c.noop,
  dragEnter: c.noop,
  dragLeave: c.noop,
  dragEnd: function (e) {
    this._getSourceDraggable()._fireRemoveEvent(e);
    return (0, h.Deferred)().resolve();
  },
  _fireRemoveEvent: c.noop,
  _getDefaultOptions: function () {
    return (0, f.extend)(this.callBase(), {
      onDragStart: null,
      onDragMove: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragLeave: null,
      onDragCancel: null,
      onCancelByEsc: false,
      onDrop: null,
      immediate: true,
      dragDirection: "both",
      boundary: undefined,
      boundOffset: 0,
      allowMoveByClick: false,
      itemData: null,
      container: undefined,
      dragTemplate: undefined,
      contentTemplate: "content",
      handle: "",
      filter: "",
      clone: false,
      autoScroll: true,
      scrollSpeed: 30,
      scrollSensitivity: 60,
      group: undefined,
      data: undefined
    });
  },
  _setOptionsByReference: function () {
    this.callBase.apply(this, arguments);
    (0, f.extend)(this._optionsByReference, {
      component: true,
      group: true,
      itemData: true,
      data: true
    });
  },
  _init: function () {
    this.callBase();
    this._attachEventHandlers();
    this._scrollAnimator = new W(this);
    this._horizontalScrollHelper = new j("horizontal", this);
    this._verticalScrollHelper = new j("vertical", this);
    this._initScrollTop = 0;
    this._initScrollLeft = 0;
  },
  _normalizeCursorOffset: function (e) {
    if ((0, v.isObject)(e)) {
      e = {
        h: e.x,
        v: e.y
      };
    }
    return {
      left: (e = (0, c.splitPair)(e).map(function (e) {
        return parseFloat(e);
      }))[0],
      top: e.length === 1 ? e[0] : e[1]
    };
  },
  _getNormalizedCursorOffset: function (e, t) {
    if ((0, v.isFunction)(e)) {
      e = e.call(this, t);
    }
    return this._normalizeCursorOffset(e);
  },
  _calculateElementOffset: function (e) {
    var t;
    var n;
    var i = e.event;
    var a = (0, u.default)(e.itemElement);
    var r = (0, u.default)(e.dragElement);
    var s = this._dragElementIsCloned();
    var l = this.option("cursorOffset");
    var d = {
      left: 0,
      top: 0
    };
    var c = this._initialLocate = (0, o.locate)(r);
    if (s || e.initialOffset || l) {
      t = e.initialOffset || a.offset();
      if (l) {
        d = this._getNormalizedCursorOffset(l, e);
        if (isFinite(d.left)) {
          t.left = i.pageX;
        }
        if (isFinite(d.top)) {
          t.top = i.pageY;
        }
      }
      n = r.offset();
      t.top -= n.top + (d.top || 0) - c.top;
      t.left -= n.left + (d.left || 0) - c.left;
    }
    return t;
  },
  _initPosition: function (e) {
    var t = (0, u.default)(e.dragElement);
    var n = this._calculateElementOffset(e);
    if (n) {
      this._move(n, t);
    }
    this._startPosition = (0, o.locate)(t);
  },
  _startAnimator: function () {
    if (!this._scrollAnimator.inProgress()) {
      this._scrollAnimator.start();
    }
  },
  _stopAnimator: function () {
    this._scrollAnimator.stop();
  },
  _addWidgetPrefix: function (e) {
    var t = this.NAME;
    return (0, p.dasherize)(t) + (e ? `-${e}` : "");
  },
  _getItemsSelector: function () {
    return this.option("filter") || "";
  },
  _$content: function () {
    var e = this.$element();
    var t = e.children(".dx-template-wrapper");
    if (t.length) {
      return t;
    } else {
      return e;
    }
  },
  _attachEventHandlers: function () {
    var e = this;
    if (!this.option("disabled")) {
      var t = this._$content();
      var n = this._getItemsSelector();
      var i = this.option("allowMoveByClick");
      var o = {
        direction: this.option("dragDirection"),
        immediate: this.option("immediate"),
        checkDropTarget: function (t, n) {
          var i = e.option("group");
          var o = e._getSourceDraggable().option("group");
          var a = e._getScrollable(t);
          return !e._verticalScrollHelper.isOutsideScrollable(a, n) && !e._horizontalScrollHelper.isOutsideScrollable(a, n) && o && o === i;
        }
      };
      if (i) {
        t = this._getArea();
        x.default.on(t, H, o, this._pointerDownHandler.bind(this));
      }
      if (n[0] === ">") {
        n = n.slice(1);
      }
      x.default.on(t, R, n, o, this._dragStartHandler.bind(this));
      x.default.on(t, B, o, this._dragMoveHandler.bind(this));
      x.default.on(t, L, o, this._dragEndHandler.bind(this));
      x.default.on(t, V, o, this._dragEnterHandler.bind(this));
      x.default.on(t, F, o, this._dragLeaveHandler.bind(this));
      if (this.option("onCancelByEsc")) {
        x.default.on(t, N, this._keydownHandler.bind(this));
      }
    }
  },
  _dragElementIsCloned: function () {
    return this._$dragElement && this._$dragElement.hasClass(this._addWidgetPrefix("clone"));
  },
  _getDragTemplateArgs: function (e, t) {
    return {
      container: (0, l.getPublicElement)(t),
      model: {
        itemData: this.option("itemData"),
        itemElement: (0, l.getPublicElement)(e)
      }
    };
  },
  _createDragElement: function (e) {
    var t = e;
    var n = this.option("clone");
    var i = this._getContainer();
    var o = this.option("dragTemplate");
    if (o) {
      o = this._getTemplate(o);
      t = (0, u.default)("<div>").appendTo(i);
      o.render(this._getDragTemplateArgs(e, t));
    } else if (n) {
      t = (0, u.default)("<div>").appendTo(i);
      e.clone().css({
        width: e.css("width"),
        height: e.css("height")
      }).appendTo(t);
    }
    return t.toggleClass(this._addWidgetPrefix("clone"), t.get(0) !== e.get(0)).toggleClass("dx-rtl", this.option("rtlEnabled"));
  },
  _resetDragElement: function () {
    if (this._dragElementIsCloned()) {
      this._$dragElement.remove();
    } else {
      this._toggleDraggingClass(false);
    }
    this._$dragElement = null;
  },
  _resetSourceElement: function () {
    this._toggleDragSourceClass(false);
    this._$sourceElement = null;
  },
  _detachEventHandlers: function () {
    x.default.off(this._$content(), `.${M}`);
    x.default.off(this._getArea(), `.${M}`);
  },
  _move: function (e, t) {
    (0, o.move)(t || this._$dragElement, e);
  },
  _getDraggableElement: function (e) {
    var t = this._getSourceElement();
    if (t) {
      return t;
    }
    if (this.option("allowMoveByClick")) {
      return this.$element();
    }
    var n = (0, u.default)(e && e.target);
    var i = this._getItemsSelector();
    if (i[0] === ">") {
      var o = this._$content().find(i);
      if (!o.is(n)) {
        n = n.closest(o);
      }
    }
    return n;
  },
  _getSourceElement: function () {
    return this._getSourceDraggable()._$sourceElement;
  },
  _pointerDownHandler: function (e) {
    if (!(0, S.needSkipEvent)(e)) {
      var t = {};
      var n = this.$element();
      var i = this.option("dragDirection");
      if (i === "horizontal" || i === "both") {
        t.left = e.pageX - n.offset().left + (0, o.locate)(n).left - (0, m.getWidth)(n) / 2;
      }
      if (i === "vertical" || i === "both") {
        t.top = e.pageY - n.offset().top + (0, o.locate)(n).top - (0, m.getHeight)(n) / 2;
      }
      this._move(t, n);
      this._getAction("onDragMove")(this._getEventArgs(e));
    }
  },
  _isValidElement: function (e, t) {
    var n = this.option("handle");
    var i = (0, u.default)(e.originalEvent && e.originalEvent.target);
    return (!n || !!i.closest(n).length) && !!t.length && !t.is(".dx-state-disabled, .dx-state-disabled *");
  },
  _dragStartHandler: function (e) {
    var t = this._getDraggableElement(e);
    this.dragInProgress = true;
    if (this._isValidElement(e, t)) {
      if (!this._$sourceElement) {
        var n = this._getDragStartArgs(e, t);
        this._getAction("onDragStart")(n);
        if (n.cancel) {
          e.cancel = true;
        } else {
          this.option("itemData", n.itemData);
          this._setSourceDraggable();
          this._$sourceElement = t;
          var i = t.offset();
          if (!this._hasClonedDraggable() && this.option("autoScroll")) {
            this._initScrollTop = this._getScrollableScrollTop();
            this._initScrollLeft = this._getScrollableScrollLeft();
            i = this._getDraggableElementOffset(i.left, i.top);
          }
          var o = this._$dragElement = this._createDragElement(t);
          this._toggleDraggingClass(true);
          this._toggleDragSourceClass(true);
          this._setGestureCoverCursor(o.children());
          var a = o.css("position") === "fixed";
          this._initPosition((0, f.extend)({}, n, {
            dragElement: o.get(0),
            initialOffset: a && i
          }));
          this._getAction("onDraggableElementShown")(I(I({}, n), {
            dragElement: o
          }));
          var r = this._getArea();
          var s = this._getAreaOffset(r);
          var l = this._getBoundOffset();
          var u = (0, m.getOuterWidth)(r);
          var d = (0, m.getOuterHeight)(r);
          var c = (0, m.getWidth)(o);
          var h = (0, m.getHeight)(o);
          var p = o.offset().left - s.left;
          var g = o.offset().top - s.top;
          if (r.length) {
            e.maxLeftOffset = p - l.left;
            e.maxRightOffset = u - p - c - l.right;
            e.maxTopOffset = g - l.top;
            e.maxBottomOffset = d - g - h - l.bottom;
          }
          if (this.option("autoScroll")) {
            this._startAnimator();
          }
        }
      }
    } else {
      e.cancel = true;
    }
  },
  _getAreaOffset: function (e) {
    return e && i.default.offset(e) || {
      left: 0,
      top: 0
    };
  },
  _toggleDraggingClass: function (e) {
    if (this._$dragElement) {
      this._$dragElement.toggleClass(this._addWidgetPrefix("dragging"), e);
    }
  },
  _toggleDragSourceClass: function (e, t) {
    var n = t || this._$sourceElement;
    if (n) {
      n.toggleClass(this._addWidgetPrefix("source"), e);
    }
  },
  _setGestureCoverCursor: function (e) {
    (0, u.default)(`.dx-gesture-cover`).css("cursor", e.css("cursor"));
  },
  _getBoundOffset: function () {
    var e = this.option("boundOffset");
    if ((0, v.isFunction)(e)) {
      e = e.call(this);
    }
    return (0, _.quadToObject)(e);
  },
  _getArea: function () {
    var e = this.option("boundary");
    if ((0, v.isFunction)(e)) {
      e = e.call(this);
    }
    return (0, u.default)(e);
  },
  _getContainer: function () {
    var e = this.option("container");
    if (e === undefined) {
      e = (0, y.value)();
    }
    return (0, u.default)(e);
  },
  _getDraggableElementOffset: function (e, t) {
    var r = this._initScrollTop;
    var s = this._initScrollLeft;
    var l = this._getScrollableScrollTop();
    var d = this._getScrollableScrollLeft();
    var c = (0, u.default)(this.element()).css("position") === "fixed";
    var h = {
      left: (this._startPosition?.left ?? 0) + e,
      top: (this._startPosition?.top ?? 0) + t
    };
    if (c || this._hasClonedDraggable()) {
      return h;
    } else {
      return {
        left: (0, v.isNumeric)(d) ? h.left + d - s : h.left,
        top: (0, v.isNumeric)(l) ? h.top + l - r : h.top
      };
    }
  },
  _hasClonedDraggable: function () {
    return this.option("clone") || this.option("dragTemplate");
  },
  _dragMoveHandler: function (e) {
    this._dragMoveArgs = e;
    if (this._$dragElement) {
      var t = this._getDraggableElementOffset(e.offset.x, e.offset.y);
      this._move(t);
      this._updateScrollable(e);
      var n = this._getEventArgs(e);
      this._getAction("onDragMove")(n);
      if (n.cancel !== true) {
        this._getTargetDraggable().dragMove(e, scrollBy);
      }
    } else {
      e.cancel = true;
    }
  },
  _updateScrollable: function (e) {
    if (this.option("autoScroll")) {
      var t = z(e);
      var n = r.default.elementsFromPoint(t.x, t.y, this.$element().get(0));
      this._verticalScrollHelper.updateScrollable(n, t);
      this._horizontalScrollHelper.updateScrollable(n, t);
    }
  },
  _getScrollable: function (e) {
    var t;
    var n = this;
    e.parents().toArray().some(function (e) {
      var i = (0, u.default)(e);
      return (!!n._horizontalScrollHelper.isScrollable(i) || !!n._verticalScrollHelper.isScrollable(i)) && (t = i, true);
    });
    return t;
  },
  _getScrollableScrollTop: function () {
    var e;
    return ((e = this._getScrollable((0, u.default)(this.element()))) === null || e === undefined ? undefined : e.scrollTop()) ?? 0;
  },
  _getScrollableScrollLeft: function () {
    var e;
    return ((e = this._getScrollable((0, u.default)(this.element()))) === null || e === undefined ? undefined : e.scrollLeft()) ?? 0;
  },
  _defaultActionArgs: function () {
    var e = this.callBase.apply(this, arguments);
    var t = this.option("component");
    if (t) {
      e.component = t;
      e.element = t.element();
    }
    return e;
  },
  _getEventArgs: function (e) {
    var t = this._getSourceDraggable();
    var n = this._getTargetDraggable();
    return {
      event: e,
      itemData: t.option("itemData"),
      itemElement: (0, l.getPublicElement)(t._$sourceElement),
      fromComponent: t.option("component") || t,
      toComponent: n.option("component") || n,
      fromData: t.option("data"),
      toData: n.option("data")
    };
  },
  _getDragStartArgs: function (e, t) {
    var n = this._getEventArgs(e);
    return {
      event: n.event,
      itemData: n.itemData,
      itemElement: t,
      fromData: n.fromData
    };
  },
  _revertItemToInitialPosition: function () {
    if (!this._dragElementIsCloned()) {
      this._move(this._initialLocate, this._$sourceElement);
    }
  },
  _dragEndHandler: function (e) {
    var t = this;
    var n = (0, h.Deferred)();
    var i = this._getEventArgs(e);
    var o = this._getEventArgs(e);
    var a = this._getTargetDraggable();
    var r = true;
    this.dragInProgress = false;
    try {
      this._getAction("onDragEnd")(i);
    } finally {
      (0, h.when)((0, h.fromPromise)(i.cancel)).done(function (e) {
        if (!e && (a !== t && a._getAction("onDrop")(o), !o.cancel)) {
          r = false;
          (0, h.when)((0, h.fromPromise)(a.dragEnd(i))).always(n.resolve);
          return;
        }
        n.resolve();
      }).fail(n.resolve);
      n.done(function () {
        if (r) {
          t._revertItemToInitialPosition();
        }
        t._resetDragOptions(a);
      });
    }
  },
  _isTargetOverAnotherDraggable: function (e) {
    var t = this;
    var n = this._getSourceDraggable();
    if (this === n) {
      return false;
    }
    var i = n._$dragElement;
    var o = n.$element();
    var a = this.$element();
    var s = z(e);
    var l = r.default.elementsFromPoint(s.x, s.y, this.element()).filter(function (e) {
      var n = (0, u.default)(e);
      return !!n.hasClass(t._addWidgetPrefix()) && !n.closest(i).length;
    })[0];
    var d = this._getSourceElement();
    var c = l === o.get(0);
    var h = (0, u.default)(l).closest(d).length;
    return !l || l === a.get(0) && !c && !h;
  },
  _dragEnterHandler: function (e) {
    this._fireDragEnterEvent(e);
    if (this._isTargetOverAnotherDraggable(e)) {
      this._setTargetDraggable();
    }
    this._getSourceDraggable().dragEnter(e);
  },
  _dragLeaveHandler: function (e) {
    this._fireDragLeaveEvent(e);
    this._resetTargetDraggable();
    if (this !== this._getSourceDraggable()) {
      this.reset();
    }
    this._getSourceDraggable().dragLeave(e);
  },
  _keydownHandler: function (e) {
    if (this.dragInProgress && e.key === "Escape") {
      this._keydownEscapeHandler(e);
    }
  },
  _keydownEscapeHandler: function (e) {
    if (this._getSourceElement()) {
      var t = this._getEventArgs(e);
      this._getAction("onDragCancel")(t);
      if (!t.cancel) {
        this.dragInProgress = false;
        if (A != null) {
          A._toggleDraggingClass(false);
        }
        this._detachEventHandlers();
        this._revertItemToInitialPosition();
        var n = this._getTargetDraggable();
        this._resetDragOptions(n);
        this._attachEventHandlers();
      }
    }
  },
  _getAction: function (e) {
    return this[`_${e}Action`] || this._createActionByOption(e);
  },
  _getAnonymousTemplateName: function () {
    return "content";
  },
  _initTemplates: function () {
    if (this.option("contentTemplate")) {
      this._templateManager.addDefaultTemplates({
        content: new d.EmptyTemplate()
      });
      this.callBase.apply(this, arguments);
    }
  },
  _render: function () {
    this.callBase();
    this.$element().addClass(this._addWidgetPrefix());
    var e = this._templateManager.anonymousTemplateName === this.option("contentTemplate");
    var t = this._getTemplateByOption("contentTemplate");
    if (t) {
      (0, u.default)(t.render({
        container: this.element(),
        transclude: e
      }));
    }
  },
  _optionChanged: function (e) {
    var t = e.name;
    switch (t) {
      case "onDragStart":
      case "onDragMove":
      case "onDragEnd":
      case "onDrop":
      case "onDragEnter":
      case "onDragLeave":
      case "onDragCancel":
      case "onDraggableElementShown":
        this[`_${t}Action`] = this._createActionByOption(t);
        break;
      case "dragTemplate":
      case "contentTemplate":
      case "container":
      case "clone":
        break;
      case "allowMoveByClick":
      case "dragDirection":
      case "disabled":
      case "boundary":
      case "filter":
      case "immediate":
        this._resetDragElement();
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case "onCancelByEsc":
        this._keydownHandler();
        break;
      case "autoScroll":
        this._verticalScrollHelper.reset();
        this._horizontalScrollHelper.reset();
        break;
      case "scrollSensitivity":
      case "scrollSpeed":
      case "boundOffset":
      case "handle":
      case "group":
      case "data":
      case "itemData":
        break;
      default:
        this.callBase(e);
    }
  },
  _getTargetDraggable: function () {
    return O || this;
  },
  _getSourceDraggable: function () {
    return A || this;
  },
  _setTargetDraggable: function () {
    var e = this.option("group");
    var t = this._getSourceDraggable();
    if (e && e === t.option("group")) {
      O = this;
    }
  },
  _setSourceDraggable: function () {
    A = this;
  },
  _resetSourceDraggable: function () {
    A = null;
  },
  _resetTargetDraggable: function () {
    O = null;
  },
  _resetDragOptions: function (e) {
    this.reset();
    e.reset();
    this._stopAnimator();
    this._horizontalScrollHelper.reset();
    this._verticalScrollHelper.reset();
    this._resetDragElement();
    this._resetSourceElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
  },
  _dispose: function () {
    this.callBase();
    this._detachEventHandlers();
    this._resetDragElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
    this._$sourceElement = null;
    this._stopAnimator();
  },
  _fireDragEnterEvent: function (e) {
    var t = this._getEventArgs(e);
    this._getAction("onDragEnter")(t);
  },
  _fireDragLeaveEvent: function (e) {
    var t = this._getEventArgs(e);
    this._getAction("onDragLeave")(t);
  }
});
(0, a.default)(M, G);
var q = G;
exports.default = q;