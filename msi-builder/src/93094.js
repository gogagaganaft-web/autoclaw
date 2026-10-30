exports.default = undefined;
var i = require("./58664.js");
var o = m(require("./68374.js"));
var a = m(require("./20530.js"));
var r = m(require("./99393.js"));
var s = require("./95479.js");
var l = require("./35922.js");
var u = require("./13306.js");
var d = require("./58201.js");
var c = require("./6415.js");
var h = require("./20576.js");
var f = require("./60137.js");
var p = m(require("./4741.js"));
var g = m(require("./11050.js"));
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = {
  horizontal: {
    itemMainRatio: "widthRatio",
    itemCrossRatio: "heightRatio",
    baseItemMainDimension: "baseItemWidth",
    baseItemCrossDimension: "baseItemHeight",
    mainDimension: "width",
    crossDimension: "height",
    mainPosition: "left",
    crossPosition: "top"
  },
  vertical: {
    itemMainRatio: "heightRatio",
    itemCrossRatio: "widthRatio",
    baseItemMainDimension: "baseItemHeight",
    baseItemCrossDimension: "baseItemWidth",
    mainDimension: "height",
    crossDimension: "width",
    mainPosition: "top",
    crossPosition: "left"
  }
};
var v = g.default.inherit({
  _activeStateUnit: ".dx-tile",
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      items: null,
      direction: "horizontal",
      hoverStateEnabled: true,
      showScrollbar: "never",
      height: 500,
      baseItemWidth: 100,
      baseItemHeight: 100,
      itemMargin: 20,
      activeStateEnabled: true,
      indicateLoading: true
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return f.nativeScrolling;
      },
      options: {
        showScrollbar: "onScroll"
      }
    }]);
  },
  _itemClass: function () {
    return "dx-tile";
  },
  _itemDataKey: function () {
    return "dxTileData";
  },
  _itemContainer: function () {
    return this._$container;
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-tileview");
    this._initScrollView();
  },
  _dataSourceLoadingChangedHandler: function (e) {
    var t = this._scrollView;
    if (t && t.startLoading) {
      if (e && this.option("indicateLoading")) {
        t.startLoading();
      } else {
        t.finishLoading();
      }
    }
  },
  _hideLoadingIfLoadIndicationOff: function () {
    if (!this.option("indicateLoading")) {
      this._dataSourceLoadingChangedHandler(false);
    }
  },
  _initScrollView: function () {
    var e = this.option();
    var t = e.width;
    var n = e.height;
    var i = e.direction;
    var a = e.showScrollbar;
    this._scrollView = this._createComponent(this.$element(), p.default, {
      direction: i,
      width: t,
      height: n,
      scrollByContent: true,
      useKeyboard: false,
      showScrollbar: a
    });
    this._$container = (0, o.default)(this._scrollView.content());
    this._$container.addClass("dx-tileview-wrapper");
    this._scrollView.option("onUpdated", this._renderGeometry.bind(this));
  },
  _initMarkup: function () {
    this.callBase();
    (0, h.deferRender)(function () {
      this._cellsPerDimension = 1;
      this._renderGeometry();
      this._updateScrollView();
      this._fireContentReadyAction();
    }.bind(this));
  },
  _updateScrollView: function () {
    this._scrollView.option("direction", this.option("direction"));
    this._scrollView.update();
    this._indicateLoadingIfAlreadyStarted();
  },
  _indicateLoadingIfAlreadyStarted: function () {
    if (this._isDataSourceLoading()) {
      this._dataSourceLoadingChangedHandler(true);
    }
  },
  _renderGeometry: function () {
    this._config = _[this.option("direction")];
    var e;
    var t = this.option("items") || [];
    var n = this._config;
    var o = this.option("itemMargin");
    var a = Math.max.apply(Math, (0, s.map)(t || [], function (e) {
      return Math.round(e[n.itemCrossRatio] || 1);
    }));
    e = d.hasWindow ? (n.crossDimension === "width" ? i.getWidth : i.getHeight)(this.$element()) : parseInt(this.$element().get(0).style[n.crossDimension]);
    this._cellsPerDimension = Math.floor(e / (this.option(n.baseItemCrossDimension) + o));
    this._cellsPerDimension = Math.max(this._cellsPerDimension, a);
    this._cells = [];
    this._cells.push(new Array(this._cellsPerDimension));
    this._arrangeItems(t);
    this._renderContentSize(n, o);
  },
  _renderContentSize: function (e, t) {
    var n = e.mainDimension;
    var o = e.baseItemMainDimension;
    if ((0, d.hasWindow)()) {
      var a = this._cells.length * this.option(o) + (this._cells.length + 1) * t;
      var r = (n === "width" ? i.getWidth : i.getHeight)(this.$element());
      (n === "width" ? i.setWidth : i.setHeight)(this._$container, Math.max(a, r));
    }
  },
  _arrangeItems: function (e) {
    var t = this._config;
    var n = t.itemMainRatio;
    var i = t.itemCrossRatio;
    var o = t.mainPosition;
    this._itemsPositions = [];
    (0, s.each)(e, function (e, a) {
      var r = {
        [n]: a[n] || 1,
        [i]: a[i] || 1,
        index: e
      };
      r[n] = r[n] <= 0 ? 0 : Math.round(r[t.itemMainRatio]);
      r[i] = r[i] <= 0 ? 0 : Math.round(r[t.itemCrossRatio]);
      var s = this._getItemPosition(r);
      if (s[o] === -1) {
        s[o] = this._cells.push(new Array(this._cellsPerDimension)) - 1;
      }
      this._occupyCells(r, s);
      this._arrangeItem(r, s);
      this._itemsPositions.push(s);
    }.bind(this));
  },
  _getItemPosition: function (e) {
    var t = this._config;
    var n = t.mainPosition;
    var i = t.crossPosition;
    var o = {
      [n]: -1,
      [i]: 0
    };
    for (var a = 0; a < this._cells.length; a++) {
      for (var r = 0; r < this._cellsPerDimension; r++) {
        if (this._itemFit(a, r, e)) {
          o[n] = a;
          o[i] = r;
          break;
        }
      }
      if (o[n] > -1) {
        break;
      }
    }
    return o;
  },
  _itemFit: function (e, t, n) {
    var i = true;
    var o = this._config;
    var a = n[o.itemMainRatio];
    var r = n[o.itemCrossRatio];
    if (t + r > this._cellsPerDimension) {
      return false;
    }
    for (var s = e; s < e + a; s++) {
      for (var l = t; l < t + r; l++) {
        if (this._cells.length - 1 < s) {
          this._cells.push(new Array(this._cellsPerDimension));
        } else if (this._cells[s][l] !== undefined) {
          i = false;
          break;
        }
      }
    }
    return i;
  },
  _occupyCells: function (e, t) {
    var n = this._config;
    for (var i = t[n.mainPosition], o = t[n.crossPosition], a = e[n.itemMainRatio], r = e[n.itemCrossRatio], s = i; s < i + a; s++) {
      for (var l = o; l < o + r; l++) {
        this._cells[s][l] = e.index;
      }
    }
  },
  _arrangeItem: function (e, t) {
    var n = this._config;
    var o = t[n.mainPosition];
    var a = t[n.crossPosition];
    var r = e[n.itemMainRatio];
    var s = e[n.itemCrossRatio];
    var l = this.option(n.baseItemCrossDimension);
    var u = this.option(n.baseItemMainDimension);
    var d = this.option("itemMargin");
    var c = {
      display: r <= 0 || s <= 0 ? "none" : ""
    };
    var h = r * u + (r - 1) * d;
    var f = s * l + (s - 1) * d;
    c[n.mainDimension] = h < 0 ? 0 : h;
    c[n.crossDimension] = f < 0 ? 0 : f;
    c[n.mainPosition] = o * u + (o + 1) * d;
    c[n.crossPosition] = a * l + (a + 1) * d;
    if (this.option("rtlEnabled")) {
      var p = (0, i.getWidth)(this._$container);
      var g = this.option("baseItemWidth");
      var m = t.left;
      var _ = m * g;
      var v = (g + d) * e.widthRatio;
      var y = m * d;
      c.left = p - (_ + v + y);
    }
    this._itemElements().eq(e.index).css(c);
  },
  _moveFocus: function (e) {
    var t = "up";
    var n = "down";
    var i = this.option("rtlEnabled") ? "right" : "left";
    var a = this.option("rtlEnabled") ? "left" : "right";
    var r = "pageup";
    var s = "pagedown";
    var u = this.option("direction") === "horizontal";
    var d = this._cells;
    var h = (0, o.default)(this.option("focusedElement")).index();
    var f = this._itemsPositions[h].left;
    var p = this._itemsPositions[h].top;
    var g = (u ? d : d[0]).length;
    var m = (u ? d[0] : d).length;
    function _(e, t) {
      if (u) {
        return d[e][t];
      } else {
        return d[t][e];
      }
    }
    switch (e) {
      case r:
      case t:
        while (p > 0 && h === _(f, p)) {
          p--;
        }
        if (p < 0) {
          p = 0;
        }
        break;
      case s:
      case n:
        while (p < m && h === _(f, p)) {
          p++;
        }
        if (p === m) {
          p = m - 1;
        }
        break;
      case a:
        while (f < g && h === _(f, p)) {
          f++;
        }
        if (f === g) {
          f = g - 1;
        }
        break;
      case i:
        while (f >= 0 && h === _(f, p)) {
          f--;
        }
        if (f < 0) {
          f = 0;
        }
        break;
      default:
        this.callBase.apply(this, arguments);
        return;
    }
    var v = _(f, p);
    if ((0, l.isDefined)(v)) {
      var y = this._itemElements().eq(v);
      this.option("focusedElement", (0, c.getPublicElement)(y));
      this._scrollToItem(y);
    }
  },
  _scrollToItem: function (e) {
    if (e.length) {
      var t = this._config;
      var n = t.mainDimension === "width" ? i.getOuterWidth : i.getOuterHeight;
      var o = this.option("itemMargin");
      var a = e.position()[t.mainPosition];
      var r = n(e);
      var s = a + r;
      var l = this.scrollPosition();
      var u = n(this.$element());
      if (!(l <= a) || !(s <= l + u)) {
        if (l > a) {
          this._scrollView.scrollTo(a - o);
        } else {
          this._scrollView.scrollTo(a + r - u + o);
        }
      }
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "items":
        this.callBase(e);
        this._renderGeometry();
        this._updateScrollView();
        break;
      case "showScrollbar":
        this._initScrollView();
        break;
      case "disabled":
        this._scrollView.option("disabled", e.value);
        this.callBase(e);
        break;
      case "baseItemWidth":
      case "baseItemHeight":
      case "itemMargin":
        this._renderGeometry();
        break;
      case "width":
      case "height":
        this.callBase(e);
        this._renderGeometry();
        this._scrollView.option(e.name, e.value);
        this._updateScrollView();
        break;
      case "direction":
        this._renderGeometry();
        this._updateScrollView();
        break;
      case "indicateLoading":
        this._hideLoadingIfLoadIndicationOff();
        break;
      default:
        this.callBase(e);
    }
  },
  scrollPosition: function () {
    return this._scrollView.scrollOffset()[this._config.mainPosition];
  }
});
(0, r.default)("dxTileView", v);
var y = v;
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;