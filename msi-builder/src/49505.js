Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsResizingReorderingModule = undefined;
var i = y(require("./87209.js"));
var o = y(require("./73349.js"));
var a = y(require("./68374.js"));
var r = y(require("./44504.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./37518.js");
var d = require("./58664.js");
var c = require("./35922.js");
var h = y(require("./55994.js"));
var f = require("./23174.js");
var p = y(require("./93786.js"));
var g = require("./39611.js");
var m = y(require("./92591.js"));
var _ = y(require("./15943.js"));
var v = y(require("./60082.js"));
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = "dxDataGridResizingReordering";
function x(e) {
  return e.option("allowColumnResizing") || e.getController("columns").isColumnOptionUsed("allowResizing");
}
function w(e) {
  return e.option("allowColumnReordering") || e.getController("columns").isColumnOptionUsed("allowReordering");
}
var C = _.default.View.inherit({
  _renderCore: function () {
    var e = this.callBase();
    this.element().addClass(this.addWidgetPrefix("tracker"));
    this.hide();
    return e;
  },
  _unsubscribeFromCallback: function () {
    if (this._positionChanged) {
      this._tablePositionController.positionChanged.remove(this._positionChanged);
    }
  },
  _subscribeToCallback: function () {
    var e = this;
    e._positionChanged = function (t) {
      var n = e.element();
      if (n && n.hasClass(e.addWidgetPrefix("tracker"))) {
        n.css({
          top: t.top
        });
        (0, d.setHeight)(n, t.height);
      }
    };
    this._tablePositionController.positionChanged.add(e._positionChanged);
  },
  optionChanged: function (e) {
    if (e.name === "allowColumnResizing") {
      this._unsubscribeFromCallback();
      if (e.value) {
        this._subscribeToCallback();
        this._invalidate();
      }
    }
    this.callBase(e);
  },
  init: function () {
    this.callBase();
    this._tablePositionController = this.getController("tablePosition");
    this._subscribeToCallback();
  },
  isVisible: function () {
    return x(this);
  },
  show: function () {
    this.element().show();
  },
  hide: function () {
    if (this.element()) {
      this.element().hide();
    }
  },
  setHeight: function (e) {
    (0, d.setHeight)(this.element(), e);
  },
  dispose: function () {
    this._unsubscribeFromCallback();
    this.callBase();
  }
});
var S = _.default.View.inherit({
  _renderSeparator: function () {},
  _renderCore: function (e) {
    var t = this.callBase(e);
    this._isShown = true;
    this._renderSeparator();
    this.hide();
    return t;
  },
  show: function () {
    this._isShown = true;
  },
  hide: function () {
    this._isShown = false;
  },
  height: function (e) {
    var t = this.element();
    if (t) {
      if (!(0, c.isDefined)(e)) {
        return (0, d.getHeight)(t);
      }
      (0, d.setHeight)(t, e);
    }
  },
  width: function (e) {
    var t = this.element();
    if (t) {
      if (!(0, c.isDefined)(e)) {
        return (0, d.getWidth)(t);
      }
      (0, d.setWidth)(t, e);
    }
  }
});
var k = S.inherit({
  _renderSeparator: function () {
    this.callBase();
    this.element().addClass(this.addWidgetPrefix("columns-separator"));
  },
  _subscribeToCallback: function () {
    var e;
    var t = this;
    t._positionChanged = function (n) {
      if (e = t.element()) {
        e.css({
          top: n.top
        });
        (0, d.setHeight)(e, n.height);
      }
    };
    t._tablePositionController.positionChanged.add(t._positionChanged);
  },
  _unsubscribeFromCallback: function () {
    if (this._positionChanged) {
      this._tablePositionController.positionChanged.remove(this._positionChanged);
    }
  },
  _init: function () {
    this._isTransparent = x(this);
    if (this.isVisible()) {
      this._subscribeToCallback();
    }
  },
  isVisible: function () {
    return this.option("showColumnHeaders") && (w(this) || x(this));
  },
  optionChanged: function (e) {
    if (e.name === "allowColumnResizing") {
      if (e.value) {
        this._init();
        this._invalidate();
        this.hide(true);
      } else {
        this._unsubscribeFromCallback();
        this._isTransparent = x(this);
        this.hide(true);
      }
    }
    this.callBase(e);
  },
  init: function () {
    this.callBase();
    this._tablePositionController = this.getController("tablePosition");
    this._init();
  },
  show: function () {
    var e = this.element();
    if (e && !this._isShown) {
      if (this._isTransparent) {
        e.removeClass(this.addWidgetPrefix("columns-separator-transparent"));
      } else {
        e.show();
      }
    }
    this.callBase();
  },
  hide: function (e) {
    var t = this.element();
    var n = this.addWidgetPrefix("columns-separator-transparent");
    if (t && (this._isShown || e)) {
      if (this._isTransparent) {
        t.addClass(n);
        t.css("left", "");
        t.show();
      } else {
        if (t.hasClass(n)) {
          t.removeClass(n);
        }
        t.hide();
      }
    }
    this.callBase();
  },
  moveByX: function (e) {
    var t = this.element();
    if (t) {
      t.css("left", e === null ? 0 : e - this._parentElement().offset().left);
    }
  },
  changeCursor: function (e) {
    e = (0, c.isDefined)(e) ? e : "";
    var t = this.element();
    if (t) {
      t.css("cursor", e);
    }
  },
  dispose: function () {
    this._unsubscribeFromCallback();
    this.callBase();
  }
});
var D = S.inherit({
  init: function () {
    var e = this;
    this.callBase();
    this.getController("data").loadingChanged.add(function (t) {
      if (!t) {
        e.hide();
      }
    });
  },
  _renderSeparator: function () {
    this.callBase();
    this.element().addClass("dx-block-separator").html("&nbsp;");
  },
  hide: function () {
    var e = this._parentElement();
    var t = this.element();
    if (t && this._isShown) {
      t.css("display", "none");
    }
    if (e && !e.children(`.dx-block-separator`).length) {
      e.prepend(this.element());
    }
    this.callBase();
  },
  isVisible: function () {
    var e = this.option("groupPanel");
    var t = this.option("columnChooser");
    return e && e.visible || t && t.enabled;
  },
  show: function (e) {
    var t = this.element();
    function n(e) {
      i.default.stop(t, true);
      i.default.animate(t, {
        type: "slide",
        from: {
          width: 0,
          display: e.display
        },
        to: e,
        duration: 300,
        easing: "swing"
      });
    }
    if (t && !this._isShown) {
      switch (e) {
        case "group":
          n({
            width: "50px",
            display: "inline-block"
          });
          break;
        case "columnChooser":
          n({
            width: "100%",
            display: "block"
          });
          break;
        default:
          t.css("display", "");
      }
    }
    this.callBase();
  }
});
var I = _.default.View.inherit({
  _isDragging: false,
  isDragging: function () {
    return this._isDragging;
  },
  _getDraggingPanelByPos: function (e) {
    var t;
    (0, l.each)(this._dragOptions.draggingPanels, function (n, i) {
      if (i) {
        var o = i.getBoundingRect();
        if (o && (o.bottom === undefined || e.y < o.bottom) && (o.top === undefined || e.y > o.top) && (o.left === undefined || e.x > o.left) && (o.right === undefined || e.x < o.right)) {
          t = i;
          return false;
        }
      }
    });
    return t;
  },
  _renderCore: function () {
    this.element().addClass(`${this.addWidgetPrefix("drag-header")} ${this.addWidgetPrefix("text-content")} dx-widget`).hide();
  },
  _resetTargetColumnOptions: function () {
    var e = this._dropOptions;
    e.targetColumnIndex = -1;
    delete e.targetColumnElement;
    delete e.isLast;
    delete e.posX;
    delete e.posY;
  },
  _getVisibleIndexObject: function (e, t) {
    if ((0, c.isDefined)(e)) {
      return {
        columnIndex: t,
        rowIndex: e
      };
    } else {
      return t;
    }
  },
  dispose: function () {
    var e = this.element();
    this._dragOptions = null;
    if (e) {
      e.parent().find(`.${this.addWidgetPrefix("drag-header")}`).remove();
    }
  },
  isVisible: function () {
    var e = this.getController("columns").getCommonSettings();
    return this.option("showColumnHeaders") && (w(this) || e.allowGrouping || e.allowHiding);
  },
  init: function () {
    var e = this;
    this.callBase();
    this._controller = this.getController("draggingHeader");
    this._columnsResizerViewController = this.getController("columnsResizer");
    this.getController("data").loadingChanged.add(function (t) {
      var n = e.element();
      if (!t && n) {
        n.hide();
      }
    });
  },
  dragHeader: function (e) {
    var t = e.columnElement;
    var n = !!e.sourceColumn.type;
    this._isDragging = true;
    this._dragOptions = e;
    this._dropOptions = {
      sourceIndex: e.index,
      sourceColumnIndex: this._getVisibleIndexObject(e.rowIndex, e.columnIndex),
      sourceColumnElement: e.columnElement,
      sourceLocation: e.sourceLocation
    };
    var i = o.default.getDocument();
    this._onSelectStart = i.onselectstart;
    i.onselectstart = function () {
      return false;
    };
    this._controller.drag(this._dropOptions);
    this.element().css({
      textAlign: t && t.css("textAlign"),
      height: t && (n && t.get(0).clientHeight || (0, d.getHeight)(t)),
      width: t && (n && t.get(0).clientWidth || (0, d.getWidth)(t)),
      whiteSpace: t && t.css("whiteSpace")
    }).addClass(this.addWidgetPrefix("drag-action")).toggleClass("dx-drag-command-cell", n).text(n ? "" : e.sourceColumn.caption);
    this.element().appendTo(m.default.getSwatchContainer(t));
  },
  moveHeader: function (e) {
    var t = e.event;
    var n = t.data.that;
    var i = (0, g.eventData)(t);
    var o = !!n._columnsResizerViewController && n._columnsResizerViewController.isResizing();
    var a = n._dragOptions;
    if (n._isDragging && !o) {
      var r = n.element();
      var s = Math.abs(i.x - a.columnElement.offset().left - a.deltaX);
      var l = Math.abs(i.y - a.columnElement.offset().top - a.deltaY);
      if (r.is(":visible") || s > 5 || l > 5) {
        r.show();
        var u = i.x - a.deltaX;
        var d = i.y - a.deltaY;
        r.css({
          left: u,
          top: d
        });
        n.dockHeader(i);
      }
      t.preventDefault();
    }
  },
  dockHeader: function (e) {
    var t = this._getDraggingPanelByPos(e);
    var n = this._controller;
    var i = this._dropOptions;
    var o = this._dragOptions;
    if (t) {
      var r = this.option("rtlEnabled");
      var l = t.getName() === "columnChooser";
      var u = l ? "y" : "x";
      var d = t.getName();
      var c = d === "headers" ? o.rowIndex : undefined;
      var h = o.sourceColumn;
      var f = t.getColumnElements(c, h == null ? undefined : h.ownerBand) || [];
      var p = o.pointsByTarget = o.pointsByTarget || {};
      var g = d === "columnChooser" ? [] : p[d] || n._generatePointsByColumns((0, s.extend)({}, o, {
        targetDraggingPanel: t,
        columns: t.getColumns(c),
        columnElements: f,
        isVerticalOrientation: l,
        startColumnIndex: d === "headers" && (0, a.default)(f[0]).index()
      }));
      p[d] = g;
      i.targetLocation = d;
      if (g.length > 0) {
        for (var m = 0; m < g.length; m++) {
          var _ = g[m + 1] && (g[m][u] + g[m + 1][u]) / 2;
          if (_ === undefined || (r && u === "x" ? e[u] > _ : e[u] < _)) {
            i.targetColumnIndex = this._getVisibleIndexObject(c, g[m].columnIndex);
            if (f[m]) {
              i.targetColumnElement = f.eq(m);
              i.isLast = false;
            } else {
              i.targetColumnElement = f.last();
              i.isLast = true;
            }
            i.posX = g[m].x;
            i.posY = g[m].y;
            n.dock(i);
            break;
          }
        }
      } else {
        this._resetTargetColumnOptions();
        n.dock(i);
      }
    }
  },
  dropHeader: function (e) {
    var t = e.event.data.that;
    var n = t._controller;
    t.element().hide();
    if (n && t._isDragging) {
      n.drop(t._dropOptions);
    }
    t.element().appendTo(t._parentElement());
    t._dragOptions = null;
    t._dropOptions = null;
    t._isDragging = false;
    o.default.getDocument().onselectstart = t._onSelectStart || null;
  }
});
function T(e) {
  return e.option("columnResizingMode") !== "widget";
}
var E = _.default.ViewController.inherit({
  _isHeadersRowArea: function (e) {
    if (this._columnHeadersView) {
      var t = this._columnHeadersView.element();
      if (t) {
        var n = t.offset().top;
        var i = this._columnHeadersView.getHeadersRowHeight();
        return e >= n && e <= n + i;
      }
    }
    return false;
  },
  _isRtlParentStyle: function () {
    var e;
    return this.option("rtlEnabled") && ((e = this._$parentContainer) === null || e === undefined ? undefined : e.parent().css("direction")) === "rtl";
  },
  _pointCreated: function (e, t, n) {
    var i = T(this);
    var o = this.option("rtlEnabled");
    var a = this._isRtlParentStyle();
    var r = i || !o || a ? 1 : 0;
    if (e.index >= r && e.index < t + (i || o && !a ? 0 : 1)) {
      e.columnIndex -= r;
      var s = n[e.columnIndex] || {};
      var l = n[e.columnIndex + 1] || {};
      return !(i ? s.allowResizing && l.allowResizing : s.allowResizing);
    }
    return true;
  },
  _getTargetPoint: function (e, t, n) {
    if (e) {
      for (var i = 0; i < e.length; i++) {
        if ((e[i].x !== e[0].x || !e[i + 1] || e[i].x !== e[i + 1].x) && e[i].x - n <= t && t <= e[i].x + n) {
          return e[i];
        }
      }
    }
    return null;
  },
  _moveSeparator: function (e) {
    var t;
    var n = e.event;
    var i = n.data;
    var o = i._columnsSeparatorView.width();
    var a = T(i);
    var r = o / 2;
    var s = i._$parentContainer.offset();
    var l = s.left;
    var u = (0, g.eventData)(n);
    var c = i.option("rtlEnabled");
    var h = this._isRtlParentStyle();
    var f = (t = i._draggingHeaderView) === null || t === undefined ? undefined : t.isDragging();
    if (i._isResizing && i._resizingInfo) {
      if ((l <= u.x || !a && h) && (!a || u.x <= l + (0, d.getWidth)(i._$parentContainer)) && i._updateColumnsWidthIfNeeded(u.x)) {
        var p = i._columnHeadersView.getColumnElements().eq(i._resizingInfo.currentColumnIndex);
        var m = p[0];
        if (m) {
          var _ = m.getBoundingClientRect().width;
          i._columnsSeparatorView.moveByX(p.offset().left + ((a || h) && c ? 0 : _));
          i._tablePositionController.update(i._targetPoint.y);
          n.preventDefault();
        }
      }
    } else if (!f) {
      if (i._isHeadersRowArea(u.y)) {
        if (i._previousParentOffset) {
          if (i._previousParentOffset.left !== s.left || i._previousParentOffset.top !== s.top) {
            i.pointsByColumns(null);
          }
        }
        i._targetPoint = i._getTargetPoint(i.pointsByColumns(), u.x, o);
        i._previousParentOffset = s;
        i._isReadyResizing = false;
        if (i._targetPoint) {
          i._columnsSeparatorView.changeCursor("col-resize");
          i._columnsSeparatorView.moveByX(i._targetPoint.x - r);
          i._tablePositionController.update(i._targetPoint.y);
          i._isReadyResizing = true;
          n.preventDefault();
        } else {
          i._columnsSeparatorView.changeCursor();
          i._columnsSeparatorView.moveByX(null);
        }
      } else {
        i.pointsByColumns(null);
        i._isReadyResizing = false;
        i._columnsSeparatorView.changeCursor();
        i._columnsSeparatorView.moveByX(null);
      }
    }
  },
  _endResizing: function (e) {
    var t = e.event.data;
    if (t._isResizing) {
      t.pointsByColumns(null);
      t._resizingInfo = null;
      t._columnsSeparatorView.hide();
      t._columnsSeparatorView.changeCursor();
      t._trackerView.hide();
      t._isReadyResizing = false;
      t._isResizing = false;
    }
  },
  _getNextColumnIndex: function (e) {
    return e + 1;
  },
  _setupResizingInfo: function (e) {
    var t = this._targetPoint.columnIndex;
    var n = this._getNextColumnIndex(t);
    var i = this._columnHeadersView.getHeaderElement(t);
    var o = this._columnHeadersView.getHeaderElement(n);
    this._resizingInfo = {
      startPosX: e,
      currentColumnIndex: t,
      currentColumnWidth: i && i.length > 0 ? (0, u.getBoundingRect)(i[0]).width : 0,
      nextColumnIndex: n,
      nextColumnWidth: o && o.length > 0 ? (0, u.getBoundingRect)(o[0]).width : 0
    };
  },
  _startResizing: function (e) {
    var t = e.event;
    var n = t.data;
    var i = (0, g.eventData)(t);
    if ((0, g.isTouchEvent)(t)) {
      if (n._isHeadersRowArea(i.y)) {
        n._targetPoint = n._getTargetPoint(n.pointsByColumns(), i.x, 10);
        if (n._targetPoint) {
          n._columnsSeparatorView.moveByX(n._targetPoint.x - n._columnsSeparatorView.width() / 2);
          n._isReadyResizing = true;
        }
      } else {
        n._isReadyResizing = false;
      }
    }
    if (n._isReadyResizing) {
      n._setupResizingInfo(i.x);
      n._isResizing = true;
      n._tablePositionController.update(n._targetPoint.y);
      n._columnsSeparatorView.show();
      n._trackerView.show();
      var o = n.component.getScrollable();
      if (o && n._isRtlParentStyle()) {
        n._scrollRight = (0, d.getWidth)(o.$content()) - (0, d.getWidth)(o.container()) - o.scrollLeft();
      }
      t.preventDefault();
      t.stopPropagation();
    }
    if (this.isResizing()) {
      this.getController("editorFactory").loseFocus();
    }
  },
  _generatePointsByColumns: function () {
    var e = this;
    var t = e._columnsController ? e._columnsController.getVisibleColumns() : [];
    var n = e._columnHeadersView.getColumnElements();
    var i = [];
    if (n && n.length > 0) {
      i = v.default.getPointsByColumns(n, function (i) {
        return e._pointCreated(i, n.length, t);
      });
    }
    e._pointsByColumns = i;
  },
  _unsubscribeFromEvents: function () {
    if (this._moveSeparatorHandler) {
      h.default.off(o.default.getDocument(), (0, g.addNamespace)(p.default.move, b), this._moveSeparatorHandler);
    }
    if (this._startResizingHandler) {
      h.default.off(this._$parentContainer, (0, g.addNamespace)(p.default.down, b), this._startResizingHandler);
    }
    if (this._endResizingHandler) {
      h.default.off(this._columnsSeparatorView.element(), (0, g.addNamespace)(p.default.up, b), this._endResizingHandler);
      h.default.off(o.default.getDocument(), (0, g.addNamespace)(p.default.up, b), this._endResizingHandler);
    }
  },
  _subscribeToEvents: function () {
    this._moveSeparatorHandler = this.createAction(this._moveSeparator);
    this._startResizingHandler = this.createAction(this._startResizing);
    this._endResizingHandler = this.createAction(this._endResizing);
    h.default.on(o.default.getDocument(), (0, g.addNamespace)(p.default.move, b), this, this._moveSeparatorHandler);
    h.default.on(this._$parentContainer, (0, g.addNamespace)(p.default.down, b), this, this._startResizingHandler);
    h.default.on(this._columnsSeparatorView.element(), (0, g.addNamespace)(p.default.up, b), this, this._endResizingHandler);
    h.default.on(o.default.getDocument(), (0, g.addNamespace)(p.default.up, b), this, this._endResizingHandler);
  },
  _updateColumnsWidthIfNeeded: function (e) {
    var t;
    var n;
    var i = this._rowsView.contentWidth();
    var o = this._resizingInfo;
    var a = this._columnsController;
    var r = a.getVisibleColumns();
    var s = this._columnsSeparatorView.width();
    var l = T(this);
    var u = l && this.option("adaptColumnWidthByRatio") && !this.option("columnAutoWidth");
    var h = this.option("rtlEnabled");
    var f = this._isRtlParentStyle();
    var p = r[o.currentColumnIndex];
    var g = r[o.nextColumnIndex];
    function m(e) {
      return (0, c.isString)(e) && e.endsWith("%");
    }
    function _(e, t, n, i) {
      if (e) {
        var o = e.width;
        if (o) {
          i = m(o);
        }
        if (i) {
          a.columnOption(e.index, "visibleWidth", t);
          a.columnOption(e.index, "width", `${(t / n * 100).toFixed(3)}%`);
        } else {
          a.columnOption(e.index, "visibleWidth", null);
          a.columnOption(e.index, "width", t);
        }
      }
    }
    t = e - o.startPosX;
    if ((l || f) && h) {
      t = -t;
    }
    var y = function (e) {
      var t;
      var n;
      var i;
      var a = o.currentColumnWidth + e;
      var r = p && p.minWidth || s;
      var u = {};
      if (a >= r) {
        u.cellWidth = a;
      } else {
        u.cellWidth = r;
        i = true;
      }
      if (l) {
        if ((n = o.nextColumnWidth - e) >= (t = g && g.minWidth || s)) {
          u.nextCellWidth = i ? o.nextColumnWidth - (e + r - a) : n;
        } else {
          u.nextCellWidth = t;
          u.cellWidth = o.currentColumnWidth + (e - t + n);
        }
      }
      return u;
    }(t);
    var b = y.cellWidth;
    var x = y.nextCellWidth;
    if (n = p.width !== b) {
      a.beginUpdate();
      b = Math.floor(b);
      i = function (e, t) {
        if (t.every(function (e) {
          return e.width;
        })) {
          var n = t.reduce(function (e, t) {
            if (m(t.width)) {
              e += parseFloat(t.width);
            }
            return e;
          }, 0);
          if (n > 100) {
            e = e / n * 100;
          }
        }
        return e;
      }(i, r);
      _(p, b, i, u);
      if (l) {
        x = Math.floor(x);
        _(g, x, i, u);
      } else {
        var w = this._columnHeadersView.getColumnWidths();
        w[o.currentColumnIndex] = b;
        if (!(w.reduce(function (e, t) {
          return e + t;
        }, 0) > this._rowsView.contentWidth())) {
          var C = v.default.getLastResizableColumnIndex(r);
          if (C >= 0) {
            a.columnOption(r[C].index, "visibleWidth", "auto");
          }
        }
        for (var S = 0; S < w.length; S++) {
          if (r[S] && r[S] !== p && r[S].width === undefined) {
            a.columnOption(r[S].index, "width", w[S]);
          }
        }
      }
      a.endUpdate();
      if (!l) {
        this.component.updateDimensions();
        var k = this.component.getScrollable();
        if (k && f) {
          var D = (0, d.getWidth)(k.$content()) - (0, d.getWidth)(k.container()) - this._scrollRight;
          k.scrollTo({
            left: D
          });
        }
      }
    }
    return n;
  },
  _subscribeToCallback: function (e, t) {
    e.add(t);
    this._subscribesToCallbacks.push({
      callback: e,
      handler: t
    });
  },
  _unsubscribeFromCallbacks: function () {
    for (var e = 0; e < this._subscribesToCallbacks.length; e++) {
      var t = this._subscribesToCallbacks[e];
      t.callback.remove(t.handler);
    }
    this._subscribesToCallbacks = [];
  },
  _unsubscribes: function () {
    this._unsubscribeFromEvents();
    this._unsubscribeFromCallbacks();
  },
  _init: function () {
    var e = this;
    function t() {
      if (!e._isResizing) {
        e.pointsByColumns(null);
      }
    }
    function n(t) {
      if (e._scrollLeft !== t.left) {
        e._scrollLeft = t.left;
        e.pointsByColumns(null);
      }
    }
    e._columnsSeparatorView = e.getView("columnsSeparatorView");
    e._columnHeadersView = e.getView("columnHeadersView");
    e._trackerView = e.getView("trackerView");
    e._rowsView = e.getView("rowsView");
    e._columnsController = e.getController("columns");
    e._tablePositionController = e.getController("tablePosition");
    e._$parentContainer = e.component.$element();
    e._draggingHeaderView = e.component.getView("draggingHeaderView");
    e._subscribeToCallback(e._columnHeadersView.renderCompleted, t);
    e._subscribeToCallback(e._columnHeadersView.resizeCompleted, t);
    e._subscribeToCallback(e._columnsSeparatorView.renderCompleted, function () {
      e._unsubscribeFromEvents();
      e._subscribeToEvents();
    });
    e._subscribeToCallback(e._rowsView.renderCompleted, function () {
      e._rowsView.scrollChanged.remove(n);
      e._rowsView.scrollChanged.add(n);
    });
    var i = e._rowsView.getScrollbarWidth() !== 0;
    var o = 0;
    e._subscribeToCallback(e.getController("tablePosition").positionChanged, function (t) {
      if (e._isResizing && !e._rowsView.isResizing) {
        var n = e._rowsView.getScrollbarWidth() !== 0;
        if (i !== n || o && o !== t.height) {
          i = n;
          o = t.height;
          e.component.updateDimensions();
        } else {
          e._rowsView.updateFreeSpaceRowHeight();
        }
      }
      o = t.height;
    });
  },
  optionChanged: function (e) {
    this.callBase(e);
    if (e.name === "allowColumnResizing") {
      if (e.value) {
        this._init();
        this._subscribeToEvents();
      } else {
        this._unsubscribes();
      }
    }
  },
  isResizing: function () {
    return this._isResizing;
  },
  init: function () {
    this._subscribesToCallbacks = [];
    if (x(this)) {
      this._init();
    }
  },
  pointsByColumns: function (e) {
    if (e === undefined) {
      if (!this._pointsByColumns) {
        this._generatePointsByColumns();
      }
      return this._pointsByColumns;
    }
    this._pointsByColumns = e;
  },
  dispose: function () {
    this._unsubscribes();
    this.callBase();
  }
});
var O = _.default.ViewController.inherit({
  update: function (e) {
    var t = {};
    var n = this._columnHeadersView.element();
    var i = n && n.offset();
    var o = i && i.top || 0;
    var a = (0, c.isDefined)(e) ? Math.abs(e - o) : 0;
    var r = this._columnHeadersView ? this._columnHeadersView.getHeight() : 0;
    var s = this._rowsView.getScrollbarWidth(true);
    var l = this._rowsView ? this._rowsView.height() - s : 0;
    var u = this.component.getController("columnsResizer");
    var d = this.component.getView("draggingHeaderView");
    t.height = r;
    if (u.isResizing() || d.isDragging()) {
      t.height += l - a;
    }
    if (e !== null && n && n.length) {
      t.top = n[0].offsetTop + a;
    }
    this.positionChanged.fire(t);
  },
  init: function () {
    var e = this;
    e.callBase();
    e._columnHeadersView = this.getView("columnHeadersView");
    e._rowsView = this.getView("rowsView");
    e._pagerView = this.getView("pagerView");
    e._rowsView.resizeCompleted.add(function () {
      if (e.option("allowColumnResizing")) {
        var t = e.getController("columnsResizer")._targetPoint;
        e.update(t ? t.y : null);
      }
    });
  },
  ctor: function (e) {
    this.callBase(e);
    this.positionChanged = (0, r.default)();
  }
});
var A = {
  views: {
    columnsSeparatorView: k,
    blockSeparatorView: D,
    draggingHeaderView: I,
    trackerView: C
  },
  controllers: {
    draggingHeader: _.default.ViewController.inherit({
      _generatePointsByColumns: function (e) {
        var t = this;
        return v.default.getPointsByColumns(e.columnElements, function (n) {
          return t._pointCreated(n, e.columns, e.targetDraggingPanel.getName(), e.sourceColumn);
        }, e.isVerticalOrientation, e.startColumnIndex);
      },
      _pointCreated: function (e, t, n, i) {
        var o = t[e.columnIndex];
        var a = t[e.columnIndex - 1];
        switch (n) {
          case "columnChooser":
            return true;
          case "headers":
            return i && !i.allowReordering || (!o || !o.allowReordering) && (!a || !a.allowReordering);
          default:
            return t.length === 0;
        }
      },
      _subscribeToEvents: function (e, t) {
        var n = this;
        (0, l.each)(t, function (i, o) {
          if (o) {
            var r;
            for (var s = o.getRowCount ? o.getRowCount() : 1, u = o.getName(), d = function (i, s) {
                if (s) {
                  var l = (0, a.default)(s);
                  var d = r[i];
                  if (d && o.allowDragging(d)) {
                    l.addClass(n.addWidgetPrefix("drag-action"));
                    h.default.on(l, (0, g.addNamespace)(f.start, b), n.createAction(function (o) {
                      var r = o.event;
                      var s = (0, g.eventData)(r);
                      e.dragHeader({
                        deltaX: s.x - (0, a.default)(r.currentTarget).offset().left,
                        deltaY: s.y - (0, a.default)(r.currentTarget).offset().top,
                        sourceColumn: d,
                        index: d.index,
                        columnIndex: i,
                        columnElement: l,
                        sourceLocation: u,
                        draggingPanels: t,
                        rowIndex: n._columnsController.getRowIndex(d.index, true)
                      });
                    }));
                    h.default.on(l, (0, g.addNamespace)(f.move, b), {
                      that: e
                    }, n.createAction(e.moveHeader));
                    h.default.on(l, (0, g.addNamespace)(f.end, b), {
                      that: e
                    }, n.createAction(e.dropHeader));
                  }
                }
              }, c = 0; c < s; c++) {
              var p = o.getColumnElements(c) || [];
              if (p.length) {
                r = o.getColumns(c) || [];
                (0, l.each)(p, d);
              }
            }
          }
        });
      },
      _unsubscribeFromEvents: function (e, t) {
        var n = this;
        (0, l.each)(t, function (e, t) {
          if (t) {
            var i = t.getColumnElements() || [];
            (0, l.each)(i, function (e, t) {
              var i = (0, a.default)(t);
              h.default.off(i, (0, g.addNamespace)(f.start, b));
              h.default.off(i, (0, g.addNamespace)(f.move, b));
              h.default.off(i, (0, g.addNamespace)(f.end, b));
              i.removeClass(n.addWidgetPrefix("drag-action"));
            });
          }
        });
      },
      _getSeparator: function (e) {
        if (e === "headers") {
          return this._columnsSeparatorView;
        } else {
          return this._blockSeparatorView;
        }
      },
      hideSeparators: function (e) {
        var t = this._blockSeparatorView;
        var n = this._columnsSeparatorView;
        this._animationColumnIndex = null;
        if (t) {
          t.hide();
        }
        if (e !== "block" && n) {
          n.hide();
        }
      },
      init: function () {
        var e = this;
        e.callBase();
        e._columnsController = e.getController("columns");
        e._columnHeadersView = e.getView("columnHeadersView");
        e._columnsSeparatorView = e.getView("columnsSeparatorView");
        e._draggingHeaderView = e.getView("draggingHeaderView");
        e._rowsView = e.getView("rowsView");
        e._blockSeparatorView = e.getView("blockSeparatorView");
        e._headerPanelView = e.getView("headerPanel");
        e._columnChooserView = e.getView("columnChooserView");
        function t() {
          if (e._draggingHeaderView) {
            var t = [e._columnChooserView, e._columnHeadersView, e._headerPanelView];
            e._unsubscribeFromEvents(e._draggingHeaderView, t);
            e._subscribeToEvents(e._draggingHeaderView, t);
          }
        }
        e._columnHeadersView.renderCompleted.add(t);
        if (e._headerPanelView) {
          e._headerPanelView.renderCompleted.add(t);
        }
        if (e._columnChooserView) {
          e._columnChooserView.renderCompleted.add(t);
        }
      },
      allowDrop: function (e) {
        return this._columnsController.allowMoveColumn(e.sourceColumnIndex, e.targetColumnIndex, e.sourceLocation, e.targetLocation);
      },
      drag: function (e) {
        var t = e.sourceIndex;
        var n = e.sourceLocation;
        var i = e.sourceColumnElement;
        var o = this._columnHeadersView;
        var a = this._rowsView;
        if (i) {
          i.css({
            opacity: 0.5
          });
          if (n === "headers") {
            if (o) {
              o.setRowsOpacity(t, 0.5);
            }
            if (a) {
              a.setRowsOpacity(t, 0.5);
            }
          }
        }
      },
      dock: function (e) {
        var t = this;
        var n = (0, c.isObject)(e.targetColumnIndex) ? e.targetColumnIndex.columnIndex : e.targetColumnIndex;
        var i = e.sourceLocation;
        var o = e.targetLocation;
        var a = t._getSeparator(o);
        var r = n >= 0;
        t._columnHeadersView.element().find(`.dx-header-row`).toggleClass(t.addWidgetPrefix("drop-highlight"), i !== "headers" && o === "headers" && !r);
        if (a) {
          if (t.allowDrop(e) && r) {
            if (o === "group" || o === "columnChooser") {
              if (t._animationColumnIndex !== n) {
                t.hideSeparators();
                a.element()[e.isLast ? "insertAfter" : "insertBefore"](e.targetColumnElement);
                t._animationColumnIndex = n;
                a.show(o);
              }
            } else {
              t.hideSeparators("block");
              t.getController("tablePosition").update(e.posY);
              a.moveByX(e.posX - a.width());
              a.show();
            }
          } else {
            t.hideSeparators();
          }
        }
      },
      drop: function (e) {
        var t = e.sourceColumnElement;
        if (t) {
          t.css({
            opacity: ""
          });
          this._columnHeadersView.setRowsOpacity(e.sourceIndex, "");
          this._rowsView.setRowsOpacity(e.sourceIndex, "");
          this._columnHeadersView.element().find(`.dx-header-row`).removeClass(this.addWidgetPrefix("drop-highlight"));
        }
        if (this.allowDrop(e)) {
          var n = this._getSeparator(e.targetLocation);
          if (n) {
            n.hide();
          }
          this._columnsController.moveColumn(e.sourceColumnIndex, e.targetColumnIndex, e.sourceLocation, e.targetLocation);
        }
      },
      dispose: function () {
        if (this._draggingHeaderView) {
          this._unsubscribeFromEvents(this._draggingHeaderView, [this._columnChooserView, this._columnHeadersView, this._headerPanelView]);
        }
      }
    }),
    tablePosition: O,
    columnsResizer: E
  },
  extenders: {
    views: {
      rowsView: {
        _needUpdateRowHeight: function (e) {
          var t = this.option("wordWrapEnabled");
          var n = this.getController("columnsResizer");
          var i = n.isResizing();
          return this.callBase.apply(this, arguments) || e > 0 && t && i;
        }
      }
    },
    controllers: {
      editorFactory: {
        renderFocusOverlay: function () {
          if (!this.getController("columnsResizer").isResizing()) {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
};
exports.columnsResizingReorderingModule = A;