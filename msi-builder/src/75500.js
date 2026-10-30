Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = g(require("./87209.js"));
var o = require("./31648.js");
var a = g(require("./99393.js"));
var r = require("./6415.js");
var s = g(require("./68374.js"));
var l = require("./62754.js");
var u = require("./13306.js");
var d = require("./37518.js");
var c = require("./58664.js");
var h = require("./58201.js");
var f = g(require("./55994.js"));
var p = g(require("./86988.js"));
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
var v = (0, h.getWindow)();
function y(e) {
  return (0, s.default)(e).is(":visible");
}
function b(e, t) {
  if (e) {
    var a = t.to?.left || 0;
    var r = t.to?.top || 0;
    e.style.transform = `translate(${a}px,${r}px)`;
    e.style.transition = i.default.off ? "" : `transform ${t.duration}ms ${t.easing}`;
  }
}
var x = p.default.inherit({
  _init: function () {
    this.callBase();
    this._sourceScrollHandler = this._handleSourceScroll.bind(this);
    this._sourceScrollableInfo = null;
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      clone: true,
      filter: "> *",
      itemOrientation: "vertical",
      dropFeedbackMode: "push",
      allowDropInsideItem: false,
      allowReordering: true,
      moveItemOnDrop: false,
      onDragChange: null,
      onAdd: null,
      onRemove: null,
      onReorder: null,
      onPlaceholderPrepared: null,
      animation: {
        type: "slide",
        duration: 300,
        easing: "ease"
      },
      fromIndex: null,
      toIndex: null,
      dropInsideItem: false,
      itemPoints: null,
      fromIndexOffset: 0,
      offset: 0,
      autoUpdate: false,
      draggableElementSize: 0
    });
  },
  reset: function () {
    this.option({
      dropInsideItem: false,
      toIndex: null,
      fromIndex: null,
      itemPoints: null,
      fromIndexOffset: 0,
      draggableElementSize: 0
    });
    if (this._$placeholderElement) {
      this._$placeholderElement.remove();
    }
    this._$placeholderElement = null;
    if (!this._isIndicateMode() && this._$modifiedItem) {
      this._$modifiedItem.css("marginBottom", this._modifiedItemMargin);
      this._$modifiedItem = null;
    }
  },
  _getPrevVisibleItem: function (e, t) {
    return e.slice(0, t).reverse().filter(y)[0];
  },
  _dragStartHandler: function (e) {
    this.callBase.apply(this, arguments);
    if (e.cancel !== true) {
      var t = this._getSourceElement();
      this._updateItemPoints();
      this._subscribeToSourceScroll(e);
      this.option("fromIndex", this._getElementIndex(t));
      this.option("fromIndexOffset", this.option("offset"));
    }
  },
  _subscribeToSourceScroll: function (e) {
    var t = this._getScrollable((0, s.default)(e.target));
    if (t) {
      this._sourceScrollableInfo = {
        element: t,
        scrollLeft: t.scrollLeft(),
        scrollTop: t.scrollTop()
      };
      f.default.off(t, "scroll", this._sourceScrollHandler);
      f.default.on(t, "scroll", this._sourceScrollHandler);
    }
  },
  _unsubscribeFromSourceScroll: function () {
    if (this._sourceScrollableInfo) {
      f.default.off(this._sourceScrollableInfo.element, "scroll", this._sourceScrollHandler);
      this._sourceScrollableInfo = null;
    }
  },
  _handleSourceScroll: function (e) {
    var t = this;
    var n = this._sourceScrollableInfo;
    if (n) {
      ["scrollLeft", "scrollTop"].forEach(function (i) {
        if (e.target[i] !== n[i]) {
          var o = e.target[i] - n[i];
          t._correctItemPoints(o);
          t._movePlaceholder();
          n[i] = e.target[i];
        }
      });
    }
  },
  _dragEnterHandler: function (e) {
    this.callBase.apply(this, arguments);
    if (this !== this._getSourceDraggable() && (this._subscribeToSourceScroll(e), this._updateItemPoints(), this.option("fromIndex", -1), !this._isIndicateMode())) {
      var t = this.option("itemPoints");
      var n = t[t.length - 1];
      if (n) {
        var i = this.$element();
        var o = this._getSourceElement();
        var a = this._isVerticalOrientation();
        var r = a ? (0, c.getOuterHeight)(o, true) : (0, c.getOuterWidth)(o, true);
        var l = i.get(0)[a ? "scrollHeight" : "scrollWidth"];
        var u = i.get(0)[a ? "scrollTop" : "scrollLeft"];
        var d = a ? "top" : "left";
        var h = n[d];
        var f = i.offset()[d];
        var p = f + l - u - h;
        if (p < r && a) {
          var g = this._getItems();
          var m = (0, s.default)(this._getPrevVisibleItem(g));
          this._$modifiedItem = m;
          this._modifiedItemMargin = m.get(0).style.marginBottom;
          m.css("marginBottom", r - p);
          var _ = m.closest(".dx-sortable");
          var v = _.data("dxScrollable") || _.data("dxScrollView");
          if (v) {
            v.update();
          }
        }
      }
    }
  },
  _dragLeaveHandler: function () {
    this.callBase.apply(this, arguments);
    if (this !== this._getSourceDraggable()) {
      this._unsubscribeFromSourceScroll();
    }
  },
  dragEnter: function () {
    if (this !== this._getTargetDraggable()) {
      this.option("toIndex", -1);
    }
  },
  dragLeave: function () {
    if (this !== this._getTargetDraggable()) {
      this.option("toIndex", this.option("fromIndex"));
    }
  },
  _allowDrop: function (e) {
    var t = this._getTargetDraggable().$element();
    var n = this._getScrollable(t);
    if (n) {
      var i = function (e) {
        var t = e.offset();
        var n = e[0].style;
        var i = parseFloat(n.paddingLeft) || 0;
        var o = parseFloat(n.paddingRight) || 0;
        var a = parseFloat(n.paddingTop) || 0;
        var r = e[0].clientWidth - (i + o);
        var s = (0, c.getHeight)(e);
        var l = t.left + i;
        var u = t.top + a;
        return {
          left: l,
          right: l + r,
          top: u,
          bottom: u + s
        };
      }(n);
      var o = i.left;
      var a = i.right;
      var r = i.top;
      var s = i.bottom;
      var l = this.option("toIndex");
      var u = this.option("itemPoints");
      var d = u == null ? undefined : u.filter(function (e) {
        return e.index === l;
      })[0];
      if (d && d.top !== undefined) {
        if (this._isVerticalOrientation()) {
          return r <= Math.ceil(d.top) && Math.floor(d.top) <= s;
        } else {
          return o <= Math.ceil(d.left) && Math.floor(d.left) <= a;
        }
      }
    }
    return true;
  },
  dragEnd: function (e) {
    this._unsubscribeFromSourceScroll();
    var t;
    var n;
    var i = this._getSourceElement();
    var a = this._getSourceDraggable();
    var r = a.NAME !== this.NAME;
    var s = this.option("toIndex");
    var u = e.event;
    var d = this._allowDrop(u);
    if (s !== null && s >= 0 && d && (a !== this && ((t = this._fireAddEvent(u)) || (n = this._fireRemoveEvent(u))), r && (0, o.resetPosition)(i), this.option("moveItemOnDrop") && !t && this._moveItem(i, s, n), a === this)) {
      return this._fireReorderEvent(u);
    }
    return (0, l.Deferred)().resolve();
  },
  dragMove: function (e) {
    var t = this.option("itemPoints");
    if (t) {
      var n;
      var i = this._isVerticalOrientation();
      var o = i ? "top" : "left";
      var a = i ? e.pageY : e.pageX;
      var r = this.option("rtlEnabled");
      for (var s = t.length - 1; s >= 0; s--) {
        var l = t[s + 1] && (t[s][o] + t[s + 1][o]) / 2;
        if (!(!i && r ? a > l : l > a) && l !== undefined) {
          break;
        }
        n = t[s];
      }
      if (n) {
        this._updatePlaceholderPosition(e, n);
        if (this._verticalScrollHelper.isScrolling() && this._isIndicateMode()) {
          this._movePlaceholder();
        }
      }
    }
  },
  _isIndicateMode: function () {
    return this.option("dropFeedbackMode") === "indicate" || this.option("allowDropInsideItem");
  },
  _createPlaceholder: function () {
    var e;
    if (this._isIndicateMode()) {
      e = (0, s.default)("<div>").addClass(this._addWidgetPrefix("placeholder")).insertBefore(this._getSourceDraggable()._$dragElement);
    }
    this._$placeholderElement = e;
    return e;
  },
  _getItems: function () {
    var e = this._getItemsSelector();
    return this._$content().find(e).not(`.${this._addWidgetPrefix("placeholder")}`).not(`.${this._addWidgetPrefix("clone")}`).toArray();
  },
  _allowReordering: function () {
    return this._getSourceDraggable() !== this._getTargetDraggable() || this.option("allowReordering");
  },
  _isValidPoint: function (e, t, n) {
    var i = this.option("allowDropInsideItem");
    return (!!n || !!this._allowReordering() || e === 0 && !!i) && (!this._isIndicateMode() || t === -1 || e !== t && (n || e !== t + 1));
  },
  _getItemPoints: function () {
    var e;
    var t;
    var n;
    var i = [];
    var o = this.option("rtlEnabled");
    var a = this._isVerticalOrientation();
    var r = this._getItems();
    var l = r.filter(y);
    var d = l.length;
    var h = this._getDraggableElement();
    var f = l.indexOf(h.get(0));
    if (d) {
      for (var p = 0; p <= d; p++) {
        var g = !a && o ^ p === d;
        var m = a && p === d;
        if (p < d) {
          t = (e = (0, s.default)(l[p])).offset();
          n = (0, c.getOuterWidth)(e);
        }
        i.push({
          dropInsideItem: false,
          left: t.left + (g ? n : 0),
          top: t.top + (m ? i[p - 1].height : 0),
          index: p === d ? r.length : r.indexOf(e.get(0)),
          $item: e,
          width: (0, c.getOuterWidth)(e),
          height: (0, c.getOuterHeight)(e),
          isValid: this._isValidPoint(p, f)
        });
      }
      if (this.option("allowDropInsideItem")) {
        var _ = i;
        i = [];
        for (var v = 0; v < _.length; v++) {
          i.push(_[v]);
          if (_[v + 1]) {
            i.push((0, u.extend)({}, _[v], {
              dropInsideItem: true,
              top: Math.floor((_[v].top + _[v + 1].top) / 2),
              left: Math.floor((_[v].left + _[v + 1].left) / 2),
              isValid: this._isValidPoint(v, f, true)
            }));
          }
        }
      }
    } else {
      i.push({
        dropInsideItem: false,
        index: 0,
        isValid: true
      });
    }
    return i;
  },
  _updateItemPoints: function (e) {
    if (e || this.option("autoUpdate") || !this.option("itemPoints")) {
      this.option("itemPoints", this._getItemPoints());
    }
  },
  _correctItemPoints: function (e) {
    var t = this.option("itemPoints");
    if (e && t && !this.option("autoUpdate")) {
      var n = this._isVerticalOrientation() ? "top" : "left";
      t.forEach(function (t) {
        t[n] -= e;
      });
    }
  },
  _getElementIndex: function (e) {
    return this._getItems().indexOf(e.get(0));
  },
  _getDragTemplateArgs: function (e) {
    var t = this.callBase.apply(this, arguments);
    t.model.fromIndex = this._getElementIndex(e);
    return t;
  },
  _togglePlaceholder: function (e) {
    if (this._$placeholderElement) {
      this._$placeholderElement.toggle(e);
    }
  },
  _isVerticalOrientation: function () {
    return this.option("itemOrientation") === "vertical";
  },
  _normalizeToIndex: function (e, t) {
    var n = this._getSourceDraggable() !== this._getTargetDraggable();
    var i = this._getActualFromIndex();
    if (e === null) {
      return i;
    } else {
      return Math.max(n || i >= e || t ? e : e - 1, 0);
    }
  },
  _updatePlaceholderPosition: function (e, t) {
    var n = this._getSourceDraggable();
    var i = this._normalizeToIndex(t.index, t.dropInsideItem);
    var o = (0, u.extend)(this._getEventArgs(e), {
      toIndex: i,
      dropInsideItem: t.dropInsideItem
    });
    if (t.isValid) {
      this._getAction("onDragChange")(o);
    }
    if (!o.cancel && t.isValid) {
      this.option({
        dropInsideItem: t.dropInsideItem,
        toIndex: t.index
      });
      this._getAction("onPlaceholderPrepared")((0, u.extend)(this._getEventArgs(e), {
        placeholderElement: (0, r.getPublicElement)(this._$placeholderElement),
        dragElement: (0, r.getPublicElement)(n._$dragElement)
      }));
      this._updateItemPoints();
    } else if (!t.isValid) {
      this.option({
        dropInsideItem: false,
        toIndex: null
      });
    }
  },
  _makeWidthCorrection: function (e, t) {
    this._$scrollable = this._getScrollable(e);
    if (this._$scrollable) {
      var n = (0, c.getWidth)(this._$scrollable);
      var i = this._$scrollable.offset().left - e.offset().left;
      var o = (0, c.getOuterWidth)(e) - i - n;
      if (i > 0) {
        t -= i;
      }
      if (o > 0) {
        t -= o;
      }
    }
    return t;
  },
  _updatePlaceholderSizes: function (e, t) {
    var n = this.option("dropInsideItem");
    var i = (0, s.default)(t);
    var o = this._isVerticalOrientation();
    var a = "";
    var r = "";
    e.toggleClass(this._addWidgetPrefix("placeholder-inside"), n);
    if (o || n) {
      a = (0, c.getOuterWidth)(i);
    }
    if (!o || !!n) {
      r = (0, c.getOuterHeight)(i);
    }
    a = this._makeWidthCorrection(i, a);
    e.css({
      width: a,
      height: r
    });
  },
  _moveItem: function (e, t, n) {
    var i;
    var o = this._getItems();
    var a = o[t];
    var r = this._getSourceDraggable();
    if (n) {
      e = e.clone();
      r._toggleDragSourceClass(false, e);
    }
    if (!a) {
      i = o[t - 1];
    }
    this._moveItemCore(e, a, i);
  },
  _moveItemCore: function (e, t, n) {
    if (t || n) {
      if (n) {
        e.insertAfter((0, s.default)(n));
      } else {
        e.insertBefore((0, s.default)(t));
      }
    } else {
      e.appendTo(this.$element());
    }
  },
  _getDragStartArgs: function (e, t) {
    return (0, u.extend)(this.callBase.apply(this, arguments), {
      fromIndex: this._getElementIndex(t)
    });
  },
  _getEventArgs: function (e) {
    var t = this._getSourceDraggable();
    var n = this._getTargetDraggable();
    var i = n.option("dropInsideItem");
    return (0, u.extend)(this.callBase.apply(this, arguments), {
      fromIndex: t.option("fromIndex"),
      toIndex: this._normalizeToIndex(n.option("toIndex"), i),
      dropInsideItem: i
    });
  },
  _optionChanged: function (e) {
    var t = this;
    var n = e.name;
    switch (n) {
      case "onDragChange":
      case "onPlaceholderPrepared":
      case "onAdd":
      case "onRemove":
      case "onReorder":
        this[`_${n}Action`] = this._createActionByOption(n);
        break;
      case "itemOrientation":
      case "allowDropInsideItem":
      case "moveItemOnDrop":
      case "dropFeedbackMode":
      case "itemPoints":
      case "animation":
      case "allowReordering":
      case "fromIndexOffset":
      case "offset":
      case "draggableElementSize":
      case "autoUpdate":
        break;
      case "fromIndex":
        [false, true].forEach(function (n) {
          var i = n ? e.value : e.previousValue;
          if (i !== null) {
            var o = (0, s.default)(t._getItems()[i]);
            t._toggleDragSourceClass(n, o);
          }
        });
        break;
      case "dropInsideItem":
        this._optionChangedDropInsideItem(e);
        break;
      case "toIndex":
        this._optionChangedToIndex(e);
        break;
      default:
        this.callBase(e);
    }
  },
  _optionChangedDropInsideItem: function () {
    if (this._isIndicateMode() && this._$placeholderElement) {
      this._movePlaceholder();
    }
  },
  _isPositionVisible: function (e) {
    var t;
    var n = this.$element();
    if (n.css("overflow") !== "hidden") {
      t = n.get(0);
    } else {
      n.parents().each(function () {
        if ((0, s.default)(this).css("overflow") !== "visible") {
          t = this;
          return false;
        }
      });
    }
    if (t) {
      var i = (0, d.getBoundingRect)(t);
      var o = this._isVerticalOrientation();
      var a = o ? "top" : "left";
      var r = o ? "bottom" : "right";
      var l = o ? v.pageYOffset : v.pageXOffset;
      if (e[a] < i[a] + l || e[a] > i[r] + l) {
        return false;
      }
    }
    return true;
  },
  _optionChangedToIndex: function (e) {
    var t = e.value;
    if (this._isIndicateMode()) {
      var n = t !== null && t >= 0;
      this._togglePlaceholder(n);
      if (n) {
        this._movePlaceholder();
      }
    } else {
      this._moveItems(e.previousValue, e.value, e.fullUpdate);
    }
  },
  update: function () {
    if (this.option("fromIndex") !== null || this.option("toIndex") !== null) {
      this._updateItemPoints(true);
      this._updateDragSourceClass();
      var e = this.option("toIndex");
      this._optionChangedToIndex({
        value: e,
        fullUpdate: true
      });
    }
  },
  _updateDragSourceClass: function () {
    var e = this._getActualFromIndex();
    var t = (0, s.default)(this._getItems()[e]);
    if (t.length) {
      this._$sourceElement = t;
      this._toggleDragSourceClass(true, t);
    }
  },
  _makeLeftCorrection: function (e) {
    var t = this._$scrollable;
    if (t && this._isVerticalOrientation()) {
      var n = t.offset().left - e;
      if (n > 0) {
        e += n;
      }
    }
    return e;
  },
  _movePlaceholder: function () {
    var e = this._$placeholderElement || this._createPlaceholder();
    if (e) {
      var t = this._getItems();
      var n = this.option("toIndex");
      var i = this._isVerticalOrientation();
      var o = this.option("rtlEnabled");
      var a = this.option("dropInsideItem");
      var r = null;
      var l = t[n];
      if (l) {
        var u = (0, s.default)(l);
        r = u.offset();
        if (!i && !!o && !a) {
          r.left += (0, c.getOuterWidth)(u, true);
        }
      } else {
        var d = l = this._getPrevVisibleItem(t, n);
        if (d) {
          r = (0, s.default)(d).offset();
          if (i) {
            r.top += (0, c.getOuterHeight)(d, true);
          } else if (!o) {
            r.left += (0, c.getOuterWidth)(d, true);
          }
        }
      }
      this._updatePlaceholderSizes(e, l);
      if (r && !this._isPositionVisible(r)) {
        r = null;
      }
      if (r) {
        var h = i && n === t.length;
        var f = (0, c.getOuterHeight)(e);
        r.left = this._makeLeftCorrection(r.left);
        r.top = h && r.top >= f ? r.top - f : r.top;
        this._move(r, e);
      }
      e.toggle(!!r);
    }
  },
  _getPositions: function (e, t, n, i) {
    var o = [];
    for (var a = 0; a < e.length; a++) {
      var r = 0;
      if (i !== null && n !== null) {
        if (n === -1) {
          if (a >= i) {
            r = t;
          }
        } else if (i === -1) {
          if (a > n) {
            r = -t;
          }
        } else if (n < i) {
          if (a > n && a < i) {
            r = -t;
          }
        } else if (n > i && a >= i && a < n) {
          r = t;
        }
        o.push(r);
      } else {
        o.push(r);
      }
    }
    return o;
  },
  _getDraggableElementSize: function (e) {
    var t = this._getDraggableElement();
    var n = this.option("draggableElementSize");
    if (!n) {
      n = e ? ((0, c.getOuterHeight)(t) + (0, c.getOuterHeight)(t, true)) / 2 : ((0, c.getOuterWidth)(t) + (0, c.getOuterWidth)(t, true)) / 2;
      if (!this.option("autoUpdate")) {
        this.option("draggableElementSize", n);
      }
    }
    return n;
  },
  _getActualFromIndex: function () {
    var e = this.option();
    var t = e.fromIndex;
    var n = e.fromIndexOffset;
    var i = e.offset;
    if (t == null) {
      return null;
    } else {
      return t + n - i;
    }
  },
  _moveItems: function (e, t, n) {
    var i;
    var o = this._getActualFromIndex();
    var a = this._isVerticalOrientation();
    var r = a ? "top" : "left";
    var s = this._getDraggableElementSize(a);
    for (var l = this._getItems(), d = this._getPositions(l, s, o, e), c = this._getPositions(l, s, o, t), h = this.option("animation"), f = this.option("rtlEnabled"), p = 0; p < l.length; p++) {
      var g = l[p];
      var m = d[p];
      var v = c[p];
      if (t === null || o === null) {
        if (i = g) {
          i.style.transform = "";
          i.style.transition = "";
        }
      } else if (m !== v || n && v) {
        b(g, (0, u.extend)({}, h, {
          to: _({}, r, !a && f ? -v : v)
        }));
      }
    }
  },
  _toggleDragSourceClass: function (e, t) {
    var n = t || this._$sourceElement;
    this.callBase.apply(this, arguments);
    if (!this._isIndicateMode()) {
      if (n) {
        n.toggleClass(this._addWidgetPrefix("source-hidden"), e);
      }
    }
  },
  _dispose: function () {
    this.reset();
    this.callBase();
  },
  _fireAddEvent: function (e) {
    var t = this._getEventArgs(e);
    this._getAction("onAdd")(t);
    return t.cancel;
  },
  _fireRemoveEvent: function (e) {
    var t = this._getSourceDraggable();
    var n = this._getEventArgs(e);
    t._getAction("onRemove")(n);
    return n.cancel;
  },
  _fireReorderEvent: function (e) {
    var t = this._getEventArgs(e);
    this._getAction("onReorder")(t);
    return t.promise || (0, l.Deferred)().resolve();
  }
});
(0, a.default)("dxSortable", x);
var w = x;
exports.default = w;