function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridViewModule = undefined;
var o = y(require("./73349.js"));
var a = y(require("./68374.js"));
var r = y(require("./47810.js"));
var s = require("./20576.js");
var l = require("./62754.js");
var u = require("./95479.js");
var d = require("./37518.js");
var c = require("./58664.js");
var h = require("./35922.js");
var f = require("./58201.js");
var p = y(require("./28109.js"));
var g = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = v(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./56756.js"));
var m = y(require("./15943.js"));
var _ = y(require("./60082.js"));
function v(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (v = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = ["columnsSeparatorView", "blockSeparatorView", "trackerView", "headerPanel", "columnHeadersView", "rowsView", "footerView", "columnChooserView", "filterPanelView", "pagerView", "draggingHeaderView", "contextMenuView", "errorView", "headerFilterView", "filterBuilderView"];
function x(e) {
  return (0, h.isString)(e) && e.endsWith("%");
}
function w(e, t) {
  var n = e._rowsView.contentWidth();
  return n - e._getTotalWidth(t, n);
}
var C = {
  _initPostRenderHandlers: function () {
    var e = this;
    var t = this._dataController;
    if (!this._refreshSizesHandler) {
      this._refreshSizesHandler = function (n) {
        t.changed.remove(e._refreshSizesHandler);
        e._refreshSizes(n);
      };
      t.changed.add(function () {
        t.changed.add(e._refreshSizesHandler);
      });
    }
  },
  _refreshSizes: function (e) {
    var n;
    var i = this;
    var o = e && e.changeType;
    var a = e && e.isDelayed;
    var r = i._dataController.items();
    if (e && o !== "refresh" && o !== "prepend" && o !== "append") {
      if (o === "update") {
        if (e.changeTypes?.length === 0) {
          return;
        }
        if (!(r.length > 1) && e.changeTypes[0] === "insert" || r.length === 0 && e.changeTypes[0] === "remove" || e.needUpdateDimensions) {
          n = i.resize();
        } else {
          n = new l.Deferred();
          this._waitAsyncTemplates().done(function () {
            (0, s.deferUpdate)(function () {
              return (0, s.deferRender)(function () {
                return (0, s.deferUpdate)(function () {
                  i._setScrollerSpacing();
                  i._rowsView.resize();
                  n.resolve();
                });
              });
            });
          }).fail(n.reject);
        }
      }
    } else if (!a) {
      n = i.resize();
    }
    if (o && o !== "updateSelection" && o !== "updateFocusedRow" && o !== "pageIndex" && !a) {
      (0, l.when)(n).done(function () {
        i._setAriaLabel();
        i.fireContentReadyAction();
      });
    }
  },
  fireContentReadyAction: function () {
    this.component._fireContentReadyAction();
  },
  _getWidgetAriaLabel: function () {
    return "dxDataGrid-ariaDataGrid";
  },
  _setAriaLabel: function () {
    this.component.setAria("label", p.default.format(this._getWidgetAriaLabel(), this._dataController.totalItemsCount(), this.component.columnCount()), this.component.$element().children(`.dx-gridbase-container`));
  },
  _getBestFitWidths: function () {
    var e;
    var t = this._rowsView;
    var n = this._columnHeadersView;
    var i = t.getColumnWidths();
    if (!(i == null ? undefined : i.length)) {
      var o = n.getTableElement();
      n.setTableElement((e = t.getTableElement()) === null || e === undefined ? undefined : e.children(".dx-header"));
      i = n.getColumnWidths();
      n.setTableElement(o);
    }
    return i;
  },
  _setVisibleWidths: function (e, t) {
    var n = this._columnsController;
    n.beginUpdate();
    (0, u.each)(e, function (e, i) {
      var o = n.getColumnId(i);
      n.columnOption(o, "visibleWidth", t[e]);
    });
    n.endUpdate();
  },
  _toggleBestFitModeForView: function (e, t, n) {
    var i = this;
    if (e && e.isVisible()) {
      var o = this._rowsView.getTableElements();
      var r = e.getTableElements();
      (0, u.each)(o, function (e, o) {
        var s;
        var l = (0, a.default)(o);
        var u = r.eq(e);
        if (u && u.length) {
          (s = n ? u.children("tbody").appendTo(l) : l.children(`.${t}`).appendTo(u)).toggleClass(t, n);
          s.toggleClass(i.addWidgetPrefix("best-fit"), n);
        }
      });
    }
  },
  _toggleBestFitMode: function (e) {
    var t = this._rowsView.getTableElement();
    var n = this._rowsView.getTableElements().eq(1);
    if (t) {
      t.css("tableLayout", e ? "auto" : "fixed");
      t.children("colgroup").css("display", e ? "none" : "");
      (0, u.each)(n.find("tr.dx-group-row"), function (t, n) {
        (0, a.default)(n).css("display", e ? "none" : "");
      });
      n.toggleClass(this.addWidgetPrefix("table-fixed"), !e);
      this._toggleBestFitModeForView(this._columnHeadersView, "dx-header", e);
      this._toggleBestFitModeForView(this._footerView, "dx-footer", e);
      if (this._needStretch()) {
        t.get(0).style.width = e ? "auto" : "";
      }
    }
  },
  _toggleContentMinHeight: function (e) {
    var t = this._rowsView.getScrollable();
    var n = this._rowsView._findContentElement();
    if ((t == null ? undefined : t.option("useNative")) === false) {
      n.css({
        minHeight: e ? _.default.getContentHeightLimit(r.default) : ""
      });
    }
  },
  _synchronizeColumns: function () {
    var e;
    var t;
    var n;
    var i = this;
    var a = this._columnsController;
    var r = a.getVisibleColumns();
    var l = this.option("columnAutoWidth");
    var c = this.option("wordWrapEnabled");
    var f = this._needBestFit();
    var p = false;
    var m = false;
    var v = [];
    if (!f) {
      (0, u.each)(r, function (e, t) {
        if (t.width === "auto") {
          f = true;
          return false;
        }
      });
    }
    (0, u.each)(r, function (e, t) {
      if (t.minWidth) {
        p = true;
        return false;
      }
    });
    this._setVisibleWidths(r, []);
    var y = this.component.$element();
    if (f) {
      t = o.default.getActiveElement(y.get(0));
      n = _.default.getSelectionRange(t);
      this._toggleBestFitMode(true);
      e = true;
    }
    this._toggleContentMinHeight(c);
    if (y && y.get(0) && this._maxWidth) {
      delete this._maxWidth;
      y[0].style.maxWidth = "";
    }
    (0, s.deferUpdate)(function () {
      var y;
      if (f) {
        v = i._getBestFitWidths();
        (0, u.each)(r, function (e, t) {
          var n = a.getColumnId(t);
          a.columnOption(n, "bestFitWidth", v[e], true);
        });
      } else if (p) {
        v = i._getBestFitWidths();
      }
      (0, u.each)(r, function (e) {
        var t = this.width;
        if (t !== "auto") {
          if ((0, h.isDefined)(t)) {
            v[e] = (0, h.isNumeric)(t) || function (e) {
              return (0, h.isString)(e) && e.endsWith("px");
            }(t) ? parseFloat(t) : t;
          } else if (!l) {
            v[e] = undefined;
          }
        }
      });
      if (e) {
        i._toggleBestFitMode(false);
        e = false;
        if (t && t !== o.default.getActiveElement()) {
          if (!((0, d.getBoundingRect)(t).bottom < 0)) {
            (function (e, t) {
              g.hiddenFocus(e);
              _.default.setSelectionRange(e, t);
            })(t, n);
          }
        }
      }
      m = i._correctColumnWidths(v, r);
      if (l) {
        (0, u.each)(r, function (e, t) {
          if (t.type === "groupExpand") {
            y = v[e];
          }
        });
        (0, u.each)(r, function (e, t) {
          if (t.type === "groupExpand" && y) {
            v[e] = y;
          }
        });
        if (i._needStretch()) {
          i._processStretch(v, r);
        }
      }
      (0, s.deferRender)(function () {
        if (f || m) {
          i._setVisibleWidths(r, v);
        }
        if (c) {
          i._toggleContentMinHeight(false);
        }
      });
    });
  },
  _needBestFit: function () {
    return this.option("columnAutoWidth");
  },
  _needStretch: function () {
    return this._columnsController.getVisibleColumns().some(function (e) {
      return e.width === "auto" && !e.command;
    });
  },
  _getAverageColumnsWidth: function (e) {
    return w(this, e) / e.filter(function (e) {
      return e === undefined;
    }).length;
  },
  _correctColumnWidths: function (e, t) {
    var n;
    var i = this;
    var o = false;
    var a = false;
    var r = false;
    var s = i.component.$element();
    var l = i._hasWidth;
    function u() {
      var s = n;
      var l = t[s];
      var u = e[s] === "adaptiveHidden";
      var d = e[s];
      var c = l.minWidth;
      if (c) {
        if (d === undefined) {
          var f = i._getAverageColumnsWidth(e);
          d = f;
        } else if (x(d)) {
          if (function (e, t, n, i) {
            return w(e, i.map(function (e, i) {
              if (i === t) {
                return n;
              } else {
                return e;
              }
            }));
          }(i, s, c, e) < 0) {
            d = -1;
          }
        }
      }
      var p = i._getRealColumnWidth(s, e.map(function (e, t) {
        if (s === t) {
          return d;
        } else {
          return e;
        }
      }));
      if (c && !u && p < c) {
        e[s] = c;
        r = true;
        n = -1;
      }
      if (!(0, h.isDefined)(l.width)) {
        a = true;
      }
      if (x(l.width)) {
        o = true;
      }
    }
    for (n = 0; n < t.length; n++) {
      u();
    }
    if (!a && e.length) {
      var d = i._rowsView.element();
      var f = i._rowsView.contentWidth();
      var p = i._rowsView.getScrollbarWidth();
      var g = i._getTotalWidth(e, f);
      if (g < f) {
        var m = _.default.getLastResizableColumnIndex(t, e);
        if (m >= 0 && (e[m] = "auto", r = true, l === false && !o)) {
          var v = i.option("showBorders") ? Math.ceil((0, c.getOuterWidth)(d) - (0, c.getInnerWidth)(d)) : 0;
          i._maxWidth = g + p + v;
          s.css("maxWidth", i._maxWidth);
        }
      }
    }
    return r;
  },
  _processStretch: function (e, t) {
    var n = this._rowsView.contentWidth();
    var i = this._getTotalWidth(e, n);
    var o = {
      length: 0
    };
    if (e.length) {
      (0, u.each)(t, function (t) {
        if (this.width || e[t] === "adaptiveHidden") {
          o[t] = true;
          o.length++;
        }
      });
      var a = n - i;
      var r = Math.floor(a / (e.length - o.length));
      var s = a - r * (e.length - o.length);
      if (a >= 0) {
        for (var l = 0; l < e.length; l++) {
          if (!o[l]) {
            e[l] += r;
            if (s > 0) {
              if (s < 1) {
                e[l] += s;
                s = 0;
              } else {
                e[l]++;
                s--;
              }
            }
          }
        }
      }
    }
  },
  _getRealColumnWidth: function (e, t, n) {
    var i = 1;
    var o = t[e];
    if (!x(o)) {
      return parseFloat(o);
    }
    var a = t.reduce(function (e, t, n) {
      if (x(t)) {
        return e + parseFloat(t);
      } else {
        return e;
      }
    }, 0);
    var r = t.reduce(function (e, t) {
      if (!t || t === "adaptiveHidden" || x(t)) {
        return e;
      } else {
        return e + parseFloat(t);
      }
    }, 0);
    var s = (n = n || this._rowsView.contentWidth()) - r;
    var l = a * n / 100;
    if (r > 0 && l + r >= n) {
      i = l > s ? s / l : 1;
    }
    return parseFloat(o) * n * i / 100;
  },
  _getTotalWidth: function (e, t) {
    var n = 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      if (o && o !== "adaptiveHidden") {
        n += this._getRealColumnWidth(i, e, t);
      }
    }
    return Math.ceil(n);
  },
  _getGroupElement: function () {
    return this.component.$element().children().get(0);
  },
  updateSize: function (e) {
    var t = (0, a.default)(e);
    var n = this.addWidgetPrefix("important-margin");
    if (this._hasHeight === undefined && t && t.is(":visible") && (0, c.getWidth)(t)) {
      var i = t.children(`.${this.getWidgetContainerClass()}`);
      if (i.length) {
        i.detach();
      }
      this._hasHeight = !!(0, c.getHeight)(t);
      var o = (0, c.getWidth)(t);
      t.addClass(n);
      this._hasWidth = (0, c.getWidth)(t) === o;
      t.removeClass(n);
      if (i.length) {
        i.appendTo(t);
      }
    }
  },
  publicMethods: function () {
    return ["resize", "updateDimensions"];
  },
  _waitAsyncTemplates: function () {
    var e;
    var t;
    var n;
    return (0, l.when)((e = this._columnHeadersView) === null || e === undefined ? undefined : e.waitAsyncTemplates(true), (t = this._rowsView) === null || t === undefined ? undefined : t.waitAsyncTemplates(true), (n = this._footerView) === null || n === undefined ? undefined : n.waitAsyncTemplates(true));
  },
  resize: function () {
    var e = this;
    if (!this.component._requireResize) {
      var t = new l.Deferred();
      this._waitAsyncTemplates().done(function () {
        (0, l.when)(e.updateDimensions()).done(t.resolve).fail(t.reject);
      }).fail(t.reject);
      return t.promise();
    }
  },
  updateDimensions: function (e) {
    var t = this;
    t._initPostRenderHandlers();
    if (t._checkSize(e)) {
      var n = t._resizeDeferred;
      var i = t._resizeDeferred = new l.Deferred();
      (0, l.when)(n).always(function () {
        (0, s.deferRender)(function () {
          if (t._dataController.isLoaded()) {
            t._synchronizeColumns();
          }
          t._resetGroupElementHeight();
          (0, s.deferUpdate)(function () {
            (0, s.deferRender)(function () {
              (0, s.deferUpdate)(function () {
                t._updateDimensionsCore();
              });
            });
          });
        }).done(i.resolve).fail(i.reject);
      });
      return i.promise();
    }
  },
  _resetGroupElementHeight: function () {
    var e = this._getGroupElement();
    var t = this._rowsView.getScrollable();
    if (!!e && !!e.style.height && (!t || !t.scrollTop())) {
      e.style.height = "";
    }
  },
  _checkSize: function (e) {
    var t = this.component.$element();
    return !e || (this._lastWidth !== (0, c.getWidth)(t) || this._lastHeight !== (0, c.getHeight)(t) || this._devicePixelRatio !== (0, f.getWindow)().devicePixelRatio) && !!t.is(":visible");
  },
  _setScrollerSpacingCore: function () {
    var e = this;
    var t = e._rowsView.getScrollbarWidth();
    var n = e._rowsView.getScrollbarWidth(true);
    (0, s.deferRender)(function () {
      if (e._columnHeadersView) {
        e._columnHeadersView.setScrollerSpacing(t);
      }
      if (e._footerView) {
        e._footerView.setScrollerSpacing(t);
      }
      e._rowsView.setScrollerSpacing(t, n);
    });
  },
  _setScrollerSpacing: function () {
    var e = this;
    var t = this._rowsView.getScrollable();
    var n = this.option("scrolling.useNative") === true;
    if (!t || n) {
      (0, s.deferRender)(function () {
        (0, s.deferUpdate)(function () {
          e._setScrollerSpacingCore();
        });
      });
    } else {
      this._setScrollerSpacingCore();
    }
  },
  _updateDimensionsCore: function () {
    var e = this;
    var t = e._dataController;
    var n = e.getController("editorFactory");
    var i = e._rowsView;
    var o = e.component.$element();
    var r = this._getGroupElement();
    var l = (0, c.getHeight)(o);
    var d = e.option("height") || o.get(0).style.height;
    var h = !!d && d !== "auto";
    var f = parseInt(o.css("maxHeight"));
    var p = f && l >= f;
    var g = r && r.scrollHeight === r.offsetHeight;
    e.updateSize(o);
    (0, s.deferRender)(function () {
      var l = e._hasHeight || !!f || h;
      i.hasHeight(l);
      if (p && !g) {
        (0, a.default)(r).css("height", f);
      }
      if (t.isLoaded()) {
        (0, s.deferUpdate)(function () {
          e._updateLastSizes(o);
          e._setScrollerSpacing();
          (0, u.each)(b, function (t, n) {
            var i = e.getView(n);
            if (i) {
              i.resize();
            }
          });
          if (n) {
            n.resize();
          }
        });
      } else {
        i.setLoading(t.isLoading());
      }
    });
  },
  _updateLastSizes: function (e) {
    this._lastWidth = (0, c.getWidth)(e);
    this._lastHeight = (0, c.getHeight)(e);
    this._devicePixelRatio = (0, f.getWindow)().devicePixelRatio;
  },
  optionChanged: function (e) {
    switch (e.name) {
      case "width":
      case "height":
        this.component._renderDimensions();
        this.resize();
      case "renderAsync":
        e.handled = true;
        return;
      default:
        this.callBase(e);
    }
  },
  init: function () {
    this._dataController = this.getController("data");
    this._columnsController = this.getController("columns");
    this._columnHeadersView = this.getView("columnHeadersView");
    this._footerView = this.getView("footerView");
    this._rowsView = this.getView("rowsView");
  }
};
var S = {
  defaultOptions: function () {
    return {
      showBorders: false,
      renderAsync: false
    };
  },
  controllers: {
    resizing: m.default.ViewController.inherit(C),
    synchronizeScrolling: m.default.ViewController.inherit({
      _scrollChangedHandler: function (e, t, n) {
        for (var i = 0; i < e.length; i++) {
          if (e[i] && e[i].name !== n) {
            e[i].scrollTo({
              left: t.left,
              top: t.top
            });
          }
        }
      },
      init: function () {
        for (var e = [this.getView("columnHeadersView"), this.getView("footerView"), this.getView("rowsView")], t = 0; t < e.length; t++) {
          var n = e[t];
          if (n) {
            n.scrollChanged.add(this._scrollChangedHandler.bind(this, e));
          }
        }
      }
    })
  },
  views: {
    gridView: m.default.View.inherit({
      _endUpdateCore: function () {
        if (this.component._requireResize) {
          this.component._requireResize = false;
          this._resizingController.resize();
        }
      },
      init: function () {
        this._resizingController = this.getController("resizing");
        this._dataController = this.getController("data");
      },
      getView: function (e) {
        return this.component._views[e];
      },
      element: function () {
        return this._groupElement;
      },
      optionChanged: function (e) {
        if ((0, h.isDefined)(this._groupElement) && e.name === "showBorders") {
          this._groupElement.toggleClass(this.addWidgetPrefix("borders"), !!e.value);
          e.handled = true;
        } else {
          this.callBase(e);
        }
      },
      _renderViews: function (e) {
        var t = this;
        (0, u.each)(b, function (n, i) {
          var o = t.getView(i);
          if (o) {
            o.render(e);
          }
        });
      },
      _getTableRoleName: function () {
        return "group";
      },
      render: function (e) {
        var t = !this._groupElement;
        var n = this._groupElement || (0, a.default)("<div>").addClass(this.getWidgetContainerClass());
        n.addClass("dx-gridbase-container");
        n.toggleClass(this.addWidgetPrefix("borders"), !!this.option("showBorders"));
        this.setAria("role", "presentation", e);
        this.component.setAria("role", this._getTableRoleName(), n);
        this._rootElement = e || this._rootElement;
        if (t) {
          this._groupElement = n;
          if ((0, f.hasWindow)()) {
            this.getController("resizing").updateSize(e);
          }
          n.appendTo(e);
        }
        this._renderViews(n);
      },
      update: function () {
        var e = this._rootElement;
        var t = this._groupElement;
        var n = this.getController("resizing");
        if (e && t) {
          n.resize();
          if (this._dataController.isLoaded()) {
            this._resizingController.fireContentReadyAction();
          }
        }
      }
    })
  },
  VIEW_NAMES: b
};
exports.gridViewModule = S;