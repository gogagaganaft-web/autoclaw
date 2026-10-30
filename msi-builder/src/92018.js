Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.virtualScrollingModule = undefined;
var i = g(require("./68374.js"));
var o = g(require("./47810.js"));
var a = require("./62754.js");
var r = require("./3532.js");
var s = require("./95479.js");
var l = require("./37518.js");
var u = require("./58664.js");
var d = require("./35922.js");
var c = require("./58201.js");
var h = g(require("./2492.js"));
var f = g(require("./60082.js"));
var p = require("./86770.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m;
var _;
var v;
var y;
var b = "scrolling.legacyMode";
function x(e) {
  return e.option("scrolling.mode") === "virtual";
}
function w(e) {
  return e.option("scrolling.mode") === "infinite";
}
function C(e) {
  return x(e) || w(e);
}
function S(e, t, n, i) {
  for (var o = 0; o < t + 1; o++) {
    var a = e[n ? e.length - 1 - o : o];
    if (a && !i(a, o === t, n)) {
      t++;
    }
  }
  return t;
}
function k(e, t) {
  return e.rowType === "data" && !e.isNewRow || e.rowType === "group" && t.isGroupItemCountable(e.data);
}
function D(e) {
  e.forEach(function (e, t) {
    e.rowIndex = t;
  });
  return e;
}
m = function (e) {
  var t = e._virtualScrollController.beginPageIndex(-1);
  if (x(e)) {
    if (t < 0 || e.viewportSize() >= 0 && e.getViewportItemIndex() >= 0 && (t * e.pageSize() > e.getViewportItemIndex() || t * e.pageSize() + e.itemsCount() < e.getViewportItemIndex() + e.viewportSize()) && e._dataSource.isLoading()) {
      if (!e._isLoading) {
        e._isLoading = true;
        e.loadingChanged.fire(true);
      }
    } else if (e._isLoading) {
      e._isLoading = false;
      e.loadingChanged.fire(false);
    }
  }
};
_ = {
  init: function () {
    this.callBase.apply(this, arguments);
    this._items = [];
    this._totalCount = -1;
    this._isLoaded = true;
    this._loadPageCount = 1;
    this._virtualScrollController = new p.VirtualScrollController(this.component, this._getVirtualScrollDataOptions());
  },
  _getVirtualScrollDataOptions: function () {
    var e = this;
    return {
      pageSize: function () {
        return e.pageSize();
      },
      totalItemsCount: function () {
        return e.totalItemsCount();
      },
      hasKnownLastPage: function () {
        return e.hasKnownLastPage();
      },
      pageIndex: function (t) {
        return e._dataSource.pageIndex(t);
      },
      isLoading: function () {
        return e._dataSource.isLoading() && !e.isCustomLoading();
      },
      pageCount: function () {
        return e.pageCount();
      },
      load: function () {
        return e._dataSource.load();
      },
      updateLoading: function () {
        m(e);
      },
      itemsCount: function () {
        return e.itemsCount(true);
      },
      items: function () {
        return e._dataSource.items();
      },
      viewportItems: function (t) {
        if (t) {
          e._items = t;
        }
        return e._items;
      },
      onChanged: function (t) {
        e.changed.fire(t);
      },
      changingDuration: function () {
        if (e.isLoading()) {
          return 300;
        } else {
          return e._renderTime || 0;
        }
      }
    };
  },
  _handleLoadingChanged: function (e) {
    if (this.option(b) !== false) {
      if (!x(this) || !!this._isLoadingAll) {
        this._isLoading = e;
        this.callBase.apply(this, arguments);
      }
      this._startLoadTime = e ? new Date() : undefined;
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _handleLoadError: function () {
    if (this.option(b) !== false) {
      this._isLoading = false;
      this.loadingChanged.fire(false);
    }
    this.callBase.apply(this, arguments);
  },
  _handleDataChanged: function (e) {
    if (this.option(b) === false) {
      this._items = this._dataSource.items().slice();
      this._totalCount = this._dataSourceTotalCount(true);
      this.callBase.apply(this, arguments);
      return;
    }
    var t = this.callBase.bind(this);
    this._virtualScrollController.handleDataChanged(t, e);
  },
  _customizeRemoteOperations: function (e, t) {
    var n = this.option(b) === false;
    var i = this.option("scrolling.renderAsync");
    if (!(0, d.isDefined)(i)) {
      i = this._renderTime >= this.option("scrolling.renderingThreshold");
    }
    if ((!!x(this) || !!w(this) && !!n) && !t.reload && (!!t.skip || !!n) && !i) {
      e.delay = undefined;
    }
    this.callBase.apply(this, arguments);
  },
  items: function () {
    return this._items;
  },
  _dataSourceTotalCount: function (e) {
    if (this.option(b) === false && x(this) && !e) {
      return this._totalCount;
    } else {
      return this.callBase();
    }
  },
  itemsCount: function (e) {
    if (e || this.option(b) === false) {
      return this.callBase();
    } else {
      return this._virtualScrollController.itemsCount();
    }
  },
  load: function (e) {
    if (this.option(b) === false || e) {
      return this.callBase(e);
    } else {
      return this._virtualScrollController.load();
    }
  },
  isLoading: function () {
    if (this.option(b) === false) {
      return this._dataSource.isLoading();
    } else {
      return this._isLoading;
    }
  },
  isLoaded: function () {
    return this._dataSource.isLoaded() && this._isLoaded;
  },
  resetPagesCache: function (e) {
    if (!e) {
      this._virtualScrollController.reset(true);
    }
    this.callBase.apply(this, arguments);
  },
  _changeRowExpandCore: function () {
    var e = this.callBase.apply(this, arguments);
    if (this.option(b) !== false) {
      this.resetPagesCache();
      m(this);
    }
    return e;
  },
  reload: function () {
    this._dataSource.pageIndex(this.pageIndex());
    var e = this._virtualScrollController;
    if (this.option(b) !== false && e) {
      var t = new a.Deferred();
      this.callBase.apply(this, arguments).done(function (n) {
        var i = e.getDelayDeferred();
        if (i) {
          i.done(t.resolve).fail(t.reject);
        } else {
          t.resolve(n);
        }
      }).fail(t.reject);
      return t;
    }
    return this.callBase.apply(this, arguments);
  },
  refresh: function (e, t) {
    if (this.option(b) !== false) {
      var n = e.storeLoadOptions;
      var i = this._dataSource;
      if (t.reload) {
        this._virtualScrollController.reset();
        i.items().length = 0;
        this._isLoaded = false;
        m(this);
        this._isLoaded = true;
        if (w(this)) {
          this.pageIndex(0);
          i.pageIndex(0);
          n.pageIndex = 0;
          e.pageIndex = 0;
          n.skip = 0;
        } else {
          i.pageIndex(this.pageIndex());
          if (i.paginate()) {
            e.pageIndex = this.pageIndex();
            n.skip = this.pageIndex() * this.pageSize();
          }
        }
      } else if (w(this) && n.skip && this._totalCountCorrection < 0) {
        n.skip += this._totalCountCorrection;
      }
    }
    return this.callBase.apply(this, arguments);
  },
  dispose: function () {
    this._virtualScrollController.dispose();
    this.callBase.apply(this, arguments);
  },
  loadPageCount: function (e) {
    if (!(0, d.isDefined)(e)) {
      return this._loadPageCount;
    }
    this._loadPageCount = e;
  },
  _handleDataLoading: function (e) {
    var t = this.loadPageCount();
    var n = this.pageSize();
    var i = this.option(b) === false;
    var o = e.storeLoadOptions;
    var a = (0, d.isDefined)(o.take);
    e.loadPageCount = t;
    if (!e.isCustomLoading && i && a && t > 1 && n > 0) {
      o.take = t * n;
    }
    this.callBase.apply(this, arguments);
  },
  _loadPageSize: function () {
    return this.callBase.apply(this, arguments) * this.loadPageCount();
  }
};
["beginPageIndex", "endPageIndex", "pageIndex"].forEach(function (e) {
  _[e] = function () {
    if (this.option(b) === false) {
      var t = this._dataSource;
      return t.pageIndex.apply(t, arguments);
    }
    var n = this._virtualScrollController;
    return n[e].apply(n, arguments);
  };
});
["virtualItemsCount", "getContentOffset", "getVirtualContentSize", "setContentItemSizes", "setViewportPosition", "getViewportItemIndex", "setViewportItemIndex", "getItemIndexByPosition", "viewportSize", "viewportItemSize", "getItemSize", "getItemSizes", "loadIfNeed"].forEach(function (e) {
  _[e] = function () {
    var t = this._virtualScrollController;
    return t[e].apply(t, arguments);
  };
});
var I = _;
v = function (e, t) {
  var n = e.toArray().map(function (e) {
    return (0, i.default)(e).parent(`.${t}`).get(0);
  }).filter(function (e) {
    return e;
  });
  if (n.length) {
    e = (0, i.default)(n);
  }
  for (var o = t === "dx-freespace-row" ? e.length - 1 : e.length, a = 0; a < o; a++) {
    e.eq(a).remove();
  }
};
var T = {
  init: function () {
    var e;
    var t = this;
    var n = this.getController("data");
    this.callBase();
    n.pageChanged.add(function (e) {
      var i = t._scrollTop;
      t.scrollToPage(e ?? n.pageIndex());
      if (t.option(b) === false && t._scrollTop === i) {
        n.updateViewport();
      }
    });
    n.dataSourceChanged.add(function () {
      if (!t._scrollTop) {
        t._scrollToCurrentPageOnResize();
      }
    });
    if ((e = n.stateLoaded) !== null && e !== undefined) {
      e.add(function () {
        t._scrollToCurrentPageOnResize();
      });
    }
    this._scrollToCurrentPageOnResize();
  },
  _scrollToCurrentPageOnResize: function () {
    var e = this;
    var t = this.getController("data");
    if (t.pageIndex() > 0) {
      this.resizeCompleted.add(function n() {
        e.resizeCompleted.remove(n);
        e.scrollToPage(t.pageIndex());
      });
    }
  },
  scrollToPage: function (e) {
    var t;
    var n = this._dataController;
    var i = n ? n.pageSize() : 0;
    if (x(this) || w(this)) {
      var o = n.getItemSize();
      var a = n.getItemSizes();
      var r = e * i;
      t = r * o;
      for (var s in a) {
        if (parseInt(s) < r) {
          t += a[s] - o;
        }
      }
    } else {
      t = 0;
    }
    this.scrollTo({
      y: t,
      x: this._scrollLeft
    });
  },
  renderDelayedTemplates: function () {
    var e = this;
    this.waitAsyncTemplates().done(function () {
      e._updateContentPosition(true);
    });
    this.callBase.apply(this, arguments);
  },
  _renderCore: function (e) {
    var t = new Date();
    var n = this.callBase.apply(this, arguments);
    var i = this._dataController._dataSource;
    if (i && e) {
      var o = e.items ? e.items.length : 20;
      var a = this._dataController.viewportSize() || 20;
      if (f.default.isVirtualRowRendering(this) && o > 0 && this.option(b) !== false) {
        i._renderTime = (new Date() - t) * a / o;
      } else {
        i._renderTime = new Date() - t;
      }
    }
    return n;
  },
  _getRowElements: function (e) {
    var t = this.callBase(e);
    return t && t.not(`.dx-virtual-row`);
  },
  _removeRowsElements: function (e, t, n) {
    var o = this._getRowElements(e).toArray();
    o = n === "append" ? o.slice(0, t) : o.slice(-t);
    var a = this.getController("errorHandling");
    o.map(function (e) {
      var t = (0, i.default)(e);
      if (a) {
        a.removeErrorRow(t.next());
      }
      t.remove();
    });
  },
  _updateContent: function (e, t) {
    var n;
    var i = this;
    var o = this._findContentElement();
    var r = t && t.changeType;
    var s = (0, a.Deferred)();
    var l = o.children().first();
    if (r === "append" || r === "prepend") {
      this.waitAsyncTemplates().done(function () {
        var o = i._getBodies(e);
        if (o.length === 1) {
          i._getBodies(l)[r === "append" ? "append" : "prepend"](o.children());
        } else {
          o[r === "append" ? "appendTo" : "prependTo"](l);
        }
        e.remove();
        n = i._getFreeSpaceRowElements(l);
        v(n, "dx-freespace-row");
        if (t.removeCount) {
          i._removeRowsElements(l, t.removeCount, r);
        }
        i._restoreErrorRow(l);
        s.resolve();
      }).fail(s.reject);
    } else {
      this.callBase.apply(this, arguments).done(function () {
        if (r === "update") {
          i._restoreErrorRow(l);
        }
        s.resolve();
      }).fail(s.reject);
    }
    return s.promise().done(function () {
      i._updateBottomLoading();
    });
  },
  _addVirtualRow: function (e, t, n, i) {
    if (i) {
      var o = this._createEmptyRow("dx-virtual-row", t, i);
      o = this._wrapRowIfNeed(e, o);
      this._appendEmptyRow(e, o, n);
    }
  },
  _updateContentItemSizes: function () {
    var e = this._getRowHeights();
    var t = this._correctRowHeights(e);
    this._dataController.setContentItemSizes(t);
  },
  _updateViewportSize: function (e, t) {
    if (!(0, d.isDefined)(e)) {
      e = this._hasHeight ? (0, u.getOuterHeight)(this.element()) : (0, u.getOuterHeight)((0, c.getWindow)());
    }
    this._dataController.viewportHeight(e, t);
  },
  _getRowHeights: function () {
    var e;
    var t;
    var n = (t = (e = this.getController("editing")) === null || e === undefined ? undefined : e.isPopupEditMode) === null || t === undefined ? undefined : t.call(e);
    var o = this._getRowElements(this._tableElement).toArray();
    if (n) {
      o = o.filter(function (e) {
        return !(0, i.default)(e).hasClass("dx-row-inserted");
      });
    }
    return o.map(function (e) {
      return (0, l.getBoundingRect)(e).height;
    });
  },
  _correctRowHeights: function (e) {
    var t = this._dataController;
    var n = t._dataSource;
    var i = [];
    var o = t.getVisibleRows();
    var a = 0;
    var r = true;
    var s = -1;
    for (var l = 0; l < e.length; l++) {
      var u = o[l];
      if ((0, d.isDefined)(u)) {
        if (this.option(b) === false) {
          if (s >= 0 && s !== u.loadIndex) {
            i.push(a);
            a = 0;
          }
          s = u.loadIndex;
        } else if (k(u, n)) {
          if (r) {
            r = false;
          } else {
            i.push(a);
            a = 0;
          }
        }
        a += e[l];
      }
    }
    if (a > 0) {
      i.push(a);
    }
    return i;
  },
  _updateContentPosition: function (e) {
    var t = this;
    var n = this._dataController;
    var o = this._rowHeight || 20;
    n.viewportItemSize(o);
    if (x(this) || f.default.isVirtualRowRendering(this)) {
      if (!e) {
        this._updateContentItemSizes();
      }
      var a = n.getContentOffset("begin");
      var r = n.getContentOffset("end");
      var s = this.getTableElements();
      var l = s.children("tbody").children(`.dx-virtual-row`);
      v(l, "dx-virtual-row");
      s.each(function (e, n) {
        var o = e > 0;
        var s = t._isFixedTableRendering;
        t._isFixedTableRendering = o;
        t._addVirtualRow((0, i.default)(n), o, "top", a);
        t._addVirtualRow((0, i.default)(n), o, "bottom", r);
        t._isFixedTableRendering = s;
      });
    }
  },
  _isTableLinesDisplaysCorrect: function (e) {
    return e.find(`.dx-column-lines`).length > 0 === this.option("showColumnLines");
  },
  _isColumnElementsEqual: function (e, t) {
    var n = e.length === t.length;
    if (n) {
      (0, s.each)(e, function (e, i) {
        if (i.style.width !== t[e].style.width) {
          return n = false;
        }
      });
    }
    return n;
  },
  _getCellClasses: function (e) {
    var t = [];
    var n = e.cssClass;
    var i = e.command === "expand";
    if (n) {
      t.push(n);
    }
    if (i) {
      t.push(this.addWidgetPrefix("group-space"));
    }
    return t;
  },
  _findBottomLoadPanel: function (e) {
    var t = e || this.element();
    var n = t && t.find(`.${this.addWidgetPrefix("bottom-load-panel")}`);
    if (n && n.length) {
      return n;
    }
  },
  _updateBottomLoading: function () {
    var e = x(this);
    var t = w(this);
    var n = !this._dataController.hasKnownLastPage() && this._dataController.isLoaded() && (e || t);
    var o = this._findContentElement();
    var a = this._findBottomLoadPanel(o);
    if (n) {
      if (!a) {
        (0, i.default)("<div>").addClass(this.addWidgetPrefix("bottom-load-panel")).append(this._createComponent((0, i.default)("<div>"), h.default).$element()).appendTo(o);
      }
    } else if (a) {
      a.remove();
    }
  },
  _handleScroll: function (e) {
    var t = this.option(b) === true;
    var n = e.scrollOffset.top === 0;
    var i = this._scrollTop !== e.scrollOffset.top;
    var o = i || e.forceUpdateScrollPosition;
    var a = this._hasHeight || !t && n;
    if (o && a && this._rowHeight) {
      this._scrollTop = e.scrollOffset.top;
      var r = x(this) || this.option("scrolling.rowRenderingMode") !== "standard";
      if (r && this.option(b) === false) {
        this._updateContentItemSizes();
        this._updateViewportSize(null, this._scrollTop);
      }
      this._dataController.setViewportPosition(e.scrollOffset.top);
    }
    this.callBase.apply(this, arguments);
  },
  _needUpdateRowHeight: function (e) {
    return this.callBase.apply(this, arguments) || e > 0 && w(this) && !f.default.isVirtualRowRendering(this);
  },
  _updateRowHeight: function () {
    this.callBase.apply(this, arguments);
    if (this._rowHeight) {
      this._updateContentPosition();
      var e = this._hasHeight ? (0, u.getOuterHeight)(this.element()) : (0, u.getOuterHeight)((0, c.getWindow)());
      var t = this._dataController;
      if (this.option(b) === false) {
        this._updateViewportSize(e);
        t.updateViewport();
      } else {
        t.viewportSize(Math.ceil(e / this._rowHeight));
      }
    }
  },
  updateFreeSpaceRowHeight: function () {
    var e = this.callBase.apply(this, arguments);
    if (e) {
      this._updateContentPosition();
    }
    return e;
  },
  setLoading: function (e, t) {
    var n = this._dataController;
    var i = n.pageIndex() > 0 && n.isLoaded() && !!this._findBottomLoadPanel();
    if (this.option(b) !== false || !e || !n.isViewportChanging()) {
      if (i) {
        e = false;
      }
      this.callBase.call(this, e, t);
    }
  },
  _resizeCore: function () {
    var e = this;
    var t = e.element();
    e.callBase();
    if (e.component.$element() && !e._windowScroll && (0, r.isElementInDom)(t)) {
      e._windowScroll = (0, p.subscribeToExternalScrollers)(t, function (t) {
        if (!e._hasHeight && e._rowHeight) {
          e._dataController.setViewportPosition(t);
        }
      }, e.component.$element());
      e.on("disposing", function () {
        e._windowScroll.dispose();
      });
    }
    if (this.option(b) !== false) {
      e.loadIfNeed();
    }
  },
  loadIfNeed: function () {
    var e;
    var t = this._dataController;
    if ((e = t == null ? undefined : t.loadIfNeed) !== null && e !== undefined) {
      e.call(t);
    }
  },
  setColumnWidths: function (e) {
    var t;
    var n = this.getScrollable();
    this.callBase.apply(this, arguments);
    if (this.option("scrolling.mode") === "virtual") {
      t = n ? (0, i.default)(n.content()) : this.element();
      this.callBase(e, t.children(`.${this.addWidgetPrefix("content")}`).children(`:not(.${this.addWidgetPrefix("table-content")})`));
    }
  },
  _restoreErrorRow: function () {
    if (this.option(b) === false) {
      var e = this.getController("errorHandling");
      if (e != null) {
        e.removeErrorRow();
      }
    }
    this.callBase.apply(this, arguments);
  },
  dispose: function () {
    clearTimeout(this._scrollTimeoutID);
    this.callBase();
  }
};
var E = {
  defaultOptions: function () {
    return {
      scrolling: {
        timeout: 300,
        updateTimeout: 300,
        minTimeout: 0,
        renderingThreshold: 100,
        removeInvisiblePages: true,
        rowPageSize: 5,
        prerenderedRowChunkSize: 1,
        mode: "standard",
        preloadEnabled: false,
        rowRenderingMode: "standard",
        loadTwoPagesOnStart: false,
        legacyMode: false,
        prerenderedRowCount: 1
      }
    };
  },
  extenders: {
    dataSourceAdapter: I,
    controllers: {
      data: (y = {
        _refreshDataSource: function () {
          var e = this.callBase.apply(this, arguments) || new a.Deferred().resolve().promise();
          e.done(this.initVirtualRows.bind(this));
          return e;
        },
        _loadDataSource: function () {
          var e;
          if (this._rowsScrollController && C(this)) {
            var t = (0, d.isDefined)(this._loadViewportParams) ? this.getLoadPageParams() : {
              loadPageCount: undefined
            };
            var n = t.loadPageCount;
            if (n >= 1) {
              if ((e = this._dataSource) !== null && e !== undefined) {
                e.loadPageCount(n);
              }
            }
          }
          return this.callBase.apply(this, arguments);
        },
        getRowPageSize: function () {
          var e = this.option("scrolling.rowPageSize");
          var t = this.pageSize();
          if (t && t < e) {
            return t;
          } else {
            return e;
          }
        },
        reload: function () {
          var e = this;
          var t = this._rowsScrollController || this._dataSource;
          var n = t && t.getItemIndexByPosition();
          var a = this.callBase.apply(this, arguments);
          return a && a.done(function () {
            if (x(e) || f.default.isVirtualRowRendering(e)) {
              var a = e.getRowIndexOffset();
              var r = Math.floor(n) - a;
              var s = e.component;
              var l = s.getScrollable && s.getScrollable();
              var d = e.dataSource().operationTypes().sorting;
              if (l && !d && r >= 0) {
                var c = s.getRowElement(r);
                var h = c && c[0] && (0, i.default)(c[0]);
                var p = h && h.position().top;
                var g = o.default.chrome && Number(o.default.version ?? 0) >= 91;
                if (p > (o.default.mozilla || g ? 1 : 0)) {
                  p = Math.round(p + (0, u.getOuterHeight)(h) * (n % 1));
                  l.scrollTo({
                    y: p
                  });
                }
              }
            }
          });
        },
        initVirtualRows: function () {
          var e = this;
          var t = f.default.isVirtualRowRendering(this);
          this._allItems = null;
          this._loadViewportParams = null;
          if (this.option("scrolling.mode") !== "virtual" && !t || !t || this.option(b) !== false && !this.option("scrolling.rowPageSize")) {
            this._visibleItems = null;
            this._rowsScrollController = null;
            return;
          }
          var n = !x(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
          this._rowPageIndex = Math.ceil(n * this.pageSize() / this.getRowPageSize());
          this._visibleItems = this.option(b) === false ? null : [];
          this._viewportChanging = false;
          this._needUpdateViewportAfterLoading = false;
          if (!this._rowsScrollController) {
            this._rowsScrollController = new p.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
            this._rowsScrollController.positionChanged.add(function () {
              var t;
              if (e.option(b) === false) {
                e._viewportChanging = true;
                e.loadViewport();
                e._viewportChanging = false;
                return;
              }
              if ((t = e._dataSource) !== null && t !== undefined) {
                t.setViewportItemIndex(e._rowsScrollController.getViewportItemIndex());
              }
            });
          }
          if (this.option(b) === false) {
            this._updateLoadViewportParams();
          }
          if (this.isLoaded() && this.option(b) !== false) {
            this._rowsScrollController.load();
          }
        },
        isViewportChanging: function () {
          return this._viewportChanging;
        },
        _getRowsScrollDataOptions: function () {
          var e = this;
          function t(t) {
            return k(t, e._dataSource);
          }
          return {
            pageSize: function () {
              return e.getRowPageSize();
            },
            loadedOffset: function () {
              var t;
              return x(e) && ((t = e._dataSource) === null || t === undefined ? undefined : t.lastLoadOptions().skip) || 0;
            },
            loadedItemCount: function () {
              return e._itemCount;
            },
            totalItemsCount: function () {
              if (C(e)) {
                return e.totalItemsCount();
              } else if (e.option(b) === false) {
                return e._itemCount;
              } else {
                return e._items.filter(t).length;
              }
            },
            hasKnownLastPage: function () {
              return e.option(b) !== false || e.hasKnownLastPage();
            },
            pageIndex: function (t) {
              if (t !== undefined) {
                e._rowPageIndex = t;
              }
              return e._rowPageIndex;
            },
            isLoading: function () {
              return e.isLoading();
            },
            pageCount: function () {
              var e = Math.ceil(this.totalItemsCount() / this.pageSize());
              return e || 1;
            },
            load: function () {
              if (e._rowsScrollController.pageIndex() >= this.pageCount()) {
                e._rowPageIndex = this.pageCount() - 1;
                e._rowsScrollController.pageIndex(e._rowPageIndex);
              }
              if (!!this.items().length || !this.totalItemsCount()) {
                e._rowsScrollController.handleDataChanged(function (t) {
                  (t = t || {}).changeType = t.changeType || "refresh";
                  t.items = t.items || e._visibleItems;
                  e._visibleItems.forEach(function (e, t) {
                    e.rowIndex = t;
                  });
                  e._fireChanged(t);
                });
              }
            },
            updateLoading: function () {},
            itemsCount: function () {
              return this.items(true).length;
            },
            correctCount: function (e, n, i) {
              return S(e, n, i, function (e, n, i) {
                if (e.isNewRow) {
                  return n && !i;
                } else if (n && i) {
                  return !e.isNewRow;
                } else {
                  return t(e);
                }
              });
            },
            items: function (n) {
              var i = e._items;
              if (e.option(b)) {
                var o = e.dataSource();
                var a = o == null ? undefined : o.virtualItemsCount();
                var r = a ? a.begin : 0;
                var s = e.getRowPageSize();
                var l = e._rowPageIndex * s - r;
                var u = s;
                if (l < 0) {
                  return [];
                }
                if (l) {
                  l = this.correctCount(i, l);
                  i = i.slice(l);
                }
                if (u) {
                  u = this.correctCount(i, u);
                  i = i.slice(0, u);
                }
              }
              if (n) {
                return i.filter(t);
              } else {
                return i;
              }
            },
            viewportItems: function (t) {
              if (t && e.option(b) !== false) {
                e._visibleItems = t;
              }
              return e._visibleItems;
            },
            onChanged: function () {},
            changingDuration: function () {
              var t = e.dataSource();
              if ((t == null ? undefined : t.isLoading()) && e.option(b) !== false) {
                return 300;
              } else {
                return (t == null ? undefined : t._renderTime) || 0;
              }
            }
          };
        },
        _updateItemsCore: function (e) {
          var t = this;
          var n = this.getRowIndexDelta();
          this.callBase.apply(this, arguments);
          if (this.option(b) === false && f.default.isVirtualRowRendering(this)) {
            if (e.changeType === "update" && e.rowIndices.length === 0 && e.cancelEmptyChanges) {
              e.cancel = true;
            }
          } else {
            var i = this._rowsScrollController;
            if (i) {
              var o = this._visibleItems;
              var a = e.changeType === "refresh" || e.isLiveUpdate;
              if (e.changeType === "append" && e.items && !e.items.length) {
                return;
              }
              if (a || e.changeType === "append" || e.changeType === "prepend") {
                e.cancel = true;
                if (a) {
                  i.reset(true);
                }
                i.load();
              } else {
                if (e.changeType === "update") {
                  e.rowIndices.forEach(function (t, n) {
                    var i = e.changeTypes[n];
                    var a = e.items[n];
                    if (i === "update") {
                      o[t] = a;
                    } else if (i === "insert") {
                      o.splice(t, 0, a);
                    } else if (i === "remove") {
                      o.splice(t, 1);
                    }
                  });
                } else {
                  o.forEach(function (e, i) {
                    o[i] = t._items[i + n] || o[i];
                  });
                  e.items = o;
                }
                D(o);
              }
            }
          }
        },
        _updateLoadViewportParams: function () {
          var e = this._rowsScrollController.getViewportParams();
          var t = this.pageSize();
          if (e && !C(this) && t > 0) {
            var n = this.pageIndex() * t;
            e.skip += n;
          }
          this._loadViewportParams = e;
        },
        _processItems: function () {
          var t = this.callBase.apply(this, arguments);
          if (this.option(b) === false) {
            var n;
            var i;
            var o;
            var a = this._dataSource;
            var r = (a == null ? undefined : a.lastLoadOptions().skip) ?? 0;
            var s = false;
            var l = [];
            t.forEach(function (e) {
              var t = e.rowType;
              var u = k(e, a);
              var c = t === "group" && (n || u || i !== "group" && r > 0);
              var h = t === "data" && u && (n || i !== "group");
              if (!e.isNewRow && (0, d.isDefined)(n)) {
                if ((!!c || !!h) && (!o || !!s)) {
                  r++;
                }
              }
              if (c || h) {
                s = true;
              }
              if (e.isNewRow) {
                l.push(e);
              } else {
                l.forEach(function (e) {
                  e.loadIndex = r;
                });
                l = [];
              }
              e.loadIndex = r;
              n = u;
              i = t;
              o = e.isNewRow;
            });
            l.forEach(function (e) {
              e.loadIndex = r;
            });
          }
          return t;
        },
        _afterProcessItems: function (e) {
          var t = this;
          this._itemCount = e.filter(function (e) {
            return k(e, t._dataSource);
          }).length;
          if ((0, d.isDefined)(this._loadViewportParams)) {
            this._updateLoadViewportParams();
            var n = e;
            this._allItems = e;
            if (e.length) {
              var i = this.getLoadPageParams(true);
              var o = i.skipForCurrentPage;
              var a = e[0].loadIndex + o;
              var r = this._loadViewportParams.take;
              n = e.filter(function (e) {
                var t = e.isNewRow && e.loadIndex === a && r === 0;
                var n = e.loadIndex >= a;
                var i = e.loadIndex < a + r || t;
                return n && i;
              });
            }
            return n;
          }
          return this.callBase.apply(this, arguments);
        },
        _applyChange: function (e) {
          var t = this;
          var n = e.items;
          var i = e.changeType;
          var o = e.removeCount;
          if (o) {
            var a = i === "prepend";
            o = S(t._items, o, a, function (e, n) {
              return e.rowType === "data" && !e.isNewRow || e.rowType === "group" && (t._dataSource.isGroupItemCountable(e.data) || n);
            });
            e.removeCount = o;
          }
          switch (i) {
            case "prepend":
              t._items.unshift.apply(t._items, n);
              if (o) {
                t._items.splice(-o);
              }
              break;
            case "append":
              t._items.push.apply(t._items, n);
              if (o) {
                t._items.splice(0, o);
              }
              break;
            default:
              t.callBase(e);
          }
        },
        items: function (e) {
          if (e) {
            return this._allItems || this._items;
          } else {
            return this._visibleItems || this._items;
          }
        },
        getRowIndexDelta: function () {
          var e = 0;
          if (this.option(b)) {
            var t = this._visibleItems;
            if (t && t[0]) {
              e = this._items.indexOf(t[0]);
            }
          }
          if (e < 0) {
            return 0;
          } else {
            return e;
          }
        },
        getRowIndexOffset: function (e) {
          var n = 0;
          var i = this.dataSource();
          var o = this._rowsScrollController;
          var a = this.option(b) === false;
          var r = C(this);
          if (o && !e) {
            if (a && (0, d.isDefined)(this._loadViewportParams)) {
              var s = this.getLoadPageParams(true);
              var l = s.skipForCurrentPage;
              var u = s.pageIndex;
              var c = this.items(true);
              n = r ? u * this.pageSize() : 0;
              if (c.length) {
                var h = c[0].loadIndex;
                n += c.filter(function (e) {
                  return e.loadIndex < h + l;
                }).length;
              }
            } else {
              n = o.beginPageIndex() * o.pageSize();
            }
          } else if (r && a && i) {
            n = i.lastLoadOptions().skip ?? 0;
          } else if (x(this) && i) {
            n = i.beginPageIndex() * i.pageSize();
          }
          return n;
        },
        getDataIndex: function () {
          if (this.option(b) === false) {
            return this.getRowIndexOffset(true);
          } else {
            return this.callBase.apply(this, arguments);
          }
        },
        viewportSize: function () {
          var e = this._rowsScrollController;
          var t = this._dataSource;
          var n = e == null ? undefined : e.viewportSize.apply(e, arguments);
          if (this.option(b) === false) {
            return n;
          } else if (t == null) {
            return undefined;
          } else {
            return t.viewportSize.apply(t, arguments);
          }
        },
        viewportHeight: function (e, t) {
          var n;
          if ((n = this._rowsScrollController) !== null && n !== undefined) {
            n.viewportHeight(e, t);
          }
        },
        viewportItemSize: function () {
          var e = this._rowsScrollController;
          var t = this._dataSource;
          var n = e == null ? undefined : e.viewportItemSize.apply(e, arguments);
          if (this.option(b) === false) {
            return n;
          } else if (t == null) {
            return undefined;
          } else {
            return t.viewportItemSize.apply(t, arguments);
          }
        },
        setViewportPosition: function () {
          var e = this._rowsScrollController;
          var t = this._dataSource;
          this._isPaging = false;
          if (e) {
            e.setViewportPosition.apply(e, arguments);
          } else if (t != null) {
            t.setViewportPosition.apply(t, arguments);
          }
        },
        setContentItemSizes: function (e) {
          var t = this._rowsScrollController;
          var n = this._dataSource;
          var i = t == null ? undefined : t.setContentItemSizes(e);
          if (this.option(b) === false) {
            return i;
          } else if (n == null) {
            return undefined;
          } else {
            return n.setContentItemSizes(e);
          }
        },
        getPreloadedRowCount: function () {
          var e = this.option("scrolling.preloadedRowCount");
          var t = this.option("scrolling.preloadEnabled");
          if ((0, d.isDefined)(e)) {
            return e;
          }
          var n = this.viewportSize();
          if (t) {
            return n * 2;
          } else {
            return n;
          }
        },
        getLoadPageParams: function (e) {
          var t;
          var n;
          var i = this.pageSize();
          var o = this._loadViewportParams;
          var a = (t = this._dataSource) === null || t === undefined ? undefined : t.lastLoadOptions();
          var r = (a == null ? undefined : a.pageIndex) || 0;
          var s = (a == null ? undefined : a.take) || 0;
          var l = this._rowsScrollController.isScrollingBack();
          var u = l ? this.getPreloadedRowCount() : 0;
          var d = l ? 0 : this.getPreloadedRowCount();
          var c = ((n = this._dataSource) === null || n === undefined ? undefined : n.totalCountCorrection()) || 0;
          var h = Math.max(0, o.skip - u);
          var f = e ? r : Math.floor(i ? h / i : 0);
          var p = f * i;
          var g = o.skip - p;
          var m = o.take + g + d - c;
          var _ = e ? s : m;
          var v = Math.ceil(i ? _ / i : 0);
          return {
            pageIndex: f,
            loadPageCount: Math.max(1, v),
            skipForCurrentPage: Math.max(0, g)
          };
        },
        _updateVisiblePageIndex: function (e) {
          if (this._rowsScrollController) {
            if ((0, d.isDefined)(e)) {
              this._silentOption("paging.pageIndex", e);
              this.pageChanged.fire();
              return;
            }
            var t = this._rowsScrollController.getViewportItemIndex();
            var n = Math.floor(t / this.pageSize());
            if (this.pageIndex() !== n) {
              this._silentOption("paging.pageIndex", n);
              this.updateItems({
                changeType: "pageIndex"
              });
            }
          }
        },
        _getChangedLoadParams: function () {
          var e = this.getLoadPageParams(true);
          var t = this.getLoadPageParams();
          var n = t.pageIndex;
          var i = t.loadPageCount;
          var o = this._pageIndexIsValid(n);
          var a = null;
          if (!this._isLoading && !!o && (n !== e.pageIndex || i !== e.loadPageCount)) {
            a = {
              pageIndex: n,
              loadPageCount: i
            };
          }
          return a;
        },
        _pageIndexIsValid: function (e) {
          var t = true;
          if (w(this) && this.hasKnownLastPage() || x(this)) {
            t = e * this.pageSize() < this.totalItemsCount();
          }
          return t;
        },
        _loadItems: function (e, t) {
          var o = this;
          var a = C(this);
          var r = this._dataSource;
          var s = this._getChangedLoadParams();
          var l = (r == null ? undefined : r.loadPageCount()) ?? 0;
          var u = this.pageSize() * l;
          var d = (r == null ? undefined : r.pageIndex()) ?? 0;
          var c = (s == null ? undefined : s.pageIndex) === d;
          var h = w(this) && this.totalItemsCount() < u;
          var f = this.option("editing.refreshMode") === "repaint";
          var p = (s == null ? undefined : s.pageIndex) > d;
          var g = false;
          if (!r || a && e && (f && t || p || c && h)) {
            return g;
          }
          if (a && this._isLoading) {
            this._needUpdateViewportAfterLoading = true;
          }
          if (a && s) {
            g = true;
            r.pageIndex(s.pageIndex);
            r.loadPageCount(s.loadPageCount);
            this._repaintChangesOnly = true;
            this._needUpdateDimensions = true;
            var m = this._viewportChanging;
            this.load().always(function () {
              o._repaintChangesOnly = undefined;
              o._needUpdateDimensions = undefined;
            }).done(function () {
              var e = o.pageCount() > 0 && o.pageIndex() === o.pageCount() - 1;
              if (m || e) {
                o._updateVisiblePageIndex();
              }
              if (o._needUpdateViewportAfterLoading) {
                o._needUpdateViewportAfterLoading = false;
                o.loadViewport({
                  checkLoadedParamsOnly: true
                });
              }
            });
          }
          return g;
        },
        loadViewport: function (e) {
          var t;
          var i = e ?? {};
          var o = i.checkLoadedParamsOnly;
          var a = i.checkLoading;
          var r = i.viewportIsNotFilled;
          if ((C(this) || f.default.isVirtualRowRendering(this)) && (this._updateLoadViewportParams(), !this._loadItems(a, !r) && (!this._isLoading || !a) && !o)) {
            var s = !((t = this.getController("editing")) === null || t === undefined ? undefined : t.getChanges())?.length;
            this.updateItems({
              repaintChangesOnly: true,
              needUpdateDimensions: true,
              useProcessedItemsCache: s,
              cancelEmptyChanges: true
            });
          }
        },
        updateViewport: function () {
          var n = this.viewportSize();
          var i = this.items().length;
          var o = n > i;
          var a = this._loadViewportParams?.take ?? 0;
          var r = this._rowsScrollController;
          var s = r == null ? undefined : r.getViewportParams().take;
          if ((o || a < s) && !this._isPaging && i) {
            this.loadViewport({
              checkLoading: true,
              viewportIsNotFilled: o
            });
          }
        },
        loadIfNeed: function () {
          if (this.option(b) !== false) {
            var e = this._rowsScrollController;
            if (e) {
              e.loadIfNeed();
            }
            var t = this._dataSource;
            return t && t.loadIfNeed();
          }
        },
        getItemSize: function () {
          var e = this._rowsScrollController;
          if (e) {
            return e.getItemSize.apply(e, arguments);
          }
          var t = this._dataSource;
          return t && t.getItemSize.apply(t, arguments);
        },
        getItemSizes: function () {
          var e = this._rowsScrollController;
          if (e) {
            return e.getItemSizes.apply(e, arguments);
          }
          var t = this._dataSource;
          return t && t.getItemSizes.apply(t, arguments);
        },
        getContentOffset: function () {
          var e = this._rowsScrollController;
          if (e) {
            return e.getContentOffset.apply(e, arguments);
          }
          var t = this._dataSource;
          return t && t.getContentOffset.apply(t, arguments);
        },
        refresh: function (e) {
          var t = this._dataSource;
          if (t && e && e.load && w(this)) {
            t.resetCurrentTotalCount();
          }
          return this.callBase.apply(this, arguments);
        },
        dispose: function () {
          var e = this._rowsScrollController;
          if (e) {
            e.dispose();
          }
          this.callBase.apply(this, arguments);
        },
        topItemIndex: function () {
          return this._loadViewportParams?.skip;
        },
        bottomItemIndex: function () {
          var e = this._loadViewportParams;
          return e && e.skip + e.take;
        },
        virtualItemsCount: function () {
          var e = this._rowsScrollController;
          if (e) {
            return e.virtualItemsCount.apply(e, arguments);
          }
          var t = this._dataSource;
          if (t == null) {
            return undefined;
          } else {
            return t.virtualItemsCount.apply(t, arguments);
          }
        },
        pageIndex: function (e) {
          var n = C(this);
          var i = this._rowsScrollController;
          if (this.option(b) === false && n && i && e === undefined) {
            return this.option("paging.pageIndex") ?? 0;
          } else {
            return this.callBase.apply(this, arguments);
          }
        },
        _fireChanged: function (e) {
          this.callBase.apply(this, arguments);
          var t = e.operationTypes;
          if (this.option(b) === false && C(this) && t) {
            var n = t.fullReload;
            var i = t.pageIndex;
            if (e.isDataChanged && !n && i) {
              this._updateVisiblePageIndex(this._dataSource.pageIndex());
            }
          }
        },
        _getPagingOptionValue: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (this.option(b) === false && C(this)) {
            t = this[e]();
          }
          return t;
        },
        isEmpty: function () {
          if (this.option(b) === false) {
            return !this.items(true).length;
          } else {
            return this.callBase(this, arguments);
          }
        },
        isLastPageLoaded: function () {
          var e = false;
          if (this.option(b) === false && C(this)) {
            var t = this.getLoadPageParams(true);
            var n = t.pageIndex;
            var i = t.loadPageCount;
            var o = this.pageCount();
            e = n + i >= o;
          } else {
            e = this.callBase.apply(this, arguments);
          }
          return e;
        },
        reset: function () {
          this._itemCount = 0;
          this._allItems = null;
          this.callBase.apply(this, arguments);
        },
        _applyFilter: function () {
          var e;
          if ((e = this._dataSource) !== null && e !== undefined) {
            e.loadPageCount(1);
          }
          this.callBase.apply(this, arguments);
        }
      }, f.default.proxyMethod(y, "getVirtualContentSize"), f.default.proxyMethod(y, "setViewportItemIndex"), y),
      resizing: {
        _updateMasterDataGridCore: function (e) {
          return (0, a.when)(this.callBase.apply(this, arguments)).done(function (t) {
            var n = x(e) && e.option(b) === false;
            if (!t && n) {
              if (e.getScrollable()) {
                e.updateDimensions();
              }
            }
          });
        },
        hasResizeTimeout: function () {
          return !!this._resizeTimeout;
        },
        resize: function () {
          var e;
          var t = this;
          var n = this.callBase;
          if (x(this) || f.default.isVirtualRowRendering(this)) {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = null;
            var i = new Date() - this._lastTime;
            var o = this.option("scrolling.updateTimeout");
            if (this._lastTime && i < o) {
              e = new a.Deferred();
              this._resizeTimeout = setTimeout(function () {
                t._resizeTimeout = null;
                n.apply(t).done(e.resolve).fail(e.reject);
                t._lastTime = new Date();
              }, o);
              this._lastTime = new Date();
            } else {
              e = n.apply(this);
              if (this._dataController.isLoaded()) {
                this._lastTime = new Date();
              }
            }
          } else {
            e = n.apply(this);
          }
          return e;
        },
        dispose: function () {
          this.callBase.apply(this, arguments);
          clearTimeout(this._resizeTimeout);
        }
      }
    },
    views: {
      rowsView: T
    }
  }
};
exports.virtualScrollingModule = E;