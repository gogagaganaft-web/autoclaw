exports.VirtualScrollingRenderer = exports.VirtualScrollingDispatcher = undefined;
var i = l(require("./73349.js"));
var o = l(require("./55994.js"));
var a = require("./58201.js");
var r = require("./39611.js");
var s = require("./35922.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function d(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  c(e, t);
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), u(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
function p(e, t, n) {
  if (t) {
    f(e.prototype, t);
  }
  if (n) {
    f(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
var g = (0, r.addNamespace)("scroll", "dxSchedulerVirtualScrolling");
var m = "vertical";
var _ = "horizontal";
var v = "both";
var y = "none";
var b = v;
var x = function () {
  function e(e) {
    this.options = e;
    if (e) {
      this._rowHeight = this.getCellHeight();
      this._cellWidth = this.getCellWidth();
      this._createVirtualScrollingBase();
    }
  }
  var t = e.prototype;
  t.setViewOptions = function (e) {
    this.options = e;
    if (this.verticalVirtualScrolling) {
      this.verticalVirtualScrolling.options = e;
      this.verticalVirtualScrolling.itemSize = this.rowHeight;
      this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
    }
    if (this.horizontalVirtualScrolling) {
      this.horizontalVirtualScrolling.options = e;
      this.verticalVirtualScrolling.itemSize = this.cellWidth;
      this.verticalVirtualScrolling.viewportSize = this.viewportWidth;
    }
  };
  t.getRenderState = function () {
    var e;
    var t;
    return h({}, ((e = this.verticalVirtualScrolling) === null || e === undefined ? undefined : e.getRenderState()) || {}, ((t = this.horizontalVirtualScrolling) === null || t === undefined ? undefined : t.getRenderState()) || {});
  };
  t.getCellHeight = function () {
    var e = this.options.getCellHeight();
    var t = e > 0 ? e : 50;
    return Math.floor(t);
  };
  t.getCellWidth = function () {
    var e = this.options.getCellWidth();
    var t = this.options.getCellMinWidth();
    if (!e || e < t) {
      e = t;
    }
    var n = e > 0 ? e : 1;
    return Math.floor(n);
  };
  t.calculateCoordinatesByDataAndPosition = function (e, t, n, i, o) {
    var a = t.rowIndex;
    var r = t.columnIndex;
    var s = e.startDate;
    var l = e.endDate;
    var u = e.allDay;
    var d = n.getTime();
    var c = s.getTime();
    var h = l.getTime();
    var f = u || !i ? 0 : (d - c) / (h - c);
    var p = this.getCellWidth();
    var g = this.getCellHeight();
    var m = o ? (a + f) * g : a * g;
    var _ = o ? r * p : (r + f) * p;
    if (this.isRTL) {
      _ = this.options.getScrollableOuterWidth() - _;
    }
    return {
      top: m,
      left: _
    };
  };
  t.dispose = function () {
    if (this._onScrollHandler) {
      o.default.off(this.document, g, this._onScrollHandler);
    }
  };
  t.createVirtualScrolling = function () {
    var e = !!this.verticalVirtualScrolling;
    var t = !!this.horizontalVirtualScrolling;
    if (this.verticalScrollingAllowed !== e || this.horizontalScrollingAllowed !== t) {
      this._rowHeight = this.getCellHeight();
      this._cellWidth = this.getCellWidth();
      this._createVirtualScrollingBase();
    }
  };
  t._createVirtualScrollingBase = function () {
    if (this.verticalScrollingAllowed) {
      this.verticalVirtualScrolling = new C(h({}, this.options, {
        viewportHeight: this.viewportHeight,
        rowHeight: this.rowHeight,
        outlineCount: this.outlineCount
      }));
    }
    if (this.horizontalScrollingAllowed) {
      this.horizontalVirtualScrolling = new S(h({}, this.options, {
        viewportWidth: this.viewportWidth,
        cellWidth: this.cellWidth,
        outlineCount: this.outlineCount
      }));
    }
  };
  t.isAttachWindowScrollEvent = function () {
    return (this.horizontalScrollingAllowed || this.verticalScrollingAllowed) && !this.height;
  };
  t.attachScrollableEvents = function () {
    if (this.isAttachWindowScrollEvent()) {
      this._attachWindowScroll();
    }
  };
  t._attachWindowScroll = function () {
    var e = this;
    var t = (0, a.getWindow)();
    this._onScrollHandler = this.options.createAction(function () {
      var n = t.scrollX;
      var i = t.scrollY;
      if (n >= 10 || i >= 10) {
        e.handleOnScrollEvent({
          left: n,
          top: i
        });
      }
    });
    o.default.on(this.document, g, this._onScrollHandler);
  };
  t.handleOnScrollEvent = function (e) {
    if (e) {
      var t;
      var n;
      var i;
      var o;
      var a = e.left;
      var r = e.top;
      var l = (0, s.isDefined)(r) && ((t = this.verticalVirtualScrolling) === null || t === undefined ? undefined : t.updateState(r));
      var u = (0, s.isDefined)(a) && ((n = this.horizontalVirtualScrolling) === null || n === undefined ? undefined : n.updateState(a));
      if (l || u) {
        if ((i = (o = this.options).updateRender) !== null && i !== undefined) {
          i.call(o);
        }
      }
    }
  };
  t.updateDimensions = function (e) {
    var t = this.getCellHeight();
    var n = this.verticalScrollingAllowed && t !== this.rowHeight;
    if ((n || e) && this.verticalVirtualScrolling) {
      this.rowHeight = t;
      this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
      this.verticalVirtualScrolling.reinitState(t, e);
    }
    var i;
    var o;
    var a = this.getCellWidth();
    var r = this.horizontalScrollingAllowed && a !== this.cellWidth;
    if ((r || e) && this.horizontalVirtualScrolling) {
      this.cellWidth = a;
      this.horizontalVirtualScrolling.viewportSize = this.viewportWidth;
      this.horizontalVirtualScrolling.reinitState(a, e);
    }
    if (n || r) {
      if ((i = (o = this.options).updateGrid) !== null && i !== undefined) {
        i.call(o);
      }
    }
  };
  p(e, [{
    key: "isRTL",
    get: function () {
      return this.options.isRTL();
    }
  }, {
    key: "verticalVirtualScrolling",
    get: function () {
      return this._verticalVirtualScrolling;
    },
    set: function (e) {
      this._verticalVirtualScrolling = e;
    }
  }, {
    key: "horizontalVirtualScrolling",
    get: function () {
      return this._horizontalVirtualScrolling;
    },
    set: function (e) {
      this._horizontalVirtualScrolling = e;
    }
  }, {
    key: "document",
    get: function () {
      return i.default.getDocument();
    }
  }, {
    key: "height",
    get: function () {
      return this.options.getSchedulerHeight();
    }
  }, {
    key: "width",
    get: function () {
      return this.options.getSchedulerWidth();
    }
  }, {
    key: "rowHeight",
    get: function () {
      return this._rowHeight;
    },
    set: function (e) {
      this._rowHeight = e;
    }
  }, {
    key: "outlineCount",
    get: function () {
      return this.options.getScrolling().outlineCount;
    }
  }, {
    key: "cellWidth",
    get: function () {
      return this._cellWidth;
    },
    set: function (e) {
      this._cellWidth = e;
    }
  }, {
    key: "viewportWidth",
    get: function () {
      var e = this.width && this.options.getViewWidth();
      if (e > 0) {
        return e;
      } else {
        return this.options.getWindowWidth();
      }
    }
  }, {
    key: "viewportHeight",
    get: function () {
      var e = this.height && this.options.getViewHeight();
      if (e > 0) {
        return e;
      } else {
        return this.options.getWindowHeight();
      }
    }
  }, {
    key: "cellCountInsideTopVirtualRow",
    get: function () {
      return this.verticalScrollingState?.virtualItemCountBefore || 0;
    }
  }, {
    key: "cellCountInsideLeftVirtualCell",
    get: function () {
      return this.horizontalScrollingState?.virtualItemCountBefore || 0;
    }
  }, {
    key: "cellCountInsideRightVirtualCell",
    get: function () {
      return this.horizontalScrollingState?.virtualItemCountAfter || 0;
    }
  }, {
    key: "topVirtualRowsCount",
    get: function () {
      if (this.cellCountInsideTopVirtualRow > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  }, {
    key: "leftVirtualCellsCount",
    get: function () {
      if ((this.isRTL ? this.cellCountInsideRightVirtualCell : this.cellCountInsideLeftVirtualCell) > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  }, {
    key: "virtualRowOffset",
    get: function () {
      return this.verticalScrollingState?.virtualItemSizeBefore || 0;
    }
  }, {
    key: "virtualCellOffset",
    get: function () {
      return this.horizontalScrollingState?.virtualItemSizeBefore || 0;
    }
  }, {
    key: "scrollingState",
    get: function () {
      return {
        vertical: this.verticalVirtualScrolling?.state,
        horizontal: this.horizontalVirtualScrolling?.state
      };
    }
  }, {
    key: "verticalScrollingState",
    get: function () {
      return this.scrollingState.vertical;
    }
  }, {
    key: "horizontalScrollingState",
    get: function () {
      return this.scrollingState.horizontal;
    }
  }, {
    key: "scrollingOrientation",
    get: function () {
      var e = this.options.getScrolling();
      if (e.mode === "standard") {
        return y;
      } else {
        return e.orientation || b;
      }
    }
  }, {
    key: "verticalScrollingAllowed",
    get: function () {
      return this.scrollingOrientation === m || this.scrollingOrientation === v;
    }
  }, {
    key: "horizontalScrollingAllowed",
    get: function () {
      return this.scrollingOrientation === _ || this.scrollingOrientation === v;
    }
  }]);
  return e;
}();
exports.VirtualScrollingDispatcher = x;
var w = function () {
  function e(e) {
    this.options = e;
    this._state = this.defaultState;
    this.viewportSize = e.viewportSize;
    this._itemSize = e.itemSize;
    this._position = -1;
    this._itemSizeChanged = false;
    this.updateState(0);
  }
  var t = e.prototype;
  t.needUpdateState = function (e) {
    var t = this.state;
    var n = t.prevPosition;
    if (t.startIndex < 0) {
      return true;
    }
    var i = false;
    if (this._validateAndSavePosition(e)) {
      if (e === 0 || e === this.maxScrollPosition) {
        return true;
      }
      var o = n;
      var a = Math.floor(o / this.itemSize);
      var r = Math.floor(e / this.itemSize);
      i = Math.abs(a - r) >= this.outlineCount;
    }
    return i;
  };
  t._validateAndSavePosition = function (e) {
    if (!(0, s.isDefined)(e)) {
      return false;
    }
    var t = this.position !== e;
    this.position = e;
    return t;
  };
  t._correctPosition = function (e) {
    if (e >= 0) {
      return Math.min(e, this.maxScrollPosition);
    } else {
      return -1;
    }
  };
  t.updateState = function (e, t) {
    e = this._correctPosition(e);
    if (!this.needUpdateState(e) && !t) {
      return false;
    }
    var n = this._calcItemInfoBefore(e);
    var i = this._calcItemDeltaBefore(n);
    var o = this._calcItemInfoAfter(i);
    var a = o.outlineCountAfter;
    var r = o.virtualItemCountAfter;
    var s = o.itemCountWithAfter;
    var l = n.virtualItemCountBefore;
    var u = n.outlineCountBefore;
    var d = u + s + a;
    var c = Math.floor(e / this.itemSize);
    this.state.prevPosition = c * this.itemSize;
    this.state.startIndex = c - u;
    this.state.virtualItemCountBefore = l;
    this.state.outlineCountBefore = u;
    this.state.itemCount = d;
    this.state.outlineCountAfter = a;
    this.state.virtualItemCountAfter = r;
    this._updateStateCore();
    return true;
  };
  t.reinitState = function (e, t) {
    var n = this.position;
    this.itemSize = e;
    this.updateState(0, t);
    if (n > 0) {
      this.updateState(n, t);
    }
  };
  t._calcItemInfoBefore = function (e) {
    var t = Math.floor(e / this.itemSize);
    var n = Math.min(t, this.outlineCount);
    return {
      virtualItemCountBefore: t -= n,
      outlineCountBefore: n
    };
  };
  t._calcItemDeltaBefore = function (e) {
    var t = e.virtualItemCountBefore;
    var n = e.outlineCountBefore;
    return this.getTotalItemCount() - t - n;
  };
  t.getTotalItemCount = function () {
    throw "getTotalItemCount method should be implemented";
  };
  t.getRenderState = function () {
    throw "getRenderState method should be implemented";
  };
  t._calcItemInfoAfter = function (e) {
    var t = e >= this.pageSize ? this.pageSize : e;
    var n = e - t;
    var i = n > 0 ? Math.min(n, this.outlineCount) : 0;
    if (n > 0) {
      n -= i;
    }
    return {
      virtualItemCountAfter: n,
      outlineCountAfter: i,
      itemCountWithAfter: t
    };
  };
  t._updateStateCore = function () {
    var e = this.state;
    var t = e.virtualItemCountBefore;
    var n = e.virtualItemCountAfter;
    var i = e.outlineCountBefore;
    var o = e.outlineCountAfter;
    var a = e.virtualItemSizeBefore;
    var r = e.virtualItemSizeAfter;
    var s = e.outlineSizeBefore;
    var l = e.outlineSizeAfter;
    var u = this.itemSize * t;
    var d = this.itemSize * n;
    var c = a + s < u + this.itemSize * i;
    var h = r + l < d + this.itemSize * o;
    if (this._itemSizeChanged || c || h) {
      this._updateStateVirtualItems(u, d);
    }
  };
  t._updateStateVirtualItems = function (e, t) {
    var n = this.state;
    n.virtualItemSizeBefore = e;
    n.virtualItemSizeAfter = t;
  };
  p(e, [{
    key: "itemSize",
    get: function () {
      return this._itemSize;
    },
    set: function (e) {
      this._itemSizeChanged = this._itemSize !== e;
      this._itemSize = e;
    }
  }, {
    key: "state",
    get: function () {
      return this._state;
    },
    set: function (e) {
      this._state = e;
    }
  }, {
    key: "startIndex",
    get: function () {
      return this.state.startIndex;
    }
  }, {
    key: "pageSize",
    get: function () {
      return Math.ceil(this.viewportSize / this.itemSize);
    }
  }, {
    key: "outlineCount",
    get: function () {
      if ((0, s.isDefined)(this.options.outlineCount)) {
        return this.options.outlineCount;
      } else {
        return Math.floor(this.pageSize / 2);
      }
    }
  }, {
    key: "groupCount",
    get: function () {
      return this.options.getGroupCount();
    }
  }, {
    key: "isVerticalGrouping",
    get: function () {
      return this.options.isVerticalGrouping();
    }
  }, {
    key: "defaultState",
    get: function () {
      return {
        prevPosition: 0,
        startIndex: -1,
        itemCount: 0,
        virtualItemCountBefore: 0,
        virtualItemCountAfter: 0,
        outlineCountBefore: 0,
        outlineCountAfter: 0,
        virtualItemSizeBefore: 0,
        virtualItemSizeAfter: 0,
        outlineSizeBefore: 0,
        outlineSizeAfter: 0
      };
    }
  }, {
    key: "maxScrollPosition",
    get: function () {
      return this.getTotalItemCount() * this.itemSize - this.viewportSize;
    }
  }, {
    key: "position",
    get: function () {
      return this._position;
    },
    set: function (e) {
      this._position = e;
    }
  }]);
  return e;
}();
var C = function (e) {
  function t(t) {
    return e.call(this, h({}, t, {
      itemSize: t.rowHeight,
      viewportSize: t.viewportHeight
    })) || this;
  }
  d(t, e);
  var n = t.prototype;
  n.getTotalItemCount = function () {
    return this.options.getTotalRowCount(this.groupCount, this.isVerticalGrouping);
  };
  n.getRenderState = function () {
    return {
      topVirtualRowHeight: this.state.virtualItemSizeBefore,
      bottomVirtualRowHeight: this.state.virtualItemSizeAfter,
      startRowIndex: this.state.startIndex,
      rowCount: this.state.itemCount,
      startIndex: this.state.startIndex
    };
  };
  p(t, [{
    key: "prevTopPosition",
    get: function () {
      return this.state.prevPosition;
    }
  }, {
    key: "rowCount",
    get: function () {
      return this.state.itemCount;
    }
  }, {
    key: "topVirtualRowCount",
    get: function () {
      return this.state.virtualItemCountBefore;
    }
  }, {
    key: "bottomVirtualRowCount",
    get: function () {
      return this.state.virtualItemCountAfter;
    }
  }]);
  return t;
}(w);
var S = function (e) {
  function t(t) {
    return e.call(this, h({}, t, {
      itemSize: t.cellWidth,
      viewportSize: t.viewportWidth
    })) || this;
  }
  d(t, e);
  var n = t.prototype;
  n.getTotalItemCount = function () {
    return this.options.getTotalCellCount(this.groupCount, this.isVerticalGrouping);
  };
  n.getRenderState = function () {
    return {
      leftVirtualCellWidth: this.state.virtualItemSizeBefore,
      rightVirtualCellWidth: this.state.virtualItemSizeAfter,
      startCellIndex: this.state.startIndex,
      cellCount: this.state.itemCount,
      cellWidth: this.itemSize
    };
  };
  n._updateStateVirtualItems = function (t, n) {
    if (this.isRTL) {
      var i = this.state;
      i.virtualItemSizeAfter = t;
      i.virtualItemSizeBefore = n;
      i.startIndex = this.getTotalItemCount() - this.startIndex - this.state.itemCount;
    } else {
      e.prototype._updateStateVirtualItems.call(this, t, n);
    }
  };
  p(t, [{
    key: "isRTL",
    get: function () {
      return this.options.isRTL();
    }
  }]);
  return t;
}(w);
var k = function () {
  function e(e) {
    this._workspace = e;
    this._renderAppointmentTimeoutID = null;
  }
  var t = e.prototype;
  t.getRenderTimeout = function () {
    if (this._workspace.option("isRenovatedAppointments")) {
      return -1;
    } else {
      return 15;
    }
  };
  t.updateRender = function () {
    this._renderGrid();
    this._renderAppointments();
  };
  t._renderGrid = function () {
    this.workspace.renderWorkSpace(false);
  };
  t._renderAppointments = function () {
    var e = this;
    var t = this.getRenderTimeout();
    if (t >= 0) {
      clearTimeout(this._renderAppointmentTimeoutID);
      this._renderAppointmentTimeoutID = setTimeout(function () {
        return e.workspace.updateAppointments();
      }, t);
    } else {
      this.workspace.updateAppointments();
    }
  };
  p(e, [{
    key: "workspace",
    get: function () {
      return this._workspace;
    }
  }]);
  return e;
}();
exports.VirtualScrollingRenderer = k;