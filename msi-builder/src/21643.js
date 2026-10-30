exports.default = undefined;
var i = require("./58664.js");
var o = p(require("./68374.js"));
var a = require("./20576.js");
var r = require("./35922.js");
var s = p(require("./96688.js"));
var l = require("./58201.js");
var u = require("./95479.js");
var d = require("./13306.js");
var c = p(require("./99393.js"));
var h = p(require("./55551.js"));
var f = p(require("./11050.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = f.default.inherit({
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      rows: [],
      cols: [],
      screenByWidth: null,
      singleColumnScreen: "",
      height: "100%",
      width: "100%",
      activeStateEnabled: false,
      focusStateEnabled: false,
      onItemStateChanged: undefined,
      onLayoutChanged: null,
      currentScreenFactor: undefined
    });
  },
  _init: function () {
    if (!this.option("screenByWidth")) {
      this._options.silent("screenByWidth", l.defaultScreenFactorFunc);
    }
    this.callBase();
    this._initLayoutChangedAction();
  },
  _initLayoutChangedAction: function () {
    this._layoutChangedAction = this._createActionByOption("onLayoutChanged", {
      excludeValidators: ["disabled", "readonly"]
    });
  },
  _itemClass: function () {
    return "dx-box-item";
  },
  _itemDataKey: function () {
    return "dxBoxItemData";
  },
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-responsivebox");
  },
  _renderItems: function () {
    this._setScreenSize();
    this._screenItems = this._itemsByScreen();
    this._prepareGrid();
    this._spreadItems();
    this._layoutItems();
    this._linkNodeToItem();
  },
  _itemOptionChanged: function (e) {
    var t = this._findItemElementByItem(e);
    if (t.length) {
      this._refreshItem(t, e);
      this._clearItemNodeTemplates();
      this._update(true);
    }
  },
  _setScreenSize: function () {
    var e = this._getCurrentScreen();
    this._removeScreenSizeClass();
    this.$element().addClass("dx-responsivebox-screen-" + e);
    this.option("currentScreenFactor", e);
  },
  _removeScreenSizeClass: function () {
    var e = this.option("currentScreenFactor");
    if (e) {
      this.$element().removeClass("dx-responsivebox-screen-" + e);
    }
  },
  _prepareGrid: function () {
    var e = this._grid = [];
    this._prepareRowsAndCols();
    (0, u.each)(this._rows, function () {
      var t = [];
      e.push(t);
      (0, u.each)(this._cols, function () {
        t.push(this._createEmptyCell());
      }.bind(this));
    }.bind(this));
  },
  getSingleColumnRows: function () {
    var e = this.option("rows");
    var t = this._screenItems.length;
    if (e.length) {
      var n = this._filterByScreen(e);
      var i = [];
      for (var o = 0; o < t; o++) {
        var a = this._defaultSizeConfig();
        if (o < n.length && (0, r.isDefined)(n[o].shrink)) {
          a.shrink = n[o].shrink;
        }
        i.push(a);
      }
      return i;
    }
    return this._defaultSizeConfig(t);
  },
  _prepareRowsAndCols: function () {
    if (this._isSingleColumnScreen()) {
      this._prepareSingleColumnScreenItems();
      this._rows = this.getSingleColumnRows();
      this._cols = this._defaultSizeConfig(1);
    } else {
      this._rows = this._sizesByScreen(this.option("rows"));
      this._cols = this._sizesByScreen(this.option("cols"));
    }
  },
  _isSingleColumnScreen: function () {
    return this._screenRegExp().test(this.option("singleColumnScreen")) || !this.option("rows").length || !this.option("cols").length;
  },
  _prepareSingleColumnScreenItems: function () {
    this._screenItems.sort(function (e, t) {
      return e.location.row - t.location.row || e.location.col - t.location.col;
    });
    (0, u.each)(this._screenItems, function (e, t) {
      (0, d.extend)(t.location, {
        row: e,
        col: 0,
        rowspan: 1,
        colspan: 1
      });
    });
  },
  _sizesByScreen: function (e) {
    return (0, u.map)(this._filterByScreen(e), function (e) {
      return (0, d.extend)(this._defaultSizeConfig(), e);
    }.bind(this));
  },
  _createDefaultSizeConfig: function () {
    return {
      ratio: 1,
      baseSize: 0,
      minSize: 0,
      maxSize: 0
    };
  },
  _defaultSizeConfig: function (e) {
    var t = this._createDefaultSizeConfig();
    if (!arguments.length) {
      return t;
    }
    var n = [];
    for (var i = 0; i < e; i++) {
      n.push(t);
    }
    return n;
  },
  _filterByScreen: function (e) {
    var t = this._screenRegExp();
    return (0, a.grep)(e, function (e) {
      return !e.screen || t.test(e.screen);
    });
  },
  _screenRegExp: function () {
    var e = this._getCurrentScreen();
    return new RegExp("(^|\\s)" + e + "($|\\s)", "i");
  },
  _getCurrentScreen: function () {
    var e = this._screenWidth();
    return this.option("screenByWidth")(e);
  },
  _screenWidth: function () {
    if ((0, l.hasWindow)()) {
      return (0, i.getWidth)((0, l.getWindow)());
    } else {
      return 1920;
    }
  },
  _createEmptyCell: function () {
    return {
      item: {},
      location: {
        colspan: 1,
        rowspan: 1
      }
    };
  },
  _spreadItems: function () {
    (0, u.each)(this._screenItems, function (e, t) {
      var n = t.location || {};
      var i = n.col;
      var o = n.row;
      var a = this._grid[o];
      var r = a && a[i];
      this._occupyCells(r, t);
    }.bind(this));
  },
  _itemsByScreen: function () {
    var e = this;
    return this.option("items").reduce(function (t, n) {
      var i = n.location || {};
      i = (0, r.isPlainObject)(i) ? [i] : i;
      e._filterByScreen(i).forEach(function (e) {
        t.push({
          item: n,
          location: (0, d.extend)({
            rowspan: 1,
            colspan: 1
          }, e)
        });
      });
      return t;
    }, []);
  },
  _occupyCells: function (e, t) {
    if (e && !this._isItemCellOccupied(e, t)) {
      (0, d.extend)(e, t);
      this._markSpanningCell(e);
    }
  },
  _isItemCellOccupied: function (e, t) {
    if (!(0, r.isEmptyObject)(e.item)) {
      return true;
    }
    var n = false;
    this._loopOverSpanning(t.location, function (e) {
      n = n || !(0, r.isEmptyObject)(e.item);
    });
    return n;
  },
  _loopOverSpanning: function (e, t) {
    var n = e.row + e.rowspan - 1;
    var i = e.col + e.colspan - 1;
    var o = Math.min(n, this._rows.length - 1);
    var a = Math.min(i, this._cols.length - 1);
    e.rowspan -= n - o;
    e.colspan -= i - a;
    for (var r = e.row; r <= o; r++) {
      for (var s = e.col; s <= a; s++) {
        if (r !== e.row || s !== e.col) {
          t(this._grid[r][s]);
        }
      }
    }
  },
  _markSpanningCell: function (e) {
    this._loopOverSpanning(e.location, function (t) {
      (0, d.extend)(t, {
        item: e.item,
        spanningCell: e
      });
    });
  },
  _linkNodeToItem: function () {
    (0, u.each)(this._itemElements(), function (e, t) {
      var n = (0, o.default)(t);
      var i = n.data("dxBoxItemData");
      if (!i.box) {
        i.node = n.children();
      }
    });
  },
  _layoutItems: function () {
    var e = this._grid.length;
    var t = e && this._grid[0].length;
    if (e || t) {
      var n = this._layoutBlock({
        direction: "col",
        row: {
          start: 0,
          end: e - 1
        },
        col: {
          start: 0,
          end: t - 1
        }
      });
      var i = this._prepareBoxConfig(n.box || {
        direction: "row",
        items: [(0, d.extend)(n, {
          ratio: 1
        })]
      });
      (0, d.extend)(i, this._rootBoxConfig(i.items));
      this._$root = (0, o.default)("<div>").appendTo(this._itemContainer());
      this._createComponent(this._$root, h.default, i);
    }
  },
  _rootBoxConfig: function (e) {
    return {
      width: "100%",
      height: "100%",
      items: (0, u.each)(e, function (e, t) {
        if (this._needApplyAutoBaseSize(t)) {
          (0, d.extend)(t, {
            baseSize: "auto"
          });
        }
      }.bind(this)),
      itemTemplate: this._getTemplateByOption("itemTemplate"),
      itemHoldTimeout: this.option("itemHoldTimeout"),
      onItemHold: this._createActionByOption("onItemHold"),
      onItemClick: this._createActionByOption("onItemClick"),
      onItemContextMenu: this._createActionByOption("onItemContextMenu"),
      onItemRendered: this._createActionByOption("onItemRendered")
    };
  },
  _needApplyAutoBaseSize: function (e) {
    return !e.baseSize && (!e.minSize || e.minSize === "auto") && (!e.maxSize || e.maxSize === "auto");
  },
  _prepareBoxConfig: function (e) {
    return (0, d.extend)(e || {}, {
      crossAlign: "stretch",
      onItemStateChanged: this.option("onItemStateChanged")
    });
  },
  _layoutBlock: function (e) {
    if (this._isSingleItem(e)) {
      return this._itemByCell(e.row.start, e.col.start);
    } else {
      return this._layoutDirection(e);
    }
  },
  _isSingleItem: function (e) {
    var t = this._grid[e.row.start][e.col.start].location;
    var n = e.row.end - e.row.start == t.rowspan - 1;
    var i = e.col.end - e.col.start == t.colspan - 1;
    return n && i;
  },
  _itemByCell: function (e, t) {
    var n = this._grid[e][t];
    if (n.spanningCell) {
      return null;
    } else {
      return n.item;
    }
  },
  _layoutDirection: function (e) {
    for (var t, n = [], i = e.direction, o = this._crossDirection(i); t = this._nextBlock(e);) {
      if (this._isBlockIndivisible(e.prevBlockOptions, t)) {
        throw s.default.Error("E1025");
      }
      var a = this._layoutBlock({
        direction: o,
        row: t.row,
        col: t.col,
        prevBlockOptions: e
      });
      if (a) {
        (0, d.extend)(a, this._blockSize(t, o));
        n.push(a);
      }
      e[o].start = t[o].end + 1;
    }
    return {
      box: this._prepareBoxConfig({
        direction: i,
        items: n
      })
    };
  },
  _isBlockIndivisible: function (e, t) {
    return e && e.col.start === t.col.start && e.col.end === t.col.end && e.row.start === t.row.start && e.row.end === t.row.end;
  },
  _crossDirection: function (e) {
    if (e === "col") {
      return "row";
    } else {
      return "col";
    }
  },
  _nextBlock: function (e) {
    var t = e.direction;
    var n = this._crossDirection(t);
    var i = e[t].start;
    var o = e[t].end;
    var a = e[n].start;
    if (a > e[n].end) {
      return null;
    }
    for (var r = 1, s = a; s < a + r; s++) {
      var l = 1;
      for (var u = i; u <= o; u++) {
        var d = this._cellByDirection(t, u, s);
        l = Math.max(l, d.location[n + "span"]);
      }
      var c = s + l;
      var h = a + r;
      if (c > h) {
        r += c - h;
      }
    }
    var f = {
      [t]: {
        start: i,
        end: o
      },
      [n]: {
        start: a,
        end: a + r - 1
      }
    };
    return f;
  },
  _cellByDirection: function (e, t, n) {
    if (e === "col") {
      return this._grid[n][t];
    } else {
      return this._grid[t][n];
    }
  },
  _blockSize: function (e, t) {
    var n = t === "row" ? "auto" : 0;
    var i = t === "row" ? this._rows : this._cols;
    var o = (0, d.extend)(this._createDefaultSizeConfig(), {
      ratio: 0
    });
    for (var a = e[t].start; a <= e[t].end; a++) {
      var s = i[a];
      o.ratio += s.ratio;
      o.baseSize += s.baseSize;
      o.minSize += s.minSize;
      o.maxSize += s.maxSize;
      if ((0, r.isDefined)(s.shrink)) {
        o.shrink = s.shrink;
      }
    }
    o.minSize = o.minSize ? o.minSize : n;
    o.maxSize = o.maxSize ? o.maxSize : "auto";
    if (this._isSingleColumnScreen()) {
      o.baseSize = "auto";
    }
    return o;
  },
  _update: function (e) {
    var t = this._$root;
    this._renderItems();
    if (t) {
      if (e) {
        t.remove();
      } else {
        t.detach();
        this._saveAssistantRoot(t);
      }
    }
    this._layoutChangedAction();
  },
  _saveAssistantRoot: function (e) {
    this._assistantRoots = this._assistantRoots || [];
    this._assistantRoots.push(e);
  },
  _dispose: function () {
    this._clearItemNodeTemplates();
    this._cleanUnusedRoots();
    this.callBase.apply(this, arguments);
  },
  _cleanUnusedRoots: function () {
    if (this._assistantRoots) {
      (0, u.each)(this._assistantRoots, function (e, t) {
        (0, o.default)(t).remove();
      });
    }
  },
  _clearItemNodeTemplates: function () {
    (0, u.each)(this.option("items"), function () {
      delete this.node;
    });
  },
  _attachClickEvent: a.noop,
  _optionChanged: function (e) {
    switch (e.name) {
      case "rows":
      case "cols":
      case "screenByWidth":
      case "singleColumnScreen":
        this._clearItemNodeTemplates();
        this._invalidate();
        break;
      case "width":
      case "height":
        this.callBase(e);
        this._update();
        break;
      case "onLayoutChanged":
        this._initLayoutChangedAction();
        break;
      case "itemTemplate":
        this._clearItemNodeTemplates();
        this.callBase(e);
        break;
      case "currentScreenFactor":
        break;
      default:
        this.callBase(e);
    }
  },
  _dimensionChanged: function () {
    if (this._getCurrentScreen() !== this.option("currentScreenFactor")) {
      this._update();
    }
  },
  repaint: function () {
    this._update();
  }
});
(0, c.default)("dxResponsiveBox", g);
var m = g;
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;