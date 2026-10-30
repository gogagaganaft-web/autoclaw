exports.default = undefined;
var i = require("./58664.js");
var o = v(require("./68374.js"));
var a = require("./31648.js");
var r = require("./22053.js");
var s = require("./60810.js");
var l = require("./13306.js");
var u = require("./20576.js");
var d = require("./80506.js");
var c = require("./6415.js");
var h = require("./35922.js");
var f = v(require("./20530.js"));
var p = v(require("./99393.js"));
var g = v(require("./69010.js"));
var m = v(require("./66894.js"));
var _ = require("./62754.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function y(e) {
  return +e;
}
var b = g.default.inherit({
  _activeStateUnit: ".dx-multiview-item",
  _supportedKeys: function () {
    return (0, l.extend)(this.callBase(), {
      pageUp: u.noop,
      pageDown: u.noop
    });
  },
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      selectedIndex: 0,
      swipeEnabled: true,
      animationEnabled: true,
      loop: false,
      deferRendering: true,
      _itemAttributes: {
        role: "tabpanel"
      },
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: "single",
      selectionRequired: true,
      selectByClick: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return f.default.real().deviceType === "desktop" && !f.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _itemClass: function () {
    return "dx-multiview-item";
  },
  _itemDataKey: function () {
    return "dxMultiViewItemData";
  },
  _itemContainer: function () {
    return this._$itemContainer;
  },
  _itemElements: function () {
    return this._itemContainer().children(this._itemSelector());
  },
  _itemWidth: function () {
    this._itemWidthValue ||= (0, i.getWidth)(this._$wrapper);
    return this._itemWidthValue;
  },
  _clearItemWidthCache: function () {
    delete this._itemWidthValue;
  },
  _itemsCount: function () {
    return this.option("items").length;
  },
  _normalizeIndex: function (e) {
    var t = this._itemsCount();
    if (e < 0) {
      e += t;
    }
    if (e >= t) {
      e -= t;
    }
    return e;
  },
  _getRTLSignCorrection: function () {
    if (this.option("rtlEnabled")) {
      return -1;
    } else {
      return 1;
    }
  },
  _init: function () {
    this.callBase.apply(this, arguments);
    var e = this.$element();
    e.addClass("dx-multiview");
    this._$wrapper = (0, o.default)("<div>").addClass("dx-multiview-wrapper");
    this._$wrapper.appendTo(e);
    this._$itemContainer = (0, o.default)("<div>").addClass("dx-multiview-item-container");
    this._$itemContainer.appendTo(this._$wrapper);
    this.option("loopItemFocus", this.option("loop"));
    this._findBoundaryIndices();
    this._initSwipeable();
  },
  _initMarkup: function () {
    this._deferredItems = [];
    this.callBase();
    var e = this._getSelectedItemIndices();
    this._updateItemsVisibility(e[0]);
  },
  _afterItemElementDeleted: function (e, t) {
    this.callBase(e, t);
    if (this._deferredItems) {
      this._deferredItems.splice(t.itemIndex, 1);
    }
  },
  _beforeItemElementInserted: function (e) {
    this.callBase.apply(this, arguments);
    if (this._deferredItems) {
      this._deferredItems.splice(e.index, 0, null);
    }
  },
  _executeItemRenderAction: function (e, t, n) {
    e = (this.option("items") || []).indexOf(t);
    this.callBase(e, t, n);
  },
  _renderItemContent: function (e) {
    var t = new _.Deferred();
    var n = this;
    var i = this.callBase;
    var o = new _.Deferred();
    o.done(function () {
      var o = i.call(n, e);
      t.resolve(o);
    });
    this._deferredItems[e.index] = o;
    if (!this.option("deferRendering")) {
      o.resolve();
    }
    return t.promise();
  },
  _render: function () {
    var e = this;
    this.callBase();
    (0, u.deferRender)(function () {
      var t = e._getSelectedItemIndices();
      e._updateItems(t[0]);
    });
  },
  _updateItems: function (e, t) {
    this._updateItemsPosition(e, t);
    this._updateItemsVisibility(e, t);
  },
  _modifyByChanges: function () {
    this.callBase.apply(this, arguments);
    var e = this._getSelectedItemIndices();
    this._updateItemsVisibility(e[0]);
  },
  _updateItemsPosition: function (e, t) {
    var n = this._itemElements();
    var i = (0, h.isDefined)(t) ? -this._animationDirection(t, e) : undefined;
    var o = n.eq(e);
    r._translator.move(o, 0);
    if ((0, h.isDefined)(t)) {
      r._translator.move(n.eq(t), i * 100 + "%");
    }
  },
  _updateItemsVisibility: function (e, t) {
    this._itemElements().each(function (n, i) {
      var a = (0, o.default)(i);
      var r = n !== e && n !== t;
      if (!r) {
        this._renderSpecificItem(n);
      }
      a.toggleClass("dx-multiview-item-hidden", r);
      this.setAria("hidden", r || undefined, a);
    }.bind(this));
  },
  _renderSpecificItem: function (e) {
    var t = this._itemElements().eq(e);
    var n = t.find(this._itemContentClass()).length > 0;
    if ((0, h.isDefined)(e) && !n) {
      this._deferredItems[e].resolve();
      (0, d.triggerResizeEvent)(t);
    }
  },
  _refreshItem: function (e, t) {
    this.callBase(e, t);
    this._updateItemsVisibility(this.option("selectedIndex"));
  },
  _setAriaSelectionAttribute: u.noop,
  _updateSelection: function (e, t) {
    var n = e[0];
    var o = t[0];
    r.animation.complete(this._$itemContainer);
    this._updateItems(o, n);
    var a = this._animationDirection(n, o);
    this._animateItemContainer(a * this._itemWidth(), function () {
      r._translator.move(this._$itemContainer, 0);
      this._updateItems(n);
      (0, i.getWidth)(this._$itemContainer);
    }.bind(this));
  },
  _animateItemContainer: function (e, t) {
    var n = this.option("animationEnabled") ? 200 : 0;
    r.animation.moveTo(this._$itemContainer, e, n, t);
  },
  _animationDirection: function (e, t) {
    var n;
    n = this._$itemContainer;
    var i = (0, a.locate)(n).left;
    var o = (t - e) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
    var r = i !== 0 ? i : o;
    return (0, s.sign)(r);
  },
  _getSwipeDisabledState: function () {
    return !this.option("swipeEnabled") || this._itemsCount() <= 1;
  },
  _initSwipeable: function () {
    var e = this;
    this._createComponent(this.$element(), m.default, {
      disabled: this._getSwipeDisabledState(),
      elastic: false,
      itemSizeFunc: this._itemWidth.bind(this),
      onStart: function (t) {
        return e._swipeStartHandler(t.event);
      },
      onUpdated: function (t) {
        return e._swipeUpdateHandler(t.event);
      },
      onEnd: function (t) {
        return e._swipeEndHandler(t.event);
      }
    });
  },
  _findBoundaryIndices: function () {
    var n;
    var i;
    var o = this.option("items");
    o.forEach(function (e, t) {
      var o;
      if (!Boolean(e == null ? undefined : e.disabled)) {
        if ((o = n) === null || o === undefined) {
          n = t;
        }
        i = t;
      }
    });
    this._boundaryIndices = {
      firstAvailableIndex: n ?? 0,
      lastAvailableIndex: i ?? o.length - 1,
      firstTrueIndex: 0,
      lastTrueIndex: o.length - 1
    };
  },
  _swipeStartHandler: function (e) {
    r.animation.complete(this._$itemContainer);
    var t = this.option("selectedIndex");
    var n = this.option("loop");
    var i = this._boundaryIndices;
    var o = i.firstAvailableIndex;
    var a = i.lastAvailableIndex;
    var s = this.option("rtlEnabled");
    e.maxLeftOffset = y(n || (s ? t > o : t < a));
    e.maxRightOffset = y(n || (s ? t < a : t > o));
    this._swipeDirection = null;
  },
  _swipeUpdateHandler: function (e) {
    var t = e.offset;
    var n = (0, s.sign)(t) * this._getRTLSignCorrection();
    r._translator.move(this._$itemContainer, t * this._itemWidth());
    if (n !== this._swipeDirection) {
      this._swipeDirection = n;
      var i = this.option("selectedIndex");
      var o = this._normalizeIndex(i - n);
      this._updateItems(i, o);
    }
  },
  _findNextAvailableIndex: function (e, t) {
    var n = this.option();
    var i = n.items;
    var o = n.loop;
    var a = this._boundaryIndices;
    var r = a.firstAvailableIndex;
    var s = a.lastAvailableIndex;
    var l = a.firstTrueIndex;
    var u = a.lastTrueIndex;
    var d = [l, r].includes(e);
    var c = [u, s].includes(e);
    if (o) {
      if (d && t < 0) {
        return s;
      }
      if (c && t > 0) {
        return r;
      }
    }
    for (var h = e + t; h >= r && h <= s; h += t) {
      if (!Boolean(i[h].disabled)) {
        return h;
      }
    }
    return e;
  },
  _swipeEndHandler: function (e) {
    var t = e.targetOffset * this._getRTLSignCorrection();
    if (t) {
      var n = this._findNextAvailableIndex(this.option("selectedIndex"), -t);
      this.option("selectedIndex", n);
      var i = this.itemElements().filter(".dx-item-selected");
      if (this.option("focusStateEnabled")) {
        this.option("focusedElement", (0, c.getPublicElement)(i));
      }
    } else {
      this._animateItemContainer(0, u.noop);
    }
  },
  _getItemFocusLoopSignCorrection: function () {
    if (this._itemFocusLooped) {
      return -1;
    } else {
      return 1;
    }
  },
  _moveFocus: function () {
    this.callBase.apply(this, arguments);
    this._itemFocusLooped = false;
  },
  _prevItem: function (e) {
    var t = this.callBase.apply(this, arguments);
    this._itemFocusLooped = t.is(e.last());
    return t;
  },
  _nextItem: function (e) {
    var t = this.callBase.apply(this, arguments);
    this._itemFocusLooped = t.is(e.first());
    return t;
  },
  _dimensionChanged: function () {
    this._clearItemWidthCache();
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._dimensionChanged();
    }
  },
  _updateSwipeDisabledState: function () {
    var e = this._getSwipeDisabledState();
    m.default.getInstance(this.$element()).option("disabled", e);
  },
  _dispose: function () {
    delete this._boundaryIndices;
    this.callBase();
  },
  _optionChanged: function (e) {
    var t = e.value;
    switch (e.name) {
      case "loop":
        this.option("loopItemFocus", t);
        break;
      case "animationEnabled":
        break;
      case "swipeEnabled":
        this._updateSwipeDisabledState();
        break;
      case "deferRendering":
        this._invalidate();
        break;
      case "items":
        this._updateSwipeDisabledState();
        this._findBoundaryIndices();
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, p.default)("dxMultiView", b);
var x = b;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;