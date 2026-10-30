Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerFilterModule = undefined;
exports.invertFilterExpression = function (e) {
  return ["!", e];
};
var i = require("./47617.js");
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./37518.js");
var l = require("./35922.js");
var u = require("./9234.js");
var d = x(require("./96687.js"));
var c = x(require("./99236.js"));
var h = require("./95429.js");
var f = x(require("./55994.js"));
var p = x(require("./91500.js"));
var g = x(require("./28109.js"));
var m = require("./56756.js");
var _ = x(require("./18740.js"));
var v = x(require("./15943.js"));
var y = x(require("./60082.js"));
var b = require("./37565.js");
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function w() {
  return (w = Object.assign ? Object.assign.bind() : function (e) {
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
var C = {
  month: function (e) {
    return p.default.getMonthNames()[e - 1];
  },
  quarter: function (e) {
    return p.default.format(new Date(2000, e * 3 - 1), "quarter");
  }
};
function S(e, t) {
  var n = function e(t, n, i) {
    n = n || [];
    i = i || [];
    t.forEach(function (t) {
      if ((0, l.isDefined)(t.key)) {
        var o = n.length === 1;
        n.push(o ? t.key - 1 : t.key);
        if (t.items) {
          e(t.items, n, i);
        } else {
          var a = new Date(Date.UTC.apply(Date, n));
          i.push(a);
        }
        n.pop();
      } else {
        i.push(null);
      }
    });
    return i;
  }(e);
  var i = (0, d.default)(n);
  var o = y.default.getHeaderFilterGroupParameters(w(w({}, t), {
    calculateCellValue: function (e) {
      return e;
    }
  }));
  return c.default.queryByOptions(i, {
    group: o
  }).toArray();
}
var k = v.default.ViewController.inherit({
  init: function () {
    this._columnsController = this.getController("columns");
    this._dataController = this.getController("data");
    this._headerFilterView = this.getView("headerFilterView");
  },
  _updateSelectedState: function (e, t) {
    for (var n = e.length, i = t.filterType === "exclude"; n--;) {
      var o = e[n];
      if ("items" in e[n]) {
        this._updateSelectedState(e[n].items, t);
      }
      (0, b.updateHeaderFilterItemSelectionState)(o, y.default.getIndexByKey(e[n].value, t.filterValues, null) > -1, i);
    }
  },
  _normalizeGroupItem: function (e, t, n) {
    var i;
    var o;
    var r = n.path;
    var s = n.valueSelector;
    var u = n.displaySelector;
    var d = n.column;
    if (s && u) {
      i = s(e);
      o = u(e);
    } else {
      o = i = e.key;
    }
    e = (0, l.isObject)(e) ? (0, a.extend)({}, e) : {};
    r.push(i);
    if (r.length === 1) {
      e.value = r[0];
    } else {
      e.value = r.join("/");
    }
    e.text = this.getHeaderItemText(o, d, t, n.headerFilterOptions);
    return e;
  },
  getHeaderItemText: function (e, t, n, i) {
    var o = y.default.formatValue(e, function (e, t, n) {
      var i = _.default.getGroupInterval(t);
      var o = y.default.getFormatOptionsByColumn(t, "headerFilter");
      if (i) {
        o.groupInterval = i[n];
        if (y.default.isDateType(t.dataType)) {
          o.format = C[i[n]];
        } else if (t.dataType === "number") {
          o.getDisplayFormat = function () {
            var o = {
              format: t.format,
              target: "headerFilter"
            };
            var a = y.default.formatValue(e, o);
            var r = e + i[n];
            var s = y.default.formatValue(r, o);
            if (a && s) {
              return `${a} - ${s}`;
            } else {
              return "";
            }
          };
        }
      }
      return o;
    }(e, t, n));
    o ||= i.texts.emptyValue;
    return o;
  },
  _processGroupItems: function (e, t, n, o) {
    var a;
    var r;
    var s = o.column.lookup;
    var u = o.level;
    n = n || [];
    t = t || 0;
    if (s) {
      a = (0, i.compileGetter)(s.displayExpr);
      r = (0, i.compileGetter)(s.valueExpr);
    }
    for (var d = 0; d < e.length; d++) {
      e[d] = this._normalizeGroupItem(e[d], t, {
        column: o.column,
        headerFilterOptions: o.headerFilterOptions,
        displaySelector: a,
        valueSelector: r,
        path: n
      });
      if ("items" in e[d]) {
        if (t !== u && (0, l.isDefined)(e[d].value)) {
          this._processGroupItems(e[d].items, t + 1, n, o);
        } else {
          delete e[d].items;
        }
      }
      n.pop();
    }
  },
  getDataSource: function (e) {
    var n = this._dataController.dataSource();
    var i = n == null ? undefined : n.remoteOperations().grouping;
    var a = y.default.getHeaderFilterGroupParameters(e, i);
    var r = e.headerFilter?.dataSource;
    var s = this.option("headerFilter");
    var d = false;
    var c = {
      component: this.component
    };
    if (n) {
      if ((0, l.isDefined)(r) && !(0, l.isFunction)(r)) {
        c.dataSource = (0, u.normalizeDataSourceOptions)(r);
      } else if (e.lookup) {
        d = true;
        if (this.option("syncLookupFilterValues")) {
          this._currentColumn = e;
          var h = this._dataController.getCombinedFilter();
          this._currentColumn = null;
          c.dataSource = y.default.getWrappedLookupDataSource(e, n, h);
        } else {
          c.dataSource = y.default.normalizeLookupDataSource(e.lookup);
        }
      } else {
        var f = Array.isArray(a) ? a.length - 1 : 0;
        this._currentColumn = e;
        var p = this._dataController.getCombinedFilter();
        this._currentColumn = null;
        c.dataSource = {
          filter: p,
          group: a,
          useDefaultSearch: true,
          load: function (t) {
            var a = new o.Deferred();
            t.dataField = e.dataField || e.name;
            n.load(t).done(function (t) {
              var n;
              if (i && (((n = e.serializationFormat) == null ? undefined : n.slice(-1)) === "Z" || (n == null ? undefined : n.slice(-3)) === "'Z'") && f > 3) {
                t = S(t, e);
              }
              m._processGroupItems(t, null, null, {
                level: f,
                column: e,
                headerFilterOptions: s
              });
              a.resolve(t);
            }).fail(a.reject);
            return a;
          }
        };
      }
      if ((0, l.isFunction)(r)) {
        r.call(e, c);
      }
      var g = c.dataSource.postProcess;
      var m = this;
      c.dataSource.postProcess = function (t) {
        var n = t;
        if (d) {
          n = n.filter(function (t) {
            return t[e.lookup.valueExpr] !== null;
          });
          if (this.pageIndex() === 0 && !this.searchValue()) {
            (n = n.slice(0)).unshift(null);
          }
          m._processGroupItems(n, null, null, {
            level: 0,
            column: e,
            headerFilterOptions: s
          });
        }
        n = g && g.call(this, n) || n;
        m._updateSelectedState(n, e);
        return n;
      };
      return c.dataSource;
    }
  },
  getCurrentColumn: function () {
    return this._currentColumn;
  },
  showHeaderFilterMenu: function (e, t) {
    var n = this._columnsController;
    var i = (0, a.extend)(true, {}, this._columnsController.getColumns()[e]);
    if (i) {
      var o = n.getVisibleIndex(e);
      var r = t ? this.getView("headerPanel") : this.getView("columnHeadersView");
      var s = s || r.getColumnElements().eq(t ? i.groupIndex : o);
      this.showHeaderFilterMenuBase({
        columnElement: s,
        column: i,
        applyFilter: true,
        apply: function () {
          n.columnOption(e, {
            filterValues: this.filterValues,
            filterType: this.filterType
          });
        }
      });
    }
  },
  showHeaderFilterMenuBase: function (e) {
    var t = this;
    var n = this;
    var i = e.column;
    if (i) {
      var o = _.default.getGroupInterval(i);
      var r = n._dataController.dataSource();
      var s = r && r.remoteOperations().filtering;
      (0, a.extend)(e, i, {
        type: o && o.length > 1 ? "tree" : "list",
        remoteFiltering: s,
        onShowing: function (t) {
          var i = t.component.$overlayContent().dxResizable("instance");
          if (i) {
            i.option("onResizeEnd", function (t) {
              var i = n.getController("columns");
              var o = i.columnOption(e.dataField, "headerFilter");
              (o = o || {}).width = t.width;
              o.height = t.height;
              i.columnOption(e.dataField, "headerFilter", o, true);
            });
          }
        },
        onHidden: function () {
          return (0, m.restoreFocus)(t);
        }
      });
      e.dataSource = n.getDataSource(e);
      if (e.isFilterBuilder) {
        e.dataSource.filter = null;
        e.alignment = "right";
      }
      n._headerFilterView.showHeaderFilterMenu(e.columnElement, e);
    }
  },
  hideHeaderFilterMenu: function () {
    this._headerFilterView.hideHeaderFilterMenu();
  }
});
var D = (0, a.extend)({}, b.headerFilterMixin, {
  _renderCellContent: function (e, t) {
    var n;
    var i = this;
    var o = t.column;
    if (!o.command && (0, b.allowHeaderFiltering)(o) && i.option("headerFilter.visible") && t.rowType === "header" && (n = i._applyColumnState({
      name: "headerFilter",
      rootElement: e,
      column: o,
      showColumnLines: i.option("showColumnLines")
    }))) {
      i._subscribeToIndicatorEvent(n, o, "headerFilter");
    }
    this.callBase.apply(this, arguments);
  },
  _subscribeToIndicatorEvent: function (e, t, n) {
    var i = this;
    if (n === "headerFilter") {
      f.default.on(e, h.name, this.createAction(function (n) {
        n.event.stopPropagation();
        (0, m.saveFocusedElementInfo)(e, i);
        i.getController("headerFilter").showHeaderFilterMenu(t.index, false);
      }));
    }
  },
  _updateIndicator: function (e, t, n) {
    var i = this.callBase(e, t, n);
    if (i) {
      this._subscribeToIndicatorEvent(i, t, n);
    }
  },
  _updateHeaderFilterIndicators: function () {
    if (this.option("headerFilter.visible")) {
      this._updateIndicators("headerFilter");
    }
  },
  _needUpdateFilterIndicators: function () {
    return true;
  },
  _columnOptionChanged: function (e) {
    var t = e.optionNames;
    if (y.default.checkChanges(t, ["filterValues", "filterType"])) {
      if (this._needUpdateFilterIndicators()) {
        this._updateHeaderFilterIndicators();
      }
    } else {
      this.callBase(e);
    }
  }
});
var I = (0, a.extend)({}, b.headerFilterMixin, {
  _createGroupPanelItem: function (e, t) {
    var n;
    var i = this;
    var o = i.callBase.apply(i, arguments);
    if (!t.command && (0, b.allowHeaderFiltering)(t) && i.option("headerFilter.visible") && (n = i._applyColumnState({
      name: "headerFilter",
      rootElement: o,
      column: {
        alignment: (0, s.getDefaultAlignment)(i.option("rtlEnabled")),
        filterValues: t.filterValues,
        allowHeaderFiltering: true
      },
      showColumnLines: true
    }))) {
      f.default.on(n, h.name, i.createAction(function (e) {
        e.event.stopPropagation();
        i.getController("headerFilter").showHeaderFilterMenu(t.index, true);
      }));
    }
    return o;
  }
});
var T = {
  skipCalculateColumnFilters: function () {
    return false;
  },
  _calculateAdditionalFilter: function () {
    if (this.skipCalculateColumnFilters()) {
      return this.callBase();
    }
    var e = [this.callBase()];
    var t = this._columnsController.getVisibleColumns(null, true);
    var n = this.getController("headerFilter").getCurrentColumn();
    (0, r.each)(t, function (t, i) {
      var o;
      if ((!n || n.index !== i.index) && (0, b.allowHeaderFiltering)(i) && i.calculateFilterExpression && Array.isArray(i.filterValues) && i.filterValues.length) {
        var a = [];
        (0, r.each)(i.filterValues, function (e, t) {
          if (Array.isArray(t)) {
            o = t;
          } else {
            if (i.deserializeValue && !y.default.isDateType(i.dataType) && i.dataType !== "number") {
              t = i.deserializeValue(t);
            }
            o = i.createFilterExpression(t, "=", "headerFilter");
          }
          if (o) {
            o.columnIndex = i.index;
          }
          a.push(o);
        });
        a = y.default.combineFilters(a, "or");
        e.push(i.filterType === "exclude" ? ["!", a] : a);
      }
    });
    return y.default.combineFilters(e);
  }
};
var E = {
  defaultOptions: function () {
    return {
      syncLookupFilterValues: true,
      headerFilter: {
        visible: false,
        width: 252,
        height: 325,
        allowSelectAll: true,
        search: {
          enabled: false,
          timeout: 500,
          mode: "contains",
          editorOptions: {}
        },
        texts: {
          emptyValue: g.default.format("dxDataGrid-headerFilterEmptyValue"),
          ok: g.default.format("dxDataGrid-headerFilterOK"),
          cancel: g.default.format("dxDataGrid-headerFilterCancel")
        }
      }
    };
  },
  controllers: {
    headerFilter: k
  },
  views: {
    headerFilterView: b.HeaderFilterView
  },
  extenders: {
    controllers: {
      data: T
    },
    views: {
      columnHeadersView: D,
      headerPanel: I
    }
  }
};
exports.headerFilterModule = E;